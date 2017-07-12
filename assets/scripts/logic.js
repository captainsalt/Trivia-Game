$(document).ready(() => {
    var game;
    var choiceElements = $("[id^=choice]").get();
    var selectedElement = null;

    //colors
    var defaultColor = "white";
    var selectedColor = "#bfbfbf";
    var correctColor = "#009900";
    var wrongColor = "#e60000";
    var hoverColor = "#e6e6e6";

    startNewGame();

    //set selected element to clicked element and change color
    $(choiceElements).click(e => {
        if (answerConfirmed())
            return;

        resetColors();
        selectedElement = $(e.currentTarget).css("background", selectedColor);
    });

    $("#confirmButton").click(() => {
        if (selectedElement === null) {
            alert("Please select an answer");
            return;
        }

        checkAnswer();
    });

    $("#nextButton").click(() => {
        if (game.questionsLeft === 0) {
            var statsString = "";
            statsString += game.correct + " out of " + game.quiz.length + "\n";
            statsString += Math.round(game.correct / game.quiz.length * 100) + "% correct\n";
            statsString += "Hit OK to play again";

            alert(statsString);
            startNewGame();
            return;
        }

        nextQuestion();
        $("#confirmButton").prop("disabled", false);
        $("#nextButton").prop("disabled", true);
    });

    //Hover logic
    $(choiceElements).mouseenter(e => {
        if (answerConfirmed())
            return;

        //ignore the selected element
        if ($(e.currentTarget).attr("id") == $(selectedElement).attr("id"))
            return;

        $(e.currentTarget).css("background", hoverColor);
    });

    //reset background after mouse leaves
    $(choiceElements).mouseleave(e => {
        if (answerConfirmed())
            return;

        //ignore the selected element
        if ($(e.currentTarget).attr("id") == $(selectedElement).attr("id"))
            return;

        $(e.currentTarget).css("background", defaultColor);
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

    //populates the quiz 
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
            var choice = $(choiceElements[i]);
            choice.html(game.answers[answerChoiceIndex++]);
        }
    }

    // checks if the confirm button was pressed
    function answerConfirmed() {
        if ($("#confirmButton").prop("disabled"))
            return true;
        else
            return false;
    }

    //after I add more quizzes randomize
    function startNewGame() {
        game = new Game(randomQuiz());
        resetColors();
        updateQuiz();
        $("#nextButton").prop("disabled", true);

        function randomQuiz() {
            var quizzes = [quizJson.quiz1];
            return quizzes[0];
        }
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