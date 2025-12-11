import fs from 'fs';

const data = JSON.parse(fs.readFileSync('/home/user/vocab-learner/data/writing-v2-online-education.json', 'utf8'));

// Vietnamese translations for online-education topic
const vietnameseTranslations = {
  academicVocabulary: {
    "flexible": {
      definition: "Có thể điều chỉnh hoặc thích ứng với tình huống khác nhau.",
      example: "Giáo dục trực tuyến cung cấp lịch học linh hoạt cho sinh viên làm việc."
    },
    "self-discipline": {
      definition: "Khả năng kiểm soát hành vi và động lực của bản thân.",
      example: "Học trực tuyến đòi hỏi kỷ luật tự giác mạnh mẽ và quản lý thời gian hiệu quả."
    },
    "interaction": {
      definition: "Giao tiếp hoặc trao đổi trực tiếp giữa mọi người.",
      example: "Các nền tảng trực tuyến không thể hoàn toàn thay thế tương tác trực tiếp trong lớp học."
    },
    "hands-on": {
      definition: "Liên quan đến trải nghiệm thực tế hoặc ứng dụng thực hành.",
      example: "Các môn học như y học cần kinh nghiệm thực hành mà học trực tuyến khó cung cấp."
    },
    "asynchronous": {
      definition: "Không xảy ra cùng lúc; học sinh học theo tốc độ riêng.",
      example: "Học tập không đồng bộ cho phép sinh viên xem lại bài giảng bất cứ lúc nào."
    },
    "synchronous": {
      definition: "Xảy ra cùng lúc; học sinh và giáo viên tương tác trực tiếp.",
      example: "Lớp học đồng bộ cung cấp phản hồi và tương tác tức thì."
    },
    "accreditation": {
      definition: "Công nhận chính thức rằng một khóa học đáp ứng tiêu chuẩn chất lượng.",
      example: "Sinh viên nên xác minh rằng các khóa học trực tuyến có sự công nhận hợp lệ."
    },
    "retention": {
      definition: "Khả năng ghi nhớ và nhớ lại thông tin đã học.",
      example: "Một số nghiên cứu cho thấy tỷ lệ ghi nhớ thấp hơn trong môi trường học trực tuyến."
    }
  },
  topicVocabulary: {
    "distance learning": {
      definition: "Giáo dục được cung cấp từ xa, thường qua internet.",
      example: "Học từ xa đã trở nên phổ biến hơn nhiều trong những năm gần đây."
    },
    "MOOC (Massive Open Online Course)": {
      definition: "Khóa học trực tuyến mở cho số lượng lớn người tham gia.",
      example: "MOOC từ các trường đại học hàng đầu cung cấp giáo dục chất lượng cao miễn phí."
    },
    "video conferencing": {
      definition: "Công nghệ cho phép cuộc họp trực tiếp qua internet.",
      example: "Hội nghị video cho phép sinh viên tham dự các lớp học từ bất cứ đâu."
    },
    "digital resources": {
      definition: "Tài liệu học tập điện tử như sách điện tử và video.",
      example: "Tài nguyên kỹ thuật số làm cho tài liệu khóa học dễ tiếp cận và có thể tìm kiếm."
    },
    "peer collaboration": {
      definition: "Sinh viên làm việc cùng nhau trên các dự án hoặc bài tập.",
      example: "Hợp tác đồng nghiệp có thể khó thực hiện hơn trong môi trường trực tuyến."
    },
    "learning curve": {
      definition: "Thời gian và nỗ lực cần thiết để thành thạo kỹ năng mới.",
      example: "Nền tảng học trực tuyến có thể có đường cong học tập dốc đối với người học lớn tuổi."
    }
  }
};

// Apply translations to academic vocabulary
const vocabStep = data.steps.find(s => s.type === 'vocabulary');
vocabStep.content.academicVocabulary.forEach(vocab => {
  if (vietnameseTranslations.academicVocabulary[vocab.word]) {
    vocab.vietnameseDefinition = vietnameseTranslations.academicVocabulary[vocab.word].definition;
    vocab.vietnameseExample = vietnameseTranslations.academicVocabulary[vocab.word].example;
  }
});

// Apply translations to topic vocabulary
vocabStep.content.topicVocabulary.forEach(vocab => {
  if (vietnameseTranslations.topicVocabulary[vocab.phrase]) {
    vocab.vietnameseDefinition = vietnameseTranslations.topicVocabulary[vocab.phrase].definition;
    vocab.vietnameseExample = vietnameseTranslations.topicVocabulary[vocab.phrase].example;
  }
});

// Add more academic phrases for online-education topic
const additionalPhrases = [
  {
    "phrase": "hybrid learning model",
    "definition": "Combination of online and in-person instruction.",
    "vietnameseDefinition": "Kết hợp giảng dạy trực tuyến và trực tiếp.",
    "example": "The hybrid learning model offers flexibility while maintaining personal connection.",
    "vietnameseExample": "Mô hình học tập kết hợp cung cấp sự linh hoạt đồng thời duy trì kết nối cá nhân."
  },
  {
    "phrase": "self-paced learning",
    "definition": "Educational approach where students progress at their own speed.",
    "vietnameseDefinition": "Phương pháp giáo dục nơi sinh viên tiến bộ theo tốc độ riêng của họ.",
    "example": "Self-paced learning allows students to spend more time on challenging topics.",
    "vietnameseExample": "Học theo tốc độ riêng cho phép sinh viên dành nhiều thời gian hơn cho các chủ đề khó."
  },
  {
    "phrase": "digital assessment",
    "definition": "Testing and evaluation conducted through online platforms.",
    "vietnameseDefinition": "Kiểm tra và đánh giá được thực hiện qua nền tảng trực tuyến.",
    "example": "Digital assessment can provide immediate feedback to students.",
    "vietnameseExample": "Đánh giá kỹ thuật số có thể cung cấp phản hồi tức thì cho sinh viên."
  },
  {
    "phrase": "bandwidth requirements",
    "definition": "Internet connection speed needed for online activities.",
    "vietnameseDefinition": "Tốc độ kết nối internet cần thiết cho hoạt động trực tuyến.",
    "example": "High bandwidth requirements can be a barrier for students in rural areas.",
    "vietnameseExample": "Yêu cầu băng thông cao có thể là rào cản cho sinh viên ở vùng nông thôn."
  },
  {
    "phrase": "academic integrity",
    "definition": "Maintaining honesty and ethical standards in academic work.",
    "vietnameseDefinition": "Duy trì sự trung thực và tiêu chuẩn đạo đức trong công việc học thuật.",
    "example": "Online education faces challenges in ensuring academic integrity during exams.",
    "vietnameseExample": "Giáo dục trực tuyến đối mặt với thách thức đảm bảo tính toàn vẹn học thuật trong kỳ thi."
  }
];

vocabStep.content.topicVocabulary.push(...additionalPhrases);

fs.writeFileSync('/home/user/vocab-learner/data/writing-v2-online-education.json', JSON.stringify(data, null, 2));

console.log('✓ Added Vietnamese translations and 5 new academic phrases to online-education topic');
console.log('  - Academic vocabulary: 8 items with Vietnamese');
console.log('  - Topic vocabulary: 11 items with Vietnamese (6 original + 5 new)');
