// Circle Progress
let circularProgress = document.querySelector(
    ".current_consumption-circle-progress"
  ),
  progressValue = document.querySelector(".progress-value");

let progressStartValue = 0,
  progressEndValue = 25,
  speed = 30;

let progress = setInterval(() => {
  progressStartValue++;

  progressValue.textContent = `${progressStartValue}%`;
  circularProgress.style.background = `conic-gradient(#f7d90f, ${
    progressStartValue * 3.6
  }deg, #262424 0deg)`;

  if (progressStartValue == progressEndValue) {
    clearInterval(progress);
  }
}, speed);


//Progress bar
const progressBar = document.querySelector('.indicator-progress-bar');
const valueProgressBar = progressBar.dataset.progress;

if(valueProgressBar > 0){
  progressBar.style.opacity = "1";
  progressBar.style.width = `${valueProgressBar}%`;
}