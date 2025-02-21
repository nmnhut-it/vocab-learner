let vocabulary = [];
let currentQuestion = 0;
let score = 0;
let correctCount = 0;
let timer;
let timeWarningTimeout;
let tickInterval;
let streak = 0;
let bestStreak = 0;
const QUESTION_TIME = 7; // seconds
let isAnswered = false;
let currentQuestionId = null; // Track the active question ID
const MAX_QUESTIONS = 20;
let soundEffects = {
    correct: new Audio('sound/correct.mp3'),
    wrong: new Audio('sound/wrong.mp3'),
    tick: new Audio('sound/tick.mp3'),
    tink: new Audio('sound/tink.mp3'),
    gameStart: new Audio('sound/game-start.mp3'),
    gameOver: new Audio('sound/game-over.mp3'),
    timeWarning: new Audio('sound/time-warning.mp3')
};

// Request vocabulary data from parent window
window.onload = () => {
    // First try to get from parent window
    window.parent.postMessage({ type: 'requestVocabulary' }, '*');
    // Add this to vocabhoot.html
    const CRYPTO_KEY = "voctoolpasskey"; // Must match the key in main.js

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

    // Modified getVocabularyFromURL function
    function getVocabularyFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        const encryptedData = urlParams.get('data');

        if (encryptedData) {
            try {
                const decryptedData = decryptData(encryptedData, CRYPTO_KEY);
                return JSON.parse(decryptedData);
            } catch (error) {
                console.error('Error parsing vocabulary data:', error);
                return [];
            }
        }
        return [];
    }
    // Listen for vocabulary data from parent
    window.addEventListener('message', function (event) {
        if (event.data && event.data.type === 'vocabularyData') {
            vocabulary = event.data.data;
            initializeGame();
        }
    });

    // Set a timeout to show error if no data received
    setTimeout(() => {
        if (vocabulary.length === 0) {
            showScreen('errorScreen');
        }
    }, 1000);
};

function initializeGame() {
    if (vocabulary.length > 0) {
        document.getElementById('totalQuestions').textContent =
            Math.min(vocabulary.length, MAX_QUESTIONS);
        showScreen('welcomeScreen');
    }
}

// Extract vocabulary data from URL parameters
function getVocabularyFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const dataParam = urlParams.get('data');

    if (dataParam) {
        try {
            return JSON.parse(decodeURIComponent(dataParam));
        } catch (error) {
            console.error('Error parsing vocabulary data:', error);
            return [];
        }
    }
    return [];
}

function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.style.display = 'none';
    });
    document.getElementById(screenId).style.display = 'block';
}

function startGame() {
    if (vocabulary.length === 0) {
        showScreen('errorScreen');
        return;
    }

    // Play game start sound
    soundEffects.gameStart.currentTime = 0;
    soundEffects.gameStart.play().catch(e => console.log('Error playing sound:', e));

    score = 0;
    currentQuestion = 0;
    correctCount = 0;
    streak = 0;
    bestStreak = 0;
    updateScore();
    updateStreak();
    showQuestion();
}
function generateQuestion() {
    const word = vocabulary[currentQuestion];

    // Randomly decide question type:
    // 0: English to Vietnamese
    // 1: Vietnamese to English
    // 2: Spelling challenge (various types)

    const questionType = Math.floor(Math.random() * 3);

    let question, correct, options, prompt;
    let spellingType = 0; // Default spelling type (scrambled)

    if (questionType === 0) {
        // English to Vietnamese
        question = word.english;
        correct = word.vietnamese;
        options = [word.vietnamese];
        prompt = "What's the correct translation?";

        // Add 3 random incorrect options
        while (options.length < 4) {
            const randomIndex = Math.floor(Math.random() * vocabulary.length);
            const randomWord = vocabulary[randomIndex];
            if (!options.includes(randomWord.vietnamese) && randomWord.vietnamese !== word.vietnamese) {
                options.push(randomWord.vietnamese);
            }
        }
    } else if (questionType === 1) {
        // Vietnamese to English
        question = word.vietnamese;
        correct = word.english;
        options = [word.english];
        prompt = "What's the English translation?";

        // Add 3 random incorrect options
        while (options.length < 4) {
            const randomIndex = Math.floor(Math.random() * vocabulary.length);
            const randomWord = vocabulary[randomIndex];
            if (!options.includes(randomWord.english) && randomWord.english !== word.english) {
                options.push(randomWord.english);
            }
        }
    } else {
        // Spelling challenge with multiple variations
        const originalWord = word.english;

        // Only do spelling challenges for words with 3+ characters
        if (originalWord.length <= 3) {
            // If word is too short, default to English-Vietnamese
            question = word.english;
            correct = word.vietnamese;
            options = [word.vietnamese];
            prompt = "What's the correct translation?";

            while (options.length < 4) {
                const randomIndex = Math.floor(Math.random() * vocabulary.length);
                const randomWord = vocabulary[randomIndex];
                if (!options.includes(randomWord.vietnamese) && randomWord.vietnamese !== word.vietnamese) {
                    options.push(randomWord.vietnamese);
                }
            }
        } else {
            // Choose spelling challenge type:
            // 0: Scrambled word
            // 1: Missing vowels
            // 2: Missing consonants
            spellingType = Math.floor(Math.random() * 3);

            let modifiedWord;

            if (spellingType === 0) {
                // Scrambled word
                modifiedWord = scrambleWord(originalWord);
                prompt = "Unscramble this English word:";
            } else if (spellingType === 1) {
                // Missing vowels
                modifiedWord = removeVowels(originalWord);
                prompt = "Fill in the vowels for this word:";
            } else {
                // Missing consonants
                modifiedWord = removeConsonants(originalWord);
                prompt = "Fill in the consonants for this word:";
            }

            question = modifiedWord;
            correct = originalWord;
            options = [originalWord];

            // Add 3 random incorrect options (other English words)
            while (options.length < 4) {
                const randomIndex = Math.floor(Math.random() * vocabulary.length);
                const randomWord = vocabulary[randomIndex].english;
                // Make sure options are unique and different from the answer
                if (!options.includes(randomWord) && randomWord !== originalWord) {
                    options.push(randomWord);
                }
            }
        }
    }

    return {
        question: question,
        type: questionType === 0 ? word.type : '', // Only show type for English to Vietnamese
        options: shuffleArray(options),
        correct: correct,
        prompt: prompt,
        questionType: questionType,
        spellingType: spellingType // Add this to track spelling challenge type
    };
}

// Function to scramble a word while keeping first and last letters in place
function scrambleWord(word) {
    if (word.length <= 3) return word;

    // If word contains spaces (multiple words), scramble each word separately
    if (word.includes(' ')) {
        return word.split(' ')
            .map(w => scrambleWord(w))
            .join(' ');
    }

    // If word contains hyphens, scramble each part separately
    if (word.includes('-')) {
        return word.split('-')
            .map(w => scrambleWord(w))
            .join('-');
    }

    // Get first and last letters
    const firstLetter = word.charAt(0);
    const lastLetter = word.charAt(word.length - 1);

    // Get middle section
    let middle = word.substring(1, word.length - 1);

    // Convert to array, shuffle, and join
    const middleArray = middle.split('');

    // Shuffle the middle section
    for (let i = middleArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [middleArray[i], middleArray[j]] = [middleArray[j], middleArray[i]];
    }

    // Make sure the scrambled word is different from the original
    const scrambledMiddle = middleArray.join('');
    if (scrambledMiddle === middle && middle.length > 1) {
        // If it's the same, swap two random characters
        const i = Math.floor(Math.random() * middleArray.length);
        const j = (i + 1) % middleArray.length;
        [middleArray[i], middleArray[j]] = [middleArray[j], middleArray[i]];
    }

    return firstLetter + middleArray.join('') + lastLetter;
}

// Function to remove vowels from a word
function removeVowels(word) {
    // If word contains spaces (multiple words), process each word separately
    if (word.includes(' ')) {
        return word.split(' ')
            .map(w => removeVowels(w))
            .join(' ');
    }

    // If word contains hyphens, process each part separately
    if (word.includes('-')) {
        return word.split('-')
            .map(w => removeVowels(w))
            .join('-');
    }

    return word.replace(/[aeiou]/gi, '_');
}

// Function to remove consonants from a word
function removeConsonants(word) {
    // If word contains spaces (multiple words), process each word separately
    if (word.includes(' ')) {
        return word.split(' ')
            .map(w => removeConsonants(w))
            .join(' ');
    }

    // If word contains hyphens, process each part separately
    if (word.includes('-')) {
        return word.split('-')
            .map(w => removeConsonants(w))
            .join('-');
    }

    return word.replace(/[bcdfghjklmnpqrstvwxyz]/gi, '_');
}
function showQuestion() {
    if (currentQuestion >= vocabulary.length || currentQuestion >= MAX_QUESTIONS) {
        showResults();
        return;
    }

    // Generate unique ID for this question to prevent misplays
    currentQuestionId = Math.random().toString(36).substring(2, 10);
    const questionId = currentQuestionId;

    isAnswered = false;
    showScreen('questionScreen');
    const question = generateQuestion();

    // Play sound effect when showing a new question
    soundEffects.tink.currentTime = 0;
    soundEffects.tink.play().catch(e => console.log('Error playing sound:', e));

    // Safety check to prevent sounds from playing on wrong questions
    if (questionId !== currentQuestionId) {
        console.log('Question changed, cancelling sounds');
        return;
    }

    document.getElementById('currentQuestion').textContent = currentQuestion + 1;
    document.getElementById('questionWord').textContent = question.question;
    document.getElementById('questionType').textContent = question.type;
    document.getElementById('questionPrompt').textContent = question.prompt;

    // Special styling for spelling challenge questions
    const questionWordElement = document.getElementById('questionWord');

    // Remove all possible spelling classes first
    questionWordElement.classList.remove('scrambled-word', 'missing-vowels', 'missing-consonants');

    if (question.questionType === 2) {
        // Apply specific class based on spelling challenge type
        if (question.spellingType === 0) {
            questionWordElement.classList.add('scrambled-word');
        } else if (question.spellingType === 1) {
            questionWordElement.classList.add('missing-vowels');
        } else if (question.spellingType === 2) {
            questionWordElement.classList.add('missing-consonants');
        }
    }

    const container = document.getElementById('answersContainer');
    container.innerHTML = '';

    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = `answer-btn answer-${index}`;

        const shape = document.createElement('div');
        shape.className = 'answer-shape';

        const text = document.createElement('span');
        text.textContent = option;

        button.appendChild(shape);
        button.appendChild(text);
        button.onclick = () => checkAnswer(option, question.correct, button);
        container.appendChild(button);
    });

    startTimer();
}
function startTimer() {
    const timerBar = document.querySelector('.timer-bar');
    timerBar.style.transition = 'none';
    timerBar.style.width = '100%';

    // Store current question ID to check if question changes
    const questionId = currentQuestionId;

    setTimeout(() => {
        // Check if we're still on the same question
        if (questionId !== currentQuestionId) return;

        timerBar.style.transition = `width ${QUESTION_TIME}s linear`;
        timerBar.style.width = '0%';
    }, 50);

    // Set a timer to play a warning sound when time is running low (5 seconds left)
    timeWarningTimeout = setTimeout(() => {
        // Check if we're still on the same question
        if (questionId !== currentQuestionId) return;

        if (!isAnswered) {
            soundEffects.timeWarning.currentTime = 0;
            soundEffects.timeWarning.play().catch(e => console.log('Error playing sound:', e));
        }
    }, (QUESTION_TIME - 3) * 1000);

    // Play tick sound for timer
    tickInterval = setInterval(() => {
        // Check if we're still on the same question
        if (questionId !== currentQuestionId) {
            clearInterval(tickInterval);
            return;
        }

        if (isAnswered) {
            clearInterval(tickInterval);
            return;
        }
        soundEffects.tick.currentTime = 0;
        soundEffects.tick.play().catch(e => { });
    }, 1000);

    clearTimeout(timer);
    timer = setTimeout(() => {
        // Check if we're still on the same question
        if (questionId !== currentQuestionId) return;

        clearInterval(tickInterval);
        checkAnswer(null);
    }, QUESTION_TIME * 1000);
}

function checkAnswer(selected, correct, selectedButton) {
    if (isAnswered) return;

    // Store current question ID to prevent answer processing for wrong questions
    const questionId = currentQuestionId;

    isAnswered = true;
    clearTimeout(timer);
    clearTimeout(timeWarningTimeout);
    clearInterval(tickInterval);

    const buttons = document.querySelectorAll('.answer-btn');
    buttons.forEach(button => {
        button.classList.add('disabled');
        if (button.querySelector('span').textContent === correct) {
            button.classList.add('correct');
        }
    });

    const isCorrect = selected === correct;

    if (selectedButton) {
        selectedButton.classList.add(isCorrect ? 'correct' : 'wrong');
    }

    if (isCorrect) {
        // Play correct sound
        soundEffects.correct.currentTime = 0;
        soundEffects.correct.play().catch(e => console.log('Error playing sound:', e));

        // Calculate score based on remaining time
        const timeLeft = parseFloat(getComputedStyle(document.querySelector('.timer-bar')).width) /
            parseFloat(getComputedStyle(document.querySelector('.timer')).width);
        score += Math.round(1000 * timeLeft);
        correctCount++;

        // Update streak
        streak++;
        if (streak > bestStreak) {
            bestStreak = streak;
        }
    } else {
        // Play wrong sound
        soundEffects.wrong.currentTime = 0;
        soundEffects.wrong.play().catch(e => console.log('Error playing sound:', e));

        // Reset streak
        streak = 0;
    }

    updateScore();
    updateStreak();
    currentQuestion++;

    setTimeout(() => {
        // Check if we're still on the same question (prevents duplicate navigation)
        if (questionId !== currentQuestionId) return;

        showQuestion();
    }, 2000);
}

function updateStreak() {
    const streakDisplay = document.getElementById('streakDisplay');
    if (streakDisplay) {
        streakDisplay.textContent = streak;

        // Add combo class for visual effect if streak is 3 or more
        if (streak >= 3) {
            streakDisplay.className = 'combo';
        } else {
            streakDisplay.className = '';
        }
    }
}

function showResults() {
    // Play game over sound
    soundEffects.gameOver.currentTime = 0;
    soundEffects.gameOver.play().catch(e => console.log('Error playing sound:', e));

    showScreen('resultsScreen');
    document.getElementById('finalScore').textContent = score;
    document.getElementById('correctAnswers').textContent =
        `Correct: ${correctCount}/${currentQuestion}`;
    document.getElementById('accuracy').textContent =
        `Accuracy: ${Math.round((correctCount / currentQuestion) * 100)}%`;
    document.getElementById('avgScore').textContent =
        `Average Score per Question: ${Math.round(score / currentQuestion)}`;
    document.getElementById('bestStreak').textContent =
        `Best Streak: ${bestStreak}`;
}

function updateScore() {
    document.getElementById('scoreDisplay').textContent = score;
}

function shuffleArray(array) {
    const newArray = [...array]; // Create a copy to avoid modifying the original
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}