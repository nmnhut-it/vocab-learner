/**
 * Comprehensive Unit Tests for IELTS Writing Task 2 (V2)
 *
 * This test suite validates:
 * 1. Data loading and JSON structure
 * 2. Schema compliance for all topics
 * 3. Natural language quality (grammar, sentences, punctuation)
 * 4. Thesis statements and sample answers
 * 5. Completeness of all required fields
 * 6. Rendering and UI functionality
 */

import puppeteer from 'puppeteer';
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 8766; // Different port to avoid conflicts
const BASE_URL = `http://localhost:${PORT}`;

// Test results tracker
const results = {
    passed: 0,
    failed: 0,
    warnings: 0,
    errors: [],
    warnings_list: []
};

// Simple static file server
function createServer() {
    const rootDir = path.join(__dirname, '..');

    return http.createServer((req, res) => {
        let urlPath = req.url.split('?')[0];
        if (urlPath === '/') urlPath = '/ielts-writing-v2.html';

        let filePath = path.join(rootDir, urlPath);
        const ext = path.extname(filePath);
        const contentTypes = {
            '.html': 'text/html',
            '.js': 'text/javascript',
            '.css': 'text/css',
            '.json': 'application/json',
            '.png': 'image/png',
            '.jpg': 'image/jpeg',
        };

        fs.readFile(filePath, (err, content) => {
            if (err) {
                res.writeHead(404);
                res.end(`File not found: ${urlPath}`);
                return;
            }
            res.writeHead(200, { 'Content-Type': contentTypes[ext] || 'text/plain' });
            res.end(content);
        });
    });
}

// ============================================
// VALIDATION FUNCTIONS
// ============================================

/**
 * Validates sentence quality (grammar, punctuation, structure)
 */
function validateSentence(sentence, context = '') {
    const issues = [];

    if (!sentence || typeof sentence !== 'string') {
        return [`Empty or invalid sentence in ${context}`];
    }

    const trimmed = sentence.trim();

    // Check minimum length
    if (trimmed.length < 3) {
        issues.push(`Sentence too short (${trimmed.length} chars): "${trimmed}" in ${context}`);
    }

    // Check for proper capitalization (first letter should be uppercase)
    if (trimmed.length > 0 && trimmed[0] !== trimmed[0].toUpperCase() && !/^[0-9(]/.test(trimmed)) {
        issues.push(`Sentence should start with capital letter: "${trimmed.substring(0, 50)}" in ${context}`);
    }

    // Check for proper ending punctuation
    const lastChar = trimmed[trimmed.length - 1];
    if (!['.', '?', '!', ':', ')'].includes(lastChar) && trimmed.length > 10) {
        issues.push(`Sentence should end with punctuation: "${trimmed.substring(trimmed.length - 30)}" in ${context}`);
    }

    // Check for repeated words (common typo)
    const repeatedWords = trimmed.match(/\b(\w+)\s+\1\b/gi);
    if (repeatedWords) {
        issues.push(`Repeated words found: ${repeatedWords.join(', ')} in "${trimmed}" (${context})`);
    }

    // Check for double spaces
    if (trimmed.includes('  ')) {
        issues.push(`Double spaces found in: "${trimmed.substring(0, 50)}..." in ${context}`);
    }

    // Check for common typos
    if (/\s,|\s\./.test(trimmed)) {
        issues.push(`Space before punctuation in: "${trimmed}" (${context})`);
    }

    return issues;
}

/**
 * Validates thesis statement quality
 */
function validateThesisStatement(thesis, questionType, context = '') {
    const issues = [];

    if (!thesis || typeof thesis !== 'string') {
        return [`Missing or invalid thesis statement in ${context}`];
    }

    const trimmed = thesis.trim();

    // Basic sentence validation
    issues.push(...validateSentence(trimmed, `thesis in ${context}`));

    // Check length (thesis should be substantial)
    if (trimmed.length < 20) {
        issues.push(`Thesis statement too short (${trimmed.length} chars) in ${context}`);
    }

    // Check for opinion markers in opinion essays
    if (questionType === 'Opinion' || questionType === 'Agree/Disagree') {
        const opinionMarkers = [
            'I believe', 'I think', 'In my opinion', 'In my view',
            'I agree', 'I disagree', 'personally', 'from my perspective'
        ];
        const hasOpinion = opinionMarkers.some(marker =>
            trimmed.toLowerCase().includes(marker.toLowerCase())
        );

        if (!hasOpinion && trimmed.length > 30) {
            issues.push(`Thesis for opinion essay may lack clear personal stance: "${trimmed.substring(0, 80)}..." in ${context}`);
        }
    }

    return issues;
}

/**
 * Validates model essay structure and quality
 */
function validateModelEssay(modelEssay, topicId) {
    const issues = [];
    const context = `model essay for ${topicId}`;

    if (!modelEssay) {
        return [`Missing model essay for ${topicId}`];
    }

    // Validate required fields
    if (!modelEssay.text) {
        issues.push(`Missing essay text in ${context}`);
    }

    if (!modelEssay.wordCount || modelEssay.wordCount < 250) {
        issues.push(`Invalid or too low word count (${modelEssay.wordCount}) in ${context}`);
    }

    if (!modelEssay.structure) {
        issues.push(`Missing structure in ${context}`);
        return issues;
    }

    // Validate structure sections
    const requiredSections = ['introduction', 'body1', 'body2', 'conclusion'];
    for (const section of requiredSections) {
        if (!modelEssay.structure[section]) {
            issues.push(`Missing ${section} in ${context}`);
        } else {
            // Validate each section's content
            const sectionIssues = validateSentence(
                modelEssay.structure[section],
                `${section} of ${context}`
            );
            issues.push(...sectionIssues);

            // Check section length
            const sectionText = modelEssay.structure[section];
            if (sectionText.length < 50 && section !== 'conclusion') {
                issues.push(`${section} seems too short (${sectionText.length} chars) in ${context}`);
            }
        }
    }

    // Validate full essay text
    if (modelEssay.text) {
        const sentences = modelEssay.text.split(/[.!?]+/).filter(s => s.trim().length > 0);
        if (sentences.length < 10) {
            issues.push(`Essay has very few sentences (${sentences.length}) in ${context}`);
        }

        // Validate a sample of sentences
        sentences.slice(0, 5).forEach((sentence, idx) => {
            const sentenceIssues = validateSentence(sentence, `sentence ${idx + 1} of ${context}`);
            issues.push(...sentenceIssues);
        });
    }

    // Validate word count matches actual text
    if (modelEssay.text) {
        const actualWordCount = modelEssay.text.trim().split(/\s+/).length;
        const declaredWordCount = modelEssay.wordCount;
        const difference = Math.abs(actualWordCount - declaredWordCount);

        if (difference > 10) {
            issues.push(`Word count mismatch: declared ${declaredWordCount} but actual is ${actualWordCount} in ${context}`);
        }
    }

    return issues;
}

/**
 * Validates vocabulary entries
 */
function validateVocabulary(vocab, topicId) {
    const issues = [];
    const context = `vocabulary for ${topicId}`;

    const requiredFields = ['word', 'definition', 'example'];

    vocab.forEach((item, idx) => {
        const itemContext = `vocab item ${idx + 1} in ${context}`;

        for (const field of requiredFields) {
            if (!item[field]) {
                issues.push(`Missing ${field} in ${itemContext}`);
            }
        }

        // Validate definition
        if (item.definition) {
            const defIssues = validateSentence(item.definition, `definition of "${item.word}" in ${itemContext}`);
            issues.push(...defIssues);
        }

        // Validate example sentence
        if (item.example) {
            const exampleIssues = validateSentence(item.example, `example for "${item.word}" in ${itemContext}`);
            issues.push(...exampleIssues);

            // Check if example uses the word
            if (!item.example.toLowerCase().includes(item.word.toLowerCase())) {
                issues.push(`Example doesn't contain the word "${item.word}" in ${itemContext}`);
            }
        }
    });

    return issues;
}

/**
 * Validates exercise content
 */
function validateExercises(exercises, topicId) {
    const issues = [];
    const context = `exercises for ${topicId}`;

    if (!exercises.buildFromClues || exercises.buildFromClues.length === 0) {
        issues.push(`Missing buildFromClues exercises in ${context}`);
        return issues;
    }

    exercises.buildFromClues.forEach((exercise, idx) => {
        const exContext = `exercise ${idx + 1} in ${context}`;

        // Validate required fields
        if (!exercise.subject) issues.push(`Missing subject in ${exContext}`);
        if (!exercise.verb) issues.push(`Missing verb in ${exContext}`);
        if (!exercise.keywords || exercise.keywords.length === 0) {
            issues.push(`Missing keywords in ${exContext}`);
        }
        if (!exercise.modelAnswer) {
            issues.push(`Missing modelAnswer in ${exContext}`);
        } else {
            // Validate model answer quality
            const answerIssues = validateSentence(exercise.modelAnswer, `model answer in ${exContext}`);
            issues.push(...answerIssues);
        }
    });

    return issues;
}

/**
 * Validates complete topic data structure
 */
function validateTopicData(data, topicId) {
    const issues = [];
    const warnings = [];

    // Validate required top-level fields
    const requiredFields = ['id', 'title', 'question', 'steps'];
    for (const field of requiredFields) {
        if (!data[field]) {
            issues.push(`Missing required field: ${field}`);
        }
    }

    // Validate question structure
    if (data.question) {
        if (!data.question.text) {
            issues.push(`Missing question text for ${topicId}`);
        } else {
            const qIssues = validateSentence(data.question.text, `question text for ${topicId}`);
            issues.push(...qIssues);
        }

        if (!data.question.type) {
            issues.push(`Missing question type for ${topicId}`);
        }

        if (!data.question.wordCountTarget || data.question.wordCountTarget < 250) {
            warnings.push(`Invalid or low word count target (${data.question.wordCountTarget}) for ${topicId}`);
        }
    }

    // Validate steps (must have exactly 6)
    if (!data.steps || data.steps.length !== 6) {
        issues.push(`Must have exactly 6 steps, found ${data.steps?.length || 0} for ${topicId}`);
        return { issues, warnings }; // Critical error, stop validation
    }

    // Validate each step
    const expectedStepTypes = ['analysis', 'vocabulary', 'exercises', 'templates', 'paragraphs', 'essay'];

    data.steps.forEach((step, idx) => {
        const stepContext = `step ${idx + 1} for ${topicId}`;

        // Validate step structure
        if (step.stepNumber !== idx + 1) {
            issues.push(`Step number mismatch: expected ${idx + 1}, got ${step.stepNumber} in ${stepContext}`);
        }

        if (step.type !== expectedStepTypes[idx]) {
            issues.push(`Step type mismatch: expected ${expectedStepTypes[idx]}, got ${step.type} in ${stepContext}`);
        }

        if (!step.title) {
            issues.push(`Missing title in ${stepContext}`);
        }

        if (!step.content) {
            issues.push(`Missing content in ${stepContext}`);
            return;
        }

        // Step-specific validation
        switch (step.type) {
            case 'analysis':
                if (!step.content.questionType) {
                    issues.push(`Missing questionType in ${stepContext}`);
                }
                if (!step.content.keyWords || step.content.keyWords.length === 0) {
                    issues.push(`Missing keyWords in ${stepContext}`);
                }
                break;

            case 'vocabulary':
                if (!step.content.academicVocabulary || step.content.academicVocabulary.length === 0) {
                    issues.push(`Missing academicVocabulary in ${stepContext}`);
                } else {
                    issues.push(...validateVocabulary(step.content.academicVocabulary, topicId));
                }

                if (!step.content.linkingPhrases) {
                    warnings.push(`Missing linkingPhrases in ${stepContext}`);
                }
                break;

            case 'exercises':
                issues.push(...validateExercises(step.content, topicId));
                break;

            case 'templates':
                if (!step.content.templates || step.content.templates.length === 0) {
                    issues.push(`Missing templates in ${stepContext}`);
                }
                break;

            case 'paragraphs':
                if (!step.content.paragraphs || step.content.paragraphs.length === 0) {
                    issues.push(`Missing paragraphs in ${stepContext}`);
                }

                // Validate paragraph blanks
                step.content.paragraphs?.forEach((para, pIdx) => {
                    if (!para.blanks || para.blanks.length === 0) {
                        warnings.push(`No blanks in paragraph ${pIdx + 1} of ${stepContext}`);
                    }
                });
                break;

            case 'essay':
                if (!step.content.instructions) {
                    issues.push(`Missing instructions in ${stepContext}`);
                }
                if (!step.content.structureGuide) {
                    warnings.push(`Missing structureGuide in ${stepContext}`);
                }
                break;
        }
    });

    // Validate model essay
    if (data.modelEssay) {
        issues.push(...validateModelEssay(data.modelEssay, topicId));

        // Extract and validate thesis from introduction
        if (data.modelEssay.structure?.introduction) {
            const intro = data.modelEssay.structure.introduction;
            const sentences = intro.split(/[.!?]+/).filter(s => s.trim().length > 0);
            if (sentences.length > 0) {
                const thesis = sentences[sentences.length - 1]; // Usually last sentence
                const thesisIssues = validateThesisStatement(
                    thesis,
                    data.question.type,
                    `introduction of ${topicId}`
                );
                issues.push(...thesisIssues);
            }
        }
    } else {
        issues.push(`Missing model essay for ${topicId}`);
    }

    return { issues, warnings };
}

// ============================================
// TEST SUITE
// ============================================

async function runTests() {
    const server = createServer();
    await new Promise(resolve => server.listen(PORT, resolve));
    console.log(`\n${'='.repeat(60)}`);
    console.log('IELTS WRITING TASK 2 - COMPREHENSIVE TEST SUITE');
    console.log(`${'='.repeat(60)}\n`);
    console.log(`Server running on ${BASE_URL}\n`);

    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    try {
        // ============================================
        // TEST 1: Validate Topics Index File
        // ============================================
        console.log('━'.repeat(60));
        console.log('TEST 1: Topics Index File Validation');
        console.log('━'.repeat(60));

        const topicsPath = path.join(__dirname, '..', 'data', 'writing-v2-topics.json');
        let topicsData;

        try {
            const topicsContent = fs.readFileSync(topicsPath, 'utf8');
            topicsData = JSON.parse(topicsContent);
            console.log('✓ Topics index file is valid JSON');
            results.passed++;

            if (!topicsData.topics || !Array.isArray(topicsData.topics)) {
                console.log('✗ Topics index missing "topics" array');
                results.failed++;
                results.errors.push({ test: 'Topics index structure', error: 'Missing topics array' });
            } else {
                console.log(`✓ Found ${topicsData.topics.length} topics in index`);
                results.passed++;
            }
        } catch (err) {
            console.log(`✗ Failed to load topics index: ${err.message}`);
            results.failed++;
            results.errors.push({ test: 'Topics index', error: err.message });
            await browser.close();
            server.close();
            return;
        }

        // ============================================
        // TEST 2: Validate All JSON Files
        // ============================================
        console.log('\n' + '━'.repeat(60));
        console.log('TEST 2: JSON File Syntax Validation');
        console.log('━'.repeat(60));

        const dataDir = path.join(__dirname, '..', 'data');
        const jsonFiles = fs.readdirSync(dataDir)
            .filter(f => f.startsWith('writing-v2-') && f.endsWith('.json') && f !== 'writing-v2-topics.json')
            .sort();

        console.log(`\nValidating ${jsonFiles.length} JSON files...\n`);

        const validTopicsData = [];

        for (const file of jsonFiles) {
            try {
                const filePath = path.join(dataDir, file);
                const content = fs.readFileSync(filePath, 'utf8');
                const data = JSON.parse(content);
                validTopicsData.push({ file, data });
                console.log(`✓ ${file}`);
                results.passed++;
            } catch (err) {
                console.log(`✗ ${file} - ${err.message}`);
                results.failed++;
                results.errors.push({ file, error: err.message });
            }
        }

        // ============================================
        // TEST 3: Schema Compliance & Data Completeness
        // ============================================
        console.log('\n' + '━'.repeat(60));
        console.log('TEST 3: Schema Compliance & Data Completeness');
        console.log('━'.repeat(60));

        console.log(`\nValidating ${validTopicsData.length} topic files...\n`);

        let topicValidationPassed = 0;
        let topicValidationFailed = 0;

        for (const { file, data } of validTopicsData) {
            const topicId = data.id || file.replace('writing-v2-', '').replace('.json', '');
            const validation = validateTopicData(data, topicId);

            if (validation.issues.length === 0) {
                console.log(`✓ ${topicId} - Complete and valid`);
                topicValidationPassed++;
                results.passed++;
            } else {
                console.log(`✗ ${topicId} - ${validation.issues.length} issues found`);
                validation.issues.slice(0, 3).forEach(issue => {
                    console.log(`  • ${issue}`);
                });
                if (validation.issues.length > 3) {
                    console.log(`  ... and ${validation.issues.length - 3} more issues`);
                }
                topicValidationFailed++;
                results.failed++;
                results.errors.push({ topic: topicId, errors: validation.issues });
            }

            // Track warnings separately
            if (validation.warnings.length > 0) {
                results.warnings += validation.warnings.length;
                results.warnings_list.push({ topic: topicId, warnings: validation.warnings });
            }
        }

        console.log(`\nSummary: ${topicValidationPassed} passed, ${topicValidationFailed} failed`);

        // ============================================
        // TEST 4: Natural Language Quality Check
        // ============================================
        console.log('\n' + '━'.repeat(60));
        console.log('TEST 4: Natural Language Quality Check');
        console.log('━'.repeat(60));

        console.log('\nChecking sentence quality, grammar, and punctuation...\n');

        let languageCheckPassed = 0;
        let languageCheckFailed = 0;

        // Sample validation on first 10 topics for detailed language check
        const sampleTopics = validTopicsData.slice(0, 10);

        for (const { file, data } of sampleTopics) {
            const topicId = data.id || file.replace('writing-v2-', '').replace('.json', '');
            const languageIssues = [];

            // Check model essay sentences in detail
            if (data.modelEssay?.text) {
                const sentences = data.modelEssay.text.split(/[.!?]+\s+/).filter(s => s.trim().length > 5);

                sentences.forEach((sentence, idx) => {
                    const issues = validateSentence(sentence, `model essay sentence ${idx + 1}`);
                    languageIssues.push(...issues);
                });
            }

            // Check vocabulary examples
            const vocabStep = data.steps?.find(s => s.type === 'vocabulary');
            if (vocabStep?.content?.academicVocabulary) {
                vocabStep.content.academicVocabulary.slice(0, 5).forEach((vocab, idx) => {
                    if (vocab.example) {
                        const issues = validateSentence(vocab.example, `vocabulary example ${idx + 1}`);
                        languageIssues.push(...issues);
                    }
                });
            }

            if (languageIssues.length === 0) {
                console.log(`✓ ${topicId} - Natural language quality OK`);
                languageCheckPassed++;
                results.passed++;
            } else {
                console.log(`✗ ${topicId} - ${languageIssues.length} language issues`);
                languageIssues.slice(0, 2).forEach(issue => {
                    console.log(`  • ${issue}`);
                });
                if (languageIssues.length > 2) {
                    console.log(`  ... and ${languageIssues.length - 2} more issues`);
                }
                languageCheckFailed++;
                results.failed++;
                results.errors.push({ topic: topicId, type: 'language', errors: languageIssues });
            }
        }

        console.log(`\nSummary: ${languageCheckPassed} passed, ${languageCheckFailed} failed (sample of 10 topics)`);

        // ============================================
        // TEST 5: Thesis Statements & Sample Answers
        // ============================================
        console.log('\n' + '━'.repeat(60));
        console.log('TEST 5: Thesis Statements & Sample Answers Validation');
        console.log('━'.repeat(60));

        console.log('\nValidating thesis statements and sample answers...\n');

        let thesisCheckPassed = 0;
        let thesisCheckFailed = 0;

        for (const { file, data } of validTopicsData.slice(0, 15)) {
            const topicId = data.id || file.replace('writing-v2-', '').replace('.json', '');
            const thesisIssues = [];

            // Extract thesis from introduction
            if (data.modelEssay?.structure?.introduction) {
                const intro = data.modelEssay.structure.introduction;
                const sentences = intro.split(/[.!?]+/).filter(s => s.trim().length > 10);

                if (sentences.length > 0) {
                    // Last sentence is typically the thesis
                    const thesis = sentences[sentences.length - 1];
                    const issues = validateThesisStatement(thesis, data.question?.type, topicId);
                    thesisIssues.push(...issues);
                }
            } else {
                thesisIssues.push(`Missing introduction for thesis extraction`);
            }

            // Validate sample answer completeness
            if (!data.modelEssay) {
                thesisIssues.push(`Missing model essay (sample answer)`);
            } else {
                if (!data.modelEssay.text || data.modelEssay.text.length < 500) {
                    thesisIssues.push(`Sample answer too short or missing`);
                }

                if (!data.modelEssay.structure?.body1 || !data.modelEssay.structure?.body2) {
                    thesisIssues.push(`Incomplete essay structure in sample answer`);
                }
            }

            if (thesisIssues.length === 0) {
                console.log(`✓ ${topicId} - Thesis and sample answer OK`);
                thesisCheckPassed++;
                results.passed++;
            } else {
                console.log(`✗ ${topicId} - Issues found`);
                thesisIssues.forEach(issue => {
                    console.log(`  • ${issue}`);
                });
                thesisCheckFailed++;
                results.failed++;
                results.errors.push({ topic: topicId, type: 'thesis', errors: thesisIssues });
            }
        }

        console.log(`\nSummary: ${thesisCheckPassed} passed, ${thesisCheckFailed} failed (sample of 15 topics)`);

        // ============================================
        // TEST 6: UI Rendering & Data Loading
        // ============================================
        console.log('\n' + '━'.repeat(60));
        console.log('TEST 6: UI Rendering & Data Loading');
        console.log('━'.repeat(60));

        const page = await browser.newPage();

        // Track console errors
        const consoleErrors = [];
        page.on('console', msg => {
            if (msg.type() === 'error') {
                consoleErrors.push(msg.text());
            }
        });

        page.on('pageerror', err => {
            consoleErrors.push(err.message);
        });

        // Set up fake session
        await page.evaluateOnNewDocument(() => {
            const fakeSession = {
                name: 'Test Student',
                photoDataUrl: null,
                sessionStartTime: Date.now(),
                sessionId: 'test-session-comprehensive'
            };
            localStorage.setItem('module2_student_session', JSON.stringify(fakeSession));
        });

        try {
            console.log('\n1. Loading main page...');
            await page.goto(`${BASE_URL}/ielts-writing-v2.html`, { waitUntil: 'networkidle0' });

            // Wait for topics to load
            await page.waitForFunction(() => {
                const select = document.getElementById('topicSelector');
                return select && select.options.length > 1;
            }, { timeout: 15000 });

            const loadedTopics = await page.evaluate(() => {
                return document.getElementById('topicSelector').options.length - 1;
            });

            console.log(`✓ Page loaded, ${loadedTopics} topics available`);
            results.passed++;

            // Test loading a sample topic
            console.log('\n2. Testing topic loading and rendering...');

            const sampleTopicId = topicsData.topics[0].id;
            await page.select('#topicSelector', sampleTopicId);
            await new Promise(r => setTimeout(r, 500));

            // Check if topic loaded
            const topicLoaded = await page.evaluate(() => {
                return typeof currentTopic !== 'undefined' && currentTopic !== null;
            });

            if (topicLoaded) {
                console.log(`✓ Topic "${sampleTopicId}" loaded successfully`);
                results.passed++;
            } else {
                console.log(`✗ Topic "${sampleTopicId}" failed to load`);
                results.failed++;
                results.errors.push({ test: 'Topic loading', error: 'Topic data not loaded' });
            }

            // Test all 6 steps render
            console.log('\n3. Testing step rendering...');
            let allStepsRendered = true;

            for (let step = 1; step <= 6; step++) {
                await page.evaluate((s) => {
                    if (typeof navigateToStep === 'function') {
                        navigateToStep(s);
                    }
                }, step);
                await new Promise(r => setTimeout(r, 300));

                const hasContent = await page.evaluate(() => {
                    const container = document.getElementById('mainContainer');
                    return container && container.innerHTML.includes('step-header');
                });

                if (!hasContent) {
                    console.log(`✗ Step ${step} failed to render`);
                    allStepsRendered = false;
                }
            }

            if (allStepsRendered) {
                console.log('✓ All 6 steps rendered correctly');
                results.passed++;
            } else {
                console.log('✗ Some steps failed to render');
                results.failed++;
                results.errors.push({ test: 'Step rendering', error: 'Some steps did not render' });
            }

            // Check for JavaScript errors
            if (consoleErrors.length > 0) {
                console.log(`\n⚠ ${consoleErrors.length} JavaScript errors detected:`);
                consoleErrors.slice(0, 3).forEach(err => {
                    console.log(`  • ${err}`);
                });
                results.warnings += consoleErrors.length;
                results.warnings_list.push({ test: 'JavaScript errors', warnings: consoleErrors });
            } else {
                console.log('\n✓ No JavaScript errors detected');
                results.passed++;
            }

        } catch (err) {
            console.log(`✗ UI rendering test failed: ${err.message}`);
            results.failed++;
            results.errors.push({ test: 'UI rendering', error: err.message });
        }

    } catch (err) {
        console.error('\n✗ Test suite error:', err);
        results.failed++;
        results.errors.push({ test: 'suite', error: err.message });
    } finally {
        await browser.close();
        server.close();
    }

    // ============================================
    // FINAL SUMMARY
    // ============================================
    console.log('\n' + '='.repeat(60));
    console.log('FINAL TEST SUMMARY');
    console.log('='.repeat(60));
    console.log(`✓ Passed:   ${results.passed}`);
    console.log(`✗ Failed:   ${results.failed}`);
    console.log(`⚠ Warnings: ${results.warnings}`);

    if (results.failed > 0) {
        console.log('\n' + '━'.repeat(60));
        console.log('ERRORS DETAIL (showing first 10):');
        console.log('━'.repeat(60));
        results.errors.slice(0, 10).forEach((err, idx) => {
            console.log(`\n${idx + 1}. ${err.topic || err.file || err.test}`);
            if (Array.isArray(err.errors)) {
                err.errors.slice(0, 3).forEach(e => console.log(`   • ${e}`));
                if (err.errors.length > 3) {
                    console.log(`   ... and ${err.errors.length - 3} more`);
                }
            } else {
                console.log(`   • ${err.error}`);
            }
        });

        if (results.errors.length > 10) {
            console.log(`\n... and ${results.errors.length - 10} more errors`);
        }
    }

    if (results.warnings > 0 && results.warnings_list.length > 0) {
        console.log('\n' + '━'.repeat(60));
        console.log('WARNINGS (showing first 5):');
        console.log('━'.repeat(60));
        results.warnings_list.slice(0, 5).forEach((warn, idx) => {
            console.log(`\n${idx + 1}. ${warn.topic || warn.test}`);
            if (Array.isArray(warn.warnings)) {
                warn.warnings.slice(0, 2).forEach(w => console.log(`   ⚠ ${w}`));
            }
        });
    }

    console.log('\n' + '='.repeat(60));

    // Exit with appropriate code
    process.exit(results.failed > 0 ? 1 : 0);
}

// Run tests
runTests().catch(err => {
    console.error('Fatal error:', err);
    process.exit(1);
});
