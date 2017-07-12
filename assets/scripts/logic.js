$(document).ready(() => {
    var game = new Game(quizJson.quiz1);
    var choiceElements = $("[id^=choice]").get();
    var selectedElement = null;
    var defaultColor = "white";
    var selectedColor = "gray";

    resetColors();
    updateQuiz();

    $(choiceElements).click(e => {
        resetColors();
        selectedElement = $(e.currentTarget).css("background", selectedColor);
    });

    //next button click handler
    $("#nextButton").click(() => {
        //If no answer is selected
        if (selectedElement === null) {
            alert("Please select an answer");
            return;
        }

        game.nextQuestion();
        $("#questionsLeft").html(game.questionsLeft);
        updateQuiz();
        resetColors();
        selectedElement = null;
    });
    
    //updates the quiz html
    function updateQuiz() {
        //populate question element
        var question = $("#question");
        question.html(game.question);

        //populate questions left element
        $("#questionsLeft").html(game.questionsLeft);

        //calculate percentage

        //popuate the answer choices elements
        var answerChoiceIndex = 0;
        for (var i = 0; i < choiceElements.length; i++) {
            var element = $(choiceElements[i]);
            element.html(game.answers[answerChoiceIndex++]);
        }
    }

    function resetColors() {
        $(choiceElements).css("background", defaultColor);
    }
});

//pass in quiz 1, 2 etc
function Game(quiz) {
    this.quiz = quiz;
    this.index = 0;
    this.question = this.quiz[this.index].question;
    this.answers = this.quiz[this.index].answers;
    this.correctAnswer = this.quiz[this.index].correctAnswer;
    this.questionsLeft = --this.quiz.length;

    this.nextQuestion = () => {
        this.index++;
        this.questionsLeft--;
        this.question = this.quiz[this.index].question;
        this.answers = this.quiz[this.index].answers;
        this.correctAnswer = this.quiz[this.index].correctAnswer;
    }
}

//make a constructor
var timer = {
    start: () => {

    },
    stop: () => {

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