#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataDir = path.join(__dirname, '..', 'data');
const translationsFile = path.join(__dirname, '..', 'data', 'translated.json');

if (!fs.existsSync(translationsFile)) {
  console.error('❌ Error: translated.json not found!');
  console.log('\nPlease ensure you have:');
  console.log('1. Used an AI agent to translate to-translate.json');
  console.log('2. Saved the completed translations as translated.json');
  process.exit(1);
}

const translatedItems = JSON.parse(fs.readFileSync(translationsFile, 'utf8'));

console.log('🔄 Applying Vietnamese translations to files...\n');

let filesUpdated = 0;
let itemsUpdated = 0;

// Group translations by file
const translationsByFile = {};
translatedItems.forEach(item => {
  if (!translationsByFile[item.fileId]) {
    translationsByFile[item.fileId] = [];
  }
  translationsByFile[item.fileId].push(item);
});

// Apply translations to each file
Object.keys(translationsByFile).forEach(fileId => {
  const filename = `writing-v2-${fileId}.json`;
  const filepath = path.join(dataDir, filename);

  if (!fs.existsSync(filepath)) {
    console.log(`⚠️  Skipping ${filename} (file not found)`);
    return;
  }

  const content = JSON.parse(fs.readFileSync(filepath, 'utf8'));
  const step2 = content.steps.find(s => s.stepNumber === 2);
  if (!step2 || !step2.content) return;

  let fileModified = false;

  translationsByFile[fileId].forEach(item => {
    if (item.type === 'academic' && step2.content.academicVocabulary) {
      const vocabItem = step2.content.academicVocabulary.find(v => v.word === item.word);
      if (vocabItem && item.vietnameseDefinition && item.vietnameseExample) {
        vocabItem.vietnameseDefinition = item.vietnameseDefinition;
        vocabItem.vietnameseExample = item.vietnameseExample;
        fileModified = true;
        itemsUpdated++;
      }
    } else if (item.type === 'topic' && step2.content.topicVocabulary) {
      const vocabItem = step2.content.topicVocabulary.find(v => v.phrase === item.phrase);
      if (vocabItem && item.vietnameseDefinition && item.vietnameseExample) {
        vocabItem.vietnameseDefinition = item.vietnameseDefinition;
        vocabItem.vietnameseExample = item.vietnameseExample;
        fileModified = true;
        itemsUpdated++;
      }
    }
  });

  if (fileModified) {
    fs.writeFileSync(filepath, JSON.stringify(content, null, 2), 'utf8');
    console.log(`✅ Updated: ${filename}`);
    filesUpdated++;
  }
});

console.log('\n' + '='.repeat(80));
console.log(`\n✅ Translation application complete!`);
console.log(`  Files updated: ${filesUpdated}`);
console.log(`  Vocabulary items updated: ${itemsUpdated}`);
console.log('\n💡 Run the validation script to verify all translations are complete.');
