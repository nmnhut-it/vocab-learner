/**
 * Fix specific vocabulary examples that don't contain their target words
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const fixes = [
    {
        file: 'data/writing-v2-high-rise-living.json',
        word: 'amenity',
        newExample: 'Modern high-rise buildings offer various amenities such as gyms, pools, and security services.'
    },
    {
        file: 'data/writing-v2-negative-news-media.json',
        word: 'amplify',
        newExample: 'Social media platforms can amplify negative news stories, making them spread more rapidly.'
    },
    {
        file: 'data/writing-v2-private-healthcare.json',
        word: 'disparity',
        newExample: 'Private healthcare often creates a disparity in access to quality medical treatment.'
    },
    {
        file: 'data/writing-v2-technology-education.json',
        word: 'integrate',
        newExample: 'Schools should integrate technology into their curriculum to prepare students for the digital age.'
    }
];

let totalFixed = 0;

for (const fix of fixes) {
    const filePath = path.join(__dirname, '..', fix.file);
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    const vocabStep = data.steps.find(s => s.type === 'vocabulary');
    if (!vocabStep) continue;

    const vocabItem = vocabStep.content.academicVocabulary.find(v => v.word === fix.word);
    if (!vocabItem) {
        console.log(`✗ ${fix.file}: Word "${fix.word}" not found`);
        continue;
    }

    const oldExample = vocabItem.example;
    vocabItem.example = fix.newExample;

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf8');
    console.log(`✓ Fixed "${fix.word}" in ${path.basename(fix.file)}`);
    console.log(`  Old: ${oldExample}`);
    console.log(`  New: ${fix.newExample}`);
    totalFixed++;
}

console.log(`\n✅ Fixed ${totalFixed} vocabulary examples`);
