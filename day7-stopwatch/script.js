// ===== DOM ELEMENTS =====
const timeDisplay = document.getElementById("time-display");
const startPauseBtn = document.getElementById("start-pause-btn");
const lapBtn = document.getElementById("lap-btn");
const resetBtn = document.getElementById("reset-btn");
const lapsList = document.getElementById("laps-list");

// ===== STATE =====
// create state variables :
// - elapsedTime: total milliseconds accumulated so far (starts at 0)
let elapsedTime = 0;
// - startTimestamp: value from when the current run started
let startTimestamp = null;
// - timerInterval: will hold the return value of setInterval()
let timerInterval = null;
// - isRunning: boolean, whether the stopwatch is currently running
let isRunning = false;


// ===== FORMAT TIME HELPER =====
// write formatTime(ms) that converts milliseconds into a display
function formatTime(ms) {

// - use String(value).padStart(2, "0") to keep two digits (you already
const minutes = String(Math.floor(ms/60000)).padStart(2, "0");
const seconds = String(Math.floor((ms % 60000)/1000)).padStart(2, "0");
const centiseconds = String(Math.floor((ms % 1000)/10)).padStart(2, "0");

// string like "00:00.00" (minutes:seconds.centiseconds).
const format = `${minutes}:${seconds}.${centiseconds}`
// to return string from format
return format;

};


// ===== UPDATE DISPLAY =====
// Function that calculates the current total elapsed

function updateDisplay() {
  
   
  if(isRunning){
    // to store live elapsed time
    const liveElapsed = elapsedTime+(Date.now() - startTimestamp);
    // time and sets timeDisplay.textContent using formatTime().
    timeDisplay.textContent = formatTime(liveElapsed);
  }else{
    timeDisplay.textContent = formatTime(elapsedTime);
  }
};



// ===== START / PAUSE BUTTON =====
startPauseBtn.addEventListener("click", () => {
  if (!isRunning){
    //if NOT currently running:
    //   - record startTimestamp = Date.now()
    startTimestamp = Date.now()
    //   - start a setInterval (store it in timerInterval) that calls
    //     updateDisplay() every ~10ms for smooth centisecond updates
    timerInterval = setInterval(updateDisplay, 10);
    //   - flip isRunning to true
    isRunning = true;
    //   - change button text to "Pause" and enable the Lap button
    startPauseBtn.textContent = "Pause"
    lapBtn.disabled = false;
 
  } else {
    clearInterval(timerInterval);
    // store last duration to elapsedTime so you can continue it with this value
    elapsedTime += Date.now() - startTimestamp;
    isRunning = false;
    startPauseBtn.textContent = "Start";
    //Disable lap Button
    lapBtn.disabled = true;
  }
});


// ===== LAP BUTTON =====
// for laps iteration
let num = 1
lapBtn.addEventListener("click", () => {

  if (!isRunning) return;
    // - calculate the current total elapsed time (same formula as TODO 3)
    const currentElapsed = elapsedTime+(Date.now() - startTimestamp)
    
    // - create a <li> element showing the lap number and formatted time
    const lists = document.createElement("li");
    lists.innerText = `(${num}) ${formatTime(currentElapsed)}`;

    // - append it to lapsList
    lapsList.appendChild(lists);
    num++
});


// ===== RESET BUTTON =====
resetBtn.addEventListener("click", () => {
  // - clearInterval(timerInterval), in case it's running
  clearInterval(timerInterval);
  // - reset all state variables back to their initial values
  isRunning = false;
  timerInterval = null;
  num = 1;
  startTimestamp = null;
  elapsedTime = 0;
  // - reset timeDisplay.textContent back to "00:00.00"
  timeDisplay.textContent = "00:00.00"
  // - clear out lapsList
  lapsList.innerHTML = ""
  // - reset button text/state (Start button, Lap button disabled)
  startPauseBtn.textContent = "Start";
  lapBtn.disabled = true;

});
