#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataDir = path.join(__dirname, '..', 'data');
const files = fs.readdirSync(dataDir).filter(f => f.startsWith('writing-v2-') && f.endsWith('.json') && f !== 'writing-v2-topics.json');

const issues = {
  oldStep3Format: [],
  missingVietnameseTranslations: [],
  validFiles: []
};

console.log('🔍 Validating IELTS Writing Task 2 exercises...\n');

files.forEach(filename => {
  const filepath = path.join(dataDir, filename);
  const content = JSON.parse(fs.readFileSync(filepath, 'utf8'));
  const id = content.id;
  let hasIssues = false;

  // Check Step 3 format
  const step3 = content.steps.find(s => s.stepNumber === 3);
  if (step3) {
    const hasOldFormat = step3.content.buildFromClues || step3.content.sentenceUnscramble || step3.content.fillInTheBlanks;
    const hasNewFormat = step3.content.exerciseSections;

    if (hasOldFormat && !hasNewFormat) {
      issues.oldStep3Format.push({
        file: filename,
        id: id,
        title: content.title
      });
      hasIssues = true;
    }
  }

  // Check Vietnamese translations in vocabulary
  const step2 = content.steps.find(s => s.stepNumber === 2);
  if (step2 && step2.content) {
    const missingTranslations = [];

    // Check academic vocabulary
    if (step2.content.academicVocabulary) {
      step2.content.academicVocabulary.forEach((vocab, idx) => {
        if (!vocab.vietnameseDefinition || !vocab.vietnameseExample) {
          missingTranslations.push(`Academic vocab [${idx}]: "${vocab.word}"`);
        }
      });
    }

    // Check topic vocabulary
    if (step2.content.topicVocabulary) {
      step2.content.topicVocabulary.forEach((vocab, idx) => {
        if (!vocab.vietnameseDefinition || !vocab.vietnameseExample) {
          missingTranslations.push(`Topic vocab [${idx}]: "${vocab.phrase}"`);
        }
      });
    }

    if (missingTranslations.length > 0) {
      issues.missingVietnameseTranslations.push({
        file: filename,
        id: id,
        title: content.title,
        missing: missingTranslations
      });
      hasIssues = true;
    }
  }

  if (!hasIssues) {
    issues.validFiles.push({
      file: filename,
      id: id,
      title: content.title
    });
  }
});

// Report results
console.log('📊 VALIDATION RESULTS\n');
console.log('='.repeat(80));

if (issues.oldStep3Format.length > 0) {
  console.log('\n❌ FILES WITH OLD STEP 3 FORMAT (need exerciseSections):');
  console.log('-'.repeat(80));
  issues.oldStep3Format.forEach(item => {
    console.log(`  • ${item.file}`);
    console.log(`    ID: ${item.id}`);
    console.log(`    Title: ${item.title}`);
    console.log('');
  });
  console.log(`  Total: ${issues.oldStep3Format.length} files\n`);
}

if (issues.missingVietnameseTranslations.length > 0) {
  console.log('\n❌ FILES WITH MISSING VIETNAMESE TRANSLATIONS:');
  console.log('-'.repeat(80));
  issues.missingVietnameseTranslations.forEach(item => {
    console.log(`  • ${item.file}`);
    console.log(`    ID: ${item.id}`);
    console.log(`    Title: ${item.title}`);
    console.log(`    Missing translations:`);
    item.missing.forEach(m => console.log(`      - ${m}`));
    console.log('');
  });
  console.log(`  Total: ${issues.missingVietnameseTranslations.length} files\n`);
}

if (issues.validFiles.length > 0) {
  console.log('\n✅ VALID FILES (correct format):');
  console.log('-'.repeat(80));
  issues.validFiles.forEach(item => {
    console.log(`  • ${item.file} - ${item.title}`);
  });
  console.log(`\n  Total: ${issues.validFiles.length} files\n`);
}

console.log('='.repeat(80));
console.log('\n📈 SUMMARY:');
console.log(`  Total files checked: ${files.length}`);
console.log(`  ✅ Valid: ${issues.validFiles.length}`);
console.log(`  ❌ Need Step 3 update: ${issues.oldStep3Format.length}`);
console.log(`  ❌ Missing translations: ${issues.missingVietnameseTranslations.length}`);

const totalIssues = issues.oldStep3Format.length + issues.missingVietnameseTranslations.length;
if (totalIssues > 0) {
  console.log(`\n⚠️  ${totalIssues} file(s) need updates`);
  process.exit(1);
} else {
  console.log('\n🎉 All files are valid!');
  process.exit(0);
}
