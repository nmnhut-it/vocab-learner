# Add New IELTS Writing Task 2 Topic

This command creates a complete topic file for the IELTS Writing Task 2 Progressive Learning System with all 6 steps, 48 sentence exercises, and Band 8 model essay.

---

## Quick Start

**Usage:** `/add-writing-topic [topic-name]`

**Example:**
```
/add-writing-topic technology-education
Topic: Technology in Education
Question: Some people believe technology has improved education, while others think it has negative effects. Discuss both views and give your opinion.
```

---

## Topic Requirements

Provide these details:

1. **Topic ID**: kebab-case (e.g., `healthcare-system`, `fast-food-health`)
2. **Topic Title**: Title Case (e.g., "Healthcare System", "Fast Food & Health")
3. **Category**: One of:
   - Work & Employment
   - Education & Technology
   - Technology & Society
   - Environment
   - Health & Lifestyle
   - Infrastructure
   - Technology & Family
   - Lifestyle
4. **Question Type**:
   - "Discuss Both Views" (2 opposing views + your opinion)
   - "Advantages & Disadvantages" (pros/cons + your opinion)
5. **Question Text**: Full IELTS-style question (20-30 words)
6. **Difficulty**: Easy / Medium / Hard

---

## Complete File Structure

### Step 1: Topic Analysis

**Content:**
- **Question Type**: Explain what type it is + requirements
- **Key Words** (5 words): Define each important word in question
- **Essay Structure**: Number of sentences per paragraph
- **Common Mistakes** (4-5): What students should avoid

**Example:**
```json
"keyWords": [
  {
    "word": "technology",
    "definition": "Digital tools and devices used in education",
    "importance": "This is the main topic you must discuss"
  }
]
```

---

### Step 2: Vocabulary Builder

**Content:**
- **8 Academic Vocabulary Words**: Each with pronunciation, definition, example, synonyms
- **6 Topic-Specific Phrases**: With usage examples
- **Linking Phrases**: Categorized (introducing, contrasting, adding, exemplifying, concluding)

**Example:**
```json
{
  "word": "innovation",
  "pronunciation": "/ˌɪnəˈveɪʃən/",
  "partOfSpeech": "noun",
  "definition": "Introduction of new ideas or methods",
  "example": "Technological innovation has transformed modern education.",
  "synonyms": ["advancement", "development", "breakthrough"]
}
```

---

### Step 3: Sentence Builder (MOST IMPORTANT!)

**48 Exercises** organized into **6 functional sections**:

#### **Section 1: Thesis Statements** (5 exercises)
Place: Introduction paragraph

Templates:
1. "While some believe _____, others argue that _____."
2. "In my opinion, _____ depends on _____."
3. "There is ongoing debate about whether _____ or _____."
4. "From my perspective, _____ because _____."
5. "This essay will discuss _____ before concluding that _____."

Each exercise needs:
- `template`: Sentence with 2-4 blanks
- `blanks`: Array with 3 options each (1 correct + 2 distractors)
- `correctSentence`: Complete sentence
- `usableIn`: "introduction"

**Example Exercise:**
```json
{
  "id": "thesis1",
  "type": "template",
  "template": "While some believe _____, others argue that _____.",
  "blanks": [
    {
      "id": "thesis1_b1",
      "options": [
        "technology enhances learning outcomes",
        "schools need more funding",
        "students are too young"
      ],
      "correctAnswer": "technology enhances learning outcomes"
    },
    {
      "id": "thesis1_b2",
      "options": [
        "excessive screen time harms student development",
        "teachers should get more training",
        "homework is unnecessary"
      ],
      "correctAnswer": "excessive screen time harms student development"
    }
  ],
  "correctSentence": "While some believe technology enhances learning outcomes, others argue that excessive screen time harms student development.",
  "usableIn": "introduction"
}
```

#### **Section 2: Topic Sentences** (8 exercises)
Place: Start of Body 1 & Body 2

Templates:
1. "On the one hand, _____ offers _____."
2. "On the other hand, _____ provides _____."
3. "One significant advantage of _____ is _____."
4. "A key benefit of _____ is that _____."
5. "_____ argue that _____ is essential for _____."
6. "_____ contend that _____ enhances _____."
7. "The primary advantage of _____ is _____."
8. "A major drawback of _____ is _____."

Split: 4 for body-paragraph-1, 4 for body-paragraph-2

#### **Section 3: Supporting Arguments** (12 exercises)
Place: Body paragraphs (explain WHY)

Templates:
1. "This is because _____ enables _____ to _____."
2. "The main reason is that _____ leads to _____."
3. "_____ allows _____ to _____ without _____."
4. "_____ fosters _____, which is crucial for _____."
5. "By _____, _____ can _____."
6. "_____ strengthens _____ through _____."
7. "_____ contributes to _____ by _____."
8. "_____ promotes _____ that _____."
9. "_____ provides _____ with _____ over _____."
10. "In _____, _____ can _____ more readily."
11. "As a result, _____ experience _____."
12. "Consequently, _____ tends to be _____ in _____."

Split: 6 for body-paragraph-1, 6 for body-paragraph-2

#### **Section 4: Examples & Evidence** (10 exercises)
Place: Body paragraphs (support with examples)

Templates:
1. "For instance, _____ can _____ while _____."
2. "For example, _____ often require _____ that _____."
3. "Specifically, _____ in _____ waste _____ on _____."
4. "Research shows that _____ increase when _____."
5. "A study by _____ found that _____ reported _____."
6. "In particular, _____ such as _____ benefit from _____."
7. "Many _____, including _____, have reported that _____."
8. "Take _____ as an example: _____ relies on _____."
9. "According to _____, _____ who _____ experience _____."
10. "Evidence suggests that _____ is more effective when _____."

Split: 5 for body-paragraph-1, 5 for body-paragraph-2

#### **Section 5: Counter-arguments** (5 exercises)
Place: Body paragraphs (acknowledge other side)

Templates:
1. "However, it could be argued that _____ may lead to _____."
2. "Despite these advantages, _____ can present challenges such as _____."
3. "Nevertheless, _____ requires _____ that not all _____ possess."
4. "Although _____ offers benefits, it also involves _____ that _____."
5. "Critics point out that _____ can _____ if not managed properly."

#### **Section 6: Conclusions** (5 exercises + 3 extra anywhere = 48 total)
Place: Conclusion paragraph

Templates:
1. "In conclusion, while _____, I believe _____."
2. "Overall, _____ offers _____, whereas _____ provides _____."
3. "To summarize, _____ depends largely on _____."
4. "Ultimately, _____ should consider _____ when deciding _____."
5. "In my view, _____ represents the most effective solution because _____."

**IMPORTANT NOTES:**
- All sentences must be **topic-specific** (not generic)
- Distractors should be grammatically correct but contextually wrong
- Use vocabulary from Step 2 in exercises
- Each sentence should be directly usable in the final essay

---

### Step 4: Common Structures & Templates

**Content:**
- **3 Essay Templates** with structure + example
  - Template 1: Balanced Discussion
  - Template 2: Opinion-First Approach
  - Template 3: Cause-Effect Pattern
- **Useful Transitions** by category

Copy structure from `writing-v2-remote-work.json` Step 4 and adapt examples to new topic.

---

### Step 5: Build Paragraphs

**Content:**
- **4 Paragraph Templates** with fill-in-blanks:
  1. Introduction (3 blanks, 10+ words each)
  2. Body Paragraph 1 (4 blanks, 10+ words each)
  3. Body Paragraph 2 (4 blanks, 10+ words each)
  4. Conclusion (2 blanks, 10+ words each)

Each blank needs:
- `id`: Unique identifier
- `label`: What to write
- `hint`: Helpful guidance
- `placeholder`: Example text
- `minWords`: 10

Copy structure from `writing-v2-remote-work.json` Step 5 and adapt to new topic.

---

### Step 6: Build Complete Essay

**Content:**
- Instructions for essay editor
- Structure guide (sentences per paragraph)
- Self-review checklist
- Word count target: 270

Copy from `writing-v2-remote-work.json` Step 6.

---

### Model Essay (Band 8)

**Requirements:**
- **Word Count**: 270-290 words
- **Structure**: 4 paragraphs (intro, body1, body2, conclusion)
- **Content**:
  - Clear thesis statement
  - Balanced discussion of both views
  - Clear opinion
  - Specific examples
  - Academic vocabulary
  - Linking words
  - Range of grammar

**Highlights** (8 required):
- 3-4 academic vocabulary examples
- 2-3 linking word examples
- 1-2 specific examples
- 1 showing range/technique

**Example Highlight:**
```json
{
  "text": "facilitate",
  "type": "academic-vocab",
  "explanation": "Academic verb meaning 'make easier' - shows vocabulary range"
}
```

---

## Step-by-Step Creation Process

### 1. Create JSON File
File name: `data/writing-v2-[topic-id].json`

### 2. Build Each Step
- Start with Step 1 (easiest - just analysis)
- Step 2: Find 8 academic words relevant to topic
- **Step 3: MOST TIME** - Create all 48 exercises
- Step 4: Adapt templates with topic examples
- Step 5: Create fill-in-blank templates
- Step 6: Copy structure from existing topic
- Model Essay: Write Band 8 essay (270-290 words)

### 3. Update Topics Index
Add to `data/writing-v2-topics.json`:
```json
{
  "id": "[topic-id]",
  "title": "[Topic Title]",
  "category": "[Category]",
  "questionType": "[Question Type]",
  "difficulty": "Medium",
  "file": "data/writing-v2-[topic-id].json",
  "unlocked": false
}
```

### 4. Test
1. Open `ielts-writing-v2.html`
2. Select new topic from dropdown
3. Go through all 6 steps
4. Check exercises work correctly
5. Verify sentence bank collects sentences
6. Test essay submission

---

## Quality Checklist

Before finishing, verify:

- [ ] All 48 exercises in Step 3 work correctly
- [ ] Every sentence is topic-specific (not generic)
- [ ] Distractors are plausible but wrong
- [ ] Sentences flow naturally when used in essay
- [ ] Model essay is 270-290 words
- [ ] Model essay has 8 highlights
- [ ] All vocabulary from Step 2 appears in exercises
- [ ] Topic added to `writing-v2-topics.json`
- [ ] Tested end-to-end in browser

---

## Time Estimate

- Step 1 (Analysis): 15 minutes
- Step 2 (Vocabulary): 20 minutes
- **Step 3 (48 Exercises): 2-3 hours** ⚠️ Most time-consuming
- Step 4 (Templates): 20 minutes
- Step 5 (Paragraphs): 30 minutes
- Step 6 (Essay): 10 minutes
- Model Essay: 30 minutes
- Testing: 20 minutes

**Total: 4-5 hours per topic**

---

## Reference Files

- **Complete Example**: `data/writing-v2-remote-work.json`
- **Schema**: `data/writing-task2-schema-v2.json`
- **Topics List**: `data/writing-v2-topics.json`

---

## Common Mistakes to Avoid

1. ❌ Generic sentences that work for any topic
2. ❌ Distractors that are obviously wrong
3. ❌ Forgetting to set `usableIn` field
4. ❌ Blank options that are too similar
5. ❌ Model essay too short (<270 words)
6. ❌ Not enough highlights (need 8)
7. ❌ Exercises not using Step 2 vocabulary

---

**Ready to create a new topic? Use:** `/add-writing-topic [topic-id]`
