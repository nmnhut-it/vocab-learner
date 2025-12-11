/**
 * IELTS Writing Task 2 - Progressive Learning System
 * 6-step system with free exploration - students can navigate any step
 */

// Constants
const TOPICS_PATH = 'data/writing-v2-topics.json';
const STORAGE_PROGRESS = 'writing_v2_progress';
const STORAGE_CURRENT_TOPIC = 'writing_v2_current_topic';

// Global State
let topics = [];
let currentTopic = null;
let currentStep = 1;
let topicProgress = {
    completedSteps: [],
    paragraphData: {},
    essayText: '',
    exerciseResults: {},
    timeSpent: {},
    startTime: null,
    sessionId: ''
};

// Telegram & Student Session
let telegramSender = null;
let studentSession = null;
let cameraStream = null;

//===========================================
// INITIALIZATION
//===========================================

window.addEventListener('load', async () => {
    console.log('Loading IELTS Writing v2...');

    // Initialize student session and Telegram
    await initializeStudentSession();

    await loadTopics();
    loadTopicsUnlockState(); // Restore unlocked topics
    populateTopicSelector();

    const savedTopicId = localStorage.getItem(STORAGE_CURRENT_TOPIC);
    if (savedTopicId) {
        const topic = topics.find(t => t.id === savedTopicId);
        if (topic) {
            await loadTopic(savedTopicId);
        }
    }
});

//===========================================
// TOPICS MANAGEMENT
//===========================================

async function loadTopics() {
    try {
        const response = await fetch(TOPICS_PATH);
        const data = await response.json();
        topics = data.topics;
        console.log('Loaded', topics.length, 'topics');
    } catch (error) {
        console.error('Failed to load topics:', error);
        document.getElementById('mainContainer').innerHTML = `
            <div class="loading-message">
                <p style="color: #dc2626;">Failed to load topics.</p>
                <p style="font-size: 0.875rem;">Please check that ${TOPICS_PATH} exists.</p>
            </div>
        `;
    }
}

function populateTopicSelector() {
    const selector = document.getElementById('topicSelector');
    selector.innerHTML = '<option value="">Select a topic...</option>';

    topics.forEach((topic, index) => {
        const option = document.createElement('option');
        option.value = topic.id;
        option.textContent = `${index + 1}. ${topic.title}`;
        // All topics freely accessible
        selector.appendChild(option);
    });
}

async function onTopicChange() {
    const selector = document.getElementById('topicSelector');
    const topicId = selector.value;
    if (!topicId) return;

    await loadTopic(topicId);
}

async function loadTopic(topicId) {
    const topic = topics.find(t => t.id === topicId);
    if (!topic) return;

    try {
        const response = await fetch(topic.file);
        currentTopic = await response.json();

        // Load progress for this topic
        loadTopicProgress();

        // Update selector
        document.getElementById('topicSelector').value = topicId;
        localStorage.setItem(STORAGE_CURRENT_TOPIC, topicId);

        // Render the interface
        renderInterface();
        renderStep(currentStep);

        console.log('Loaded topic:', currentTopic.title);
    } catch (error) {
        console.error('Failed to load topic file:', error);
    }
}

//===========================================
// PROGRESS MANAGEMENT
//===========================================

function loadTopicProgress() {
    const savedProgress = localStorage.getItem(`${STORAGE_PROGRESS}_${currentTopic.id}`);
    if (savedProgress) {
        topicProgress = JSON.parse(savedProgress);
    } else {
        // Reset to default
        topicProgress = {
            completedSteps: [],
            paragraphData: {},
            essayText: '',
            exerciseResults: {}
        };
    }

    // Start at Step 1, but students can navigate freely
    currentStep = 1;
}

function saveTopicProgress() {
    localStorage.setItem(`${STORAGE_PROGRESS}_${currentTopic.id}`, JSON.stringify(topicProgress));
}

async function markStepComplete(stepNumber) {
    if (!topicProgress.completedSteps.includes(stepNumber)) {
        topicProgress.completedSteps.push(stepNumber);
    }

    // Send essay submission notification when Step 6 completes
    if (stepNumber === 6) {
        await sendEssaySubmissionToTelegram();
    }

    // If all steps completed, unlock next topic
    if (topicProgress.completedSteps.length === 6) {
        await sendTopicCompletionToTelegram(currentTopic.id);
        unlockNextTopic();
    }

    saveTopicProgress();
}

function unlockNextTopic() {
    const currentIndex = topics.findIndex(t => t.id === currentTopic.id);
    if (currentIndex < topics.length - 1) {
        topics[currentIndex + 1].unlocked = true;
        // Save updated topics list
        saveTopicsUnlockState();
        populateTopicSelector();

        alert('🎉 Congratulations! You completed this topic. Next topic unlocked!');
    }
}

function saveTopicsUnlockState() {
    localStorage.setItem('writing_v2_topics_unlock', JSON.stringify(topics.map(t => ({
        id: t.id,
        unlocked: t.unlocked
    }))));
}

function loadTopicsUnlockState() {
    const saved = localStorage.getItem('writing_v2_topics_unlock');
    if (saved) {
        const unlockStates = JSON.parse(saved);
        topics.forEach(topic => {
            const state = unlockStates.find(s => s.id === topic.id);
            if (state) topic.unlocked = state.unlocked;
        });
    }
}

//===========================================
// UI RENDERING
//===========================================

function renderInterface() {
    const container = document.getElementById('mainContainer');

    container.innerHTML = `
        <!-- Question Display -->
        <div class="question-section" style="margin-bottom: 2rem;">
            <div class="question-meta">
                <span class="question-category">${currentTopic.category}</span>
                <span class="question-num">${currentTopic.question.type}</span>
            </div>
            <h2 class="question-text">${currentTopic.question.text}</h2>
        </div>

        <!-- Steps Navigation -->
        <div class="steps-container">
            <div class="steps-progress" id="stepsProgress">
                ${currentTopic.steps.map((step, index) => `
                    <div class="step-item ${getStepClass(step.stepNumber)}"
                         onclick="navigateToStep(${step.stepNumber})">
                        <div class="step-circle">
                            ${topicProgress.completedSteps.includes(step.stepNumber) ? '✓' : step.stepNumber}
                        </div>
                        <div class="step-label">${step.title}</div>
                        ${index < currentTopic.steps.length - 1 ? '<div class="step-connector"></div>' : ''}
                    </div>
                `).join('')}
            </div>
        </div>

        <!-- Step Content -->
        <div class="step-content" id="stepContent">
            <!-- Dynamic content will be rendered here -->
        </div>
    `;
}

function getStepClass(stepNumber) {
    let classes = [];
    if (stepNumber === currentStep) classes.push('active');
    if (topicProgress.completedSteps.includes(stepNumber)) classes.push('completed');
    return classes.join(' ');
}

function navigateToStep(stepNumber) {
    currentStep = stepNumber;
    renderInterface();
    renderStep(stepNumber);
}

//===========================================
// STEP RENDERING
//===========================================

function renderStep(stepNumber) {
    const step = currentTopic.steps.find(s => s.stepNumber === stepNumber);
    if (!step) return;

    const contentEl = document.getElementById('stepContent');

    switch(step.type) {
        case 'analysis':
            renderAnalysisStep(step, contentEl);
            break;
        case 'vocabulary':
            renderVocabularyStep(step, contentEl);
            break;
        case 'exercises':
            renderExercisesStep(step, contentEl);
            break;
        case 'templates':
            renderTemplatesStep(step, contentEl);
            break;
        case 'paragraphs':
            renderParagraphsStep(step, contentEl);
            break;
        case 'essay':
            renderEssayStep(step, contentEl);
            break;
    }
}

// STEP 1: TOPIC ANALYSIS
function renderAnalysisStep(step, container) {
    const content = step.content;

    container.innerHTML = `
        <div class="step-header">
            <h2 class="step-title">📋 ${step.title}</h2>
            <p class="step-description">Understand the question type and requirements</p>
        </div>

        <div class="exercise-card">
            <h3 style="margin-bottom: 1rem;">Question Type</h3>
            <div style="background: white; padding: 1rem; border-radius: 0.375rem; margin-bottom: 0.5rem;">
                <strong style="color: var(--color-accent); font-size: 1.125rem;">${content.questionType.type}</strong>
            </div>
            <p style="color: var(--color-text-light);">${content.questionType.explanation}</p>

            <h4 style="margin-top: 1.5rem; margin-bottom: 0.75rem;">Requirements:</h4>
            <ul style="list-style-position: inside;">
                ${content.questionType.requirements.map(req => `<li style="margin-bottom: 0.5rem;">${req}</li>`).join('')}
            </ul>
        </div>

        <div class="exercise-card">
            <h3 style="margin-bottom: 1rem;">Key Words to Notice</h3>
            ${content.keyWords.map(kw => `
                <div style="background: white; padding: 1rem; border-radius: 0.375rem; margin-bottom: 0.75rem;">
                    <strong style="color: var(--color-accent);">${kw.word}</strong>
                    <p style="margin: 0.25rem 0; font-size: 0.875rem; color: var(--color-text-light);">${kw.definition}</p>
                    <p style="margin: 0; font-size: 0.875rem; font-style: italic;">💡 ${kw.importance}</p>
                </div>
            `).join('')}
        </div>

        <div class="exercise-card">
            <h3 style="margin-bottom: 1rem;">Essay Structure</h3>
            ${Object.entries(content.essayStructure).map(([key, value]) => `
                <div style="background: white; padding: 0.75rem; border-radius: 0.375rem; margin-bottom: 0.5rem;">
                    <strong style="text-transform: capitalize;">${key.replace(/([A-Z])/g, ' $1')}:</strong>
                    <span style="color: var(--color-text-light);"> ${value}</span>
                </div>
            `).join('')}
        </div>

        <div class="exercise-card" style="background: #fee; border-left-color: #dc2626;">
            <h3 style="margin-bottom: 1rem; color: #991b1b;">⚠️ Common Mistakes to Avoid</h3>
            ${content.commonMistakes.map(mistake => `
                <div style="color: #991b1b; margin-bottom: 0.5rem;">✗ ${mistake}</div>
            `).join('')}
        </div>

        <div class="step-navigation">
            <button class="btn-step btn-step-prev" onclick="navigateToStep(1)" disabled>← Previous</button>
            <button class="btn-step btn-step-next" onclick="completeStep(1)">Next: Vocabulary →</button>
        </div>
    `;
}

// STEP 2: VOCABULARY
function renderVocabularyStep(step, container) {
    const content = step.content;

    container.innerHTML = `
        <div class="step-header">
            <h2 class="step-title">📚 ${step.title}</h2>
            <p class="step-description">Learn academic and topic-specific vocabulary</p>
        </div>

        <h3 style="margin-bottom: 1rem;">Academic Vocabulary</h3>
        ${content.academicVocabulary.map(vocab => `
            <div class="vocab-card">
                <div class="vocab-word">${vocab.word}</div>
                <div class="vocab-pronunciation">${vocab.pronunciation}</div>
                <div class="vocab-definition">
                    <strong>${vocab.partOfSpeech}</strong> - ${vocab.definition}
                    ${vocab.vietnameseDefinition ? `<div style="color: var(--color-accent); margin-top: 0.25rem; font-style: italic;">🇻🇳 ${vocab.vietnameseDefinition}</div>` : ''}
                </div>
                <div class="vocab-example">
                    "${vocab.example}"
                    ${vocab.vietnameseExample ? `<div style="color: var(--color-text-light); margin-top: 0.25rem; font-style: italic; font-size: 0.875rem;">🇻🇳 "${vocab.vietnameseExample}"</div>` : ''}
                </div>
                ${vocab.synonyms ? `<div style="margin-top: 0.5rem; font-size: 0.875rem; color: var(--color-text-light);">
                    <strong>Synonyms:</strong> ${vocab.synonyms.join(', ')}
                </div>` : ''}
            </div>
        `).join('')}

        <h3 style="margin: 2rem 0 1rem;">Topic-Specific Vocabulary</h3>
        ${content.topicVocabulary.map(vocab => `
            <div class="vocab-card">
                <div class="vocab-word">${vocab.phrase}</div>
                <div class="vocab-definition">
                    ${vocab.definition}
                    ${vocab.vietnameseDefinition ? `<div style="color: var(--color-accent); margin-top: 0.25rem; font-style: italic;">🇻🇳 ${vocab.vietnameseDefinition}</div>` : ''}
                </div>
                <div class="vocab-example">
                    "${vocab.example}"
                    ${vocab.vietnameseExample ? `<div style="color: var(--color-text-light); margin-top: 0.25rem; font-style: italic; font-size: 0.875rem;">🇻🇳 "${vocab.vietnameseExample}"</div>` : ''}
                </div>
            </div>
        `).join('')}

        <h3 style="margin: 2rem 0 1rem;">Useful Linking Phrases</h3>
        <div class="exercise-card">
            ${Object.entries(content.linkingPhrases).map(([category, phrases]) => `
                <div style="margin-bottom: 1rem;">
                    <strong style="text-transform: capitalize; color: var(--color-accent);">
                        ${category.replace(/_/g, ' ')}:
                    </strong>
                    <div style="margin-top: 0.5rem; color: var(--color-text-light);">
                        ${phrases.join(' • ')}
                    </div>
                </div>
            `).join('')}
        </div>

        <div class="step-navigation">
            <button class="btn-step btn-step-prev" onclick="navigateToStep(1)">← Previous</button>
            <button class="btn-step btn-step-next" onclick="completeStep(2)">Next: Exercises →</button>
        </div>
    `;
}

// Continue in next file due to length...

async function completeStep(stepNumber) {
    // Check completion criteria
    const step = currentTopic.steps.find(s => s.stepNumber === stepNumber);

    // Steps 1, 2, 4 auto-complete on "Next" click
    if ([1, 2, 4].includes(stepNumber)) {
        await markStepComplete(stepNumber);
        if (stepNumber < 6) {
            navigateToStep(stepNumber + 1);
        }
        return;
    }

    // Step 3: Check exercises
    if (stepNumber === 3) {
        const correctCount = Object.values(topicProgress.exerciseResults).filter(r => r.correct).length;
        if (correctCount >= 12) {
            await markStepComplete(stepNumber);
            navigateToStep(4);
        } else {
            alert(`Complete at least 12/15 exercises correctly. Current: ${correctCount}/15`);
        }
        return;
    }

    // Step 5: Check paragraphs
    if (stepNumber === 5) {
        const allFilled = checkAllParagraphsFilled();
        if (allFilled) {
            await markStepComplete(stepNumber);
            navigateToStep(6);
        } else {
            alert('Please fill in all blanks (minimum 10 words each).');
        }
        return;
    }

    // Step 6: Check essay
    if (stepNumber === 6) {
        const wordCount = topicProgress.essayText.trim().split(/\s+/).length;
        if (wordCount >= 250) {
            await markStepComplete(stepNumber);
            showComparisonView();
        } else {
            alert(`Your essay must be at least 250 words. Current: ${wordCount} words`);
        }
        return;
    }
}

// Convert alternative exercise formats to exerciseSections format
function normalizeExerciseContent(content) {
    if (content.exerciseSections) {
        return content; // Already in correct format
    }

    // Convert buildFromClues, sentenceUnscramble, fillInTheBlanks to exerciseSections
    const sections = [];

    if (content.buildFromClues && content.buildFromClues.length > 0) {
        sections.push({
            function: "build-from-clues",
            title: "Build Sentences from Clues",
            description: "Create sentences using the given subject, verb, and keywords",
            exercises: content.buildFromClues.map(clue => ({
                id: clue.id,
                type: "clue-based",
                template: `Subject: ${clue.clues.subject} | Verb: ${clue.clues.verb} | Keywords: ${clue.clues.keywords.join(', ')}`,
                hint: clue.hint,
                modelAnswer: clue.modelAnswer,
                minWords: clue.minWords,
                blanks: [{
                    id: `${clue.id}_answer`,
                    options: [],
                    correctAnswer: clue.modelAnswer
                }],
                correctSentence: clue.modelAnswer,
                usableIn: "body-paragraph"
            }))
        });
    }

    if (content.sentenceUnscramble && content.sentenceUnscramble.length > 0) {
        sections.push({
            function: "sentence-unscramble",
            title: "Unscramble Sentences",
            description: "Arrange the words to form correct sentences",
            exercises: content.sentenceUnscramble.map(scramble => ({
                id: scramble.id,
                type: "unscramble",
                template: `Words: ${scramble.words.join(' | ')}`,
                hint: scramble.hint,
                words: scramble.words,
                blanks: [{
                    id: `${scramble.id}_answer`,
                    options: [],
                    correctAnswer: scramble.correctAnswer
                }],
                correctSentence: scramble.correctAnswer,
                usableIn: "body-paragraph"
            }))
        });
    }

    if (content.fillInTheBlanks && content.fillInTheBlanks.length > 0) {
        sections.push({
            function: "fill-blanks",
            title: "Fill in the Blanks",
            description: "Choose the correct word to complete each sentence",
            exercises: content.fillInTheBlanks.map(blank => ({
                id: blank.id,
                type: "template",
                template: blank.sentence,
                blanks: [{
                    id: `${blank.id}_blank`,
                    options: blank.options,
                    correctAnswer: blank.correctAnswer
                }],
                correctSentence: blank.sentence.replace('_____', blank.correctAnswer),
                explanation: blank.explanation,
                usableIn: "body-paragraph"
            }))
        });
    }

    return {
        ...content,
        instructions: content.instructions || "Complete the exercises below to practice building sentences for your essay.",
        exerciseSections: sections
    };
}

// STEP 3: EXERCISES
function renderExercisesStep(step, container) {
    const content = normalizeExerciseContent(step.content);
    const results = topicProgress.exerciseResults || {};
    const correctCount = Object.values(results).filter(r => r.correct).length;

    // Handle case where exerciseSections might still be empty
    if (!content.exerciseSections || content.exerciseSections.length === 0) {
        container.innerHTML = `
            <div class="step-header">
                <h2 class="step-title">✍️ ${step.title}</h2>
                <p class="step-description">No exercises available for this topic yet.</p>
            </div>
            <div class="step-navigation">
                <button class="btn-step btn-step-prev" onclick="navigateToStep(2)">← Previous</button>
                <button class="btn-step btn-step-next" onclick="completeStep(3)">Next: Templates →</button>
            </div>
        `;
        return;
    }

    const totalExercises = content.exerciseSections.reduce((sum, section) => sum + section.exercises.length, 0);
    const requiredCorrect = Math.floor(totalExercises * 0.73); // 35/48

    container.innerHTML = `
        <div class="step-header">
            <h2 class="step-title">✍️ ${step.title}</h2>
            <p class="step-description">${content.instructions}</p>
            <div style="margin-top: 0.5rem; font-weight: 600; color: var(--color-accent);">
                Progress: ${correctCount}/${totalExercises} exercises correct (${requiredCorrect} required)
            </div>
        </div>

        ${content.exerciseSections.map((section, sectionIdx) => `
            <div style="margin: 2rem 0;">
                <h3 style="margin-bottom: 0.5rem; color: var(--color-accent);">${section.title}</h3>
                <p style="color: var(--color-text-light); margin-bottom: 1.5rem;">${section.description}</p>
                ${section.exercises.map((ex, exIdx) => renderSentenceTemplate(ex, sectionIdx, exIdx)).join('')}
            </div>
        `).join('')}

        <!-- Sentence Bank -->
        <div style="margin: 3rem 0; padding-top: 2rem; border-top: 2px solid var(--color-border);">
            <h3 style="margin-bottom: 1rem;">✓ Your Completed Sentences</h3>
            <p style="color: var(--color-text-light); margin-bottom: 1.5rem; font-size: 0.875rem;">
                Click any sentence to copy it for use in your essay (Step 6)
            </p>
            ${renderSentenceBank()}
        </div>

        <div class="step-navigation">
            <button class="btn-step btn-step-prev" onclick="navigateToStep(2)">← Previous</button>
            <button class="btn-step btn-step-next" onclick="completeStep(3)">
                Next: Templates → ${correctCount >= requiredCorrect ? '✓ Completed' : 'Continue'}
            </button>
        </div>
    `;
}

function renderSentenceTemplate(exercise, sectionIdx, exIdx) {
    const result = topicProgress.exerciseResults[exercise.id] || { userAnswers: {} };
    const isCorrect = result.correct;

    return `
        <div class="exercise-card" style="border-left-color: ${isCorrect ? 'var(--step-completed)' : 'var(--color-accent)'};">
            <div class="exercise-title">${exercise.template}</div>

            ${exercise.blanks.map((blank, blankIdx) => `
                <div style="margin: 1rem 0;">
                    <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">
                        Blank ${blankIdx + 1}:
                    </label>
                    <select id="${exercise.id}_${blank.id}"
                            class="select"
                            style="width: 100%; padding: 0.75rem;"
                            onchange="checkSentenceTemplate('${exercise.id}')">
                        <option value="">Select...</option>
                        ${blank.options.map(opt => `
                            <option value="${opt}" ${result.userAnswers[blank.id] === opt ? 'selected' : ''}>
                                ${opt}
                            </option>
                        `).join('')}
                    </select>
                </div>
            `).join('')}

            <div id="result_${exercise.id}" style="margin-top: 1rem;"></div>

            ${isCorrect ? `
                <div style="margin-top: 1rem; padding: 1rem; background: #f0fdf4; border-left: 3px solid var(--step-completed); border-radius: 0.25rem;">
                    <strong>✓ Correct sentence:</strong> ${exercise.correctSentence}
                    <br><small style="color: var(--color-text-light);">Usable in: <em>${exercise.usableIn}</em></small>
                </div>
            ` : ''}
        </div>
    `;
}

function checkSentenceTemplate(exerciseId) {
    const step = currentTopic.steps.find(s => s.stepNumber === 3);
    const content = normalizeExerciseContent(step.content);
    let exercise = null;

    // Find the exercise across all sections
    for (const section of content.exerciseSections) {
        exercise = section.exercises.find(ex => ex.id === exerciseId);
        if (exercise) break;
    }

    if (!exercise) return;

    // Collect user answers for all blanks
    const userAnswers = {};
    let allFilled = true;

    for (const blank of exercise.blanks) {
        const select = document.getElementById(`${exerciseId}_${blank.id}`);
        userAnswers[blank.id] = select.value;
        if (!select.value) allFilled = false;
    }

    if (!allFilled) return;

    // Check if all answers are correct
    const isCorrect = exercise.blanks.every(blank =>
        userAnswers[blank.id] === blank.correctAnswer
    );

    topicProgress.exerciseResults[exerciseId] = {
        userAnswers,
        correct: isCorrect
    };
    saveTopicProgress();

    const resultDiv = document.getElementById(`result_${exerciseId}`);
    if (isCorrect) {
        resultDiv.innerHTML = `<div style="color: var(--step-completed); font-weight: 500;">✓ Excellent! This sentence has been added to your sentence bank.</div>`;
    } else {
        resultDiv.innerHTML = `<div style="color: #dc2626;">Not quite. Try again or check the correct answer after attempting.</div>`;
    }

    renderInterface();
    renderStep(3);
}

function renderSentenceBank() {
    const step = currentTopic.steps.find(s => s.stepNumber === 3);
    if (!step) return '<p style="color: var(--color-text-light);">No sentences completed yet.</p>';

    const content = normalizeExerciseContent(step.content);
    if (!content.exerciseSections || content.exerciseSections.length === 0) {
        return '<p style="color: var(--color-text-light);">No sentences completed yet.</p>';
    }

    const results = topicProgress.exerciseResults || {};
    let bankHTML = '';

    for (const section of content.exerciseSections) {
        const correctInSection = section.exercises.filter(ex => results[ex.id]?.correct);

        if (correctInSection.length > 0) {
            bankHTML += `
                <div style="margin-bottom: 2rem;">
                    <h4 style="margin-bottom: 0.75rem; color: var(--color-text); font-size: 1rem;">
                        ${section.function.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        (${correctInSection.length}/${section.exercises.length})
                    </h4>
                    ${correctInSection.map(ex => `
                        <div onclick="copySentence('${ex.correctSentence}')"
                             style="padding: 0.75rem 0; margin: 0.5rem 0; cursor: pointer; border-bottom: 1px solid var(--color-border);"
                             onmouseover="this.style.color='var(--color-accent)'"
                             onmouseout="this.style.color=''">
                            <strong>${ex.correctSentence}</strong>
                            <br><small style="color: var(--color-text-light);">
                                📋 Click to copy • Use in: <em>${ex.usableIn}</em>
                            </small>
                        </div>
                    `).join('')}
                </div>
            `;
        }
    }

    return bankHTML || '<p style="color: var(--color-text-light);">Complete exercises correctly to build your sentence bank!</p>';
}

function copySentence(sentence) {
    // Copy to clipboard
    navigator.clipboard.writeText(sentence).then(() => {
        // Show brief confirmation
        const msg = document.createElement('div');
        msg.textContent = '✓ Copied to clipboard!';
        msg.style.cssText = 'position: fixed; bottom: 2rem; right: 2rem; background: var(--step-completed); color: white; padding: 1rem 1.5rem; border-radius: 0.5rem; font-weight: 500; z-index: 1000; box-shadow: 0 4px 6px rgba(0,0,0,0.1);';
        document.body.appendChild(msg);
        setTimeout(() => msg.remove(), 2000);
    }).catch(() => {
        alert('Sentence: ' + sentence);
    });
}

function renderBuildFromClues(exercise, index) {
    const result = topicProgress.exerciseResults[exercise.id] || {};
    const isCorrect = result.correct;

    return `
        <div class="exercise-card" style="border-left-color: ${isCorrect ? 'var(--step-completed)' : 'var(--color-accent)'};">
            <div class="exercise-title">Exercise ${index + 1}</div>
            <div style="background: white; padding: 1rem; border-radius: 0.375rem; margin-bottom: 1rem;">
                <strong>Subject:</strong> ${exercise.clues.subject}<br>
                <strong>Verb:</strong> ${exercise.clues.verb}<br>
                <strong>Keywords:</strong> ${exercise.clues.keywords.join(', ')}
            </div>
            <textarea id="${exercise.id}" class="blank-input" placeholder="Write your sentence here..."
                      style="min-height: 80px;" onblur="checkBuildFromClues('${exercise.id}', ${index})">${result.userAnswer || ''}</textarea>
            <div class="word-counter">${(result.userAnswer || '').trim().split(/\s+/).filter(w => w).length} words (min ${exercise.minWords})</div>

            <button class="hint-button" onclick="toggleHint('hint_${exercise.id}')">💡 Show Hint</button>
            <div id="hint_${exercise.id}" class="hint-text">${exercise.hint}</div>

            <div id="result_${exercise.id}" style="margin-top: 1rem;"></div>
        </div>
    `;
}

function checkBuildFromClues(exerciseId, index) {
    const textarea = document.getElementById(exerciseId);
    const userAnswer = textarea.value.trim();
    const step = currentTopic.steps.find(s => s.stepNumber === 3);
    const exercise = step.content.buildFromClues[index];

    if (!userAnswer) return;

    const wordCount = userAnswer.split(/\s+/).filter(w => w).length;
    const hasMinWords = wordCount >= exercise.minWords;

    // Check if answer contains key words (simplified check)
    const keywords = exercise.clues.keywords.join(' ').toLowerCase();
    const hasKeywords = exercise.clues.keywords.every(kw =>
        userAnswer.toLowerCase().includes(kw.toLowerCase())
    );

    const isCorrect = hasMinWords && hasKeywords;

    topicProgress.exerciseResults[exerciseId] = {
        userAnswer,
        correct: isCorrect
    };
    saveTopicProgress();

    const resultDiv = document.getElementById(`result_${exerciseId}`);
    if (isCorrect) {
        resultDiv.innerHTML = `<div style="color: var(--step-completed); font-weight: 500;">✓ Good! Model answer: "${exercise.modelAnswer}"</div>`;
    } else {
        resultDiv.innerHTML = `<div style="color: #dc2626;">Please include all keywords and meet minimum words. Model: "${exercise.modelAnswer}"</div>`;
    }

    renderInterface();
    renderStep(3);
}

function renderSentenceUnscramble(exercise, index) {
    const result = topicProgress.exerciseResults[exercise.id] || { userOrder: [] };
    const isCorrect = result.correct;

    return `
        <div class="exercise-card" style="border-left-color: ${isCorrect ? 'var(--step-completed)' : 'var(--color-accent)'};">
            <div class="exercise-title">Exercise ${index + 6}</div>
            <p style="margin-bottom: 1rem; color: var(--color-text-light);">Click words in the correct order:</p>

            <div class="word-chips" id="words_${exercise.id}">
                ${exercise.words.map((word, i) => `
                    <div class="word-chip" onclick="selectWord('${exercise.id}', ${i}, '${word}')" id="chip_${exercise.id}_${i}">
                        ${word}
                    </div>
                `).join('')}
            </div>

            <div class="answer-area" id="answer_${exercise.id}">
                ${result.userOrder.length ? result.userOrder.join(' ') : 'Your answer will appear here...'}
            </div>

            <button class="hint-button" onclick="toggleHint('hint_${exercise.id}')">💡 Show Hint</button>
            <div id="hint_${exercise.id}" class="hint-text">${exercise.hint}</div>

            <div style="margin-top: 1rem; display: flex; gap: 0.5rem;">
                <button class="btn-primary" onclick="checkUnscramble('${exercise.id}', ${index})">Check Answer</button>
                <button class="btn-nav" onclick="resetUnscramble('${exercise.id}')">Reset</button>
            </div>

            <div id="result_${exercise.id}" style="margin-top: 1rem;"></div>
        </div>
    `;
}

function selectWord(exerciseId, wordIndex, word) {
    const chip = document.getElementById(`chip_${exerciseId}_${wordIndex}`);
    if (chip.classList.contains('placed')) return;

    chip.classList.add('placed');

    if (!topicProgress.exerciseResults[exerciseId]) {
        topicProgress.exerciseResults[exerciseId] = { userOrder: [] };
    }
    topicProgress.exerciseResults[exerciseId].userOrder.push(word);

    const answerArea = document.getElementById(`answer_${exerciseId}`);
    answerArea.textContent = topicProgress.exerciseResults[exerciseId].userOrder.join(' ');
}

function resetUnscramble(exerciseId) {
    topicProgress.exerciseResults[exerciseId] = { userOrder: [] };
    renderInterface();
    renderStep(3);
}

function checkUnscramble(exerciseId, index) {
    const step = currentTopic.steps.find(s => s.stepNumber === 3);
    const exercise = step.content.sentenceUnscramble[index];
    const userAnswer = topicProgress.exerciseResults[exerciseId]?.userOrder.join(' ') || '';

    const isCorrect = userAnswer.toLowerCase() === exercise.correctAnswer.toLowerCase();

    topicProgress.exerciseResults[exerciseId].correct = isCorrect;
    saveTopicProgress();

    const resultDiv = document.getElementById(`result_${exerciseId}`);
    if (isCorrect) {
        resultDiv.innerHTML = `<div style="color: var(--step-completed); font-weight: 500;">✓ Correct!</div>`;
    } else {
        resultDiv.innerHTML = `<div style="color: #dc2626;">Incorrect. Correct answer: "${exercise.correctAnswer}"</div>`;
    }

    renderInterface();
    renderStep(3);
}

function renderFillInBlank(exercise, index) {
    const result = topicProgress.exerciseResults[exercise.id] || {};
    const isCorrect = result.correct;

    return `
        <div class="exercise-card" style="border-left-color: ${isCorrect ? 'var(--step-completed)' : 'var(--color-accent)'};">
            <div class="exercise-title">Exercise ${index + 11}</div>
            <p style="margin-bottom: 1rem;">${exercise.sentence.replace('_____', '<strong style="color: var(--color-accent);">_____</strong>')}</p>

            <select id="${exercise.id}" class="select" style="width: 100%; margin-bottom: 1rem;" onchange="checkFillInBlank('${exercise.id}', ${index})">
                <option value="">Select...</option>
                ${exercise.options.map(opt => `
                    <option value="${opt}" ${result.userAnswer === opt ? 'selected' : ''}>${opt}</option>
                `).join('')}
            </select>

            <div id="result_${exercise.id}"></div>

            ${result.userAnswer ? `
                <div style="margin-top: 1rem; padding: 0.75rem; background: #fffbeb; border-radius: 0.375rem; font-size: 0.875rem;">
                    <strong>Explanation:</strong> ${exercise.explanation}
                </div>
            ` : ''}
        </div>
    `;
}

function checkFillInBlank(exerciseId, index) {
    const select = document.getElementById(exerciseId);
    const userAnswer = select.value;

    if (!userAnswer) return;

    const step = currentTopic.steps.find(s => s.stepNumber === 3);
    const exercise = step.content.fillInTheBlanks[index];
    const isCorrect = userAnswer === exercise.correctAnswer;

    topicProgress.exerciseResults[exerciseId] = {
        userAnswer,
        correct: isCorrect
    };
    saveTopicProgress();

    const resultDiv = document.getElementById(`result_${exerciseId}`);
    if (isCorrect) {
        resultDiv.innerHTML = `<div style="color: var(--step-completed); font-weight: 500;">✓ Correct!</div>`;
    } else {
        resultDiv.innerHTML = `<div style="color: #dc2626;">Incorrect. Correct answer: "${exercise.correctAnswer}"</div>`;
    }

    renderInterface();
    renderStep(3);
}

function toggleHint(hintId) {
    const hint = document.getElementById(hintId);
    hint.classList.toggle('show');
}

// STEP 4: TEMPLATES
function renderTemplatesStep(step, container) {
    const content = step.content;

    container.innerHTML = `
        <div class="step-header">
            <h2 class="step-title">🏗️ ${step.title}</h2>
            <p class="step-description">Study common essay structures and templates</p>
        </div>

        ${content.templates.map((template, idx) => `
            <div class="exercise-card" style="margin-bottom: 2rem;">
                <h3 style="color: var(--color-accent); margin-bottom: 1rem;">${template.name}</h3>

                <div style="background: white; padding: 1.5rem; border-radius: 0.375rem; margin-bottom: 1.5rem;">
                    ${Object.entries(template.structure).map(([part, text]) => `
                        <div style="margin-bottom: 1rem;">
                            <strong style="text-transform: capitalize; color: var(--color-text);">
                                ${part.replace(/([A-Z])/g, ' $1')}:
                            </strong>
                            <p style="margin: 0.5rem 0; color: var(--color-text-light); font-style: italic;">
                                ${text}
                            </p>
                        </div>
                    `).join('')}
                </div>

                ${template.example ? `
                    <button class="hint-button" onclick="toggleHint('example_${idx}')">
                        📖 View Example Essay
                    </button>
                    <div id="example_${idx}" class="hint-text" style="background: #f0fdf4;">
                        ${Object.entries(template.example).map(([part, text]) => `
                            <div style="margin-bottom: 1rem;">
                                <strong style="color: var(--step-completed); text-transform: capitalize;">
                                    ${part.replace(/([A-Z])/g, ' $1')}:
                                </strong>
                                <p style="margin: 0.5rem 0 0 0;">${text}</p>
                            </div>
                        `).join('')}
                    </div>
                ` : ''}
            </div>
        `).join('')}

        <div style="padding-top: 2rem; margin-top: 2rem; border-top: 1px solid var(--color-border);">
            <h3 style="margin-bottom: 1rem;">💡 Useful Transitions</h3>
            ${Object.entries(content.usefulTransitions).map(([category, phrases]) => `
                <div style="margin-bottom: 1rem;">
                    <strong style="text-transform: capitalize; color: var(--color-text);">
                        ${category.replace(/_/g, ' ')}:
                    </strong>
                    <p style="margin: 0.5rem 0 0 0; color: var(--color-text-light);">
                        ${phrases.join(', ')}
                    </p>
                </div>
            `).join('')}
        </div>

        <!-- Band 8 Model Answer -->
        <div style="padding-top: 2rem; margin-top: 3rem; border-top: 2px solid var(--color-border);">
            <h3 style="margin-bottom: 0.5rem; color: var(--color-accent);">📝 Band 8 Model Answer</h3>
            <p style="color: var(--color-text-light); margin-bottom: 1.5rem; font-size: 0.875rem;">
                Study this Band 8 essay to see how templates work in practice
            </p>

            <div style="padding: 1.5rem 0; border-bottom: 1px solid var(--color-border); line-height: 1.8; white-space: pre-wrap;">
${currentTopic.modelEssay.text}
            </div>

            <div style="display: flex; gap: 2rem; padding: 1rem 0; font-size: 0.875rem; color: var(--color-text-light);">
                <span>📊 Word Count: <strong>${currentTopic.modelEssay.wordCount} words</strong></span>
                <span>⭐ Band Level: <strong style="color: var(--step-completed);">8.0</strong></span>
            </div>

            <h4 style="margin: 2rem 0 1rem 0;">✨ What Makes This Band 8:</h4>
            ${currentTopic.modelEssay.highlights.map(highlight => `
                <div style="padding: 0.75rem 0; border-bottom: 1px solid var(--color-border);">
                    <div style="display: flex; align-items: baseline; gap: 0.5rem; margin-bottom: 0.5rem;">
                        <span style="background: #fef3c7; padding: 0.25rem 0.5rem; border-radius: 0.25rem; font-weight: 500; font-size: 0.875rem;">
                            ${highlight.type.replace(/-/g, ' ')}
                        </span>
                        <strong>"${highlight.text}"</strong>
                    </div>
                    <p style="margin: 0; color: var(--color-text-light); font-size: 0.875rem; padding-left: 1rem;">
                        ${highlight.explanation}
                    </p>
                </div>
            `).join('')}
        </div>

        <div class="step-navigation">
            <button class="btn-step btn-step-prev" onclick="navigateToStep(3)">← Previous</button>
            <button class="btn-step btn-step-next" onclick="completeStep(4)">Next: Build Paragraphs →</button>
        </div>
    `;
}

// STEP 5: PARAGRAPHS
function renderParagraphsStep(step, container) {
    const content = step.content;

    container.innerHTML = `
        <div class="step-header">
            <h2 class="step-title">📝 ${step.title}</h2>
            <p class="step-description">${content.instructions}</p>
        </div>

        ${content.paragraphs.map(para => renderParagraphBuilder(para)).join('')}

        <div class="step-navigation">
            <button class="btn-step btn-step-prev" onclick="navigateToStep(4)">← Previous</button>
            <button class="btn-step btn-step-next" onclick="completeStep(5)">Next: Write Essay →</button>
        </div>
    `;

    // Restore saved data
    content.paragraphs.forEach(para => {
        para.blanks.forEach(blank => {
            const input = document.getElementById(blank.id);
            if (input && topicProgress.paragraphData[blank.id]) {
                input.value = topicProgress.paragraphData[blank.id];
                updateWordCounter(blank.id, blank.minWords);
            }
        });
    });
}

function renderParagraphBuilder(paragraph) {
    return `
        <div class="paragraph-builder">
            <div class="paragraph-name">${paragraph.name}</div>
            <div style="background: white; padding: 1rem; border-radius: 0.375rem; margin-bottom: 1rem; font-style: italic; color: var(--color-text-light);">
                ${paragraph.template}
            </div>

            ${paragraph.blanks.map(blank => `
                <div style="margin-bottom: 1.5rem;">
                    <label style="font-weight: 500; display: block; margin-bottom: 0.5rem;">
                        ${blank.label}:
                    </label>
                    <textarea id="${blank.id}" class="blank-input"
                              placeholder="${blank.placeholder}"
                              oninput="saveParagraphData('${blank.id}', ${blank.minWords})"
                              style="min-height: 80px;"></textarea>
                    <div class="word-counter" id="counter_${blank.id}">0 / ${blank.minWords} words</div>

                    <button class="hint-button" onclick="toggleHint('hint_${blank.id}')">💡 Hint</button>
                    <div id="hint_${blank.id}" class="hint-text">${blank.hint}</div>
                </div>
            `).join('')}
        </div>
    `;
}

function saveParagraphData(blankId, minWords) {
    const input = document.getElementById(blankId);
    topicProgress.paragraphData[blankId] = input.value;
    saveTopicProgress();
    updateWordCounter(blankId, minWords);
}

function updateWordCounter(blankId, minWords) {
    const input = document.getElementById(blankId);
    const counter = document.getElementById(`counter_${blankId}`);
    const wordCount = input.value.trim().split(/\s+/).filter(w => w).length;

    counter.textContent = `${wordCount} / ${minWords} words`;
    counter.className = 'word-counter' + (wordCount >= minWords ? ' valid' : '');

    if (wordCount >= minWords) {
        input.classList.add('filled');
    } else {
        input.classList.remove('filled');
    }
}

function checkAllParagraphsFilled() {
    const step = currentTopic.steps.find(s => s.stepNumber === 5);
    const allBlanks = step.content.paragraphs.flatMap(p => p.blanks);

    return allBlanks.every(blank => {
        const data = topicProgress.paragraphData[blank.id];
        if (!data) return false;
        const wordCount = data.trim().split(/\s+/).filter(w => w).length;
        return wordCount >= blank.minWords;
    });
}

// STEP 6: ESSAY
function renderEssayStep(step, container) {
    const content = step.content;

    container.innerHTML = `
        <div class="step-header">
            <h2 class="step-title">🎓 ${step.title}</h2>
            <p class="step-description">${content.instructions}</p>
        </div>

        <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 2rem;">
            <div>
                <textarea id="essayEditor" class="essay-editor"
                          placeholder="Write your complete essay here. You can copy and edit from Step 5..."
                          oninput="saveEssayText()">${topicProgress.essayText || ''}</textarea>
                <div class="word-counter" id="essayWordCount" style="font-size: 1rem; margin-top: 0.5rem;">
                    ${(topicProgress.essayText || '').trim().split(/\s+/).filter(w => w).length} / ${currentTopic.question.wordCountTarget} words
                </div>
            </div>

            <div>
                <div class="exercise-card">
                    <h3 style="margin-bottom: 1rem;">Structure Guide</h3>
                    ${Object.entries(content.structureGuide).map(([part, guide]) => `
                        <div style="margin-bottom: 1rem; padding: 0.75rem; background: white; border-radius: 0.375rem;">
                            <strong style="text-transform: capitalize;">${part.replace(/([A-Z])/g, ' $1')}:</strong>
                            <div style="font-size: 0.875rem; color: var(--color-text-light); margin-top: 0.25rem;">
                                ${guide.sentences}<br>
                                <em>${guide.purpose}</em>
                            </div>
                        </div>
                    `).join('')}
                </div>

                <div class="exercise-card" style="background: #f0fdf4; border-left-color: var(--step-completed);">
                    <h3 style="margin-bottom: 1rem;">Checklist</h3>
                    ${content.checklist.map((item, idx) => `
                        <div style="display: flex; align-items: flex-start; gap: 0.5rem; margin-bottom: 0.5rem;">
                            <input type="checkbox" id="check_${idx}" style="margin-top: 0.25rem;">
                            <label for="check_${idx}" style="font-size: 0.875rem;">${item}</label>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>

        <div class="step-navigation">
            <button class="btn-step btn-step-prev" onclick="navigateToStep(5)">← Previous</button>
            <button class="btn-step btn-step-next" onclick="completeStep(6)">View Comparison →</button>
        </div>
    `;
}

function saveEssayText() {
    const editor = document.getElementById('essayEditor');
    topicProgress.essayText = editor.value;
    saveTopicProgress();

    const wordCount = editor.value.trim().split(/\s+/).filter(w => w).length;
    document.getElementById('essayWordCount').textContent =
        `${wordCount} / ${currentTopic.question.wordCountTarget} words`;
}

function showComparisonView() {
    const container = document.getElementById('stepContent');

    const studentEssay = topicProgress.essayText;
    const modelEssay = currentTopic.modelEssay;

    const studentWordCount = studentEssay.trim().split(/\s+/).filter(w => w).length;

    container.innerHTML = `
        <div class="step-header">
            <h2 class="step-title">🎉 Congratulations!</h2>
            <p class="step-description">Compare your essay with the Band 8 model answer</p>
        </div>

        <div class="comparison-container">
            <div class="comparison-column">
                <div class="comparison-title">Your Essay (${studentWordCount} words)</div>
                <div class="comparison-text">${studentEssay}</div>
            </div>

            <div class="comparison-column" style="background: #f0fdf4;">
                <div class="comparison-title">Model Essay - Band 8 (${modelEssay.wordCount} words)</div>
                <div class="comparison-text">${modelEssay.text}</div>
            </div>
        </div>

        <div class="exercise-card" style="margin-top: 2rem;">
            <h3 style="margin-bottom: 1rem;">💡 Key Techniques in Model Essay</h3>
            ${modelEssay.highlights.map(h => `
                <div style="margin-bottom: 1rem; padding: 1rem; background: white; border-radius: 0.375rem;">
                    <strong style="color: var(--color-accent);">"${h.text}"</strong>
                    <div style="font-size: 0.875rem; margin-top: 0.5rem;">
                        <strong>${h.type.replace(/-/g, ' ').toUpperCase()}:</strong> ${h.explanation}
                    </div>
                </div>
            `).join('')}
        </div>

        <div class="step-navigation">
            <button class="btn-step btn-step-prev" onclick="navigateToStep(6)">← Back to Essay</button>
            <button class="btn-step btn-step-next" onclick="completeTopicAndGoNext()">
                ${getNextTopicButton()}
            </button>
        </div>
    `;
}

function getNextTopicButton() {
    const currentIndex = topics.findIndex(t => t.id === currentTopic.id);
    if (currentIndex < topics.length - 1) {
        const nextTopic = topics[currentIndex + 1];
        return `Next Topic: ${nextTopic.title} →`;
    } else {
        return 'Practice Another Topic';
    }
}

async function completeTopicAndGoNext() {
    const currentIndex = topics.findIndex(t => t.id === currentTopic.id);

    if (currentIndex < topics.length - 1) {
        const nextTopic = topics[currentIndex + 1];
        loadTopic(nextTopic.id);
    } else {
        // Return to topic selection
        currentTopic = null;
        document.getElementById('topicSelector').value = '';
        document.getElementById('mainContainer').innerHTML = `
            <div class="loading-message">
                <p style="font-size: 1.25rem; margin-bottom: 1rem;">🎉 All topics completed!</p>
                <p style="color: var(--color-text-light);">Great job! Select any topic to practice again.</p>
            </div>
        `;

        // Send milestone notification
        await sendAllTopicsCompletedToTelegram();
    }
}

//===========================================
// STUDENT SESSION & TELEGRAM INTEGRATION
//===========================================

async function initializeStudentSession() {
    try {
        studentSession = new StudentSession();

        if (!studentSession.hasActiveSession()) {
            await showStudentLoginModal();
        } else {
            // Show student name in top bar
            updateTopBarWithStudentName();
        }

        // Initialize Telegram
        if (typeof TELEGRAM_BOT_TOKEN !== 'undefined' && typeof TELEGRAM_CHAT_ID !== 'undefined') {
            telegramSender = new TelegramSender(TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID);
        } else {
            console.warn('Telegram credentials not found');
        }
    } catch (error) {
        console.error('Failed to initialize student session:', error);
    }
}

function showStudentLoginModal() {
    return new Promise((resolve) => {
        const modal = document.getElementById('studentLoginModal');
        modal.style.display = 'flex';

        // Store resolve function for later use
        window.resolveStudentLogin = resolve;
    });
}

async function startCamera() {
    try {
        const video = document.getElementById('cameraPreview');
        const startBtn = document.getElementById('startCameraBtn');
        const captureBtn = document.getElementById('capturePhotoBtn');

        cameraStream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = cameraStream;
        video.style.display = 'block';
        startBtn.style.display = 'none';
        captureBtn.style.display = 'block';
    } catch (error) {
        console.error('Camera error:', error);
        alert('Could not access camera. You can continue without a photo.');
    }
}

function capturePhoto() {
    const video = document.getElementById('cameraPreview');
    const canvas = document.getElementById('photoCanvas');
    const img = document.getElementById('capturedPhoto');
    const captureBtn = document.getElementById('capturePhotoBtn');

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0);

    const photoDataUrl = canvas.toDataURL('image/jpeg');
    img.src = photoDataUrl;
    img.style.display = 'block';
    video.style.display = 'none';
    captureBtn.textContent = '✓ Photo Captured';
    captureBtn.disabled = true;

    // Stop camera
    if (cameraStream) {
        cameraStream.getTracks().forEach(track => track.stop());
    }
}

async function startPracticeSession() {
    const nameInput = document.getElementById('studentName');
    const studentName = nameInput.value.trim();

    if (!studentName) {
        alert('Please enter your name');
        return;
    }

    const photoImg = document.getElementById('capturedPhoto');
    const photoDataUrl = photoImg.style.display === 'block' ? photoImg.src : null;

    // Create session
    studentSession.createSession(studentName, photoDataUrl);

    // Hide modal
    document.getElementById('studentLoginModal').style.display = 'none';

    // Update UI
    updateTopBarWithStudentName();

    // Send session start notification
    await sendSessionStartToTelegram();

    // Resolve promise
    if (window.resolveStudentLogin) {
        window.resolveStudentLogin();
    }
}

function updateTopBarWithStudentName() {
    const session = studentSession.getSession();
    if (session && session.name) {
        const title = document.getElementById('pageTitle');
        title.textContent = `IELTS Writing Task 2 - ${session.name}`;
    }
}

async function sendSessionStartToTelegram() {
    if (!telegramSender || !studentSession) return;

    try {
        const session = studentSession.getSession();
        const now = new Date();

        const message = `📝 <b>IELTS Writing Practice Started</b>\n\n` +
                       `👤 Student: ${session.name}\n` +
                       `📚 Module: Writing Task 2 - Progressive Learning\n` +
                       `🕐 Time: ${now.toLocaleString()}\n` +
                       `🆔 Session: ${session.sessionId}`;

        await telegramSender.sendTextMessage(message);

        // Send photo if available
        if (session.photoDataUrl) {
            await telegramSender.sendPhoto(
                dataURLtoBlob(session.photoDataUrl),
                `Student: ${session.name}`,
                `${session.name}_session.jpg`
            );
        }

        console.log('Session start notification sent');
    } catch (error) {
        console.error('Failed to send session start notification:', error);
    }
}

async function sendTopicCompletionToTelegram(topicId) {
    if (!telegramSender || !studentSession) return;

    try {
        const session = studentSession.getSession();
        const topic = topics.find(t => t.id === topicId);
        const progress = topicProgress;

        const correctCount = Object.values(progress.exerciseResults || {}).filter(r => r.correct).length;
        const essayWordCount = (progress.essayText || '').trim().split(/\s+/).filter(w => w).length;

        const message = `✅ <b>Topic Completed!</b>\n\n` +
                       `👤 Student: ${session.name}\n` +
                       `📝 Topic: ${topic.title}\n` +
                       `✓ Steps: ${progress.completedSteps.length}/6\n` +
                       `📊 Exercises: ${correctCount}/48 correct\n` +
                       `📄 Essay: ${essayWordCount} words\n` +
                       `🆔 Session: ${session.sessionId}`;

        await telegramSender.sendTextMessage(message);
        console.log('Topic completion notification sent');
    } catch (error) {
        console.error('Failed to send topic completion notification:', error);
    }
}

async function sendEssaySubmissionToTelegram() {
    if (!telegramSender || !studentSession || !currentTopic) return;

    try {
        const session = studentSession.getSession();
        const essay = topicProgress.essayText || '';
        const wordCount = essay.trim().split(/\s+/).filter(w => w).length;

        // Count sentences from sentence bank used
        const sentenceResults = Object.values(topicProgress.exerciseResults || {}).filter(r => r.correct);

        const message = `📄 <b>Essay Submitted</b>\n\n` +
                       `👤 Student: ${session.name}\n` +
                       `📝 Topic: ${currentTopic.title}\n` +
                       `📊 Word count: ${wordCount} words\n` +
                       `✓ Exercises completed: ${sentenceResults.length}\n` +
                       `🆔 Session: ${session.sessionId}\n\n` +
                       `<b>Essay:</b>\n${essay}`;

        await telegramSender.sendTextMessage(message);
        console.log('Essay submission notification sent');
    } catch (error) {
        console.error('Failed to send essay submission notification:', error);
    }
}

async function sendAllTopicsCompletedToTelegram() {
    if (!telegramSender || !studentSession) return;

    try {
        const session = studentSession.getSession();

        // Count total completed topics
        let totalCompleted = 0;
        let totalExercises = 0;

        topics.forEach(topic => {
            const saved = localStorage.getItem(`${STORAGE_PROGRESS}_${topic.id}`);
            if (saved) {
                const progress = JSON.parse(saved);
                if (progress.completedSteps && progress.completedSteps.length === 6) {
                    totalCompleted++;
                }
                if (progress.exerciseResults) {
                    totalExercises += Object.values(progress.exerciseResults).filter(r => r.correct).length;
                }
            }
        });

        const message = `🎉 <b>ALL TOPICS COMPLETED!</b>\n\n` +
                       `👤 Student: ${session.name}\n` +
                       `✅ Total topics: ${totalCompleted}/10\n` +
                       `📊 Total exercises: ${totalExercises}\n` +
                       `📄 Total essays: ${totalCompleted}\n` +
                       `🆔 Session: ${session.sessionId}\n\n` +
                       `Congratulations on completing all Writing Task 2 topics! 🎓`;

        await telegramSender.sendTextMessage(message);
        console.log('All topics completed notification sent');
    } catch (error) {
        console.error('Failed to send milestone notification:', error);
    }
}

// Utility function to convert dataURL to Blob
function dataURLtoBlob(dataURL) {
    const arr = dataURL.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
}
