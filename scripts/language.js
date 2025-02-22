// Language configuration for VocabHoot
const LANGUAGES = {
    'en': {
        // Welcome screen
        'welcome_title': 'VocabHoot!',
        'welcome_message': 'Test your vocabulary knowledge with this fun quiz!',
        'instructions_title': 'How to Play',
        'instructions': [
            'You\'ll be shown words from your vocabulary list',
            'Select the correct translation for each word',
            'Answer quickly to score more points',
            'The green checkmark shows the correct answer',
            'Use keyboard shortcuts: <strong>Q, W, E, R</strong> keys to select answers',
            'Try to get the highest score possible!'
        ],
        'start_button': 'Start Game',

        // Question screen
        'question': 'Question',
        'score': 'Score:',
        'streak': 'Streak:',
        'prompt_translation_en_vn': 'What\'s the correct translation?',
        'prompt_translation_vn_en': 'What\'s the English translation?',
        'prompt_unscramble': 'Unscramble this English word:',
        'prompt_vowels': 'Fill in the vowels for this word:',
        'prompt_consonants': 'Fill in the consonants for this word:',
        'shortcut_hint': 'Quick Answer: Use <strong>Q</strong>, <strong>W</strong>, <strong>E</strong>, <strong>R</strong> keys',

        // Results screen
        'game_over': 'Game Over!',
        'correct': 'Correct:',
        'accuracy': 'Accuracy:',
        'avg_score': 'Average Score per Question:',
        'best_streak': 'Best Streak:',
        'play_again': 'Play Again',

        // Error screen
        'error_title': 'Oops!',
        'error_message': 'No vocabulary data found. Please add some vocabulary words first!',
        'go_back': 'Go Back',

        // Language switcher
        'language': 'Language:'
    },
    'vi': {
        // Welcome screen
        'welcome_title': 'VocabHoot!',
        'welcome_message': 'Kiểm tra vốn từ vựng của bạn với trò chơi thú vị này!',
        'instructions_title': 'Cách Chơi',
        'instructions': [
            'Bạn sẽ được hiển thị các từ từ danh sách từ vựng của bạn',
            'Chọn bản dịch chính xác cho mỗi từ',
            'Trả lời nhanh để ghi được nhiều điểm hơn',
            'Dấu tích xanh hiển thị câu trả lời đúng',
            'Sử dụng phím tắt: phím <strong>Q, W, E, R</strong> để chọn câu trả lời',
            'Cố gắng đạt điểm cao nhất có thể!'
        ],
        'start_button': 'Bắt Đầu',

        // Question screen
        'question': 'Câu hỏi',
        'score': 'Điểm:',
        'streak': 'Chuỗi:',
        'prompt_translation_en_vn': 'Đâu là bản dịch đúng?',
        'prompt_translation_vn_en': 'Đâu là bản dịch tiếng Anh?',
        'prompt_unscramble': 'Sắp xếp lại từ tiếng Anh này:',
        'prompt_vowels': 'Điền nguyên âm cho từ này:',
        'prompt_consonants': 'Điền phụ âm cho từ này:',
        'shortcut_hint': 'Trả lời nhanh: Sử dụng phím <strong>Q</strong>, <strong>W</strong>, <strong>E</strong>, <strong>R</strong>',

        // Results screen
        'game_over': 'Trò Chơi Kết Thúc!',
        'correct': 'Đúng:',
        'accuracy': 'Độ chính xác:',
        'avg_score': 'Điểm trung bình mỗi câu hỏi:',
        'best_streak': 'Chuỗi tốt nhất:',
        'play_again': 'Chơi Lại',

        // Error screen
        'error_title': 'Rất tiếc!',
        'error_message': 'Không tìm thấy dữ liệu từ vựng. Vui lòng thêm một số từ vựng trước!',
        'go_back': 'Quay Lại',

        // Language switcher
        'language': 'Ngôn ngữ:'
    }
};

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = LANGUAGES;
}