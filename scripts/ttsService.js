// Shared TTS Service using Transformers.js SpeechT5
// Provides high-quality text-to-speech for list view, flashcards, and video generation

class TTSService {
    constructor() {
        this.ttsModel = null;
        this.speakerEmbeddings = null;
        this.isLoading = false;
        this.isLoaded = false;
        this.loadError = null;
        this.audioCache = new Map(); // Cache generated audio
    }

    async initialize() {
        if (this.isLoaded) return true;
        if (this.isLoading) {
            // Wait for ongoing initialization
            return new Promise((resolve) => {
                const checkInterval = setInterval(() => {
                    if (this.isLoaded || this.loadError) {
                        clearInterval(checkInterval);
                        resolve(this.isLoaded);
                    }
                }, 100);
            });
        }

        this.isLoading = true;

        try {
            console.log('Initializing Transformers.js TTS...');

            // Load Transformers.js
            const { pipeline, env } = await import('https://cdn.jsdelivr.net/npm/@xenova/transformers@2.17.2');

            // Configure to use WASM backend for better compatibility
            env.backends.onnx.wasm.proxy = false;

            // Load TTS model
            this.ttsModel = await pipeline('text-to-speech', 'Xenova/speecht5_tts', {
                quantized: false,
                device: 'wasm'
            });

            // Load speaker embeddings
            const embeddingsUrl = 'https://huggingface.co/datasets/Xenova/transformers.js-docs/resolve/main/speaker_embeddings.bin';
            const response = await fetch(embeddingsUrl);
            const buffer = await response.arrayBuffer();
            this.speakerEmbeddings = new Float32Array(buffer);

            this.isLoaded = true;
            this.isLoading = false;
            console.log('TTS model loaded successfully');
            return true;

        } catch (error) {
            console.error('Failed to initialize TTS:', error);
            this.loadError = error;
            this.isLoading = false;
            this.isLoaded = false;
            return false;
        }
    }

    async speak(text, options = {}) {
        const {
            useCache = true,
            onStart = null,
            onEnd = null,
            onError = null
        } = options;

        try {
            // Check if TTS is loaded
            if (!this.isLoaded) {
                const initialized = await this.initialize();
                if (!initialized) {
                    throw new Error('TTS not available - falling back to browser TTS');
                }
            }

            // Check cache
            const cacheKey = text.toLowerCase().trim();
            if (useCache && this.audioCache.has(cacheKey)) {
                const audioData = this.audioCache.get(cacheKey);
                await this.playAudio(audioData, onStart, onEnd);
                return;
            }

            // Generate speech
            if (onStart) onStart();

            const output = await this.ttsModel(text, {
                speaker_embeddings: this.speakerEmbeddings
            });

            // Cache the audio data
            if (useCache) {
                this.audioCache.set(cacheKey, output.audio);
            }

            // Play audio
            await this.playAudio(output.audio, null, onEnd);

        } catch (error) {
            console.error('TTS error:', error);
            if (onError) onError(error);
            throw error;
        }
    }

    async playAudio(audioData, onStart, onEnd) {
        return new Promise((resolve, reject) => {
            try {
                // Create audio context
                const audioContext = new (window.AudioContext || window.webkitAudioContext)();
                const sampleRate = 16000; // SpeechT5 native sample rate

                // Create audio buffer
                const audioBuffer = audioContext.createBuffer(
                    1,
                    audioData.length,
                    sampleRate
                );

                audioBuffer.copyToChannel(audioData, 0);

                // Create source and connect to destination
                const source = audioContext.createBufferSource();
                source.buffer = audioBuffer;
                source.connect(audioContext.destination);

                if (onStart) onStart();

                source.onended = () => {
                    if (onEnd) onEnd();
                    audioContext.close();
                    resolve();
                };

                source.start();

            } catch (error) {
                reject(error);
            }
        });
    }

    // Stop any currently playing audio
    stop() {
        // Note: We can't easily stop AudioContext playback once started
        // This would require tracking source nodes
        console.log('Stop requested - TTS will finish current utterance');
    }

    // Clear audio cache
    clearCache() {
        this.audioCache.clear();
    }

    // Get cache size
    getCacheSize() {
        return this.audioCache.size;
    }
}

// Create singleton instance
window.ttsService = new TTSService();