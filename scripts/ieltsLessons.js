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
                        sampleAnswer: 'I really enjoy listening to jazz music, particularly in the evenings when I want to unwind after a long day. I usually play it at home or during my commute because the smooth melodies help me feel relaxed and focused. What I love most about jazz is how it can be both soothing and intellectually stimulating at the same time.'
                    },
                    {
                        question: 'Do you enjoy watching movies?',
                        sampleAnswer: 'Yes, I absolutely love watching movies, especially thriller and sci-fi films. I typically watch them on weekends at home with my family, though occasionally I go to the cinema for big releases. Movies help me escape from daily stress and I find the storytelling really engaging and thought-provoking.'
                    },
                    {
                        question: 'What do you like to do on weekends?',
                        sampleAnswer: 'On weekends, I usually spend time exploring new cafés and restaurants around the city with my friends. We typically go out on Saturday afternoons because it gives us a chance to relax and catch up after a busy week. I also enjoy trying different cuisines, which makes these outings both fun and interesting.'
                    },
                    {
                        question: 'Do you have any hobbies?',
                        sampleAnswer: 'Yes, I\'m really into photography, which I\'ve been practicing for about three years now. I usually take photos during my travels or even just around my neighborhood on weekends. Photography helps me see the world differently and capture meaningful moments, which is why I find it so rewarding.'
                    },
                    {
                        question: 'What do you do in your free time?',
                        sampleAnswer: 'In my free time, I enjoy reading mystery novels and playing tennis. I usually read before bed because it helps me relax, and I play tennis twice a week at a local court with some friends. Both activities help me unwind and stay physically and mentally active.'
                    },

                    // Daily Life (5)
                    {
                        question: 'Do you prefer studying alone or with others?',
                        sampleAnswer: 'I generally prefer studying alone, especially when I need to focus on complex material. I usually study in my room or at the library because quiet environments help me concentrate better. However, I do study with classmates sometimes when we have group projects, as it helps us share different perspectives and ideas.'
                    },
                    {
                        question: 'What time do you usually wake up?',
                        sampleAnswer: 'I typically wake up around 6:30 AM on weekdays so I have enough time to prepare for work and avoid the morning rush. On weekends, I usually sleep in until about 8 or 9 AM because I like to catch up on rest. Waking up early during the week helps me feel more productive throughout the day.'
                    },
                    {
                        question: 'How do you usually spend your evenings?',
                        sampleAnswer: 'Most evenings, I spend time at home either cooking dinner or watching series on Netflix to relax. I usually finish work around 6 PM, so my evenings are when I can unwind and do things I enjoy. Sometimes I also call friends or family to catch up, which helps me feel connected.'
                    },
                    {
                        question: 'Do you prefer eating at home or at restaurants?',
                        sampleAnswer: 'I prefer eating at home most of the time because it\'s healthier and more economical. I usually cook simple meals like pasta or stir-fries during weekdays when I\'m busy. However, I do enjoy going to restaurants on weekends with friends or family as it\'s a nice way to socialize and try new dishes.'
                    },
                    {
                        question: 'What do you usually do after work/school?',
                        sampleAnswer: 'After work, I usually go for a quick walk or jog to clear my mind and get some exercise. This typically takes about 30 minutes, and I do it in a nearby park because the fresh air helps me decompress. After that, I head home to prepare dinner and spend the rest of the evening relaxing.'
                    },

                    // Activities & Sports (5)
                    {
                        question: 'Do you like playing sports?',
                        sampleAnswer: 'Yes, I really enjoy playing badminton, which I usually do twice a week at a community sports center. I started playing with friends from university, and now it\'s become a regular activity for us. Sports help me stay fit and are a great way to socialize, which is why I find them so enjoyable.'
                    },
                    {
                        question: 'Do you enjoy outdoor activities?',
                        sampleAnswer: 'Absolutely! I love hiking in the mountains, especially during spring and autumn when the weather is perfect. I usually go with a group of friends on weekends because it\'s safer and more fun together. Being outdoors helps me disconnect from technology and appreciate nature, which I find really refreshing.'
                    },
                    {
                        question: 'Have you ever tried swimming?',
                        sampleAnswer: 'Yes, I learned to swim when I was about seven years old, and I still swim occasionally at a local pool. I usually go swimming during summer because it\'s a great way to cool down and stay active. Swimming is excellent exercise and it helps me feel energized without putting too much stress on my joints.'
                    },
                    {
                        question: 'Do you like going to the gym?',
                        sampleAnswer: 'Yes, I try to go to the gym three times a week, usually in the evenings after work. I mainly focus on cardio and weight training because they help me maintain my fitness and reduce stress. The gym near my house is quite convenient, and I find that regular exercise really improves my mood and energy levels.'
                    },
                    {
                        question: 'What kind of exercise do you do?',
                        sampleAnswer: 'I mainly do jogging and yoga to stay healthy. I jog in the park near my home early in the morning about four times a week, and I practice yoga at home on other days. Jogging helps me build endurance while yoga improves my flexibility and mental clarity, so together they give me a balanced workout routine.'
                    },

                    // Technology & Media (5)
                    {
                        question: 'Do you use social media?',
                        sampleAnswer: 'Yes, I use social media daily, mainly Instagram and Facebook to stay connected with friends and family. I usually check them during breaks at work or in the evening when I\'m relaxing at home. Social media helps me keep up with what\'s happening in my friends\' lives, though I try not to spend too much time on it.'
                    },
                    {
                        question: 'What do you use your phone for most?',
                        sampleAnswer: 'I mainly use my phone for messaging and checking emails, especially for work-related communications. I also use it for navigation when I\'m driving and for listening to music during my commute. My phone has become essential for staying organized and connected throughout the day.'
                    },
                    {
                        question: 'Do you like watching TV shows?',
                        sampleAnswer: 'Yes, I enjoy watching TV shows, particularly crime dramas and documentaries. I usually watch them in the evenings after dinner as a way to unwind before bed. Streaming services like Netflix make it convenient because I can watch episodes at my own pace without waiting for weekly releases.'
                    },
                    {
                        question: 'Do you prefer online shopping or in-store shopping?',
                        sampleAnswer: 'I prefer online shopping for most things because it\'s more convenient and saves time. I usually shop online during weekends when I have time to browse different websites and compare prices. However, for clothes and shoes, I still prefer shopping in-store because I like to try them on before buying.'
                    },
                    {
                        question: 'How often do you use the internet?',
                        sampleAnswer: 'I use the internet constantly throughout the day, both for work and personal purposes. At work, I need it for research and communication, and at home, I use it for entertainment and staying informed. I probably spend around 6-8 hours online daily, which is quite typical these days.'
                    },

                    // People & Relationships (5)
                    {
                        question: 'Do you spend a lot of time with your family?',
                        sampleAnswer: 'Yes, I try to spend quality time with my family, especially on weekends when everyone is free. We usually have dinner together and sometimes go out for activities like hiking or watching movies. Family time is important to me because it helps us stay connected despite our busy schedules.'
                    },
                    {
                        question: 'Do you have many friends?',
                        sampleAnswer: 'I have a small but close group of friends whom I\'ve known for several years. We usually meet up once or twice a month for dinner or coffee to catch up. I prefer having a few close friends rather than many acquaintances because deeper friendships are more meaningful to me.'
                    },
                    {
                        question: 'Do you like meeting new people?',
                        sampleAnswer: 'Yes, I generally enjoy meeting new people, especially in professional or social settings. I usually meet new people through work events or through mutual friends at gatherings. Meeting new people helps me learn different perspectives and expand my network, which I find both interesting and valuable.'
                    },
                    {
                        question: 'Do you keep in touch with childhood friends?',
                        sampleAnswer: 'Yes, I\'m still in contact with two of my closest childhood friends, though we don\'t see each other as often as before. We usually chat online or meet up a few times a year when everyone is available. It\'s nice to maintain these friendships because we share so many memories from growing up together.'
                    },
                    {
                        question: 'Do you prefer spending time alone or with others?',
                        sampleAnswer: 'It really depends on my mood and energy levels. I enjoy spending time with friends and family on weekends because it\'s fun and energizing. However, I also value alone time during weekdays to recharge and focus on personal activities like reading or hobbies.'
                    },

                    // Learning & Work (5)
                    {
                        question: 'What do you find most interesting about your studies?',
                        sampleAnswer: 'I find the practical applications of what I learn most interesting, especially when we work on real-world projects. In my business course, we analyze actual companies and their strategies, which makes the learning much more engaging. This hands-on approach helps me understand how theories work in practice.'
                    },
                    {
                        question: 'Do you enjoy learning new things?',
                        sampleAnswer: 'Absolutely! I love learning new things, especially skills that I can apply in my daily life or career. Recently, I\'ve been learning graphic design through online courses during my free time. Learning keeps my mind active and helps me stay curious about the world around me.'
                    },
                    {
                        question: 'What was your favorite subject at school?',
                        sampleAnswer: 'My favorite subject was history because I found it fascinating to learn about how societies developed over time. I particularly enjoyed our teacher\'s storytelling approach, which made historical events come alive. History classes taught me to think critically about cause and effect, which is useful even now.'
                    },
                    {
                        question: 'Do you think your job is interesting?',
                        sampleAnswer: 'Yes, I find my job as a marketing coordinator quite interesting because every project is different and challenging. I work with various clients across different industries, which means I\'m constantly learning about new products and markets. The creative aspect of developing campaigns keeps the work engaging and never boring.'
                    },
                    {
                        question: 'Would you like to change your job in the future?',
                        sampleAnswer: 'Eventually, yes. I\'m happy with my current position, but I\'d like to move into a management role in the next few years where I can lead projects and mentor others. I believe gaining more experience now will prepare me for those responsibilities, so I\'m focused on developing my skills.'
                    },

                    // Places & Travel (5)
                    {
                        question: 'Do you like traveling to new places?',
                        sampleAnswer: 'Yes, I absolutely love traveling to new places whenever I get the chance. I usually take one or two trips a year, either to explore different cities in my country or to visit neighboring countries. Traveling broadens my perspective and allows me to experience different cultures and cuisines.'
                    },
                    {
                        question: 'What is your hometown like?',
                        sampleAnswer: 'My hometown is a medium-sized coastal city with a relaxed atmosphere and beautiful beaches. It has a good mix of modern amenities and historical sites, which makes it attractive to both residents and tourists. I really appreciate growing up there because it gave me access to both nature and urban facilities.'
                    },
                    {
                        question: 'Do you prefer the city or the countryside?',
                        sampleAnswer: 'I prefer living in the city because I enjoy having easy access to restaurants, entertainment, and career opportunities. However, I do appreciate visiting the countryside on weekends for a change of pace and to enjoy the peace and natural scenery. Ideally, I\'d like to live near a city but not right in the center.'
                    },
                    {
                        question: 'Have you ever been abroad?',
                        sampleAnswer: 'Yes, I\'ve been abroad several times, mainly to Southeast Asian countries like Thailand and Singapore. I usually travel during my annual vacation because it\'s the best time to take extended trips. Traveling abroad has taught me a lot about different cultures and helped me become more open-minded and adaptable.'
                    },
                    {
                        question: 'Where would you like to visit in the future?',
                        sampleAnswer: 'I\'d really love to visit Japan, particularly during cherry blossom season in spring. I\'m fascinated by Japanese culture, especially their blend of traditional values and modern technology. I\'ve been researching the best places to visit in Tokyo and Kyoto, and I hope to make this trip happen within the next two years.'
                    },

                    // Food & Cooking (5)
                    {
                        question: 'Do you like cooking?',
                        sampleAnswer: 'Yes, I enjoy cooking, especially on weekends when I have more time to experiment with new recipes. I usually cook Italian and Asian dishes because they\'re flavorful and not too complicated. Cooking is relaxing for me, and I find it satisfying to create something delicious from scratch.'
                    },
                    {
                        question: 'What is your favorite food?',
                        sampleAnswer: 'My favorite food is definitely sushi because I love the fresh flavors and the variety of options available. I usually have sushi at restaurants rather than making it at home since it requires specific skills and ingredients. What I particularly enjoy is how sushi can be both simple and sophisticated at the same time.'
                    },
                    {
                        question: 'Do you often eat out?',
                        sampleAnswer: 'I eat out about two or three times a week, usually during weekends or when I\'m too busy to cook after work. I typically go to casual restaurants or cafés near my office or home. Eating out is convenient and also gives me a chance to try different cuisines that I might not cook at home.'
                    },
                    {
                        question: 'Do you like trying new foods?',
                        sampleAnswer: 'Yes, I\'m quite adventurous when it comes to food and I enjoy trying dishes from different cultures. Whenever I travel or visit a new restaurant, I usually order something I\'ve never had before. Trying new foods has broadened my palate and made me appreciate how diverse and interesting cuisine can be.'
                    },
                    {
                        question: 'Can you cook traditional food from your country?',
                        sampleAnswer: 'Yes, I can cook several traditional dishes from my country, which I learned from my mother when I was younger. I usually prepare these dishes during special occasions or when I miss home-cooked meals. Cooking traditional food helps me maintain a connection to my cultural roots and it\'s something I enjoy sharing with friends.'
                    },

                    // Weather & Seasons (5)
                    {
                        question: 'What is the weather like in your hometown?',
                        sampleAnswer: 'My hometown has a tropical climate with hot and humid weather throughout most of the year. We have two main seasons: a rainy season from June to October and a dry season from November to May. The temperature usually stays around 30 degrees Celsius, which can be quite intense during the dry months.'
                    },
                    {
                        question: 'Do you prefer hot or cold weather?',
                        sampleAnswer: 'I prefer mild, cooler weather because I find it more comfortable for outdoor activities. Hot weather can be exhausting and makes me feel lethargic, while cold weather energizes me. I especially enjoy autumn temperatures around 20-25 degrees Celsius, which I think is perfect for both work and leisure.'
                    },
                    {
                        question: 'What is your favorite season?',
                        sampleAnswer: 'My favorite season is autumn because the weather is pleasant and the changing colors of the leaves are beautiful. I usually spend more time outdoors during this season, going for walks in parks or hiking. Autumn also brings a sense of coziness that I really enjoy after the heat of summer.'
                    },
                    {
                        question: 'Does the weather affect your mood?',
                        sampleAnswer: 'Yes, definitely. Sunny weather usually makes me feel more energetic and positive, while rainy or gloomy days tend to make me feel a bit more subdued. I\'ve noticed that I\'m more productive and motivated to go out when the weather is nice, which is why I appreciate living in a place with generally good weather.'
                    },
                    {
                        question: 'Do you check the weather forecast regularly?',
                        sampleAnswer: 'Yes, I check the weather forecast almost every morning on my phone before getting ready for work. This helps me decide what to wear and whether I need to bring an umbrella. I find it particularly useful when planning weekend activities, as I like to know if the weather will be suitable for outdoor plans.'
                    },

                    // Shopping & Fashion (5)
                    {
                        question: 'Do you enjoy shopping for clothes?',
                        sampleAnswer: 'I have mixed feelings about clothes shopping. I enjoy it when I find something I really like, but I often find the process time-consuming. I usually shop for clothes two or three times a year when the seasons change, and I prefer shopping at stores where I know the style and fit suit me well.'
                    },
                    {
                        question: 'What kind of clothes do you usually wear?',
                        sampleAnswer: 'I usually wear casual, comfortable clothes like jeans and t-shirts on weekends, and business casual attire for work. I prefer simple, classic styles in neutral colors because they\'re versatile and easy to match. Comfort is my priority, so I tend to avoid anything too formal or restrictive unless absolutely necessary.'
                    },
                    {
                        question: 'Do you follow fashion trends?',
                        sampleAnswer: 'Not really. I\'m aware of current trends through social media and magazines, but I don\'t feel the need to follow them closely. I prefer to develop my own personal style that feels authentic to me rather than constantly changing my wardrobe based on what\'s trendy. I think it\'s more sustainable and cost-effective this way.'
                    },
                    {
                        question: 'Where do you usually buy things?',
                        sampleAnswer: 'I usually buy most things online through e-commerce platforms like Amazon or local shopping websites because it\'s convenient and offers better variety. For groceries, I prefer visiting supermarkets near my home once or twice a week. Online shopping saves me time, though I still enjoy browsing physical stores occasionally, especially for electronics or furniture.'
                    },
                    {
                        question: 'Do you prefer shopping alone or with friends?',
                        sampleAnswer: 'I prefer shopping alone for most things because I can take my time and make decisions without feeling rushed. However, I do enjoy shopping with friends occasionally, especially for special purchases like gifts or when trying new stores. Shopping with others can be more fun and you get helpful second opinions.'
                    },

                    // Home & Living (5)
                    {
                        question: 'Do you live in a house or an apartment?',
                        sampleAnswer: 'I currently live in an apartment in the city center, which is convenient for my work commute. It\'s a two-bedroom unit on the fifth floor with a nice view of the surrounding neighborhood. I prefer apartment living in the city because everything I need is within walking distance and the maintenance is handled by the building management.'
                    },
                    {
                        question: 'What is your favorite room in your home?',
                        sampleAnswer: 'My favorite room is definitely my bedroom because it\'s where I can relax and have privacy. I\'ve decorated it in a minimalist style with calming colors, which helps me unwind after a long day. It\'s also where I do most of my reading and personal activities, so it feels like my personal sanctuary.'
                    },
                    {
                        question: 'Do you like decorating your room?',
                        sampleAnswer: 'Yes, I enjoy decorating my room occasionally to keep it fresh and reflect my current tastes. I usually add small touches like plants, artwork, or new cushions rather than making major changes. Decorating is a creative outlet for me, and having a space that feels personal and comfortable really improves my overall well-being.'
                    },
                    {
                        question: 'Would you like to move to a different place?',
                        sampleAnswer: 'Eventually, yes. While I\'m happy with my current apartment, I\'d like to move to a slightly larger place with more natural light, maybe in a quieter neighborhood. I\'m planning to stay here for another year or two to save more money, then look for somewhere that better suits my long-term needs.'
                    },
                    {
                        question: 'Do you prefer living with family or alone?',
                        sampleAnswer: 'Right now, I prefer living alone because I value my independence and privacy. Living alone allows me to maintain my own schedule and lifestyle without compromising. However, I do miss the companionship of living with family sometimes, which is why I make sure to visit them regularly on weekends.'
                    },

                    // Arts & Entertainment (5)
                    {
                        question: 'Do you enjoy going to museums?',
                        sampleAnswer: 'Yes, I enjoy visiting museums, especially art and history museums when I travel to new cities. I usually go on weekends or during vacations because it\'s a relaxing way to learn about different cultures and time periods. Museums help me appreciate creativity and understand historical context, which I find both educational and inspiring.'
                    },
                    {
                        question: 'Have you ever been to a concert?',
                        sampleAnswer: 'Yes, I\'ve been to several concerts over the years, mostly rock and pop performances. I usually attend them with friends when our favorite artists visit our city. The live atmosphere and energy of concerts are incredible, and it\'s always exciting to experience music performed live rather than just listening to recordings.'
                    },
                    {
                        question: 'Do you like taking photographs?',
                        sampleAnswer: 'Yes, I really enjoy photography, particularly landscape and street photography. I usually take photos when I travel or during weekend walks around the city. Photography helps me notice details I might otherwise miss, and it\'s a wonderful way to preserve memories and share experiences with others.'
                    },
                    {
                        question: 'Do you enjoy drawing or painting?',
                        sampleAnswer: 'I\'m not particularly skilled at drawing or painting, but I do enjoy it as a relaxing hobby occasionally. I usually do simple watercolor paintings or sketches when I have free time on weekends. It\'s a nice way to express creativity without any pressure, and I find the process quite therapeutic and meditative.'
                    },
                    {
                        question: 'What kind of art do you appreciate?',
                        sampleAnswer: 'I particularly appreciate contemporary art and impressionist paintings because of their use of color and emotional expression. I usually visit art galleries a few times a year to see new exhibitions. What I love about art is how it can convey complex emotions and ideas without words, and how each person can interpret pieces differently.'
                    },

                    // Nature & Environment (5)
                    {
                        question: 'Do you like spending time in nature?',
                        sampleAnswer: 'Absolutely! I love spending time in nature, especially hiking in forests or walking along beaches. I try to get outdoors at least once a week, usually on weekends when I have more time. Being in nature helps me clear my mind and reduces stress, which is why I consider it essential for my mental health.'
                    },
                    {
                        question: 'Do you have any plants at home?',
                        sampleAnswer: 'Yes, I have several indoor plants in my apartment, mainly succulents and a few small trees. I keep them on my balcony and near windows where they get enough sunlight. Taking care of plants is relaxing for me, and they also help purify the air and add a natural touch to my living space.'
                    },
                    {
                        question: 'Are you concerned about the environment?',
                        sampleAnswer: 'Yes, I\'m very concerned about environmental issues like climate change and pollution. I try to do my part by reducing waste, recycling regularly, and using public transportation when possible. I believe everyone should take responsibility for protecting the environment because the consequences of inaction affect us all.'
                    },
                    {
                        question: 'Do you prefer mountains or beaches?',
                        sampleAnswer: 'I prefer mountains because I enjoy hiking and the cooler climate they offer. Mountain scenery is breathtaking, and I find the quiet, peaceful atmosphere very rejuvenating. While I do appreciate beaches for relaxation, mountains provide more opportunities for adventure and exploration, which I find more appealing.'
                    },
                    {
                        question: 'Do you think it\'s important to protect wildlife?',
                        sampleAnswer: 'Absolutely. Protecting wildlife is crucial for maintaining ecological balance and biodiversity. Many species are facing extinction due to human activities like deforestation and pollution, which affects entire ecosystems. I think governments and individuals both have a responsibility to support conservation efforts and protect natural habitats for future generations.'
                    },

                    // Transportation (5)
                    {
                        question: 'How do you usually travel to work or school?',
                        sampleAnswer: 'I usually take the subway to work because it\'s the most efficient and reliable option in my city. The commute takes about 30 minutes, which gives me time to read or catch up on news. I prefer public transport over driving because it\'s less stressful and more environmentally friendly.'
                    },
                    {
                        question: 'Do you prefer public transportation or driving?',
                        sampleAnswer: 'I prefer public transportation for daily commuting because it\'s convenient and I don\'t have to worry about parking or traffic. However, I do enjoy driving when traveling to places not well-served by public transport or when I need flexibility. Each option has its advantages depending on the situation.'
                    },
                    {
                        question: 'Have you ever traveled by train?',
                        sampleAnswer: 'Yes, I\'ve traveled by train many times, both for short commutes and longer journeys between cities. I particularly enjoy train travel because the views are often scenic and it\'s more comfortable than buses. Trains also allow me to work or relax during the journey, which makes the time feel more productive.'
                    },
                    {
                        question: 'Do you enjoy long journeys?',
                        sampleAnswer: 'It depends on the mode of transport and the destination. I enjoy long train or plane journeys when I\'m traveling somewhere exciting because the anticipation makes it worthwhile. However, long car journeys can be tiring. I usually bring books or download movies to make long trips more enjoyable.'
                    },
                    {
                        question: 'Would you like to learn to drive?',
                        sampleAnswer: 'Yes, I would like to learn to drive in the near future as it would give me more independence and flexibility. I\'m planning to take driving lessons next year when my schedule is less busy. Having a driver\'s license would be particularly useful for weekend trips and visiting places outside the city.'
                    },

                    // Health & Lifestyle (5)
                    {
                        question: 'Do you think you have a healthy lifestyle?',
                        sampleAnswer: 'I try to maintain a healthy lifestyle, though there\'s room for improvement. I exercise regularly and eat a balanced diet most of the time, but I could probably sleep more consistently. I think achieving a healthy lifestyle is an ongoing process that requires constant attention and adjustment based on your circumstances.'
                    },
                    {
                        question: 'How much sleep do you usually get?',
                        sampleAnswer: 'I typically get around 6-7 hours of sleep on weeknights, which is slightly less than ideal. On weekends, I try to catch up by sleeping 8-9 hours when I don\'t have early commitments. I\'ve noticed that getting enough sleep significantly affects my mood and productivity, so I\'m trying to improve my sleep schedule.'
                    },
                    {
                        question: 'Do you take any vitamins or supplements?',
                        sampleAnswer: 'Yes, I take a daily multivitamin and vitamin D supplements, especially during winter when there\'s less sunlight. I started taking them a few years ago after consulting with my doctor, who recommended them for overall health maintenance. I believe supplements can help fill nutritional gaps in my diet.'
                    },
                    {
                        question: 'Do you prefer to relax at home or go out?',
                        sampleAnswer: 'It really depends on my mood and energy levels. After a long work week, I prefer relaxing at home with a book or movie. However, on weekends when I feel more energetic, I enjoy going out to cafés, parks, or meeting friends. Having a balance between both options helps me recharge in different ways.'
                    },
                    {
                        question: 'What do you do when you feel stressed?',
                        sampleAnswer: 'When I feel stressed, I usually go for a run or do some yoga to help clear my mind. Physical activity really helps me manage stress levels and regain perspective. I also find that talking to close friends or listening to calming music can be therapeutic, depending on what caused the stress.'
                    },

                    // Celebrations & Festivals (5)
                    {
                        question: 'What is your favorite festival or celebration?',
                        sampleAnswer: 'My favorite celebration is the Lunar New Year because it\'s a time when the whole family gathers together. We usually celebrate with a big dinner, exchange red envelopes, and visit relatives. The festive atmosphere, traditional food, and quality time with loved ones make it special, and I look forward to it every year.'
                    },
                    {
                        question: 'How do you usually celebrate your birthday?',
                        sampleAnswer: 'I usually celebrate my birthday with a small dinner gathering with close friends and family. We typically go to a nice restaurant or I host a dinner at home with home-cooked food. I prefer intimate celebrations rather than large parties because it allows for meaningful conversations and connection with the people who matter most to me.'
                    },
                    {
                        question: 'Do you enjoy public holidays?',
                        sampleAnswer: 'Yes, I really enjoy public holidays because they give me a break from work and a chance to recharge. I usually use these days to travel, spend time with family, or catch up on personal projects. Public holidays are important for maintaining work-life balance, and I always try to make the most of them.'
                    },
                    {
                        question: 'Do you give gifts to friends and family?',
                        sampleAnswer: 'Yes, I give gifts during special occasions like birthdays, holidays, and important milestones. I usually spend time choosing thoughtful presents that reflect the person\'s interests rather than buying expensive items. I believe gift-giving is a meaningful way to show appreciation and strengthen relationships with people I care about.'
                    },
                    {
                        question: 'What traditional celebrations does your country have?',
                        sampleAnswer: 'My country celebrates many traditional festivals, but the most significant is our Independence Day, which involves parades, fireworks, and cultural performances. We also celebrate harvest festivals and religious holidays that have been observed for generations. These celebrations help preserve our cultural heritage and bring communities together.'
                    },

                    // Pets & Animals (5)
                    {
                        question: 'Do you have any pets?',
                        sampleAnswer: 'No, I don\'t have any pets currently because my apartment doesn\'t allow them and my work schedule is quite demanding. However, I grew up with a dog, so I understand the joy and companionship that pets bring. I hope to get a pet in the future when my living situation and lifestyle are more suitable.'
                    },
                    {
                        question: 'Do you like animals?',
                        sampleAnswer: 'Yes, I love animals, especially dogs and cats. I find them fascinating to observe and they bring so much joy to people\'s lives. Whenever I visit friends who have pets, I always enjoy spending time playing with them. I think animals teach us about loyalty, compassion, and living in the moment.'
                    },
                    {
                        question: 'What is your favorite animal?',
                        sampleAnswer: 'My favorite animal is the elephant because of their intelligence, strong family bonds, and gentle nature despite their size. I\'ve always been fascinated by how they communicate and care for each other. Elephants also represent wisdom and strength in many cultures, which I find inspiring and meaningful.'
                    },
                    {
                        question: 'Did you have pets when you were a child?',
                        sampleAnswer: 'Yes, I had a golden retriever named Max when I was growing up. He was part of our family for about 12 years, and taking care of him taught me responsibility and empathy. We used to play together in the backyard every day after school, and those memories are still very special to me.'
                    },
                    {
                        question: 'Would you like to have a pet in the future?',
                        sampleAnswer: 'Yes, I\'d definitely like to have a dog in the future when I have more space and time to properly care for one. I think having a pet would encourage me to be more active and provide companionship. I\'m particularly interested in adopting a rescue dog because I believe in giving animals a second chance.'
                    },

                    // Language & Communication (5)
                    {
                        question: 'What languages can you speak?',
                        sampleAnswer: 'I can speak English fluently and my native language, Vietnamese. I\'m also learning basic Spanish through an app in my free time because I find it useful for travel. Being multilingual opens up opportunities for communication and helps me understand different cultures better.'
                    },
                    {
                        question: 'Do you think learning languages is important?',
                        sampleAnswer: 'Absolutely. Learning languages is important both for practical reasons like career opportunities and travel, and for cognitive benefits. It helps you understand different perspectives and cultures more deeply. In our globalized world, being able to communicate in multiple languages is increasingly valuable and enriching.'
                    },
                    {
                        question: 'How are you learning English?',
                        sampleAnswer: 'I\'m learning English through a combination of methods: taking classes twice a week, watching English movies and series with subtitles, and practicing conversation with native speakers online. I also try to read English articles and books regularly because exposure to the language in different contexts really helps improve my skills.'
                    },
                    {
                        question: 'Do you enjoy writing?',
                        sampleAnswer: 'Yes, I enjoy writing, particularly journaling and creative writing in my free time. I usually write in the evenings when I have quiet time to reflect on my day or explore ideas. Writing helps me organize my thoughts and express myself more clearly, which I find both therapeutic and intellectually satisfying.'
                    },
                    {
                        question: 'Do you prefer texting or calling?',
                        sampleAnswer: 'I generally prefer texting for quick, non-urgent communication because it\'s convenient and allows me to respond when I have time. However, for important conversations or when I want to have a deeper discussion, I prefer calling because it\'s more personal and reduces misunderstandings. Each method has its place depending on the situation.'
                    },

                    // Memory & Childhood (5)
                    {
                        question: 'What is your earliest childhood memory?',
                        sampleAnswer: 'My earliest memory is from when I was about four years old, playing in my grandparents\' garden during summer vacation. I remember chasing butterflies and picking flowers with my grandmother. It\'s a vivid and happy memory that reminds me of simpler times and the special bond I had with her.'
                    },
                    {
                        question: 'Do you have a good memory?',
                        sampleAnswer: 'I have a reasonably good memory for faces and experiences, but I sometimes struggle with remembering specific details like names or dates. I usually use reminder apps and write things down to help me stay organized. I think my memory works better when I\'m genuinely interested in something or when I make emotional connections.'
                    },
                    {
                        question: 'What did you enjoy doing as a child?',
                        sampleAnswer: 'As a child, I loved playing outdoor games like hide-and-seek and riding my bicycle around the neighborhood with friends. We would spend hours outside until it got dark. Those activities taught me teamwork and creativity, and I have fond memories of the freedom and carefree nature of childhood.'
                    },
                    {
                        question: 'Are you still in contact with childhood friends?',
                        sampleAnswer: 'Yes, I\'m still in touch with two of my closest friends from primary school. We don\'t see each other as often as we used to because we live in different cities now, but we chat regularly online and meet up whenever possible. These friendships are valuable because we share a long history and understand each other well.'
                    },
                    {
                        question: 'What games did you play when you were young?',
                        sampleAnswer: 'When I was young, I played a lot of traditional games like hopscotch, tag, and jump rope with kids in my neighborhood. We also played board games like Monopoly on rainy days. These games were simple but taught us important social skills like cooperation, fair play, and how to handle both winning and losing gracefully.'
                    },

                    // Colors & Preferences (5)
                    {
                        question: 'What is your favorite color?',
                        sampleAnswer: 'My favorite color is blue, particularly navy and sky blue shades. I find blue calming and versatile - it works well in both clothing and interior design. I think I\'m drawn to blue because it reminds me of the ocean and clear skies, which are associated with tranquility and freedom.'
                    },
                    {
                        question: 'Do different colors affect your mood?',
                        sampleAnswer: 'Yes, I believe colors do affect my mood. Bright colors like yellow and orange make me feel more energetic and positive, while softer colors like blue and green help me feel calm and relaxed. That\'s why I\'m quite intentional about the colors I choose for my clothes and home decor based on how I want to feel.'
                    },
                    {
                        question: 'What color would you paint your room?',
                        sampleAnswer: 'I would paint my room a soft sage green or light grey because these colors are soothing and create a peaceful atmosphere perfect for relaxation and sleep. I prefer neutral, calming tones over bold colors in personal spaces because they\'re easier to live with long-term and provide a good backdrop for various decorating styles.'
                    },
                    {
                        question: 'Do you wear bright or dark colors?',
                        sampleAnswer: 'I usually wear dark or neutral colors like black, navy, and grey because they\'re practical, versatile, and easy to mix and match. Occasionally, I add pops of color with accessories or during summer months. Dark colors suit my personal style and are appropriate for both professional and casual settings.'
                    },
                    {
                        question: 'Has your favorite color changed over time?',
                        sampleAnswer: 'Yes, my favorite color has changed as I\'ve gotten older. As a child, I loved bright red because it was bold and exciting. Now I prefer blue and green because I appreciate their calming qualities more. I think our color preferences evolve as our personalities mature and our understanding of what we need emotionally changes.'
                    },

                    // Time Management (5)
                    {
                        question: 'Are you good at managing your time?',
                        sampleAnswer: 'I think I\'m reasonably good at time management, though there\'s always room for improvement. I usually use a digital calendar and to-do lists to stay organized and prioritize tasks effectively. Planning ahead helps me balance work responsibilities with personal activities, though unexpected events sometimes disrupt my schedule.'
                    },
                    {
                        question: 'Do you make daily or weekly plans?',
                        sampleAnswer: 'I make both daily and weekly plans to stay organized. At the start of each week, I outline my major tasks and commitments, then each morning I create a detailed daily plan with priorities. This two-level approach helps me see the bigger picture while staying focused on immediate tasks. I find it reduces stress and increases productivity.'
                    },
                    {
                        question: 'Are you usually punctual?',
                        sampleAnswer: 'Yes, I\'m generally quite punctual because I believe being on time shows respect for other people\'s schedules. I usually arrive a few minutes early to appointments or meetings to avoid any last-minute stress. Being punctual also helps me feel more in control and prepared, which reduces anxiety about being late.'
                    },
                    {
                        question: 'Do you prefer mornings or evenings?',
                        sampleAnswer: 'I\'m definitely more of a morning person. I feel most alert and productive in the early hours, which is when I do my most important work. I usually wake up early to take advantage of this natural energy peak. By evening, I prefer to wind down with lighter activities like reading or watching shows.'
                    },
                    {
                        question: 'How do you organize your schedule?',
                        sampleAnswer: 'I organize my schedule using a combination of digital tools and traditional methods. I use Google Calendar for appointments and deadlines, and I keep a physical planner for daily tasks and notes. I also set reminders on my phone for important events. This system helps me stay on track and ensures I don\'t forget anything important.'
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
