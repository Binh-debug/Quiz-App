const btnStart = document.querySelector(".start");
const quizGame = document.querySelector(".quiz-game");
const wrapper = document.querySelector(".wrapper");
const question = document.querySelector(".question");
const choices = document.querySelectorAll(".choice");
const choiceA = document.querySelector("#A");
const choiceB = document.querySelector("#B");
const choiceC = document.querySelector("#C");
const choiceD = document.querySelector("#D");
const questionBar = document.querySelector(".question-bar");
const timeNum = document.querySelector(".number-of-time");
const timeBar = document.querySelector(".time-bar");
const result = document.querySelector(".result");

// --------------------------------initial --------------------------------
let currentQuestion = 0;
let score = 0;
let trueNumber = 0;
let questionTime = 10;
let widthTimeBar = 0;
let TIMER;

// --------------------------------Database--------------------------------
const questions = [
  {
    question: "What is the capital of Viet Nam ?",
    questionImg: "img/1.jpg",
    answerA: "A. Hà Nội",
    answerB: "B. Nam Định",
    answerC: "C. TP Hồ Chí Minh",
    answerD: "D. Đà Nẵng",
    correctAnswer: "A. Hà Nội",
  },
  {
    question:
      "How many provinces and cities under central authority in Viet Nam ?",
    questionImg: "img/2.jpg",
    answerA: "A. 4",
    answerB: "B. 5",
    answerC: "C. 6",
    answerD: "D. 7",
    correctAnswer: "B. 5",
  },

  {
    question:
      "On what date did the Ha Dong elevated railway start construction ?",
    questionImg: "img/3.jpg",
    answerA: "A. 11/2010",
    answerB: "B. 11/2011",
    answerC: "C. 10/2010",
    answerD: "D. 10/2011",
    correctAnswer: "D. 10/2011",
  },
  {
    question: "When does world war II end ?",
    questionImg: "img/4.jpg",
    answerA: "A. 1939",
    answerB: "B. 1945",
    answerC: "C. 1954",
    answerD: "D. 1919",
    correctAnswer: "B. 1945",
  },
  {
    question: "Who is the top scorer in the world right now ?",
    questionImg: "img/5.jpg",
    answerA: "A. Eusebio ",
    answerB: "B. Pele ",
    answerC: "C. Cristiano Ronaldo",
    answerD: "D. Lionel Messi",
    correctAnswer: "C. Cristiano Ronaldo",
  },
  {
    question: "Who wrote the song 'New Happiness' ?",
    questionImg: "img/6.jpg",
    answerA: "A. Phạm Quỳnh Anh",
    answerB: "B. Sơn Tùng MTP",
    answerC: "C. Jack - J97",
    answerD: "D. Hari Won",
    correctAnswer: "A. Phạm Quỳnh Anh",
  },
  {
    question: "Which club has the most fans in the world ?",
    questionImg: "img/7.jpg",
    answerA: "A. Manchester United",
    answerB: "B. Barcelona",
    answerC: "C. Real Madrid",
    answerD: "D. Liverpool",
    correctAnswer: "A. Manchester United",
  },
  {
    question: "What is the highest grossing movie of all time ?",
    questionImg: "img/8.jpg",
    answerA: "A.  Titanic",
    answerB: "B. Fast And Furious",
    answerC: "C. Avengers: Age of the Ultron",
    answerD: "D. Avatar",
    correctAnswer: "D. Avatar",
  },
  {
    question: "Where did the covid pandemic come from ?",
    questionImg: "img/9.jpg",
    answerA: "A. America",
    answerB: "B. China",
    answerC: "C. Cambodia",
    answerD: "D. South Korea",
    correctAnswer: "B. China",
  },
  {
    question: "What is the date of birth of Bui Thi Quynh ?",
    questionImg: "img/10.jpg",
    answerA: "A. 19/06/2000",
    answerB: "B. 19/01/2000",
    answerC: "C. 06/09/2001",
    answerD: "D. 07/05/2001",
    correctAnswer: "C. 06/09/2001",
  },
];
// --------------------------------when click btn start --------------------------------
btnStart.addEventListener("click", function () {
  btnStart.style.display = "none";
  quizGame.style.visibility = "visible";
  displayQuestion();
  createQuestionBar();
  TIMER = setInterval(timer, 1000);
});
// --------------------------------Function display Question--------------------------------
function displayQuestion() {
  wrapper.style.backgroundImage = `url('${questions[currentQuestion].questionImg}')`;
  question.innerHTML = "<p>" + questions[currentQuestion].question + "</p>";
  choiceA.innerHTML = "<p>" + questions[currentQuestion].answerA + "</p>";
  choiceB.innerHTML = "<p>" + questions[currentQuestion].answerB + "</p>";
  choiceC.innerHTML = "<p>" + questions[currentQuestion].answerC + "</p>";
  choiceD.innerHTML = "<p>" + questions[currentQuestion].answerD + "</p>";
}
// --------------------------------Function check answer--------------------------------
let correctAnswer = questions[currentQuestion].correctAnswer;

choices.forEach(function (choice) {
  choice.addEventListener("click", checkAnswer);
});
function checkAnswer(e) {
  let answer = e.target.innerText;

  if (answer === questions[currentQuestion].correctAnswer) {
    trueNumber += 1;
    pass();
  } else {
    fail();
  }

  nextQuestion();
}
// --------------------------------Function answer is correct--------------------------------
function pass() {
  document.getElementById(currentQuestion).style.backgroundColor = "green";
}
// --------------------------------Function answer is incorrect --------------------------------
function fail() {
  document.getElementById(currentQuestion).style.backgroundColor = "red";
}

// --------------------------------Function create  progress box --------------------------------
let lastQuestion = questions.length - 1;
function createQuestionBar() {
  for (let i = 0; i <= lastQuestion; i++) {
    questionBar.innerHTML +=
      "<div class ='progress-box' id = " + i + " ></div>";
  }
}
// --------------------------------Function create timer count--------------------------------
function timer() {
  if (questionTime !== 0) {
    questionTime--;
    widthTimeBar += 10;
    timeNum.innerHTML = questionTime;
    timeBar.style.width = widthTimeBar + "%";
  } else {
    fail();
    nextQuestion();
  }
}
// --------------------------------Function create next question--------------------------------
function nextQuestion() {
  questionTime = 10;
  widthTimeBar = 0;
  timeBar.style.width = widthTimeBar;
  if (currentQuestion < lastQuestion) {
    currentQuestion++;
    displayQuestion();
  } else {
    clearInterval(TIMER);
    displayScore();
  }
}

// --------------------------------Function display score--------------------------------
function displayScore() {
  result.style.visibility = "visible";

  score = Math.round((trueNumber * 100) / questions.length);
  result.innerHTML = `<h2>Percentage of Correctly Answered Question:
    ${score} </h2>`;
  result.innerHTML += `<h2>Number of Correctly Answered Question: ${trueNumber}  </h2>`;
}
