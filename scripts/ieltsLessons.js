// IELTS Speaking Lessons - Comprehensive Learning Modules
// Combines pre-recorded teacher audio with AI-aided practice
// Student learns strategies, then practices with personalized AI feedback

const LESSON_CONSTANTS = {
    STORAGE_KEY: 'ielts_lesson_progress',
    AUDIO_DB_NAME: 'IELTSLessonAudioDB',
    AUDIO_STORE_NAME: 'audioFiles'
};

const IELTS_LESSONS = {
    // Module 1: Understanding the IELTS Speaking Test
    module1: {
        id: 'module1',
        title: 'Understanding the IELTS Speaking Test',
        duration: 10,
        description: 'Learn what examiners look for and common mistakes to avoid',

        sections: [
            {
                id: 'm1_intro',
                type: 'audio_lesson',
                title: 'Welcome to IELTS Speaking Mastery',
                audioScript: {
                    text: `Hello! I'm your IELTS speaking teacher, and I'm here to help you master the speaking test. Many students feel nervous about speaking tests, but with the right strategies, you can feel confident and perform well. In this course, you'll learn exactly what examiners look for, how to organize your thoughts quickly, and how to express yourself clearly and naturally. Let's begin by understanding what the test is really about.`,
                    duration: 30
                },
                content: {
                    text: 'The IELTS Speaking test evaluates your ability to communicate effectively in English. It consists of three parts and lasts 11-14 minutes.'
                }
            },
            {
                id: 'm1_criteria',
                type: 'audio_lesson',
                title: 'The Four Scoring Criteria',
                audioScript: {
                    text: `Examiners evaluate you on four criteria: Fluency and Coherence, Lexical Resource, Grammatical Range and Accuracy, and Pronunciation. Let me explain what each one really means. Fluency is about speaking smoothly without too many pauses. Coherence means your ideas connect logically. Lexical Resource is your vocabulary range - can you use different words naturally? Grammar is about using various sentence structures correctly. And pronunciation isn't about having a perfect accent - it's about being clear and understandable. The key insight is this: examiners want to see you communicate naturally, not perfectly. A few small mistakes are completely okay if you keep speaking confidently.`,
                    duration: 45
                },
                content: {
                    visualAid: 'band_descriptors',
                    text: 'Understanding these criteria helps you focus your practice effectively.'
                }
            },
            {
                id: 'm1_mistakes',
                type: 'audio_lesson',
                title: 'Common Mistakes Students Make',
                audioScript: {
                    text: `Let me share the most common mistakes I see. First, memorizing answers. Examiners can easily tell when you're reciting memorized text, and this actually lowers your score. Second, giving very short answers in Part One. The examiner wants to hear you speak, so extend your answers naturally. Third, panicking when you don't know a word. Instead, learn to paraphrase and explain what you mean. Fourth, speaking too fast because of nervousness. It's better to speak at a natural pace. And finally, not asking for clarification when you don't understand a question. It's perfectly fine to say "Could you repeat that, please?" Remember, the test is designed to see how you communicate in real situations.`,
                    duration: 50
                },
                content: {
                    examples: [
                        { wrong: 'Yes.', right: 'Yes, I really enjoy reading, especially mystery novels.' },
                        { wrong: '[memorized speech]', right: '[natural, spontaneous response]' }
                    ]
                }
            },
            {
                id: 'm1_quiz',
                type: 'interactive_quiz',
                title: 'Test Your Understanding',
                questions: [
                    {
                        question: 'Which is MORE important: perfect grammar or fluent communication?',
                        options: ['Perfect grammar', 'Fluent communication', 'Both equally'],
                        correct: 1,
                        explanation: 'Fluent communication is more important. Small grammar mistakes are acceptable if you communicate clearly.'
                    },
                    {
                        question: 'What should you do if you don\'t understand a question?',
                        options: ['Guess and answer anyway', 'Ask for clarification', 'Stay silent'],
                        correct: 1,
                        explanation: 'Always ask for clarification! This shows good communication skills.'
                    },
                    {
                        question: 'Is it okay to have a non-native accent?',
                        options: ['No, you must sound native', 'Yes, clarity matters more than accent', 'Only British or American accents accepted'],
                        correct: 1,
                        explanation: 'Your accent is fine! Pronunciation scoring focuses on clarity, not native-like accent.'
                    }
                ]
            }
        ]
    },

    // Module 2: Finding Ideas Fast (Part 1)
    module2: {
        id: 'module2',
        title: 'Finding Ideas Fast',
        duration: 20,
        description: 'Learn the 5W1H method and never run out of ideas',

        sections: [
            {
                id: 'm2_intro',
                type: 'audio_lesson',
                title: 'The Idea Problem',
                audioScript: {
                    text: `One of the biggest challenges students face is this: the examiner asks a simple question like "Do you like sports?" and suddenly your mind goes blank. You know you should say more than just "yes" or "no," but what should you talk about? This happens because you're trying to think of the perfect answer. Let me teach you a simple system that will give you ideas for ANY topic in just seconds. It's called the 5W1H method, and once you learn it, you'll never run out of things to say.`,
                    duration: 35
                }
            },
            {
                id: 'm2_5w1h',
                type: 'audio_lesson',
                title: 'The 5W1H Method',
                audioScript: {
                    text: `5W1H stands for: Who, What, When, Where, Why, and How. When you get a question, quickly think through these six points. Let me demonstrate. Question: "Do you like cooking?" Let's use 5W1H. WHAT do I cook? Pasta, vegetables, sometimes desserts. WHEN do I cook? Usually on weekends when I have more time. WHERE? In my kitchen at home, sometimes I cook outdoors. WHO do I cook for? Myself, my family, occasionally friends. WHY do I enjoy it? It's relaxing and creative. HOW do I feel when cooking? I feel calm and focused. See? In just a few seconds, I have six different angles to talk about. You don't need to use all six every time - just pick two or three that feel natural. This method works for ANY topic.`,
                    duration: 60
                },
                content: {
                    visualAid: 'mind_map',
                    example: {
                        question: 'Do you like cooking?',
                        ideas: {
                            what: 'pasta, vegetables, desserts',
                            when: 'weekends, free time',
                            where: 'home kitchen, outdoors',
                            who: 'family, friends, myself',
                            why: 'relaxing, creative',
                            how: 'feel calm, focused'
                        }
                    }
                }
            },
            {
                id: 'm2_demo',
                type: 'audio_lesson',
                title: 'Teacher Demonstration',
                audioScript: {
                    text: `Let me show you this in action. Question: "Do you enjoy traveling?" Watch how I think through this. First, WHERE have I traveled? I've been to Japan and several European countries. WHEN do I usually travel? Usually during summer vacation. WHY do I enjoy it? I love experiencing different cultures and trying new foods. WHO do I travel with? Sometimes with friends, sometimes alone. HOW does traveling make me feel? It makes me feel excited and curious about the world. WHAT kind of travel do I prefer? I prefer city exploration over beach vacations. Now I have plenty of ideas! I could turn any of these into a good answer. The key is not to overthink it - just quickly scan through the six questions and pick what comes to mind first.`,
                    duration: 55
                }
            },
            {
                id: 'm2_practice1',
                type: 'ai_practice',
                title: 'Your Turn: Generate Ideas',
                instructions: 'Use the 5W1H method to generate ideas for the question below. Type your ideas, then get AI feedback.',
                practiceQuestion: 'Do you enjoy reading books?',
                aiPromptTemplate: `The student learned the 5W1H method (Who, What, When, Where, Why, How) for generating ideas.

Question: {{question}}
Student's ideas: {{studentResponse}}

As an encouraging IELTS teacher:
1. Identify which W/H elements they covered
2. Praise what they did well
3. Suggest 1-2 missing elements they could add
4. Keep it brief and supportive

Format your response clearly with checkmarks (✓) for covered elements.`
            },
            {
                id: 'm2_compare',
                type: 'dual_view',
                title: 'Compare Your Approach',
                studentView: 'Your ideas will appear here',
                teacherView: {
                    audioScript: {
                        text: `Here's how I approached the reading question using 5W1H. WHAT do I read? Mystery novels, biographies, sometimes science articles. WHEN? Every night before bed, and during commutes. WHERE? At home in my favorite chair, or on the train. WHO influences my reading choices? Friends recommend books, and I follow some book reviewers. WHY do I enjoy reading? It helps me relax and learn new things. HOW does reading make me feel? It makes me feel calm and intellectually stimulated. Notice I didn't use all six in my final answer - I'll pick the three most interesting ones.`,
                        duration: 45
                    },
                    ideas: {
                        what: 'mystery novels, biographies, science articles',
                        when: 'before bed, during commute',
                        where: 'home, on train',
                        who: 'friends, book reviewers',
                        why: 'relax, learn',
                        how: 'calm, intellectually stimulated'
                    }
                }
            },
            {
                id: 'm2_practice2',
                type: 'ai_practice',
                title: 'Practice More Topics (20 Questions)',
                instructions: 'Try the 5W1H method with different topics. The AI will track your progress. Complete as many as you want!',
                practiceQuestions: [
                    // Hobbies & Interests (5)
                    'What kind of music do you like?',
                    'Do you enjoy watching movies?',
                    'What do you like to do on weekends?',
                    'Do you have any hobbies?',
                    'What do you do in your free time?',

                    // Daily Life (5)
                    'Do you prefer studying alone or with others?',
                    'What time do you usually wake up?',
                    'How do you usually spend your evenings?',
                    'Do you prefer eating at home or at restaurants?',
                    'What do you usually do after work/school?',

                    // Activities & Sports (5)
                    'Do you like playing sports?',
                    'Do you enjoy outdoor activities?',
                    'Have you ever tried swimming?',
                    'Do you like going to the gym?',
                    'What kind of exercise do you do?',

                    // Technology & Media (5)
                    'Do you use social media?',
                    'What do you use your phone for most?',
                    'Do you like watching TV shows?',
                    'Do you prefer online shopping or in-store shopping?',
                    'How often do you use the internet?',

                    // People & Relationships (5)
                    'Do you spend a lot of time with your family?',
                    'Do you have many friends?',
                    'Do you like meeting new people?',
                    'Do you keep in touch with childhood friends?',
                    'Do you prefer spending time alone or with others?',

                    // Learning & Work (5)
                    'What do you find most interesting about your studies?',
                    'Do you enjoy learning new things?',
                    'What was your favorite subject at school?',
                    'Do you think your job is interesting?',
                    'Would you like to change your job in the future?',

                    // Places & Travel (5)
                    'Do you like traveling to new places?',
                    'What is your hometown like?',
                    'Do you prefer the city or the countryside?',
                    'Have you ever been abroad?',
                    'Where would you like to visit in the future?',

                    // Food & Cooking (5)
                    'Do you like cooking?',
                    'What is your favorite food?',
                    'Do you often eat out?',
                    'Do you like trying new foods?',
                    'Can you cook traditional food from your country?'
                ],
                aiPromptTemplate: `Student is practicing the 5W1H method (Who, What, When, Where, Why, How).

Question: {{question}}
Student's ideas: {{studentResponse}}
This is attempt #{{attemptNumber}} of {{totalAttempts}}.

Provide brief, specific feedback:
- Count how many W/H elements they used (out of 6)
- Praise specific good choices
- Suggest 1-2 missing elements to add
- Note improvement from previous attempts (if applicable)
- Encourage them to keep practicing

Keep it concise (3-5 sentences max). Use checkmarks ✓ for covered elements.`
            }
        ]
    },

    // Module 3: Building Better Sentences (Part 1)
    module3: {
        id: 'module3',
        title: 'Building Better Sentences',
        duration: 25,
        description: 'Transform simple sentences into Band 7+ responses',

        sections: [
            {
                id: 'm3_intro',
                type: 'audio_lesson',
                title: 'From Ideas to Sentences',
                audioScript: {
                    text: `Now you know how to generate ideas quickly using the 5W1H method. But how do you turn those ideas into impressive sentences? Many students know WHAT to say but struggle with HOW to say it effectively. In this module, I'll teach you how to transform basic sentences into Band 7 and Band 8 level responses. The secret is not about using complicated words or grammar - it's about adding detail, connecting ideas smoothly, and speaking naturally. Let's start with a simple example and gradually build it up together.`,
                    duration: 40
                }
            },
            {
                id: 'm3_transformation',
                type: 'audio_lesson',
                title: 'The Sentence Transformation Technique',
                audioScript: {
                    text: `Let's take a basic sentence: "I like reading." This is Band 5 level - it's grammatically correct but very simple. How do we improve it? Step one: upgrade the verb. Instead of "like," try "enjoy," "love," or "am really into." So: "I really enjoy reading." Better! Step two: add specificity. What do you read? "I really enjoy reading mystery novels." Even better! Step three: add when or where. "I really enjoy reading mystery novels, especially before bed." Step four: add why or how it makes you feel. "I really enjoy reading mystery novels, especially before bed, as they help me unwind after a long day." Now we have a Band 7 response! Same idea, but we've added layers of detail that make it more interesting and natural. The technique is: Basic verb, then WHAT specifically, then WHEN or WHERE, then WHY or HOW you feel. Let's practice this together.`,
                    duration: 70
                },
                content: {
                    transformation: {
                        level1: { band: 5.0, text: 'I like reading.' },
                        level2: { band: 5.5, text: 'I really enjoy reading.' },
                        level3: { band: 6.0, text: 'I really enjoy reading mystery novels.' },
                        level4: { band: 6.5, text: 'I really enjoy reading mystery novels, especially before bed.' },
                        level5: { band: 7.0, text: 'I really enjoy reading mystery novels, especially before bed, as they help me unwind after a long day.' }
                    }
                }
            },
            {
                id: 'm3_connectors',
                type: 'audio_lesson',
                title: 'Using Connectors Naturally',
                audioScript: {
                    text: `Good speakers use connectors to link their ideas smoothly. But here's the key: don't force them in artificially. Use them when they naturally fit. For adding information, use: "and," "also," "as well," "moreover." For contrasting, use: "but," "however," "on the other hand," "although." For giving reasons, use: "because," "since," "as," "due to the fact that." For giving examples: "for example," "for instance," "such as," "like." For sequencing: "first," "then," "after that," "finally." The mistake students make is trying to use too many fancy connectors. It sounds unnatural. Choose simple, common ones and use them confidently. Let me demonstrate with our reading example: "I really enjoy reading, particularly mystery novels. Also, I find that reading before bed helps me relax. For instance, last night I finished a thriller that kept me engaged for hours." See? Natural and flowing, not forced.`,
                    duration: 65
                },
                content: {
                    connectorTypes: {
                        adding: ['and', 'also', 'as well', 'moreover', 'furthermore'],
                        contrasting: ['but', 'however', 'on the other hand', 'although', 'while'],
                        reason: ['because', 'since', 'as', 'due to'],
                        example: ['for example', 'for instance', 'such as', 'like'],
                        sequence: ['first', 'then', 'after that', 'finally', 'eventually']
                    }
                }
            },
            {
                id: 'm3_practice1',
                type: 'ai_practice',
                title: 'Sentence Building Practice (25 Exercises)',
                instructions: 'Transform basic sentences into Band 7+ responses. Add: better verbs, specific details, WHEN/WHERE, and WHY/HOW you feel.',
                exercises: [
                    // Hobbies & Interests (5)
                    {
                        basic: 'I like sports.',
                        topic: 'sports',
                        hints: ['What sports?', 'When do you play?', 'How does it make you feel?']
                    },
                    {
                        basic: 'I watch movies.',
                        topic: 'movies',
                        hints: ['What kind of movies?', 'When/where do you watch?', 'Why do you like them?']
                    },
                    {
                        basic: 'I listen to music.',
                        topic: 'music',
                        hints: ['What genre?', 'When do you listen?', 'How does it affect you?']
                    },
                    {
                        basic: 'I like reading.',
                        topic: 'reading',
                        hints: ['What do you read?', 'When?', 'Why do you enjoy it?']
                    },
                    {
                        basic: 'I have hobbies.',
                        topic: 'hobbies',
                        hints: ['What hobbies?', 'How often?', 'What do you get from them?']
                    },

                    // Daily Activities (5)
                    {
                        basic: 'I enjoy cooking.',
                        topic: 'cooking',
                        hints: ['What do you cook?', 'When do you cook?', 'Why do you enjoy it?']
                    },
                    {
                        basic: 'I exercise regularly.',
                        topic: 'exercise',
                        hints: ['What exercise?', 'Where/when?', 'What benefits?']
                    },
                    {
                        basic: 'I use my phone.',
                        topic: 'phone',
                        hints: ['What for?', 'How often?', 'Is it useful?']
                    },
                    {
                        basic: 'I spend time with friends.',
                        topic: 'friends',
                        hints: ['What do you do together?', 'How often?', 'Why is it important?']
                    },
                    {
                        basic: 'I shop online.',
                        topic: 'shopping',
                        hints: ['What do you buy?', 'How often?', 'Why prefer online?']
                    },

                    // Work & Study (5)
                    {
                        basic: 'I study English.',
                        topic: 'study',
                        hints: ['How?', 'When?', 'Why?']
                    },
                    {
                        basic: 'I like my job.',
                        topic: 'work',
                        hints: ['What job?', 'What do you like about it?', 'How long?']
                    },
                    {
                        basic: 'I learn new things.',
                        topic: 'learning',
                        hints: ['What things?', 'How?', 'Why important?']
                    },
                    {
                        basic: 'I work hard.',
                        topic: 'work ethic',
                        hints: ['How hard?', 'Why?', 'What results?']
                    },
                    {
                        basic: 'I want to improve.',
                        topic: 'improvement',
                        hints: ['Improve what?', 'How?', 'What goals?']
                    },

                    // Places & Travel (5)
                    {
                        basic: 'I like traveling.',
                        topic: 'travel',
                        hints: ['Where?', 'How often?', 'What do you gain?']
                    },
                    {
                        basic: 'I live in a city.',
                        topic: 'city',
                        hints: ['Which city?', 'What\'s it like?', 'Do you like it?']
                    },
                    {
                        basic: 'I visit parks.',
                        topic: 'parks',
                        hints: ['Which parks?', 'When?', 'What do you do there?']
                    },
                    {
                        basic: 'My hometown is nice.',
                        topic: 'hometown',
                        hints: ['Where is it?', 'What makes it nice?', 'Do you miss it?']
                    },
                    {
                        basic: 'I like nature.',
                        topic: 'nature',
                        hints: ['What aspects?', 'Where do you experience it?', 'How does it make you feel?']
                    },

                    // Technology & Modern Life (5)
                    {
                        basic: 'I use social media.',
                        topic: 'social media',
                        hints: ['Which platforms?', 'What for?', 'How much time?']
                    },
                    {
                        basic: 'Technology is important.',
                        topic: 'technology',
                        hints: ['How is it important?', 'Examples?', 'Impact on your life?']
                    },
                    {
                        basic: 'I watch videos online.',
                        topic: 'online videos',
                        hints: ['What videos?', 'How often?', 'Why?']
                    },
                    {
                        basic: 'I play video games.',
                        topic: 'gaming',
                        hints: ['What games?', 'When?', 'Why enjoyable?']
                    },
                    {
                        basic: 'I prefer digital books.',
                        topic: 'e-books',
                        hints: ['Why prefer digital?', 'What device?', 'What advantages?']
                    }
                ],
                aiPromptTemplate: `The student learned to transform simple sentences by:
1. Upgrading verbs (like → enjoy/love/am into)
2. Adding WHAT specifically
3. Adding WHEN or WHERE
4. Adding WHY or HOW they feel

Basic sentence: {{basicSentence}}
Student's improved version: {{studentResponse}}

As an IELTS teacher, provide:
📊 Band Level: [5.0-8.0] with brief reason
✓ Strengths: What they did well (be specific)
→ One Improvement: Specific suggestion for next band level
✏️ Enhanced Version: Show improved sentence
📚 Why Better: Brief explanation

Be encouraging and specific. Keep it concise.`
            },
            {
                id: 'm3_realtime',
                type: 'interactive_builder',
                title: 'Interactive Sentence Builder',
                description: 'Build sentences step-by-step with real-time AI coaching',
                template: {
                    step1: 'Choose your main verb',
                    step2: 'Add specific details (WHAT)',
                    step3: 'Add WHEN or WHERE',
                    step4: 'Add WHY or HOW you feel'
                }
            },
            {
                id: 'm3_practice2',
                type: 'ai_conversation',
                title: 'Practice with AI Teacher',
                instructions: 'The AI teacher will ask you Part 1 questions. Respond using the techniques you learned.',
                conversationSettings: {
                    numberOfQuestions: 4,
                    focusArea: 'sentence_building',
                    feedbackStyle: 'encouraging_specific'
                },
                aiSystemPrompt: `You are an IELTS speaking teacher practicing with a student who just learned:
1. The 5W1H method for generating ideas
2. The sentence transformation technique (add detail, when/where, why/how)
3. Using connectors naturally

Conduct a mini Part 1 interview:
- Ask 4 common IELTS Part 1 questions
- After each response, give BRIEF feedback (1-2 sentences)
- Highlight what they did well
- Suggest one small improvement if needed
- Then ask the next question naturally

Be warm, encouraging, and specific. Keep feedback concise.`
            }
        ]
    },

    // Module 4: Mastering Part 2 (Cue Card)
    module4: {
        id: 'module4',
        title: 'Mastering Part 2: The Cue Card',
        duration: 30,
        description: 'Learn how to speak for 2 minutes confidently on any topic',

        sections: [
            {
                id: 'm4_intro',
                type: 'audio_lesson',
                title: 'Understanding Part 2',
                audioScript: {
                    text: `Part 2 is different from Part 1. The examiner gives you a topic card with four bullet points. You have one minute to prepare, then you must speak for up to two minutes. Many students find this challenging because two minutes feels like a long time! But with the right strategy, you'll find two minutes passes quickly. The key is having a clear structure in your mind. In this module, I'll teach you exactly how to use that one-minute preparation time, how to organize your thoughts, and how to keep speaking naturally for two minutes without running out of ideas. Let's start with the preparation strategy.`,
                    duration: 45
                }
            },
            {
                id: 'm4_prep_strategy',
                type: 'audio_lesson',
                title: 'The One-Minute Preparation Strategy',
                audioScript: {
                    text: `You have one minute to prepare and you can make notes. Here's exactly what to do in those 60 seconds. Spend 10 seconds reading the topic carefully and understanding all four bullet points. Spend 30 seconds making quick notes for each bullet point - just keywords, not full sentences. Spend 10 seconds deciding your opening and conclusion. And keep 10 seconds to take a breath and feel ready. Let me show you an example. Topic: Describe a person who influenced you. Bullet points: who, how you know them, what they did, why important. My notes might look like: "Mrs. Chen - high school teacher - encouraged reading - opened new world - grateful." Just keywords! Don't write sentences. These keywords will trigger your memory when you speak. The mistake students make is trying to write too much. You don't have time, and you don't need to. Keywords are enough.`,
                    duration: 65
                },
                content: {
                    timeBreakdown: {
                        reading: '10 seconds - Read and understand',
                        notes: '30 seconds - Keyword notes for each point',
                        structure: '10 seconds - Plan opening/closing',
                        prepare: '10 seconds - Mental preparation'
                    },
                    exampleNotes: {
                        topic: 'Describe a person who influenced you',
                        notes: ['Mrs. Chen', 'high school English', 'encouraged reading', 'recommended books', 'opened new perspectives', 'grateful, inspired']
                    }
                }
            },
            {
                id: 'm4_structure',
                type: 'audio_lesson',
                title: 'The 2-Minute Structure',
                audioScript: {
                    text: `Here's a reliable structure for your two-minute response. Spend about 15 seconds on a brief introduction - state what you'll talk about. Then spend about 20-30 seconds on each of the four bullet points from the card. That's roughly two minutes total. For each bullet point, give specific details and examples. Don't just say "She was kind" - say "She was incredibly kind; for example, she would stay after class to help students who were struggling." The more specific you are, the easier it is to fill two minutes. Finally, end with a brief conclusion if you have time - maybe 10 seconds summarizing why this topic is meaningful to you. Remember, if you finish before two minutes, that's okay! The examiner might ask a follow-up question. The goal is to speak naturally and confidently, not to hit exactly 120 seconds. Quality matters more than hitting a specific time.`,
                    duration: 60
                },
                content: {
                    structure: [
                        { section: 'Introduction', time: '15 seconds', tip: 'State your topic clearly' },
                        { section: 'Point 1', time: '20-30 seconds', tip: 'Give specific details and examples' },
                        { section: 'Point 2', time: '20-30 seconds', tip: 'Use connectors to link ideas' },
                        { section: 'Point 3', time: '20-30 seconds', tip: 'Add personal feelings/reactions' },
                        { section: 'Point 4', time: '20-30 seconds', tip: 'Explain significance/impact' },
                        { section: 'Conclusion (optional)', time: '10 seconds', tip: 'Brief summary or reflection' }
                    ]
                }
            },
            {
                id: 'm4_demo',
                type: 'audio_lesson',
                title: 'Full Demonstration',
                audioScript: {
                    text: `Let me demonstrate a complete Part 2 response. The topic is: Describe a place you like to visit. You should say: where it is, how often you go there, what you do there, and why you like it. I'll speak for about two minutes. Here we go: "I'd like to talk about a small café near my home that I visit quite regularly. It's located just a ten-minute walk from where I live, tucked away on a quiet side street. I try to go there at least once or twice a week, usually on weekend mornings when I have more free time. What I really enjoy about this place is the peaceful atmosphere. When I'm there, I usually bring a book or my laptop, order a cappuccino, and spend a couple of hours either reading or working on personal projects. The café has large windows that let in natural light, and they play soft jazz music in the background, which helps me concentrate. The staff are really friendly too, and they remember my usual order, which makes me feel welcome. The reason I like this café so much is that it's become my go-to place when I need to escape from the busy pace of life. Unlike working at home where I can get distracted, or going to a crowded coffee chain, this café strikes the perfect balance. It's quiet enough to focus but has enough gentle background activity to keep me motivated. It's become almost like a second home for me, a place where I can be productive and relaxed at the same time." Notice how I addressed all four points with specific details, and I spoke naturally without rushing. That was about two minutes.`,
                    duration: 95
                },
                transcript: `I'd like to talk about a small café near my home that I visit quite regularly. It's located just a ten-minute walk from where I live, tucked away on a quiet side street. I try to go there at least once or twice a week, usually on weekend mornings when I have more free time.

What I really enjoy about this place is the peaceful atmosphere. When I'm there, I usually bring a book or my laptop, order a cappuccino, and spend a couple of hours either reading or working on personal projects. The café has large windows that let in natural light, and they play soft jazz music in the background, which helps me concentrate. The staff are really friendly too, and they remember my usual order, which makes me feel welcome.

The reason I like this café so much is that it's become my go-to place when I need to escape from the busy pace of life. Unlike working at home where I can get distracted, or going to a crowded coffee chain, this café strikes the perfect balance. It's quiet enough to focus but has enough gentle background activity to keep me motivated. It's become almost like a second home for me, a place where I can be productive and relaxed at the same time.`
            },
            {
                id: 'm4_practice1',
                type: 'ai_practice',
                title: 'Practice: Making Notes',
                instructions: 'You have 1 minute to make notes for this topic. Type your keyword notes, then the AI will give feedback.',
                cueCard: {
                    topic: 'Describe a skill you would like to learn',
                    points: [
                        'What the skill is',
                        'Why you want to learn it',
                        'How you would learn it',
                        'And explain how learning this skill would benefit you'
                    ]
                },
                timerDuration: 60,
                aiPromptTemplate: `The student practiced making keyword notes for a Part 2 cue card (1-minute prep time).

Cue card topic: {{topic}}
Four points: {{points}}
Student's notes: {{studentNotes}}

As their teacher:
1. Check if they have notes for all four points
2. Evaluate if notes are appropriate (keywords, not full sentences)
3. Suggest if any notes could be more specific
4. Praise what they did well

Keep feedback brief and constructive.`
            },
            {
                id: 'm4_practice2',
                type: 'ai_practice',
                title: 'Practice: Full Response',
                instructions: 'Now speak/type your full 2-minute response based on your notes. The AI will analyze your structure and content.',
                practiceMode: 'full_response',
                cueCards: [
                    {
                        topic: 'Describe a memorable journey you have made',
                        points: ['Where you went', 'Who you went with', 'What you did during the journey', 'Why it was memorable']
                    },
                    {
                        topic: 'Describe a hobby you had as a child',
                        points: ['What the hobby was', 'When you started it', 'How often you did it', 'Why you enjoyed it']
                    }
                ],
                aiPromptTemplate: `Student learned the Part 2 structure: brief intro, 20-30s per bullet point, specific details, optional conclusion.

Their response: {{studentResponse}}

Analyze and provide:
1. Estimated speaking time (word count ÷ 150 words/min)
2. Did they address all four points?
3. Band estimate (6.0-8.0) based on structure, detail, coherence
4. One strength and one improvement suggestion
5. Specific example of how to improve one section

Be constructive and encouraging.`
            }
        ]
    },

    // Module 5: Part 3 Discussion Skills
    module5: {
        id: 'module5',
        title: 'Part 3: Discussion Skills',
        duration: 25,
        description: 'Master abstract questions and give sophisticated answers',

        sections: [
            {
                id: 'm5_intro',
                type: 'audio_lesson',
                title: 'Understanding Part 3',
                audioScript: {
                    text: `Part 3 is the most challenging section because the questions become more abstract and complex. The examiner asks about broader issues related to your Part 2 topic. For example, if you talked about a teacher who influenced you, Part 3 might ask: "Do you think teachers or parents have more influence on children?" These questions require you to discuss ideas, give opinions, and explain reasons in more depth. But don't worry - you've already learned the fundamental skills you need. In Part 3, we'll build on your idea generation and sentence building skills, and add strategies for handling abstract topics, giving balanced viewpoints, and sounding sophisticated without using complicated vocabulary. Let's begin.`,
                    duration: 50
                }
            },
            {
                id: 'm5_strategies',
                type: 'audio_lesson',
                title: 'Answer Strategies for Part 3',
                audioScript: {
                    text: `Here are three powerful strategies for Part 3 questions. Strategy One: The Direct Answer Plus. Start with a direct answer to the question, then expand with reasons and examples. For instance: "Do teachers have more influence than parents?" Answer: "I think both play crucial roles, but parents probably have more lasting influence." Then explain why. Strategy Two: The Two-Sides Approach. For comparison questions, discuss both sides before giving your opinion. "On one hand, teachers provide academic knowledge. On the other hand, parents shape core values. Personally, I believe..." This shows balanced thinking. Strategy Three: The Past-Present-Future method. For questions about changes or trends, structure your answer across time. "In the past, families were larger. Nowadays, many couples have fewer children. In the future, this trend will likely continue because..." These three strategies will help you organize your thoughts quickly and speak coherently for the longer answers Part 3 requires.`,
                    duration: 70
                },
                content: {
                    strategies: [
                        {
                            name: 'Direct Answer Plus',
                            structure: 'Direct answer → Reason 1 → Example 1 → Reason 2 → Example 2',
                            example: 'Question: Is technology making us less social?\nAnswer: I don\'t think so. While some people spend a lot of time online, technology actually helps us stay connected with distant friends and family. For example, I video call my grandmother weekly, which wouldn\'t be possible otherwise.'
                        },
                        {
                            name: 'Two-Sides Approach',
                            structure: 'On one hand... → On the other hand... → Personally, I think...',
                            example: 'Question: Should universities be free?\nAnswer: On one hand, free education would give everyone equal opportunities. On the other hand, universities need funding for quality programs. Personally, I think a mixed system works best, where talented students get scholarships but others contribute based on their means.'
                        },
                        {
                            name: 'Past-Present-Future',
                            structure: 'In the past... → Nowadays/Currently... → In the future...',
                            example: 'Question: How has technology changed education?\nAnswer: In the past, students relied entirely on textbooks and teachers. Nowadays, they can access online courses and resources from anywhere. In the future, I think AI will personalize learning even more, adapting to each student\'s pace.'
                        }
                    ]
                }
            },
            {
                id: 'm5_language',
                type: 'audio_lesson',
                title: 'Language for Abstract Discussions',
                audioScript: {
                    text: `Part 3 requires slightly more sophisticated language, but you don't need fancy vocabulary - you need clear expressions for discussing ideas. For giving opinions, use: "I believe," "I think," "In my opinion," "From my perspective," "It seems to me that." For adding nuance, use: "to some extent," "generally speaking," "in most cases," "it depends on." For contrasting: "whereas," "while," "although," "despite the fact that." For showing cause and effect: "As a result," "Consequently," "This leads to," "Due to this." And for speculating about possibilities: "might," "could," "it's possible that," "there's a chance that." Practice using these expressions naturally, and you'll sound more sophisticated without memorizing complex vocabulary. The key is clarity and coherence, not complicated words.`,
                    duration: 60
                },
                content: {
                    languageFunctions: {
                        opinion: ['I believe', 'I think', 'In my opinion', 'From my perspective', 'It seems to me that', 'I would say that'],
                        nuance: ['to some extent', 'generally speaking', 'in most cases', 'it depends on', 'to a certain degree'],
                        contrast: ['whereas', 'while', 'although', 'despite', 'however', 'on the contrary'],
                        causeEffect: ['as a result', 'consequently', 'therefore', 'this leads to', 'due to', 'because of this'],
                        speculation: ['might', 'could', 'may', 'it\'s possible that', 'perhaps', 'there\'s a chance that']
                    }
                }
            },
            {
                id: 'm5_practice1',
                type: 'ai_practice',
                title: 'Strategy Practice',
                instructions: 'Answer this Part 3 question using one of the three strategies. The AI will identify which strategy you used and give feedback.',
                questions: [
                    'Do you think children today have better educational opportunities than previous generations?',
                    'Should governments spend more money on arts or sports?',
                    'How has social media affected the way people communicate?'
                ],
                aiPromptTemplate: `Student learned three Part 3 strategies:
1. Direct Answer Plus (answer → reasons → examples)
2. Two-Sides Approach (one hand → other hand → personal view)
3. Past-Present-Future (temporal structure)

Question: {{question}}
Student's answer: {{studentResponse}}

Analyze:
1. Which strategy did they use (or attempt)?
2. Did they execute it well?
3. Band estimate (6.0-8.0)
4. One specific improvement
5. Example of enhanced phrasing for one part

Be specific and encouraging.`
            },
            {
                id: 'm5_practice2',
                type: 'ai_conversation',
                title: 'Part 3 Simulation',
                instructions: 'Practice a full Part 3 discussion with the AI examiner. Try to use the strategies and language you learned.',
                conversationSettings: {
                    numberOfQuestions: 5,
                    difficulty: 'progressive',
                    feedbackTiming: 'after_all_questions'
                },
                aiSystemPrompt: `You are an IELTS examiner conducting Part 3. The student just learned:
1. Three answer strategies (Direct Answer Plus, Two-Sides, Past-Present-Future)
2. Sophisticated expressions for opinions, contrast, cause-effect, speculation

Conduct Part 3:
- Ask 5 progressively more abstract questions
- Questions should relate to education, technology, society, or culture
- Let the student answer without interruption
- After all 5 questions, provide comprehensive feedback:
  * Overall band estimate (6.0-8.0)
  * Strengths (2-3 points)
  * Areas for improvement (2-3 points)
  * Specific examples from their responses
  * Actionable tips

During questions: Just ask, don't give feedback yet.
After all questions: Give detailed, constructive feedback.`
            },
            {
                id: 'm5_advanced',
                type: 'ai_practice',
                title: 'Advanced Challenge',
                instructions: 'Handle difficult Part 3 questions that students often struggle with. The AI will help you improve your response.',
                challengeQuestions: [
                    'What role should tradition play in modern society?',
                    'Do you think economic growth is always beneficial for a country?',
                    'How can societies balance individual freedom with collective responsibility?',
                    'Is it more important for a country to focus on current problems or future development?'
                ],
                aiPromptTemplate: `This is an advanced Part 3 question requiring sophisticated thinking.

Question: {{question}}
Student's answer: {{studentResponse}}

Provide detailed feedback:
1. Content: Did they address the question thoughtfully?
2. Structure: Was their answer well-organized?
3. Language: Did they use appropriate expressions?
4. Band estimate with justification
5. Specific suggestions for improvement
6. A model response showing how to enhance their answer

Be thorough and constructive. Show them how to elevate their response.`
            }
        ]
    }
};

// Lesson progress management
class LessonProgress {
    constructor() {
        this.storageKey = LESSON_CONSTANTS.STORAGE_KEY;
        this.progress = this.load();
    }

    load() {
        const saved = localStorage.getItem(this.storageKey);
        return saved ? JSON.parse(saved) : {
            completedSections: [],
            moduleProgress: {},
            practiceScores: {},
            totalTimeSpent: 0,
            lastAccessed: null
        };
    }

    save() {
        localStorage.setItem(this.storageKey, JSON.stringify(this.progress));
    }

    markSectionComplete(moduleId, sectionId) {
        const key = `${moduleId}_${sectionId}`;
        if (!this.progress.completedSections.includes(key)) {
            this.progress.completedSections.push(key);
        }
        this.updateModuleProgress(moduleId);
        this.save();
    }

    updateModuleProgress(moduleId) {
        const module = IELTS_LESSONS[moduleId];
        if (!module) return;

        const totalSections = module.sections.length;
        const completedSections = this.progress.completedSections.filter(
            key => key.startsWith(moduleId)
        ).length;

        this.progress.moduleProgress[moduleId] = {
            completed: completedSections,
            total: totalSections,
            percentage: Math.round((completedSections / totalSections) * 100)
        };
    }

    savePracticeScore(sectionId, score) {
        if (!this.progress.practiceScores[sectionId]) {
            this.progress.practiceScores[sectionId] = [];
        }
        this.progress.practiceScores[sectionId].push({
            score,
            timestamp: Date.now()
        });
        this.save();
    }

    isSectionComplete(moduleId, sectionId) {
        return this.progress.completedSections.includes(`${moduleId}_${sectionId}`);
    }

    getModuleProgress(moduleId) {
        return this.progress.moduleProgress[moduleId] || { completed: 0, total: 0, percentage: 0 };
    }

    updateLastAccessed() {
        this.progress.lastAccessed = Date.now();
        this.save();
    }

    reset() {
        localStorage.removeItem(this.storageKey);
        this.progress = this.load();
    }
}

// Initialize progress tracker
if (typeof window !== 'undefined') {
    window.lessonProgress = new LessonProgress();
}
