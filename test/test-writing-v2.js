/**
 * Puppeteer test for IELTS Writing V2 app
 * Tests that all topics load correctly without JS errors
 */

import puppeteer from 'puppeteer';
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 8765;
const BASE_URL = `http://localhost:${PORT}`;

// Simple static file server
function createServer() {
    const rootDir = path.join(__dirname, '..');

    return http.createServer((req, res) => {
        // Parse URL and remove query strings
        let urlPath = req.url.split('?')[0];
        if (urlPath === '/') urlPath = '/ielts-writing-v2.html';

        let filePath = path.join(rootDir, urlPath);

        const ext = path.extname(filePath);
        const contentTypes = {
            '.html': 'text/html',
            '.js': 'text/javascript',
            '.css': 'text/css',
            '.json': 'application/json',
            '.png': 'image/png',
            '.jpg': 'image/jpeg',
        };

        fs.readFile(filePath, (err, content) => {
            if (err) {
                console.log(`  [server] 404: ${filePath}`);
                res.writeHead(404);
                res.end(`File not found: ${urlPath}`);
                return;
            }
            res.writeHead(200, { 'Content-Type': contentTypes[ext] || 'text/plain' });
            res.end(content);
        });
    });
}

async function runTests() {
    const server = createServer();
    await new Promise(resolve => server.listen(PORT, resolve));
    console.log(`Server running on ${BASE_URL}`);

    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const results = {
        passed: 0,
        failed: 0,
        errors: []
    };

    try {
        const page = await browser.newPage();

        // Collect console messages
        const consoleErrors = [];
        page.on('console', msg => {
            const type = msg.type();
            const text = msg.text();
            if (type === 'error') {
                consoleErrors.push(text);
            }
            // Log all console messages for debugging
            console.log(`  [${type}] ${text}`);
        });

        page.on('pageerror', err => {
            consoleErrors.push(err.message);
            console.log(`  [pageerror] ${err.message}`);
        });

        // Test 1: Load main page
        console.log('\n--- Test 1: Load main page ---');

        // Set up fake session in localStorage before page load
        await page.evaluateOnNewDocument(() => {
            // Create fake session so login modal doesn't appear
            const fakeSession = {
                name: 'Test Student',
                photoDataUrl: null,
                sessionStartTime: Date.now(),
                sessionId: 'test-session-123'
            };
            localStorage.setItem('module2_student_session', JSON.stringify(fakeSession));
        });

        const response = await page.goto(`${BASE_URL}/ielts-writing-v2.html`, { waitUntil: 'networkidle0' });
        console.log(`  Page status: ${response.status()}`);

        // Check if select exists first
        const selectExists = await page.evaluate(() => !!document.getElementById('topicSelector'));
        console.log(`  Topic selector exists: ${selectExists}`);

        // Check current options count
        const initialOptions = await page.evaluate(() => {
            const sel = document.getElementById('topicSelector');
            return sel ? sel.options.length : 0;
        });
        console.log(`  Initial options count: ${initialOptions}`);

        // Check if topics array exists
        const topicsCheck = await page.evaluate(() => {
            return {
                topicsExists: typeof topics !== 'undefined',
                topicsLength: typeof topics !== 'undefined' ? topics.length : 'N/A',
                loadTopicsExists: typeof loadTopics === 'function'
            };
        });
        console.log(`  Topics var exists: ${topicsCheck.topicsExists}, length: ${topicsCheck.topicsLength}`);
        console.log(`  loadTopics function exists: ${topicsCheck.loadTopicsExists}`);

        // Try to manually load topics and capture errors
        console.log('  Manually calling loadTopics...');
        const loadResult = await page.evaluate(async () => {
            try {
                const response = await fetch('data/writing-v2-topics.json');
                const text = await response.text();
                return { status: response.status, ok: response.ok, textLength: text.length, first100: text.substring(0, 100) };
            } catch (e) {
                return { error: e.message };
            }
        });
        console.log(`  Fetch result:`, JSON.stringify(loadResult));

        // Wait for topics to load with longer timeout
        try {
            await page.waitForFunction(() => {
                const select = document.getElementById('topicSelector');
                return select && select.options.length > 1;
            }, { timeout: 15000 });
        } catch (e) {
            // Get more debug info
            const debugInfo = await page.evaluate(() => {
                return {
                    topicsLength: typeof topics !== 'undefined' ? topics.length : 'undefined',
                    optionsCount: document.getElementById('topicSelector')?.options.length || 0,
                    bodyContent: document.body.innerHTML.substring(0, 500)
                };
            });
            console.log(`  Debug: topics=${debugInfo.topicsLength}, options=${debugInfo.optionsCount}`);
            throw e;
        }

        const topicCount = await page.evaluate(() => {
            return document.getElementById('topicSelector').options.length - 1; // minus "Select a topic..."
        });
        console.log(`✓ Loaded ${topicCount} topics`);
        results.passed++;

        // Get all topic IDs
        const topicIds = await page.evaluate(() => {
            const select = document.getElementById('topicSelector');
            return Array.from(select.options)
                .filter(opt => opt.value)
                .map(opt => opt.value);
        });

        // Test 2: Load topics and navigate through ALL steps
        console.log('\n--- Test 2: Load topics and navigate through all steps ---');

        const stepNames = ['Analysis', 'Vocabulary', 'Exercises', 'Templates', 'Paragraphs', 'Essay'];

        for (const topicId of topicIds) {
            consoleErrors.length = 0; // Clear errors for each topic

            try {
                // Select topic
                await page.select('#topicSelector', topicId);
                await new Promise(r => setTimeout(r, 300));

                const topicTitle = await page.evaluate(() => currentTopic?.title || 'Unknown');
                let topicPassed = true;
                let stepErrors = [];

                // Navigate through all 6 steps
                for (let step = 1; step <= 6; step++) {
                    consoleErrors.length = 0;

                    await page.evaluate((s) => {
                        if (typeof navigateToStep === 'function') {
                            navigateToStep(s);
                        }
                    }, step);
                    await new Promise(r => setTimeout(r, 300));

                    // Check for JS errors after navigation
                    if (consoleErrors.length > 0) {
                        topicPassed = false;
                        stepErrors.push(`Step ${step} (${stepNames[step-1]}): ${consoleErrors.join(', ')}`);
                    }

                    // Verify content rendered
                    const hasContent = await page.evaluate(() => {
                        const container = document.getElementById('mainContainer');
                        return container && container.innerHTML.includes('step-header');
                    });

                    if (!hasContent) {
                        topicPassed = false;
                        stepErrors.push(`Step ${step} (${stepNames[step-1]}): No content rendered`);
                    }
                }

                if (topicPassed) {
                    console.log(`✓ Topic "${topicId}" - All 6 steps OK (Analysis→Vocab→Exercises→Templates→Paragraphs→Essay)`);
                    results.passed++;
                } else {
                    console.log(`✗ Topic "${topicId}" - Errors:`);
                    stepErrors.forEach(err => console.log(`    ${err}`));
                    results.failed++;
                    results.errors.push({ topic: topicId, errors: stepErrors });
                }
            } catch (err) {
                console.log(`✗ Topic "${topicId}" - Error: ${err.message}`);
                results.failed++;
                results.errors.push({ topic: topicId, errors: [err.message] });
            }
        }

        // Test 3: Verify JSON files are valid
        console.log('\n--- Test 3: Validate JSON files ---');
        const jsonFiles = fs.readdirSync(path.join(__dirname, '..', 'data'))
            .filter(f => f.startsWith('writing-v2-') && f.endsWith('.json') && f !== 'writing-v2-topics.json');

        for (const file of jsonFiles) {
            try {
                const content = fs.readFileSync(path.join(__dirname, '..', 'data', file), 'utf8');
                JSON.parse(content);
                console.log(`✓ ${file} - Valid JSON`);
                results.passed++;
            } catch (err) {
                console.log(`✗ ${file} - Invalid JSON: ${err.message}`);
                results.failed++;
                results.errors.push({ file, errors: [err.message] });
            }
        }

    } catch (err) {
        console.error('Test suite error:', err);
        results.failed++;
        results.errors.push({ test: 'suite', errors: [err.message] });
    } finally {
        await browser.close();
        server.close();
    }

    // Summary
    console.log('\n========== TEST SUMMARY ==========');
    console.log(`Passed: ${results.passed}`);
    console.log(`Failed: ${results.failed}`);

    if (results.errors.length > 0) {
        console.log('\nErrors:');
        results.errors.forEach(e => {
            console.log(`  - ${e.topic || e.file || e.test}: ${e.errors.join(', ')}`);
        });
    }

    process.exit(results.failed > 0 ? 1 : 0);
}

runTests().catch(console.error);
