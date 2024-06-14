export default class CreatePost {
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
