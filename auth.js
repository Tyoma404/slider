import {galleryContent} from "./script.js"

function $(selector) {
 return document.querySelector(selector);
}

var btn_prev = $('#gallery .buttonsForSlider .prev');  /* отбирает всегда самый первый элемент, удовлетворяющий css-селектору */
var btn_next = $('#gallery .buttonsForSlider .next');
var firstPicture = $("#gallery .photos img:first-child");
var buttons = document.querySelectorAll("#gallery .buttons");   //кнопки для галереи
var q = 0; /* номер картинки в массиве */
var signupView = $('#signup');   //отображение меню регистрации
var signInView = $('#signIn');  //Отображает меню авторизации
var sign_btn = $('#sign_btn');   //кнопка регистрации
var signIn_btn = $('#signIn_btn');  //кнопка авторизации
var email = $('#signupField');   //e-mail пользователя для регистрации
var emailIn = $('#signInField');   //e-mail пользователя для авторизации
var pass = $('#passwordSignField');    //желаемый пароль пользователя
var passTest = $('#passwordSignField1');  //второй пароль пользователя (для проверки)
var passIn = $('#passwordSignInField');  //пароль для авторизации
var loginSost = $('#loginSost');    //поле для вывода ошибки
var gallery = $('#gallery');     //сама галерея с фотками
var token;  //токен, который приходит от firebase
var imgs = $('#imgs'); //id класса photos в галерее
var backgroundDiv = $('#backgroundDiv');

function logIN(){
backgroundDiv.style.opacity = 1;
backgroundDiv.style.zIndex = 50;
signupView.className = "closed-block modal";
signInView.className = "active-block modal";

//настройка кнопки авторизации
signIn_btn.addEventListener("click", async()=> {
    galleryContent();
    var url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyARBkhuz8A8LZgPc2WrhMkkuZkQ-yvvqLQ'
    var data = {"email": emailIn.value, "password": passIn.value, "returnSecureToken": true};
    response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(data)
    });
    commits = await response.json();
    localStorage.token = commits.idToken;
    //console.log(commits); 
  
    var xhr = new XMLHttpRequest();
    var url = 'https://js-slider.firebaseio.com/imgs/-M1wz-cjdTcj35bg6Qbp/images.json?auth=' + localStorage.token;
    
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.addEventListener("readystatechange", () => {
  
  // если состояния запроса 4 и статус запроса 200 (OK)
  if ((xhr.readyState==4) && (xhr.status==200)) {
    // например, выведем объект XHR в консоль браузера
      console.log(xhr.response[0]);
  for (var i=0; i<xhr.response.length; i++){
    let img = document.createElement('img');
    img.className = "images";
    img.src = xhr.response[i]
    imgs.appendChild(img);
  
  }
  var images = document.querySelectorAll('#gallery .photos img'); /*отбирает все картинки в массив images */
  images[q].className = "active";
  var imageLength = images.length;
  
  btn_prev.addEventListener("click", function () {
    images[q].className = ''; /*текущая фотка получает класс неактивной*/
    q = q - 1; /* или i-- */
    // if (q != 0){firstPicture.className = '';}
    // if (q == 0){firstPicture.className = 'active';}
    if (q < 0) {
      q = imageLength - 1;  /* отмотал в начало? продолжает с конца. '-1' чтобы учитывать нулевой элемент массива*/
    }
    images[q].className = 'active'; /*то фото, к которому переходим получает класс активного */
  })
  
  btn_next.addEventListener("click", function () {
    images[q].className = '';
    q = q + 1; /* или i++ */
    // if (q != 0){firstPicture.className = '';}
    // if (q == 0){firstPicture.className = 'active';}
    if (q >= imageLength) {
      q = 0; /* кончились картинки ? продолжает с первой */
      // firstPicture.className = 'active';
    }
    images[q].className = 'active';
  })
  
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function (event) {
      images[q].className = '';
      // if (event.target.value != 0){
      //   firstPicture.className = '';}
      // if (event.target.value == 0)
      // {firstPicture.className = 'active'; }
      images[event.target.dataset.name].className = 'active';
      q = parseInt(event.target.dataset.name)
    })
    buttons[i].addEventListener("mouseenter", function () {
      console.log("Курсор наведён на " + event.target.dataset.name + " картинку");
    })
  }
  }
  })
  
    if(commits.kind == "identitytoolkit#VerifyPasswordResponse"){
      gallery.style.opacity = 1;
      loginSost.innerHTML = "";
      signInView.className = "closed-block modal";
      var newDiv = document.createElement('div');
  
      xhr.send();
    }
    
    else {
      console.log("Пользователь не зарегистрирован...");
      signInView.className = "closed-block modal";
      signupView.className = "active-block modal";
      console.log("перенаправлен на регистрацию");
    }
    // token = commits.idToken;
    // console.log(token);
    
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
sign_btn.addEventListener("click", async()=> {
    var url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyARBkhuz8A8LZgPc2WrhMkkuZkQ-yvvqLQ';
    var data = {"email": email.value, "password": pass.value, "returnSecureToken": true};
    response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(data)
    });
    commits = await response.json(); 
    token = commits.idToken;
    console.log(token);
      });
    
//checking passwords  
passTest.addEventListener("input", function() {
      pass.value != passTest.value ? passTest.labels[0].style.color = "red" : 
      passTest.labels[0].style.color = "black";
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
gallery.style.opacity = 0;                                                                                
loginSost.style.opacity = 0;
}

export {logIN, signUP, logOut}