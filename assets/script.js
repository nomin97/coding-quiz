// GIVEN I am taking a code quiz
// WHEN I click the start button
// THEN a timer starts and I am presented with a question
// WHEN I answer a question
// THEN I am presented with another question
// WHEN I answer a question incorrectly
// THEN time is subtracted from the clock
// WHEN all questions are answered or the timer reaches 0
// THEN the game is over
// WHEN the game is over
// THEN I can save my initials and score

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
