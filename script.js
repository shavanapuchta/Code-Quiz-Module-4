// Questions for the quiz.
var questions = [
    {
        question: "What does 'var' mean in javascript?",
        choices: ["Data", "Object", "Operator", "Variable"],
        answer: "Variable"
    },
    {
        question: "Which programming language is used for web development?",
        choices: ["Java", "Python", "JavaScript", "C++"],
        answer: "JavaScript"
    },
    {
        question: "Which of the following is not a Logical Operator in Javascript?",
        choices: ["&&", "||", "!", "const"],
        answer: "const"
    },
    {
        question: "Which of the following is not a Comparison Operator in Javascript?",
        choices: ["==", "!=", ">", "&&"],
        answer: "&&"
    }
];
var currentQuestionIndex = 0;
var timer;
var timeLeft = 60;
var score = 0;
var startButton = document.getElementById("start-button");
var questionElement = document.getElementById("question");
var choicesElement = document.getElementById("choices");
var resultElement = document.getElementById("result");
var timerElement = document.getElementById("timer");
var scoreElement = document.getElementById("score");


//Function to start the quiz and display questions with time left.
function startQuiz() {
    startButton.style.display = "none";
    resultElement.innerHTML = "";
    timerElement.textContent = "Time: " + timeLeft;
    scoreElement.textContent = "Score: " + score;
    // Start the timer
    timer = setInterval(function () {
        timeLeft--;
        timerElement.textContent = "Time: " + timeLeft;
        if (timeLeft <= 0) {
            endQuiz();
        }
    }, 1000);
    showQuestion();
}
// function for showing the next question
function showQuestion() {
    var currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    choicesElement.innerHTML = "";
    for (var i = 0; i < currentQuestion.choices.length; i++) {
        var choice = document.createElement("button");
        choice.textContent = currentQuestion.choices[i];
        choice.addEventListener("click", checkAnswer);
        choicesElement.appendChild(choice);
    }
}
// function for ensuring the answer is correct. if not correct, deducts time.
function checkAnswer(event) {
    var selectedChoice = event.target;
    var selectedAnswer = selectedChoice.textContent;
    var currentQuestion = questions[currentQuestionIndex];
    if (selectedAnswer === currentQuestion.answer) {
        score++;
        resultElement.textContent = "Correct!";
    } else {
        timeLeft -= 10;
        resultElement.textContent = "Incorrect!";
    }
    currentQuestionIndex++;
    if (currentQuestionIndex === questions.length) {
        endQuiz();
    } else {
        showQuestion();
    }
}
// function that allows user to enter their initials after completing the quiz to save their score and includes the ability to restart the quiz.
function endQuiz() {
    clearInterval(timer);
    timerElement.textContent = "";
    questionElement.textContent = "Quiz Over!";
    choicesElement.innerHTML = "";
    resultElement.innerHTML = "Final Score: " + score;


    var initials = prompt("Enter your initials:");
    var playerScore = {
        initials: initials,
        score: score
    };
    highScores.push(playerScore);

    var restartButton = document.getElementById("restart-button");
    restartButton.style.display = "block"; // Show the restart button

    restartButton.addEventListener("click", function() {
        currentQuestionIndex = 0;
        timeLeft = 60;
        score = 0;
        restartButton.style.display = "none"; // Hide the restart button
        startQuiz();
    });

    localStorage.setItem("highscores", JSON.stringify(highScores));   
}

startButton.addEventListener("click", startQuiz);
