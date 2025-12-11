import fs from 'fs';

const environmentData = JSON.parse(fs.readFileSync('/home/user/vocab-learner/data/writing-v2-environment.json', 'utf8'));

// Vietnamese translations for environment topic vocabulary
const vietnameseTranslations = {
  academicVocabulary: {
    "implement": {
      definition: "Thực hiện, đưa một kế hoạch hoặc hệ thống vào hành động.",
      example: "Chính phủ có thể thực hiện các quy định để giảm ô nhiễm công nghiệp."
    },
    "collective": {
      definition: "Được thực hiện hoặc liên quan đến tất cả thành viên của một nhóm.",
      example: "Bảo vệ môi trường đòi hỏi hành động tập thể từ tất cả các khu vực của xã hội."
    },
    "infrastructure": {
      definition: "Các hệ thống và cơ sở vật chất cơ bản.",
      example: "Chính phủ phải đầu tư vào cơ sở hạ tầng xanh như hệ thống năng lượng tái tạo."
    },
    "accountability": {
      definition: "Chịu trách nhiệm và có thể giải trình cho hành động của mình.",
      example: "Trách nhiệm cá nhân đối với thói quen tiêu dùng là điều cần thiết để bảo vệ môi trường."
    },
    "legislation": {
      definition: "Luật pháp được ban hành bởi cơ quan quản lý.",
      example: "Pháp luật môi trường có thể yêu cầu các tiêu chuẩn phát thải cho các ngành công nghiệp."
    },
    "incentivize": {
      definition: "Cung cấp động lực hoặc khuyến khích.",
      example: "Chính phủ có thể khuyến khích hành vi xanh thông qua ưu đãi thuế và trợ cấp."
    },
    "emissions": {
      definition: "Khí hoặc chất thải được thải vào khí quyển.",
      example: "Giảm lượng khí thải carbon đòi hỏi nỗ lực của cả cá nhân và chính phủ."
    }
  },
  topicVocabulary: {
    "carbon footprint": {
      definition: "Tổng lượng khí nhà kính được tạo ra bởi các hành động.",
      example: "Cá nhân có thể giảm lượng khí thải carbon của mình bằng cách sử dụng phương tiện công cộng."
    },
    "renewable energy": {
      definition: "Năng lượng từ các nguồn tự nhiên tái tạo.",
      example: "Chính phủ nên đầu tư mạnh vào cơ sở hạ tầng năng lượng tái tạo."
    },
    "sustainable practices": {
      definition: "Các phương pháp không làm cạn kiệt tài nguyên thiên nhiên.",
      example: "Áp dụng các thực hành bền vững như tái chế là trách nhiệm cá nhân."
    },
    "environmental regulations": {
      definition: "Các quy định điều chỉnh việc bảo vệ môi trường.",
      example: "Các quy định môi trường nghiêm ngặt có thể buộc các công ty giảm ô nhiễm."
    },
    "grassroots movements": {
      definition: "Các sáng kiến cấp cộng đồng để thay đổi.",
      example: "Phong trào cơ sở cho thấy sức mạnh của hành động tập thể cá nhân."
    },
    "large-scale initiatives": {
      definition: "Các dự án lớn đòi hỏi nguồn lực đáng kể.",
      example: "Chỉ có chính phủ mới có thể khởi động các sáng kiến quy mô lớn như chương trình tái trồng rừng quốc gia."
    }
  }
};

// Apply translations to academic vocabulary
const vocabStep = environmentData.steps.find(s => s.type === 'vocabulary');
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

// Add more academic phrases for environment topic
const additionalPhrases = [
  {
    "phrase": "climate change mitigation",
    "definition": "Actions taken to reduce or prevent greenhouse gas emissions.",
    "vietnameseDefinition": "Các hành động được thực hiện để giảm hoặc ngăn chặn phát thải khí nhà kính.",
    "example": "Climate change mitigation requires both government policy and individual action.",
    "vietnameseExample": "Giảm thiểu biến đổi khí hậu đòi hỏi cả chính sách của chính phủ và hành động cá nhân."
  },
  {
    "phrase": "ecological footprint",
    "definition": "The impact of human activities on Earth's ecosystems.",
    "vietnameseDefinition": "Tác động của hoạt động con người lên hệ sinh thái Trái Đất.",
    "example": "Reducing our ecological footprint is essential for planetary health.",
    "vietnameseExample": "Giảm dấu chân sinh thái của chúng ta là điều cần thiết cho sức khỏe hành tinh."
  },
  {
    "phrase": "circular economy",
    "definition": "An economic system aimed at eliminating waste through reuse and recycling.",
    "vietnameseDefinition": "Một hệ thống kinh tế nhằm loại bỏ rác thải thông qua tái sử dụng và tái chế.",
    "example": "The circular economy model promotes resource efficiency and waste reduction.",
    "vietnameseExample": "Mô hình kinh tế tuần hoàn thúc đẩy hiệu quả sử dụng tài nguyên và giảm thiểu rác thải."
  },
  {
    "phrase": "biodiversity conservation",
    "definition": "Protecting the variety of life forms on Earth.",
    "vietnameseDefinition": "Bảo vệ sự đa dạng của các dạng sống trên Trái Đất.",
    "example": "Biodiversity conservation is crucial for ecosystem stability.",
    "vietnameseExample": "Bảo tồn đa dạng sinh học rất quan trọng để duy trì sự ổn định của hệ sinh thái."
  },
  {
    "phrase": "green transition",
    "definition": "The shift towards environmentally sustainable practices and technologies.",
    "vietnameseDefinition": "Sự chuyển đổi sang các thực hành và công nghệ bền vững với môi trường.",
    "example": "The green transition requires significant investment in clean energy.",
    "vietnameseExample": "Chuyển đổi xanh đòi hỏi đầu tư đáng kể vào năng lượng sạch."
  }
];

vocabStep.content.topicVocabulary.push(...additionalPhrases);

fs.writeFileSync('/home/user/vocab-learner/data/writing-v2-environment.json', JSON.stringify(environmentData, null, 2));

console.log('✓ Added Vietnamese translations and 5 new academic phrases to environment topic');
console.log('  - Academic vocabulary: 8 items with Vietnamese');
console.log('  - Topic vocabulary: 11 items with Vietnamese (6 original + 5 new)');
