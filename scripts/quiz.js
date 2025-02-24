const Quiz = {
    questions: [],
    currentIndex: 0,
    score: 0,
    timer: null,
    QUESTION_TIME: 10000, // 10 seconds


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
            // Hide the markdown input if loading from GitHub
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

                // Set the content and remove loading indicator
                markdownInput.value = content;
                if (loadingIndicator) {
                    loadingIndicator.remove();
                }

                // Auto-start the quiz if requested
                if (urlParams.get('autostart') === 'true') {
                    this.start();
                }
            } catch (error) {
                // Show error message
                if (loadingIndicator) {
                    loadingIndicator.innerHTML = `
                        <div class="error-message" style="color: red; text-align: center; margin: 20px;">
                            <p>Error loading quiz content: ${error.message}</p>
                        </div>`;
                }
                console.error('Error loading from GitHub:', error);
            }
        }
    }

    loadSounds() {
        this.sounds = {
            correct: new Audio('sound/correct.mp3'),
            wrong: new Audio('sound/wrong.mp3'),
            tick: new Audio('sound/tick.mp3')
        };

        // Preload sounds
        Object.values(this.sounds).forEach(sound => {
            sound.load();
            sound.volume = 0.5;
        });
    },

    parseMarkdown(markdown) {
        const lines = markdown.split('\n');
        const questions = [];
        let currentQuestion = null;
        let options = [];
        let correctAnswer = null;

        lines.forEach(line => {
            const trimmedLine = line.trim();

            // Handle question headers
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
            // Handle question text (with any number of underscores)
            else if (trimmedLine.match(/[_]+/) || trimmedLine.includes('\\_')) {
                currentQuestion = trimmedLine;
            }
            // Handle answer options
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

        // Add the last question if exists
        if (currentQuestion && options.length > 0) {
            questions.push({
                text: currentQuestion,
                options: options.map(opt => opt.text),
                correctAnswer
            });
        }

        return questions;
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

        const question = this.questions[this.currentIndex];
        document.getElementById('questionText').textContent = question.text;
        document.getElementById('currentQuestion').textContent = this.currentIndex + 1;
        document.getElementById('totalQuestions').textContent = this.questions.length;

        const answersContainer = document.getElementById('answers');
        answersContainer.innerHTML = '';

        const shuffledOptions = this.shuffleArray([...question.options]);
        shuffledOptions.forEach((option, index) => {
            const button = document.createElement('button');
            button.className = `answer-btn answer-${index}`;

            // Add key hint directly in the button
            const keyHint = document.createElement('div');
            keyHint.className = 'key-hint';
            keyHint.textContent = ['Q', 'W', 'E', 'R'][index];

            button.appendChild(keyHint);
            button.appendChild(document.createTextNode(option));

            button.onclick = () => this.checkAnswer(option);
            answersContainer.appendChild(button);
        });

        this.startTimer();
    },

    // Rest of the Quiz object methods remain the same...
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

        setTimeout(() => {
            timerBar.style.transition = 'width linear 10s';
            timerBar.style.width = '0';
        }, 50);

        if (this.timer) clearTimeout(this.timer);
        this.timer = setTimeout(() => this.checkAnswer(null), this.QUESTION_TIME);
    },

    checkAnswer(answer) {
        if (this.timer) clearTimeout(this.timer);

        const question = this.questions[this.currentIndex];
        const isCorrect = answer === question.correctAnswer;

        if (isCorrect) {
            this.sounds.correct.play().catch(() => { });
            const timeLeft = parseFloat(getComputedStyle(document.querySelector('.timer-bar')).width) /
                parseFloat(getComputedStyle(document.querySelector('.timer')).width);
            this.score += Math.round(1000 * timeLeft);
        } else {
            this.sounds.wrong.play().catch(() => { });
        }

        document.getElementById('score').textContent = this.score;

        setTimeout(() => {
            this.currentIndex++;
            this.showQuestion();
        }, 1000);
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

    if (event.key.toLowerCase() in keyMap) {
        const buttons = document.querySelectorAll('.answer-btn');
        const index = keyMap[event.key.toLowerCase()];
        if (buttons[index]) {
            buttons[index].classList.add('key-pressed');
            setTimeout(() => buttons[index].classList.remove('key-pressed'), 150);
            buttons[index].click();
        }
    }
});