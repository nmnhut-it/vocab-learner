document.addEventListener('DOMContentLoaded', function () {
    let synth = window.speechSynthesis;
    let voices = [];
    let currentUtterance = null;
    let isReading = false;

    // Get DOM elements
    const convertBtn = document.getElementById('convertBtn');
    const readAllBtn = document.getElementById('readAll');
    const stopReadingBtn = document.getElementById('stopReading');
    const speedRange = document.getElementById('speedRange');
    const speedValue = document.getElementById('speedValue');
    const voiceSelect = document.getElementById('voiceSelect');
    const vocabInput = document.getElementById('vocabInput');
    const vocabularyList = document.getElementById('vocabularyList');

    // Enhanced voice loading with retry mechanism
    async function loadVoices(retryCount = 0, maxRetries = 5) {
        voices = synth.getVoices();

        if (voices.length === 0 && retryCount < maxRetries) {
            // Wait and retry if voices aren't loaded yet
            await new Promise(resolve => setTimeout(resolve, 100));
            return loadVoices(retryCount + 1, maxRetries);
        }

        voiceSelect.innerHTML = '<option value="">Select Voice</option>';

        voices.forEach((voice, index) => {
            if (voice.lang.toLowerCase().includes('en')) {
                const option = document.createElement('option');
                option.value = index;
                option.textContent = `${voice.name} (${voice.lang})`;
                voiceSelect.appendChild(option);
            }
        });

        // Select a default voice if available
        if (voices.length > 0) {
            const defaultVoice = voices.findIndex(voice =>
                voice.lang.toLowerCase().includes('en-us') ||
                voice.lang.toLowerCase().includes('en-gb')
            );
            if (defaultVoice !== -1) {
                voiceSelect.value = defaultVoice;
            }
        }
    }

    function parseAndDisplay() {
        console.log("parseAndDisplay");
        const input = vocabInput.value;
        const lines = input.trim().split('\n');
        vocabularyList.innerHTML = '';

        lines.forEach(line => {
            if (!line.trim()) return;

            const content = line.replace(/^\d+\.\s*/, '');
            const parts = content.split(':');
            if (parts.length < 2) return;

            const english = parts[0].trim();
            const rest = parts[1].trim();

            const typeMatch = rest.match(/\([a-z]+\)/);
            const pronunciationMatch = rest.match(/\/[^/]+\//);

            const type = typeMatch ? typeMatch[0] : '';
            const pronunciation = pronunciationMatch ? pronunciationMatch[0] : '';
            const vietnamese = rest
                .replace(type, '')
                .replace(pronunciation, '')
                .trim();

            const vocabItem = createVocabItem(english, type, vietnamese, pronunciation);
            vocabularyList.appendChild(vocabItem);
        });

        updateVideoGenerator();
    }

    function createVocabItem(english, type, vietnamese, pronunciation) {
        const vocabItem = document.createElement('div');
        vocabItem.className = 'vocab-item';
        vocabItem.dataset.text = english;

        vocabItem.innerHTML = `
            <span class="english">${english}</span>
            <span class="type">${type}</span>
            <span class="vietnamese">${vietnamese}</span>
            <span class="pronunciation">${pronunciation}</span>
        `;

        vocabItem.addEventListener('click', () => readText(english));
        return vocabItem;
    }

    function readText(text) {
        if (isReading) {
            synth.cancel();
        }

        currentUtterance = new SpeechSynthesisUtterance(text);

        const voiceIndex = voiceSelect.value;
        if (voiceIndex) {
            currentUtterance.voice = voices[voiceIndex];
        }

        currentUtterance.rate = parseFloat(speedRange.value);
        synth.speak(currentUtterance);
    }

    function updateVideoGenerator() {
        console.log("updateVideoGenerator");
        if (window.vocabVideoGenerator) {
            cleanupVideoGenerator();
        }
        window.vocabVideoGenerator = new VocabVideoGenerator();

        if (window.vocabVideoGenerator) {
            const vocabList = window.vocabVideoGenerator.getVocabList();
            if (vocabList.length > 0) {
                window.vocabVideoGenerator.drawFrame(vocabList[0], 1);
            }
            window.vocabVideoGenerator.measureAllPronunciations().catch(err =>
                console.error('Error measuring pronunciations:', err));
        }
    }

    function cleanupVideoGenerator() {
        if (!window.vocabVideoGenerator) return;

        // Cancel any ongoing animations
        if (window.vocabVideoGenerator.animationFrame) {
            cancelAnimationFrame(window.vocabVideoGenerator.animationFrame);
        }

        // Stop any ongoing recording
        if (window.vocabVideoGenerator.mediaRecorder &&
            window.vocabVideoGenerator.mediaRecorder.state !== 'inactive') {
            window.vocabVideoGenerator.stopRecording();
        }

        // Stop any ongoing preview
        if (window.vocabVideoGenerator.isPreviewing) {
            window.vocabVideoGenerator.stopPreview();
        }

        // Clean up audio contexts and streams
        if (window.vocabVideoGenerator.audioContext) {
            window.vocabVideoGenerator.audioContext.close();
        }

        // Reset audio elements
        if (window.vocabVideoGenerator.introSound) {
            window.vocabVideoGenerator.introSound.pause();
            window.vocabVideoGenerator.introSound.currentTime = 0;
        }

        if (window.vocabVideoGenerator.tinkSound) {
            window.vocabVideoGenerator.tinkSound.pause();
            window.vocabVideoGenerator.tinkSound.currentTime = 0;
        }

        // Cancel any ongoing speech synthesis
        if (window.speechSynthesis) {
            window.speechSynthesis.cancel();
        }

        // Reset UI elements
        const recordBtn = document.getElementById('recordBtn');
        if (recordBtn) {
            recordBtn.textContent = '🔴 Start Recording';
            recordBtn.style.backgroundColor = '#e74c3c';
            recordBtn.disabled = false;
        }

        const previewBtn = document.getElementById('previewBtn');
        if (previewBtn) {
            previewBtn.textContent = '▶️ Preview';
            previewBtn.disabled = false;
        }

        const downloadBtn = document.getElementById('downloadBtn');
        if (downloadBtn) {
            downloadBtn.disabled = true;
        }

        // Clear measurement status UI
        const statusDiv = document.querySelector('.measurement-status');
        if (statusDiv) {
            statusDiv.classList.add('hidden');
        }

        // Clear any stored pronunciation durations
        if (window.vocabVideoGenerator.pronunciationDurations) {
            window.vocabVideoGenerator.pronunciationDurations.clear();
        }

        // Clear the canvas
        const canvas = document.getElementById('videoCanvas');
        if (canvas) {
            const ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }

        // Null out the reference
        window.vocabVideoGenerator = null;
    }

    // Event Listeners
    if (speechSynthesis.onvoiceschanged !== undefined) {
        speechSynthesis.onvoiceschanged = loadVoices;
    }

    convertBtn.addEventListener('click', parseAndDisplay);

    readAllBtn.addEventListener('click', async () => {
        isReading = true;
        const items = document.querySelectorAll('.vocab-item');

        for (let item of items) {
            if (!isReading) break;

            readText(item.dataset.text);

            // Wait for the current word to finish
            await new Promise(resolve => {
                currentUtterance.onend = resolve;
            });

            // Add a small pause between words
            await new Promise(resolve => setTimeout(resolve, 1000));
        }

        isReading = false;
    });

    stopReadingBtn.addEventListener('click', () => {
        isReading = false;
        synth.cancel();
    });

    speedRange.addEventListener('input', (e) => {
        speedValue.textContent = e.target.value;
    });

    // Initial setup
    loadVoices();
    // setTimeout(() => {
    //     parseAndDisplay();
    // }, 1000);
});