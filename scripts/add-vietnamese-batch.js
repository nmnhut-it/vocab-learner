import fs from 'fs';

const data = JSON.parse(fs.readFileSync('/home/user/vocab-learner/data/writing-v2-academic-grouping.json', 'utf8'));

const vietnameseTranslations = {
  academicVocabulary: {
    "homogeneous": {
      definition: "Gồm các phần tử giống nhau hoặc tương tự nhau.",
      example: "Nhóm học tập đồng nhất có thể tiến bộ với tốc độ nhất quán."
    },
    "heterogeneous": {
      definition: "Gồm các phần tử khác nhau hoặc đa dạng.",
      example: "Các lớp học đa dạng thúc đẩy sự trao đổi quan điểm phong phú."
    },
    "cognitive": {
      definition: "Liên quan đến quá trình tư duy và học tập.",
      example: "Phát triển nhận thức xảy ra với tốc độ khác nhau ở từng học sinh."
    },
    "peer": {
      definition: "Người ngang hàng hoặc có trình độ tương đương.",
      example: "Học tập từ bạn bè cùng lứa có thể rất hiệu quả trong môi trường nhóm."
    },
    "differentiation": {
      definition: "Điều chỉnh giảng dạy cho nhu cầu học tập khác nhau.",
      example: "Sự phân biệt giảng dạy là cần thiết trong các lớp học có khả năng hỗn hợp."
    },
    "stigmatization": {
      definition: "Gắn nhãn tiêu cực cho một nhóm người.",
      example: "Phân nhóm có thể dẫn đến sự kỳ thị đối với học sinh có thành tích thấp."
    },
    "scaffold": {
      definition: "Cung cấp hỗ trợ tạm thời để giúp học tập.",
      example: "Giáo viên cần hỗ trợ học sinh đấu tranh với các khái niệm khó."
    },
    "benchmark": {
      definition: "Tiêu chuẩn để đánh giá hiệu suất.",
      example: "Các tiêu chuẩn học tập giúp theo dõi tiến độ học sinh theo thời gian."
    }
  },
  topicVocabulary: {
    "ability grouping": {
      definition: "Tổ chức học sinh theo trình độ học tập.",
      example: "Phân nhóm theo năng lực vẫn còn gây tranh cãi trong giáo dục."
    },
    "mixed-ability classroom": {
      definition: "Lớp học với học sinh ở các trình độ khác nhau.",
      example: "Lớp học đa trình độ yêu cầu kỹ năng giảng dạy đa dạng."
    },
    "streaming": {
      definition: "Chia học sinh thành các nhóm cố định theo khả năng.",
      example: "Phân luồng có thể hạn chế cơ hội cho người học chậm."
    },
    "tracking system": {
      definition: "Hệ thống phân loại học sinh vào các lộ trình học tập khác nhau.",
      example: "Hệ thống phân luồng có thể củng cố bất bình đẳng giáo dục."
    },
    "instructional pace": {
      definition: "Tốc độ giảng dạy và học tập.",
      example: "Nhịp độ giảng dạy nên phù hợp với nhu cầu của học sinh."
    },
    "achievement gap": {
      definition: "Chênh lệch kết quả học tập giữa các nhóm học sinh.",
      example: "Khoảng cách thành tích thường phản ánh bất bình đẳng xã hội."
    }
  }
};

const vocabStep = data.steps.find(s => s.type === 'vocabulary');
vocabStep.content.academicVocabulary.forEach(vocab => {
  if (vietnameseTranslations.academicVocabulary[vocab.word]) {
    vocab.vietnameseDefinition = vietnameseTranslations.academicVocabulary[vocab.word].definition;
    vocab.vietnameseExample = vietnameseTranslations.academicVocabulary[vocab.word].example;
  }
});

vocabStep.content.topicVocabulary.forEach(vocab => {
  if (vietnameseTranslations.topicVocabulary[vocab.phrase]) {
    vocab.vietnameseDefinition = vietnameseTranslations.topicVocabulary[vocab.phrase].definition;
    vocab.vietnameseExample = vietnameseTranslations.topicVocabulary[vocab.phrase].example;
  }
});

const additionalPhrases = [
  {
    phrase: "gifted program",
    definition: "Special education for high-achieving students.",
    vietnameseDefinition: "Chương trình giáo dục đặc biệt cho học sinh xuất sắc.",
    example: "Gifted programs can nurture exceptional talent when implemented inclusively.",
    vietnameseExample: "Các chương trình dành cho học sinh năng khiếu có thể nuôi dưỡng tài năng đặc biệt khi được thực hiện một cách toàn diện."
  },
  {
    phrase: "remedial instruction",
    definition: "Additional teaching for students who need extra help.",
    vietnameseDefinition: "Giảng dạy bổ sung cho học sinh cần hỗ trợ thêm.",
    example: "Remedial instruction helps struggling students catch up with peers.",
    vietnameseExample: "Giảng dạy bổ trợ giúp học sinh gặp khó khăn theo kịp bạn bè."
  },
  {
    phrase: "inclusive education",
    definition: "Teaching approach that accommodates all learning levels together.",
    vietnameseDefinition: "Phương pháp giảng dạy chấp nhận tất cả các trình độ học tập cùng nhau.",
    example: "Inclusive education promotes social equity and mutual learning.",
    vietnameseExample: "Giáo dục hòa nhập thúc đẩy công bằng xã hội và học tập lẫn nhau."
  },
  {
    phrase: "self-fulfilling prophecy",
    definition: "Expectation that causes itself to become true.",
    vietnameseDefinition: "Kỳ vọng khiến chính nó trở thành sự thật.",
    example: "Low expectations in bottom groups can create a self-fulfilling prophecy of underachievement.",
    vietnameseExample: "Kỳ vọng thấp ở các nhóm yếu có thể tạo ra tiên đoán tự thực hiện về thành tích kém."
  },
  {
    phrase: "growth mindset",
    definition: "Belief that abilities can be developed through effort.",
    vietnameseDefinition: "Niềm tin rằng khả năng có thể phát triển qua nỗ lực.",
    example: "Teachers should foster a growth mindset rather than fixed ability labels.",
    vietnameseExample: "Giáo viên nên nuôi dưỡng tư duy phát triển thay vì dán nhãn khả năng cố định."
  }
];

vocabStep.content.topicVocabulary.push(...additionalPhrases);

fs.writeFileSync('/home/user/vocab-learner/data/writing-v2-academic-grouping.json', JSON.stringify(data, null, 2));

console.log('✓ Topic 1/61: academic-grouping');
