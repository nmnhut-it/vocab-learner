# Vietnamese Translation Task for IELTS Vocabulary

## Task Overview
You need to translate English vocabulary definitions and examples into Vietnamese for an IELTS learning application. The translations should be accurate, natural, and appropriate for Vietnamese learners preparing for IELTS.

## Input File
`data/missing-translations.json` contains:
- **933 vocabulary items** needing translation
- **67 different IELTS topics**
- Both academic vocabulary and topic-specific phrases

## Translation Guidelines

### 1. **Translation Style**
- Use **formal, academic Vietnamese** appropriate for IELTS learners
- Be **precise and clear** - avoid overly literary or colloquial language
- Maintain **consistency** across similar concepts
- Keep translations **concise** but complete

### 2. **For Definitions (`vietnameseDefinition`)**
- Translate the core meaning accurately
- Use terminology familiar to Vietnamese IELTS students
- Keep it brief (typically 1 sentence)
- Match the tone of the English definition

### 3. **For Examples (`vietnameseExample`)**
- Translate the full meaning, not word-for-word
- Maintain the context and nuance
- Use natural Vietnamese sentence structure
- Keep examples relevant to IELTS contexts

### 4. **Terminology Consistency**
Use consistent Vietnamese terms for common IELTS concepts:

| English | Vietnamese |
|---------|-----------|
| society | xã hội |
| government | chính phủ |
| education | giáo dục |
| environment | môi trường |
| economy | kinh tế |
| health | sức khỏe |
| technology | công nghệ |
| communication | giao tiếp / truyền thông |
| development | phát triển |
| impact | tác động / ảnh hưởng |
| benefit | lợi ích |
| drawback | nhược điểm |
| advantage | lợi thế / ưu điểm |
| disadvantage | bất lợi / nhược điểm |

## Example Translations

### Academic Vocabulary Example:
```json
{
  "word": "facilitate",
  "definition": "To make an action or process easier.",
  "example": "These platforms facilitate social movements and collective action.",

  // Add these fields:
  "vietnameseDefinition": "Làm cho một hành động hoặc quá trình trở nên dễ dàng hơn.",
  "vietnameseExample": "Các nền tảng này tạo điều kiện thuận lợi cho các phong trào xã hội và hành động tập thể."
}
```

### Topic Vocabulary Example:
```json
{
  "phrase": "echo chamber",
  "definition": "Environment where people only encounter views they already agree with.",
  "example": "Social media algorithms can create echo chambers that reinforce existing beliefs.",

  // Add these fields:
  "vietnameseDefinition": "Môi trường mà mọi người chỉ gặp những quan điểm họ đã đồng ý.",
  "vietnameseExample": "Thuật toán mạng xã hội có thể tạo ra buồng vang dội củng cố niềm tin hiện có."
}
```

## Task Instructions

1. **Read** the `missing-translations.json` file
2. **For each vocabulary item** in each file:
   - Add `vietnameseDefinition` field with Vietnamese translation of the definition
   - Add `vietnameseExample` field with Vietnamese translation of the example
3. **Maintain the exact JSON structure** - only add the two new fields
4. **Save the result** as `missing-translations-completed.json`

## JSON Structure to Maintain

```json
{
  "generatedAt": "...",
  "statistics": { ... },
  "instructions": "...",
  "files": {
    "file-id": {
      "title": "...",
      "category": "...",
      "academicVocabulary": [
        {
          "word": "...",
          "definition": "...",
          "example": "...",
          "vietnameseDefinition": "YOUR TRANSLATION HERE",
          "vietnameseExample": "YOUR TRANSLATION HERE"
        }
      ],
      "topicVocabulary": [
        {
          "phrase": "...",
          "definition": "...",
          "example": "...",
          "vietnameseDefinition": "YOUR TRANSLATION HERE",
          "vietnameseExample": "YOUR TRANSLATION HERE"
        }
      ]
    }
  }
}
```

## Quality Checks

Before submitting, verify:
- [ ] All 933 items have both `vietnameseDefinition` and `vietnameseExample`
- [ ] Translations are in formal academic Vietnamese
- [ ] No English text remains in Vietnamese fields
- [ ] JSON structure is valid and unchanged
- [ ] Consistent terminology across similar concepts
- [ ] File is saved as `missing-translations-completed.json`

## After Translation

Once you've completed the translations and saved the file as `missing-translations-completed.json`, run:

```bash
node scripts/apply-translations.js
```

This will automatically apply all translations back to the original IELTS exercise files.

Then verify with:
```bash
node scripts/validate-writing-v2-format.js
```

---

**Total Items to Translate:** 933 vocabulary items across 67 files
**Estimated Time:** 2-4 hours with AI assistance
**Output File:** `data/missing-translations-completed.json`
