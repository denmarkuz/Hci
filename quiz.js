const questions = [
    {
        question: "What is the Tagalog word for 'house'?",
        answers: ["Bahay", "Ulam", "Gabi", "Araw"],
        correct: "Bahay"
    },
    {
        question: "What is the Cebuano word for 'water'?",
        answers: ["Tubig", "Kalayo", "Hangin", "Adlaw"],
        correct: "Tubig"
    },
    {
        question: "What is 'Ilocano' for 'sun'?",
        answers: ["Init", "Araw", "Init ti init", "Aldaw"],
        correct: "Aldaw"
    },
    {
        question: "What is the Tagalog word for 'food'?",
        answers: ["Ulam", "Kain", "Sarap", "Pagkain"],
        correct: "Pagkain"
    },
    {
        question: "What is the Cebuano word for 'fire'?",
        answers: ["Kalayo", "Hangin", "Suga", "Tubig"],
        correct: "Kalayo"
    },
    {
        question: "What is the Ilocano word for 'day'?",
        answers: ["Rabii", "Aldaw", "Bigat", "Init"],
        correct: "Aldaw"
    },
    {
        question: "What does 'Gabi' mean in Tagalog?",
        answers: ["Morning", "Afternoon", "Evening", "Sun"],
        correct: "Evening"
    },
    {
        question: "Translate 'air' in Cebuano:",
        answers: ["Kalayo", "Hangin", "Ulan", "Kahoy"],
        correct: "Hangin"
    }
];

let currentQuestionIndex = 0;
let score = 0;

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

shuffle(questions);
loadQuestion();

function loadQuestion() {
    const questionData = questions[currentQuestionIndex];
    document.getElementById("question").innerText = questionData.question;
    const answersDiv = document.getElementById("answers");
    answersDiv.innerHTML = "";

    shuffle(questionData.answers);
    questionData.answers.forEach(answer => {
        const btn = document.createElement("button");
        btn.textContent = answer;
        btn.onclick = () => checkAnswer(btn, questionData.correct);
        answersDiv.appendChild(btn);
    });

    document.getElementById("feedback").innerText = "";
    document.getElementById("next-btn").style.display = "none";
}

function checkAnswer(button, correctAnswer) {
    const feedback = document.getElementById("feedback");

    if (button.textContent === correctAnswer) {
        feedback.innerText = "✅ Correct!";
        feedback.style.color = "green";
        score++;
    } else {
        feedback.innerText = `❌ Wrong! The correct answer is "${correctAnswer}"`;
        feedback.style.color = "red";
    }

    document.querySelectorAll("#answers button").forEach(btn => {
        btn.disabled = true;
    });

    document.getElementById("next-btn").style.display = "block";
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    const container = document.getElementById("quiz-container");
    container.innerHTML = `
        <h2>Quiz Complete!</h2>
        <p>Your score: ${score} / ${questions.length}</p>
        <button onclick="restartGame()">Play Again</button>
    `;
}

function restartGame() {
    score = 0;
    currentQuestionIndex = 0;
    shuffle(questions);
    loadQuestion();
}
