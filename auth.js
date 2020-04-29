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
  let data = new FormData(formLog);
  let password = data.get("password");
  let login = data.get("login");

  try{
  if (password && login){
    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyARBkhuz8A8LZgPc2WrhMkkuZkQ-yvvqLQ'
    let response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({"email": login, "password": password, "returnSecureToken": true})   
    });
    let commits = await response.json();
  

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
      password = undefined;
      login = undefined;
      signInView.className = "closed-block modal";
      signupView.className = "active-block modal";
      console.log("перенаправлен на регистрацию");
    }
  }   
  else throw new Error("missing login or password");   
}

catch(e){
  console.log(e.name + ": " + e.message);
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
let passTest = $('#signUp form input[name="password1"]');
let pass = $('#signUp form input[name="password"]');


//checking passwords  
  passTest.addEventListener("input", function() {
      pass.value != passTest.value ? passTest.style.color = "red" : 
      passTest.style.color = "black";
  })
  
//настройка кнопки регистрации 
formReg.addEventListener("submit", async(event)=> {
  try{
  event.preventDefault();

let data = new FormData(formReg); 
let password = data.get("password");
let email = data.get("email");

if (email){
  if (password.length >= 8){
    if(pass.value == passTest.value){
      let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyARBkhuz8A8LZgPc2WrhMkkuZkQ-yvvqLQ';
      let response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({"email": email, "password": password, "returnSecureToken": false}) 
     });
     let commits = await response.json(); 
     signupView.className = "closed-block modal";}
    else throw new Error ("passwords are diffrent");
  }
   else throw new Error ("password is too short");
}
else throw new Error ("missing email");

}

catch(e){
  console.log(e.name + ": " + e.message);
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


function logOut() {
localStorage.removeItem.token;  
token = undefined;
signupView.className = "closed-block modal";
signInView.className = "closed-block modal";                                                                               
loginSost.style.opacity = 0;
let photos = document.querySelector(".photos");
let gallery = $("#gallery");

while (photos.firstChild) {
  photos.removeChild(photos.firstChild);
}

gallery.style.opacity = 0;
}

export {logIN, signUP, logOut}