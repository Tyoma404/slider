function $(selector) {
 return document.querySelector(selector)
}

var btn_prev = $('#gallery .buttonsForSlider .prev');  /* отбирает всегда самый первый элемент, удовлетворяющий css-селектору */
var btn_next = $('#gallery .buttonsForSlider .next');
var firstPicture = $("#gallery .photos img:first-child");
var buttons = document.querySelectorAll("#gallery .buttons");   //кнопки для галереи
var q = 0; /* номер картинки в массиве */
var signChoice = $('#sign_choice');  //при выборе регистрации
var signInChoice = $('#signIn_choice');  //при выборе авторизации
var loginChoice = $('#login_choice');  //при выборе авторизации в качестве примера
var loginView = $('#login');   //отображение меню авторизации в качестве примера
var signupView = $('#signup');   //отображение меню регистрации
var signInView = $('#signIn');  //Отображает меню авторизации
var log_btn = $('#log_btn');   //кнопка авторизации в качестве примера
var sign_btn = $('#sign_btn');   //кнопка регистрации
var logOut_btn = $('#logOut_btn');  //кнопка выхода
var signIn_btn = $('#signIn_btn');  //кнопка авторизации
var login = $('#loginField');    //логин
var email = $('#signupField');   //e-mail пользователя для регистрации
var emailIn = $('#signInField');   //e-mail пользователя для авторизации
var pass = $('#passwordSignField');    //желаемый пароль пользователя
var passTest = $('#passwordSignField1');  //второй пароль пользователя (для проверки)
var passIn = $('#passwordSignInField');  //пароль для авторизации
var password = $('#passwordField');    //пароль для авторизации в качестве примера
var loginSost = $('#loginSost');    //поле для вывода ошибки
var gallery = $('#gallery');     //сама галерея с фотками
var token;  //токен, который приходит от firebase
var imgs = $('#imgs'); //id класса photos в галерее
var backgroundDiv = $('#backgroundDiv');

//настройка кнопки "посмтреть пример"
let url = 'https://js-slider.firebaseio.com/users/';
let response, commits;
log_btn.addEventListener("click", async () => {
  switch(login.value){
    case "admin":
       response = await fetch(url + "admin.json",);
       commits = await response.json(); 

        if(password.value == 123){
          gallery.style.opacity = 1;
          loginSost.innerHTML = "";
          loginView.style.opacity = 0;
        }
        else  loginSost.innerHTML = "Неверно введён логин или пароль!";
        break;

    case "user":
       response = await fetch(url + "user.json");
       commits = await response.json(); 

       if(password.value === "qwert"){ 
        console.log("А user'ам только строка в консоль))");
        loginSost.innerHTML = "";
        loginView.style.opacity = 0;
      }
      
    break;

   default: 
   loginSost.innerHTML = "Неверно введён логин или пароль!";
  }
});

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

passTest.addEventListener("input", function() {
  pass.value != passTest.value ? passTest.labels[0].style.color = "red" : 
  passTest.labels[0].style.color = "black";
})




//настройка кнопки авторизации
signIn_btn.addEventListener("click", async()=> {
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
    signInView.style.opacity = 0;
    var newDiv = document.createElement('div');

    xhr.send();
  }

   
  //   (async()=> {
  //     url = 'https://js-slider.firebaseio.com/imgs/-M1wz-cjdTcj35bg6Qbp/images.json'
  //     response = await fetch(url, {
  //     method: 'GET',
  //     auth: token,
  //   });
  //   newCommit = await response.json();
  //   console.log(newCommit);
  //   // newDiv.innerHTML = 
  //   // imgs.append(newDiv);
  // })
    
  
  else {
    console.log("Пользователь не зарегистрирован...");
    signInView.style.opacity = 0;
    signupView.style.opacity = 1;
    console.log("перенаправлен на регистрацию");
  }
  // token = commits.idToken;
  // console.log(token);
  
  });

backgroundDiv.addEventListener("click", ()=>{
  signInView.className = "closed-block modal";
  loginView.className = "closed-block modal";
  signupView.className = "closed-block modal";
  backgroundDiv.style.opacity = 0;
  backgroundDiv.style.zIndex = -100;
})

//Buttons in firstDiv
signChoice.addEventListener('click', ()=>{
  backgroundDiv.style.opacity = 1;
  backgroundDiv.style.zIndex = 50;
  signInView.className = "closed-block modal";
  loginView.className = "closed-block modal";
  signupView.className = "active-block modal";
});

loginChoice.addEventListener('click', ()=>{
  backgroundDiv.style.opacity = 1;
  backgroundDiv.style.zIndex = 50;
  signupView.className = "closed-block modal";
  signInView.className = "closed-block modal";
  loginView.className = "active-block modal";
});

signInChoice.addEventListener('click', ()=>{
  backgroundDiv.style.opacity = 1;
  backgroundDiv.style.zIndex = 50;
  loginView.className = "closed-block modal";
  signupView.className = "closed-block modal";
  signInView.className = "active-block modal";
});

logOut_btn.addEventListener('click', logOut)

//Ключ пользователя:    AIzaSyARBkhuz8A8LZgPc2WrhMkkuZkQ-yvvqLQ

//функция выхода
function logOut() {
localStorage.removeItem.token;  
token = undefined;
commits = undefined;
signupView.className = "closed-block modal";
loginView.className = "closed-block modal";
signInView.className = "closed-block modal";
gallery.style.opacity = 0;                                                                                
loginSost.style.opacity = 0;
}




