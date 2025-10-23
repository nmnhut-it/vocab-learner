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
                title: 'Practice More Topics (100 Questions)',
                instructions: 'Try the 5W1H method with different topics. The AI will track your progress. Complete as many as you want!',
                practiceQuestions: [
                    // Hobbies & Interests (5)
                    {
                        question: 'What kind of music do you like?',
                        sampleAnswer: 'I really enjoy listening to jazz music, particularly in the evenings when I want to unwind after a long day. I usually play it at home or during my commute, often by myself while relaxing. The smooth melodies help me feel relaxed and focused because they create a calming atmosphere. What I love most is how jazz makes me feel both peaceful and intellectually engaged.',
                        w5h1: { what: 'jazz music', when: 'in the evenings', where: 'at home or during commute', who: 'by myself', why: 'smooth melodies create calming atmosphere', how: 'feel relaxed, focused, peaceful and engaged' }
                    },
                    {
                        question: 'Do you enjoy watching movies?',
                        sampleAnswer: 'Yes, I absolutely love watching movies, especially thriller and sci-fi films. I typically watch them on weekends at home with my family, though occasionally I go to the cinema for big releases. Movies help me escape from daily stress because the immersive stories take my mind off work. They make me feel entertained and intellectually stimulated by thought-provoking themes.',
                        w5h1: { what: 'thriller and sci-fi films', when: 'on weekends', where: 'at home / cinema', who: 'with my family', why: 'escape stress, immersive stories', how: 'feel entertained and intellectually stimulated' }
                    },
                    {
                        question: 'What do you like to do on weekends?',
                        sampleAnswer: 'On weekends, I usually spend time exploring new cafés and restaurants around the city with my friends. We typically go out on Saturday afternoons because it gives us a chance to relax and catch up after a busy week. I enjoy trying different cuisines, which makes me feel adventurous and socially connected, and these outings are both fun and interesting.',
                        w5h1: { what: 'exploring new cafés and restaurants', when: 'Saturday afternoons', where: 'around the city', who: 'with my friends', why: 'relax and catch up after busy week', how: 'feel adventurous and socially connected' }
                    },
                    {
                        question: 'Do you have any hobbies?',
                        sampleAnswer: 'Yes, I\'m really into photography, which I\'ve been practicing for about three years now. I usually take photos during my travels or on weekends around my neighborhood, often by myself when I need creative time. Photography helps me see the world differently and capture meaningful moments because it trains my eye for detail. It makes me feel creative and fulfilled.',
                        w5h1: { what: 'photography', when: 'during travels or weekends', where: 'around my neighborhood', who: 'by myself', why: 'see world differently, trains eye for detail', how: 'feel creative and fulfilled' }
                    },
                    {
                        question: 'What do you do in your free time?',
                        sampleAnswer: 'In my free time, I enjoy reading mystery novels and playing tennis. I usually read alone before bed at home, and I play tennis twice a week at a local court with some friends. Reading helps me relax because it takes my mind off daily worries, while tennis keeps me physically active. Both make me feel balanced and energized.',
                        w5h1: { what: 'reading mystery novels and playing tennis', when: 'before bed / twice a week', where: 'at home / local court', who: 'alone / with friends', why: 'relax mind, stay physically active', how: 'feel balanced and energized' }
                    },

                    // Daily Life (5)
                    {
                        question: 'Do you prefer studying alone or with others?',
                        sampleAnswer: 'I generally prefer studying alone, especially when I need to focus on complex material. I usually study in my room or at the library during evenings or weekends. However, I do study with classmates sometimes when we have group projects because quiet environments help me concentrate better while collaboration brings different perspectives. Studying this way makes me feel focused and productive.',
                        w5h1: { what: 'studying alone', when: 'evenings or weekends', where: 'in my room or at library', who: 'alone / sometimes with classmates', why: 'quiet helps concentration, collaboration brings perspectives', how: 'feel focused and productive' }
                    },
                    {
                        question: 'What time do you usually wake up?',
                        sampleAnswer: 'I typically wake up around 6:30 AM on weekdays in my bedroom, usually by myself with an alarm clock. I do this so I have enough time to prepare for work and avoid the morning rush. On weekends, I sleep in until about 8 or 9 AM because I like to catch up on rest. Waking up early during the week makes me feel more energized and productive throughout the day.',
                        w5h1: { what: 'waking up', when: '6:30 AM weekdays / 8-9 AM weekends', where: 'in my bedroom', who: 'by myself', why: 'prepare for work, avoid rush / catch up on rest', how: 'feel energized and productive' }
                    },
                    {
                        question: 'How do you usually spend your evenings?',
                        sampleAnswer: 'Most evenings, I spend time at home either cooking dinner or watching series on Netflix to relax, usually by myself or sometimes with my partner. I usually finish work around 6 PM, so my evenings from 7-10 PM are when I can unwind and do things I enjoy. Sometimes I also call friends or family to catch up because staying connected is important to me. These activities make me feel relaxed and content.',
                        w5h1: { what: 'cooking dinner or watching Netflix', when: '7-10 PM after work', where: 'at home', who: 'by myself / sometimes with partner', why: 'unwind and stay connected', how: 'feel relaxed and content' }
                    },
                    {
                        question: 'Do you prefer eating at home or at restaurants?',
                        sampleAnswer: 'I prefer eating at home most of the time, especially during weekdays when I cook alone or with my partner in my kitchen. I usually cook simple meals like pasta or stir-fries because it\'s healthier and more economical. However, I do enjoy going to restaurants on weekends with friends or family as it\'s a nice way to socialize and try new dishes. Home cooking makes me feel healthy and accomplished, while dining out makes me feel social and adventurous.',
                        w5h1: { what: 'eating at home / sometimes restaurants', when: 'weekdays / weekends', where: 'my kitchen / restaurants', who: 'alone, with partner / friends or family', why: 'healthier, economical / socialize and try new dishes', how: 'feel healthy and accomplished / social and adventurous' }
                    },
                    {
                        question: 'What do you usually do after work/school?',
                        sampleAnswer: 'After work, I usually go for a quick walk or jog by myself to clear my mind and get some exercise. This typically takes about 30 minutes around 6:30 PM, and I do it in a nearby park because the fresh air helps me decompress from work stress. After that, I head home to prepare dinner and spend the rest of the evening relaxing. This routine makes me feel refreshed and balanced.',
                        w5h1: { what: 'walk or jog', when: 'around 6:30 PM, takes 30 minutes', where: 'nearby park', who: 'by myself', why: 'clear mind, decompress from work stress', how: 'feel refreshed and balanced' }
                    },

                    // Activities & Sports (5)
                    {
                        question: 'Do you like playing sports?',
                        sampleAnswer: 'Yes, I really enjoy playing badminton, which I usually do twice a week at a community sports center with friends from university. We typically play on Tuesday and Thursday evenings because those times work for everyone\'s schedule. Sports help me stay fit and are a great way to socialize, which is why I find them so enjoyable and energizing.',
                        w5h1: { what: 'playing badminton', when: 'twice a week, Tuesday and Thursday evenings', where: 'community sports center', who: 'with friends from university', why: 'stay fit and socialize', how: 'feel enjoyable and energizing' }
                    },
                    {
                        question: 'Do you enjoy outdoor activities?',
                        sampleAnswer: 'Absolutely! I love hiking in the mountains with a group of friends, especially during spring and autumn when the weather is perfect. We usually go on weekends because that\'s when everyone is free and we can take longer trails. Being outdoors helps me disconnect from technology and appreciate nature because the fresh air and scenery clear my mind. It makes me feel refreshed and peaceful.',
                        w5h1: { what: 'hiking in the mountains', when: 'spring and autumn weekends', where: 'in the mountains', who: 'with a group of friends', why: 'disconnect from technology, fresh air clears mind', how: 'feel refreshed and peaceful' }
                    },
                    {
                        question: 'Have you ever tried swimming?',
                        sampleAnswer: 'Yes, I learned to swim when I was about seven years old, and I still swim occasionally at a local pool. I usually go swimming during summer afternoons, often by myself or sometimes with family members. It\'s a great way to cool down and stay active because the water provides resistance without joint stress. Swimming makes me feel energized and physically light.',
                        w5h1: { what: 'swimming', when: 'summer afternoons', where: 'at a local pool', who: 'by myself / sometimes with family', why: 'cool down, water provides resistance without joint stress', how: 'feel energized and physically light' }
                    },
                    {
                        question: 'Do you like going to the gym?',
                        sampleAnswer: 'Yes, I try to go to the gym three times a week, usually in the evenings after work around 7 PM. I go to the gym near my house, typically by myself so I can focus on my routine. I mainly focus on cardio and weight training because they help me maintain my fitness and reduce stress. Regular exercise makes me feel accomplished and energized.',
                        w5h1: { what: 'going to gym for cardio and weight training', when: 'three times weekly, evenings around 7 PM', where: 'gym near my house', who: 'by myself', why: 'maintain fitness and reduce stress', how: 'feel accomplished and energized' }
                    },
                    {
                        question: 'What kind of exercise do you do?',
                        sampleAnswer: 'I mainly do jogging and yoga to stay healthy. I jog in the park near my home early in the morning about four times a week, usually by myself, and I practice yoga at home on other days. I do this because jogging helps me build endurance while yoga improves my flexibility and mental clarity. Together they make me feel balanced and strong.',
                        w5h1: { what: 'jogging and yoga', when: 'jogging 4x weekly early morning / yoga other days', where: 'park near home / at home', who: 'by myself', why: 'build endurance, improve flexibility and mental clarity', how: 'feel balanced and strong' }
                    },

                    // Technology & Media (5)
                    {
                        question: 'Do you use social media?',
                        sampleAnswer: 'Yes, I use social media daily, mainly Instagram and Facebook to stay connected with friends and family. I usually check them during breaks at work or in the evening when I\'m relaxing at home. Social media helps me keep up with what\'s happening in my friends\' lives, though I try not to spend too much time on it because excessive use can feel draining.',
                        w5h1: { what: 'using Instagram and Facebook', when: 'daily, during breaks and evenings', where: 'at work and at home', who: 'by myself to connect with friends and family', why: 'stay connected and keep up with friends\' lives', how: 'feel connected though can be draining if excessive' }
                    },
                    {
                        question: 'What do you use your phone for most?',
                        sampleAnswer: 'I mainly use my phone for messaging and checking emails, especially for work-related communications with colleagues and clients. I also use it for navigation when I\'m driving and for listening to music during my daily commute to work. My phone has become essential for staying organized and connected throughout the day, which makes me feel more productive and in control.',
                        w5h1: { what: 'messaging, checking emails, navigation, and listening to music', when: 'throughout the day, during commute', where: 'at work, while driving, and on the go', who: 'by myself, communicating with colleagues and clients', why: 'stay organized and connected for work and personal needs', how: 'feel productive and in control' }
                    },
                    {
                        question: 'Do you like watching TV shows?',
                        sampleAnswer: 'Yes, I enjoy watching TV shows, particularly crime dramas and documentaries. I usually watch them by myself in the evenings after dinner at home as a way to unwind before bed. Streaming services like Netflix make it convenient because I can watch episodes at my own pace without waiting for weekly releases, which feels relaxing and entertaining.',
                        w5h1: { what: 'watching crime dramas and documentaries', when: 'evenings after dinner', where: 'at home', who: 'by myself', why: 'unwind before bed and enjoy entertainment', how: 'feel relaxed and entertained' }
                    },
                    {
                        question: 'Do you prefer online shopping or in-store shopping?',
                        sampleAnswer: 'I prefer online shopping for most things because it\'s more convenient and saves time. I usually shop online by myself during weekends when I have time to browse different websites from home and compare prices. However, for clothes and shoes, I still prefer shopping in physical stores because I like to try them on before buying, which makes me feel more confident about my purchases.',
                        w5h1: { what: 'online shopping for most items, in-store for clothes and shoes', when: 'weekends', where: 'at home for online, physical stores for clothing', who: 'by myself', why: 'convenience and time-saving for most items, need to try on clothing', how: 'feel efficient online, more confident trying on in-store' }
                    },
                    {
                        question: 'How often do you use the internet?',
                        sampleAnswer: 'I use the internet constantly throughout the day, both at my office and at home, usually by myself for work and personal purposes. At work, I need it for research and communication with colleagues, and at home, I use it for entertainment and staying informed about current events. I probably spend around 6-8 hours online daily, which is quite typical these days and keeps me feeling connected and informed.',
                        w5h1: { what: 'using internet for work, research, communication, entertainment', when: 'constantly throughout the day, 6-8 hours daily', where: 'at office and at home', who: 'by myself, communicating with colleagues', why: 'work needs, entertainment, and staying informed', how: 'feel connected and informed' }
                    },

                    // People & Relationships (5)
                    {
                        question: 'Do you spend a lot of time with your family?',
                        sampleAnswer: 'Yes, I try to spend quality time with my family, especially on weekends when everyone is free. We usually have dinner together at home or our parents\' place, and sometimes go out for activities like hiking or watching movies at local cinemas. Family time is important to me because it helps us stay connected despite our busy schedules, which makes me feel grounded and supported.',
                        w5h1: { what: 'spending quality time having dinner and activities', when: 'weekends', where: 'at home, parents\' place, or local venues', who: 'with my family', why: 'stay connected despite busy schedules', how: 'feel grounded and supported' }
                    },
                    {
                        question: 'Do you have many friends?',
                        sampleAnswer: 'I have a small but close group of friends whom I\'ve known for several years. We usually meet up once or twice a month at restaurants or cafés in the city for dinner or coffee to catch up. I prefer having a few close friends rather than many acquaintances because deeper friendships are more meaningful to me and make me feel truly understood and valued.',
                        w5h1: { what: 'maintaining close friendships', when: 'once or twice a month', where: 'restaurants or cafés in the city', who: 'with a small group of close friends', why: 'deeper friendships are more meaningful', how: 'feel understood and valued' }
                    },
                    {
                        question: 'Do you like meeting new people?',
                        sampleAnswer: 'Yes, I generally enjoy meeting new people, especially in professional or social settings like conferences or parties. I usually meet new people through work events at various venues or through mutual friends at gatherings. Meeting new people helps me learn different perspectives and expand my network, which I find both interesting and valuable, making me feel more connected to the world.',
                        w5h1: { what: 'meeting new people', when: 'regularly through events and gatherings', where: 'work events, conferences, social gatherings', who: 'with colleagues, mutual friends, and new acquaintances', why: 'learn different perspectives and expand network', how: 'feel interested, valued, and connected to the world' }
                    },
                    {
                        question: 'Do you keep in touch with childhood friends?',
                        sampleAnswer: 'Yes, I\'m still in contact with two of my closest childhood friends, though we don\'t see each other as often as before. We usually chat online or meet up in person a few times a year at cafés or restaurants in our hometown when everyone is available. It\'s nice to maintain these friendships because we share so many memories from growing up together, which makes me feel nostalgic and grateful.',
                        w5h1: { what: 'keeping in touch with childhood friends', when: 'chat online regularly, meet a few times a year', where: 'online and at cafés or restaurants in hometown', who: 'with two closest childhood friends', why: 'share many memories from growing up together', how: 'feel nostalgic and grateful' }
                    },
                    {
                        question: 'Do you prefer spending time alone or with others?',
                        sampleAnswer: 'It really depends on my mood and energy levels. I enjoy spending time with friends and family on weekends at various places like restaurants, parks, or homes because it\'s fun and energizing. However, I also value alone time during weekdays at home to recharge and focus on personal activities like reading or hobbies, which makes me feel peaceful and balanced.',
                        w5h1: { what: 'balancing social time and alone time', when: 'with others on weekends, alone on weekdays', where: 'restaurants, parks, homes for social / home for alone time', who: 'with friends and family / by myself', why: 'social time is fun and energizing, alone time helps recharge', how: 'feel energized with others, peaceful and balanced alone' }
                    },

                    // Learning & Work (5)
                    {
                        question: 'What do you find most interesting about your studies?',
                        sampleAnswer: 'I find the practical applications of what I learn most interesting, especially when we work on real-world projects at university with my classmates. In my business course, we analyze actual companies and their strategies in class and during group sessions, which makes the learning much more engaging. This hands-on approach helps me understand how theories work in practice and makes me feel motivated and intellectually stimulated.',
                        w5h1: { what: 'practical applications and real-world projects in business course', when: 'during class and group sessions', where: 'at university', who: 'with classmates', why: 'understand how theories work in practice', how: 'feel motivated and intellectually stimulated' }
                    },
                    {
                        question: 'Do you enjoy learning new things?',
                        sampleAnswer: 'Absolutely! I love learning new things, especially skills that I can apply in my daily life or career. Recently, I\'ve been learning graphic design by myself through online courses at home during my free time in the evenings. Learning keeps my mind active and helps me stay curious about the world around me, which makes me feel accomplished and energized.',
                        w5h1: { what: 'learning graphic design and new skills', when: 'free time in the evenings', where: 'at home through online courses', who: 'by myself', why: 'apply skills in daily life and career, stay curious', how: 'feel accomplished and energized' }
                    },
                    {
                        question: 'What was your favorite subject at school?',
                        sampleAnswer: 'My favorite subject was history because I found it fascinating to learn about how societies developed over time. I particularly enjoyed our teacher\'s storytelling approach in the classroom with my classmates, which made historical events come alive. History classes taught me to think critically about cause and effect, which is useful even now and made me feel intellectually curious and engaged.',
                        w5h1: { what: 'studying history', when: 'during school years', where: 'in the classroom', who: 'with classmates and teacher', why: 'fascinating to learn about societal development and critical thinking', how: 'feel intellectually curious and engaged' }
                    },
                    {
                        question: 'Do you think your job is interesting?',
                        sampleAnswer: 'Yes, I find my job as a marketing coordinator quite interesting because every project is different and challenging. I work with various clients and colleagues across different industries at our office and sometimes at client sites, which means I\'m constantly learning about new products and markets. The creative aspect of developing campaigns keeps the work engaging and never boring, making me feel excited and professionally fulfilled.',
                        w5h1: { what: 'working as marketing coordinator developing campaigns', when: 'throughout work hours on various projects', where: 'at office and client sites', who: 'with colleagues and clients across industries', why: 'every project is different and offers learning opportunities', how: 'feel excited and professionally fulfilled' }
                    },
                    {
                        question: 'Would you like to change your job in the future?',
                        sampleAnswer: 'Eventually, yes. I\'m happy with my current position at my company, but I\'d like to move into a management role in the next few years where I can lead projects and mentor others in an office setting. I believe gaining more experience now will prepare me for those responsibilities, so I\'m focused on developing my skills, which makes me feel ambitious and purposeful.',
                        w5h1: { what: 'moving into a management role', when: 'in the next few years', where: 'at a company office', who: 'leading and mentoring others', why: 'gain leadership experience and mentor people', how: 'feel ambitious and purposeful' }
                    },

                    // Places & Travel (5)
                    {
                        question: 'Do you like traveling to new places?',
                        sampleAnswer: 'Yes, I absolutely love traveling to new places whenever I get the chance. I usually take one or two trips a year with friends or family, either to explore different cities in my country or to visit neighboring countries. Traveling broadens my perspective and allows me to experience different cultures and cuisines, which makes me feel adventurous and enriched.',
                        w5h1: { what: 'traveling to different cities and countries', when: 'one or two trips a year', where: 'different cities in my country and neighboring countries', who: 'with friends or family', why: 'broaden perspective and experience different cultures', how: 'feel adventurous and enriched' }
                    },
                    {
                        question: 'What is your hometown like?',
                        sampleAnswer: 'My hometown is a medium-sized coastal city with a relaxed atmosphere and beautiful beaches along the coast. It has a good mix of modern amenities and historical sites throughout the city, which makes it attractive to both residents and tourists. I really appreciate growing up there with my family because it gave me access to both nature and urban facilities, which made me feel balanced and fortunate.',
                        w5h1: { what: 'living in a coastal city with beaches and urban facilities', when: 'during my childhood and growing up years', where: 'in my hometown coastal city', who: 'with my family', why: 'access to both nature and modern amenities', how: 'feel balanced and fortunate' }
                    },
                    {
                        question: 'Do you prefer the city or the countryside?',
                        sampleAnswer: 'I prefer living in the city by myself because I enjoy having easy access to restaurants, entertainment, and career opportunities at my workplace. However, I do appreciate visiting the countryside on weekends with friends or family for a change of pace and to enjoy the peace and natural scenery. Ideally, I\'d like to live near a city but not right in the center, which would make me feel balanced and content.',
                        w5h1: { what: 'living in the city, visiting countryside', when: 'city living daily, countryside visits on weekends', where: 'in the city near workplace, countryside areas on weekends', who: 'by myself in city, with friends or family in countryside', why: 'city offers opportunities and amenities, countryside offers peace', how: 'feel balanced and content with both options' }
                    },
                    {
                        question: 'Have you ever been abroad?',
                        sampleAnswer: 'Yes, I\'ve been abroad several times with friends or travel companions, mainly to Southeast Asian countries like Thailand and Singapore. I usually travel during my annual vacation because it\'s the best time to take extended trips. Traveling abroad has taught me a lot about different cultures and helped me become more open-minded and adaptable, which makes me feel enlightened and culturally aware.',
                        w5h1: { what: 'traveling to Southeast Asian countries', when: 'during annual vacation', where: 'Thailand, Singapore, and other Southeast Asian countries', who: 'with friends or travel companions', why: 'learn about different cultures and become more open-minded', how: 'feel enlightened and culturally aware' }
                    },
                    {
                        question: 'Where would you like to visit in the future?',
                        sampleAnswer: 'I\'d really love to visit Japan, particularly during cherry blossom season in spring. I\'m fascinated by Japanese culture, especially their blend of traditional values and modern technology. I\'ve been researching the best places to visit in Tokyo and Kyoto by myself at home, and I hope to make this trip happen within the next two years, which makes me feel excited and inspired.',
                        w5h1: { what: 'visiting Japan during cherry blossom season', when: 'spring, within the next two years', where: 'Tokyo and Kyoto, Japan', who: 'planning by myself, likely traveling solo or with companions', why: 'fascinated by Japanese culture and tradition-modern blend', how: 'feel excited and inspired' }
                    },

                    // Food & Cooking (5)
                    {
                        question: 'Do you like cooking?',
                        sampleAnswer: 'Yes, I enjoy cooking by myself, especially on weekends when I have more time to experiment with new recipes at home in my kitchen. I usually cook Italian and Asian dishes because they\'re flavorful and not too complicated. Cooking is relaxing for me, and I find it satisfying to create something delicious from scratch, which makes me feel creative and accomplished.',
                        w5h1: { what: 'cooking Italian and Asian dishes', when: 'weekends', where: 'at home in my kitchen', who: 'by myself', why: 'recipes are flavorful and not too complicated', how: 'feel creative, accomplished, and relaxed' }
                    },
                    {
                        question: 'What is your favorite food?',
                        sampleAnswer: 'My favorite food is definitely sushi because I love the fresh flavors and the variety of options available. I usually have sushi at restaurants with friends or by myself rather than making it at home since it requires specific skills and ingredients. What I particularly enjoy is how sushi can be both simple and sophisticated at the same time, which makes me feel satisfied and appreciative of the culinary art.',
                        w5h1: { what: 'eating sushi', when: 'regularly when dining out', where: 'at restaurants', who: 'with friends or by myself', why: 'love fresh flavors and variety, requires special skills', how: 'feel satisfied and appreciative of culinary art' }
                    },
                    {
                        question: 'Do you often eat out?',
                        sampleAnswer: 'I eat out about two or three times a week with friends or colleagues, usually during weekends or when I\'m too busy to cook after work. I typically go to casual restaurants or cafés near my office or home. Eating out is convenient and also gives me a chance to try different cuisines that I might not cook at home, which makes me feel social and adventurous.',
                        w5h1: { what: 'eating at restaurants and cafés', when: 'two or three times a week, weekends or after work', where: 'casual restaurants or cafés near office or home', who: 'with friends or colleagues', why: 'convenience and trying different cuisines', how: 'feel social and adventurous' }
                    },
                    {
                        question: 'Do you like trying new foods?',
                        sampleAnswer: 'Yes, I\'m quite adventurous when it comes to food and I enjoy trying dishes from different cultures. Whenever I travel to new places or visit a new restaurant with friends or by myself, I usually order something I\'ve never had before. Trying new foods has broadened my palate and made me appreciate how diverse and interesting cuisine can be, which makes me feel curious and open-minded.',
                        w5h1: { what: 'trying dishes from different cultures', when: 'when traveling or visiting new restaurants', where: 'at new restaurants or when traveling', who: 'with friends or by myself', why: 'broaden palate and appreciate diverse cuisine', how: 'feel curious and open-minded' }
                    },
                    {
                        question: 'Can you cook traditional food from your country?',
                        sampleAnswer: 'Yes, I can cook several traditional dishes from my country, which I learned from my mother when I was younger at home in the kitchen. I usually prepare these dishes by myself during special occasions or when I miss home-cooked meals, sometimes sharing them with friends at my place. Cooking traditional food helps me maintain a connection to my cultural roots and it\'s something I enjoy sharing with friends, which makes me feel nostalgic and proud.',
                        w5h1: { what: 'cooking traditional dishes from my country', when: 'during special occasions or when missing home', where: 'at home in my kitchen', who: 'by myself, learned from mother, share with friends', why: 'maintain connection to cultural roots', how: 'feel nostalgic and proud' }
                    },

                    // Weather & Seasons (5)
                    {
                        question: 'What is the weather like in your hometown?',
                        sampleAnswer: 'My hometown has a tropical climate with hot and humid weather throughout most of the year. We have two main seasons there: a rainy season from June to October and a dry season from November to May. The temperature usually stays around 30 degrees Celsius, which can be quite intense during the dry months and makes me feel exhausted sometimes, though I\'ve grown accustomed to it living there with my family.',
                        w5h1: { what: 'tropical climate with rainy and dry seasons', when: 'rainy June-October, dry November-May, year-round', where: 'in my hometown', who: 'experienced by myself and my family living there', why: 'geographical location causes tropical climate', how: 'feel exhausted in intense heat though accustomed to it' }
                    },
                    {
                        question: 'Do you prefer hot or cold weather?',
                        sampleAnswer: 'I prefer mild, cooler weather because I find it more comfortable for outdoor activities. Hot weather can be exhausting and makes me feel lethargic when I\'m outside or at work, while cold weather energizes me. I especially enjoy autumn temperatures around 20-25 degrees Celsius in parks or outdoor spaces, which I think is perfect for both work and leisure and makes me feel refreshed and active.',
                        w5h1: { what: 'preferring mild, cooler weather around 20-25°C', when: 'especially during autumn', where: 'in parks or outdoor spaces', who: 'by myself for work and leisure activities', why: 'more comfortable for activities, cold energizes while hot exhausts', how: 'feel refreshed and active in cool weather, lethargic in hot' }
                    },
                    {
                        question: 'What is your favorite season?',
                        sampleAnswer: 'My favorite season is autumn because the weather is pleasant and the changing colors of the leaves are beautiful. I usually spend more time outdoors during this season by myself or with friends, going for walks in parks or hiking in nearby natural areas. Autumn also brings a sense of coziness that I really enjoy after the heat of summer, which makes me feel peaceful and content.',
                        w5h1: { what: 'enjoying autumn season', when: 'during autumn months', where: 'in parks and hiking areas', who: 'by myself or with friends', why: 'pleasant weather and beautiful changing leaves, cozy atmosphere', how: 'feel peaceful and content' }
                    },
                    {
                        question: 'Does the weather affect your mood?',
                        sampleAnswer: 'Yes, definitely. Sunny weather usually makes me feel more energetic and positive when I\'m at home or going out, while rainy or gloomy days tend to make me feel a bit more subdued. I\'ve noticed that I\'m more productive and motivated to go out to places like parks or cafés when the weather is nice, which is why I appreciate living in a place with generally good weather.',
                        w5h1: { what: 'experiencing weather effects on mood', when: 'daily, depending on weather conditions', where: 'at home, outdoors, parks, cafés', who: 'by myself', why: 'sunny weather energizes, gloomy weather subdues mood', how: 'feel energetic and positive in sun, subdued in rain' }
                    },
                    {
                        question: 'Do you check the weather forecast regularly?',
                        sampleAnswer: 'Yes, I check the weather forecast almost every morning by myself on my phone at home before getting ready for work. This helps me decide what to wear and whether I need to bring an umbrella. I find it particularly useful when planning weekend activities with friends, as I like to know if the weather will be suitable for outdoor plans, which makes me feel prepared and organized.',
                        w5h1: { what: 'checking weather forecast on phone', when: 'every morning before work', where: 'at home', who: 'by myself', why: 'decide what to wear and plan activities', how: 'feel prepared and organized' }
                    },

                    // Shopping & Fashion (5)
                    {
                        question: 'Do you enjoy shopping for clothes?',
                        sampleAnswer: 'I have mixed feelings about clothes shopping. I enjoy it when I find something I really like, but I often find the process time-consuming. I usually shop for clothes by myself two or three times a year at shopping malls or retail stores when the seasons change, and I prefer shopping at stores where I know the style and fit suit me well, which makes me feel satisfied when I find good items though sometimes frustrated by the time it takes.',
                        w5h1: { what: 'shopping for clothes', when: 'two or three times a year when seasons change', where: 'at shopping malls or retail stores', who: 'by myself', why: 'need new clothes for season changes, prefer familiar stores', how: 'feel satisfied when finding good items, sometimes frustrated by time' }
                    },
                    {
                        question: 'What kind of clothes do you usually wear?',
                        sampleAnswer: 'I usually wear casual, comfortable clothes like jeans and t-shirts on weekends at home or when going out, and business casual attire for work at the office. I prefer simple, classic styles in neutral colors because they\'re versatile and easy to match. Comfort is my priority, so I tend to avoid anything too formal or restrictive unless absolutely necessary, which makes me feel comfortable and confident.',
                        w5h1: { what: 'casual clothes on weekends, business casual for work', when: 'daily, varying by occasion', where: 'at home, going out, or at the office', who: 'by myself choosing my style', why: 'versatile, easy to match, prioritize comfort', how: 'feel comfortable and confident' }
                    },
                    {
                        question: 'Do you follow fashion trends?',
                        sampleAnswer: 'Not really. I\'m aware of current trends through social media and magazines, which I check by myself at home, but I don\'t feel the need to follow them closely. I prefer to develop my own personal style that feels authentic to me rather than constantly changing my wardrobe based on what\'s trendy. I think it\'s more sustainable and cost-effective this way, which makes me feel independent and true to myself.',
                        w5h1: { what: 'developing personal style rather than following trends', when: 'ongoing approach to fashion', where: 'checking trends at home via social media', who: 'by myself', why: 'more authentic, sustainable, and cost-effective', how: 'feel independent and true to myself' }
                    },
                    {
                        question: 'Where do you usually buy things?',
                        sampleAnswer: 'I usually buy most things by myself online from home through e-commerce platforms like Amazon or local shopping websites because it\'s convenient and offers better variety. For groceries, I prefer visiting supermarkets near my home once or twice a week. Online shopping saves me time, though I still enjoy browsing physical stores occasionally, especially for electronics or furniture, which makes me feel efficient and in control of my purchases.',
                        w5h1: { what: 'buying online for most items, groceries at supermarkets', when: 'online anytime, groceries once or twice weekly', where: 'at home for online, supermarkets near home, physical stores occasionally', who: 'by myself', why: 'convenience, variety online, prefer seeing groceries and big items', how: 'feel efficient and in control' }
                    },
                    {
                        question: 'Do you prefer shopping alone or with friends?',
                        sampleAnswer: 'I prefer shopping alone by myself at various stores for most things because I can take my time and make decisions without feeling rushed. However, I do enjoy shopping with friends occasionally at malls or shopping districts, especially for special purchases like gifts or when trying new stores. Shopping with others can be more fun and you get helpful second opinions, which makes me feel more confident about purchases when shopping with friends, though more independent when alone.',
                        w5h1: { what: 'shopping for various items', when: 'regularly for routine items, occasionally for special purchases', where: 'at various stores, malls, and shopping districts', who: 'by myself usually, with friends occasionally', why: 'alone allows time to decide, friends provide fun and opinions', how: 'feel independent alone, confident with friends\' opinions' }
                    },

                    // Home & Living (5)
                    {
                        question: 'Do you live in a house or an apartment?',
                        sampleAnswer: 'I currently live by myself in an apartment in the city center, which is convenient for my work commute. It\'s a two-bedroom unit on the fifth floor with a nice view of the surrounding neighborhood. I prefer apartment living in the city because everything I need is within walking distance and the maintenance is handled by the building management, which makes me feel comfortable and hassle-free.',
                        w5h1: { what: 'living in a two-bedroom apartment', when: 'currently, ongoing', where: 'in the city center on the fifth floor', who: 'by myself', why: 'convenient for work, within walking distance of amenities, managed maintenance', how: 'feel comfortable and hassle-free' }
                    },
                    {
                        question: 'What is your favorite room in your home?',
                        sampleAnswer: 'My favorite room is definitely my bedroom because it\'s where I can relax and have privacy by myself. I\'ve decorated it in a minimalist style with calming colors at home, which helps me unwind after a long day at work. It\'s also where I do most of my reading and personal activities, so it feels like my personal sanctuary and makes me feel peaceful and content.',
                        w5h1: { what: 'spending time in my bedroom', when: 'after work, evenings, personal time', where: 'in my bedroom at home', who: 'by myself', why: 'need privacy, relaxation, and space for personal activities', how: 'feel peaceful and content' }
                    },
                    {
                        question: 'Do you like decorating your room?',
                        sampleAnswer: 'Yes, I enjoy decorating my room by myself occasionally to keep it fresh and reflect my current tastes. I usually add small touches like plants, artwork, or new cushions at home rather than making major changes. Decorating is a creative outlet for me, and having a space that feels personal and comfortable really improves my overall well-being, which makes me feel creative and satisfied.',
                        w5h1: { what: 'decorating with plants, artwork, and cushions', when: 'occasionally to refresh the space', where: 'in my room at home', who: 'by myself', why: 'keep space fresh and reflect personal tastes', how: 'feel creative and satisfied' }
                    },
                    {
                        question: 'Would you like to move to a different place?',
                        sampleAnswer: 'Eventually, yes. While I\'m happy with my current apartment in the city, I\'d like to move by myself to a slightly larger place with more natural light, maybe in a quieter neighborhood. I\'m planning to stay here for another year or two to save more money, then look for somewhere that better suits my long-term needs, which makes me feel hopeful and forward-thinking.',
                        w5h1: { what: 'moving to a larger place with more natural light', when: 'in another year or two', where: 'in a quieter neighborhood', who: 'by myself', why: 'want more space and light, better for long-term needs', how: 'feel hopeful and forward-thinking' }
                    },
                    {
                        question: 'Do you prefer living with family or alone?',
                        sampleAnswer: 'Right now, I prefer living alone in my apartment because I value my independence and privacy. Living alone allows me to maintain my own schedule and lifestyle without compromising. However, I do miss the companionship of living with family sometimes at their place, which is why I make sure to visit them regularly on weekends, and this balance makes me feel independent yet connected.',
                        w5h1: { what: 'living alone but visiting family', when: 'living alone daily, visiting family on weekends', where: 'in my apartment, visiting family\'s place', who: 'by myself at home, with family on visits', why: 'value independence but also want family connection', how: 'feel independent yet connected' }
                    },

                    // Arts & Entertainment (5)
                    {
                        question: 'Do you enjoy going to museums?',
                        sampleAnswer: 'Yes, I enjoy visiting museums with friends or by myself, especially art and history museums when I travel to new cities. I usually go on weekends or during vacations at various museums because it\'s a relaxing way to learn about different cultures and time periods. Museums help me appreciate creativity and understand historical context, which I find both educational and inspiring, making me feel enriched and curious.',
                        w5h1: { what: 'visiting art and history museums', when: 'on weekends or during vacations', where: 'at museums in new cities', who: 'with friends or by myself', why: 'learn about cultures and time periods, appreciate creativity', how: 'feel enriched, curious, and inspired' }
                    },
                    {
                        question: 'Have you ever been to a concert?',
                        sampleAnswer: 'Yes, I\'ve been to several concerts over the years at various venues, mostly rock and pop performances. I usually attend them with friends when our favorite artists visit our city. The live atmosphere and energy of concerts are incredible, and it\'s always exciting to experience music performed live rather than just listening to recordings, which makes me feel exhilarated and connected to the music.',
                        w5h1: { what: 'attending rock and pop concerts', when: 'over the years when favorite artists visit', where: 'at various concert venues in my city', who: 'with friends', why: 'experience live music and atmosphere', how: 'feel exhilarated and connected to the music' }
                    },
                    {
                        question: 'Do you like taking photographs?',
                        sampleAnswer: 'Yes, I really enjoy photography by myself, particularly landscape and street photography. I usually take photos when I travel to new places or during weekend walks around the city. Photography helps me notice details I might otherwise miss, and it\'s a wonderful way to preserve memories and share experiences with others, which makes me feel creative and observant.',
                        w5h1: { what: 'taking landscape and street photographs', when: 'when traveling or during weekend walks', where: 'at new places and around the city', who: 'by myself', why: 'preserve memories, notice details, share experiences', how: 'feel creative and observant' }
                    },
                    {
                        question: 'Do you enjoy drawing or painting?',
                        sampleAnswer: 'I\'m not particularly skilled at drawing or painting, but I do enjoy it as a relaxing hobby occasionally by myself at home. I usually do simple watercolor paintings or sketches when I have free time on weekends. It\'s a nice way to express creativity without any pressure, and I find the process quite therapeutic and meditative, which makes me feel calm and centered.',
                        w5h1: { what: 'doing watercolor paintings and sketches', when: 'free time on weekends', where: 'at home', who: 'by myself', why: 'express creativity without pressure', how: 'feel calm, centered, and therapeutic' }
                    },
                    {
                        question: 'What kind of art do you appreciate?',
                        sampleAnswer: 'I particularly appreciate contemporary art and impressionist paintings because of their use of color and emotional expression. I usually visit art galleries by myself or with friends a few times a year to see new exhibitions. What I love about art is how it can convey complex emotions and ideas without words, and how each person can interpret pieces differently, which makes me feel thoughtful and emotionally engaged.',
                        w5h1: { what: 'appreciating contemporary art and impressionist paintings', when: 'a few times a year', where: 'at art galleries', who: 'by myself or with friends', why: 'love use of color, emotional expression, and personal interpretation', how: 'feel thoughtful and emotionally engaged' }
                    },

                    // Nature & Environment (5)
                    {
                        question: 'Do you like spending time in nature?',
                        sampleAnswer: 'Absolutely! I love spending time in nature by myself or with friends, especially hiking in forests or walking along beaches. I try to get outdoors at least once a week, usually on weekends when I have more time. Being in nature helps me clear my mind and reduces stress, which is why I consider it essential for my mental health and makes me feel refreshed and peaceful.',
                        w5h1: { what: 'hiking in forests and walking on beaches', when: 'at least once a week, usually weekends', where: 'in forests and along beaches', who: 'by myself or with friends', why: 'clear mind, reduce stress, essential for mental health', how: 'feel refreshed and peaceful' }
                    },
                    {
                        question: 'Do you have any plants at home?',
                        sampleAnswer: 'Yes, I have several indoor plants in my apartment by myself, mainly succulents and a few small trees. I keep them on my balcony and near windows at home where they get enough sunlight. Taking care of plants is relaxing for me, and they also help purify the air and add a natural touch to my living space, which makes me feel calm and connected to nature.',
                        w5h1: { what: 'taking care of succulents and small trees', when: 'regularly for plant maintenance', where: 'on balcony and near windows at home', who: 'by myself', why: 'relaxing, purify air, add natural touch to space', how: 'feel calm and connected to nature' }
                    },
                    {
                        question: 'Are you concerned about the environment?',
                        sampleAnswer: 'Yes, I\'m very concerned about environmental issues like climate change and pollution. I try to do my part by myself by reducing waste, recycling regularly at home and work, and using public transportation when possible. I believe everyone should take responsibility for protecting the environment because the consequences of inaction affect us all, and taking action makes me feel responsible and hopeful.',
                        w5h1: { what: 'reducing waste, recycling, using public transportation', when: 'regularly in daily life', where: 'at home, work, and around the city', who: 'by myself and encouraging others', why: 'protect environment and address climate change and pollution', how: 'feel responsible and hopeful' }
                    },
                    {
                        question: 'Do you prefer mountains or beaches?',
                        sampleAnswer: 'I prefer mountains because I enjoy hiking by myself or with friends and the cooler climate they offer. Mountain scenery is breathtaking, and I find the quiet, peaceful atmosphere very rejuvenating. While I do appreciate beaches for relaxation, mountains provide more opportunities for adventure and exploration, which I find more appealing and makes me feel energized and adventurous.',
                        w5h1: { what: 'hiking in mountains', when: 'regularly for outdoor activities', where: 'in mountain areas', who: 'by myself or with friends', why: 'enjoy cooler climate, quiet atmosphere, adventure opportunities', how: 'feel energized and adventurous' }
                    },
                    {
                        question: 'Do you think it\'s important to protect wildlife?',
                        sampleAnswer: 'Absolutely. Protecting wildlife is crucial for maintaining ecological balance and biodiversity everywhere on Earth. Many species are facing extinction due to human activities like deforestation and pollution, which affects entire ecosystems. I think governments and individuals both have a responsibility to support conservation efforts at various locations and protect natural habitats for future generations, which makes me feel concerned yet motivated to make a difference.',
                        w5h1: { what: 'supporting wildlife protection and conservation efforts', when: 'ongoing concern and action needed', where: 'everywhere on Earth, various natural habitats', who: 'governments and individuals including myself', why: 'maintain ecological balance, prevent extinction, protect for future', how: 'feel concerned yet motivated to make a difference' }
                    },

                    // Transportation (5)
                    {
                        question: 'How do you usually travel to work or school?',
                        sampleAnswer: 'I usually take the subway by myself to work because it\'s the most efficient and reliable option in my city. The commute takes about 30 minutes from home to my office, which gives me time to read or catch up on news. I prefer public transport over driving because it\'s less stressful and more environmentally friendly, which makes me feel productive and environmentally conscious.',
                        w5h1: { what: 'taking the subway', when: 'daily commute, about 30 minutes', where: 'from home to office in the city', who: 'by myself', why: 'most efficient, reliable, less stressful, environmentally friendly', how: 'feel productive and environmentally conscious' }
                    },
                    {
                        question: 'Do you prefer public transportation or driving?',
                        sampleAnswer: 'I prefer public transportation by myself for daily commuting in the city because it\'s convenient and I don\'t have to worry about parking or traffic. However, I do enjoy driving when traveling to places not well-served by public transport or when I need flexibility for trips outside the city. Each option has its advantages depending on the situation, which makes me feel adaptable and practical.',
                        w5h1: { what: 'using public transportation daily, driving for special trips', when: 'public transport daily, driving occasionally', where: 'public transport in city, driving outside city', who: 'by myself', why: 'public transport convenient in city, driving offers flexibility elsewhere', how: 'feel adaptable and practical' }
                    },
                    {
                        question: 'Have you ever traveled by train?',
                        sampleAnswer: 'Yes, I\'ve traveled by train many times by myself or with companions, both for short commutes and longer journeys between cities. I particularly enjoy train travel because the views are often scenic and it\'s more comfortable than buses. Trains also allow me to work or relax during the journey, which makes the time feel more productive and makes me feel relaxed and efficient.',
                        w5h1: { what: 'traveling by train for commutes and longer journeys', when: 'many times for various trips', where: 'between cities and for commutes', who: 'by myself or with companions', why: 'scenic views, more comfortable, can work or relax', how: 'feel relaxed and efficient' }
                    },
                    {
                        question: 'Do you enjoy long journeys?',
                        sampleAnswer: 'It depends on the mode of transport and the destination. I enjoy long train or plane journeys by myself or with travel companions when I\'m traveling somewhere exciting because the anticipation makes it worthwhile. However, long car journeys can be tiring. I usually bring books or download movies to make long trips more enjoyable at various locations, which makes me feel entertained and less restless.',
                        w5h1: { what: 'taking long journeys by train, plane, or car', when: 'when traveling to exciting destinations', where: 'various locations for travel', who: 'by myself or with travel companions', why: 'anticipation makes it worthwhile, though cars can be tiring', how: 'feel entertained and less restless with books/movies' }
                    },
                    {
                        question: 'Would you like to learn to drive?',
                        sampleAnswer: 'Yes, I would like to learn to drive by myself in the near future as it would give me more independence and flexibility. I\'m planning to take driving lessons at a driving school next year when my schedule is less busy. Having a driver\'s license would be particularly useful for weekend trips outside the city and visiting places that aren\'t easily accessible, which makes me feel excited and forward-looking.',
                        w5h1: { what: 'learning to drive', when: 'next year when schedule is less busy', where: 'at a driving school, for trips outside the city', who: 'by myself taking lessons', why: 'gain independence, flexibility, access to more places', how: 'feel excited and forward-looking' }
                    },

                    // Health & Lifestyle (5)
                    {
                        question: 'Do you think you have a healthy lifestyle?',
                        sampleAnswer: 'I try to maintain a healthy lifestyle by myself, though there\'s room for improvement. I exercise regularly at the gym or at home and eat a balanced diet most of the time, but I could probably sleep more consistently. I think achieving a healthy lifestyle is an ongoing process that requires constant attention and adjustment based on your circumstances, which makes me feel mindful and committed to self-improvement.',
                        w5h1: { what: 'maintaining healthy lifestyle with exercise and balanced diet', when: 'regularly, ongoing process', where: 'at the gym or at home', who: 'by myself', why: 'want good health, though needs improvement in sleep', how: 'feel mindful and committed to self-improvement' }
                    },
                    {
                        question: 'How much sleep do you usually get?',
                        sampleAnswer: 'I typically get around 6-7 hours of sleep by myself at home on weeknights, which is slightly less than ideal. On weekends, I try to catch up by sleeping 8-9 hours when I don\'t have early commitments. I\'ve noticed that getting enough sleep significantly affects my mood and productivity, so I\'m trying to improve my sleep schedule, which makes me feel more aware of my health needs.',
                        w5h1: { what: 'sleeping 6-7 hours weeknights, 8-9 hours weekends', when: 'nightly, with more on weekends', where: 'at home in my bedroom', who: 'by myself', why: 'affects mood and productivity, trying to improve schedule', how: 'feel more aware of health needs' }
                    },
                    {
                        question: 'Do you take any vitamins or supplements?',
                        sampleAnswer: 'Yes, I take a daily multivitamin and vitamin D supplements by myself at home, especially during winter when there\'s less sunlight. I started taking them a few years ago after consulting with my doctor at a clinic, who recommended them for overall health maintenance. I believe supplements can help fill nutritional gaps in my diet, which makes me feel proactive about my health.',
                        w5h1: { what: 'taking daily multivitamin and vitamin D supplements', when: 'daily, especially during winter, started a few years ago', where: 'at home, prescribed at clinic', who: 'by myself, after consulting with doctor', why: 'fill nutritional gaps and maintain health', how: 'feel proactive about health' }
                    },
                    {
                        question: 'Do you prefer to relax at home or go out?',
                        sampleAnswer: 'It really depends on my mood and energy levels. After a long work week, I prefer relaxing by myself at home with a book or movie. However, on weekends when I feel more energetic, I enjoy going out to cafés, parks, or meeting friends at various places. Having a balance between both options helps me recharge in different ways, which makes me feel balanced and flexible.',
                        w5h1: { what: 'relaxing at home or going out to cafés and parks', when: 'at home after work week, going out on weekends', where: 'at home or at cafés, parks, and meeting places', who: 'by myself at home, with friends when going out', why: 'need relaxation after work, enjoy socializing when energetic', how: 'feel balanced and flexible' }
                    },
                    {
                        question: 'What do you do when you feel stressed?',
                        sampleAnswer: 'When I feel stressed, I usually go for a run by myself at the park or do some yoga at home to help clear my mind. Physical activity really helps me manage stress levels and regain perspective. I also find that talking to close friends at cafés or listening to calming music can be therapeutic, depending on what caused the stress, which makes me feel relieved and centered.',
                        w5h1: { what: 'running, doing yoga, talking to friends, or listening to music', when: 'when feeling stressed', where: 'at the park for running, at home for yoga, cafés for friends', who: 'by myself for exercise and music, with close friends for talking', why: 'clear mind, manage stress, regain perspective', how: 'feel relieved and centered' }
                    },

                    // Celebrations & Festivals (5)
                    {
                        question: 'What is your favorite festival or celebration?',
                        sampleAnswer: 'My favorite celebration is the Lunar New Year because it\'s a time when the whole family gathers together at my parents\' home or relatives\' houses. We usually celebrate with a big dinner, exchange red envelopes, and visit relatives throughout the city. The festive atmosphere, traditional food, and quality time with loved ones make it special, and I look forward to it every year, which makes me feel joyful and connected to my cultural roots.',
                        w5h1: { what: 'celebrating Lunar New Year with family', when: 'annually during Lunar New Year', where: 'at parents\' home and relatives\' houses', who: 'with whole family and relatives', why: 'gather together, enjoy festive atmosphere and traditions', how: 'feel joyful and connected to cultural roots' }
                    },
                    {
                        question: 'How do you usually celebrate your birthday?',
                        sampleAnswer: 'I usually celebrate my birthday with a small dinner gathering with close friends and family. We typically go to a nice restaurant in the city or I host a dinner at home with home-cooked food. I prefer intimate celebrations rather than large parties because it allows for meaningful conversations and connection with the people who matter most to me, which makes me feel loved and appreciated.',
                        w5h1: { what: 'celebrating birthday with small dinner gathering', when: 'on my birthday annually', where: 'at a nice restaurant or at home', who: 'with close friends and family', why: 'prefer intimate celebrations for meaningful connections', how: 'feel loved and appreciated' }
                    },
                    {
                        question: 'Do you enjoy public holidays?',
                        sampleAnswer: 'Yes, I really enjoy public holidays because they give me a break from work and a chance to recharge. I usually use these days by myself or with family to travel to different places, spend time at home or relatives\' places, or catch up on personal projects. Public holidays are important for maintaining work-life balance, and I always try to make the most of them, which makes me feel refreshed and grateful.',
                        w5h1: { what: 'enjoying public holidays for travel, family time, or personal projects', when: 'during public holidays throughout the year', where: 'at different travel destinations, home, or relatives\' places', who: 'by myself or with family', why: 'get break from work, maintain work-life balance', how: 'feel refreshed and grateful' }
                    },
                    {
                        question: 'Do you give gifts to friends and family?',
                        sampleAnswer: 'Yes, I give gifts by myself to friends and family during special occasions like birthdays, holidays, and important milestones. I usually spend time choosing thoughtful presents at stores or online that reflect the person\'s interests rather than buying expensive items. I believe gift-giving is a meaningful way to show appreciation and strengthen relationships with people I care about, which makes me feel thoughtful and generous.',
                        w5h1: { what: 'giving thoughtful gifts', when: 'during birthdays, holidays, and important milestones', where: 'shopping at stores or online', who: 'by myself, giving to friends and family', why: 'show appreciation and strengthen relationships', how: 'feel thoughtful and generous' }
                    },
                    {
                        question: 'What traditional celebrations does your country have?',
                        sampleAnswer: 'My country celebrates many traditional festivals, but the most significant is our Independence Day, which involves parades, fireworks, and cultural performances in cities across the country. We also celebrate harvest festivals and religious holidays that have been observed for generations. These celebrations help preserve our cultural heritage and bring communities together, which makes me feel proud and culturally connected.',
                        w5h1: { what: 'celebrating Independence Day, harvest festivals, and religious holidays', when: 'throughout the year on specific dates', where: 'in cities across the country', who: 'with communities and fellow citizens', why: 'preserve cultural heritage and bring communities together', how: 'feel proud and culturally connected' }
                    },

                    // Pets & Animals (5)
                    {
                        question: 'Do you have any pets?',
                        sampleAnswer: 'No, I don\'t have any pets currently by myself because my apartment doesn\'t allow them and my work schedule is quite demanding. However, I grew up with a dog at my family home, so I understand the joy and companionship that pets bring. I hope to get a pet in the future when my living situation and lifestyle are more suitable, which would make me feel fulfilled and less lonely.',
                        w5h1: { what: 'not having pets currently', when: 'currently, hoping for future', where: 'at my apartment, grew up with dog at family home', who: 'by myself now, had dog with family before', why: 'apartment restrictions and demanding work schedule', how: 'feel hopeful for future, would feel fulfilled with pet' }
                    },
                    {
                        question: 'Do you like animals?',
                        sampleAnswer: 'Yes, I love animals, especially dogs and cats. I find them fascinating to observe and they bring so much joy to people\'s lives. Whenever I visit friends at their homes who have pets, I always enjoy spending time playing with them by myself or with the owners. I think animals teach us about loyalty, compassion, and living in the moment, which makes me feel happy and peaceful.',
                        w5h1: { what: 'loving and observing animals, especially dogs and cats', when: 'whenever visiting friends', where: 'at friends\' homes', who: 'by myself or with pet owners', why: 'animals bring joy and teach valuable lessons', how: 'feel happy and peaceful' }
                    },
                    {
                        question: 'What is your favorite animal?',
                        sampleAnswer: 'My favorite animal is the elephant because of their intelligence, strong family bonds, and gentle nature despite their size. I\'ve always been fascinated by how they communicate and care for each other in the wild or at wildlife sanctuaries. Elephants also represent wisdom and strength in many cultures, which I find inspiring and meaningful, and thinking about them makes me feel inspired and connected to nature.',
                        w5h1: { what: 'appreciating elephants', when: 'ongoing fascination', where: 'in the wild or at wildlife sanctuaries', who: 'observing them by myself or learning about them', why: 'their intelligence, family bonds, gentle nature, cultural significance', how: 'feel inspired and connected to nature' }
                    },
                    {
                        question: 'Did you have pets when you were a child?',
                        sampleAnswer: 'Yes, I had a golden retriever named Max when I was growing up at my family home. He was part of our family for about 12 years, and taking care of him taught me responsibility and empathy. We used to play together with my siblings in the backyard every day after school, and those memories are still very special to me, which makes me feel nostalgic and warm.',
                        w5h1: { what: 'having a golden retriever named Max', when: 'during childhood for 12 years, every day after school', where: 'at my family home in the backyard', who: 'with my family and siblings', why: 'family pet that taught responsibility and empathy', how: 'feel nostalgic and warm' }
                    },
                    {
                        question: 'Would you like to have a pet in the future?',
                        sampleAnswer: 'Yes, I\'d definitely like to have a dog by myself in the future when I have more space and time to properly care for one. I think having a pet would encourage me to be more active at parks and outdoors and provide companionship at home. I\'m particularly interested in adopting a rescue dog from a shelter because I believe in giving animals a second chance, which makes me feel compassionate and purposeful.',
                        w5h1: { what: 'having a dog, adopting a rescue dog', when: 'in the future when have more space and time', where: 'at home and at parks for activities', who: 'by myself caring for the dog', why: 'encourages activity, provides companionship, give animal second chance', how: 'feel compassionate and purposeful' }
                    },

                    // Language & Communication (5)
                    {
                        question: 'What languages can you speak?',
                        sampleAnswer: 'I can speak English fluently and my native language, Vietnamese. I\'m also learning basic Spanish by myself through an app at home in my free time because I find it useful for travel. Being multilingual opens up opportunities for communication and helps me understand different cultures better, which makes me feel accomplished and globally connected.',
                        w5h1: { what: 'speaking English, Vietnamese, learning Spanish', when: 'use daily, learning Spanish in free time', where: 'various contexts, learning at home', who: 'by myself', why: 'useful for travel, career, understanding different cultures', how: 'feel accomplished and globally connected' }
                    },
                    {
                        question: 'Do you think learning languages is important?',
                        sampleAnswer: 'Absolutely. Learning languages is important both for practical reasons like career opportunities and travel, and for cognitive benefits. It helps you understand different perspectives and cultures more deeply when communicating with people from around the world. In our globalized world, being able to communicate in multiple languages is increasingly valuable and enriching, which makes me feel empowered and culturally aware.',
                        w5h1: { what: 'learning languages for practical and cognitive benefits', when: 'ongoing process throughout life', where: 'in various contexts globally', who: 'by myself and communicating with others', why: 'career opportunities, travel, understanding cultures, cognitive benefits', how: 'feel empowered and culturally aware' }
                    },
                    {
                        question: 'How are you learning English?',
                        sampleAnswer: 'I\'m learning English by myself through a combination of methods: taking classes twice a week at a language school, watching English movies and series with subtitles at home, and practicing conversation with native speakers online. I also try to read English articles and books regularly because exposure to the language in different contexts really helps improve my skills, which makes me feel motivated and progressively more confident.',
                        w5h1: { what: 'taking classes, watching movies, practicing conversation, reading', when: 'classes twice a week, other activities regularly', where: 'at language school, at home, online', who: 'by myself, with teachers and native speakers', why: 'improve language skills through varied exposure', how: 'feel motivated and progressively more confident' }
                    },
                    {
                        question: 'Do you enjoy writing?',
                        sampleAnswer: 'Yes, I enjoy writing by myself, particularly journaling and creative writing in my free time. I usually write at home in the evenings when I have quiet time to reflect on my day or explore ideas. Writing helps me organize my thoughts and express myself more clearly, which I find both therapeutic and intellectually satisfying, making me feel centered and creative.',
                        w5h1: { what: 'journaling and creative writing', when: 'in the evenings during free time', where: 'at home', who: 'by myself', why: 'organize thoughts, express myself clearly, therapeutic', how: 'feel centered and creative' }
                    },
                    {
                        question: 'Do you prefer texting or calling?',
                        sampleAnswer: 'I generally prefer texting by myself for quick, non-urgent communication because it\'s convenient and allows me to respond when I have time at home or on the go. However, for important conversations or when I want to have a deeper discussion with friends or family, I prefer calling because it\'s more personal and reduces misunderstandings. Each method has its place depending on the situation, which makes me feel flexible and communicative.',
                        w5h1: { what: 'texting for quick communication, calling for important discussions', when: 'texting anytime, calling for important conversations', where: 'at home or on the go', who: 'by myself communicating with friends, family, others', why: 'texting is convenient, calling is personal and clearer', how: 'feel flexible and communicative' }
                    },

                    // Memory & Childhood (5)
                    {
                        question: 'What is your earliest childhood memory?',
                        sampleAnswer: 'My earliest memory is from when I was about four years old, playing in my grandparents\' garden during summer vacation. I remember chasing butterflies and picking flowers with my grandmother there. It\'s a vivid and happy memory that reminds me of simpler times and the special bond I had with her, which makes me feel nostalgic and grateful.',
                        w5h1: { what: 'playing in garden, chasing butterflies, picking flowers', when: 'when I was about four years old, during summer vacation', where: 'in my grandparents\' garden', who: 'with my grandmother', why: 'enjoying summer vacation and bonding with grandmother', how: 'feel nostalgic and grateful' }
                    },
                    {
                        question: 'Do you have a good memory?',
                        sampleAnswer: 'I have a reasonably good memory for faces and experiences, but I sometimes struggle with remembering specific details like names or dates. I usually use reminder apps on my phone and write things down by myself at home or work to help me stay organized. I think my memory works better when I\'m genuinely interested in something or when I make emotional connections, which makes me feel both capable and aware of my limitations.',
                        w5h1: { what: 'remembering faces and experiences, using reminder apps and notes', when: 'ongoing, daily memory management', where: 'at home or work', who: 'by myself', why: 'stay organized, compensate for detail memory weakness', how: 'feel capable and aware of limitations' }
                    },
                    {
                        question: 'What did you enjoy doing as a child?',
                        sampleAnswer: 'As a child, I loved playing outdoor games like hide-and-seek and riding my bicycle around the neighborhood with friends. We would spend hours outside until it got dark. Those activities taught me teamwork and creativity, and I have fond memories of the freedom and carefree nature of childhood, which makes me feel nostalgic and happy.',
                        w5h1: { what: 'playing hide-and-seek and riding bicycle', when: 'as a child, hours until dark', where: 'around the neighborhood outdoors', who: 'with friends', why: 'enjoy outdoor activities, learn teamwork and creativity', how: 'feel nostalgic and happy' }
                    },
                    {
                        question: 'Are you still in contact with childhood friends?',
                        sampleAnswer: 'Yes, I\'m still in touch with two of my closest friends from primary school. We don\'t see each other as often as we used to because we live in different cities now, but we chat regularly online and meet up at cafés or restaurants whenever possible. These friendships are valuable because we share a long history and understand each other well, which makes me feel connected and valued.',
                        w5h1: { what: 'staying in touch with childhood friends', when: 'regularly online, meet up occasionally', where: 'online and at cafés or restaurants when meeting', who: 'with two closest friends from primary school', why: 'share long history and mutual understanding', how: 'feel connected and valued' }
                    },
                    {
                        question: 'What games did you play when you were young?',
                        sampleAnswer: 'When I was young, I played a lot of traditional games like hopscotch, tag, and jump rope with kids in my neighborhood outdoors. We also played board games like Monopoly at home or friends\' houses on rainy days. These games were simple but taught us important social skills like cooperation, fair play, and how to handle both winning and losing gracefully, which makes me feel nostalgic and appreciative of those experiences.',
                        w5h1: { what: 'playing hopscotch, tag, jump rope, and Monopoly', when: 'when young, outdoor games regularly, board games on rainy days', where: 'outdoors in neighborhood, at home or friends\' houses', who: 'with kids in neighborhood', why: 'have fun and learn social skills', how: 'feel nostalgic and appreciative' }
                    },

                    // Colors & Preferences (5)
                    {
                        question: 'What is your favorite color?',
                        sampleAnswer: 'My favorite color is blue, particularly navy and sky blue shades. I find blue calming and versatile when I see it in clothing and interior design at home or in stores. I think I\'m drawn to blue because it reminds me of the ocean and clear skies, which are associated with tranquility and freedom, and makes me feel peaceful and serene.',
                        w5h1: { what: 'liking blue color, especially navy and sky blue', when: 'ongoing preference', where: 'in clothing and interior design at home and stores', who: 'my personal preference', why: 'calming, versatile, reminds of ocean and sky, tranquility', how: 'feel peaceful and serene' }
                    },
                    {
                        question: 'Do different colors affect your mood?',
                        sampleAnswer: 'Yes, I believe colors do affect my mood when I see them at home or while going out. Bright colors like yellow and orange make me feel more energetic and positive, while softer colors like blue and green help me feel calm and relaxed. That\'s why I\'m quite intentional about the colors I choose by myself for my clothes and home decor based on how I want to feel, which makes me feel in control of my environment.',
                        w5h1: { what: 'experiencing mood effects from different colors', when: 'throughout daily life', where: 'at home, while going out, in various environments', who: 'by myself experiencing and choosing colors', why: 'colors influence energy and calmness', how: 'feel in control of environment and moods' }
                    },
                    {
                        question: 'What color would you paint your room?',
                        sampleAnswer: 'I would paint my room by myself a soft sage green or light grey because these colors are soothing and create a peaceful atmosphere at home perfect for relaxation and sleep. I prefer neutral, calming tones over bold colors in personal spaces because they\'re easier to live with long-term and provide a good backdrop for various decorating styles, which makes me feel calm and comfortable.',
                        w5h1: { what: 'painting room soft sage green or light grey', when: 'future plan or hypothetical', where: 'in my room at home', who: 'by myself doing the painting', why: 'create soothing, peaceful atmosphere for relaxation', how: 'feel calm and comfortable' }
                    },
                    {
                        question: 'Do you wear bright or dark colors?',
                        sampleAnswer: 'I usually wear dark or neutral colors like black, navy, and grey by myself because they\'re practical, versatile, and easy to mix and match for both work and casual settings. Occasionally, I add pops of color with accessories or during summer months. Dark colors suit my personal style and are appropriate for both professional and casual settings, which makes me feel confident and put-together.',
                        w5h1: { what: 'wearing dark or neutral colors like black, navy, grey', when: 'usually, with occasional color pops in summer', where: 'at work and in casual settings', who: 'by myself choosing clothing', why: 'practical, versatile, easy to match, suits personal style', how: 'feel confident and put-together' }
                    },
                    {
                        question: 'Has your favorite color changed over time?',
                        sampleAnswer: 'Yes, my favorite color has changed as I\'ve gotten older. As a child, I loved bright red because it was bold and exciting when I saw it in toys and clothes. Now I prefer blue and green because I appreciate their calming qualities more in my home and wardrobe. I think our color preferences evolve as our personalities mature and our understanding of what we need emotionally changes, which makes me feel mature and self-aware.',
                        w5h1: { what: 'changing favorite color from red to blue and green', when: 'from childhood to now', where: 'in toys and clothes as child, in home and wardrobe now', who: 'by myself experiencing preference evolution', why: 'personality maturity and changing emotional needs', how: 'feel mature and self-aware' }
                    },

                    // Time Management (5)
                    {
                        question: 'Are you good at managing your time?',
                        sampleAnswer: 'I think I\'m reasonably good at time management by myself, though there\'s always room for improvement. I usually use a digital calendar and to-do lists at home and work to stay organized and prioritize tasks effectively. Planning ahead helps me balance work responsibilities with personal activities, though unexpected events sometimes disrupt my schedule, which makes me feel organized yet adaptable.',
                        w5h1: { what: 'managing time with digital calendar and to-do lists', when: 'daily and ongoing', where: 'at home and work', who: 'by myself', why: 'balance work and personal activities effectively', how: 'feel organized yet adaptable' }
                    },
                    {
                        question: 'Do you make daily or weekly plans?',
                        sampleAnswer: 'I make both daily and weekly plans by myself to stay organized. At the start of each week at home, I outline my major tasks and commitments, then each morning I create a detailed daily plan with priorities. This two-level approach helps me see the bigger picture while staying focused on immediate tasks. I find it reduces stress and increases productivity, which makes me feel in control and efficient.',
                        w5h1: { what: 'making daily and weekly plans', when: 'at start of each week, then each morning', where: 'at home for planning', who: 'by myself', why: 'stay organized, see big picture, focus on immediate tasks', how: 'feel in control and efficient' }
                    },
                    {
                        question: 'Are you usually punctual?',
                        sampleAnswer: 'Yes, I\'m generally quite punctual because I believe being on time shows respect for other people\'s schedules. I usually arrive by myself a few minutes early to appointments or meetings at various locations to avoid any last-minute stress. Being punctual also helps me feel more in control and prepared, which reduces anxiety about being late and makes me feel responsible and respectful.',
                        w5h1: { what: 'being punctual and arriving early', when: 'for appointments and meetings', where: 'at various locations', who: 'by myself', why: 'show respect for others, avoid stress', how: 'feel responsible, respectful, and in control' }
                    },
                    {
                        question: 'Do you prefer mornings or evenings?',
                        sampleAnswer: 'I\'m definitely more of a morning person. I feel most alert and productive in the early hours at home or at work, which is when I do my most important work. I usually wake up early by myself to take advantage of this natural energy peak. By evening, I prefer to wind down at home with lighter activities like reading or watching shows, which makes me feel energized in mornings and relaxed in evenings.',
                        w5h1: { what: 'preferring mornings for work, evenings for relaxation', when: 'early hours for important work, evenings for winding down', where: 'at home or at work in mornings, at home in evenings', who: 'by myself', why: 'most alert and productive in mornings, need to wind down in evenings', how: 'feel energized in mornings, relaxed in evenings' }
                    },
                    {
                        question: 'How do you organize your schedule?',
                        sampleAnswer: 'I organize my schedule by myself using a combination of digital tools and traditional methods. I use Google Calendar on my phone and computer for appointments and deadlines, and I keep a physical planner at home for daily tasks and notes. I also set reminders on my phone for important events. This system helps me stay on track and ensures I don\'t forget anything important, which makes me feel systematic and well-prepared.',
                        w5h1: { what: 'using Google Calendar, physical planner, and phone reminders', when: 'daily and ongoing schedule management', where: 'on phone and computer, physical planner at home', who: 'by myself', why: 'stay on track and not forget important events', how: 'feel systematic and well-prepared' }
                    }
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
            },
            {
                id: 'm2_prep',
                type: 'audio_lesson',
                title: 'The PREP Method',
                audioScript: {
                    text: `Now let's learn another powerful technique called PREP. It stands for Point, Reason, Example, Point. This is perfect when you want a clear, structured answer. Here's how it works: First, make your POINT - give a direct answer. "Yes, I enjoy reading." Second, give a REASON - why? "Because it helps me relax." Third, add an EXAMPLE - be specific. "For instance, last week I read a mystery novel that kept me engaged for hours." Finally, restate or extend your POINT. "So yes, reading is definitely one of my favorite activities." See how clear and complete that is? PREP works especially well for opinion questions and preference questions. The structure keeps you organized and ensures you give a full answer. Let me show you another example. Question: "Do you prefer studying alone or with others?" POINT: "I generally prefer studying alone." REASON: "Because I can focus better without distractions." EXAMPLE: "For example, when I studied for my last exam at the library by myself, I covered twice as much material as when I studied with classmates." POINT: "So for serious study sessions, alone works best for me." That's PREP in action!`,
                    duration: 70
                },
                content: {
                    structure: {
                        p: 'Point - Direct answer to the question',
                        r: 'Reason - Why you think/feel this way',
                        e: 'Example - Specific instance or detail',
                        p2: 'Point - Restate or extend your answer'
                    },
                    example: {
                        question: 'Do you enjoy reading?',
                        point: 'Yes, I enjoy reading.',
                        reason: 'Because it helps me relax.',
                        example: 'For instance, last week I read a mystery novel that kept me engaged for hours.',
                        pointAgain: 'So yes, reading is definitely one of my favorite activities.'
                    }
                }
            },
            {
                id: 'm2_prep_practice',
                type: 'ai_practice',
                title: 'PREP Method Practice',
                instructions: 'Answer using the PREP structure: Point → Reason → Example → Point',
                practiceQuestions: [
                    {
                        question: 'Do you think children should learn to play musical instruments?',
                        sampleAnswer: 'Yes, I definitely think children should learn musical instruments. The reason is that music education helps develop cognitive skills, creativity, and discipline from an early age. For example, I learned piano as a child, and it taught me patience and the value of regular practice, skills that have helped me in many areas of life. So yes, I believe musical training is valuable for children\'s overall development.',
                        prep: { point: 'Yes, definitely', reason: 'develops cognitive skills, creativity, discipline', example: 'I learned piano - taught patience and practice', pointAgain: 'valuable for overall development' }
                    },
                    {
                        question: 'Is it better to live in the city or countryside?',
                        sampleAnswer: 'I think it depends on personal priorities, but for me, city living is better. The reason is that cities offer more career opportunities, entertainment options, and convenient access to services. For instance, in my city, I can reach my office in 20 minutes, and there are countless restaurants, theaters, and cultural events nearby. So overall, while the countryside has its charm, the city provides the lifestyle and opportunities I value most.',
                        prep: { point: 'City living is better for me', reason: 'more opportunities, entertainment, convenient services', example: '20 min commute, countless options nearby', pointAgain: 'city provides lifestyle I value' }
                    },
                    {
                        question: 'Do you prefer to shop online or in physical stores?',
                        sampleAnswer: 'I prefer shopping online for most purchases. The reason is that it saves time, offers better price comparisons, and delivers directly to my door. For example, last month I needed a laptop, and I spent an hour comparing prices and reviews online before finding the best deal, which would have been impossible visiting multiple stores. So yes, online shopping is definitely my preferred method for convenience and efficiency.',
                        prep: { point: 'Prefer online shopping', reason: 'saves time, better comparisons, convenient delivery', example: 'laptop shopping - found best deal in 1 hour online', pointAgain: 'preferred for convenience and efficiency' }
                    },
                    {
                        question: 'Should students wear uniforms at school?',
                        sampleAnswer: 'Yes, I believe school uniforms are beneficial. The reason is that they promote equality among students and eliminate distractions related to fashion competition. For instance, when I wore a uniform at school, I never worried about what to wear or felt judged based on clothing brands, which helped me focus more on studying. So overall, I think uniforms create a better learning environment.',
                        prep: { point: 'Uniforms are beneficial', reason: 'promote equality, eliminate fashion distractions', example: 'I never worried about clothing - focused on studying', pointAgain: 'create better learning environment' }
                    },
                    {
                        question: 'Is it important to learn about history?',
                        sampleAnswer: 'Absolutely, learning history is very important. The reason is that it helps us understand how societies developed and avoid repeating past mistakes. For example, studying historical events like wars and revolutions has taught me about the consequences of political decisions and the importance of diplomacy. So yes, history education is essential for developing informed, thoughtful citizens.',
                        prep: { point: 'History is very important', reason: 'understand development, avoid past mistakes', example: 'wars/revolutions taught about consequences and diplomacy', pointAgain: 'essential for informed citizens' }
                    },
                    {
                        question: 'Do you think people watch too much TV nowadays?',
                        sampleAnswer: 'I think many people do watch excessive TV, yes. The reason is that streaming services make it too easy to binge-watch entire series, which can be quite addictive and time-consuming. For instance, I know several friends who spend 4-5 hours every evening watching shows, which leaves little time for exercise, socializing, or other productive activities. So I do believe TV consumption has become excessive for many people.',
                        prep: { point: 'Many people watch excessive TV', reason: 'streaming makes binge-watching addictive', example: 'friends spend 4-5 hours nightly, no time for other activities', pointAgain: 'TV consumption has become excessive' }
                    },
                    {
                        question: 'Should people save money or spend it on experiences?',
                        sampleAnswer: 'I think a balance is ideal, but I lean toward spending on experiences. The reason is that experiences create lasting memories and personal growth, while material possessions often lose their appeal quickly. For example, I once spent money on a trip to Japan, and those memories and cultural insights have enriched my life far more than any gadget I\'ve bought. So while saving is important, investing in meaningful experiences is equally valuable.',
                        prep: { point: 'Lean toward experiences', reason: 'create lasting memories and growth vs temporary appeal', example: 'Japan trip enriched life more than gadgets', pointAgain: 'experiences are equally valuable to savings' }
                    },
                    {
                        question: 'Is it better to have a few close friends or many acquaintances?',
                        sampleAnswer: 'I believe having a few close friends is better. The reason is that deep friendships provide genuine support, trust, and meaningful connection that superficial relationships cannot match. For instance, when I faced a difficult time last year, it was my two closest friends who truly helped me through it, while my many acquaintances offered only surface-level sympathy. So quality definitely matters more than quantity in friendships.',
                        prep: { point: 'Few close friends is better', reason: 'provide genuine support and deep connection', example: 'difficult time - close friends truly helped, acquaintances just sympathized', pointAgain: 'quality over quantity in friendships' }
                    },
                    {
                        question: 'Do you think learning a foreign language is important?',
                        sampleAnswer: 'Yes, I think language learning is extremely important. The reason is that it opens up career opportunities, enables cultural understanding, and enhances cognitive abilities. For example, learning English has allowed me to access international job markets, communicate with people worldwide, and even improved my problem-solving skills according to research. So yes, foreign language proficiency is a valuable asset in today\'s globalized world.',
                        prep: { point: 'Extremely important', reason: 'career opportunities, cultural understanding, cognitive benefits', example: 'English opened job markets, global communication, better problem-solving', pointAgain: 'valuable in globalized world' }
                    },
                    {
                        question: 'Should companies allow employees to work from home?',
                        sampleAnswer: 'Yes, I believe companies should offer work-from-home options. The reason is that remote work increases flexibility, reduces commute stress, and often improves productivity for many roles. For instance, during the pandemic, my company switched to remote work, and we actually saw a 15% increase in output while employees reported better work-life balance. So yes, remote work options are beneficial for both companies and employees.',
                        prep: { point: 'Should offer remote options', reason: 'increases flexibility, reduces stress, improves productivity', example: 'company saw 15% increase + better work-life balance', pointAgain: 'beneficial for both sides' }
                    },
                    {
                        question: 'Is it better to plan vacations in advance or be spontaneous?',
                        sampleAnswer: 'I think planning in advance is generally better. The reason is that advance planning allows you to secure better prices, ensure availability, and create a more organized itinerary. For example, when I planned a European trip three months ahead, I saved about 40% on flights and hotels compared to last-minute bookings, and I could reserve popular attractions. So while spontaneity has its appeal, planning usually leads to better and more economical trips.',
                        prep: { point: 'Planning advance is better', reason: 'better prices, ensure availability, organized itinerary', example: 'European trip - saved 40%, secured attractions', pointAgain: 'planning leads to better, economical trips' }
                    },
                    {
                        question: 'Do you think social media has more positive or negative effects?',
                        sampleAnswer: 'I think social media has mixed effects, but the negatives are concerning. The reason is that while it connects people globally, it also spreads misinformation, creates addiction, and negatively impacts mental health, especially among young users. For instance, studies show increased anxiety and depression rates correlate with heavy social media use among teenagers. So while social media has benefits, I believe we need to be more cautious about its negative psychological impacts.',
                        prep: { point: 'Mixed but negatives are concerning', reason: 'connects people BUT spreads misinformation, addiction, mental health issues', example: 'studies show anxiety/depression in heavy-user teenagers', pointAgain: 'need caution about psychological impacts' }
                    },
                    {
                        question: 'Should children have smartphones?',
                        sampleAnswer: 'I think children should have smartphones but with restrictions. The reason is that phones can be educational tools and safety devices, but unrestricted access can lead to addiction and exposure to inappropriate content. For example, giving a child a phone with parental controls and time limits allows them to learn digital skills and stay in contact with parents, while protecting them from harm. So yes, smartphones for children are acceptable with proper supervision.',
                        prep: { point: 'Yes but with restrictions', reason: 'educational and safety benefits BUT risk of addiction and inappropriate content', example: 'phone with parental controls allows learning + safety while protecting', pointAgain: 'acceptable with proper supervision' }
                    },
                    {
                        question: 'Is it important to eat breakfast every day?',
                        sampleAnswer: 'Yes, I believe eating breakfast is important. The reason is that it provides energy for the morning, improves concentration, and helps maintain a healthy metabolism. For instance, on days when I skip breakfast, I notice I feel sluggish by mid-morning and tend to overeat at lunch, whereas a good breakfast keeps me energized and focused. So yes, breakfast is definitely an important meal that shouldn\'t be skipped regularly.',
                        prep: { point: 'Breakfast is important', reason: 'provides energy, improves concentration, healthy metabolism', example: 'skipping makes me sluggish + overeat, eating keeps me energized', pointAgain: 'important meal, shouldn\'t skip' }
                    },
                    {
                        question: 'Do you prefer reading books or watching movies?',
                        sampleAnswer: 'I prefer reading books to watching movies. The reason is that books engage imagination more deeply, provide richer detail, and allow you to set your own pace. For example, when I read "The Lord of the Rings," I could visualize the world in my own way and take time to appreciate the language, whereas movies condense everything and control the experience. So while I enjoy both, reading offers a more immersive and personal experience.',
                        prep: { point: 'Prefer reading books', reason: 'engage imagination, richer detail, own pace', example: 'LOTR - visualized my own way, appreciated language vs condensed movies', pointAgain: 'reading offers more immersive experience' }
                    }
                ],
                aiPromptTemplate: `Student learned PREP method: Point → Reason → Example → Point (restate/extend)

Question: {{question}}
Student answer: {{studentResponse}}

Provide feedback:
✓ Structure Check: Did they follow PREP? (identify each part)
📊 Completeness: All 4 elements present?
💡 Quality: Is the example specific enough?
🎯 One Improvement: How to enhance their answer
✨ Band Estimate: [5.5-7.5]

Be encouraging and specific.`
            },
            {
                id: 'm2_past_present',
                type: 'audio_lesson',
                title: 'Past vs Present Comparison',
                audioScript: {
                    text: `Another excellent way to extend your answers is comparing past and present. This works beautifully for questions about habits, preferences, or changes over time. The structure is simple: talk about how things WERE before, then contrast with how they ARE now, and optionally mention WHY things changed. Let me demonstrate. Question: "Do you enjoy cooking?" Answer: "Actually, my feelings about cooking have changed over time. When I was younger, I found cooking boring and saw it as just a chore. But nowadays, I really enjoy it. I think the change happened when I moved out and had to cook for myself - I started experimenting with different recipes and discovered it's actually quite creative and relaxing. So yes, I definitely enjoy cooking now, though that wasn't always the case." This technique shows sophistication because you're not giving a simple yes/no - you're showing development and reflection. It also naturally creates more content. Another example: "Do you read much?" "I used to read all the time as a child - I'd finish several books a week during school holidays. However, these days I read less frequently, maybe one or two books a month, mainly because work keeps me quite busy. That said, I still value reading and I'm trying to make more time for it." See how natural this sounds?`,
                    duration: 75
                }
            },
            {
                id: 'm2_past_present_practice',
                type: 'ai_practice',
                title: 'Past vs Present Practice',
                instructions: 'Answer by comparing BEFORE and NOW. Show how your habits/preferences have changed.',
                practiceQuestions: [
                    {
                        question: 'What kind of music do you listen to?',
                        sampleAnswer: 'My music taste has really evolved over the years. When I was younger, I was really into pop and dance music - I used to listen to it constantly, especially during high school. But nowadays, I prefer jazz and classical music because I find them more relaxing and sophisticated. I think the change happened as I matured and started appreciating more complex melodies and instrumental arrangements.',
                        pastPresent: { past: 'pop and dance music constantly in high school', present: 'prefer jazz and classical now', why: 'matured, appreciate complex melodies' }
                    },
                    {
                        question: 'Do you enjoy sports?',
                        sampleAnswer: 'Actually, my attitude toward sports has changed quite dramatically. In the past, I was never interested in sports - I used to think they were boring and I avoided physical activities. However, these days I really enjoy playing badminton and going for runs. The change came when my doctor recommended exercise for health reasons, and I discovered that sports can actually be fun when you find the right ones.',
                        pastPresent: { past: 'never interested, thought boring, avoided physical activity', present: 'enjoy badminton and running', why: 'doctor recommendation, discovered can be fun' }
                    },
                    {
                        question: 'How much time do you spend with your family?',
                        sampleAnswer: 'My family time has decreased over the years, though I try to compensate. When I was a child and teenager, I spent every day with my family since we all lived together. Now that I\'ve moved out for work, I only see them on weekends or special occasions. While I miss the daily interaction, the quality of our time together has actually improved because we make more effort to do meaningful activities when we meet.',
                        pastPresent: { past: 'every day living together as child', present: 'only weekends/occasions now', why: 'moved out for work, but quality improved' }
                    },
                    {
                        question: 'What do you do in your free time?',
                        sampleAnswer: 'My free time activities have shifted quite a bit. In the past, I used to spend most of my free time playing video games - sometimes 4-5 hours a day on weekends. These days, I prefer reading books, going to cafés, or exploring new parts of the city. I think I started seeking more enriching activities as I got older and realized video games, while fun, weren\'t adding much value to my life.',
                        pastPresent: { past: 'video games 4-5 hours daily on weekends', present: 'reading, cafés, exploring city', why: 'sought more enriching activities with age' }
                    },
                    {
                        question: 'Do you like traveling?',
                        sampleAnswer: 'Yes, though my enthusiasm for travel has grown significantly. When I was younger, I found traveling stressful - the planning, packing, and unfamiliar environments made me anxious. But now I absolutely love it. I think the change happened when I started traveling solo and realized I could go at my own pace. Nowadays, I travel at least twice a year and find it incredibly enriching.',
                        pastPresent: { past: 'found stressful, anxious about planning and unfamiliar places', present: 'absolutely love it, travel twice yearly', why: 'solo travel taught going at own pace' }
                    },
                    {
                        question: 'What types of TV shows do you watch?',
                        sampleAnswer: 'My TV preferences have become more serious over time. I used to watch mainly sitcoms and reality shows for light entertainment - things like Friends or cooking competitions. These days, I\'m more drawn to documentaries and political dramas because I want content that\'s both entertaining and educational. I suppose my tastes matured as I wanted to use my leisure time more productively.',
                        pastPresent: { past: 'sitcoms and reality shows for light entertainment', present: 'documentaries and political dramas', why: 'want entertaining + educational content' }
                    },
                    {
                        question: 'How do you stay in touch with friends?',
                        sampleAnswer: 'The way I connect with friends has changed dramatically with technology. In the past, we used to meet in person regularly or make phone calls - that was the only way to stay connected. Nowadays, we primarily use messaging apps and social media, with occasional video calls. While I sometimes miss the face-to-face interaction, the convenience of instant messaging means we actually communicate more frequently, even if it\'s briefer.',
                        pastPresent: { past: 'in-person meetings and phone calls only', present: 'messaging apps, social media, video calls', why: 'technology enables more frequent contact' }
                    },
                    {
                        question: 'What do you usually eat for breakfast?',
                        sampleAnswer: 'My breakfast habits have become healthier over the years. I used to skip breakfast entirely or just grab sugary cereals when I was a student because I was always rushing. But these days, I make time for a proper breakfast with eggs, fruit, and whole grain toast. The change happened when I learned about nutrition and noticed how much better I feel throughout the day when I eat a balanced morning meal.',
                        pastPresent: { past: 'skipped or sugary cereals when rushing as student', present: 'proper breakfast: eggs, fruit, whole grain toast', why: 'learned about nutrition, feel better all day' }
                    },
                    {
                        question: 'How often do you use social media?',
                        sampleAnswer: 'My social media usage has actually decreased significantly. A few years ago, I was constantly on social media - checking Instagram and Facebook every few minutes throughout the day. These days, I limit myself to about 30 minutes in the evening. I made this change after realizing how much time I was wasting and how it was affecting my productivity and mental health. Now I feel much more focused and less anxious.',
                        pastPresent: { past: 'constantly checking every few minutes all day', present: 'limited to 30 minutes evening only', why: 'realized time waste, affected productivity and mental health' }
                    },
                    {
                        question: 'Do you prefer studying in the morning or evening?',
                        sampleAnswer: 'Interestingly, my optimal study time has shifted. When I was in high school and university, I was definitely a night owl - I used to study best between 10 PM and 2 AM when everything was quiet. However, now I find I\'m much more productive in the early morning, usually between 6 and 9 AM. I think my body clock has adjusted as I\'ve gotten older and adopted more regular working hours.',
                        pastPresent: { past: 'night owl, studied 10 PM-2 AM in school/university', present: 'early morning 6-9 AM more productive', why: 'body clock adjusted with age and regular work hours' }
                    },
                    {
                        question: 'What kind of movies do you enjoy?',
                        sampleAnswer: 'My movie preferences have matured quite a bit. In my teenage years, I used to love action movies and superhero films - the more explosions and special effects, the better. Nowadays, I prefer independent films and foreign cinema that offer deeper storytelling and character development. I think my tastes changed as I started appreciating substance over spectacle, and I wanted films that made me think rather than just entertained me.',
                        pastPresent: { past: 'action and superhero films with explosions in teens', present: 'independent and foreign films with depth', why: 'appreciate substance over spectacle, want thought-provoking content' }
                    },
                    {
                        question: 'How do you usually spend your weekends?',
                        sampleAnswer: 'My weekend routine has become much more active. I used to spend weekends mostly at home, sleeping in late and watching TV or browsing the internet. But these days, I try to go out and be productive - visiting museums, hiking, or meeting friends for brunch. The change came when I realized I was wasting my precious free time. Now I feel much more fulfilled by Monday morning.',
                        pastPresent: { past: 'home, sleeping late, TV and internet', present: 'active: museums, hiking, brunch with friends', why: 'realized wasting free time, feel more fulfilled' }
                    },
                    {
                        question: 'Do you play any video games?',
                        sampleAnswer: 'My gaming habits have changed completely. When I was younger, I was an avid gamer - I would play competitive online games for hours every day, sometimes even neglecting homework. These days, I rarely play, maybe just casual mobile games during my commute. The change happened when I started working full-time and realized I had other priorities. While I still appreciate games, they\'re no longer central to my life.',
                        pastPresent: { past: 'avid gamer, competitive online games for hours, neglected homework', present: 'rarely play, just casual mobile games on commute', why: 'full-time work brought other priorities' }
                    },
                    {
                        question: 'What do you like to do after work/school?',
                        sampleAnswer: 'My after-work routine has evolved significantly. Right after graduating, I used to go straight home and collapse on the couch, too exhausted to do anything. But now I\'ve made exercise a priority - I go to the gym or for a run right after work. This change came from understanding that physical activity actually gives me energy rather than depleting it. I feel much better now than when I was sedentary.',
                        pastPresent: { past: 'straight home, collapse on couch, too exhausted', present: 'gym or running right after work', why: 'learned exercise gives energy, feel much better' }
                    },
                    {
                        question: 'How often do you go shopping?',
                        sampleAnswer: 'My shopping frequency has changed quite dramatically. In the past, especially during my university years, I used to go shopping almost every weekend - it was my main hobby and social activity. Nowadays, I shop much less frequently, maybe once a month or only when I really need something. This shift happened as I became more financially conscious and realized I was buying things impulsively. Now I\'m much more intentional with my purchases.',
                        pastPresent: { past: 'almost every weekend in university, main hobby', present: 'once monthly or only when needed', why: 'became financially conscious, stopped impulsive buying' }
                    }
                ],
                aiPromptTemplate: `Student learned Past vs Present comparison technique.

Question: {{question}}
Student answer: {{studentResponse}}

Evaluate:
⏮️ Past: Did they describe how things were before?
⏭️ Present: Did they describe how things are now?
🔄 Transition: Smooth comparison?
📈 Development: Did they explain what changed or why?
💬 Naturalness: Does it sound conversational?
🎯 Band Estimate: [5.5-7.5]

Provide specific feedback and one suggestion for improvement.`
            },
            {
                id: 'm2_personal_general',
                type: 'audio_lesson',
                title: 'Personal + General Approach',
                audioScript: {
                    text: `Here's a sophisticated technique that Band 7 and 8 candidates often use: start with personal experience, then broaden to a general observation. This shows you can think beyond just yourself. The structure: first, answer from YOUR perspective with specific details. Then, add what you've noticed about OTHER people or society in general. Let me show you. Question: "Do people in your country enjoy sports?" Answer: "Well, speaking personally, I'm quite into badminton and I try to play twice a week with friends. As for the broader picture, I'd say sports are quite popular in my country. You can see parks filled with people jogging or playing football on weekends, and major sporting events always draw huge crowds. So yes, there's definitely a strong sports culture here." Notice what I did? Started with "I," then zoomed out to "people in general." This technique is especially useful for questions that ask about "people" or "your country" - don't just give general observations, make it personal first. Another example: "Is reading popular among young people?" "From my own experience, I read regularly and several of my friends do too, especially on their commutes. However, I've noticed that many young people now prefer shorter content like articles or social media posts rather than full books. So I'd say reading is still popular, but the format has changed." This shows balanced, thoughtful consideration.`,
                    duration: 80
                }
            },
            {
                id: 'm2_personal_general_practice',
                type: 'ai_practice',
                title: 'Personal + General Practice',
                instructions: 'Start with YOUR experience, then broaden to what you observe about others/society.',
                practiceQuestions: [
                    {
                        question: 'Do people in your country like to travel?',
                        sampleAnswer: 'Speaking from my own experience, I absolutely love traveling and try to take at least two trips a year to explore new places. As for the broader picture, I\'d say travel is quite popular in my country. You can see this from how packed airports and tourist destinations get during holiday seasons, and travel agencies are everywhere. People seem to value experiencing different cultures and taking breaks from routine.',
                        personalGeneral: { personal: 'I love traveling, 2 trips yearly', general: 'popular in country - packed destinations, many travel agencies', observation: 'people value culture and breaks' }
                    },
                    {
                        question: 'Is technology important in your country?',
                        sampleAnswer: 'From my personal perspective, technology is absolutely essential - I use my smartphone, laptop, and various apps throughout the day for work and personal life. When I look at society more broadly, I see that my country has embraced technology rapidly. Almost everyone has a smartphone, digital payments are common even in small shops, and tech startups are flourishing. So yes, technology plays a central role in our daily lives.',
                        personalGeneral: { personal: 'absolutely essential, use smartphone/laptop/apps daily', general: 'country embraced rapidly - everyone has phones, digital payments everywhere, startups flourishing', observation: 'central role in daily life' }
                    },
                    {
                        question: 'Do young people eat healthy food?',
                        sampleAnswer: 'Personally, I try to maintain a healthy diet with fruits, vegetables, and whole grains, though I do indulge in junk food occasionally. However, when I observe my peers and younger generation generally, I notice a concerning trend. Many young people rely heavily on fast food and processed snacks due to busy lifestyles and convenience. Though there\'s growing health awareness, I\'d say unhealthy eating is still quite common among youth.',
                        personalGeneral: { personal: 'I try healthy diet with occasional indulgence', general: 'peers rely on fast food/processed snacks', observation: 'convenience trumps health, though awareness growing' }
                    },
                    {
                        question: 'Are people in your country interested in learning English?',
                        sampleAnswer: 'For me personally, learning English has been a priority since childhood because I knew it would open up opportunities. Looking at the bigger picture, there\'s definitely strong interest in English across my country. You see English learning centers in every neighborhood, parents enroll children in English classes from a young age, and English proficiency is often required for good jobs. It\'s viewed as a gateway to better careers and global connections.',
                        personalGeneral: { personal: 'priority since childhood for opportunities', general: 'strong interest nationwide - centers everywhere, early enrollment, job requirement', observation: 'viewed as career and global gateway' }
                    },
                    {
                        question: 'Do people prefer traditional or modern entertainment?',
                        sampleAnswer: 'Personally, I find myself drawn to both - I enjoy streaming modern shows but also appreciate traditional theater performances occasionally. From what I observe in society, there\'s been a clear shift toward modern entertainment. Most people, especially younger generations, prefer Netflix, YouTube, and online gaming over traditional forms. However, traditional entertainment still has its devoted audience, particularly among older people and during cultural festivals.',
                        personalGeneral: { personal: 'drawn to both - streaming + occasional traditional theater', general: 'clear shift to modern - Netflix/YouTube/gaming popular, traditional has older devoted audience', observation: 'generational divide in preferences' }
                    },
                    {
                        question: 'Is family important in your culture?',
                        sampleAnswer: 'From my personal experience, family is extremely important - I stay in close contact with my parents and extended family, and we gather regularly for meals and celebrations. This seems to reflect broader cultural values in my country. Family bonds remain very strong here, with multiple generations often living together or nearby, and major decisions are typically discussed with family members. Family remains the cornerstone of our society.',
                        personalGeneral: { personal: 'extremely important, close contact, regular gatherings', general: 'strong bonds nationwide - multi-generational living, collective decisions', observation: 'cornerstone of society' }
                    },
                    {
                        question: 'Do people in your city use public transportation?',
                        sampleAnswer: 'I personally use public transportation daily - taking the subway to work because it\'s faster and cheaper than driving. From what I can see, public transport is quite popular in my city. During rush hours, trains and buses are packed with commuters, and the government continues investing in expanding the network. While some people still prefer cars for convenience, I\'d say the majority rely on public transit.',
                        personalGeneral: { personal: 'use daily - subway faster and cheaper than driving', general: 'quite popular - packed during rush hour, government investing', observation: 'majority rely on it despite car preference by some' }
                    },
                    {
                        question: 'Are people environmentally conscious?',
                        sampleAnswer: 'Personally, I try to be environmentally conscious - I recycle, use reusable bags, and minimize plastic usage where possible. When I look at society generally, I see growing but still limited environmental awareness. More people are talking about environmental issues and some are making changes, but many still prioritize convenience over sustainability. Younger people tend to be more eco-conscious than older generations, so I think awareness is gradually improving.',
                        personalGeneral: { personal: 'I try - recycle, reusable bags, minimize plastic', general: 'growing but limited - more talk than action, convenience prioritized', observation: 'youth more aware, gradually improving' }
                    },
                    {
                        question: 'Do young people save money or spend it?',
                        sampleAnswer: 'From my own habits, I try to save at least 20% of my income each month while still enjoying life occasionally. Looking at my peers and younger generation broadly, I see a mixed picture. Some young people are quite financially responsible and invest early, but many tend to spend freely on experiences, gadgets, and lifestyle, often living paycheck to paycheck. Economic pressures and consumer culture seem to encourage spending over saving.',
                        personalGeneral: { personal: 'save 20% monthly while enjoying life', general: 'mixed - some responsible investors, many spend freely paycheck to paycheck', observation: 'economic pressure and consumer culture encourage spending' }
                    },
                    {
                        question: 'Is eating out popular in your country?',
                        sampleAnswer: 'I personally eat out quite frequently, probably 3-4 times a week, because I enjoy trying different cuisines and socializing over meals. This seems to be a common pattern across my country. Restaurants are always busy, food delivery services are booming, and dining out has become a major social activity. With more dual-income households and busy lifestyles, eating out has become more of a norm than an occasional treat.',
                        personalGeneral: { personal: 'eat out 3-4 times weekly, enjoy variety and socializing', general: 'common pattern - busy restaurants, booming delivery, major social activity', observation: 'busy lifestyles made it norm vs occasional' }
                    },
                    {
                        question: 'Do people like to read newspapers?',
                        sampleAnswer: 'Personally, I rarely read physical newspapers anymore - I get all my news from online sources and apps on my phone. This reflects a broader trend I observe in society. Physical newspaper readership has declined significantly, especially among younger people who prefer digital news, social media, and instant updates. Older generations still buy newspapers, but overall, traditional print media is definitely declining.',
                        personalGeneral: { personal: 'rarely physical papers, all news from online/apps', general: 'significant decline especially in youth, prefer digital/social media', observation: 'older still buy, but print declining overall' }
                    },
                    {
                        question: 'Are people interested in fashion?',
                        sampleAnswer: 'For me, I have moderate interest in fashion - I like to dress well but don\'t follow every trend obsessively. When I look around, fashion seems quite important in my society, particularly in urban areas. Social media has amplified this interest, with fashion influencers having huge followings. Shopping malls are always crowded, and people pay attention to brands and style. I\'d say fashion consciousness is definitely high, especially among young people.',
                        personalGeneral: { personal: 'moderate interest, dress well without obsessing', general: 'quite important in cities, social media amplified, influencers popular', observation: 'malls crowded, high consciousness especially in youth' }
                    },
                    {
                        question: 'Do people in your country work long hours?',
                        sampleAnswer: 'From my experience, I typically work 9-10 hours a day including commute, which I find quite exhausting. Unfortunately, this seems to be the norm rather than exception in my country. Long working hours are common, with many people working late into the evening or even weekends. Work-life balance is often sacrificed for career advancement. While there\'s growing discussion about reducing hours, the culture of overwork remains deeply ingrained.',
                        personalGeneral: { personal: '9-10 hours daily with commute, quite exhausting', general: 'norm in country - late evenings, weekends common, work-life balance sacrificed', observation: 'growing discussion but overwork culture ingrained' }
                    },
                    {
                        question: 'Is exercise popular among young people?',
                        sampleAnswer: 'I personally make exercise a priority, going to the gym three times a week and running on weekends. When I observe young people generally, I see increasing interest in fitness. Gyms are proliferating, fitness apps are popular, and social media is full of workout content. However, I\'d say it\'s more of a trend among some groups rather than universal - many young people still lead sedentary lifestyles due to work and study pressures.',
                        personalGeneral: { personal: 'priority for me - gym 3x weekly, weekend runs', general: 'increasing interest - gyms proliferating, apps popular, social media content', observation: 'trend among some, but many still sedentary due to pressures' }
                    },
                    {
                        question: 'Do people prefer shopping online or in stores?',
                        sampleAnswer: 'I personally do about 80% of my shopping online because it saves time and offers better variety and prices. From what I observe in society, online shopping has grown dramatically, especially after the pandemic. E-commerce platforms are thriving, and delivery services are everywhere. However, physical stores still have their place, particularly for items people want to see or try first, like clothes and furniture. I\'d say the trend is definitely shifting toward online.',
                        personalGeneral: { personal: '80% online for time, variety, and prices', general: 'dramatic growth post-pandemic, e-commerce thriving, delivery everywhere', observation: 'physical stores for try-first items, but shifting online' }
                    }
                ],
                aiPromptTemplate: `Student learned Personal + General approach.

Question: {{question}}
Student answer: {{studentResponse}}

Check:
👤 Personal: Did they share their own experience first?
🌍 General: Did they broaden to wider observation?
🔗 Connection: Smooth transition between personal and general?
📊 Balance: Good mix of both perspectives?
🎓 Sophistication: Shows thoughtful consideration?
🎯 Band Estimate: [6.0-8.0]

Provide constructive feedback with one enhancement suggestion.`
            },
            {
                id: 'm2_contrast',
                type: 'audio_lesson',
                title: 'The Contrast Technique',
                audioScript: {
                    text: `The contrast technique is brilliant for creating interesting, extended answers. You compare two things to highlight differences. Common contrasts include: yourself versus others, weekdays versus weekends, past versus present, different situations, or different preferences. Let me demonstrate. Question: "How do you spend your free time?" Answer: "It really depends on the day. On weekdays, I tend to stay home and do quiet activities like reading or watching series because I'm usually tired from work. But on weekends, I'm much more active - I meet friends, go to cafés, or explore new places in the city. So my free time activities vary quite a bit depending on how much energy I have." See the contrast? Weekdays versus weekends. Another example: "Do you like cooking?" Answer: "Unlike many of my friends who see cooking as a chore, I actually find it quite enjoyable. While they prefer ordering takeout or eating at restaurants, I like experimenting with recipes at home. I think it's more about personal preference and how much time you have." This compares yourself to others. The word "unlike," "while," "whereas," "but," and "however" are your friends here. They signal contrast. One more: "Do you prefer studying alone or with others?" "For routine studying, I prefer working alone because I can focus better. However, when preparing for exams or working on difficult topics, I find group study more helpful because we can discuss different perspectives. So it really depends on the situation." Situation-based contrast. This technique makes your answers more nuanced and interesting.`,
                    duration: 85
                }
            },
            {
                id: 'm2_contrast_practice',
                type: 'ai_practice',
                title: 'Contrast Technique Practice',
                instructions: 'Use contrast in your answer: yourself vs others, weekdays vs weekends, different situations, etc.',
                practiceQuestions: [
                    {
                        question: 'What do you like to do on weekends?',
                        sampleAnswer: 'It really depends on how I\'m feeling. On some weekends, when I need to recharge, I prefer staying home and doing quiet activities like reading or watching movies. But on other weekends, when I\'m feeling more energetic, I like to go out and explore - visiting new restaurants, hiking, or meeting friends. So my weekend activities vary quite a bit depending on my energy levels.',
                        contrast: { type: 'situation-based', sideA: 'quiet weekends at home reading/movies', sideB: 'active weekends out exploring/hiking/friends', marker: 'but on other weekends' }
                    },
                    {
                        question: 'How do you prefer to communicate with friends?',
                        sampleAnswer: 'Unlike many people my age who rely heavily on texting, I actually prefer voice or video calls for meaningful conversations. While quick messages are fine for simple updates, I find that hearing someone\'s voice creates a much deeper connection. However, I do understand that texts are more convenient, so I use both depending on the situation.',
                        contrast: { type: 'self vs others', sideA: 'others rely on texting', sideB: 'I prefer voice/video for depth', marker: 'unlike, while, however' }
                    },
                    {
                        question: 'Do you like shopping?',
                        sampleAnswer: 'My feelings about shopping depend entirely on what I\'m buying. For everyday items like groceries, I find shopping quite tedious and I just want to get it done quickly. But when I\'m shopping for something special like gifts or tech gadgets, I actually enjoy the research and selection process. So I can\'t say I universally like or dislike shopping - it varies.',
                        contrast: { type: 'different items', sideA: 'everyday groceries tedious, get done quickly', sideB: 'special items/gifts enjoy research process', marker: 'but when, so I can\'t say universally' }
                    },
                    {
                        question: 'What kind of movies do you enjoy?',
                        sampleAnswer: 'My movie preferences are quite mood-dependent. When I want to unwind after a stressful week, I go for lighthearted comedies that don\'t require much thinking. However, when I\'m in a more contemplative mood, I prefer thought-provoking dramas or documentaries that challenge my perspective. So I don\'t stick to just one genre.',
                        contrast: { type: 'mood-based', sideA: 'stressful times = lighthearted comedies', sideB: 'contemplative mood = dramas/documentaries', marker: 'however, when' }
                    },
                    {
                        question: 'How do you usually travel around the city?',
                        sampleAnswer: 'During the work week, I always take the subway because it\'s faster and more predictable than driving in rush hour traffic. But on weekends, I prefer to drive my car since parking is easier and I have more flexibility with my schedule. So my transportation choice really depends on whether it\'s a weekday or weekend.',
                        contrast: { type: 'weekday vs weekend', sideA: 'weekday subway for speed in rush hour', sideB: 'weekend car for parking and flexibility', marker: 'but on weekends' }
                    },
                    {
                        question: 'Do you prefer hot or cold weather?',
                        sampleAnswer: 'Whereas many people love hot summer weather for swimming and outdoor activities, I actually prefer cooler temperatures. Hot weather makes me feel lethargic and uncomfortable, while cool weather energizes me and makes me feel more productive. I suppose everyone has their ideal temperature range, and mine is definitely on the cooler side.',
                        contrast: { type: 'self vs others + temperature', sideA: 'others love hot weather for activities', sideB: 'I prefer cool weather, feels energizing vs lethargic', marker: 'whereas, while' }
                    },
                    {
                        question: 'What time of day do you prefer to study?',
                        sampleAnswer: 'For routine studying and review, I work best in the morning when my mind is fresh and there are fewer distractions. However, for creative tasks or essay writing, I find the evening more productive because I feel more relaxed and ideas flow more naturally. So my ideal study time really depends on the type of work I\'m doing.',
                        contrast: { type: 'task-based', sideA: 'routine study = morning, fresh mind', sideB: 'creative tasks = evening, relaxed and flowing', marker: 'however, for' }
                    },
                    {
                        question: 'Do you like eating at home or at restaurants?',
                        sampleAnswer: 'During busy weekdays, I prefer eating at home because it\'s healthier, cheaper, and I can control what goes into my food. But on weekends or special occasions, I really enjoy going to restaurants because it\'s a social experience and a chance to try dishes I wouldn\'t cook myself. So both have their place in my life.',
                        contrast: { type: 'weekday vs special occasions', sideA: 'weekdays home for health/cost/control', sideB: 'weekends/special restaurants for social/variety', marker: 'but on, so both' }
                    },
                    {
                        question: 'How do you stay informed about news?',
                        sampleAnswer: 'For breaking news and quick updates, I rely on news apps and social media because they deliver information instantly. However, for in-depth analysis and understanding complex issues, I prefer reading long-form articles or watching documentaries. So I use different sources depending on whether I need quick facts or deep understanding.',
                        contrast: { type: 'purpose-based', sideA: 'breaking news = apps/social media for speed', sideB: 'deep understanding = long-form/documentaries', marker: 'however, for' }
                    },
                    {
                        question: 'Do you prefer indoor or outdoor activities?',
                        sampleAnswer: 'In good weather, I definitely prefer being outdoors - hiking, cycling, or even just reading in a park. But when it\'s rainy or extremely hot, I\'m quite happy to stay indoors with activities like cooking, gaming, or watching movies. So my preference really changes with the weather conditions.',
                        contrast: { type: 'weather-based', sideA: 'good weather = outdoor hiking/cycling/park', sideB: 'bad weather = indoor cooking/gaming/movies', marker: 'but when, so my preference' }
                    },
                    {
                        question: 'What type of music do you listen to?',
                        sampleAnswer: 'While I\'m working or studying, I listen to instrumental music or lo-fi beats because lyrics distract me from concentrating. But in my free time, I enjoy vocal music across various genres - pop, rock, jazz - because I can fully appreciate the lyrics and melodies. So my music choice is very context-dependent.',
                        contrast: { type: 'context-based', sideA: 'work/study = instrumental/lo-fi, no distraction', sideB: 'free time = vocal music, appreciate lyrics', marker: 'while, but in' }
                    },
                    {
                        question: 'Do you like visiting museums?',
                        sampleAnswer: 'My interest varies by museum type. Art museums can sometimes feel tedious to me because I don\'t always connect with visual art emotionally. In contrast, I find science and history museums fascinating because they tell stories and explain how things work. So yes, I like museums, but it depends on the subject matter.',
                        contrast: { type: 'museum type', sideA: 'art museums sometimes tedious, don\'t connect', sideB: 'science/history fascinating, tell stories', marker: 'in contrast, but it depends' }
                    },
                    {
                        question: 'How do you celebrate special occasions?',
                        sampleAnswer: 'For family-oriented occasions like birthdays or anniversaries, I prefer intimate gatherings at home or restaurants with close relatives. However, for achievements like graduations or promotions, I like to celebrate with larger groups of friends in more lively settings. So the way I celebrate really depends on the nature of the occasion.',
                        contrast: { type: 'occasion type', sideA: 'family occasions = intimate home/restaurant', sideB: 'achievements = large groups, lively settings', marker: 'however, for' }
                    },
                    {
                        question: 'Do you prefer watching sports or playing them?',
                        sampleAnswer: 'Unlike my brother who loves watching sports on TV for hours, I much prefer actually playing sports myself. Watching feels passive to me, whereas playing gives me exercise, social interaction, and a real sense of achievement. That said, I do occasionally watch major events like the Olympics, but active participation is definitely my preference.',
                        contrast: { type: 'self vs others + activity type', sideA: 'brother loves watching TV for hours', sideB: 'I prefer playing for exercise/social/achievement', marker: 'unlike, whereas, but' }
                    },
                    {
                        question: 'What do you do to relax?',
                        sampleAnswer: 'After mentally exhausting days at work, I relax through physical activities like going for a run or doing yoga because they help me disconnect from mental stress. But after physically tiring days, I prefer passive relaxation like watching series or listening to music. So my relaxation method depends on what type of fatigue I\'m experiencing.',
                        contrast: { type: 'fatigue type', sideA: 'mental exhaustion = physical activities to disconnect', sideB: 'physical tiredness = passive watching/listening', marker: 'but after, so my method depends' }
                    }
                ],
                aiPromptTemplate: `Student learned the Contrast Technique.

Question: {{question}}
Student answer: {{studentResponse}}

Analyze:
⚖️ Contrast Used: What are they comparing?
🔤 Signal Words: Did they use contrast markers (unlike, while, whereas, but, however)?
📐 Balance: Are both sides explained clearly?
✨ Natural Flow: Does the contrast enhance the answer?
🎯 Band Estimate: [6.0-7.5]

Give specific feedback and show how to strengthen the contrast.`
            },
            {
                id: 'm2_feelings',
                type: 'audio_lesson',
                title: 'Feelings + Reasons Method',
                audioScript: {
                    text: `Many students forget the emotional aspect of answers, but expressing feelings makes your responses more engaging and natural. The Feelings plus Reasons method is simple: say how something makes you FEEL, then explain WHY it creates that feeling. This works especially well for questions about preferences and experiences. Let me demonstrate. Question: "Do you enjoy traveling?" Answer: "Yes, absolutely! Traveling makes me feel excited and curious about the world. I think it's because every new place offers different experiences and perspectives. When I visit somewhere new, I feel energized by trying local food, meeting people, and seeing different ways of life. It's that sense of discovery that I find so thrilling." Notice how feelings are central here - excited, curious, energized, thrilling. Another example: "What's your favorite time of year?" Answer: "I really love autumn because it makes me feel peaceful and reflective. There's something calming about the cooler weather and the changing colors of the leaves. I feel more comfortable doing outdoor activities when it's not too hot or too cold, and I enjoy that cozy feeling of wearing sweaters and drinking warm beverages. The whole season just puts me in a good mood." Key feelings vocabulary: excited, calm, energized, relaxed, motivated, inspired, happy, comfortable, stressed, overwhelmed. Use these naturally and always connect them to specific reasons. Don't just say "It makes me happy" - explain WHY it makes you happy. "It makes me happy because I feel accomplished when I finish a good book" - see the difference?`,
                    duration: 80
                }
            },
            {
                id: 'm2_feelings_practice',
                type: 'ai_practice',
                title: 'Feelings + Reasons Practice',
                instructions: 'Focus on expressing HOW things make you feel and explain WHY they create those feelings.',
                practiceQuestions: [
                    {
                        question: 'How do you feel about learning English?',
                        sampleAnswer: 'Learning English makes me feel both excited and challenged at the same time. I feel excited because I know it opens up so many opportunities for my career and allows me to connect with people worldwide. However, it can also feel overwhelming sometimes because there\'s always so much more to learn - new vocabulary, expressions, and cultural nuances. Overall though, the sense of progress I feel when I understand something new is incredibly rewarding.',
                        feelings: { emotions: 'excited, challenged, overwhelmed, rewarding', reasons: 'career opportunities, global connections; but endless learning; progress feels rewarding' }
                    },
                    {
                        question: 'What makes you feel relaxed?',
                        sampleAnswer: 'Reading before bed always makes me feel calm and peaceful. I think it\'s because when I\'m absorbed in a good story, I completely forget about my daily worries and stress from work. The quiet ritual of sitting with a book in my comfortable chair creates this soothing atmosphere that helps my mind unwind. By the time I\'m ready to sleep, I feel completely relaxed and my racing thoughts have settled.',
                        feelings: { emotions: 'calm, peaceful, soothed, relaxed', reasons: 'absorbed in story, forget worries; quiet ritual creates atmosphere; mind unwinds, thoughts settle' }
                    },
                    {
                        question: 'How does music affect your mood?',
                        sampleAnswer: 'Music has a powerful effect on how I feel throughout the day. Upbeat pop music in the morning makes me feel energized and motivated to start my day productively. When I\'m stressed, classical or jazz music helps me feel more centered and calm because the smooth melodies seem to slow down my racing thoughts. Even when I\'m feeling sad, the right music can make me feel understood and less alone, which is strangely comforting.',
                        feelings: { emotions: 'energized, motivated, centered, calm, understood, comforted', reasons: 'upbeat morning boosts energy; smooth melodies slow racing thoughts; sad music creates understanding connection' }
                    },
                    {
                        question: 'What activity makes you feel most energized?',
                        sampleAnswer: 'Going for a run early in the morning makes me feel incredibly energized and alive. I think it\'s because the physical movement gets my blood pumping and releases endorphins, which naturally boost my mood. There\'s also something refreshing about being outside in the cool morning air while the city is just waking up. After my run, I feel ready to tackle anything the day throws at me, and that confidence is really empowering.',
                        feelings: { emotions: 'energized, alive, refreshed, confident, empowered', reasons: 'blood pumping + endorphins boost mood; cool morning air refreshing; ready to tackle challenges' }
                    },
                    {
                        question: 'How do you feel about your daily routine?',
                        sampleAnswer: 'I have mixed feelings about my daily routine. On one hand, it makes me feel secure and organized because I know what to expect each day and can plan accordingly. However, sometimes it makes me feel a bit trapped or monotonous, especially when every day feels exactly the same. I think what I need is some variety to break the pattern, which would help me feel more spontaneous and excited about life.',
                        feelings: { emotions: 'secure, organized, trapped, monotonous, need for spontaneity and excitement', reasons: 'predictability gives security; but sameness feels trapping; variety would create excitement' }
                    },
                    {
                        question: 'What type of weather makes you feel good?',
                        sampleAnswer: 'Cool, sunny weather with a light breeze always makes me feel happy and optimistic. I think it\'s because this kind of weather is perfect for being active outdoors - not too hot to be uncomfortable, but bright enough to lift my spirits. The sunshine specifically makes me feel more cheerful and energetic, probably because of the vitamin D and natural light. Rainy or grey days, in contrast, tend to make me feel sluggish and unmotivated.',
                        feelings: { emotions: 'happy, optimistic, cheerful, energetic; vs sluggish, unmotivated', reasons: 'perfect for outdoor activity; sunshine lifts spirits; vitamin D + natural light boost mood; grey dampens motivation' }
                    },
                    {
                        question: 'How does spending time in nature affect you?',
                        sampleAnswer: 'Being in nature makes me feel incredibly peaceful and grounded. I think it\'s because natural environments provide a break from the constant noise and stimulation of city life, allowing my mind to truly rest. When I\'m hiking in the forest or sitting by a lake, I feel connected to something bigger than my daily concerns, which puts things in perspective. It\'s almost meditative and always leaves me feeling refreshed and mentally clearer.',
                        feelings: { emotions: 'peaceful, grounded, connected, refreshed, mentally clear', reasons: 'break from city noise allows mind to rest; connection to bigger picture; meditative quality clears mind' }
                    },
                    {
                        question: 'What makes you feel stressed?',
                        sampleAnswer: 'Tight deadlines at work always make me feel anxious and overwhelmed. I think it\'s because I\'m naturally a perfectionist, so when I don\'t have enough time to do something properly, I feel frustrated and pressured. The constant worry about not meeting expectations or disappointing people creates this heavy tension in my chest. Even though I usually manage to complete tasks on time, the stress during the process makes me feel emotionally drained.',
                        feelings: { emotions: 'anxious, overwhelmed, frustrated, pressured, tense, drained', reasons: 'perfectionist needs time for quality; worry about expectations; constant pressure emotionally exhausting' }
                    },
                    {
                        question: 'How do you feel about meeting new people?',
                        sampleAnswer: 'Meeting new people makes me feel both excited and nervous at the same time. I feel excited because I enjoy learning about different perspectives and potentially forming new friendships, which makes life more interesting. However, I also feel a bit nervous initially because I\'m not sure how the interaction will go or if we\'ll connect well. Once the conversation starts flowing though, I usually feel more comfortable and the nervousness fades into genuine interest.',
                        feelings: { emotions: 'excited, nervous, interested, comfortable', reasons: 'enjoy new perspectives and friendships; but uncertain about connection; flowing conversation builds comfort' }
                    },
                    {
                        question: 'What hobby makes you feel most satisfied?',
                        sampleAnswer: 'Photography makes me feel incredibly satisfied and accomplished. I think it\'s because when I capture a beautiful moment or composition, there\'s this sense of having created something meaningful that will last. The process of improving my skills over time makes me feel proud of my progress, and when others appreciate my photos, it validates my effort. It\'s one of the few activities that leaves me feeling both creatively fulfilled and technically challenged.',
                        feelings: { emotions: 'satisfied, accomplished, proud, validated, creatively fulfilled, challenged', reasons: 'creating lasting meaningful moments; visible skill progress; others\' appreciation validates effort; creative + technical balance' }
                    },
                    {
                        question: 'How does exercise make you feel?',
                        sampleAnswer: 'Exercise always makes me feel better, both physically and mentally. During the workout, I initially feel challenged and sometimes uncomfortable, but there\'s also a sense of determination and strength building. Afterward, I feel accomplished and proud for pushing through, and the endorphin release creates this natural high that makes me feel happy and energized. Even on days I don\'t want to exercise, I never regret it because I always feel more positive and confident afterward.',
                        feelings: { emotions: 'challenged, uncomfortable, determined, strong, accomplished, proud, happy, energized, positive, confident', reasons: 'pushing limits builds strength; completion brings pride; endorphins create natural high; boosts overall mood and confidence' }
                    },
                    {
                        question: 'What type of food makes you feel happy?',
                        sampleAnswer: 'Comfort foods like pasta or homemade soup make me feel warm and happy inside. I think it\'s because these foods are associated with positive memories from childhood when my family would gather for meals. The familiar tastes and aromas create a sense of nostalgia that feels comforting and secure. Even when I\'m feeling down, a bowl of my favorite pasta makes me feel cared for and content, almost like a warm hug.',
                        feelings: { emotions: 'warm, happy, nostalgic, comforting, secure, cared for, content', reasons: 'childhood family memories; familiar tastes/aromas; creates sense of being cared for like warm hug' }
                    },
                    {
                        question: 'How do you feel about working in teams?',
                        sampleAnswer: 'Working in teams makes me feel energized but sometimes frustrated. I feel energized because bouncing ideas off others sparks creativity and we can achieve more together than individually. The collaborative energy and shared goals create a sense of camaraderie that I find motivating. However, I can feel frustrated when team members don\'t pull their weight or when decision-making takes too long due to conflicting opinions. Overall though, when teams work well, I feel inspired and more productive.',
                        feelings: { emotions: 'energized, frustrated, creative, motivated, inspired, productive', reasons: 'collaboration sparks creativity and achievement; camaraderie motivates; but unequal effort frustrates; slow decisions due to conflicts; good teams inspire' }
                    },
                    {
                        question: 'What makes you feel proud of yourself?',
                        sampleAnswer: 'Overcoming challenges makes me feel most proud of myself. I think it\'s because when I push through difficult situations - whether it\'s a tough project at work or a personal goal - I prove to myself that I\'m capable and resilient. The sense of achievement when I succeed after struggling makes me feel strong and confident in my abilities. It also gives me courage to tackle future challenges because I know I have the determination to overcome obstacles.',
                        feelings: { emotions: 'proud, capable, resilient, strong, confident, courageous, determined', reasons: 'proving capability through struggle; achievement after difficulty; builds confidence; gives courage for future challenges' }
                    },
                    {
                        question: 'How does your home environment affect your mood?',
                        sampleAnswer: 'My home environment has a huge impact on how I feel. When my space is clean and organized, I feel calm, focused, and in control of my life. The orderliness creates a sense of peace that helps me think clearly and feel less stressed. However, when things are messy or cluttered, I feel anxious and overwhelmed because the physical chaos seems to mirror mental chaos. That\'s why I always try to maintain a tidy space - it directly affects my emotional well-being.',
                        feelings: { emotions: 'calm, focused, in control, peaceful, clear-minded; vs anxious, overwhelmed', reasons: 'clean/organized creates peace and control; helps thinking clarity; mess mirrors mental chaos; direct link to emotional well-being' }
                    }
                ],
                aiPromptTemplate: `Student learned Feelings + Reasons method.

Question: {{question}}
Student answer: {{studentResponse}}

Evaluate:
💙 Feelings Expressed: What emotions did they mention?
🔍 Reasons Given: Did they explain WHY those feelings occur?
🎭 Authenticity: Does it sound genuine and personal?
📚 Vocabulary: Appropriate feelings words used?
🎯 Band Estimate: [5.5-7.5]

Provide feedback with suggestions for more emotional vocabulary if needed.`
            },
            {
                id: 'm2_frequency',
                type: 'audio_lesson',
                title: 'Frequency + Details Method',
                audioScript: {
                    text: `The Frequency plus Details method is perfect for extending answers about activities and habits. Instead of just saying "yes" or "no," you specify HOW OFTEN and add SPECIFIC CIRCUMSTANCES or variations. This creates natural, extended responses. Here's the pattern: state the frequency, then add details about different scenarios or exceptions. Let me show you. Question: "Do you exercise?" Answer: "Yes, I exercise regularly - usually about three times a week. I typically go jogging on Monday and Wednesday mornings before work, and then I do yoga at home on Saturday afternoons. Occasionally, if I'm particularly busy, I might skip a session, but I try to maintain that routine because it helps me feel energized throughout the week." See what I did? Frequency words: regularly, usually, typically, occasionally. Then specific details: what days, what times, what types of exercise. Another example: "Do you eat out much?" Answer: "I eat out fairly often, probably two or three times a week. During the work week, I sometimes grab lunch at cafés near my office, especially on busy days when I don't have time to prepare food. On weekends, I usually go to restaurants with friends or family for dinner. But I do cook at home most evenings because it's healthier and more economical." Notice the variations: weekdays versus weekends, lunch versus dinner, with friends versus alone. Key frequency expressions: always, usually, often, regularly, sometimes, occasionally, rarely, seldom, never, every day, twice a week, from time to time, once in a while. Use these to show patterns and variations in your habits.`,
                    duration: 85
                }
            },
            {
                id: 'm2_frequency_practice',
                type: 'ai_practice',
                title: 'Frequency + Details Practice',
                instructions: 'State HOW OFTEN you do something, then add specific details and variations.',
                practiceQuestions: [
                    {
                        question: 'How often do you use your phone?',
                        sampleAnswer: 'I use my phone constantly throughout the day - probably checking it every 10-15 minutes on average. During work hours, I mainly use it for professional communication like emails and messaging colleagues. In the evenings, my usage shifts to social media and entertainment. On weekends, I try to reduce my phone time and only check it occasionally, maybe once every hour or two, because I want to be more present with family and friends.',
                        frequency: { main: 'constantly, every 10-15 minutes', variations: 'work hours = emails/messaging; evenings = social media/entertainment; weekends = occasionally, once per hour to be present' }
                    },
                    {
                        question: 'Do you watch TV regularly?',
                        sampleAnswer: 'Yes, I watch TV quite regularly - about 1-2 hours each evening after dinner. On weekdays, I usually stick to one or two episodes of a series because I have limited time before bed. However, on weekends, I sometimes binge-watch shows for 3-4 hours, especially if it\'s a new season of something I\'ve been waiting for. Occasionally, during busy work weeks, I might skip TV entirely for a few days.',
                        frequency: { main: 'regularly, 1-2 hours nightly', variations: 'weekdays = 1-2 episodes only; weekends = 3-4 hour binges; busy weeks = skip entirely' }
                    },
                    {
                        question: 'How often do you go shopping?',
                        sampleAnswer: 'I go grocery shopping once a week, typically on Saturday mornings when stores are less crowded. For clothes and other items, I shop much less frequently - maybe once every 2-3 months or only when I need something specific. Online shopping is more frequent though, probably 2-3 times a month for various items. During sale seasons, I admit I shop more often, sometimes weekly, to catch good deals.',
                        frequency: { main: 'groceries weekly; clothes every 2-3 months; online 2-3 times monthly', variations: 'Saturday mornings for groceries; only when needed for clothes; sale seasons = weekly for deals' }
                    },
                    {
                        question: 'Do you read books often?',
                        sampleAnswer: 'I read daily, usually for about 30-45 minutes before bed. During the week, I stick to lighter fiction that\'s easy to follow when I\'m tired. On weekends, I sometimes read for longer stretches, up to 2 hours at a time, especially if the book is really engaging. During holidays, my reading increases significantly - I can finish a book every 2-3 days when I have free time.',
                        frequency: { main: 'daily 30-45 minutes before bed', variations: 'weekdays = light fiction; weekends = up to 2 hours if engaging; holidays = book every 2-3 days' }
                    },
                    {
                        question: 'How frequently do you see your friends?',
                        sampleAnswer: 'I see my close friends about 2-3 times a month, usually on weekends for dinner or coffee. With work colleagues, we occasionally grab lunch together once or twice a week. During busy periods like exam seasons or project deadlines, I might not see friends for 2-3 weeks. However, we stay in touch daily through messaging even when we can\'t meet in person.',
                        frequency: { main: 'close friends 2-3 times monthly; colleagues 1-2 times weekly', variations: 'weekends for dinner/coffee; busy periods = 2-3 weeks gap; daily messaging regardless' }
                    },
                    {
                        question: 'Do you use social media much?',
                        sampleAnswer: 'I use social media moderately - about 30-60 minutes total per day, spread throughout the day. In the morning, I spend 10-15 minutes scrolling through updates while having coffee. During lunch breaks, I check for about 15-20 minutes. In the evening, I might spend 20-30 minutes catching up on posts and stories. I deliberately avoid social media after 9 PM to maintain better sleep.',
                        frequency: { main: '30-60 minutes daily, spread out', variations: 'morning 10-15 min with coffee; lunch 15-20 min; evening 20-30 min; after 9 PM = avoid for sleep' }
                    },
                    {
                        question: 'How often do you travel?',
                        sampleAnswer: 'I take major trips about 2-3 times a year, usually during holiday seasons and my annual leave. For weekend getaways to nearby cities, I travel more frequently, roughly once every 2 months. Business trips happen occasionally, maybe 3-4 times a year depending on work requirements. During summer, my travel frequency peaks - I might take 2-3 trips in just that season.',
                        frequency: { main: 'major trips 2-3 times yearly; weekend getaways every 2 months', variations: 'holidays and annual leave; business 3-4 times yearly; summer peak = 2-3 trips in season' }
                    },
                    {
                        question: 'Do you cook regularly?',
                        sampleAnswer: 'Yes, I cook almost every day - typically 5-6 days a week for dinner. On weeknights, I prepare simple meals like stir-fries or pasta that take 20-30 minutes. Weekends are when I cook more elaborate dishes and might spend 1-2 hours trying new recipes. On particularly busy or exhausting days, I order takeout instead, which happens maybe once a week.',
                        frequency: { main: 'almost daily, 5-6 days weekly', variations: 'weeknights = simple 20-30 min meals; weekends = elaborate 1-2 hour recipes; once weekly = takeout when busy/tired' }
                    },
                    {
                        question: 'How often do you exercise?',
                        sampleAnswer: 'I exercise 4-5 times a week, usually in the morning before work. Three of those days, I do cardio like running or cycling for 30-40 minutes. The other 1-2 days, I focus on strength training or yoga for about 45 minutes. Occasionally, when I\'m traveling or very busy, I might miss a week entirely, but I always get back to my routine as soon as possible.',
                        frequency: { main: '4-5 times weekly, morning before work', variations: '3 days cardio 30-40 min; 1-2 days strength/yoga 45 min; travel/busy = might miss full week but resume' }
                    },
                    {
                        question: 'Do you go to the cinema much?',
                        sampleAnswer: 'I go to the cinema about once a month on average, though it varies depending on movie releases. When there are several good movies out, I might go 2-3 times in a month. During quiet periods with fewer interesting releases, I might not go for 2-3 months. I typically go on weekend evenings to avoid crowds, and occasionally for weekday matinees when I have time off.',
                        frequency: { main: 'about once monthly average', variations: 'good releases = 2-3 times monthly; quiet periods = skip 2-3 months; weekend evenings usual; occasional weekday matinees' }
                    },
                    {
                        question: 'How frequently do you eat fast food?',
                        sampleAnswer: 'I eat fast food fairly rarely - maybe 2-3 times a month at most. It\'s usually when I\'m in a rush and need a quick meal between appointments. On road trips or when traveling, I might have it more frequently, perhaps once a day if there aren\'t better options. However, I actively try to avoid it during normal weeks because I prefer healthier options.',
                        frequency: { main: 'rarely, 2-3 times monthly max', variations: 'when rushing between appointments; road trips = once daily if limited options; normal weeks = actively avoid for health' }
                    },
                    {
                        question: 'Do you listen to music often?',
                        sampleAnswer: 'Yes, I listen to music almost constantly - probably 4-6 hours a day in total. During my morning and evening commutes, I always have music or podcasts playing for about an hour each way. While working, I play instrumental music in the background for 4-5 hours to help concentration. At the gym, I listen to upbeat music for 30-45 minutes. Only during meetings or focused tasks do I not listen to anything.',
                        frequency: { main: 'almost constantly, 4-6 hours daily', variations: 'commute 1 hour each way; work 4-5 hours instrumental; gym 30-45 min upbeat; silent during meetings/focused work' }
                    },
                    {
                        question: 'How often do you clean your room?',
                        sampleAnswer: 'I do light cleaning daily - making my bed every morning and tidying up clutter each evening before bed. A more thorough cleaning happens once a week, usually on Sunday mornings, including vacuuming, dusting, and organizing. Deep cleaning with tasks like washing windows or reorganizing closets happens monthly or every 6 weeks. When I\'m very busy with work, I might skip the weekly deep clean and just do the daily maintenance.',
                        frequency: { main: 'light daily; thorough weekly; deep monthly', variations: 'bed + clutter daily; Sunday thorough cleaning; windows/closets every 6 weeks; busy times = skip thorough, keep daily' }
                    },
                    {
                        question: 'Do you play sports regularly?',
                        sampleAnswer: 'Yes, I play badminton regularly - twice a week on Tuesday and Thursday evenings at a local sports center. During summer, I increase to three times a week because the weather is nice and I have more energy. In winter, sometimes I reduce to once a week or take breaks when it\'s too cold or I\'m not feeling well. Occasionally, I also play casual games with friends on weekends, though this is less regular.',
                        frequency: { main: 'regularly twice weekly, Tuesday/Thursday evenings', variations: 'summer = three times weekly; winter = once weekly or breaks; occasional weekend casual games' }
                    },
                    {
                        question: 'How often do you check your email?',
                        sampleAnswer: 'I check my work email constantly during office hours - probably every 30 minutes to stay on top of important messages. First thing in the morning, I spend 15-20 minutes going through overnight emails. Throughout the workday, I check it briefly between tasks. Personal email, I check much less frequently - usually once in the evening and maybe once on weekend mornings. During vacations, I try to check work email only once daily, just for urgent matters.',
                        frequency: { main: 'work email every 30 min during office hours; personal once evening + weekend mornings', variations: 'morning 15-20 min review; between tasks brief checks; vacations = once daily urgent only' }
                    }
                ],
                aiPromptTemplate: `Student learned Frequency + Details method.

Question: {{question}}
Student answer: {{studentResponse}}

Check:
⏰ Frequency: Did they specify how often? (used frequency words?)
📝 Details: Did they add specific circumstances?
🔄 Variations: Did they mention different scenarios/exceptions?
🎯 Specificity: Concrete details vs vague statements?
📊 Band Estimate: [5.5-7.5]

Provide feedback showing how to add more specific variations if needed.`
            },
            {
                id: 'm2_selection_guide',
                type: 'interactive_guide',
                title: 'Technique Selection Guide',
                description: 'Learn when to use which technique for maximum impact',
                content: {
                    guide: [
                        {
                            questionType: 'Opinion/Preference Questions (Do you think...? Do you prefer...?)',
                            bestTechniques: ['PREP Method', 'Contrast Technique'],
                            reason: 'PREP gives clear structure for opinions. Contrast shows nuanced thinking.'
                        },
                        {
                            questionType: 'Habit/Frequency Questions (How often...? Do you usually...?)',
                            bestTechniques: ['Frequency + Details', '5W1H'],
                            reason: 'Frequency + Details directly addresses the question. 5W1H adds depth.'
                        },
                        {
                            questionType: 'Change Over Time (Have your habits changed...?)',
                            bestTechniques: ['Past vs Present', '5W1H'],
                            reason: 'Past vs Present is perfect for showing development over time.'
                        },
                        {
                            questionType: 'About "People" or "Your Country" (Do people in your country...?)',
                            bestTechniques: ['Personal + General', 'Contrast'],
                            reason: 'Personal + General shows sophisticated thinking. Contrast shows awareness of differences.'
                        },
                        {
                            questionType: 'Experience Questions (What do you enjoy...? How do you feel...?)',
                            bestTechniques: ['Feelings + Reasons', '5W1H'],
                            reason: 'Feelings + Reasons creates engaging, authentic answers.'
                        },
                        {
                            questionType: 'Any General Question',
                            bestTechniques: ['5W1H', 'PREP'],
                            reason: 'These are versatile techniques that work for almost any question.'
                        }
                    ]
                },
                practiceSection: {
                    instructions: 'Look at each question and decide which technique would work best. Then answer using that technique.',
                    questions: [
                        { q: 'Do you think children should spend more time outdoors?', type: 'opinion' },
                        { q: 'How has technology changed the way you communicate?', type: 'change' },
                        { q: 'Do people in your country enjoy cooking?', type: 'people' },
                        { q: 'How often do you visit your relatives?', type: 'frequency' },
                        { q: 'What makes you feel motivated to work hard?', type: 'experience' }
                    ]
                }
            },
            {
                id: 'm2_mixed_practice',
                type: 'ai_conversation',
                title: 'Mixed Practice: Use Different Techniques',
                instructions: 'Practice Part 1 with variety. Try to use DIFFERENT techniques for each question to show versatility.',
                conversationSettings: {
                    numberOfQuestions: 8,
                    focusArea: 'technique_variety',
                    feedbackStyle: 'technique_identification'
                },
                aiSystemPrompt: `You are an IELTS examiner. The student learned 6 techniques:
1. 5W1H (Who, What, When, Where, Why, How)
2. PREP (Point, Reason, Example, Point)
3. Past vs Present Comparison
4. Personal + General Approach
5. Contrast Technique
6. Feelings + Reasons Method
7. Frequency + Details

Conduct Part 1 with 8 questions covering different question types.

After EACH answer:
1. Identify which technique(s) they used
2. Brief praise for what worked well
3. Suggest which technique might have been even better if they chose a suboptimal one

After ALL 8 questions:
Give comprehensive feedback:
- Technique variety score (did they mix techniques?)
- Band estimate (6.0-8.0)
- Strengths (2-3 points)
- Suggestions for improvement

Encourage versatility and natural use of different approaches.`
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

// Export to window for global access
if (typeof window !== 'undefined') {
    window.IELTS_LESSONS = IELTS_LESSONS;
    window.LESSON_CONSTANTS = LESSON_CONSTANTS;
}

// Initialize progress tracker
if (typeof window !== 'undefined') {
    window.lessonProgress = new LessonProgress();
}
