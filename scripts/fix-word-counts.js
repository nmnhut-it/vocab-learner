/**
 * Automated Script to Fix Word Count Mismatches
 *
 * Updates the wordCount field to match the actual word count in the essay text
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
    let modified = false;

    if (data.modelEssay && data.modelEssay.text) {
        const actualWordCount = data.modelEssay.text.trim().split(/\s+/).length;
        const declaredWordCount = data.modelEssay.wordCount;
        const difference = Math.abs(actualWordCount - declaredWordCount);

        if (difference > 10) {
            console.log(`✓ ${topicId}: Updating word count ${declaredWordCount} → ${actualWordCount} (diff: ${difference})`);
            data.modelEssay.wordCount = actualWordCount;
            modified = true;
            totalFixed++;
        }
    }

    // Save if modified
    if (modified) {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf8');
        filesModified++;
    }
}

console.log('\n' + '='.repeat(60));
console.log('SUMMARY');
console.log('='.repeat(60));
console.log(`Files processed: ${jsonFiles.length}`);
console.log(`Files modified: ${filesModified}`);
console.log(`Total word counts fixed: ${totalFixed}`);
console.log('='.repeat(60));
