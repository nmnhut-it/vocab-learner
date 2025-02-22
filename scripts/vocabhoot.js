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

// Current language (default: English)
let currentLanguage = 'vi';

// Add this to the top of vocabhoot.js file, after the initial variable declarations

// Default GitHub repository settings (can be customized)
const DEFAULT_GITHUB_OWNER = "nmnhut-it"; // Replace with your GitHub username
const DEFAULT_GITHUB_REPO = "vocabulary-learner"; // Replace with your repository name

// Function to load vocabulary from GitHub based on URL parameters
async function loadVocabFromGitHub() {
    // Get URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const owner = urlParams.get('owner') || DEFAULT_GITHUB_OWNER;
    const repo = urlParams.get('repo') || DEFAULT_GITHUB_REPO;
    const path = urlParams.get('path');

    // If path parameter is missing, return without loading
    if (!path) {
        return false;
    }

    try {
        // Show loading indicator
        showLoadingIndicator("Loading vocabulary from GitHub...");

        // GitHub raw content URL format
        const url = `https://raw.githubusercontent.com/${owner}/${repo}/refs/heads/main/${path}`;

        // Fetch the file content
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Failed to fetch file: ${response.status} ${response.statusText}`);
        }

        const content = await response.text();

        // Process the content based on file extension
        const fileExtension = path.split('.').pop().toLowerCase();
        let vocabularyList = [];

        if (fileExtension === 'json') {
            // If it's a JSON file, parse it directly
            vocabularyList = JSON.parse(content);
        } else if (fileExtension === 'txt' || fileExtension === 'csv') {
            // If it's a text file, parse it as a vocabulary list format
            const lines = content.split('\n');

            lines.forEach((line) => {
                if (!line.trim()) return;

                // Parse line based on vocabulary format
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

        // Hide loading indicator
        hideLoadingIndicator();

        if (vocabularyList.length === 0) {
            throw new Error('No vocabulary items found in the file');
        }

        // Set the vocabulary list and initialize the game
        vocabulary = vocabularyList;
        initializeGame();
        return true;

    } catch (error) {
        console.error('Error loading vocabulary from GitHub:', error);
        hideLoadingIndicator();
        showError(`Failed to load vocabulary: ${error.message}`);
        return false;
    }
}

// Helper function to show loading indicator
function showLoadingIndicator(message) {
    const loadingDiv = document.createElement('div');
    loadingDiv.id = 'loading-indicator';
    loadingDiv.textContent = message;
    loadingDiv.style.position = 'fixed';
    loadingDiv.style.top = '50%';
    loadingDiv.style.left = '50%';
    loadingDiv.style.transform = 'translate(-50%, -50%)';
    loadingDiv.style.padding = '15px 20px';
    loadingDiv.style.background = 'rgba(0, 0, 0, 0.8)';
    loadingDiv.style.color = 'white';
    loadingDiv.style.borderRadius = '10px';
    loadingDiv.style.zIndex = '1000';
    document.body.appendChild(loadingDiv);
}

// Helper function to hide loading indicator
function hideLoadingIndicator() {
    const loadingDiv = document.getElementById('loading-indicator');
    if (loadingDiv) {
        document.body.removeChild(loadingDiv);
    }
}

// Helper function to show error message
function showError(message) {
    const errorMessage = document.getElementById('error-message');
    if (errorMessage) {
        errorMessage.textContent = message;
    }
    showScreen('errorScreen');
}

// Generate a VocabHoot URL with GitHub parameters
function generateGitHubVocabHootURL(path, owner = DEFAULT_GITHUB_OWNER, repo = DEFAULT_GITHUB_REPO) {
    const baseUrl = window.location.origin + window.location.pathname;
    return `${baseUrl}?owner=${encodeURIComponent(owner)}&repo=${encodeURIComponent(repo)}&path=${encodeURIComponent(path)}`;
}

// Request vocabulary data from parent window
window.onload = () => {
    // First try to get from parent window
    window.parent.postMessage({ type: 'requestVocabulary' }, '*');

    // Add keyboard event listener for QWER keys
    document.addEventListener('keydown', handleKeyPress);

    // Load language from local storage (if saved)
    const savedLanguage = localStorage.getItem('vocabhoot_language');
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'vi')) {
        currentLanguage = savedLanguage;
        document.getElementById('language-select').value = currentLanguage;
    }

    // Apply initial language
    applyLanguage();

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
    // First check if we have data in the URL
    const urlVocabulary = getVocabularyFromURL();

    if (urlVocabulary && urlVocabulary.length > 0) {
        // If we have vocabulary in the URL, use it
        vocabulary = urlVocabulary;
        initializeGame();
    } else {
        // Otherwise, request from parent window
        window.parent.postMessage({ type: 'requestVocabulary' }, '*');
    }


    // Set a timeout to show error if no data received
    setTimeout(() => {
        if (vocabulary.length === 0) {
            showScreen('errorScreen');
        }
    }, 1000);
};

// Change language function
function changeLanguage(lang) {
    if (lang === 'en' || lang === 'vi') {
        currentLanguage = lang;
        // Save to localStorage for persistence
        localStorage.setItem('vocabhoot_language', lang);
        // Apply language changes
        applyLanguage();
    }
}

// Apply language to all UI elements
function applyLanguage() {
    const langData = LANGUAGES[currentLanguage];

    if (!langData) return;

    // Welcome screen
    document.getElementById('welcome-title').textContent = langData.welcome_title;
    document.getElementById('welcome-message').textContent = langData.welcome_message;
    document.getElementById('instructions-title').textContent = langData.instructions_title;

    // Instructions list
    const instructionsList = document.getElementById('instructions-list');
    instructionsList.innerHTML = '';
    langData.instructions.forEach(instruction => {
        const li = document.createElement('li');
        li.innerHTML = instruction;
        instructionsList.appendChild(li);
    });

    // Buttons
    document.getElementById('start-btn').textContent = langData.start_button;
    document.getElementById('play-again-btn').textContent = langData.play_again;
    document.getElementById('go-back-btn').textContent = langData.go_back;

    // Question screen
    document.getElementById('question-label').textContent = langData.question;
    document.getElementById('score-label').textContent = langData.score;
    document.getElementById('streak-label').textContent = langData.streak;
    document.getElementById('shortcut-hint').innerHTML = langData.shortcut_hint;

    // Results screen
    document.getElementById('results-title').textContent = langData.game_over;

    // Error screen
    document.getElementById('error-title').textContent = langData.error_title;
    document.getElementById('error-message').textContent = langData.error_message;

    // Language switcher
    document.getElementById('language-label').textContent = langData.language;

    // Update current question text if it exists
    updateQuestionText();
}

// Update question text based on question type
function updateQuestionText() {
    const questionPrompt = document.getElementById('questionPrompt');
    if (!questionPrompt || !currentQuestion) return;

    // If we have a current question with a type, update it
    if (currentQuestionType !== undefined && currentSpellingType !== undefined) {
        setQuestionPrompt(currentQuestionType, currentSpellingType);
    }
}

// Store current question and spelling types
let currentQuestionType;
let currentSpellingType;

// Set question prompt based on question type and spelling type
function setQuestionPrompt(questionType, spellingType) {
    const langData = LANGUAGES[currentLanguage];
    const questionPrompt = document.getElementById('questionPrompt');

    currentQuestionType = questionType;
    currentSpellingType = spellingType;

    if (!questionPrompt || !langData) return;

    if (questionType === 0) {
        questionPrompt.textContent = langData.prompt_translation_en_vn;
    } else if (questionType === 1) {
        questionPrompt.textContent = langData.prompt_translation_vn_en;
    } else if (questionType === 2) {
        if (spellingType === 0) {
            questionPrompt.textContent = langData.prompt_unscramble;
        } else if (spellingType === 1) {
            questionPrompt.textContent = langData.prompt_vowels;
        } else {
            questionPrompt.textContent = langData.prompt_consonants;
        }
    }
}

// Handle key press events for QWER keys
function handleKeyPress(event) {
    // Only process key events if we're on the question screen and the question hasn't been answered
    if (document.getElementById('questionScreen').style.display !== 'block' || isAnswered) {
        return;
    }

    const key = event.key.toLowerCase();
    let answerIndex = -1;

    // Map keys to answer indices
    switch (key) {
        case 'q': answerIndex = 0; break;
        case 'w': answerIndex = 1; break;
        case 'e': answerIndex = 2; break;
        case 'r': answerIndex = 3; break;
        default: return; // Not a key we're interested in
    }

    // Find the corresponding answer button and simulate a click
    const answerButtons = document.querySelectorAll('.answer-btn');
    if (answerIndex >= 0 && answerIndex < answerButtons.length) {
        answerButtons[answerIndex].click();

        // Add visual feedback for key press
        answerButtons[answerIndex].classList.add('key-pressed');
        setTimeout(() => {
            answerButtons[answerIndex].classList.remove('key-pressed');
        }, 150);
    }
}

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
    soundEffects.gameStart.play().catch(e => console.error('Error playing sound:', e));

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

    // const questionType = Math.floor(Math.random() * 3);
    let questionType = Math.floor(Math.random() * 3);

    let question, correct, options, prompt;
    let spellingType = 0; // Default spelling type (scrambled)

    if (questionType === 0) {
        // English to Vietnamese
        question = word.english;
        correct = word.vietnamese;
        options = [word.vietnamese];
        prompt = LANGUAGES[currentLanguage].prompt_translation_en_vn;

        // Add 3 random incorrect options
        while (options.length < 4) {
            const randomIndex = Math.floor(Math.random() * vocabulary.length);
            const randomWord = vocabulary[randomIndex];
            if (!options.includes(randomWord.vietnamese) && randomWord.vietnamese !== word.vietnamese) {
                options.push(randomWord.vietnamese);
            }
        }
    } else if (questionType === 1) {
        // Vietnamese to English with REALISTIC SPELLING MISTAKES as distractors
        question = word.vietnamese;
        correct = word.english;
        options = [word.english];
        prompt = LANGUAGES[currentLanguage].prompt_translation_vn_en;

        // Generate realistic spelling mistake variants as distractors
        if (word.english.length >= 3) {
            // Get user settings from localStorage or default to medium and Vietnamese
            const difficultyLevel = localStorage.getItem('vocabhoot_difficulty') || 'medium';
            const nativeLanguage = localStorage.getItem('vocabhoot_nativelang') || 'vi';

            // Check which spelling mistake generator function is available
            if (typeof generateRealisticVariants === 'function') {
                // Use the advanced generator from wordScrambler.js
                const spellingMistakes = generateRealisticVariants(word.english, 3, {
                    nativeLanguage: nativeLanguage,
                    difficultyLevel: difficultyLevel,
                    errorTypes: null, // use all error types
                    preserveLength: false // allow different lengths for more realistic errors
                });

                // Add the spelling mistake variants to options
                for (const mistake of spellingMistakes) {
                    if (!options.includes(mistake)) {
                        options.push(mistake);
                    }
                }
            }
            else if (typeof createL1InterferenceMistake === 'function') {
                // Direct use of specific error generators if available
                const errorGenerators = [
                    createSilentLetterMistake,
                    createVowelConfusionMistake,
                    createDoubleLetterMistake,
                    createLetterCombinationMistake,
                    createPhoneticSubstitutionMistake,
                    createHomophoneMistake,
                    (w) => createL1InterferenceMistake(w, nativeLanguage),
                    createAffixMistake,
                    createPronunciationMistake,
                    createTypingMistake
                ];

                // Generate mistakes with different error types
                const usedGenerators = new Set();
                while (options.length < 4 && usedGenerators.size < errorGenerators.length) {
                    // Choose a random generator we haven't used yet
                    let generatorIndex;
                    do {
                        generatorIndex = Math.floor(Math.random() * errorGenerators.length);
                    } while (usedGenerators.has(generatorIndex));

                    usedGenerators.add(generatorIndex);
                    const errorGenerator = errorGenerators[generatorIndex];

                    // Generate mistake
                    const mistake = errorGenerator(word.english);

                    // Only add if it's different from original and not already in options
                    if (mistake !== word.english && !options.includes(mistake)) {
                        options.push(mistake);
                    }
                }
            }
            else if (typeof smartScrambleWord === 'function') {
                // Fallback to basic smart scramble
                for (let i = 0; i < 3; i++) {
                    const mistake = smartScrambleWord(word.english, nativeLanguage);
                    if (!options.includes(mistake)) {
                        options.push(mistake);
                    }
                }
            }
            else if (typeof lengthPreservingScramble === 'function') {
                // Even more basic fallback
                for (let i = 0; i < 3; i++) {
                    const mistake = lengthPreservingScramble(word.english);
                    if (!options.includes(mistake)) {
                        options.push(mistake);
                    }
                }
            }
        }

        // If we still don't have enough options (e.g., for very short words),
        // add random words from vocabulary
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
            prompt = LANGUAGES[currentLanguage].prompt_translation_en_vn;

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
                prompt = LANGUAGES[currentLanguage].prompt_unscramble;
            } else if (spellingType === 1) {
                // Missing vowels
                modifiedWord = removeVowels(originalWord);
                prompt = LANGUAGES[currentLanguage].prompt_vowels;
            } else {
                // Missing consonants
                modifiedWord = removeConsonants(originalWord);
                prompt = LANGUAGES[currentLanguage].prompt_consonants;
            }

            question = modifiedWord;
            correct = originalWord;

            // Start with the correct answer
            options = [originalWord];

            // Find words with similar characteristics based on the challenge type
            if (spellingType === 0) {
                // For scrambled words: find words with similar letters
                addScrambleOptions(options, originalWord, vocabulary);
                console.log(options);
            } else if (spellingType === 1) {
                // For missing vowels: find words with similar consonant structure
                addMissingVowelsOptions(options, originalWord, vocabulary);
            } else {
                // For missing consonants: find words with similar vowel structure
                addMissingConsonantsOptions(options, originalWord, vocabulary);
            }

            // If we still don't have enough options, add random words
            while (options.length < 4) {
                const randomIndex = Math.floor(Math.random() * vocabulary.length);
                const randomWord = vocabulary[randomIndex].english;
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
const cheating = true;
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
/**
 * Update for addScrambleOptions function to use the combined approach
 */
function addScrambleOptions(options, originalWord, vocabulary) {
    // Get user settings from localStorage or default to medium and Vietnamese
    const difficultyLevel = localStorage.getItem('vocabhoot_difficulty') || 'medium';
    const nativeLanguage = localStorage.getItem('vocabhoot_nativelang') || 'vi';

    // Check if our enhanced filter approach is available
    if (typeof generateFilteredGameOptions === 'function') {
        // Generate realistic options that maintain length and use only original letters
        const generatorOptions = {
            nativeLanguage: nativeLanguage,
            difficultyLevel: difficultyLevel,
            preserveLength: true,
            useOriginalLettersOnly: true,
            overgenerate: 3
        };

        // Generate filtered options
        const filteredOptions = generateFilteredGameOptions(originalWord, 4, generatorOptions);

        // Add the filtered options to our options array
        for (const option of filteredOptions) {
            if (!options.includes(option) && option !== originalWord) {
                options.push(option);
                if (options.length >= 4) break;
            }
        }
    }
    // Check if length-preserving scrambler is available as fallback
    else if (typeof lengthPreservingScramble === 'function') {
        // Generate scrambled options
        const scrambledOptions = generateScrambleOptions(originalWord, 4);

        // Add the scrambled options to our options array
        for (const option of scrambledOptions) {
            if (!options.includes(option) && option !== originalWord) {
                options.push(option);
                if (options.length >= 4) break;
            }
        }
    }
    // Final fallback to original implementation
    else {
        const altScramble = createAlternativeScramble(originalWord);
        if (altScramble && !options.includes(altScramble)) {
            options.push(altScramble);
        }

        // Add similar words from vocabulary
        const similarWords = vocabulary
            .map(item => item.english)
            .filter(word =>
                word !== originalWord &&
                !options.includes(word) &&
                Math.abs(word.length - originalWord.length) <= 2
            )
            .sort((a, b) => {
                const aCommon = countCommonLetters(a, originalWord);
                const bCommon = countCommonLetters(b, originalWord);
                return bCommon - aCommon; // Sort by more common letters first
            });

        if (similarWords.length > 0) {
            options.push(similarWords[0]);

            // If we have more similar words, add another
            if (similarWords.length > 1 && options.length < 4) {
                options.push(similarWords[1]);
            }
        }
    }

    // If we still need more options, add random words from vocabulary
    while (options.length < 4) {
        const randomIndex = Math.floor(Math.random() * vocabulary.length);
        const randomWord = vocabulary[randomIndex].english;
        if (!options.includes(randomWord) && randomWord !== originalWord) {
            options.push(randomWord);
        }
    }
}


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

    // Try to preserve vowel/consonant patterns somewhat
    const vowels = 'aeiou';
    const middleChars = middle.split('');

    // Group vowels and consonants
    const middleVowels = middleChars.filter(c => vowels.includes(c.toLowerCase()));
    const middleConsonants = middleChars.filter(c => !vowels.includes(c.toLowerCase()) && /[a-z]/i.test(c));

    // Shuffle vowels and consonants separately
    for (let i = middleVowels.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [middleVowels[i], middleVowels[j]] = [middleVowels[j], middleVowels[i]];
    }

    for (let i = middleConsonants.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [middleConsonants[i], middleConsonants[j]] = [middleConsonants[j], middleConsonants[i]];
    }

    // Reconstruct middle section with similar vowel/consonant pattern
    let vIndex = 0;
    let cIndex = 0;

    for (let i = 0; i < middleChars.length; i++) {
        const isVowel = vowels.includes(middleChars[i].toLowerCase());
        if (isVowel && vIndex < middleVowels.length) {
            middleChars[i] = middleVowels[vIndex++];
        } else if (!isVowel && /[a-z]/i.test(middleChars[i]) && cIndex < middleConsonants.length) {
            middleChars[i] = middleConsonants[cIndex++];
        }
    }

    // Make sure the scrambled word is different from the original
    const scrambledMiddle = middleChars.join('');
    if (scrambledMiddle === middle && middle.length > 1) {
        // If it's the same, swap two random characters
        const i = Math.floor(Math.random() * middleChars.length);
        const j = (i + 1) % middleChars.length;
        [middleChars[i], middleChars[j]] = [middleChars[j], middleChars[i]];
    }

    return firstLetter + middleChars.join('') + lastLetter;
}
/**
 * Adds options for missing vowels challenges
 */
function addMissingVowelsOptions(options, originalWord, vocabulary) {
    // Get the consonant pattern (replace vowels with placeholders)
    const consonantPattern = originalWord.toLowerCase().replace(/[aeiou]/gi, '*');

    // Find words with similar consonant patterns
    const similarConsonantWords = vocabulary
        .map(item => item.english)
        .filter(word =>
            word !== originalWord &&
            !options.includes(word) &&
            Math.abs(word.length - originalWord.length) <= 2
        )
        .map(word => {
            const wordPattern = word.toLowerCase().replace(/[aeiou]/gi, '*');
            const similarity = calculatePatternSimilarity(consonantPattern, wordPattern);
            return { word, similarity };
        })
        .sort((a, b) => b.similarity - a.similarity)
        .map(item => item.word);

    // Add words with similar consonant structure
    if (similarConsonantWords.length > 0) {
        options.push(similarConsonantWords[0]);

        if (similarConsonantWords.length > 1 && options.length < 4) {
            options.push(similarConsonantWords[1]);
        }
    }

    // If we still need more options, create a word with different vowels
    if (options.length < 4) {
        const altVowelWord = createAlternativeVowelWord(originalWord);
        if (altVowelWord && !options.includes(altVowelWord)) {
            options.push(altVowelWord);
        }
    }
}

/**
 * Adds options for missing consonants challenges
 */
function addMissingConsonantsOptions(options, originalWord, vocabulary) {
    // Get the vowel pattern (replace consonants with placeholders)
    const vowelPattern = originalWord.toLowerCase().replace(/[bcdfghjklmnpqrstvwxyz]/gi, '*');

    // Find words with similar vowel patterns
    const similarVowelWords = vocabulary
        .map(item => item.english)
        .filter(word =>
            word !== originalWord &&
            !options.includes(word) &&
            Math.abs(word.length - originalWord.length) <= 2
        )
        .map(word => {
            const wordPattern = word.toLowerCase().replace(/[bcdfghjklmnpqrstvwxyz]/gi, '*');
            const similarity = calculatePatternSimilarity(vowelPattern, wordPattern);
            return { word, similarity };
        })
        .sort((a, b) => b.similarity - a.similarity)
        .map(item => item.word);

    // Add words with similar vowel structure
    if (similarVowelWords.length > 0) {
        options.push(similarVowelWords[0]);

        if (similarVowelWords.length > 1 && options.length < 4) {
            options.push(similarVowelWords[1]);
        }
    }

    // If we still need more options, create a word with different consonants
    if (options.length < 4) {
        const altConsonantWord = createAlternativeConsonantWord(originalWord);
        if (altConsonantWord && !options.includes(altConsonantWord)) {
            options.push(altConsonantWord);
        }
    }
}

/**
 * Counts how many letters two words have in common
 */
function countCommonLetters(word1, word2) {
    const letters1 = new Set(word1.toLowerCase().split(''));
    const letters2 = new Set(word2.toLowerCase().split(''));
    let common = 0;

    for (const letter of letters1) {
        if (letters2.has(letter)) {
            common++;
        }
    }

    return common;
}

/**
 * Calculates similarity between two patterns (with * as wildcards)
 */
function calculatePatternSimilarity(pattern1, pattern2) {
    const minLength = Math.min(pattern1.length, pattern2.length);
    let matches = 0;

    for (let i = 0; i < minLength; i++) {
        if (pattern1[i] === pattern2[i]) {
            matches++;
        }
    }

    return matches / minLength;
}

/**
 * Creates an alternative scrambled version of a word
 */
function createAlternativeScramble(word) {
    if (word.length <= 3) return word + "s";

    // If it's a multi-word phrase, handle each word separately
    if (word.includes(' ')) {
        return word.split(' ')
            .map(w => createAlternativeScramble(w))
            .join(' ');
    }

    // First and last letters
    const firstLetter = word.charAt(0);
    const lastLetter = word.charAt(word.length - 1);

    // Get middle section and rearrange differently than the original scramble
    let middle = word.substring(1, word.length - 1).split('');

    // Do a more aggressive shuffle
    for (let i = 0; i < middle.length * 2; i++) {
        const a = Math.floor(Math.random() * middle.length);
        const b = Math.floor(Math.random() * middle.length);
        [middle[a], middle[b]] = [middle[b], middle[a]];
    }

    // Create new word
    return firstLetter + middle.join('') + lastLetter;
}

/**
 * Creates a word with alternative vowels
 */
function createAlternativeVowelWord(word) {
    // Replace vowels with different vowels
    const vowels = ['a', 'e', 'i', 'o', 'u'];
    let result = '';

    for (let i = 0; i < word.length; i++) {
        const char = word[i].toLowerCase();
        const isVowel = vowels.includes(char);

        if (isVowel) {
            // Replace with a different vowel
            const otherVowels = vowels.filter(v => v !== char);
            const randomVowel = otherVowels[Math.floor(Math.random() * otherVowels.length)];
            result += randomVowel;
        } else {
            result += word[i];
        }
    }

    return result;
}

/**
 * Creates a word with alternative consonants
 */
function createAlternativeConsonantWord(word) {
    // Replace consonants with different consonants
    const consonants = 'bcdfghjklmnpqrstvwxyz'.split('');
    const vowels = ['a', 'e', 'i', 'o', 'u'];
    let result = '';

    for (let i = 0; i < word.length; i++) {
        const char = word[i].toLowerCase();
        const isVowel = vowels.includes(char);

        if (!isVowel && char.match(/[a-z]/i)) {
            // Replace with a different consonant
            const otherConsonants = consonants.filter(c => c !== char);
            const randomConsonant = otherConsonants[Math.floor(Math.random() * otherConsonants.length)];
            result += randomConsonant;
        } else {
            result += word[i];
        }
    }

    return result;
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

    // Store current question and spelling types for language changes
    currentQuestionType = question.questionType;
    currentSpellingType = question.spellingType;

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

        // Add key hint to the button
        const keyHint = document.createElement('div');
        keyHint.className = 'key-hint';
        keyHint.textContent = ['Q', 'W', 'E', 'R'][index];

        const shape = document.createElement('div');
        shape.className = 'answer-shape';

        const text = document.createElement('span');
        text.textContent = option;

        button.appendChild(keyHint);
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
            // soundEffects.timeWarning.play().catch(e => console.log('Error playing sound:', e));
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

    const langData = LANGUAGES[currentLanguage];

    document.getElementById('correctAnswers').textContent =
        `${langData.correct} ${correctCount}/${currentQuestion}`;
    document.getElementById('accuracy').textContent =
        `${langData.accuracy} ${Math.round((correctCount / currentQuestion) * 100)}%`;
    document.getElementById('avgScore').textContent =
        `${langData.avg_score} ${Math.round(score / currentQuestion)}`;
    document.getElementById('bestStreak').textContent =
        `${langData.best_streak} ${bestStreak}`;
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