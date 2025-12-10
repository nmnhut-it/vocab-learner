/**
 * Comprehensive Data Validation Tests for IELTS Writing Task 2 (V2)
 *
 * This test suite validates:
 * 1. All JSON files are valid and parseable
 * 2. Schema compliance for all topics
 * 3. Natural language quality (grammar, sentences, punctuation)
 * 4. Thesis statements and sample answers
 * 5. Completeness of all required fields
 * 6. Data consistency across topics
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Test results tracker
const results = {
    passed: 0,
    failed: 0,
    warnings: 0,
    errors: [],
    warnings_list: []
};

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
        return issues;
    }

    // Check for proper capitalization (first letter should be uppercase)
    if (trimmed.length > 0 && trimmed[0] !== trimmed[0].toUpperCase() && !/^[0-9("]/.test(trimmed)) {
        issues.push(`Sentence should start with capital letter: "${trimmed.substring(0, 50)}" in ${context}`);
    }

    // Check for proper ending punctuation
    const lastChar = trimmed[trimmed.length - 1];
    if (!['.', '?', '!', ':', ')'].includes(lastChar) && trimmed.length > 10) {
        issues.push(`Sentence should end with punctuation: "${trimmed.substring(Math.max(0, trimmed.length - 30))}" in ${context}`);
    }

    // Check for repeated words (common typo)
    const repeatedWords = trimmed.match(/\b(\w+)\s+\1\b/gi);
    if (repeatedWords) {
        issues.push(`Repeated words found: ${repeatedWords.join(', ')} in "${trimmed.substring(0, 50)}..." (${context})`);
    }

    // Check for double spaces
    if (trimmed.includes('  ')) {
        issues.push(`Double spaces found in: "${trimmed.substring(0, 50)}..." in ${context}`);
    }

    // Check for space before punctuation (common error)
    if (/\s[,.]/.test(trimmed)) {
        issues.push(`Space before punctuation in: "${trimmed.substring(0, 50)}..." (${context})`);
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
    const opinionTypes = ['Opinion', 'Agree/Disagree', 'Discuss Both Views'];
    if (opinionTypes.includes(questionType)) {
        const opinionMarkers = [
            'I believe', 'I think', 'In my opinion', 'In my view',
            'I agree', 'I disagree', 'personally', 'from my perspective',
            'it is my belief', 'I would argue', 'this essay will'
        ];
        const hasOpinion = opinionMarkers.some(marker =>
            trimmed.toLowerCase().includes(marker.toLowerCase())
        );

        if (!hasOpinion && trimmed.length > 30) {
            issues.push(`Thesis for ${questionType} may lack clear personal stance: "${trimmed.substring(0, 80)}..." in ${context}`);
        }
    }

    return issues;
}

/**
 * Validates model essay structure and quality
 */
function validateModelEssay(modelEssay, topicId, questionType) {
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
        issues.push(`Invalid or too low word count (${modelEssay.wordCount}) in ${context} - IELTS requires 250+ words`);
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
            if (section === 'introduction' && sectionText.length < 50) {
                issues.push(`Introduction too short (${sectionText.length} chars) in ${context}`);
            } else if (section === 'body1' && sectionText.length < 100) {
                issues.push(`Body paragraph 1 too short (${sectionText.length} chars) in ${context}`);
            } else if (section === 'body2' && sectionText.length < 100) {
                issues.push(`Body paragraph 2 too short (${sectionText.length} chars) in ${context}`);
            } else if (section === 'conclusion' && sectionText.length < 40) {
                issues.push(`Conclusion too short (${sectionText.length} chars) in ${context}`);
            }
        }
    }

    // Validate full essay text
    if (modelEssay.text) {
        // Split preserving punctuation to check sentence count
        const sentences = modelEssay.text.split(/[.!?]+/).filter(s => s.trim().length > 5);
        if (sentences.length < 10) {
            issues.push(`Essay has very few sentences (${sentences.length}) in ${context} - may not meet IELTS requirements`);
        }

        // Basic content validation (check for repeated words, double spaces)
        if (modelEssay.text.match(/\b(\w+)\s+\1\b/gi)) {
            const repeatedWords = modelEssay.text.match(/\b(\w+)\s+\1\b/gi);
            issues.push(`Repeated words found in essay: ${repeatedWords.slice(0, 3).join(', ')}`);
        }

        if (modelEssay.text.includes('  ')) {
            issues.push(`Double spaces found in essay text`);
        }

        // Check for basic capitalization at start
        const firstChar = modelEssay.text.trim()[0];
        if (firstChar && firstChar !== firstChar.toUpperCase()) {
            issues.push(`Essay should start with a capital letter`);
        }
    }

    // Validate word count matches actual text
    if (modelEssay.text) {
        const actualWordCount = modelEssay.text.trim().split(/\s+/).length;
        const declaredWordCount = modelEssay.wordCount;
        const difference = Math.abs(actualWordCount - declaredWordCount);

        if (difference > 10) {
            issues.push(`Word count mismatch: declared ${declaredWordCount} but actual is ${actualWordCount} in ${context}`);
        }

        if (actualWordCount < 250) {
            issues.push(`Essay word count ${actualWordCount} is below IELTS minimum (250 words) in ${context}`);
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

    if (!Array.isArray(vocab)) {
        return [`Vocabulary is not an array in ${context}`];
    }

    vocab.forEach((item, idx) => {
        const itemContext = `vocab item ${idx + 1} ("${item.word || 'unknown'}") in ${context}`;

        // Required fields
        if (!item.word) {
            issues.push(`Missing word in ${itemContext}`);
        }
        if (!item.definition) {
            issues.push(`Missing definition in ${itemContext}`);
        }
        if (!item.example) {
            issues.push(`Missing example in ${itemContext}`);
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

            // Check if example uses the word (important for learning)
            if (item.word && !item.example.toLowerCase().includes(item.word.toLowerCase())) {
                issues.push(`Example doesn't contain the word "${item.word}" in ${itemContext}`);
            }
        }

        // Validate synonyms if present
        if (item.synonyms && (!Array.isArray(item.synonyms) || item.synonyms.length === 0)) {
            issues.push(`Invalid or empty synonyms array in ${itemContext}`);
        }
    });

    return issues;
}

/**
 * Validates exercise content
 */
function validateExercises(exerciseContent, topicId) {
    const issues = [];
    const context = `exercises for ${topicId}`;

    // Check for two possible exercise formats
    const hasOldFormat = exerciseContent.buildFromClues;
    const hasNewFormat = exerciseContent.exerciseSections;

    if (!hasOldFormat && !hasNewFormat) {
        issues.push(`Missing exercise content (neither buildFromClues nor exerciseSections) in ${context}`);
        return issues;
    }

    // Validate old format (buildFromClues)
    if (hasOldFormat) {
        if (!Array.isArray(exerciseContent.buildFromClues) || exerciseContent.buildFromClues.length === 0) {
            issues.push(`buildFromClues is not a valid array or is empty in ${context}`);
            return issues;
        }

        exerciseContent.buildFromClues.forEach((exercise, idx) => {
            const exContext = `buildFromClues exercise ${idx + 1} in ${context}`;

            // Validate required fields
            if (!exercise.subject) issues.push(`Missing subject in ${exContext}`);
            if (!exercise.verb) issues.push(`Missing verb in ${exContext}`);
            if (!exercise.keywords || !Array.isArray(exercise.keywords) || exercise.keywords.length === 0) {
                issues.push(`Missing or invalid keywords in ${exContext}`);
            }
            if (!exercise.modelAnswer) {
                issues.push(`Missing modelAnswer in ${exContext}`);
            } else {
                // Validate model answer quality
                const answerIssues = validateSentence(exercise.modelAnswer, `model answer in ${exContext}`);
                issues.push(...answerIssues);

                // Check if model answer uses the provided subject and verb
                const answer = exercise.modelAnswer.toLowerCase();
                if (exercise.subject && !answer.includes(exercise.subject.toLowerCase())) {
                    issues.push(`Model answer doesn't use subject "${exercise.subject}" in ${exContext}`);
                }
            }
        });
    }

    // Validate new format (exerciseSections)
    if (hasNewFormat) {
        if (!Array.isArray(exerciseContent.exerciseSections) || exerciseContent.exerciseSections.length === 0) {
            issues.push(`exerciseSections is not a valid array or is empty in ${context}`);
            return issues;
        }

        exerciseContent.exerciseSections.forEach((section, secIdx) => {
            const secContext = `exerciseSection ${secIdx + 1} in ${context}`;

            if (!section.function) {
                issues.push(`Missing function field in ${secContext}`);
            }
            if (!section.exercises || !Array.isArray(section.exercises) || section.exercises.length === 0) {
                issues.push(`Missing or empty exercises array in ${secContext}`);
            }
        });
    }

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

        const validQuestionTypes = [
            'Opinion', 'Discuss Both Views', 'Advantages & Disadvantages',
            'Problem & Solution', 'Two-Part Question', 'Agree/Disagree',
            'Advantages/Disadvantages', 'Positive/Negative Development',
            'Causes/Solutions', 'Direct Question'
        ];

        if (data.question.type && !validQuestionTypes.includes(data.question.type)) {
            warnings.push(`Unusual question type "${data.question.type}" for ${topicId}`);
        }

        if (!data.question.wordCountTarget || data.question.wordCountTarget < 250) {
            warnings.push(`Invalid or low word count target (${data.question.wordCountTarget}) for ${topicId} - IELTS recommends 270+ words`);
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
                if (!step.content.keyWords || !Array.isArray(step.content.keyWords) || step.content.keyWords.length === 0) {
                    issues.push(`Missing or invalid keyWords in ${stepContext}`);
                }
                if (!step.content.essayStructure) {
                    warnings.push(`Missing essayStructure in ${stepContext}`);
                }
                if (!step.content.commonMistakes || step.content.commonMistakes.length === 0) {
                    warnings.push(`Missing commonMistakes in ${stepContext}`);
                }
                break;

            case 'vocabulary':
                if (!step.content.academicVocabulary || step.content.academicVocabulary.length === 0) {
                    issues.push(`Missing academicVocabulary in ${stepContext}`);
                } else {
                    if (step.content.academicVocabulary.length < 5) {
                        warnings.push(`Only ${step.content.academicVocabulary.length} academic vocabulary items in ${stepContext} - recommend at least 5`);
                    }
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
                } else {
                    const expectedParagraphs = ['Introduction', 'Body1', 'Body2', 'Conclusion'];
                    if (step.content.paragraphs.length < 4) {
                        issues.push(`Expected 4 paragraphs (${expectedParagraphs.join(', ')}), found ${step.content.paragraphs.length} in ${stepContext}`);
                    }

                    // Validate paragraph blanks
                    step.content.paragraphs.forEach((para, pIdx) => {
                        // Check for 'name' or 'section' field (both are valid)
                        if (!para.name && !para.section) {
                            issues.push(`Missing name/section field in paragraph ${pIdx + 1} of ${stepContext}`);
                        }
                        if (!para.blanks || para.blanks.length === 0) {
                            warnings.push(`No blanks in paragraph ${pIdx + 1} (${para.name || para.section || 'unnamed'}) of ${stepContext}`);
                        }
                        if (!para.template) {
                            issues.push(`Missing template in paragraph ${pIdx + 1} of ${stepContext}`);
                        }
                    });
                }
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
        issues.push(...validateModelEssay(data.modelEssay, topicId, data.question?.type));

        // Extract and validate thesis from introduction
        if (data.modelEssay.structure?.introduction) {
            const intro = data.modelEssay.structure.introduction;

            // Check for basic thesis presence (check for opinion markers)
            const opinionTypes = ['Opinion', 'Agree/Disagree', 'Discuss Both Views'];
            if (opinionTypes.includes(data.question.type)) {
                const opinionMarkers = [
                    'I believe', 'I think', 'In my opinion', 'In my view',
                    'I agree', 'I disagree', 'personally', 'from my perspective',
                    'it is my belief', 'I would argue', 'this essay will', 'I strongly'
                ];
                const hasOpinion = opinionMarkers.some(marker =>
                    intro.toLowerCase().includes(marker.toLowerCase())
                );

                if (!hasOpinion && intro.length > 50) {
                    warnings.push(`Introduction for ${data.question.type} may lack clear personal stance in ${topicId}`);
                }
            }

            // Check for repeated words in introduction
            const repeatedWords = intro.match(/\b(\w+)\s+\1\b/gi);
            if (repeatedWords) {
                issues.push(`Repeated words in introduction: ${repeatedWords.join(', ')} in ${topicId}`);
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
    console.log(`\n${'='.repeat(70)}`);
    console.log('IELTS WRITING TASK 2 - COMPREHENSIVE DATA VALIDATION TEST SUITE');
    console.log(`${'='.repeat(70)}\n`);

    const dataDir = path.join(__dirname, '..', 'data');

    // ============================================
    // TEST 1: Validate Topics Index File
    // ============================================
    console.log('━'.repeat(70));
    console.log('TEST 1: Topics Index File Validation');
    console.log('━'.repeat(70));

    const topicsPath = path.join(dataDir, 'writing-v2-topics.json');
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

            // Validate each topic entry in index
            const indexIssues = [];
            topicsData.topics.forEach((topic, idx) => {
                if (!topic.id) indexIssues.push(`Topic ${idx + 1}: Missing id`);
                if (!topic.title) indexIssues.push(`Topic ${idx + 1}: Missing title`);
                if (!topic.file) indexIssues.push(`Topic ${idx + 1}: Missing file`);
                if (!topic.questionType) indexIssues.push(`Topic ${idx + 1}: Missing questionType`);
            });

            if (indexIssues.length === 0) {
                console.log('✓ All topic index entries have required fields');
                results.passed++;
            } else {
                console.log(`✗ ${indexIssues.length} issues in topic index`);
                indexIssues.slice(0, 5).forEach(issue => console.log(`  • ${issue}`));
                results.failed++;
                results.errors.push({ test: 'Topic index entries', errors: indexIssues });
            }
        }
    } catch (err) {
        console.log(`✗ Failed to load topics index: ${err.message}`);
        results.failed++;
        results.errors.push({ test: 'Topics index', error: err.message });
        printSummary();
        process.exit(1);
    }

    // ============================================
    // TEST 2: Validate All JSON Files Exist and are Valid
    // ============================================
    console.log('\n' + '━'.repeat(70));
    console.log('TEST 2: JSON File Syntax Validation');
    console.log('━'.repeat(70));

    const jsonFiles = fs.readdirSync(dataDir)
        .filter(f => f.startsWith('writing-v2-') && f.endsWith('.json') && f !== 'writing-v2-topics.json')
        .sort();

    console.log(`\nValidating ${jsonFiles.length} JSON files...\n`);

    const validTopicsData = [];
    let jsonValidCount = 0;

    for (const file of jsonFiles) {
        try {
            const filePath = path.join(dataDir, file);
            const content = fs.readFileSync(filePath, 'utf8');
            const data = JSON.parse(content);
            validTopicsData.push({ file, data });
            jsonValidCount++;
        } catch (err) {
            console.log(`✗ ${file} - ${err.message}`);
            results.failed++;
            results.errors.push({ file, error: err.message });
        }
    }

    console.log(`✓ ${jsonValidCount}/${jsonFiles.length} JSON files are valid`);
    results.passed++;

    // ============================================
    // TEST 3: Schema Compliance & Data Completeness
    // ============================================
    console.log('\n' + '━'.repeat(70));
    console.log('TEST 3: Schema Compliance & Data Completeness');
    console.log('━'.repeat(70));

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
    console.log('\n' + '━'.repeat(70));
    console.log('TEST 4: Natural Language Quality Check (All Topics)');
    console.log('━'.repeat(70));

    console.log('\nChecking sentence quality, grammar, and punctuation...\n');

    let languageCheckPassed = 0;
    let languageCheckFailed = 0;

    for (const { file, data } of validTopicsData) {
        const topicId = data.id || file.replace('writing-v2-', '').replace('.json', '');
        const languageIssues = [];

        // Check model essay basic quality (not individual sentences, since splitting removes punctuation)
        if (data.modelEssay?.text) {
            const essay = data.modelEssay.text;

            // Check for repeated words
            const repeatedWords = essay.match(/\b(\w+)\s+\1\b/gi);
            if (repeatedWords) {
                languageIssues.push(`Repeated words in essay: ${repeatedWords.slice(0, 2).join(', ')}`);
            }

            // Check for double spaces
            if (essay.includes('  ')) {
                languageIssues.push(`Double spaces found in essay`);
            }
        }

        // Check vocabulary examples (these should be complete sentences)
        const vocabStep = data.steps?.find(s => s.type === 'vocabulary');
        if (vocabStep?.content?.academicVocabulary) {
            vocabStep.content.academicVocabulary.slice(0, 5).forEach((vocab, idx) => {
                if (vocab.example) {
                    const issues = validateSentence(vocab.example, `vocabulary example ${idx + 1}`);
                    languageIssues.push(...issues);
                }
            });
        }

        // Check structure paragraphs (these are also complete sentences/paragraphs)
        if (data.modelEssay?.structure) {
            ['introduction', 'body1', 'body2', 'conclusion'].forEach(section => {
                if (data.modelEssay.structure[section]) {
                    const text = data.modelEssay.structure[section];
                    // Just check for repeated words and double spaces
                    const repeatedWords = text.match(/\b(\w+)\s+\1\b/gi);
                    if (repeatedWords) {
                        languageIssues.push(`Repeated words in ${section}: ${repeatedWords.join(', ')}`);
                    }
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

    console.log(`\nSummary: ${languageCheckPassed} passed, ${languageCheckFailed} failed`);

    // ============================================
    // TEST 5: Thesis Statements & Sample Answers
    // ============================================
    console.log('\n' + '━'.repeat(70));
    console.log('TEST 5: Thesis Statements & Sample Answers Validation (All Topics)');
    console.log('━'.repeat(70));

    console.log('\nValidating thesis statements and sample answers...\n');

    let thesisCheckPassed = 0;
    let thesisCheckFailed = 0;

    for (const { file, data } of validTopicsData) {
        const topicId = data.id || file.replace('writing-v2-', '').replace('.json', '');
        const thesisIssues = [];

        // Check for thesis presence in introduction
        if (data.modelEssay?.structure?.introduction) {
            const intro = data.modelEssay.structure.introduction;

            // Check if introduction has sufficient length
            if (intro.length < 50) {
                thesisIssues.push(`Introduction too short (${intro.length} chars) - should be at least 50 chars`);
            }

            // Check for opinion markers in opinion/discussion essays
            const opinionTypes = ['Opinion', 'Agree/Disagree', 'Discuss Both Views'];
            if (opinionTypes.includes(data.question?.type)) {
                const opinionMarkers = [
                    'I believe', 'I think', 'In my opinion', 'In my view',
                    'I agree', 'I disagree', 'personally', 'from my perspective',
                    'it is my belief', 'I would argue', 'this essay will', 'I strongly'
                ];
                const hasOpinion = opinionMarkers.some(marker =>
                    intro.toLowerCase().includes(marker.toLowerCase())
                );

                if (!hasOpinion) {
                    thesisIssues.push(`Introduction may lack clear personal stance for ${data.question.type} essay`);
                }
            }
        } else {
            thesisIssues.push(`Missing introduction`);
        }

        // Validate sample answer completeness
        if (!data.modelEssay) {
            thesisIssues.push(`Missing model essay (sample answer)`);
        } else {
            if (!data.modelEssay.text || data.modelEssay.text.length < 500) {
                thesisIssues.push(`Sample answer too short (${data.modelEssay.text?.length || 0} chars) - IELTS requires substantial essays`);
            }

            if (!data.modelEssay.structure?.body1 || !data.modelEssay.structure?.body2) {
                thesisIssues.push(`Incomplete essay structure in sample answer`);
            }

            // Check if essay has proper structure
            const requiredSections = ['introduction', 'body1', 'body2', 'conclusion'];
            const missingSections = requiredSections.filter(sec => !data.modelEssay.structure?.[sec]);
            if (missingSections.length > 0) {
                thesisIssues.push(`Missing sections: ${missingSections.join(', ')}`);
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

    console.log(`\nSummary: ${thesisCheckPassed} passed, ${thesisCheckFailed} failed`);

    // ============================================
    // TEST 6: Cross-Topic Consistency
    // ============================================
    console.log('\n' + '━'.repeat(70));
    console.log('TEST 6: Cross-Topic Data Consistency');
    console.log('━'.repeat(70));

    console.log('\nChecking consistency across all topics...\n');

    const consistencyIssues = [];

    // Check if all topics in index have corresponding files
    const loadedTopicIds = validTopicsData.map(t => t.data.id);
    const indexTopicIds = topicsData.topics.map(t => t.id);
    const missingFiles = indexTopicIds.filter(id => !loadedTopicIds.includes(id));

    if (missingFiles.length > 0) {
        consistencyIssues.push(`Topics in index but missing data files: ${missingFiles.join(', ')}`);
    }

    // Check for orphaned files (files not in index)
    const orphanedFiles = loadedTopicIds.filter(id => !indexTopicIds.includes(id));
    if (orphanedFiles.length > 0) {
        consistencyIssues.push(`Data files not referenced in index: ${orphanedFiles.join(', ')}`);
    }

    // Check average statistics
    const wordCounts = validTopicsData
        .map(t => t.data.modelEssay?.wordCount)
        .filter(c => c && c > 0);
    const avgWordCount = wordCounts.reduce((a, b) => a + b, 0) / wordCounts.length;

    console.log(`\nStatistics:`);
    console.log(`  Total topics in index: ${topicsData.topics.length}`);
    console.log(`  Valid JSON files: ${validTopicsData.length}`);
    console.log(`  Average essay word count: ${Math.round(avgWordCount)}`);

    if (consistencyIssues.length === 0) {
        console.log(`\n✓ Cross-topic consistency OK`);
        results.passed++;
    } else {
        console.log(`\n✗ Consistency issues found:`);
        consistencyIssues.forEach(issue => console.log(`  • ${issue}`));
        results.failed++;
        results.errors.push({ test: 'Consistency', errors: consistencyIssues });
    }

    // Print final summary
    printSummary();

    // Exit with appropriate code
    process.exit(results.failed > 0 ? 1 : 0);
}

function printSummary() {
    // ============================================
    // FINAL SUMMARY
    // ============================================
    console.log('\n' + '='.repeat(70));
    console.log('FINAL TEST SUMMARY');
    console.log('='.repeat(70));
    console.log(`✓ Passed:   ${results.passed}`);
    console.log(`✗ Failed:   ${results.failed}`);
    console.log(`⚠ Warnings: ${results.warnings}`);

    if (results.failed > 0) {
        console.log('\n' + '━'.repeat(70));
        console.log('ERRORS DETAIL (showing first 15):');
        console.log('━'.repeat(70));
        results.errors.slice(0, 15).forEach((err, idx) => {
            console.log(`\n${idx + 1}. ${err.topic || err.file || err.test}${err.type ? ` (${err.type})` : ''}`);
            if (Array.isArray(err.errors)) {
                err.errors.slice(0, 3).forEach(e => console.log(`   • ${e}`));
                if (err.errors.length > 3) {
                    console.log(`   ... and ${err.errors.length - 3} more`);
                }
            } else {
                console.log(`   • ${err.error}`);
            }
        });

        if (results.errors.length > 15) {
            console.log(`\n... and ${results.errors.length - 15} more errors`);
        }
    }

    if (results.warnings > 0 && results.warnings_list.length > 0) {
        console.log('\n' + '━'.repeat(70));
        console.log('WARNINGS (showing first 10):');
        console.log('━'.repeat(70));
        results.warnings_list.slice(0, 10).forEach((warn, idx) => {
            console.log(`\n${idx + 1}. ${warn.topic || warn.test}`);
            if (Array.isArray(warn.warnings)) {
                warn.warnings.slice(0, 2).forEach(w => console.log(`   ⚠ ${w}`));
                if (warn.warnings.length > 2) {
                    console.log(`   ... and ${warn.warnings.length - 2} more`);
                }
            }
        });

        if (results.warnings_list.length > 10) {
            console.log(`\n... and ${results.warnings_list.length - 10} more topics with warnings`);
        }
    }

    console.log('\n' + '='.repeat(70));
}

// Run tests
runTests().catch(err => {
    console.error('Fatal error:', err);
    process.exit(1);
});
