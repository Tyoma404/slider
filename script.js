import {logIN, signUP, logOut} from './auth.js'

function $(selector) {
 return document.querySelector(selector)
}

//Buttons in firstDiv
var signUpChoice = $('#sign_choice');  
var signInChoice = $('#signIn_choice');  
var logOut_btn = $('#logOut_btn');  

//Gallery's variables
var gallery = $('#gallery');     //сама галерея с фотками
var btn_prev = $('#gallery .buttonsForSlider .prev');  /* отбирает всегда самый первый элемент, удовлетворяющий css-селектору */
var btn_next = $('#gallery .buttonsForSlider .next');
var firstPicture = $("#gallery .photos img:first-child");
var buttons = document.querySelectorAll("#gallery .buttons");   //кнопки для галереи
var q = 0; /* номер картинки в массиве */
var imgs = $('#imgs'); //id класса photos в галерее


//Buttons in firstDiv setups
signUpChoice.addEventListener('click', signUP);

signInChoice.addEventListener('click', logIN);

logOut_btn.addEventListener('click', logOut)

//Ключ пользователя:    AIzaSyARBkhuz8A8LZgPc2WrhMkkuZkQ-yvvqLQ

//Gallery setups
async function galleryContent() {
  gallery.style.opacity = 1;

  var imgUrl = 'https://js-slider.firebaseio.com/imgs/-M1wz-cjdTcj35bg6Qbp/images.json?auth=' + localStorage.token;
  var imgResponse = await fetch(imgUrl);
  console.log(imgResponse)  
  var imgCommits = await imgResponse.json();

  
console.log(imgCommits)

for (var i=0; i<imgCommits.length; i++){
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

export {galleryContent}
