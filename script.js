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

//Настройка галереи
function galleryContent() {

  var imgUrl = 'https://js-slider.firebaseio.com/imgs/-M1wz-cjdTcj35bg6Qbp/images.json?auth=' + localStorage.token;
  var imgResponse = await fetch(imgUrl);
  var imgCommits = await imgResponse.json();


  var xhr = new XMLHttpRequest();
  
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
  img.src = imgCommits[i]
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



}

export {galleryContent}
