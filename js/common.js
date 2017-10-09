'use strict';

document.addEventListener("DOMContentLoaded", function() {
    
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
        timeStatus = false,
        goTimer;

    var stepsArr = [];

    if(localStorage["timeSteps"]) {
        stepsArr =  JSON.parse(localStorage["timeSteps"]);
    }   
    

    /* start timer */

    function startTimer () {
        var startTime = minutesStep * 60 + secondsStep;

        if(timeStatus === true) {
            return false;
        }
        timeStatus = true;
        if(stopBtn.classList.contains("js-reset")) {
            stopBtn.classList.add("js-stop");
            stopBtn.classList.remove("red", "js-reset");
            stopBtn.innerHTML = "Stop";
        }
        goTimer = setInterval(function(){
            startTime++;
            secondsStep = startTime % 60;
            minutesStep = (startTime - secondsStep) / 60;
            var timesVal = setTime(minutesStep, secondsStep);
            minutes.innerHTML = timesVal[0];
            seconds.innerHTML = timesVal[1];
        }, 1000);
    }

    function writeLS() {
        localStorage.setItem("timeSteps", JSON.stringify(stepsArr));
    }
    
    function setTime(min, sec) {
        var minVal, secVal;

        if(secondsStep < 10) {
            secVal = "0" + sec;
        } else {
            secVal = sec;
        }
        if(minutesStep < 10) {
            minVal = "0" + min;
        } else {
            minVal = min;
        }

        return [minVal, secVal];
    }

    /* display steps */

    function displaySteps() {
        for(var i = 0; i < stepsArr.length; i++) {
            var step = document.createElement("div"),
                stepTime,
                stepStart,
                stepRemove;
            stepStart = document.createElement("button");
            stepStart.className = "js-stepStart stepStart";
            stepRemove = document.createElement("button");
            stepRemove.className = "js-stepRemove stepRemove";
            step.className = "step";
            step.appendChild(stepStart);
            stepTime = document.createElement("span");
            stepTime.textContent = stepsArr[i]["min"] + " : " + stepsArr[i]["sec"];
            step.appendChild(stepTime);
            step.appendChild(stepRemove);
            step.setAttribute("data-key", stepsArr[i]["id"]);
            stepList.appendChild(step);
        }
    }

    displaySteps();

    /* events */ 

    startBtn.addEventListener("click", function(){
        startTimer();
    });

    stepBtn.addEventListener("click", function() {
        if(timeStatus === false) {
            return false;
        }
        var stepObj = {};
        var timesVal = setTime(minutesStep, secondsStep);

        if(stepsArr.length === 0) {
            stepObj["id"] = "0";
        } else {
            stepObj["id"] = parseInt(stepsArr[stepsArr.length -1]["id"]) + 1 + "";
        }

        stepObj["min"] = timesVal[0];
        stepObj["sec"] = timesVal[1];
        stepsArr.push(stepObj);
        stepList.innerHTML = "";

        writeLS();
        displaySteps();
    });

    stopBtn.addEventListener("click", function() {
        if(this.classList.contains("js-stop")) {
            timeStatus = false;
            clearInterval(goTimer);
            this.classList.remove("js-stop");
            this.classList.add("red", "js-reset");
            this.innerHTML = "Reset";
        } else if (this.classList.contains("js-reset")) {
            minutes.innerHTML = "00";
            seconds.innerHTML = "00";
            minutesStep = 0;
            secondsStep = 0;
            this.classList.add("js-stop");
            this.classList.remove("red", "js-reset");
            this.innerHTML = "Stop";
        }
    });

    document.addEventListener("click", function(e) {
        if(e.target.classList.contains("js-stepRemove")) {
            var clickedStep = e.target.parentNode;
            var clickedId = clickedStep.getAttribute("data-key");
            var stepInd = getIndex(clickedId);
            stepsArr.splice(stepInd, 1);
            clickedStep.parentNode.removeChild(clickedStep);
            writeLS();
        }
    });

    function getIndex(currentId) {
         return stepsArr.findIndex(function(elem) {
             return elem["id"] === currentId;
         });
    }

    document.addEventListener("click", function(e) {
        if(timeStatus === true) {
            return false;
        }
        if(e.target.classList.contains("js-stepStart")) {
            var clickedStep = e.target.parentNode;
            var clickedId = clickedStep.getAttribute("data-key");
            var stepInd = getIndex(clickedId);
            minutesStep = stepsArr[stepInd]["min"];
            secondsStep = stepsArr[stepInd]["sec"];
            minutes.innerHTML = minutesStep;
            seconds.innerHTML = secondsStep;
            startTimer();
        }
    })

});