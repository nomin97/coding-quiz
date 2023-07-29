var quizQA = [
    {
        question: "What is the right way to use CamelCase in JavaScript?",
        a: "FirstQuestionAnswer",
        b: "firstQuestionAnswer",
        c: "FirstquestionAnswer",
        d: "firstquestionanswer",
        correct: "b",
    },
    {
        question: "Which of the following adds an element to the begining of an array?",
        a: "unshift",
        b: "pop",
        c: "shift",
        d: "concat",
        correct: "a",
    },
    {
        question: "When you think of arrays, you should think...",
        a: "curly brackets {}",
        b: "parenthesis()",
        c: "quote marks' '",
        d: "square brackets []",
        correct: "d",
    },
    {
        question: "How do you turn a string into an array?",
        a: "string.array(delimiter, limit)",
        b: "array.string(delimiter, limit)",
        c: "string.seperate(delimiter, limit)",
        d: "string.split(delimiter, limit)",
        correct: "d",
    },
    {
        question: "How do you get user info?",
        a: "prompt",
        b: "call",
        c: "ask",
        d: "request",
        correct: "a",
    },
];

var setTime = 60 * 1000
var intro = document.getElementById('intro')
var startButton = document.getElementById('start-button')
var quiz = document.getElementById('quiz')
var submitAnswer= document.getElementById('submit')

var submitInitials= document.getElementById('submit-initials')
var homeButton = document.getElementById('return-button')
var results = document.getElementById('results')
var initials = document.getElementById('initials')
var correctAnswers = document.getElementById('correct-answers')

var timer = document.getElementById('timer')

var questionEl = document.getElementById('question')
var answerEls = document.querySelectorAll('.answer')
var a_text = document.getElementById('a')
var b_text = document.getElementById('b')
var c_text = document.getElementById('c')
var d_text = document.getElementById('d')

answerEls.forEach(answerEl => answerEl.addEventListener("click", setAnswer))
submitInitials.addEventListener("click", submitInitials);
homeButton.addEventListener("click", returnHome);
startButton.addEventListener("click", startQuiz);

let highScoreMaxCount = 5;
let highScoreInitials
let currentQuiz
let score
let timerValue
let timerId
let answer
let rank
// click event listener for timer

// timer seperate function
  function updateTimerText(ms) {
    if (ms === -1) {
      timer.innerText = '';
    }
    else if (ms > 0) {
      timer.innerText = 'Time Remaining: ' + (ms / 1000.0).toFixed(1) + ' seconds';
    }
    else {
      timer.innerText = "Time is up!"
    }
  }
  
  function updateTimer() {
    decrementTimer(100);
    updateTimerText(timerValue)
  }
  
  function startTimer() {
    timerValue = setTime;
    updateTimerText(timerValue)
    timerId = setInterval(updateTimer, 100);
  }
  
  function startQuiz() {
    currentQuiz = 0;
    score = 0;
    answer = null;
    quiz.style.display = "block";
    intro.style.display = "none";
    submitInitials.style.visibility = "hidden";
    deselectAnswers()
    const currentquizQA = quizQA[currentQuiz]
    questionEl.innerText = currentquizQA.question
    a_text.innerText = currentquizQA.a
    b_text.innerText = currentquizQA.b
    c_text.innerText = currentquizQA.c
    d_text.innerText = currentquizQA.d
  
    loadQuiz()
    startTimer()
  }
  
  function stopQuiz() {
    updateTimerText(-1);
    clearInterval(timerId);
  
    rank = 0
    let highScores = getHighScores();
    for (let highScore of highScores) {
      if (score > highScore.correct || rank == highScoreMaxCount)
        break;
  
      rank++;
    }
  
    correctAnswers.innerHTML = `
      You answered ${score} out of ${quizQA.length} questions correctly!
    `
  
    if (rank < highScoreMaxCount) {
      highScoreInitials = '';
      submitInitials.innerHTML = 'Submit';
      initials.innerHTML = `
        <h3>Congratulations, you're rank #${rank + 1}!</h3>
        <label>Enter your initials</label>
        <input id="high-score-input" maxlength="3"></input>
      `
    }
    else {
      initials.innerHTML = '';
      submitInitials.innerHTML = 'View High Scores';
      submitInitials.style.visibility = "visible";
    }
  
    quiz.style.display = "none";
    results.style.display = "block";
  }
  
  function submitHighScore() {
    scores.style.display = "block";
    quiz.style.display = "none";
    let initialsEl = document.getElementById('high-score-input');
    if (initialsEl) {
      setHighScore(rank, initialsEl.value, score);
    }
    updateHighScores();
    scores.style.display = "block";
    results.style.display = "none";
  }
  
  function updateHighScores() {
    let highScores = getHighScores();
    for (let rank = 1; rank <= highScoreMaxCount; rank++) {
      let scoreEl = document.getElementById('high-score-' + rank).getElementsByClassName('name')[0];
      let score = highScores[rank - 1];
      if (score) {
        scoreEl.innerHTML = rank + ') ' + score.initials + ' - ' + score.correct + '/' + quizQA.length;
      }
      else {
        scoreEl.innerHTML = '';
      }
    }
  }
  
  function loadQuiz() {
    deselectAnswers()
    const currentQuizQA = quizQA[currentQuiz]
  
    questionEl.innerText = currentQuizQA.question
    a_text.innerText = currentQuizQA.a
    b_text.innerText = currentQuizQA.b
    c_text.innerText = currentQuizQA.c
    d_text.innerText = currentQuizQA.d
  }
  
  function decrementTimer(value) {
    timerValue -= value;
    if (timerValue <= 0) {
      clearInterval(timerId);
      stopQuiz();
    }
  }
  
  function deselectAnswers() {
    answerEls.forEach(answerEl => answerEl.checked = false)
  }
  
  function setAnswer(e) {
    answer = e.target.id
  }
  
  function getHighScores() {
    let highScores = JSON.parse(localStorage.getItem('highscores'));
    if (!highScores)
      highScores = []
  
    return highScores
  }
  
  function getHighScore(position) {
    let highScores = getHighScores();
    if (!highScores)
      return null
  
    if (highScores.length < position)
      return null
  
    return highScores[position]
  }
  
  function setHighScore(position, initials, correct) {
    let highScores = getHighScores();
    if (!highScores || !Array.isArray(highScores))
      highScores = [];
  
    highScores.splice(position, 0, { initials, correct })
    if (highScores.length > highScoreMaxCount)
      highScores.pop();
  
    localStorage.setItem('highscores', JSON.stringify(highScores))
  }
  
  function showHighScores() {
    updateHighScores();
    scores.style.display = "block";
    intro.style.display = "none";
    quiz.style.display = "none";
    submitInitials.style.visibility = "hidden";
  }
  
  function returnHome() {
    scores.style.display = "none";
    intro.style.display = "block";
    submitInitials.style.visibility = "visible";
  }
  
  submitAnswer.addEventListener('click', () => {
    if (answer === quizQA[currentQuiz].correct) {
      score++;
    }
    else {
      decrementTimer(5000);
      updateTimerText(timerValue);
    }
  
    answer = null
    currentQuiz++;
  
    if (currentQuiz < quizQA.length) {
      loadQuiz();
    } else {
      stopQuiz();
    }
  })
// when start button press, start timer and bring up first question <== click event

// when user selects answer, determine if answer is correct, 
    // if incorrect, show correct answer and subtract 5 sec from timer
    // if correct, move on to next answer

// separate function to populate question


// when user answers last question or when time runs out, end game and save time 

// when finished, bring up initial page for submitting high score

// go to high score page







// // functions are for creating reusable blocks of code

// function someFunc() {
//     // code goes in here that I want to run at a certain time or reuse
// }

// for (let i = 0; i < array.length; i++) {
//     // code that you want to run as many times as necessary
    
// }

// if (condition === true) {
//     // code that happens if condition is true
// }

// // dom element event listener document.getElementById('someelement').addEventListener("click", function)


// // variable types
// // strings
// var myString = ""
// // integers
// var myInt = 10
// // booleans
// var myBool = false
// // arrays
// var myArr = ["a", "b", "c"] // array indexes start at 0, myArr[0] = "a"
// // objects
// var myObj = {
//     animal: "mouse",
//     household: "apartment",
//     animalType(){
//          console.log(this.animal)
//     }
// }
// // myObj[animal] = "mouse"

// function conLog() {
//     myObj.animalType()
// }

// myArr.push("d") // a method that adds "d" to the end of myArr

