fetch(
  "https://valorant-api.com/v1/bundles/ef488eb7-4405-3b3f-7fd1-63af0824a639"
)
  .then((response) => response.json())
  .then((data) => {
    document.querySelector("#bundle-display-icon").src = data.data.displayIcon;
  })
  .catch((error) => {
    console.error("Error:", error);
  });

fetch("https://valorant-api.com/v1/weapons/skins")
  .then((response) => response.json())
  .then((data) => {
    let skins = data.data;
    let levels = [];
    skins.forEach((skin) => {
      levels.push(...skin.levels);
    });
    let selectedLevels = [];
    for (let i = 0; i < 4; i++) {
      let randomIndex = Math.floor(Math.random() * levels.length);
      let selectedLevel = levels[randomIndex];
      if (selectedLevel.displayIcon && selectedLevel.streamedVideo) {
        selectedLevels.push(selectedLevel);
        levels.splice(randomIndex, 1);
      } else {
        i--;
      }
    }

    let displayIcons = selectedLevels.map(
      (level) =>
        `<div class="display-icon-container" data-video-url="${level.streamedVideo}"><img src="${level.displayIcon}"><p>${level.displayName}</p></div>`
    );

    document.getElementById("displayIcons").innerHTML = displayIcons.join("");

    const displayIconContainers = document.querySelectorAll(
      ".display-icon-container"
    );
    displayIconContainers.forEach((container) => {
      container.addEventListener("click", function () {
        const video = document.querySelector("#videoPlayer");
        video.src = this.dataset.videoUrl;
        video.style.visibility = "visible";
        video.play();
      });
    });

    const videoPlayer = document.querySelector("#videoPlayer");
    videoPlayer.addEventListener("click", function () {
      this.style.visibility = "hidden";
      this.pause();
    });
  });
