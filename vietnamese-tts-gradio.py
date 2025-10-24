#!/usr/bin/env python3
"""
Vietnamese TTS Web UI using Piper + Gradio
Local model with beautiful web interface
"""

import subprocess
import os
from pathlib import Path
import tempfile
import gradio as gr

MODEL_DIR = Path("models/vi_tts")
MODEL_NAME = "vi_VN-vais1000-medium"

PIPER_DOWNLOAD_URL = "https://github.com/rhasspy/piper/releases/download/2023.11.14-2/piper_windows_amd64.zip"
MODEL_ONNX_URL = f"https://huggingface.co/rhasspy/piper-voices/resolve/main/vi/vi_VN/vais1000/medium/{MODEL_NAME}.onnx"
MODEL_JSON_URL = f"https://huggingface.co/rhasspy/piper-voices/resolve/main/vi/vi_VN/vais1000/medium/{MODEL_NAME}.onnx.json"

PIPER_EXE = None
MODEL_FILE = None


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
        print("✓ Piper already installed")
        return piper_exe

    print("Downloading Piper...")
    piper_zip = Path("piper.zip")
    download_file(PIPER_DOWNLOAD_URL, piper_zip)

    print("Extracting Piper...")
    import zipfile
    with zipfile.ZipFile(piper_zip, 'r') as zip_ref:
        zip_ref.extractall("piper")

    piper_zip.unlink()
    print("✓ Piper installed")
    return piper_exe


def setup_model():
    """Download Vietnamese TTS model if not exists"""
    MODEL_DIR.mkdir(parents=True, exist_ok=True)

    model_file = MODEL_DIR / f"{MODEL_NAME}.onnx"
    json_file = MODEL_DIR / f"{MODEL_NAME}.onnx.json"

    if model_file.exists() and json_file.exists():
        print(f"✓ Model already downloaded ({model_file.stat().st_size / 1024 / 1024:.1f}MB)")
        return model_file

    print("Downloading Vietnamese model (~63MB)...")
    download_file(MODEL_ONNX_URL, model_file)
    download_file(MODEL_JSON_URL, json_file)

    print(f"✓ Model ready ({model_file.stat().st_size / 1024 / 1024:.1f}MB)")
    return model_file


def generate_speech(text):
    """Generate speech from Vietnamese text"""
    if not text or not text.strip():
        return None, "⚠️ Please enter some text"

    try:
        with tempfile.NamedTemporaryFile(suffix=".wav", delete=False) as tmp:
            output_file = tmp.name

        cmd = [
            str(PIPER_EXE),
            "--model", str(MODEL_FILE),
            "--output_file", output_file
        ]

        result = subprocess.run(
            cmd,
            input=text.encode('utf-8'),
            capture_output=True,
            timeout=30
        )

        if result.returncode != 0:
            error_msg = result.stderr.decode()
            return None, f"❌ Error: {error_msg}"

        file_size = os.path.getsize(output_file) / 1024
        return output_file, f"✅ Generated {file_size:.1f}KB audio"

    except Exception as e:
        return None, f"❌ Error: {str(e)}"


def create_ui():
    """Create Gradio interface"""

    examples = [
        ["Xin chào! Tôi là trợ lý giọng nói tiếng Việt của bạn."],
        ["Việt Nam là một quốc gia đẹp với lịch sử và văn hóa phong phú."],
        ["Học tiếng Việt rất thú vị và bổ ích."],
        ["Công nghệ trí tuệ nhân tạo đang phát triển nhanh chóng."],
        ["Hôm nay trời đẹp, chúng ta đi chơi nhé!"],
        ["Tôi thích ăn phở và bánh mì vào buổi sáng."],
    ]

    with gr.Blocks(
        title="Vietnamese TTS - Piper",
        theme=gr.themes.Soft(primary_hue="purple")
    ) as demo:

        gr.Markdown("""
        # 🇻🇳 Vietnamese Text-to-Speech
        ### Local Piper VITS Model - 100% Free & Private
        """)

        with gr.Row():
            with gr.Column():
                text_input = gr.Textbox(
                    label="Vietnamese Text",
                    placeholder="Nhập văn bản tiếng Việt của bạn...",
                    lines=5,
                    value="Xin chào! Tôi là trợ lý giọng nói tiếng Việt của bạn."
                )

                with gr.Row():
                    generate_btn = gr.Button("🔊 Generate Speech", variant="primary", size="lg")
                    clear_btn = gr.ClearButton([text_input], value="🗑️ Clear")

                status_output = gr.Textbox(
                    label="Status",
                    interactive=False,
                    show_label=False
                )

            with gr.Column():
                audio_output = gr.Audio(
                    label="Generated Audio",
                    type="filepath",
                    autoplay=False
                )

        gr.Markdown("### 📝 Example Texts")
        gr.Examples(
            examples=examples,
            inputs=text_input,
            label=None
        )

        gr.Markdown(f"""
        ---
        **Model**: {MODEL_NAME}
        **Quality**: Medium (VITS)
        **Language**: Vietnamese (vi-VN)
        **Privacy**: 100% Local Processing
        """)

        generate_btn.click(
            fn=generate_speech,
            inputs=text_input,
            outputs=[audio_output, status_output]
        )

    return demo


def main():
    global PIPER_EXE, MODEL_FILE

    print("=" * 60)
    print("Vietnamese TTS - Gradio Web UI")
    print("=" * 60)

    print("\n📦 Setting up environment...")
    PIPER_EXE = setup_piper()
    MODEL_FILE = setup_model()

    print("\n🚀 Starting Gradio server...")
    demo = create_ui()
    demo.launch(
        server_name="0.0.0.0",
        server_port=7860,
        share=False,
        show_error=True
    )


if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\n\n👋 Shutting down...")
    except Exception as e:
        print(f"\n❌ Error: {e}")
        import traceback
        traceback.print_exc()
