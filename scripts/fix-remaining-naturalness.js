import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataDir = path.join(__dirname, '..', 'data');

const topics = [
  'international-cooperation',
  'online-shopping-retail',
  'paternity-leave',
  'prison-alternatives',
  'smartphone-children',
  'tech-face-communication',
  'technology-education',
  'traditional-education',
  'adult-illiteracy',
  'celebrities-fame-achievement',
  'children-free-time',
  'food-self-sufficiency',
  'success-and-luck'
];

console.log('Fixing remaining naturalness issues...\n');

topics.forEach(id => {
  const filePath = path.join(dataDir, `writing-v2-${id}.json`);

  try {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    let changed = false;

    // Fix in model essay sections
    ['introduction', 'body1', 'body2', 'conclusion'].forEach(section => {
      if (data.modelEssay?.structure?.[section]) {
        const orig = data.modelEssay.structure[section];
        let text = orig;

        // Replace enable/facilitate with more natural words
        text = text.replace(/\bfacilitate\b/gi, 'support');
        text = text.replace(/\bfacilitates\b/gi, 'supports');
        text = text.replace(/\bfacilitated\b/gi, 'supported');
        text = text.replace(/\benable\b/gi, 'allow');
        text = text.replace(/\benables\b/gi, 'allows');
        text = text.replace(/\benabled\b/gi, 'allowed');

        // Fix contribute meaningfully
        text = text.replace(/contribute meaningfully to/gi, 'help protect');
        text = text.replace(/contribute meaningfully/gi, 'help');

        if (text !== orig) {
          data.modelEssay.structure[section] = text;
          changed = true;
        }
      }
    });

    // Fix in vocabulary examples
    const vocabStep = data.steps?.find(s => s.type === 'vocabulary');
    if (vocabStep?.content?.academicVocabulary) {
      vocabStep.content.academicVocabulary.forEach(vocab => {
        if (vocab.example) {
          const orig = vocab.example;
          let text = orig;

          text = text.replace(/\bfacilitate\b/gi, 'support');
          text = text.replace(/\bfacilitates\b/gi, 'supports');
          text = text.replace(/\benable\b/gi, 'allow');
          text = text.replace(/\benables\b/gi, 'allows');

          if (text !== orig) {
            vocab.example = text;
            changed = true;
          }
        }
      });
    }

    if (changed) {
      // Rebuild full essay text
      data.modelEssay.text = [
        data.modelEssay.structure.introduction,
        data.modelEssay.structure.body1,
        data.modelEssay.structure.body2,
        data.modelEssay.structure.conclusion
      ].join('\n\n');

      fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
      console.log(`✓ ${id}`);
    } else {
      console.log(`  ${id} - no changes needed`);
    }
  } catch (error) {
    console.error(`✗ ${id}: ${error.message}`);
  }
});

console.log('\nDone!');
