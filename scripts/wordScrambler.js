/**
 * Enhanced Word Scrambler for VocabHoot
 *
 * A comprehensive system for generating realistic spelling mistakes
 * and word variations based on common language learning challenges.
 */

// Configuration object for different language-specific errors
const LANGUAGE_SPECIFIC_ERRORS = {
    // Vietnamese speakers learning English common errors
    'vi': {
        // Final consonant omission (Vietnamese syllables don't end with certain consonants)
        finalConsonantOmission: ['t', 'd', 'p', 'c', 'k', 'ch', 'f'],

        // Consonant confusion (b/p, d/t, etc. - sounds that may be challenging)
        consonantConfusion: [
            { a: 'b', b: 'p' }, // b/p confusion
            { a: 'd', b: 't' }, // d/t confusion
            { a: 'j', b: 'ch' }, // j/ch confusion
            { a: 'l', b: 'r' }, // l/r confusion (very common)
            { a: 'sh', b: 's' }, // sh/s confusion
            { a: 'v', b: 'f' }, // v/f confusion
            { a: 'z', b: 's' }, // z/s confusion
            { a: 'th', b: 't' }, // th/t confusion
            { a: 'th', b: 'f' }, // th/f confusion
        ],

        // Vowel length confusion
        vowelConfusion: [
            { a: 'i', b: 'ee' },
            { a: 'u', b: 'oo' },
            { a: 'o', b: 'aw' },
            { a: 'a', b: 'ah' }
        ],

        // Final consonant clusters simplification
        consonantClusters: [
            { orig: 'ld', simp: 'l' },
            { orig: 'nd', simp: 'n' },
            { orig: 'sk', simp: 's' },
            { orig: 'sp', simp: 's' },
            { orig: 'st', simp: 's' },
            { orig: 'ft', simp: 'f' },
            { orig: 'ct', simp: 'c' },
            { orig: 'pt', simp: 'p' },
            { orig: 'mp', simp: 'm' }
        ],

        // Sound patterns not in Vietnamese
        challengingSounds: [
            'th', 'r', 'ch', 'sh', 'j', 'z', 'v'
        ]
    },

    // Add other language backgrounds as needed
    'es': {  // Spanish speakers
        consonantConfusion: [
            { a: 'b', b: 'v' }, // b/v confusion (very common)
            { a: 'j', b: 'h' }, // j/h confusion
            { a: 's', b: 'z' }, // s/z confusion
            { a: 'i', b: 'e' }, // i/e confusion
            { a: 'd', b: 'th' }, // d/th confusion
        ]
    },

    'zh': {  // Chinese speakers
        consonantConfusion: [
            { a: 'l', b: 'r' }, // l/r confusion
            { a: 'th', b: 's' }, // th/s confusion
            { a: 'v', b: 'w' }, // v/w confusion
            { a: 'sh', b: 's' }, // sh/s confusion
        ],
        // Final consonant omission (many Chinese dialects have limited final consonants)
        finalConsonantOmission: ['t', 'd', 'k', 'g', 'z', 'th', 'v', 'f', 'j']
    }
};

// Universal English spelling challenges (for all learners)
const UNIVERSAL_ENGLISH_CHALLENGES = {
    // Silent letters in English that are often omitted
    silentLetterPatterns: [
        { pattern: 'kn', omit: 'k' }, // know → now
        { pattern: 'gn', omit: 'g' }, // sign → sin
        { pattern: 'wr', omit: 'w' }, // write → rite
        { pattern: 'mb', omit: 'b' }, // climb → clim
        { pattern: 'sc', omit: 'c' }, // science → sience
        { pattern: 'ght', omit: 'gh' }, // light → lit
        { pattern: 'ps', omit: 'p' }, // psychology → sychology
        { pattern: 'wh', omit: 'h' }, // what → wat
        { pattern: 'mn', omit: 'n' }, // autumn → autum
        { pattern: 'st', omit: 't' }, // listen → lisen
        { pattern: 'ft', omit: 't' }, // often → ofen
        { pattern: 'lk', omit: 'l' }, // talk → tak
        { pattern: 'lm', omit: 'l' }, // calm → cam
        { pattern: 'bt', omit: 'b' } // subtle → sutle
    ],

    // Confusing vowel sounds in English
    vowelSoundConfusion: [
        { a: 'ee', b: 'ea', c: 'e', d: 'i' }, // sleep/sleat/slep/slip
        { a: 'ea', b: 'ee', c: 'e' }, // lead/leed/led
        { a: 'ai', b: 'ay', c: 'a', d: 'e' }, // wait/way/wat/wet
        { a: 'ou', b: 'o', c: 'u' }, // could/cold/culd
        { a: 'ie', b: 'ei', c: 'i', d: 'ee' }, // believe/beleive/belive/beleeve
        { a: 'oo', b: 'u', c: 'ou' }, // book/buk/bouk
        { a: 'a', b: 'e', c: 'u' }, // about/ebout/uboat
        { a: 'i', b: 'y', c: 'e' }, // city/citty/cite
        { a: 'o', b: 'a', c: 'u' }, // come/came/cume
        { a: 'u', b: 'oo', c: 'ou' } // put/poot/pout
    ],

    // Double letter patterns that cause confusion
    doubleLetterPatterns: [
        'ss', 'tt', 'rr', 'nn', 'mm', 'pp', 'cc', 'll', 'ff', 'gg', 'dd'
    ],

    // Confusing letter combinations
    difficultCombinations: [
        { orig: 'tion', alts: ['cion', 'sion', 'toin', 'shun'] },
        { orig: 'sion', alts: ['tion', 'shun', 'soin'] },
        { orig: 'ei', alts: ['ie', 'ee', 'i'] },
        { orig: 'ie', alts: ['ei', 'ee', 'i'] },
        { orig: 'th', alts: ['t', 'f', 'd', 'v', 'z'] },
        { orig: 'ch', alts: ['sh', 'tch', 'k', 'c'] },
        { orig: 'sh', alts: ['ch', 's', 'si'] },
        { orig: 'ph', alts: ['f', 'ff'] },
        { orig: 'wh', alts: ['w', 'h'] },
        { orig: 'que', alts: ['k', 'q', 'cu'] },
        { orig: 'ck', alts: ['k', 'c', 'q'] }
    ],

    // Phonetic substitutions that learners commonly make
    phoneticSubstitutions: [
        { orig: 'ph', repl: 'f' }, // photo → foto
        { orig: 'gh', repl: 'f' }, // enough → enuf
        { orig: 'c', repl: 'k' }, // cat → kat
        { orig: 'c', repl: 's' }, // city → sity
        { orig: 'q', repl: 'k' }, // quick → kuick
        { orig: 'ght', repl: 't' }, // light → lite
        { orig: 'x', repl: 'ks' }, // box → boks
        { orig: 'x', repl: 'z' }, // xylophone → zylophone
        { orig: 'wh', repl: 'w' }, // what → wat
        { orig: 'j', repl: 'g' }, // jump → gump
        { orig: 'j', repl: 'dg' }, // jump → dgump
        { orig: 'ch', repl: 'tch' }, // such → sutch
        { orig: 'ch', repl: 'k' }, // chemistry → kemistry
        { orig: 'sh', repl: 'sch' }, // ship → schip
        { orig: 'th', repl: 'd' }, // this → dis
        { orig: 'th', repl: 't' }, // think → tink
        { orig: 'th', repl: 'f' }, // think → fink
        { orig: 'w', repl: 'v' }, // west → vest
        { orig: 'v', repl: 'w' }, // very → wery
        { orig: 'z', repl: 's' }, // zoo → soo
        { orig: 's', repl: 'z' } // loose → looze
    ],

    // Common homophone confusions
    commonHomophones: {
        'there': ['their', 'they\'re'],
        'their': ['there', 'they\'re'],
        'they\'re': ['there', 'their'],
        'to': ['too', 'two'],
        'too': ['to', 'two'],
        'two': ['to', 'too'],
        'your': ['you\'re'],
        'you\'re': ['your'],
        'its': ['it\'s'],
        'it\'s': ['its'],
        'than': ['then'],
        'then': ['than'],
        'weather': ['whether'],
        'whether': ['weather'],
        'accept': ['except'],
        'except': ['accept'],
        'affect': ['effect'],
        'effect': ['affect'],
        'lose': ['loose'],
        'loose': ['lose'],
        'principal': ['principle'],
        'principle': ['principal'],
        'stationary': ['stationery'],
        'stationery': ['stationary'],
        'desert': ['dessert'],
        'dessert': ['desert'],
        'complement': ['compliment'],
        'compliment': ['complement'],
        'brake': ['break'],
        'break': ['brake'],
        'hear': ['here'],
        'here': ['hear'],
        'whole': ['hole'],
        'hole': ['whole'],
        'flour': ['flower'],
        'flower': ['flour'],
        'meat': ['meet'],
        'meet': ['meat'],
        'weight': ['wait'],
        'wait': ['weight'],
        'peace': ['piece'],
        'piece': ['peace'],
        'main': ['mane'],
        'mane': ['main'],
        'plain': ['plane'],
        'plane': ['plain'],
        'sight': ['site', 'cite'],
        'site': ['sight', 'cite'],
        'cite': ['site', 'sight'],
        'wear': ['where', 'ware'],
        'where': ['wear', 'ware'],
        'ware': ['wear', 'where'],
        'write': ['right', 'rite'],
        'right': ['write', 'rite'],
        'rite': ['right', 'write']
    },

    // Prefixes and suffixes that cause mistakes
    affixErrors: [
        { prefix: 'un', error: 'on' },
        { prefix: 'in', error: 'en' },
        { prefix: 'im', error: 'em' },
        { prefix: 'dis', error: 'des' },
        { prefix: 're', error: 'ri' },
        { prefix: 'pre', error: 'pri' },
        { suffix: 'ly', error: 'ly' },
        { suffix: 'ing', error: 'eng' },
        { suffix: 'ed', error: 't' },
        { suffix: 'er', error: 'or' },
        { suffix: 'ible', error: 'able' },
        { suffix: 'able', error: 'ible' },
        { suffix: 'tion', error: 'sion' },
        { suffix: 'sion', error: 'tion' },
        { suffix: 'ence', error: 'ance' },
        { suffix: 'ance', error: 'ence' },
        { suffix: 'ize', error: 'ise' },
        { suffix: 'ise', error: 'ize' },
        { suffix: 'ful', error: 'full' },
        { suffix: 'ant', error: 'ent' },
        { suffix: 'ent', error: 'ant' }
    ],

    // Mispronunciation-based spelling errors
    pronounceBasedErrors: [
        // Words with counterintuitive pronunciations
        { word: 'comfortable', misspell: 'comftable' },
        { word: 'vegetable', misspell: 'vegtable' },
        { word: 'interesting', misspell: 'intresting' },
        { word: 'basically', misspell: 'basicly' },
        { word: 'environment', misspell: 'enviroment' },
        { word: 'accidentally', misspell: 'accidently' },
        { word: 'definitely', misspell: 'definately' },
        { word: 'government', misspell: 'goverment' },
        { word: 'separate', misspell: 'seperate' },
        { word: 'favorite', misspell: 'favrite' },
        { word: 'temperature', misspell: 'temprature' },
        { word: 'necessary', misspell: 'neccesary' },
        { word: 'beginning', misspell: 'begining' },
        { word: 'experience', misspell: 'experiance' },
        { word: 'believe', misspell: 'beleive' },
        { word: 'surprise', misspell: 'suprise' },
        { word: 'restaurant', misspell: 'restarant' },
        { word: 'similar', misspell: 'simular' },
        { word: 'probably', misspell: 'probly' },
        { word: 'business', misspell: 'bussiness' }
    ]
};

/**
 * Gets L1-specific errors for a given native language
 * @param {string} nativeLanguage - ISO code for native language (e.g., 'vi')
 * @return {Object} - Language-specific error patterns
 */
function getLanguageSpecificErrors(nativeLanguage) {
    return LANGUAGE_SPECIFIC_ERRORS[nativeLanguage] || {};
}

/**
 * Intelligently scrambles a word while preserving its basic structure
 * @param {string} word - The word to scramble
 * @param {string} nativeLanguage - Optional native language code
 * @return {string} - A scrambled version of the word
 */
function smartScrambleWord(word, nativeLanguage = null) {
    if (word.length <= 3) return word;

    // Handle multi-word phrases
    if (word.includes(' ')) {
        return word.split(' ')
            .map(w => smartScrambleWord(w, nativeLanguage))
            .join(' ');
    }

    // Handle hyphenated words
    if (word.includes('-')) {
        return word.split('-')
            .map(w => smartScrambleWord(w, nativeLanguage))
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
 * Creates a spelling mistake based on silent letter omission
 * @param {string} word - Original word
 * @return {string} - Modified word with silent letter omitted
 */
function createSilentLetterMistake(word) {
    const patterns = UNIVERSAL_ENGLISH_CHALLENGES.silentLetterPatterns;

    for (const { pattern, omit } of patterns) {
        if (word.toLowerCase().includes(pattern)) {
            return word.replace(new RegExp(omit, 'i'), '');
        }
    }

    return word;
}

/**
 * Creates a spelling mistake based on vowel sound confusion
 * @param {string} word - Original word
 * @return {string} - Modified word with vowel sound confusion
 */
function createVowelConfusionMistake(word) {
    const vowelSets = UNIVERSAL_ENGLISH_CHALLENGES.vowelSoundConfusion;

    // If the word is too short, don't modify it
    if (word.length <= 3) return word;

    // Try to find a vowel pattern to replace
    for (const vowelSet of vowelSets) {
        for (const vowel of Object.values(vowelSet)) {
            if (word.toLowerCase().includes(vowel)) {
                // Replace with a different vowel from the same set
                const otherVowels = Object.values(vowelSet).filter(v => v !== vowel);
                if (otherVowels.length === 0) continue;

                const replacement = otherVowels[Math.floor(Math.random() * otherVowels.length)];
                return word.replace(new RegExp(vowel, 'i'), replacement);
            }
        }
    }

    return word;
}

/**
 * Creates a spelling mistake based on double letter errors
 * @param {string} word - Original word
 * @return {string} - Modified word with double letter error
 */
function createDoubleLetterMistake(word) {
    const doublePatterns = UNIVERSAL_ENGLISH_CHALLENGES.doubleLetterPatterns;

    // Check if word has any doubled consonants and simplify them
    for (const pattern of doublePatterns) {
        if (word.toLowerCase().includes(pattern)) {
            return word.replace(new RegExp(pattern, 'i'), pattern[0]);
        }
    }

    // Or add a double where it might make sense
    const singleConsonants = doublePatterns.map(p => p[0]);
    for (const consonant of singleConsonants) {
        // Only double a consonant if it's not at the beginning or end of the word
        const index = word.toLowerCase().indexOf(consonant);
        if (index > 0 && index < word.length - 1) {
            // Don't double if it's already next to the same letter
            if (word[index - 1] !== consonant && word[index + 1] !== consonant) {
                return word.slice(0, index + 1) + consonant + word.slice(index + 1);
            }
        }
    }

    return word;
}

/**
 * Creates a spelling mistake based on difficult letter combinations
 * @param {string} word - Original word
 * @return {string} - Modified word with difficult combination error
 */
function createLetterCombinationMistake(word) {
    const combinations = UNIVERSAL_ENGLISH_CHALLENGES.difficultCombinations;

    for (const { orig, alts } of combinations) {
        if (word.toLowerCase().includes(orig)) {
            const replacement = alts[Math.floor(Math.random() * alts.length)];
            return word.replace(new RegExp(orig, 'i'), replacement);
        }
    }

    return word;
}

/**
 * Creates a spelling mistake based on phonetic substitution
 * @param {string} word - Original word
 * @return {string} - Modified word with phonetic substitution
 */
function createPhoneticSubstitutionMistake(word) {
    const substitutions = UNIVERSAL_ENGLISH_CHALLENGES.phoneticSubstitutions;

    for (const { orig, repl } of substitutions) {
        if (word.toLowerCase().includes(orig)) {
            return word.replace(new RegExp(orig, 'i'), repl);
        }
    }

    return word;
}

/**
 * Creates a homophones confusion error
 * @param {string} word - Original word
 * @return {string} - Replaced with homophone if possible
 */
function createHomophoneMistake(word) {
    const homophones = UNIVERSAL_ENGLISH_CHALLENGES.commonHomophones;
    const lowerWord = word.toLowerCase();

    // Check if the word is in our homophone list
    if (homophones[lowerWord]) {
        const alternatives = homophones[lowerWord];
        return alternatives[Math.floor(Math.random() * alternatives.length)];
    }

    return word;
}

/**
 * Creates a native language specific error
 * @param {string} word - Original word
 * @param {string} nativeLanguage - Native language code
 * @return {string} - Modified word based on L1 interference
 */
function createL1InterferenceMistake(word, nativeLanguage) {
    if (!nativeLanguage || !LANGUAGE_SPECIFIC_ERRORS[nativeLanguage]) {
        return word;
    }

    const langErrors = LANGUAGE_SPECIFIC_ERRORS[nativeLanguage];
    const errorTypes = Object.keys(langErrors);

    if (errorTypes.length === 0) return word;

    // Choose a random error type
    const errorType = errorTypes[Math.floor(Math.random() * errorTypes.length)];
    const errorPatterns = langErrors[errorType];

    // Apply different modifications based on error type
    switch (errorType) {
        case 'finalConsonantOmission':
            // Check if word ends with a problematic consonant
            for (const consonant of errorPatterns) {
                if (word.toLowerCase().endsWith(consonant)) {
                    return word.slice(0, word.length - consonant.length);
                }
            }
            break;

        case 'consonantConfusion':
            // Replace a consonant with a confused one
            for (const { a, b } of errorPatterns) {
                if (word.toLowerCase().includes(a)) {
                    return word.replace(new RegExp(a, 'ig'), b);
                } else if (word.toLowerCase().includes(b)) {
                    return word.replace(new RegExp(b, 'ig'), a);
                }
            }
            break;

        case 'vowelConfusion':
            // Replace a vowel with a confused one
            for (const { a, b } of errorPatterns) {
                if (word.toLowerCase().includes(a)) {
                    return word.replace(new RegExp(a, 'ig'), b);
                } else if (word.toLowerCase().includes(b)) {
                    return word.replace(new RegExp(b, 'ig'), a);
                }
            }
            break;

        case 'consonantClusters':
            // Simplify a consonant cluster
            for (const { orig, simp } of errorPatterns) {
                if (word.toLowerCase().includes(orig)) {
                    return word.replace(new RegExp(orig, 'ig'), simp);
                }
            }
            break;

        case 'challengingSounds':
            // Replace challenging sounds with easier ones
            for (const sound of errorPatterns) {
                if (word.toLowerCase().includes(sound)) {
                    // For each challenging sound, determine a replacement
                    let replacement;
                    switch (sound) {
                        case 'th': replacement = 't'; break;
                        case 'r': replacement = 'l'; break;
                        case 'ch': replacement = 'c'; break;
                        case 'sh': replacement = 's'; break;
                        case 'j': replacement = 'd'; break;
                        case 'z': replacement = 's'; break;
                        case 'v': replacement = 'f'; break;
                        default: replacement = sound[0];
                    }
                    return word.replace(new RegExp(sound, 'ig'), replacement);
                }
            }
            break;
    }

    return word;
}

/**
 * Creates a prefix or suffix error
 * @param {string} word - Original word
 * @return {string} - Modified word with affix error
 */
function createAffixMistake(word) {
    const affixErrors = UNIVERSAL_ENGLISH_CHALLENGES.affixErrors;

    // Minimum word length for affix errors
    if (word.length < 5) return word;

    // Check prefixes first
    for (const { prefix, error } of affixErrors) {
        if (word.toLowerCase().startsWith(prefix)) {
            return error + word.slice(prefix.length);
        }
    }

    // Then check suffixes
    for (const { suffix, error } of affixErrors) {
        if (word.toLowerCase().endsWith(suffix)) {
            return word.slice(0, word.length - suffix.length) + error;
        }
    }

    return word;
}

/**
 * Creates a spelling mistake based on pronunciation
 * @param {string} word - Original word
 * @return {string} - Modified word with pronunciation-based error
 */
function createPronunciationMistake(word) {
    const pronounceErrors = UNIVERSAL_ENGLISH_CHALLENGES.pronounceBasedErrors;

    // Check for special case words
    for (const { word: originalWord, misspell } of pronounceErrors) {
        if (word.toLowerCase() === originalWord.toLowerCase()) {
            return misspell;
        }
    }

    // For words ending with '-ed', sometimes learners write '-t' instead
    if (word.toLowerCase().endsWith('ed') && word.length > 4) {
        // Special case for '-ed' ending
        return word.slice(0, word.length - 2) + 't';
    }

    // Add/remove final 'e'
    if (word.endsWith('e')) {
        return word.slice(0, -1);
    } else if (/[^aeiou][bcdfghjklmnpqrstvwxyz]$/.test(word)) {
        // If word ends with consonant-consonant pattern, add 'e'
        return word + 'e';
    }

    return word;
}

/**
 * Creates a spelling mistake based on common typing errors
 * @param {string} word - Original word
 * @return {string} - Modified word with typing error
 */
function createTypingMistake(word) {
    if (word.length <= 3) return word;

    const errors = [
        // Transpose adjacent letters
        () => {
            const pos = 1 + Math.floor(Math.random() * (word.length - 2));
            const chars = word.split('');
            [chars[pos], chars[pos + 1]] = [chars[pos + 1], chars[pos]];
            return chars.join('');
        },

        // Duplicate a letter (especially common when typing quickly)
        () => {
            const pos = Math.floor(Math.random() * word.length);
            return word.slice(0, pos + 1) + word[pos] + word.slice(pos + 1);
        },

        // Omit a letter (especially for long words)
        () => {
            if (word.length <= 3) return word;
            const pos = Math.floor(Math.random() * word.length);
            return word.slice(0, pos) + word.slice(pos + 1);
        },

        // Keyboard adjacency errors (pressing the wrong key)
        () => {
            const keyboardLayout = {
                'a': ['q', 'w', 's', 'z'],
                'b': ['v', 'g', 'h', 'n'],
                'c': ['x', 'd', 'f', 'v'],
                'd': ['s', 'e', 'r', 'f', 'c', 'x'],
                'e': ['w', 's', 'd', 'r'],
                'f': ['d', 'r', 't', 'g', 'v', 'c'],
                'g': ['f', 't', 'y', 'h', 'b', 'v'],
                'h': ['g', 'y', 'u', 'j', 'n', 'b'],
                'i': ['u', 'j', 'k', 'o'],
                'j': ['h', 'u', 'i', 'k', 'm', 'n'],
                'k': ['j', 'i', 'o', 'l', 'm'],
                'l': ['k', 'o', 'p', ';'],
                'm': ['n', 'j', 'k', ','],
                'n': ['b', 'h', 'j', 'm'],
                'o': ['i', 'k', 'l', 'p'],
                'p': ['o', 'l', '[', ';'],
                'q': ['1', '2', 'w', 'a'],
                'r': ['e', 'd', 'f', 't'],
                's': ['a', 'w', 'e', 'd', 'x', 'z'],
                't': ['r', 'f', 'g', 'y'],
                'u': ['y', 'h', 'j', 'i'],
                'v': ['c', 'f', 'g', 'b'],
                'w': ['q', 'a', 's', 'e'],
                'x': ['z', 's', 'd', 'c'],
                'y': ['t', 'g', 'h', 'u'],
                'z': ['a', 's', 'x']
            };

            // Choose a random position
            if (word.length <= 2) return word;
            const pos = Math.floor(Math.random() * word.length);
            const char = word[pos].toLowerCase();

            // If we have adjacent keys for this character
            if (keyboardLayout[char]) {
                const adjacentKeys = keyboardLayout[char];
                const replacement = adjacentKeys[Math.floor(Math.random() * adjacentKeys.length)];
                return word.slice(0, pos) + replacement + word.slice(pos + 1);
            }
            return word;
        }
    ];

    // Choose a random error type
    const errorFunc = errors[Math.floor(Math.random() * errors.length)];
    return errorFunc();
}

/**
 * Generates multiple realistic variant options for a word
 * @param {string} word - The original word
 * @param {number} count - Number of variant options to generate
 * @param {Object} options - Configuration options
 * @return {string[]} - Array of variant options
 */
function generateRealisticVariants(word, count = 4, options = {}) {
    const {
        nativeLanguage = null,
        difficultyLevel = 'medium', // 'easy', 'medium', 'hard'
        errorTypes = null, // specific error types to focus on
        preserveLength = false // whether to keep the same word length
    } = options;

    // Store options we generate
    const variants = [];

    // Map of error generation functions with their educational complexity
    const errorGenerators = [
        { func: createSilentLetterMistake, complexity: 'medium', name: 'silent_letter' },
        { func: createVowelConfusionMistake, complexity: 'medium', name: 'vowel_confusion' },
        { func: createDoubleLetterMistake, complexity: 'easy', name: 'double_letter' },
        { func: createLetterCombinationMistake, complexity: 'medium', name: 'letter_combination' },
        { func: createPhoneticSubstitutionMistake, complexity: 'easy', name: 'phonetic' },
        { func: createHomophoneMistake, complexity: 'hard', name: 'homophone' },
        { func: (w) => createL1InterferenceMistake(w, nativeLanguage), complexity: 'medium', name: 'l1_interference' },
        { func: createAffixMistake, complexity: 'hard', name: 'affix' },
        { func: createPronunciationMistake, complexity: 'medium', name: 'pronunciation' },
        { func: createTypingMistake, complexity: 'easy', name: 'typing' },
        { func: smartScrambleWord, complexity: 'easy', name: 'scramble' }
    ];

    // Filter error generators by difficulty level
    let availableGenerators = errorGenerators;
    if (difficultyLevel === 'easy') {
        availableGenerators = errorGenerators.filter(gen => gen.complexity === 'easy');
    } else if (difficultyLevel === 'medium') {
        availableGenerators = errorGenerators.filter(gen => gen.complexity !== 'hard');
    }

    // Filter error generators by specified types if provided
    if (errorTypes && Array.isArray(errorTypes) && errorTypes.length > 0) {
        availableGenerators = errorGenerators.filter(gen => errorTypes.includes(gen.name));
    }

    // Special handling for multi-word phrases
    if (word.includes(' ')) {
        const words = word.split(' ');

        // Generate whole-phrase variants (like homophone substitutions)
        const wholePhraseVariants = [];
        for (let i = 0; i < Math.min(2, count); i++) {
            // First try homophone replacement for the entire phrase
            const homoVariant = createHomophoneMistake(word);
            if (homoVariant !== word && !wholePhraseVariants.includes(homoVariant)) {
                wholePhraseVariants.push(homoVariant);
            }
        }

        // Add whole phrase variants first
        for (const variant of wholePhraseVariants) {
            if (!variants.includes(variant) && variant !== word) {
                variants.push(variant);
                if (variants.length >= count) break;
            }
        }

        // Then generate word-by-word variants
        while (variants.length < count) {
            // Randomly select a word to modify
            const wordIndex = Math.floor(Math.random() * words.length);
            const wordToModify = words[wordIndex];

            // Skip very short words
            if (wordToModify.length <= 2) continue;

            // Choose a random error generator
            const generator = availableGenerators[Math.floor(Math.random() * availableGenerators.length)];

            // Apply the modification
            const modifiedWord = generator.func(wordToModify);

            // Skip if no change was made
            if (modifiedWord === wordToModify) continue;

            // Create the new phrase
            const newWords = [...words];
            newWords[wordIndex] = modifiedWord;
            const newPhrase = newWords.join(' ');

            // Add to variants if it's unique
            if (!variants.includes(newPhrase) && newPhrase !== word) {
                variants.push(newPhrase);
            }

            // Prevent infinite loops
            if (variants.length < count && variants.length === words.length) {
                break;
            }
        }
    } else {
        // For single words, simply apply different error generators
        // First, try to generate one variant of each type (for educational diversity)
        for (const generator of availableGenerators) {
            if (variants.length >= count) break;

            const variant = generator.func(word);

            // Only add if it's a valid modification
            if (variant !== word && !variants.includes(variant)) {
                // Skip if we need to preserve length and the length changed
                if (preserveLength && variant.length !== word.length) continue;

                variants.push(variant);
            }
        }

        // If we still need more variants, generate additional ones randomly
        const maxAttempts = availableGenerators.length * 3; // Prevent infinite loops
        let attempts = 0;

        while (variants.length < count && attempts < maxAttempts) {
            attempts++;

            // Choose a random generator
            const generator = availableGenerators[Math.floor(Math.random() * availableGenerators.length)];
            const variant = generator.func(word);

            // Only add unique variants
            if (variant !== word && !variants.includes(variant)) {
                // Skip if we need to preserve length and the length changed
                if (preserveLength && variant.length !== word.length) continue;

                variants.push(variant);
            }
        }
    }

    // If we still don't have enough variants, fall back to scrambling
    while (variants.length < count) {
        const scrambled = smartScrambleWord(word);
        if (scrambled !== word && !variants.includes(scrambled)) {
            variants.push(scrambled);
        } else {
            // Last resort: just modify a random character
            const chars = word.split('');
            const pos = 1 + Math.floor(Math.random() * (chars.length - 2));
            chars[pos] = String.fromCharCode(chars[pos].charCodeAt(0) + 1);
            const modified = chars.join('');

            if (!variants.includes(modified) && modified !== word) {
                variants.push(modified);
            } else {
                // If we still can't create a unique variant, just add a letter
                variants.push(word + 's');
                break;
            }
        }
    }

    return variants;
}

/**
 * Creates options for the vocabulary game based on the original word
 * @param {string} originalWord - The correct word
 * @param {number} count - Number of options to generate
 * @param {Object} options - Configuration for error generation
 * @return {string[]} - Array of options (including the correct word)
 */
function generateGameOptions(originalWord, count = 4, options = {}) {
    // Generate count-1 variants (we'll add the original word later)

    const variants = generateRealisticVariants(originalWord, count - 1, options);

    // Add the original word to the options
    const allOptions = [originalWord, ...variants];

    // Shuffle the options
    for (let i = allOptions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [allOptions[i], allOptions[j]] = [allOptions[j], allOptions[i]];
    }

    return allOptions;
}

/**
 * Analyze a word to identify its challenging features
 * @param {string} word - Word to analyze
 * @return {Object} - Analysis of word features that might cause errors
 */
function analyzeWordDifficulty(word) {
    const analysis = {
        length: word.length,
        difficulties: [],
        level: 'easy'
    };

    // Check for silent letters
    const silentPatterns = UNIVERSAL_ENGLISH_CHALLENGES.silentLetterPatterns;
    for (const { pattern } of silentPatterns) {
        if (word.toLowerCase().includes(pattern)) {
            analysis.difficulties.push(`Contains silent pattern "${pattern}"`);
        }
    }

    // Check for difficult vowel combinations
    const vowelSets = UNIVERSAL_ENGLISH_CHALLENGES.vowelSoundConfusion;
    for (const vowelSet of vowelSets) {
        for (const vowel of Object.values(vowelSet)) {
            if (vowel.length > 1 && word.toLowerCase().includes(vowel)) {
                analysis.difficulties.push(`Contains complex vowel pattern "${vowel}"`);
                break;
            }
        }
    }

    // Check for double letters
    const doublePatterns = UNIVERSAL_ENGLISH_CHALLENGES.doubleLetterPatterns;
    for (const pattern of doublePatterns) {
        if (word.toLowerCase().includes(pattern)) {
            analysis.difficulties.push(`Contains double letters "${pattern}"`);
            break;
        }
    }

    // Check for challenging letter combinations
    const combinations = UNIVERSAL_ENGLISH_CHALLENGES.difficultCombinations;
    for (const { orig } of combinations) {
        if (word.toLowerCase().includes(orig)) {
            analysis.difficulties.push(`Contains challenging combination "${orig}"`);
        }
    }

    // Check if it's a homophone
    const homophones = UNIVERSAL_ENGLISH_CHALLENGES.commonHomophones;
    if (homophones[word.toLowerCase()]) {
        analysis.difficulties.push(`Is a homophone with ${homophones[word.toLowerCase()].join(', ')}`);
    }

    // Check for prefix/suffix
    const affixErrors = UNIVERSAL_ENGLISH_CHALLENGES.affixErrors;
    for (const { prefix } of affixErrors) {
        if (word.toLowerCase().startsWith(prefix)) {
            analysis.difficulties.push(`Begins with prefix "${prefix}"`);
            break;
        }
    }
    for (const { suffix } of affixErrors) {
        if (word.toLowerCase().endsWith(suffix)) {
            analysis.difficulties.push(`Ends with suffix "${suffix}"`);
            break;
        }
    }

    // Set difficulty level based on number of challenges
    if (analysis.difficulties.length >= 3 || word.length >= 10) {
        analysis.level = 'hard';
    } else if (analysis.difficulties.length >= 1 || word.length >= 7) {
        analysis.level = 'medium';
    }

    return analysis;
}

// Export functions
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        smartScrambleWord,
        generateRealisticVariants,
        generateGameOptions,
        analyzeWordDifficulty,
        errorTypes: {
            createSilentLetterMistake,
            createVowelConfusionMistake,
            createDoubleLetterMistake,
            createLetterCombinationMistake,
            createPhoneticSubstitutionMistake,
            createHomophoneMistake,
            createL1InterferenceMistake,
            createAffixMistake,
            createPronunciationMistake,
            createTypingMistake
        }
    };
}