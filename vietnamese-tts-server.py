#!/usr/bin/env python3
"""
Local Vietnamese TTS Server using Piper
Provides HTTP API for browser access
"""

import subprocess
import sys
import os
from pathlib import Path
from http.server import HTTPServer, BaseHTTPRequestHandler
import json
import tempfile
import urllib.parse

PORT = 8765
MODEL_DIR = Path("models/vi_tts")
MODEL_NAME = "vi_VN-vais1000-medium"

PIPER_DOWNLOAD_URL = "https://github.com/rhasspy/piper/releases/download/2023.11.14-2/piper_windows_amd64.zip"
MODEL_ONNX_URL = f"https://huggingface.co/rhasspy/piper-voices/resolve/main/vi/vi_VN/vais1000/medium/{MODEL_NAME}.onnx"
MODEL_JSON_URL = f"https://huggingface.co/rhasspy/piper-voices/resolve/main/vi/vi_VN/vais1000/medium/{MODEL_NAME}.onnx.json"


def download_file(url, dest):
    """Download file using urllib"""
    import urllib.request
    print(f"Downloading {url}...")
    urllib.request.urlretrieve(url, dest)
    print(f"Downloaded to {dest}")


def setup_piper():
    """Download and setup Piper if not exists"""
    piper_exe = Path("piper/piper.exe")
    if piper_exe.exists():
        print("Piper already installed")
        return piper_exe

    print("Downloading Piper...")
    piper_zip = Path("piper.zip")
    download_file(PIPER_DOWNLOAD_URL, piper_zip)

    print("Extracting Piper...")
    import zipfile
    with zipfile.ZipFile(piper_zip, 'r') as zip_ref:
        zip_ref.extractall("piper")

    piper_zip.unlink()
    print("Piper installed successfully")
    return piper_exe


def setup_model():
    """Download Vietnamese TTS model if not exists"""
    MODEL_DIR.mkdir(parents=True, exist_ok=True)

    model_file = MODEL_DIR / f"{MODEL_NAME}.onnx"
    json_file = MODEL_DIR / f"{MODEL_NAME}.onnx.json"

    if model_file.exists() and json_file.exists():
        print("Vietnamese model already downloaded")
        return model_file

    print("Downloading Vietnamese TTS model...")
    download_file(MODEL_ONNX_URL, model_file)
    download_file(MODEL_JSON_URL, json_file)

    print(f"Model downloaded: {model_file.stat().st_size / 1024 / 1024:.1f}MB")
    return model_file


def generate_speech(text, piper_exe, model_file):
    """Generate speech using Piper"""
    with tempfile.NamedTemporaryFile(suffix=".wav", delete=False) as tmp:
        output_file = tmp.name

    try:
        cmd = [
            str(piper_exe),
            "--model", str(model_file),
            "--output_file", output_file
        ]

        result = subprocess.run(
            cmd,
            input=text.encode('utf-8'),
            capture_output=True,
            timeout=30
        )

        if result.returncode != 0:
            raise Exception(f"Piper error: {result.stderr.decode()}")

        with open(output_file, 'rb') as f:
            audio_data = f.read()

        return audio_data

    finally:
        if os.path.exists(output_file):
            os.unlink(output_file)


class TTSHandler(BaseHTTPRequestHandler):
    def do_OPTIONS(self):
        """Handle CORS preflight"""
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

    def do_POST(self):
        """Handle TTS generation request"""
        try:
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            data = json.loads(post_data.decode('utf-8'))

            text = data.get('text', '')
            if not text:
                self.send_error(400, "Missing 'text' field")
                return

            print(f"Generating speech for: {text[:50]}...")
            audio_data = generate_speech(text, self.server.piper_exe, self.server.model_file)

            self.send_response(200)
            self.send_header('Content-Type', 'audio/wav')
            self.send_header('Content-Length', len(audio_data))
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(audio_data)

            print(f"Generated {len(audio_data)} bytes")

        except Exception as e:
            print(f"Error: {e}")
            self.send_error(500, str(e))

    def do_GET(self):
        """Handle info endpoint"""
        if self.path == '/info':
            info = {
                'status': 'ready',
                'model': MODEL_NAME,
                'language': 'vi-VN',
                'endpoint': f'http://localhost:{PORT}/tts'
            }

            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(json.dumps(info).encode())
        else:
            self.send_error(404)

    def log_message(self, format, *args):
        """Custom log format"""
        print(f"[{self.log_date_time_string()}] {format % args}")


def main():
    print("=" * 60)
    print("Vietnamese TTS Server")
    print("=" * 60)

    # Setup
    print("\n1. Setting up Piper...")
    piper_exe = setup_piper()

    print("\n2. Setting up Vietnamese model...")
    model_file = setup_model()

    print("\n3. Starting HTTP server...")
    server = HTTPServer(('localhost', PORT), TTSHandler)
    server.piper_exe = piper_exe
    server.model_file = model_file

    print(f"\n✅ Server ready at http://localhost:{PORT}")
    print(f"\nEndpoints:")
    print(f"  GET  /info - Server info")
    print(f"  POST /tts  - Generate speech")
    print(f"\nExample usage:")
    print(f'  curl -X POST http://localhost:{PORT}/tts \\')
    print(f'    -H "Content-Type: application/json" \\')
    print(f'    -d \'{{"text": "Xin chào Việt Nam"}}\' \\')
    print(f'    --output output.wav')
    print("\nPress Ctrl+C to stop\n")

    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\n\nShutting down...")
        server.shutdown()


if __name__ == "__main__":
    main()
