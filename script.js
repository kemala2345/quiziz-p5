const questions = [
  {
    question: "5 + 3 = ...",
    answers: ["6", "7", "8", "9"],
    correct: 2
  },
  {
    question: "9 - 4 = ...",
    answers: ["6", "5", "4", "3"],
    correct: 1
  },
  // Tambahkan hingga 35 soal serupa
];

const questionContainer = document.getElementById("question-container");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const progress = document.getElementById("progress");

let currentQuestionIndex = 0;
let score = 0;

function showQuestion() {
  resetState();
  const current = questions[currentQuestionIndex];
  questionContainer.innerText = current.question;
  progress.innerText = `Soal ke-${currentQuestionIndex + 1} dari ${questions.length}`;

  current.answers.forEach((answer, index) => {
    const btn = document.createElement("button");
    btn.innerText = answer;
    btn.addEventListener("click", () => selectAnswer(btn, index));
    answerButtons.appendChild(btn);
  });
}

function resetState() {
  nextButton.style.display = "none";
  answerButtons.innerHTML = "";
}

function selectAnswer(button, index) {
  const correctIndex = questions[currentQuestionIndex].correct;
  Array.from(answerButtons.children).forEach((btn, i) => {
    btn.classList.add(i === correctIndex ? "correct" : "wrong");
    btn.disabled = true;
  });

  if (index === correctIndex) score++;

  nextButton.style.display = "block";
}

nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
});

function showScore() {
  resetState();
  questionContainer.innerText = `Skor akhir kamu ${score} dari ${questions.length} soal.`;
  progress.innerText = "Selesai!";
  nextButton.innerText = "Ulangi";
  nextButton.style.display = "block";
  nextButton.onclick = () => location.reload();
}

showQuestion();
