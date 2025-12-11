#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const translatedFile = path.join(__dirname, '..', 'data', 'translated.json');
const items = JSON.parse(fs.readFileSync(translatedFile, 'utf8'));

const missing = items.filter(i => !i.vietnameseDefinition || !i.vietnameseExample);

console.log(`Found ${missing.length} items missing translations:\n`);
missing.forEach(i => {
  console.log(`ID: ${i.id}`);
  console.log(`Word/Phrase: ${i.word || i.phrase}`);
  console.log(`Definition: ${i.englishDefinition}`);
  console.log(`Example: ${i.englishExample}`);
  console.log('---');
});
