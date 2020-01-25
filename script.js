var btn_prev = document.querySelector('#gallery .buttonsForSlider .prev');  /* отбирает всегда самый первый элемент, удовлетворяющий css-селектору */
var btn_next = document.querySelector('#gallery .buttonsForSlider .next');
var firstPicture = document.querySelector("#gallery .photos img:first-child");
var images = document.querySelectorAll('#gallery .photos img'); /*отбирает все картинки в массив images */
var buttons = document.querySelectorAll("#gallery .buttons");
var q = 0; /* номер картинки в массиве */
var imageLength = images.length;
images[q].className = "active";

btn_prev.addEventListener("click", function() {
  images[q].className = ''; /*текущая фотка получает класс неактивной*/
  q = q - 1; /* или i-- */
  // if (q != 0){firstPicture.className = '';}
  // if (q == 0){firstPicture.className = 'active';}
  if(q < 0) {
    q=imageLength-1;  /* отмотал в начало? продолжает с конца. '-1' чтобы учитывать нулевой элемент массива*/
  }
  images[q].className = 'active'; /*то фото, к которому переходим получает класс активного */  
})

btn_next.addEventListener("click", function() {
  images[q].className = '';
  q = q + 1; /* или i++ */
  // if (q != 0){firstPicture.className = '';}
  // if (q == 0){firstPicture.className = 'active';}
  if(q >= imageLength) {
    q = 0; /* кончились картинки ? продолжает с первой */
     // firstPicture.className = 'active';
  }
  images[q].className = 'active';  
})
for(var i=0; i<buttons.length; i++){
 buttons[i].addEventListener("click", function(event){ 
   images[q].className = '';
   // if (event.target.value != 0){
   //   firstPicture.className = '';}
   // if (event.target.value == 0)
   // {firstPicture.className = 'active'; }
     images[event.target.dataset.name].className = 'active'; 
     q = parseInt(event.target.dataset.name);  
   })
 buttons[i].addEventListener("mouseenter", function(){
    console.log("Курсор наведён на " + event.target.dataset.name + " картинку");
  })
}
buttons[i].addEventListener("mouseenter", function{
  console.log("Курсор наведён на " + event.target.dataset.name + " кнопку");
})