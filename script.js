var btn_prev = document.querySelector('#gallery .buttonsForSlider .prev');  /* отбирает всегда самый первый элемент, удовлетворяющий css-селектору */
var btn_next = document.querySelector('#gallery .buttonsForSlider .next');
var firstPicture = document.querySelector("#gallery .photos img:first-child");
var images = document.querySelectorAll('#gallery .photos img'); /*отбирает все картинки в массив images */
var buttons = document.querySelectorAll("#gallery .buttons");
var q = 0; /* номер картинки в массиве */
var imageLength = images.length;
var signChoice = document.querySelector('#sign_choice');  //при выборе регистрации
var loginChoice = document.querySelector('#login_choice');  //при выборе авторизации
var loginView = document.querySelector('#login');   //отображение меню авторизации
var signupView = document.querySelector('#signup');   //отображение меню регистрации
var log_btn = document.querySelector('#log_btn');   //кнопка авторизации
var sign_btn = document.querySelector('#sign_btn');   //кнопка регистрации
var login = document.querySelector('#loginField');    //логин
var email = document.querySelector('#signupField');   //e-mail пользователя
var pass = document.querySelector('#passwordSignField');    //желаемый пароль пользователя
var password = document.querySelector('#passwordField');    //пароль для авторизации
var loginSost = document.querySelector('#loginSost');
var gallery = document.querySelector('#gallery');
var token;    
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
loginSost.innerHTML = token;

});

signChoice.addEventListener('click', ()=>{
   signupView.style.opacity = 1;
   firstDiv.style.opacity = 0;
});

loginChoice.addEventListener('click', ()=>{
  loginView.style.opacity = 1;
  firstDiv.style.opacity = 0; 
});


//AIzaSyARBkhuz8A8LZgPc2WrhMkkuZkQ-yvvqLQ
 
