let startTime;
let updatedTime;
let difference = 0;  // Initialize difference to 0
let timerInterval;
let isRunning = false;
let lapCounter = 0;

const display = document.getElementById("display");
const startStopBtn = document.getElementById("startStopBtn");
const resetBtn = document.getElementById("resetBtn");
const lapBtn = document.getElementById("lapBtn");
const lapsContainer = document.getElementById("laps");
const clock = document.getElementById("clock");

function startStop() {
    if (isRunning) {
        clearInterval(timerInterval);
        startStopBtn.textContent = "Start";
        startStopBtn.classList.remove("pause");
        startStopBtn.classList.add("start");
    } else {
        startTime = new Date().getTime() - difference;
        timerInterval = setInterval(updateTime, 10);
        startStopBtn.textContent = "Pause";
        startStopBtn.classList.remove("start");
        startStopBtn.classList.add("pause");
    }
    isRunning = !isRunning;
}

function reset() {
    clearInterval(timerInterval);
    isRunning = false;
    difference = 0;
    display.textContent = "00:00:00.00";
    startStopBtn.textContent = "Start";
    startStopBtn.classList.remove("pause");
    startStopBtn.classList.add("start");
    lapsContainer.innerHTML = "";
    lapCounter = 0;
}

function lap() {
    if (isRunning) {
        lapCounter++;
        const lapTime = document.createElement("div");
        lapTime.textContent = `Lap ${lapCounter}: ${display.textContent}`;
        lapsContainer.appendChild(lapTime);
    }
}

function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    display.textContent = formatTime(difference);
}

function formatTime(ms) {
    const date = new Date(ms);
    const minutes = ("0" + date.getUTCMinutes()).slice(-2);
    const seconds = ("0" + date.getUTCSeconds()).slice(-2);
    const milliseconds = ("0" + Math.floor(date.getUTCMilliseconds() / 10)).slice(-2);
    return `${minutes}:${seconds}.${milliseconds}`;
}

function updateClock() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = ("0" + (hours % 12 || 12)).slice(-2);
    const formattedMinutes = ("0" + minutes).slice(-2);
    const formattedSeconds = ("0" + seconds).slice(-2);
    clock.textContent = `${formattedHours}:${formattedMinutes}:${formattedSeconds} ${ampm}`;
}

startStopBtn.addEventListener("click", startStop);
resetBtn.addEventListener("click", reset);
lapBtn.addEventListener("click", lap);
setInterval(updateClock, 1000);
