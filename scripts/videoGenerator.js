class VocabVideoGenerator {
    constructor() {
        this.canvas = document.getElementById('videoCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = 800;
        this.canvas.height = 600;
        this.mediaRecorder = null;
        this.recordedChunks = [];
        this.isRecording = false;
        this.isPreviewing = false;
        this.currentWordIndex = 0;
        this.startTime = null;
        this.animationFrame = null;

        this.setupButtons();
    }

    setupButtons() {
        document.getElementById('previewBtn').onclick = () => this.togglePreview();
        document.getElementById('recordBtn').onclick = () => this.toggleRecording();
        document.getElementById('downloadBtn').onclick = () => this.downloadVideo();
    }

    getVocabList() {
        const items = document.querySelectorAll('.vocab-item');
        return Array.from(items).map(item => ({
            english: item.querySelector('.english').textContent,
            type: item.querySelector('.type').textContent,
            vietnamese: item.querySelector('.vietnamese').textContent,
            pronunciation: item.querySelector('.pronunciation').textContent
        }));
    }

    drawFrame(word, progress) {
        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Background
        this.ctx.fillStyle = '#f5f5f5';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Fade effect
        const opacity = progress < 0.1 ? progress * 10 :
            progress > 0.9 ? (1 - progress) * 10 :
                1;
        this.ctx.globalAlpha = opacity;

        // Card background with shadow
        this.ctx.fillStyle = '#ffffff';
        this.ctx.shadowColor = 'rgba(0, 0, 0, 0.1)';
        this.ctx.shadowBlur = 10;
        this.ctx.fillRect(50, 50, this.canvas.width - 100, this.canvas.height - 100);
        this.ctx.shadowBlur = 0;

        // Text settings
        this.ctx.textAlign = 'center';

        // English word with animation
        this.ctx.font = 'bold 48px Arial';
        this.ctx.fillStyle = '#2c3e50';
        const yOffset = Math.sin(progress * Math.PI * 2) * 5;
        this.ctx.fillText(word.english, this.canvas.width / 2, this.canvas.height / 3 + yOffset);

        // Word type
        this.ctx.font = '24px Arial';
        this.ctx.fillStyle = '#27ae60';
        this.ctx.fillText(word.type, this.canvas.width / 2, this.canvas.height / 3 + 40);

        // Vietnamese translation with fade in
        this.ctx.font = '36px Arial';
        this.ctx.fillStyle = '#e74c3c';
        this.ctx.globalAlpha = progress < 0.3 ? progress / 0.3 : opacity;
        this.ctx.fillText(word.vietnamese, this.canvas.width / 2, this.canvas.height / 2 + 30);

        // Pronunciation with slide in
        this.ctx.font = 'italic 28px Arial';
        this.ctx.fillStyle = '#3498db';
        const slideOffset = progress < 0.5 ? (0.5 - progress) * 100 : 0;
        this.ctx.fillText(word.pronunciation, this.canvas.width / 2 + slideOffset, this.canvas.height / 2 + 80);

        this.ctx.globalAlpha = 1;

        // Progress bar
        this.ctx.fillStyle = '#3498db';
        this.ctx.fillRect(50, this.canvas.height - 30, (this.canvas.width - 100) * progress, 5);
    }

    animate(timestamp) {
        if (!this.startTime) this.startTime = timestamp;
        const progress = (timestamp - this.startTime) / 3000; // 3 seconds per word
        const vocabList = this.getVocabList();

        if (progress >= 1) {
            if (this.currentWordIndex < vocabList.length - 1) {
                this.currentWordIndex++;
                this.startTime = timestamp;
            } else {
                if (this.isRecording) {
                    this.stopRecording();
                }
                if (this.isPreviewing) {
                    this.stopPreview();
                }
                return;
            }
        }

        this.drawFrame(vocabList[this.currentWordIndex], progress % 1);

        if (this.isRecording || this.isPreviewing) {
            this.animationFrame = requestAnimationFrame(this.animate.bind(this));
        }
    }

    togglePreview() {
        if (this.isPreviewing) {
            this.stopPreview();
        } else {
            this.startPreview();
        }
    }

    startPreview() {
        this.isPreviewing = true;
        this.currentWordIndex = 0;
        this.startTime = null;
        document.getElementById('previewBtn').textContent = '⏹ Stop Preview';
        this.animationFrame = requestAnimationFrame(this.animate.bind(this));
    }

    stopPreview() {
        this.isPreviewing = false;
        this.currentWordIndex = 0;
        cancelAnimationFrame(this.animationFrame);
        document.getElementById('previewBtn').textContent = '▶️ Preview';
        // Draw first frame
        const vocabList = this.getVocabList();
        if (vocabList.length > 0) {
            this.drawFrame(vocabList[0], 1);
        }
    }

    toggleRecording() {
        if (this.isRecording) {
            this.stopRecording();
        } else {
            this.startRecording();
        }
    }

    startRecording() {
        const stream = this.canvas.captureStream(30);
        this.mediaRecorder = new MediaRecorder(stream, {
            mimeType: 'video/webm;codecs=vp9'
        });

        this.mediaRecorder.ondataavailable = (event) => {
            if (event.data.size > 0) {
                this.recordedChunks.push(event.data);
            }
        };

        this.mediaRecorder.onstop = () => {
            document.getElementById('downloadBtn').disabled = false;
        };

        this.recordedChunks = [];
        this.currentWordIndex = 0;
        this.startTime = null;
        this.isRecording = true;
        document.getElementById('recordBtn').textContent = '⏹ Stop Recording';
        document.getElementById('recordBtn').style.backgroundColor = '#c0392b';

        this.mediaRecorder.start();
        this.animationFrame = requestAnimationFrame(this.animate.bind(this));
    }

    stopRecording() {
        if (this.mediaRecorder && this.mediaRecorder.state !== 'inactive') {
            this.mediaRecorder.stop();
            cancelAnimationFrame(this.animationFrame);
            this.isRecording = false;
            document.getElementById('recordBtn').textContent = '🔴 Start Recording';
            document.getElementById('recordBtn').style.backgroundColor = '#e74c3c';
        }
    }

    downloadVideo() {
        const blob = new Blob(this.recordedChunks, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'vocabulary.webm';
        a.click();
        URL.revokeObjectURL(url);
    }
}

// Initialize after DOM loads
document.addEventListener('DOMContentLoaded', () => {
    window.vocabVideoGenerator = new VocabVideoGenerator();
});