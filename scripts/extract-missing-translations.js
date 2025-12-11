#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataDir = path.join(__dirname, '..', 'data');
const outputFile = path.join(__dirname, '..', 'data', 'missing-translations.json');

const files = fs.readdirSync(dataDir).filter(f =>
  f.startsWith('writing-v2-') &&
  f.endsWith('.json') &&
  f !== 'writing-v2-topics.json'
);

const missingTranslations = {};

console.log('🔍 Extracting items missing Vietnamese translations...\n');

files.forEach(filename => {
  const filepath = path.join(dataDir, filename);
  const content = JSON.parse(fs.readFileSync(filepath, 'utf8'));
  const id = content.id;

  const step2 = content.steps.find(s => s.stepNumber === 2);
  if (!step2 || !step2.content) return;

  const fileItems = {
    title: content.title,
    category: content.category,
    academicVocabulary: [],
    topicVocabulary: []
  };

  // Extract academic vocabulary missing translations
  if (step2.content.academicVocabulary) {
    step2.content.academicVocabulary.forEach(vocab => {
      if (!vocab.vietnameseDefinition || !vocab.vietnameseExample) {
        fileItems.academicVocabulary.push({
          word: vocab.word,
          pronunciation: vocab.pronunciation,
          partOfSpeech: vocab.partOfSpeech,
          definition: vocab.definition,
          example: vocab.example,
          synonyms: vocab.synonyms || [],
          needsTranslation: {
            definition: !vocab.vietnameseDefinition,
            example: !vocab.vietnameseExample
          }
        });
      }
    });
  }

  // Extract topic vocabulary missing translations
  if (step2.content.topicVocabulary) {
    step2.content.topicVocabulary.forEach(vocab => {
      if (!vocab.vietnameseDefinition || !vocab.vietnameseExample) {
        fileItems.topicVocabulary.push({
          phrase: vocab.phrase,
          definition: vocab.definition,
          example: vocab.example,
          needsTranslation: {
            definition: !vocab.vietnameseDefinition,
            example: !vocab.vietnameseExample
          }
        });
      }
    });
  }

  // Only add to output if there are missing translations
  if (fileItems.academicVocabulary.length > 0 || fileItems.topicVocabulary.length > 0) {
    missingTranslations[id] = fileItems;
  }
});

// Calculate statistics
const stats = {
  totalFiles: Object.keys(missingTranslations).length,
  totalAcademicVocab: 0,
  totalTopicVocab: 0
};

Object.values(missingTranslations).forEach(file => {
  stats.totalAcademicVocab += file.academicVocabulary.length;
  stats.totalTopicVocab += file.topicVocabulary.length;
});

// Create two outputs:
// 1. Full data for reference
// 2. Simple format for agent translation

const fullOutput = {
  generatedAt: new Date().toISOString(),
  statistics: stats,
  instructions: "Translate the 'definition' and 'example' fields for each vocabulary item into Vietnamese. Maintain the same structure and add 'vietnameseDefinition' and 'vietnameseExample' fields.",
  files: missingTranslations
};

// Create simplified format for agent
const agentInput = [];
Object.keys(missingTranslations).forEach(fileId => {
  const file = missingTranslations[fileId];

  // Academic vocabulary
  file.academicVocabulary.forEach((item, idx) => {
    agentInput.push({
      id: `${fileId}_academic_${idx}`,
      fileId: fileId,
      type: 'academic',
      word: item.word,
      englishDefinition: item.definition,
      englishExample: item.example,
      vietnameseDefinition: "",
      vietnameseExample: ""
    });
  });

  // Topic vocabulary
  file.topicVocabulary.forEach((item, idx) => {
    agentInput.push({
      id: `${fileId}_topic_${idx}`,
      fileId: fileId,
      type: 'topic',
      phrase: item.phrase,
      englishDefinition: item.definition,
      englishExample: item.example,
      vietnameseDefinition: "",
      vietnameseExample: ""
    });
  });
});

// Write both files
fs.writeFileSync(outputFile, JSON.stringify(fullOutput, null, 2), 'utf8');

const agentInputFile = path.join(__dirname, '..', 'data', 'to-translate.json');
fs.writeFileSync(agentInputFile, JSON.stringify(agentInput, null, 2), 'utf8');

console.log('✅ Extraction complete!');
console.log('='.repeat(80));
console.log(`\n📊 STATISTICS:`);
console.log(`  Files with missing translations: ${stats.totalFiles}`);
console.log(`  Academic vocabulary items: ${stats.totalAcademicVocab}`);
console.log(`  Topic vocabulary items: ${stats.totalTopicVocab}`);
console.log(`  Total items to translate: ${stats.totalAcademicVocab + stats.totalTopicVocab}`);
console.log(`\n📁 Full data: ${outputFile}`);
console.log(`📁 For agent: ${agentInputFile}`);
console.log('\n💡 Next step: Use to-translate.json with an AI agent to fill in Vietnamese translations.');
