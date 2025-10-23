/**
 * Module 2 Minimal Practice Interface
 * Clean, focused implementation with essential features only
 */

// Template examples for each technique
const TEMPLATE_EXAMPLES = {
    '5w1h': `<strong>5W1H Method - 4 Template Variations:</strong><br><br>
<strong>Template 1 - Simple & Direct:</strong><br>
I [enjoy/like/love] [WHAT]. Usually, I do this [WHEN] [WHERE] [WHO]. The reason is [WHY]. This makes me feel [HOW].<br><br>
<strong>Template 2 - Time-First:</strong><br>
In [WHEN], I [enjoy/like] [WHAT]. I usually do it [WHERE] [WHO]. I like this activity because [WHY], and it makes me [HOW].<br><br>
<strong>Template 3 - What-Why Focus:</strong><br>
I really [like/enjoy] [WHAT]. [WHY] is the main reason. I usually do it [WHEN] [WHERE] [WHO]. It always makes me feel [HOW].<br><br>
<strong>Template 4 - Feeling-Emphasis:</strong><br>
[WHAT] makes me feel [HOW]. That's why I do it [WHEN]. I usually do it [WHERE] [WHO], and [WHY].<br><br>
<em style="color: #666;">💡 Tip: The system randomly picks one template variation to keep your answers natural!</em>`,

    'prep': `<strong>PREP Method Template:</strong><br><br>
<strong>Point:</strong> [State your main answer/opinion]<br>
<strong>Reason:</strong> The reason is... / This is because...<br>
<strong>Example:</strong> For example, / For instance, / Like...<br>
<strong>Point:</strong> [Restate your main point]<br><br>
<em style="color: #666;">Example: "Yes, I enjoy reading. The reason is it helps me relax. For example, last night I read for an hour before bed. So that's why I really enjoy reading."</em>`,

    'past_present': `<strong>Past vs Present Template:</strong><br><br>
<strong>Past:</strong> In the past, / When I was younger, / Previously, / Back then...<br>
<strong>Present:</strong> But now, / These days, / Currently, / Nowadays...<br>
<strong>Reason:</strong> This changed because... / The difference is...<br><br>
<em style="color: #666;">Example: "In the past, I didn't like cooking. But now, I cook almost every day because I discovered it's actually relaxing."</em>`,

    'personal_general': `<strong>Personal + General Template:</strong><br><br>
<strong>Personal:</strong> Personally, I... / As for me, / In my case...<br>
<strong>General:</strong> But in general, people in [country] / Most people / Many people...<br>
<strong>Reason:</strong> This is because... / The reason is...<br><br>
<em style="color: #666;">Example: "Personally, I prefer coffee. But in general, people in my country drink tea more because it's part of our culture."</em>`,

    'contrast': `<strong>Contrast Technique Template:</strong><br><br>
<strong>Side A:</strong> On one hand, / Some people think... / One advantage is...<br>
<strong>Side B:</strong> On the other hand, / However, / But...<br>
<strong>Opinion:</strong> Personally, I think... / In my view...<br><br>
<em style="color: #666;">Example: "On one hand, studying alone helps you focus. On the other hand, group study lets you learn from others. Personally, I prefer a mix of both."</em>`,

    'feelings': `<strong>Feelings + Reasons Template:</strong><br><br>
<strong>Feeling:</strong> I feel [emotion] when... / It makes me feel...<br>
<strong>Reason:</strong> Because / The reason is / This is because...<br>
<strong>Example:</strong> For instance, / Like when...<br><br>
<em style="color: #666;">Example: "I feel really happy when I exercise because it releases endorphins. For instance, yesterday after jogging, I felt energized all day."</em>`,

    'frequency': `<strong>Frequency + Details Template:</strong><br><br>
<strong>Frequency:</strong> Always / Usually / Often / Sometimes / Rarely / Never<br>
<strong>When:</strong> [specific times or situations]<br>
<strong>Details:</strong> [add specifics about how/what/why]<br><br>
<em style="color: #666;">Example: "I usually go to the gym three times a week, typically in the evening after work because it's less crowded and helps me unwind."</em>`
};

// State
let currentTechnique = '5w1h';
let currentMode = 'sequential';
let currentIndex = 0;
let allQuestions = [];
let favorites = new Set();
let completed = new Set();
let sampleExpanded = false;
let templateExpanded = false;

// Audio recording state
let audioRecorder = null;
let recordingTimer = null;
let currentRecording = null;
let telegramSender = null;

// Student identification state
let studentSession = null;
let identificationCamera = null;
let capturedPhotoData = null;

// Storage keys
const STORAGE_KEY = 'module2_minimal_progress';
const FAVORITES_KEY = 'module2_minimal_favorites';

// Initialize
document.addEventListener('DOMContentLoaded', init);

function init() {
    // Wait for IELTS_LESSONS to load
    if (!window.IELTS_LESSONS?.module2) {
        setTimeout(init, 100);
        return;
    }

    studentSession = new StudentSession();
    initializeAudioRecording();

    if (studentSession.hasActiveSession()) {
        hideIdentificationModal();
        displayStudentInfo();
        loadProgress();
        loadQuestions();
        setupEventListeners();
        renderCurrentQuestion();
    } else {
        showIdentificationModal();
        setupIdentificationListeners();
    }
}

function initializeAudioRecording() {
    if (typeof botToken !== 'undefined' && typeof groupId !== 'undefined') {
        telegramSender = new TelegramSender(botToken, groupId);
    } else {
        console.warn('Telegram credentials not found');
    }
}

function showIdentificationModal() {
    document.getElementById('identificationModal').classList.add('active');
    document.getElementById('identificationOverlay').classList.add('active');
    document.getElementById('mainContainer').classList.add('hidden');
}

function hideIdentificationModal() {
    document.getElementById('identificationModal').classList.remove('active');
    document.getElementById('identificationOverlay').classList.remove('active');
    document.getElementById('mainContainer').classList.remove('hidden');
}

function displayStudentInfo() {
    const session = studentSession.getSession();
    if (session) {
        const nameDisplay = document.getElementById('studentNameDisplay');
        nameDisplay.textContent = session.name;
        nameDisplay.style.display = 'inline';
    }
}

// Load questions for current technique
function loadQuestions() {
    allQuestions = getQuestionsForTechnique(currentTechnique);

    if (!allQuestions || allQuestions.length === 0) {
        console.error('No questions found for technique:', currentTechnique);
        return;
    }

    // Apply mode filter
    if (currentMode === 'random') {
        allQuestions = shuffleArray([...allQuestions]);
    } else if (currentMode === 'favorites') {
        allQuestions = allQuestions.filter((q, i) => favorites.has(getQuestionId(q, i)));
    }

    updateProgress();
}

// Event listeners
function setupEventListeners() {
    // Mode buttons
    document.querySelectorAll('.btn-mode').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.btn-mode').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            currentMode = e.target.dataset.mode;
            currentIndex = 0;
            loadQuestions();
            renderCurrentQuestion();
        });
    });

    // Technique selector
    const techniqueSelect = document.getElementById('techniqueSelect');
    if (techniqueSelect) {
        techniqueSelect.addEventListener('change', (e) => {
            currentTechnique = e.target.value;
            currentIndex = 0;
            loadQuestions();
            renderForm();
            renderCurrentQuestion();

            // Update template if it's expanded
            if (templateExpanded) {
                updateTemplateDisplay();
            }
        });
    }

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

        if (e.key === 'ArrowLeft' || e.key === 'p') previousQuestion();
        if (e.key === 'ArrowRight' || e.key === 'n') nextQuestion();
        if (e.key === 's') toggleSample();
        if (e.key === 'f') getAIFeedback();
    });
}

// Render current question
function renderCurrentQuestion() {
    if (!allQuestions || allQuestions.length === 0) return;

    const question = allQuestions[currentIndex];
    const questionText = typeof question === 'string' ? question : question.question;
    const category = typeof question === 'object' && question.category
        ? question.category
        : getCategoryFromIndex(currentIndex);

    // Update UI
    document.getElementById('questionNum').textContent = `Question ${currentIndex + 1}`;
    document.getElementById('questionText').textContent = questionText;
    document.getElementById('questionCategory').textContent = category;

    // Update favorite button
    const favBtn = document.getElementById('favBtn');
    const questionId = getQuestionId(question, currentIndex);
    favBtn.textContent = favorites.has(questionId) ? '★' : '☆';
    favBtn.classList.toggle('active', favorites.has(questionId));

    // Render form
    renderForm();

    // Handle sample answer
    if (typeof question === 'object' && question.sampleAnswer) {
        document.getElementById('sampleSection').style.display = 'block';
        renderSampleAnswer(question.sampleAnswer);
    } else {
        document.getElementById('sampleSection').style.display = 'none';
    }

    // Hide feedback
    document.getElementById('feedbackSection').style.display = 'none';

    // Reset sample expansion
    if (sampleExpanded) toggleSample();

    updateProgress();
}

// Render form fields
function renderForm() {
    const config = TECHNIQUE_CONFIG[currentTechnique];
    if (!config) return;

    const container = document.getElementById('formContainer');
    container.innerHTML = '';

    config.fields.forEach(field => {
        const fieldDiv = document.createElement('div');
        fieldDiv.className = 'form-field';

        const label = document.createElement('label');
        label.className = 'field-label';
        label.textContent = `${field.icon} ${field.label}`;
        label.htmlFor = `input-${field.id}`;

        const input = document.createElement('input');
        input.type = 'text';
        input.id = `input-${field.id}`;
        input.className = 'field-input';
        input.placeholder = field.placeholder;
        input.addEventListener('input', updatePreview);

        fieldDiv.appendChild(label);
        fieldDiv.appendChild(input);
        container.appendChild(fieldDiv);
    });

    updatePreview();
}

// Update live preview
function updatePreview() {
    const config = TECHNIQUE_CONFIG[currentTechnique];
    if (!config) return;

    const values = {};
    let filledCount = 0;

    config.fields.forEach(field => {
        const input = document.getElementById(`input-${field.id}`);
        if (input) {
            const value = input.value.trim();
            values[field.id] = value;
            if (value) filledCount++;
        }
    });

    // Generate answer based on technique
    const answer = generateAnswer(values, currentTechnique);
    const wordCount = answer ? answer.split(/\s+/).length : 0;

    // Update preview
    const previewBox = document.getElementById('previewBox');
    if (answer) {
        previewBox.textContent = answer;
        previewBox.style.fontStyle = 'normal';
    } else {
        previewBox.innerHTML = '<em>Start typing to see your answer...</em>';
    }

    // Update meta
    document.getElementById('elementCount').textContent = `${filledCount}/${config.fields.length} elements`;
    document.getElementById('wordCount').textContent = `${wordCount} words`;
}

// Generate answer from values
function generateAnswer(values, technique) {
    if (technique === '5w1h') {
        return generate5W1HAnswer(values);
    }

    // Generic: just join non-empty values
    return Object.values(values).filter(v => v).join(' ');
}

// Constants for template variety
const STARTERS = ['I really like', 'I enjoy', 'I love', 'I like to', 'I really enjoy'];
const TIME_CONNECTORS = ['usually', 'normally', 'typically', 'generally'];
const REASON_STARTERS = ['The reason is', 'This is because', 'I do this because'];
const FEELING_STARTERS = ['This makes me feel', 'It makes me feel', 'I feel', 'And I feel'];

function randomPick(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

// Generate 5W1H answer with template variations
function generate5W1HAnswer(v) {
    if (!v.what && !v.when && !v.where && !v.who && !v.why && !v.how) return '';

    const templateType = Math.floor(Math.random() * 4);

    switch (templateType) {
        case 0:
            return generateTemplate1(v);
        case 1:
            return generateTemplate2(v);
        case 2:
            return generateTemplate3(v);
        case 3:
            return generateTemplate4(v);
        default:
            return generateTemplate1(v);
    }
}

// Template 1: Simple & Direct
function generateTemplate1(v) {
    let answer = '';

    if (v.what) {
        answer = `${randomPick(STARTERS)} ${v.what}`;
    }

    if (v.when) {
        const connector = randomPick(TIME_CONNECTORS);
        const timePrefix = v.when.startsWith('in ') || v.when.startsWith('on ') ? '' : 'in ';
        answer += `. ${connector.charAt(0).toUpperCase() + connector.slice(1)}, I do this ${timePrefix}${v.when}`;
    }

    if (v.where || v.who) {
        if (v.where) {
            const wherePrefix = v.where.startsWith('at ') || v.where.startsWith('in ') ? '' : 'at ';
            answer += ` ${wherePrefix}${v.where}`;
        }
        if (v.who) {
            const whoPrefix = v.who.startsWith('with ') || v.who.startsWith('alone') ? '' : 'with ';
            answer += ` ${whoPrefix}${v.who}`;
        }
        answer += '.';
    } else if (answer) {
        answer += '.';
    }

    if (v.why) {
        const reasonStarter = randomPick(REASON_STARTERS);
        const whyText = v.why.startsWith('it ') || v.why.startsWith('I ') ? v.why : `it ${v.why}`;
        answer += ` ${reasonStarter} ${whyText}.`;
    }

    if (v.how) {
        const feelingStarter = randomPick(FEELING_STARTERS);
        answer += ` ${feelingStarter} ${v.how}.`;
    }

    return answer;
}

// Template 2: Time-First
function generateTemplate2(v) {
    let answer = '';

    if (v.when && v.what) {
        const timePrefix = v.when.startsWith('In ') || v.when.startsWith('On ') ? '' : 'In ';
        answer = `${timePrefix}${v.when}, I ${randomPick(['enjoy', 'like', 'love'])} ${v.what}`;
    } else if (v.what) {
        answer = `${randomPick(STARTERS)} ${v.what}`;
    }

    if (v.where || v.who) {
        answer += '. I usually do it';
        if (v.where) {
            const wherePrefix = v.where.startsWith('at ') || v.where.startsWith('in ') ? '' : 'at ';
            answer += ` ${wherePrefix}${v.where}`;
        }
        if (v.who) {
            const whoPrefix = v.who.startsWith('with ') || v.who.startsWith('alone') ? '' : 'with ';
            answer += ` ${whoPrefix}${v.who}`;
        }
        answer += '.';
    } else if (answer) {
        answer += '.';
    }

    if (v.why) {
        const whyText = v.why.startsWith('it ') || v.why.startsWith('I ') ? v.why : `it ${v.why}`;
        answer += ` I like this activity because ${whyText}`;
    }

    if (v.how) {
        answer += `, and it makes me ${v.how}.`;
    } else if (v.why) {
        answer += '.';
    }

    return answer;
}

// Template 3: What-Why Focus
function generateTemplate3(v) {
    let answer = '';

    if (v.what) {
        answer = `I really ${randomPick(['like', 'enjoy', 'love'])} ${v.what}`;
    }

    if (v.why) {
        const whyText = v.why.startsWith('it ') || v.why.startsWith('It ') ? v.why : `It ${v.why}`;
        answer += `. ${whyText} is the main reason`;
    }

    if (v.when || v.where || v.who) {
        answer += `. I usually do it`;
        if (v.when) {
            const timePrefix = v.when.startsWith('in ') || v.when.startsWith('on ') ? '' : 'in ';
            answer += ` ${timePrefix}${v.when}`;
        }
        if (v.where) {
            const wherePrefix = v.where.startsWith('at ') || v.where.startsWith('in ') ? '' : 'at ';
            answer += ` ${wherePrefix}${v.where}`;
        }
        if (v.who) {
            answer += `, ${v.who.startsWith('with ') || v.who.startsWith('alone') ? v.who : 'with ' + v.who}`;
        }
        answer += '.';
    } else if (answer) {
        answer += '.';
    }

    if (v.how) {
        answer += ` It always makes me feel ${v.how}.`;
    }

    return answer;
}

// Template 4: Feeling-Emphasis
function generateTemplate4(v) {
    let answer = '';

    if (v.what && v.how) {
        const whatText = v.what.charAt(0).toUpperCase() + v.what.slice(1);
        answer = `${whatText} makes me feel ${v.how}`;
    } else if (v.what) {
        answer = `${randomPick(STARTERS)} ${v.what}`;
    }

    if (v.when) {
        const timePrefix = v.when.startsWith('in ') || v.when.startsWith('on ') ? '' : 'in ';
        answer += `. That's why I do it ${timePrefix}${v.when}`;
    }

    if (v.where || v.who) {
        answer += '. I usually do it';
        if (v.where) {
            const wherePrefix = v.where.startsWith('at ') || v.where.startsWith('in ') ? '' : 'at ';
            answer += ` ${wherePrefix}${v.where}`;
        }
        if (v.who) {
            answer += ` ${v.who.startsWith('with ') || v.who.startsWith('alone') ? v.who : 'with ' + v.who}`;
        }
    }

    if (v.why) {
        const whyText = v.why.startsWith('it ') || v.why.startsWith('I ') ? v.why : `it ${v.why}`;
        answer += `, and ${whyText}`;
    }

    if (answer && !answer.endsWith('.')) answer += '.';

    return answer;
}

// Render sample answer
function renderSampleAnswer(sampleText) {
    document.getElementById('sampleAnswer').textContent = sampleText;

    // Parse breakdown
    const config = TECHNIQUE_CONFIG[currentTechnique];
    const currentQuestion = allQuestions[currentIndex];

    let breakdown = {};
    if (typeof currentQuestion === 'object' && config.breakdownKey && currentQuestion[config.breakdownKey]) {
        breakdown = currentQuestion[config.breakdownKey];
    }

    // Render breakdown
    const breakdownDiv = document.getElementById('sampleBreakdown');
    breakdownDiv.innerHTML = '<strong>Elements used:</strong><br>';

    Object.entries(breakdown).forEach(([key, value]) => {
        if (value) {
            breakdownDiv.innerHTML += `<strong>${key.toUpperCase()}:</strong> ${value}<br>`;
        }
    });
}

// Navigation
function previousQuestion() {
    if (currentIndex > 0) {
        currentIndex--;
        renderCurrentQuestion();
    }
}

function nextQuestion() {
    if (currentIndex < allQuestions.length - 1) {
        currentIndex++;
        renderCurrentQuestion();
    }
}

// Toggle functions
function toggleSettings() {
    const overlay = document.getElementById('settingsOverlay');
    const panel = document.getElementById('settingsPanel');
    overlay.classList.toggle('active');
    panel.classList.toggle('active');
}

function toggleFavorite() {
    const question = allQuestions[currentIndex];
    const questionId = getQuestionId(question, currentIndex);

    if (favorites.has(questionId)) {
        favorites.delete(questionId);
    } else {
        favorites.add(questionId);
    }

    saveFavorites();
    renderCurrentQuestion();
}

function toggleSample() {
    const content = document.getElementById('sampleContent');
    const icon = document.getElementById('sampleToggleIcon');

    sampleExpanded = !sampleExpanded;
    content.style.display = sampleExpanded ? 'block' : 'none';
    icon.textContent = sampleExpanded ? '▼' : '▶';
}

function toggleTemplate() {
    const content = document.getElementById('templateContent');
    const btn = document.getElementById('templateToggleBtn');

    templateExpanded = !templateExpanded;
    content.style.display = templateExpanded ? 'block' : 'none';
    btn.textContent = templateExpanded ? 'Hide' : 'Show';

    // Update template content when opened
    if (templateExpanded) {
        updateTemplateDisplay();
    }
}

function updateTemplateDisplay() {
    const templateText = document.getElementById('templateText');
    const template = TEMPLATE_EXAMPLES[currentTechnique] || TEMPLATE_EXAMPLES['5w1h'];
    templateText.innerHTML = template;
}

// AI Feedback
async function getAIFeedback() {
    const previewBox = document.getElementById('previewBox');
    const answer = previewBox.textContent;

    if (!answer || answer.length < 10 || answer === 'Start typing to see your answer...') {
        alert('Please fill in at least 2-3 fields before getting feedback');
        return;
    }

    if (!window.ieltsCoachAI?.hasApiKey()) {
        const setup = confirm('You need a free Gemini API key to get AI feedback. Set it up now?');
        if (setup) window.location.href = 'ielts-speaking-lessons.html#api-key';
        return;
    }

    const question = allQuestions[currentIndex];
    const questionText = typeof question === 'string' ? question : question.question;

    const feedbackSection = document.getElementById('feedbackSection');
    const feedbackContent = document.getElementById('feedbackContent');

    feedbackSection.style.display = 'block';
    feedbackContent.textContent = 'Getting AI feedback...';

    try {
        const feedback = await window.ieltsCoachAI.feedbackOnIdeas(questionText, answer);
        feedbackContent.innerHTML = feedback.replace(/\n/g, '<br>');

        // Mark as completed
        const questionId = getQuestionId(question, currentIndex);
        completed.add(questionId);
        saveProgress();
    } catch (error) {
        feedbackContent.textContent = 'Error: ' + error.message;
    }
}

// Progress
function updateProgress() {
    const count = document.getElementById('progressCount');
    count.textContent = `${completed.size}/${allQuestions.length}`;
}

// Storage
function saveProgress() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
        completed: Array.from(completed),
        currentIndex
    }));
}

function loadProgress() {
    try {
        const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
        completed = new Set(data.completed || []);
        currentIndex = data.currentIndex || 0;
    } catch (e) {
        console.error('Error loading progress:', e);
    }
}

function saveFavorites() {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(Array.from(favorites)));
}

function loadFavorites() {
    try {
        const data = JSON.parse(localStorage.getItem(FAVORITES_KEY) || '[]');
        favorites = new Set(data);
    } catch (e) {
        console.error('Error loading favorites:', e);
    }
}

// Utilities
function getQuestionId(question, index) {
    const text = typeof question === 'string' ? question : question.question;
    return `${currentTechnique}_${index}_${text.substring(0, 20)}`;
}

function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// Load favorites on init
loadFavorites();

// ========== JUMP MODAL ==========

let currentJumpFilter = 'all';
let jumpSearchText = '';

function openJumpModal() {
    const overlay = document.getElementById('jumpModalOverlay');
    const modal = document.getElementById('jumpModal');

    overlay.classList.add('active');
    modal.classList.add('active');

    // Populate question list
    populateJumpList();

    // Focus search input
    setTimeout(() => {
        document.getElementById('searchInput').focus();
    }, 100);
}

function closeJumpModal() {
    const overlay = document.getElementById('jumpModalOverlay');
    const modal = document.getElementById('jumpModal');

    overlay.classList.remove('active');
    modal.classList.remove('active');

    // Clear search
    document.getElementById('searchInput').value = '';
    document.getElementById('jumpNumber').value = '';
    jumpSearchText = '';
}

function setJumpFilter(filter) {
    currentJumpFilter = filter;

    // Update tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.filter === filter);
    });

    // Repopulate list
    populateJumpList();
}

function populateJumpList() {
    const listContainer = document.getElementById('questionList');
    listContainer.innerHTML = '';

    if (!allQuestions || allQuestions.length === 0) return;

    allQuestions.forEach((q, index) => {
        const questionId = getQuestionId(q, index);
        const questionText = typeof q === 'string' ? q : q.question;

        // Apply filters
        if (currentJumpFilter === 'favorites' && !favorites.has(questionId)) return;
        if (currentJumpFilter === 'completed' && !completed.has(questionId)) return;

        // Apply search
        if (jumpSearchText && !questionText.toLowerCase().includes(jumpSearchText.toLowerCase())) return;

        // Determine status icon
        let statusIcon = '○'; // incomplete
        if (completed.has(questionId)) statusIcon = '✓';
        if (favorites.has(questionId)) statusIcon = '★';

        // Create item
        const item = document.createElement('div');
        item.className = 'question-item';
        if (index === currentIndex) item.classList.add('current');

        item.innerHTML = `
            <span class="question-status">${statusIcon}</span>
            <span class="question-num-badge">Q${index + 1}</span>
            <span class="question-preview">${questionText}</span>
        `;

        item.onclick = () => jumpToQuestion(index);
        listContainer.appendChild(item);
    });

    // Show count
    const count = listContainer.children.length;
    if (count === 0) {
        listContainer.innerHTML = '<p style="text-align: center; color: #999; padding: 2rem;">No questions found</p>';
    }
}

function jumpToQuestion(index) {
    if (index < 0 || index >= allQuestions.length) return;

    currentIndex = index;
    renderCurrentQuestion();
    closeJumpModal();
}

function jumpToNumber() {
    const input = document.getElementById('jumpNumber');
    const num = parseInt(input.value);

    if (isNaN(num) || num < 1 || num > allQuestions.length) {
        alert(`Please enter a number between 1 and ${allQuestions.length}`);
        return;
    }

    jumpToQuestion(num - 1); // Convert to 0-based index
}

// Setup search input
function setupJumpSearch() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            jumpSearchText = e.target.value;
            populateJumpList();
        });
    }

    // Jump number on Enter key
    const jumpNumberInput = document.getElementById('jumpNumber');
    if (jumpNumberInput) {
        jumpNumberInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') jumpToNumber();
        });
    }

    // ESC to close modal
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const modal = document.getElementById('jumpModal');
            if (modal.classList.contains('active')) {
                closeJumpModal();
            }
        }

        // 'j' to open modal (when not in input)
        if (e.key === 'j' && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
            const modal = document.getElementById('jumpModal');
            if (!modal.classList.contains('active')) {
                openJumpModal();
            }
        }
    });
}

// Call setup after DOM loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupJumpSearch);
} else {
    setupJumpSearch();
}

// ========== STUDENT IDENTIFICATION FUNCTIONS ==========

function setupIdentificationListeners() {
    const nameInput = document.getElementById('studentName');
    nameInput.addEventListener('input', updateSubmitButtonState);
}

function updateSubmitButtonState() {
    const nameInput = document.getElementById('studentName');
    const submitBtn = document.getElementById('submitIdentificationBtn');
    const hasName = nameInput.value.trim().length > 0;
    const hasPhoto = capturedPhotoData !== null;

    submitBtn.disabled = !(hasName && hasPhoto);
}

async function startIdentificationCamera() {
    const videoElement = document.getElementById('cameraVideo');
    const startBtn = document.getElementById('startCameraBtn');
    const captureBtn = document.getElementById('capturePhotoBtn');
    const placeholder = document.getElementById('cameraPlaceholder');

    try {
        identificationCamera = new CameraCapture();
        await identificationCamera.initialize(videoElement);

        placeholder.style.display = 'none';
        videoElement.style.display = 'block';
        startBtn.style.display = 'none';
        captureBtn.style.display = 'inline-block';
    } catch (error) {
        alert(`Camera error: ${error.message}`);
    }
}

function captureIdentificationPhoto() {
    if (!identificationCamera) return;

    try {
        capturedPhotoData = identificationCamera.capturePhoto();

        const photoImg = document.getElementById('capturedPhoto');
        const photoPreview = document.getElementById('photoPreview');
        const cameraPreview = document.getElementById('cameraPreview');
        const captureBtn = document.getElementById('capturePhotoBtn');
        const retakeBtn = document.getElementById('retakePhotoBtn');

        photoImg.src = capturedPhotoData;
        photoPreview.style.display = 'block';
        cameraPreview.style.display = 'none';
        captureBtn.style.display = 'none';
        retakeBtn.style.display = 'inline-block';

        identificationCamera.stopCamera();
        identificationCamera = null;

        updateSubmitButtonState();
    } catch (error) {
        alert(`Capture error: ${error.message}`);
    }
}

function retakeIdentificationPhoto() {
    capturedPhotoData = null;

    const photoPreview = document.getElementById('photoPreview');
    const cameraPreview = document.getElementById('cameraPreview');
    const startBtn = document.getElementById('startCameraBtn');
    const retakeBtn = document.getElementById('retakePhotoBtn');

    photoPreview.style.display = 'none';
    cameraPreview.style.display = 'block';
    startBtn.style.display = 'inline-block';
    retakeBtn.style.display = 'none';

    updateSubmitButtonState();
}

async function submitIdentification() {
    const nameInput = document.getElementById('studentName');
    const studentName = nameInput.value.trim();

    if (!studentName || !capturedPhotoData) {
        alert('Please enter your name and take a photo');
        return;
    }

    const submitBtn = document.getElementById('submitIdentificationBtn');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Starting session...';

    try {
        studentSession.createSession(studentName, capturedPhotoData);
        await sendSessionStartToTelegram(studentName, capturedPhotoData);

        hideIdentificationModal();
        displayStudentInfo();
        loadProgress();
        loadQuestions();
        setupEventListeners();
        renderCurrentQuestion();
    } catch (error) {
        alert(`Failed to start session: ${error.message}`);
        submitBtn.disabled = false;
        submitBtn.textContent = 'Start Practice Session';
    }
}

async function sendSessionStartToTelegram(studentName, photoDataUrl) {
    if (!telegramSender) return;

    try {
        const photoBlob = dataURLtoBlob(photoDataUrl);
        const caption = `<b>📚 New Practice Session Started</b>\n\n` +
                       `<b>Student:</b> ${studentName}\n` +
                       `<b>Module:</b> Module 2 - Finding Ideas Fast\n` +
                       `<b>Time:</b> ${new Date().toLocaleString()}`;

        await telegramSender.sendAudio(photoBlob, caption, `${studentName}_session.jpg`);
    } catch (error) {
        console.error('Failed to send session start to Telegram:', error);
    }
}

function dataURLtoBlob(dataURL) {
    const parts = dataURL.split(',');
    const mimeMatch = parts[0].match(/:(.*?);/);
    const mime = mimeMatch ? mimeMatch[1] : 'image/jpeg';
    const binary = atob(parts[1]);
    const array = new Uint8Array(binary.length);

    for (let i = 0; i < binary.length; i++) {
        array[i] = binary.charCodeAt(i);
    }

    return new Blob([array], { type: mime });
}

function endStudentSession() {
    const confirmed = confirm('Are you sure you want to end your session? Your progress will be saved.');

    if (confirmed) {
        studentSession.clearSession();
        capturedPhotoData = null;

        if (identificationCamera) {
            identificationCamera.stopCamera();
            identificationCamera = null;
        }

        location.reload();
    }
}

// ========== AUDIO RECORDING FUNCTIONS ==========

async function toggleRecording() {
    if (!audioRecorder) {
        await startRecording();
    } else if (audioRecorder.isRecording()) {
        await stopRecording();
    }
}

async function startRecording() {
    try {
        audioRecorder = new AudioRecorder();
        await audioRecorder.initialize();
        audioRecorder.startRecording();
        updateRecordingUI(true);
        startRecordingTimer();
    } catch (error) {
        alert(`Recording error: ${error.message}`);
        audioRecorder = null;
    }
}

async function stopRecording() {
    const recording = await audioRecorder.stopRecording();

    if (recording) {
        currentRecording = recording;
        displayAudioPreview(recording.blob);
    }

    stopRecordingTimer();
    updateRecordingUI(false);
    audioRecorder.cleanup();
    audioRecorder = null;
}

function updateRecordingUI(isRecording) {
    const recordBtn = document.getElementById('recordBtn');
    const recordIcon = document.getElementById('recordIcon');
    const recordLabel = document.getElementById('recordLabel');

    if (isRecording) {
        recordBtn.classList.add('recording');
        recordIcon.textContent = '⏹️';
        recordLabel.textContent = 'Stop Recording';
    } else {
        recordBtn.classList.remove('recording');
        recordIcon.textContent = '🎤';
        recordLabel.textContent = 'Record Answer';
    }
}

function startRecordingTimer() {
    const timerDisplay = document.getElementById('recordTimer');
    timerDisplay.style.display = 'inline';
    timerDisplay.textContent = '0:00';

    recordingTimer = setInterval(() => {
        if (audioRecorder) {
            const duration = audioRecorder.getRecordingDuration();
            timerDisplay.textContent = formatDuration(duration);
        }
    }, 1000);
}

function stopRecordingTimer() {
    if (recordingTimer) {
        clearInterval(recordingTimer);
        recordingTimer = null;
    }
    document.getElementById('recordTimer').style.display = 'none';
}

function formatDuration(milliseconds) {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

function displayAudioPreview(audioBlob) {
    const audioPlayer = document.getElementById('audioPlayer');
    const audioPreview = document.getElementById('audioPreview');

    audioPlayer.src = URL.createObjectURL(audioBlob);
    audioPreview.style.display = 'block';
}

function deleteRecording() {
    currentRecording = null;
    const audioPlayer = document.getElementById('audioPlayer');
    const audioPreview = document.getElementById('audioPreview');

    if (audioPlayer.src) {
        URL.revokeObjectURL(audioPlayer.src);
        audioPlayer.src = '';
    }

    audioPreview.style.display = 'none';
}

async function sendAudioToTelegram() {
    if (!currentRecording) {
        alert('No recording available');
        return;
    }

    if (!telegramSender) {
        alert('Telegram not configured');
        return;
    }

    const sendBtn = document.getElementById('sendTelegramBtn');
    const originalText = sendBtn.textContent;

    try {
        sendBtn.disabled = true;
        sendBtn.textContent = 'Sending...';

        const question = allQuestions[currentIndex];
        const questionText = typeof question === 'string' ? question : question.question;
        const category = typeof question === 'object' && question.category
            ? question.category
            : getCategoryFromIndex(currentIndex);

        const caption = telegramSender.formatAudioCaption(
            questionText,
            currentIndex + 1,
            category,
            currentRecording.duration
        );

        await telegramSender.sendAudio(
            currentRecording.blob,
            caption,
            `recording_q${currentIndex + 1}.ogg`
        );

        alert('✅ Sent to Telegram successfully!');
        deleteRecording();
    } catch (error) {
        alert(`Failed to send: ${error.message}`);
    } finally {
        sendBtn.disabled = false;
        sendBtn.textContent = originalText;
    }
}
