# Add New IELTS Writing Task 2 Topic

Create a new topic file for the IELTS Writing Task 2 Progressive Learning System with 48 sentence builder exercises organized by function.

## Instructions

When you use this command, provide:
1. **Topic ID** (e.g., "healthcare-system")
2. **Topic Title** (e.g., "Healthcare System")
3. **Category** (e.g., "Health & Society")
4. **Question Type** ("Discuss Both Views" or "Advantages & Disadvantages")
5. **Question Text** (full IELTS-style question)

## File Structure

Create `data/writing-v2-[topic-id].json` with this structure:

```json
{
  "id": "[topic-id]",
  "title": "[Topic Title]",
  "category": "[Category]",
  "difficulty": "Medium",
  "question": {
    "text": "[Full question text]",
    "type": "[Discuss Both Views | Advantages & Disadvantages]",
    "wordCountTarget": 270
  },
  "steps": [...]
}
```

## Step 3: Sentence Builder Requirements

**CRITICAL:** Step 3 must contain **48 exercises** organized into **6 sections by function**:

### Section 1: Thesis Statements (Introduction) - 5 exercises
- State both views and opinion
- Template examples:
  - "While some believe _____, others argue that _____."
  - "In my opinion, _____ depends on _____."
  - "There is ongoing debate about whether _____ or _____."

### Section 2: Topic Sentences (Body Paragraphs) - 8 exercises
- Start each body paragraph with clear topic sentence
- Template examples:
  - "On the one hand, _____ offers _____."
  - "On the other hand, _____ provides _____."
  - "One significant advantage of _____ is _____."
  - "A key benefit of _____ is that _____."

### Section 3: Supporting Arguments (Body Paragraphs) - 12 exercises
- Explain WHY with reasons and analysis
- Template examples:
  - "This is because _____ enables _____ to _____."
  - "The main reason is that _____ leads to _____."
  - "_____ allows _____ to _____ without _____."
  - "By _____, _____ can _____."

### Section 4: Examples & Evidence - 10 exercises
- Support arguments with specific examples
- Template examples:
  - "For instance, _____ can _____ while _____."
  - "For example, _____ often require _____ that _____."
  - "Research shows that _____ increase when _____."
  - "A study by _____ found that _____ reported _____."

### Section 5: Counter-arguments & Concessions - 5 exercises
- Acknowledge the other side's valid points
- Template examples:
  - "However, it could be argued that _____ may lead to _____."
  - "Despite these advantages, _____ can present challenges such as _____."
  - "Nevertheless, _____ requires _____ that not all _____ possess."

### Section 6: Conclusion Sentences - 5 exercises (Total: 45)
- Summarize and restate position
- Template examples:
  - "In conclusion, while _____, I believe _____."
  - "Overall, _____ offers _____, whereas _____ provides _____."
  - "Ultimately, _____ should consider _____ when deciding _____."

**Total: 48 exercises** (5+8+12+10+5+5 = 45 template + 3 additional in any section)

## Exercise Template Structure

Each exercise must follow this format:

```json
{
  "id": "[section-name][number]",
  "type": "template",
  "template": "[Sentence with _____ blanks]",
  "blanks": [
    {
      "id": "[exercise-id]_b[1,2,3...]",
      "options": ["correct option", "distractor 1", "distractor 2"],
      "correctAnswer": "correct option"
    }
  ],
  "correctSentence": "[Complete sentence when all blanks filled correctly]",
  "usableIn": "[introduction | body-paragraph-1 | body-paragraph-2 | conclusion]"
}
```

## Exercise Design Principles

1. **Well-Oriented Content**: Every sentence must be directly usable in the essay for this specific topic
2. **Fine-Grained Options**:
   - Each blank has 3 options: 1 correct + 2 plausible distractors
   - Distractors should be grammatically correct but contextually wrong
3. **Topic-Specific**: Use vocabulary and concepts from Steps 1 & 2
4. **Functional Organization**: Group by sentence function (thesis, topic, support, example, counter, conclusion)
5. **Clear Labeling**: Mark each sentence with where it can be used (intro/body1/body2/conclusion)

## Completion Criteria

- Student needs **35/48 correct** (73%) to unlock Step 4
- Update Step 3 JSON: `"completionCriteria": "Complete 35/48 exercises correctly"`

## After Creating Topic File

Update `data/writing-v2-topics.json` to add the new topic:

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

## Example: Using This Command

**User:** `/add-writing-topic`
Create topic: "Online Shopping vs Physical Stores"
Category: "Technology & Commerce"
Question: "Some people prefer online shopping while others believe physical stores are better. Discuss both views and give your opinion."

**Claude:** Will create `data/writing-v2-online-shopping.json` with:
- Step 1: Analysis (question type: Discuss Both Views)
- Step 2: 8 vocab words, 6 topic phrases
- Step 3: **48 exercises** organized by 6 functions
- Steps 4-6: Templates, paragraphs, essay editor
- Model essay: Band 8 level, 270-290 words

---

**Note:** This template ensures all new topics have the same robust sentence builder structure with 48 exercises that students can directly use in their essays.
