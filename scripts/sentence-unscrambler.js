const Game = {
    sentences: [],
    currentSentence: "",
    scrambledWords: [],
    selectedWords: [],
    score: 0,
    timer: null,
    timeBonus: 1,
    currentIndex: 0,
    hintTimer: null,
    soundEnabled: true,
    difficulty: 'medium',
    stats: {
        completed: 0,
        totalAttempts: 0,
        totalTime: 0,
        correctAnswers: 0
    },
    QUESTION_TIME: 30000, // 30 seconds per sentence

    async init() {
        // Check for language selector before setting up handler
        const languageSelect = document.getElementById('languageSelect');
        if (languageSelect) {
            this.setupLanguageHandler();
        }

        // New initialization for better UX
        this.soundEnabled = true;
        this.difficulty = 'medium';

        // Set up touch support in next frame (after DOM is ready)
        setTimeout(() => {
            this.initTouchSupport();
        }, 0);

        await this.checkGitHubParams();
        this.correctSound = new Audio('sound/correct.mp3');
        this.wrongSound = new Audio('sound/wrong.mp3');
    },

    setupLanguageHandler() {
        const languageSelect = document.getElementById('languageSelect');
        languageSelect.addEventListener('change', (e) => {
            // Future implementation for language switching
            console.log('Language changed to:', e.target.value);
        });
    },

    async checkGitHubParams() {
        const urlParams = new URLSearchParams(window.location.search);
        const owner = urlParams.get('owner');
        const repo = urlParams.get('repo');
        const path = urlParams.get('path');
        if (owner && repo && path) {
            this.showScreen('loadingScreen');

            // Check if githubSource element exists before trying to show it
            const githubSource = document.getElementById('githubSource');
            if (githubSource) {
                githubSource.style.display = 'flex';
            }

            try {
                const url = `https://raw.githubusercontent.com/${owner}/${repo}/main/${path}`;
                console.log(url);
                const response = await fetch(url);

                if (!response.ok) {
                    throw new Error(`Failed to fetch file: ${response.status} ${response.statusText}`);
                }

                const content = await response.text();
                document.getElementById('contentInput').value = content;

                this.showScreen('welcomeScreen');

                if (urlParams.get('autostart') === 'true') {
                    this.start();
                }
            } catch (error) {
                this.showError(`Error loading content: ${error.message}`);
                this.showScreen('welcomeScreen');
            }
        }
    },

    showError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;

        // Check if inputContent exists, if not use a fallback
        const container = document.getElementById('inputContent') || document.querySelector('.quiz-container');
        container.prepend(errorDiv);
        setTimeout(() => errorDiv.remove(), 5000);
    },

    showScreen(screenId) {
        // Handle case where loadingScreen might not exist
        const screen = document.getElementById(screenId);
        if (!screen && screenId === 'loadingScreen') {
            // If loading screen doesn't exist, just proceed
            return;
        }

        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        if (screen) {
            screen.classList.add('active');
        }
    },

    start() {
        const content = document.getElementById('contentInput').value.trim();
        this.sentences = content.split('\n')
            .map(line => line.trim())
            .filter(line => line.length > 0);

        if (this.sentences.length === 0) {
            this.showError('Please enter some sentences first!');
            return;
        }

        this.currentIndex = 0;
        this.score = 0;
        this.timeBonus = 1;
        this.stats = {
            completed: 0,
            totalAttempts: 0,
            totalTime: 0,
            correctAnswers: 0
        };

        document.getElementById('score').textContent = this.score;

        // Only update timeBonus if the element exists
        const timeBonusElement = document.getElementById('timeBonus');
        if (timeBonusElement) {
            timeBonusElement.textContent = this.timeBonus.toFixed(1);
        }

        document.getElementById('currentQuestion').textContent = this.currentIndex + 1;
        document.getElementById('totalQuestions').textContent = this.sentences.length;

        this.showScreen('gameScreen');
        this.nextSentence();
    },

    reset() {
        this.showScreen('welcomeScreen');
        if (this.timer) clearTimeout(this.timer);
        if (this.hintTimer) clearTimeout(this.hintTimer);
        this.sentences = [];
        this.selectedWords = [];
        this.score = 0;
        this.timeBonus = 1;
        this.currentIndex = 0;
    },

    scrambleSentence(sentence) {
        let words = sentence.split(" ")

        if (words.length > 5) {
            let grouped = [];
            for (let i = 0; i < words.length; i += 2) {
                if (i + 1 < words.length) {
                    grouped.push(words[i] + " " + words[i + 1]); // Pair two words
                } else {
                    grouped.push(words[i]); // If odd count, last word stays alone
                }
            }
            return grouped.sort(() => Math.random() - 0.5);;
        }

        return words.sort(() => Math.random() - 0.5);; // Return normally scrambled words if 5 or fewer
    }
    ,

    startTimer() {
        const timerBar = document.querySelector('.timer-bar');
        timerBar.style.transition = 'none';
        timerBar.style.width = '100%';

        setTimeout(() => {
            timerBar.style.transition = `width linear ${this.QUESTION_TIME / 1000}s`;
            timerBar.style.width = '0';
        }, 50);

        if (this.timer) clearTimeout(this.timer);
        this.timer = setTimeout(() => this.checkAnswer(), this.QUESTION_TIME);
    },

    nextSentence() {
        if (this.currentIndex >= this.sentences.length) {
            this.showResults();
            return;
        }

        this.selectedWords = [];
        this.currentSentence = this.sentences[this.currentIndex];
        this.scrambledWords = this.scrambleSentence(this.currentSentence);

        document.getElementById('currentQuestion').textContent = this.currentIndex + 1;
        this.updateDisplay();
        this.startTimer();
    },

    toggleWord(word, index) {
        const wordElement = document.querySelector(`[data-index="${index}"]`);

        if (wordElement.classList.contains('selected')) {
            // Remove word from selection
            wordElement.classList.remove('selected');

            // Add removal animation
            wordElement.classList.add('word-removed');
            setTimeout(() => wordElement.classList.remove('word-removed'), 300);

            this.selectedWords = this.selectedWords.filter(w => w !== word);
        } else {
            // Add word to selection
            wordElement.classList.add('selected');

            // Add selection animation
            wordElement.classList.add('word-added');
            setTimeout(() => wordElement.classList.remove('word-added'), 300);

            this.selectedWords.push(word);

            // Play a subtle sound effect (optional)
            this.playSelectSound();
        }

        this.updateSentenceArea();
        this.provideSentenceHint();
    },

    // Add a subtle sound effect for feedback
    playSelectSound() {
        // Only create and play audio if supported and enabled
        if (this.soundEnabled && window.AudioContext) {
            try {
                const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
                const oscillator = audioCtx.createOscillator();
                const gainNode = audioCtx.createGain();

                oscillator.type = 'sine';
                oscillator.frequency.value = 440; // A4 note
                gainNode.gain.value = 0.1; // Very quiet

                oscillator.connect(gainNode);
                gainNode.connect(audioCtx.destination);

                oscillator.start();
                oscillator.stop(audioCtx.currentTime + 0.1); // Very short duration
            } catch (e) {
                console.log('Audio feedback not supported');
            }
        }
    },
    playSoundEffect(type) {
        if (!this.soundEnabled) return;

        try {
            if (type === 'correct') {
                // Play preloaded correct sound
                this.correctSound.currentTime = 0; // Reset to beginning
                this.correctSound.play().catch(e => {
                    console.log('Error playing sound:', e);
                });
            } else if (type === 'wrong') {
                // Play preloaded wrong sound
                this.wrongSound.currentTime = 0; // Reset to beginning
                this.wrongSound.play().catch(e => {
                    console.log('Error playing sound:', e);
                });
            }
        } catch (e) {
            console.log('Audio feedback not supported');
        }
    },
    updateDisplay() {
        const wordBank = document.getElementById('wordBank');
        wordBank.innerHTML = '';

        this.scrambledWords.forEach((word, index) => {
            const button = document.createElement('button');
            button.className = `answer-btn answer-${index % 4}`;
            button.setAttribute('draggable', 'true');

            // Remove key hint - we don't need this anymore
            // Just add the word text
            button.textContent = word;
            button.dataset.index = index;
            button.dataset.word = word;

            // Click handler
            button.onclick = () => this.toggleWord(word, index);

            // Drag-and-drop handlers
            button.addEventListener('dragstart', this.handleDragStart.bind(this));

            wordBank.appendChild(button);
        });

        // Make sentence area a drop target
        const sentenceArea = document.getElementById('sentenceArea');
        sentenceArea.addEventListener('dragover', this.handleDragOver.bind(this));
        sentenceArea.addEventListener('drop', this.handleDrop.bind(this));
        sentenceArea.addEventListener('dragleave', this.handleDragLeave.bind(this));

        this.updateSentenceArea();
    },

    // Drag and drop handlers
    handleDragStart(e) {
        e.dataTransfer.setData('text/plain', e.target.dataset.index);
        e.dataTransfer.setData('application/word', e.target.dataset.word);
        e.target.classList.add('dragging');
    },

    handleDragOver(e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        e.target.classList.add('drag-over');
    },

    handleDragLeave(e) {
        e.target.classList.remove('drag-over');
    },

    handleDrop(e) {
        e.preventDefault();
        const index = e.dataTransfer.getData('text/plain');
        const word = e.dataTransfer.getData('application/word');

        // If word isn't already selected, select it
        if (!this.selectedWords.includes(word)) {
            this.toggleWord(word, index);
        }

        e.target.classList.remove('drag-over');
        document.querySelector(`[data-index="${index}"]`).classList.remove('dragging');
    },

    // Enhanced sentence area update with animations
    updateSentenceArea() {
        const sentenceArea = document.getElementById('sentenceArea');

        // Clear existing content
        sentenceArea.innerHTML = '';

        if (this.selectedWords.length === 0) {
            sentenceArea.textContent = 'Drag or click words to build your sentence';
            return;
        }

        // Create animated word spans
        this.selectedWords.forEach((word, idx) => {
            const wordSpan = document.createElement('span');
            wordSpan.className = 'sentence-word';
            wordSpan.textContent = word;
            wordSpan.style.animationDelay = `${idx * 0.1}s`;
            sentenceArea.appendChild(wordSpan);

            // Add space after word (except last word)
            if (idx < this.selectedWords.length - 1) {
                sentenceArea.appendChild(document.createTextNode(' '));
            }
        });

        // Check for partial correctness and provide visual feedback
        this.checkPartialCorrectness();
    },

    // Add contextual hints
    provideSentenceHint() {
        if (this.selectedWords.length === 0) {
            return; // No hint needed yet
        }

        // Get first few words of the correct sentence
        const correctFirstWords = this.currentSentence.split(' ').slice(0, 2).join(' ');
        const userFirstWords = this.selectedWords.slice(0, 2).join(' ');

        // If they've got the first few words right, give positive feedback
        if (this.selectedWords.length >= 2 && correctFirstWords === userFirstWords) {
            this.showHint("Good start! Keep going...", "positive");
        }

        // If they're completely off track with several words
        if (this.selectedWords.length >= 3 && !this.currentSentence.startsWith(this.selectedWords.join(' '))) {
            this.showHint("Try a different starting word", "hint");
        }
    },

    // Show a hint message
    showHint(message, type = 'hint') {
        const hintDiv = document.getElementById('hintArea') || this.createHintArea();
        hintDiv.textContent = message;
        hintDiv.className = `hint-message ${type}`;

        // Auto clear after a few seconds
        clearTimeout(this.hintTimer);
        this.hintTimer = setTimeout(() => {
            hintDiv.className = 'hint-message hidden';
        }, 3000);
    },

    // Create hint area if it doesn't exist
    createHintArea() {
        const hintDiv = document.createElement('div');
        hintDiv.id = 'hintArea';
        hintDiv.className = 'hint-message';

        const gameScreen = document.getElementById('gameScreen');
        const sentenceArea = document.getElementById('sentenceArea');

        gameScreen.insertBefore(hintDiv, sentenceArea.nextSibling);
        return hintDiv;
    },

    // Check for partial correctness in real-time
    checkPartialCorrectness() {
        if (this.selectedWords.length === 0) return;

        const userSentence = this.selectedWords.join(' ');
        const isCorrect = userSentence === this.currentSentence;
        if (isCorrect) {
            this.checkAnswer();
            return;
        }
        const correctWords = this.currentSentence.split(' ');
        const userWords = this.selectedWords;

        // Check if what they have so far matches the beginning of the sentence
        let correctSoFar = true;
        for (let i = 0; i < userWords.length; i++) {
            if (i >= correctWords.length || userWords[i] !== correctWords[i]) {
                correctSoFar = false;
                break;
            }
        }

        // Provide visual feedback
        const sentenceArea = document.getElementById('sentenceArea');
        if (correctSoFar) {
            sentenceArea.classList.add('correct-so-far');
            sentenceArea.classList.remove('incorrect-order');
        } else {
            sentenceArea.classList.remove('correct-so-far');
            sentenceArea.classList.add('incorrect-order');
        }
    },

    // Add touch swipe support for word reordering
    initTouchSupport() {
        const sentenceArea = document.getElementById('sentenceArea');
        let touchStartX = 0;
        let touchStartY = 0;
        let touchedWordIdx = -1;

        sentenceArea.addEventListener('touchstart', (e) => {
            const touch = e.touches[0];
            touchStartX = touch.clientX;
            touchStartY = touch.clientY;

            // Find which word was touched
            const sentenceWords = document.querySelectorAll('.sentence-word');
            for (let i = 0; i < sentenceWords.length; i++) {
                const rect = sentenceWords[i].getBoundingClientRect();
                if (touch.clientX >= rect.left && touch.clientX <= rect.right &&
                    touch.clientY >= rect.top && touch.clientY <= rect.bottom) {
                    touchedWordIdx = i;
                    sentenceWords[i].classList.add('touched');
                    break;
                }
            }
        });

        sentenceArea.addEventListener('touchmove', (e) => {
            if (touchedWordIdx === -1) return;

            const touch = e.touches[0];
            const deltaX = touch.clientX - touchStartX;

            // If significant horizontal movement
            if (Math.abs(deltaX) > 30) {
                e.preventDefault(); // Prevent scrolling

                const sentenceWords = document.querySelectorAll('.sentence-word');
                sentenceWords[touchedWordIdx].style.transform = `translateX(${deltaX}px)`;

                // Determine if we should swap with another word
                const newIdx = this.getSwapTargetIndex(touchedWordIdx, deltaX);
                if (newIdx !== -1 && newIdx !== touchedWordIdx) {
                    this.swapWords(touchedWordIdx, newIdx);
                    touchedWordIdx = newIdx;
                    touchStartX = touch.clientX;
                }
            }
        });

        sentenceArea.addEventListener('touchend', () => {
            if (touchedWordIdx === -1) return;

            const sentenceWords = document.querySelectorAll('.sentence-word');
            sentenceWords[touchedWordIdx].style.transform = '';
            sentenceWords[touchedWordIdx].classList.remove('touched');
            touchedWordIdx = -1;

            // Check if the new order is correct
            this.checkPartialCorrectness();
        });
    },

    // Helper for swipe reordering - find word to swap with
    getSwapTargetIndex(currentIdx, deltaX) {
        const sentenceWords = document.querySelectorAll('.sentence-word');
        const currentWord = sentenceWords[currentIdx];
        const currentRect = currentWord.getBoundingClientRect();

        const targetIdx = deltaX > 0 ? currentIdx + 1 : currentIdx - 1;

        // Check if target index is valid
        if (targetIdx < 0 || targetIdx >= sentenceWords.length) {
            return -1;
        }

        return targetIdx;
    },

    // Swap words in the selected words array
    swapWords(idx1, idx2) {
        // Swap words in the array
        [this.selectedWords[idx1], this.selectedWords[idx2]] =
            [this.selectedWords[idx2], this.selectedWords[idx1]];

        // Update display
        this.updateSentenceArea();
    },

    // Add settings panel
    addSettings() {
        const settingsBtn = document.createElement('button');
        settingsBtn.className = 'settings-btn';
        settingsBtn.innerHTML = '<svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 9.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"></path></svg>';
        settingsBtn.onclick = () => this.toggleSettings();

        const gameContainer = document.querySelector('.quiz-container');
        gameContainer.appendChild(settingsBtn);


        // Add event listeners for settings
        document.getElementById('soundToggle').addEventListener('change', (e) => {
            this.soundEnabled = e.target.checked;
        });

        document.getElementById('difficultyLevel').addEventListener('change', (e) => {
            this.difficulty = e.target.value;
        });

        document.getElementById('timerDuration').addEventListener('change', (e) => {
            this.QUESTION_TIME = parseInt(e.target.value);
        });

        document.getElementById('closeSettings').addEventListener('click', () => {
            this.toggleSettings();
        });
    },

    // Toggle settings panel visibility
    toggleSettings() {
        const settingsPanel = document.getElementById('settingsPanel');
        settingsPanel.classList.toggle('hidden');
    },

    calculateTimeBonus() {
        const timerBar = document.querySelector('.timer-bar');
        const timeLeft = parseFloat(getComputedStyle(timerBar).width) /
            parseFloat(getComputedStyle(document.querySelector('.timer')).width);
        return Math.max(0.1, timeLeft);
    },

    checkAnswer() {
        if (this.timer) clearTimeout(this.timer);

        const userSentence = this.selectedWords.join(' ');
        const isCorrect = userSentence === this.currentSentence;

        const buttons = document.querySelectorAll('.answer-btn');
        buttons.forEach(button => {
            button.disabled = true;
        });

        this.stats.totalAttempts++;
        if (isCorrect) {
            this.stats.correctAnswers++;
            const timeBonus = this.calculateTimeBonus();
            const points = Math.round(1000 * timeBonus * this.timeBonus);
            this.score += points;
            this.timeBonus = Math.min(2.0, this.timeBonus + 0.1);

            // Show celebratory animation
            const sentenceArea = document.getElementById('sentenceArea');
            sentenceArea.classList.add('correct-so-far');
            this.showHint("Perfect! Great job!", "positive");
            this.playSoundEffect("correct");
            buttons.forEach(button => {
                button.classList.add('correct');
            });
        } else {
            this.timeBonus = 1.0;
            const correctWordIndices = new Set();
            this.currentSentence.split(' ').forEach(word => {
                buttons.forEach((button, index) => {
                    if (button.textContent === word) {
                        correctWordIndices.add(index);
                    }
                });
            });
            this.playSoundEffect("wrong");

            // Show the correct sentence
            const sentenceArea = document.getElementById('sentenceArea');
            sentenceArea.innerHTML = '';
            sentenceArea.classList.remove('correct-so-far');
            sentenceArea.classList.remove('incorrect-order');

            const correctMessage = document.createElement('div');
            correctMessage.className = 'correct-answer';
            correctMessage.innerHTML = '<span>Correct sentence:</span> ' + this.currentSentence;
            sentenceArea.appendChild(correctMessage);

            buttons.forEach((button, index) => {
                if (!correctWordIndices.has(index)) {
                    button.classList.add('wrong');
                }
            });
        }

        document.getElementById('score').textContent = this.score;

        // Only update timeBonus if the element exists
        const timeBonusElement = document.getElementById('timeBonus');
        if (timeBonusElement) {
            timeBonusElement.textContent = this.timeBonus.toFixed(1);
        }

        this.stats.completed++;
        this.currentIndex++;

        setTimeout(() => {
            this.nextSentence();
        }, 1500);
    },

    showResults() {
        // Calculate final statistics
        const accuracy = (this.stats.correctAnswers / this.stats.totalAttempts * 100) || 0;
        const avgTime = this.stats.completed ? (this.stats.totalTime / this.stats.completed).toFixed(1) : 0;

        // Update results screen - check if elements exist before updating
        document.getElementById('finalScore').textContent = this.score;

        const completedCount = document.getElementById('completedCount');
        if (completedCount) {
            completedCount.textContent = this.stats.completed;
        }

        const accuracyElement = document.getElementById('accuracy');
        if (accuracyElement) {
            accuracyElement.textContent = `${accuracy.toFixed(1)}%`;
        }

        const avgTimeElement = document.getElementById('avgTime');
        if (avgTimeElement) {
            avgTimeElement.textContent = `${avgTime}s`;
        }

        this.showScreen('resultsScreen');
    }
};

// Handle keyboard shortcuts
document.addEventListener('keydown', (event) => {
    const gameScreen = document.getElementById('gameScreen');
    if (gameScreen && gameScreen.classList.contains('active')) {

    }
});

// Initialize the game
document.addEventListener('DOMContentLoaded', () => Game.init());