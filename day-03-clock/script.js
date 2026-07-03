// DAY 3: DIGITAL CLOCK + ALARM
// Goal: Display real-time clock, allow setting alarms

// new concepts:
// - new Date()         → get actual date and time(Hours, Minutes, Seconds)
// - setInterval(fn, ms) → run fn every ms milliseconds (1000ms = 1 second)
// - Alarm = comparison between current time and user-set time



// 1. get DOM elements: clock display, alarm input, set alarm button, clear alarm button, alarm status
const clockDisplay = document.querySelector("#clock");
const alrmInput = document.querySelector("#alarmInput");
const setAlarm = document.querySelector("#setAlarmBtn");
const clearAlarm = document.querySelector("#clearAlarmBtn");
const alarmStatus = document.querySelector("#alarmStatus");

let alarmTime = null; // Variable for storing the alarm time in "HH:MM" format

// 2. Create function updateClock() to: update the clock display every second
//    - get current time using new Date()
//    - get hours, minutes, seconds
//    - Format them to 2 digits (padStart)
//    - Display in clockDisplay
//    - Check if current time matches alarmTime, if yes, Trigger alert and reset alarmTime
function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");
    clockDisplay.textContent = `${hours}:${minutes}:${seconds}`;
    
    // Check alarm
    if (alarmTime && `${hours}:${minutes}` === alarmTime) {
        Beep(); // Call Beep function to play sound when the alarm time is reached
        alarmTime = null; // Reset alarm after it rings
        alarmStatus.textContent = "Alarm cleared.";
    }

};

// 3. run updateClock() every second using setInterval
setInterval(updateClock, 1000);

// 4. when "Set Alarm" button is clicked:
//    - get value from alrmInput
//    - store it in alarmTime
//    - update alarmStatus to show the set time
setAlarm.addEventListener("click", () => {
    const timeValue = alrmInput.value;
    if (timeValue) {
        alarmTime = timeValue;
       
        alarmStatus.textContent = `Alarm set for ${alarmTime}`;
    }
});

// 5. when "Clear Alarm" button is clicked:
//    - Reset alarmTime to null
//    - Update the alarm status on the screen

clearAlarm.addEventListener('click', () => {
    alarmTime = null;
    alarmStatus.textContent = "Alarm cleared";
});

// 6. in the updateClock() function, check if current time matches alarmTime
//    - get current time in "HH:MM" format
//    - compare it with alarmTime
//    - if match, trigger alert and reset alarmTime
//    - reset alarmStatus to show that alarm is cleared

//function Beep() for Web Audio API
function Beep() {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    
    // calculate the end time for the beep sound (15 seconds from now)
    const endTime = Date.now() + 15000; 

    // run a loop every second to play the beep sound for 500ms, then wait for 500ms before the next beep
    const intervalSuara = setInterval(() => {
            // Check if 15 seconds have passed
            if (Date.now() >= endTime) {
                clearInterval(intervalSuara); // stop the interval
                audioCtx.close();              // close the audio context to free resources
            
                return;
            }

        // --- Make one beep sound session (500ms) ---
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(440, audioCtx.currentTime); // Frequency (A4 note)
        gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);        // Volume

        // start beep sound
        oscillator.start();
        
        // stop beep sound after 500ms
        setTimeout(() => {
            oscillator.stop();
            oscillator.disconnect();
        }, 500);

    }, 1000); // 1000ms reason sound+interval is 1 second, so beep sound will play every second for 15 seconds
}
