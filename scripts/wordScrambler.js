// Enhanced word scrambling functions for VocabHoot
// Save this as 'wordScrambler.js' and include it in vocabhoot.html

/**
 * Intelligently scrambles a word while preserving consonant-vowel patterns
 * @param {string} word - The word to scramble
 * @return {string} - A scrambled version of the word
 */
function smartScrambleWord(word) {
    if (word.length <= 3) return word;

    // Handle multi-word phrases
    if (word.includes(' ')) {
        return word.split(' ')
            .map(w => smartScrambleWord(w))
            .join(' ');
    }

    // Handle hyphenated words
    if (word.includes('-')) {
        return word.split('-')
            .map(w => smartScrambleWord(w))
            .join('-');
    }

    // Keep first and last letters
    const firstLetter = word.charAt(0);
    const lastLetter = word.charAt(word.length - 1);

    // Get middle section
    let middle = word.substring(1, word.length - 1);

    // Identify vowels and consonants in the middle section
    const vowels = 'aeiou';
    const middleVowels = [];
    const middleConsonants = [];

    for (let i = 0; i < middle.length; i++) {
        const char = middle[i].toLowerCase();
        if (vowels.includes(char)) {
            middleVowels.push({ char, index: i, isUpper: middle[i] !== char });
        } else if (/[a-z]/i.test(char)) {
            middleConsonants.push({ char, index: i, isUpper: middle[i] !== char });
        }
    }

    // Create a new scrambled middle while maintaining vowel and consonant positions
    const middleArray = middle.split('');

    // Scramble vowels among vowel positions
    for (let i = middleVowels.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const tempChar = middleVowels[i].char;
        const tempIsUpper = middleVowels[i].isUpper;

        middleVowels[i].char = middleVowels[j].char;
        middleVowels[i].isUpper = middleVowels[j].isUpper;

        middleVowels[j].char = tempChar;
        middleVowels[j].isUpper = tempIsUpper;
    }

    // Scramble consonants among consonant positions
    for (let i = middleConsonants.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const tempChar = middleConsonants[i].char;
        const tempIsUpper = middleConsonants[i].isUpper;

        middleConsonants[i].char = middleConsonants[j].char;
        middleConsonants[i].isUpper = middleConsonants[j].isUpper;

        middleConsonants[j].char = tempChar;
        middleConsonants[j].isUpper = tempIsUpper;
    }

    // Reassemble the middle section
    for (const vowel of middleVowels) {
        middleArray[vowel.index] = vowel.isUpper ? vowel.char.toUpperCase() : vowel.char;
    }

    for (const consonant of middleConsonants) {
        middleArray[consonant.index] = consonant.isUpper ? consonant.char.toUpperCase() : consonant.char;
    }

    // Make sure it's different from original
    const scrambledMiddle = middleArray.join('');
    if (scrambledMiddle === middle && middle.length > 1) {
        // Swap two adjacent characters
        const i = Math.floor(Math.random() * (middleArray.length - 1));
        [middleArray[i], middleArray[i + 1]] = [middleArray[i + 1], middleArray[i]];
    }

    return firstLetter + middleArray.join('') + lastLetter;
}

/**
 * Generates multiple intelligent scramble options for a word
 * @param {string} word - The original word
 * @param {number} count - Number of scrambled options to generate
 * @return {string[]} - Array of scrambled options
 */
function generateScrambleOptions(word, count = 4) {
    const options = [];

    // Generate multiple different scrambles
    for (let i = 0; i < count; i++) {
        let attempt = smartScrambleWord(word);
        let attempts = 0;

        // Ensure we don't have duplicates (try up to 10 times)
        while (options.includes(attempt) && attempts < 10) {
            attempt = smartScrambleWord(word);
            attempts++;
        }

        if (!options.includes(attempt)) {
            options.push(attempt);
        }
    }

    // If we couldn't generate enough unique scrambles, add some deliberately modified versions
    while (options.length < count) {
        // Create a deliberately altered version (swap a vowel, add/remove a letter, etc.)
        let modified = modifyWord(word, options);
        if (!options.includes(modified)) {
            options.push(modified);
        }
    }

    return options;
}

/**
 * Creates a deliberately modified version of a word
 * @param {string} word - The original word
 * @param {string[]} existing - Existing options to avoid
 * @return {string} - A modified version of the word
 */
function modifyWord(word, existing) {
    const modifications = [
        // Swap two vowels
        (w) => {
            const vowels = 'aeiou';
            const result = w.split('');
            const vowelPositions = [];

            for (let i = 0; i < result.length; i++) {
                if (vowels.includes(result[i].toLowerCase())) {
                    vowelPositions.push(i);
                }
            }

            if (vowelPositions.length >= 2) {
                const pos1 = vowelPositions[Math.floor(Math.random() * vowelPositions.length)];
                const pos2 = vowelPositions[Math.floor(Math.random() * vowelPositions.length)];
                [result[pos1], result[pos2]] = [result[pos2], result[pos1]];
            }

            return result.join('');
        },

        // Replace one vowel with another
        (w) => {
            const vowels = 'aeiou';
            const result = w.split('');
            const vowelPositions = [];

            for (let i = 0; i < result.length; i++) {
                if (vowels.includes(result[i].toLowerCase())) {
                    vowelPositions.push(i);
                }
            }

            if (vowelPositions.length > 0) {
                const pos = vowelPositions[Math.floor(Math.random() * vowelPositions.length)];
                const currentVowel = result[pos].toLowerCase();
                const otherVowels = vowels.replace(currentVowel, '').split('');
                result[pos] = otherVowels[Math.floor(Math.random() * otherVowels.length)];
            }

            return result.join('');
        },

        // Duplicate a letter
        (w) => {
            const result = w.split('');
            if (w.length > 3) {
                const pos = 1 + Math.floor(Math.random() * (w.length - 2));
                result.splice(pos, 0, result[pos]);
            }
            return result.join('');
        },

        // Remove a letter
        (w) => {
            if (w.length > 4) {
                const pos = 1 + Math.floor(Math.random() * (w.length - 2));
                return w.slice(0, pos) + w.slice(pos + 1);
            }
            return w;
        }
    ];

    // Try each modification until we find one that's not in existing options
    for (const modify of modifications) {
        const modified = modify(word);
        if (!existing.includes(modified)) {
            return modified;
        }
    }

    // Fallback - reverse the middle
    const firstChar = word.charAt(0);
    const lastChar = word.charAt(word.length - 1);
    const middle = word.substring(1, word.length - 1);
    return firstChar + middle.split('').reverse().join('') + lastChar;
}