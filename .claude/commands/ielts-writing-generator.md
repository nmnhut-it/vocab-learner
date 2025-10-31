# IELTS Writing Task 2 Practice Generator

Generates structured JSON for a static self-study site with interactive exercises, vocabulary building, and guided essay writing practice.

## Instructions

When this command is run, generate a complete JSON object for IELTS Writing Task 2 practice following the structure below. The JSON is designed for a static site where students can:
- Learn vocabulary and ideas for a topic
- Practice with interactive exercises
- Plan and write their essay step-by-step
- Check their work with a model answer
- Self-assess using band descriptors

### Teaching Methodology
Based on famous IELTS teachers (Simon, IELTS Liz, IELTS Advantage):
- **Simon's 4-paragraph structure**: Introduction (2 sentences) í Body Para 1 (5 sentences) í Body Para 2 (5 sentences) í Conclusion (1-2 sentences)
- **10-minute planning**: Number ideas 1-5 for each body paragraph
- **IELTS Liz**: Focus on essay types, formal style, one central theme per body paragraph
- **IELTS Advantage**: Simple relevant ideas, 3-stage process (Thinking/Writing/Checking)

### Topic Categories (2025)
- AI and technology impact
- Online vs traditional education
- Environmental sustainability
- Remote work and digital transformation
- Government policies and public welfare
- Healthcare and aging population
- Globalization and cultural identity
- Social media and communication

## Complete JSON Structure

```json
{
  "meta": {
    "sessionId": "unique-session-id",
    "generatedDate": "ISO-8601-timestamp",
    "version": "1.0",
    "estimatedDuration": "60-90 minutes"
  },

  "question": {
    "id": "question-unique-id",
    "type": "opinion|discussion|problem-solution|advantages-disadvantages|direct-questions",
    "category": "topic-category",
    "text": "Full IELTS Writing Task 2 question as it would appear in the exam",
    "instructions": "Write at least 250 words.",
    "timeAllocation": {
      "total": 40,
      "planning": "5-10",
      "writing": "25-30",
      "checking": "5"
    }
  },

  "sections": [
    {
      "id": "question-analysis",
      "order": 1,
      "title": "Question Analysis",
      "description": "Understand what the question is asking before you start",
      "uiComponent": "info-display",
      "content": {
        "questionType": {
          "label": "Question Type",
          "value": "Opinion Essay",
          "explanation": "You need to give your opinion and support it with reasons and examples"
        },
        "keyInstructions": [
          {
            "instruction": "To what extent do you agree or disagree?",
            "meaning": "You must state your position clearly and support it throughout"
          }
        ],
        "keyWords": [
          {"word": "discuss", "importance": "Must address both views"},
          {"word": "your opinion", "importance": "Must state your position"}
        ],
        "taskRequirements": [
          "Present your opinion clearly",
          "Support with reasons and examples",
          "Write at least 250 words",
          "Use formal academic style"
        ],
        "commonMistakes": [
          "Not stating opinion clearly in introduction",
          "Discussing both sides without giving opinion",
          "Using informal language",
          "Writing less than 250 words"
        ]
      }
    },

    {
      "id": "vocabulary-ideas",
      "order": 2,
      "title": "Vocabulary & Ideas Bank",
      "description": "Learn topic-specific vocabulary and explore key ideas before writing",
      "uiComponent": "vocabulary-cards",
      "content": {
        "topicVocabulary": [
          {
            "word": "artificial intelligence",
            "partOfSpeech": "noun phrase",
            "definition": "Computer systems able to perform tasks requiring human intelligence",
            "example": "Artificial intelligence has transformed various industries.",
            "synonyms": ["AI", "machine intelligence"],
            "pronunciation": "/ÃQ–rtjfjÉYl jn»teljdíYns/",
            "collocations": ["advanced AI", "AI-powered", "AI technology"]
          },
          {
            "word": "significantly",
            "partOfSpeech": "adverb",
            "definition": "In a sufficiently great or important way to be worthy of attention",
            "example": "Technology has significantly improved our quality of life.",
            "synonyms": ["considerably", "substantially", "notably"],
            "pronunciation": "/sja»njfjkYntli/",
            "collocations": ["significantly increase", "significantly impact", "significantly improve"]
          }
        ],
        "academicPhrases": {
          "introducing": [
            "It is widely believed that...",
            "There is no doubt that...",
            "It is undeniable that..."
          ],
          "presenting": [
            "One significant advantage is...",
            "A major drawback of this is...",
            "The primary reason for this is..."
          ],
          "exemplifying": [
            "For instance,",
            "A clear example of this is...",
            "This can be seen in..."
          ],
          "contrasting": [
            "On the other hand,",
            "However,",
            "Nevertheless,"
          ],
          "concluding": [
            "In conclusion,",
            "To summarize,",
            "Overall,"
          ]
        },
        "keyIdeas": [
          {
            "mainPoint": "AI improves workplace efficiency",
            "explanation": "Automation of repetitive tasks allows workers to focus on creative work",
            "example": "Manufacturing companies using AI robots have increased production by 30%",
            "furtherDevelopment": "This leads to economic growth and job transformation rather than job loss"
          },
          {
            "mainPoint": "Privacy concerns with AI technology",
            "explanation": "AI systems collect and analyze personal data without clear consent",
            "example": "Social media platforms use AI to track user behavior for targeted advertising",
            "furtherDevelopment": "This raises questions about data protection and individual rights"
          }
        ]
      }
    },

    {
      "id": "brainstorming",
      "order": 3,
      "title": "Brainstorming",
      "description": "Generate ideas using proven techniques",
      "uiComponent": "interactive-brainstorm",
      "content": {
        "method": "for-against-list",
        "instruction": "Spend 3-5 minutes brainstorming ideas. Don't worry about grammar, just write down your thoughts.",
        "guidedQuestions": [
          {
            "question": "What are the main benefits?",
            "hints": ["Think about efficiency, convenience, quality of life"]
          },
          {
            "question": "What are the main problems?",
            "hints": ["Think about privacy, jobs, dependency"]
          },
          {
            "question": "What real-world examples can you think of?",
            "hints": ["Your own experience, news, common knowledge"]
          }
        ],
        "brainstormTemplate": {
          "advantages": {
            "label": "Arguments FOR (if you agree)",
            "userInput": "textarea",
            "placeholder": "List 3-5 reasons with brief examples...",
            "savedValue": ""
          },
          "disadvantages": {
            "label": "Arguments AGAINST (if you disagree)",
            "userInput": "textarea",
            "placeholder": "List 3-5 reasons with brief examples...",
            "savedValue": ""
          },
          "examples": {
            "label": "Real-world examples",
            "userInput": "textarea",
            "placeholder": "Personal experience, news stories, common knowledge...",
            "savedValue": ""
          },
          "yourPosition": {
            "label": "Your position",
            "userInput": "select",
            "options": ["Strongly agree", "Agree", "Neutral", "Disagree", "Strongly disagree"],
            "savedValue": ""
          }
        }
      }
    },

    {
      "id": "essay-planning",
      "order": 4,
      "title": "Essay Planning",
      "description": "Spend 5-10 minutes planning your essay structure (Simon's method)",
      "uiComponent": "planning-form",
      "content": {
        "instruction": "Number your ideas 1-5 for each body paragraph. This plan will guide your writing.",
        "planStructure": {
          "introduction": {
            "sentence1": {
              "label": "Sentence 1: Paraphrase the question",
              "guideline": "Rewrite the question in your own words",
              "userInput": "text",
              "placeholder": "In recent years...",
              "savedValue": "",
              "wordCountTarget": "15-20"
            },
            "sentence2": {
              "label": "Sentence 2: State your position",
              "guideline": "Clearly state your opinion and outline your answer",
              "userInput": "text",
              "placeholder": "In my opinion...",
              "savedValue": "",
              "wordCountTarget": "20-30"
            }
          },
          "bodyParagraph1": {
            "label": "Body Paragraph 1",
            "theme": {
              "label": "Central theme",
              "userInput": "text",
              "placeholder": "e.g., Benefits of AI in the workplace",
              "savedValue": ""
            },
            "ideas": [
              {
                "number": 1,
                "label": "Idea 1: Topic sentence",
                "placeholder": "Main idea introducing the theme",
                "userInput": "text",
                "savedValue": ""
              },
              {
                "number": 2,
                "label": "Idea 2: Explanation",
                "placeholder": "Explain the topic sentence",
                "userInput": "text",
                "savedValue": ""
              },
              {
                "number": 3,
                "label": "Idea 3: Example",
                "placeholder": "Specific example",
                "userInput": "text",
                "savedValue": ""
              },
              {
                "number": 4,
                "label": "Idea 4: Development",
                "placeholder": "Develop the example further",
                "userInput": "text",
                "savedValue": ""
              },
              {
                "number": 5,
                "label": "Idea 5: Concluding sentence",
                "placeholder": "Conclude the paragraph",
                "userInput": "text",
                "savedValue": ""
              }
            ]
          },
          "bodyParagraph2": {
            "label": "Body Paragraph 2",
            "theme": {
              "label": "Central theme",
              "userInput": "text",
              "placeholder": "e.g., Privacy concerns with AI",
              "savedValue": ""
            },
            "ideas": [
              {
                "number": 1,
                "label": "Idea 1: Topic sentence",
                "placeholder": "Main idea introducing the theme",
                "userInput": "text",
                "savedValue": ""
              },
              {
                "number": 2,
                "label": "Idea 2: Explanation",
                "placeholder": "Explain the topic sentence",
                "userInput": "text",
                "savedValue": ""
              },
              {
                "number": 3,
                "label": "Idea 3: Example",
                "placeholder": "Specific example",
                "userInput": "text",
                "savedValue": ""
              },
              {
                "number": 4,
                "label": "Idea 4: Development",
                "placeholder": "Develop the example further",
                "userInput": "text",
                "savedValue": ""
              },
              {
                "number": 5,
                "label": "Idea 5: Concluding sentence",
                "placeholder": "Conclude the paragraph",
                "userInput": "text",
                "savedValue": ""
              }
            ]
          },
          "conclusion": {
            "sentence1": {
              "label": "Summarize main points",
              "guideline": "Briefly restate your main arguments",
              "userInput": "text",
              "placeholder": "In conclusion...",
              "savedValue": "",
              "wordCountTarget": "15-20"
            },
            "sentence2": {
              "label": "Final thought (optional)",
              "guideline": "Restate your opinion or make a recommendation",
              "userInput": "text",
              "placeholder": "Overall, I believe...",
              "savedValue": "",
              "wordCountTarget": "15-20"
            }
          }
        }
      }
    },

    {
      "id": "interactive-exercises",
      "order": 5,
      "title": "Practice Exercises",
      "description": "Complete these exercises to practice key language and structures",
      "uiComponent": "exercise-cards",
      "content": {
        "exercises": [
          {
            "id": "unscramble-1",
            "type": "sentence-unscramble",
            "title": "Sentence Unscramble",
            "instruction": "Drag and drop the words to form correct IELTS sentences",
            "questions": [
              {
                "id": "unscramble-q1",
                "difficulty": "easy",
                "category": "introduction",
                "scrambledWords": ["has", "technology", "transformed", "significantly", "our", "lives"],
                "correctAnswer": "Technology has significantly transformed our lives",
                "hint": "Start with the subject",
                "feedback": {
                  "correct": "Excellent! This is a strong opening sentence using the adverb 'significantly'.",
                  "incorrect": "Try starting with 'Technology' as the subject, then use 'has' + past participle."
                }
              },
              {
                "id": "unscramble-q2",
                "difficulty": "medium",
                "category": "topic-sentence",
                "scrambledWords": ["artificial", "the", "of", "intelligence", "numerous", "has", "brought", "benefits"],
                "correctAnswer": "The artificial intelligence has brought numerous benefits",
                "alternativeAnswers": ["Artificial intelligence has brought numerous benefits"],
                "hint": "Think about article usage with 'artificial intelligence'",
                "feedback": {
                  "correct": "Great work! This makes an effective topic sentence.",
                  "incorrect": "Consider: Does 'artificial intelligence' need 'the'? Usually it doesn't."
                }
              },
              {
                "id": "unscramble-q3",
                "difficulty": "hard",
                "category": "complex-sentence",
                "scrambledWords": ["while", "undeniable", "are", "the", "benefits", "it", "important", "is", "to", "consider", "drawbacks", "the"],
                "correctAnswer": "While the benefits are undeniable, it is important to consider the drawbacks",
                "hint": "Use 'while' to create a contrasting clause",
                "feedback": {
                  "correct": "Perfect! You've created a complex sentence with contrast.",
                  "incorrect": "Try: While [clause 1], [clause 2]. Use a comma after 'undeniable'."
                }
              }
            ]
          },
          {
            "id": "fill-blank-1",
            "type": "fill-in-the-blank",
            "title": "Fill in the Blanks",
            "instruction": "Choose the correct word or phrase to complete each sentence",
            "questions": [
              {
                "id": "fill-q1",
                "difficulty": "easy",
                "category": "linking-words",
                "sentence": "_____, technology has brought many benefits. _____, it has also created some challenges.",
                "blanks": [
                  {
                    "position": 0,
                    "options": ["On one hand", "Furthermore", "In conclusion", "For instance"],
                    "correctAnswer": "On one hand",
                    "type": "select"
                  },
                  {
                    "position": 1,
                    "options": ["Moreover", "On the other hand", "Similarly", "Therefore"],
                    "correctAnswer": "On the other hand",
                    "type": "select"
                  }
                ],
                "feedback": {
                  "correct": "Excellent! You've used contrasting linking words correctly.",
                  "partiallyCorrect": "You got one blank correct. Think about showing contrast between benefits and challenges.",
                  "incorrect": "These blanks need contrasting linking words: 'On one hand... On the other hand'."
                }
              },
              {
                "id": "fill-q2",
                "difficulty": "medium",
                "category": "academic-vocabulary",
                "sentence": "The _____ of artificial intelligence has _____ the way we work.",
                "blanks": [
                  {
                    "position": 0,
                    "options": ["advent", "coming", "start", "beginning"],
                    "correctAnswer": "advent",
                    "type": "select"
                  },
                  {
                    "position": 1,
                    "options": ["changed", "transformed", "modified", "switched"],
                    "correctAnswer": "transformed",
                    "type": "select"
                  }
                ],
                "feedback": {
                  "correct": "Perfect! 'Advent' and 'transformed' are high-level academic words.",
                  "partiallyCorrect": "Good try. 'Advent' (formal word for arrival) and 'transformed' (changed dramatically) are the best choices.",
                  "incorrect": "Use more academic vocabulary: 'advent' means arrival, 'transformed' means changed significantly."
                }
              },
              {
                "id": "fill-q3",
                "difficulty": "hard",
                "category": "collocations",
                "sentence": "This development has _____ implications for society and may _____ serious ethical concerns.",
                "blanks": [
                  {
                    "position": 0,
                    "options": ["far-reaching", "big", "large", "wide"],
                    "correctAnswer": "far-reaching",
                    "type": "select"
                  },
                  {
                    "position": 1,
                    "options": ["raise", "lift", "make", "create"],
                    "correctAnswer": "raise",
                    "type": "select"
                  }
                ],
                "feedback": {
                  "correct": "Excellent! You know important collocations: 'far-reaching implications' and 'raise concerns'.",
                  "partiallyCorrect": "Check collocations: we say 'far-reaching implications' and 'raise concerns'.",
                  "incorrect": "Learn these collocations: 'far-reaching implications' and 'raise concerns' are commonly used together."
                }
              }
            ]
          },
          {
            "id": "complete-sentence-1",
            "type": "complete-sentence",
            "title": "Complete the Sentence",
            "instruction": "Finish these sentences using the vocabulary hints provided",
            "questions": [
              {
                "id": "complete-q1",
                "difficulty": "medium",
                "category": "advantages",
                "prompt": "One significant advantage of online learning is that",
                "vocabularyHints": ["flexibility", "convenience", "accessibility", "self-paced"],
                "minimumWords": 10,
                "userInput": "textarea",
                "savedValue": "",
                "sampleAnswers": [
                  "it provides students with greater flexibility to study at their own pace and convenience.",
                  "it offers unprecedented accessibility to education for people in remote areas.",
                  "learners can access courses from anywhere, making education more convenient and flexible."
                ],
                "assessmentCriteria": [
                  "Uses vocabulary hints appropriately",
                  "Completes the sentence grammatically",
                  "Provides a clear, developed idea",
                  "Uses at least 10 words"
                ]
              },
              {
                "id": "complete-q2",
                "difficulty": "medium",
                "category": "problems",
                "prompt": "Environmental problems can be addressed by",
                "vocabularyHints": ["implementing", "regulations", "renewable energy", "government", "individuals"],
                "minimumWords": 12,
                "userInput": "textarea",
                "savedValue": "",
                "sampleAnswers": [
                  "implementing stricter regulations on industrial emissions and investing heavily in renewable energy sources.",
                  "governments implementing comprehensive policies that promote renewable energy and enforce environmental regulations.",
                  "both individuals and governments taking responsibility through sustainable practices and implementing green regulations."
                ],
                "assessmentCriteria": [
                  "Uses vocabulary hints appropriately",
                  "Completes the sentence grammatically",
                  "Provides a clear, developed idea",
                  "Uses at least 12 words"
                ]
              },
              {
                "id": "complete-q3",
                "difficulty": "hard",
                "category": "examples",
                "prompt": "For instance,",
                "vocabularyHints": ["companies", "employees", "productivity", "efficiency", "technology"],
                "minimumWords": 15,
                "userInput": "textarea",
                "savedValue": "",
                "sampleAnswers": [
                  "many companies have adopted AI-powered tools that have significantly increased employee productivity and operational efficiency.",
                  "technology giants like Amazon use artificial intelligence to optimize their logistics, resulting in faster delivery and improved efficiency.",
                  "numerous organizations have implemented remote working technologies, which has improved employee satisfaction while maintaining high productivity levels."
                ],
                "assessmentCriteria": [
                  "Uses vocabulary hints appropriately",
                  "Provides a specific, relevant example",
                  "Develops the example clearly",
                  "Uses at least 15 words"
                ]
              }
            ]
          }
        ]
      }
    },

    {
      "id": "essay-writing",
      "order": 6,
      "title": "Write Your Essay",
      "description": "Now write your full essay (25-30 minutes). Use your plan as a guide.",
      "uiComponent": "essay-editor",
      "content": {
        "instruction": "Write your essay in the text area below. Use your plan from the previous section. Aim for 250-280 words.",
        "features": {
          "wordCounter": true,
          "timer": true,
          "autosave": true,
          "spellcheck": false
        },
        "editor": {
          "userInput": "rich-textarea",
          "placeholder": "Start writing your essay here...\n\nIntroduction:\n\nBody Paragraph 1:\n\nBody Paragraph 2:\n\nConclusion:",
          "savedValue": "",
          "wordCountTarget": "250-280",
          "liveWordCount": 0
        },
        "guidancePanel": {
          "visible": true,
          "tips": [
            "Keep your introduction short (40-50 words)",
            "Each body paragraph should be 80-100 words",
            "Use topic sentences to introduce each paragraph",
            "Provide specific examples",
            "Use linking words to connect ideas",
            "Keep conclusion brief (30-40 words)"
          ],
          "structureReminder": {
            "introduction": "2 sentences: paraphrase + position",
            "bodyPara1": "5 sentences: topic í explain í example í develop í conclude",
            "bodyPara2": "5 sentences: topic í explain í example í develop í conclude",
            "conclusion": "1-2 sentences: summary + final thought"
          }
        }
      }
    },

    {
      "id": "essay-checking",
      "order": 7,
      "title": "Check Your Essay",
      "description": "Review your essay using this 3-step checking process (5 minutes)",
      "uiComponent": "checklist-review",
      "content": {
        "instruction": "Go through each step carefully. Tick each item as you check it.",
        "checkingSteps": [
          {
            "step": 1,
            "title": "Sentence-Level Checking",
            "items": [
              {
                "id": "check-grammar",
                "label": "Check each sentence for grammar errors",
                "checked": false,
                "tips": ["Read each sentence separately", "Look for subject-verb agreement", "Check verb tenses"]
              },
              {
                "id": "check-articles",
                "label": "Verify articles (a/an/the) are used correctly",
                "checked": false,
                "tips": ["Countable nouns need articles", "Uncountable nouns usually don't use 'a/an'"]
              },
              {
                "id": "check-spelling",
                "label": "Check spelling and word forms",
                "checked": false,
                "tips": ["Use British or American spelling consistently", "Check noun/verb/adjective forms"]
              },
              {
                "id": "check-punctuation",
                "label": "Review punctuation and capitalization",
                "checked": false,
                "tips": ["Comma before 'and' in complex sentences", "Capital letters for proper nouns"]
              }
            ]
          },
          {
            "step": 2,
            "title": "Paragraph-Level Checking",
            "items": [
              {
                "id": "check-theme",
                "label": "Each paragraph has one clear central theme",
                "checked": false,
                "tips": ["All sentences relate to the main idea", "No irrelevant information"]
              },
              {
                "id": "check-linking",
                "label": "Linking words are used correctly",
                "checked": false,
                "tips": ["Don't overuse linking words", "Use variety: however, moreover, therefore"]
              },
              {
                "id": "check-progression",
                "label": "Ideas progress logically",
                "checked": false,
                "tips": ["Each sentence builds on the previous one", "Clear flow from start to finish"]
              },
              {
                "id": "check-examples",
                "label": "Examples are relevant and well-developed",
                "checked": false,
                "tips": ["Examples support the main point", "Examples are explained, not just stated"]
              },
              {
                "id": "check-length",
                "label": "Word count is adequate (250+ words)",
                "checked": false,
                "tips": ["Aim for 260-280 words", "Don't go over 300 words"]
              }
            ]
          },
          {
            "step": 3,
            "title": "Essay-Level Checking",
            "items": [
              {
                "id": "check-intro",
                "label": "Introduction clearly states your position",
                "checked": false,
                "tips": ["Question is paraphrased", "Your opinion is clear"]
              },
              {
                "id": "check-body",
                "label": "Body paragraphs support your thesis",
                "checked": false,
                "tips": ["Each paragraph relates to your position", "Arguments are consistent"]
              },
              {
                "id": "check-conclusion",
                "label": "Conclusion summarizes main points",
                "checked": false,
                "tips": ["Restates your position", "No new ideas introduced"]
              },
              {
                "id": "check-task",
                "label": "All parts of the question are answered",
                "checked": false,
                "tips": ["Re-read the question", "Check you addressed everything"]
              },
              {
                "id": "check-coherence",
                "label": "Essay is coherent and cohesive overall",
                "checked": false,
                "tips": ["Ideas flow naturally", "Clear beginning, middle, end"]
              }
            ]
          }
        ]
      }
    },

    {
      "id": "model-answer",
      "order": 8,
      "title": "Band 8-9 Model Answer",
      "description": "Compare your essay with this high-band model answer",
      "uiComponent": "model-display",
      "content": {
        "question": "Repeated from main question for reference",
        "essay": {
          "introduction": "The rapid advancement of artificial intelligence has fundamentally transformed numerous aspects of modern life. While I acknowledge certain concerns, I firmly believe that the benefits of AI significantly outweigh its drawbacks.",
          "bodyParagraph1": "One primary advantage of AI technology is its capacity to enhance workplace productivity and efficiency. By automating repetitive and time-consuming tasks, AI enables employees to focus on more creative and strategic work that requires human insight. For instance, many manufacturing companies have implemented AI-powered robots that handle assembly line operations, resulting in a 30% increase in production output. This technological shift has not only improved profitability but has also created new opportunities for workers to develop higher-level skills. Consequently, AI adoption contributes to economic growth while transforming rather than eliminating employment.",
          "bodyParagraph2": "However, the widespread implementation of AI raises legitimate privacy concerns that warrant serious consideration. AI systems continuously collect and analyze vast amounts of personal data, often without explicit user consent or transparent disclosure. Social media platforms exemplify this issue, utilizing sophisticated AI algorithms to track user behavior and preferences for targeted advertising purposes. This practice has sparked intense debate about data protection regulations and individual rights in the digital age. Nevertheless, these challenges can be addressed through comprehensive legislation and ethical guidelines rather than abandoning AI technology altogether.",
          "conclusion": "In conclusion, while AI presents certain privacy challenges that require regulatory attention, its tremendous benefits in improving efficiency and productivity make it an invaluable tool for societal progress. The key lies in developing responsible frameworks that maximize advantages while minimizing risks.",
          "fullEssay": "The rapid advancement of artificial intelligence has fundamentally transformed numerous aspects of modern life. While I acknowledge certain concerns, I firmly believe that the benefits of AI significantly outweigh its drawbacks.\n\nOne primary advantage of AI technology is its capacity to enhance workplace productivity and efficiency. By automating repetitive and time-consuming tasks, AI enables employees to focus on more creative and strategic work that requires human insight. For instance, many manufacturing companies have implemented AI-powered robots that handle assembly line operations, resulting in a 30% increase in production output. This technological shift has not only improved profitability but has also created new opportunities for workers to develop higher-level skills. Consequently, AI adoption contributes to economic growth while transforming rather than eliminating employment.\n\nHowever, the widespread implementation of AI raises legitimate privacy concerns that warrant serious consideration. AI systems continuously collect and analyze vast amounts of personal data, often without explicit user consent or transparent disclosure. Social media platforms exemplify this issue, utilizing sophisticated AI algorithms to track user behavior and preferences for targeted advertising purposes. This practice has sparked intense debate about data protection regulations and individual rights in the digital age. Nevertheless, these challenges can be addressed through comprehensive legislation and ethical guidelines rather than abandoning AI technology altogether.\n\nIn conclusion, while AI presents certain privacy challenges that require regulatory attention, its tremendous benefits in improving efficiency and productivity make it an invaluable tool for societal progress. The key lies in developing responsible frameworks that maximize advantages while minimizing risks.",
          "wordCount": 275
        },
        "annotations": [
          {
            "section": "introduction",
            "highlight": "The rapid advancement of artificial intelligence has fundamentally transformed numerous aspects of modern life.",
            "technique": "Paraphrasing",
            "explanation": "This sentence paraphrases the question using academic vocabulary: 'rapid advancement', 'fundamentally transformed', 'numerous aspects'."
          },
          {
            "section": "introduction",
            "highlight": "While I acknowledge certain concerns, I firmly believe that the benefits of AI significantly outweigh its drawbacks.",
            "technique": "Clear position statement",
            "explanation": "The writer's opinion is stated clearly using 'I firmly believe'. The word 'while' shows awareness of both sides."
          },
          {
            "section": "body1",
            "highlight": "One primary advantage of AI technology is its capacity to enhance workplace productivity and efficiency.",
            "technique": "Topic sentence",
            "explanation": "Strong topic sentence that introduces the central theme of the paragraph using academic language."
          },
          {
            "section": "body1",
            "highlight": "For instance, many manufacturing companies have implemented AI-powered robots that handle assembly line operations, resulting in a 30% increase in production output.",
            "technique": "Specific example with details",
            "explanation": "Provides a concrete example with specific details (30% increase) that supports the main point effectively."
          },
          {
            "section": "body2",
            "highlight": "However, the widespread implementation of AI raises legitimate privacy concerns that warrant serious consideration.",
            "technique": "Contrasting topic sentence",
            "explanation": "Uses 'however' to signal a shift to the opposing view, while maintaining balance with 'legitimate concerns'."
          },
          {
            "section": "conclusion",
            "highlight": "In conclusion, while AI presents certain privacy challenges that require regulatory attention, its tremendous benefits in improving efficiency and productivity make it an invaluable tool for societal progress.",
            "technique": "Balanced conclusion",
            "explanation": "Acknowledges both sides but reinforces the writer's position clearly. No new ideas introduced."
          }
        ],
        "analysis": {
          "wordCount": 275,
          "structure": "4 paragraphs (intro, body1, body2, conclusion)",
          "strengths": [
            "Clear position stated in introduction and maintained throughout",
            "Well-developed ideas with specific examples and explanations",
            "Effective use of cohesive devices (While, However, For instance, Consequently)",
            "Wide range of academic vocabulary used naturally",
            "Variety of complex sentence structures with accurate grammar",
            "Balanced approach acknowledging both sides while supporting position",
            "Appropriate formal academic tone throughout"
          ],
          "bandScore": {
            "taskResponse": "9",
            "coherenceCohesion": "9",
            "lexicalResource": "8-9",
            "grammaticalRange": "9",
            "overall": "8.5-9"
          }
        }
      }
    },

    {
      "id": "self-assessment",
      "order": 9,
      "title": "Self-Assessment",
      "description": "Evaluate your essay using official IELTS band descriptors",
      "uiComponent": "assessment-rubric",
      "content": {
        "instruction": "Read your essay and the model answer. Rate yourself on each criterion below.",
        "criteria": [
          {
            "criterion": "taskResponse",
            "title": "Task Response",
            "weight": "25%",
            "description": "How well you answered the question",
            "bandDescriptors": [
              {
                "band": 9,
                "descriptor": "Fully addresses all parts of the task; presents a fully developed position with relevant, extended and supported ideas"
              },
              {
                "band": 7,
                "descriptor": "Addresses all parts of the task; presents a clear position; main ideas are extended and supported but may lack full development"
              },
              {
                "band": 5,
                "descriptor": "Addresses the task only partially; expresses a position but development is limited; presents some main ideas but unclear/repetitive"
              }
            ],
            "checkQuestions": [
              {
                "id": "tr-q1",
                "question": "Did you answer ALL parts of the question?",
                "userAnswer": null,
                "options": ["Yes, completely", "Mostly", "Partially", "No"]
              },
              {
                "id": "tr-q2",
                "question": "Is your position clear throughout the essay?",
                "userAnswer": null,
                "options": ["Very clear", "Mostly clear", "Somewhat unclear", "Unclear"]
              },
              {
                "id": "tr-q3",
                "question": "Are your ideas relevant and well-developed?",
                "userAnswer": null,
                "options": ["Fully developed", "Adequately developed", "Limited development", "Underdeveloped"]
              }
            ],
            "selfRating": {
              "selectedBand": null,
              "notes": ""
            }
          },
          {
            "criterion": "coherenceCohesion",
            "title": "Coherence and Cohesion",
            "weight": "25%",
            "description": "How well organized and connected your ideas are",
            "bandDescriptors": [
              {
                "band": 9,
                "descriptor": "Uses cohesion in such a way that it attracts no attention; skilful management of paragraphing"
              },
              {
                "band": 7,
                "descriptor": "Logically organizes information and ideas; clear progression throughout; uses range of cohesive devices appropriately although some under/over-use"
              },
              {
                "band": 5,
                "descriptor": "Presents information with some organization but may lack overall progression; inadequate, inaccurate or overuse of cohesive devices; may be repetitive"
              }
            ],
            "checkQuestions": [
              {
                "id": "cc-q1",
                "question": "Is your essay logically organized with clear progression?",
                "userAnswer": null,
                "options": ["Very logical", "Mostly logical", "Somewhat disorganized", "Disorganized"]
              },
              {
                "id": "cc-q2",
                "question": "Do you use linking words appropriately (not too many, not too few)?",
                "userAnswer": null,
                "options": ["Appropriate use", "Mostly appropriate", "Some overuse/underuse", "Inappropriate use"]
              },
              {
                "id": "cc-q3",
                "question": "Does each paragraph have one clear central theme?",
                "userAnswer": null,
                "options": ["Yes, all paragraphs", "Most paragraphs", "Some paragraphs", "No clear themes"]
              }
            ],
            "selfRating": {
              "selectedBand": null,
              "notes": ""
            }
          },
          {
            "criterion": "lexicalResource",
            "title": "Lexical Resource",
            "weight": "25%",
            "description": "Your vocabulary range and accuracy",
            "bandDescriptors": [
              {
                "band": 9,
                "descriptor": "Uses wide range of vocabulary with very natural and sophisticated control of lexical features; rare minor errors occur only as 'slips'"
              },
              {
                "band": 7,
                "descriptor": "Uses sufficient range of vocabulary to allow some flexibility and precision; uses less common lexical items with awareness of style and collocation; may produce occasional errors in word choice, spelling and/or word formation"
              },
              {
                "band": 5,
                "descriptor": "Uses limited range of vocabulary, but this is minimally adequate for the task; may make noticeable errors in spelling and/or word formation that may cause some difficulty for the reader"
              }
            ],
            "checkQuestions": [
              {
                "id": "lr-q1",
                "question": "Did you use topic-specific vocabulary?",
                "userAnswer": null,
                "options": ["Wide range", "Good range", "Limited range", "Very limited"]
              },
              {
                "id": "lr-q2",
                "question": "Are your word choices natural and appropriate?",
                "userAnswer": null,
                "options": ["Very natural", "Mostly natural", "Some awkward choices", "Many errors"]
              },
              {
                "id": "lr-q3",
                "question": "Did you avoid repetition by using synonyms and paraphrasing?",
                "userAnswer": null,
                "options": ["Yes, effectively", "Mostly", "Some repetition", "Lots of repetition"]
              }
            ],
            "selfRating": {
              "selectedBand": null,
              "notes": ""
            }
          },
          {
            "criterion": "grammaticalRange",
            "title": "Grammatical Range and Accuracy",
            "weight": "25%",
            "description": "Your grammar variety and correctness",
            "bandDescriptors": [
              {
                "band": 9,
                "descriptor": "Uses wide range of structures with full flexibility and accuracy; rare minor errors occur only as 'slips'"
              },
              {
                "band": 7,
                "descriptor": "Uses variety of complex structures; produces frequent error-free sentences; has good control of grammar and punctuation but may make a few errors"
              },
              {
                "band": 5,
                "descriptor": "Uses only limited range of structures; attempts complex sentences but these tend to be less accurate than simple sentences; may make frequent grammatical errors and punctuation may be faulty"
              }
            ],
            "checkQuestions": [
              {
                "id": "gr-q1",
                "question": "Did you use a variety of sentence structures (simple, compound, complex)?",
                "userAnswer": null,
                "options": ["Wide variety", "Good variety", "Limited variety", "No variety"]
              },
              {
                "id": "gr-q2",
                "question": "How many grammatical errors did you find?",
                "userAnswer": null,
                "options": ["0-2 minor errors", "3-5 errors", "6-10 errors", "More than 10"]
              },
              {
                "id": "gr-q3",
                "question": "Are your complex sentences grammatically accurate?",
                "userAnswer": null,
                "options": ["Very accurate", "Mostly accurate", "Some errors", "Many errors"]
              }
            ],
            "selfRating": {
              "selectedBand": null,
              "notes": ""
            }
          }
        ],
        "overallAssessment": {
          "estimatedBand": null,
          "strengths": {
            "userInput": "textarea",
            "label": "What did you do well?",
            "placeholder": "List your strengths...",
            "savedValue": ""
          },
          "areasForImprovement": {
            "userInput": "textarea",
            "label": "What do you need to improve?",
            "placeholder": "Identify areas to work on...",
            "savedValue": ""
          },
          "actionPlan": {
            "userInput": "textarea",
            "label": "What will you practice next?",
            "placeholder": "Create your action plan...",
            "savedValue": ""
          }
        }
      }
    }
  ],

  "progressTracking": {
    "sectionsCompleted": [],
    "timeSpent": {
      "questionAnalysis": 0,
      "vocabularyIdeas": 0,
      "brainstorming": 0,
      "planning": 0,
      "exercises": 0,
      "writing": 0,
      "checking": 0,
      "modelReview": 0,
      "assessment": 0
    },
    "exerciseScores": {
      "sentenceUnscramble": {
        "completed": 0,
        "total": 3,
        "correct": 0
      },
      "fillInTheBlank": {
        "completed": 0,
        "total": 3,
        "correct": 0
      },
      "completeSentence": {
        "completed": 0,
        "total": 3,
        "assessed": 0
      }
    },
    "checklistProgress": {
      "sentenceLevel": 0,
      "paragraphLevel": 0,
      "essayLevel": 0
    },
    "lastSaved": null,
    "completed": false
  }
}
```

## Usage

When user runs `/ielts-writing-generator`, Claude will:

1. **Select a topic**: Choose from current 2025 IELTS topics (AI, education, environment, etc.)
2. **Generate complete content**: Create ALL sections with real, specific content (no placeholders)
3. **Populate vocabulary**: Include 8-10 topic-specific vocabulary items with definitions, examples, collocations
4. **Create exercises**: Generate 3 sentence unscramble, 3 fill-in-blank, 3 complete-sentence exercises using the topic vocabulary
5. **Write model answer**: Provide a full band 8-9 essay (270-280 words) with detailed annotations
6. **Output JSON**: Return the complete, production-ready JSON

The JSON should be ready to use in a static site builder (React, Vue, Svelte, etc.) with clear UI component mappings.
