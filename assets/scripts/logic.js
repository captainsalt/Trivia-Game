﻿$(document).ready(() => {
    var game;
    var choiceElements = $("[id^=choice]").get();
    var selectedElement = null;
    //Element colors
    var defaultColor = "white";
    var selectedColor = "gray";
    var correctColor = "green";
    var wrongColor = "red";

    startNewGame();

    //Change background of selected answer and set it to selected element
    $(choiceElements).click(e => {
        //Return if user already selected an answer and hit confirm
        if ($("#confirmButton").prop("disabled"))
            return;

        resetColors();
        selectedElement = $(e.currentTarget).css("background", selectedColor);
    });

    $("#confirmButton").click(() => {
        // If no answer is selected
        if (selectedElement === null) {
            alert("Please select an answer");
            return;
        }

        checkAnswer();
    });

    $("#nextButton").click(() => {
        // if there 's no more questions left
        if (game.questionsLeft === 0) {
            var statsString = "";
            statsString += game.correct + " out of " + game.quiz.length + "\n";
            statsString += Math.round(game.correct / game.quiz.length * 100) + "% correct";

            alert(statsString);
            startNewGame();
            return;
        }

        nextQuestion();
        $("#confirmButton").prop("disabled", false);
        $("#nextButton").prop("disabled", true);
    });

    function checkAnswer() {
        var correct = choiceElements.filter(e => $(e).html() == game.correctAnswer)[0];
        //highlight the correct answer with the correct color
        $(correct).css("background", correctColor);

        //If your answer was wrong, highlight it with the wrong color
        if ($(correct).html() != $(selectedElement).html()) {
            $(selectedElement).css("background", wrongColor);
            game.wrong++;
        } else
            game.correct++;

        $("#nextButton").prop("disabled", false);
        $("#confirmButton").prop("disabled", true);
    }

    function updateQuiz() {
        //populate question element
        var question = $("#question");
        question.html(game.question);

        //populate questions left element
        $("#questionsLeft").html(game.questionsLeft);

        //update percentage
        var percentage = Math.round(game.correct / game.numberOfquestionsAsked * 100);
        var displayPercent = isNaN(percentage) ? 0 : percentage;
        $("#percentage").html(displayPercent + "%");

        //popuate the answer choices elements
        var answerChoiceIndex = 0;
        for (var i = 0; i < choiceElements.length; i++) {
            var element = $(choiceElements[i]);
            element.html(game.answers[answerChoiceIndex++]);
        }
    }

    //after I add more quizzes randomize
    function randomQuiz() {
        var quizzes = [quizJson.quiz1];
        return quizzes[0];
    }

    function startNewGame() {
        game = new Game(randomQuiz());
        resetColors();
        updateQuiz();
        $("#nextButton").prop("disabled", true);
    }

    function nextQuestion() {
        game.nextQuestion();
        $("#questionsLeft").html(game.questionsLeft);
        updateQuiz();
        resetColors();
        selectedElement = null;
    }

    function resetColors() {
        $(choiceElements).css("background", defaultColor);
    }
});

function Game(quiz) {
    this.quiz = quiz;
    this.index = 0;
    this.question = this.quiz[this.index].question;
    this.answers = this.quiz[this.index].answers;
    this.correctAnswer = this.quiz[this.index].correctAnswer;
    this.questionsLeft = this.quiz.length - 1;
    this.correct = 0;
    this.wrong = 0;
    this.numberOfquestionsAsked = 0;

    this.nextQuestion = () => {
        this.index++;
        this.numberOfquestionsAsked++;
        this.questionsLeft--;
        this.question = this.quiz[this.index].question;
        this.answers = this.quiz[this.index].answers;
        this.correctAnswer = this.quiz[this.index].correctAnswer;
    }
}

//make a constructor
function Timer(interval) {
    
}

var quizJson = {
    "quiz1": [{
            "question": "What is 1 + 1?",
            "answers": ["2", "4", "3", "1"],
            "correctAnswer": "2"
        },
        {
            "question": "What is 2 + 2?",
            "answers": ["1", "2", "8", "4"],
            "correctAnswer": "4"
        },
        {
            "question": "What is 7 * 3?",
            "answers": ["10", "21", "30", "17"],
            "correctAnswer": "21"
        },
        {
            "question": "What is 6/2(1+2)?",
            "answers": ["1", "2", "9", "8"],
            "correctAnswer": "9"
        },
        {
            "question": "What is 10 * 2(5 * (5 + 1))?",
            "answers": ["520", "600", "521", "530"],
            "correctAnswer": "600"
        },
    ],

    "quiz2": [{

    }]
}