var questContainer = document.querySelector(".question-container");
var questStart = document.querySelector("#quest-start");
var questStartBtn = document.querySelector("#quest-start-btn");
var questMain = document.querySelector(".quest-main");
var quizList = document.querySelector("#quiz-list");
var questFeedback = document.querySelector(".quest-feedback-text")
var highScoreBtn = document.querySelector(".high-score")


var currentQuestion = 0;
var correctAnswerIndex = 0;

var score = [];

const quizQuestions = ["Commonly used data types DO NOT include:", "The condition in an if / else statemant is enclosed with _______:", "Arrays in javascript can be used to store _______:", "String values must be enclosed within _______ when being assigned to variables:", "A very useful tool used during development and debugging for printing content to the debugger is:"]
const quizAnswers = [["1. strings", "2. booleans", "3. alerts", "4. numbers"], ["1. quotes", "2. curley brackets", "3. parentheses", "4. square brackets"], ["1. numbers and strings", "2. other arrays", "3. booleans", "4. all of the above"], ["1. commas", "2. curley brackets", "3. quotes", "4. parentheses"], ["1. javascript", "2. git/bash", "3. for loops", "4. console.log"]]
const correctAnswers = ["2", "2", "3", "2", "3"]

const state = {
    time: 70,
    timerInterval: 0
};

const controller = {
    decrement: function (t = 1) {
        state.time -= t
        if (state.time === 0) {
            clearInterval(state.timerInterval);
        };
        view.render();
    },
    init: function () {
        state.timerInterval = setInterval(controller.decrement, 1000);
        view.render();
    }
};

const view = {
    timerComponent: function () { return `<h3 class="timer">Time: ${state.time}</h3>` },
    headerComponent: document.querySelector("#timer"),
    render: function () {
        view.headerComponent.innerHTML = view.timerComponent();
    }
};



var quizStart = function () {
    questStart.textContent = "Try to answer the following code questions within the time limit. Keep in mind that wrong answers will penalize your score/time by 10 seconds!"
    questStartBtn.textContent = "Start Quiz"
};

var quizQuest = function () {
    questStartBtn.remove();
    createQuizQuest();
    controller.init();
}

var createQuizQuest = function () {
    quizList.innerHTML = "";
    for (var i = 0; i < quizAnswers[0].length; i++) {
        var quizQuestLi = document.createElement("li");
        quizQuestLi.setAttribute("data-id", i);
        quizQuestLi.className = "quiz-question-li";
        quizQuestLi.textContent = quizAnswers[currentQuestion][i];
        quizQuestLi.addEventListener("click", checkAnswers);
        quizList.appendChild(quizQuestLi);
    }
    questMain.textContent = quizQuestions[currentQuestion]

    currentQuestion++
}

var checkAnswers = function () {

    var answer = this.getAttribute('data-id')
    if (answer !== correctAnswers[correctAnswerIndex]) {
        state.time -= 10;
        questFeedback.textContent = "Wrong!"
    }
    else {
        questFeedback.textContent = "Correct!"
    }

    if (correctAnswerIndex === 4) {
        clearInterval(state.timerInterval);
        enterInitals();

    }
    else {
        createQuizQuest();
    }

    correctAnswerIndex++
}

var enterInitals = function (event) {


    quizList.innerHTML = ''
    questMain.innerHTML = ''
    questFeedback.innerHTML = 'Enter your Initials to save your high score!'

    var initialsForm = document.createElement("form")

    questContainer.appendChild(initialsForm)

    var initialsContainer = document.createElement("div")

    initialsForm.appendChild(initialsContainer)

    var initialsLabel = document.createElement("label")
    initialsLabel.setAttribute("for", "initialInput")

    var initialsInput = document.createElement("input")
    initialsInput.setAttribute("type", "text")
    initialsInput.setAttribute("id", "initialsInput")
    initialsInput.className = "initial-input"

    initialsContainer.appendChild(initialsInput)

    var initialsBtn = document.createElement("input")
    initialsBtn.className = "initial-btn"
    initialsBtn.textContent = "Submit"
    initialsBtn.setAttribute("type", "submit")

    initialsContainer.appendChild(initialsBtn)



    initialsContainer.addEventListener("click", function (event) {
        event.preventDefault();
        if (event.target === initialsBtn) {

            saveHighScore(initialsInput.value);
        }
    })
}

var saveHighScore = function (initValue) {

    if (localStorage.getItem('score') === null) {
        var scoreObj = {
            initials: initValue,
            score: state.time
        }
        score.push(scoreObj)
        localStorage.setItem("score", JSON.stringify(score))
    }
    else {
        score = localStorage.getItem('score')

        score = JSON.parse(score)

        var scoreObj = {
            initials: initValue,
            score: state.time
        }
        score.push(scoreObj)
        localStorage.setItem("score", JSON.stringify(score))
    }

    viewHighScores();
}

var viewHighScores = function (event) {
    questContainer.innerHTML = '';
    questFeedback.innerHTML = 'High Scores!';

    score = localStorage.getItem("score");

    score = JSON.parse(score);

    var scoreList = document.createElement("ol")
    scoreList.className = "score-list"
    questContainer.appendChild(scoreList)

    var returnToQuiz = document.createElement("p")
    returnToQuiz.textContent = "Refresh to Return to Quiz!"
    returnToQuiz.className = "return-quiz"
    questContainer.appendChild(returnToQuiz)
    

    for (var i = 0; i < score.length; i++) {

        var scoreListEl = document.createElement("li")
        scoreListEl.className = "score-list-el"
        scoreListEl.innerHTML = "<h3 class='score-list-text'>" + score[i].initials + " " + score[i].score + "</h3>";
        scoreList.appendChild(scoreListEl)
    }
}


quizStart();

questStartBtn.addEventListener("click", quizQuest);

highScoreBtn.addEventListener("click", viewHighScores);

;