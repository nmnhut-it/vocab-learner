#!/usr/bin/env python3
"""
Comprehensive Vietnamese translation for 933 IELTS vocabulary items.
"""

import json
import sys

# Comprehensive translation dictionary for all 933 items
# This will contain Vietnamese translations for definitions and examples
TRANSLATIONS = {}

def load_translations():
    """Load all Vietnamese translations."""

    # I'll systematically translate all items by processing the English text
    # This function will contain all 1866 translations (933 definitions + 933 examples)

    translations = {
        # Academic grouping topic
        ('academic-grouping_academic_0', 'def'): 'Phân chia học sinh thành các nhóm dựa trên năng lực học tập.',
        ('academic-grouping_academic_0', 'ex'): 'Phân luồng cho phép giáo viên điều chỉnh phương pháp giảng dạy phù hợp với trình độ của học sinh.',

        ('academic-grouping_academic_1', 'def'): 'Các lớp học có học sinh với nhiều trình độ học tập khác nhau.',
        ('academic-grouping_academic_1', 'ex'): 'Các lớp học trình độ hỗn hợp thúc đẩy học tập từ bạn bè và hòa nhập xã hội.',

        ('academic-grouping_academic_2', 'def'): 'Mức độ đạt được trong các nhiệm vụ giáo dục và đánh giá.',
        ('academic-grouping_academic_2', 'ex'): 'Phân nhóm theo năng lực có thể cải thiện kết quả học tập cho học sinh giỏi.',

        ('academic-grouping_academic_3', 'def'): 'Tốc độ mà học sinh tiếp thu kiến thức mới.',
        ('academic-grouping_academic_3', 'ex'): 'Học sinh có nhịp độ học tập khác nhau mà giáo viên cần phải điều chỉnh phù hợp.',

        ('academic-grouping_academic_4', 'def'): 'Quyền tiếp cận công bằng với giáo dục chất lượng cho tất cả học sinh.',
        ('academic-grouping_academic_4', 'ex'): 'Các lớp học trình độ hỗn hợp thường được khuyến khích để đảm bảo công bằng giáo dục.',

        ('academic-grouping_academic_5', 'def'): 'Giáo dục diễn ra thông qua tương tác giữa các học sinh.',
        ('academic-grouping_academic_5', 'ex'): 'Học tập từ bạn bè có lợi cho cả học sinh giỏi và kém trong các lớp học hỗn hợp.',

        ('academic-grouping_topic_0', 'def'): 'Các chương trình giáo dục đặc biệt dành cho học sinh có năng khiếu học thuật.',
        ('academic-grouping_topic_0', 'ex'): 'Nhiều quốc gia cung cấp các chương trình dành cho học sinh năng khiếu.',

        ('academic-grouping_topic_1', 'def'): 'Phương pháp giáo dục tích hợp học sinh ở mọi trình độ.',
        ('academic-grouping_topic_1', 'ex'): 'Giáo dục hòa nhập nhấn mạnh việc học cùng nhau bất kể trình độ.',

        ('academic-grouping_topic_2', 'def'): 'Sự chênh lệch về kết quả học tập giữa các nhóm học sinh.',
        ('academic-grouping_topic_2', 'ex'): 'Các lớp học trình độ hỗn hợp nhằm thu hẹp khoảng cách thành tích học tập.',

        ('academic-grouping_topic_3', 'def'): 'Phương pháp giảng dạy được tùy chỉnh theo nhu cầu cụ thể của học sinh.',
        ('academic-grouping_topic_3', 'ex'): 'Phân nhóm theo năng lực cho phép phương pháp giảng dạy được cá nhân hóa hơn.',
    }

    return translations

def translate_item(item, translations_dict):
    """Translate a single vocabulary item."""
    item_id = item['id']

    # Try to get translations from dictionary
    def_key = (item_id, 'def')
    ex_key = (item_id, 'ex')

    if def_key in translations_dict:
        item['vietnameseDefinition'] = translations_dict[def_key]

    if ex_key in translations_dict:
        item['vietnameseExample'] = translations_dict[ex_key]

    return item

def main():
    input_file = '/home/user/vocab-learner/data/to-translate.json'
    output_file = '/home/user/vocab-learner/data/translated.json'

    print(f"Loading {input_file}...")
    with open(input_file, 'r', encoding='utf-8') as f:
        data = json.load(f)

    print(f"Total items: {len(data)}")

    # Load translations
    print("Loading translations...")
    translations_dict = load_translations()
    print(f"Loaded {len(translations_dict)} translation pairs")

    # Translate all items
    translated_count = 0
    for item in data:
        translate_item(item, translations_dict)
        if item.get('vietnameseDefinition') and item.get('vietnameseExample'):
            translated_count += 1

    print(f"Successfully translated: {translated_count}/{len(data)} items")

    # Save output
    print(f"Saving to {output_file}...")
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

    print("Done!")
    return translated_count

if __name__ == '__main__':
    count = main()
    if count < 933:
        print(f"\nWARNING: Only {count} out of 933 items were translated!")
        sys.exit(1)
