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
    return http.createServer((req, res) => {
        let filePath = path.join(__dirname, '..', req.url === '/' ? 'ielts-writing-v2.html' : req.url);

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
                res.writeHead(404);
                res.end(`File not found: ${filePath}`);
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
        const response = await page.goto(`${BASE_URL}/ielts-writing-v2.html`, { waitUntil: 'networkidle0' });
        console.log(`  Page status: ${response.status()}`);

        // Check if select exists first
        const selectExists = await page.evaluate(() => !!document.getElementById('topicSelector'));
        console.log(`  Topic selector exists: ${selectExists}`);

        // Wait for topics to load with longer timeout
        await page.waitForFunction(() => {
            const select = document.getElementById('topicSelector');
            return select && select.options.length > 1;
        }, { timeout: 30000 });

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

        // Test 2: Load each topic and navigate to step 3
        console.log('\n--- Test 2: Load topics and test Step 3 (Exercises) ---');

        for (const topicId of topicIds) {
            consoleErrors.length = 0; // Clear errors for each topic

            try {
                // Select topic
                await page.select('#topicSelector', topicId);
                await new Promise(r => setTimeout(r, 500));

                // Navigate to step 3
                await page.evaluate(() => {
                    if (typeof navigateToStep === 'function') {
                        navigateToStep(3);
                    }
                });
                await new Promise(r => setTimeout(r, 500));

                // Check for errors
                if (consoleErrors.length > 0) {
                    console.log(`✗ Topic "${topicId}" - JS errors:`);
                    consoleErrors.forEach(err => console.log(`    ${err}`));
                    results.failed++;
                    results.errors.push({ topic: topicId, errors: [...consoleErrors] });
                } else {
                    // Verify step 3 content rendered
                    const hasContent = await page.evaluate(() => {
                        const container = document.getElementById('mainContainer');
                        return container && container.innerHTML.includes('step-header');
                    });

                    if (hasContent) {
                        console.log(`✓ Topic "${topicId}" - Step 3 loaded successfully`);
                        results.passed++;
                    } else {
                        console.log(`✗ Topic "${topicId}" - Step 3 content not rendered`);
                        results.failed++;
                    }
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
