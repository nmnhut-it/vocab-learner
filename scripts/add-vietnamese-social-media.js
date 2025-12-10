import fs from 'fs';

const socialMediaData = JSON.parse(fs.readFileSync('/home/user/vocab-learner/data/writing-v2-social-media.json', 'utf8'));

// Vietnamese translations for social-media topic
const vietnameseTranslations = {
  academicVocabulary: {
    "connectivity": {
      definition: "Khả năng kết nối và giao tiếp với người khác.",
      example: "Mạng xã hội đã cải thiện khả năng kết nối toàn cầu một cách đáng kể."
    },
    "dissemination": {
      definition: "Sự phân phối hoặc lan truyền thông tin rộng rãi.",
      example: "Mạng xã hội cho phép lan truyền tin tức nhanh chóng đến hàng triệu người."
    },
    "polarization": {
      definition: "Sự chia rẽ thành các nhóm đối lập cực đoan.",
      example: "Mạng xã hội có thể góp phần vào sự phân cực chính trị trong xã hội."
    },
    "misinformation": {
      definition: "Thông tin sai lệch hoặc không chính xác.",
      example: "Sự lan truyền thông tin sai lệch trên mạng xã hội có thể gây hậu quả nghiêm trọng."
    },
    "amplify": {
      definition: "Làm tăng cường hoặc khuếch đại tác động của điều gì đó.",
      example: "Mạng xã hội khuếch đại tiếng nói của những người bị gạt ra ngoài lề."
    },
    "marginalized": {
      definition: "Bị đẩy ra ngoài lề hoặc bị xã hội loại trừ.",
      example: "Mạng xã hội trao quyền cho các nhóm bị thiệt thòi để chia sẻ câu chuyện của họ."
    },
    "echo chamber": {
      definition: "Môi trường nơi người dùng chỉ tiếp xúc với quan điểm tương tự.",
      example: "Thuật toán mạng xã hội có thể tạo ra các buồng vang dội hạn chế sự đa dạng quan điểm."
    },
    "democratize": {
      definition: "Làm cho điều gì đó có thể tiếp cận được với tất cả mọi người.",
      example: "Mạng xã hội dân chủ hóa thông tin và cho phép bất kỳ ai cũng có thể chia sẻ ý kiến."
    }
  },
  topicVocabulary: {
    "viral content": {
      definition: "Nội dung lan truyền nhanh chóng và rộng rãi trực tuyến.",
      example: "Nội dung lan truyền có thể tiếp cận hàng triệu người chỉ trong vài giờ."
    },
    "social media influencer": {
      definition: "Người có ảnh hưởng lớn đến người theo dõi trên mạng xã hội.",
      example: "Những người có ảnh hưởng trên mạng xã hội thường hợp tác với các thương hiệu để quảng cáo sản phẩm."
    },
    "digital activism": {
      definition: "Sử dụng nền tảng trực tuyến để vận động thay đổi xã hội.",
      example: "Hoạt động xã hội kỹ thuật số đã đóng vai trò quan trọng trong các phong trào công bằng xã hội gần đây."
    },
    "online harassment": {
      definition: "Hành vi quấy rối hoặc bắt nạt người khác trên internet.",
      example: "Quấy rối trực tuyến là một vấn đề nghiêm trọng ảnh hưởng đến nhiều người dùng mạng xã hội."
    },
    "filter bubble": {
      definition: "Tình trạng chỉ thấy thông tin phù hợp với quan điểm của mình.",
      example: "Bong bóng lọc trên mạng xã hội hạn chế khả năng tiếp xúc với quan điểm đa dạng."
    },
    "user engagement": {
      definition: "Mức độ tương tác của người dùng với nội dung.",
      example: "Các nền tảng mạng xã hội được thiết kế để tối đa hóa sự tương tác của người dùng."
    }
  }
};

// Apply translations to academic vocabulary
const vocabStep = socialMediaData.steps.find(s => s.type === 'vocabulary');
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

// Add more academic phrases for social-media topic
const additionalPhrases = [
  {
    "phrase": "attention economy",
    "definition": "Economic model where human attention is treated as a scarce commodity.",
    "vietnameseDefinition": "Mô hình kinh tế xem sự chú ý của con người như một hàng hóa khan hiếm.",
    "example": "Social media platforms operate in the attention economy, competing for user time.",
    "vietnameseExample": "Các nền tảng mạng xã hội hoạt động trong nền kinh tế chú ý, cạnh tranh để có thời gian của người dùng."
  },
  {
    "phrase": "algorithm-driven content",
    "definition": "Content selected and displayed by automated computer systems.",
    "vietnameseDefinition": "Nội dung được chọn và hiển thị bởi hệ thống máy tính tự động.",
    "example": "Algorithm-driven content can create personalized but limited information environments.",
    "vietnameseExample": "Nội dung được điều khiển bởi thuật toán có thể tạo ra môi trường thông tin được cá nhân hóa nhưng hạn chế."
  },
  {
    "phrase": "digital footprint",
    "definition": "The trail of data left by online activities.",
    "vietnameseDefinition": "Dấu vết dữ liệu để lại bởi các hoạt động trực tuyến.",
    "example": "Users should be aware of their digital footprint and privacy implications.",
    "vietnameseExample": "Người dùng nên nhận thức về dấu chân kỹ thuật số và ý nghĩa riêng tư của họ."
  },
  {
    "phrase": "content moderation",
    "definition": "Process of monitoring and filtering user-generated content.",
    "vietnameseDefinition": "Quá trình giám sát và lọc nội dung do người dùng tạo ra.",
    "example": "Effective content moderation is essential for maintaining safe online spaces.",
    "vietnameseExample": "Kiểm duyệt nội dung hiệu quả là cần thiết để duy trì không gian trực tuyến an toàn."
  },
  {
    "phrase": "social comparison",
    "definition": "Tendency to evaluate oneself by comparing with others.",
    "vietnameseDefinition": "Xu hướng đánh giá bản thân bằng cách so sánh với người khác.",
    "example": "Social media intensifies social comparison, often leading to decreased well-being.",
    "vietnameseExample": "Mạng xã hội làm tăng sự so sánh xã hội, thường dẫn đến giảm hạnh phúc."
  }
];

vocabStep.content.topicVocabulary.push(...additionalPhrases);

fs.writeFileSync('/home/user/vocab-learner/data/writing-v2-social-media.json', JSON.stringify(socialMediaData, null, 2));

console.log('✓ Added Vietnamese translations and 5 new academic phrases to social-media topic');
console.log('  - Academic vocabulary: 8 items with Vietnamese');
console.log('  - Topic vocabulary: 11 items with Vietnamese (6 original + 5 new)');
