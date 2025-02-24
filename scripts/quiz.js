const Quiz = {
    questions: [],
    currentIndex: 0,
    score: 0,
    timer: null,
    QUESTION_TIME: 10000, // 10 seconds
    isAnswered: false,
    currentQuestionId: null,
    MAX_QUESTIONS: 15,
    // Add new async init method
    async init() {
        this.loadSounds();
        await this.checkGitHubParams();
    },

    async checkGitHubParams() {
        const urlParams = new URLSearchParams(window.location.search);
        const owner = urlParams.get('owner');
        const repo = urlParams.get('repo');
        const path = urlParams.get('path');

        if (owner && repo && path) {
            const markdownInput = document.getElementById('markdownInput');
            const loadingIndicator = document.createElement('div');
            loadingIndicator.id = 'loadingIndicator';
            loadingIndicator.innerHTML = `
                <div style="text-align: center; margin: 20px;">
                    <div class="loading-spinner"></div>
                    <p>Loading quiz content from GitHub...</p>
                </div>`;

            markdownInput.style.display = 'none';
            markdownInput.parentNode.insertBefore(loadingIndicator, markdownInput);

            try {
                const url = `https://raw.githubusercontent.com/${owner}/${repo}/refs/heads/main/${path}`;
                const response = await fetch(url);

                if (!response.ok) {
                    throw new Error(`Failed to fetch file: ${response.status} ${response.statusText}`);
                }

                const content = await response.text();
                markdownInput.value = content;
                loadingIndicator.remove();

                if (urlParams.get('autostart') === 'true') {
                    this.start();
                }
            } catch (error) {
                if (loadingIndicator) {
                    loadingIndicator.innerHTML = `
                        <div class="error-message" style="color: red; text-align: center; margin: 20px;">
                            <p>Error loading quiz content: ${error.message}</p>
                        </div>`;
                }
                console.error('Error loading from GitHub:', error);
            }
        }
    },

    loadSounds() {
        this.sounds = {
            correct: new Audio('sound/correct.mp3'),
            wrong: new Audio('sound/wrong.mp3'),
            tick: new Audio('sound/tick.mp3'),
            tink: new Audio('sound/tink.mp3')
        };

        // Preload sounds
        Object.values(this.sounds).forEach(sound => {
            sound.load();
            sound.volume = 0.5;
        });
    },
    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    },
    parseMarkdown(markdown) {
        const lines = markdown.split('\n');
        const questions = [];
        let currentQuestion = null;
        let options = [];
        let correctAnswer = null;

        lines.forEach(line => {
            const trimmedLine = line.trim();

            if (trimmedLine.startsWith('## ')) {
                if (currentQuestion && options.length > 0) {
                    questions.push({
                        text: currentQuestion,
                        options: options.map(opt => opt.text),
                        correctAnswer
                    });
                }
                currentQuestion = null;
                options = [];
                correctAnswer = null;
            }
            else if (trimmedLine.match(/[_]+/) || trimmedLine.includes('\\_')) {
                currentQuestion = trimmedLine;
            }
            else if (trimmedLine.match(/^[A-D][.)]/)) {
                const option = trimmedLine.slice(2).trim();
                const isCorrect = option.includes('[x]');
                const text = option.replace('[x]', '').trim();

                options.push({ text, isCorrect });
                if (isCorrect) {
                    correctAnswer = text;
                }
            }
        });

        if (currentQuestion && options.length > 0) {
            questions.push({
                text: currentQuestion,
                options: options.map(opt => opt.text),
                correctAnswer
            });
        }
        // Shuffle and limit to MAX_QUESTIONS
        const shuffledQuestions = this.shuffleArray([...questions]);
        return shuffledQuestions.slice(0, this.MAX_QUESTIONS);
    },

    start() {
        const markdown = document.getElementById('markdownInput').value;
        this.questions = this.parseMarkdown(markdown);
        if (this.questions.length === 0) {
            alert('Please add some questions first!');
            return;
        }

        this.currentIndex = 0;
        this.score = 0;
        this.showScreen('questionScreen');
        this.showQuestion();
    },

    showScreen(screenId) {
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        document.getElementById(screenId).classList.add('active');
    },

    showQuestion() {
        if (this.currentIndex >= this.questions.length) {
            this.showResults();
            return;
        }

        // Generate unique ID for this question
        this.currentQuestionId = Math.random().toString(36).substring(2, 10);
        this.isAnswered = false;

        const question = this.questions[this.currentIndex];
        document.getElementById('questionText').textContent = question.text;
        document.getElementById('currentQuestion').textContent = this.currentIndex + 1;
        document.getElementById('totalQuestions').textContent = this.questions.length;

        // Play tink sound for new question
        this.sounds.tink.currentTime = 0;
        this.sounds.tink.play().catch(e => console.log('Error playing sound:', e));

        const answersContainer = document.getElementById('answers');
        answersContainer.innerHTML = '';

        const shuffledOptions = this.shuffleArray([...question.options]);
        shuffledOptions.forEach((option, index) => {
            const button = document.createElement('button');
            button.className = `answer-btn answer-${index}`;

            // Add key hint
            const keyHint = document.createElement('div');
            keyHint.className = 'key-hint';
            keyHint.textContent = ['Q', 'W', 'E', 'R'][index];

            // Add shape div for visual effects
            const shape = document.createElement('div');
            shape.className = 'answer-shape';

            // Add text span
            const text = document.createElement('span');
            text.textContent = option;

            button.appendChild(keyHint);
            button.appendChild(shape);
            button.appendChild(text);

            button.onclick = () => this.checkAnswer(option);
            answersContainer.appendChild(button);
        });

        this.startTimer();
    },

    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    },

    startTimer() {
        const timerBar = document.querySelector('.timer-bar');
        timerBar.style.transition = 'none';
        timerBar.style.width = '100%';

        const questionId = this.currentQuestionId;

        setTimeout(() => {
            if (questionId !== this.currentQuestionId) return;
            timerBar.style.transition = `width ${this.QUESTION_TIME / 1000}s linear`;
            timerBar.style.width = '0';
        }, 50);

        // Start tick sound interval
        const tickInterval = setInterval(() => {
            if (questionId !== this.currentQuestionId || this.isAnswered) {
                clearInterval(tickInterval);
                return;
            }
            this.sounds.tick.currentTime = 0;
            this.sounds.tick.play().catch(() => { });
        }, 1000);

        if (this.timer) clearTimeout(this.timer);
        this.timer = setTimeout(() => {
            if (questionId !== this.currentQuestionId) return;
            clearInterval(tickInterval);
            this.checkAnswer(null);
        }, this.QUESTION_TIME);
    },

    checkAnswer(answer) {
        if (this.isAnswered) return;

        this.isAnswered = true;
        if (this.timer) clearTimeout(this.timer);

        const question = this.questions[this.currentIndex];
        const isCorrect = answer === question.correctAnswer;

        // Get all answer buttons
        let buttons = document.querySelectorAll('.answer-btn');

        // Disable all buttons and add visual feedback
        buttons.forEach(button => {
            button.classList.add('disabled');
            if (button.querySelector('span').textContent === question.correctAnswer) {
                button.classList.add('correct');
            }
        });

        // Add visual feedback for selected wrong answer
        if (answer !== null && !isCorrect) {
            const selectedButton = Array.from(buttons).find(btn =>
                btn.querySelector('span').textContent === answer
            );
            if (selectedButton) {
                selectedButton.classList.add('wrong');
            }
        }

        // Play sound effects and update score
        if (isCorrect) {
            this.sounds.correct.play().catch(() => { });
            const timeLeft = parseFloat(getComputedStyle(document.querySelector('.timer-bar')).width) /
                parseFloat(getComputedStyle(document.querySelector('.timer')).width);
            this.score += Math.round(1000 * timeLeft);
        } else {
            this.sounds.wrong.play().catch(() => { });
        }

        document.getElementById('score').textContent = this.score;

        // Wait longer for animations to complete
        setTimeout(() => {
            this.currentIndex++;
            this.showQuestion();
        }, 2000);
    },

    showResults() {
        document.getElementById('finalScore').textContent = `Final Score: ${this.score}`;
        this.showScreen('resultsScreen');
    },

    reset() {
        this.showScreen('welcomeScreen');
    }
};

// Handle keyboard shortcuts
document.addEventListener('keydown', (event) => {
    const keyMap = {
        'q': 0,
        'w': 1,
        'e': 2,
        'r': 3
    };

    if (event.key.toLowerCase() in keyMap && !Quiz.isAnswered) {
        const buttons = document.querySelectorAll('.answer-btn');
        const index = keyMap[event.key.toLowerCase()];
        if (buttons[index] && !buttons[index].classList.contains('disabled')) {
            buttons[index].classList.add('key-pressed');
            setTimeout(() => buttons[index].classList.remove('key-pressed'), 150);
            buttons[index].click();
        }
    }
});

document.addEventListener('DOMContentLoaded', async () => {
    await Quiz.init();
});