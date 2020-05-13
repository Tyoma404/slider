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
  let q = 0   //pictures counter
  const btn_prev = $('#gallery .buttonsForSlider .prev'); 
  const btn_next = $('#gallery .buttonsForSlider .next');
  const buttons = document.querySelectorAll("#gallery .buttons")    //buttons array
  const images = document.querySelectorAll('#gallery .photos img');     //images array
  let imageLength = images.length;
  const logOut_btn = $('#logOut_btn'); 

  activateImage(q) 

  function activateImage(index) {
  images.forEach( (el,i) => {
    el.classList.toggle("active", i === index)
    q = index
  }) 
  }

buttons.forEach( (el, index) => {
  el.addEventListener("click", ()=>{  
  activateImage(index)
  })
})

logOut_btn.addEventListener('click', logOut)

btn_prev.addEventListener("click", function () {
  q == 0 ? q = imageLength-1 : q = q - 1
  activateImage(q)   
})

btn_next.addEventListener("click", function () {
  q == imageLength-1 ? q = 0 : q = q + 1
  activateImage(q)
})


}


export {galleryContent}
