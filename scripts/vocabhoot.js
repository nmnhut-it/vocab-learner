// Game state management
class VocabHootGame {
    constructor() {
        this.vocabulary = [];
        this.currentQuestion = 0;
        this.score = 0;
        this.correctCount = 0;
        this.timer = null;
        this.QUESTION_TIME = 20;
        this.isAnswered = false;
        this.sounds = {
            background: new Audio('sound/game-music.mp3'),
            correct: new Audio('sound/correct.mp3'),
            wrong: new Audio('sound/wrong.mp3'),
            tick: new Audio('sound/tick.mp3'),
            timeWarning: new Audio('sound/time-warning.mp3'),
            gameOver: new Audio('sound/game-over.mp3'),
            click: new Audio('sound/click.mp3'),
            start: new Audio('sound/game-start.mp3')
        };

        // Initialize sound settings
        Object.values(this.sounds).forEach(sound => {
            sound.preload = 'auto';
            if (sound === this.sounds.background) {
                sound.loop = true;
                sound.volume = 0.3;
            }
        });

        this.initializeGame();
        this.setupEventListeners();
    }

    initializeGame() {
        // Request vocabulary data from parent window
        window.parent.postMessage({ type: 'requestVocabulary' }, '*');
        this.showScreen('welcomeScreen');

        // Initialize UI elements
        this.screens = {
            welcome: document.getElementById('welcomeScreen'),
            question: document.getElementById('questionScreen'),
            results: document.getElementById('resultsScreen')
        };

        this.elements = {
            currentQuestion: document.getElementById('currentQuestion'),
            scoreDisplay: document.getElementById('scoreDisplay'),
            questionText: document.getElementById('questionText'),
            answersContainer: document.getElementById('answersContainer'),
            timerBar: document.querySelector('.timer-bar'),
            streakCounter: document.getElementById('streakCounter'),
            comboMultiplier: document.getElementById('comboMultiplier')
        };
    }

    setupEventListeners() {
        // Handle vocabulary data reception
        window.addEventListener('message', (event) => {
            if (event.data.type === 'vocabularyData') {
                this.vocabulary = event.data.data;
                if (this.vocabulary.length === 0) {
                    alert('Please add some vocabulary first!');
                }
            }
        });

        // Add touch support for mobile devices
        document.addEventListener('touchstart', this.handleTouchStart.bind(this));
    }

    startGame() {
        if (this.vocabulary.length === 0) {
            window.parent.postMessage({ type: 'requestVocabulary' }, '*');
            alert('Please add some vocabulary first!');
            return;
        }

        this.resetGameState();
        this.sounds.start.play();
        this.sounds.background.play();
        this.showQuestion();
    }

    resetGameState() {
        this.score = 0;
        this.currentQuestion = 0;
        this.correctCount = 0;
        this.streak = 0;
        this.updateScore();
        this.updateStreak();
    }

    generateQuestion() {
        const word = this.vocabulary[this.currentQuestion];
        const options = [word.vietnamese];

        // Add 3 random incorrect options
        while (options.length < 4) {
            const randomWord = this.vocabulary[Math.floor(Math.random() * this.vocabulary.length)];
            if (!options.includes(randomWord.vietnamese)) {
                options.push(randomWord.vietnamese);
            }
        }

        return {
            question: word.english,
            options: this.shuffleArray(options),
            correct: word.vietnamese,
            type: word.type // Include word type for additional context
        };
    }

    showQuestion() {
        if (this.currentQuestion >= this.vocabulary.length || this.currentQuestion >= 10) {
            this.showResults();
            return;
        }

        this.isAnswered = false;
        this.showScreen('questionScreen');
        const question = this.generateQuestion();

        // Update UI
        this.elements.currentQuestion.textContent = this.currentQuestion + 1;
        this.elements.questionText.innerHTML = this.formatQuestion(question);
        this.renderAnswerOptions(question);
        this.startTimer();
    }

    formatQuestion(question) {
        return `
            <div class="question-word">${question.question}</div>
            <div class="question-type">${question.type}</div>
            <div class="question-prompt">What's the meaning?</div>
        `;
    }

    renderAnswerOptions(question) {
        this.elements.answersContainer.innerHTML = '';
        question.options.forEach((option, index) => {
            const button = this.createAnswerButton(option, index);
            button.onclick = () => this.checkAnswer(option, question.correct, button);
            this.elements.answersContainer.appendChild(button);
        });
    }

    createAnswerButton(option, index) {
        const button = document.createElement('button');
        button.className = `answer-btn answer-${index}`;

        const shape = document.createElement('div');
        shape.className = 'answer-shape';

        const text = document.createElement('span');
        text.textContent = option;

        button.appendChild(shape);
        button.appendChild(text);

        return button;
    }

    startTimer() {
        this.elements.timerBar.style.transition = 'none';
        this.elements.timerBar.style.width = '100%';

        // Play tick sound when 5 seconds remaining
        setTimeout(() => {
            if (!this.isAnswered) {
                this.sounds.timeWarning.play();
            }
        }, (this.QUESTION_TIME - 5) * 1000);

        setTimeout(() => {
            this.elements.timerBar.style.transition = `width ${this.QUESTION_TIME}s linear`;
            this.elements.timerBar.style.width = '0%';
        }, 50);

        clearTimeout(this.timer);
        this.timer = setTimeout(() => this.checkAnswer(null), this.QUESTION_TIME * 1000);
    }

    checkAnswer(selected, correct, selectedButton) {
        if (this.isAnswered) return;
        this.isAnswered = true;
        clearTimeout(this.timer);

        const isCorrect = selected === correct;
        this.updateGameState(isCorrect, selectedButton);
        this.playFeedbackSound(isCorrect);
        this.showAnswerFeedback(correct, selectedButton, isCorrect);

        setTimeout(() => this.proceedToNextQuestion(), 2000);
    }

    updateGameState(isCorrect, selectedButton) {
        if (isCorrect) {
            const timeLeft = parseFloat(getComputedStyle(this.elements.timerBar).width) /
                parseFloat(getComputedStyle(document.querySelector('.timer')).width);
            const baseScore = Math.round(1000 * timeLeft);
            const multiplier = Math.min(3, 1 + Math.floor(this.streak / 3));
            this.score += baseScore * multiplier;
            this.correctCount++;
            this.streak++;
        } else {
            this.streak = 0;
        }

        this.updateScore();
        this.updateStreak();
    }

    playFeedbackSound(isCorrect) {
        if (isCorrect) {
            this.sounds.correct.play();
        } else {
            this.sounds.wrong.play();
        }
    }

    showAnswerFeedback(correct, selectedButton, isCorrect) {
        const buttons = document.querySelectorAll('.answer-btn');
        buttons.forEach(button => {
            button.classList.add('disabled');
            if (button.querySelector('span').textContent === correct) {
                button.classList.add('correct');
            }
        });

        if (selectedButton) {
            selectedButton.classList.add(isCorrect ? 'correct' : 'wrong');
        }
    }

    proceedToNextQuestion() {
        this.currentQuestion++;
        this.showQuestion();
    }

    showResults() {
        this.sounds.background.pause();
        this.sounds.background.currentTime = 0;
        this.sounds.gameOver.play();

        this.showScreen('resultsScreen');
        this.updateResultsScreen();
    }

    updateResultsScreen() {
        document.getElementById('finalScore').textContent = this.score;
        document.getElementById('correctAnswers').textContent =
            `Correct: ${this.correctCount}/${this.currentQuestion}`;
        document.getElementById('accuracy').textContent =
            `Accuracy: ${Math.round((this.correctCount / this.currentQuestion) * 100)}%`;
        document.getElementById('avgScore').textContent =
            `Average Score per Question: ${Math.round(this.score / this.currentQuestion)}`;

        // Add high score tracking if needed
        this.updateHighScore();
    }

    // Utility methods
    showScreen(screenId) {
        Object.values(this.screens).forEach(screen => {
            screen.style.display = 'none';
        });
        this.screens[screenId].style.display = 'block';
    }

    updateScore() {
        this.elements.scoreDisplay.textContent = this.score;
    }

    updateStreak() {
        this.elements.streakCounter.textContent = `Streak: ${this.streak}`;
        const multiplier = Math.min(3, 1 + Math.floor(this.streak / 3));
        this.elements.comboMultiplier.textContent = `${multiplier}x`;
    }

    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    handleTouchStart(event) {
        // Prevent default touch behavior for game buttons
        if (event.target.closest('.answer-btn')) {
            event.preventDefault();
        }
    }
}

// Initialize game when document is ready
document.addEventListener('DOMContentLoaded', () => {
    window.vocabHoot = new VocabHootGame();
});