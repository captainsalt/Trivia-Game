$(document).ready(() => {
    var game = new Game(quizJson.quiz1);
    var choiceElements = $("[id^=choice]").get();
    var selectedElement = null;
    var defaultColor = "white";
    var selectedColor = "black";

    populateQuiz();

    $(choiceElements).click(e => {
        resetColors();
        selectedElement = $(e.currentTarget).css("background", selectedColor);
    });

    function resetColors() {
        $(choiceElements).css("background", defaultColor);
    }

    //next button handler
    $("#nextButton").click(() => {
        if (selectedElement === null) {
            alert("Please select an answer");
            return;
        }

        game.nextQuestion();
        //relect the change to questions left
        $("#questionsLeft").html(game.questionsLeft);
        populateQuiz();
        resetColors();
        selectedElement = null;
    });

    //populates the quiz html
    function populateQuiz() {
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
});

//pass in quiz 1, 2 etc
function Game(quiz) {
    this.quiz = quiz;
    this.index = 0;
    this.question = this.quiz[this.index].question;
    this.answers = this.quiz[this.index].answers;
    this.correctAnswer = this.quiz[this.index].correctAnswer;
    this.questionsLeft = this.quiz.length;

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
            "questionNumber": 1,
            "question": "What is 1 + 1?",
            "answers": ["2", "4", "3", "1"],
            "correctAnswer": "2"
        },
        {
            "questionNumber": 2,
            "question": "What is 2 + 2?",
            "answers": ["1", "2", "8", "4"],
            "correctAnswer": "4"
        },
        {
            "questionNumber": 3,
            "question": "What is 7 * 3?",
            "answers": ["10", "21", "30", "17"],
            "correctAnswer": "21"
        },
        {
            "questionNumber": 4,
            "question": "What is 6/2(1+2)?",
            "answers": ["1", "2", "9", "8"],
            "correctAnswer": "9"
        },
        {
            "questionNumber": 5,
            "question": "What is 10 * 2(5 * (5 + 1))?",
            "answers": ["520", "600", "521", "530"],
            "correctAnswer": "600"
        }
    ],

    "quiz2": [{

    }]
}