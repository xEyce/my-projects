
const watch = document.getElementById("watch");
let timer = null;
let startTime = 0;
let elapsedTime = 0;
let isRunning = false;  


function playBtn() {

    if (!isRunning) {
        startTime = Date.now() - elapsedTime;
        timer = setInterval(update, 1000);
        isRunning = true;
    }

    console.log(startTime);
};

function stopBtn() {

    if (isRunning) {
        clearInterval(timer);
        elapsedTime = Date.now() - startTime;
        isRunning = false;
    }
};

function resetBtn() {
    clearInterval(timer);
    startTime = 0;
    elapsedTime = 0;
    isRunning = false; 
    watch.textContent = "00:00:00";
}

function update() {

    const currentTime = Date.now();
    elapsedTime = currentTime - startTime;

    let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
    let minutes = Math.floor(elapsedTime / (1000 * 60) % 60);
    let seconds = Math.floor(elapsedTime / 1000 % 60);
   
    hours = String(hours).padStart(2, "0");
    minutes = String(minutes).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");

    watch.textContent = `${hours}:${minutes}:${seconds}`;
};