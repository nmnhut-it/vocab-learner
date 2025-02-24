const fs = require('fs').promises;

// Get command line arguments
const inputFile = process.argv[2];
const outputFile = process.argv[3];

if (!inputFile || !outputFile) {
    console.error('Usage: node script.js <input-file> <output-file>');
    process.exit(1);
}

// Function to determine correct preposition and mark answers
const processFile = async () => {
    try {
        // Read input file
        const content = await fs.readFile(inputFile, 'utf8');

        // Function to determine correct preposition based on the phrase
        const getCorrectAnswer = (phrase) => {
            if (!phrase) return null;

            // Specific times (at)
            if (/\d{1,2}(?::\d{2})?\s*(?:AM|PM|o'clock)|noon|midnight|dawn|sunset/.test(phrase)) {
                return 'at';
            }

            // Parts of day with "the" (in)
            if (/the\s+(?:morning|afternoon|evening)/.test(phrase)) {
                return 'in';
            }

            // Night (at)
            if (/\bnight\b/.test(phrase)) {
                return 'at';
            }

            // Weekends/Weekdays (on)
            if (/(?:the\s+)?weekend|weekends|weekday|weekdays/.test(phrase)) {
                return 'on';
            }

            // Days of week (on)
            if (/(?:Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday)/.test(phrase)) {
                return 'on';
            }

            // Dates (on)
            if (/(?:January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2}(?:st|nd|rd|th)/.test(phrase)) {
                return 'on';
            }

            // Months alone (in)
            if (/^(?:January|February|March|April|May|June|July|August|September|October|November|December)$/.test(phrase)) {
                return 'in';
            }

            // Seasons (in)
            if (/^(?:summer|winter|autumn|spring)$/.test(phrase)) {
                return 'in';
            }

            // Years (in)
            if (/^\d{4}$/.test(phrase)) {
                return 'in';
            }

            // Holidays (on)
            if (/(?:Christmas Day|Halloween|Independence Day|New Year's Eve|Tet holiday)/.test(phrase)) {
                return 'on';
            }

            return null;
        };

        // Process each question
        const questions = content.split('\n## Question');
        const processedQuestions = questions.map(question => {
            let currentPhrase = '';
            let correctPrep = null;

            const lines = question.split('\n');
            const processedLines = lines.map((line, index) => {
                // Get the phrase from the question
                if (line.startsWith('Fill in the blank:')) {
                    const match = line.match(/______ (.*?)\./);
                    if (match) {
                        currentPhrase = match[1];
                        correctPrep = getCorrectAnswer(currentPhrase);
                    }
                    return line;
                }

                // Process answer lines
                if (line.startsWith('A.')) {
                    return `A. ${correctPrep === 'in' ? '[x] ' : ''}in`;
                }
                if (line.startsWith('B.')) {
                    const isWeekend = currentPhrase.includes('weekend') ||
                        currentPhrase.includes('weekends') ||
                        currentPhrase.includes('weekday') ||
                        currentPhrase.includes('weekdays');
                    return `B. ${correctPrep === (isWeekend ? 'of' : 'at') ? '[x] ' : ''}${isWeekend ? 'of' : 'at'}`;
                }
                if (line.startsWith('C.')) {
                    return `C. ${correctPrep === 'on' ? '[x] ' : ''}on`;
                }
                if (line.startsWith('D.')) {
                    return 'D. for';
                }

                return line;
            });

            return processedLines.join('\n');
        });

        // Combine all questions back together
        let output = processedQuestions[0];  // First question (includes '## Question 1')
        if (processedQuestions.length > 1) {
            output += processedQuestions.slice(1).map(q => '\n## Question' + q).join('');
        }

        // Write to output file
        await fs.writeFile(outputFile, output);

        // Output verification statistics
        const weekendCount = (output.match(/weekend|weekends|weekday|weekdays/g) || []).length;
        const xMarkerCount = (output.match(/\[x\]/g) || []).length;
        console.log(`\nProcessing complete:
- Input file: ${inputFile}
- Output file: ${outputFile}
- Total questions: ${questions.length}
- Weekend/weekday questions: ${weekendCount}
- Answer markers added: ${xMarkerCount}`);

    } catch (error) {
        console.error('Error processing file:', error);
        process.exit(1);
    }
};

// Run the processor
processFile();