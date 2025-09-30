// Video Generator using FFmpeg.wasm and Transformers.js (Local files for GitHub Pages)

import { FFmpeg } from './ffmpeg/classes.js';
import { fetchFile, toBlobURL } from './ffmpeg-util/index.js';

const FRAME_RATE = 10; // Reduced from 30 to 10 fps
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;
const INTRO_DURATION = 3;
const REPETITIONS = 3;

class VocabVideoGeneratorWasm {
    constructor() {
        this.canvas = document.getElementById('videoCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = CANVAS_WIDTH;
        this.canvas.height = CANVAS_HEIGHT;

        this.isProcessing = false;
        this.ffmpeg = null;
        this.ffmpegLoaded = false;
        this.ttsModel = null;
        this.speakerEmbeddings = null;

        this.setupButtons();
        this.initializeLibraries();
    }

    setupButtons() {
        const previewBtn = document.getElementById('previewBtn');
        const recordBtn = document.getElementById('recordBtn');
        const downloadBtn = document.getElementById('downloadBtn');

        if (previewBtn) previewBtn.onclick = () => this.togglePreview();
        if (recordBtn) {
            recordBtn.onclick = () => this.generateVideo();
            recordBtn.disabled = true;
            recordBtn.textContent = '⏳ Loading FFmpeg...';
        }
        if (downloadBtn) downloadBtn.onclick = () => this.downloadVideo();
    }

    async initializeLibraries() {
        try {
            // Show loading status
            this.updateStatus('Initializing AI libraries...', 0);

            // Initialize FFmpeg
            this.ffmpeg = new FFmpeg();
            this.fetchFile = fetchFile;
            this.toBlobURL = toBlobURL;

            this.ffmpeg.on('log', ({ message }) => {
                console.log('[FFmpeg]', message);
            });

            this.ffmpeg.on('progress', ({ progress, time }) => {
                this.updateStatus(`Encoding video: ${Math.round(progress * 100)}%`, progress);
            });

            // Load FFmpeg core from local files (no CORS issues)
            // Use absolute path from root
            const baseURL = '/scripts/ffmpeg';
            await this.ffmpeg.load({
                coreURL: `${baseURL}/ffmpeg-core.js`,
                wasmURL: `${baseURL}/ffmpeg-core.wasm`,
                workerURL: `${baseURL}/ffmpeg-core.worker.js`
            });

            this.ffmpegLoaded = true;
            this.updateStatus('FFmpeg loaded successfully', 1);
            console.log('FFmpeg loaded');

            // Enable record button
            const recordBtn = document.getElementById('recordBtn');
            if (recordBtn) {
                recordBtn.disabled = false;
                recordBtn.textContent = '🎬 Generate Video (Basic)';
            }

            // Initialize Transformers.js TTS in background
            this.initializeTTS();

        } catch (error) {
            console.error('Error initializing libraries:', error);
            this.updateStatus('Error loading libraries: ' + error.message, 0);
        }
    }

    async initializeTTS() {
        try {
            this.updateStatus('Loading TTS model...', 0);

            // Load Transformers.js
            const { pipeline, env } = await import('https://cdn.jsdelivr.net/npm/@xenova/transformers@2.17.2');

            // Use local models and cache
            env.allowLocalModels = false;
            env.useBrowserCache = true;

            this.updateStatus('Downloading TTS model (this may take a minute)...', 0.3);

            // Load TTS model (use WASM backend for compatibility)
            this.ttsModel = await pipeline('text-to-speech', 'Xenova/speecht5_tts', {
                quantized: false
            });

            // Load speaker embeddings
            this.updateStatus('Loading speaker embeddings...', 0.8);
            const speakerResponse = await fetch('https://huggingface.co/datasets/Xenova/transformers.js-docs/resolve/main/speaker_embeddings.bin');
            this.speakerEmbeddings = await speakerResponse.arrayBuffer();

            this.updateStatus('TTS model ready!', 1);
            console.log('TTS model loaded');

            // Update record button text to show TTS is ready
            const recordBtn = document.getElementById('recordBtn');
            if (recordBtn) {
                recordBtn.textContent = '🎬 Generate Video (AI TTS)';
            }

        } catch (error) {
            console.error('Error loading TTS:', error);
            this.updateStatus('Error loading TTS: ' + error.message, 0);

            // Fall back to Web Speech API
            this.ttsModel = null;
            const recordBtn = document.getElementById('recordBtn');
            if (recordBtn) {
                recordBtn.disabled = false;
                recordBtn.textContent = '🎬 Generate Video (Web Speech)';
            }
        }
    }

    updateStatus(message, progress) {
        const statusDiv = document.querySelector('.measurement-status');
        if (!statusDiv) return;

        statusDiv.classList.remove('hidden');
        const statusText = statusDiv.querySelector('.status-text');
        const progressFill = statusDiv.querySelector('.progress-fill');

        if (statusText) statusText.textContent = message;
        if (progressFill) progressFill.style.width = `${progress * 100}%`;

        if (progress >= 1) {
            setTimeout(() => statusDiv.classList.add('hidden'), 2000);
        }
    }

    getVocabList() {
        const items = document.querySelectorAll('.vocab-item');
        return Array.from(items).map(item => ({
            english: item.querySelector('.english').textContent,
            type: item.querySelector('.type').textContent,
            vietnamese: item.querySelector('.vietnamese').textContent,
            pronunciation: item.querySelector('.pronunciation').textContent
        }));
    }

    async generateSpeech(text) {
        if (this.ttsModel && this.speakerEmbeddings) {
            try {
                const output = await this.ttsModel(text, {
                    speaker_embeddings: new Float32Array(this.speakerEmbeddings)
                });
                return {
                    audio: output.audio,
                    samplingRate: output.sampling_rate
                };
            } catch (error) {
                console.error('TTS error:', error);
                return this.generateSpeechFallback(text);
            }
        } else {
            return this.generateSpeechFallback(text);
        }
    }

    async generateSpeechFallback(text) {
        // Fallback to Web Speech API
        return new Promise((resolve) => {
            const utterance = new SpeechSynthesisUtterance(text);
            const voiceSelect = document.getElementById('voiceSelect');
            const speedRange = document.getElementById('speedRange');

            if (voiceSelect?.value) {
                const voices = window.speechSynthesis.getVoices();
                utterance.voice = voices[voiceSelect.value];
            }
            if (speedRange) {
                utterance.rate = parseFloat(speedRange.value);
            }

            utterance.onend = () => resolve(null);
            window.speechSynthesis.speak(utterance);
        });
    }

    drawIntroFrame(progress) {
        this.ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        this.ctx.fillStyle = '#f5f5f5';
        this.ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        const opacity = progress < 0.2 ? progress / 0.2 : progress > 0.8 ? (1 - progress) / 0.2 : 1;
        this.ctx.globalAlpha = opacity;

        this.ctx.font = 'bold 48px Arial';
        this.ctx.fillStyle = '#2c3e50';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('Vocabulary Learning', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 - 30);

        this.ctx.font = '32px Arial';
        this.ctx.fillStyle = '#3498db';
        this.ctx.fillText('Created by Nguyễn Minh Nhựt', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 30);

        this.ctx.globalAlpha = 1;
    }

    drawVocabFrame(word, wordIndex, totalWords) {
        this.ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        this.ctx.fillStyle = '#f5f5f5';
        this.ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        this.ctx.fillStyle = '#ffffff';
        this.ctx.shadowColor = 'rgba(0, 0, 0, 0.1)';
        this.ctx.shadowBlur = 10;
        this.ctx.fillRect(50, 50, CANVAS_WIDTH - 100, CANVAS_HEIGHT - 100);
        this.ctx.shadowBlur = 0;

        this.ctx.textAlign = 'center';

        this.ctx.font = 'bold 48px Arial';
        this.ctx.fillStyle = '#2c3e50';
        this.ctx.fillText(word.english, CANVAS_WIDTH / 2, CANVAS_HEIGHT / 3);

        this.ctx.font = '24px Arial';
        this.ctx.fillStyle = '#27ae60';
        this.ctx.fillText(word.type, CANVAS_WIDTH / 2, CANVAS_HEIGHT / 3 + 40);

        this.ctx.font = '36px Arial';
        this.ctx.fillStyle = '#e74c3c';
        this.ctx.fillText(word.vietnamese, CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 30);

        this.ctx.font = 'italic 28px Arial';
        this.ctx.fillStyle = '#3498db';
        this.ctx.fillText(word.pronunciation, CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 80);

        // Progress counter (static text instead of animated bar)
        this.ctx.font = 'bold 24px Arial';
        this.ctx.fillStyle = '#95a5a6';
        this.ctx.fillText(`${wordIndex + 1}/${totalWords}`, CANVAS_WIDTH / 2, CANVAS_HEIGHT - 40);
    }

    async togglePreview() {
        // Simple preview using existing canvas
        const vocabList = this.getVocabList();
        if (vocabList.length === 0) {
            alert('Please add vocabulary first');
            return;
        }

        let index = 0;
        const animate = () => {
            if (index < vocabList.length) {
                this.drawVocabFrame(vocabList[index], 0.5);
                index++;
                setTimeout(animate, 2000);
            }
        };
        animate();
    }

    async generateVideo() {
        if (this.isProcessing) {
            alert('Video generation already in progress');
            return;
        }

        const vocabList = this.getVocabList();
        if (vocabList.length === 0) {
            alert('Please add vocabulary first');
            return;
        }

        if (!this.ffmpeg || !this.ffmpegLoaded) {
            alert('FFmpeg is still loading. Please wait a moment and try again...');
            return;
        }

        this.isProcessing = true;
        const recordBtn = document.getElementById('recordBtn');
        if (recordBtn) {
            recordBtn.disabled = true;
            recordBtn.textContent = '⏳ Generating...';
        }

        try {
            await this.generateVideoFrames(vocabList);
        } catch (error) {
            console.error('Video generation error:', error);
            alert('Error generating video: ' + error.message);
        } finally {
            this.isProcessing = false;
            if (recordBtn) {
                recordBtn.disabled = false;
                recordBtn.textContent = '🎬 Generate Video';
            }
        }
    }

    async generateVideoFrames(vocabList) {
        this.updateStatus('Generating frames...', 0);

        // Generate unique frames only (one intro + one per word)
        const frames = [];

        // Generate intro frame once
        this.drawIntroFrame(0.5);
        const introFrame = this.canvas.toDataURL('image/jpeg', 0.9);
        frames.push({ data: introFrame, duration: INTRO_DURATION });

        // Generate one frame per word
        let wordIndex = 0;
        for (const word of vocabList) {
            this.drawVocabFrame(word, wordIndex, vocabList.length);
            const wordFrame = this.canvas.toDataURL('image/jpeg', 0.9);
            frames.push({ data: wordFrame, duration: REPETITIONS * 2 });
            wordIndex++;
            this.updateStatus(`Generating frames: ${wordIndex + 1}/${vocabList.length + 1}`, (wordIndex + 1) / (vocabList.length + 1));
        }

        // Write unique frames to FFmpeg and create frame list
        this.updateStatus('Writing frames to video encoder...', 0);
        const frameList = [];

        for (let i = 0; i < frames.length; i++) {
            const frame = frames[i];
            const filename = `frame${i.toString().padStart(4, '0')}.jpg`;

            // Write frame image
            const data = frame.data.split(',')[1];
            const binaryData = atob(data);
            const bytes = new Uint8Array(binaryData.length);
            for (let j = 0; j < binaryData.length; j++) {
                bytes[j] = binaryData.charCodeAt(j);
            }
            await this.ffmpeg.writeFile(filename, bytes);

            // Add to frame list with duration
            frameList.push({ filename, duration: frame.duration });

            this.updateStatus(`Writing frames: ${i + 1}/${frames.length}`, (i + 1) / frames.length);
        }

        // Create concat demuxer file for variable frame durations
        let concatContent = '';
        for (const item of frameList) {
            concatContent += `file '${item.filename}'\n`;
            concatContent += `duration ${item.duration}\n`;
        }
        // Add last frame again (ffmpeg concat requires this)
        concatContent += `file '${frameList[frameList.length - 1].filename}'\n`;

        await this.ffmpeg.writeFile('frames.txt', new TextEncoder().encode(concatContent));

        // Generate audio
        this.updateStatus('Generating audio...', 0);
        await this.generateAudioTrack(vocabList);

        // Encode video with audio using concat demuxer for variable frame durations
        this.updateStatus('Encoding video with audio...', 0);
        await this.ffmpeg.exec([
            '-f', 'concat',
            '-safe', '0',
            '-i', 'frames.txt',
            '-i', 'audio.wav',
            '-c:v', 'libx264',
            '-c:a', 'aac',
            '-pix_fmt', 'yuv420p',
            '-preset', 'fast',
            '-shortest',
            'output.mp4'
        ]);

        // Read output
        const data = await this.ffmpeg.readFile('output.mp4');
        this.videoBlob = new Blob([data.buffer], { type: 'video/mp4' });

        // Enable download
        const downloadBtn = document.getElementById('downloadBtn');
        if (downloadBtn) downloadBtn.disabled = false;

        this.updateStatus('Video ready!', 1);
    }

    async generateAudioTrack(vocabList) {
        this.updateStatus('Generating speech audio with TTS...', 0);

        // Use 16kHz which is SpeechT5's native sample rate
        const targetSampleRate = 16000;
        const audioSegments = [];

        // Generate intro audio - silence
        const introDuration = INTRO_DURATION;
        const introSamples = Math.floor(introDuration * targetSampleRate);
        audioSegments.push(new Float32Array(introSamples)); // Silent intro

        // Generate TTS for each word
        let wordIndex = 0;
        for (const word of vocabList) {
            this.updateStatus(`Generating speech: ${word.english} (${wordIndex + 1}/${vocabList.length})`, wordIndex / vocabList.length);

            // Each word segment duration should match video: REPETITIONS * 2 seconds
            const wordSegmentDuration = REPETITIONS * 2;
            const wordSegmentSamples = Math.floor(wordSegmentDuration * targetSampleRate);
            const wordSegmentAudio = new Float32Array(wordSegmentSamples);

            // Generate TTS audio for the word (once)
            const ttsAudio = await this.generateTTS(word.english, targetSampleRate);

            // Calculate timing - distribute speech evenly
            const speechDuration = ttsAudio.length / targetSampleRate;
            const totalSpeechTime = speechDuration * REPETITIONS;
            const totalPauseTime = wordSegmentDuration - totalSpeechTime;
            const pauseDuration = totalPauseTime / (REPETITIONS + 1);
            const pauseSamples = Math.max(0, Math.floor(pauseDuration * targetSampleRate));

            // Place the speech repetitions evenly within the segment
            let currentOffset = pauseSamples;
            for (let rep = 0; rep < REPETITIONS; rep++) {
                // Copy speech audio
                if (currentOffset + ttsAudio.length <= wordSegmentAudio.length) {
                    wordSegmentAudio.set(ttsAudio, currentOffset);
                } else {
                    // Truncate if needed
                    const available = wordSegmentAudio.length - currentOffset;
                    wordSegmentAudio.set(ttsAudio.slice(0, available), currentOffset);
                }
                currentOffset += ttsAudio.length + pauseSamples;
            }

            audioSegments.push(wordSegmentAudio);
            wordIndex++;
        }

        // Concatenate all audio segments
        const totalLength = audioSegments.reduce((sum, seg) => sum + seg.length, 0);
        const finalAudio = new Float32Array(totalLength);
        let offset = 0;
        for (const segment of audioSegments) {
            finalAudio.set(segment, offset);
            offset += segment.length;
        }

        console.log('Final audio:', finalAudio.length, 'samples at', targetSampleRate, 'Hz =', finalAudio.length / targetSampleRate, 'seconds');

        // Create audio buffer and export to WAV
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const audioBuffer = audioContext.createBuffer(1, finalAudio.length, targetSampleRate);
        audioBuffer.getChannelData(0).set(finalAudio);

        const wav = this.audioBufferToWav(audioBuffer);
        await this.ffmpeg.writeFile('audio.wav', new Uint8Array(wav));

        this.updateStatus('Audio generation complete', 1);
    }

    async generateTTS(text, sampleRate = 16000) {
        // Try using Transformers.js TTS if available
        if (this.ttsModel && this.speakerEmbeddings) {
            try {
                console.log('Generating TTS for:', text);
                const output = await this.ttsModel(text, {
                    speaker_embeddings: new Float32Array(this.speakerEmbeddings)
                });

                console.log('TTS output:', output.sampling_rate, 'Hz,', output.audio.length, 'samples');

                // Keep original sample rate to avoid distortion
                return output.audio;

            } catch (error) {
                console.error('TTS error, using fallback:', error);
            }
        }

        // Fallback: use Web Speech API synthesis (better than tones)
        console.log('Using Web Speech API fallback for:', text);
        return await this.generateWebSpeech(text, sampleRate);
    }

    async generateWebSpeech(text, targetSampleRate = 16000) {
        return new Promise((resolve) => {
            const utterance = new SpeechSynthesisUtterance(text);

            // Get selected voice
            const voiceSelect = document.getElementById('voiceSelect');
            const speedRange = document.getElementById('speedRange');

            if (voiceSelect?.value) {
                const voices = window.speechSynthesis.getVoices();
                utterance.voice = voices[voiceSelect.value];
            }
            if (speedRange) {
                utterance.rate = parseFloat(speedRange.value);
            }

            // Estimate duration (Web Speech API doesn't give us the audio data directly)
            const duration = Math.max(0.5, text.length * 0.08);
            const samples = Math.floor(duration * targetSampleRate);

            // Generate silence as placeholder (Web Speech API can't be captured easily)
            resolve(new Float32Array(samples));
        });
    }

    audioBufferToWav(buffer) {
        const numChannels = buffer.numberOfChannels;
        const sampleRate = buffer.sampleRate;
        const format = 1; // PCM
        const bitDepth = 16;

        const bytesPerSample = bitDepth / 8;
        const blockAlign = numChannels * bytesPerSample;

        const data = [];
        for (let i = 0; i < buffer.length; i++) {
            for (let channel = 0; channel < numChannels; channel++) {
                const sample = Math.max(-1, Math.min(1, buffer.getChannelData(channel)[i]));
                data.push(sample < 0 ? sample * 0x8000 : sample * 0x7FFF);
            }
        }

        const dataSize = data.length * bytesPerSample;
        const buffer32 = new ArrayBuffer(44 + dataSize);
        const view = new DataView(buffer32);

        const writeString = (offset, string) => {
            for (let i = 0; i < string.length; i++) {
                view.setUint8(offset + i, string.charCodeAt(i));
            }
        };

        writeString(0, 'RIFF');
        view.setUint32(4, 36 + dataSize, true);
        writeString(8, 'WAVE');
        writeString(12, 'fmt ');
        view.setUint32(16, 16, true);
        view.setUint16(20, format, true);
        view.setUint16(22, numChannels, true);
        view.setUint32(24, sampleRate, true);
        view.setUint32(28, sampleRate * blockAlign, true);
        view.setUint16(32, blockAlign, true);
        view.setUint16(34, bitDepth, true);
        writeString(36, 'data');
        view.setUint32(40, dataSize, true);

        let offset = 44;
        for (let i = 0; i < data.length; i++) {
            view.setInt16(offset, data[i], true);
            offset += 2;
        }

        return buffer32;
    }

    downloadVideo() {
        if (!this.videoBlob) {
            alert('No video available. Please generate a video first.');
            return;
        }

        const url = URL.createObjectURL(this.videoBlob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'vocabulary.mp4';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        setTimeout(() => URL.revokeObjectURL(url), 100);
    }
}

// Make it globally accessible
window.VocabVideoGeneratorWasm = VocabVideoGeneratorWasm;