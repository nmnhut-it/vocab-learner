# AI Agent Translation Task

## Your Mission
Translate 933 IELTS vocabulary items from English to Vietnamese. The input file is already formatted for easy translation, and your output will be automatically merged back into the codebase.

## Files
- **Input:** `data/to-translate.json` (933 items)
- **Output:** `data/translated.json` (same structure with Vietnamese added)

## Task
For each item in the JSON array, fill in the empty `vietnameseDefinition` and `vietnameseExample` fields.

### Input Format
```json
{
  "id": "academic-grouping_academic_0",
  "fileId": "academic-grouping",
  "type": "academic",
  "word": "streaming",
  "englishDefinition": "Dividing students into groups based on their academic ability.",
  "englishExample": "Streaming allows teachers to tailor instruction to students' ability levels.",
  "vietnameseDefinition": "",
  "vietnameseExample": ""
}
```

### Expected Output
```json
{
  "id": "academic-grouping_academic_0",
  "fileId": "academic-grouping",
  "type": "academic",
  "word": "streaming",
  "englishDefinition": "Dividing students into groups based on their academic ability.",
  "englishExample": "Streaming allows teachers to tailor instruction to students' ability levels.",
  "vietnameseDefinition": "Chia học sinh thành các nhóm dựa trên khả năng học tập của họ.",
  "vietnameseExample": "Phân luồng cho phép giáo viên điều chỉnh giảng dạy theo trình độ của học sinh."
}
```

## Translation Guidelines

### 1. Style Requirements
- ✅ **Formal academic Vietnamese** appropriate for IELTS learners
- ✅ **Natural and clear** - avoid word-for-word translation
- ✅ **Concise but complete** - capture the full meaning
- ✅ **Consistent terminology** across similar concepts

### 2. Common IELTS Terms

| English | Vietnamese |
|---------|-----------|
| society | xã hội |
| government | chính phủ |
| education | giáo dục |
| environment | môi trường |
| economy / economic | kinh tế |
| technology | công nghệ |
| communication | giao tiếp / truyền thông |
| development | phát triển |
| impact / affect | tác động / ảnh hưởng |
| benefit | lợi ích |
| advantage | ưu điểm / lợi thế |
| disadvantage | nhược điểm / bất lợi |
| issue / problem | vấn đề |
| solution | giải pháp |
| essential / crucial | thiết yếu / quan trọng |
| significant | đáng kể |
| implement | thực hiện / triển khai |
| promote | thúc đẩy / khuyến khích |
| reduce / decrease | giảm thiểu |
| increase / enhance | tăng cường |

### 3. Quality Checklist
- [ ] Definition is accurate and concise (1 sentence typically)
- [ ] Example maintains the context and nuance of the original
- [ ] Uses natural Vietnamese sentence structure
- [ ] Terminology is consistent with other similar words
- [ ] No English words remain (except proper nouns)
- [ ] Appropriate for Vietnamese IELTS students

## Examples

### Example 1: Academic Vocabulary
```json
{
  "word": "facilitate",
  "englishDefinition": "To make an action or process easier.",
  "englishExample": "These platforms facilitate social movements and collective action.",

  // ✅ Good translation:
  "vietnameseDefinition": "Làm cho một hành động hoặc quá trình trở nên dễ dàng hơn.",
  "vietnameseExample": "Các nền tảng này tạo điều kiện thuận lợi cho các phong trào xã hội và hành động tập thể."
}
```

### Example 2: Topic Vocabulary
```json
{
  "phrase": "echo chamber",
  "englishDefinition": "Environment where people only encounter views they already agree with.",
  "englishExample": "Social media algorithms can create echo chambers that reinforce existing beliefs.",

  // ✅ Good translation:
  "vietnameseDefinition": "Môi trường mà mọi người chỉ gặp những quan điểm họ đã đồng ý.",
  "vietnameseExample": "Thuật toán mạng xã hội có thể tạo ra buồng vang dội củng cố niềm tin hiện có."
}
```

### Example 3: Complex Concept
```json
{
  "word": "polarization",
  "englishDefinition": "Division into sharply contrasting groups.",
  "englishExample": "Social media can increase political polarization in society.",

  // ✅ Good translation:
  "vietnameseDefinition": "Sự chia rẽ thành các nhóm đối lập cực đoan.",
  "vietnameseExample": "Mạng xã hội có thể góp phần vào sự phân cực chính trị trong xã hội."
}
```

## Important Notes

1. **Preserve JSON Structure:** Keep all existing fields exactly as they are
2. **Only Fill Empty Fields:** Add Vietnamese to `vietnameseDefinition` and `vietnameseExample`
3. **Maintain Order:** Process all 933 items in the same order
4. **Save As:** `data/translated.json` (NOT to-translate.json)

## Processing Steps

1. Read `data/to-translate.json`
2. For each of the 933 items:
   - Translate `englishDefinition` → add to `vietnameseDefinition`
   - Translate `englishExample` → add to `vietnameseExample`
3. Save the complete array to `data/translated.json`

## After Completion

Once you save `data/translated.json`, the user will run:

```bash
node scripts/apply-translations.js
```

This will automatically merge your translations into all 67 IELTS exercise files!

---

**Statistics:**
- Total items: 933
- Academic vocabulary: 527
- Topic vocabulary: 406
- Files covered: 67 IELTS topics

**Estimated time:** 1-2 hours with AI assistance

**Remember:** Your output must be valid JSON saved as `data/translated.json` with all 933 items translated!
