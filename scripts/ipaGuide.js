// IPA Pronunciation Guide - explains phonetic symbols with examples and Vietnamese comparisons

const IPA_GUIDE = {
    // Vowels
    'iː': {
        sound: 'i as in see',
        example: 'see, tea, need',
        vn: 'Giống "i" trong tiếng Việt nhưng kéo dài hơn'
    },
    'ɪ': {
        sound: 'i as in sit',
        example: 'sit, bit, ship',
        vn: 'Ngắn hơn "i" tiếng Việt, gần như "y" trong "my"'
    },
    'e': {
        sound: 'e as in bed',
        example: 'bed, red, ten',
        vn: 'Giống "e" trong tiếng Việt'
    },
    'æ': {
        sound: 'a as in cat',
        example: 'cat, hat, bad',
        vn: 'Mở miệng rộng, giữa "a" và "e", không có trong tiếng Việt'
    },
    'ɑː': {
        sound: 'a as in father',
        example: 'car, far, start',
        vn: 'Giống "a" tiếng Việt nhưng kéo dài, phát âm từ sâu trong họng'
    },
    'ɒ': {
        sound: 'o as in hot',
        example: 'hot, not, dog',
        vn: 'Giống "o" trong tiếng Việt nhưng ngắn hơn'
    },
    'ɔː': {
        sound: 'or as in door',
        example: 'door, more, saw',
        vn: 'Giống "ô" trong tiếng Việt nhưng kéo dài'
    },
    'ʊ': {
        sound: 'u as in put',
        example: 'put, book, good',
        vn: 'Giống "u" nhưng ngắn, môi không tròn nhiều'
    },
    'uː': {
        sound: 'oo as in food',
        example: 'food, moon, blue',
        vn: 'Giống "u" tiếng Việt nhưng kéo dài, môi tròn'
    },
    'ʌ': {
        sound: 'u as in cup',
        example: 'cup, but, love',
        vn: 'Giống "ơ" trong tiếng Việt, ngắn và nhấn mạnh'
    },
    'ɜː': {
        sound: 'er as in bird',
        example: 'bird, her, word',
        vn: 'Không có trong tiếng Việt, giữa "ơ" và "ê", kéo dài'
    },
    'ə': {
        sound: 'a as in about',
        example: 'about, sofa, problem',
        vn: 'Âm yếu, giống "ơ" ngắn, không nhấn'
    },

    // Diphthongs (nguyên âm đôi)
    'eɪ': {
        sound: 'ay as in day',
        example: 'day, face, late',
        vn: 'Bắt đầu từ "e" trượt sang "i"'
    },
    'aɪ': {
        sound: 'i as in time',
        example: 'time, fly, night',
        vn: 'Bắt đầu từ "a" trượt sang "i", giống "ai" tiếng Việt'
    },
    'ɔɪ': {
        sound: 'oy as in boy',
        example: 'boy, toy, coin',
        vn: 'Bắt đầu từ "ô" trượt sang "i", giống "ôi" tiếng Việt'
    },
    'aʊ': {
        sound: 'ow as in now',
        example: 'now, out, house',
        vn: 'Bắt đầu từ "a" trượt sang "u", giống "ao" tiếng Việt'
    },
    'əʊ': {
        sound: 'o as in go',
        example: 'go, show, home',
        vn: 'Bắt đầu từ "ơ" trượt sang "u"'
    },
    'ɪə': {
        sound: 'ear as in here',
        example: 'here, beer, idea',
        vn: 'Bắt đầu từ "i" trượt sang "ơ"'
    },
    'eə': {
        sound: 'air as in hair',
        example: 'hair, care, where',
        vn: 'Bắt đầu từ "e" trượt sang "ơ"'
    },
    'ʊə': {
        sound: 'oor as in poor',
        example: 'poor, tour, sure',
        vn: 'Bắt đầu từ "u" trượt sang "ơ"'
    },

    // Consonants - đặc biệt chú ý những âm khác tiếng Việt
    'θ': {
        sound: 'th as in thin',
        example: 'thin, math, think',
        vn: 'Đặt lưỡi giữa răng, thổi nhẹ - KHÁC "t" hoàn toàn!'
    },
    'ð': {
        sound: 'th as in this',
        example: 'this, that, mother',
        vn: 'Giống θ nhưng rung thanh quản - KHÁC "d" hoàn toàn!'
    },
    'ʃ': {
        sound: 'sh as in ship',
        example: 'ship, wash, she',
        vn: 'Giống "s" nhưng môi tròn hơn, không có trong tiếng Việt'
    },
    'ʒ': {
        sound: 's as in vision',
        example: 'vision, measure, garage',
        vn: 'Giống "gi" trong tiếng Việt nhưng có rung thanh quản'
    },
    'tʃ': {
        sound: 'ch as in chip',
        example: 'chip, catch, church',
        vn: 'Giống "ch" trong tiếng Việt'
    },
    'dʒ': {
        sound: 'j as in jump',
        example: 'jump, bridge, age',
        vn: 'Giống "gi" trong tiếng Việt nhưng mạnh hơn'
    },
    'ŋ': {
        sound: 'ng as in sing',
        example: 'sing, thing, long',
        vn: 'Giống "ng" trong tiếng Việt, KHÔNG phát âm "g" ở cuối'
    },
    'r': {
        sound: 'r as in red',
        example: 'red, car, run',
        vn: 'Cuộn lưỡi về phía sau, KHÁC "r" tiếng Việt (không rung lưỡi)'
    },
    'l': {
        sound: 'l as in leg',
        example: 'leg, ball, light',
        vn: 'Chạm lưỡi vào lợi trên - người Việt hay phát âm thành "n"!'
    },
    'v': {
        sound: 'v as in van',
        example: 'van, love, very',
        vn: 'Cắn môi dưới bằng răng trên - KHÁC "v" tiếng Việt!'
    },
    'w': {
        sound: 'w as in we',
        example: 'we, swim, want',
        vn: 'Môi tròn như "u", KHÔNG phải "v" hoặc "oa"'
    },
    'j': {
        sound: 'y as in yes',
        example: 'yes, you, year',
        vn: 'Giống "i" phụ âm, giống "d" nhẹ trong tiếng Việt'
    },

    // Âm kết thúc - người Việt hay bỏ!
    'p': {
        sound: 'p as in stop',
        example: 'stop, cup, map',
        vn: 'Môi khép lại, giữ hơi - KHÔNG thở ra! (người Việt hay bỏ âm cuối)'
    },
    'b': {
        sound: 'b as in cab',
        example: 'cab, job, web',
        vn: 'Giống "p" nhưng có rung thanh quản'
    },
    't': {
        sound: 't as in cat',
        example: 'cat, sit, bit',
        vn: 'Lưỡi chạm lợi trên, giữ hơi - KHÔNG thở ra!'
    },
    'd': {
        sound: 'd as in bad',
        example: 'bad, sad, bed',
        vn: 'Giống "t" nhưng có rung thanh quản'
    },
    'k': {
        sound: 'k as in back',
        example: 'back, look, book',
        vn: 'Giữ hơi ở họng - KHÔNG thở ra! (người Việt hay bỏ)'
    },
    'g': {
        sound: 'g as in big',
        example: 'big, dog, bag',
        vn: 'Giống "k" nhưng có rung thanh quản'
    },
    'f': {
        sound: 'f as in off',
        example: 'off, laugh, safe',
        vn: 'Cắn môi dưới, thổi hơi - KHÁC "ph" tiếng Việt!'
    },
    's': {
        sound: 's as in pass',
        example: 'pass, yes, bus',
        vn: 'Giống "x" trong tiếng Việt'
    },
    'z': {
        sound: 'z as in buzz',
        example: 'buzz, his, dogs',
        vn: 'Giống "s" nhưng có rung thanh quản, giống "d" nhẹ'
    },
    'h': {
        sound: 'h as in hat',
        example: 'hat, who, behind',
        vn: 'Giống "h" tiếng Việt'
    },
    'm': {
        sound: 'm as in swim',
        example: 'swim, him, am',
        vn: 'Giống "m" tiếng Việt'
    },
    'n': {
        sound: 'n as in sun',
        example: 'sun, pen, can',
        vn: 'Giống "n" tiếng Việt'
    },

    // Dấu trọng âm
    'ˈ': {
        sound: 'primary stress',
        example: 'ˈæp.əl (apple)',
        vn: 'Âm tiết sau dấu này được nhấn mạnh'
    },
    'ˌ': {
        sound: 'secondary stress',
        example: 'ˌɪn.təˈneɪ.ʃən',
        vn: 'Nhấn nhẹ hơn (trọng âm phụ)'
    }
};

class IPAGuideHelper {
    static parseIPA(ipaString) {
        let ipa = ipaString.replace(/^\/|\/$/g, '').trim();
        if (!ipa) return [];

        const symbols = [];
        let i = 0;

        while (i < ipa.length) {
            let matched = false;

            // Try multi-character symbols first (longest match)
            for (let len = 3; len >= 1; len--) {
                const substr = ipa.substr(i, len);
                if (IPA_GUIDE[substr]) {
                    symbols.push({
                        symbol: substr,
                        info: IPA_GUIDE[substr]
                    });
                    i += len;
                    matched = true;
                    break;
                }
            }

            if (!matched) {
                // Skip unknown symbols (spaces, dots, etc.)
                i++;
            }
        }

        return symbols;
    }

    static generateGuideHTML(ipaString) {
        if (!ipaString) return '';

        const symbols = this.parseIPA(ipaString);
        if (symbols.length === 0) return '';

        let html = '<div class="ipa-guide">';
        html += '<div class="ipa-guide-title">📖 Hướng dẫn phát âm:</div>';
        html += '<div class="ipa-symbols">';

        symbols.forEach(({ symbol, info }) => {
            html += `
                <div class="ipa-symbol-card">
                    <div class="ipa-symbol-main">${symbol}</div>
                    <div class="ipa-symbol-sound">${info.sound}</div>
                    <div class="ipa-symbol-example">VD: ${info.example}</div>
                    <div class="ipa-symbol-vn">${info.vn}</div>
                </div>
            `;
        });

        html += '</div></div>';
        return html;
    }

    static generateSimpleGuide(ipaString) {
        if (!ipaString) return '';

        const symbols = this.parseIPA(ipaString);
        if (symbols.length === 0) return '';

        return symbols.map(s => s.info.sound).join(' → ');
    }
}

// Add CSS for IPA guide
const style = document.createElement('style');
style.textContent = `
    .ipa-guide {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        padding: 20px;
        border-radius: 15px;
        margin: 20px 0;
        color: white;
    }

    .ipa-guide-title {
        font-weight: 700;
        font-size: 1.3rem;
        margin-bottom: 15px;
        text-shadow: 1px 1px 2px rgba(0,0,0,0.3);
    }

    .ipa-symbols {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        gap: 15px;
    }

    .ipa-symbol-card {
        background: rgba(255, 255, 255, 0.95);
        padding: 15px;
        border-radius: 10px;
        color: #2c3e50;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    }

    .ipa-symbol-main {
        font-size: 2.5rem;
        font-weight: 700;
        font-family: 'Courier New', monospace;
        color: #3498db;
        margin-bottom: 8px;
        text-align: center;
    }

    .ipa-symbol-sound {
        font-size: 1.1rem;
        font-weight: 600;
        color: #e74c3c;
        margin-bottom: 8px;
        text-align: center;
    }

    .ipa-symbol-example {
        font-size: 0.95rem;
        color: #7f8c8d;
        font-style: italic;
        margin-bottom: 8px;
        text-align: center;
    }

    .ipa-symbol-vn {
        font-size: 0.9rem;
        color: #27ae60;
        font-weight: 500;
        padding: 8px;
        background: #e8f8f5;
        border-radius: 5px;
        border-left: 3px solid #27ae60;
    }

    @media (max-width: 768px) {
        .ipa-symbols {
            grid-template-columns: 1fr;
        }
    }
`;
document.head.appendChild(style);

window.IPAGuideHelper = IPAGuideHelper;