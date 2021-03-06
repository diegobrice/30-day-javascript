const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");
const toggle = player.querySelector(".toggle");
const skipButtons = player.querySelectorAll("[data-skip]");
const ranges = player.querySelectorAll(".player__slider");

function togglePlay() {
  const method = video.paused ? "play" : "pause";
  video[method]();
  // if (video.paused) {
  //   video.play();
  // } else {
  //   video.pause();
  // }
}

function updateButton() {
  const icon = this.paused ? "►" : "❚ ❚";
  toggle.textContent = icon;
}

function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
  video[this.name] = this.value;
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

function fullscreen() {
  video.requestFullscreen();
}

toggle.addEventListener("click", togglePlay);
video.addEventListener("click", togglePlay);
video.addEventListener("play", updateButton);
video.addEventListener("pause", updateButton);
video.addEventListener("timeupdate", handleProgress);
progress.addEventListener("click", scrub);
progress.addEventListener("mousemove", (e) => {
  mousePress && scrub(e);
});
let mousePress = false;
progress.addEventListener("mousedown", () => (mousePress = true));
progress.addEventListener("mouseup", () => (mousePress = false));
// progress.addEventListener("mouseout", () => (mousePress = false));
skipButtons.forEach((button) => {
  button.addEventListener("click", skip);
});
ranges.forEach((range) => {
  range.addEventListener("change", handleRangeUpdate);
});
ranges.forEach((range) => {
  range.addEventListener("mousemove", handleRangeUpdate);
});
