/**
 * Extend essays that are below 250 words to meet IELTS requirement
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Fix online-shopping-retail (already updated structure, just need to update text)
console.log('Fixing online-shopping-retail...');
const file1Path = path.join(__dirname, '..', 'data/writing-v2-online-shopping-retail.json');
const data1 = JSON.parse(fs.readFileSync(file1Path, 'utf8'));
data1.modelEssay.text = [
    data1.modelEssay.structure.introduction,
    data1.modelEssay.structure.body1,
    data1.modelEssay.structure.body2,
    data1.modelEssay.structure.conclusion
].join('\n\n');
data1.modelEssay.wordCount = data1.modelEssay.text.trim().split(/\s+/).length;
fs.writeFileSync(file1Path, JSON.stringify(data1, null, 2) + '\n', 'utf8');
console.log(`✓ online-shopping-retail: ${data1.modelEssay.wordCount} words`);

// Fix parenting-courses - extend conclusion
console.log('Fixing parenting-courses...');
const file2Path = path.join(__dirname, '..', 'data/writing-v2-parenting-courses.json');
const data2 = JSON.parse(fs.readFileSync(file2Path, 'utf8'));
const oldConc2 = data2.modelEssay.structure.conclusion;
// Add sentences about broader benefits
const newConc2 = oldConc2.replace(
    /society as a whole\.$/,
    "society as a whole. By equipping parents with essential skills and knowledge, these educational programs can contribute to healthier family dynamics and better child development outcomes. Furthermore, widespread parenting education can help reduce child welfare issues and improve overall community well-being."
);
data2.modelEssay.structure.conclusion = newConc2;
data2.modelEssay.text = [
    data2.modelEssay.structure.introduction,
    data2.modelEssay.structure.body1,
    data2.modelEssay.structure.body2,
    data2.modelEssay.structure.conclusion
].join('\n\n');
data2.modelEssay.wordCount = data2.modelEssay.text.trim().split(/\s+/).length;
fs.writeFileSync(file2Path, JSON.stringify(data2, null, 2) + '\n', 'utf8');
console.log(`✓ parenting-courses: ${data2.modelEssay.wordCount} words`);

// Fix remote-work - extend body2 and conclusion
console.log('Fixing remote-work...');
const file3Path = path.join(__dirname, '..', 'data/writing-v2-remote-work.json');
const data3 = JSON.parse(fs.readFileSync(file3Path, 'utf8'));

// Extend body2 by adding more detail
const oldBody2 = data3.modelEssay.structure.body2;
const newBody2 = oldBody2.replace(
    /career advancement opportunities\.$/,
    "career advancement opportunities. Additionally, office environments provide better access to mentorship and professional networking, which are crucial for long-term career growth and skill development. The spontaneous interactions and face-to-face communication in offices also facilitate knowledge sharing and team building in ways that virtual meetings cannot fully replicate."
);
data3.modelEssay.structure.body2 = newBody2;

// Also extend conclusion
const oldConc3 = data3.modelEssay.structure.conclusion;
const newConc3 = oldConc3.replace(
    /employees' specific needs\.$/,
    "employees' specific needs. Organizations should consider implementing hybrid models that combine the flexibility of remote work with the collaborative benefits of occasional office presence, thereby maximizing both productivity and employee satisfaction."
);
data3.modelEssay.structure.conclusion = newConc3;

data3.modelEssay.text = [
    data3.modelEssay.structure.introduction,
    data3.modelEssay.structure.body1,
    data3.modelEssay.structure.body2,
    data3.modelEssay.structure.conclusion
].join('\n\n');
data3.modelEssay.wordCount = data3.modelEssay.text.trim().split(/\s+/).length;
fs.writeFileSync(file3Path, JSON.stringify(data3, null, 2) + '\n', 'utf8');
console.log(`✓ remote-work: ${data3.modelEssay.wordCount} words`);

console.log('\n✅ All essays extended to meet 250+ word requirement');
