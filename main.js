/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/js/createPost.js
class CreatePost {
  constructor(container) {
    this.container = container;
  }
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
          <input data-id="modalInput" name="coords" class="modal_input" placeholder="Введите координаты, например: -90.12345, 180.12345" required>
        </div>       
      </div>
    </div>
    `;
    this.container.insertAdjacentHTML("afterBegin", modalManualCoordsHtml);
  }
  ManualPost(latitude, val) {
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
      <div class="coordinates">[${latitude}]</div>
    </div>
        `;
    this.container.insertAdjacentHTML("afterBegin", postHtml);
  }
}
;// CONCATENATED MODULE: ./src/js/Timeline.js

class Timeline {
  constructor(container) {
    this.container = container;
    this.formFuter = this.container.querySelector(".containerPost-futer");
    this.CreatePost = new CreatePost(this.container);
  }
  initial() {
    this.inputPost = this.container.querySelector(".inputPost");
    this.inputPost.addEventListener("change", e => {
      this.text = e.target.value;
      this.location(this.text);
      this.inputPost.value = "";
    });
  }
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
  ManualCoords(text) {
    this.CreatePost.showModalManualCoords();
    this.containerManualCoord = document.querySelector(".modal");
    this.inputManualCoord = document.querySelector(".modal_input");
    this.inputManualCoord.addEventListener("change", e => {
      this.coord = e.target.value;
      console.log(this.coord);
      this.CreatePost.ManualPost(this.coord, text);
      this.containerManualCoord.remove();
    });
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