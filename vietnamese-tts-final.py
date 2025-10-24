#!/usr/bin/env python3
"""
Vietnamese TTS Web UI using Piper + Gradio
Works on Colab, Linux, Windows, Mac
"""

import subprocess
import os
import sys
from pathlib import Path
import tempfile
import platform
import gradio as gr

MODEL_DIR = Path("models/vi_tts")
MODEL_NAME = "vi_VN-vais1000-medium"

# Detect platform
IS_WINDOWS = platform.system() == "Windows"
IS_LINUX = platform.system() == "Linux"
IS_MAC = platform.system() == "Darwin"

# Select appropriate Piper binary
if IS_WINDOWS:
    PIPER_URL = "https://github.com/rhasspy/piper/releases/download/2023.11.14-2/piper_windows_amd64.zip"
    PIPER_EXE_NAME = "piper.exe"
elif IS_MAC:
    PIPER_URL = "https://github.com/rhasspy/piper/releases/download/2023.11.14-2/piper_macos_x86_64.tar.gz"
    PIPER_EXE_NAME = "piper"
else:  # Linux (includes Colab)
    PIPER_URL = "https://github.com/rhasspy/piper/releases/download/2023.11.14-2/piper_linux_x86_64.tar.gz"
    PIPER_EXE_NAME = "piper"

MODEL_ONNX_URL = f"https://huggingface.co/rhasspy/piper-voices/resolve/main/vi/vi_VN/vais1000/medium/{MODEL_NAME}.onnx"
MODEL_JSON_URL = f"https://huggingface.co/rhasspy/piper-voices/resolve/main/vi/vi_VN/vais1000/medium/{MODEL_NAME}.onnx.json"

PIPER_EXE = None
MODEL_FILE = None


def download_file(url, dest):
    """Download file with progress"""
    import urllib.request
    print(f"📥 Downloading {url.split('/')[-1]}...")
    urllib.request.urlretrieve(url, dest)
    print(f"✓ Downloaded to {dest}")


def setup_piper():
    """Download and setup Piper binary"""
    piper_dir = Path("piper")
    piper_exe = piper_dir / PIPER_EXE_NAME

    if piper_exe.exists() and os.access(piper_exe, os.X_OK):
        print(f"✓ Piper already installed at {piper_exe}")
        return piper_exe

    print(f"📦 Installing Piper for {platform.system()}...")
    piper_dir.mkdir(exist_ok=True)

    archive_name = "piper_archive"
    if PIPER_URL.endswith('.zip'):
        archive_path = Path(f"{archive_name}.zip")
        download_file(PIPER_URL, archive_path)

        print("📂 Extracting ZIP...")
        import zipfile
        with zipfile.ZipFile(archive_path, 'r') as zip_ref:
            zip_ref.extractall(piper_dir)
        archive_path.unlink()

    else:  # tar.gz
        archive_path = Path(f"{archive_name}.tar.gz")
        download_file(PIPER_URL, archive_path)

        print("📂 Extracting TAR.GZ...")
        import tarfile
        with tarfile.open(archive_path, 'r:gz') as tar_ref:
            tar_ref.extractall(piper_dir)
        archive_path.unlink()

    if not piper_exe.exists():
        # Try to find piper in subdirectories
        print(f"🔍 Searching for piper binary...")
        for file in piper_dir.rglob("piper"):
            if file.is_file():
                piper_exe = file
                print(f"Found at: {piper_exe}")
                break
        if not piper_exe.exists():
            raise FileNotFoundError(f"Piper executable not found in {piper_dir}")

    # Make executable on Unix using shell command
    if not IS_WINDOWS:
        print(f"📝 Setting permissions with chmod...")
        try:
            subprocess.run(["chmod", "+x", str(piper_exe)], check=True)
            subprocess.run(["chmod", "-R", "755", str(piper_dir)], check=False)
            print(f"✓ Permissions set")
        except Exception as e:
            print(f"⚠️ chmod warning: {e}")

    # Verify it's executable
    if not IS_WINDOWS and not os.access(piper_exe, os.X_OK):
        print("⚠️ File still not executable, trying Python chmod...")
        os.chmod(piper_exe, 0o755)

    print(f"✓ Piper ready at {piper_exe}")
    return piper_exe


def setup_model():
    """Download Vietnamese TTS model"""
    MODEL_DIR.mkdir(parents=True, exist_ok=True)

    model_file = MODEL_DIR / f"{MODEL_NAME}.onnx"
    json_file = MODEL_DIR / f"{MODEL_NAME}.onnx.json"

    if model_file.exists() and json_file.exists():
        size_mb = model_file.stat().st_size / 1024 / 1024
        print(f"✓ Model already downloaded ({size_mb:.1f}MB)")
        return model_file

    print("📥 Downloading Vietnamese TTS model (~63MB)...")
    download_file(MODEL_ONNX_URL, model_file)
    download_file(MODEL_JSON_URL, json_file)

    size_mb = model_file.stat().st_size / 1024 / 1024
    print(f"✓ Model ready ({size_mb:.1f}MB)")
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

        print(f"🎤 Generating: {text[:50]}...")

        result = subprocess.run(
            cmd,
            input=text.encode('utf-8'),
            capture_output=True,
            timeout=30
        )

        if result.returncode != 0:
            error_msg = result.stderr.decode()
            print(f"❌ Piper error: {error_msg}")
            return None, f"❌ Error: {error_msg}"

        if not os.path.exists(output_file):
            return None, "❌ Audio file not generated"

        file_size = os.path.getsize(output_file) / 1024
        print(f"✓ Generated {file_size:.1f}KB audio")
        return output_file, f"✅ Generated {file_size:.1f}KB audio"

    except subprocess.TimeoutExpired:
        return None, "❌ Generation timeout (30s)"
    except Exception as e:
        print(f"❌ Error: {e}")
        import traceback
        traceback.print_exc()
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
                    autoplay=True
                )

        gr.Markdown("### 📝 Example Texts")
        gr.Examples(
            examples=examples,
            inputs=text_input,
            label=None
        )

        gr.Markdown(f"""
        ---
        **Platform**: {platform.system()} {platform.machine()}
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
    print(f"Platform: {platform.system()} {platform.machine()}")
    print("=" * 60)

    print("\n📦 Setting up environment...")
    try:
        PIPER_EXE = setup_piper()
        MODEL_FILE = setup_model()
    except Exception as e:
        print(f"\n❌ Setup failed: {e}")
        import traceback
        traceback.print_exc()
        sys.exit(1)

    print("\n🚀 Starting Gradio server...")
    demo = create_ui()
    demo.launch(
        server_name="0.0.0.0",
        share=True,
        show_error=True,
        inbrowser=True
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
