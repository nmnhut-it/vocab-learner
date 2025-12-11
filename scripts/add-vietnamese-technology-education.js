import fs from 'fs';

const data = JSON.parse(fs.readFileSync('/home/user/vocab-learner/data/writing-v2-technology-education.json', 'utf8'));

// Vietnamese translations for technology-education topic
const vietnameseTranslations = {
  academicVocabulary: {
    "integrate": {
      definition: "Kết hợp hoặc hợp nhất các phần thành một toàn thể.",
      example: "Các trường học nên tích hợp công nghệ vào các phương pháp giảng dạy truyền thống."
    },
    "enhance": {
      definition: "Cải thiện chất lượng, giá trị hoặc hiệu quả của điều gì đó.",
      example: "Công nghệ giáo dục có thể nâng cao trải nghiệm học tập của học sinh."
    },
    "interactive": {
      definition: "Cho phép giao tiếp hoặc tương tác hai chiều.",
      example: "Bảng trắng tương tác làm cho các bài học hấp dẫn và năng động hơn."
    },
    "accessibility": {
      definition: "Khả năng tiếp cận hoặc dễ sử dụng.",
      example: "Công nghệ cải thiện khả năng tiếp cận giáo dục cho sinh viên khuyết tật."
    },
    "digital literacy": {
      definition: "Khả năng sử dụng công nghệ kỹ thuật số một cách hiệu quả.",
      example: "Kiến thức kỹ thuật số là một kỹ năng thiết yếu trong thế giới hiện đại."
    },
    "personalized": {
      definition: "Được thiết kế hoặc điều chỉnh cho nhu cầu cá nhân.",
      example: "Phần mềm giáo dục có thể cung cấp trải nghiệm học tập được cá nhân hóa."
    },
    "distraction": {
      definition: "Điều gì đó làm chệch hướng sự chú ý.",
      example: "Thiết bị kỹ thuật số có thể là nguồn gây mất tập trung trong lớp học."
    },
    "competency": {
      definition: "Khả năng hoặc kỹ năng làm điều gì đó thành công.",
      example: "Giáo viên cần phát triển năng lực kỹ thuật số để giảng dạy hiệu quả."
    }
  },
  topicVocabulary: {
    "e-learning platform": {
      definition: "Hệ thống trực tuyến để cung cấp nội dung giáo dục.",
      example: "Các nền tảng học trực tuyến như Coursera cung cấp khóa học từ các trường đại học hàng đầu."
    },
    "blended learning": {
      definition: "Phương pháp kết hợp giảng dạy trực tiếp và trực tuyến.",
      example: "Học tập kết hợp kết hợp những điểm tốt nhất của giáo dục truyền thống và kỹ thuật số."
    },
    "educational technology": {
      definition: "Công cụ và phần mềm được sử dụng để hỗ trợ việc học.",
      example: "Công nghệ giáo dục có thể làm cho học tập trở nên tương tác và hấp dẫn hơn."
    },
    "digital divide": {
      definition: "Khoảng cách giữa những người có và không có quyền truy cập công nghệ.",
      example: "Khoảng cách kỹ thuật số tạo ra bất bình đẳng trong cơ hội giáo dục."
    },
    "adaptive learning": {
      definition: "Công nghệ điều chỉnh nội dung dựa trên tiến độ của học sinh.",
      example: "Hệ thống học tập thích ứng cung cấp phản hồi và hỗ trợ được cá nhân hóa."
    },
    "screen time": {
      definition: "Thời gian dành cho việc sử dụng thiết bị kỹ thuật số.",
      example: "Thời gian sử dụng màn hình quá mức có thể ảnh hưởng tiêu cực đến sức khỏe học sinh."
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

// Add more academic phrases for technology-education topic
const additionalPhrases = [
  {
    "phrase": "flipped classroom",
    "definition": "Teaching model where students learn content at home and practice in class.",
    "vietnameseDefinition": "Mô hình giảng dạy nơi học sinh học nội dung ở nhà và thực hành trong lớp.",
    "example": "The flipped classroom model allows teachers to provide more individualized support.",
    "vietnameseExample": "Mô hình lớp học đảo ngược cho phép giáo viên cung cấp hỗ trợ cá nhân hóa nhiều hơn."
  },
  {
    "phrase": "gamification in education",
    "definition": "Using game elements to increase student engagement.",
    "vietnameseDefinition": "Sử dụng các yếu tố trò chơi để tăng sự tham gia của học sinh.",
    "example": "Gamification in education can make learning more motivating and fun.",
    "vietnameseExample": "Trò chơi hóa trong giáo dục có thể làm cho việc học trở nên thúc đẩy và vui vẻ hơn."
  },
  {
    "phrase": "virtual classroom",
    "definition": "Online learning environment that simulates traditional classroom.",
    "vietnameseDefinition": "Môi trường học trực tuyến mô phỏng lớp học truyền thống.",
    "example": "Virtual classrooms became essential during the pandemic.",
    "vietnameseExample": "Lớp học ảo trở nên thiết yếu trong thời kỳ đại dịch."
  },
  {
    "phrase": "STEM education",
    "definition": "Integrated teaching of Science, Technology, Engineering, and Mathematics.",
    "vietnameseDefinition": "Giảng dạy tích hợp Khoa học, Công nghệ, Kỹ thuật và Toán học.",
    "example": "STEM education prepares students for careers in technology-driven fields.",
    "vietnameseExample": "Giáo dục STEM chuẩn bị học sinh cho sự nghiệp trong các lĩnh vực công nghệ."
  },
  {
    "phrase": "learning management system",
    "definition": "Software for administering and tracking educational courses.",
    "vietnameseDefinition": "Phần mềm để quản lý và theo dõi các khóa học giáo dục.",
    "example": "Learning management systems help teachers organize course materials and track student progress.",
    "vietnameseExample": "Hệ thống quản lý học tập giúp giáo viên tổ chức tài liệu khóa học và theo dõi tiến độ học sinh."
  }
];

vocabStep.content.topicVocabulary.push(...additionalPhrases);

fs.writeFileSync('/home/user/vocab-learner/data/writing-v2-technology-education.json', JSON.stringify(data, null, 2));

console.log('✓ Added Vietnamese translations and 5 new academic phrases to technology-education topic');
console.log('  - Academic vocabulary: 8 items with Vietnamese');
console.log('  - Topic vocabulary: 11 items with Vietnamese (6 original + 5 new)');
