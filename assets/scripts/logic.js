$(document).ready(function() {
    
});

//pass in quiz 1, 2 etc
function gameConstructor(quiz) {
    this.quiz = quiz;
    this.index = 0;
    this.question = this.quiz[this.index].question;
    this.answers = this.quiz[this.index].answers;
    this.correctAnswer = this.quiz[this.index].correctAnswer;
    this.nextQuestion = () => {
        this.index++;
        this.question = this.quiz[this.index].question;
        this.answers = this.quiz[this.index].answers;
        this.correctAnswer = this.quiz[this.index].correctAnswer;
    }
}

var quizJson = {
    "quiz1": [{
            "questionNumber": 1,
            "question": "What is 1 + 1?",
            "answers": ["1", "4", "3", "2"],
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
            "answers": ["1", "9", "2", "8"],
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

var timer = {
    start: () => {},
    stop: () => {

    }
}