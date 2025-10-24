#!/usr/bin/env python3
"""
Vietnamese TTS using Facebook MMS + Gradio
Uses Transformers library - works perfectly on Colab
No binary permissions issues!
"""

import torch
import gradio as gr
import scipy.io.wavfile
import tempfile
import os
from pathlib import Path

# Global variables for model
model = None
tokenizer = None
MODEL_NAME = "facebook/mms-tts-vie"


def load_model():
    """Load MMS Vietnamese TTS model"""
    global model, tokenizer

    if model is not None:
        print("✓ Model already loaded")
        return

    print(f"📥 Loading {MODEL_NAME}...")

    from transformers import VitsModel, AutoTokenizer

    tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)
    model = VitsModel.from_pretrained(MODEL_NAME)

    # Move to GPU if available
    device = "cuda" if torch.cuda.is_available() else "cpu"
    model = model.to(device)

    print(f"✓ Model loaded on {device}")


def generate_speech(text):
    """Generate Vietnamese speech from text"""
    if not text or not text.strip():
        return None, "⚠️ Please enter some text"

    try:
        print(f"🎤 Generating: {text[:50]}...")

        # Tokenize input
        inputs = tokenizer(text, return_tensors="pt")

        # Move to same device as model
        device = next(model.parameters()).device
        inputs = {k: v.to(device) for k, v in inputs.items()}

        # Set seed for reproducibility
        torch.manual_seed(42)

        # Generate speech with reduced noise for better word preservation
        with torch.no_grad():
            output = model(
                **inputs,
                noise_scale=0.3,  # Lower = less randomness, fewer skipped words
                noise_scale_duration=0.5  # Lower = more stable durations
            ).waveform

        # Move to CPU and convert to numpy
        waveform = output.cpu().squeeze().numpy()

        # Save to temporary file
        with tempfile.NamedTemporaryFile(suffix=".wav", delete=False) as tmp:
            output_file = tmp.name

        # Write WAV file
        sample_rate = model.config.sampling_rate
        scipy.io.wavfile.write(output_file, rate=sample_rate, data=waveform)

        file_size = os.path.getsize(output_file) / 1024
        print(f"✓ Generated {file_size:.1f}KB audio")

        return output_file, f"✅ Generated {file_size:.1f}KB audio at {sample_rate}Hz"

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
        ["Âm nhạc Việt Nam rất hay và đa dạng."],
        ["Chúng tôi sẽ đi du lịch vào mùa hè này."],
    ]

    with gr.Blocks(
        title="Vietnamese TTS - Facebook MMS",
        theme=gr.themes.Soft(primary_hue="purple")
    ) as demo:

        gr.Markdown("""
        # 🇻🇳 Vietnamese Text-to-Speech
        ### Facebook MMS Model - Free & High Quality
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

        gr.Markdown("### 📝 Example Texts (click to use)")
        gr.Examples(
            examples=examples,
            inputs=text_input,
            label=None
        )

        device_info = "🎮 GPU" if torch.cuda.is_available() else "💻 CPU"

        gr.Markdown(f"""
        ---
        **Model**: {MODEL_NAME}
        **Architecture**: VITS (Facebook MMS)
        **Language**: Vietnamese (vi-VN)
        **Device**: {device_info}
        **Quality**: High (16kHz)
        """)

        generate_btn.click(
            fn=generate_speech,
            inputs=text_input,
            outputs=[audio_output, status_output]
        )

    return demo


def main():
    print("=" * 60)
    print("Vietnamese TTS - Facebook MMS")
    print("=" * 60)

    # Check dependencies
    try:
        from transformers import VitsModel, AutoTokenizer
        import scipy
    except ImportError as e:
        print(f"\n❌ Missing dependency: {e}")
        print("\nInstall with:")
        print("  pip install transformers torch scipy gradio")
        return

    print("\n📦 Loading model...")
    try:
        load_model()
    except Exception as e:
        print(f"\n❌ Failed to load model: {e}")
        import traceback
        traceback.print_exc()
        return

    print("\n🚀 Starting Gradio server...")
    demo = create_ui()
    demo.launch(
        server_name="0.0.0.0",
        share=True,
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
