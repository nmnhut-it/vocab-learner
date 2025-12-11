#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const toTranslateFile = path.join(__dirname, '..', 'data', 'to-translate.json');
const outputDir = path.join(__dirname, '..', 'data', 'translation-batches');
const finalOutput = path.join(__dirname, '..', 'data', 'translated.json');

// Create output directory
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const items = JSON.parse(fs.readFileSync(toTranslateFile, 'utf8'));

const BATCH_SIZE = 50;
const batches = [];

// Split into batches
for (let i = 0; i < items.length; i += BATCH_SIZE) {
  batches.push(items.slice(i, i + BATCH_SIZE));
}

console.log(`📦 Split ${items.length} items into ${batches.length} batches of ${BATCH_SIZE} items each\n`);

// Save each batch
batches.forEach((batch, index) => {
  const batchFile = path.join(outputDir, `batch-${String(index + 1).padStart(2, '0')}.json`);
  fs.writeFileSync(batchFile, JSON.stringify(batch, null, 2), 'utf8');
  console.log(`✅ Saved batch ${index + 1}/${batches.length}: ${batchFile}`);
});

console.log(`\n📁 All batches saved to: ${outputDir}`);
console.log('\n💡 Next: Translate each batch file, then run combine-translations.js');
