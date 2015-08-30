/**
 * Created by Dad1 on 8/28/15.
 */
// Display user greeting when the user signs in.
var userGreeting = function () {
    var welcome = document.getElementById('welcome');
    var userName = JSON.parse(localStorage.user);
    welcome.innerHTML = ("Welcome, " + userName)
}();

function getList (list){

    var indexCount = 0;
    var getName = list[indexCount];
    console.log(list.length);

    if(list != -1){
        addNewElement();

        for(var i = 0; i<list.length; i++) {
            if (list[i].name === getName.name) {
                indexCount++
            } else {
                indexCount++;
                addNewElement();
            }
        }
    }
        function addNewElement(){
            var li = document.createElement("li");
            var newLink = document.createElement("a");
            newLink.setAttribute("class", "qList");
            getName = list[indexCount];
            newLink.innerHTML = getName.name;
            li.title = getName.name;
            newLink.setAttribute("onclick", "location.href ='test.html?quiz="+getName.name+"'");
            li.appendChild(newLink);
            document.getElementById("theList").appendChild(li);

        }

}

// Retrieve data.json file using ajax and save in localStorage
var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
        if ((xhr.status >= 200 && xhr.status < 300)|| xhr.status === 304){
            //localstorage  is xhr response text
            localStorage.quiz = xhr.responseText;
            var smartOwlQuizzes = JSON.parse(xhr.responseText);
            getList(smartOwlQuizzes);
        } else{
            alert("Request was unsuccessful: " + xhr.status)
        }
    }
};
xhr.open('GET', 'js/data.json');
xhr.send();


