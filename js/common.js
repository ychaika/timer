'use strict';

document.addEventListener("DOMContentLoaded", function(e) { 
    
    var timeField = document.getElementsByClassName("js-timeField")[0],
        seconds = document.getElementsByClassName("js-seconds")[0],
        minutes = document.getElementsByClassName("js-minutes")[0],
        stopBtn = document.getElementsByClassName("js-stop")[0];

    var goTimer;

    /* start timer */

    function startTimer (point) {
        if(timeField.classList.contains("active")) {
            return false
        }
        if(document.getElementsByClassName("js-reset")[0]) {
            document.getElementsByClassName("js-reset")[0].classList.add("js-stop");
            document.getElementsByClassName("js-reset")[0].classList.remove("red", "js-reset");
            document.getElementsByClassName("js-stop")[0].innerHTML = "Stop";
        }
        timeField.classList.add("active");
        var startTime = point;
        goTimer = setInterval(function(){
            startTime++;

            if(startTime < 10) {
                seconds.innerHTML = "0" + startTime;
            } else if(startTime > 59) {
                seconds.innerHTML
                var secondsPart = startTime % 60;
                if (secondsPart < 10) {
                    seconds.innerHTML = "0" + secondsPart;
                } else {
                    seconds.innerHTML = secondsPart;
                }
                var fullMinutes = (startTime - seconds.innerHTML) / 60;
                if(fullMinutes < 10) {
                    minutes.innerHTML = "0" + fullMinutes;
                } else {
                    minutes.innerHTML = fullMinutes;
                }
            } else {
                seconds.innerHTML =  startTime;
            }
        }, 1000);

    }

    /* make step */ 

    function makeStep() {
        var step = document.createElement("div");
        step.className = "step";
        step.textContent = minutes.innerHTML + ":" + seconds.innerHTML;
        document.getElementsByClassName("js-stepList")[0].appendChild(step);
    }

    /* stop timer */ 

    function stopTimer () {
        timeField.classList.remove("active");
        clearInterval(goTimer);
        stopBtn.innerHTML = "Reset";
        stopBtn.classList.remove("js-stop");
        setTimeout(function() {
            stopBtn.classList.add("red", "js-reset");
        }, 10);
    }

    /* events */ 

    document.getElementsByClassName("js-start")[0].addEventListener("click", function(e){
        e.preventDefault();
        var point = parseInt(minutes.innerHTML) * 60 + parseInt(seconds.innerHTML);
        startTimer(point);
    });

    document.getElementsByClassName("js-step")[0].addEventListener("click", function(e) {
        e.preventDefault();
        makeStep();
    })

    // stopBtn.addEventListener("click", function(e) {
    //     e.preventDefault();
    //     stopTimer();
    // })

    document.addEventListener("click", function(e) {
        if(e.target.classList.contains("js-stop")) {
            e.preventDefault();
            stopTimer();
        }
    })

    document.addEventListener("click", function(e) {
        if(e.target.classList.contains("js-reset")) {
            e.preventDefault();
            minutes.innerHTML = "00";
            seconds.innerHTML = "00";
            e.target.classList.add("js-stop");
            e.target.classList.remove("red", "js-reset");
            e.target.innerHTML = "Stop";
        }
    })

});