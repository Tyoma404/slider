import {logIN, signUP, logOut} from './auth.js'

function $(selector) {
 return document.querySelector(selector)
}

//Main container
const container = $('.container') 

//Buttons in firstDiv
var signUpChoice = $('#sign_choice');  
var signInChoice = $('#signIn_choice');   


//Buttons in firstDiv setups
signUpChoice.addEventListener('click', signUP);

signInChoice.addEventListener('click', logIN);


//Ключ пользователя:    AIzaSyARBkhuz8A8LZgPc2WrhMkkuZkQ-yvvqLQ

//Gallery setups
async function galleryContent() {
  container.innerHTML = "<div class='Spinner'></div>";
  var imgUrl = 'https://js-slider.firebaseio.com/imgs/-M1wz-cjdTcj35bg6Qbp/images.json?auth=' + localStorage.token;
  var imgResponse = await fetch(imgUrl);
  console.log(imgResponse)  
  var imgCommits = await imgResponse.json();

  imgCommits = imgCommits.map((value) => `<img src=${value} class="images"/>`)
  
  const btnsElements = imgCommits.map((value,index) => `<button class="buttons">рис ${index}</button>`)

  container.innerHTML = `<div id="gallery"> 
  <div class="photos" id="imgs">${imgCommits.join('')}</div> 

  <div class="buttonsForSlider">
    <input type="button" value="Назад" class="prev">
    <div id="btns">${btnsElements.join('')}</div>
    <input type="button" value="Вперед" class="next">
  </div>
  <button id="logOut_btn">Выход</button>
</div>`

//Gallery's variables
  const btn_prev = $('#gallery .buttonsForSlider .prev'); 
  const btn_next = $('#gallery .buttonsForSlider .next');
  let q = 0; //picture counter
  const buttons = document.querySelectorAll("#gallery .buttons")
  const images = document.querySelectorAll('#gallery .photos img'); 
  images[q].className = "active";
  let imageLength = images.length;
  const logOut_btn = $('#logOut_btn'); 

buttons.forEach( (el, index) => {
  el.addEventListener("click", ()=>{
  images[q].className = ""  
  images[index].className = "active"
  q = index
  })
})

  // for (var i = 0; i < buttons.length; i++) {
  //   buttons[i].addEventListener("click", function (event) {
  //     images[q].className = '';
  //     // if (event.target.value != 0){
  //     //   firstPicture.className = '';}
  //     // if (event.target.value == 0)
  //     // {firstPicture.className = 'active'; }
  //     images[event.target.dataset.name].className = 'active';
  //     q = parseInt(event.target.dataset.name)
  //   })
  //   buttons[i].addEventListener("mouseenter", function () {
  //     console.log("Курсор наведён на " + event.target.dataset.name + " картинку");
  //   })
  // }

logOut_btn.addEventListener('click', logOut)

btn_prev.addEventListener("click", function () {
  images[q].className = ''; 
  q = q - 1; /* или i-- */
  if (q < 0) {
    q = imageLength - 1;  
  }
  images[q].className = 'active';
})

btn_next.addEventListener("click", function () {
  images[q].className = '';
  q = q + 1; 
  if (q >= imageLength) {
    q = 0; 
  }
  images[q].className = 'active';
})


}


export {galleryContent}
