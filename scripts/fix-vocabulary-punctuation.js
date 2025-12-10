/**
 * Automated Script to Fix Vocabulary Definition Punctuation
 *
 * This script:
 * 1. Reads all writing-v2-*.json files
 * 2. Finds vocabulary definitions without proper ending punctuation
 * 3. Adds periods to definitions that need them
 * 4. Saves the corrected files
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataDir = path.join(__dirname, '..', 'data');

// Get all writing-v2 JSON files
const jsonFiles = fs.readdirSync(dataDir)
    .filter(f => f.startsWith('writing-v2-') && f.endsWith('.json') && f !== 'writing-v2-topics.json')
    .sort();

console.log(`Found ${jsonFiles.length} topic files to process\n`);

let totalFixed = 0;
let filesModified = 0;

for (const file of jsonFiles) {
    const filePath = path.join(dataDir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    let data = JSON.parse(content);

    const topicId = data.id || file.replace('writing-v2-', '').replace('.json', '');
    let fixedInFile = 0;
    let modified = false;

    // Find vocabulary step
    const vocabStep = data.steps?.find(s => s.type === 'vocabulary');

    if (vocabStep && vocabStep.content) {
        // Fix academic vocabulary
        if (vocabStep.content.academicVocabulary && Array.isArray(vocabStep.content.academicVocabulary)) {
            vocabStep.content.academicVocabulary.forEach((vocab, idx) => {
                if (vocab.definition && typeof vocab.definition === 'string') {
                    const trimmed = vocab.definition.trim();
                    const lastChar = trimmed[trimmed.length - 1];

                    // Check if missing ending punctuation
                    if (!['.', '?', '!'].includes(lastChar)) {
                        vocab.definition = trimmed + '.';
                        fixedInFile++;
                        modified = true;
                    }
                }
            });
        }

        // Fix topic vocabulary if present
        if (vocabStep.content.topicVocabulary && Array.isArray(vocabStep.content.topicVocabulary)) {
            vocabStep.content.topicVocabulary.forEach((vocab, idx) => {
                if (vocab.definition && typeof vocab.definition === 'string') {
                    const trimmed = vocab.definition.trim();
                    const lastChar = trimmed[trimmed.length - 1];

                    if (!['.', '?', '!'].includes(lastChar)) {
                        vocab.definition = trimmed + '.';
                        fixedInFile++;
                        modified = true;
                    }
                }
            });
        }
    }

    // Save if modified
    if (modified) {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf8');
        console.log(`✓ ${topicId}: Fixed ${fixedInFile} definition(s)`);
        filesModified++;
        totalFixed += fixedInFile;
    } else {
        console.log(`  ${topicId}: No fixes needed`);
    }
}

console.log('\n' + '='.repeat(60));
console.log('SUMMARY');
console.log('='.repeat(60));
console.log(`Files processed: ${jsonFiles.length}`);
console.log(`Files modified: ${filesModified}`);
console.log(`Total definitions fixed: ${totalFixed}`);
console.log('='.repeat(60));
