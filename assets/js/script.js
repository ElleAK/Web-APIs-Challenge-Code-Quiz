//start quiz
const startButton = document.getElementById("start-btn")
const questionContainerEl = document.getElementById
("quiz-container")

startButton.addEventListener("click", startGame)

function startGame() {
    console.log("started");
    startButton.classList.add("hide");
    questionContainerEl.classList.remove("hide");
    displayQuestion();
}

//quiz class
class Quiz {
    constructor(questions) {
        this.score = 0;
        this.questions = questions;
        this.questionIndex = 0;
    }

    getQuestionIndex() {
        return this.questions[this.questionIndex];
    }

    guess(answer) {
        if (this.getQuestionIndex().isCorrectAnswer(answer)) {
            this.score++;
        }
        this.questionIndex++;
    }
    isEnded() {
        return this.questionIndex === this.questions.length;
    }
}
// create question class
class Question {
    constructor(text, choices, answer) {
        this.text = text;
        this.choices = choices;
        this.answer = answer;
    }

    isCorrectAnswer(choice) {
        return this.answer === choice;
    }
};

// display question
function displayQuestion() {
    if (quiz.isEnded()) {
        showScores();
    }else{
//show next question
        let questionEl = document.getElementById("questions");
        questionEl.innerHTML = quiz.getQuestionIndex().text;

        //show options
        let choices = quiz.getQuestionIndex().choices;
        for (let i = 0; i < choices.length; i++){
            let choiceEl = document.getElementById("choice" + i);
            choiceEl.innerHTML = choices[i];
            guess("btn" + i, choices[i]);
        }

        showProgress();
    }
};
//guess function
function guess(id, guess) {
    let button = document.getElementById(id);
    button.onclick = function() {
        quiz.guess(guess);
        displayQuestion();
    }
};
// show quiz progress
function showProgress() {
    let currentQuestionNumber = quiz.questionIndex + 1;
    let progressEl = document.getElementById("progress");
    progressEl.innerHTML = 
    `Question ${currentQuestionNumber} of ${quiz.questions.length}`;
};

// show score
function showScores() {
    let quizEndHTML = 
    `
    <h1> Quiz Completed</h1>
    <h2 id="score">Your Score: ${quiz.score} of ${quiz.questions.length}</h2>
    <div class="quiz-repeat">
    <a href="index.html">Take Quiz Again</a>
    </div>
    `;
    let quizEl = document.getElementById("quiz");
    quizEl.innerHTML = quizEndHTML;
};

//quiz questions
let questions = [
    new Question(
        "Which statement cannot be used to declare a variable in JavaScript?", 
        ["var", "int","let", "const"], "int"
    ),
    new Question(
        "Which of the following is block scoped?", 
        ["var", "let", "get", "Both 2 and 3"], "let"
        
    ),
    new Question(
        "Which of the following is an array method?",
        ["map", "filter", "reduce", "all of the above"], "all of the above"
        
    ),
];

let quiz = new Quiz(questions);

//display question
displayQuestion();

//countdown
let time = 2;
let quizTimeInMinutes = time * 60 * 60;
quizTime = quizTimeInMinutes / 60;

let counting = document.getElementById("countdown");
function startCountdown() {
    let quizTimer = setInterval(function() {
        if(quizTime <=0) {
            clearInterval(quizTimer);
            showScores();

        }else{
            quizTime--;
            let sec = Math.floor(quizTime % 60);
            let min = Math.floor(quizTime / 60)% 60;
            counting.innerHTML = `TIME: ${min}:${sec}`;
        }
    }, 1000)
};

startCountdown();