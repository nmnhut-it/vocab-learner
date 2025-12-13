/**
 * Test script to validate all writing-v2-*.json files
 * Tests JSON structure and simulates rendering logic
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Colors for output
const colors = {
    reset: '\x1b[0m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
    console.log(`${colors[color]}${message}${colors.reset}`);
}

// Get all writing-v2-*.json files
function getWritingV2Files() {
    const dataDir = path.join(__dirname, 'data');
    const files = fs.readdirSync(dataDir);
    return files.filter(f => f.startsWith('writing-v2-') && f.endsWith('.json') && f !== 'writing-v2-topics.json');
}

// Validate Step 3 content structure
function validateStep3Content(content, filename) {
    const errors = [];
    const warnings = [];

    if (!content) {
        errors.push('Step 3 content is missing');
        return { errors, warnings, valid: false };
    }

    // Check for exerciseSections (new format)
    if (content.exerciseSections) {
        if (!Array.isArray(content.exerciseSections)) {
            errors.push('exerciseSections is not an array');
        } else if (content.exerciseSections.length === 0) {
            errors.push('exerciseSections array is empty');
        } else {
            log(`  ✓ Found ${content.exerciseSections.length} exercise sections`, 'green');

            // Validate each section
            content.exerciseSections.forEach((section, idx) => {
                if (!section.title) {
                    errors.push(`Section ${idx}: missing title`);
                }
                if (!section.category) {
                    warnings.push(`Section ${idx}: missing category`);
                }
                if (!section.exercises || !Array.isArray(section.exercises)) {
                    errors.push(`Section ${idx}: exercises is not an array`);
                } else if (section.exercises.length === 0) {
                    warnings.push(`Section ${idx} (${section.title}): no exercises`);
                } else {
                    log(`    - ${section.title}: ${section.exercises.length} exercises`, 'cyan');

                    // Validate each exercise
                    section.exercises.forEach((ex, exIdx) => {
                        if (!ex.id) errors.push(`Section ${idx}, Exercise ${exIdx}: missing id`);
                        if (!ex.type) errors.push(`Section ${idx}, Exercise ${exIdx}: missing type`);
                        if (!ex.template) warnings.push(`Section ${idx}, Exercise ${exIdx}: missing template`);
                        if (!ex.blanks || !Array.isArray(ex.blanks)) {
                            errors.push(`Section ${idx}, Exercise ${exIdx}: blanks is not an array`);
                        } else {
                            ex.blanks.forEach((blank, blankIdx) => {
                                if (!blank.id) errors.push(`Section ${idx}, Exercise ${exIdx}, Blank ${blankIdx}: missing id`);
                                if (!blank.options || !Array.isArray(blank.options)) {
                                    errors.push(`Section ${idx}, Exercise ${exIdx}, Blank ${blankIdx}: options is not an array`);
                                }
                                if (!blank.correctAnswer) {
                                    errors.push(`Section ${idx}, Exercise ${exIdx}, Blank ${blankIdx}: missing correctAnswer`);
                                }
                            });
                        }
                        if (!ex.correctSentence) {
                            warnings.push(`Section ${idx}, Exercise ${exIdx}: missing correctSentence`);
                        }
                    });
                }
            });
        }
    }
    // Check for legacy formats
    else if (content.buildFromClues || content.sentenceUnscramble || content.fillInTheBlanks) {
        warnings.push('Using legacy format (buildFromClues/sentenceUnscramble/fillInTheBlanks)');
        log(`  ⚠ Legacy format detected`, 'yellow');

        const total = (content.buildFromClues?.length || 0) +
                     (content.sentenceUnscramble?.length || 0) +
                     (content.fillInTheBlanks?.length || 0);
        log(`  → Total exercises: ${total}`, 'cyan');
    } else {
        errors.push('No exercises found (neither exerciseSections nor legacy formats)');
    }

    return {
        errors,
        warnings,
        valid: errors.length === 0
    };
}

// Simulate the rendering logic from writing-v2-app.js
function simulateRendering(jsonData, filename) {
    log(`\n📄 Testing: ${filename}`, 'blue');

    const errors = [];
    const warnings = [];

    // Check basic structure
    if (!jsonData.id) errors.push('Missing id');
    if (!jsonData.title) errors.push('Missing title');
    if (!jsonData.steps || !Array.isArray(jsonData.steps)) {
        errors.push('Missing or invalid steps array');
        return { errors, warnings, valid: false };
    }

    log(`  Title: ${jsonData.title}`, 'cyan');
    log(`  Steps: ${jsonData.steps.length}`, 'cyan');

    // Find Step 3 (Sentence Builder)
    const step3 = jsonData.steps.find(s => s.stepNumber === 3);
    if (!step3) {
        errors.push('Step 3 (Sentence Builder) not found');
    } else {
        log(`  Step 3 Type: ${step3.type}`, 'cyan');

        if (step3.type !== 'exercises') {
            warnings.push(`Step 3 type is "${step3.type}", expected "exercises"`);
        }

        // Validate Step 3 content
        const step3Validation = validateStep3Content(step3.content, filename);
        errors.push(...step3Validation.errors);
        warnings.push(...step3Validation.warnings);
    }

    // Check model essay
    if (!jsonData.modelEssay) {
        warnings.push('Missing modelEssay');
    }

    return {
        errors,
        warnings,
        valid: errors.length === 0
    };
}

// Main test function
function runTests() {
    log('\n🧪 Starting JSON Structure Tests\n', 'blue');
    log('='.repeat(60), 'blue');

    const files = getWritingV2Files();
    log(`Found ${files.length} writing-v2 files to test\n`, 'cyan');

    const results = {
        total: files.length,
        passed: 0,
        failed: 0,
        warnings: 0,
        files: []
    };

    files.forEach(filename => {
        const filepath = path.join(__dirname, 'data', filename);

        try {
            const content = fs.readFileSync(filepath, 'utf8');
            const jsonData = JSON.parse(content);

            const result = simulateRendering(jsonData, filename);

            if (result.valid) {
                results.passed++;
                log(`\n✅ PASSED`, 'green');
            } else {
                results.failed++;
                log(`\n❌ FAILED`, 'red');
                result.errors.forEach(err => {
                    log(`  ERROR: ${err}`, 'red');
                });
            }

            if (result.warnings.length > 0) {
                results.warnings++;
                result.warnings.forEach(warn => {
                    log(`  WARNING: ${warn}`, 'yellow');
                });
            }

            results.files.push({
                filename,
                ...result
            });

        } catch (error) {
            results.failed++;
            log(`\n❌ FAILED TO LOAD: ${error.message}`, 'red');
            results.files.push({
                filename,
                errors: [error.message],
                warnings: [],
                valid: false
            });
        }

        log('-'.repeat(60), 'blue');
    });

    // Summary
    log('\n📊 Test Summary', 'blue');
    log('='.repeat(60), 'blue');
    log(`Total files tested: ${results.total}`, 'cyan');
    log(`Passed: ${results.passed}`, 'green');
    log(`Failed: ${results.failed}`, results.failed > 0 ? 'red' : 'green');
    log(`Files with warnings: ${results.warnings}`, 'yellow');

    // Detailed issues
    if (results.failed > 0) {
        log('\n❌ Failed Files:', 'red');
        results.files.filter(f => !f.valid).forEach(f => {
            log(`\n  ${f.filename}:`, 'red');
            f.errors.forEach(err => log(`    - ${err}`, 'red'));
        });
    }

    // Files with warnings
    if (results.warnings > 0) {
        log('\n⚠️  Files with Warnings:', 'yellow');
        results.files.filter(f => f.warnings.length > 0).forEach(f => {
            log(`\n  ${f.filename}:`, 'yellow');
            f.warnings.forEach(warn => log(`    - ${warn}`, 'yellow'));
        });
    }

    log('\n' + '='.repeat(60), 'blue');

    // Exit with error code if any tests failed
    if (results.failed > 0) {
        log('\n❌ Some tests failed!', 'red');
        process.exit(1);
    } else {
        log('\n✅ All tests passed!', 'green');
        process.exit(0);
    }
}

// Run the tests
runTests();
