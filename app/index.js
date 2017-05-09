import "./index.css";
import { vid, playerDefaults } from "./videos.js";
import $ from "jquery";

var currVid = 0;
var player;

$("body").dblclick(function () {
  window.location = "https://www.youtube.com/watch?v=" + vid[currVid].videoId;
});
function getActualHeight() {
  var actualHeight = window.innerHeight ||
    document.documentElement.clientHeight ||
    document.body.clientHeight ||
    document.body.offsetHeight;

  return actualHeight;

}
function getActualWidth() {
  var actualWidth = window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth ||
    document.body.offsetWidth;

  return actualWidth;

}

function resizePlayer() {
  var h = getActualHeight(),
    w = getActualWidth(),
    element = document.getElementById("player");
  element.style.height = h + "px";
  element.style.width = w + "px";
}

window.onresize = resizePlayer;
window.onload = resizePlayer;
// 2. This code loads the IFrame Player API code asynchronously.

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.

/* eslint-disable no-unused-vars */
window.onYouTubeIframeAPIReady = function () {
  // console.log("onYoutubeIframeAPIReady");
  player = new YT.Player("player", {

    events: {
      "onReady": onPlayerReady,
      "onStateChange": onPlayerStateChange
    },
    playerVars: playerDefaults
  });
};

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
  // player.playVideo();
  // player.mute();
  // resizePlayer();
  if(vid[0]===undefined) {
      setTimeout(onPlayerReady,100);//wait for firebase video data to come in
      console.log("waiting for Firebase");
      return;
  }    
  document.getElementById("blurb").innerHTML = vid[currVid].message;
  player.loadVideoById(vid[currVid]);
  player.mute();
//  console.log("starting with " + vid[currVid].videoId + " at " + vid[currVid].startSeconds + " till " + vid[currVid].endSeconds);
}

// 5. The API calls this function when the player"s state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;
/* global YT */
function onPlayerStateChange(event) {
  // if (event.data == YT.PlayerState.PLAYING && !done) {
  //   setTimeout(switchVideo, 15000);
  //   done = true;
  // }
  // console.log("onPlayerStateChange " + event.data);
  if (event.data === 1) {
    document.getElementById("player").className += "active";

  } else if (event.data === 2) {

    if (currVid === vid.length - 1) {
      currVid = 0;
    } else {
      currVid++;
    }
    //  console.log(vid[currVid].message);
    document.getElementById("blurb").innerHTML = vid[currVid].message;
    player.loadVideoById(vid[currVid]);
    console.log("loading " + vid[currVid].videoId + " at " + vid[currVid].startSeconds + " till " + vid[currVid].endSeconds);

    //  player.seekTo(vid[currVid].startSeconds);
  }

}

// function switchVideo() {
//   setTimeout(switchVideo, 15000);
//   currVid = (currVid + 1) % vid.length;
//   player.loadVideoById(vid[currVid].videoId);
//   document.getElementById("blurb").innerHTML = vid[currVid].message;
//   // console.log(currVid);
// }

var tag = document.createElement("script");

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
// console.log("iframe_api initiated");




$(document).ready(function () {
  $(".btn").click(function () {
    $("#myModal").modal("show");
    // console.log("click");
  });
});
/* form validation plugin */
$.fn.goValidate = function () {
  var $form = this,
    $inputs = $form.find("input:text");

  var validators = {
    name: {
      regex: /^[A-Za-z]{3,}$/
    },
    pass: {
      regex: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/
    },
    email: {
      regex: /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/
    },
    phone: {
      regex: /^[2-9]\d{2}-\d{3}-\d{4}$/,
    }
  };
  var validate = function (klass, value) {
    var isValid = true,
      error = "";

    if (!value && /required/.test(klass)) {
      error = "This field is required";
      isValid = false;
    } else {
      klass = klass.split(/\s/);
      $.each(klass, function (i, k) {
        if (validators[k]) {
          if (value && !validators[k].regex.test(value)) {
            isValid = false;
            error = validators[k].error;
          }
        }
      });
    }
    return {
      isValid: isValid,
      error: error
    };
  };
  var showError = function ($input) {
    var klass = $input.attr("class"),
      value = $input.val(),
      test = validate(klass, value);

    $input.removeClass("invalid");
    $("#form-error").addClass("hide");

    if (!test.isValid) {
      $input.addClass("invalid");

      if (typeof $input.data("shown") == "undefined" || $input.data("shown") == false) {
        $input.popover("show");
      }

    }
    else {
      $input.popover("hide");
    }
  };

  $inputs.keyup(function () {
    showError($(this));
  });

  $inputs.on("shown.bs.popover", function () {
    $(this).data("shown", true);
  });

  $inputs.on("hidden.bs.popover", function () {
    $(this).data("shown", false);
  });

  $form.submit(function (e) {

    $inputs.each(function () { /* test each input */
      if ($(this).is(".required") || $(this).hasClass("invalid")) {
        showError($(this));
      }
    });
    if ($form.find("input.invalid").length) { /* form is not valid */
      e.preventDefault();
      $("#form-error").toggleClass("hide");
    }
  });
  return this;
};
$("form").goValidate();

