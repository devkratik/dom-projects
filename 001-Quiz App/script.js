"use strict";
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const htmlCard = document.querySelector(".cards__html");
const cssCard = document.querySelector(".cards__css");
const javascriptCard = document.querySelector(".cards__javascript");
const startBtn = document.querySelector(".start__btn");
const questionText = document.querySelector(".screen__question");
const currentQuestion = document.querySelector(".question-num");
const answerContainer = document.querySelector(".screen__answers");
const currentScore = document.querySelector(".current-score");
const finalScore = document.querySelector(".final-score");
const maxScore = document.querySelector(".total-question");
const totalQuestions = document.querySelector(".max-score");
const resultMessage = document.querySelector(".screen__quote");
const restartBtn = document.querySelector(".restart__btn");
const progress = document.querySelector(".progress__bar");

const cards = [htmlCard, cssCard, javascriptCard];

cards.forEach((card) => {
  card.addEventListener("click", showStart);
});

const questionData = {
  html: [
    {
      question: "What is full form of HTML ?",
      options: [
        { text: "Hyper Text Makeup Language", correct: false },
        { text: "Hyper Tool Markup Language", correct: false },
        { text: "Hyper Text Markup Language", correct: true },
        { text: "Heavy Text Markup Language", correct: false },
      ],
    },
    {
      question: "Which one is latest version of HTML ?",
      options: [
        { text: "HTML 3.5", correct: false },
        { text: "HTML 4.3", correct: false },
        { text: "HTML 6", correct: false },
        { text: "HTML 5", correct: true },
      ],
    },
    {
      question: "Which tag is used to create a hyperlink?",
      options: [
        { text: "<link>", correct: false },
        { text: "<a>", correct: true },
        { text: "<href>", correct: false },
        { text: "<url>", correct: false },
      ],
    },
    {
      question: "Which tag is used for inserting an image?",
      options: [
        { text: "<img>", correct: true },
        { text: "<image>", correct: false },
        { text: "<pic>", correct: false },
        { text: "<src>", correct: false },
      ],
    },
    {
      question: "Which tag is used for the largest heading?",
      options: [
        { text: "<h6>", correct: false },
        { text: "<heading>", correct: false },
        { text: "<h1>", correct: true },
        { text: "<head>", correct: false },
      ],
    },
    {
      question: "Which attribute is used for image source?",
      options: [
        { text: "href", correct: false },
        { text: "src", correct: true },
        { text: "alt", correct: false },
        { text: "link", correct: false },
      ],
    },
    {
      question: "Which tag creates a line break?",
      options: [
        { text: "<br>", correct: true },
        { text: "<lb>", correct: false },
        { text: "<break>", correct: false },
        { text: "<line>", correct: false },
      ],
    },
    {
      question: "Which tag is used to create a list?",
      options: [
        { text: "<list>", correct: false },
        { text: "<ul>", correct: true },
        { text: "<li>", correct: false },
        { text: "<ol>", correct: false },
      ],
    },
    {
      question: "Which tag is used for table rows?",
      options: [
        { text: "<td>", correct: false },
        { text: "<th>", correct: false },
        { text: "<tr>", correct: true },
        { text: "<table>", correct: false },
      ],
    },
  ],
  css: [
    {
      question: "Which property changes text color?",
      options: [
        { text: "font-color", correct: false },
        { text: "text-color", correct: false },
        { text: "color", correct: true },
        { text: "bgcolor", correct: false },
      ],
    },
    {
      question: "Which property controls font size?",
      options: [
        { text: "font-style", correct: false },
        { text: "font-size", correct: true },
        { text: "text-size", correct: false },
        { text: "size", correct: false },
      ],
    },
    {
      question: "Which property sets background color?",
      options: [
        { text: "background", correct: false },
        { text: "bgcolor", correct: false },
        { text: "background-color", correct: true },
        { text: "color-bg", correct: false },
      ],
    },
    {
      question: "Which display value makes element flex?",
      options: [
        { text: "block", correct: false },
        { text: "inline", correct: false },
        { text: "flex", correct: true },
        { text: "grid", correct: false },
      ],
    },
    {
      question: "Which property is used for spacing inside element?",
      options: [
        { text: "margin", correct: false },
        { text: "padding", correct: true },
        { text: "spacing", correct: false },
        { text: "gap", correct: false },
      ],
    },
    {
      question: "Which property is used for spacing outside element?",
      options: [
        { text: "padding", correct: false },
        { text: "margin", correct: true },
        { text: "gap", correct: false },
        { text: "space", correct: false },
      ],
    },
    {
      question: "Which property makes text bold?",
      options: [
        { text: "font-weight", correct: true },
        { text: "text-bold", correct: false },
        { text: "font-style", correct: false },
        { text: "weight", correct: false },
      ],
    },
    {
      question: "Which unit is relative?",
      options: [
        { text: "px", correct: false },
        { text: "em", correct: true },
        { text: "cm", correct: false },
        { text: "mm", correct: false },
      ],
    },
    {
      question: "Which property aligns text center?",
      options: [
        { text: "align", correct: false },
        { text: "text-align", correct: true },
        { text: "center", correct: false },
        { text: "position", correct: false },
      ],
    },
    {
      question: "Which property controls element visibility?",
      options: [
        { text: "display", correct: false },
        { text: "visibility", correct: true },
        { text: "show", correct: false },
        { text: "opacity", correct: false },
      ],
    },
  ],
  javascript: [
    {
      question: "Which keyword declares variable?",
      options: [
        { text: "int", correct: false },
        { text: "var", correct: true },
        { text: "define", correct: false },
        { text: "letvar", correct: false },
      ],
    },
    {
      question: "Which is strict equality?",
      options: [
        { text: "==", correct: false },
        { text: "===", correct: true },
        { text: "=", correct: false },
        { text: "!=", correct: false },
      ],
    },
    {
      question: "Which is a loop?",
      options: [
        { text: "if", correct: false },
        { text: "for", correct: true },
        { text: "let", correct: false },
        { text: "const", correct: false },
      ],
    },
    {
      question: "Which function prints to console?",
      options: [
        { text: "print()", correct: false },
        { text: "console.log()", correct: true },
        { text: "log()", correct: false },
        { text: "write()", correct: false },
      ],
    },
    {
      question: "Which is not a data type?",
      options: [
        { text: "string", correct: false },
        { text: "number", correct: false },
        { text: "boolean", correct: false },
        { text: "float", correct: true },
      ],
    },
    {
      question: "Which keyword defines constant?",
      options: [
        { text: "var", correct: false },
        { text: "let", correct: false },
        { text: "const", correct: true },
        { text: "define", correct: false },
      ],
    },
    {
      question: "Which is used for comments?",
      options: [
        { text: "//", correct: true },
        { text: "<!-- -->", correct: false },
        { text: "#", correct: false },
        { text: "**", correct: false },
      ],
    },
    {
      question: "Which method converts JSON to object?",
      options: [
        { text: "JSON.stringify()", correct: false },
        { text: "JSON.parse()", correct: true },
        { text: "JSON.convert()", correct: false },
        { text: "JSON.object()", correct: false },
      ],
    },
    {
      question: "Which is array method?",
      options: [
        { text: "push()", correct: true },
        { text: "add()", correct: false },
        { text: "insert()", correct: false },
        { text: "append()", correct: false },
      ],
    },
    {
      question: "Which is used to delay execution?",
      options: [
        { text: "setTimeout()", correct: true },
        { text: "delay()", correct: false },
        { text: "wait()", correct: false },
        { text: "timeout()", correct: false },
      ],
    },
  ],
};

let selectedCategory = "";
let currentQuestionIndex = 0;
let score = 0;

function showStart(e) {
  startBtn.classList.add("show");
  const clickedCard = e.target;

  const tick = document.createElement("div");
  tick.innerHTML = `<i class="fa-solid fa-check"></i>`;

  resetCheck();

  clickedCard.append(tick);
  tick.classList.add("select__tick");

  selectedCategory = clickedCard.dataset.category;
}

function resetCheck() {
  cards.forEach((card) => {
    const tick = card.querySelector(".select__tick");
    if (tick) {
      card.removeChild(tick);
    }
  });
}

startBtn.addEventListener("click", showQuestions);
function showQuestions() {
  startScreen.classList.remove("active");
  quizScreen.classList.add("active");
  questionText.textContent =
    questionData[selectedCategory][currentQuestionIndex].question;
  showOptions(currentQuestionIndex);
}

function showOptions(currentIndex) {
  currentQuestion.textContent = currentIndex + 1;
  maxScore.textContent = questionData[selectedCategory].length;
  answerContainer.innerHTML = "";

  const options = questionData[selectedCategory][currentIndex].options;

  for (const item of options) {
    const option = document.createElement("button");
    option.textContent = item.text;
    option.classList.add("answer-btn");
    answerContainer.appendChild(option);

    option.addEventListener("click", () => {
      const allOptions = answerContainer.querySelectorAll(".answer-btn");
      allOptions.forEach((btn) => {
        btn.disabled = true;
      });

      if (item.correct) {
        option.classList.add("success");
        score++;
        currentScore.textContent = score;
      } else {
        option.classList.add("failure");
      }

      allOptions.forEach((btn, index) => {
        if (options[index].correct) {
          btn.classList.add("success");
        }
      });

      //progress
      progress.style.width =
        ((currentIndex + 1) / questionData[selectedCategory].length) * 100 +
        "%";

      setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < questionData[selectedCategory].length) {
          showQuestions();
        } else {
          showResult();
        }
      }, 0);
    });
  }
}
function showResult() {
  quizScreen.classList.remove("active");
  resultScreen.classList.add("active");
  finalScore.textContent = score;
  totalQuestions.textContent = questionData[selectedCategory].length;
  const percentage = Number(Math.round((score / totalQuestions) * 100));
  if (percentage >= 90) {
    resultMessage.textContent = "Congratulations, You are genious!";
  } else if (percentage >= 70 && percentage < 90) {
    resultMessage.textContent = "Keep it up, You are doing great!";
  } else if (percentage >= 60 && percentage < 70) {
    resultMessage.textContent = "Good efforts, One day you will be better!";
  } else {
    resultMessage.textContent = "Better luck next time!";
  }
}
restartBtn.addEventListener("click", restartQuiz);
function restartQuiz() {
  score = 0;
  currentScore.textContent = score;
  selectedCategory = "";
  currentQuestionIndex = 0;
  progress.style.width = 0 + "%";
  currentQuestion.textContent = 1;
  resetCheck();
  resultScreen.classList.remove("active");
  startScreen.classList.add("active");
}
