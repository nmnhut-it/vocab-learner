"""Test if HF token has access to Fish Speech V1.5"""
import sys
from pathlib import Path
from huggingface_hub import HfApi

# Fix encoding for Windows
if sys.platform == 'win32':
    sys.stdout.reconfigure(encoding='utf-8')

# Load token
with open("models/hf.key", 'r') as f:
    token = f.read().strip()

print("Testing Fish Speech V1.5 access...")
print(f"Token: {token[:10]}...")

api = HfApi()

try:
    # Try to get model info
    model_info = api.model_info("fishaudio/fish-speech-1.5", token=token)
    print("[OK] Access granted!")
    print(f"[OK] Model: {model_info.modelId}")
    print(f"[OK] License: {model_info.cardData.get('license', 'N/A') if model_info.cardData else 'N/A'}")
    print(f"[OK] Gated: {model_info.gated}")

    if model_info.gated:
        print("\n[WARNING] This is a GATED model")
        print("   You must accept the license at:")
        print("   https://huggingface.co/fishaudio/fish-speech-1.5")
    else:
        print("\n[OK] Ready to download!")

except Exception as e:
    print(f"[ERROR] {e}")
    print("\n[WARNING] You need to:")
    print("   1. Go to: https://huggingface.co/fishaudio/fish-speech-1.5")
    print("   2. Click 'Agree and access repository'")
    print("   3. Accept the license (CC-BY-NC-SA-4.0)")
    print("   4. Run this script again")
