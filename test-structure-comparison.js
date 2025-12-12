/**
 * Deep structure comparison for all writing-v2-*.json files
 * Shows variations in nested structures
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const colors = {
    reset: '\x1b[0m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    cyan: '\x1b[36m',
    magenta: '\x1b[35m'
};

function log(message, color = 'reset') {
    console.log(`${colors[color]}${message}${colors.reset}`);
}

function getWritingV2Files() {
    const dataDir = path.join(__dirname, 'data');
    const files = fs.readdirSync(dataDir);
    return files.filter(f => f.startsWith('writing-v2-') && f.endsWith('.json') && f !== 'writing-v2-topics.json');
}

function analyzeStep3Structure(content, filename) {
    const analysis = {
        filename,
        hasExerciseSections: false,
        hasLegacyFormat: false,
        sections: [],
        totalExercises: 0,
        exerciseTypes: new Set(),
        blankPatterns: new Set(),
        issues: []
    };

    if (!content) {
        analysis.issues.push('No content');
        return analysis;
    }

    // Check for new format
    if (content.exerciseSections && Array.isArray(content.exerciseSections)) {
        analysis.hasExerciseSections = true;

        content.exerciseSections.forEach((section, sIdx) => {
            const sectionInfo = {
                index: sIdx,
                category: section.category || '(missing)',
                title: section.title || '(missing)',
                description: section.description || '(missing)',
                exerciseCount: 0,
                exerciseTypes: new Set(),
                blankCounts: []
            };

            if (section.exercises && Array.isArray(section.exercises)) {
                sectionInfo.exerciseCount = section.exercises.length;
                analysis.totalExercises += section.exercises.length;

                section.exercises.forEach((ex, eIdx) => {
                    // Track exercise type
                    if (ex.type) {
                        sectionInfo.exerciseTypes.add(ex.type);
                        analysis.exerciseTypes.add(ex.type);
                    }

                    // Analyze blank structure
                    if (ex.blanks && Array.isArray(ex.blanks)) {
                        const blankCount = ex.blanks.length;
                        sectionInfo.blankCounts.push(blankCount);

                        // Check blank structure
                        ex.blanks.forEach((blank, bIdx) => {
                            const pattern = {
                                hasId: !!blank.id,
                                hasOptions: !!blank.options,
                                optionsCount: blank.options ? blank.options.length : 0,
                                hasCorrectAnswer: !!blank.correctAnswer
                            };
                            analysis.blankPatterns.add(JSON.stringify(pattern));

                            // Validation
                            if (!blank.id) {
                                analysis.issues.push(`Section ${sIdx}, Exercise ${eIdx}, Blank ${bIdx}: missing id`);
                            }
                            if (!blank.correctAnswer) {
                                analysis.issues.push(`Section ${sIdx}, Exercise ${eIdx}, Blank ${bIdx}: missing correctAnswer`);
                            }
                            if (!blank.options || blank.options.length === 0) {
                                analysis.issues.push(`Section ${sIdx}, Exercise ${eIdx}, Blank ${bIdx}: missing or empty options`);
                            }
                        });
                    } else {
                        analysis.issues.push(`Section ${sIdx}, Exercise ${eIdx}: no blanks array`);
                    }

                    // Check other required fields
                    if (!ex.id) {
                        analysis.issues.push(`Section ${sIdx}, Exercise ${eIdx}: missing id`);
                    }
                    if (!ex.template) {
                        analysis.issues.push(`Section ${sIdx}, Exercise ${eIdx}: missing template`);
                    }
                    if (!ex.correctSentence) {
                        analysis.issues.push(`Section ${sIdx}, Exercise ${eIdx}: missing correctSentence`);
                    }
                });
            }

            // Convert Sets to Arrays for display
            sectionInfo.exerciseTypes = Array.from(sectionInfo.exerciseTypes);
            analysis.sections.push(sectionInfo);
        });
    }

    // Check for legacy format
    if (content.buildFromClues || content.sentenceUnscramble || content.fillInTheBlanks) {
        analysis.hasLegacyFormat = true;
        analysis.totalExercises =
            (content.buildFromClues?.length || 0) +
            (content.sentenceUnscramble?.length || 0) +
            (content.fillInTheBlanks?.length || 0);
    }

    // Convert Sets to Arrays
    analysis.exerciseTypes = Array.from(analysis.exerciseTypes);
    analysis.blankPatterns = Array.from(analysis.blankPatterns).map(p => JSON.parse(p));

    return analysis;
}

function compareStructures() {
    log('\n🔬 Deep Structure Analysis of All Writing V2 Files\n', 'blue');
    log('='.repeat(80), 'blue');

    const files = getWritingV2Files();
    const allAnalyses = [];

    // Analyze all files
    files.forEach(filename => {
        const filepath = path.join(__dirname, 'data', filename);
        try {
            const content = fs.readFileSync(filepath, 'utf8');
            const jsonData = JSON.parse(content);
            const step3 = jsonData.steps?.find(s => s.stepNumber === 3);

            if (step3) {
                const analysis = analyzeStep3Structure(step3.content, filename);
                allAnalyses.push(analysis);
            }
        } catch (error) {
            log(`❌ Error processing ${filename}: ${error.message}`, 'red');
        }
    });

    // Group by structure patterns
    log('\n📊 Structure Patterns Summary\n', 'cyan');

    const structureGroups = {
        modern: allAnalyses.filter(a => a.hasExerciseSections && !a.hasLegacyFormat),
        legacy: allAnalyses.filter(a => a.hasLegacyFormat),
        both: allAnalyses.filter(a => a.hasExerciseSections && a.hasLegacyFormat)
    };

    log(`Modern format (exerciseSections): ${structureGroups.modern.length} files`, 'green');
    log(`Legacy format (build/unscramble/fill): ${structureGroups.legacy.length} files`, 'yellow');
    log(`Both formats: ${structureGroups.both.length} files`, 'magenta');

    // Analyze modern format variations
    if (structureGroups.modern.length > 0) {
        log('\n📋 Modern Format - Section Count Distribution\n', 'cyan');

        const sectionCounts = {};
        structureGroups.modern.forEach(a => {
            const count = a.sections.length;
            if (!sectionCounts[count]) sectionCounts[count] = [];
            sectionCounts[count].push(a.filename);
        });

        Object.entries(sectionCounts).sort((a, b) => b[0] - a[0]).forEach(([count, files]) => {
            log(`  ${count} sections: ${files.length} files`, count === '6' ? 'green' : 'yellow');
            if (files.length <= 5) {
                files.forEach(f => log(`    - ${f}`, 'cyan'));
            }
        });

        // Exercise count distribution
        log('\n📋 Modern Format - Exercise Count Distribution\n', 'cyan');

        const exerciseCounts = {};
        structureGroups.modern.forEach(a => {
            const count = a.totalExercises;
            if (!exerciseCounts[count]) exerciseCounts[count] = [];
            exerciseCounts[count].push(a.filename);
        });

        Object.entries(exerciseCounts).sort((a, b) => b[0] - a[0]).forEach(([count, files]) => {
            log(`  ${count} exercises: ${files.length} files`, count === '48' ? 'green' : 'yellow');
            if (parseInt(count) < 20) {
                files.forEach(f => log(`    - ${f}`, 'yellow'));
            }
        });

        // Exercise type analysis
        log('\n📋 Exercise Types Found\n', 'cyan');

        const allTypes = new Set();
        structureGroups.modern.forEach(a => {
            a.exerciseTypes.forEach(t => allTypes.add(t));
        });

        Array.from(allTypes).sort().forEach(type => {
            const filesWithType = structureGroups.modern.filter(a => a.exerciseTypes.includes(type));
            log(`  "${type}": ${filesWithType.length} files`, 'cyan');
        });
    }

    // Show files with issues
    log('\n⚠️  Files with Structural Issues\n', 'yellow');

    const filesWithIssues = allAnalyses.filter(a => a.issues.length > 0);
    if (filesWithIssues.length === 0) {
        log('  ✅ No structural issues found!', 'green');
    } else {
        filesWithIssues.forEach(a => {
            log(`\n  ${a.filename}: ${a.issues.length} issues`, 'yellow');
            a.issues.slice(0, 5).forEach(issue => {
                log(`    - ${issue}`, 'red');
            });
            if (a.issues.length > 5) {
                log(`    ... and ${a.issues.length - 5} more issues`, 'red');
            }
        });
    }

    // Detailed Topic 5 analysis
    log('\n🎯 Topic 5 (Environmental Responsibility) - Detailed Structure\n', 'blue');

    const topic5 = allAnalyses.find(a => a.filename.includes('environment'));
    if (topic5) {
        log(`Format: ${topic5.hasExerciseSections ? 'Modern (exerciseSections)' : 'Legacy'}`, 'cyan');
        log(`Total exercises: ${topic5.totalExercises}`, 'cyan');
        log(`Exercise types: ${topic5.exerciseTypes.join(', ')}`, 'cyan');
        log(`Sections: ${topic5.sections.length}`, 'cyan');

        topic5.sections.forEach((section, idx) => {
            log(`\n  Section ${idx + 1}: ${section.title}`, 'green');
            log(`    Category: ${section.category}`, 'cyan');
            log(`    Exercises: ${section.exerciseCount}`, 'cyan');
            log(`    Exercise types: ${section.exerciseTypes.join(', ')}`, 'cyan');
            log(`    Blank counts: [${section.blankCounts.join(', ')}]`, 'cyan');
        });

        if (topic5.issues.length > 0) {
            log(`\n  ⚠️  Issues found: ${topic5.issues.length}`, 'yellow');
            topic5.issues.forEach(issue => {
                log(`    - ${issue}`, 'red');
            });
        } else {
            log(`\n  ✅ No issues found!`, 'green');
        }
    } else {
        log('  ❌ Topic 5 not found!', 'red');
    }

    // Summary
    log('\n' + '='.repeat(80), 'blue');
    log('\n📊 Final Summary\n', 'blue');
    log(`Total files analyzed: ${allAnalyses.length}`, 'cyan');
    log(`Files with modern format: ${structureGroups.modern.length}`, 'green');
    log(`Files with issues: ${filesWithIssues.length}`, filesWithIssues.length > 0 ? 'yellow' : 'green');

    const perfectFiles = allAnalyses.filter(a =>
        a.hasExerciseSections &&
        a.sections.length === 6 &&
        a.totalExercises === 48 &&
        a.issues.length === 0
    );
    log(`Perfect structure (6 sections, 48 exercises, no issues): ${perfectFiles.length}`, 'green');

    log('\n' + '='.repeat(80), 'blue');
}

compareStructures();
