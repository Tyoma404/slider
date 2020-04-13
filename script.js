import {logIN, signUP, logOut} from './auth.js'

function $(selector) {
 return document.querySelector(selector)
}

var signUpChoice = $('#sign_choice');  //при выборе регистрации
var signInChoice = $('#signIn_choice');  //при выборе авторизации
var logOut_btn = $('#logOut_btn');  //кнопка выхода

//Buttons in firstDiv
signUpChoice.addEventListener('click', signUP);

signInChoice.addEventListener('click', logIN);

logOut_btn.addEventListener('click', logOut)

//Ключ пользователя:    AIzaSyARBkhuz8A8LZgPc2WrhMkkuZkQ-yvvqLQ
function galleryContent() {
  console.log("qsqsqs")
}

export {galleryContent}
