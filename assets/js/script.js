var questContainer = document.querySelector(".question-container");
var questStart = document.querySelector("#quest-start");
var questStartBtn = document.querySelector("#quest-start-btn");
var questMain = document.querySelector(".quest-main");
var quizList = document.querySelector("#quiz-list");
var questFeedback = document.querySelector(".quest-feedback-text")

var currentQuestion = 0;

const quizQuestions = ["Commonly used data types DO NOT include:", "The condition in an if / else statemant is enclosed with _______:", "Arrays in javascript can be used to store _______:", "String values must be enclosed within _______ when being assigned to variables:", "A very useful tool used during development and debugging for printing content to the debugger is:"]
const quizAnswers = [["1. strings", "2. booleans", "3. alerts", "4. numbers"], ["1. quotes", "2. curley brackets", "3. parentheses", "4. square brackets"], ["1. numbers and strings", "2. other arrays", "3. booleans", "4. all of the above"], ["1. commas", "2. curley brackets", "3. quotes", "4. parentheses"], ["1. javascript", "2. git/bash", "3. for loops", "4. console.log"]]
const correctAnswers = ["2", "3", "4", "3", "4"]

const state = {
    time: 70,
    timerInterval: 0
};

const controller = {
    decrement: function(t = 1) {
        state.time -= t
        if (state.time === 0) {
            clearInterval(state.timerInterval);
        };
        view.render();
    },
    init: function() {
        state.timerInterval = setInterval(controller.decrement, 1000);
        view.render();
    }
};

const view = {
    timerComponent: function () {return `<h3 class="timer">Time: ${state.time}</h3>`},
    headerComponent: document.querySelector("#timer"),
    render: function() {
        view.headerComponent.innerHTML = view.timerComponent();
    }
};

var quizStart = function() {
    questStart.textContent = "Try to answer the following code questions within the time limit. Keep in mind that wrong answers will penalize your score/time by 10 seconds!"
    questStartBtn.textContent = "Start Quiz"
};

var quizQuest = function() {
    questStartBtn.remove();
    createQuizQuest();
    controller.init();
}

var nextQuest = function() {
    quizQuestLi.remove();
}

var createQuizQuest = function() {
    for (var i = 0; i < quizAnswers[0].length; i++) {
        console.log(quizAnswers[currentQuestion][i]);
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

var checkAnswers = function() {

    var i = 0;

    var answer = this.getAttribute('data-id')
    if (answer !== correctAnswers[i]) {
        state.time -= 10;
        questFeedback.textContent = "Wrong!"
    }
    else {
        questFeedback.textContent = "Correct!"
    }

    i++

    createQuizQuest();
}
    
    



quizStart();

questStartBtn.addEventListener("click", quizQuest);
 



    
