$(document).ready(() => {
    var game;
    var choiceElements = $("[id^=choice]").get();
    var selectedElement = null;
    var questionTime;
    var timer = new Timer();

    //colors
    var defaultColor = "white";
    var selectedColor = "#999";
    var correctColor = "#b3ffb3";
    var wrongColor = "#ff8080";
    var hoverColor = "#e6e6e6";

    startNewGame();
    //hook into button click and hover events
    hookIntoEvents();

    function checkAnswer() {
        var correctAnswer = $(choiceElements.filter(e => $(e).html() === game.correctAnswer)[0]);

        //highlight the correct answer with the correct color
        correctAnswer.css("background", correctColor);

        if (correctAnswer.html() != $(selectedElement).html() || //if the answer is wrong
            selectedElement == null) { // if user didn't select an answer in time
            //highlight the wrong answer user selected
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
        $("#question").html(game.question);

        //populate questions left element
        $("#questionsLeft").html(game.questionsLeft);

        //update percentage
        var percentage = Math.round(game.correct / (game.correct + game.wrong) * 100);
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
        if ($("#confirmButton").prop("disabled")) // if the confirm button is disabled
            return true;
        else
            return false;
    }

    function startNewGame() {
        game = new Game(randomQuiz());
        resetColors();
        updateQuiz();
        startCountdown(game.questionTime);

        $("#nextButton")
            .prop("disabled", true)
            .html("Next Question");
        $("#confirmButton").prop("disabled", false)

        function randomQuiz() {
            var quizzes = [quizJson.quiz1];
            var randomIndex = Math.floor(Math.random() * quizzes.length);

            return quizzes[randomIndex];
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

    function startCountdown(time) {
        var timerElement = $("#timer");
        questionTime = time;

        //update the timerElement to show the question time
        timerElement.html(questionTime);

        timer.Tick = () => {
            $("#timer").html(--questionTime);

            if (questionTime === 0) { // if time runs out
                //Erase the selected answer if the user didn't confirm
                selectedElement = null;
                resetColors();

                stopCountdown();
                checkAnswer();
            }
        }
        timer.Start();
    }

    function stopCountdown() {
        timer.Stop();
    }

    function hookIntoEvents() {
        //set selected element to clicked element and change color
        $(choiceElements).click(e => {
            if (answerConfirmed())
                return;

            resetColors();
            selectedElement = $(e.currentTarget).css("background", selectedColor);
        });

        //Confirm button click
        $("#confirmButton").click(() => {
            if (selectedElement === null) {
                alert("Please select an answer");
                return;
            }

            stopCountdown();
            checkAnswer();
        });

        //Next button click
        $("#nextButton").click((e) => {
            if (game.questionsLeft === 0) {
                var statsString = "";
                statsString += game.correct + " out of " + game.quiz.length + "\n";
                statsString += Math.round(game.correct / game.quiz.length * 100) + "% correct\n";
                statsString += "Hit OK to play again";

                alert(statsString);
                startNewGame();
                return;
            }

            if (game.questionsLeft === 1)
                $(e.currentTarget).html("Show Results");

            nextQuestion();
            startCountdown(game.questionTime);
            $("#confirmButton").prop("disabled", false);
            $("#nextButton").prop("disabled", true);
        });

        //Mouse enters an answer
        $(choiceElements).mouseenter(e => {
            if (answerConfirmed() ||
                ($(e.currentTarget).attr("id") === $(selectedElement).attr("id"))) //If mouse enters selected answer
                return;

            $(e.currentTarget).css("background", hoverColor);
        });

        //Mouse leaves an answer
        $(choiceElements).mouseleave(e => {
            if (answerConfirmed() ||
                ($(e.currentTarget).attr("id") === $(selectedElement).attr("id"))) //If mouse leaves selected answer
                return;

            $(e.currentTarget).css("background", defaultColor);
        });
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
    this.questionTime = (this.quiz[this.index].questionTime == null) ? 10 : this.quiz[this.index].questionTime;

    this.nextQuestion = () => {
        this.index++;
        this.questionsLeft--;
        this.question = this.quiz[this.index].question;
        this.answers = this.quiz[this.index].answers;
        this.correctAnswer = this.quiz[this.index].correctAnswer;
        this.questionTime = (this.quiz[this.index].questionTime == null) ? 10 : this.quiz[this.index].questionTime;
    }
}

// Declaring class "Timer"
function Timer() {
    // Property: Frequency of elapse event of the timer in millisecond
    this.Interval = 1000;

    // Property: Whether the timer is enable or not
    this.Enable = false;

    // Event: Timer tick
    this.Tick = null;

    // Member variable: Hold interval id of the timer
    var timerId = 0;

    // Member variable: Hold instance of this class
    var thisObject;

    // Function: Start the timer
    this.Start = function() {
        this.Enable = true;

        thisObject = this;
        if (thisObject.Enable)
            thisObject.timerId = setInterval(() => thisObject.Tick(), thisObject.Interval);
    };

    // Function: Stops the timer
    this.Stop = function() {
        thisObject.Enable = false;
        clearInterval(thisObject.timerId);
    };
};

var quizJson = {
    "quiz1": [{
            "question": "What is 1 + 1?",
            "answers": ["2", "4", "3", "1"],
            "correctAnswer": "2",
            "questionTime": "7"
        },
        {
            "question": "What is 2 + 2?",
            "answers": ["1", "2", "8", "4"],
            "correctAnswer": "4",
            "questionTime": "7"
        },
        {
            "question": "What is 7 * 3?",
            "answers": ["10", "21", "30", "17"],
            "correctAnswer": "21",
            "questionTime": "7"
        },
        {
            "question": "What is 6/2(1+2)?",
            "answers": ["1", "2", "9", "8"],
            "correctAnswer": "9",
        },
        {
            "question": "What is 10 * 2(5 * (5 + 1))?",
            "answers": ["520", "600", "521", "530"],
            "correctAnswer": "600",
            "questionTime": "30"
        },
    ],

    "quiz2": [{

    }]
}