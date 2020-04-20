import {galleryContent} from "./script.js"

function $(selector) {
 return document.querySelector(selector);
}

var signupView = $('#signUp');   //отображение меню регистрации
var signInView = $('#signIn');  //Отображает меню авторизации
var formReg = $('#signUp form');   //форма регистрации
var formLog = $('#signIn form');   //форма авторизации
var loginSost = $('#loginSost');    //поле для вывода ошибки
var token;  //токен, который приходит от firebase
var backgroundDiv = $('#backgroundDiv');

function logIN(){
backgroundDiv.style.opacity = 1;
backgroundDiv.style.zIndex = 50;
signupView.className = "closed-block modal";
signInView.className = "active-block modal";

//настройка кнопки авторизации
formLog.addEventListener("submit", async(event)=> {
    event.preventDefault();
    let data = new FormData(formLog) 
    var url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyARBkhuz8A8LZgPc2WrhMkkuZkQ-yvvqLQ'
    let response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({"email": data.get("email"), "password": data.get("password"), "returnSecureToken": true})   
    });

    let commits = await response.json();
    loginSost.innerHTML = JSON.stringify(commits); 
      
    if(commits.kind == "identitytoolkit#VerifyPasswordResponse"){
      loginSost.innerHTML = "";
      signInView.className = "closed-block modal";
      backgroundDiv.style.opacity = 0;
      backgroundDiv.style.zIndex = -100;
      localStorage.token = commits.idToken;
      galleryContent();
    }
    
    else {
      console.log("Пользователь не зарегистрирован...");
      signInView.className = "closed-block modal";
      signupView.className = "active-block modal";
      console.log("перенаправлен на регистрацию");
    }
    
});

//background during auth
backgroundDiv.addEventListener("click", ()=>{
    signInView.className = "closed-block modal";
    signupView.className = "closed-block modal";
    backgroundDiv.style.opacity = 0;
    backgroundDiv.style.zIndex = -100;
  })    
}

function signUP() {
backgroundDiv.style.opacity = 1;
backgroundDiv.style.zIndex = 50;
signInView.className = "closed-block modal";
signupView.className = "active-block modal";
  
//настройка кнопки регистрации 
formReg.addEventListener("submit", async(event)=> {
  event.preventDefault();
  let data = new FormData(formReg); 
  var url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyARBkhuz8A8LZgPc2WrhMkkuZkQ-yvvqLQ';
    let response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({"email": data.get("email"), "password": data.get("password"), "returnSecureToken": false}) 
    });
    let commits = await response.json(); 
    signupView.className = "closed-block modal";
});
    
//checking passwords  
let passTest = document.querySelector('#signUp form input[name="password1"]');
let pass = document.querySelector('#signUp form input[name="password"]');

  passTest.addEventListener("input", function() {
      pass.value != passTest.value ? passTest.style.color = "red" : 
      passTest.style.color = "black";
  })

 //background during auth
  backgroundDiv.addEventListener("click", ()=>{
    signInView.className = "closed-block modal";
    signupView.className = "closed-block modal";
    backgroundDiv.style.opacity = 0;
    backgroundDiv.style.zIndex = -100;
  })   
}

function logOut() {
localStorage.removeItem.token;  
token = undefined;
commits = undefined;
signupView.className = "closed-block modal";
signInView.className = "closed-block modal";                                                                               
loginSost.style.opacity = 0;
}

export {logIN, signUP, logOut}