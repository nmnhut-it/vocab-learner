/**
 * Enhanced word scrambling system with length preservation
 */

/**
 * Scrambles a word while maintaining exact length and using only the original letters
 * @param {string} word - The word to scramble
 * @return {string} - Scrambled version with the same length and characters
 */
function lengthPreservingScramble(word) {
    if (word.length <= 3) return word;

    // Handle multi-word phrases
    if (word.includes(' ')) {
        return word.split(' ')
            .map(w => lengthPreservingScramble(w))
            .join(' ');
    }

    // Handle hyphenated words
    if (word.includes('-')) {
        return word.split('-')
            .map(w => lengthPreservingScramble(w))
            .join('-');
    }

    // Keep first and last letters intact
    const firstLetter = word.charAt(0);
    const lastLetter = word.charAt(word.length - 1);

    // Get middle section for scrambling
    let middle = word.substring(1, word.length - 1);

    // For very short words, return the original
    if (middle.length <= 1) {
        return word;
    }

    // Convert middle to array for shuffling
    const middleArray = middle.split('');

    // Shuffle middle letters (Fisher-Yates algorithm)
    for (let i = middleArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [middleArray[i], middleArray[j]] = [middleArray[j], middleArray[i]];
    }

    // Check if we actually shuffled anything
    const shuffledMiddle = middleArray.join('');
    if (shuffledMiddle === middle) {
        // Force a change by swapping two adjacent characters
        const i = Math.floor(Math.random() * (middleArray.length - 1));
        [middleArray[i], middleArray[i + 1]] = [middleArray[i + 1], middleArray[i]];
    }

    // Reconstruct word with first and last letters intact
    return firstLetter + middleArray.join('') + lastLetter;
}

/**
 * Generates multiple length-preserving scramble options for a word
 * @param {string} originalWord - The word to scramble
 * @param {number} count - Number of options to generate
 * @return {string[]} - Array of scrambled options
 */
function generateScrambleOptions(originalWord, count = 4) {
    const options = [];
    let attempts = 0;
    const maxAttempts = count * 10; // Prevent infinite loops
    // If we couldn't generate enough unique scrambles, create manual variations
    while (options.length < count && options.length < maxAttempts) {
        // Create a manual variation by swapping characters
        const chars = originalWord.split('');
        const pos1 = Math.floor(Math.random() * chars.length);
        let pos2 = Math.floor(Math.random() * chars.length);

        // Make sure pos2 is different from pos1
        if (pos1 === pos2 && chars.length > 1) {
            pos2 = (pos2 + 1) % chars.length;
        }

        // Swap characters
        [chars[pos1], chars[pos2]] = [chars[pos2], chars[pos1]];
        const manualScramble = chars.join('');

        if (manualScramble !== originalWord && !options.includes(manualScramble)) {
            options.push(manualScramble);
        } else {
            // Break the loop if we've tried too many times
            break;
        }
    }

    // Fill any remaining slots with simple modifications if needed
    while (options.length < count) {
        // Fallback option - add a simple suffix or change a character
        const suffix = options.length % 2 === 0 ? 's' : 'ed';
        options.push(originalWord + suffix);
    }

    return options;
}

/**
 * Checks if a variant uses only letters from the original word and has the same length
 * @param {string} original - Original word
 * @param {string} variant - Variant to check
 * @return {boolean} - True if variant uses only original letters and has same length
 */
function usesOnlyOriginalLetters(original, variant) {
    // First check length
    if (original.length !== variant.length) {
        return false;
    }

    // Convert to lowercase for comparison
    const originalLower = original.toLowerCase();
    const variantLower = variant.toLowerCase();

    // Count letter frequencies in original word
    const letterCount = {};
    for (const char of originalLower) {
        letterCount[char] = (letterCount[char] || 0) + 1;
    }

    // Check if variant uses exactly the same letters
    for (const char of variantLower) {
        if (!letterCount[char]) {
            // Found a character not in original word
            return false;
        }
        letterCount[char]--;
        if (letterCount[char] < 0) {
            // Used more instances of a letter than available
            return false;
        }
    }

    // All checks passed
    return true;
}
/**
 * Calculate similarity score between two words
 * @param {string} word1 - First word
 * @param {string} word2 - Second word
 * @return {number} - Similarity score (0-1)
 */
function calculateSimilarity(word1, word2) {
    // For words of different lengths, return 0
    if (word1.length !== word2.length) {
        return 0;
    }

    // Count matching characters in same position
    let matches = 0;
    for (let i = 0; i < word1.length; i++) {
        if (word1[i].toLowerCase() === word2[i].toLowerCase()) {
            matches++;
        }
    }

    // Calculate similarity as percentage of matches
    return matches / word1.length;
}
/**
 * Fixed version of generateFilteredGameOptions with strict loop limits
 * @param {string} originalWord - The original word
 * @param {number} count - Number of options to generate
 * @param {Object} options - Configuration options
 * @return {string[]} - Array of filtered options
 */
function generateFilteredGameOptions(originalWord, count = 4, options = {}) {
    const {
        preserveLength = true,
        useOriginalLettersOnly = true,
        overgenerate = 2 // Reduced to prevent excessive processing
    } = options;

    // Generate reasonable number of variants with a strict limit
    const maxVariants = Math.min(count * overgenerate, 20); // Never process more than 20

    // Generate variants using realistic patterns
    const variants = [];
    const acceptableVariants = [];

    // First try to generate variants using a length-preserving scrambler
    const scrambledOptions = generateScrambleOptions(originalWord, Math.min(count, 4));
    for (const option of scrambledOptions) {
        if (option !== originalWord) {
            acceptableVariants.push(option);
        }
    }

    // If we have realistic variants function available, use it (with limits)
    let attempts = 0;
    const maxAttempts = 20;

    if (typeof generateRealisticVariants === 'function') {
        while (variants.length < maxVariants && attempts < maxAttempts) {
            attempts++;
            const newVariant = lengthPreservingScramble(originalWord);
            if (newVariant !== originalWord && !variants.includes(newVariant)) {
                variants.push(newVariant);
            }
        }
    } else {
        // Fallback to basic scrambling
        while (variants.length < maxVariants && attempts < maxAttempts) {
            attempts++;
            variants.push(lengthPreservingScramble(originalWord));
        }
    }

    // Filter variants based on constraints (with a limit)
    attempts = 0;
    for (const variant of variants) {
        if (variant === originalWord) continue;
        attempts++;

        // Break if we've checked too many
        if (attempts > maxAttempts) break;

        // Apply filters based on options
        let isAcceptable = true;

        if (preserveLength && variant.length !== originalWord.length) {
            isAcceptable = false;
        }

        if (useOriginalLettersOnly && !usesOnlyOriginalLetters(originalWord, variant)) {
            isAcceptable = false;
        }

        if (isAcceptable && !acceptableVariants.includes(variant)) {
            acceptableVariants.push(variant);
            // Break early if we have enough
            if (acceptableVariants.length >= count) {
                break;
            }
        }
    }

    // If we don't have enough variants, fall back to direct modifications
    while (acceptableVariants.length < count - 1) {
        // Create a simple variation by changing one character
        const chars = originalWord.split('');
        const pos = Math.floor(Math.random() * chars.length);

        // Change the character slightly
        const charCode = chars[pos].charCodeAt(0);
        chars[pos] = String.fromCharCode(charCode + 1);

        const variant = chars.join('');
        if (!acceptableVariants.includes(variant) && variant !== originalWord) {
            acceptableVariants.push(variant);
        } else {
            // Last resort fallback - just add a suffix
            const fallback = originalWord + (acceptableVariants.length % 2 === 0 ? 's' : 'ed');
            if (!acceptableVariants.includes(fallback)) {
                acceptableVariants.push(fallback);
            } else {
                // If we're really stuck, just break rather than hang
                break;
            }
        }
    }

    // Add the original word to the options
    const allOptions = [originalWord, ...acceptableVariants.slice(0, count - 1)];

    // Shuffle the options
    return shuffleArray(allOptions);
}
/**
 * Updates the generateGameOptions function to use the filtered approach
 * @param {string} originalWord - The original word
 * @param {number} count - Number of options to generate
 * @param {Object} options - Configuration options
 * @return {string[]} - Array of game options
 */
function generateGameOptions(originalWord, count = 4, options = {}) {
    // Apply enhanced filtering
    const enhancedOptions = {
        ...options,
        preserveLength: true,
        useOriginalLettersOnly: true,
        overgenerate: 3
    };

    return generateFilteredGameOptions(originalWord, count, enhancedOptions);
}