# IELTS Module 3 TTS Audio Generator

Generate high-quality audio for all 10 IELTS Speaking Part 2 sample answers.

## 🎯 Quick Start - Choose Your Method

### ⭐ Option 1: Edge TTS (RECOMMENDED - Easiest)
**Pros:** Instant setup, excellent quality, free, no token needed
**Cons:** Requires internet

```bash
pip install edge-tts
python generate_tts_module3.py
```

**Output:** 10 MP3 files in `audio/module3-samples/`

---

### 🚀 Option 2: HF Inference API (Good Quality, Uses Your Token)
**Pros:** Uses your HF token, decent quality, no downloads
**Cons:** API limits, may need to wait for model loading

```bash
pip install requests
python generate_tts_simple.py
```

**Output:** 10 WAV files in `audio/module3-samples/`

---

### 🏆 Option 3: Fish Speech V1.5 Local (Best Quality - Complex)
**Pros:** SOTA quality, full control
**Cons:** Complex setup, 2-4GB download

```bash
# Install Fish Speech
git clone https://github.com/fishaudio/fish-speech.git
cd fish-speech
pip install -e .

# Run script
python generate_tts_fish_speech.py
```

**Note:** This requires additional setup. See script for details.

---

## 📊 Comparison

| Method | Quality | Speed | Setup | Internet | Cost |
|--------|---------|-------|-------|----------|------|
| **Edge TTS** | ⭐⭐⭐⭐ | Fast | Easy | Required | Free |
| **HF API** | ⭐⭐⭐ | Medium | Easy | Required | Free (with limits) |
| **Fish Speech** | ⭐⭐⭐⭐⭐ | Slow | Complex | Once | Free |

## 🎤 Sample Answers Included

1. Describe a time when you helped someone
2. Describe an important decision you made
3. Describe a person who has influenced you
4. Describe a friend you have had for a long time
5. Describe a place you like to visit
6. Describe your favorite book
7. Describe a skill you would like to learn
8. Describe a piece of technology you find useful
9. Describe a goal you have
10. Describe an app you use on your phone

## 💡 My Recommendation

**Start with Edge TTS** (`generate_tts_module3.py`):
- Works immediately
- Excellent quality (Microsoft Neural voices)
- Multiple voice options available
- No setup hassle

## 🔧 Troubleshooting

**"No module named 'edge_tts'"**
```bash
pip install edge-tts
```

**"No module named 'requests'"**
```bash
pip install requests
```

**HF Token issues:**
- Check `models/hf.key` exists
- Token should start with `hf_`
- Get token from: https://huggingface.co/settings/tokens

## 📁 Output Structure

```
audio/module3-samples/
├── 01-Describe-a-time-when-you-helped-someone.mp3
├── 02-Describe-an-important-decision-you-made.mp3
├── ...
└── metadata.json (file info, word counts, etc.)
```

## 🎵 Converting WAV to MP3

If you use the HF API (WAV output), convert to MP3:

```bash
# Install ffmpeg first
# Then batch convert:
for file in audio/module3-samples/*.wav; do
    ffmpeg -i "$file" -codec:a libmp3lame -qscale:a 2 "${file%.wav}.mp3"
done
```

## 🌟 Next Steps

After generating audio:
1. Check `audio/module3-samples/` folder
2. Test audio quality
3. Use in your IELTS app
4. Optional: Integrate Kokoro-82M ONNX for browser real-time TTS
