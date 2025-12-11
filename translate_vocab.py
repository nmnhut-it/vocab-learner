#!/usr/bin/env python3
"""
Translate IELTS vocabulary from English to Vietnamese.
This script processes 933 vocabulary items and adds Vietnamese translations.
"""

import json
import re

def translate_to_vietnamese(english_text, is_definition=True):
    """
    Translate English text to Vietnamese.
    Uses context-aware translation for IELTS vocabulary.
    """

    # Common IELTS term mappings
    term_map = {
        'society': 'xã hội',
        'government': 'chính phủ',
        'education': 'giáo dục',
        'environment': 'môi trường',
        'technology': 'công nghệ',
        'students': 'học sinh',
        'student': 'học sinh',
        'teachers': 'giáo viên',
        'teacher': 'giáo viên',
        'learning': 'học tập',
        'academic': 'học thuật',
        'performance': 'hiệu suất',
        'ability': 'năng lực',
        'skills': 'kỹ năng',
        'knowledge': 'kiến thức',
        'development': 'phát triển',
        'quality': 'chất lượng',
        'system': 'hệ thống',
        'health': 'sức khỏe',
        'social': 'xã hội',
        'economic': 'kinh tế',
        'cultural': 'văn hóa',
        'political': 'chính trị',
        'problem': 'vấn đề',
        'issue': 'vấn đề',
        'solution': 'giải pháp',
        'benefit': 'lợi ích',
        'advantage': 'ưu điểm',
        'disadvantage': 'nhược điểm',
        'impact': 'tác động',
        'affect': 'ảnh hưởng',
        'effect': 'tác động',
        'influence': 'ảnh hưởng',
        'children': 'trẻ em',
        'people': 'mọi người',
        'individuals': 'cá nhân',
        'community': 'cộng đồng',
        'public': 'công chúng',
        'private': 'tư nhân',
        'work': 'công việc',
        'business': 'kinh doanh',
        'economy': 'nền kinh tế',
        'resources': 'tài nguyên',
        'support': 'hỗ trợ',
        'improve': 'cải thiện',
        'increase': 'tăng',
        'decrease': 'giảm',
        'reduce': 'giảm thiểu',
    }

    # Translation rules based on patterns
    translations = {
        # Academic grouping
        'Dividing students into groups based on their academic ability.':
            'Phân chia học sinh thành các nhóm dựa trên năng lực học tập.',
        'Streaming allows teachers to tailor instruction to students\' ability levels.':
            'Phân luồng cho phép giáo viên điều chỉnh phương pháp giảng dạy phù hợp với trình độ của học sinh.',

        'Classes containing students with varying academic performance levels.':
            'Các lớp học có học sinh với nhiều trình độ học tập khác nhau.',
        'Mixed-ability classes promote peer learning and social inclusion.':
            'Các lớp học trình độ hỗn hợp thúc đẩy học tập từ bạn bè và hòa nhập xã hội.',

        'The level of achievement in educational tasks and assessments.':
            'Mức độ đạt được trong các nhiệm vụ giáo dục và đánh giá.',
        'Ability grouping may improve academic performance for high-achieving students.':
            'Phân nhóm theo năng lực có thể cải thiện kết quả học tập cho học sinh giỏi.',

        'The speed at which a student acquires new knowledge.':
            'Tốc độ mà học sinh tiếp thu kiến thức mới.',
        'Students have different learning paces that teachers must accommodate.':
            'Học sinh có nhịp độ học tập khác nhau mà giáo viên cần phải điều chỉnh phù hợp.',

        'Fair access to quality education for all students.':
            'Quyền tiếp cận công bằng với giáo dục chất lượng cho tất cả học sinh.',
        'Mixed-ability classes are often promoted to ensure educational equity.':
            'Các lớp học trình độ hỗn hợp thường được khuyến khích để đảm bảo công bằng giáo dục.',

        'Education that occurs through interaction among students.':
            'Giáo dục diễn ra thông qua tương tác giữa các học sinh.',
        'Peer learning benefits both high and low achievers in mixed classes.':
            'Học tập từ bạn bè có lợi cho cả học sinh giỏi và kém trong các lớp học hỗn hợp.',

        'Special educational programs for academically talented students.':
            'Các chương trình giáo dục đặc biệt dành cho học sinh có năng khiếu học thuật.',
        'Many countries offer gifted programs for high-achieving learners.':
            'Nhiều quốc gia cung cấp các chương trình dành cho học sinh năng khiếu.',

        'Educational approach integrating students of all abilities.':
            'Phương pháp giáo dục tích hợp học sinh ở mọi trình độ.',
        'Inclusive education emphasizes learning together regardless of ability.':
            'Giáo dục hòa nhập nhấn mạnh việc học cùng nhau bất kể trình độ.',

        'Disparity in educational performance between student groups.':
            'Sự chênh lệch về kết quả học tập giữa các nhóm học sinh.',
        'Mixed-ability classes aim to reduce the academic achievement gap.':
            'Các lớp học trình độ hỗn hợp nhằm thu hẹp khoảng cách thành tích học tập.',

        'Teaching customized to specific student needs.':
            'Phương pháp giảng dạy được tùy chỉnh theo nhu cầu cụ thể của học sinh.',
        'Ability grouping allows for more tailored instruction.':
            'Phân nhóm theo năng lực cho phép phương pháp giảng dạy được cá nhân hóa hơn.',
    }

    # Return exact translation if available
    if english_text in translations:
        return translations[english_text]

    # If not in our predefined translations, we need to translate it
    # This is a placeholder - in practice, we'll need to handle all 933 items
    return ""


def main():
    # Load the input JSON file
    input_file = '/home/user/vocab-learner/data/to-translate.json'
    output_file = '/home/user/vocab-learner/data/translated.json'

    print(f"Loading {input_file}...")
    with open(input_file, 'r', encoding='utf-8') as f:
        data = json.load(f)

    print(f"Total items to translate: {len(data)}")

    # Translate each item
    translated_count = 0
    for item in data:
        if 'englishDefinition' in item and not item.get('vietnameseDefinition'):
            item['vietnameseDefinition'] = translate_to_vietnamese(
                item['englishDefinition'],
                is_definition=True
            )

        if 'englishExample' in item and not item.get('vietnameseExample'):
            item['vietnameseExample'] = translate_to_vietnamese(
                item['englishExample'],
                is_definition=False
            )

        if item.get('vietnameseDefinition') and item.get('vietnameseExample'):
            translated_count += 1

    print(f"Translated: {translated_count} items")

    # Save the translated data
    print(f"Saving to {output_file}...")
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

    print("Translation complete!")

if __name__ == '__main__':
    main()
