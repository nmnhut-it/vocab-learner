# IELTS Lessons - Setup & Usage Guide

## ✅ What's Complete

The entire IELTS Speaking Lessons system is **100% complete and functional**:

### Core System
- ✅ 5 learning modules (110 minutes of content)
- ✅ 25 lesson sections with audio scripts
- ✅ AI-powered practice with Gemini integration
- ✅ Audio playback and caching system
- ✅ Progress tracking
- ✅ All files created and integrated

### Files Created
1. **`scripts/ieltsLessons.js`** - Complete lesson content
2. **`scripts/audioManager.js`** - Audio caching system
3. **`scripts/ieltsCoachAI.js`** - Gemini AI integration
4. **`ielts-speaking-lessons.html`** - Main interface
5. **`styles/ielts-lessons.css`** - Professional styling
6. **`audio-generator.html`** - Audio generation tool (FIXED!)
7. **`IELTS_LESSONS_README.md`** - Complete documentation

---

## 🚀 Quick Start (3 Steps)

### Step 1: Generate Audio (One-Time Setup)
**Time Required**: ~10-15 minutes (first time downloads TTS model)

1. Open `audio-generator.html` in your browser
2. Click **"🚀 Generate All Audio"**
3. Confirm the dialog
4. Wait for completion (progress bar shows status)

**What happens:**
- Downloads TTS model on first use (~587MB)
- Generates 17+ audio clips from lesson scripts
- Saves to IndexedDB (browser storage)
- Shows success message when done

**Note**: You only need to do this ONCE. Audio is cached permanently in your browser.

---

### Step 2: Get Gemini API Key (For AI Features)
**Time Required**: 2 minutes

1. Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Sign in with Google account
3. Click "Create API Key"
4. Copy the key (starts with "AIza...")

**Cost**: FREE (60 requests/minute free tier)

---

### Step 3: Start Learning!
**Open**: `ielts-speaking-lessons.html`

1. Enter your API key when prompted (saves automatically)
2. Choose a module to start
3. Listen to teacher audio
4. Complete practice exercises
5. Get personalized AI feedback

---

## 🎓 Module Overview

### Module 1: Understanding the Test (10 min)
**What you'll learn:**
- What examiners really look for
- The 4 scoring criteria explained simply
- Common mistakes students make
- Interactive quiz

**Audio**: 3 clips (welcome, criteria, mistakes)

---

### Module 2: Finding Ideas Fast (20 min)
**What you'll learn:**
- The 5W1H method (Who, What, When, Where, Why, How)
- How to generate ideas in seconds for ANY topic
- Teacher demonstration with real example
- AI practice with personalized feedback

**Audio**: 4 clips (intro, method, demo, comparison)
**Practice**: Generate ideas for 4 different topics

**Example:**
```
Question: Do you like traveling?

Using 5W1H:
- WHERE: Japan, Europe
- WHEN: summer vacation
- WHY: experience cultures, try foods
- WHO: friends, sometimes alone
- HOW: feel excited, curious
- WHAT: city exploration, not beaches

✓ Now you have 6 angles to talk about!
```

---

### Module 3: Building Better Sentences (25 min)
**What you'll learn:**
- Transform Band 5 → Band 7 sentences
- Adding detail layers naturally
- Using connectors correctly
- Real-time sentence building with AI

**Audio**: 3 clips (intro, transformation, connectors)
**Practice**: Improve 3 basic sentences, conversation with AI

**Example:**
```
Level 1 (Band 5): I like reading.
Level 2 (Band 6): I enjoy reading mystery novels.
Level 3 (Band 7): I'm really into reading mystery novels,
                  especially before bed, as they help me
                  unwind after work.
```

---

### Module 4: Mastering Part 2 (30 min)
**What you'll learn:**
- How to use 1-minute prep time effectively
- 2-minute speaking structure
- Making keyword notes (not full sentences)
- Full teacher demonstration (2-minute response)

**Audio**: 4 clips (intro, prep strategy, structure, full demo)
**Practice**: Make notes, deliver full 2-minute response

**Prep Time Breakdown:**
- 10 sec: Read and understand topic
- 30 sec: Keyword notes for each bullet point
- 10 sec: Plan opening/closing
- 10 sec: Mental preparation

---

### Module 5: Part 3 Discussion Skills (25 min)
**What you'll learn:**
- 3 powerful answer strategies:
  1. **Direct Answer Plus**: Opinion → Reasons → Examples
  2. **Two-Sides Approach**: One hand → Other hand → Personal view
  3. **Past-Present-Future**: Temporal structure
- Sophisticated language for discussions
- Live AI conversation practice

**Audio**: 3 clips (intro, strategies, language)
**Practice**: Apply strategies, 5-question simulation with AI

---

## 🔧 Technical Details

### Audio System
- **Format**: WAV (16kHz, mono)
- **Storage**: IndexedDB (browser cache)
- **Total Size**: ~10-20MB
- **Playback**: Controls for pause, seek, speed
- **Offline**: Works without internet after generation

### AI Integration (Gemini)
- **Model**: Gemini 1.5 Flash
- **Usage**: Practice exercises only (~500 tokens each)
- **Features**:
  - Personalized feedback on ideas
  - Sentence improvement suggestions
  - Part 2 response evaluation
  - Interactive conversation
  - Strategy identification

### Browser Requirements
- Chrome/Edge (recommended)
- Firefox (supported)
- Safari (limited support)
- ~100MB storage space
- IndexedDB enabled

---

## 📱 How to Use Each Feature

### Audio Lessons
1. Click **▶️ Play Teacher Audio**
2. Listen to explanation
3. Click **"Show"** to see transcript
4. Check **"I've listened"** when done
5. Click **"Next"** to continue

**Tips:**
- Adjust speed (0.75x - 2.0x)
- Replay sections as needed
- Read transcript while listening

---

### AI Practice
1. Read the question/exercise
2. Type your answer in the text area
3. Click **"Get AI Feedback"**
4. Read AI's personalized feedback
5. Try another exercise

**Example Feedback:**
```
✓ Covered: WHAT, WHEN, WHY (3/6 elements)
💡 You did well: Good specific details about reading
→ To improve: Add WHERE you read and HOW it makes you feel

Try: "I enjoy reading mystery novels (WHAT) before bed
(WHEN) in my favorite chair (WHERE), and it makes me
feel relaxed and mentally stimulated (HOW)."
```

---

### Dual View Comparison
1. Complete the practice exercise
2. Click **"🔓 Reveal Teacher's Approach"**
3. Compare your ideas with teacher's
4. Learn from differences
5. Teacher audio auto-plays (if available)

---

### Conversation Practice
1. AI teacher asks a question
2. Type your response
3. Click **"Send Response"**
4. AI gives brief feedback + next question
5. After 4-5 exchanges, get comprehensive feedback

---

## 🐛 Troubleshooting

### Audio doesn't play
**Problem**: "Audio not generated yet" message
**Solution**: Run audio-generator.html first

---

### AI feedback not working
**Problem**: "API key not set" error
**Solution**: Enter your Gemini API key in settings

---

### TTS model download stuck
**Problem**: Progress bar at 0% for long time
**Solution**:
- Check internet connection
- Clear browser cache
- Try again (download resumes automatically)

---

### Progress not saving
**Problem**: Module shows 0% after completing sections
**Solution**:
- Check localStorage is enabled in browser
- Don't use incognito/private mode
- Allow cookies for the site

---

## 💡 Tips for Best Learning Experience

### 1. **Follow the Order**
Start with Module 1, progress sequentially. Each module builds on previous ones.

### 2. **Practice Multiple Times**
Don't just read - actually type out answers. The more you practice, the better.

### 3. **Use AI Feedback**
Read the AI feedback carefully. It's personalized to YOUR response.

### 4. **Compare with Teacher**
Always check the dual-view comparisons to learn different approaches.

### 5. **Take Notes**
Write down key strategies and phrases you want to remember.

### 6. **Practice Out Loud**
After typing, try saying your answers out loud for real practice.

### 7. **Revisit Modules**
Come back to earlier modules after taking the full test to reinforce learning.

---

## 📊 Progress Tracking

Your progress is automatically saved:
- ✅ Sections completed
- ✅ Practice scores
- ✅ Time spent
- ✅ Module completion percentage

**View Progress:**
- Each module card shows completion percentage
- Green checkmark appears when module is 100% complete
- Progress bar shows current section position

**Reset Progress:**
Open browser console and run:
```javascript
window.lessonProgress.reset();
```

---

## 🔗 Integration with Other Pages

### From Library → Lessons
Click **"🎓 Take Lessons"** button in header

### From Lessons → Test
After completing modules, click **"🎤 Full Test"** in header

### From Test → Lessons
If you struggle, click **"🎓 Learn Strategies First"**

### Weak Areas
Test results will recommend specific modules to revisit

---

## 🎯 Learning Path

### For Beginners (Band 4-5)
1. Module 1: Understand the test
2. Module 2: Learn idea generation
3. Module 2 practice: Do ALL exercises
4. Module 3: Sentence building basics
5. Take practice test
6. Module 4: Part 2 preparation

### For Intermediate (Band 6-6.5)
1. Module 3: Advanced sentence structures
2. Module 4: Part 2 mastery
3. Module 5: Part 3 strategies
4. Take full test
5. Review weak areas

### For Advanced (Band 7+)
1. Module 5: Advanced discussion skills
2. Focus on AI conversation practice
3. Take multiple full tests
4. Analyze feedback carefully

---

## ✅ Checklist: Ready to Start?

- [ ] Audio generated (audio-generator.html)
- [ ] Gemini API key obtained
- [ ] API key entered in lessons page
- [ ] Browser storage enabled
- [ ] Internet connection (for AI features)
- [ ] Headphones/speakers working
- [ ] 15+ minutes of focused time
- [ ] Notebook for taking notes (optional)

**All checked?** → Open `ielts-speaking-lessons.html` and start learning! 🎓

---

## 📞 Support

### If Something Doesn't Work:
1. Check this guide first
2. Open browser console (F12) to see error messages
3. Try clearing browser cache
4. Regenerate audio files if needed

### Feature Requests:
This is a complete, self-contained learning system. If you want to add more content:
- Edit `scripts/ieltsLessons.js` to add modules/sections
- Regenerate audio with audio-generator.html

---

## 🎉 You're All Set!

The system is **complete and ready to use**. All code is tested, documented, and production-ready.

**Next Steps:**
1. Open `audio-generator.html` → Generate audio (10 min)
2. Get Gemini API key (2 min)
3. Open `ielts-speaking-lessons.html` → Start Module 1!

Good luck with your IELTS Speaking preparation! 🎤✨
