/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/js/createPost.js
class CreatePost {
  constructor(container) {
    this.container = container;
  }

  //создаем пост и добавляем в html
  showPost(latitude, longitude, val) {
    const postHtml = `
        <div class="itemPost">
      <div class="itemsHight">
        <div class="itemsPost-left">
          <p class="text">
           ${val}
          </p>
          
        </div>
        <div class="itemsPost-right">${new Date().toLocaleString()}</div>                  
      </div>
      <div class="coordinates">[${latitude}, ${longitude}]</div>
    </div>
        `;
    this.container.insertAdjacentHTML("afterBegin", postHtml);
  }

  //создаем окно c ручным вводом координат и добавляем в html
  showModalManualCoords() {
    const modalManualCoordsHtml = `
    <div data-modal="modal" class="modal">
      <div data-id="modalManualCoords" class="modal_content modal_manual_coords">
        <div>
          <p>Что-то пошло не так</p>
          <p>К сожалению, нам не удалось определить ваше местоположение, пожалуйста, дайте разрешение на использование геолокации, либо введите координаты вручную</p>
          <p>Широта и долгота через запятую</p>
        </div>
        <div data-id="modalForm" class="modal_form">
          <input class="modal_input" placeholder="Введите координаты, например: -90.12345, 180.12345" required>
        </div>
        <div class="modal_form_controls"> 
            <button type="reset" data-id="modalButtonCancel" class="modal_button button_cancel">Отмена</button> 
            <button type="submit" data-id="modalButtonOk" class="modal_button button_ok">Ок</button> 
          </div>       
      </div>
    </div>
    `;
    this.container.insertAdjacentHTML("afterBegin", modalManualCoordsHtml);
  }

  //создаем пост c ручным вводом координат и добавляем в html
  ManualPost(lat, lng, val) {
    const postHtml = `
        <div class="itemPost">
      <div class="itemsHight">
        <div class="itemsPost-left">
          <p class="text">
           ${val}
          </p>
          
        </div>
        <div class="itemsPost-right">${new Date().toLocaleString()}</div>                  
      </div>
      <div class="coordinates">[${lat}, ${lng}]</div>
      
    </div>
        `;
    this.container.insertAdjacentHTML("afterBegin", postHtml);
  }
}
;// CONCATENATED MODULE: ./src/js/Timeline.js

class Timeline {
  constructor(container) {
    this.container = container;
    this.CreatePost = new CreatePost(this.container);
  }

  //метод для ввода и отправки текста поста
  initial() {
    this.inputPost = this.container.querySelector(".inputPost"); //получаем поле ввода поста

    const handlerClick = e => {
      this.text = e.target.value; //значение поля ввода поста
      this.location(this.text); //запускаем метод проверки получения координат
      this.inputPost.removeEventListener("click", handlerClick); //удаляем обработчик
      this.inputPost.value = ""; //очищаем поле ввода поста
    };
    this.inputPost.addEventListener("change", handlerClick); //вешаем обраблтчик на поле ввода поста
  }

  //метод проверки доступности координат
  location(text) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const {
          latitude,
          longitude
        } = position.coords;
        this.CreatePost.showPost(latitude, longitude, text);
      }, error => {
        console.error(error);
        this.ManualCoords(text);
      });
    } else {
      console.log("browser geo API - false");
    }
  }

  //метод для ввода координат вручную
  ManualCoords(text) {
    this.CreatePost.showModalManualCoords(); //создаем модально окно для ручного ввода
    this.containerManualCoord = document.querySelector(".modal"); //получаем модально окно для ручного ввода
    this.inputManualCoord = document.querySelector(".modal_input"); //получаем поле input окна для ручного ввода
    this.okManualCoord = document.querySelector(".button_ok"); //получаем кнопку ОК окна для ручного ввода
    this.cancelManualCoord = document.querySelector(".button_cancel"); //получаем кнопку Отмена окна для ручного ввода

    const handlerClickCancel = e => {
      e.preventDefault();
      this.cancelManualCoord.removeEventListener("click", handlerClickCancel); //удаляем обработчик
      this.containerManualCoord.remove(); //удаляем окно для ручного ввода
    };
    this.cancelManualCoord.addEventListener("click", handlerClickCancel); //при нажатии кнопки "Отмена"

    const handlerClickOk = e => {
      e.preventDefault();
      this.coordValue = this.inputManualCoord.value; //значение поля input окна для ручного ввода
      this.validCoord = this.checkCoordinatesValidity(this.coordValue); //объект с широтой и долготой из метода heckCoordinatesValidity()
      console.log(this.validCoord);
      if (!Object.keys(this.validCoord).length) {
        //если объект пустой
        alert("Вы неправильно ввели координаты");
      } else {
        this.CreatePost.ManualPost(this.validCoord.lat, this.validCoord.lng, text); //создаем пост
        this.okManualCoord.removeEventListener("click", handlerClickOk); //удаляем обработчик
        this.containerManualCoord.remove(); //удаляем окно для ручного ввода
      }
    };
    this.okManualCoord.addEventListener("click", handlerClickOk); //при нажатии кнопки "Ок"
  }

  //метод проверки ввода координат
  checkCoordinatesValidity(inputValue) {
    let newValue;
    const validObj = {};
    if (inputValue.startsWith("[") && inputValue.endsWith("]")) {
      newValue = inputValue.slice(1, inputValue.length - 1).split(",");
    } else {
      newValue = inputValue.split(",");
    }
    if (newValue.length !== 2) return validObj;
    const lat = parseFloat(newValue[0].trim());
    const lng = parseFloat(newValue[1].trim());
    if (!Number.isNaN(lat) && Math.abs(lat) <= 90) {
      validObj.lat = lat;
    }
    if (!Number.isNaN(lng) && Math.abs(lng) <= 180) {
      validObj.lng = lng;
    }
    return validObj;
  }
}
;// CONCATENATED MODULE: ./src/js/app.js

const container = document.querySelector(".containerPost");
const timeline = new Timeline(container);
timeline.initial();
;// CONCATENATED MODULE: ./src/index.js



// TODO: write your code in app.js
/******/ })()
;