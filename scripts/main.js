document.addEventListener('DOMContentLoaded', function () {
    let synth = window.speechSynthesis;
    let voices = [];
    let currentUtterance = null;
    let isReading = false;

    // Initialize Gemini processor
    const geminiProcessor = new window.GeminiProcessor();

    // Get DOM elements
    const convertBtn = document.getElementById('convertBtn');
    const geminiBtn = document.getElementById('geminiBtn');
    const geminiStatus = document.getElementById('geminiStatus');
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

        // No IPA guide in list view - keep it simple
        vocabItem.innerHTML = `
            <span class="english">${english}</span>
            <span class="type">${type}</span>
            <span class="vietnamese">${vietnamese}</span>
            <span class="pronunciation">${pronunciation}</span>
        `;

        vocabItem.addEventListener('click', () => {
            readText(english);
        });

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

        // Try to use WASM-based generator, fallback to MediaRecorder
        if (window.VocabVideoGeneratorWasm && !window.vocabVideoGenerator) {
            window.vocabVideoGenerator = new VocabVideoGeneratorWasm();
        } else if (window.VocabVideoGenerator) {
            window.vocabVideoGenerator = new VocabVideoGenerator();
        }

        if (window.vocabVideoGenerator) {
            const vocabList = window.vocabVideoGenerator.getVocabList();
            if (vocabList.length > 0 && window.vocabVideoGenerator.drawFrame) {
                window.vocabVideoGenerator.drawFrame(vocabList[0], 1);
            }
            if (window.vocabVideoGenerator.measureAllPronunciations) {
                window.vocabVideoGenerator.measureAllPronunciations().catch(err =>
                    console.error('Error measuring pronunciations:', err));
            }
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

    // Gemini AI Processing
    async function processWithGemini() {
        const rawText = vocabInput.value.trim();
        if (!rawText) {
            alert('Please enter vocabulary to process!');
            return;
        }

        if (!geminiProcessor.hasApiKey()) {
            const apiKey = prompt('Enter your Gemini API key:\n(Get it from https://makersuite.google.com/app/apikey)');
            if (!apiKey) return;
            geminiProcessor.setApiKey(apiKey);
        }

        try {
            geminiStatus.textContent = '✨ Processing with Gemini AI...';
            geminiStatus.style.color = '#3498db';
            geminiBtn.disabled = true;

            const processed = await geminiProcessor.processVocabulary(rawText);
            vocabInput.value = processed;

            geminiStatus.textContent = '✅ Processed! Click Convert to display.';
            geminiStatus.style.color = '#27ae60';

            // Auto-convert after 1 second
            setTimeout(() => {
                parseAndDisplay();
                geminiStatus.textContent = '';
            }, 1000);

        } catch (error) {
            console.error('Gemini error:', error);
            geminiStatus.textContent = '❌ Error: ' + error.message;
            geminiStatus.style.color = '#e74c3c';
        } finally {
            geminiBtn.disabled = false;
        }
    }

    // Event Listeners
    if (speechSynthesis.onvoiceschanged !== undefined) {
        speechSynthesis.onvoiceschanged = loadVoices;
    }

    geminiBtn.addEventListener('click', processWithGemini);
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

    // ===== FLASHCARD VIEW FUNCTIONALITY =====
    let currentFlashcardIndex = 0;
    let flashcardVocabList = [];
    let seenIPASymbols = new Set();

    const listViewBtn = document.getElementById('listViewBtn');
    const flashcardViewBtn = document.getElementById('flashcardViewBtn');
    const listView = document.getElementById('listView');
    const flashcardView = document.getElementById('flashcardView');
    const flashcardWord = document.getElementById('flashcardWord');
    const flashcardIpaGuide = document.getElementById('flashcardIpaGuide');
    const flashcardCounter = document.getElementById('flashcardCounter');
    const prevCardBtn = document.getElementById('prevCard');
    const nextCardBtn = document.getElementById('nextCard');
    const speakCardBtn = document.getElementById('speakCard');

    function switchToListView() {
        listViewBtn.classList.add('active');
        flashcardViewBtn.classList.remove('active');
        listView.classList.add('active');
        flashcardView.classList.remove('active');
    }

    function switchToFlashcardView() {
        flashcardViewBtn.classList.add('active');
        listViewBtn.classList.remove('active');
        flashcardView.classList.add('active');
        listView.classList.remove('active');

        // Build flashcard vocab list from current vocabulary
        buildFlashcardList();
        if (flashcardVocabList.length > 0) {
            currentFlashcardIndex = 0;
            seenIPASymbols = new Set();
            showFlashcard(currentFlashcardIndex);
        }
    }

    function buildFlashcardList() {
        flashcardVocabList = [];
        const items = document.querySelectorAll('.vocab-item');
        items.forEach(item => {
            const english = item.querySelector('.english')?.textContent || '';
            const type = item.querySelector('.type')?.textContent || '';
            const vietnamese = item.querySelector('.vietnamese')?.textContent || '';
            const pronunciation = item.querySelector('.pronunciation')?.textContent || '';

            if (english) {
                flashcardVocabList.push({ english, type, vietnamese, pronunciation });
            }
        });
    }

    function showFlashcard(index) {
        if (flashcardVocabList.length === 0) {
            flashcardWord.innerHTML = '<p>No vocabulary to display</p>';
            flashcardIpaGuide.innerHTML = '';
            flashcardCounter.textContent = '0 / 0';
            return;
        }

        const vocab = flashcardVocabList[index];

        // Display word info
        flashcardWord.innerHTML = `
            <span class="english">${vocab.english}</span>
            <span class="type">${vocab.type}</span>
            <span class="vietnamese">${vocab.vietnamese}</span>
            <span class="pronunciation">${vocab.pronunciation}</span>
        `;

        // Generate deduplicated IPA guide
        if (vocab.pronunciation && window.IPAGuideHelper) {
            const { html, newSymbols } = window.IPAGuideHelper.generateCompactGuide(
                vocab.pronunciation,
                seenIPASymbols
            );
            seenIPASymbols = newSymbols;
            flashcardIpaGuide.innerHTML = html || '<em>No new pronunciation symbols</em>';
        } else {
            flashcardIpaGuide.innerHTML = '<em>No pronunciation guide available</em>';
        }

        // Update counter
        flashcardCounter.textContent = `${index + 1} / ${flashcardVocabList.length}`;

        // Update button states
        prevCardBtn.disabled = index === 0;
        nextCardBtn.disabled = index === flashcardVocabList.length - 1;

        // Auto-read the word
        readText(vocab.english);
    }

    function speakCurrentFlashcard() {
        if (flashcardVocabList.length > 0 && currentFlashcardIndex < flashcardVocabList.length) {
            const vocab = flashcardVocabList[currentFlashcardIndex];
            readText(vocab.english);
        }
    }

    function nextFlashcard() {
        if (currentFlashcardIndex < flashcardVocabList.length - 1) {
            currentFlashcardIndex++;
            showFlashcard(currentFlashcardIndex);
        }
    }

    function prevFlashcard() {
        if (currentFlashcardIndex > 0) {
            currentFlashcardIndex--;
            showFlashcard(currentFlashcardIndex);
        }
    }

    // Event listeners for view toggle
    listViewBtn.addEventListener('click', switchToListView);
    flashcardViewBtn.addEventListener('click', switchToFlashcardView);
    nextCardBtn.addEventListener('click', nextFlashcard);
    prevCardBtn.addEventListener('click', prevFlashcard);
    speakCardBtn.addEventListener('click', speakCurrentFlashcard);

    // Arrow key navigation in flashcard view
    document.addEventListener('keydown', (e) => {
        if (!flashcardView.classList.contains('active')) return;

        if (e.key === 'ArrowRight') {
            nextFlashcard();
        } else if (e.key === 'ArrowLeft') {
            prevFlashcard();
        }
    });

    // ===== GEMINI TOGGLE (SECRET) =====
    document.addEventListener('keydown', (e) => {
        if (e.key === 'g' || e.key === 'G') {
            const inputButtons = document.querySelector('.input-buttons');
            const geminiStatus = document.getElementById('geminiStatus');

            if (inputButtons.classList.contains('visible')) {
                inputButtons.classList.remove('visible');
                geminiStatus.classList.remove('visible');
            } else {
                inputButtons.classList.add('visible');
                geminiStatus.classList.add('visible');
            }
        }
    });

});

// Add this to your main.js file

// Function to load vocabulary from GitHub based on URL parameters
async function loadVocabFromGitHubURL() {
    // Get URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const owner = urlParams.get('owner');
    const repo = urlParams.get('repo');
    const path = urlParams.get('path');

    // If any parameter is missing, return
    if (!owner || !repo || !path) {
        return;
    }

    try {
        // Create loading indicator
        const loadingIndicator = document.createElement('div');
        loadingIndicator.textContent = 'Loading vocabulary from GitHub...';
        loadingIndicator.style.position = 'fixed';
        loadingIndicator.style.top = '10px';
        loadingIndicator.style.left = '50%';
        loadingIndicator.style.transform = 'translateX(-50%)';
        loadingIndicator.style.background = '#3498db';
        loadingIndicator.style.color = 'white';
        loadingIndicator.style.padding = '10px 20px';
        loadingIndicator.style.borderRadius = '5px';
        loadingIndicator.style.zIndex = '1000';
        document.body.appendChild(loadingIndicator);

        // GitHub raw content URL format
        const url = `https://raw.githubusercontent.com/${owner}/${repo}/refs/heads/main/${path}`
        console.log(url)
        // Fetch the file content
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`Failed to fetch file: ${response.status} ${response.statusText}`);
        }

        const content = await response.text();
        console.log(content);
        // Process the content based on file extension
        const fileExtension = path.split('.').pop().toLowerCase();

        let vocabularyList = [];

        if (fileExtension === 'json') {
            // If it's a JSON file, parse it directly
            vocabularyList = JSON.parse(content);
        } else if (fileExtension === 'txt' || fileExtension === 'csv' || fileExtension === 'md' ) {
            // If it's a text file, parse it as a vocabulary list format
            const lines = content.split('\n');

            lines.forEach((line, index) => {
                if (!line.trim()) return;

                // Parse line based on your vocabulary format
                // Format example: 1. word: (type) translation /pronunciation/
                const lineMatch = line.match(/(\d+)?\.\s*(.*?):\s*(\([a-z]+\))?\s*(.*?)\s*(\/.*?\/)?\s*$/);

                if (lineMatch) {
                    const [, , english, type, vietnamese, pronunciation] = lineMatch;
                    vocabularyList.push({
                        english: english.trim(),
                        type: type ? type.trim() : '',
                        vietnamese: vietnamese.trim(),
                        pronunciation: pronunciation ? pronunciation.trim() : ''
                    });
                }
            });
        }

        // Remove loading indicator
        document.body.removeChild(loadingIndicator);

        if (vocabularyList.length === 0) {
            throw new Error('No vocabulary items found in the file');
        }

        // Format the vocabulary list for the textarea
        const formattedText = vocabularyList.map((item, index) => {
            return `${index + 1}. ${item.english}: ${item.type} ${item.vietnamese} ${item.pronunciation}`;
        }).join('\n');

        // Set the formatted text in the vocabulary input textarea
        const vocabInput = document.getElementById('vocabInput');
        if (vocabInput) {
            vocabInput.value = formattedText;

            // Trigger the convert function to display the vocabulary
            const convertBtn = document.getElementById('convertBtn');
            if (convertBtn) {
                convertBtn.click();
            }
        }

        // If the 'play' parameter is set to 'true', automatically click the Play VocabHoot button
        if (urlParams.get('play') === 'true') {
            setTimeout(() => {
                const gameToggle = document.getElementById('gameToggle');
                if (gameToggle) {
                    gameToggle.click();
                }
            }, 1000); // Give it a second to process the vocabulary
        }

    } catch (error) {
        console.error('Error loading vocabulary from GitHub:', error);
        alert(`Error loading vocabulary: ${error.message}`);
    }
}

// Call the function when the page loads
document.addEventListener('DOMContentLoaded', function () {
    setTimeout(loadVocabFromGitHubURL, 500);
});

// Function to create a GitHub vocabulary URL
function createGitHubVocabURL(owner, repo, path, playDirectly = false) {
    const baseUrl = window.location.origin + window.location.pathname;
    let url = `${baseUrl}?owner=${encodeURIComponent(owner)}&repo=${encodeURIComponent(repo)}&path=${encodeURIComponent(path)}`;

    if (playDirectly) {
        url += '&play=true';
    }

    return url;
}

// Add a "Create Shareable Link" button
function addCreateLinkButton() {
    const inputButtons = document.querySelector('.input-buttons');
    if (!inputButtons) return;

    // Check if button already exists
    if (document.getElementById('createLinkBtn')) return;

    const linkBtn = document.createElement('button');
    linkBtn.id = 'createLinkBtn';
    linkBtn.textContent = 'Create Shareable Link';
    linkBtn.onclick = showCreateLinkDialog;

    // Add the button to the input-buttons container
    inputButtons.appendChild(linkBtn);
}

// Function to show the Create Link dialog
function showCreateLinkDialog() {
    // Create modal if it doesn't exist
    let linkModal = document.getElementById('createLinkModal');

    if (!linkModal) {
        linkModal = document.createElement('div');
        linkModal.id = 'createLinkModal';
        linkModal.className = 'create-link-modal';

        const modalContent = document.createElement('div');
        modalContent.className = 'create-link-content';

        const closeBtn = document.createElement('span');
        closeBtn.className = 'close-modal';
        closeBtn.innerHTML = '&times;';
        closeBtn.onclick = () => linkModal.style.display = 'none';

        const title = document.createElement('h3');
        title.textContent = 'Create Shareable Link';

        const form = document.createElement('form');
        form.id = 'createLinkForm';
        form.onsubmit = (e) => {
            e.preventDefault();

            const owner = document.getElementById('linkOwner').value.trim();
            const repo = document.getElementById('linkRepo').value.trim();
            const path = document.getElementById('linkPath').value.trim();
            const playDirectly = document.getElementById('playDirectly').checked;

            if (!owner || !repo || !path) {
                alert('Please fill all fields');
                return;
            }

            // Create the URL
            const url = createGitHubVocabURL(owner, repo, path, playDirectly);

            // Update the link display
            document.getElementById('generatedLink').value = url;
            document.getElementById('linkActions').style.display = 'block';

            // Save the GitHub details to localStorage for future use
            localStorage.setItem('githubVocabOwner', owner);
            localStorage.setItem('githubVocabRepo', repo);
            localStorage.setItem('githubVocabPath', path);
        };

        // Create form fields
        const ownerLabel = document.createElement('label');
        ownerLabel.textContent = 'GitHub Username:';
        const ownerInput = document.createElement('input');
        ownerInput.type = 'text';
        ownerInput.id = 'linkOwner';
        ownerInput.placeholder = 'e.g., yourusername';
        ownerInput.required = true;

        const repoLabel = document.createElement('label');
        repoLabel.textContent = 'Repository Name:';
        const repoInput = document.createElement('input');
        repoInput.type = 'text';
        repoInput.id = 'linkRepo';
        repoInput.placeholder = 'e.g., vocabulary-learner';
        repoInput.required = true;

        const pathLabel = document.createElement('label');
        pathLabel.textContent = 'File Path:';
        const pathInput = document.createElement('input');
        pathInput.type = 'text';
        pathInput.id = 'linkPath';
        pathInput.placeholder = 'e.g., vocab-lists/week1.txt';
        pathInput.required = true;

        const playDirectlyLabel = document.createElement('label');
        playDirectlyLabel.className = 'checkbox-label';
        const playDirectlyInput = document.createElement('input');
        playDirectlyInput.type = 'checkbox';
        playDirectlyInput.id = 'playDirectly';
        const playDirectlyText = document.createTextNode(' Start game automatically');
        playDirectlyLabel.appendChild(playDirectlyInput);
        playDirectlyLabel.appendChild(playDirectlyText);

        const submitBtn = document.createElement('button');
        submitBtn.type = 'submit';
        submitBtn.textContent = 'Generate Link';
        submitBtn.className = 'generate-link-btn';

        // Link display and actions
        const linkDisplay = document.createElement('div');
        linkDisplay.id = 'linkActions';
        linkDisplay.style.display = 'none';
        linkDisplay.className = 'link-actions';

        const linkInput = document.createElement('input');
        linkInput.type = 'text';
        linkInput.id = 'generatedLink';
        linkInput.readOnly = true;

        const copyBtn = document.createElement('button');
        copyBtn.textContent = 'Copy Link';
        copyBtn.onclick = () => {
            linkInput.select();
            document.execCommand('copy');
            copyBtn.textContent = 'Copied!';
            setTimeout(() => copyBtn.textContent = 'Copy Link', 2000);
        };

        const testBtn = document.createElement('button');
        testBtn.textContent = 'Test Link';
        testBtn.onclick = () => {
            window.open(document.getElementById('generatedLink').value, '_blank');
        };

        linkDisplay.appendChild(linkInput);
        linkDisplay.appendChild(copyBtn);
        linkDisplay.appendChild(testBtn);

        // Help text
        const helpText = document.createElement('p');
        helpText.className = 'help-text';
        helpText.innerHTML = 'This tool creates a direct link to your vocabulary list stored on GitHub. Share this link with your students to provide them immediate access to the vocabulary.';

        // Assemble the form
        form.appendChild(ownerLabel);
        form.appendChild(ownerInput);
        form.appendChild(repoLabel);
        form.appendChild(repoInput);
        form.appendChild(pathLabel);
        form.appendChild(pathInput);
        form.appendChild(playDirectlyLabel);
        form.appendChild(submitBtn);

        // Assemble the modal content
        modalContent.appendChild(closeBtn);
        modalContent.appendChild(title);
        modalContent.appendChild(form);
        modalContent.appendChild(linkDisplay);
        modalContent.appendChild(helpText);

        linkModal.appendChild(modalContent);
        document.body.appendChild(linkModal);

        // Add styles for the modal
        const style = document.createElement('style');
        style.textContent = `
            .create-link-modal {
                display: none;
                position: fixed;
                z-index: 1000;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0,0,0,0.6);
            }
            .create-link-content {
                background-color: #fff;
                margin: 10% auto;
                padding: 20px;
                border-radius: 10px;
                width: 90%;
                max-width: 500px;
                box-shadow: 0 4px 8px rgba(0,0,0,0.2);
                position: relative;
            }
            .close-modal {
                position: absolute;
                right: 20px;
                top: 10px;
                font-size: 28px;
                cursor: pointer;
                color: #777;
            }
            #createLinkForm {
                display: flex;
                flex-direction: column;
                gap: 15px;
                margin-top: 20px;
            }
            #createLinkForm label {
                font-weight: bold;
                margin-bottom: -10px;
            }
            #createLinkForm input[type="text"] {
                padding: 10px;
                border: 1px solid #ddd;
                border-radius: 5px;
                font-size: 16px;
            }
            .checkbox-label {
                display: flex;
                align-items: center;
                margin-bottom: 15px;
                font-weight: normal !important;
            }
            .checkbox-label input {
                margin-right: 8px;
            }
            .generate-link-btn {
                background: #3498db;
                color: white;
                border: none;
                padding: 12px;
                border-radius: 5px;
                cursor: pointer;
                font-weight: bold;
            }
            .link-actions {
                margin-top: 20px;
                display: flex;
                flex-direction: column;
                gap: 10px;
            }
            .link-actions input {
                padding: 10px;
                border: 1px solid #ddd;
                border-radius: 5px;
                font-size: 14px;
            }
            .link-actions button {
                padding: 8px;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                font-weight: bold;
                color: white;
            }
            .link-actions button:first-of-type {
                background: #2ecc71;
            }
            .link-actions button:last-of-type {
                background: #9b59b6;
            }
            .help-text {
                margin-top: 15px;
                color: #666;
                font-size: 14px;
                line-height: 1.4;
            }
        `;
        document.head.appendChild(style);
    }

    // Load saved GitHub details from localStorage if available
    const savedOwner = localStorage.getItem('githubVocabOwner');
    const savedRepo = localStorage.getItem('githubVocabRepo');
    const savedPath = localStorage.getItem('githubVocabPath');

    if (savedOwner) document.getElementById('linkOwner').value = savedOwner;
    if (savedRepo) document.getElementById('linkRepo').value = savedRepo;
    if (savedPath) document.getElementById('linkPath').value = savedPath;

    // Reset the link display
    document.getElementById('linkActions').style.display = 'none';

    // Show the modal
    linkModal.style.display = 'block';
}

// Call this function after DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    // Add the Create Link button
    setTimeout(addCreateLinkButton, 500);
});


/**
 * Helper function to create a simple typical spelling mistake for Vietnamese learners
 * This is used as a fallback if the advanced spelling mistake generators are not available
 */
function createSimpleSpellingMistake(word) {
    if (word.length <= 3) return word + "s"; // For very short words, just add an 's'

    // Common spelling mistake patterns
    const patterns = [
        // Double a letter that shouldn't be doubled
        () => {
            const pos = 1 + Math.floor(Math.random() * (word.length - 2));
            return word.slice(0, pos) + word[pos] + word.slice(pos);
        },

        // Omit a letter
        () => {
            const pos = 1 + Math.floor(Math.random() * (word.length - 2));
            return word.slice(0, pos) + word.slice(pos + 1);
        },

        // Swap two adjacent letters
        () => {
            const pos = 1 + Math.floor(Math.random() * (word.length - 2));
            return word.slice(0, pos) + word[pos + 1] + word[pos] + word.slice(pos + 2);
        },

        // Substitute a vowel
        () => {
            const vowels = 'aeiou';
            const pos = word.split('').findIndex((char, idx) =>
                idx > 0 && vowels.includes(char.toLowerCase())
            );

            if (pos > 0) {
                const otherVowels = vowels.replace(word[pos].toLowerCase(), '').split('');
                const newVowel = otherVowels[Math.floor(Math.random() * otherVowels.length)];
                return word.slice(0, pos) + newVowel + word.slice(pos + 1);
            }
            return word;
        },

        // Common b/p, d/t confusion (typical for Vietnamese speakers)
        () => {
            const confusions = [
                { a: 'b', b: 'p' },
                { a: 'd', b: 't' },
                { a: 'l', b: 'r' },
                { a: 'sh', b: 's' },
                { a: 'j', b: 'ch' },
                { a: 'th', b: 't' }
            ];

            for (const { a, b } of confusions) {
                if (word.toLowerCase().includes(a)) {
                    return word.replace(new RegExp(a, 'i'), b);
                } else if (word.toLowerCase().includes(b)) {
                    return word.replace(new RegExp(b, 'i'), a);
                }
            }
            return word;
        }
    ];

    // Choose a random pattern
    const pattern = patterns[Math.floor(Math.random() * patterns.length)];
    return pattern();
}

// Replace getLanguageSpecificErrors function if it doesn't exist
if (typeof getLanguageSpecificErrors !== 'function') {
    function getLanguageSpecificErrors(nativeLanguage) {
        // Basic language-specific error patterns for Vietnamese speakers learning English
        const viErrors = {
            finalConsonantOmission: ['t', 'd', 'p', 'c', 'k', 'ch', 'f'],
            consonantConfusion: [
                { a: 'b', b: 'p' }, // b/p confusion
                { a: 'd', b: 't' }, // d/t confusion
                { a: 'j', b: 'ch' }, // j/ch confusion
                { a: 'l', b: 'r' }, // l/r confusion (very common)
                { a: 'sh', b: 's' }, // sh/s confusion
                { a: 'v', b: 'f' } // v/f confusion
            ]
        };

        return nativeLanguage === 'vi' ? viErrors : {};
    }
}

// Helper function to create L1 interference mistakes if it doesn't exist
if (typeof createL1InterferenceMistake !== 'function') {
    function createL1InterferenceMistake(word, nativeLanguage) {
        if (nativeLanguage !== 'vi' || word.length <= 3) {
            return word;
        }

        const errors = getLanguageSpecificErrors('vi');

        // 50% chance to apply final consonant omission
        if (Math.random() < 0.5) {
            for (const consonant of errors.finalConsonantOmission) {
                if (word.toLowerCase().endsWith(consonant)) {
                    return word.slice(0, word.length - consonant.length);
                }
            }
        }

        // 50% chance to apply consonant confusion
        if (Math.random() < 0.5) {
            for (const { a, b } of errors.consonantConfusion) {
                if (word.toLowerCase().includes(a)) {
                    return word.replace(new RegExp(a, 'ig'), b);
                } else if (word.toLowerCase().includes(b)) {
                    return word.replace(new RegExp(b, 'ig'), a);
                }
            }
        }

        return word;
    }
}

/**
 * Replace the simple version of smartScrambleWord if it doesn't exist
 * This creates a language-aware scrambling that preserves word structure
 */
if (typeof smartScrambleWord !== 'function') {
    function smartScrambleWord(word, nativeLanguage = null) {
        if (word.length <= 3) return word;

        // Handle multi-word phrases
        if (word.includes(' ')) {
            return word.split(' ')
                .map(w => smartScrambleWord(w, nativeLanguage))
                .join(' ');
        }

        // Keep first and last letters
        const firstLetter = word.charAt(0);
        const lastLetter = word.charAt(word.length - 1);

        // Get middle section
        let middle = word.substring(1, word.length - 1);

        // Identify vowels and consonants in the middle section
        const vowels = 'aeiou';
        const middleVowels = [];
        const middleConsonants = [];

        for (let i = 0; i < middle.length; i++) {
            const char = middle[i].toLowerCase();
            if (vowels.includes(char)) {
                middleVowels.push({ char, index: i, isUpper: middle[i] !== char });
            } else if (/[a-z]/i.test(char)) {
                middleConsonants.push({ char, index: i, isUpper: middle[i] !== char });
            }
        }

        // Create a new scrambled middle while maintaining vowel and consonant positions
        const middleArray = middle.split('');

        // Scramble vowels among vowel positions
        for (let i = middleVowels.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const tempChar = middleVowels[i].char;
            const tempIsUpper = middleVowels[i].isUpper;

            middleVowels[i].char = middleVowels[j].char;
            middleVowels[i].isUpper = middleVowels[j].isUpper;

            middleVowels[j].char = tempChar;
            middleVowels[j].isUpper = tempIsUpper;
        }

        // Scramble consonants among consonant positions
        for (let i = middleConsonants.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const tempChar = middleConsonants[i].char;
            const tempIsUpper = middleConsonants[i].isUpper;

            middleConsonants[i].char = middleConsonants[j].char;
            middleConsonants[i].isUpper = middleConsonants[j].isUpper;

            middleConsonants[j].char = tempChar;
            middleConsonants[j].isUpper = tempIsUpper;
        }

        // Reassemble the middle section
        for (const vowel of middleVowels) {
            middleArray[vowel.index] = vowel.isUpper ? vowel.char.toUpperCase() : vowel.char;
        }

        for (const consonant of middleConsonants) {
            middleArray[consonant.index] = consonant.isUpper ? consonant.char.toUpperCase() : consonant.char;
        }

        // Make sure it's different from original
        const scrambledMiddle = middleArray.join('');
        if (scrambledMiddle === middle && middle.length > 1) {
            // Swap two adjacent characters
            const i = Math.floor(Math.random() * (middleArray.length - 1));
            [middleArray[i], middleArray[i + 1]] = [middleArray[i + 1], middleArray[i]];
        }

        // Apply language-specific transformations if available
        let result = firstLetter + middleArray.join('') + lastLetter;
        if (nativeLanguage && typeof createL1InterferenceMistake === 'function') {
            // 30% chance to apply L1 interference
            if (Math.random() < 0.3) {
                result = createL1InterferenceMistake(result, nativeLanguage);
            }
        }

        return result;
    }
}