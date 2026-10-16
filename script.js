// Getting access of every html content so that we can manuplate according to us
const startScreen = document.getElementById("start-screen");
const startButton = document.getElementById("start-btn");
const quizScreen = document.getElementById("quiz-screen");
const questionText = document.getElementById("question-text");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const answersContainer = document.getElementById("answers-container");
const progressBar = document.getElementById("progress");
const resultScreen = document.getElementById("result-screen");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-msg");
const restartButton = document.getElementById("restart-btn");

//Quiz questions

const quizQuestions = [
  {
    question: "When we had SEX first Time?",
    answers: [
      { text: "21 August", correct: false },
      { text: "22 August", correct: false },
      { text: "23 August", correct: false },
      { text: "24 August", correct: true },
    ],
  },
  {
    question: "When we had first Kiss?",
    answers: [
      { text: "25 August", correct: false },
      { text: "25 September", correct: true },
      { text: "25 Octuber", correct: false },
      { text: "25 November", correct: false },
    ],
  },
  {
    question: "When we had our first Date?",
    answers: [
      { text: "18 June", correct: true },
      { text: "18 May", correct: false },
      { text: "18 July", correct: false },
      { text: "18 August", correct: false },
    ],
  },
  {
    question: "What we ate at our first date",
    answers: [
      { text: "Dosa and noodles", correct: false },
      { text: "Dosa and Rajkachori", correct: true },
      { text: "Dosa and pyaj kachori", correct: false },
      { text: "Dosa and Hakka noodles", correct: false },
    ],
  },
  {
    question: "Where I want to go with You firtly?",
    answers: [
      { text: "Vrindavan", correct: false },
      { text: "Har Ki Pudi", correct: true },
      { text: "Kashi Vshiwnath", correct: false },
      { text: "Kedarnath", correct: false },
    ],
  },
];

// QUIZ STATE VARS

let currentQuestionIndex = 0;
let score = 0;
let answersDiabled = false;

totalQuestionSpan.textContent = quizQuestions.length; // Render total question length
maxScoreSpan.textContent = quizQuestions.length; // Remder maximum score

// Event Listeners

startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);

function startQuiz() {
  // reset vars
  currentQuestionIndex = 0;
  score = 0;
  scoreSpan.textContent = 0;

  startScreen.classList.remove("active"); // Remove the active class from startScreen
  quizScreen.classList.add("active"); // Add active class to quizScreen

  showQuestion();
}

function showQuestion() {
  // reset state
  answersDiabled = false;

  const currentQuestion = quizQuestions[currentQuestionIndex]; // Getting a object which contains current question and it's options from quizQuestion array

  currentQuestionSpan.textContent = currentQuestionIndex + 1; // updatin the current question number

  const progressPercent = (currentQuestionIndex / quizQuestions.length) * 100; // calculate progress bar percentage
  progressBar.style.width = progressPercent + "%"; // Updating progress bar

  questionText.textContent = currentQuestion.question; //Rendring current question on to the quiz screen

  answersContainer.innerHTML = ""; // Empty html content after completion of every question so every another question's options are visibel and perivious option gone invisible. 

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button"); // Creating button for every options
    button.textContent = answer.text;
    button.classList.add("answer-btn");

    button.dataset.correct = answer.correct; // dataset is the property of button element that allows us to store custom data

    button.addEventListener("click", selectAnswer);

    answersContainer.appendChild(button); // Add button elemets into answers container
  });
}

function selectAnswer(event) {
  if (answersDiabled) return; // optimization check (protect button from clicking more than once )

  answersDiabled = true;

  const selectedButton = event.target; // Getting the selected button
  const isCorrect = selectedButton.dataset.correct === "true"; // assinging true of false on the basis of selected button

  // Converting objects into Array
  Array.from(answersContainer.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct"); // assining correct class to the button
    } else if (selectedButton === button) {
      button.classList.add("incorrect"); //assining incorrect class to the button
    }
  });

  if (isCorrect) {
    score++;
    scoreSpan.textContent = score; // Updating scores
  }

  setTimeout(() => {
    currentQuestionIndex++; // Updating current question number
    if (currentQuestionIndex < quizQuestions.length) {
      showQuestion(); // showing next question
    } else {
      showResults(); // showing reslut after completig quiz game
    }
  }, 1000);
}

function showResults() {
  quizScreen.classList.remove("active"); // remove active class from quiz screen

  resultScreen.classList.add("active"); // add active class from result screen

  finalScoreSpan.textContent = score; // Render final score

  const scorePercentage = (score / quizQuestions.length) * 100;

  // show result msg based on performance
  if (scorePercentage <= 50) {
    resultMessage.textContent =
      "Aaj ptaa chl gya you don't love me... And if you love then prove it me by making delicious food for me..";
  } else if (scorePercentage < 80) {
    resultMessage.textContent =
      "Why you don't rember other 2 answers how you can forget these lovely movements.I think you don't love me..";
  } else if (scorePercentage < 100) {
    resultMessage.textContent =
      "Why you don't rember rest answers how you can forget those lovely movements.I think you don't love me..";
  } else if (scorePercentage === 100) {
    resultMessage.textContent =
      "Ooooooo janu janu I love you baby you rember all lovely movements..You win many hugs, kisses, cuddels, blowjobs, handjobs, fingrings and a lots of SEX.. from me.";
  }
}

// Restart quiz screen
function restartQuiz() {
  resultScreen.classList.remove("active"); // remove active class from result screen
  startQuiz();
}
