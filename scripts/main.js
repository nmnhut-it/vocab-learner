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
        // console.log("parseAndDisplay");
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
        // console.log("updateVideoGenerator");
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

    const modeBtns = document.querySelectorAll('.mode-btn');
    const modeContents = document.querySelectorAll('.mode-content');

    const gameToggle = document.getElementById('gameToggle');
    const gameContainer = document.getElementById('gameContainer');
    const closeGame = document.getElementById('closeGame');
    const gameFrame = document.getElementById('vocabHootFrame');
    const mainContent = document.getElementById('mainContent');

    // Modified encryption functions that support Unicode characters
    const CRYPTO_KEY = "voctoolpasskey"; // Change this to your own secret key

    // Unicode-safe encryption
    function encryptData(text, key) {
        // First encode the Unicode string as UTF-8
        const encoded = encodeURIComponent(text);
        let result = '';
        for (let i = 0; i < encoded.length; i++) {
            result += String.fromCharCode(encoded.charCodeAt(i) ^ key.charCodeAt(i % key.length));
        }
        // Convert to base64 (ASCII only now)
        return btoa(result);
    }
    function encodeVocabularyForURL(vocabList) {

        // Convert vocab list to JSON string
        const jsonString = JSON.stringify(vocabList);



        return encryptData(jsonString, CRYPTO_KEY);
    }
    // Unicode-safe decryption
    function decryptData(encoded, key) {
        try {
            const text = atob(encoded); // Convert from base64
            let result = '';
            for (let i = 0; i < text.length; i++) {
                result += String.fromCharCode(text.charCodeAt(i) ^ key.charCodeAt(i % key.length));
            }
            // Decode the UTF-8 string back to Unicode
            return decodeURIComponent(result);
        } catch (error) {
            console.error('Decryption error:', error);
            return '';
        }
    }
    // Function to generate and copy sharable URL with vocabulary
    function generateAndCopyURL() {
        // Get vocabulary items from the DOM
        const vocabularyItems = Array.from(
            document.querySelectorAll('.vocab-item')
        ).map(item => ({
            english: item.querySelector('.english').textContent,
            type: item.querySelector('.type').textContent,
            vietnamese: item.querySelector('.vietnamese').textContent,
            pronunciation: item.querySelector('.pronunciation').textContent
        }));

        if (vocabularyItems.length === 0) {
            alert('Please add vocabulary first before playing VocabHoot.');
            return false;
        }

        // Encode vocabulary
        const encodedData = encodeVocabularyForURL(vocabularyItems);

        // Generate the URL
        const baseUrl = window.location.origin + window.location.pathname;
        const gameUrl = baseUrl.replace('index.html', '') + 'vocabhoot.html?data=' + encodedData;

        // Copy to clipboard
        const tempInput = document.createElement('input');
        document.body.appendChild(tempInput);
        tempInput.value = gameUrl;
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
        console.log(gameUrl);
        // Show a simple notification
        const notification = document.createElement('div');
        notification.textContent = 'Game link copied to clipboard!';
        notification.style.position = 'fixed';
        notification.style.bottom = '20px';
        notification.style.left = '50%';
        notification.style.transform = 'translateX(-50%)';
        notification.style.backgroundColor = '#4CAF50';
        notification.style.color = 'white';
        notification.style.padding = '10px 20px';
        notification.style.borderRadius = '5px';
        notification.style.zIndex = '1000';
        document.body.appendChild(notification);

        // Remove notification after 3 seconds
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 3000);

        return true;
    }


    // Modified showGame function with Unicode support
    function showGame() {
        generateAndCopyURL();
        // Get vocabulary data from DOM
        const vocabularyList = Array.from(
            document.querySelectorAll('.vocab-item')
        ).map(item => ({
            english: item.querySelector('.english').textContent,
            type: item.querySelector('.type').textContent,
            vietnamese: item.querySelector('.vietnamese').textContent,
            pronunciation: item.querySelector('.pronunciation').textContent
        }));

        // First stringify, then encrypt the data
        const jsonData = JSON.stringify(vocabularyList);
        const encodedData = encryptData(jsonData, CRYPTO_KEY);

        // Set the iframe src with encrypted data parameter
        const gameFrame = document.getElementById('vocabHootFrame');
        gameFrame.src = `vocabhoot.html?data=${encodedData}`;

        // Show the game container
        const gameContainer = document.getElementById('gameContainer');
        gameContainer.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }


    function hideGame() {
        gameContainer.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    gameToggle.addEventListener('click', showGame);
    closeGame.addEventListener('click', hideGame);

    // Handle communication with game iframe
    window.addEventListener('message', function (event) {
        if (event.data.type === 'requestVocabulary') {
            const vocabItems = document.querySelectorAll('.vocab-item');
            const vocabularyList = Array.from(vocabItems).map(item => ({
                english: item.querySelector('.english').textContent,
                type: item.querySelector('.type').textContent,
                vietnamese: item.querySelector('.vietnamese').textContent,
                pronunciation: item.querySelector('.pronunciation').textContent
            }));

            if (gameFrame && gameFrame.contentWindow) {
                // console.log('Sending vocabulary data:', vocabularyList);
                gameFrame.contentWindow.postMessage({
                    type: 'vocabularyData',
                    data: vocabularyList
                }, '*');
            }
        }
    });
   
});