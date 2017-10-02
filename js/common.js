'use strict';

document.addEventListener("DOMContentLoaded", function(e) { 
    
    var timeField = document.getElementsByClassName("js-timeField")[0],
        seconds = document.getElementsByClassName("js-seconds")[0],
        minutes = document.getElementsByClassName("js-minutes")[0],
        startBtn = document.getElementsByClassName("js-startBtn")[0],
        stepBtn = document.getElementsByClassName("js-stepBtn")[0],
        stopBtn = document.getElementsByClassName("js-stopBtn")[0],
        stepList = document.getElementsByClassName("js-stepList")[0],
        stepItem = document.getElementsByClassName("js-stepItem"),
        secondsStep = 0,
        minutesStep = 0,
        timeStatus = "disable",
        goTimer;

    var stepsArr = {};

    if(localStorage["timeSteps"]) {
        stepsArr =  JSON.parse(localStorage["timeSteps"]);
    }   
    

    /* start timer */

    function startTimer () {
        var startTime = minutesStep * 60 + secondsStep;

        timeStatus = "active";
        if(stopBtn.classList.contains("js-reset")) {
            stopBtn.classList.add("js-stop");
            stopBtn.classList.remove("red", "js-reset");
            stopBtn.innerHTML = "Stop";
        }
        goTimer = setInterval(function(){
            startTime++;
            secondsStep = startTime % 60;
            minutesStep = (startTime - secondsStep) / 60;

            if(secondsStep < 10) {
                seconds.innerHTML = "0" + secondsStep;
            } else {
                seconds.innerHTML = secondsStep;
            }

            if(minutesStep < 10) {
                minutes.innerHTML = "0" + minutesStep;
            } else {
                minutes.innerHTML = minutesStep;
            }

        }, 1000);
    }

    function writeLS() {
        localStorage.setItem("timeSteps", JSON.stringify(stepsArr));
    }
    
    /* display steps */

    function displaySteps() {
        for(var key in stepsArr) {
            var step = document.createElement("div");
            step.className = "step js-stepItem ";
            step.textContent = stepsArr[key];
            step.setAttribute("data-key", key);
            stepList.appendChild(step);
        }
    }

    displaySteps();

    /* events */ 

    startBtn.addEventListener("click", function(e){
        e.preventDefault();
        startTimer();
    });

    stepBtn.addEventListener("click", function(e) {
        var addSec,
            addMin,
            newKey; 

        e.preventDefault();
        if(minutesStep < 10) {
            addMin = "0" + minutesStep;
        } else {
            addMin = minutesStep;
        }
        if(secondsStep < 10) {
            addSec = "0" + secondsStep;
        } else {
            addSec = secondsStep;
        }

        if(Object.keys(stepsArr).length == 0) {
            newKey = 0;
        } else {
            var arrKeys = Object.keys(stepsArr);
            newKey = parseInt(arrKeys[arrKeys.length - 1]) + 1;
        }

        stepsArr[newKey] = addMin + ":" + addSec;
        stepList.innerHTML = "";

        writeLS();
        displaySteps();
    })

    stopBtn.addEventListener("click", function() {
        if(this.classList.contains("js-stop")) {
            e.preventDefault();
            timeStatus = "disable"
            clearInterval(goTimer);
            this.classList.remove("js-stop");
            this.classList.add("red", "js-reset");
            this.innerHTML = "Reset";
        } else if (this.classList.contains("js-reset")) {
            e.preventDefault();
            minutes.innerHTML = "00";
            seconds.innerHTML = "00";
            minutesStep, secondsStep = 0;
            this.classList.add("js-stop");
            this.classList.remove("red", "js-reset");
            this.innerHTML = "Stop";
        }
    })

    document.addEventListener("click", function(e) {
        if(e.target.classList.contains("js-stepItem")) {
            var itemKey = e.target.getAttribute("data-key");
            delete stepsArr[itemKey];
            e.target.parentNode.removeChild(e.target);
            writeLS();
        }
    })

});