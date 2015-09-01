
// Get location from query string using location search
// Get all questions from localStorage and filter into selected quiz variable
var quiz = decodeURIComponent(location.search.split('=')[1]);
var questions = JSON.parse(localStorage.getItem('quiz'));
var selectedQuiz = questions.filter(function (e){
   return e.name ===  quiz;
});

// Display user greeting when the user signs in.
(function () {
    var welcome = document.getElementById('welcome');
    var userName = JSON.parse(localStorage.user);
    welcome.innerHTML = ("Welcome, " + userName)
})();


function QuizController(questions) {
    this.name = document.getElementById("qN");
    this.questionName = document.getElementById("questionText");
    this.uiChoicesElements = [
        document.getElementById("c-1"),
        document.getElementById("c-2"),
        document.getElementById("c-3"),
        document.getElementById("c-4")
    ];
    this.progressButton = document.getElementById("btn-next");
    this.backButton = document.getElementById("btn-back");
    this.returnHomeButton = document.getElementById("btn-home");
    this.quizForm = document.getElementById("qform");
    this.finalScore = document.getElementById("scoreCard");
    this.msg = document.getElementById("msg");
    this.currentQuestionIndex = 0;
    this.questions = questions;
    this.answersQuestionMap = {};
    this.registerListeners();
    this.init();
}

QuizController.prototype.init = function () {
    //Initializes the quiz with the first object in the quiz array.

    this.returnHomeButton.style.display = "none";
    this.finalScore.style.display = "none";
    this.resetUi();

    var question = this.questions[this.currentQuestionIndex];
    var questionCount =  "Quiz Question " + (this.currentQuestionIndex + 1) + " of " + this.questions.length;
    this.name.innerHTML = question.name + '<span>' + questionCount + '</span><br/>';
    this.questionName.innerHTML = question.question;

    for (var i in this.uiChoicesElements) {
        var uiChoice = this.uiChoicesElements[i];
        uiChoice.innerHTML = question.choice[i];
        uiChoice.value = i;
    }

    if (this.currentQuestionIndex === 0){
        this.backButton.style.display = 'none';
    } else {
        this.backButton.style.display = 'initial';
    }

    // Changes next button value to done on final question
    if(this.currentQuestionIndex < this.questions.length - 1) {
        return this.progressButton.value = "Next";
    }
    if (this.currentQuestionIndex == this.questions.length - 1) {
          return this.progressButton.value = "Done";
    }
};

QuizController.prototype.registerListeners = function () {
  this.progressButton.addEventListener('click', this.progressQuiz.bind(this));
  this.backButton.addEventListener('click', this.previousQuestion.bind(this));
  this.returnHomeButton.addEventListener('click', this.return.bind(this));
};

QuizController.prototype.progressQuiz = function () {
    var answer = this.getAnswer();

    // Check if an answer was given.
        if (!answer) {
            this.msg.innerHTML = '<span style="background-color: yellow"> Please give an answer! </span><br/><br/>';
            return false;
        }
        this.msg.innerHTML ="";

    // what was the answer selected?
    // record if the answer was correct or not.
    // move to the next question in the list.
    if (this.currentQuestionIndex + 1 >= this.questions.length) {
        if (!this.answersQuestionMap.hasOwnProperty(this.currentQuestionIndex)) {
            this.answersQuestionMap[this.currentQuestionIndex] = answer;
        }
        return this.done();
    }

    this.answersQuestionMap[this.currentQuestionIndex] = answer;
    this.currentQuestionIndex++;
    this.init();
    answer = this.answersQuestionMap[this.currentQuestionIndex];
    if(answer === undefined){
        return null
    }
    var radios = this.quizForm.elements['choices'];
        var uiChoice = radios[answer];
        uiChoice.checked = true;
};


QuizController.prototype.previousQuestion = function(){
    //returns the previous question
    //If the user answered the previous question. It remains checked.
    this.currentQuestionIndex--;
    var answer = this.answersQuestionMap[this.currentQuestionIndex];
    this.init();
    var radios = this.quizForm.elements['choices'];
        var uiChoice = radios[answer];
        uiChoice.checked = true;
};


QuizController.prototype.getAnswer = function () {
    // Get the user selected choice
    var radios = this.quizForm.elements['choices'];
    for (var i in radios) {
        var uiChoice = radios[i];
        if (uiChoice.checked) {
            return this.uiChoicesElements[i].value;
        }
    }
    return null;
};


QuizController.prototype.done = function () {
    this.resetUi();
    // hide question
    // shows div
    this.grade();
    this.quizForm.style.display = 'none';
    this.msg.innerHTML = '<span>This quiz is complete!!</span><br/><br/>';
    this.returnHomeButton.style.display = "initial";
    this.finalScore.style.display = "block";
};



/*
  Grades the quiz.
  @returns {{total: number}} score and percentage
 */
QuizController.prototype.grade = function () {
    var score;
    var percentage;
    var reportCard = {total: 0};
    for (var i in this.questions) {
        var question = this.questions[i];
        var answer = this.answersQuestionMap[i];
        if (+question.correctAnswer === +answer) {
            reportCard[i] = 1;
            reportCard.total++;
            continue;
        }
        reportCard[i] = 0;
    }
    score = reportCard.total + "/" + this.questions.length;
    percentage = Math.round((reportCard.total/this.questions.length)*100);
    this.finalScore.innerHTML = score + " | " + percentage +"%";
    return reportCard;
};


QuizController.prototype.resetUi = function () {
    // reset radio buttons checked to false when progressing to the next question
        var radios = this.quizForm.elements['choices'];
        for (var i in radios) {
            var uiChoice = radios[i];
            uiChoice.checked = false;
        }
};


QuizController.prototype.return = function () {
    //Return to home page
    window.location = "index.html";
};


new QuizController(selectedQuiz);
