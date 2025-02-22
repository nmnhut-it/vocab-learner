class VocabVideoGenerator {
    constructor() {
        this.canvas = document.getElementById('videoCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = 800;
        this.canvas.height = 600;
        this.mediaRecorder = null;
        this.recordedChunks = [];
        this.isRecording = false;
        this.isPreviewing = false;
        this.currentWordIndex = 0;
        this.startTime = null;
        this.animationFrame = null;

        // Audio-related properties
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        this.audioDestination = this.audioContext.createMediaStreamDestination();
        this.synth = window.speechSynthesis;
        this.currentUtterance = null;
        this.audioTracks = [];

        // New audio elements
        this.introSound = new Audio('/sound/heyo-vocabulary.mp3');
        this.tinkSound = new Audio('/sound/tink.mp3');

        // State management
        this.isIntroPlaying = true;
        this.repetitionCount = 0;
        this.pronunciationDuration = 0;
        this.lastPronunciationEnd = 0;

        this.pronunciationDurations = new Map();
        // Add new properties for status tracking
        this.measurementStatus = {
            isProcessing: false,
            processedCount: 0,
            totalCount: 0
        };


        this.setupButtons();
        this.initializeStatusUI();
        // console.log("VocabVideoGenerator", "constructor");

    }
    setupButtons() {
        document.getElementById('previewBtn').onclick = () => this.togglePreview();
        document.getElementById('recordBtn').onclick = () => this.toggleRecording();
        document.getElementById('downloadBtn').onclick = () => this.downloadVideo();
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

    speakWord(text, volume = 1) {
        return new Promise((resolve) => {
            this.currentUtterance = new SpeechSynthesisUtterance(text);

            const voiceSelect = document.getElementById('voiceSelect');
            const speedRange = document.getElementById('speedRange');

            if (voiceSelect.value) {
                this.currentUtterance.voice = this.synth.getVoices()[voiceSelect.value];
            }
            this.currentUtterance.volume = volume;

            this.currentUtterance.rate = parseFloat(speedRange.value);
            this.currentUtterance.onend = () => {
                this.lastPronunciationEnd = performance.now();
                resolve();
            };

            this.currentUtterance.onerror = (error) => {
                console.error("Speech error for:", text, error);
                resolve();  // Resolve even on error
            };

            this.synth.speak(this.currentUtterance);
        });
    }
    async measurePronunciationDuration(text) {
        // console.log("Starting measurement for:", text);
        const startTime = performance.now();
        await this.speakWord(text, 0); // Use existing speakWord with volume 0
        const duration = performance.now() - startTime;
        // console.log("Measurement completed for:", text, "Duration:", duration);
        return duration;
    }
    // New method to measure all pronunciations in parallel
    initializeStatusUI() {
        // Remove any existing status UI
        const existingStatus = document.querySelector('.measurement-status');
        if (existingStatus) {
            existingStatus.remove();
        }

        // Create status container above the video controls
        const videoControls = document.querySelector('.video-controls');

        const statusDiv = document.createElement('div');
        statusDiv.className = 'measurement-status hidden';
        statusDiv.innerHTML = `
            <div class="status-message">
                <span class="status-text">Measuring pronunciations: </span>
                <span class="progress">0/0</span>
            </div>
            <div class="progress-bar">
                <div class="progress-fill"></div>
            </div>
        `;


        const convertBtn = document.getElementById('convertBtn');
        convertBtn.parentNode.insertBefore(statusDiv, convertBtn);

        // Add styles if not already present
        if (!document.querySelector('#measurement-status-styles')) {
            const style = document.createElement('style');
            style.id = 'measurement-status-styles';
            style.textContent = `
                .measurement-status {
                    margin: 10px 0;
                    padding: 10px;
                    background: #f8f9fa;
                    border-radius: 5px;
                    font-size: 14px;
                    transition: opacity 0.3s ease;
                }
                .measurement-status.hidden {
                    opacity: 0;
                    pointer-events: none;
                }
                .progress-bar {
                    margin-top: 5px;
                    height: 4px;
                    background: #e9ecef;
                    border-radius: 2px;
                    overflow: hidden;
                }
                .progress-fill {
                    height: 100%;
                    background: #3498db;
                    width: 0%;
                    transition: width 0.3s ease;
                }
                .status-message {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
            `;
            document.head.appendChild(style);
        }
    }

    updateMeasurementStatus() {
        const statusDiv = document.querySelector('.measurement-status');
        if (!statusDiv) return;

        if (this.measurementStatus.isProcessing) {
            statusDiv.classList.remove('hidden');

            const progressSpan = statusDiv.querySelector('.progress');
            const progressFill = statusDiv.querySelector('.progress-fill');
            const statusText = statusDiv.querySelector('.status-text');

            if (this.measurementStatus.error) {
                statusText.textContent = 'Error measuring pronunciations: ';
                progressSpan.textContent = this.measurementStatus.error;
                progressFill.style.background = '#e74c3c';
                return;
            }

            progressSpan.textContent =
                `${this.measurementStatus.processedCount}/${this.measurementStatus.totalCount}`;

            const percentage =
                (this.measurementStatus.processedCount / this.measurementStatus.totalCount) * 100;
            progressFill.style.width = `${percentage}%`;

            if (this.measurementStatus.processedCount === this.measurementStatus.totalCount) {
                // Auto-hide after completion
                setTimeout(() => {
                    this.hideMeasurementStatus();
                }, 1000);
            }
        } else {
            statusDiv.classList.add('hidden');
        }
    }

    hideMeasurementStatus() {
        this.measurementStatus = {
            isProcessing: false,
            processedCount: 0,
            totalCount: 0
        };
        this.updateMeasurementStatus();

    }

    async measureAllPronunciations() {
        if (this.measurementStatus.isProcessing || this.pronunciationDurations.size > 0) {
            return;
        }

        const vocabList = this.getVocabList();
        if (vocabList.length === 0) {
            return;
        }

        this.measurementStatus = {
            isProcessing: true,
            processedCount: 0,
            totalCount: vocabList.length,
            error: null
        };

        this.updateMeasurementStatus();

        try {
            // console.log("measureAllPronunciations", vocabList);
            const batchSize = 1; // Process one word at a time to avoid audio conflicts
            const queue = vocabList.map((word, index) => ({ word, index }));

            while (queue.length > 0) {
                const batch = queue.splice(0, batchSize);
                await Promise.all(batch.map(async ({ word, index }) => {
                    try {
                        // console.log("measureAllPronunciations", word);
                        if (!this.pronunciationDurations.has(index)) {
                            try {
                                // console.log("measureAllPronunciation #1", word);
                                const duration = await this.measurePronunciationDuration(word.english);
                                this.pronunciationDurations.set(index, duration);
                                // console.log(`Measured duration for "${word.english}":`, duration);
                            }
                            catch (ean) {
                                console.error(ean);
                            }

                            this.measurementStatus.processedCount++;
                            this.updateMeasurementStatus();
                        }
                        else {
                            // console.log(`Already have duration for "${word.english}"`);
                        }
                    } catch (error) {
                        console.error(`Error measuring word: ${word.english}`, error);
                    }
                }));
            }
        } catch (error) {
            this.measurementStatus.error = error.message;
            console.error('Error in pronunciation measurement:', error);
        } finally {
            this.measurementStatus.isProcessing = false;
            this.updateMeasurementStatus();
        }
    }

    drawIntroFrame(progress) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Background
        this.ctx.fillStyle = '#f5f5f5';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Fade effect
        const opacity = progress < 0.2 ? progress / 0.2 :
            progress > 0.8 ? (1 - progress) / 0.2 :
                1;
        this.ctx.globalAlpha = opacity;

        // Title
        this.ctx.font = 'bold 48px Arial';
        this.ctx.fillStyle = '#2c3e50';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('Vocabulary Learning', this.canvas.width / 2, this.canvas.height / 2 - 30);

        // Author name
        this.ctx.font = '32px Arial';
        this.ctx.fillStyle = '#3498db';
        this.ctx.fillText('Created by Nguyễn Minh Nhựt', this.canvas.width / 2, this.canvas.height / 2 + 30);

        this.ctx.globalAlpha = 1;
    }

    drawFrame(word, progress) {
        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Background
        this.ctx.fillStyle = '#f5f5f5';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Card background with shadow
        this.ctx.fillStyle = '#ffffff';
        this.ctx.shadowColor = 'rgba(0, 0, 0, 0.1)';
        this.ctx.shadowBlur = 10;
        this.ctx.fillRect(50, 50, this.canvas.width - 100, this.canvas.height - 100);
        this.ctx.shadowBlur = 0;

        // Fade effect
        const opacity = progress < 0.1 ? progress * 10 :
            progress > 0.9 ? (1 - progress) * 10 :
                1;
        this.ctx.globalAlpha = opacity;

        // Text settings
        this.ctx.textAlign = 'center';

        // English word with animation
        this.ctx.font = 'bold 48px Arial';
        this.ctx.fillStyle = '#2c3e50';
        const yOffset = 0;
        this.ctx.fillText(word.english, this.canvas.width / 2, this.canvas.height / 3 + yOffset);

        // Word type
        this.ctx.font = '24px Arial';
        this.ctx.fillStyle = '#27ae60';
        this.ctx.fillText(word.type, this.canvas.width / 2, this.canvas.height / 3 + 40);

        // Vietnamese translation with fade in

        this.ctx.font = '36px Arial';
        this.ctx.fillStyle = '#e74c3c';
        this.ctx.globalAlpha = progress < 0.3 ? progress / 0.3 : opacity;
        this.ctx.fillText(word.vietnamese, this.canvas.width / 2, this.canvas.height / 2 + 30);

        // Pronunciation with slide in
        this.ctx.font = 'italic 28px Arial';
        this.ctx.fillStyle = '#3498db';
        const slideOffset = 0;
        this.ctx.fillText(word.pronunciation, this.canvas.width / 2 + slideOffset, this.canvas.height / 2 + 80);

        this.ctx.globalAlpha = 1;

        // Progress bar
        this.ctx.fillStyle = '#3498db';
        this.ctx.fillRect(50, this.canvas.height - 30, (this.canvas.width - 100) * progress, 5);
    }
    reset() {
        if (this.introSource) {
            this.introSource.disconnect();
        }
        if (this.tinkSource) {
            this.tinkSource.disconnect();
        }

        if (this.audioContext) {
            this.audioContext.close();
        }

        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        this.audioDestination = this.audioContext.createMediaStreamDestination();

        // Reset sources

        this.introSource = null;
        this.tinkSource = null;

        // Reset visual states
        this.currentWordIndex = 0;
        this.startTime = null;
        this.isIntroPlaying = true;
        this.repetitionCount = 0;

        // Reset speech
        this.synth.cancel();
        if (this.currentUtterance) {
            this.currentUtterance = null;
        }

        // Clear canvas to initial state
        const vocabList = this.getVocabList();
        if (vocabList.length > 0) {
            this.drawFrame(vocabList[0], 1);
        }

        // Stop any ongoing animation
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
            this.animationFrame = null;
        }

        this.isMeasuring = false;

    }
    getPronunciationDuration() {
        const duration = this.pronunciationDurations.get(this.currentWordIndex);
        if (!duration) {
            let str = this.getVocabList()[this.currentWordIndex].english;
            // console.log("cannot get pronuncation duration for " + str);
            return 0.5 * str.length / 3;
        }
        return duration || 2000; // Default duration if measurement not ready
    }

    async animate(timestamp) {
        if (!this.startTime) {
            this.startTime = timestamp;
            if (this.isIntroPlaying) {
                this.introSound.play();
            } else {
                // Start measuring pronunciations in parallel if not already started
                if (!this.isMeasuring && this.pronunciationDurations.size === 0) {
                    this.promiseMeasureAllPronunciations = this.measureAllPronunciations();
                }
            }
        }

        const pronunciationTime = this.getPronunciationDuration();
        const totalDuration = this.isIntroPlaying ? 3000 :
            pronunciationTime * 6; // 3 cycles × (speak + pause)

        const progress = (timestamp - this.startTime) / totalDuration;
        if (this.isIntroPlaying) {
            this.drawIntroFrame(progress);
        } else {
            const vocabList = this.getVocabList();
            const word = vocabList[this.currentWordIndex];

            // Calculate current repetition phase
            const repetitionPhase = Math.floor(progress * 6); // 6 phases (speak, pause) × 2
            if (progress == 0) {
                this.speakWord(word.english);

            }
            if (repetitionPhase !== this.repetitionCount) {
                this.repetitionCount = repetitionPhase;
                if (repetitionPhase % 2 === 0 && repetitionPhase < 6) {
                    // Speak on even phases (0, 2, 4)
                    this.speakWord(word.english);
                } else if (repetitionPhase === 5) {
                    // Play tink sound before transitioning
                    this.tinkSound.play();
                }
            }
            this.drawFrame(word, progress % 1);

        }

        if (progress >= 1) {
            if (this.isIntroPlaying) {
                this.isIntroPlaying = false;
                this.startTime = null;
            } else {
                const vocabList = this.getVocabList();
                if (this.currentWordIndex < vocabList.length - 1) {
                    this.currentWordIndex++;
                    this.startTime = null;
                    this.repetitionCount = 0;
                } else {
                    if (this.isRecording) {
                        this.stopRecording();
                    }
                    if (this.isPreviewing) {
                        this.stopPreview();
                    }
                    return;
                }
            }
        }

        if (this.isRecording || this.isPreviewing) {
            this.animationFrame = requestAnimationFrame(this.animate.bind(this));
        }
    }

    togglePreview() {
        if (this.isPreviewing) {
            this.stopPreview();
        } else {
            this.startPreview();
        }
    }

    async startPreview() {
        this.reset();

        const previewBtn = document.getElementById('previewBtn');
        previewBtn.disabled = true;
        previewBtn.textContent = '⏳ Preparing...';

        // Start measurements if needed
        if (this.pronunciationDurations.size === 0) {
            await this.measureAllPronunciations();
        }

        this.isPreviewing = true;
        this.currentWordIndex = 0;
        this.startTime = null;
        previewBtn.disabled = false;
        previewBtn.textContent = '⏹ Stop Preview';
        this.animationFrame = requestAnimationFrame(this.animate.bind(this));


    }

    stopPreview() {
        this.isPreviewing = false;
        this.currentWordIndex = 0;
        cancelAnimationFrame(this.animationFrame);
        document.getElementById('previewBtn').textContent = '▶️ Preview';
        // Draw first frame
        const vocabList = this.getVocabList();
        if (vocabList.length > 0) {
            this.drawFrame(vocabList[0], 1);
        }
    }

    async toggleRecording() {
        if (this.isRecording) {
            this.stopRecording();
        } else {
            this.startRecording();
        }
    }
    async startRecording() {
        this.reset();
        const recordBtn = document.getElementById('recordBtn');
        recordBtn.disabled = true;
        recordBtn.textContent = '⏳ Preparing...';
        if (this.pronunciationDurations.size === 0) {
            await this.measureAllPronunciations();
        }

        const canvasStream = this.canvas.captureStream(30);

        // Set up audio context and destination
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        this.audioDestination = this.audioContext.createMediaStreamDestination();

        // REMOVED: No longer requesting microphone access
        // const audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
        // const micSource = this.audioContext.createMediaStreamSource(audioStream);
        // micSource.connect(this.audioDestination);

        recordBtn.disabled = false;
        recordBtn.textContent = '⏹ Stop Recording';
        recordBtn.style.backgroundColor = '#c0392b';

        // Set up audio elements for recording - only create sources if they don't exist
        if (!this.introSource) {
            this.introSource = this.audioContext.createMediaElementSource(this.introSound);
        }
        if (!this.tinkSource) {
            this.tinkSource = this.audioContext.createMediaElementSource(this.tinkSound);
        }

        // Connect to both audio destination and speakers
        this.introSource.connect(this.audioDestination);
        this.introSource.connect(this.audioContext.destination);
        this.tinkSource.connect(this.audioDestination);
        this.tinkSource.connect(this.audioContext.destination);

        // Set up speech synthesis for recording
        // Create a custom audio node for speech synthesis
        this.speechSynthNode = this.audioContext.createGain();
        this.speechSynthNode.gain.value = 1.0; // Full volume
        this.speechSynthNode.connect(this.audioDestination);
        this.speechSynthNode.connect(this.audioContext.destination);

        // Modified speakWord to capture speech synthesis for recording
        this.originalSpeakWord = this.speakWord;
        this.speakWord = (text, volume = 1) => {
            return new Promise((resolve) => {
                this.currentUtterance = new SpeechSynthesisUtterance(text);

                const voiceSelect = document.getElementById('voiceSelect');
                const speedRange = document.getElementById('speedRange');

                if (voiceSelect.value) {
                    this.currentUtterance.voice = this.synth.getVoices()[voiceSelect.value];
                }
                this.currentUtterance.volume = volume;
                this.currentUtterance.rate = parseFloat(speedRange.value);

                this.currentUtterance.onend = () => {
                    this.lastPronunciationEnd = performance.now();
                    resolve();
                };

                this.currentUtterance.onerror = (error) => {
                    console.error("Speech error for:", text, error);
                    resolve();  // Resolve even on error
                };

                this.synth.speak(this.currentUtterance);
            });
        };

        // Create media recorder with combined streams
        const combinedStream = new MediaStream([
            ...canvasStream.getVideoTracks(),
            ...this.audioDestination.stream.getAudioTracks()
        ]);

        // Try different MIME types for MP4
        const mimeTypes = [
            'video/mp4;codecs=h264,aac',
            'video/x-matroska;codecs=h264,aac',
            'video/webm;codecs=h264,opus'
        ];

        let selectedMimeType;
        for (const type of mimeTypes) {
            if (MediaRecorder.isTypeSupported(type)) {
                selectedMimeType = type;
                break;
            }
        }

        if (!selectedMimeType) {
            console.warn('MP4 not supported, falling back to WebM');
            selectedMimeType = 'video/webm;codecs=vp9,opus';
        }

        this.mediaRecorder = new MediaRecorder(combinedStream, {
            mimeType: selectedMimeType,
            videoBitsPerSecond: 2500000, // 2.5 Mbps
            audioBitsPerSecond: 128000    // 128 kbps
        });

        this.mediaRecorder.ondataavailable = (event) => {
            if (event.data.size > 0) {
                this.recordedChunks.push(event.data);
            }
        };

        this.mediaRecorder.onstop = () => {
            document.getElementById('downloadBtn').disabled = false;
            // Restore original speakWord function
            if (this.originalSpeakWord) {
                this.speakWord = this.originalSpeakWord;
                this.originalSpeakWord = null;
            }
        };

        this.recordedChunks = [];
        this.currentWordIndex = 0;
        this.startTime = null;
        this.isRecording = true;
        this.isIntroPlaying = true;
        this.repetitionCount = 0;

        document.getElementById('recordBtn').textContent = '⏹ Stop Recording';
        document.getElementById('recordBtn').style.backgroundColor = '#c0392b';

        this.mediaRecorder.start();
        this.animationFrame = requestAnimationFrame(this.animate.bind(this));
    }
    stopRecording() {
        if (this.mediaRecorder && this.mediaRecorder.state !== 'inactive') {
            this.mediaRecorder.stop();
            this.synth.cancel();
            cancelAnimationFrame(this.animationFrame);
            this.isRecording = false;
            document.getElementById('recordBtn').textContent = '🔴 Start Recording';
            document.getElementById('recordBtn').style.backgroundColor = '#e74c3c';
        }
    }
    downloadVideo() {
        if (this.recordedChunks.length === 0) {
            console.error('No recorded data available');
            return;
        }

        const mimeType = this.mediaRecorder.mimeType;

        // Create blob with audio and video data
        const blob = new Blob(this.recordedChunks, { type: mimeType });


        // Verify blob size
        if (blob.size === 0) {
            console.error('Generated blob is empty');
            return;
        }

        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'vocabulary.webm';

        // Add to document temporarily to trigger download
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        // Cleanup
        setTimeout(() => URL.revokeObjectURL(url), 100);
    }
}
