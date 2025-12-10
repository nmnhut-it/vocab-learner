/**
 * Batch fix unnatural language patterns in remaining topics
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataDir = path.join(__dirname, '..', 'data');

// Define specific fixes for each topic
const fixes = {
  'adult-illiteracy': [
    {
      path: ['modelEssay', 'structure', 'body2'],
      old: /\benable\b/gi,
      new: 'allow',
      context: 'enable'
    }
  ],
  'artificial-intelligence': [
    {
      path: ['modelEssay', 'structure', 'introduction'],
      old: 'unprecedented',
      new: 'major'
    },
    {
      path: ['steps', {type: 'vocabulary'}, 'content', 'academicVocabulary', {word: 'unprecedented'}, 'example'],
      old: 'unprecedented',
      new: 'major'
    }
  ],
  'arts-science': [
    {
      path: ['modelEssay', 'structure', 'body1'],
      old: 'enable',
      new: 'allow'
    },
    {
      path: ['modelEssay', 'structure', 'body2'],
      old: 'enable',
      new: 'allow'
    }
  ],
  // Add more as needed
};

// Simple approach: read file, do string replacements, write back
const simpleTopics = [
  { id: 'adult-illiteracy', search: 'Governments can enable illiterate', replace: 'Governments can help illiterate' },
  { id: 'artificial-intelligence', search: 'unprecedented technological transformation', replace: 'major technological transformation' },
  { id: 'communication-technology', search: 'enabled unprecedented global connectivity', replace: 'created massive global connectivity' },
  { id: 'extraterrestrial-life', search: 'unprecedented event', replace: 'historic event' },
  { id: 'internet-most-important', search: 'unprecedented access', replace: 'unmatched access' },
  { id: 'natural-resource-consumption', search: 'unprecedented levels', replace: 'extremely high levels' },
];

console.log('Applying naturalness fixes to multiple topics...\n');

simpleTopics.forEach(({ id, search, replace }) => {
  const filePath = path.join(dataDir, `writing-v2-${id}.json`);

  try {
    let content = fs.readFileSync(filePath, 'utf8');
    const originalContent = content;

    content = content.replace(search, replace);

    if (content !== originalContent) {
      fs.writeFileSync(filePath, content);
      console.log(`✓ ${id}: Fixed "${search}" → "${replace}"`);
    } else {
      console.log(`⚠ ${id}: Pattern not found: "${search}"`);
    }
  } catch (error) {
    console.error(`✗ ${id}: Error - ${error.message}`);
  }
});

console.log('\nBatch fixes complete!');
