# Model Files

This directory contains AI model files for the vocabulary learner.

## Download Models

Download the TTS model files locally:

```bash
node scripts/downloadModel.js
```

This will download **~645MB** of full precision model files:
- `speecht5_tts` (~587MB) - Main TTS model (fp32)
- `speecht5_hifigan` (~55MB) - Vocoder model (fp32)
- `speaker_embeddings` (~3MB) - Speaker voice characteristics

**Note**: Full precision models provide the **best audio quality** but are larger than quantized versions.

No dependencies needed - uses native Node.js fetch!

## Why Download Locally?

- **Faster loading**: Load from disk instead of downloading every time
- **Offline support**: Work without internet connection
- **Best quality**: Full precision (fp32) for natural-sounding speech
- **Browser cache**: Models cache automatically, but local files are more reliable

## File Structure

```
models/
└── Xenova/
    ├── speecht5_tts/
    │   ├── config.json
    │   ├── tokenizer.json
    │   ├── spm_char.model
    │   └── onnx/
    │       ├── encoder_model.onnx (343 MB)
    │       └── decoder_model_merged.onnx (244 MB)
    ├── speecht5_hifigan/
    │   ├── config.json
    │   └── onnx/
    │       └── model.onnx (55.4 MB)
    └── speaker_embeddings/
        └── speaker_embeddings.bin (3 MB)
```

## Note

Large `.onnx` files are excluded from git (see `.gitignore`). Only configuration files are tracked.
