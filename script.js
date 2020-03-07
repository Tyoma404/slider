function $(selector) {
 return document.querySelector(selector)
}


var btn_prev = $('#gallery .buttonsForSlider .prev');  /* отбирает всегда самый первый элемент, удовлетворяющий css-селектору */
var btn_next = $('#gallery .buttonsForSlider .next');
var firstPicture = $("#gallery .photos img:first-child");
var images = document.querySelectorAll('#gallery .photos img'); /*отбирает все картинки в массив images */
var buttons = document.querySelectorAll("#gallery .buttons");   //кнопки для галереи
var q = 0; /* номер картинки в массиве */
var imageLength = images.length;     //количество картинок
var signChoice = $('#sign_choice');  //при выборе регистрации
var signInChoice = $('#signIn_choice');  //при выборе авторизации
var loginChoice = $('#login_choice');  //при выборе авторизации в качестве примера
var loginView = $('#login');   //отображение меню авторизации в качестве примера
var signupView = $('#signup');   //отображение меню регистрации
var signInView = $('#signIn');  //Отображает меню авторизации
var log_btn = $('#log_btn');   //кнопка авторизации в качестве примера
var sign_btn = $('#sign_btn');   //кнопка регистрации
var logOut_btn = $('#logOut_btn');
var signIn_btn = $('#signIn_btn');  //кнопка авторизации
var login = $('#loginField');    //логин
var email = $('#signupField');   //e-mail пользователя для регистрации
var emailIn = $('#signInField');   //e-mail пользователя для авторизации
var pass = $('#passwordSignField');    //желаемый пароль пользователя
var passTest = $('#passwordSignField1');
var passIn = $('#passwordSignInField');  //пароль для авторизации
var password = $('#passwordField');    //пароль для авторизации в качестве примера
var loginSost = $('#loginSost');    //поле для вывода ошибки
var gallery = $('#gallery');     //сама галерея с фотками
var token;  //токен, который приходит от firebase


images[q].className = "active";


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



signIn_btn.addEventListener("click", async()=> {
  var url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyARBkhuz8A8LZgPc2WrhMkkuZkQ-yvvqLQ';
  var data = {"email": emailIn.value, "password": passIn.value, "returnSecureToken": true};
  response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(data)
  });
  commits = await response.json();
  console.log(commits); 

  if(commits.kind == "identitytoolkit#VerifyPasswordResponse"){
    gallery.style.opacity = 1;
    loginSost.innerHTML = "";
    signInView.style.opacity = 0;
  }
  else {
    console.log("Пользователь не зарегистрирован...");
    signInView.style.opacity = 0;
    signupView.style.opacity = 1;
    console.log("перенаправлен на регистрацию");
  }
  // token = commits.idToken;
  // console.log(token);
  
  });




signChoice.addEventListener('click', ()=>{
   signupView.style.opacity = 1;
   firstDiv.style.opacity = 0;
});

loginChoice.addEventListener('click', ()=>{
  loginView.style.opacity = 1;
  firstDiv.style.opacity = 0; 
});

signInChoice.addEventListener('click', ()=>{
  signInView.style.opacity = 1;
  firstDiv.style.opacity = 0; 
});

logOut_btn.addEventListener('click', logOut)

//AIzaSyARBkhuz8A8LZgPc2WrhMkkuZkQ-yvvqLQ

function logOut() {
token = undefined;
commits = undefined;
firstDiv.style.opacity = 1;
signInView.style.opacity = 0;
signupView.style.opacity = 0;
loginView.style.opacity = 0;
gallery.style.opacity = 0;
loginSost.style.opacity = 0;
}




