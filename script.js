$(document).ready(function() {
  var timer = null,
    workTime = {},
    breakTime = {},
    duration = {
      "time": 0,
      "type": ""
    };

  $("#workSlider").slider({
    value: 25,
    slide: function(event, ui) {
      $("#workTime").val(ui.value);
    }
  });

  $("#breakSlider").slider({
    value: 5,
    slide: function(event, ui) {
      $("#breakTime").val(ui.value);
    }
  });

  $("#workTime").val($("#workSlider").slider("value"));
  $("#breakTime").val($("#breakSlider").slider("value"));

  $('.timer').click(function() {
    var worktime = 60 * $("#workSlider").slider("value");
    var breaktime = 60 * $("#breakSlider").slider("value");
    workTime = {
      time: worktime,
      type: "work"
    };
    breakTime = {
      time: breaktime,
      type: "break"
    };

    if (!timer) {
      if (duration.time != 0) {
        startTimer(duration);
      } else {
        startTimer(workTime);
      }
    } else {
      pauseTimer();
    }
  });

  $('#reset').click(function() {
    resetTimer();
    $(".text").html("click me<br>to start!");
  });

  function pauseTimer() {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  }

  function resetTimer() {
    if (timer) {
      pauseTimer();
      duration.time = 0;
      duration.type = "";
      stop();
      $("#workSlider").slider('value', 25);
      $("#workTime").val(25);
      $("#breakSlider").slider('value', 5);
      $("#breakTime").val(5);
    }
  }

  function startTimer(obj) {
    var minutes, seconds, type;
    duration = obj;
    timer = setInterval(function() {
      minutes = parseInt(duration.time / 60, 10);
      seconds = parseInt(duration.time % 60, 10);

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;
      if (obj.type == "work") {
        $(".text").html("work time<br>" + minutes + ":" + seconds);
      } else {
        $(".text").html("break time<br>" + minutes + ":" + seconds);
      }
      if (--duration.time < 0) {
        var audio = new Audio('https://dl.dropboxusercontent.com/u/93114194/8.%20Pomodoro%20Clock/media/ringing-clock.mp3');
        audio.play();
        pauseTimer();
        if (duration.type == "work") {
          var worktime = 60 * $("#workSlider").slider("value");
          workTime.time = worktime;
          startTimer(breakTime);
        } else {
          var breaktime = 60 * $("#breakSlider").slider("value");
          breakTime.time = breaktime;
          startTimer(workTime);
        }
      }
    }, 1000);
  }

});