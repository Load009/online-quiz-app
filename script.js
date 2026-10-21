
const questions = [
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    answer: 1,
    explanation: "Mars looks reddish because its surface contains iron oxide."
  },
  {
    question: "What is the capital city of Japan?",
    options: ["Seoul", "Beijing", "Tokyo", "Bangkok"],
    answer: 2,
    explanation: "Tokyo is the capital city of Japan."
  },
  {
    question: "Which language is used to style web pages?",
    options: ["HTML", "Python", "CSS", "SQL"],
    answer: 2,
    explanation: "CSS controls the colors, layout, fonts, and appearance of web pages."
  },
  {
    question: "How many sides does a hexagon have?",
    options: ["Five", "Six", "Seven", "Eight"],
    answer: 1,
    explanation: "A hexagon is a polygon with six sides."
  },
  {
    question: "Which ocean is the largest?",
    options: [
      "Atlantic Ocean",
      "Indian Ocean",
      "Arctic Ocean",
      "Pacific Ocean"
    ],
    answer: 3,
    explanation: "The Pacific Ocean is the largest ocean on Earth."
  },
  {
    question: "What does CPU stand for?",
    options: [
      "Central Processing Unit",
      "Computer Power Utility",
      "Central Program User",
      "Control Processing Usage"
    ],
    answer: 0,
    explanation: "CPU stands for Central Processing Unit."
  },
  {
    question: "Which animal is the largest mammal?",
    options: ["African elephant", "Blue whale", "Giraffe", "Hippopotamus"],
    answer: 1,
    explanation: "The blue whale is the largest mammal known to have lived on Earth."
  },
  {
    question: "What is 12 × 8?",
    options: ["84", "88", "96", "108"],
    answer: 2,
    explanation: "12 multiplied by 8 equals 96."
  },
  {
    question: "Which of these is a JavaScript data type?",
    options: ["Boolean", "PageStyle", "WebFrame", "ScreenText"],
    answer: 0,
    explanation: "Boolean is a JavaScript data type with true and false values."
  },
  {
    question: "Which gas do plants absorb from the atmosphere?",
    options: ["Oxygen", "Nitrogen", "Hydrogen", "Carbon dioxide"],
    answer: 3,
    explanation: "Plants absorb carbon dioxide during photosynthesis."
  }
];

const hero = document.getElementById("hero");
const quiz = document.getElementById("quiz");
const result = document.getElementById("result");

const startBtn = document.getElementById("startBtn");
const nextBtn = document.getElementById("nextBtn");
const restartBtn = document.getElementById("restartBtn");

const questionCount = document.getElementById("questionCount");
const questionText = document.getElementById("questionText");
const optionsContainer = document.getElementById("options");
const progressBar = document.getElementById("progressBar");
const liveScore = document.getElementById("liveScore");
const feedback = document.getElementById("feedback");

const resultIcon = document.getElementById("resultIcon");
const resultTitle = document.getElementById("resultTitle");
const resultMessage = document.getElementById("resultMessage");
const finalScore = document.getElementById("finalScore");
const percentage = document.getElementById("percentage");
const resultBar = document.getElementById("resultBar");

let currentQuestion = 0;
let score = 0;
let answered = false;

function startQuiz() {
  currentQuestion = 0;
  score = 0;
  answered = false;

  hero.classList.add("hidden");
  result.classList.add("hidden");
  quiz.classList.remove("hidden");

  liveScore.textContent = score;
  showQuestion();
}

function showQuestion() {
  answered = false;

  const current = questions[currentQuestion];

  questionCount.textContent =
    `QUESTION ${String(currentQuestion + 1).padStart(2, "0")} / ${questions.length}`;

  questionText.textContent = current.question;

  progressBar.style.width =
    `${(currentQuestion / questions.length) * 100}%`;

  optionsContainer.replaceChildren();
  feedback.className = "feedback hidden";
  feedback.textContent = "";
  nextBtn.classList.add("hidden");

  current.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "option";

    const letter = document.createElement("span");
    letter.className = "option-letter";
    letter.textContent = String.fromCharCode(65 + index);

    const label = document.createElement("span");
    label.textContent = option;

    button.append(letter, label);
    button.addEventListener("click", () => selectAnswer(index));

    optionsContainer.appendChild(button);
  });
}

function selectAnswer(selectedIndex) {
  if (answered) return;

  answered = true;

  const current = questions[currentQuestion];
  const buttons = optionsContainer.querySelectorAll(".option");
  const isCorrect = selectedIndex === current.answer;

  buttons.forEach((button, index) => {
    button.disabled = true;

    if (index === current.answer) {
      button.classList.add("correct");
      button.querySelector(".option-letter").textContent = "✓";
    } else if (index === selectedIndex) {
      button.classList.add("wrong");
      button.querySelector(".option-letter").textContent = "✕";
    }
  });

  if (isCorrect) {
    score++;
    feedback.textContent = `Correct! ${current.explanation}`;
    feedback.className = "feedback good";
  } else {
    feedback.textContent =
      `Not quite. The correct answer is ${current.options[current.answer]}. ${current.explanation}`;
    feedback.className = "feedback bad";
  }

  liveScore.textContent = score;
  progressBar.style.width =
    `${((currentQuestion + 1) / questions.length) * 100}%`;

  nextBtn.innerHTML =
    currentQuestion === questions.length - 1
      ? 'See Results <span>→</span>'
      : 'Next Question <span>→</span>';

  nextBtn.classList.remove("hidden");
}

function showResults() {
  quiz.classList.add("hidden");
  result.classList.remove("hidden");

  const percent = Math.round((score / questions.length) * 100);

  finalScore.textContent = score;
  percentage.textContent = `${percent}%`;
  resultBar.style.width = `${percent}%`;

  if (percent === 100) {
    resultIcon.textContent = "🏆";
    resultTitle.textContent = "Perfect Score!";
    resultMessage.textContent = "Amazing work! You answered every question correctly.";
  } else if (percent >= 70) {
    resultIcon.textContent = "🎉";
    resultTitle.textContent = "Great Job!";
    resultMessage.textContent = "Excellent effort! Keep learning and growing.";
  } else if (percent >= 40) {
    resultIcon.textContent = "👏";
    resultTitle.textContent = "Good Effort!";
    resultMessage.textContent = "You're making progress. Try again to improve your score.";
  } else {
    resultIcon.textContent = "💪";
    resultTitle.textContent = "Keep Practising!";
    resultMessage.textContent = "Every attempt helps you learn something new.";
  }
}

function nextQuestion() {
  if (!answered) return;

  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    showQuestion();
  } else {
    showResults();
  }
}

startBtn.addEventListener("click", startQuiz);
nextBtn.addEventListener("click", nextQuestion);
restartBtn.addEventListener("click", startQuiz);
