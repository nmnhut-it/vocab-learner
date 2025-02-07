let synth = window.speechSynthesis;
let voices = [];
let currentUtterance = null;
let isReading = false;

function loadVoices() {
    voices = synth.getVoices();
    const voiceSelect = document.getElementById('voiceSelect');
    voiceSelect.innerHTML = '<option value="">Select Voice</option>';

    voices.forEach((voice, index) => {
        if (voice.lang.toLowerCase().includes('en')) {
            const option = document.createElement('option');
            option.value = index;
            option.textContent = `${voice.name} (${voice.lang})`;
            voiceSelect.appendChild(option);
        }
    });
}

if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = loadVoices;
}

function parseAndDisplay() {
    const input = document.getElementById('vocabInput').value;
    const lines = input.trim().split('\n');
    const vocabularyList = document.getElementById('vocabularyList');
    vocabularyList.innerHTML = '';

    lines.forEach(line => {
        const content = line.replace(/^\d+\.\s*/, '');
        const parts = content.split(':');
        if (parts.length < 2) return;

        const english = parts[0].trim();
        const rest = parts[1].trim();

        let type = '';
        let vietnamese = '';
        let pronunciation = '';

        const typeMatch = rest.match(/\([a-z]+\)/);
        if (typeMatch) {
            type = typeMatch[0];
        }

        const pronunciationMatch = rest.match(/\/[^/]+\//);
        if (pronunciationMatch) {
            pronunciation = pronunciationMatch[0];
        }

        vietnamese = rest
            .replace(type, '')
            .replace(pronunciation, '')
            .trim();

        const vocabItem = document.createElement('div');
        vocabItem.className = 'vocab-item';
        vocabItem.dataset.text = english;
        vocabItem.innerHTML = `
            <span class="english">${english}</span>
            <span class="type">${type}</span>
            <span class="vietnamese">${vietnamese}</span>
            <span class="pronunciation">${pronunciation}</span>
        `;

        vocabItem.addEventListener('click', () => {
            readText(english);
        });

        vocabularyList.appendChild(vocabItem);
    });

    // Update video generator if available
    if (window.vocabVideoGenerator) {
        const vocabList = window.vocabVideoGenerator.getVocabList();
        if (vocabList.length > 0) {
            window.vocabVideoGenerator.drawFrame(vocabList[0], 1);
        }
    }
}

function readText(text) {
    if (isReading) {
        synth.cancel();
    }

    currentUtterance = new SpeechSynthesisUtterance(text);

    const voiceIndex = document.getElementById('voiceSelect').value;
    if (voiceIndex) {
        currentUtterance.voice = voices[voiceIndex];
    }

    currentUtterance.rate = parseFloat(document.getElementById('speedRange').value);
    synth.speak(currentUtterance);
}

document.getElementById('readAll').addEventListener('click', async () => {
    isReading = true;
    const items = document.querySelectorAll('.vocab-item');

    for (let item of items) {
        if (!isReading) break;
        readText(item.dataset.text);
        await new Promise(resolve => {
            currentUtterance.onend = resolve;
        });
        await new Promise(resolve => setTimeout(resolve, 1000));
    }

    isReading = false;
});

document.getElementById('stopReading').addEventListener('click', () => {
    isReading = false;
    synth.cancel();
});

document.getElementById('speedRange').addEventListener('input', (e) => {
    document.getElementById('speedValue').textContent = e.target.value;
});

// Initial parse of the default text
parseAndDisplay();