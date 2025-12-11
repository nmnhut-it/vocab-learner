#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const batchDir = path.join(__dirname, '..', 'data', 'translation-batches');
const outputFile = path.join(__dirname, '..', 'data', 'translated.json');

if (!fs.existsSync(batchDir)) {
  console.error('❌ Error: translation-batches directory not found!');
  process.exit(1);
}

const batchFiles = fs.readdirSync(batchDir)
  .filter(f => f.startsWith('batch-') && f.endsWith('.json'))
  .sort();

if (batchFiles.length === 0) {
  console.error('❌ Error: No batch files found!');
  process.exit(1);
}

console.log(`🔄 Combining ${batchFiles.length} batch files...\n`);

const allTranslations = [];
let totalItems = 0;
let translatedItems = 0;

batchFiles.forEach((filename, index) => {
  const filepath = path.join(batchDir, filename);
  const batch = JSON.parse(fs.readFileSync(filepath, 'utf8'));

  const batchTranslated = batch.filter(item =>
    item.vietnameseDefinition && item.vietnameseExample
  ).length;

  allTranslations.push(...batch);
  totalItems += batch.length;
  translatedItems += batchTranslated;

  console.log(`✅ Batch ${index + 1}/${batchFiles.length}: ${batchTranslated}/${batch.length} items translated`);
});

// Save combined file
fs.writeFileSync(outputFile, JSON.stringify(allTranslations, null, 2), 'utf8');

console.log('\n' + '='.repeat(80));
console.log(`\n✅ Combined translation file created!`);
console.log(`  Total items: ${totalItems}`);
console.log(`  Translated: ${translatedItems}`);
console.log(`  Missing: ${totalItems - translatedItems}`);
console.log(`\n📁 Output: ${outputFile}`);

if (translatedItems === totalItems) {
  console.log('\n🎉 All items translated! Ready to apply.');
  console.log('Run: node scripts/apply-translations.js');
} else {
  console.log(`\n⚠️  ${totalItems - translatedItems} items still need translation.`);
}
