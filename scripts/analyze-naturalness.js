/**
 * Analyze all topics for unnatural language patterns
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataDir = path.join(__dirname, '..', 'data');

// Patterns that indicate unnatural/overly formal language
const unnaturalPatterns = [
    { pattern: /\b(unprecedented|facilitate|enable)\b/gi, type: 'overly formal verbs' },
    { pattern: /\bone of the most \w+ (challenges|issues|problems) facing (humanity|society)\b/gi, type: 'textbook opening' },
    { pattern: /\b(conscious|deliberate|intentional) (daily )?consumption choices\b/gi, type: 'awkward collocation' },
    { pattern: /\b(bear|shoulder) (primary )?(responsibility|burden)\b/gi, type: 'stiff phrasing' },
    { pattern: /\bachieve (large-scale|significant) (environmental )?impact\b/gi, type: 'awkward collocation' },
    { pattern: /\bcontribute meaningfully to\b/gi, type: 'stiff phrasing' },
    { pattern: /\bin the twenty-first century\b/gi, type: 'overly formal' },
    { pattern: /\bamong diverse communities( and cultures)?\b/gi, type: 'unnecessarily complex' },
    { pattern: /\bregardless of geographical (barriers|limitations)\b/gi, type: 'unnecessarily complex' },
    { pattern: /\bon a scale \w+ cannot match\b/gi, type: 'awkward construction' },
    { pattern: /\bthrough (comprehensive|strict|rigorous) (policy|regulation|measures)\b/gi, type: 'overly formal' },
    { pattern: /\bdecrease overall (environmental )?degradation\b/gi, type: 'awkward phrasing' }
];

// Get all writing-v2 JSON files
const jsonFiles = fs.readdirSync(dataDir)
    .filter(f => f.startsWith('writing-v2-') && f.endsWith('.json') && f !== 'writing-v2-topics.json')
    .sort();

console.log(`Analyzing ${jsonFiles.length} topic files for unnatural language...\n`);
console.log('='.repeat(80));

let totalIssues = 0;
const issuesByType = {};
const fileIssues = [];

for (const file of jsonFiles) {
    const filePath = path.join(dataDir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(content);

    const topicId = data.id || file.replace('writing-v2-', '').replace('.json', '');
    const issues = [];

    // Check buildFromClues model answers
    const exerciseStep = data.steps?.find(s => s.type === 'exercises');
    if (exerciseStep?.content?.buildFromClues) {
        exerciseStep.content.buildFromClues.forEach((ex, idx) => {
            if (ex.modelAnswer) {
                unnaturalPatterns.forEach(({ pattern, type }) => {
                    const matches = ex.modelAnswer.match(pattern);
                    if (matches) {
                        issues.push({
                            location: `Exercise ${idx + 1}`,
                            text: ex.modelAnswer.substring(0, 100),
                            issue: type,
                            match: matches[0]
                        });
                        issuesByType[type] = (issuesByType[type] || 0) + 1;
                        totalIssues++;
                    }
                });
            }
        });
    }

    // Check model essay sections
    if (data.modelEssay?.structure) {
        ['introduction', 'body1', 'body2', 'conclusion'].forEach(section => {
            const text = data.modelEssay.structure[section];
            if (text) {
                unnaturalPatterns.forEach(({ pattern, type }) => {
                    const matches = text.match(pattern);
                    if (matches) {
                        issues.push({
                            location: section,
                            text: text.substring(0, 120),
                            issue: type,
                            match: matches[0]
                        });
                        issuesByType[type] = (issuesByType[type] || 0) + 1;
                        totalIssues++;
                    }
                });
            }
        });
    }

    // Check vocabulary examples
    const vocabStep = data.steps?.find(s => s.type === 'vocabulary');
    if (vocabStep?.content?.academicVocabulary) {
        vocabStep.content.academicVocabulary.forEach((vocab, idx) => {
            if (vocab.example) {
                unnaturalPatterns.forEach(({ pattern, type }) => {
                    const matches = vocab.example.match(pattern);
                    if (matches) {
                        issues.push({
                            location: `Vocab example (${vocab.word})`,
                            text: vocab.example.substring(0, 100),
                            issue: type,
                            match: matches[0]
                        });
                        issuesByType[type] = (issuesByType[type] || 0) + 1;
                        totalIssues++;
                    }
                });
            }
        });
    }

    if (issues.length > 0) {
        fileIssues.push({ topicId, issues });
        console.log(`\n${topicId}: ${issues.length} issues`);
        issues.slice(0, 3).forEach(issue => {
            console.log(`  [${issue.location}] ${issue.issue}: "${issue.match}"`);
            console.log(`    → ${issue.text}...`);
        });
        if (issues.length > 3) {
            console.log(`  ... and ${issues.length - 3} more`);
        }
    }
}

console.log('\n' + '='.repeat(80));
console.log('SUMMARY');
console.log('='.repeat(80));
console.log(`Total files analyzed: ${jsonFiles.length}`);
console.log(`Files with issues: ${fileIssues.length}`);
console.log(`Total issues found: ${totalIssues}\n`);

console.log('Issues by type:');
Object.entries(issuesByType)
    .sort((a, b) => b[1] - a[1])
    .forEach(([type, count]) => {
        console.log(`  ${type}: ${count}`);
    });

console.log('\n' + '='.repeat(80));
