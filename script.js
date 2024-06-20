let startTime, updatedTime, difference, tInterval;
let running = false;
let lapCounter = 1;

const startStopButton = document.getElementById('startStop');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const display = document.getElementById('display');
const laps = document.getElementById('laps');

startStopButton.addEventListener('click', startStop);
resetButton.addEventListener('click', reset);
lapButton.addEventListener('click', lap);

function startStop() {
    if (!running) {
        startTime = new Date().getTime() - (difference || 0);
        tInterval = setInterval(getShowTime, 10);
        startStopButton.innerHTML = 'Stop';
        startStopButton.style.backgroundColor = '#dc3545';
        running = true;
    } else {
        clearInterval(tInterval);
        difference = new Date().getTime() - startTime;
        startStopButton.innerHTML = 'Start';
        startStopButton.style.backgroundColor = '#28a745';
        running = false;
    }
}

function reset() {
    clearInterval(tInterval);
    running = false;
    startStopButton.innerHTML = 'Start';
    startStopButton.style.backgroundColor = '#28a745';
    display.innerHTML = '00:00:00.00';
    difference = 0;
    lapCounter = 1;
    laps.innerHTML = '';
}

function lap() {
    if (running) {
        const lapTime = document.createElement('li');
        lapTime.innerHTML = `Lap ${lapCounter++}: ${display.innerHTML}`;
        laps.appendChild(lapTime);
    }
}

function getShowTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    
    let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);
    let milliseconds = Math.floor((difference % 1000) / 10);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    milliseconds = (milliseconds < 10) ? "0" + milliseconds : milliseconds;

    display.innerHTML = hours + ':' + minutes + ':' + seconds + '.' + milliseconds;
}
