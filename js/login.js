/**
 * Created by Dad1 on 8/23/15.
 */

function userLogin() {
    //Ask the user for name and store it locally.
    function User () {
        this.userName = document.getElementById('uName');
        this.enterQuiz = document.getElementById('enterQuiz');
        this.buttonClick()
    }
    User.prototype.buttonClick = function (){
        this.enterQuiz.addEventListener('click', this.welcome.bind(this));
    };

    User.prototype.welcome = function (){
       localStorage.user = JSON.stringify(this.userName.value);
       window.location = "quizList.html"
    };

   new User()
}

userLogin();