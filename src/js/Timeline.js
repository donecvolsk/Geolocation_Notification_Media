import CreatePost from "./createPost";

export default class Timeline {
  constructor(container) {
    this.container = container;
    this.formFuter = this.container.querySelector(".containerPost-futer");
    this.CreatePost = new CreatePost(this.container);
  }

  initial() {
    this.inputPost = this.container.querySelector(".inputPost");

    this.inputPost.addEventListener("change", (e) => {
      this.text = e.target.value;
      this.location(this.text);
      this.inputPost.value = "";
    });
  }

  location(text) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          this.CreatePost.showPost(latitude, longitude, text);
        },
        (error) => {
          console.error(error);
          this.ManualCoords(text);
        },
      );
    } else {
      console.log("browser geo API - false");
    }
  }

  ManualCoords(text) {
    this.CreatePost.showModalManualCoords();
    this.containerManualCoord = document.querySelector(".modal");
    this.inputManualCoord = document.querySelector(".modal_input");
    this.inputManualCoord.addEventListener("change", (e) => {
      this.coord = e.target.value;
      console.log(this.coord);
      this.CreatePost.ManualPost(this.coord, text);
      this.containerManualCoord.remove();
    });
  }
}
