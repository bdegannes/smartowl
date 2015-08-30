/**
 * Created by blainedegannes on 8/5/15.
 */
var smartOwlQuizzes = [];
var quiz;
var quizNamed = document.getElementById("name_input");
var theQuestion = document.getElementById("question_input");
var choice = [];
var correctAns = document.getElementById("answer_input");
var createQuizForm = document.getElementById("creator");

document.getElementById("btn-addQuestion").addEventListener("click", createQuiz);
// TODO
// Finish button displays name of Quiz # of questions and a custom url
// if you want to send it to someone to take the quiz.


// Quizz object constructor
function Question(name, question, choice, correctAnswer) {
    this.name = name;
    this.question = question;
    this.choice = choice;
    this.correctAnswer = correctAnswer;
    this.regListeners();
    this.getAnswerIndex();
    this.feed();
}


Question.prototype.getAnswerIndex = function() {
    //takes the value input for answer from the form and returns the index from choices.
    var multipleChoice = this.choice.join('|').toLowerCase().split('|');
    var theAnswer = this.correctAnswer.toLowerCase();
    this.correctAnswer =  multipleChoice.indexOf(theAnswer);
    return this.correctAnswer;
};


Question.prototype.regListeners = function () {
    document.getElementById("btn-finish").addEventListener("click", this.finish);
};


function createQuiz() {

    for (var i=0; i<4; i++) {
        choice[i] = document.getElementById("choice-" + i).value;

        if (choice[i].length == 0)
            return false;
    }
    // New quiz object that stores inputs from quiz creation form
    quiz = new Question(quizNamed.value, theQuestion.value, choice, correctAns.value);

    // pushes quiz to array
    smartOwlQuizzes.push(quiz);
    console.log(smartOwlQuizzes);
    resetQuizForm();

    //var theQuiz = JSON.stringify(smartOwlQuizzes);
    //console.log(theQuiz);

    return smartOwlQuizzes;
}


function resetQuizForm(){
    // resets to a blank form
    quizNamed.value = "";
    theQuestion.value = "";
    for (var i=0; i<4; i++) {
        document.getElementById("choice-" + i).value = "";
    }
    correctAns.value = "";
}


Question.prototype.finish = function () {
    //clear the quiz creation form
    //display msg "You have finished creating your Smart Owl Quiz Named this.name. You can review your questions in the Quiz
    // Feed to the left. To take your quiz click the link below or on your home page. Happy Quizzing 'Smiley Face Emoticon "
    createQuizForm.style.display = "none";
    var finishMsg = document.getElementById("finishMsg");

    finishMsg.innerHTML = "<p>You have finished creating your Smart Owl Quiz.</p> <br> You can review your questions in the Quiz " +
        "Feed to the left. <br> To take your quiz click the link below or on your home page."
};


var currentIndex = 0;


Question.prototype.feed = function(){
// Feed function takes each question that is added and creates a dynamically creates <h4> with name of the Quiz
// <p> with question and <ul> with answers. It changes the color of the correct answer.
// This allows the quiz creator to review the quiz

    //create Elements..
    var innerDiv = document.createElement("div");
    //var fQuizName = document.createElement("h4");
    var fQuestion = document.createElement("p");
    var fChoices = document.createElement("ol");

   if (smartOwlQuizzes != -1) {
       innerDiv.id = "q-" + currentIndex;

       fQuestion.innerHTML = this.question;
       innerDiv.appendChild(fQuestion);

       for(var i=0; i<this.choice.length; i++) {
           if (this.choice[i] != "") {
               var fChoiceList = document.createElement("li");
               fChoices.setAttribute("type", "A");
               fChoiceList.innerHTML = this.choice[i];
                if (fChoiceList.innerHTML == correctAns.value){
                    fChoiceList.style.fontColor = "green";
                }
               fChoices.appendChild(fChoiceList)
           }
       }
       innerDiv.appendChild(fChoices)
   }
   document.getElementById("quiz-feed").appendChild(innerDiv);
    currentIndex++
};




