/**
 * Update essay text from structure and recalculate word counts
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const files = [
    'data/writing-v2-online-shopping-retail.json',
    'data/writing-v2-parenting-courses.json',
    'data/writing-v2-remote-work.json'
];

for (const file of files) {
    const filePath = path.join(__dirname, '..', file);
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    // Rebuild full text from structure
    data.modelEssay.text = [
        data.modelEssay.structure.introduction,
        data.modelEssay.structure.body1,
        data.modelEssay.structure.body2,
        data.modelEssay.structure.conclusion
    ].join('\n\n');

    // Recalculate word count
    data.modelEssay.wordCount = data.modelEssay.text.trim().split(/\s+/).length;

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf8');
    console.log(`✓ ${path.basename(file)}: ${data.modelEssay.wordCount} words`);
}

console.log('\n✅ Updated essay texts and word counts');
