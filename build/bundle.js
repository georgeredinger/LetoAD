/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 10);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.playerDefaults = exports.vid = undefined;

__webpack_require__(4);

//vijeo-b0779


var vid = exports.vid = [];

var playerDefaults = exports.playerDefaults = {
    autoplay: 0,
    autohide: 1,
    modestbranding: 1,
    rel: 0,
    showinfo: 0,
    controls: 0,
    disablekb: 1,
    enablejsapi: 1,
    iv_load_policy: 3,
    videoId: vid[0]
};

var config = {
    apiKey: "AIzaSyCiar5eKbqIxcWVbXjVk6SGo0EKfwz3JNo",
    authDomain: "vijeo-b0779.firebaseapp.com",
    databaseURL: "https://vijeo-b0779.firebaseio.com",
    projectId: "vijeo-b0779",
    storageBucket: "vijeo-b0779.appspot.com",
    messagingSenderId: "690081698978"
};
firebase.initializeApp(config);
firebase.auth().signInAnonymously().catch(function (error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorMessage);
});
var vidRef = firebase.database().ref("/videos");
vidRef.once('value').then(function (snap) {
    exports.vid = vid = snap.val();
    // for (let i in vid) {
    //     console.log(vid[i].message);
    // }
    // console.table(vid);
});

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(8);

var _videos = __webpack_require__(0);

var _jquery = __webpack_require__(5);

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var currVid = 0;
var player;

(0, _jquery2.default)("body").dblclick(function () {
  window.location = "https://www.youtube.com/watch?v=" + _videos.vid[currVid].videoId;
});
function getActualHeight() {
  var actualHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || document.body.offsetHeight;

  return actualHeight;
}
function getActualWidth() {
  var actualWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth || document.body.offsetWidth;

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
    playerVars: _videos.playerDefaults
  });
};

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
  // player.playVideo();
  // player.mute();
  // resizePlayer();
  if (_videos.vid[0] === undefined) {
    setTimeout(onPlayerReady, 100); //wait for firebase video data to come in
    console.log("waiting for Firebase");
    return;
  }
  document.getElementById("blurb").innerHTML = _videos.vid[currVid].message;
  player.loadVideoById(_videos.vid[currVid]);
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

    if (currVid === _videos.vid.length - 1) {
      currVid = 0;
    } else {
      currVid++;
    }
    //  console.log(vid[currVid].message);
    document.getElementById("blurb").innerHTML = _videos.vid[currVid].message;
    player.loadVideoById(_videos.vid[currVid]);
    console.log("loading " + _videos.vid[currVid].videoId + " at " + _videos.vid[currVid].startSeconds + " till " + _videos.vid[currVid].endSeconds);

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


(0, _jquery2.default)(document).ready(function () {
  (0, _jquery2.default)(".btn").click(function () {
    (0, _jquery2.default)("#myModal").modal("show");
    // console.log("click");
  });
});
/* form validation plugin */
_jquery2.default.fn.goValidate = function () {
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
      regex: /^[2-9]\d{2}-\d{3}-\d{4}$/
    }
  };
  var validate = function validate(klass, value) {
    var isValid = true,
        error = "";

    if (!value && /required/.test(klass)) {
      error = "This field is required";
      isValid = false;
    } else {
      klass = klass.split(/\s/);
      _jquery2.default.each(klass, function (i, k) {
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
  var showError = function showError($input) {
    var klass = $input.attr("class"),
        value = $input.val(),
        test = validate(klass, value);

    $input.removeClass("invalid");
    (0, _jquery2.default)("#form-error").addClass("hide");

    if (!test.isValid) {
      $input.addClass("invalid");

      if (typeof $input.data("shown") == "undefined" || $input.data("shown") == false) {
        $input.popover("show");
      }
    } else {
      $input.popover("hide");
    }
  };

  $inputs.keyup(function () {
    showError((0, _jquery2.default)(this));
  });

  $inputs.on("shown.bs.popover", function () {
    (0, _jquery2.default)(this).data("shown", true);
  });

  $inputs.on("hidden.bs.popover", function () {
    (0, _jquery2.default)(this).data("shown", false);
  });

  $form.submit(function (e) {

    $inputs.each(function () {
      /* test each input */
      if ((0, _jquery2.default)(this).is(".required") || (0, _jquery2.default)(this).hasClass("invalid")) {
        showError((0, _jquery2.default)(this));
      }
    });
    if ($form.find("input.invalid").length) {
      /* form is not valid */
      e.preventDefault();
      (0, _jquery2.default)("#form-error").toggleClass("hide");
    }
  });
  return this;
};
(0, _jquery2.default)("form").goValidate();

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(undefined);
// imports


// module
exports.push([module.i, "  body {\n            /*background: #000;*/\n            background:burlywood;\n        }\n\n        a {\n            color: #ff0;\n        }\n\n        h1 {\n            position: absolute;\n            top: 0;\n            left: 2%;\n            width: 100%;\n            font-size: 36px;\n            letter-spacing: 3px;\n            color: #fff;\n            font-family: Oswald, sans-serif;\n            text-align: left;\n        }\n\n        h1 span {\n            font-family: sans-serif;\n            letter-spacing: 0;\n            font-weight: 300;\n            font-size: 16px;\n            line-height: 24px;\n        }\n\n        h1 span a {\n            color: #fff;\n        }\n\n        h2 {\n            position: absolute;\n            top: 95%;\n            width: 100%;\n            font-size: 26px;\n            letter-spacing: 3px;\n            color: #fff;\n            font-family: Oswald, sans-serif;\n            text-align: center;\n        }\n\n        h2 span {\n            font-family: sans-serif;\n            letter-spacing: 0;\n            font-weight: 300;\n            font-size: 16px;\n            line-height: 34px;\n        }\n\n        h2 span a {\n            color: #fff;\n        }\n\n        #player {\n            position: absolute;\n            top: 0;\n            left: 0;\n            z-index: 1;\n            width: 100%;\n            height: 100%;\n            overflow: hidden;\n        }\n            .screen {\n                position: absolute;\n                top: 0;\n                right: 0;\n                bottom: 0;\n                left: 0;\n                z-index: 1;\n                margin: auto;\n                opacity: 0;\n                transition: opacity .5s;\n            }\n\n\n        article {\n            /*  just a fancy border  */\n            position: absolute;\n            top: 0;\n            left: 0;\n            right: 0;\n            bottom: 0;\n            /*border: 10px solid rgba(255, 255, 255, 0.5);*/\n            margin: 10px;\n            z-index: 10;\n        }\n\n        #blurb {\n            position: absolute;\n            top: 80%;\n            width: 100%;\n            font-size: 36px;\n            letter-spacing: 3px;\n            color: #fff;\n            font-family: Oswald, sans-serif;\n            text-align: center;\n            z-index: 12;\n        }\n", ""]);

// exports


/***/ }),
/* 3 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/*! @license Firebase v3.0.1
    Build: 3.0.1-rc.2
    Terms: https://developers.google.com/terms */
(function() { var h="undefined"!=typeof window&&window===this?this:"undefined"!=typeof global?global:this,l=function(){h.Symbol||(h.Symbol=aa);l=function(){}},ba=0,aa=function(a){return"jscomp_symbol_"+a+ba++},m=function(){l();h.Symbol.iterator||(h.Symbol.iterator=h.Symbol("iterator"));m=function(){}},ca=function(){var a=["next","error","complete"];m();if(a[h.Symbol.iterator])return a[h.Symbol.iterator]();var b=0;return{next:function(){return b==a.length?{done:!0}:{done:!1,value:a[b++]}}}},p=this,q=function(){},
r=function(a){var b=typeof a;if("object"==b)if(a){if(a instanceof Array)return"array";if(a instanceof Object)return b;var c=Object.prototype.toString.call(a);if("[object Window]"==c)return"object";if("[object Array]"==c||"number"==typeof a.length&&"undefined"!=typeof a.splice&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("splice"))return"array";if("[object Function]"==c||"undefined"!=typeof a.call&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("call"))return"function"}else return"null";
else if("function"==b&&"undefined"==typeof a.call)return"object";return b},t=function(a){return"function"==r(a)},da=function(a,b,c){return a.call.apply(a.bind,arguments)},ea=function(a,b,c){if(!a)throw Error();if(2<arguments.length){var d=Array.prototype.slice.call(arguments,2);return function(){var c=Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(c,d);return a.apply(b,c)}}return function(){return a.apply(b,arguments)}},u=function(a,b,c){u=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?
da:ea;return u.apply(null,arguments)},v=function(a,b){var c=Array.prototype.slice.call(arguments,1);return function(){var b=c.slice();b.push.apply(b,arguments);return a.apply(this,b)}},w=function(a,b){function c(){}c.prototype=b.prototype;a.ba=b.prototype;a.prototype=new c;a.prototype.constructor=a;a.aa=function(a,c,g){for(var k=Array(arguments.length-2),f=2;f<arguments.length;f++)k[f-2]=arguments[f];return b.prototype[c].apply(a,k)}};function __extends(a,b){function c(){this.constructor=a}for(var d in b)b.hasOwnProperty(d)&&(a[d]=b[d]);a.prototype=null===b?Object.create(b):(c.prototype=b.prototype,new c)}
function __decorate(a,b,c,d){var e=arguments.length,g=3>e?b:null===d?d=Object.getOwnPropertyDescriptor(b,c):d,k;if("object"===typeof Reflect&&"function"===typeof Reflect.decorate)g=Reflect.decorate(a,b,c,d);else for(var f=a.length-1;0<=f;f--)if(k=a[f])g=(3>e?k(g):3<e?k(b,c,g):k(b,c))||g;return 3<e&&g&&Object.defineProperty(b,c,g),g}function __metadata(a,b){if("object"===typeof Reflect&&"function"===typeof Reflect.metadata)return Reflect.metadata(a,b)}
var __param=function(a,b){return function(c,d){b(c,d,a)}},__awaiter=function(a,b,c,d){return new (c||(c=Promise))(function(e,g){function k(a){try{n(d.next(a))}catch(b){g(b)}}function f(a){try{n(d.throw(a))}catch(b){g(b)}}function n(a){a.done?e(a.value):(new c(function(b){b(a.value)})).then(k,f)}n((d=d.apply(a,b)).next())})};var x=function(a){if(Error.captureStackTrace)Error.captureStackTrace(this,x);else{var b=Error().stack;b&&(this.stack=b)}a&&(this.message=String(a))};w(x,Error);x.prototype.name="CustomError";var fa=function(a,b){for(var c=a.split("%s"),d="",e=Array.prototype.slice.call(arguments,1);e.length&&1<c.length;)d+=c.shift()+e.shift();return d+c.join("%s")};var y=function(a,b){b.unshift(a);x.call(this,fa.apply(null,b));b.shift()};w(y,x);y.prototype.name="AssertionError";var z=function(a,b,c,d){var e="Assertion failed";if(c)var e=e+(": "+c),g=d;else a&&(e+=": "+a,g=b);throw new y(""+e,g||[]);},A=function(a,b,c){a||z("",null,b,Array.prototype.slice.call(arguments,2))},B=function(a,b,c){t(a)||z("Expected function but got %s: %s.",[r(a),a],b,Array.prototype.slice.call(arguments,2))};var C=function(a,b,c){this.S=c;this.L=a;this.U=b;this.s=0;this.o=null};C.prototype.get=function(){var a;0<this.s?(this.s--,a=this.o,this.o=a.next,a.next=null):a=this.L();return a};C.prototype.put=function(a){this.U(a);this.s<this.S&&(this.s++,a.next=this.o,this.o=a)};var D;a:{var E=p.navigator;if(E){var F=E.userAgent;if(F){D=F;break a}}D=""};var G=function(a){p.setTimeout(function(){throw a;},0)},I,ga=function(){var a=p.MessageChannel;"undefined"===typeof a&&"undefined"!==typeof window&&window.postMessage&&window.addEventListener&&-1==D.indexOf("Presto")&&(a=function(){var a=document.createElement("IFRAME");a.style.display="none";a.src="";document.documentElement.appendChild(a);var b=a.contentWindow,a=b.document;a.open();a.write("");a.close();var c="callImmediate"+Math.random(),d="file:"==b.location.protocol?"*":b.location.protocol+"//"+
b.location.host,a=u(function(a){if(("*"==d||a.origin==d)&&a.data==c)this.port1.onmessage()},this);b.addEventListener("message",a,!1);this.port1={};this.port2={postMessage:function(){b.postMessage(c,d)}}});if("undefined"!==typeof a&&-1==D.indexOf("Trident")&&-1==D.indexOf("MSIE")){var b=new a,c={},d=c;b.port1.onmessage=function(){if(void 0!==c.next){c=c.next;var a=c.F;c.F=null;a()}};return function(a){d.next={F:a};d=d.next;b.port2.postMessage(0)}}return"undefined"!==typeof document&&"onreadystatechange"in
document.createElement("SCRIPT")?function(a){var b=document.createElement("SCRIPT");b.onreadystatechange=function(){b.onreadystatechange=null;b.parentNode.removeChild(b);b=null;a();a=null};document.documentElement.appendChild(b)}:function(a){p.setTimeout(a,0)}};var J=function(){this.v=this.f=null},ha=new C(function(){return new K},function(a){a.reset()},100);J.prototype.add=function(a,b){var c=ha.get();c.set(a,b);this.v?this.v.next=c:(A(!this.f),this.f=c);this.v=c};J.prototype.remove=function(){var a=null;this.f&&(a=this.f,this.f=this.f.next,this.f||(this.v=null),a.next=null);return a};var K=function(){this.next=this.scope=this.B=null};K.prototype.set=function(a,b){this.B=a;this.scope=b;this.next=null};
K.prototype.reset=function(){this.next=this.scope=this.B=null};var N=function(a,b){L||ia();M||(L(),M=!0);ja.add(a,b)},L,ia=function(){if(p.Promise&&p.Promise.resolve){var a=p.Promise.resolve(void 0);L=function(){a.then(ka)}}else L=function(){var a=ka,c;!(c=!t(p.setImmediate))&&(c=p.Window&&p.Window.prototype)&&(c=-1==D.indexOf("Edge")&&p.Window.prototype.setImmediate==p.setImmediate);c?(I||(I=ga()),I(a)):p.setImmediate(a)}},M=!1,ja=new J,ka=function(){for(var a=null;a=ja.remove();){try{a.B.call(a.scope)}catch(b){G(b)}ha.put(a)}M=!1};var P=function(a,b){this.b=0;this.K=void 0;this.j=this.g=this.u=null;this.m=this.A=!1;if(a!=q)try{var c=this;a.call(b,function(a){O(c,2,a)},function(a){try{if(a instanceof Error)throw a;throw Error("Promise rejected.");}catch(b){}O(c,3,a)})}catch(d){O(this,3,d)}},la=function(){this.next=this.context=this.h=this.c=this.child=null;this.w=!1};la.prototype.reset=function(){this.context=this.h=this.c=this.child=null;this.w=!1};
var ma=new C(function(){return new la},function(a){a.reset()},100),na=function(a,b,c){var d=ma.get();d.c=a;d.h=b;d.context=c;return d},pa=function(a,b,c){oa(a,b,c,null)||N(v(b,a))};P.prototype.then=function(a,b,c){null!=a&&B(a,"opt_onFulfilled should be a function.");null!=b&&B(b,"opt_onRejected should be a function. Did you pass opt_context as the second argument instead of the third?");return qa(this,t(a)?a:null,t(b)?b:null,c)};P.prototype.then=P.prototype.then;P.prototype.$goog_Thenable=!0;
P.prototype.X=function(a,b){return qa(this,null,a,b)};var sa=function(a,b){a.g||2!=a.b&&3!=a.b||ra(a);A(null!=b.c);a.j?a.j.next=b:a.g=b;a.j=b},qa=function(a,b,c,d){var e=na(null,null,null);e.child=new P(function(a,k){e.c=b?function(c){try{var e=b.call(d,c);a(e)}catch(H){k(H)}}:a;e.h=c?function(b){try{var e=c.call(d,b);a(e)}catch(H){k(H)}}:k});e.child.u=a;sa(a,e);return e.child};P.prototype.Y=function(a){A(1==this.b);this.b=0;O(this,2,a)};P.prototype.Z=function(a){A(1==this.b);this.b=0;O(this,3,a)};
var O=function(a,b,c){0==a.b&&(a==c&&(b=3,c=new TypeError("Promise cannot resolve to itself")),a.b=1,oa(c,a.Y,a.Z,a)||(a.K=c,a.b=b,a.u=null,ra(a),3!=b||ta(a,c)))},oa=function(a,b,c,d){if(a instanceof P)return null!=b&&B(b,"opt_onFulfilled should be a function."),null!=c&&B(c,"opt_onRejected should be a function. Did you pass opt_context as the second argument instead of the third?"),sa(a,na(b||q,c||null,d)),!0;var e;if(a)try{e=!!a.$goog_Thenable}catch(k){e=!1}else e=!1;if(e)return a.then(b,c,d),!0;
e=typeof a;if("object"==e&&null!=a||"function"==e)try{var g=a.then;if(t(g))return ua(a,g,b,c,d),!0}catch(k){return c.call(d,k),!0}return!1},ua=function(a,b,c,d,e){var g=!1,k=function(a){g||(g=!0,c.call(e,a))},f=function(a){g||(g=!0,d.call(e,a))};try{b.call(a,k,f)}catch(n){f(n)}},ra=function(a){a.A||(a.A=!0,N(a.N,a))},va=function(a){var b=null;a.g&&(b=a.g,a.g=b.next,b.next=null);a.g||(a.j=null);null!=b&&A(null!=b.c);return b};
P.prototype.N=function(){for(var a=null;a=va(this);){var b=this.b,c=this.K;if(3==b&&a.h&&!a.w)for(var d=void 0,d=this;d&&d.m;d=d.u)d.m=!1;if(a.child)a.child.u=null,wa(a,b,c);else try{a.w?a.c.call(a.context):wa(a,b,c)}catch(e){xa.call(null,e)}ma.put(a)}this.A=!1};var wa=function(a,b,c){2==b?a.c.call(a.context,c):a.h&&a.h.call(a.context,c)},ta=function(a,b){a.m=!0;N(function(){a.m&&xa.call(null,b)})},xa=G;var Q=function(a,b){if(!(b instanceof Object))return b;switch(b.constructor){case Date:return new Date(b.getTime());case Object:void 0===a&&(a={});break;case Array:a=[];break;default:return b}for(var c in b)b.hasOwnProperty(c)&&(a[c]=Q(a[c],b[c]));return a};var S=function(a,b){this.code=a;this.message=b;if(Error.captureStackTrace)(0,Error.captureStackTrace)(this,R.prototype.create);else{var c=Error.apply(this,arguments);this.name="FirebaseError";Object.defineProperty(this,"stack",{get:function(){return c.stack}})}};S.prototype=Object.create(Error.prototype);S.prototype.constructor=S;S.prototype.name="FirebaseError";var R=function(a,b,c){this.V=a;this.W=b;this.M=c;this.pattern=/\{\$([^}]+)}/g};
R.prototype.create=function(a,b){void 0===b&&(b={});var c=this.M[a],c=void 0===c?"Error":c.replace(this.pattern,function(a,c){return void 0!==b[c]?b[c].toString():"<"+c+"?>"}),c=this.W+": "+c+" ("+this.V+"/"+a+").",c=new S(a,c),d;for(d in b)b.hasOwnProperty(d)&&"_"!==d.slice(-1)&&(c[d]=b[d]);return c};P.all=function(a){return new P(function(b,c){var d=a.length,e=[];if(d)for(var g=function(a,c){d--;e[a]=c;0==d&&b(e)},k=function(a){c(a)},f=0,n;f<a.length;f++)n=a[f],pa(n,v(g,f),k);else b(e)})};P.resolve=function(a){if(a instanceof P)return a;var b=new P(q);O(b,2,a);return b};P.reject=function(a){return new P(function(b,c){c(a)})};P.prototype["catch"]=P.prototype.X;var T=P;"undefined"!==typeof Promise&&(T=Promise);var U=function(){},ya=function(a){if("object"!==typeof a||null===a)return!1;for(var b=ca(),c=b.next();!c.done;c=b.next())if(c=c.value,c in a&&"function"===typeof a[c])return!0;return!1},za=function(a,b){var c=new V(a,b);return c.subscribe.bind(c)},V=function(a,b){var c=this;this.a=[];this.J=0;this.task=T.resolve();this.l=!1;this.D=b;this.task.then(function(){a(c)}).catch(function(a){c.error(a)})};V.prototype.next=function(a){W(this,function(b){b.next(a)})};
V.prototype.error=function(a){W(this,function(b){b.error(a)});this.close(a)};V.prototype.complete=function(){W(this,function(a){a.complete()});this.close()};
V.prototype.subscribe=function(a,b,c){var d=this,e;if(void 0===a&&void 0===b&&void 0===c)throw Error("Missing Observer.");e=ya(a)?a:{next:a,error:b,complete:c};void 0===e.next&&(e.next=U);void 0===e.error&&(e.error=U);void 0===e.complete&&(e.complete=U);a=this.$.bind(this,this.a.length);this.l&&this.task.then(function(){try{d.G?e.error(d.G):e.complete()}catch(a){}});this.a.push(e);return a};
V.prototype.$=function(a){void 0!==this.a&&void 0!==this.a[a]&&(this.a[a]=void 0,--this.J,0===this.J&&void 0!==this.D&&this.D(this))};var W=function(a,b){if(!a.l)for(var c=0;c<a.a.length;c++)Aa(a,c,b)},Aa=function(a,b,c){a.task.then(function(){if(void 0!==a.a&&void 0!==a.a[b])try{c(a.a[b])}catch(d){}})};V.prototype.close=function(a){var b=this;this.l||(this.l=!0,void 0!==a&&(this.G=a),this.task.then(function(){b.a=void 0;b.D=void 0}))};var Ba=function(a,b){b=b||{};var c={noApp:"No Firebase App '"+b.name+"' has been created - call Firebase App.initializeApp().","bad-app-name":"Illegal App name: '"+b.name+"'.",dupApp:"Firebase App named '"+b.name+"' already exists.",deleted:"Firebase App named '"+b.name+"' already deleted.",dupService:"Firebase Service named '"+b.name+"' already registered."}[a];return void 0===c?"Application Error: ("+a+")":c},X=function(a,b){throw Error(Ba(a,b));},Ca=function(){function a(a){a=a||"[DEFAULT]";var c=
b[a];void 0===c&&X("noApp",{name:a});return c}var b={},c={},d=[],e={initializeApp:function(a,c){void 0===c?c="[DEFAULT]":"string"===typeof c&&""!==c||X("bad-app-name",{name:c+""});void 0!==b[c]&&X("dupApp",{name:c});var f=new Y(a,c,e);b[c]=f;d.forEach(function(a){return a("create",f)});void 0!=f.INTERNAL&&void 0!=f.INTERNAL.getToken||Q(f,{INTERNAL:{getToken:function(){return T.resolve(null)},addAuthTokenListener:function(){},removeAuthTokenListener:function(){}}});return f},app:a,apps:null,Promise:T,
SDK_VERSION:"0.0.0",INTERNAL:{registerService:function(b,d,f){c[b]&&X("dupService",{name:b});c[b]=d;d=function(c){void 0===c&&(c=a());return c[b]()};void 0!==f&&Q(d,f);return e[b]=d},createFirebaseNamespace:Ca,extendNamespace:function(a){Q(e,a)},createSubscribe:za,ErrorFactory:R,registerAppHook:function(a){d.push(a)},removeApp:function(a){d.forEach(function(c){return c("delete",b[a])});delete b[a]},factories:c,Promise:P,deepExtend:Q}};Object.defineProperty(e,"apps",{get:function(){return Object.keys(b).map(function(a){return b[a]})}});
a.App=Y;return e},Y=function(a,b,c){var d=this;this.H=c;this.I=!1;this.i={};this.P={};this.C=b;this.T=Q(void 0,a);Object.keys(c.INTERNAL.factories).forEach(function(a){d[a]=d.R.bind(d,a)})};Y.prototype.delete=function(){var a=this;return(new T(function(b){Z(a);b()})).then(function(){a.H.INTERNAL.removeApp(a.C);return T.all(Object.keys(a.i).map(function(b){return a.i[b].INTERNAL.delete()}))}).then(function(){a.I=!0;a.i=null;a.P=null})};
Y.prototype.R=function(a){Z(this);void 0===this.i[a]&&(this.i[a]=this.H.INTERNAL.factories[a](this,this.O.bind(this)));return this.i[a]};Y.prototype.O=function(a){Q(this,a)};var Z=function(a){a.I&&X(Ba("deleted",{name:a.C}))};Object.defineProperties(Y.prototype,{name:{configurable:!0,enumerable:!0,get:function(){Z(this);return this.C}},options:{configurable:!0,enumerable:!0,get:function(){Z(this);return this.T}}});Y.prototype.name&&Y.prototype.options||Y.prototype.delete||console.log("dc");"undefined"!==typeof window&&(window.firebase=Ca()); })();
firebase.SDK_VERSION = "3.0.1";
(function(){var h,aa=aa||{},m=this,ba=function(a){return void 0!==a},ca=function(){},da=function(a){var b=typeof a;if("object"==b)if(a){if(a instanceof Array)return"array";if(a instanceof Object)return b;var c=Object.prototype.toString.call(a);if("[object Window]"==c)return"object";if("[object Array]"==c||"number"==typeof a.length&&"undefined"!=typeof a.splice&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("splice"))return"array";if("[object Function]"==c||"undefined"!=typeof a.call&&"undefined"!=
typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("call"))return"function"}else return"null";else if("function"==b&&"undefined"==typeof a.call)return"object";return b},ea=function(a){return null===a},fa=function(a){return"array"==da(a)},ga=function(a){var b=da(a);return"array"==b||"object"==b&&"number"==typeof a.length},n=function(a){return"string"==typeof a},ha=function(a){return"number"==typeof a},p=function(a){return"function"==da(a)},ia=function(a){var b=typeof a;return"object"==b&&null!=
a||"function"==b},ja="closure_uid_"+(1E9*Math.random()>>>0),ka=0,la=function(a,b,c){return a.call.apply(a.bind,arguments)},ma=function(a,b,c){if(!a)throw Error();if(2<arguments.length){var d=Array.prototype.slice.call(arguments,2);return function(){var c=Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(c,d);return a.apply(b,c)}}return function(){return a.apply(b,arguments)}},r=function(a,b,c){r=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?
la:ma;return r.apply(null,arguments)},na=function(a,b){var c=Array.prototype.slice.call(arguments,1);return function(){var b=c.slice();b.push.apply(b,arguments);return a.apply(this,b)}},oa=Date.now||function(){return+new Date},t=function(a,b){function c(){}c.prototype=b.prototype;a.Hc=b.prototype;a.prototype=new c;a.prototype.constructor=a;a.jf=function(a,c,f){for(var g=Array(arguments.length-2),k=2;k<arguments.length;k++)g[k-2]=arguments[k];return b.prototype[c].apply(a,g)}};var u=function(a){if(Error.captureStackTrace)Error.captureStackTrace(this,u);else{var b=Error().stack;b&&(this.stack=b)}a&&(this.message=String(a))};t(u,Error);u.prototype.name="CustomError";var pa=function(a,b){for(var c=a.split("%s"),d="",e=Array.prototype.slice.call(arguments,1);e.length&&1<c.length;)d+=c.shift()+e.shift();return d+c.join("%s")},qa=String.prototype.trim?function(a){return a.trim()}:function(a){return a.replace(/^[\s\xa0]+|[\s\xa0]+$/g,"")},ra=/&/g,sa=/</g,ta=/>/g,ua=/"/g,va=/'/g,wa=/\x00/g,xa=/[\x00&<>"']/,v=function(a,b){return-1!=a.indexOf(b)},ya=function(a,b){return a<b?-1:a>b?1:0};var za=function(a,b){b.unshift(a);u.call(this,pa.apply(null,b));b.shift()};t(za,u);za.prototype.name="AssertionError";
var Aa=function(a,b,c,d){var e="Assertion failed";if(c)var e=e+(": "+c),f=d;else a&&(e+=": "+a,f=b);throw new za(""+e,f||[]);},w=function(a,b,c){a||Aa("",null,b,Array.prototype.slice.call(arguments,2))},Ba=function(a,b){throw new za("Failure"+(a?": "+a:""),Array.prototype.slice.call(arguments,1));},Ca=function(a,b,c){ha(a)||Aa("Expected number but got %s: %s.",[da(a),a],b,Array.prototype.slice.call(arguments,2));return a},Da=function(a,b,c){n(a)||Aa("Expected string but got %s: %s.",[da(a),a],b,Array.prototype.slice.call(arguments,
2));return a},Ea=function(a,b,c){p(a)||Aa("Expected function but got %s: %s.",[da(a),a],b,Array.prototype.slice.call(arguments,2))};var Fa=Array.prototype.indexOf?function(a,b,c){w(null!=a.length);return Array.prototype.indexOf.call(a,b,c)}:function(a,b,c){c=null==c?0:0>c?Math.max(0,a.length+c):c;if(n(a))return n(b)&&1==b.length?a.indexOf(b,c):-1;for(;c<a.length;c++)if(c in a&&a[c]===b)return c;return-1},Ga=Array.prototype.forEach?function(a,b,c){w(null!=a.length);Array.prototype.forEach.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=n(a)?a.split(""):a,f=0;f<d;f++)f in e&&b.call(c,e[f],f,a)},Ha=function(a,b){for(var c=n(a)?
a.split(""):a,d=a.length-1;0<=d;--d)d in c&&b.call(void 0,c[d],d,a)},Ia=Array.prototype.map?function(a,b,c){w(null!=a.length);return Array.prototype.map.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=Array(d),f=n(a)?a.split(""):a,g=0;g<d;g++)g in f&&(e[g]=b.call(c,f[g],g,a));return e},Ja=Array.prototype.some?function(a,b,c){w(null!=a.length);return Array.prototype.some.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=n(a)?a.split(""):a,f=0;f<d;f++)if(f in e&&b.call(c,e[f],f,a))return!0;return!1},
Ka=Array.prototype.every?function(a,b,c){w(null!=a.length);return Array.prototype.every.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=n(a)?a.split(""):a,f=0;f<d;f++)if(f in e&&!b.call(c,e[f],f,a))return!1;return!0},Ma=function(a){var b;a:{b=La;for(var c=a.length,d=n(a)?a.split(""):a,e=0;e<c;e++)if(e in d&&b.call(void 0,d[e],e,a)){b=e;break a}b=-1}return 0>b?null:n(a)?a.charAt(b):a[b]},Na=function(a,b){return 0<=Fa(a,b)},Pa=function(a,b){var c=Fa(a,b),d;(d=0<=c)&&Oa(a,c);return d},Oa=function(a,
b){w(null!=a.length);return 1==Array.prototype.splice.call(a,b,1).length},Qa=function(a,b){var c=0;Ha(a,function(d,e){b.call(void 0,d,e,a)&&Oa(a,e)&&c++})},Ra=function(a){return Array.prototype.concat.apply(Array.prototype,arguments)},Sa=function(a){return Array.prototype.concat.apply(Array.prototype,arguments)},Ta=function(a){var b=a.length;if(0<b){for(var c=Array(b),d=0;d<b;d++)c[d]=a[d];return c}return[]},Ua=function(a,b){for(var c=1;c<arguments.length;c++){var d=arguments[c];if(ga(d)){var e=a.length||
0,f=d.length||0;a.length=e+f;for(var g=0;g<f;g++)a[e+g]=d[g]}else a.push(d)}};var Va=function(a,b,c){for(var d in a)b.call(c,a[d],d,a)},Wa=function(a){var b=[],c=0,d;for(d in a)b[c++]=a[d];return b},Xa=function(a){var b=[],c=0,d;for(d in a)b[c++]=d;return b},Ya=function(a){return null!==a&&"withCredentials"in a},Za=function(a){for(var b in a)return!1;return!0},$a=function(a,b){for(var c in a)if(!(c in b)||a[c]!==b[c])return!1;for(c in b)if(!(c in a))return!1;return!0},ab=function(a){var b={},c;for(c in a)b[c]=a[c];return b},bb="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" "),
cb=function(a,b){for(var c,d,e=1;e<arguments.length;e++){d=arguments[e];for(c in d)a[c]=d[c];for(var f=0;f<bb.length;f++)c=bb[f],Object.prototype.hasOwnProperty.call(d,c)&&(a[c]=d[c])}};var db;a:{var eb=m.navigator;if(eb){var fb=eb.userAgent;if(fb){db=fb;break a}}db=""}var x=function(a){return v(db,a)};var gb=x("Opera"),y=x("Trident")||x("MSIE"),hb=x("Edge"),ib=hb||y,jb=x("Gecko")&&!(v(db.toLowerCase(),"webkit")&&!x("Edge"))&&!(x("Trident")||x("MSIE"))&&!x("Edge"),kb=v(db.toLowerCase(),"webkit")&&!x("Edge"),lb=function(){var a=m.document;return a?a.documentMode:void 0},mb;
a:{var nb="",ob=function(){var a=db;if(jb)return/rv\:([^\);]+)(\)|;)/.exec(a);if(hb)return/Edge\/([\d\.]+)/.exec(a);if(y)return/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(a);if(kb)return/WebKit\/(\S+)/.exec(a);if(gb)return/(?:Version)[ \/]?(\S+)/.exec(a)}();ob&&(nb=ob?ob[1]:"");if(y){var pb=lb();if(null!=pb&&pb>parseFloat(nb)){mb=String(pb);break a}}mb=nb}
var qb=mb,rb={},sb=function(a){var b;if(!(b=rb[a])){b=0;for(var c=qa(String(qb)).split("."),d=qa(String(a)).split("."),e=Math.max(c.length,d.length),f=0;0==b&&f<e;f++){var g=c[f]||"",k=d[f]||"",l=RegExp("(\\d*)(\\D*)","g"),q=RegExp("(\\d*)(\\D*)","g");do{var S=l.exec(g)||["","",""],H=q.exec(k)||["","",""];if(0==S[0].length&&0==H[0].length)break;b=ya(0==S[1].length?0:parseInt(S[1],10),0==H[1].length?0:parseInt(H[1],10))||ya(0==S[2].length,0==H[2].length)||ya(S[2],H[2])}while(0==b)}b=rb[a]=0<=b}return b},
tb=m.document,ub=tb&&y?lb()||("CSS1Compat"==tb.compatMode?parseInt(qb,10):5):void 0;var vb=null,wb=null,yb=function(a){var b="";xb(a,function(a){b+=String.fromCharCode(a)});return b},xb=function(a,b){function c(b){for(;d<a.length;){var c=a.charAt(d++),e=wb[c];if(null!=e)return e;if(!/^[\s\xa0]*$/.test(c))throw Error("Unknown base64 encoding at char: "+c);}return b}zb();for(var d=0;;){var e=c(-1),f=c(0),g=c(64),k=c(64);if(64===k&&-1===e)break;b(e<<2|f>>4);64!=g&&(b(f<<4&240|g>>2),64!=k&&b(g<<6&192|k))}},zb=function(){if(!vb){vb={};wb={};for(var a=0;65>a;a++)vb[a]="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(a),
wb[vb[a]]=a,62<=a&&(wb["ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_.".charAt(a)]=a)}};var Bb=function(){this.Zd="";this.yg=Ab};Bb.prototype.De=!0;Bb.prototype.ze=function(){return this.Zd};Bb.prototype.toString=function(){return"Const{"+this.Zd+"}"};var Cb=function(a){if(a instanceof Bb&&a.constructor===Bb&&a.yg===Ab)return a.Zd;Ba("expected object of type Const, got '"+a+"'");return"type_error:Const"},Ab={};var Eb=function(){this.rb="";this.xg=Db};Eb.prototype.De=!0;Eb.prototype.ze=function(){return this.rb};Eb.prototype.toString=function(){return"SafeUrl{"+this.rb+"}"};
var Fb=function(a){if(a instanceof Eb&&a.constructor===Eb&&a.xg===Db)return a.rb;Ba("expected object of type SafeUrl, got '"+a+"' of type "+da(a));return"type_error:SafeUrl"},Gb=/^(?:(?:https?|mailto|ftp):|[^&:/?#]*(?:[/?#]|$))/i,Ib=function(a){if(a instanceof Eb)return a;a=a.De?a.ze():String(a);Gb.test(a)||(a="about:invalid#zClosurez");return Hb(a)},Db={},Hb=function(a){var b=new Eb;b.rb=a;return b};Hb("about:blank");var Kb=function(){this.rb="";this.wg=Jb};Kb.prototype.De=!0;Kb.prototype.ze=function(){return this.rb};Kb.prototype.toString=function(){return"SafeHtml{"+this.rb+"}"};var Lb=function(a){if(a instanceof Kb&&a.constructor===Kb&&a.wg===Jb)return a.rb;Ba("expected object of type SafeHtml, got '"+a+"' of type "+da(a));return"type_error:SafeHtml"},Jb={};Kb.prototype.sh=function(a){this.rb=a;return this};var Mb=function(a,b){var c;c=b instanceof Eb?b:Ib(b);a.href=Fb(c)};var Nb=function(a){Nb[" "](a);return a};Nb[" "]=ca;var Ob=!y||9<=Number(ub),Pb=y&&!sb("9");!kb||sb("528");jb&&sb("1.9b")||y&&sb("8")||gb&&sb("9.5")||kb&&sb("528");jb&&!sb("8")||y&&sb("9");var Qb=function(){this.La=this.La;this.Md=this.Md};Qb.prototype.La=!1;Qb.prototype.wa=function(){return this.La};Qb.prototype.Sa=function(){this.La||(this.La=!0,this.Ka())};Qb.prototype.Ka=function(){if(this.Md)for(;this.Md.length;)this.Md.shift()()};var Rb=function(a,b){this.type=a;this.currentTarget=this.target=b;this.defaultPrevented=this.yc=!1;this.fg=!0};Rb.prototype.preventDefault=function(){this.defaultPrevented=!0;this.fg=!1};var Sb=function(a,b){Rb.call(this,a?a.type:"");this.relatedTarget=this.currentTarget=this.target=null;this.charCode=this.keyCode=this.button=this.screenY=this.screenX=this.clientY=this.clientX=this.offsetY=this.offsetX=0;this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1;this.yd=this.state=null;if(a){var c=this.type=a.type,d=a.changedTouches?a.changedTouches[0]:null;this.target=a.target||a.srcElement;this.currentTarget=b;var e=a.relatedTarget;if(e){if(jb){var f;a:{try{Nb(e.nodeName);f=!0;break a}catch(g){}f=
!1}f||(e=null)}}else"mouseover"==c?e=a.fromElement:"mouseout"==c&&(e=a.toElement);this.relatedTarget=e;null===d?(this.offsetX=kb||void 0!==a.offsetX?a.offsetX:a.layerX,this.offsetY=kb||void 0!==a.offsetY?a.offsetY:a.layerY,this.clientX=void 0!==a.clientX?a.clientX:a.pageX,this.clientY=void 0!==a.clientY?a.clientY:a.pageY,this.screenX=a.screenX||0,this.screenY=a.screenY||0):(this.clientX=void 0!==d.clientX?d.clientX:d.pageX,this.clientY=void 0!==d.clientY?d.clientY:d.pageY,this.screenX=d.screenX||
0,this.screenY=d.screenY||0);this.button=a.button;this.keyCode=a.keyCode||0;this.charCode=a.charCode||("keypress"==c?a.keyCode:0);this.ctrlKey=a.ctrlKey;this.altKey=a.altKey;this.shiftKey=a.shiftKey;this.metaKey=a.metaKey;this.state=a.state;this.yd=a;a.defaultPrevented&&this.preventDefault()}};t(Sb,Rb);
Sb.prototype.preventDefault=function(){Sb.Hc.preventDefault.call(this);var a=this.yd;if(a.preventDefault)a.preventDefault();else if(a.returnValue=!1,Pb)try{if(a.ctrlKey||112<=a.keyCode&&123>=a.keyCode)a.keyCode=-1}catch(b){}};var Tb="closure_listenable_"+(1E6*Math.random()|0),Ub=function(a){return!(!a||!a[Tb])},Vb=0;var Wb=function(a,b,c,d,e){this.listener=a;this.Rd=null;this.src=b;this.type=c;this.vd=!!d;this.Vc=e;this.key=++Vb;this.Cc=this.ud=!1},Xb=function(a){a.Cc=!0;a.listener=null;a.Rd=null;a.src=null;a.Vc=null};var Yb=function(a){this.src=a;this.qa={};this.td=0};Yb.prototype.add=function(a,b,c,d,e){var f=a.toString();a=this.qa[f];a||(a=this.qa[f]=[],this.td++);var g=Zb(a,b,d,e);-1<g?(b=a[g],c||(b.ud=!1)):(b=new Wb(b,this.src,f,!!d,e),b.ud=c,a.push(b));return b};Yb.prototype.remove=function(a,b,c,d){a=a.toString();if(!(a in this.qa))return!1;var e=this.qa[a];b=Zb(e,b,c,d);return-1<b?(Xb(e[b]),Oa(e,b),0==e.length&&(delete this.qa[a],this.td--),!0):!1};
var $b=function(a,b){var c=b.type;c in a.qa&&Pa(a.qa[c],b)&&(Xb(b),0==a.qa[c].length&&(delete a.qa[c],a.td--))};Yb.prototype.removeAll=function(a){a=a&&a.toString();var b=0,c;for(c in this.qa)if(!a||c==a){for(var d=this.qa[c],e=0;e<d.length;e++)++b,Xb(d[e]);delete this.qa[c];this.td--}return b};Yb.prototype.Rc=function(a,b,c,d){a=this.qa[a.toString()];var e=-1;a&&(e=Zb(a,b,c,d));return-1<e?a[e]:null};
var Zb=function(a,b,c,d){for(var e=0;e<a.length;++e){var f=a[e];if(!f.Cc&&f.listener==b&&f.vd==!!c&&f.Vc==d)return e}return-1};var ac="closure_lm_"+(1E6*Math.random()|0),bc={},cc=0,dc=function(a,b,c,d,e){if(fa(b)){for(var f=0;f<b.length;f++)dc(a,b[f],c,d,e);return null}c=ec(c);return Ub(a)?a.Va(b,c,d,e):fc(a,b,c,!1,d,e)},fc=function(a,b,c,d,e,f){if(!b)throw Error("Invalid event type");var g=!!e,k=gc(a);k||(a[ac]=k=new Yb(a));c=k.add(b,c,d,e,f);if(c.Rd)return c;d=hc();c.Rd=d;d.src=a;d.listener=c;if(a.addEventListener)a.addEventListener(b.toString(),d,g);else if(a.attachEvent)a.attachEvent(ic(b.toString()),d);else throw Error("addEventListener and attachEvent are unavailable.");
cc++;return c},hc=function(){var a=jc,b=Ob?function(c){return a.call(b.src,b.listener,c)}:function(c){c=a.call(b.src,b.listener,c);if(!c)return c};return b},kc=function(a,b,c,d,e){if(fa(b)){for(var f=0;f<b.length;f++)kc(a,b[f],c,d,e);return null}c=ec(c);return Ub(a)?a.Id(b,c,d,e):fc(a,b,c,!0,d,e)},lc=function(a,b,c,d,e){if(fa(b))for(var f=0;f<b.length;f++)lc(a,b[f],c,d,e);else c=ec(c),Ub(a)?a.cf(b,c,d,e):a&&(a=gc(a))&&(b=a.Rc(b,c,!!d,e))&&mc(b)},mc=function(a){if(!ha(a)&&a&&!a.Cc){var b=a.src;if(Ub(b))$b(b.Ua,
a);else{var c=a.type,d=a.Rd;b.removeEventListener?b.removeEventListener(c,d,a.vd):b.detachEvent&&b.detachEvent(ic(c),d);cc--;(c=gc(b))?($b(c,a),0==c.td&&(c.src=null,b[ac]=null)):Xb(a)}}},ic=function(a){return a in bc?bc[a]:bc[a]="on"+a},oc=function(a,b,c,d){var e=!0;if(a=gc(a))if(b=a.qa[b.toString()])for(b=b.concat(),a=0;a<b.length;a++){var f=b[a];f&&f.vd==c&&!f.Cc&&(f=nc(f,d),e=e&&!1!==f)}return e},nc=function(a,b){var c=a.listener,d=a.Vc||a.src;a.ud&&mc(a);return c.call(d,b)},jc=function(a,b){if(a.Cc)return!0;
if(!Ob){var c;if(!(c=b))a:{c=["window","event"];for(var d=m,e;e=c.shift();)if(null!=d[e])d=d[e];else{c=null;break a}c=d}e=c;c=new Sb(e,this);d=!0;if(!(0>e.keyCode||void 0!=e.returnValue)){a:{var f=!1;if(0==e.keyCode)try{e.keyCode=-1;break a}catch(l){f=!0}if(f||void 0==e.returnValue)e.returnValue=!0}e=[];for(f=c.currentTarget;f;f=f.parentNode)e.push(f);for(var f=a.type,g=e.length-1;!c.yc&&0<=g;g--){c.currentTarget=e[g];var k=oc(e[g],f,!0,c),d=d&&k}for(g=0;!c.yc&&g<e.length;g++)c.currentTarget=e[g],
k=oc(e[g],f,!1,c),d=d&&k}return d}return nc(a,new Sb(b,this))},gc=function(a){a=a[ac];return a instanceof Yb?a:null},pc="__closure_events_fn_"+(1E9*Math.random()>>>0),ec=function(a){w(a,"Listener can not be null.");if(p(a))return a;w(a.handleEvent,"An object listener must have handleEvent method.");a[pc]||(a[pc]=function(b){return a.handleEvent(b)});return a[pc]};var qc=/^[+a-zA-Z0-9_.!#$%&'*\/=?^`{|}~-]+@([a-zA-Z0-9-]+\.)+[a-zA-Z0-9]{2,63}$/;var rc=function(a){return/^\s*$/.test(a)?!1:/^[\],:{}\s\u2028\u2029]*$/.test(a.replace(/\\["\\\/bfnrtu]/g,"@").replace(/(?:"[^"\\\n\r\u2028\u2029\x00-\x08\x0a-\x1f]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)[\s\u2028\u2029]*(?=:|,|]|}|$)/g,"]").replace(/(?:^|:|,)(?:[\s\u2028\u2029]*\[)+/g,""))},sc=function(a){a=String(a);if(rc(a))try{return eval("("+a+")")}catch(b){}throw Error("Invalid JSON string: "+a);},vc=function(a){var b=[];tc(new uc,a,b);return b.join("")},uc=function(){this.Ud=void 0},
tc=function(a,b,c){if(null==b)c.push("null");else{if("object"==typeof b){if(fa(b)){var d=b;b=d.length;c.push("[");for(var e="",f=0;f<b;f++)c.push(e),e=d[f],tc(a,a.Ud?a.Ud.call(d,String(f),e):e,c),e=",";c.push("]");return}if(b instanceof String||b instanceof Number||b instanceof Boolean)b=b.valueOf();else{c.push("{");f="";for(d in b)Object.prototype.hasOwnProperty.call(b,d)&&(e=b[d],"function"!=typeof e&&(c.push(f),wc(d,c),c.push(":"),tc(a,a.Ud?a.Ud.call(b,d,e):e,c),f=","));c.push("}");return}}switch(typeof b){case "string":wc(b,
c);break;case "number":c.push(isFinite(b)&&!isNaN(b)?String(b):"null");break;case "boolean":c.push(String(b));break;case "function":c.push("null");break;default:throw Error("Unknown type: "+typeof b);}}},xc={'"':'\\"',"\\":"\\\\","/":"\\/","\b":"\\b","\f":"\\f","\n":"\\n","\r":"\\r","\t":"\\t","\x0B":"\\u000b"},yc=/\uffff/.test("\uffff")?/[\\\"\x00-\x1f\x7f-\uffff]/g:/[\\\"\x00-\x1f\x7f-\xff]/g,wc=function(a,b){b.push('"',a.replace(yc,function(a){var b=xc[a];b||(b="\\u"+(a.charCodeAt(0)|65536).toString(16).substr(1),
xc[a]=b);return b}),'"')};var zc=function(){};zc.prototype.lf=null;zc.prototype.getOptions=function(){return this.lf||(this.lf=this.If())};var Ac,Bc=function(){};t(Bc,zc);Bc.prototype.se=function(){var a=Cc(this);return a?new ActiveXObject(a):new XMLHttpRequest};Bc.prototype.If=function(){var a={};Cc(this)&&(a[0]=!0,a[1]=!0);return a};
var Cc=function(a){if(!a.Ef&&"undefined"==typeof XMLHttpRequest&&"undefined"!=typeof ActiveXObject){for(var b=["MSXML2.XMLHTTP.6.0","MSXML2.XMLHTTP.3.0","MSXML2.XMLHTTP","Microsoft.XMLHTTP"],c=0;c<b.length;c++){var d=b[c];try{return new ActiveXObject(d),a.Ef=d}catch(e){}}throw Error("Could not create ActiveXObject. ActiveX might be disabled, or MSXML might not be installed");}return a.Ef};Ac=new Bc;var Dc=function(){};t(Dc,zc);Dc.prototype.se=function(){var a=new XMLHttpRequest;if("withCredentials"in a)return a;if("undefined"!=typeof XDomainRequest)return new Ec;throw Error("Unsupported browser");};Dc.prototype.If=function(){return{}};
var Ec=function(){this.yb=new XDomainRequest;this.readyState=0;this.responseText=this.onreadystatechange=null;this.status=-1;this.statusText=this.responseXML=null;this.yb.onload=r(this.dh,this);this.yb.onerror=r(this.Cf,this);this.yb.onprogress=r(this.fh,this);this.yb.ontimeout=r(this.hh,this)};h=Ec.prototype;h.open=function(a,b,c){if(null!=c&&!c)throw Error("Only async requests are supported.");this.yb.open(a,b)};
h.send=function(a){if(a)if("string"==typeof a)this.yb.send(a);else throw Error("Only string data is supported");else this.yb.send()};h.abort=function(){this.yb.abort()};h.setRequestHeader=function(){};h.dh=function(){this.status=200;this.responseText=this.yb.responseText;Fc(this,4)};h.Cf=function(){this.status=500;this.responseText=null;Fc(this,4)};h.hh=function(){this.Cf()};h.fh=function(){this.status=200;Fc(this,1)};var Fc=function(a,b){a.readyState=b;if(a.onreadystatechange)a.onreadystatechange()};var z=function(a,b){this.R=[];this.w=b;for(var c=!0,d=a.length-1;0<=d;d--){var e=a[d]|0;c&&e==b||(this.R[d]=e,c=!1)}},Gc={},Hc=function(a){if(-128<=a&&128>a){var b=Gc[a];if(b)return b}b=new z([a|0],0>a?-1:0);-128<=a&&128>a&&(Gc[a]=b);return b},Jc=function(a){if(isNaN(a)||!isFinite(a))return Ic;if(0>a)return A(Jc(-a));for(var b=[],c=1,d=0;a>=c;d++)b[d]=a/c|0,c*=4294967296;return new z(b,0)},Kc=function(a,b){if(0==a.length)throw Error("number format error: empty string");var c=b||10;if(2>c||36<c)throw Error("radix out of range: "+
c);if("-"==a.charAt(0))return A(Kc(a.substring(1),c));if(0<=a.indexOf("-"))throw Error('number format error: interior "-" character');for(var d=Jc(Math.pow(c,8)),e=Ic,f=0;f<a.length;f+=8){var g=Math.min(8,a.length-f),k=parseInt(a.substring(f,f+g),c);8>g?(g=Jc(Math.pow(c,g)),e=e.multiply(g).add(Jc(k))):(e=e.multiply(d),e=e.add(Jc(k)))}return e},Ic=Hc(0),Lc=Hc(1),Mc=Hc(16777216),Nc=function(a){if(-1==a.w)return-Nc(A(a));for(var b=0,c=1,d=0;d<a.R.length;d++)b+=Oc(a,d)*c,c*=4294967296;return b};
z.prototype.toString=function(a){a=a||10;if(2>a||36<a)throw Error("radix out of range: "+a);if(Pc(this))return"0";if(-1==this.w)return"-"+A(this).toString(a);for(var b=Jc(Math.pow(a,6)),c=this,d="";;){var e=Qc(c,b),c=Rc(c,e.multiply(b)),f=((0<c.R.length?c.R[0]:c.w)>>>0).toString(a),c=e;if(Pc(c))return f+d;for(;6>f.length;)f="0"+f;d=""+f+d}};
var B=function(a,b){return 0>b?0:b<a.R.length?a.R[b]:a.w},Oc=function(a,b){var c=B(a,b);return 0<=c?c:4294967296+c},Pc=function(a){if(0!=a.w)return!1;for(var b=0;b<a.R.length;b++)if(0!=a.R[b])return!1;return!0};z.prototype.equals=function(a){if(this.w!=a.w)return!1;for(var b=Math.max(this.R.length,a.R.length),c=0;c<b;c++)if(B(this,c)!=B(a,c))return!1;return!0};z.prototype.compare=function(a){a=Rc(this,a);return-1==a.w?-1:Pc(a)?0:1};
var A=function(a){for(var b=a.R.length,c=[],d=0;d<b;d++)c[d]=~a.R[d];return(new z(c,~a.w)).add(Lc)};z.prototype.add=function(a){for(var b=Math.max(this.R.length,a.R.length),c=[],d=0,e=0;e<=b;e++){var f=d+(B(this,e)&65535)+(B(a,e)&65535),g=(f>>>16)+(B(this,e)>>>16)+(B(a,e)>>>16),d=g>>>16,f=f&65535,g=g&65535;c[e]=g<<16|f}return new z(c,c[c.length-1]&-2147483648?-1:0)};var Rc=function(a,b){return a.add(A(b))};
z.prototype.multiply=function(a){if(Pc(this)||Pc(a))return Ic;if(-1==this.w)return-1==a.w?A(this).multiply(A(a)):A(A(this).multiply(a));if(-1==a.w)return A(this.multiply(A(a)));if(0>this.compare(Mc)&&0>a.compare(Mc))return Jc(Nc(this)*Nc(a));for(var b=this.R.length+a.R.length,c=[],d=0;d<2*b;d++)c[d]=0;for(d=0;d<this.R.length;d++)for(var e=0;e<a.R.length;e++){var f=B(this,d)>>>16,g=B(this,d)&65535,k=B(a,e)>>>16,l=B(a,e)&65535;c[2*d+2*e]+=g*l;Sc(c,2*d+2*e);c[2*d+2*e+1]+=f*l;Sc(c,2*d+2*e+1);c[2*d+2*
e+1]+=g*k;Sc(c,2*d+2*e+1);c[2*d+2*e+2]+=f*k;Sc(c,2*d+2*e+2)}for(d=0;d<b;d++)c[d]=c[2*d+1]<<16|c[2*d];for(d=b;d<2*b;d++)c[d]=0;return new z(c,0)};
var Sc=function(a,b){for(;(a[b]&65535)!=a[b];)a[b+1]+=a[b]>>>16,a[b]&=65535},Qc=function(a,b){if(Pc(b))throw Error("division by zero");if(Pc(a))return Ic;if(-1==a.w)return-1==b.w?Qc(A(a),A(b)):A(Qc(A(a),b));if(-1==b.w)return A(Qc(a,A(b)));if(30<a.R.length){if(-1==a.w||-1==b.w)throw Error("slowDivide_ only works with positive integers.");for(var c=Lc,d=b;0>=d.compare(a);)c=c.shiftLeft(1),d=d.shiftLeft(1);for(var e=Tc(c,1),f=Tc(d,1),g,d=Tc(d,2),c=Tc(c,2);!Pc(d);)g=f.add(d),0>=g.compare(a)&&(e=e.add(c),
f=g),d=Tc(d,1),c=Tc(c,1);return e}c=Ic;for(d=a;0<=d.compare(b);){e=Math.max(1,Math.floor(Nc(d)/Nc(b)));f=Math.ceil(Math.log(e)/Math.LN2);f=48>=f?1:Math.pow(2,f-48);g=Jc(e);for(var k=g.multiply(b);-1==k.w||0<k.compare(d);)e-=f,g=Jc(e),k=g.multiply(b);Pc(g)&&(g=Lc);c=c.add(g);d=Rc(d,k)}return c},Uc=function(a,b){for(var c=Math.max(a.R.length,b.R.length),d=[],e=0;e<c;e++)d[e]=B(a,e)|B(b,e);return new z(d,a.w|b.w)};
z.prototype.shiftLeft=function(a){var b=a>>5;a%=32;for(var c=this.R.length+b+(0<a?1:0),d=[],e=0;e<c;e++)d[e]=0<a?B(this,e-b)<<a|B(this,e-b-1)>>>32-a:B(this,e-b);return new z(d,this.w)};var Tc=function(a,b){for(var c=b>>5,d=b%32,e=a.R.length-c,f=[],g=0;g<e;g++)f[g]=0<d?B(a,g+c)>>>d|B(a,g+c+1)<<32-d:B(a,g+c);return new z(f,a.w)};var Vc=function(a,b){this.Xc=a;this.wb=b};Vc.prototype.Af=function(){return this.wb};Vc.prototype.equals=function(a){return this.wb==a.Af()&&this.Xc.equals(ab(a.Xc))};
var Yc=function(a){try{var b;if(b=0==a.lastIndexOf("[",0)){var c=a.length-1;b=0<=c&&a.indexOf("]",c)==c}return b?new Wc(a.substring(1,a.length-1)):new Xc(a)}catch(d){return null}},Xc=function(a){var b=Ic;if(a instanceof z){if(0!=a.w||0>a.compare(Ic)||0<a.compare(Zc))throw Error("The address does not look like an IPv4.");b=ab(a)}else{if(!$c.test(a))throw Error(a+" does not look like an IPv4 address.");var c=a.split(".");if(4!=c.length)throw Error(a+" does not look like an IPv4 address.");for(var d=
0;d<c.length;d++){var e;e=c[d];var f=Number(e);e=0==f&&/^[\s\xa0]*$/.test(e)?NaN:f;if(isNaN(e)||0>e||255<e||1!=c[d].length&&0==c[d].lastIndexOf("0",0))throw Error("In "+a+", octet "+d+" is not valid");e=Jc(e);b=Uc(b.shiftLeft(8),e)}}Vc.call(this,b,4)};t(Xc,Vc);var $c=/^[0-9.]*$/,Zc=Rc(Lc.shiftLeft(32),Lc);Xc.prototype.toString=function(){if(this.Tb)return this.Tb;for(var a=Oc(this.Xc,0),b=[],c=3;0<=c;c--)b[c]=String(a&255),a>>>=8;return this.Tb=b.join(".")};
var Wc=function(a){var b=Ic;if(a instanceof z){if(0!=a.w||0>a.compare(Ic)||0<a.compare(ad))throw Error("The address does not look like a valid IPv6.");b=ab(a)}else{if(!bd.test(a))throw Error(a+" is not a valid IPv6 address.");var c=a.split(":");if(-1!=c[c.length-1].indexOf(".")){a=Oc(ab((new Xc(c[c.length-1])).Xc),0);var d=[];d.push((a>>>16&65535).toString(16));d.push((a&65535).toString(16));Oa(c,c.length-1);Ua(c,d);a=c.join(":")}d=a.split("::");if(2<d.length||1==d.length&&8!=c.length)throw Error(a+
" is not a valid IPv6 address.");if(1<d.length){c=d[0].split(":");d=d[1].split(":");1==c.length&&""==c[0]&&(c=[]);1==d.length&&""==d[0]&&(d=[]);var e=8-(c.length+d.length);if(1>e)c=[];else{for(var f=[],g=0;g<e;g++)f[g]="0";c=Sa(c,f,d)}}if(8!=c.length)throw Error(a+" is not a valid IPv6 address");for(d=0;d<c.length;d++){e=Kc(c[d],16);if(0>e.compare(Ic)||0<e.compare(cd))throw Error(c[d]+" in "+a+" is not a valid hextet.");b=Uc(b.shiftLeft(16),e)}}Vc.call(this,b,6)};t(Wc,Vc);
var bd=/^([a-fA-F0-9]*:){2}[a-fA-F0-9:.]*$/,cd=Hc(65535),ad=Rc(Lc.shiftLeft(128),Lc);Wc.prototype.toString=function(){if(this.Tb)return this.Tb;for(var a=[],b=3;0<=b;b--){var c=Oc(this.Xc,b),d=c&65535;a.push((c>>>16).toString(16));a.push(d.toString(16))}for(var c=b=-1,e=d=0,f=0;f<a.length;f++)"0"==a[f]?(e++,-1==c&&(c=f),e>d&&(d=e,b=c)):(c=-1,e=0);0<d&&(b+d==a.length&&a.push(""),a.splice(b,d,""),0==b&&(a=[""].concat(a)));return this.Tb=a.join(":")};!jb&&!y||y&&9<=Number(ub)||jb&&sb("1.9.1");y&&sb("9");var ed=function(a,b){Va(b,function(b,d){"style"==d?a.style.cssText=b:"class"==d?a.className=b:"for"==d?a.htmlFor=b:dd.hasOwnProperty(d)?a.setAttribute(dd[d],b):0==d.lastIndexOf("aria-",0)||0==d.lastIndexOf("data-",0)?a.setAttribute(d,b):a[d]=b})},dd={cellpadding:"cellPadding",cellspacing:"cellSpacing",colspan:"colSpan",frameborder:"frameBorder",height:"height",maxlength:"maxLength",nonce:"nonce",role:"role",rowspan:"rowSpan",type:"type",usemap:"useMap",valign:"vAlign",width:"width"};var fd=function(a,b,c){this.uh=c;this.Kg=a;this.Lh=b;this.Ld=0;this.Ed=null};fd.prototype.get=function(){var a;0<this.Ld?(this.Ld--,a=this.Ed,this.Ed=a.next,a.next=null):a=this.Kg();return a};fd.prototype.put=function(a){this.Lh(a);this.Ld<this.uh&&(this.Ld++,a.next=this.Ed,this.Ed=a)};var gd=function(a){m.setTimeout(function(){throw a;},0)},hd,id=function(){var a=m.MessageChannel;"undefined"===typeof a&&"undefined"!==typeof window&&window.postMessage&&window.addEventListener&&!x("Presto")&&(a=function(){var a=document.createElement("IFRAME");a.style.display="none";a.src="";document.documentElement.appendChild(a);var b=a.contentWindow,a=b.document;a.open();a.write("");a.close();var c="callImmediate"+Math.random(),d="file:"==b.location.protocol?"*":b.location.protocol+"//"+b.location.host,
a=r(function(a){if(("*"==d||a.origin==d)&&a.data==c)this.port1.onmessage()},this);b.addEventListener("message",a,!1);this.port1={};this.port2={postMessage:function(){b.postMessage(c,d)}}});if("undefined"!==typeof a&&!x("Trident")&&!x("MSIE")){var b=new a,c={},d=c;b.port1.onmessage=function(){if(ba(c.next)){c=c.next;var a=c.cb;c.cb=null;a()}};return function(a){d.next={cb:a};d=d.next;b.port2.postMessage(0)}}return"undefined"!==typeof document&&"onreadystatechange"in document.createElement("SCRIPT")?
function(a){var b=document.createElement("SCRIPT");b.onreadystatechange=function(){b.onreadystatechange=null;b.parentNode.removeChild(b);b=null;a();a=null};document.documentElement.appendChild(b)}:function(a){m.setTimeout(a,0)}};var jd=function(){this.he=this.bc=null},ld=new fd(function(){return new kd},function(a){a.reset()},100);jd.prototype.add=function(a,b){var c=ld.get();c.set(a,b);this.he?this.he.next=c:(w(!this.bc),this.bc=c);this.he=c};jd.prototype.remove=function(){var a=null;this.bc&&(a=this.bc,this.bc=this.bc.next,this.bc||(this.he=null),a.next=null);return a};var kd=function(){this.next=this.scope=this.Oc=null};kd.prototype.set=function(a,b){this.Oc=a;this.scope=b;this.next=null};
kd.prototype.reset=function(){this.next=this.scope=this.Oc=null};var sd=function(a,b){md||nd();od||(md(),od=!0);rd.add(a,b)},md,nd=function(){if(m.Promise&&m.Promise.resolve){var a=m.Promise.resolve(void 0);md=function(){a.then(td)}}else md=function(){var a=td;!p(m.setImmediate)||m.Window&&m.Window.prototype&&!x("Edge")&&m.Window.prototype.setImmediate==m.setImmediate?(hd||(hd=id()),hd(a)):m.setImmediate(a)}},od=!1,rd=new jd,td=function(){for(var a=null;a=rd.remove();){try{a.Oc.call(a.scope)}catch(b){gd(b)}ld.put(a)}od=!1};var ud=function(a){a.prototype.then=a.prototype.then;a.prototype.$goog_Thenable=!0},vd=function(a){if(!a)return!1;try{return!!a.$goog_Thenable}catch(b){return!1}};var C=function(a,b){this.Aa=0;this.ub=void 0;this.jc=this.kb=this.T=null;this.Dd=this.we=!1;if(a!=ca)try{var c=this;a.call(b,function(a){wd(c,2,a)},function(a){if(!(a instanceof xd))try{if(a instanceof Error)throw a;throw Error("Promise rejected.");}catch(b){}wd(c,3,a)})}catch(d){wd(this,3,d)}},yd=function(){this.next=this.context=this.wc=this.Ub=this.child=null;this.Lc=!1};yd.prototype.reset=function(){this.context=this.wc=this.Ub=this.child=null;this.Lc=!1};
var zd=new fd(function(){return new yd},function(a){a.reset()},100),Ad=function(a,b,c){var d=zd.get();d.Ub=a;d.wc=b;d.context=c;return d},D=function(a){if(a instanceof C)return a;var b=new C(ca);wd(b,2,a);return b},Bd=function(a){return new C(function(b,c){c(a)})},Dd=function(a,b,c){Cd(a,b,c,null)||sd(na(b,a))},Ed=function(a){return new C(function(b,c){var d=a.length,e=[];if(d)for(var f=function(a,c){d--;e[a]=c;0==d&&b(e)},g=function(a){c(a)},k=0,l;k<a.length;k++)l=a[k],Dd(l,na(f,k),g);else b(e)})},
Fd=function(a){return new C(function(b){var c=a.length,d=[];if(c)for(var e=function(a,e,f){c--;d[a]=e?{Xg:!0,value:f}:{Xg:!1,reason:f};0==c&&b(d)},f=0,g;f<a.length;f++)g=a[f],Dd(g,na(e,f,!0),na(e,f,!1));else b(d)})},Gd=function(){new C(function(){})};
C.prototype.then=function(a,b,c){null!=a&&Ea(a,"opt_onFulfilled should be a function.");null!=b&&Ea(b,"opt_onRejected should be a function. Did you pass opt_context as the second argument instead of the third?");return Hd(this,p(a)?a:null,p(b)?b:null,c)};ud(C);var Jd=function(a,b){var c=Ad(b,b,void 0);c.Lc=!0;Id(a,c);return a};C.prototype.Ha=function(a,b){return Hd(this,null,a,b)};C.prototype.cancel=function(a){0==this.Aa&&sd(function(){var b=new xd(a);Kd(this,b)},this)};
var Kd=function(a,b){if(0==a.Aa)if(a.T){var c=a.T;if(c.kb){for(var d=0,e=null,f=null,g=c.kb;g&&(g.Lc||(d++,g.child==a&&(e=g),!(e&&1<d)));g=g.next)e||(f=g);e&&(0==c.Aa&&1==d?Kd(c,b):(f?(d=f,w(c.kb),w(null!=d),d.next==c.jc&&(c.jc=d),d.next=d.next.next):Ld(c),Md(c,e,3,b)))}a.T=null}else wd(a,3,b)},Id=function(a,b){a.kb||2!=a.Aa&&3!=a.Aa||Nd(a);w(null!=b.Ub);a.jc?a.jc.next=b:a.kb=b;a.jc=b},Hd=function(a,b,c,d){var e=Ad(null,null,null);e.child=new C(function(a,g){e.Ub=b?function(c){try{var e=b.call(d,
c);a(e)}catch(q){g(q)}}:a;e.wc=c?function(b){try{var e=c.call(d,b);!ba(e)&&b instanceof xd?g(b):a(e)}catch(q){g(q)}}:g});e.child.T=a;Id(a,e);return e.child};C.prototype.ei=function(a){w(1==this.Aa);this.Aa=0;wd(this,2,a)};C.prototype.fi=function(a){w(1==this.Aa);this.Aa=0;wd(this,3,a)};
var wd=function(a,b,c){0==a.Aa&&(a==c&&(b=3,c=new TypeError("Promise cannot resolve to itself")),a.Aa=1,Cd(c,a.ei,a.fi,a)||(a.ub=c,a.Aa=b,a.T=null,Nd(a),3!=b||c instanceof xd||Od(a,c)))},Cd=function(a,b,c,d){if(a instanceof C)return null!=b&&Ea(b,"opt_onFulfilled should be a function."),null!=c&&Ea(c,"opt_onRejected should be a function. Did you pass opt_context as the second argument instead of the third?"),Id(a,Ad(b||ca,c||null,d)),!0;if(vd(a))return a.then(b,c,d),!0;if(ia(a))try{var e=a.then;if(p(e))return Pd(a,
e,b,c,d),!0}catch(f){return c.call(d,f),!0}return!1},Pd=function(a,b,c,d,e){var f=!1,g=function(a){f||(f=!0,c.call(e,a))},k=function(a){f||(f=!0,d.call(e,a))};try{b.call(a,g,k)}catch(l){k(l)}},Nd=function(a){a.we||(a.we=!0,sd(a.Rg,a))},Ld=function(a){var b=null;a.kb&&(b=a.kb,a.kb=b.next,b.next=null);a.kb||(a.jc=null);null!=b&&w(null!=b.Ub);return b};C.prototype.Rg=function(){for(var a=null;a=Ld(this);)Md(this,a,this.Aa,this.ub);this.we=!1};
var Md=function(a,b,c,d){if(3==c&&b.wc&&!b.Lc)for(;a&&a.Dd;a=a.T)a.Dd=!1;if(b.child)b.child.T=null,Qd(b,c,d);else try{b.Lc?b.Ub.call(b.context):Qd(b,c,d)}catch(e){Rd.call(null,e)}zd.put(b)},Qd=function(a,b,c){2==b?a.Ub.call(a.context,c):a.wc&&a.wc.call(a.context,c)},Od=function(a,b){a.Dd=!0;sd(function(){a.Dd&&Rd.call(null,b)})},Rd=gd,xd=function(a){u.call(this,a)};t(xd,u);xd.prototype.name="cancel";/*
 Portions of this code are from MochiKit, received by
 The Closure Authors under the MIT license. All other code is Copyright
 2005-2009 The Closure Authors. All Rights Reserved.
*/
var E=function(a,b){this.Wd=[];this.Of=a;this.sf=b||null;this.Uc=this.mc=!1;this.ub=void 0;this.$e=this.kf=this.ne=!1;this.ee=0;this.T=null;this.oe=0};E.prototype.cancel=function(a){if(this.mc)this.ub instanceof E&&this.ub.cancel();else{if(this.T){var b=this.T;delete this.T;a?b.cancel(a):(b.oe--,0>=b.oe&&b.cancel())}this.Of?this.Of.call(this.sf,this):this.$e=!0;this.mc||F(this,new Sd)}};E.prototype.rf=function(a,b){this.ne=!1;Td(this,a,b)};
var Td=function(a,b,c){a.mc=!0;a.ub=c;a.Uc=!b;Ud(a)},Wd=function(a){if(a.mc){if(!a.$e)throw new Vd;a.$e=!1}};E.prototype.Cb=function(a){Wd(this);Xd(a);Td(this,!0,a)};var F=function(a,b){Wd(a);Xd(b);Td(a,!1,b)},Xd=function(a){w(!(a instanceof E),"An execution sequence may not be initiated with a blocking Deferred.")},$d=function(a){var b=Yd();Zd(b,null,a,void 0)},Zd=function(a,b,c,d){w(!a.kf,"Blocking Deferreds can not be re-used");a.Wd.push([b,c,d]);a.mc&&Ud(a)};
E.prototype.then=function(a,b,c){var d,e,f=new C(function(a,b){d=a;e=b});Zd(this,d,function(a){a instanceof Sd?f.cancel():e(a)});return f.then(a,b,c)};ud(E);
var ae=function(a){return Ja(a.Wd,function(a){return p(a[1])})},Ud=function(a){if(a.ee&&a.mc&&ae(a)){var b=a.ee,c=be[b];c&&(m.clearTimeout(c.mb),delete be[b]);a.ee=0}a.T&&(a.T.oe--,delete a.T);for(var b=a.ub,d=c=!1;a.Wd.length&&!a.ne;){var e=a.Wd.shift(),f=e[0],g=e[1],e=e[2];if(f=a.Uc?g:f)try{var k=f.call(e||a.sf,b);ba(k)&&(a.Uc=a.Uc&&(k==b||k instanceof Error),a.ub=b=k);if(vd(b)||"function"===typeof m.Promise&&b instanceof m.Promise)d=!0,a.ne=!0}catch(l){b=l,a.Uc=!0,ae(a)||(c=!0)}}a.ub=b;d&&(k=r(a.rf,
a,!0),d=r(a.rf,a,!1),b instanceof E?(Zd(b,k,d),b.kf=!0):b.then(k,d));c&&(b=new ce(b),be[b.mb]=b,a.ee=b.mb)},Vd=function(){u.call(this)};t(Vd,u);Vd.prototype.message="Deferred has already fired";Vd.prototype.name="AlreadyCalledError";var Sd=function(){u.call(this)};t(Sd,u);Sd.prototype.message="Deferred was canceled";Sd.prototype.name="CanceledError";var ce=function(a){this.mb=m.setTimeout(r(this.di,this),0);this.ta=a};
ce.prototype.di=function(){w(be[this.mb],"Cannot throw an error that is not scheduled.");delete be[this.mb];throw this.ta;};var be={};var Yd=function(){var a="//apis.google.com/js/client.js?onload="+de,b={},c=b.document||document,d=document.createElement("SCRIPT"),e={hg:d,qd:void 0},f=new E(ee,e),g=null,k=null!=b.timeout?b.timeout:5E3;0<k&&(g=window.setTimeout(function(){fe(d,!0);F(f,new ge(1,"Timeout reached for loading script "+a))},k),e.qd=g);d.onload=d.onreadystatechange=function(){d.readyState&&"loaded"!=d.readyState&&"complete"!=d.readyState||(fe(d,b.ni||!1,g),f.Cb(null))};d.onerror=function(){fe(d,!0,g);F(f,new ge(0,"Error while loading script "+
a))};e=b.attributes||{};cb(e,{type:"text/javascript",charset:"UTF-8",src:a});ed(d,e);he(c).appendChild(d);return f},he=function(a){var b=a.getElementsByTagName("HEAD");return b&&0!=b.length?b[0]:a.documentElement},ee=function(){if(this&&this.hg){var a=this.hg;a&&"SCRIPT"==a.tagName&&fe(a,!0,this.qd)}},fe=function(a,b,c){null!=c&&m.clearTimeout(c);a.onload=ca;a.onerror=ca;a.onreadystatechange=ca;b&&window.setTimeout(function(){a&&a.parentNode&&a.parentNode.removeChild(a)},0)},ge=function(a,b){var c=
"Jsloader error (code #"+a+")";b&&(c+=": "+b);u.call(this,c);this.code=a};t(ge,u);var G=function(){Qb.call(this);this.Ua=new Yb(this);this.Bg=this;this.Ie=null};t(G,Qb);G.prototype[Tb]=!0;h=G.prototype;h.addEventListener=function(a,b,c,d){dc(this,a,b,c,d)};h.removeEventListener=function(a,b,c,d){lc(this,a,b,c,d)};
h.dispatchEvent=function(a){ie(this);var b,c=this.Ie;if(c){b=[];for(var d=1;c;c=c.Ie)b.push(c),w(1E3>++d,"infinite loop")}c=this.Bg;d=a.type||a;if(n(a))a=new Rb(a,c);else if(a instanceof Rb)a.target=a.target||c;else{var e=a;a=new Rb(d,c);cb(a,e)}var e=!0,f;if(b)for(var g=b.length-1;!a.yc&&0<=g;g--)f=a.currentTarget=b[g],e=je(f,d,!0,a)&&e;a.yc||(f=a.currentTarget=c,e=je(f,d,!0,a)&&e,a.yc||(e=je(f,d,!1,a)&&e));if(b)for(g=0;!a.yc&&g<b.length;g++)f=a.currentTarget=b[g],e=je(f,d,!1,a)&&e;return e};
h.Ka=function(){G.Hc.Ka.call(this);this.Ua&&this.Ua.removeAll(void 0);this.Ie=null};h.Va=function(a,b,c,d){ie(this);return this.Ua.add(String(a),b,!1,c,d)};h.Id=function(a,b,c,d){return this.Ua.add(String(a),b,!0,c,d)};h.cf=function(a,b,c,d){return this.Ua.remove(String(a),b,c,d)};
var je=function(a,b,c,d){b=a.Ua.qa[String(b)];if(!b)return!0;b=b.concat();for(var e=!0,f=0;f<b.length;++f){var g=b[f];if(g&&!g.Cc&&g.vd==c){var k=g.listener,l=g.Vc||g.src;g.ud&&$b(a.Ua,g);e=!1!==k.call(l,d)&&e}}return e&&0!=d.fg};G.prototype.Rc=function(a,b,c,d){return this.Ua.Rc(String(a),b,c,d)};var ie=function(a){w(a.Ua,"Event target is not initialized. Did you call the superclass (goog.events.EventTarget) constructor?")};var ke="StopIteration"in m?m.StopIteration:{message:"StopIteration",stack:""},le=function(){};le.prototype.next=function(){throw ke;};le.prototype.Mb=function(){return this};
var me=function(a){if(a instanceof le)return a;if("function"==typeof a.Mb)return a.Mb(!1);if(ga(a)){var b=0,c=new le;c.next=function(){for(;;){if(b>=a.length)throw ke;if(b in a)return a[b++];b++}};return c}throw Error("Not implemented");},ne=function(a,b){if(ga(a))try{Ga(a,b,void 0)}catch(c){if(c!==ke)throw c;}else{a=me(a);try{for(;;)b.call(void 0,a.next(),void 0,a)}catch(c){if(c!==ke)throw c;}}};var oe=function(a,b){this.W={};this.u=[];this.wb=this.S=0;var c=arguments.length;if(1<c){if(c%2)throw Error("Uneven number of arguments");for(var d=0;d<c;d+=2)this.set(arguments[d],arguments[d+1])}else a&&this.addAll(a)};h=oe.prototype;h.Ma=function(){return this.S};h.ua=function(){pe(this);for(var a=[],b=0;b<this.u.length;b++)a.push(this.W[this.u[b]]);return a};h.lb=function(){pe(this);return this.u.concat()};h.kc=function(a){return qe(this.W,a)};
h.wd=function(a){for(var b=0;b<this.u.length;b++){var c=this.u[b];if(qe(this.W,c)&&this.W[c]==a)return!0}return!1};h.equals=function(a,b){if(this===a)return!0;if(this.S!=a.Ma())return!1;var c=b||re;pe(this);for(var d,e=0;d=this.u[e];e++)if(!c(this.get(d),a.get(d)))return!1;return!0};var re=function(a,b){return a===b};oe.prototype.remove=function(a){return qe(this.W,a)?(delete this.W[a],this.S--,this.wb++,this.u.length>2*this.S&&pe(this),!0):!1};
var pe=function(a){if(a.S!=a.u.length){for(var b=0,c=0;b<a.u.length;){var d=a.u[b];qe(a.W,d)&&(a.u[c++]=d);b++}a.u.length=c}if(a.S!=a.u.length){for(var e={},c=b=0;b<a.u.length;)d=a.u[b],qe(e,d)||(a.u[c++]=d,e[d]=1),b++;a.u.length=c}};h=oe.prototype;h.get=function(a,b){return qe(this.W,a)?this.W[a]:b};h.set=function(a,b){qe(this.W,a)||(this.S++,this.u.push(a),this.wb++);this.W[a]=b};
h.addAll=function(a){var b;a instanceof oe?(b=a.lb(),a=a.ua()):(b=Xa(a),a=Wa(a));for(var c=0;c<b.length;c++)this.set(b[c],a[c])};h.forEach=function(a,b){for(var c=this.lb(),d=0;d<c.length;d++){var e=c[d],f=this.get(e);a.call(b,f,e,this)}};h.clone=function(){return new oe(this)};h.Mb=function(a){pe(this);var b=0,c=this.wb,d=this,e=new le;e.next=function(){if(c!=d.wb)throw Error("The map has changed since the iterator was created");if(b>=d.u.length)throw ke;var e=d.u[b++];return a?e:d.W[e]};return e};
var qe=function(a,b){return Object.prototype.hasOwnProperty.call(a,b)};var se=function(a){if(a.Ma&&"function"==typeof a.Ma)a=a.Ma();else if(ga(a)||n(a))a=a.length;else{var b=0,c;for(c in a)b++;a=b}return a},te=function(a){if(a.ua&&"function"==typeof a.ua)return a.ua();if(n(a))return a.split("");if(ga(a)){for(var b=[],c=a.length,d=0;d<c;d++)b.push(a[d]);return b}return Wa(a)},ue=function(a){if(a.lb&&"function"==typeof a.lb)return a.lb();if(!a.ua||"function"!=typeof a.ua){if(ga(a)||n(a)){var b=[];a=a.length;for(var c=0;c<a;c++)b.push(c);return b}return Xa(a)}},ve=function(a,
b){if(a.forEach&&"function"==typeof a.forEach)a.forEach(b,void 0);else if(ga(a)||n(a))Ga(a,b,void 0);else for(var c=ue(a),d=te(a),e=d.length,f=0;f<e;f++)b.call(void 0,d[f],c&&c[f],a)},we=function(a,b){if("function"==typeof a.every)return a.every(b,void 0);if(ga(a)||n(a))return Ka(a,b,void 0);for(var c=ue(a),d=te(a),e=d.length,f=0;f<e;f++)if(!b.call(void 0,d[f],c&&c[f],a))return!1;return!0};var xe=function(a){this.W=new oe;a&&this.addAll(a)},ye=function(a){var b=typeof a;return"object"==b&&a||"function"==b?"o"+(a[ja]||(a[ja]=++ka)):b.substr(0,1)+a};h=xe.prototype;h.Ma=function(){return this.W.Ma()};h.add=function(a){this.W.set(ye(a),a)};h.addAll=function(a){a=te(a);for(var b=a.length,c=0;c<b;c++)this.add(a[c])};h.removeAll=function(a){a=te(a);for(var b=a.length,c=0;c<b;c++)this.remove(a[c])};h.remove=function(a){return this.W.remove(ye(a))};h.contains=function(a){return this.W.kc(ye(a))};
h.ua=function(){return this.W.ua()};h.clone=function(){return new xe(this)};h.equals=function(a){return this.Ma()==se(a)&&ze(this,a)};var ze=function(a,b){var c=se(b);if(a.Ma()>c)return!1;!(b instanceof xe)&&5<c&&(b=new xe(b));return we(a,function(a){var c=b;if(c.contains&&"function"==typeof c.contains)a=c.contains(a);else if(c.wd&&"function"==typeof c.wd)a=c.wd(a);else if(ga(c)||n(c))a=Na(c,a);else a:{for(var f in c)if(c[f]==a){a=!0;break a}a=!1}return a})};xe.prototype.Mb=function(){return this.W.Mb(!1)};var Ae=function(a){var b=[],c=function(a,e,f){var g=e+"  ";f=new xe(f);try{if(ba(a))if(null===a)b.push("NULL");else if(n(a))b.push('"'+a.replace(/\n/g,"\n"+e)+'"');else if(p(a))b.push(String(a).replace(/\n/g,"\n"+e));else if(ia(a))if(f.contains(a))b.push("*** reference loop detected ***");else{f.add(a);b.push("{");for(var k in a)p(a[k])||(b.push("\n"),b.push(g),b.push(k+" = "),c(a[k],g,f));b.push("\n"+e+"}")}else b.push(a);else b.push("undefined")}catch(l){b.push("*** "+l+" ***")}};c(a,"",new xe);
return b.join("")};var Be=function(a,b,c,d,e){this.reset(a,b,c,d,e)};Be.prototype.uf=null;var Ce=0;Be.prototype.reset=function(a,b,c,d,e){"number"==typeof e||Ce++;d||oa();this.ad=a;this.zh=b;delete this.uf};Be.prototype.jg=function(a){this.ad=a};var De=function(a){this.Nf=a;this.Df=this.qe=this.ad=this.T=null},Ee=function(a,b){this.name=a;this.value=b};Ee.prototype.toString=function(){return this.name};var Fe=new Ee("SEVERE",1E3),Ge=new Ee("CONFIG",700),He=new Ee("FINE",500);De.prototype.getName=function(){return this.Nf};De.prototype.getParent=function(){return this.T};De.prototype.jg=function(a){this.ad=a};var Ie=function(a){if(a.ad)return a.ad;if(a.T)return Ie(a.T);Ba("Root logger has no level set.");return null};
De.prototype.log=function(a,b,c){if(a.value>=Ie(this).value)for(p(b)&&(b=b()),a=new Be(a,String(b),this.Nf),c&&(a.uf=c),c="log:"+a.zh,m.console&&(m.console.timeStamp?m.console.timeStamp(c):m.console.markTimeline&&m.console.markTimeline(c)),m.msWriteProfilerMark&&m.msWriteProfilerMark(c),c=this;c;){b=c;var d=a;if(b.Df)for(var e=0,f=void 0;f=b.Df[e];e++)f(d);c=c.getParent()}};
var Je={},Ke=null,Le=function(a){Ke||(Ke=new De(""),Je[""]=Ke,Ke.jg(Ge));var b;if(!(b=Je[a])){b=new De(a);var c=a.lastIndexOf("."),d=a.substr(c+1),c=Le(a.substr(0,c));c.qe||(c.qe={});c.qe[d]=b;b.T=c;Je[a]=b}return b};var Me=function(a,b){a&&a.log(He,b,void 0)};var Ne=function(a,b,c){if(p(a))c&&(a=r(a,c));else if(a&&"function"==typeof a.handleEvent)a=r(a.handleEvent,a);else throw Error("Invalid listener argument");return 2147483647<Number(b)?-1:m.setTimeout(a,b||0)},Oe=function(a){var b=null;return(new C(function(c,d){b=Ne(function(){c(void 0)},a);-1==b&&d(Error("Failed to schedule timer."))})).Ha(function(a){m.clearTimeout(b);throw a;})};var Pe=/^(?:([^:/?#.]+):)?(?:\/\/(?:([^/?#]*)@)?([^/#?]*?)(?::([0-9]+))?(?=[/#?]|$))?([^?#]+)?(?:\?([^#]*))?(?:#(.*))?$/,Qe=function(a,b){if(a)for(var c=a.split("&"),d=0;d<c.length;d++){var e=c[d].indexOf("="),f=null,g=null;0<=e?(f=c[d].substring(0,e),g=c[d].substring(e+1)):f=c[d];b(f,g?decodeURIComponent(g.replace(/\+/g," ")):"")}};var I=function(a){G.call(this);this.headers=new oe;this.je=a||null;this.Ab=!1;this.ie=this.i=null;this.Zc=this.Kf=this.Hd="";this.Sb=this.Ee=this.Gd=this.ve=!1;this.Ic=0;this.$d=null;this.cg="";this.fe=this.Hh=this.ki=!1};t(I,G);var Re=I.prototype,Se=Le("goog.net.XhrIo");Re.Pa=Se;var Te=/^https?$/i,Ue=["POST","PUT"];
I.prototype.send=function(a,b,c,d){if(this.i)throw Error("[goog.net.XhrIo] Object is active with another request="+this.Hd+"; newUri="+a);b=b?b.toUpperCase():"GET";this.Hd=a;this.Zc="";this.Kf=b;this.ve=!1;this.Ab=!0;this.i=this.je?this.je.se():Ac.se();this.ie=this.je?this.je.getOptions():Ac.getOptions();this.i.onreadystatechange=r(this.Qf,this);this.Hh&&"onprogress"in this.i&&(this.i.onprogress=r(function(a){this.Pf(a,!0)},this),this.i.upload&&(this.i.upload.onprogress=r(this.Pf,this)));try{Me(this.Pa,
Ve(this,"Opening Xhr")),this.Ee=!0,this.i.open(b,String(a),!0),this.Ee=!1}catch(f){Me(this.Pa,Ve(this,"Error opening Xhr: "+f.message));this.ta(5,f);return}a=c||"";var e=this.headers.clone();d&&ve(d,function(a,b){e.set(b,a)});d=Ma(e.lb());c=m.FormData&&a instanceof m.FormData;!Na(Ue,b)||d||c||e.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");e.forEach(function(a,b){this.i.setRequestHeader(b,a)},this);this.cg&&(this.i.responseType=this.cg);Ya(this.i)&&(this.i.withCredentials=
this.ki);try{We(this),0<this.Ic&&(this.fe=Xe(this.i),Me(this.Pa,Ve(this,"Will abort after "+this.Ic+"ms if incomplete, xhr2 "+this.fe)),this.fe?(this.i.timeout=this.Ic,this.i.ontimeout=r(this.qd,this)):this.$d=Ne(this.qd,this.Ic,this)),Me(this.Pa,Ve(this,"Sending request")),this.Gd=!0,this.i.send(a),this.Gd=!1}catch(f){Me(this.Pa,Ve(this,"Send error: "+f.message)),this.ta(5,f)}};var Xe=function(a){return y&&sb(9)&&ha(a.timeout)&&ba(a.ontimeout)},La=function(a){return"content-type"==a.toLowerCase()};
I.prototype.qd=function(){"undefined"!=typeof aa&&this.i&&(this.Zc="Timed out after "+this.Ic+"ms, aborting",Me(this.Pa,Ve(this,this.Zc)),this.dispatchEvent("timeout"),this.abort(8))};I.prototype.ta=function(a,b){this.Ab=!1;this.i&&(this.Sb=!0,this.i.abort(),this.Sb=!1);this.Zc=b;Ye(this);Ze(this)};var Ye=function(a){a.ve||(a.ve=!0,a.dispatchEvent("complete"),a.dispatchEvent("error"))};
I.prototype.abort=function(){this.i&&this.Ab&&(Me(this.Pa,Ve(this,"Aborting")),this.Ab=!1,this.Sb=!0,this.i.abort(),this.Sb=!1,this.dispatchEvent("complete"),this.dispatchEvent("abort"),Ze(this))};I.prototype.Ka=function(){this.i&&(this.Ab&&(this.Ab=!1,this.Sb=!0,this.i.abort(),this.Sb=!1),Ze(this,!0));I.Hc.Ka.call(this)};I.prototype.Qf=function(){this.wa()||(this.Ee||this.Gd||this.Sb?$e(this):this.Dh())};I.prototype.Dh=function(){$e(this)};
var $e=function(a){if(a.Ab&&"undefined"!=typeof aa)if(a.ie[1]&&4==bf(a)&&2==a.getStatus())Me(a.Pa,Ve(a,"Local request error detected and ignored"));else if(a.Gd&&4==bf(a))Ne(a.Qf,0,a);else if(a.dispatchEvent("readystatechange"),4==bf(a)){Me(a.Pa,Ve(a,"Request complete"));a.Ab=!1;try{var b=a.getStatus(),c;a:switch(b){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:c=!0;break a;default:c=!1}var d;if(!(d=c)){var e;if(e=0===b){var f=String(a.Hd).match(Pe)[1]||null;if(!f&&m.self&&m.self.location)var g=
m.self.location.protocol,f=g.substr(0,g.length-1);e=!Te.test(f?f.toLowerCase():"")}d=e}if(d)a.dispatchEvent("complete"),a.dispatchEvent("success");else{var k;try{k=2<bf(a)?a.i.statusText:""}catch(l){Me(a.Pa,"Can not get status: "+l.message),k=""}a.Zc=k+" ["+a.getStatus()+"]";Ye(a)}}finally{Ze(a)}}};
I.prototype.Pf=function(a,b){w("progress"===a.type,"goog.net.EventType.PROGRESS is of the same type as raw XHR progress.");this.dispatchEvent(cf(a,"progress"));this.dispatchEvent(cf(a,b?"downloadprogress":"uploadprogress"))};
var cf=function(a,b){return{type:b,lengthComputable:a.lengthComputable,loaded:a.loaded,total:a.total}},Ze=function(a,b){if(a.i){We(a);var c=a.i,d=a.ie[0]?ca:null;a.i=null;a.ie=null;b||a.dispatchEvent("ready");try{c.onreadystatechange=d}catch(e){(c=a.Pa)&&c.log(Fe,"Problem encountered resetting onreadystatechange: "+e.message,void 0)}}},We=function(a){a.i&&a.fe&&(a.i.ontimeout=null);ha(a.$d)&&(m.clearTimeout(a.$d),a.$d=null)},bf=function(a){return a.i?a.i.readyState:0};
I.prototype.getStatus=function(){try{return 2<bf(this)?this.i.status:-1}catch(a){return-1}};var Ve=function(a,b){return b+" ["+a.Kf+" "+a.Hd+" "+a.getStatus()+"]"};var df=function(a,b){this.Db=this.$b=this.Ib="";this.xc=null;this.Qb=this.Pd="";this.Fa=this.th=!1;var c;if(a instanceof df)this.Fa=ba(b)?b:a.Fa,ef(this,a.Ib),c=a.$b,ff(this),this.$b=c,gf(this,a.Db),hf(this,a.xc),this.setPath(a.getPath()),jf(this,a.Ya.clone()),c=a.Qb,ff(this),this.Qb=c;else if(a&&(c=String(a).match(Pe))){this.Fa=!!b;ef(this,c[1]||"",!0);var d=c[2]||"";ff(this);this.$b=kf(d);gf(this,c[3]||"",!0);hf(this,c[4]);this.setPath(c[5]||"",!0);jf(this,c[6]||"",!0);c=c[7]||"";ff(this);this.Qb=
kf(c)}else this.Fa=!!b,this.Ya=new lf(null,0,this.Fa)};
df.prototype.toString=function(){var a=[],b=this.Ib;b&&a.push(mf(b,nf,!0),":");var c=this.Db;if(c||"file"==b)a.push("//"),(b=this.$b)&&a.push(mf(b,nf,!0),"@"),a.push(encodeURIComponent(String(c)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),c=this.xc,null!=c&&a.push(":",String(c));if(c=this.getPath())this.Db&&"/"!=c.charAt(0)&&a.push("/"),a.push(mf(c,"/"==c.charAt(0)?of:pf,!0));(c=this.Ya.toString())&&a.push("?",c);(c=this.Qb)&&a.push("#",mf(c,qf));return a.join("")};
df.prototype.resolve=function(a){var b=this.clone(),c=!!a.Ib;c?ef(b,a.Ib):c=!!a.$b;if(c){var d=a.$b;ff(b);b.$b=d}else c=!!a.Db;c?gf(b,a.Db):c=null!=a.xc;d=a.getPath();if(c)hf(b,a.xc);else if(c=!!a.Pd){if("/"!=d.charAt(0))if(this.Db&&!this.Pd)d="/"+d;else{var e=b.getPath().lastIndexOf("/");-1!=e&&(d=b.getPath().substr(0,e+1)+d)}e=d;if(".."==e||"."==e)d="";else if(v(e,"./")||v(e,"/.")){for(var d=0==e.lastIndexOf("/",0),e=e.split("/"),f=[],g=0;g<e.length;){var k=e[g++];"."==k?d&&g==e.length&&f.push(""):
".."==k?((1<f.length||1==f.length&&""!=f[0])&&f.pop(),d&&g==e.length&&f.push("")):(f.push(k),d=!0)}d=f.join("/")}else d=e}c?b.setPath(d):c=""!==a.Ya.toString();c?jf(b,kf(a.Ya.toString())):c=!!a.Qb;c&&(a=a.Qb,ff(b),b.Qb=a);return b};df.prototype.clone=function(){return new df(this)};
var ef=function(a,b,c){ff(a);a.Ib=c?kf(b,!0):b;a.Ib&&(a.Ib=a.Ib.replace(/:$/,""))},gf=function(a,b,c){ff(a);a.Db=c?kf(b,!0):b},hf=function(a,b){ff(a);if(b){b=Number(b);if(isNaN(b)||0>b)throw Error("Bad port number "+b);a.xc=b}else a.xc=null};df.prototype.getPath=function(){return this.Pd};df.prototype.setPath=function(a,b){ff(this);this.Pd=b?kf(a,!0):a;return this};
var jf=function(a,b,c){ff(a);b instanceof lf?(a.Ya=b,a.Ya.We(a.Fa)):(c||(b=mf(b,rf)),a.Ya=new lf(b,0,a.Fa))},sf=function(a,b,c){ff(a);a.Ya.set(b,c)},ff=function(a){if(a.th)throw Error("Tried to modify a read-only Uri");};df.prototype.We=function(a){this.Fa=a;this.Ya&&this.Ya.We(a);return this};
var tf=function(a,b){var c=new df(null,void 0);ef(c,"https");a&&gf(c,a);b&&c.setPath(b);return c},kf=function(a,b){return a?b?decodeURI(a.replace(/%25/g,"%2525")):decodeURIComponent(a):""},mf=function(a,b,c){return n(a)?(a=encodeURI(a).replace(b,uf),c&&(a=a.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),a):null},uf=function(a){a=a.charCodeAt(0);return"%"+(a>>4&15).toString(16)+(a&15).toString(16)},nf=/[#\/\?@]/g,pf=/[\#\?:]/g,of=/[\#\?]/g,rf=/[\#\?@]/g,qf=/#/g,lf=function(a,b,c){this.S=this.V=null;this.Da=
a||null;this.Fa=!!c},vf=function(a){a.V||(a.V=new oe,a.S=0,a.Da&&Qe(a.Da,function(b,c){a.add(decodeURIComponent(b.replace(/\+/g," ")),c)}))},wf=function(a){var b=ue(a);if("undefined"==typeof b)throw Error("Keys are undefined");var c=new lf(null,0,void 0);a=te(a);for(var d=0;d<b.length;d++){var e=b[d],f=a[d];fa(f)?c.setValues(e,f):c.add(e,f)}return c};h=lf.prototype;h.Ma=function(){vf(this);return this.S};
h.add=function(a,b){vf(this);this.Da=null;a=this.ka(a);var c=this.V.get(a);c||this.V.set(a,c=[]);c.push(b);this.S=Ca(this.S)+1;return this};h.remove=function(a){vf(this);a=this.ka(a);return this.V.kc(a)?(this.Da=null,this.S=Ca(this.S)-this.V.get(a).length,this.V.remove(a)):!1};h.kc=function(a){vf(this);a=this.ka(a);return this.V.kc(a)};h.wd=function(a){var b=this.ua();return Na(b,a)};
h.lb=function(){vf(this);for(var a=this.V.ua(),b=this.V.lb(),c=[],d=0;d<b.length;d++)for(var e=a[d],f=0;f<e.length;f++)c.push(b[d]);return c};h.ua=function(a){vf(this);var b=[];if(n(a))this.kc(a)&&(b=Ra(b,this.V.get(this.ka(a))));else{a=this.V.ua();for(var c=0;c<a.length;c++)b=Ra(b,a[c])}return b};h.set=function(a,b){vf(this);this.Da=null;a=this.ka(a);this.kc(a)&&(this.S=Ca(this.S)-this.V.get(a).length);this.V.set(a,[b]);this.S=Ca(this.S)+1;return this};
h.get=function(a,b){var c=a?this.ua(a):[];return 0<c.length?String(c[0]):b};h.setValues=function(a,b){this.remove(a);0<b.length&&(this.Da=null,this.V.set(this.ka(a),Ta(b)),this.S=Ca(this.S)+b.length)};h.toString=function(){if(this.Da)return this.Da;if(!this.V)return"";for(var a=[],b=this.V.lb(),c=0;c<b.length;c++)for(var d=b[c],e=encodeURIComponent(String(d)),d=this.ua(d),f=0;f<d.length;f++){var g=e;""!==d[f]&&(g+="="+encodeURIComponent(String(d[f])));a.push(g)}return this.Da=a.join("&")};
h.clone=function(){var a=new lf;a.Da=this.Da;this.V&&(a.V=this.V.clone(),a.S=this.S);return a};h.ka=function(a){a=String(a);this.Fa&&(a=a.toLowerCase());return a};h.We=function(a){a&&!this.Fa&&(vf(this),this.Da=null,this.V.forEach(function(a,c){var d=c.toLowerCase();c!=d&&(this.remove(c),this.setValues(d,a))},this));this.Fa=a};var xf=function(a,b){var c=[],d;for(d in a)d in b?typeof a[d]!=typeof b[d]?c.push(d):fa(a[d])?$a(a[d],b[d])||c.push(d):"object"==typeof a[d]&&null!=a[d]&&null!=b[d]?0<xf(a[d],b[d]).length&&c.push(d):a[d]!==b[d]&&c.push(d):c.push(d);for(d in b)d in a||c.push(d);return c},yf=function(a,b){var c=null,d=Math.floor(1E9*Math.random()).toString(),e=a||500,f=b||600,g=(window.screen.availHeight-f)/2,k=(window.screen.availWidth-e)/2,e={width:e,height:f,top:0<g?g:0,left:0<k?k:0,location:!0,resizable:!0,statusbar:!0,
toolbar:!1};d&&(e.target=d);navigator.userAgent&&-1!=navigator.userAgent.indexOf("Firefox/")&&(c=c||"http://localhost");var l,f=c||"about:blank";(d=e)||(d={});c=window;e=f instanceof Eb?f:Ib("undefined"!=typeof f.href?f.href:String(f));f=d.target||f.target;g=[];for(l in d)switch(l){case "width":case "height":case "top":case "left":g.push(l+"="+d[l]);break;case "target":case "noreferrer":break;default:g.push(l+"="+(d[l]?1:0))}l=g.join(",");(x("iPhone")&&!x("iPod")&&!x("iPad")||x("iPad")||x("iPod"))&&
c.navigator&&c.navigator.standalone&&f&&"_self"!=f?(l=c.document.createElement("A"),e=e instanceof Eb?e:Ib(e),l.href=Fb(e),l.setAttribute("target",f),d.noreferrer&&l.setAttribute("rel","noreferrer"),d=document.createEvent("MouseEvent"),d.initMouseEvent("click",!0,!0,c,1),l.dispatchEvent(d),l={}):d.noreferrer?(l=c.open("",f,l),d=Fb(e),l&&(ib&&v(d,";")&&(d="'"+d.replace(/'/g,"%27")+"'"),l.opener=null,c=new Bb,c.Zd="b/12014412, meta tag with sanitized URL",xa.test(d)&&(-1!=d.indexOf("&")&&(d=d.replace(ra,
"&amp;")),-1!=d.indexOf("<")&&(d=d.replace(sa,"&lt;")),-1!=d.indexOf(">")&&(d=d.replace(ta,"&gt;")),-1!=d.indexOf('"')&&(d=d.replace(ua,"&quot;")),-1!=d.indexOf("'")&&(d=d.replace(va,"&#39;")),-1!=d.indexOf("\x00")&&(d=d.replace(wa,"&#0;"))),d='<META HTTP-EQUIV="refresh" content="0; url='+d+'">',Da(Cb(c),"must provide justification"),w(!/^[\s\xa0]*$/.test(Cb(c)),"must provide non-empty justification"),l.document.write(Lb((new Kb).sh(d))),l.document.close())):l=c.open(Fb(e),f,l);if(l)try{l.focus()}catch(q){}return l},
zf=function(a){return new C(function(b){var c=function(){Oe(2E3).then(function(){if(!a||a.closed)b();else return c()})};return c()})},Af=function(){var a=null;return(new C(function(b){"complete"==m.document.readyState?b():(a=function(){b()},kc(window,"load",a))})).Ha(function(b){lc(window,"load",a);throw b;})},Bf=function(){var a=navigator.userAgent,b=a.toLowerCase();if(v(b,"opera/")||v(b,"opr/")||v(b,"opios/"))return"Opera";if(v(b,"msie")||v(b,"trident/"))return"IE";if(v(b,"edge/"))return"Edge";
if(v(b,"firefox/"))return"Firefox";if(v(b,"silk/"))return"Silk";if(v(b,"safari/")&&!v(b,"chrome/"))return"Safari";if(!v(b,"chrome/")&&!v(b,"crios/")||v(b,"edge/")){if((a=a.match(/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/))&&2==a.length)return a[1]}else return"Chrome";return"Other"},Cf=function(a){return Bf()+"/JsCore/"+a};var Df;try{var Ef={};Object.defineProperty(Ef,"abcd",{configurable:!0,enumerable:!0,value:1});Object.defineProperty(Ef,"abcd",{configurable:!0,enumerable:!0,value:2});Df=2==Ef.abcd}catch(a){Df=!1}
var J=function(a,b,c){Df?Object.defineProperty(a,b,{configurable:!0,enumerable:!0,value:c}):a[b]=c},Ff=function(a,b){if(b)for(var c in b)b.hasOwnProperty(c)&&J(a,c,b[c])},Gf=function(a){var b={},c;for(c in a)a.hasOwnProperty(c)&&(b[c]=a[c]);return b},Hf=function(a,b){if(!b||!b.length)return!0;if(!a)return!1;for(var c=0;c<b.length;c++){var d=a[b[c]];if(void 0===d||null===d||""===d)return!1}return!0};var If={sg:{kd:985,jd:735,providerId:"facebook.com"},ug:{kd:1040,jd:620,providerId:"github.com"},vg:{kd:485,jd:640,providerId:"google.com"},zg:{kd:485,jd:705,providerId:"twitter.com"}},Jf=function(a){for(var b in If)if(If[b].providerId==a)return If[b];return null};var K=function(a,b){this.code="auth/"+a;this.message=b||Kf[a]||""};t(K,Error);K.prototype.Ra=function(){return{name:this.code,code:this.code,message:this.message}};
var Kf={"argument-error":"","app-not-authorized":"This app, identified by the domain where it's hosted, is not authorized to use Firebase Authentication with the provided API key. Review your key configuration in the Google API console.","cors-unsupported":"This browser is not supported.","credential-already-in-use":"This credential is already associated with a different user account.","custom-token-mismatch":"The custom token corresponds to a different audience.","requires-recent-login":"This operation is sensitive and requires recent authentication. Log in again before retrying this request.",
"email-already-in-use":"The email address is already in use by another account.","expired-action-code":"The action code has expired. ","cancelled-popup-request":"This operation has been cancelled due to another conflicting popup being opened.","internal-error":"An internal error has occurred.","invalid-user-token":"The user's credential is no longer valid. The user must sign in again.","invalid-auth-event":"An internal error has occurred.","invalid-custom-token":"The custom token format is incorrect. Please check the documentation.",
"invalid-email":"The email address is badly formatted.","invalid-api-key":"Your API key is invalid, please check you have copied it correctly.","invalid-credential":"The supplied auth credential is malformed or has expired.","invalid-oauth-provider":"EmailAuthProvider is not supported for this operation. This operation only supports OAuth providers.","unauthorized-domain":"This domain is not authorized for OAuth operations for your Firebase project. Edit the list of authorized domains from the Firebase console.",
"invalid-action-code":"The action code is invalid. This can happen if the code is malformed, expired, or has already been used.","wrong-password":"The password is invalid or the user does not have a password.","missing-iframe-start":"An internal error has occurred.","auth-domain-config-required":"Be sure to include authDomain when calling firebase.initializeApp(), by following the instructions in the Firebase console.","app-deleted":"This instance of FirebaseApp has been deleted.","account-exists-with-different-credential":"An account already exists with the same email address but different sign-in credentials. Sign in using a provider associated with this email address.",
"network-request-failed":"A network error (such as timeout, interrupted connection or unreachable host) has occurred.","no-auth-event":"An internal error has occurred.","no-such-provider":"User was not linked to an account with the given provider.","operation-not-allowed":"This operation is not allowed. You must enable this service in the console.","popup-blocked":"Unable to establish a connection with the popup. It may have been blocked by the browser.","popup-closed-by-user":"The popup has been closed by the user before finalizing the operation.",
"provider-already-linked":"User can only be linked to one identity for the given provider.",timeout:"The operation has timed out.","user-token-expired":"The user's credential is no longer valid. The user must sign in again.","too-many-requests":"We have blocked all requests from this device due to unusual activity. Try again later.","user-not-found":"There is no user record corresponding to this identifier. The user may have been deleted.","user-disabled":"The user account has been disabled by an administrator.",
"user-mismatch":"The supplied credentials do not correspond to the previously signed in user.","user-signed-out":"","weak-password":"The password must be 6 characters long or more.","web-storage-unsupported":"This browser is not supported."};var Lf=function(a){this.wh=a.sub;oa();this.xd=a.email||null};var Mf=function(a,b,c,d){var e={};ia(c)?e=c:b&&n(c)&&n(d)?e={oauthToken:c,oauthTokenSecret:d}:!b&&n(c)&&(e={accessToken:c});if(b||!e.idToken&&!e.accessToken)if(b&&e.oauthToken&&e.oauthTokenSecret)J(this,"accessToken",e.oauthToken),J(this,"secret",e.oauthTokenSecret);else{if(b)throw new K("argument-error","credential failed: expected 2 arguments (the OAuth access token and secret).");throw new K("argument-error","credential failed: expected 1 argument (the OAuth access token).");}else e.idToken&&J(this,
"idToken",e.idToken),e.accessToken&&J(this,"accessToken",e.accessToken);J(this,"provider",a)};Mf.prototype.Bd=function(a){return Nf(a,Of(this))};Mf.prototype.Lf=function(a,b){var c=Of(this);c.idToken=b;return L(a,Pf,c)};var Of=function(a){var b={};a.idToken&&(b.id_token=a.idToken);a.accessToken&&(b.access_token=a.accessToken);a.secret&&(b.oauth_token_secret=a.secret);b.providerId=a.provider;return{postBody:wf(b).toString(),requestUri:window.location.href}};
Mf.prototype.Ra=function(){var a={provider:this.provider};this.idToken&&(a.oauthIdToken=this.idToken);this.accessToken&&(a.oauthAccessToken=this.accessToken);this.secret&&(a.oauthTokenSecret=this.secret);return a};
var Qf=function(a,b){var c=!!b,d=function(){Ff(this,{providerId:a,isOAuthProvider:!0});this.Te=[]};c||(d.prototype.addScope=function(a){Na(this.Te,a)||this.Te.push(a)});d.prototype.yf=function(){return Ta(this.Te)};d.credential=function(b,d){return new Mf(a,c,b,d)};Ff(d,{PROVIDER_ID:a});return d},Rf=Qf("facebook.com");Rf.prototype.addScope=Rf.prototype.addScope||void 0;var Sf=Qf("github.com");Sf.prototype.addScope=Sf.prototype.addScope||void 0;var Tf=Qf("google.com");
Tf.prototype.addScope=Tf.prototype.addScope||void 0;Tf.credential=function(a,b){if(!a&&!b)throw new K("argument-error","credential failed: must provide the ID token and/or the access token.");return new Mf("google.com",!1,ia(a)?a:{idToken:a||null,accessToken:b||null})};var Uf=Qf("twitter.com",!0),Vf=function(a,b){this.xd=a;this.Je=b;J(this,"provider","password")};Vf.prototype.Bd=function(a){return L(a,Wf,{email:this.xd,password:this.Je})};
Vf.prototype.Lf=function(a,b){return L(a,Xf,{idToken:b,email:this.xd,password:this.Je})};Vf.prototype.Ra=function(){return{email:this.xd,password:this.Je}};var Yf=function(){Ff(this,{providerId:"password",isOAuthProvider:!1})};Ff(Yf,{PROVIDER_ID:"password"});
var Zf={li:Yf,sg:Rf,vg:Tf,ug:Sf,zg:Uf},$f=function(a){var b=a&&a.providerId;if(!b)return null;var c=a&&a.oauthAccessToken,d=a&&a.oauthTokenSecret;a=a&&a.oauthIdToken;for(var e in Zf)if(Zf[e].PROVIDER_ID==b)try{return Zf[e].credential({accessToken:c,idToken:a,oauthToken:c,oauthTokenSecret:d})}catch(f){break}return null};var ag=function(a,b,c){K.call(this,"account-exists-with-different-credential",c);J(this,"email",a);J(this,"credential",b)};t(ag,K);ag.prototype.Ra=function(){var a={code:this.code,message:this.message,email:this.email},b=this.credential&&this.credential.Ra();b&&(cb(a,b),a.providerId=b.provider,delete a.provider);return a};var bg=function(a,b,c,d,e){this.Kb=a;this.Pb=b||null;this.Kc=c||null;this.Ue=d||null;this.ta=e||null;if(this.Kc||this.ta){if(this.Kc&&this.ta)throw new K("invalid-auth-event");if(this.Kc&&!this.Ue)throw new K("invalid-auth-event");}else throw new K("invalid-auth-event");};bg.prototype.ye=function(){return this.Ue};bg.prototype.getError=function(){return this.ta};bg.prototype.Ra=function(){return{type:this.Kb,eventId:this.Pb,urlResponse:this.Kc,sessionId:this.Ue,error:this.ta&&this.ta.Ra()}};var M=function(a,b,c){this.ma=a;a=b||{};this.Th=a.secureTokenEndpoint||"https://securetoken.googleapis.com/v1/token";this.Vh=a.secureTokenTimeout||1E4;this.Uh=ab(a.secureTokenHeaders||cg);this.Ug=a.firebaseEndpoint||"https://www.googleapis.com/identitytoolkit/v3/relyingparty/";this.Vg=a.firebaseTimeout||1E4;this.wf=ab(a.firebaseHeaders||dg);c&&(this.wf["X-Client-Version"]=c);this.Jg=new Dc},eg,cg={"Content-Type":"application/x-www-form-urlencoded"},dg={"Content-Type":"application/json"},gg=function(a,
b,c,d,e,f,g){!y||!ub||9<ub?a=r(a.Xh,a):(eg||(eg=new C(function(a,b){fg(a,b)})),a=r(a.Wh,a));a(b,c,d,e,f,g)};
M.prototype.Xh=function(a,b,c,d,e,f){var g=new I(this.Jg),k;f&&(g.Ic=Math.max(0,f),k=setTimeout(function(){g.dispatchEvent("timeout")},f));g.Va("complete",function(){k&&clearTimeout(k);var a=null;try{var c;c=this.i?sc(this.i.responseText):void 0;a=c||null}catch(d){a=null}b&&b(a)});g.Id("ready",function(){k&&clearTimeout(k);this.Sa()});g.Id("timeout",function(){k&&clearTimeout(k);this.Sa();b&&b(null)});g.send(a,c,d,e)};
var de="__fcb"+Math.floor(1E6*Math.random()).toString(),fg=function(a,b){((window.gapi||{}).client||{}).request?a():(m[de]=function(){((window.gapi||{}).client||{}).request?a():b(Error("CORS_UNSUPPORTED"))},$d(function(){b(Error("CORS_UNSUPPORTED"))}))};
M.prototype.Wh=function(a,b,c,d,e){var f=this;eg.then(function(){window.gapi.client.setApiKey(f.ma);var g=window.gapi.auth.getToken();window.gapi.auth.setToken(null);window.gapi.client.request({path:a,method:c,body:d,headers:e,authType:"none",callback:function(a){window.gapi.auth.setToken(g);b&&b(a)}})}).Ha(function(a){b&&b({error:{message:a&&a.message||"CORS_UNSUPPORTED"}})})};
var hg=function(a,b){return new C(function(c,d){"refresh_token"==b.grant_type&&b.refresh_token||"authorization_code"==b.grant_type&&b.code?gg(a,a.Th+"?key="+encodeURIComponent(a.ma),function(a){a?a.access_token&&a.refresh_token?c(a):d(new K("internal-error")):d(new K("network-request-failed"))},"POST",wf(b).toString(),a.Uh,a.Vh):d(new K("internal-error"))})},ig=function(a){var b={},c;for(c in a)null!==a[c]&&void 0!==a[c]&&(b[c]=a[c]);return vc(b)},kg=function(a,b,c,d,e){var f=a.Ug+b+"?key="+encodeURIComponent(a.ma);
e&&(f+="&cb="+oa().toString());return new C(function(b,e){gg(a,f,function(a){a?a.error?e(jg(a)):b(a):e(new K("network-request-failed"))},c,ig(d),a.wf,a.Vg)})},lg=function(a){if(!qc.test(a.email))throw new K("invalid-email");},mg=function(a){"email"in a&&lg(a)},og=function(a,b){return L(a,ng,{identifier:b,continueUri:window.location.href}).then(function(a){return a.allProviders||[]})},qg=function(a){return L(a,pg,{}).then(function(a){return a.authorizedDomains||[]})},rg=function(a){if(!a.idToken)throw new K("internal-error");
};M.prototype.signInAnonymously=function(){return L(this,sg,{})};M.prototype.updateEmail=function(a,b){return L(this,tg,{idToken:a,email:b})};M.prototype.updatePassword=function(a,b){return L(this,Xf,{idToken:a,password:b})};var ug={displayName:"DISPLAY_NAME",photoUrl:"PHOTO_URL"};M.prototype.updateProfile=function(a,b){var c={idToken:a},d=[];Va(ug,function(a,f){var g=b[f];null===g?d.push(a):f in b&&(c[f]=g)});d.length&&(c.deleteAttribute=d);return L(this,tg,c)};
M.prototype.sendPasswordResetEmail=function(a){return L(this,vg,{requestType:"PASSWORD_RESET",email:a})};M.prototype.sendEmailVerification=function(a){return L(this,wg,{requestType:"VERIFY_EMAIL",idToken:a})};
var yg=function(a,b,c){return L(a,xg,{idToken:b,deleteProvider:c})},zg=function(a){if(!a.requestUri||!a.sessionId&&!a.postBody)throw new K("internal-error");},Ag=function(a){if(a.needConfirmation)throw(a&&a.email?new ag(a.email,$f(a),a.message):null)||new K("account-exists-with-different-credential");if(!a.idToken)throw new K("internal-error");},Nf=function(a,b){return L(a,Bg,b)},Cg=function(a){if(!a.oobCode)throw new K("invalid-action-code");};
M.prototype.confirmPasswordReset=function(a,b){return L(this,Dg,{oobCode:a,newPassword:b})};M.prototype.checkActionCode=function(a){return L(this,Eg,{oobCode:a})};M.prototype.applyActionCode=function(a){return L(this,Fg,{oobCode:a})};
var Fg={endpoint:"setAccountInfo",ya:Cg,Ec:"email"},Eg={endpoint:"resetPassword",ya:Cg,Gb:function(a){if(!qc.test(a.email))throw new K("internal-error");}},Gg={endpoint:"signupNewUser",ya:function(a){lg(a);if(!a.password)throw new K("weak-password");},Gb:rg,Hb:!0},ng={endpoint:"createAuthUri"},Hg={endpoint:"deleteAccount",Dc:["idToken"]},xg={endpoint:"setAccountInfo",Dc:["idToken","deleteProvider"],ya:function(a){if(!fa(a.deleteProvider))throw new K("internal-error");}},Ig={endpoint:"getAccountInfo"},
wg={endpoint:"getOobConfirmationCode",Dc:["idToken","requestType"],ya:function(a){if("VERIFY_EMAIL"!=a.requestType)throw new K("internal-error");},Ec:"email"},vg={endpoint:"getOobConfirmationCode",Dc:["requestType"],ya:function(a){if("PASSWORD_RESET"!=a.requestType)throw new K("internal-error");lg(a)},Ec:"email"},pg={Dg:!0,endpoint:"getProjectConfig",lh:"GET"},Dg={endpoint:"resetPassword",ya:Cg,Ec:"email"},tg={endpoint:"setAccountInfo",Dc:["idToken"],ya:mg,Hb:!0},Xf={endpoint:"setAccountInfo",Dc:["idToken"],
ya:function(a){mg(a);if(!a.password)throw new K("weak-password");},Gb:rg,Hb:!0},sg={endpoint:"signupNewUser",Gb:rg,Hb:!0},Bg={endpoint:"verifyAssertion",ya:zg,Gb:Ag,Hb:!0},Pf={endpoint:"verifyAssertion",ya:function(a){zg(a);if(!a.idToken)throw new K("internal-error");},Gb:Ag,Hb:!0},Jg={endpoint:"verifyCustomToken",ya:function(a){if(!a.token)throw new K("invalid-custom-token");},Gb:rg,Hb:!0},Wf={endpoint:"verifyPassword",ya:function(a){lg(a);if(!a.password)throw new K("wrong-password");},Gb:rg,Hb:!0},
L=function(a,b,c){if(!Hf(c,b.Dc))return Bd(new K("internal-error"));var d=b.lh||"POST",e;return D(c).then(b.ya).then(function(){b.Hb&&(c.returnSecureToken=!0);return kg(a,b.endpoint,d,c,b.Dg||!1)}).then(function(a){return e=a}).then(b.Gb).then(function(){if(!b.Ec)return e;if(!(b.Ec in e))throw new K("internal-error");return e[b.Ec]})},jg=function(a){var b;b=(a.error&&a.error.errors&&a.error.errors[0]||{}).reason||"";var c={keyInvalid:"invalid-api-key",ipRefererBlocked:"app-not-authorized"};if(b=c[b]?
new K(c[b]):null)return b;a=a.error&&a.error.message||"";b={INVALID_CUSTOM_TOKEN:"invalid-custom-token",CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_EMAIL:"invalid-email",INVALID_PASSWORD:"wrong-password",USER_DISABLED:"user-disabled",MISSING_PASSWORD:"internal-error",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",
FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",EMAIL_NOT_FOUND:"user-not-found",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",CORS_UNSUPPORTED:"cors-unsupported"};if(b[a])return new K(b[a]);b={TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",WEAK_PASSWORD:"weak-password",
OPERATION_NOT_ALLOWED:"operation-not-allowed"};for(var d in b)if(0===a.indexOf(d))return new K(b[d]);return new K("internal-error")};function _DumpException(a){throw a;}var Kg=function(a,b){return b},N=function(a,b){var c=b=Kg(a,b),d=a.split("."),e=m;d[0]in e||!e.execScript||e.execScript("var "+d[0]);for(var f;d.length&&(f=d.shift());)!d.length&&ba(c)?e[f]=c:e=e[f]?e[f]:e[f]={}};window.osapi=window.osapi||{};window.___jsl=window.___jsl||{};
(window.___jsl.cd=window.___jsl.cd||[]).push({gwidget:{parsetags:"explicit"},appsapi:{plus_one_service:"/plus/v1"},client:{rms:"migrated"},csi:{rate:.01},poshare:{hangoutContactPickerServer:"https://plus.google.com"},gappsutil:{required_scopes:["https://www.googleapis.com/auth/plus.me","https://www.googleapis.com/auth/plus.people.recommended"],display_on_page_ready:!1},appsutil:{required_scopes:["https://www.googleapis.com/auth/plus.me","https://www.googleapis.com/auth/plus.people.recommended"],display_on_page_ready:!1},
"oauth-flow":{authUrl:"https://accounts.google.com/o/oauth2/auth",proxyUrl:"https://accounts.google.com/o/oauth2/postmessageRelay",redirectUri:"postmessage"},iframes:{sharebox:{params:{json:"&"},url:":socialhost:/:session_prefix:_/sharebox/dialog"},plus:{url:":socialhost:/:session_prefix:_/widget/render/badge?usegapi=1"},":socialhost:":"https://apis.google.com",":im_socialhost:":"https://plus.googleapis.com",domains_suggest:{url:"https://domains.google.com/suggest/flow"},card:{params:{s:"#",userid:"&"},
url:":socialhost:/:session_prefix:_/hovercard/internalcard"},":signuphost:":"https://plus.google.com",":gplus_url:":"https://plus.google.com",plusone:{url:":socialhost:/:session_prefix:_/+1/fastbutton?usegapi=1"},plus_share:{url:":socialhost:/:session_prefix:_/+1/sharebutton?plusShare=true&usegapi=1"},plus_circle:{url:":socialhost:/:session_prefix:_/widget/plus/circle?usegapi=1"},plus_followers:{url:":socialhost:/_/im/_/widget/render/plus/followers?usegapi=1"},configurator:{url:":socialhost:/:session_prefix:_/plusbuttonconfigurator?usegapi=1"},
appcirclepicker:{url:":socialhost:/:session_prefix:_/widget/render/appcirclepicker"},page:{url:":socialhost:/:session_prefix:_/widget/render/page?usegapi=1"},person:{url:":socialhost:/:session_prefix:_/widget/render/person?usegapi=1"},community:{url:":ctx_socialhost:/:session_prefix::im_prefix:_/widget/render/community?usegapi=1"},follow:{url:":socialhost:/:session_prefix:_/widget/render/follow?usegapi=1"},commentcount:{url:":socialhost:/:session_prefix:_/widget/render/commentcount?usegapi=1"},comments:{url:":socialhost:/:session_prefix:_/widget/render/comments?usegapi=1"},
blogger:{url:":socialhost:/:session_prefix:_/widget/render/blogger?usegapi=1"},youtube:{url:":socialhost:/:session_prefix:_/widget/render/youtube?usegapi=1"},reportabuse:{url:":socialhost:/:session_prefix:_/widget/render/reportabuse?usegapi=1"},additnow:{url:":socialhost:/additnow/additnow.html"},udc_webconsentflow:{url:"https://myaccount.google.com/webconsent?usegapi=1"},":source:":"1p"},poclient:{update_session:"google.updateSessionCallback"},"googleapis.config":{methods:{"pos.plusones.list":!0,
"pos.plusones.get":!0,"pos.plusones.insert":!0,"pos.plusones.delete":!0,"pos.plusones.getSignupState":!0},requestCache:{enabled:!0},versions:{pos:"v1"},rpc:"/rpc",root:"https://content.googleapis.com","root-1p":"https://clients6.google.com",sessionCache:{enabled:!0},transport:{isProxyShared:!0},xd3:"/static/proxy.html",developerKey:"AIzaSyCKSbrvQasunBoV16zDH9R33D88CeLr9gQ",auth:{useInterimAuth:!1}},report:{apis:["iframes\\..*","gadgets\\..*","gapi\\.appcirclepicker\\..*","gapi\\.client\\..*"],rate:1E-4}});var O=window,Lg=document,Mg=/\[native code\]/,Ng=function(a,b,c){return a[b]=a[b]||c},Og=function(a){return!!a&&"object"===typeof a&&Mg.test(a.push)},Pg=function(a){for(var b=0;b<this.length;b++)if(this[b]===a)return b;return-1},Qg=function(a){a=a.sort();for(var b=[],c=void 0,d=0;d<a.length;d++){var e=a[d];e!=c&&b.push(e);c=e}return b},Rg=function(a,b){if(a)if(Og(a)){if(a){P(Og(a),"arrayForEach was called with a non array value");for(var c=0;c<a.length;c++)b.call(void 0,a[c],c)}}else for(c in P("object"===
typeof a,"objectForEach was called with a non object value"),a)Q(a,c)&&void 0!==a[c]&&b.call(a,a[c],c)},Sg=/&/g,Tg=/</g,Ug=/>/g,Vg=/"/g,Wg=/'/g,Xg=function(a){return String(a).replace(Sg,"&amp;").replace(Tg,"&lt;").replace(Ug,"&gt;").replace(Vg,"&quot;").replace(Wg,"&#39;")},R=function(){var a;if((a=Object.create)&&Mg.test(a))a=a(null);else{a={};for(var b in a)a[b]=void 0}return a},Q=function(a,b){return Object.prototype.hasOwnProperty.call(a,b)},Yg=function(a,b){a=a||{};for(var c in a)Q(a,c)&&(b[c]=
a[c])},P=function(a,b){if(!a)throw Error(b||"");},Zg=Ng(O,"gapi",{});var $g=function(a,b,c){var d=new RegExp("([#].*&|[#])"+b+"=([^&#]*)","g");b=new RegExp("([?#].*&|[?#])"+b+"=([^&#]*)","g");if(a=a&&(d.exec(a)||b.exec(a)))try{c=decodeURIComponent(a[2])}catch(e){}return c},ah=/^([^?#]*)(\?([^#]*))?(\#(.*))?$/,bh=function(a){a=a.match(ah);var b=R();b.jf=a[1];b.query=a[3]?[a[3]]:[];b.zd=a[5]?[a[5]]:[];return b},ch=function(a){return a.jf+(0<a.query.length?"?"+a.query.join("&"):"")+(0<a.zd.length?"#"+a.zd.join("&"):"")},dh=function(a,b){var c=[];if(a)for(var d in a)if(Q(a,
d)&&null!=a[d]){var e=b?b(a[d]):a[d];c.push(encodeURIComponent(d)+"="+encodeURIComponent(e))}return c},eh=/^https?:\/\/[^\/%\\?#\s]+\/[^\s]*$/i;var fh=function(a,b,c,d,e){if(a[d+"EventListener"])a[d+"EventListener"](b,c,!1);else if(a[e+"tachEvent"])a[e+"tachEvent"]("on"+b,c)},gh=function(a){for(;a.firstChild;)a.removeChild(a.firstChild)};var hh;hh=Ng(O,"___jsl",R());Ng(hh,"I",0);Ng(hh,"hel",10);var ih=function(){var a=[],b=hh.H;b&&Rg(b,function(b){a.push.apply(a,b.L)});return Qg(a)};var jh=function(a){var b=window.___jsl=window.___jsl||{};b[a]=b[a]||[];return b[a]},kh=function(a){var b=window.___jsl=window.___jsl||{};b.cfg=!a&&b.cfg||{};return b.cfg},lh=function(a){return"object"===typeof a&&/\[native code\]/.test(a.push)},mh=function(a,b){if(b)for(var c in b)b.hasOwnProperty(c)&&(a[c]&&b[c]&&"object"===typeof a[c]&&"object"===typeof b[c]&&!lh(a[c])&&!lh(b[c])?mh(a[c],b[c]):b[c]&&"object"===typeof b[c]?(a[c]=lh(b[c])?[]:{},mh(a[c],b[c])):a[c]=b[c])},nh=function(a){if(a&&!/^\s+$/.test(a)){for(;0==
a.charCodeAt(a.length-1);)a=a.substring(0,a.length-1);var b;try{b=window.JSON.parse(a)}catch(c){}if("object"===typeof b)return b;try{b=(new Function("return ("+a+"\n)"))()}catch(c){}if("object"===typeof b)return b;try{b=(new Function("return ({"+a+"\n})"))()}catch(c){}return"object"===typeof b?b:{}}},oh=function(a){kh(!0);var b=window.___gcfg,c=jh("cu");if(b&&b!==window.___gu){var d={};mh(d,b);c.push(d);window.___gu=b}var b=jh("cu"),e=document.scripts||document.getElementsByTagName("script")||[],
d=[],f=[];f.push.apply(f,jh("us"));for(var g=0;g<e.length;++g)for(var k=e[g],l=0;l<f.length;++l)k.src&&0==k.src.indexOf(f[l])&&d.push(k);0==d.length&&0<e.length&&e[e.length-1].src&&d.push(e[e.length-1]);for(e=0;e<d.length;++e)d[e].getAttribute("gapi_processed")||(d[e].setAttribute("gapi_processed",!0),(f=d[e])?(g=f.nodeType,f=3==g||4==g?f.nodeValue:f.textContent||f.innerText||f.innerHTML||""):f=void 0,(f=nh(f))&&b.push(f));a&&(d={},mh(d,a),c.push(d));d=jh("cd");a=0;for(b=d.length;a<b;++a)mh(kh(),
d[a]);d=jh("ci");a=0;for(b=d.length;a<b;++a)mh(kh(),d[a]);a=0;for(b=c.length;a<b;++a)mh(kh(),c[a])},ph=function(a,b){if(!a)return kh();for(var c=a.split("/"),d=kh(),e=0,f=c.length;d&&"object"===typeof d&&e<f;++e)d=d[c[e]];return e===c.length&&void 0!==d?d:b};var qh=function(){var a=window.__GOOGLEAPIS;a&&(a.googleapis&&!a["googleapis.config"]&&(a["googleapis.config"]=a.googleapis),Ng(hh,"ci",[]).push(a),window.__GOOGLEAPIS=void 0)};qh&&qh();oh();var rh=function(a){this.b=a};rh.prototype.value=function(){return this.b};rh.prototype.xf=function(){return this.b.height};rh.prototype.Xe=function(a){this.b.style=a;return this};rh.prototype.Cd=function(){return this.b.style};var sh=function(a,b){a.b.onload=b};var th=function(a){this.b=a||{}};h=th.prototype;h.value=function(){return this.b};h.setUrl=function(a){this.b.url=a;return this};h.getUrl=function(){return this.b.url};h.Xe=function(a){this.b.style=a;return this};h.Cd=function(){return this.b.style};h.qc=function(){return this.b.id};h.Zb=function(a){this.b.rpctoken=a;return this};h.tc=function(){return this.b.rpctoken};var uh=function(a,b){a.b.messageHandlers=b;return a},vh=function(a,b){a.b.messageHandlersFilter=b;return a};
th.prototype.md=function(a){this.b.apis=a;return this};th.prototype.Pc=function(){return this.b.apis};var wh=function(a,b){a.b.onClose=b};th.prototype.getContext=function(){return this.b.context};var xh=function(a){a.b.attributes=a.b.attributes||{};return new rh(a.b.attributes)},yh=function(a){return(a=a.b.timeout)?a:null};var T=function(a){this.b=a||{}};T.prototype.value=function(){return this.b};T.prototype.getIframe=function(){return this.b.iframe};var zh=function(a,b){a.b.role=b;return a},Ah=function(a,b){a.b.data=b;return a};T.prototype.vb=function(a){this.b.setRpcReady=a;return this};T.prototype.Tc=function(){return this.b.setRpcReady};T.prototype.Zb=function(a){this.b.rpctoken=a;return this};T.prototype.tc=function(){return this.b.rpctoken};var Bh=function(a){a.b.selfConnect=!0;return a};var Ch=function(a){this.b=a||{}};Ch.prototype.value=function(){return this.b};var Dh=function(a){var b=new Ch;b.b.role=a;return b},Eh=function(a,b){a.b.handler=b;return a},Fh=function(a,b){a.b.filter=b;return a};Ch.prototype.md=function(a){this.b.apis=a;return this};Ch.prototype.Pc=function(){return this.b.apis};var Gh=function(a){a.b.runOnce=!0;return a};N("gapi.config.get",ph);N("gapi.config.update",function(a,b){var c=a;if("string"===typeof a){for(var d=c={},e=a.split("/"),f=0,g=e.length;f<g-1;++f)var k={},d=d[e[f]]=k;d[e[f]]=b}oh(c)});var Hh={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},Ih=function(a){var b,c,d;b=/[\"\\\x00-\x1f\x7f-\x9f]/g;if(void 0!==a){switch(typeof a){case "string":return b.test(a)?'"'+a.replace(b,function(a){var b=Hh[a];if(b)return b;b=a.charCodeAt();return"\\u00"+Math.floor(b/16).toString(16)+(b%16).toString(16)})+'"':'"'+a+'"';case "number":return isFinite(a)?String(a):"null";case "boolean":case "null":return String(a);case "object":if(!a)return"null";b=[];if("number"===
typeof a.length&&!a.propertyIsEnumerable("length")){d=a.length;for(c=0;c<d;c+=1)b.push(Ih(a[c])||"null");return"["+b.join(",")+"]"}for(c in a)!/___$/.test(c)&&Q(a,c)&&"string"===typeof c&&(d=Ih(a[c]))&&b.push(Ih(c)+":"+d);return"{"+b.join(",")+"}"}return""}},Jh=function(a){if(!a)return!1;if(/^[\],:{}\s]*$/.test(a.replace(/\\["\\\/b-u]/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,"")))try{return eval("("+a+")")}catch(b){}return!1},
Kh=!1;try{Kh=!!window.JSON&&'["a"]'===window.JSON.stringify(["a"])&&"a"===window.JSON.parse('["a"]')[0]}catch(a){}var Lh=function(a){try{return window.JSON.parse(a)}catch(b){return!1}},Mh=Kh?window.JSON.stringify:Ih,Nh=Kh?Lh:Jh;var Oh,Ph,Qh,Rh,Sh,Th={},Vh=0,Wh=R(),Xh=R(),Yh=function(a){return"number"===typeof a&&a>Math.random()},Zh=function(a){if("undefined"===typeof Oh){var b=ph("report")||{},c=b.rate;Rh=b.timeout||1E3;Ph=b.host||"https://plus.google.com";Qh=b.path||"/_/widget/report";Oh=[];Yh(c)&&(Oh=b.apis||[]);var b=b.apiRate||{},d;for(d in b)Yh(b[d])&&Oh.push(d)}for(d=0;d<Oh.length;++d)if((new RegExp("^"+Oh[d]+"$")).test(a))return!0;return!1},$h=function(a){delete Th[a]},ai=function(){Sh&&(O.clearTimeout(Sh),Sh=0);
Sh=O.setTimeout(function(){var a;a=document.location;a=a.protocol+"//"+a.host+a.pathname;var b;var c=Xh;if(Mg.test(Object.keys))b=Object.keys(c);else{var d=[];for(b in c)Q(c,b)&&d.push(b);b=d}a=[Ph,Qh,"?api=",encodeURIComponent(b.join(":")),"&url=",encodeURIComponent(a),"&loaded=",encodeURIComponent(ih().join(":"))].join("");Xh=R();b=new Image;c=Vh++;Th[c]=b;b.onload=b.onerror=na($h,c);b.src=a;Sh=0},Rh)},bi=Kg,Kg=function(a,b){var c=bi(a,b);"function"===typeof b&&Zh(a)&&(c=function(c){Wh[a]||(Xh[a]=
!0,Wh[a]=!0,ai());return b.apply(this,arguments)});return c};N("gadgets.json.stringify",Mh);N("gadgets.json.parse",Nh);var ci=function(a){if(!a)return"";a=a.split("#")[0].split("?")[0];a=a.toLowerCase();0==a.indexOf("//")&&(a=window.location.protocol+a);/^[\w\-]*:\/\//.test(a)||(a=window.location.href);var b=a.substring(a.indexOf("://")+3),c=b.indexOf("/");-1!=c&&(b=b.substring(0,c));a=a.substring(0,a.indexOf("://"));if("http"!==a&&"https"!==a&&"chrome-extension"!==a&&"file"!==a)throw Error("Invalid URI scheme in origin");var c="",d=b.indexOf(":");if(-1!=d){var e=b.substring(d+1),b=b.substring(0,d);if("http"===a&&
"80"!==e||"https"===a&&"443"!==e)c=":"+e}return a+"://"+b+c};var di=window.console;$g(O.location.href,"rpctoken")&&fh(Lg,"unload",function(){},"add","at");var ei=ei||{};ei=ei||{};
(function(){var a=null;ei.Ae=function(b){var c="undefined"===typeof b;if(null!==a&&c)return a;var d={};b=b||window.location.href;var e=b.indexOf("?"),f=b.indexOf("#");b=(-1===f?b.substr(e+1):[b.substr(e+1,f-e-1),"&",b.substr(f+1)].join("")).split("&");for(var e=window.decodeURIComponent?decodeURIComponent:unescape,f=0,g=b.length;f<g;++f){var k=b[f].indexOf("=");if(-1!==k){var l=b[f].substring(0,k),k=b[f].substring(k+1),k=k.replace(/\+/g," ");try{d[l]=e(k)}catch(q){}}}c&&(a=d);return d};ei.Ae()})();N("gadgets.util.getUrlParameters",ei.Ae);var gi=function(a){this.sd=a;this.Ba=O;this.Le=this.Ng;this.Wg=/MSIE\s*[0-8](\D|$)/.test(window.navigator.userAgent);if(this.sd.bg){this.Ba=this.sd.Bf(this.Ba,this.sd.bg);a=this.Ba.document;var b=a.createElement("script");b.setAttribute("type","text/javascript");b.text="window.doPostMsg=function(w,s,o) {window.setTimeout(function(){w.postMessage(s,o);},0);};";a.body.appendChild(b);this.Le=this.Ba.doPostMsg}this.Ze={};this.df={};a=r(this.eh,this);fh(this.Ba,"message",a,"add","at");Ng(hh,"RPMQ",[]).push(a);
if(this.Ba!=this.Ba.parent){a=this.Ba.parent;var b="{h:'"+escape(this.Ba.name)+"'}",c=fi(b)?"":"!_";this.Le(a,c+b,"*")}},hi=function(a){var b=null;0===a.indexOf("{h:'")&&a.indexOf("'}")===a.length-2&&(b=unescape(a.substring(4,a.length-2)));return b},fi=function(a){if(!/^\s*{/.test(a))return!1;a=Nh(a);return null!==a&&"object"===typeof a&&!!a.g};
gi.prototype.eh=function(a){var b=String(a.data),c=0!==b.indexOf("!_");c||(b=b.substring(2));var d=fi(b);if(!c&&!d){if(!d&&(c=hi(b))){if(this.Ze[c])this.Ze[c]();else this.df[c]=1;return}var e=a.origin,f=this.sd.Og;this.Wg?O.setTimeout(function(){f(b,e)},0):f(b,e)}};gi.prototype.lg=function(a,b){".."===a||this.df[a]?(b(),delete this.df[a]):this.Ze[a]=b};gi.prototype.Ng=function(a,b,c){a.postMessage(b,c)};
gi.prototype.send=function(a,b,c){if((a=this.sd.Bf(this.Ba,a))&&!a.closed){var d=fi(b)?"":"!_";this.Le(a,d+b,c)}};var ii=0,ji=[],ki={},li={},mi=ei.Ae,ni=mi(),oi=ni.rpctoken,pi=ni.parent||Lg.referrer,qi=ni.rly,ri=qi||(O!==O.top||O.opener)&&O.name||"..",si=null,ti={},ui=function(){},vi={send:ui,lg:ui},wi=function(a,b){"/"==b.charAt(0)&&(b=b.substring(1),a=O.top);for(var c=b.split("/");c.length;){var d;d=c.shift();"{"==d.charAt(0)&&"}"==d.charAt(d.length-1)&&(d=d.substring(1,d.length-1));if(".."===d)a=a==a.parent?a.opener:a.parent;else if(".."!==d&&a.frames[d]){if(a=a.frames[d],!("postMessage"in a))throw"Not a window";
}else return null}return a},xi=function(a){return(a=ki[a])&&a.ae},yi=function(a){if(a.f in{})return!1;var b=a.t,c=ki[a.r];a=a.origin;return c&&(c.ae===b||!c.ae&&!b)&&(a===c.origin||"*"===c.origin)},zi=function(a){var b=a.id.split("/"),c=b[b.length-1],d=a.origin;return function(a){var b=a.origin;return a.f==c&&(d==b||"*"==d)}},Ci=function(a,b,c){a=Ai(a);li[a.name]={Oc:b,$c:a.$c,Ia:c||yi};Bi()},Di={},Ei=function(a,b){var c=Di["_"+a];c&&c[1](this)&&c[0].call(this,b)},Gi=function(a){var b=a.c;if(!b)return ui;
var c=a.r,d=a.g?"legacy__":"";return function(){var a=[].slice.call(arguments,0);a.unshift(c,d+"__cb",null,b);Fi.apply(null,a)}},Hi=function(a){si=a},Ji=function(a){ti[a]||(ti[a]=O.setTimeout(function(){ti[a]=!1;Ii(a)},0))},Ii=function(a){var b=ki[a];if(b&&b.ready){var c=b.Oe;for(b.Oe=[];c.length;)vi.send(a,Mh(c.shift()),b.origin)}},Ai=function(a){return 0===a.indexOf("legacy__")?{name:a.substring(8),$c:!0}:{name:a,$c:!1}},Bi=function(){for(var a=ph("rpc/residenceSec")||60,b=(new Date).getTime()/
1E3,c=0,d;d=ji[c];++c){var e=d.Rh;if(!e||0<a&&b-d.timestamp>a)ji.splice(c,1),--c;else{var f=e.s,g=li[f]||li["*"];if(g&&(ji.splice(c,1),--c,e.origin=d.origin,d=Gi(e),e.callback=d,g.Ia(e))){if("__cb"!==f&&!!g.$c!=!!e.g)break;e=g.Oc.apply(e,e.a);void 0!==e&&d(e)}}}},Ki=function(a,b,c){ji.push({Rh:a,origin:b,timestamp:(new Date).getTime()/1E3});c||Bi()},Li=function(a,b){var c=Nh(a);Ki(c,b,!1)},Mi=function(a){for(;a.length;)Ki(a.shift(),this.origin,!0);Bi()},Ni=function(a){var b=!1;a=a.split("|");var c=
a[0];0<=c.indexOf("/")&&(b=!0);return{id:c,origin:a[1]||"*",Fe:b}},Oi=function(a,b,c,d){var e=Ni(a);d&&(O.frames[e.id]=O.frames[e.id]||d);a=e.id;if(!ki.hasOwnProperty(a)){c=c||null;d=e.origin;if(".."===a)d=ci(pi),c=c||oi;else if(!e.Fe){var f=Lg.getElementById(a);f&&(f=f.src,d=ci(f),c=c||mi(f).rpctoken)}"*"===e.origin&&d||(d=e.origin);ki[a]={ae:c,Oe:[],origin:d,Qh:b,ag:function(){var b=a;ki[b].ready=1;Ii(b)}};vi.lg(a,ki[a].ag)}return ki[a].ag},Fi=function(a,b,c,d){a=a||"..";Oi(a);a=a.split("|",1)[0];
var e=b,f=[].slice.call(arguments,3),g=c,k=ri,l=oi,q=ki[a],S=k,H=Ni(a);if(q&&".."!==a){if(H.Fe){if(!(l=ki[a].Qh)){for(var l=null,l=si?si.substring(1).split("/"):[ri],S=l.length-1,pd=O.parent;pd!==O.top;){var af=pd.parent;if(!S--){for(var Uh=null,Bl=af.frames.length,qd=0;qd<Bl;++qd)af.frames[qd]==pd&&(Uh=qd);l.unshift("{"+Uh+"}")}pd=af}l="/"+l.join("/")}S=l}else S=k="..";l=q.ae}g&&H?(q=yi,H.Fe&&(q=zi(H)),Di["_"+ ++ii]=[g,q],H=ii):H=null;f={s:e,f:k,r:S,t:l,c:H,a:f};e=Ai(e);f.s=e.name;f.g=e.$c;ki[a].Oe.push(f);
Ji(a)};if("function"===typeof O.postMessage||"object"===typeof O.postMessage)vi=new gi({bg:qi?"../"+qi:null,Og:Li,Bf:wi,oi:ri,getToken:xi,ri:Hi}),Ci("__cb",Ei,function(){return!0}),Ci("_processBatch",Mi,function(){return!0}),Oi("..");var Qi=function(a){this.resolve=this.reject=null;this.promise=new C(r(function(a,c){this.resolve=a;this.reject=c},this));a&&(this.promise=Pi(this.promise,a))},Pi=function(a,b){return a.then(function(a){try{b(a)}catch(d){}return a})};var Ri=Ri||{};Ri.ah=function(){var a=0,b=0;self.innerHeight?(a=self.innerWidth,b=self.innerHeight):document.documentElement&&document.documentElement.clientHeight?(a=document.documentElement.clientWidth,b=document.documentElement.clientHeight):document.body&&(a=document.body.clientWidth,b=document.body.clientHeight);return{width:a,height:b}};Ri=Ri||{};
(function(){function a(a,c){window.getComputedStyle(a,"").getPropertyValue(c).match(/^([0-9]+)/);return parseInt(RegExp.$1,10)}Ri.xf=function(){var b=Ri.ah().height,c=document.body,d=document.documentElement;if("CSS1Compat"===document.compatMode&&d.scrollHeight)return d.scrollHeight!==b?d.scrollHeight:d.offsetHeight;if(0<=navigator.userAgent.indexOf("AppleWebKit")){b=0;for(c=[document.body];0<c.length;){var e=c.shift(),d=e.childNodes;if("undefined"!==typeof e.style){var f=e.style.overflowY;f||(f=
(f=document.defaultView.getComputedStyle(e,null))?f.overflowY:null);if("visible"!=f&&"inherit"!=f&&(f=e.style.height,f||(f=(f=document.defaultView.getComputedStyle(e,null))?f.height:""),0<f.length&&"auto"!=f))continue}for(e=0;e<d.length;e++){f=d[e];if("undefined"!==typeof f.offsetTop&&"undefined"!==typeof f.offsetHeight)var g=f.offsetTop+f.offsetHeight+a(f,"margin-bottom"),b=Math.max(b,g);c.push(f)}}return b+a(document.body,"border-bottom")+a(document.body,"margin-bottom")+a(document.body,"padding-bottom")}if(c&&
d)return e=d.scrollHeight,f=d.offsetHeight,d.clientHeight!==f&&(e=c.scrollHeight,f=c.offsetHeight),e>b?e>f?e:f:e<f?e:f}})();var Si,Ti,Ui,Vi;var Wi=/^https?:\/\/(?:\w|[\-\.])+\.google\.(?:\w|[\-:\.])+(?:\/[^\?\#]*)?\/u\/(\d)\//,Xi=/^https?:\/\/(?:\w|[\-\.])+\.google\.(?:\w|[\-:\.])+(?:\/[^\?\#]*)?\/b\/(\d{10,})\//,Yi=function(a){var b=ph("googleapis.config/sessionIndex");null==b&&(b=window.__X_GOOG_AUTHUSER);if(null==b){var c=window.google;c&&(b=c.authuser)}null==b&&(a=a||window.location.href,b=$g(a,"authuser")||null,null==b&&(b=(b=a.match(Wi))?b[1]:null));return null==b?null:String(b)},Zi=function(a){var b=ph("googleapis.config/sessionDelegate");
null==b&&(b=(a=(a||window.location.href).match(Xi))?a[1]:null);return null==b?null:String(b)};var $i=function(){this.hb=-1};var aj=function(){this.hb=-1;this.hb=64;this.U=[];this.pe=[];this.Ag=[];this.Od=[];this.Od[0]=128;for(var a=1;a<this.hb;++a)this.Od[a]=0;this.de=this.vc=0;this.reset()};t(aj,$i);aj.prototype.reset=function(){this.U[0]=1732584193;this.U[1]=4023233417;this.U[2]=2562383102;this.U[3]=271733878;this.U[4]=3285377520;this.de=this.vc=0};
var bj=function(a,b,c){c||(c=0);var d=a.Ag;if(n(b))for(var e=0;16>e;e++)d[e]=b.charCodeAt(c)<<24|b.charCodeAt(c+1)<<16|b.charCodeAt(c+2)<<8|b.charCodeAt(c+3),c+=4;else for(e=0;16>e;e++)d[e]=b[c]<<24|b[c+1]<<16|b[c+2]<<8|b[c+3],c+=4;for(e=16;80>e;e++){var f=d[e-3]^d[e-8]^d[e-14]^d[e-16];d[e]=(f<<1|f>>>31)&4294967295}b=a.U[0];c=a.U[1];for(var g=a.U[2],k=a.U[3],l=a.U[4],q,e=0;80>e;e++)40>e?20>e?(f=k^c&(g^k),q=1518500249):(f=c^g^k,q=1859775393):60>e?(f=c&g|k&(c|g),q=2400959708):(f=c^g^k,q=3395469782),
f=(b<<5|b>>>27)+f+l+q+d[e]&4294967295,l=k,k=g,g=(c<<30|c>>>2)&4294967295,c=b,b=f;a.U[0]=a.U[0]+b&4294967295;a.U[1]=a.U[1]+c&4294967295;a.U[2]=a.U[2]+g&4294967295;a.U[3]=a.U[3]+k&4294967295;a.U[4]=a.U[4]+l&4294967295};
aj.prototype.update=function(a,b){if(null!=a){ba(b)||(b=a.length);for(var c=b-this.hb,d=0,e=this.pe,f=this.vc;d<b;){if(0==f)for(;d<=c;)bj(this,a,d),d+=this.hb;if(n(a))for(;d<b;){if(e[f]=a.charCodeAt(d),++f,++d,f==this.hb){bj(this,e);f=0;break}}else for(;d<b;)if(e[f]=a[d],++f,++d,f==this.hb){bj(this,e);f=0;break}}this.vc=f;this.de+=b}};
aj.prototype.digest=function(){var a=[],b=8*this.de;56>this.vc?this.update(this.Od,56-this.vc):this.update(this.Od,this.hb-(this.vc-56));for(var c=this.hb-1;56<=c;c--)this.pe[c]=b&255,b/=256;bj(this,this.pe);for(c=b=0;5>c;c++)for(var d=24;0<=d;d-=8)a[b]=this.U[c]>>d&255,++b;return a};var cj=function(){this.Ye=new aj};cj.prototype.reset=function(){this.Ye.reset()};var dj=O.crypto,ej=!1,fj=0,gj=0,hj=1,ij=0,jj="",kj=function(a){a=a||O.event;var b=a.screenX+a.clientX<<16,b=b+(a.screenY+a.clientY),b=(new Date).getTime()%1E6*b;hj=hj*b%ij;0<fj&&++gj==fj&&fh(O,"mousemove",kj,"remove","de")},lj=function(a){var b=new cj;a=unescape(encodeURIComponent(a));for(var c=[],d=0,e=a.length;d<e;++d)c.push(a.charCodeAt(d));b.Ye.update(c);b=b.Ye.digest();a="";for(c=0;c<b.length;c++)a+="0123456789ABCDEF".charAt(Math.floor(b[c]/16))+"0123456789ABCDEF".charAt(b[c]%16);return a},ej=
!!dj&&"function"==typeof dj.getRandomValues;ej||(ij=1E6*(screen.width*screen.width+screen.height),jj=lj(Lg.cookie+"|"+Lg.location+"|"+(new Date).getTime()+"|"+Math.random()),fj=ph("random/maxObserveMousemove")||0,0!=fj&&fh(O,"mousemove",kj,"add","at"));var mj=function(){var a=hj,a=a+parseInt(jj.substr(0,20),16);jj=lj(jj);return a/(ij+Math.pow(16,20))},nj=function(){var a=new O.Uint32Array(1);dj.getRandomValues(a);return Number("0."+a[0])};var oj=function(){var a=hh.onl;if(!a){a=R();hh.onl=a;var b=R();a.e=function(a){var d=b[a];d&&(delete b[a],d())};a.a=function(a,d){b[a]=d};a.r=function(a){delete b[a]}}return a},pj=function(a,b){var c=b.onload;return"function"===typeof c?(oj().a(a,c),c):null},qj=function(a){P(/^\w+$/.test(a),"Unsupported id - "+a);oj();return'onload="window.___jsl.onl.e(&#34;'+a+'&#34;)"'},rj=function(a){oj().r(a)};var sj={allowtransparency:"true",frameborder:"0",hspace:"0",marginheight:"0",marginwidth:"0",scrolling:"no",style:"",tabindex:"0",vspace:"0",width:"100%"},tj={allowtransparency:!0,onload:!0},uj=0,vj=function(a,b){return a?b+"/"+a:""},wj=function(a){P(!a||eh.test(a),"Illegal url for new iframe - "+a)},xj=function(a,b,c,d,e){wj(c.src);var f,g=pj(d,c),k=g?qj(d):"";try{document.all&&(f=a.createElement('<iframe frameborder="'+Xg(String(c.frameborder))+'" scrolling="'+Xg(String(c.scrolling))+'" '+k+' name="'+
Xg(String(c.name))+'"/>'))}catch(q){}finally{f||(f=a.createElement("iframe"),g&&(f.onload=function(){f.onload=null;g.call(this)},rj(d)))}for(var l in c)a=c[l],"style"===l&&"object"===typeof a?Yg(a,f.style):tj[l]||f.setAttribute(l,String(a));(l=e&&e.beforeNode||null)||e&&e.dontclear||gh(b);b.insertBefore(f,l);f=l?l.previousSibling:b.lastChild;c.allowtransparency&&(f.allowTransparency=!0);return f};var yj=/^:[\w]+$/,zj=/:([a-zA-Z_]+):/g,Aj=function(a,b){var c=Yi()||"0",d=Zi(),e;e=Yi(void 0)||c;var f=Zi(void 0),g="";e&&(g+="u/"+e+"/");f&&(g+="b/"+f+"/");e=g||null;(g=(f=!1===ph("isLoggedIn"))?"_/im/":"")&&(e="");var k=ph("iframes/:socialhost:"),l=ph("iframes/:im_socialhost:");Si={socialhost:k,ctx_socialhost:f?l:k,session_index:c,session_delegate:d,session_prefix:e,im_prefix:g};return Si[b]||""},Bj=function(a){var b=a;yj.test(a)&&(b=ph("iframes/"+b.substring(1)+"/url"),P(!!b,"Unknown iframe url config for - "+
a));a=b.replace(zj,Aj);b="";2E3<a.length&&(b=a.substring(2E3),a=a.substring(0,2E3));var c=Lg.createElement("div"),d=Lg.createElement("a");d.href=a;c.appendChild(d);c.innerHTML=c.innerHTML;a=String(c.firstChild.href);c.parentNode&&c.parentNode.removeChild(c);return a+b},Cj=function(a,b,c){var d=c||{};c=d.attributes||{};P(!d.allowPost||!c.onload,"onload is not supported by post iframe");a=Bj(a);c=b.ownerDocument||Lg;var e,f=0;do e=d.id||["I",uj++,"_",(new Date).getTime()].join("");while(c.getElementById(e)&&
5>++f);P(5>f,"Error creating iframe id");var g=a;a={};f={};c.documentMode&&9>c.documentMode&&(a.hostiemode=c.documentMode);Yg(d.queryParams||{},a);Yg(d.fragmentParams||{},f);var k=d.connectWithQueryParams?a:f,l=d.pfname,q=R();q.id=e;q.parent=c.location.protocol+"//"+c.location.host;var S=$g(c.location.href,"parent"),l=l||"";!l&&S&&(l=vj($g(c.location.href,"id",""),$g(c.location.href,"pfname","")));q.pfname=l;Yg(q,k);(q=$g(g,"rpctoken")||a.rpctoken||f.rpctoken)||(q=k.rpctoken=d.rpctoken||String(Math.round(1E8*
(ej?nj():mj()))));d.rpctoken=q;q=c.location.href;k=R();(S=$g(q,"_bsh",hh.bsh))&&(k._bsh=S);(q=hh.dpo?hh.h:$g(q,"jsh",hh.h))&&(k.jsh=q);d.hintInFragment?Yg(k,f):Yg(k,a);k=d.paramsSerializer;g=bh(g);g.query.push.apply(g.query,dh(a,k));g.zd.push.apply(g.zd,dh(f,k));a=ch(g);g=R();Yg(sj,g);Yg(d.attributes,g);g.name=g.id=e;g.src=a;d.eurl=a;if((d||{}).allowPost&&2E3<a.length){f=bh(a);g.src="";g["data-postorigin"]=a;a=xj(c,b,g,e);var H;-1!=navigator.userAgent.indexOf("WebKit")&&(H=a.contentWindow.document,
H.open(),g=H.createElement("div"),k={},q=e+"_inner",k.name=q,k.src="",k.style="display:none",xj(c,g,k,q,d));g=(d=f.query[0])?d.split("&"):[];d=[];for(k=0;k<g.length;k++)q=g[k].split("=",2),d.push([decodeURIComponent(q[0]),decodeURIComponent(q[1])]);f.query=[];g=ch(f);P(eh.test(g),"Invalid URL: "+g);f=c.createElement("form");f.action=g;f.method="POST";f.target=e;f.style.display="none";for(e=0;e<d.length;e++)g=c.createElement("input"),g.type="hidden",g.name=d[e][0],g.value=d[e][1],f.appendChild(g);
b.appendChild(f);f.submit();f.parentNode.removeChild(f);H&&H.close();b=a}else b=xj(c,b,g,e,d);return b};var U=function(a){this.b=a||{}};t(U,th);var Dj=function(a,b){a.b.frameName=b;return a};U.prototype.ha=function(){return this.b.frameName};var Ej=function(a,b){a.b.rpcAddr=b;return a};U.prototype.sc=function(){return this.b.rpcAddr};var Fj=function(a,b){a.b.retAddr=b;return a},Gj=function(a){return a.b.retAddr},Hj=function(a,b){a.b.origin=b;return a};U.prototype.Na=function(){return this.b.origin};U.prototype.vb=function(a){this.b.setRpcReady=a;return this};U.prototype.Tc=function(){return this.b.setRpcReady};
var Ij=function(a,b){a.b.context=b},Jj=function(a,b){a.b._rpcReadyFn=b};U.prototype.Eb=function(){return this.b.iframeEl};var Kj=/^[\w\.\-]*$/,Lj=function(a){return a.Wa===a.getContext().Wa},Mj=function(){return!0},Oj=function(a,b,c){return function(d){if(!b.wa()){P(this.origin===b.Wa,"Wrong origin "+this.origin+" != "+b.Wa);var e=this.callback;d=Nj(a,d,b);!c&&0<d.length&&Ed(d).then(e)}}},Nj=function(a,b,c){a=Ti[a];if(!a)return[];for(var d=[],e=0;e<a.length;e++)d.push(D(a[e].call(c,b,c)));return d},Pj=function(a,b,c){P("_default"!=a,"Cannot update default api");Ui[a]={map:b,filter:c}},Qj=function(a,b){Ng(Ui,"_default",
{map:{},filter:Mj}).map[a]=b;Rg(Vi.ra,function(c){c.register(a,b,Mj)})},V=function(a){a=a||{};this.La=!1;this.Vf=R();this.ra=R();this.Ba=a._window||O;this.Lb=this.Ba.location.href;this.Wf=(this.Xf=$g(this.Lb,"parent",""))?$g(this.Lb,"pfname",""):"";this.mb=this.Xf?$g(this.Lb,"id",""):"";this.Ea=vj(this.mb,this.Wf);this.Wa=ci(this.Lb);if(this.mb){var b=new U;Ej(b,a._parentRpcAddr||"..");Fj(b,a._parentRetAddr||this.mb);Hj(b,ci($g(this.Lb,"parent",this.Lb)));Dj(b,this.Wf);this.T=Rj(this,b.value())}else this.T=
null};h=V.prototype;h.wa=function(){return this.La};h.Sa=function(){if(!this.wa()){for(var a=0;a<this.ra.length;a++)this.ra[a].Sa();this.La=!0}};h.ha=function(){return this.Ea};h.Rb=function(){return this.Ba};h.Ve=function(a,b){this.Vf[a]=b};h.xe=function(a){return this.Vf[a]};
var Rj=function(a,b){P(!a.wa(),"Cannot attach iframe in disposed context");var c=new U(b);c.sc()||Ej(c,c.qc());Gj(c)||Fj(c,"..");c.Na()||Hj(c,ci(c.getUrl()));c.ha()||Dj(c,vj(c.qc(),a.Ea));var d=c.ha();if(a.ra[d])return a.ra[d];var e=c.sc(),f=e;c.Na()&&(f=e+"|"+c.Na());var g=Gj(c),k=c.tc();k||(k=(k=c.Eb())&&(k.getAttribute("data-postorigin")||k.src)||c.getUrl(),k=$g(k,"rpctoken"));Jj(c,Oi(f,g,k,c.b._popupWindow));f=((window.gadgets||{}).rpc||{}).setAuthToken;k&&f&&f(e,k);var l=new W(a,e,d,c),q=c.b.messageHandlersFilter;
Rg(c.b.messageHandlers,function(a,b){l.register(b,a,q)});c.Tc()&&l.vb();X(l,"_g_rpcReady");return l};V.prototype.Se=function(a){Dj(a,null);var b=a.qc();!b||Kj.test(b)&&!this.Rb().document.getElementById(b)||(di&&di.log&&di.log("Ignoring requested iframe ID - "+b),a.b.id=null)};
V.prototype.Rf=function(a){P(!this.wa(),"Cannot open iframe in disposed context");var b=new U(a);Sj(this,b);var c=b.ha();if(c&&this.ra[c])return this.ra[c];this.Se(b);c=b.getUrl();P(c,"No url for new iframe");var d=b.b.queryParams||{};d.usegapi="1";b.b.queryParams=d;d=this.kh&&this.kh(c,b);d||(d=b.b.where,P(!!d,"No location for new iframe"),c=Cj(c,d,a),b.b.iframeEl=c,d=c.getAttribute("id"));Ej(b,d).b.id=d;Hj(b,ci(b.b.eurl||""));this.yh&&this.yh(b,b.Eb());c=Rj(this,a);c.kg&&c.kg(c,a);(a=b.b.onCreate)&&
a(c);b.b.disableRelayOpen||c.Mc("_open");return c};
var Tj=function(a,b,c){var d=b.b.canvasUrl;if(!d)return c;P(!b.b.allowPost,"Post is not supported when using canvas url");var e=b.getUrl();P(e&&ci(e)===a.Wa&&ci(d)===a.Wa,"Wrong origin for canvas or hidden url "+d);b.setUrl(d);b.b.waitForOnload=!0;b.b.canvasUrl=null;return function(a){var b=a.Rb(),d=b.location.hash,d=Bj(e)+(/#/.test(e)?d.replace(/^#/,"&"):d);b.location.replace(d);c&&c(a)}},Vj=function(a,b,c){var d=b.b.relayOpen;if(d){var e=a.Sc();d instanceof W?(e=d,b.b.relayOpen=0):0<Number(d)&&
(b.b.relayOpen=Number(d)-1);if(e){P(!!e.Sf,"Relaying iframe open is disabled");if(d=b.Cd())if(d=Uj[d])Ij(b,a),d(b.value()),Ij(b,null);b.b.openerIframe=null;c.resolve(e.Sf(b));return!0}}return!1},Zj=function(a,b,c){var d=b.Cd();if(d)if(P(!!Wj,"Defer style is disabled, when requesting style "+d),Xj[d])Sj(a,b);else return Yj(d,function(){P(!!Xj[d],"Fail to load style - "+d);c.resolve(a.open(b.value()))}),!0;return!1};
V.prototype.open=function(a,b){P(!this.wa(),"Cannot open iframe in disposed context");var c=new U(a),d=Tj(this,c,b),e=new Qi(d);(d=c.getUrl())&&c.setUrl(Bj(d));if(Vj(this,c,e)||Zj(this,c,e)||Vj(this,c,e))return e.promise;var f;if(null!=yh(c)){var g=setTimeout(function(){f.Eb().src="about:blank";e.reject({timeout:"Exceeded time limit of :"+yh(c)+"milliseconds"})},yh(c)),k=e.resolve;e.resolve=function(a){clearTimeout(g);k(a)}}c.b.waitForOnload&&sh(xh(c),function(){e.resolve(f)});f=this.Rf(a);c.b.waitForOnload||
e.resolve(f);return e.promise};V.prototype.Sc=function(){return this.T};var W=function(a,b,c,d){this.La=!1;this.Ca=a;this.Fc=b;this.Ea=c;this.va=d;this.Vd=Gj(this.va);this.Wa=this.va.Na();this.nh=this.va.Eb();this.mg=this.va.b.where;this.Bc=[];this.Mc("_default");a=this.va.Pc()||[];for(b=0;b<a.length;b++)this.Mc(a[b]);this.Ca.ra[c]=this};h=W.prototype;h.wa=function(){return this.La};
h.Sa=function(){if(!this.wa()){for(var a=0;a<this.Bc.length;a++)this.unregister(this.Bc[a]);delete Vi.ra[this.ha()];this.La=!0}};h.getContext=function(){return this.Ca};h.sc=function(){return this.Fc};h.ha=function(){return this.Ea};h.Eb=function(){return this.nh};h.$g=function(){return this.mg};h.ai=function(a){this.mg=a};h.vb=function(){(0,this.va.b._rpcReadyFn)()};h.Zh=function(a,b){this.va.value()[a]=b};h.Yg=function(a){return this.va.value()[a]};h.qc=function(){return this.va.qc()};h.Na=function(){return this.Wa};
h.register=function(a,b,c){P(!this.wa(),"Cannot register handler on disposed iframe "+a);P((c||Lj)(this),"Rejecting untrusted message "+a);c=this.Ea+":"+this.Ca.Ea+":"+a;1==Ng(Ti,c,[]).push(b)&&(this.Bc.push(a),Ci(c,Oj(c,this,"_g_wasClosed"===a)))};h.unregister=function(a,b){var c=this.Ea+":"+this.Ca.Ea+":"+a,d=Ti[c];if(d){if(b){var e=Pg.call(d,b);0<=e&&d.splice(e,1)}else d.splice(0,d.length);0==d.length&&(e=Pg.call(this.Bc,a),0<=e&&this.Bc.splice(e,1),delete li[Ai(c).name])}};h.Zg=function(){return this.Bc};
h.Mc=function(a){this.ke=this.ke||[];if(!(0<=Pg.call(this.ke,a))){this.ke.push(a);a=Ui[a]||{map:{}};for(var b in a.map)Q(a.map,b)&&this.register(b,a.map[b],a.filter)}};h.send=function(a,b,c,d){P(!this.wa(),"Cannot send message to disposed iframe - "+a);P((d||Lj)(this),"Wrong target for message "+a);c=new Qi(c);Fi(this.Fc,this.Ca.Ea+":"+this.Ea+":"+a,c.resolve,b);return c.promise};var X=function(a,b,c,d){return a.send(b,c,d,Mj)};W.prototype.Gh=function(a){return a};
W.prototype.ping=function(a,b){return X(this,"_g_ping",b,a)};Ti=R();Ui=R();Vi=new V;Qj("_g_rpcReady",W.prototype.vb);Qj("_g_discover",W.prototype.Zg);Qj("_g_ping",W.prototype.Gh);var Xj=R(),Uj=R(),Wj=function(a){return Xj[a]},Yj=function(a,b){Zg.load("gapi.iframes.style."+a,b)},Sj=function(a,b){var c=b.Cd();if(c){b.Xe(null);var d=Xj[c];P(d,"No such style: "+c);Ij(b,a);d(b.value());Ij(b,null)}};var ak={height:!0,width:!0},bk=/^(?!-*(?:expression|(?:moz-)?binding))(?:[.#]?-?(?:[_a-z0-9-]+)(?:-[_a-z0-9-]+)*-?|-?(?:[0-9]+(?:\.[0-9]*)?|\.[0-9]+)(?:[a-z]{1,2}|%)?|!important|)$/i,ck=function(a){"number"===typeof a&&(a=String(a)+"px");return a};W.prototype.Rb=function(){if(!Lj(this))return null;var a=this.va.b._popupWindow;if(a)return a;for(var b=this.Fc.split("/"),a=this.getContext().Rb(),c=0;c<b.length&&a;c++)var d=b[c],a=".."===d?a==a.parent?a.opener:a.parent:a.frames[d];return a};
var dk=function(a,b){var c=a.Sc(),d=!0;b.filter&&(d=b.filter.call(b.Fd,b.params));return D(d).then(function(d){return d&&c?(b.Uf&&b.Uf.call(a,b.params),d=b.sender?b.sender(b.params):X(c,b.message,b.params),b.ii?d.then(function(){return!0}):!0):!1})};
V.prototype.qf=function(a,b,c){a=dk(this,{sender:function(a){var b=Vi.Sc();Rg(Vi.ra,function(c){c!==b&&X(c,"_g_wasClosed",a)});return X(b,"_g_closeMe",a)},message:"_g_closeMe",params:a,Fd:c,filter:this.xe("onCloseSelfFilter")});b=new Qi(b);b.resolve(a);return b.promise};V.prototype.eg=function(a,b,c){a=a||{};b=new Qi(b);b.resolve(dk(this,{message:"_g_restyleMe",params:a,Fd:c,filter:this.xe("onRestyleSelfFilter"),ii:!0,Uf:this.hi}));return b.promise};
V.prototype.hi=function(a){"auto"===a.height&&(a.height=Ri.xf())};var ek=function(a){var b={};if(a)for(var c in a)Q(a,c)&&Q(ak,c)&&bk.test(a[c])&&(b[c]=a[c]);return b};h=W.prototype;h.close=function(a,b){return X(this,"_g_close",a,b)};h.dg=function(a,b){return X(this,"_g_restyle",a,b)};h.Mh=function(a,b){return X(this,"_g_restyleDone",a,b)};h.Fg=function(a){return this.getContext().qf(a,void 0,this)};h.Oh=function(a){if(a&&"object"===typeof a)return this.getContext().eg(a,void 0,this)};
h.Ph=function(a){var b=this.va.b.onRestyle;b&&b.call(this,a,this);a=a&&"object"===typeof a?ek(a):{};(b=this.Eb())&&a&&"object"===typeof a&&(Q(a,"height")&&(a.height=ck(a.height)),Q(a,"width")&&(a.width=ck(a.width)),Yg(a,b.style))};
h.Gg=function(a){var b=this.va.b.onClose;b&&b.call(this,a,this);this.Eg&&this.Eg()||(b=this.Eb())&&b.parentNode&&b.parentNode.removeChild(b);if(b=this.va.b.controller){var c={};c.frameName=this.ha();X(b,"_g_disposeControl",c)}Nj(this.Ea+":"+this.Ca.Ea+":_g_wasClosed",a,this)};V.prototype.Yh=function(a){this.Ve("onCloseSelfFilter",a)};V.prototype.$h=function(a){this.Ve("onRestyleSelfFilter",a)};W.prototype.Jh=function(a,b){this.register("_g_wasRestyled",a,b)};
W.prototype.Ih=function(a,b){this.register("_g_wasClosed",a,b)};W.prototype.ji=function(){delete this.getContext().ra[this.ha()];this.getContext().Rb().setTimeout(r(function(){this.Sa()},this),0)};Qj("_g_close",W.prototype.Fg);Qj("_g_closeMe",W.prototype.Gg);Qj("_g_restyle",W.prototype.Oh);Qj("_g_restyleMe",W.prototype.Ph);Qj("_g_wasClosed",W.prototype.ji);var fk=/^https?:\/\/[^\/%\\?#\s]+$/i,gk={longdesc:!0,name:!0,src:!0,frameborder:!0,marginwidth:!0,marginheight:!0,scrolling:!0,align:!0,height:!0,width:!0,id:!0,"class":!0,title:!0,tabindex:!0,hspace:!0,vspace:!0,allowtransparency:!0},hk=function(a,b,c){var d=a.Fc,e=b.Vd;Fj(Ej(c,a.Vd+"/"+b.Fc),e+"/"+d);Hj(Dj(c,b.ha()),b.Wa)};
V.prototype.Ig=function(a,b){var c=new T(a),d=new T(b),e=c.Tc(),f=c.getIframe(),g=d.getIframe();if(g){var k=c.tc(),l=new U;hk(f,g,l);Ah(zh((new T(l.value())).Zb(k),c.b.role),c.b.data).vb(e);var q=new U;hk(g,f,q);Ah(zh((new T(q.value())).Zb(k),d.b.role),d.b.data).vb(!0);X(f,"_g_connect",l.value(),function(){e||X(g,"_g_connect",q.value())});e&&X(g,"_g_connect",q.value())}else d={},Ah(zh(Bh(new T(d)),c.b.role),c.b.data),X(f,"_g_connect",d)};h=W.prototype;
h.Hg=function(a){var b,c=new U(a);a=new T(c.value());a.b.selfConnect?b=this:(P(fk.test(c.Na()),"Illegal origin for connected iframe - "+c.Na()),b=this.Ca.ra[c.ha()],b)?c.Tc()&&(b.vb(),X(b,"_g_rpcReady")):(c=Dj(Hj(Fj(Ej((new U).Zb(c.tc()),c.sc()),Gj(c)),c.Na()),c.ha()).vb(c.Tc()),b=Rj(this.Ca,c.value()));var c=this.Ca,d=a.b.role;a=a.b.data;ik(c);d=d||"";Ng(c.re,d,[]).push({Fd:b.ha(),data:a});jk(b,a,c.He[d])};
h.kg=function(a,b){if(!(new U(b)).b._relayedDepth){var c={};Bh(zh(new T(c),"_opener"));X(a,"_g_connect",c)}};h.Sf=function(a){var b=this,c=a.b.messageHandlers,d=a.b.messageHandlersFilter,e=a.b.onClose;wh(vh(uh(a,null),null),null);Gd();return X(this,"_g_open",a.value()).then(function(f){var g=new U(f[0]),k=g.ha();f=new U;var l=b.Vd,q=Gj(g);Fj(Ej(f,b.Fc+"/"+g.sc()),q+"/"+l);Dj(f,k);Hj(f,g.Na());f.md(g.Pc());f.Zb(a.tc());uh(f,c);vh(f,d);wh(f,e);(g=b.Ca.ra[k])||(g=Rj(b.Ca,f.value()));return g})};
h.Se=function(a){var b=a.getUrl();P(!b||eh.test(b),"Illegal url for new iframe - "+b);var c=xh(a).value(),b={},d;for(d in c)Q(c,d)&&Q(gk,d)&&(b[d]=c[d]);Q(c,"style")&&(d=c.style,"object"===typeof d&&(b.style=ek(d)));a.value().attributes=b};
h.Eh=function(a){a=new U(a);this.Se(a);var b=a.b._relayedDepth||0;a.b._relayedDepth=b+1;a.b.openerIframe=this;Gd();var c=a.tc();a.Zb(null);return this.Ca.open(a.value()).then(r(function(a){var e=(new U(a.va.value())).Pc(),f=new U;hk(a,this,f);0==b&&zh(new T(f.value()),"_opener");f.vb(!0);f.Zb(c);X(a,"_g_connect",f.value());f=new U;Hj(Dj(Fj(Ej(f.md(e),a.sc()),a.Vd),a.ha()),a.Na());return f.value()},this))};var ik=function(a){a.re||(a.re=R(),a.He=R())};
V.prototype.ff=function(a,b,c,d){ik(this);"object"===typeof a?(b=new Ch(a),c=b.b.role||""):(b=Fh(Eh(Dh(a),b).md(c),d),c=a);d=this.re[c]||[];a=!1;for(var e=0;e<d.length&&!a;e++)jk(this.ra[d[e].Fd],d[e].data,[b]),a=b.b.runOnce;c=Ng(this.He,c,[]);a||b.b.dontWait||c.push(b)};V.prototype.Kh=function(a,b){var c=Ng(this.He,a,[]);if(b)for(var d=0,e=!1;!e&&d<c.length;d++)c[d].Vc===b&&(e=!0,c.splice(d,1));else c.splice(0,c.length)};
var jk=function(a,b,c){c=c||[];for(var d=0;d<c.length;d++){var e=c[d];if(e&&a){var f=e.b.filter||Lj;if(a&&f(a)){for(var f=e.Pc()||[],g=0;g<f.length;g++)a.Mc(f[g]);e.b.handler&&(0,e.b.handler)(a,b);e.b.runOnce&&(c.splice(d,1),--d)}}}};V.prototype.hf=function(a,b,c){this.ff(Gh(Fh(Eh(Dh("_opener"),a).md(b),c)).value())};W.prototype.Nh=function(a){this.getContext().hf(function(b){b.send("_g_wasRestyled",a,void 0,Mj)},null,Mj)};var kk=Vi.Sc();kk&&kk.register("_g_restyleDone",W.prototype.Nh,Mj);
Qj("_g_connect",W.prototype.Hg);var lk={};lk._g_open=W.prototype.Eh;Pj("_open",lk,Mj);N("gapi.iframes.create",Cj);N("gapi.iframes.registerStyle",function(a,b){Xj[a]=b});N("gapi.iframes.registerBeforeOpenStyle",function(a,b){Uj[a]=b});N("gapi.iframes.getStyle",Wj);N("gapi.iframes.getBeforeOpenStyle",function(a){return Uj[a]});N("gapi.iframes.registerIframesApi",Pj);N("gapi.iframes.registerIframesApiHandler",function(a,b,c){P("_default"!=a,"Cannot update default api");Ng(Ui,a,{map:{},filter:Lj}).map[b]=c});N("gapi.iframes.getContext",function(){return Vi});N("gapi.iframes.SAME_ORIGIN_IFRAMES_FILTER",Lj);
N("gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER",Mj);N("gapi.iframes.makeWhiteListIframesFilter",function(a){for(var b=R(),c=0;c<a.length;c++)b[a[c]]=!0;return function(a){return!!b[a.Wa]}});N("gapi.iframes.Context",V);N("gapi.iframes.Context.prototype.isDisposed",V.prototype.wa);N("gapi.iframes.Context.prototype.getWindow",V.prototype.Rb);N("gapi.iframes.Context.prototype.getFrameName",V.prototype.ha);N("gapi.iframes.Context.prototype.getGlobalParam",V.prototype.xe);
N("gapi.iframes.Context.prototype.setGlobalParam",V.prototype.Ve);N("gapi.iframes.Context.prototype.open",V.prototype.open);N("gapi.iframes.Context.prototype.openChild",V.prototype.Rf);N("gapi.iframes.Context.prototype.getParentIframe",V.prototype.Sc);N("gapi.iframes.Context.prototype.closeSelf",V.prototype.qf);N("gapi.iframes.Context.prototype.restyleSelf",V.prototype.eg);N("gapi.iframes.Context.prototype.setCloseSelfFilter",V.prototype.Yh);
N("gapi.iframes.Context.prototype.setRestyleSelfFilter",V.prototype.$h);N("gapi.iframes.Iframe",W);N("gapi.iframes.Iframe.prototype.isDisposed",W.prototype.wa);N("gapi.iframes.Iframe.prototype.getContext",W.prototype.getContext);N("gapi.iframes.Iframe.prototype.getFrameName",W.prototype.ha);N("gapi.iframes.Iframe.prototype.getId",W.prototype.qc);N("gapi.iframes.Iframe.prototype.register",W.prototype.register);N("gapi.iframes.Iframe.prototype.unregister",W.prototype.unregister);
N("gapi.iframes.Iframe.prototype.send",W.prototype.send);N("gapi.iframes.Iframe.prototype.applyIframesApi",W.prototype.Mc);N("gapi.iframes.Iframe.prototype.getIframeEl",W.prototype.Eb);N("gapi.iframes.Iframe.prototype.getSiteEl",W.prototype.$g);N("gapi.iframes.Iframe.prototype.setSiteEl",W.prototype.ai);N("gapi.iframes.Iframe.prototype.getWindow",W.prototype.Rb);N("gapi.iframes.Iframe.prototype.getOrigin",W.prototype.Na);N("gapi.iframes.Iframe.prototype.close",W.prototype.close);
N("gapi.iframes.Iframe.prototype.restyle",W.prototype.dg);N("gapi.iframes.Iframe.prototype.restyleDone",W.prototype.Mh);N("gapi.iframes.Iframe.prototype.registerWasRestyled",W.prototype.Jh);N("gapi.iframes.Iframe.prototype.registerWasClosed",W.prototype.Ih);N("gapi.iframes.Iframe.prototype.getParam",W.prototype.Yg);N("gapi.iframes.Iframe.prototype.setParam",W.prototype.Zh);N("gapi.iframes.Iframe.prototype.ping",W.prototype.ping);N("gapi.iframes.Context.prototype.addOnConnectHandler",V.prototype.ff);N("gapi.iframes.Context.prototype.removeOnConnectHandler",V.prototype.Kh);N("gapi.iframes.Context.prototype.addOnOpenerHandler",V.prototype.hf);N("gapi.iframes.Context.prototype.connectIframes",V.prototype.Ig);var mk=function(a){this.Lb=a;this.Ce=null;this.Ch=this.Nd()},nk=function(a){var b=new th;b.b.where=document.body;b.setUrl(a.Lb);vh(b,Mj);xh(b).Xe({position:"absolute",top:"-100px",width:"1px",height:"1px"});b.b.dontclear=!0;return b};mk.prototype.Nd=function(){var a=this;return new C(function(b){Vi.open(nk(a).value(),function(c){a.Ce=c;a.Ce.dg({setHideOnLeave:!1});b()})})};var ok=function(a,b){a.Ch.then(function(){a.Ce.register("authEvent",b,Mj)})};var qk=function(a,b,c,d){this.Bb=a;this.ma=b;this.ab=c;d=this.Nb=d||null;a=tf(a,"/__/auth/iframe");sf(a,"apiKey",b);sf(a,"appName",c);d&&sf(a,"v",d);this.oh=a.toString();this.ph=new mk(this.oh);this.le=[];pk(this)},rk=function(a,b,c,d,e,f,g,k,l){a=tf(a,"/__/auth/handler");sf(a,"apiKey",b);sf(a,"appName",c);sf(a,"authType",d);sf(a,"providerId",e);f&&f.length&&sf(a,"scopes",f.join(","));g&&sf(a,"redirectUrl",g);k&&sf(a,"eventId",k);l&&sf(a,"v",l);return a.toString()},pk=function(a){ok(a.ph,function(b){var c=
{};if(b&&b.authEvent){var d=!1;b=b.authEvent||{};if(b.type){if(c=b.error)var e=(c=b.error)&&(c.name||c.code),c=e?new K(e.substring(5),c.message):null;b=new bg(b.type,b.eventId,b.urlResponse,b.sessionId,c)}else b=null;for(c=0;c<a.le.length;c++)d=a.le[c](b)||d;c={};c.status=d?"ACK":"ERROR";return D(c)}c.status="ERROR";return D(c)})};qk.prototype.ef=function(a){this.le.push(a)};var uk=function(a,b,c){var d=null,e=null;ha(a)?(d=a,e={name:sk(d)}):(e=a,d=tk(a.name));this.code=d;this.ta=e;a="Error "+b+": "+this.getName();c&&(a+=", "+c);u.call(this,a)};t(uk,u);uk.prototype.getName=function(){return this.ta.name};
var vk={UNKNOWN_ERR:1,NON_TRANSIENT_ERR:2,NOT_FOUND_ERR:3,CONSTRAINT_ERR:4,DATA_ERR:5,NOT_ALLOWED_ERR:6,TRANSACTION_INACTIVE_ERR:7,ABORT_ERR:8,READ_ONLY_ERR:9,mi:10,TIMEOUT_ERR:11,QUOTA_ERR:12,INVALID_ACCESS_ERR:13,INVALID_STATE_ERR:14},wk=(m.IDBDatabaseException||m.webkitIDBDatabaseException||vk).UNKNOWN_ERR,xk=(m.IDBDatabaseException||m.webkitIDBDatabaseException||vk).NOT_FOUND_ERR,yk=(m.IDBDatabaseException||m.webkitIDBDatabaseException||vk).CONSTRAINT_ERR,zk=(m.IDBDatabaseException||m.webkitIDBDatabaseException||
vk).DATA_ERR,Ak=(m.IDBDatabaseException||m.webkitIDBDatabaseException||vk).TRANSACTION_INACTIVE_ERR,Bk=(m.IDBDatabaseException||m.webkitIDBDatabaseException||vk).ABORT_ERR,Ck=(m.IDBDatabaseException||m.webkitIDBDatabaseException||vk).READ_ONLY_ERR,Dk=(m.IDBDatabaseException||m.webkitIDBDatabaseException||vk).TIMEOUT_ERR,Ek=(m.IDBDatabaseException||m.webkitIDBDatabaseException||vk).QUOTA_ERR,Fk=(m.DOMException||vk).INVALID_ACCESS_ERR,Gk=(m.DOMException||vk).INVALID_STATE_ERR,tk=function(a){switch(a){case "UnknownError":return wk;
case "NotFoundError":return xk;case "ConstraintError":return yk;case "DataError":return zk;case "TransactionInactiveError":return Ak;case "AbortError":return Bk;case "ReadOnlyError":return Ck;case "TimeoutError":return Dk;case "QuotaExceededError":return Ek;case "InvalidAccessError":return Fk;case "InvalidStateError":return Gk;default:return wk}},sk=function(a){switch(a){case wk:return"UnknownError";case xk:return"NotFoundError";case yk:return"ConstraintError";case zk:return"DataError";case Ak:return"TransactionInactiveError";
case Bk:return"AbortError";case Ck:return"ReadOnlyError";case Dk:return"TimeoutError";case Ek:return"QuotaExceededError";case Fk:return"InvalidAccessError";case Gk:return"InvalidStateError";default:return"UnknownError"}},Hk=function(a,b){return"error"in a?new uk(a.error,b):"name"in a?new uk({name:sk(a.errorCode)},b):new uk({name:"UnknownError"},b)},Ik=function(a,b){if("name"in a){var c=b+": "+a.message;return new uk(a,c)}if("code"in a){var d=sk(a.code),c=b+": "+a.message;return new uk({name:d},c)}return new uk({name:"UnknownError"},
b)};var Jk=function(){G.call(this)};t(Jk,G);Jk.prototype.Ob=null;Jk.prototype.next=function(a){if(a)this.Ob["continue"](a);else this.Ob["continue"]()};Jk.prototype.update=function(a){var b="updating via cursor with value ",c=new E,d;try{d=this.Ob.update(a)}catch(e){return b+=Ae(a),F(c,Ik(e,b)),c}d.onsuccess=function(){c.Cb()};d.onerror=function(d){b+=Ae(a);F(c,Hk(d.target,b))};return c};
Jk.prototype.remove=function(){var a=new E,b;try{b=this.Ob["delete"]()}catch(c){return F(a,Ik(c,"deleting via cursor")),a}b.onsuccess=function(){a.Cb()};b.onerror=function(b){F(a,Hk(b.target,"deleting via cursor"))};return a};
var Kk=function(a,b,c){var d=new Jk,e;try{var f=b?b.pi():null;e=c?a.openCursor(f,c):a.openCursor(f)}catch(g){throw d.Sa(),Ik(g,a.name);}e.onsuccess=function(a){d.Ob=a.target.result||null;d.Ob?d.dispatchEvent("n"):d.dispatchEvent("c")};e.onerror=function(){d.dispatchEvent("e")};return d};var Lk=function(a){Qb.call(this);this.Be=a;this.u={}};t(Lk,Qb);var Mk=[];Lk.prototype.Va=function(a,b,c,d){fa(b)||(b&&(Mk[0]=b.toString()),b=Mk);for(var e=0;e<b.length;e++){var f=dc(a,b[e],c||this.handleEvent,d||!1,this.Be||this);if(!f)break;this.u[f.key]=f}return this};Lk.prototype.Id=function(a,b,c,d){return Nk(this,a,b,c,d)};var Nk=function(a,b,c,d,e,f){if(fa(c))for(var g=0;g<c.length;g++)Nk(a,b,c[g],d,e,f);else{b=kc(b,c,d||a.handleEvent,e,f||a.Be||a);if(!b)return a;a.u[b.key]=b}return a};
Lk.prototype.cf=function(a,b,c,d,e){if(fa(b))for(var f=0;f<b.length;f++)this.cf(a,b[f],c,d,e);else c=c||this.handleEvent,e=e||this.Be||this,c=ec(c),d=!!d,b=Ub(a)?a.Rc(b,c,d,e):a?(a=gc(a))?a.Rc(b,c,d,e):null:null,b&&(mc(b),delete this.u[b.key]);return this};Lk.prototype.removeAll=function(){Va(this.u,function(a,b){this.u.hasOwnProperty(b)&&mc(a)},this);this.u={}};Lk.prototype.Ka=function(){Lk.Hc.Ka.call(this);this.removeAll()};
Lk.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented");};var Ok=function(a){this.Gc=a};Ok.prototype.getName=function(){return this.Gc.name};var Pk=function(a,b,c,d,e){var f=new E,g;try{g=e?a.Gc[b](d,e):a.Gc[b](d)}catch(k){return c+=Ae(d),e&&(c+=", with key "+Ae(e)),F(f,Ik(k,c)),f}g.onsuccess=function(){f.Cb()};g.onerror=function(a){c+=Ae(d);e&&(c+=", with key "+Ae(e));F(f,Hk(a.target,c))};return f};h=Ok.prototype;h.put=function(a,b){return Pk(this,"put","putting into "+this.getName()+" with value",a,b)};
h.add=function(a,b){return Pk(this,"add","adding into "+this.getName()+" with value ",a,b)};h.remove=function(a){var b=new E,c;try{c=this.Gc["delete"](a)}catch(e){return c="removing from "+this.getName()+" with key "+Ae(a),F(b,Ik(e,c)),b}c.onsuccess=function(){b.Cb()};var d=this;c.onerror=function(c){var f="removing from "+d.getName()+" with key "+Ae(a);F(b,Hk(c.target,f))};return b};
h.get=function(a){var b=new E,c;try{c=this.Gc.get(a)}catch(e){return c="getting from "+this.getName()+" with key "+Ae(a),F(b,Ik(e,c)),b}c.onsuccess=function(a){b.Cb(a.target.result)};var d=this;c.onerror=function(c){var f="getting from "+d.getName()+" with key "+Ae(a);F(b,Hk(c.target,f))};return b};
h.getAll=function(a,b){var c=new E,d;try{d=this.openCursor(a,b)}catch(f){return F(c,f),c}var e=[];dc(d,"n",function(){e.push(d.Ob.value);d.next()});kc(d,["e","c"],function(a){d.Sa();"c"==a.type?c.Cb(e):F(c)});return c};h.openCursor=function(a,b){return Kk(this.Gc,a,b)};var Qk=function(a,b){G.call(this);this.rd=a;this.Ja=b;this.Ta=new Lk(this);this.Ta.Va(this.rd,"complete",r(this.dispatchEvent,this,"complete"));this.Ta.Va(this.rd,"abort",r(this.dispatchEvent,this,"abort"));this.Ta.Va(this.rd,"error",this.ue)};t(Qk,G);Qk.prototype.ue=function(a){a.target instanceof uk?this.dispatchEvent({type:"error",target:a.target}):this.dispatchEvent({type:"error",target:Hk(a.target,"in transaction")})};
Qk.prototype.objectStore=function(a){try{return new Ok(this.rd.objectStore(a))}catch(b){throw Ik(b,"getting object store "+a);}};Qk.prototype.abort=function(){this.rd.abort()};Qk.prototype.Ka=function(){Qk.Hc.Ka.call(this);this.Ta.Sa()};var Rk=function(a){G.call(this);this.Ja=a;this.Ta=new Lk(this);this.Ta.Va(this.Ja,"abort",r(this.dispatchEvent,this,"abort"));this.Ta.Va(this.Ja,"error",this.ue);this.Ta.Va(this.Ja,"versionchange",this.Pg);this.Ta.Va(this.Ja,"close",r(this.dispatchEvent,this,"close"))};t(Rk,G);h=Rk.prototype;h.Nd=!0;h.ue=function(a){this.dispatchEvent({type:"error",errorCode:a.target.errorCode})};h.Pg=function(a){this.dispatchEvent(new Sk(a.oldVersion,a.newVersion))};
h.close=function(){this.Nd&&(this.Ja.close(),this.Nd=!1)};h.getName=function(){return this.Ja.name};h.Af=function(){return this.Ja.version};h.createObjectStore=function(a,b){try{return new Ok(this.Ja.createObjectStore(a,b))}catch(c){throw Ik(c,"creating object store "+a);}};h.Ka=function(){Rk.Hc.Ka.call(this);this.Ta.Sa()};var Sk=function(a,b){Rb.call(this,"versionchange");this.oldVersion=a;this.newVersion=b};t(Sk,Rb);var Tk=m.indexedDB||m.mozIndexedDB||m.webkitIndexedDB||m.moz_indexedDB,Uk=function(a,b,c){w(ba(b)==ba(c),"opt_version must be passed to goog.db.openDatabase if and only if opt_onUpgradeNeeded is also passed");var d=new E;b=b?Tk.open(a,b):Tk.open(a);b.onsuccess=function(a){a=new Rk(a.target.result);d.Cb(a)};b.onerror=function(b){F(d,Hk(b.target,"opening database "+a))};b.onupgradeneeded=function(a){if(c){var b=new Rk(a.target.result);c(new Sk(a.oldVersion,a.newVersion),b,new Qk(a.target.transaction,
b))}};b.onblocked=function(){};return d};var Vk=function(a){this.Kd=a};Vk.prototype.set=function(a,b){ba(b)?this.Kd.set(a,vc(b)):this.Kd.remove(a)};Vk.prototype.get=function(a){var b;try{b=this.Kd.get(a)}catch(c){return}if(null!==b)try{return sc(b)}catch(c){throw"Storage: Invalid value was encountered";}};Vk.prototype.remove=function(a){this.Kd.remove(a)};var Wk=function(){};var Xk=function(){};t(Xk,Wk);Xk.prototype.Ma=function(){var a=0;ne(this.Mb(!0),function(b){Da(b);a++});return a};var Yk=function(a){this.Ga=a};t(Yk,Xk);var Zk=function(a){if(!a.Ga)return!1;try{return a.Ga.setItem("__sak","1"),a.Ga.removeItem("__sak"),!0}catch(b){return!1}};h=Yk.prototype;h.set=function(a,b){try{this.Ga.setItem(a,b)}catch(c){if(0==this.Ga.length)throw"Storage mechanism: Storage disabled";throw"Storage mechanism: Quota exceeded";}};h.get=function(a){a=this.Ga.getItem(a);if(!n(a)&&null!==a)throw"Storage mechanism: Invalid value was encountered";return a};h.remove=function(a){this.Ga.removeItem(a)};
h.Ma=function(){return this.Ga.length};h.Mb=function(a){var b=0,c=this.Ga,d=new le;d.next=function(){if(b>=c.length)throw ke;var d=Da(c.key(b++));if(a)return d;d=c.getItem(d);if(!n(d))throw"Storage mechanism: Invalid value was encountered";return d};return d};h.key=function(a){return this.Ga.key(a)};var $k=function(){var a=null;try{a=window.localStorage||null}catch(b){}this.Ga=a};t($k,Yk);var al=function(){var a=null;try{a=window.sessionStorage||null}catch(b){}this.Ga=a};t(al,Yk);var bl="First Second Third Fourth Fifth Sixth Seventh Eighth Ninth".split(" "),Y=function(a,b){return{name:a||"",$a:"a valid string",optional:!!b,Ia:n}},cl=function(a){return{name:a||"",$a:"a valid object",optional:!1,Ia:ia}},dl=function(a,b){return{name:a||"",$a:"a function",optional:!!b,Ia:p}},el=function(){return{name:"",$a:"null",optional:!1,Ia:ea}},fl=function(){return{name:"credential",$a:"a valid credential",optional:!1,Ia:function(a){return!(!a||!a.Bd)}}},gl=function(){return{name:"authProvider",
$a:"a valid Auth provider",optional:!1,Ia:function(a){return!!(a&&a.providerId&&a.hasOwnProperty&&a.hasOwnProperty("isOAuthProvider"))}}},hl=function(a,b,c,d){return{name:c||"",$a:a.$a+" or "+b.$a,optional:!!d,Ia:function(c){return a.Ia(c)||b.Ia(c)}}};var jl=function(a,b){for(var c in b){var d=b[c].name;a[d]=il(d,a[c],b[c].j)}},kl=function(a,b,c,d){a[b]=il(b,c,d)},il=function(a,b,c){if(!c)return b;var d=ll(a);a=function(){var a=Array.prototype.slice.call(arguments),e;a:{e=Array.prototype.slice.call(a);var k;k=0;for(var l=!1,q=0;q<c.length;q++)if(c[q].optional)l=!0;else{if(l)throw new K("internal-error","Argument validator encountered a required argument after an optional argument.");k++}l=c.length;if(e.length<k||l<e.length)e="Expected "+(k==l?
1==k?"1 argument":k+" arguments":k+"-"+l+" arguments")+" but got "+e.length+".";else{for(k=0;k<e.length;k++)if(l=c[k].optional&&void 0===e[k],!c[k].Ia(e[k])&&!l){e=c[k];if(0>k||k>=bl.length)throw new K("internal-error","Argument validator received an unsupported number of arguments.");e=bl[k]+" argument "+(e.name?'"'+e.name+'" ':"")+"must be "+e.$a+".";break a}e=null}}if(e)throw new K("argument-error",d+" failed: "+e);return b.apply(this,a)};for(var e in b)a[e]=b[e];for(e in b.prototype)a.prototype[e]=
b.prototype[e];return a},ll=function(a){a=a.split(".");return a[a.length-1]};var pl=function(a,b,c){var d=(this.Nb=firebase.SDK_VERSION||null)?Cf(this.Nb):null;this.o=new M(b,null,d);this.Tf=ml(this.o);this.Bb=a;this.ma=b;this.ab=c;this.od=[];this.Hf=!1;this.Cg=r(this.bh,this);this.ld=new nl;this.Zf=new ol;this.Jc={};this.Jc.unknown=this.ld;this.Jc.signInViaRedirect=this.ld;this.Jc.linkViaRedirect=this.ld;this.Jc.signInViaPopup=this.Zf;this.Jc.linkViaPopup=this.Zf},ml=function(a){var b=window.location.href;return qg(a).then(function(a){a:{for(var d=(b instanceof df?b.clone():
new df(b,void 0)).Db,e=0;e<a.length;e++){var f;var g=a[e];f=d;var k=Yc(g);k?f=(f=Yc(f))?k.equals(f):!1:(k=g.split(".").join("\\."),f=(new RegExp("^(.+."+k+"|"+k+")$","i")).test(f));if(f){a=!0;break a}}a=!1}if(!a)throw new K("unauthorized-domain");})},ql=function(a){a.Hf=!0;Af().then(function(){a.mh=new qk(a.Bb,a.ma,a.ab,a.Nb);a.mh.ef(a.Cg)})};pl.prototype.subscribe=function(a){Na(this.od,a)||this.od.push(a);this.Hf||ql(this)};pl.prototype.unsubscribe=function(a){Qa(this.od,function(b){return b==a})};
pl.prototype.bh=function(a){if(!a)throw new K("invalid-auth-event");for(var b=!1,c=0;c<this.od.length;c++){var d=this.od[c];if(d.pf(a.Kb,a.Pb)){(b=this.Jc[a.Kb])&&b.$f(a,d);b=!0;break}}a=this.ld;a.Pe||(a.Pe=!0,rl(a,!1,null,null));return b};pl.prototype.getRedirectResult=function(){return this.ld.getRedirectResult()};
var tl=function(a,b,c,d,e){return b?a.Tf.then(function(){sl(d);var f=rk(a.Bb,a.ma,a.ab,c,d.providerId,d.yf(),null,e,a.Nb);Mb((b||window).location,f);return b}):Bd(new K("popup-blocked"))},ul=function(a,b,c,d){return a.Tf.then(function(){sl(c);var e=rk(a.Bb,a.ma,a.ab,b,c.providerId,c.yf(),window.location.href,d,a.Nb);Mb(window.location,e)})},vl=function(a,b,c,d){var e=new K("popup-closed-by-user");return zf(c).then(function(){return Oe(3E4).then(function(){a.Yb(b,null,e,d)})})},sl=function(a){if(!a.isOAuthProvider)throw new K("invalid-oauth-provider");
},wl={},xl=function(a,b,c){var d=b+":"+c;wl[d]||(wl[d]=new pl(a,b,c));return wl[d]},nl=function(){this.Qe=this.Td=this.zc=this.Za=null;this.Pe=!1};nl.prototype.$f=function(a,b){if(!a)return Bd(new K("invalid-auth-event"));this.Pe=!0;var c=a.Kb,d=a.Pb;"unknown"==c?(this.Za||rl(this,!1,null,null),c=D()):c=a.ta?this.Me(a,b):b.Qc(c,d)?this.Ne(a,b):Bd(new K("invalid-auth-event"));return c};nl.prototype.Me=function(a){this.Za||rl(this,!0,null,a.getError());return D()};
nl.prototype.Ne=function(a,b){var c=this,d=a.Kb,e=b.Qc(d,a.Pb),f=a.Kc,g=a.ye(),k="signInViaRedirect"==d||"linkViaRedirect"==d;return e(f,g).then(function(a){c.Za||rl(c,k,a,null)}).Ha(function(a){c.Za||rl(c,k,null,a)})};var rl=function(a,b,c,d){b?d?(a.Za=function(){return Bd(d)},a.Td&&a.Td(d)):(a.Za=function(){return D(c)},a.zc&&a.zc(c)):(a.Za=function(){return D({user:null})},a.zc&&a.zc({user:null}));a.zc=null;a.Td=null};
nl.prototype.getRedirectResult=function(){var a=this;this.mf||(this.mf=new C(function(b,c){a.Za?a.Za().then(b,c):(a.zc=b,a.Td=c,yl(a))}));return this.mf};var yl=function(a){var b=new K("timeout");a.Qe&&a.Qe.cancel();a.Qe=Oe(3E4).then(function(){a.Za||rl(a,!0,null,b)})},ol=function(){};ol.prototype.$f=function(a,b){if(!a)return Bd(new K("invalid-auth-event"));var c=a.Kb,d=a.Pb;return a.ta?this.Me(a,b):b.Qc(c,d)?this.Ne(a,b):Bd(new K("invalid-auth-event"))};
ol.prototype.Me=function(a,b){b.Yb(a.Kb,null,a.getError(),a.Pb);return D()};ol.prototype.Ne=function(a,b){var c=a.Pb,d=a.Kb,e=b.Qc(d,c),f=a.Kc,g=a.ye();return e(f,g).then(function(a){b.Yb(d,a,null,c)}).Ha(function(a){b.Yb(d,null,a,c)})};var zl=function(a){this.o=a;this.dc=this.tb=null;this.lc=0};zl.prototype.Ra=function(){return{apiKey:this.o.ma,refreshToken:this.tb,accessToken:this.dc,expirationTime:this.lc}};
var Cl=function(a,b){var c=b.idToken,d=b.refreshToken,e=Al(b.expiresIn);a.dc=c;a.lc=e;a.tb=d},Al=function(a){return oa()+1E3*parseInt(a,10)},Dl=function(a,b){return hg(a.o,b).then(function(b){a.dc=b.access_token;a.lc=Al(b.expires_in);a.tb=b.refresh_token;return{accessToken:a.dc,expirationTime:a.lc,refreshToken:a.tb}},function(){throw new K("internal-error");})};
zl.prototype.getToken=function(a){return a||!this.dc||oa()>this.lc-3E4?this.tb?Dl(this,{grant_type:"refresh_token",refresh_token:this.tb}):D(null):D({accessToken:this.dc,expirationTime:this.lc,refreshToken:this.tb})};var El=function(a,b,c,d,e){Ff(this,{uid:a,displayName:d||null,photoURL:e||null,email:c||null,providerId:b})},Fl=function(a,b){Rb.call(this,a);for(var c in b)this[c]=b[c]};t(Fl,Rb);
var Il=function(a,b,c){this.Qa=[];this.ma=a.apiKey;this.ab=a.appName;this.Bb=a.authDomain||null;a=firebase.SDK_VERSION?Cf(firebase.SDK_VERSION):null;this.o=new M(this.ma,null,a);this.Jb=new zl(this.o);Gl(this,b.idToken);Cl(this.Jb,b);J(this,"refreshToken",this.Jb.tb);Hl(this,c||{});G.call(this);this.Qd=!1;this.Bb&&(this.$=xl(this.Bb,this.ma,this.ab));this.Xd=[]};t(Il,G);
var Gl=function(a,b){a.Jf=b;J(a,"_lat",b)},Jl=function(a,b){Qa(a.Xd,function(a){return a==b})},Kl=function(a){for(var b=[],c=0;c<a.Xd.length;c++)b.push(a.Xd[c](a));return Fd(b).then(function(){return a})},Ll=function(a){a.$&&!a.Qd&&(a.Qd=!0,a.$.subscribe(a))},Hl=function(a,b){Ff(a,{uid:b.uid,displayName:b.displayName||null,photoURL:b.photoURL||null,email:b.email||null,emailVerified:b.emailVerified||!1,isAnonymous:b.isAnonymous||!1,providerData:[]})};J(Il.prototype,"providerId","firebase");
var Ml=function(){},Nl=function(a){return D().then(function(){if(a.Mg)throw new K("app-deleted");})},Ol=function(a){return Ia(a.providerData,function(a){return a.providerId})},Ql=function(a,b){b&&(Pl(a,b.providerId),a.providerData.push(b))},Pl=function(a,b){Qa(a.providerData,function(a){return a.providerId==b})},Rl=function(a,b,c){("uid"!=b||c)&&a.hasOwnProperty(b)&&J(a,b,c)};
Il.prototype.copy=function(a){var b=this;b!=a&&(Ff(this,{uid:a.uid,displayName:a.displayName,photoURL:a.photoURL,email:a.email,emailVerified:a.emailVerified,isAnonymous:a.isAnonymous,providerData:[]}),Ga(a.providerData,function(a){Ql(b,a)}),this.Jb=a.Jb,J(this,"refreshToken",this.Jb.tb))};Il.prototype.reload=function(){var a=this;return Nl(this).then(function(){return Sl(a).then(function(){return Kl(a)}).then(Ml)})};
var Sl=function(a){return a.getToken().then(function(b){var c=a.isAnonymous;return Tl(a,b).then(function(){c||Rl(a,"isAnonymous",!1);return b}).Ha(function(b){"auth/user-token-expired"==b.code&&(a.dispatchEvent(new Fl("userDeleted")),a.destroy());throw b;})})};
Il.prototype.getToken=function(a){var b=this;return Nl(this).then(function(){return b.Jb.getToken(a)}).then(function(a){if(!a)throw new K("internal-error");a.accessToken!=b.Jf&&(Gl(b,a.accessToken),b.Fb());Rl(b,"refreshToken",a.refreshToken);return a.accessToken})};var Ul=function(a,b){b.idToken&&a.Jf!=b.idToken&&(Cl(a.Jb,b),a.Fb(),Gl(a,b.idToken))};Il.prototype.Fb=function(){this.dispatchEvent(new Fl("tokenChanged"))};var Tl=function(a,b){return L(a.o,Ig,{idToken:b}).then(r(a.Fh,a))};
Il.prototype.Fh=function(a){a=a.users;if(!a||!a.length)throw new K("internal-error");a=a[0];Hl(this,{uid:a.localId,displayName:a.displayName,photoURL:a.photoUrl,email:a.email,emailVerified:!!a.emailVerified});for(var b=Vl(a),c=0;c<b.length;c++)Ql(this,b[c]);Rl(this,"isAnonymous",!(this.email&&a.passwordHash)&&!(this.providerData&&this.providerData.length))};
var Vl=function(a){return(a=a.providerUserInfo)&&a.length?Ia(a,function(a){return new El(a.rawId,a.providerId,a.email,a.displayName,a.photoUrl)}):[]};Il.prototype.reauthenticate=function(a){var b=this;return this.v(a.Bd(this.o).then(function(a){var d;a:{var e=a.idToken.split(".");if(3==e.length){for(var e=e[1],f=(4-e.length%4)%4,g=0;g<f;g++)e+=".";try{var k=sc(yb(e));if(k.sub&&k.iss&&k.aud&&k.exp){d=new Lf(k);break a}}catch(l){}}d=null}if(!d||b.uid!=d.wh)throw new K("user-mismatch");Ul(b,a);return b.reload()}))};
var Wl=function(a,b){return Sl(a).then(function(){if(Na(Ol(a),b))return Kl(a).then(function(){throw new K("provider-already-linked");})})};h=Il.prototype;h.link=function(a){var b=this;return this.v(Wl(this,a.provider).then(function(){return b.getToken()}).then(function(c){return a.Lf(b.o,c)}).then(r(this.vf,this)))};h.vf=function(a){Ul(this,a);var b=this;return this.reload().then(function(){return b})};
h.updateEmail=function(a){var b=this;return this.v(this.getToken().then(function(c){return b.o.updateEmail(c,a)}).then(function(a){Ul(b,a);return b.reload()}))};h.updatePassword=function(a){var b=this;return this.v(this.getToken().then(function(c){return b.o.updatePassword(c,a)}).then(function(a){Ul(b,a);return b.reload()}))};
h.updateProfile=function(a){if(void 0===a.displayName&&void 0===a.photoURL)return Nl(this);var b=this;return this.v(this.getToken().then(function(c){return b.o.updateProfile(c,{displayName:a.displayName,photoUrl:a.photoURL})}).then(function(a){Ul(b,a);Rl(b,"displayName",a.displayName||null);Rl(b,"photoURL",a.photoUrl||null);return Kl(b)}).then(Ml))};
h.unlink=function(a){var b=this;return this.v(Sl(this).then(function(c){return Na(Ol(b),a)?yg(b.o,c,[a]).then(function(a){var c=new xe;Ga(a.providerUserInfo||[],function(a){c.add(a.providerId)});Ga(Ol(b),function(a){c.contains(a)||Pl(b,a)});return Kl(b)}):Kl(b).then(function(){throw new K("no-such-provider");})}))};h["delete"]=function(){var a=this;return this.v(this.getToken().then(function(b){return L(a.o,Hg,{idToken:b})}).then(function(){a.dispatchEvent(new Fl("userDeleted"))})).then(function(){a.destroy()})};
h.pf=function(a,b){return"linkViaPopup"==a&&(this.qb||null)==b&&this.Xa||"linkViaRedirect"==a&&(this.Sd||null)==b?!0:!1};h.Yb=function(a,b,c,d){"linkViaPopup"==a&&d==(this.qb||null)&&(c&&this.Vb?this.Vb(c):b&&!c&&this.Xa&&this.Xa(b),this.Wb&&(this.Wb.cancel(),this.Wb=null),delete this.Xa,delete this.Vb)};h.Qc=function(a,b){return"linkViaPopup"==a&&b==(this.qb||null)||"linkViaRedirect"==a&&(this.Sd||null)==b?r(this.Sg,this):null};h.Ad=function(){return this.uid+":::"+Math.floor(1E9*Math.random()).toString()};
h.linkWithPopup=function(a){var b=this,c=Jf(a.providerId),d=yf(c&&c.kd,c&&c.jd),e=this.Ad(),c=Wl(this,a.providerId).then(function(){return Kl(b)}).then(function(){b.nc();return b.getToken()}).then(function(){return tl(b.$,d,"linkViaPopup",a,e)}).then(function(a){return new C(function(c,d){b.Yb("linkViaPopup",null,new K("cancelled-popup-request"),b.qb||null);b.Xa=c;b.Vb=d;b.qb=e;b.Wb=vl(b,"linkViaPopup",a,e)})}).then(function(a){d&&(d||window).close();return a}).Ha(function(a){d&&(d||window).close();
throw a;});return this.v(c)};h.linkWithRedirect=function(a){var b=this,c=null,d=this.Ad(),e=Wl(this,a.providerId).then(function(){b.nc();return b.getToken()}).then(function(){b.Sd=d;return Kl(b)}).then(function(a){b.Xb&&(a=b.ma+":"+b.ab,a=Xl(b.Xb,Yl,b.Ra(),a));return a}).then(function(){return ul(b.$,"linkViaRedirect",a,d)}).Ha(function(a){c=a;if(b.Xb)return Zl(b.Xb,Yl,b.ma+":"+b.ab);throw c;}).then(function(){if(c)throw c;});return this.v(e)};
h.nc=function(){if(this.$&&this.Qd)return this.$;if(this.$&&!this.Qd)throw new K("internal-error");throw new K("auth-domain-config-required");};h.Sg=function(a,b){var c=this,d=null,e=this.getToken().then(function(d){return L(c.o,Pf,{requestUri:a,sessionId:b,idToken:d})}).then(function(a){d=$f(a);return c.vf(a)}).then(function(a){return{user:a,credential:d}});return this.v(e)};
h.sendEmailVerification=function(){var a=this;return this.v(this.getToken().then(function(b){return a.o.sendEmailVerification(b)}).then(function(b){if(a.email!=b)return a.reload()}).then(function(){}))};h.destroy=function(){for(var a=0;a<this.Qa.length;a++)this.Qa[a].cancel("app-deleted");this.Qa=[];this.Mg=!0;J(this,"refreshToken",null);this.$&&this.$.unsubscribe(this)};h.v=function(a){var b=this;this.Qa.push(a);Jd(a,function(){Pa(b.Qa,a)});return a};
h.Ra=function(){var a={uid:this.uid,displayName:this.displayName,photoURL:this.photoURL,email:this.email,emailVerified:this.emailVerified,isAnonymous:this.isAnonymous,providerData:[],apiKey:this.ma,appName:this.ab,authDomain:this.Bb,stsTokenManager:this.Jb.Ra(),redirectEventId:this.Sd||null};Ga(this.providerData,function(b){a.providerData.push(Gf(b))});return a};
var $l=function(a){if(!a.apiKey)return null;var b={apiKey:a.apiKey,authDomain:a.authDomain,appName:a.appName},c={};if(a.stsTokenManager&&a.stsTokenManager.accessToken&&a.stsTokenManager.refreshToken&&a.stsTokenManager.expirationTime)c.idToken=a.stsTokenManager.accessToken,c.refreshToken=a.stsTokenManager.refreshToken,c.expiresIn=(a.stsTokenManager.expirationTime-oa())/1E3;else return null;var d=new Il(b,c,a);a.providerData&&Ga(a.providerData,function(a){if(a){var b={};Ff(b,a);Ql(d,b)}});a.redirectEventId&&
(d.Sd=a.redirectEventId);return d},am=function(a,b,c){var d=new Il(a,b);c&&(d.Xb=c);return d.reload().then(function(){return d})};var bm,cm=function(a,b,c,d,e){this.Lg=a;this.Ge=b;this.te=c;this.rg=d;this.wb=e;this.Jd={};this.nd=[];this.hd=0},dm=function(a){return D(Uk(a.Lg,a.wb,function(b,c){c.createObjectStore(a.Ge,{keyPath:a.te})}))},em=function(a){a.Gf||(a.Gf=dm(a));return a.Gf},fm=function(a,b,c){var d;var e=[a.Ge];c=c?"readwrite":"readonly";try{var f=c?b.Ja.transaction(e,c):b.Ja.transaction(e);d=new Qk(f,b)}catch(g){throw Ik(g,"creating transaction");}return d.objectStore(a.Ge)};
cm.prototype.set=function(a,b){var c=!1,d,e=this;return Jd(em(this).then(function(b){d=b;return fm(e,d,!0).get(a)}).then(function(f){var g=fm(e,d,!0);if(f)return f.value=b,g.put(f);e.hd++;c=!0;f={};f[e.te]=a;f[e.rg]=b;return g.add(f)}).then(function(){e.Jd[a]=b}),function(){c&&e.hd--})};cm.prototype.get=function(a){var b=this;return em(this).then(function(c){return fm(b,c,!1).get(a)})};
cm.prototype.remove=function(a){var b=!1,c=this;return Jd(em(this).then(function(d){b=!0;c.hd++;return fm(c,d,!0).remove(a)}).then(function(){delete c.Jd[a]}),function(){b&&c.hd--})};cm.prototype.ci=function(){var a=this;return em(this).then(function(b){return fm(a,b,!1).getAll()}).then(function(b){var c={},d=[];if(0==a.hd){for(d=0;d<b.length;d++)c[b[d][a.te]]=b[d][a.rg];d=xf(a.Jd,c);a.Jd=c}return d})};var gm=function(a,b){Qa(a.nd,function(a){return a==b});0==a.nd.length&&a.Yd()};
cm.prototype.af=function(){var a=this;this.Yd();var b=function(){a.Ke=Oe(1E3).then(r(a.ci,a)).then(function(b){0<b.length&&Ga(a.nd,function(a){a(b)})}).then(b).Ha(function(a){"STOP_EVENT"!=a.message&&b()});return a.Ke};b()};cm.prototype.Yd=function(){this.Ke&&this.Ke.cancel("STOP_EVENT")};var Yl={name:"redirectUser",nb:!1},hm={name:"sessionId",nb:!1},im={name:"authEvent",nb:!0},jm={name:"authUser",nb:!0},km=function(a,b,c,d,e){this.Ah=a;this.ig=b;this.dd=d;this.Sh=e;if(!Zk(new $k)||!Zk(new al))throw new K("web-storage-unsupported");this.Oa={};this.Wc=c;this.Mf=r(this.xh,this);this.Ff=r(this.qh,this)},lm,mm=function(){if(!lm){var a;bm||(bm=new cm("firebaseLocalStorageDb","firebaseLocalStorage","fbase_key","value",1));a=bm;var b=y&&!!ub&&11==ub||/Edge\/\d+/.test(db),c=navigator.userAgent.toLowerCase();
lm=new km("firebase",":",a,b,-1!=c.indexOf("safari")&&-1==c.indexOf("chrome")&&window!=window.top?!0:!1)}return lm},nm=function(a,b){var c;b?(a.Yf||(c=new $k,c=Zk(c)?c:null,a.Yf=new Vk(c)),c=a.Yf):(a.ng||(c=new al,c=Zk(c)?c:null,a.ng=new Vk(c)),c=a.ng);return c};km.prototype.ka=function(a,b){return this.Ah+this.ig+a.name+(b?this.ig+b:"")};
var om=function(a,b,c){return a.dd&&b.nb?a.Wc.get(a.ka(b,c)).then(function(a){return a&&a.value}):D(nm(a,b.nb).get(a.ka(b,c)))},Zl=function(a,b,c){if(a.dd&&b.nb)return a.Wc.remove(a.ka(b,c));nm(a,b.nb).remove(a.ka(b,c));return D()},Xl=function(a,b,c,d){if(a.dd&&b.nb)return a.Wc.set(a.ka(b,d),c);nm(a,b.nb).set(a.ka(b,d),c);return D()};km.prototype.ye=function(a){return om(this,hm,a)};km.prototype.ef=function(a,b){pm(this,this.ka(im,a),b)};
var qm=function(a,b){return om(a,jm,b).then(function(a){return $l(a||{})})},rm=function(a,b){return om(a,Yl,b).then(function(a){return $l(a||{})})},pm=function(a,b,c){Za(a.Oa)&&a.af();a.Oa[b]||(a.Oa[b]=[]);a.Oa[b].push(c)},sm=function(a,b,c){a.Oa[b]&&(Qa(a.Oa[b],function(a){return a==c}),0==a.Oa[b].length&&delete a.Oa[b]);Za(a.Oa)&&a.Yd()};h=km.prototype;h.af=function(){if(this.dd){var a=this.Wc,b=this.Ff;0==a.nd.length&&a.af();a.nd.push(b)}else dc(window,"storage",this.Mf)};
h.Yd=function(){this.dd?gm(this.Wc,this.Ff):lc(window,"storage",this.Mf)};h.xh=function(a){var b=a.yd.key;if(this.Sh){var c=window.localStorage.getItem(b);a=a.yd.newValue;a!=c&&(a?window.localStorage.setItem(b,a):a||window.localStorage.removeItem(b))}this.nf(b)};h.qh=function(a){Ga(a,r(this.nf,this))};h.nf=function(a){this.Oa[a]&&Ga(this.Oa[a],function(a){a()})};var xm=function(a){this.tf=!1;J(this,"app",a);this.ac=mm();this.Ac=mm();if(tm(this).options&&tm(this).options.apiKey)a=firebase.SDK_VERSION?Cf(firebase.SDK_VERSION):null,this.o=new M(tm(this).options&&tm(this).options.apiKey,null,a);else throw new K("invalid-api-key");this.Qa=[];this.Nc=[];this.Bh=firebase.INTERNAL.createSubscribe(r(this.rh,this));um(this,null);this.hc=vm(this);this.Yc=!1;this.zf=r(this.bi,this);this.pg=r(this.uc,this);this.qg=r(this.jh,this);this.og=r(this.ih,this);wm(this);this.INTERNAL=
{};this.INTERNAL["delete"]=r(this["delete"],this)};xm.prototype.nc=function(){return this.Qg||Bd(new K("auth-domain-config-required"))};var wm=function(a){var b=tm(a).options.authDomain,c=tm(a).options.apiKey;b&&(a.Qg=a.hc.then(function(){a.$=xl(b,c,tm(a).name);a.$.subscribe(a);Z(a)&&Ll(Z(a));a.Re&&(Ll(a.Re),a.Re=null);return a.$}))};h=xm.prototype;h.pf=function(a,b){switch(a){case "unknown":case "signInViaRedirect":return!0;case "signInViaPopup":return this.qb==b&&!!this.Xa;default:return!1}};
h.Yb=function(a,b,c,d){"signInViaPopup"==a&&this.qb==d&&(c&&this.Vb?this.Vb(c):b&&!c&&this.Xa&&this.Xa(b),this.Wb&&(this.Wb.cancel(),this.Wb=null),delete this.Xa,delete this.Vb)};h.Qc=function(a,b){return"signInViaRedirect"==a||"signInViaPopup"==a&&this.qb==b&&this.Xa?r(this.Tg,this):null};
h.Tg=function(a,b){var c=this,d=null,e=Nf(c.o,{requestUri:a,sessionId:b}).then(function(a){d=$f(a);return a}),f=c.hc.then(function(){return e}).then(function(a){return ym(c,a)}).then(function(){return{user:Z(c),credential:d}});return this.v(f)};h.Ad=function(){return Math.floor(1E9*Math.random()).toString()};
h.signInWithPopup=function(a){var b=this,c=Jf(a.providerId),d=yf(c&&c.kd,c&&c.jd),e=this.Ad(),c=this.nc().then(function(b){return tl(b,d,"signInViaPopup",a,e)}).then(function(a){return new C(function(c,d){b.Yb("signInViaPopup",null,new K("cancelled-popup-request"),b.qb);b.Xa=c;b.Vb=d;b.qb=e;b.Wb=vl(b,"signInViaPopup",a,e)})}).then(function(a){d&&(d||window).close();return a}).Ha(function(a){d&&(d||window).close();throw a;});return this.v(c)};
h.signInWithRedirect=function(a){var b=this,c=this.nc().then(function(){return ul(b.$,"signInViaRedirect",a)});return this.v(c)};h.getRedirectResult=function(){var a=this,b=this.nc().then(function(){return a.$.getRedirectResult()});return this.v(b)};
var ym=function(a,b){var c={};c.apiKey=tm(a).options.apiKey;c.authDomain=tm(a).options.authDomain;c.appName=tm(a).name;return a.hc.then(function(){return am(c,b,a.Ac)}).then(function(b){if(Z(a)&&b.uid==Z(a).uid)return Z(a).copy(b),a.uc(b);um(a,b);Ll(b);return a.uc(b)}).then(function(){a.Fb()})},um=function(a,b){Z(a)&&(Jl(Z(a),a.pg),lc(Z(a),"tokenChanged",a.qg),lc(Z(a),"userDeleted",a.og));b&&(b.Xd.push(a.pg),dc(b,"tokenChanged",a.qg),dc(b,"userDeleted",a.og));J(a,"currentUser",b)};
xm.prototype.signOut=function(){var a=this,b=this.hc.then(function(){if(!Z(a))return D();um(a,null);return Zl(a.ac,jm,zm(a)).then(function(){a.Fb()})});return this.v(b)};
var Am=function(a){var b=zm(a),c=rm(a.Ac,b).then(function(c){if(a.Re=c)c.Xb=a.Ac;return Zl(a.Ac,Yl,b)});return a.v(c)},vm=function(a){var b=zm(a),c=Jd(Am(a).then(function(){return qm(a.ac,b)}).then(function(c){return c?(c.Xb=a.Ac,c.reload().then(function(){return c}).Ha(function(e){return"auth/network-request-failed"==e.code?c:Zl(a.ac,jm,b)})):null}).then(function(b){um(a,b||null);a.Yc=!0;a.Fb()}),function(){if(!a.tf){a.Yc=!0;var c=a.ac;pm(c,c.ka(jm,b),a.zf)}});return a.v(c)};
xm.prototype.bi=function(){var a=this;return qm(this.ac,zm(this)).then(function(b){var c;if(c=Z(a)&&b){c=Z(a).uid;var d=b.uid;c=void 0===c||null===c||""===c||void 0===d||null===d||""===d?!1:c==d}if(c)return Z(a).copy(b),Z(a).getToken();um(a,b);b&&(Ll(b),b.Xb=a.Ac);a.$.subscribe(a);a.Fb()})};xm.prototype.uc=function(a){var b=zm(this);return Xl(this.ac,jm,a.Ra(),b)};xm.prototype.jh=function(){this.Yc=!0;this.Fb();this.uc(Z(this))};xm.prototype.ih=function(){this.signOut()};
var Bm=function(a,b){return a.v(b.then(function(b){return ym(a,b)}).then(function(){return Z(a)}))};h=xm.prototype;h.rh=function(a){var b=this;this.addAuthTokenListener(function(){a.next(Z(b))})};h.onAuthStateChanged=function(a,b,c){var d=this;this.Yc&&firebase.Promise.resolve().then(function(){p(a)?a(Z(d)):p(a.next)&&a.next(Z(d))});return this.Bh(a,b,c)};h.getToken=function(a){var b=this,c=this.hc.then(function(){return Z(b)?Z(b).getToken(a).then(function(a){return{accessToken:a}}):null});return this.v(c)};
h.signInWithCustomToken=function(a){var b=this;return Bm(this,L(this.o,Jg,{token:a})).then(function(a){Rl(a,"isAnonymous",!1);return b.uc(a)}).then(function(){return Z(b)})};h.signInWithEmailAndPassword=function(a,b){return Bm(this,L(this.o,Wf,{email:a,password:b}))};h.createUserWithEmailAndPassword=function(a,b){return Bm(this,L(this.o,Gg,{email:a,password:b}))};h.signInWithCredential=function(a){return Bm(this,a.Bd(this.o))};
h.signInAnonymously=function(){var a=Z(this),b=this;return a&&a.isAnonymous?D(a):Bm(this,this.o.signInAnonymously()).then(function(a){Rl(a,"isAnonymous",!0);return b.uc(a)}).then(function(){return Z(b)})};var zm=function(a){return tm(a).options.apiKey+":"+tm(a).name},tm=function(a){return a.app},Z=function(a){return a.currentUser};h=xm.prototype;h.Fb=function(){for(var a=0;a<this.Nc.length;a++)if(this.Nc[a])this.Nc[a](Z(this)&&Z(this)._lat||null)};
h.addAuthTokenListener=function(a){this.Nc.push(a);var b=this;this.Yc&&this.hc.then(function(){a(Z(b)&&Z(b)._lat||null)})};h.removeAuthTokenListener=function(a){Qa(this.Nc,function(b){return b==a})};h["delete"]=function(){this.tf=!0;for(var a=0;a<this.Qa.length;a++)this.Qa[a].cancel("app-deleted");this.Qa=[];a=this.ac;sm(a,a.ka(jm,zm(this)),this.zf);this.$&&this.$.unsubscribe(this)};h.v=function(a){var b=this;this.Qa.push(a);Jd(a,function(){Pa(b.Qa,a)});return a};
h.fetchProvidersForEmail=function(a){return this.v(og(this.o,a))};h.verifyPasswordResetCode=function(a){return this.checkActionCode(a).then(function(a){return a.data.email})};h.confirmPasswordReset=function(a,b){return this.v(this.o.confirmPasswordReset(a,b).then(function(){}))};h.checkActionCode=function(a){return this.v(this.o.checkActionCode(a).then(function(a){return{data:{email:a.email}}}))};h.applyActionCode=function(a){return this.v(this.o.applyActionCode(a).then(function(){}))};
h.sendPasswordResetEmail=function(a){return this.v(this.o.sendPasswordResetEmail(a).then(function(){}))};jl(xm.prototype,{applyActionCode:{name:"applyActionCode",j:[Y("code")]},checkActionCode:{name:"checkActionCode",j:[Y("code")]},confirmPasswordReset:{name:"confirmPasswordReset",j:[Y("code"),Y("newPassword")]},createUserWithEmailAndPassword:{name:"createUserWithEmailAndPassword",j:[Y("email"),Y("password")]},fetchProvidersForEmail:{name:"fetchProvidersForEmail",j:[Y("email")]},getRedirectResult:{name:"getRedirectResult",j:[]},onAuthStateChanged:{name:"onAuthStateChanged",j:[hl(cl(),dl(),"nextOrObserver"),
dl("opt_error",!0),dl("opt_completed",!0)]},sendPasswordResetEmail:{name:"sendPasswordResetEmail",j:[Y("email")]},signInAnonymously:{name:"signInAnonymously",j:[]},signInWithCredential:{name:"signInWithCredential",j:[fl()]},signInWithCustomToken:{name:"signInWithCustomToken",j:[Y("token")]},signInWithEmailAndPassword:{name:"signInWithEmailAndPassword",j:[Y("email"),Y("password")]},signInWithPopup:{name:"signInWithPopup",j:[gl()]},signInWithRedirect:{name:"signInWithRedirect",j:[gl()]},signOut:{name:"signOut",
j:[]},verifyPasswordResetCode:{name:"verifyPasswordResetCode",j:[Y("code")]}});
jl(Il.prototype,{"delete":{name:"delete",j:[]},getToken:{name:"getToken",j:[{name:"opt_forceRefresh",$a:"a boolean",optional:!0,Ia:function(a){return"boolean"==typeof a}}]},link:{name:"link",j:[fl()]},linkWithPopup:{name:"linkWithPopup",j:[gl()]},linkWithRedirect:{name:"linkWithRedirect",j:[gl()]},reauthenticate:{name:"reauthenticate",j:[fl()]},reload:{name:"reload",j:[]},sendEmailVerification:{name:"sendEmailVerification",j:[]},unlink:{name:"unlink",j:[Y("provider")]},updateEmail:{name:"updateEmail",
j:[Y("email")]},updatePassword:{name:"updatePassword",j:[Y("password")]},updateProfile:{name:"updateProfile",j:[cl("profile")]}});jl(C.prototype,{Ha:{name:"catch"},then:{name:"then"}});kl(Yf,"credential",function(a,b){return new Vf(a,b)},[Y("email"),Y("password")]);jl(Rf.prototype,{addScope:{name:"addScope",j:[Y("scope")]}});kl(Rf,"credential",Rf.credential,[hl(Y(),cl(),"token")]);jl(Sf.prototype,{addScope:{name:"addScope",j:[Y("scope")]}});kl(Sf,"credential",Sf.credential,[hl(Y(),cl(),"token")]);
jl(Tf.prototype,{addScope:{name:"addScope",j:[Y("scope")]}});kl(Tf,"credential",Tf.credential,[hl(Y(),hl(cl(),el()),"idToken"),hl(Y(),el(),"accessToken",!0)]);kl(Uf,"credential",Uf.credential,[hl(Y(),cl(),"token"),Y("secret",!0)]);
(function(){if("undefined"!==typeof firebase&&firebase.INTERNAL&&firebase.INTERNAL.registerService){var a={Auth:xm,Error:K};kl(a,"EmailAuthProvider",Yf,[]);kl(a,"FacebookAuthProvider",Rf,[]);kl(a,"GithubAuthProvider",Sf,[]);kl(a,"GoogleAuthProvider",Tf,[]);kl(a,"TwitterAuthProvider",Uf,[]);firebase.INTERNAL.registerService("auth",function(a,c){var d=new xm(a);c({INTERNAL:{getToken:r(d.getToken,d),addAuthTokenListener:r(d.addAuthTokenListener,d),removeAuthTokenListener:r(d.removeAuthTokenListener,
d)}});return d},a);firebase.INTERNAL.registerAppHook(function(a,c){"create"===a&&c.auth()});firebase.INTERNAL.extendNamespace({User:Il})}else throw Error("Cannot find the firebase namespace; be sure to include firebase-app.js before this library.");})();})();
(function() {var g,n=this;function p(a){return void 0!==a}function aa(){}function ba(a){a.Wb=function(){return a.$e?a.$e:a.$e=new a}}
function ca(a){var b=typeof a;if("object"==b)if(a){if(a instanceof Array)return"array";if(a instanceof Object)return b;var c=Object.prototype.toString.call(a);if("[object Window]"==c)return"object";if("[object Array]"==c||"number"==typeof a.length&&"undefined"!=typeof a.splice&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("splice"))return"array";if("[object Function]"==c||"undefined"!=typeof a.call&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("call"))return"function"}else return"null";
else if("function"==b&&"undefined"==typeof a.call)return"object";return b}function da(a){return"array"==ca(a)}function ea(a){var b=ca(a);return"array"==b||"object"==b&&"number"==typeof a.length}function q(a){return"string"==typeof a}function fa(a){return"number"==typeof a}function ga(a){return"function"==ca(a)}function ha(a){var b=typeof a;return"object"==b&&null!=a||"function"==b}function ia(a,b,c){return a.call.apply(a.bind,arguments)}
function ja(a,b,c){if(!a)throw Error();if(2<arguments.length){var d=Array.prototype.slice.call(arguments,2);return function(){var c=Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(c,d);return a.apply(b,c)}}return function(){return a.apply(b,arguments)}}function r(a,b,c){r=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?ia:ja;return r.apply(null,arguments)}
function ka(a,b){function c(){}c.prototype=b.prototype;a.Eg=b.prototype;a.prototype=new c;a.prototype.constructor=a;a.Bg=function(a,c,f){for(var h=Array(arguments.length-2),k=2;k<arguments.length;k++)h[k-2]=arguments[k];return b.prototype[c].apply(a,h)}};function la(){this.Xa=-1};function ma(){this.Xa=-1;this.Xa=64;this.N=[];this.Wd=[];this.Hf=[];this.zd=[];this.zd[0]=128;for(var a=1;a<this.Xa;++a)this.zd[a]=0;this.Pd=this.ac=0;this.reset()}ka(ma,la);ma.prototype.reset=function(){this.N[0]=1732584193;this.N[1]=4023233417;this.N[2]=2562383102;this.N[3]=271733878;this.N[4]=3285377520;this.Pd=this.ac=0};
function na(a,b,c){c||(c=0);var d=a.Hf;if(q(b))for(var e=0;16>e;e++)d[e]=b.charCodeAt(c)<<24|b.charCodeAt(c+1)<<16|b.charCodeAt(c+2)<<8|b.charCodeAt(c+3),c+=4;else for(e=0;16>e;e++)d[e]=b[c]<<24|b[c+1]<<16|b[c+2]<<8|b[c+3],c+=4;for(e=16;80>e;e++){var f=d[e-3]^d[e-8]^d[e-14]^d[e-16];d[e]=(f<<1|f>>>31)&4294967295}b=a.N[0];c=a.N[1];for(var h=a.N[2],k=a.N[3],m=a.N[4],l,e=0;80>e;e++)40>e?20>e?(f=k^c&(h^k),l=1518500249):(f=c^h^k,l=1859775393):60>e?(f=c&h|k&(c|h),l=2400959708):(f=c^h^k,l=3395469782),f=(b<<
5|b>>>27)+f+m+l+d[e]&4294967295,m=k,k=h,h=(c<<30|c>>>2)&4294967295,c=b,b=f;a.N[0]=a.N[0]+b&4294967295;a.N[1]=a.N[1]+c&4294967295;a.N[2]=a.N[2]+h&4294967295;a.N[3]=a.N[3]+k&4294967295;a.N[4]=a.N[4]+m&4294967295}
ma.prototype.update=function(a,b){if(null!=a){p(b)||(b=a.length);for(var c=b-this.Xa,d=0,e=this.Wd,f=this.ac;d<b;){if(0==f)for(;d<=c;)na(this,a,d),d+=this.Xa;if(q(a))for(;d<b;){if(e[f]=a.charCodeAt(d),++f,++d,f==this.Xa){na(this,e);f=0;break}}else for(;d<b;)if(e[f]=a[d],++f,++d,f==this.Xa){na(this,e);f=0;break}}this.ac=f;this.Pd+=b}};function t(a,b){for(var c in a)b.call(void 0,a[c],c,a)}function oa(a,b){var c={},d;for(d in a)c[d]=b.call(void 0,a[d],d,a);return c}function pa(a,b){for(var c in a)if(!b.call(void 0,a[c],c,a))return!1;return!0}function qa(a){var b=0,c;for(c in a)b++;return b}function ra(a){for(var b in a)return b}function sa(a){var b=[],c=0,d;for(d in a)b[c++]=a[d];return b}function ta(a){var b=[],c=0,d;for(d in a)b[c++]=d;return b}function ua(a,b){for(var c in a)if(a[c]==b)return!0;return!1}
function va(a,b,c){for(var d in a)if(b.call(c,a[d],d,a))return d}function wa(a,b){var c=va(a,b,void 0);return c&&a[c]}function xa(a){for(var b in a)return!1;return!0}function ya(a){var b={},c;for(c in a)b[c]=a[c];return b};function za(a){a=String(a);if(/^\s*$/.test(a)?0:/^[\],:{}\s\u2028\u2029]*$/.test(a.replace(/\\["\\\/bfnrtu]/g,"@").replace(/"[^"\\\n\r\u2028\u2029\x00-\x08\x0a-\x1f]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:[\s\u2028\u2029]*\[)+/g,"")))try{return eval("("+a+")")}catch(b){}throw Error("Invalid JSON string: "+a);}function Aa(){this.Fd=void 0}
function Ba(a,b,c){switch(typeof b){case "string":Ca(b,c);break;case "number":c.push(isFinite(b)&&!isNaN(b)?b:"null");break;case "boolean":c.push(b);break;case "undefined":c.push("null");break;case "object":if(null==b){c.push("null");break}if(da(b)){var d=b.length;c.push("[");for(var e="",f=0;f<d;f++)c.push(e),e=b[f],Ba(a,a.Fd?a.Fd.call(b,String(f),e):e,c),e=",";c.push("]");break}c.push("{");d="";for(f in b)Object.prototype.hasOwnProperty.call(b,f)&&(e=b[f],"function"!=typeof e&&(c.push(d),Ca(f,c),
c.push(":"),Ba(a,a.Fd?a.Fd.call(b,f,e):e,c),d=","));c.push("}");break;case "function":break;default:throw Error("Unknown type: "+typeof b);}}var Da={'"':'\\"',"\\":"\\\\","/":"\\/","\b":"\\b","\f":"\\f","\n":"\\n","\r":"\\r","\t":"\\t","\x0B":"\\u000b"},Ea=/\uffff/.test("\uffff")?/[\\\"\x00-\x1f\x7f-\uffff]/g:/[\\\"\x00-\x1f\x7f-\xff]/g;
function Ca(a,b){b.push('"',a.replace(Ea,function(a){if(a in Da)return Da[a];var b=a.charCodeAt(0),e="\\u";16>b?e+="000":256>b?e+="00":4096>b&&(e+="0");return Da[a]=e+b.toString(16)}),'"')};var v;a:{var Fa=n.navigator;if(Fa){var Ga=Fa.userAgent;if(Ga){v=Ga;break a}}v=""};function Ha(a){if(Error.captureStackTrace)Error.captureStackTrace(this,Ha);else{var b=Error().stack;b&&(this.stack=b)}a&&(this.message=String(a))}ka(Ha,Error);Ha.prototype.name="CustomError";var w=Array.prototype,Ia=w.indexOf?function(a,b,c){return w.indexOf.call(a,b,c)}:function(a,b,c){c=null==c?0:0>c?Math.max(0,a.length+c):c;if(q(a))return q(b)&&1==b.length?a.indexOf(b,c):-1;for(;c<a.length;c++)if(c in a&&a[c]===b)return c;return-1},Ja=w.forEach?function(a,b,c){w.forEach.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=q(a)?a.split(""):a,f=0;f<d;f++)f in e&&b.call(c,e[f],f,a)},Ka=w.filter?function(a,b,c){return w.filter.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=[],f=0,h=q(a)?
a.split(""):a,k=0;k<d;k++)if(k in h){var m=h[k];b.call(c,m,k,a)&&(e[f++]=m)}return e},La=w.map?function(a,b,c){return w.map.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=Array(d),f=q(a)?a.split(""):a,h=0;h<d;h++)h in f&&(e[h]=b.call(c,f[h],h,a));return e},Ma=w.reduce?function(a,b,c,d){for(var e=[],f=1,h=arguments.length;f<h;f++)e.push(arguments[f]);d&&(e[0]=r(b,d));return w.reduce.apply(a,e)}:function(a,b,c,d){var e=c;Ja(a,function(c,h){e=b.call(d,e,c,h,a)});return e},Na=w.every?function(a,b,
c){return w.every.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=q(a)?a.split(""):a,f=0;f<d;f++)if(f in e&&!b.call(c,e[f],f,a))return!1;return!0};function Oa(a,b){var c=Pa(a,b,void 0);return 0>c?null:q(a)?a.charAt(c):a[c]}function Pa(a,b,c){for(var d=a.length,e=q(a)?a.split(""):a,f=0;f<d;f++)if(f in e&&b.call(c,e[f],f,a))return f;return-1}function Qa(a,b){var c=Ia(a,b);0<=c&&w.splice.call(a,c,1)}function Ra(a,b,c){return 2>=arguments.length?w.slice.call(a,b):w.slice.call(a,b,c)}
function Sa(a,b){a.sort(b||Ta)}function Ta(a,b){return a>b?1:a<b?-1:0};var Ua=-1!=v.indexOf("Opera")||-1!=v.indexOf("OPR"),Va=-1!=v.indexOf("Trident")||-1!=v.indexOf("MSIE"),Wa=-1!=v.indexOf("Gecko")&&-1==v.toLowerCase().indexOf("webkit")&&!(-1!=v.indexOf("Trident")||-1!=v.indexOf("MSIE")),Xa=-1!=v.toLowerCase().indexOf("webkit");
(function(){var a="",b;if(Ua&&n.opera)return a=n.opera.version,ga(a)?a():a;Wa?b=/rv\:([^\);]+)(\)|;)/:Va?b=/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/:Xa&&(b=/WebKit\/(\S+)/);b&&(a=(a=b.exec(v))?a[1]:"");return Va&&(b=(b=n.document)?b.documentMode:void 0,b>parseFloat(a))?String(b):a})();var Ya=null,Za=null,$a=null;function ab(a,b){if(!ea(a))throw Error("encodeByteArray takes an array as a parameter");bb();for(var c=b?Za:Ya,d=[],e=0;e<a.length;e+=3){var f=a[e],h=e+1<a.length,k=h?a[e+1]:0,m=e+2<a.length,l=m?a[e+2]:0,u=f>>2,f=(f&3)<<4|k>>4,k=(k&15)<<2|l>>6,l=l&63;m||(l=64,h||(k=64));d.push(c[u],c[f],c[k],c[l])}return d.join("")}
function bb(){if(!Ya){Ya={};Za={};$a={};for(var a=0;65>a;a++)Ya[a]="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(a),Za[a]="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_.".charAt(a),$a[Za[a]]=a,62<=a&&($a["ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(a)]=a)}};function cb(a){n.setTimeout(function(){throw a;},0)}var db;
function eb(){var a=n.MessageChannel;"undefined"===typeof a&&"undefined"!==typeof window&&window.postMessage&&window.addEventListener&&-1==v.indexOf("Presto")&&(a=function(){var a=document.createElement("iframe");a.style.display="none";a.src="";document.documentElement.appendChild(a);var b=a.contentWindow,a=b.document;a.open();a.write("");a.close();var c="callImmediate"+Math.random(),d="file:"==b.location.protocol?"*":b.location.protocol+"//"+b.location.host,a=r(function(a){if(("*"==d||a.origin==
d)&&a.data==c)this.port1.onmessage()},this);b.addEventListener("message",a,!1);this.port1={};this.port2={postMessage:function(){b.postMessage(c,d)}}});if("undefined"!==typeof a&&-1==v.indexOf("Trident")&&-1==v.indexOf("MSIE")){var b=new a,c={},d=c;b.port1.onmessage=function(){if(p(c.next)){c=c.next;var a=c.Ke;c.Ke=null;a()}};return function(a){d.next={Ke:a};d=d.next;b.port2.postMessage(0)}}return"undefined"!==typeof document&&"onreadystatechange"in document.createElement("script")?function(a){var b=
document.createElement("script");b.onreadystatechange=function(){b.onreadystatechange=null;b.parentNode.removeChild(b);b=null;a();a=null};document.documentElement.appendChild(b)}:function(a){n.setTimeout(a,0)}};function fb(a,b){gb||hb();ib||(gb(),ib=!0);jb.push(new kb(a,b))}var gb;function hb(){if(n.Promise&&n.Promise.resolve){var a=n.Promise.resolve();gb=function(){a.then(lb)}}else gb=function(){var a=lb;!ga(n.setImmediate)||n.Window&&n.Window.prototype&&n.Window.prototype.setImmediate==n.setImmediate?(db||(db=eb()),db(a)):n.setImmediate(a)}}var ib=!1,jb=[];[].push(function(){ib=!1;jb=[]});
function lb(){for(;jb.length;){var a=jb;jb=[];for(var b=0;b<a.length;b++){var c=a[b];try{c.Uf.call(c.scope)}catch(d){cb(d)}}}ib=!1}function kb(a,b){this.Uf=a;this.scope=b};function mb(a,b){this.L=nb;this.sf=void 0;this.Ca=this.Ha=null;this.jd=this.be=!1;if(a==ob)pb(this,qb,b);else try{var c=this;a.call(b,function(a){pb(c,qb,a)},function(a){if(!(a instanceof rb))try{if(a instanceof Error)throw a;throw Error("Promise rejected.");}catch(b){}pb(c,sb,a)})}catch(d){pb(this,sb,d)}}var nb=0,qb=2,sb=3;function ob(){}mb.prototype.then=function(a,b,c){return tb(this,ga(a)?a:null,ga(b)?b:null,c)};mb.prototype.then=mb.prototype.then;mb.prototype.$goog_Thenable=!0;g=mb.prototype;
g.xg=function(a,b){return tb(this,null,a,b)};g.cancel=function(a){this.L==nb&&fb(function(){var b=new rb(a);ub(this,b)},this)};function ub(a,b){if(a.L==nb)if(a.Ha){var c=a.Ha;if(c.Ca){for(var d=0,e=-1,f=0,h;h=c.Ca[f];f++)if(h=h.m)if(d++,h==a&&(e=f),0<=e&&1<d)break;0<=e&&(c.L==nb&&1==d?ub(c,b):(d=c.Ca.splice(e,1)[0],vb(c,d,sb,b)))}a.Ha=null}else pb(a,sb,b)}function wb(a,b){a.Ca&&a.Ca.length||a.L!=qb&&a.L!=sb||xb(a);a.Ca||(a.Ca=[]);a.Ca.push(b)}
function tb(a,b,c,d){var e={m:null,ff:null,hf:null};e.m=new mb(function(a,h){e.ff=b?function(c){try{var e=b.call(d,c);a(e)}catch(l){h(l)}}:a;e.hf=c?function(b){try{var e=c.call(d,b);!p(e)&&b instanceof rb?h(b):a(e)}catch(l){h(l)}}:h});e.m.Ha=a;wb(a,e);return e.m}g.Af=function(a){this.L=nb;pb(this,qb,a)};g.Bf=function(a){this.L=nb;pb(this,sb,a)};
function pb(a,b,c){if(a.L==nb){if(a==c)b=sb,c=new TypeError("Promise cannot resolve to itself");else{var d;if(c)try{d=!!c.$goog_Thenable}catch(e){d=!1}else d=!1;if(d){a.L=1;c.then(a.Af,a.Bf,a);return}if(ha(c))try{var f=c.then;if(ga(f)){yb(a,c,f);return}}catch(h){b=sb,c=h}}a.sf=c;a.L=b;a.Ha=null;xb(a);b!=sb||c instanceof rb||zb(a,c)}}function yb(a,b,c){function d(b){f||(f=!0,a.Bf(b))}function e(b){f||(f=!0,a.Af(b))}a.L=1;var f=!1;try{c.call(b,e,d)}catch(h){d(h)}}
function xb(a){a.be||(a.be=!0,fb(a.Sf,a))}g.Sf=function(){for(;this.Ca&&this.Ca.length;){var a=this.Ca;this.Ca=null;for(var b=0;b<a.length;b++)vb(this,a[b],this.L,this.sf)}this.be=!1};function vb(a,b,c,d){if(c==qb)b.ff(d);else{if(b.m)for(;a&&a.jd;a=a.Ha)a.jd=!1;b.hf(d)}}function zb(a,b){a.jd=!0;fb(function(){a.jd&&Ab.call(null,b)})}var Ab=cb;function rb(a){Ha.call(this,a)}ka(rb,Ha);rb.prototype.name="cancel";function Bb(a,b){return Object.prototype.hasOwnProperty.call(a,b)}function x(a,b){if(Object.prototype.hasOwnProperty.call(a,b))return a[b]}function Cb(a,b){for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&b(c,a[c])};function y(a,b,c,d){var e;d<b?e="at least "+b:d>c&&(e=0===c?"none":"no more than "+c);if(e)throw Error(a+" failed: Was called with "+d+(1===d?" argument.":" arguments.")+" Expects "+e+".");}function Db(a,b,c){var d="";switch(b){case 1:d=c?"first":"First";break;case 2:d=c?"second":"Second";break;case 3:d=c?"third":"Third";break;case 4:d=c?"fourth":"Fourth";break;default:throw Error("errorPrefix called with argumentNumber > 4.  Need to update it?");}return a=a+" failed: "+(d+" argument ")}
function A(a,b,c,d){if((!d||p(c))&&!ga(c))throw Error(Db(a,b,d)+"must be a valid function.");}function Eb(a,b,c){if(p(c)&&(!ha(c)||null===c))throw Error(Db(a,b,!0)+"must be a valid context object.");};function Fb(a){var b=[];Cb(a,function(a,d){da(d)?Ja(d,function(d){b.push(encodeURIComponent(a)+"="+encodeURIComponent(d))}):b.push(encodeURIComponent(a)+"="+encodeURIComponent(d))});return b.length?"&"+b.join("&"):""};var Gb=n.Promise||mb;mb.prototype["catch"]=mb.prototype.xg;function Hb(){var a=this;this.reject=this.resolve=null;this.ra=new Gb(function(b,c){a.resolve=b;a.reject=c})}function Ib(a,b){return function(c,d){c?a.reject(c):a.resolve(d);ga(b)&&(Jb(a.ra),1===b.length?b(c):b(c,d))}}function Jb(a){a.then(void 0,aa)};function Kb(a,b){if(!a)throw Lb(b);}function Lb(a){return Error("Firebase Database ("+firebase.SDK_VERSION+") INTERNAL ASSERT FAILED: "+a)};function Mb(a){for(var b=[],c=0,d=0;d<a.length;d++){var e=a.charCodeAt(d);55296<=e&&56319>=e&&(e-=55296,d++,Kb(d<a.length,"Surrogate pair missing trail surrogate."),e=65536+(e<<10)+(a.charCodeAt(d)-56320));128>e?b[c++]=e:(2048>e?b[c++]=e>>6|192:(65536>e?b[c++]=e>>12|224:(b[c++]=e>>18|240,b[c++]=e>>12&63|128),b[c++]=e>>6&63|128),b[c++]=e&63|128)}return b}function Nb(a){for(var b=0,c=0;c<a.length;c++){var d=a.charCodeAt(c);128>d?b++:2048>d?b+=2:55296<=d&&56319>=d?(b+=4,c++):b+=3}return b};function Ob(a){return"undefined"!==typeof JSON&&p(JSON.parse)?JSON.parse(a):za(a)}function B(a){if("undefined"!==typeof JSON&&p(JSON.stringify))a=JSON.stringify(a);else{var b=[];Ba(new Aa,a,b);a=b.join("")}return a};function Pb(a,b){this.committed=a;this.snapshot=b};function Qb(a){this.se=a;this.Bd=[];this.Rb=0;this.Yd=-1;this.Gb=null}function Rb(a,b,c){a.Yd=b;a.Gb=c;a.Yd<a.Rb&&(a.Gb(),a.Gb=null)}function Sb(a,b,c){for(a.Bd[b]=c;a.Bd[a.Rb];){var d=a.Bd[a.Rb];delete a.Bd[a.Rb];for(var e=0;e<d.length;++e)if(d[e]){var f=a;Tb(function(){f.se(d[e])})}if(a.Rb===a.Yd){a.Gb&&(clearTimeout(a.Gb),a.Gb(),a.Gb=null);break}a.Rb++}};function Ub(){this.qc={}}Ub.prototype.set=function(a,b){null==b?delete this.qc[a]:this.qc[a]=b};Ub.prototype.get=function(a){return Bb(this.qc,a)?this.qc[a]:null};Ub.prototype.remove=function(a){delete this.qc[a]};Ub.prototype.af=!0;function Vb(a){this.vc=a;this.Cd="firebase:"}g=Vb.prototype;g.set=function(a,b){null==b?this.vc.removeItem(this.Cd+a):this.vc.setItem(this.Cd+a,B(b))};g.get=function(a){a=this.vc.getItem(this.Cd+a);return null==a?null:Ob(a)};g.remove=function(a){this.vc.removeItem(this.Cd+a)};g.af=!1;g.toString=function(){return this.vc.toString()};function Wb(a){try{if("undefined"!==typeof window&&"undefined"!==typeof window[a]){var b=window[a];b.setItem("firebase:sentinel","cache");b.removeItem("firebase:sentinel");return new Vb(b)}}catch(c){}return new Ub}var Xb=Wb("localStorage"),Yb=Wb("sessionStorage");function Zb(a,b,c){this.type=$b;this.source=a;this.path=b;this.Ja=c}Zb.prototype.Nc=function(a){return this.path.e()?new Zb(this.source,C,this.Ja.R(a)):new Zb(this.source,D(this.path),this.Ja)};Zb.prototype.toString=function(){return"Operation("+this.path+": "+this.source.toString()+" overwrite: "+this.Ja.toString()+")"};function ac(a,b){this.type=bc;this.source=a;this.path=b}ac.prototype.Nc=function(){return this.path.e()?new ac(this.source,C):new ac(this.source,D(this.path))};ac.prototype.toString=function(){return"Operation("+this.path+": "+this.source.toString()+" listen_complete)"};function cc(a){this.Ge=a}cc.prototype.getToken=function(a){return this.Ge.INTERNAL.getToken(a).then(null,function(a){return a&&"auth/token-not-initialized"===a.code?(E("Got auth/token-not-initialized error.  Treating as null token."),null):Promise.reject(a)})};function dc(a,b){a.Ge.INTERNAL.addAuthTokenListener(b)};function ec(){this.Jd=F}ec.prototype.j=function(a){return this.Jd.Q(a)};ec.prototype.toString=function(){return this.Jd.toString()};function fc(a,b,c,d,e){this.host=a.toLowerCase();this.domain=this.host.substr(this.host.indexOf(".")+1);this.Sc=b;this.oe=c;this.zg=d;this.lf=e||"";this.ab=Xb.get("host:"+a)||this.host}function gc(a,b){b!==a.ab&&(a.ab=b,"s-"===a.ab.substr(0,2)&&Xb.set("host:"+a.host,a.ab))}
function hc(a,b,c){H("string"===typeof b,"typeof type must == string");H("object"===typeof c,"typeof params must == object");if("websocket"===b)b=(a.Sc?"wss://":"ws://")+a.ab+"/.ws?";else if("long_polling"===b)b=(a.Sc?"https://":"http://")+a.ab+"/.lp?";else throw Error("Unknown connection type: "+b);a.host!==a.ab&&(c.ns=a.oe);var d=[];t(c,function(a,b){d.push(b+"="+a)});return b+d.join("&")}
fc.prototype.toString=function(){var a=(this.Sc?"https://":"http://")+this.host;this.lf&&(a+="<"+this.lf+">");return a};function ic(a,b){this.xf={};this.Vc=new jc(a);this.va=b;var c=1E4+2E4*Math.random();setTimeout(r(this.pf,this),Math.floor(c))}ic.prototype.pf=function(){var a=this.Vc.get(),b={},c=!1,d;for(d in a)0<a[d]&&Bb(this.xf,d)&&(b[d]=a[d],c=!0);c&&this.va.xe(b);setTimeout(r(this.pf,this),Math.floor(6E5*Math.random()))};function kc(){this.uc={}}function lc(a,b,c){p(c)||(c=1);Bb(a.uc,b)||(a.uc[b]=0);a.uc[b]+=c}kc.prototype.get=function(){return ya(this.uc)};function jc(a){this.Lf=a;this.rd=null}jc.prototype.get=function(){var a=this.Lf.get(),b=ya(a);if(this.rd)for(var c in this.rd)b[c]-=this.rd[c];this.rd=a;return b};var mc={},nc={};function oc(a){a=a.toString();mc[a]||(mc[a]=new kc);return mc[a]}function pc(a,b){var c=a.toString();nc[c]||(nc[c]=b());return nc[c]};function qc(){this.wb=[]}function rc(a,b){for(var c=null,d=0;d<b.length;d++){var e=b[d],f=e.Zb();null===c||f.ca(c.Zb())||(a.wb.push(c),c=null);null===c&&(c=new sc(f));c.add(e)}c&&a.wb.push(c)}function tc(a,b,c){rc(a,c);uc(a,function(a){return a.ca(b)})}function vc(a,b,c){rc(a,c);uc(a,function(a){return a.contains(b)||b.contains(a)})}
function uc(a,b){for(var c=!0,d=0;d<a.wb.length;d++){var e=a.wb[d];if(e)if(e=e.Zb(),b(e)){for(var e=a.wb[d],f=0;f<e.hd.length;f++){var h=e.hd[f];if(null!==h){e.hd[f]=null;var k=h.Ub();wc&&E("event: "+h.toString());Tb(k)}}a.wb[d]=null}else c=!1}c&&(a.wb=[])}function sc(a){this.qa=a;this.hd=[]}sc.prototype.add=function(a){this.hd.push(a)};sc.prototype.Zb=function(){return this.qa};function xc(a,b,c,d){this.ae=b;this.Md=c;this.Dd=d;this.gd=a}xc.prototype.Zb=function(){var a=this.Md.xb();return"value"===this.gd?a.path:a.getParent().path};xc.prototype.ge=function(){return this.gd};xc.prototype.Ub=function(){return this.ae.Ub(this)};xc.prototype.toString=function(){return this.Zb().toString()+":"+this.gd+":"+B(this.Md.Se())};function yc(a,b,c){this.ae=a;this.error=b;this.path=c}yc.prototype.Zb=function(){return this.path};yc.prototype.ge=function(){return"cancel"};
yc.prototype.Ub=function(){return this.ae.Ub(this)};yc.prototype.toString=function(){return this.path.toString()+":cancel"};function zc(){}zc.prototype.Ve=function(){return null};zc.prototype.fe=function(){return null};var Ac=new zc;function Bc(a,b,c){this.Ef=a;this.Na=b;this.yd=c}Bc.prototype.Ve=function(a){var b=this.Na.O;if(Cc(b,a))return b.j().R(a);b=null!=this.yd?new Dc(this.yd,!0,!1):this.Na.u();return this.Ef.rc(a,b)};Bc.prototype.fe=function(a,b,c){var d=null!=this.yd?this.yd:Ec(this.Na);a=this.Ef.Xd(d,b,1,c,a);return 0===a.length?null:a[0]};function I(a,b,c,d){this.type=a;this.Ma=b;this.Ya=c;this.pe=d;this.Dd=void 0}function Fc(a){return new I(Gc,a)}var Gc="value";function Dc(a,b,c){this.A=a;this.ea=b;this.Tb=c}function Hc(a){return a.ea}function Ic(a){return a.Tb}function Jc(a,b){return b.e()?a.ea&&!a.Tb:Cc(a,J(b))}function Cc(a,b){return a.ea&&!a.Tb||a.A.Fa(b)}Dc.prototype.j=function(){return this.A};function Kc(a,b){return Lc(a.name,b.name)}function Mc(a,b){return Lc(a,b)};function K(a,b){this.name=a;this.S=b}function Nc(a,b){return new K(a,b)};function Oc(a,b){return a&&"object"===typeof a?(H(".sv"in a,"Unexpected leaf node or priority contents"),b[a[".sv"]]):a}function Pc(a,b){var c=new Qc;Rc(a,new L(""),function(a,e){Sc(c,a,Tc(e,b))});return c}function Tc(a,b){var c=a.C().H(),c=Oc(c,b),d;if(a.J()){var e=Oc(a.Ea(),b);return e!==a.Ea()||c!==a.C().H()?new Uc(e,M(c)):a}d=a;c!==a.C().H()&&(d=d.ga(new Uc(c)));a.P(N,function(a,c){var e=Tc(c,b);e!==c&&(d=d.U(a,e))});return d};var Vc=function(){var a=1;return function(){return a++}}(),H=Kb,Wc=Lb;
function Xc(a){try{var b;if("undefined"!==typeof atob)b=atob(a);else{bb();for(var c=$a,d=[],e=0;e<a.length;){var f=c[a.charAt(e++)],h=e<a.length?c[a.charAt(e)]:0;++e;var k=e<a.length?c[a.charAt(e)]:64;++e;var m=e<a.length?c[a.charAt(e)]:64;++e;if(null==f||null==h||null==k||null==m)throw Error();d.push(f<<2|h>>4);64!=k&&(d.push(h<<4&240|k>>2),64!=m&&d.push(k<<6&192|m))}if(8192>d.length)b=String.fromCharCode.apply(null,d);else{a="";for(c=0;c<d.length;c+=8192)a+=String.fromCharCode.apply(null,Ra(d,c,
c+8192));b=a}}return b}catch(l){E("base64Decode failed: ",l)}return null}function Yc(a){var b=Mb(a);a=new ma;a.update(b);var b=[],c=8*a.Pd;56>a.ac?a.update(a.zd,56-a.ac):a.update(a.zd,a.Xa-(a.ac-56));for(var d=a.Xa-1;56<=d;d--)a.Wd[d]=c&255,c/=256;na(a,a.Wd);for(d=c=0;5>d;d++)for(var e=24;0<=e;e-=8)b[c]=a.N[d]>>e&255,++c;return ab(b)}
function Zc(a){for(var b="",c=0;c<arguments.length;c++)b=ea(arguments[c])?b+Zc.apply(null,arguments[c]):"object"===typeof arguments[c]?b+B(arguments[c]):b+arguments[c],b+=" ";return b}var wc=null,$c=!0;
function ad(a,b){Kb(!b||!0===a||!1===a,"Can't turn on custom loggers persistently.");!0===a?("undefined"!==typeof console&&("function"===typeof console.log?wc=r(console.log,console):"object"===typeof console.log&&(wc=function(a){console.log(a)})),b&&Yb.set("logging_enabled",!0)):ga(a)?wc=a:(wc=null,Yb.remove("logging_enabled"))}function E(a){!0===$c&&($c=!1,null===wc&&!0===Yb.get("logging_enabled")&&ad(!0));if(wc){var b=Zc.apply(null,arguments);wc(b)}}
function bd(a){return function(){E(a,arguments)}}function cd(a){if("undefined"!==typeof console){var b="FIREBASE INTERNAL ERROR: "+Zc.apply(null,arguments);"undefined"!==typeof console.error?console.error(b):console.log(b)}}function dd(a){var b=Zc.apply(null,arguments);throw Error("FIREBASE FATAL ERROR: "+b);}function O(a){if("undefined"!==typeof console){var b="FIREBASE WARNING: "+Zc.apply(null,arguments);"undefined"!==typeof console.warn?console.warn(b):console.log(b)}}
function ed(a){var b,c,d,e,f,h=a;f=c=a=b="";d=!0;e="https";if(q(h)){var k=h.indexOf("//");0<=k&&(e=h.substring(0,k-1),h=h.substring(k+2));k=h.indexOf("/");-1===k&&(k=h.length);b=h.substring(0,k);f="";h=h.substring(k).split("/");for(k=0;k<h.length;k++)if(0<h[k].length){var m=h[k];try{m=decodeURIComponent(m.replace(/\+/g," "))}catch(l){}f+="/"+m}h=b.split(".");3===h.length?(a=h[1],c=h[0].toLowerCase()):2===h.length&&(a=h[0]);k=b.indexOf(":");0<=k&&(d="https"===e||"wss"===e)}"firebase"===a&&dd(b+" is no longer supported. Please use <YOUR FIREBASE>.firebaseio.com instead");
c&&"undefined"!=c||dd("Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com");d||"undefined"!==typeof window&&window.location&&window.location.protocol&&-1!==window.location.protocol.indexOf("https:")&&O("Insecure Firebase access from a secure page. Please use https in calls to new Firebase().");return{kc:new fc(b,d,c,"ws"===e||"wss"===e),path:new L(f)}}function fd(a){return fa(a)&&(a!=a||a==Number.POSITIVE_INFINITY||a==Number.NEGATIVE_INFINITY)}
function gd(a){if("complete"===document.readyState)a();else{var b=!1,c=function(){document.body?b||(b=!0,a()):setTimeout(c,Math.floor(10))};document.addEventListener?(document.addEventListener("DOMContentLoaded",c,!1),window.addEventListener("load",c,!1)):document.attachEvent&&(document.attachEvent("onreadystatechange",function(){"complete"===document.readyState&&c()}),window.attachEvent("onload",c))}}
function Lc(a,b){if(a===b)return 0;if("[MIN_NAME]"===a||"[MAX_NAME]"===b)return-1;if("[MIN_NAME]"===b||"[MAX_NAME]"===a)return 1;var c=hd(a),d=hd(b);return null!==c?null!==d?0==c-d?a.length-b.length:c-d:-1:null!==d?1:a<b?-1:1}function id(a,b){if(b&&a in b)return b[a];throw Error("Missing required key ("+a+") in object: "+B(b));}
function jd(a){if("object"!==typeof a||null===a)return B(a);var b=[],c;for(c in a)b.push(c);b.sort();c="{";for(var d=0;d<b.length;d++)0!==d&&(c+=","),c+=B(b[d]),c+=":",c+=jd(a[b[d]]);return c+"}"}function kd(a,b){if(a.length<=b)return[a];for(var c=[],d=0;d<a.length;d+=b)d+b>a?c.push(a.substring(d,a.length)):c.push(a.substring(d,d+b));return c}function ld(a,b){if(da(a))for(var c=0;c<a.length;++c)b(c,a[c]);else t(a,b)}
function md(a){H(!fd(a),"Invalid JSON number");var b,c,d,e;0===a?(d=c=0,b=-Infinity===1/a?1:0):(b=0>a,a=Math.abs(a),a>=Math.pow(2,-1022)?(d=Math.min(Math.floor(Math.log(a)/Math.LN2),1023),c=d+1023,d=Math.round(a*Math.pow(2,52-d)-Math.pow(2,52))):(c=0,d=Math.round(a/Math.pow(2,-1074))));e=[];for(a=52;a;--a)e.push(d%2?1:0),d=Math.floor(d/2);for(a=11;a;--a)e.push(c%2?1:0),c=Math.floor(c/2);e.push(b?1:0);e.reverse();b=e.join("");c="";for(a=0;64>a;a+=8)d=parseInt(b.substr(a,8),2).toString(16),1===d.length&&
(d="0"+d),c+=d;return c.toLowerCase()}var nd=/^-?\d{1,10}$/;function hd(a){return nd.test(a)&&(a=Number(a),-2147483648<=a&&2147483647>=a)?a:null}function Tb(a){try{a()}catch(b){setTimeout(function(){O("Exception was thrown by user callback.",b.stack||"");throw b;},Math.floor(0))}}function od(a,b,c){Object.defineProperty(a,b,{get:c})};function pd(a){var b={};try{var c=a.split(".");Ob(Xc(c[0])||"");b=Ob(Xc(c[1])||"");delete b.d}catch(d){}a=b;return"object"===typeof a&&!0===x(a,"admin")};var qd=null;"undefined"!==typeof MozWebSocket?qd=MozWebSocket:"undefined"!==typeof WebSocket&&(qd=WebSocket);function rd(a,b,c,d){this.Zd=a;this.f=bd(this.Zd);this.frames=this.Ac=null;this.qb=this.rb=this.Ee=0;this.Wa=oc(b);a={v:"5"};"undefined"!==typeof location&&location.href&&-1!==location.href.indexOf("firebaseio.com")&&(a.r="f");c&&(a.s=c);d&&(a.ls=d);this.Le=hc(b,"websocket",a)}var td;
rd.prototype.open=function(a,b){this.kb=b;this.fg=a;this.f("Websocket connecting to "+this.Le);this.xc=!1;Xb.set("previous_websocket_failure",!0);try{this.La=new qd(this.Le)}catch(c){this.f("Error instantiating WebSocket.");var d=c.message||c.data;d&&this.f(d);this.eb();return}var e=this;this.La.onopen=function(){e.f("Websocket connected.");e.xc=!0};this.La.onclose=function(){e.f("Websocket connection was disconnected.");e.La=null;e.eb()};this.La.onmessage=function(a){if(null!==e.La)if(a=a.data,e.qb+=
a.length,lc(e.Wa,"bytes_received",a.length),ud(e),null!==e.frames)vd(e,a);else{a:{H(null===e.frames,"We already have a frame buffer");if(6>=a.length){var b=Number(a);if(!isNaN(b)){e.Ee=b;e.frames=[];a=null;break a}}e.Ee=1;e.frames=[]}null!==a&&vd(e,a)}};this.La.onerror=function(a){e.f("WebSocket error.  Closing connection.");(a=a.message||a.data)&&e.f(a);e.eb()}};rd.prototype.start=function(){};
rd.isAvailable=function(){var a=!1;if("undefined"!==typeof navigator&&navigator.userAgent){var b=navigator.userAgent.match(/Android ([0-9]{0,}\.[0-9]{0,})/);b&&1<b.length&&4.4>parseFloat(b[1])&&(a=!0)}return!a&&null!==qd&&!td};rd.responsesRequiredToBeHealthy=2;rd.healthyTimeout=3E4;g=rd.prototype;g.sd=function(){Xb.remove("previous_websocket_failure")};function vd(a,b){a.frames.push(b);if(a.frames.length==a.Ee){var c=a.frames.join("");a.frames=null;c=Ob(c);a.fg(c)}}
g.send=function(a){ud(this);a=B(a);this.rb+=a.length;lc(this.Wa,"bytes_sent",a.length);a=kd(a,16384);1<a.length&&wd(this,String(a.length));for(var b=0;b<a.length;b++)wd(this,a[b])};g.Tc=function(){this.Bb=!0;this.Ac&&(clearInterval(this.Ac),this.Ac=null);this.La&&(this.La.close(),this.La=null)};g.eb=function(){this.Bb||(this.f("WebSocket is closing itself"),this.Tc(),this.kb&&(this.kb(this.xc),this.kb=null))};g.close=function(){this.Bb||(this.f("WebSocket is being closed"),this.Tc())};
function ud(a){clearInterval(a.Ac);a.Ac=setInterval(function(){a.La&&wd(a,"0");ud(a)},Math.floor(45E3))}function wd(a,b){try{a.La.send(b)}catch(c){a.f("Exception thrown from WebSocket.send():",c.message||c.data,"Closing connection."),setTimeout(r(a.eb,a),0)}};function xd(a,b,c){this.f=bd("p:rest:");this.M=a;this.Hb=b;this.Vd=c;this.$={}}function yd(a,b){if(p(b))return"tag$"+b;H(zd(a.n),"should have a tag if it's not a default query.");return a.path.toString()}g=xd.prototype;
g.bf=function(a,b,c,d){var e=a.path.toString();this.f("Listen called for "+e+" "+a.ya());var f=yd(a,c),h={};this.$[f]=h;a=Ad(a.n);var k=this;Bd(this,e+".json",a,function(a,b){var u=b;404===a&&(a=u=null);null===a&&k.Hb(e,u,!1,c);x(k.$,f)===h&&d(a?401==a?"permission_denied":"rest_error:"+a:"ok",null)})};g.Cf=function(a,b){var c=yd(a,b);delete this.$[c]};g.of=function(){};g.qe=function(){};g.ef=function(){};g.xd=function(){};g.put=function(){};g.cf=function(){};g.xe=function(){};
function Bd(a,b,c,d){c=c||{};c.format="export";a.Vd.getToken(!1).then(function(e){(e=e&&e.accessToken)&&(c.auth=e);var f=(a.M.Sc?"https://":"http://")+a.M.host+b+"?"+Fb(c);a.f("Sending REST request for "+f);var h=new XMLHttpRequest;h.onreadystatechange=function(){if(d&&4===h.readyState){a.f("REST Response for "+f+" received. status:",h.status,"response:",h.responseText);var b=null;if(200<=h.status&&300>h.status){try{b=Ob(h.responseText)}catch(c){O("Failed to parse JSON response for "+f+": "+h.responseText)}d(null,
b)}else 401!==h.status&&404!==h.status&&O("Got unsuccessful REST response for "+f+" Status: "+h.status),d(h.status);d=null}};h.open("GET",f,!0);h.send()})};function Cd(a,b,c){this.type=Dd;this.source=a;this.path=b;this.children=c}Cd.prototype.Nc=function(a){if(this.path.e())return a=this.children.subtree(new L(a)),a.e()?null:a.value?new Zb(this.source,C,a.value):new Cd(this.source,C,a);H(J(this.path)===a,"Can't get a merge for a child not on the path of the operation");return new Cd(this.source,D(this.path),this.children)};Cd.prototype.toString=function(){return"Operation("+this.path+": "+this.source.toString()+" merge: "+this.children.toString()+")"};function Ed(){this.hb={}}
function Fd(a,b){var c=b.type,d=b.Ya;H("child_added"==c||"child_changed"==c||"child_removed"==c,"Only child changes supported for tracking");H(".priority"!==d,"Only non-priority child changes can be tracked.");var e=x(a.hb,d);if(e){var f=e.type;if("child_added"==c&&"child_removed"==f)a.hb[d]=new I("child_changed",b.Ma,d,e.Ma);else if("child_removed"==c&&"child_added"==f)delete a.hb[d];else if("child_removed"==c&&"child_changed"==f)a.hb[d]=new I("child_removed",e.pe,d);else if("child_changed"==c&&
"child_added"==f)a.hb[d]=new I("child_added",b.Ma,d);else if("child_changed"==c&&"child_changed"==f)a.hb[d]=new I("child_changed",b.Ma,d,e.pe);else throw Wc("Illegal combination of changes: "+b+" occurred after "+e);}else a.hb[d]=b};function Gd(a){this.W=a;this.g=a.n.g}function Hd(a,b,c,d){var e=[],f=[];Ja(b,function(b){"child_changed"===b.type&&a.g.nd(b.pe,b.Ma)&&f.push(new I("child_moved",b.Ma,b.Ya))});Id(a,e,"child_removed",b,d,c);Id(a,e,"child_added",b,d,c);Id(a,e,"child_moved",f,d,c);Id(a,e,"child_changed",b,d,c);Id(a,e,Gc,b,d,c);return e}function Id(a,b,c,d,e,f){d=Ka(d,function(a){return a.type===c});Sa(d,r(a.Mf,a));Ja(d,function(c){var d=Jd(a,c,f);Ja(e,function(e){e.rf(c.type)&&b.push(e.createEvent(d,a.W))})})}
function Jd(a,b,c){"value"!==b.type&&"child_removed"!==b.type&&(b.Dd=c.Xe(b.Ya,b.Ma,a.g));return b}Gd.prototype.Mf=function(a,b){if(null==a.Ya||null==b.Ya)throw Wc("Should only compare child_ events.");return this.g.compare(new K(a.Ya,a.Ma),new K(b.Ya,b.Ma))};function Kd(a,b){this.Sd=a;this.Kf=b}function Ld(a){this.V=a}
Ld.prototype.gb=function(a,b,c,d){var e=new Ed,f;if(b.type===$b)b.source.ee?c=Md(this,a,b.path,b.Ja,c,d,e):(H(b.source.Ue,"Unknown source."),f=b.source.De||Ic(a.u())&&!b.path.e(),c=Nd(this,a,b.path,b.Ja,c,d,f,e));else if(b.type===Dd)b.source.ee?c=Od(this,a,b.path,b.children,c,d,e):(H(b.source.Ue,"Unknown source."),f=b.source.De||Ic(a.u()),c=Pd(this,a,b.path,b.children,c,d,f,e));else if(b.type===Qd)if(b.Id)if(b=b.path,null!=c.mc(b))c=a;else{f=new Bc(c,a,d);d=a.O.j();if(b.e()||".priority"===J(b))Hc(a.u())?
b=c.Ba(Ec(a)):(b=a.u().j(),H(b instanceof P,"serverChildren would be complete if leaf node"),b=c.sc(b)),b=this.V.za(d,b,e);else{var h=J(b),k=c.rc(h,a.u());null==k&&Cc(a.u(),h)&&(k=d.R(h));b=null!=k?this.V.F(d,h,k,D(b),f,e):a.O.j().Fa(h)?this.V.F(d,h,F,D(b),f,e):d;b.e()&&Hc(a.u())&&(d=c.Ba(Ec(a)),d.J()&&(b=this.V.za(b,d,e)))}d=Hc(a.u())||null!=c.mc(C);c=Rd(a,b,d,this.V.Qa())}else c=Sd(this,a,b.path,b.Pb,c,d,e);else if(b.type===bc)d=b.path,b=a.u(),f=b.j(),h=b.ea||d.e(),c=Td(this,new Ud(a.O,new Dc(f,
h,b.Tb)),d,c,Ac,e);else throw Wc("Unknown operation type: "+b.type);e=sa(e.hb);d=c;b=d.O;b.ea&&(f=b.j().J()||b.j().e(),h=Vd(a),(0<e.length||!a.O.ea||f&&!b.j().ca(h)||!b.j().C().ca(h.C()))&&e.push(Fc(Vd(d))));return new Kd(c,e)};
function Td(a,b,c,d,e,f){var h=b.O;if(null!=d.mc(c))return b;var k;if(c.e())H(Hc(b.u()),"If change path is empty, we must have complete server data"),Ic(b.u())?(e=Ec(b),d=d.sc(e instanceof P?e:F)):d=d.Ba(Ec(b)),f=a.V.za(b.O.j(),d,f);else{var m=J(c);if(".priority"==m)H(1==Wd(c),"Can't have a priority with additional path components"),f=h.j(),k=b.u().j(),d=d.$c(c,f,k),f=null!=d?a.V.ga(f,d):h.j();else{var l=D(c);Cc(h,m)?(k=b.u().j(),d=d.$c(c,h.j(),k),d=null!=d?h.j().R(m).F(l,d):h.j().R(m)):d=d.rc(m,
b.u());f=null!=d?a.V.F(h.j(),m,d,l,e,f):h.j()}}return Rd(b,f,h.ea||c.e(),a.V.Qa())}function Nd(a,b,c,d,e,f,h,k){var m=b.u();h=h?a.V:a.V.Vb();if(c.e())d=h.za(m.j(),d,null);else if(h.Qa()&&!m.Tb)d=m.j().F(c,d),d=h.za(m.j(),d,null);else{var l=J(c);if(!Jc(m,c)&&1<Wd(c))return b;var u=D(c);d=m.j().R(l).F(u,d);d=".priority"==l?h.ga(m.j(),d):h.F(m.j(),l,d,u,Ac,null)}m=m.ea||c.e();b=new Ud(b.O,new Dc(d,m,h.Qa()));return Td(a,b,c,e,new Bc(e,b,f),k)}
function Md(a,b,c,d,e,f,h){var k=b.O;e=new Bc(e,b,f);if(c.e())h=a.V.za(b.O.j(),d,h),a=Rd(b,h,!0,a.V.Qa());else if(f=J(c),".priority"===f)h=a.V.ga(b.O.j(),d),a=Rd(b,h,k.ea,k.Tb);else{c=D(c);var m=k.j().R(f);if(!c.e()){var l=e.Ve(f);d=null!=l?".priority"===Xd(c)&&l.Q(c.parent()).e()?l:l.F(c,d):F}m.ca(d)?a=b:(h=a.V.F(k.j(),f,d,c,e,h),a=Rd(b,h,k.ea,a.V.Qa()))}return a}
function Od(a,b,c,d,e,f,h){var k=b;Yd(d,function(d,l){var u=c.m(d);Cc(b.O,J(u))&&(k=Md(a,k,u,l,e,f,h))});Yd(d,function(d,l){var u=c.m(d);Cc(b.O,J(u))||(k=Md(a,k,u,l,e,f,h))});return k}function Zd(a,b){Yd(b,function(b,d){a=a.F(b,d)});return a}
function Pd(a,b,c,d,e,f,h,k){if(b.u().j().e()&&!Hc(b.u()))return b;var m=b;c=c.e()?d:$d(Q,c,d);var l=b.u().j();c.children.ia(function(c,d){if(l.Fa(c)){var G=b.u().j().R(c),G=Zd(G,d);m=Nd(a,m,new L(c),G,e,f,h,k)}});c.children.ia(function(c,d){var G=!Cc(b.u(),c)&&null==d.value;l.Fa(c)||G||(G=b.u().j().R(c),G=Zd(G,d),m=Nd(a,m,new L(c),G,e,f,h,k))});return m}
function Sd(a,b,c,d,e,f,h){if(null!=e.mc(c))return b;var k=Ic(b.u()),m=b.u();if(null!=d.value){if(c.e()&&m.ea||Jc(m,c))return Nd(a,b,c,m.j().Q(c),e,f,k,h);if(c.e()){var l=Q;m.j().P(ae,function(a,b){l=l.set(new L(a),b)});return Pd(a,b,c,l,e,f,k,h)}return b}l=Q;Yd(d,function(a){var b=c.m(a);Jc(m,b)&&(l=l.set(a,m.j().Q(b)))});return Pd(a,b,c,l,e,f,k,h)};function be(a){this.g=a}g=be.prototype;g.F=function(a,b,c,d,e,f){H(a.zc(this.g),"A node must be indexed if only a child is updated");e=a.R(b);if(e.Q(d).ca(c.Q(d))&&e.e()==c.e())return a;null!=f&&(c.e()?a.Fa(b)?Fd(f,new I("child_removed",e,b)):H(a.J(),"A child remove without an old child only makes sense on a leaf node"):e.e()?Fd(f,new I("child_added",c,b)):Fd(f,new I("child_changed",c,b,e)));return a.J()&&c.e()?a:a.U(b,c).ob(this.g)};
g.za=function(a,b,c){null!=c&&(a.J()||a.P(N,function(a,e){b.Fa(a)||Fd(c,new I("child_removed",e,a))}),b.J()||b.P(N,function(b,e){if(a.Fa(b)){var f=a.R(b);f.ca(e)||Fd(c,new I("child_changed",e,b,f))}else Fd(c,new I("child_added",e,b))}));return b.ob(this.g)};g.ga=function(a,b){return a.e()?F:a.ga(b)};g.Qa=function(){return!1};g.Vb=function(){return this};function ce(a){this.he=new be(a.g);this.g=a.g;var b;a.ka?(b=de(a),b=a.g.Fc(ee(a),b)):b=a.g.Ic();this.Uc=b;a.na?(b=fe(a),a=a.g.Fc(ge(a),b)):a=a.g.Gc();this.wc=a}g=ce.prototype;g.matches=function(a){return 0>=this.g.compare(this.Uc,a)&&0>=this.g.compare(a,this.wc)};g.F=function(a,b,c,d,e,f){this.matches(new K(b,c))||(c=F);return this.he.F(a,b,c,d,e,f)};
g.za=function(a,b,c){b.J()&&(b=F);var d=b.ob(this.g),d=d.ga(F),e=this;b.P(N,function(a,b){e.matches(new K(a,b))||(d=d.U(a,F))});return this.he.za(a,d,c)};g.ga=function(a){return a};g.Qa=function(){return!0};g.Vb=function(){return this.he};function he(a){this.sa=new ce(a);this.g=a.g;H(a.xa,"Only valid if limit has been set");this.oa=a.oa;this.Jb=!ie(a)}g=he.prototype;g.F=function(a,b,c,d,e,f){this.sa.matches(new K(b,c))||(c=F);return a.R(b).ca(c)?a:a.Fb()<this.oa?this.sa.Vb().F(a,b,c,d,e,f):je(this,a,b,c,e,f)};
g.za=function(a,b,c){var d;if(b.J()||b.e())d=F.ob(this.g);else if(2*this.oa<b.Fb()&&b.zc(this.g)){d=F.ob(this.g);b=this.Jb?b.$b(this.sa.wc,this.g):b.Yb(this.sa.Uc,this.g);for(var e=0;0<b.Sa.length&&e<this.oa;){var f=R(b),h;if(h=this.Jb?0>=this.g.compare(this.sa.Uc,f):0>=this.g.compare(f,this.sa.wc))d=d.U(f.name,f.S),e++;else break}}else{d=b.ob(this.g);d=d.ga(F);var k,m,l;if(this.Jb){b=d.Ye(this.g);k=this.sa.wc;m=this.sa.Uc;var u=ke(this.g);l=function(a,b){return u(b,a)}}else b=d.Xb(this.g),k=this.sa.Uc,
m=this.sa.wc,l=ke(this.g);for(var e=0,z=!1;0<b.Sa.length;)f=R(b),!z&&0>=l(k,f)&&(z=!0),(h=z&&e<this.oa&&0>=l(f,m))?e++:d=d.U(f.name,F)}return this.sa.Vb().za(a,d,c)};g.ga=function(a){return a};g.Qa=function(){return!0};g.Vb=function(){return this.sa.Vb()};
function je(a,b,c,d,e,f){var h;if(a.Jb){var k=ke(a.g);h=function(a,b){return k(b,a)}}else h=ke(a.g);H(b.Fb()==a.oa,"");var m=new K(c,d),l=a.Jb?le(b,a.g):me(b,a.g),u=a.sa.matches(m);if(b.Fa(c)){for(var z=b.R(c),l=e.fe(a.g,l,a.Jb);null!=l&&(l.name==c||b.Fa(l.name));)l=e.fe(a.g,l,a.Jb);e=null==l?1:h(l,m);if(u&&!d.e()&&0<=e)return null!=f&&Fd(f,new I("child_changed",d,c,z)),b.U(c,d);null!=f&&Fd(f,new I("child_removed",z,c));b=b.U(c,F);return null!=l&&a.sa.matches(l)?(null!=f&&Fd(f,new I("child_added",
l.S,l.name)),b.U(l.name,l.S)):b}return d.e()?b:u&&0<=h(l,m)?(null!=f&&(Fd(f,new I("child_removed",l.S,l.name)),Fd(f,new I("child_added",d,c))),b.U(c,d).U(l.name,F)):b};function Uc(a,b){this.B=a;H(p(this.B)&&null!==this.B,"LeafNode shouldn't be created with null/undefined value.");this.aa=b||F;ne(this.aa);this.Eb=null}var oe=["object","boolean","number","string"];g=Uc.prototype;g.J=function(){return!0};g.C=function(){return this.aa};g.ga=function(a){return new Uc(this.B,a)};g.R=function(a){return".priority"===a?this.aa:F};g.Q=function(a){return a.e()?this:".priority"===J(a)?this.aa:F};g.Fa=function(){return!1};g.Xe=function(){return null};
g.U=function(a,b){return".priority"===a?this.ga(b):b.e()&&".priority"!==a?this:F.U(a,b).ga(this.aa)};g.F=function(a,b){var c=J(a);if(null===c)return b;if(b.e()&&".priority"!==c)return this;H(".priority"!==c||1===Wd(a),".priority must be the last token in a path");return this.U(c,F.F(D(a),b))};g.e=function(){return!1};g.Fb=function(){return 0};g.P=function(){return!1};g.H=function(a){return a&&!this.C().e()?{".value":this.Ea(),".priority":this.C().H()}:this.Ea()};
g.hash=function(){if(null===this.Eb){var a="";this.aa.e()||(a+="priority:"+pe(this.aa.H())+":");var b=typeof this.B,a=a+(b+":"),a="number"===b?a+md(this.B):a+this.B;this.Eb=Yc(a)}return this.Eb};g.Ea=function(){return this.B};g.tc=function(a){if(a===F)return 1;if(a instanceof P)return-1;H(a.J(),"Unknown node type");var b=typeof a.B,c=typeof this.B,d=Ia(oe,b),e=Ia(oe,c);H(0<=d,"Unknown leaf type: "+b);H(0<=e,"Unknown leaf type: "+c);return d===e?"object"===c?0:this.B<a.B?-1:this.B===a.B?0:1:e-d};
g.ob=function(){return this};g.zc=function(){return!0};g.ca=function(a){return a===this?!0:a.J()?this.B===a.B&&this.aa.ca(a.aa):!1};g.toString=function(){return B(this.H(!0))};function qe(){}var re={};function ke(a){return r(a.compare,a)}qe.prototype.nd=function(a,b){return 0!==this.compare(new K("[MIN_NAME]",a),new K("[MIN_NAME]",b))};qe.prototype.Ic=function(){return se};function te(a){H(!a.e()&&".priority"!==J(a),"Can't create PathIndex with empty path or .priority key");this.cc=a}ka(te,qe);g=te.prototype;g.yc=function(a){return!a.Q(this.cc).e()};g.compare=function(a,b){var c=a.S.Q(this.cc),d=b.S.Q(this.cc),c=c.tc(d);return 0===c?Lc(a.name,b.name):c};
g.Fc=function(a,b){var c=M(a),c=F.F(this.cc,c);return new K(b,c)};g.Gc=function(){var a=F.F(this.cc,ue);return new K("[MAX_NAME]",a)};g.toString=function(){return this.cc.slice().join("/")};function ve(){}ka(ve,qe);g=ve.prototype;g.compare=function(a,b){var c=a.S.C(),d=b.S.C(),c=c.tc(d);return 0===c?Lc(a.name,b.name):c};g.yc=function(a){return!a.C().e()};g.nd=function(a,b){return!a.C().ca(b.C())};g.Ic=function(){return se};g.Gc=function(){return new K("[MAX_NAME]",new Uc("[PRIORITY-POST]",ue))};
g.Fc=function(a,b){var c=M(a);return new K(b,new Uc("[PRIORITY-POST]",c))};g.toString=function(){return".priority"};var N=new ve;function we(){}ka(we,qe);g=we.prototype;g.compare=function(a,b){return Lc(a.name,b.name)};g.yc=function(){throw Wc("KeyIndex.isDefinedOn not expected to be called.");};g.nd=function(){return!1};g.Ic=function(){return se};g.Gc=function(){return new K("[MAX_NAME]",F)};g.Fc=function(a){H(q(a),"KeyIndex indexValue must always be a string.");return new K(a,F)};g.toString=function(){return".key"};
var ae=new we;function xe(){}ka(xe,qe);g=xe.prototype;g.compare=function(a,b){var c=a.S.tc(b.S);return 0===c?Lc(a.name,b.name):c};g.yc=function(){return!0};g.nd=function(a,b){return!a.ca(b)};g.Ic=function(){return se};g.Gc=function(){return ye};g.Fc=function(a,b){var c=M(a);return new K(b,c)};g.toString=function(){return".value"};var ze=new xe;function Ae(){this.Sb=this.na=this.Lb=this.ka=this.xa=!1;this.oa=0;this.oc="";this.ec=null;this.Ab="";this.bc=null;this.yb="";this.g=N}var Be=new Ae;function ie(a){return""===a.oc?a.ka:"l"===a.oc}function ee(a){H(a.ka,"Only valid if start has been set");return a.ec}function de(a){H(a.ka,"Only valid if start has been set");return a.Lb?a.Ab:"[MIN_NAME]"}function ge(a){H(a.na,"Only valid if end has been set");return a.bc}
function fe(a){H(a.na,"Only valid if end has been set");return a.Sb?a.yb:"[MAX_NAME]"}function Ce(a){var b=new Ae;b.xa=a.xa;b.oa=a.oa;b.ka=a.ka;b.ec=a.ec;b.Lb=a.Lb;b.Ab=a.Ab;b.na=a.na;b.bc=a.bc;b.Sb=a.Sb;b.yb=a.yb;b.g=a.g;return b}g=Ae.prototype;g.me=function(a){var b=Ce(this);b.xa=!0;b.oa=a;b.oc="l";return b};g.ne=function(a){var b=Ce(this);b.xa=!0;b.oa=a;b.oc="r";return b};g.Nd=function(a,b){var c=Ce(this);c.ka=!0;p(a)||(a=null);c.ec=a;null!=b?(c.Lb=!0,c.Ab=b):(c.Lb=!1,c.Ab="");return c};
g.fd=function(a,b){var c=Ce(this);c.na=!0;p(a)||(a=null);c.bc=a;p(b)?(c.Sb=!0,c.yb=b):(c.Dg=!1,c.yb="");return c};function De(a,b){var c=Ce(a);c.g=b;return c}function Ee(a){var b={};a.ka&&(b.sp=a.ec,a.Lb&&(b.sn=a.Ab));a.na&&(b.ep=a.bc,a.Sb&&(b.en=a.yb));if(a.xa){b.l=a.oa;var c=a.oc;""===c&&(c=ie(a)?"l":"r");b.vf=c}a.g!==N&&(b.i=a.g.toString());return b}function S(a){return!(a.ka||a.na||a.xa)}function zd(a){return S(a)&&a.g==N}
function Ad(a){var b={};if(zd(a))return b;var c;a.g===N?c="$priority":a.g===ze?c="$value":a.g===ae?c="$key":(H(a.g instanceof te,"Unrecognized index type!"),c=a.g.toString());b.orderBy=B(c);a.ka&&(b.startAt=B(a.ec),a.Lb&&(b.startAt+=","+B(a.Ab)));a.na&&(b.endAt=B(a.bc),a.Sb&&(b.endAt+=","+B(a.yb)));a.xa&&(ie(a)?b.limitToFirst=a.oa:b.limitToLast=a.oa);return b}g.toString=function(){return B(Ee(this))};function Fe(a,b){this.od=a;this.dc=b}Fe.prototype.get=function(a){var b=x(this.od,a);if(!b)throw Error("No index defined for "+a);return b===re?null:b};function Ge(a,b,c){var d=oa(a.od,function(d,f){var h=x(a.dc,f);H(h,"Missing index implementation for "+f);if(d===re){if(h.yc(b.S)){for(var k=[],m=c.Xb(Nc),l=R(m);l;)l.name!=b.name&&k.push(l),l=R(m);k.push(b);return He(k,ke(h))}return re}h=c.get(b.name);k=d;h&&(k=k.remove(new K(b.name,h)));return k.Ra(b,b.S)});return new Fe(d,a.dc)}
function Ie(a,b,c){var d=oa(a.od,function(a){if(a===re)return a;var d=c.get(b.name);return d?a.remove(new K(b.name,d)):a});return new Fe(d,a.dc)}var Je=new Fe({".priority":re},{".priority":N});function Ke(){this.set={}}g=Ke.prototype;g.add=function(a,b){this.set[a]=null!==b?b:!0};g.contains=function(a){return Bb(this.set,a)};g.get=function(a){return this.contains(a)?this.set[a]:void 0};g.remove=function(a){delete this.set[a]};g.clear=function(){this.set={}};g.e=function(){return xa(this.set)};g.count=function(){return qa(this.set)};function Le(a,b){t(a.set,function(a,d){b(d,a)})}g.keys=function(){var a=[];t(this.set,function(b,c){a.push(c)});return a};function Me(a,b,c,d){this.Zd=a;this.f=bd(a);this.kc=b;this.qb=this.rb=0;this.Wa=oc(b);this.zf=c;this.xc=!1;this.Db=d;this.Yc=function(a){return hc(b,"long_polling",a)}}var Ne,Oe;
Me.prototype.open=function(a,b){this.Oe=0;this.ja=b;this.df=new Qb(a);this.Bb=!1;var c=this;this.tb=setTimeout(function(){c.f("Timed out trying to connect.");c.eb();c.tb=null},Math.floor(3E4));gd(function(){if(!c.Bb){c.Va=new Pe(function(a,b,d,k,m){Qe(c,arguments);if(c.Va)if(c.tb&&(clearTimeout(c.tb),c.tb=null),c.xc=!0,"start"==a)c.id=b,c.kf=d;else if("close"===a)b?(c.Va.Kd=!1,Rb(c.df,b,function(){c.eb()})):c.eb();else throw Error("Unrecognized command received: "+a);},function(a,b){Qe(c,arguments);
Sb(c.df,a,b)},function(){c.eb()},c.Yc);var a={start:"t"};a.ser=Math.floor(1E8*Math.random());c.Va.Qd&&(a.cb=c.Va.Qd);a.v="5";c.zf&&(a.s=c.zf);c.Db&&(a.ls=c.Db);"undefined"!==typeof location&&location.href&&-1!==location.href.indexOf("firebaseio.com")&&(a.r="f");a=c.Yc(a);c.f("Connecting via long-poll to "+a);Re(c.Va,a,function(){})}})};
Me.prototype.start=function(){var a=this.Va,b=this.kf;a.dg=this.id;a.eg=b;for(a.Ud=!0;Se(a););a=this.id;b=this.kf;this.gc=document.createElement("iframe");var c={dframe:"t"};c.id=a;c.pw=b;this.gc.src=this.Yc(c);this.gc.style.display="none";document.body.appendChild(this.gc)};
Me.isAvailable=function(){return Ne||!Oe&&"undefined"!==typeof document&&null!=document.createElement&&!("object"===typeof window&&window.chrome&&window.chrome.extension&&!/^chrome/.test(window.location.href))&&!("object"===typeof Windows&&"object"===typeof Windows.Ag)&&!0};g=Me.prototype;g.sd=function(){};g.Tc=function(){this.Bb=!0;this.Va&&(this.Va.close(),this.Va=null);this.gc&&(document.body.removeChild(this.gc),this.gc=null);this.tb&&(clearTimeout(this.tb),this.tb=null)};
g.eb=function(){this.Bb||(this.f("Longpoll is closing itself"),this.Tc(),this.ja&&(this.ja(this.xc),this.ja=null))};g.close=function(){this.Bb||(this.f("Longpoll is being closed."),this.Tc())};g.send=function(a){a=B(a);this.rb+=a.length;lc(this.Wa,"bytes_sent",a.length);a=Mb(a);a=ab(a,!0);a=kd(a,1840);for(var b=0;b<a.length;b++){var c=this.Va;c.Qc.push({sg:this.Oe,yg:a.length,Qe:a[b]});c.Ud&&Se(c);this.Oe++}};function Qe(a,b){var c=B(b).length;a.qb+=c;lc(a.Wa,"bytes_received",c)}
function Pe(a,b,c,d){this.Yc=d;this.kb=c;this.ue=new Ke;this.Qc=[];this.$d=Math.floor(1E8*Math.random());this.Kd=!0;this.Qd=Vc();window["pLPCommand"+this.Qd]=a;window["pRTLPCB"+this.Qd]=b;a=document.createElement("iframe");a.style.display="none";if(document.body){document.body.appendChild(a);try{a.contentWindow.document||E("No IE domain setting required")}catch(e){a.src="javascript:void((function(){document.open();document.domain='"+document.domain+"';document.close();})())"}}else throw"Document body has not initialized. Wait to initialize Firebase until after the document is ready.";
a.contentDocument?a.ib=a.contentDocument:a.contentWindow?a.ib=a.contentWindow.document:a.document&&(a.ib=a.document);this.Ga=a;a="";this.Ga.src&&"javascript:"===this.Ga.src.substr(0,11)&&(a='<script>document.domain="'+document.domain+'";\x3c/script>');a="<html><body>"+a+"</body></html>";try{this.Ga.ib.open(),this.Ga.ib.write(a),this.Ga.ib.close()}catch(f){E("frame writing exception"),f.stack&&E(f.stack),E(f)}}
Pe.prototype.close=function(){this.Ud=!1;if(this.Ga){this.Ga.ib.body.innerHTML="";var a=this;setTimeout(function(){null!==a.Ga&&(document.body.removeChild(a.Ga),a.Ga=null)},Math.floor(0))}var b=this.kb;b&&(this.kb=null,b())};
function Se(a){if(a.Ud&&a.Kd&&a.ue.count()<(0<a.Qc.length?2:1)){a.$d++;var b={};b.id=a.dg;b.pw=a.eg;b.ser=a.$d;for(var b=a.Yc(b),c="",d=0;0<a.Qc.length;)if(1870>=a.Qc[0].Qe.length+30+c.length){var e=a.Qc.shift(),c=c+"&seg"+d+"="+e.sg+"&ts"+d+"="+e.yg+"&d"+d+"="+e.Qe;d++}else break;Te(a,b+c,a.$d);return!0}return!1}function Te(a,b,c){function d(){a.ue.remove(c);Se(a)}a.ue.add(c,1);var e=setTimeout(d,Math.floor(25E3));Re(a,b,function(){clearTimeout(e);d()})}
function Re(a,b,c){setTimeout(function(){try{if(a.Kd){var d=a.Ga.ib.createElement("script");d.type="text/javascript";d.async=!0;d.src=b;d.onload=d.onreadystatechange=function(){var a=d.readyState;a&&"loaded"!==a&&"complete"!==a||(d.onload=d.onreadystatechange=null,d.parentNode&&d.parentNode.removeChild(d),c())};d.onerror=function(){E("Long-poll script failed to load: "+b);a.Kd=!1;a.close()};a.Ga.ib.body.appendChild(d)}}catch(e){}},Math.floor(1))};function Ue(a){Ve(this,a)}var We=[Me,rd];function Ve(a,b){var c=rd&&rd.isAvailable(),d=c&&!(Xb.af||!0===Xb.get("previous_websocket_failure"));b.zg&&(c||O("wss:// URL used, but browser isn't known to support websockets.  Trying anyway."),d=!0);if(d)a.Wc=[rd];else{var e=a.Wc=[];ld(We,function(a,b){b&&b.isAvailable()&&e.push(b)})}}function Xe(a){if(0<a.Wc.length)return a.Wc[0];throw Error("No transports available");};function Ye(a,b,c,d,e,f,h){this.id=a;this.f=bd("c:"+this.id+":");this.se=c;this.Mc=d;this.ja=e;this.re=f;this.M=b;this.Ad=[];this.Me=0;this.yf=new Ue(b);this.L=0;this.Db=h;this.f("Connection created");Ze(this)}
function Ze(a){var b=Xe(a.yf);a.I=new b("c:"+a.id+":"+a.Me++,a.M,void 0,a.Db);a.we=b.responsesRequiredToBeHealthy||0;var c=$e(a,a.I),d=af(a,a.I);a.Xc=a.I;a.Rc=a.I;a.D=null;a.Cb=!1;setTimeout(function(){a.I&&a.I.open(c,d)},Math.floor(0));b=b.healthyTimeout||0;0<b&&(a.md=setTimeout(function(){a.md=null;a.Cb||(a.I&&102400<a.I.qb?(a.f("Connection exceeded healthy timeout but has received "+a.I.qb+" bytes.  Marking connection healthy."),a.Cb=!0,a.I.sd()):a.I&&10240<a.I.rb?a.f("Connection exceeded healthy timeout but has sent "+
a.I.rb+" bytes.  Leaving connection alive."):(a.f("Closing unhealthy connection after timeout."),a.close()))},Math.floor(b)))}function af(a,b){return function(c){b===a.I?(a.I=null,c||0!==a.L?1===a.L&&a.f("Realtime connection lost."):(a.f("Realtime connection failed."),"s-"===a.M.ab.substr(0,2)&&(Xb.remove("host:"+a.M.host),a.M.ab=a.M.host)),a.close()):b===a.D?(a.f("Secondary connection lost."),c=a.D,a.D=null,a.Xc!==c&&a.Rc!==c||a.close()):a.f("closing an old connection")}}
function $e(a,b){return function(c){if(2!=a.L)if(b===a.Rc){var d=id("t",c);c=id("d",c);if("c"==d){if(d=id("t",c),"d"in c)if(c=c.d,"h"===d){var d=c.ts,e=c.v,f=c.h;a.wf=c.s;gc(a.M,f);0==a.L&&(a.I.start(),bf(a,a.I,d),"5"!==e&&O("Protocol version mismatch detected"),c=a.yf,(c=1<c.Wc.length?c.Wc[1]:null)&&cf(a,c))}else if("n"===d){a.f("recvd end transmission on primary");a.Rc=a.D;for(c=0;c<a.Ad.length;++c)a.wd(a.Ad[c]);a.Ad=[];df(a)}else"s"===d?(a.f("Connection shutdown command received. Shutting down..."),
a.re&&(a.re(c),a.re=null),a.ja=null,a.close()):"r"===d?(a.f("Reset packet received.  New host: "+c),gc(a.M,c),1===a.L?a.close():(ef(a),Ze(a))):"e"===d?cd("Server Error: "+c):"o"===d?(a.f("got pong on primary."),ff(a),gf(a)):cd("Unknown control packet command: "+d)}else"d"==d&&a.wd(c)}else if(b===a.D)if(d=id("t",c),c=id("d",c),"c"==d)"t"in c&&(c=c.t,"a"===c?hf(a):"r"===c?(a.f("Got a reset on secondary, closing it"),a.D.close(),a.Xc!==a.D&&a.Rc!==a.D||a.close()):"o"===c&&(a.f("got pong on secondary."),
a.uf--,hf(a)));else if("d"==d)a.Ad.push(c);else throw Error("Unknown protocol layer: "+d);else a.f("message on old connection")}}Ye.prototype.ua=function(a){jf(this,{t:"d",d:a})};function df(a){a.Xc===a.D&&a.Rc===a.D&&(a.f("cleaning up and promoting a connection: "+a.D.Zd),a.I=a.D,a.D=null)}
function hf(a){0>=a.uf?(a.f("Secondary connection is healthy."),a.Cb=!0,a.D.sd(),a.D.start(),a.f("sending client ack on secondary"),a.D.send({t:"c",d:{t:"a",d:{}}}),a.f("Ending transmission on primary"),a.I.send({t:"c",d:{t:"n",d:{}}}),a.Xc=a.D,df(a)):(a.f("sending ping on secondary."),a.D.send({t:"c",d:{t:"p",d:{}}}))}Ye.prototype.wd=function(a){ff(this);this.se(a)};function ff(a){a.Cb||(a.we--,0>=a.we&&(a.f("Primary connection is healthy."),a.Cb=!0,a.I.sd()))}
function cf(a,b){a.D=new b("c:"+a.id+":"+a.Me++,a.M,a.wf);a.uf=b.responsesRequiredToBeHealthy||0;a.D.open($e(a,a.D),af(a,a.D));setTimeout(function(){a.D&&(a.f("Timed out trying to upgrade."),a.D.close())},Math.floor(6E4))}function bf(a,b,c){a.f("Realtime connection established.");a.I=b;a.L=1;a.Mc&&(a.Mc(c,a.wf),a.Mc=null);0===a.we?(a.f("Primary connection is healthy."),a.Cb=!0):setTimeout(function(){gf(a)},Math.floor(5E3))}
function gf(a){a.Cb||1!==a.L||(a.f("sending ping on primary."),jf(a,{t:"c",d:{t:"p",d:{}}}))}function jf(a,b){if(1!==a.L)throw"Connection is not connected";a.Xc.send(b)}Ye.prototype.close=function(){2!==this.L&&(this.f("Closing realtime connection."),this.L=2,ef(this),this.ja&&(this.ja(),this.ja=null))};function ef(a){a.f("Shutting down all connections");a.I&&(a.I.close(),a.I=null);a.D&&(a.D.close(),a.D=null);a.md&&(clearTimeout(a.md),a.md=null)};function L(a,b){if(1==arguments.length){this.o=a.split("/");for(var c=0,d=0;d<this.o.length;d++)0<this.o[d].length&&(this.o[c]=this.o[d],c++);this.o.length=c;this.Z=0}else this.o=a,this.Z=b}function T(a,b){var c=J(a);if(null===c)return b;if(c===J(b))return T(D(a),D(b));throw Error("INTERNAL ERROR: innerPath ("+b+") is not within outerPath ("+a+")");}
function kf(a,b){for(var c=a.slice(),d=b.slice(),e=0;e<c.length&&e<d.length;e++){var f=Lc(c[e],d[e]);if(0!==f)return f}return c.length===d.length?0:c.length<d.length?-1:1}function J(a){return a.Z>=a.o.length?null:a.o[a.Z]}function Wd(a){return a.o.length-a.Z}function D(a){var b=a.Z;b<a.o.length&&b++;return new L(a.o,b)}function Xd(a){return a.Z<a.o.length?a.o[a.o.length-1]:null}g=L.prototype;
g.toString=function(){for(var a="",b=this.Z;b<this.o.length;b++)""!==this.o[b]&&(a+="/"+this.o[b]);return a||"/"};g.slice=function(a){return this.o.slice(this.Z+(a||0))};g.parent=function(){if(this.Z>=this.o.length)return null;for(var a=[],b=this.Z;b<this.o.length-1;b++)a.push(this.o[b]);return new L(a,0)};
g.m=function(a){for(var b=[],c=this.Z;c<this.o.length;c++)b.push(this.o[c]);if(a instanceof L)for(c=a.Z;c<a.o.length;c++)b.push(a.o[c]);else for(a=a.split("/"),c=0;c<a.length;c++)0<a[c].length&&b.push(a[c]);return new L(b,0)};g.e=function(){return this.Z>=this.o.length};g.ca=function(a){if(Wd(this)!==Wd(a))return!1;for(var b=this.Z,c=a.Z;b<=this.o.length;b++,c++)if(this.o[b]!==a.o[c])return!1;return!0};
g.contains=function(a){var b=this.Z,c=a.Z;if(Wd(this)>Wd(a))return!1;for(;b<this.o.length;){if(this.o[b]!==a.o[c])return!1;++b;++c}return!0};var C=new L("");function lf(a,b){this.Ta=a.slice();this.Ka=Math.max(1,this.Ta.length);this.Re=b;for(var c=0;c<this.Ta.length;c++)this.Ka+=Nb(this.Ta[c]);mf(this)}lf.prototype.push=function(a){0<this.Ta.length&&(this.Ka+=1);this.Ta.push(a);this.Ka+=Nb(a);mf(this)};lf.prototype.pop=function(){var a=this.Ta.pop();this.Ka-=Nb(a);0<this.Ta.length&&--this.Ka};
function mf(a){if(768<a.Ka)throw Error(a.Re+"has a key path longer than 768 bytes ("+a.Ka+").");if(32<a.Ta.length)throw Error(a.Re+"path specified exceeds the maximum depth that can be written (32) or object contains a cycle "+nf(a));}function nf(a){return 0==a.Ta.length?"":"in property '"+a.Ta.join(".")+"'"};function of(a){a instanceof pf||dd("Don't call new Database() directly - please use firebase.database().");this.ta=a;this.ba=new U(a,C);this.INTERNAL=new qf(this)}var rf={TIMESTAMP:{".sv":"timestamp"}};g=of.prototype;g.app=null;g.nf=function(a){sf(this,"ref");y("database.ref",0,1,arguments.length);return p(a)?this.ba.m(a):this.ba};
g.pg=function(a){sf(this,"database.refFromURL");y("database.refFromURL",1,1,arguments.length);var b=ed(a);tf("database.refFromURL",b);var c=b.kc;c.host!==this.ta.M.host&&dd("database.refFromURL: Host name does not match the current database: (found "+c.host+" but expected "+this.ta.M.host+")");return this.nf(b.path.toString())};function sf(a,b){null===a.ta&&dd("Cannot call "+b+" on a deleted database.")}g.Yf=function(){y("database.goOffline",0,0,arguments.length);sf(this,"goOffline");this.ta.bb()};
g.Zf=function(){y("database.goOnline",0,0,arguments.length);sf(this,"goOnline");this.ta.lc()};Object.defineProperty(of.prototype,"app",{get:function(){return this.ta.app}});function qf(a){this.Za=a}qf.prototype.delete=function(){sf(this.Za,"delete");var a=uf.Wb(),b=this.Za.ta;x(a.nb,b.app.name)!==b&&dd("Database "+b.app.name+" has already been deleted.");b.bb();delete a.nb[b.app.name];this.Za.ta=null;this.Za.ba=null;this.Za=this.Za.INTERNAL=null;return Promise.resolve()};of.prototype.ref=of.prototype.nf;
of.prototype.refFromURL=of.prototype.pg;of.prototype.goOnline=of.prototype.Zf;of.prototype.goOffline=of.prototype.Yf;qf.prototype["delete"]=qf.prototype.delete;function Qc(){this.k=this.B=null}Qc.prototype.find=function(a){if(null!=this.B)return this.B.Q(a);if(a.e()||null==this.k)return null;var b=J(a);a=D(a);return this.k.contains(b)?this.k.get(b).find(a):null};function Sc(a,b,c){if(b.e())a.B=c,a.k=null;else if(null!==a.B)a.B=a.B.F(b,c);else{null==a.k&&(a.k=new Ke);var d=J(b);a.k.contains(d)||a.k.add(d,new Qc);a=a.k.get(d);b=D(b);Sc(a,b,c)}}
function vf(a,b){if(b.e())return a.B=null,a.k=null,!0;if(null!==a.B){if(a.B.J())return!1;var c=a.B;a.B=null;c.P(N,function(b,c){Sc(a,new L(b),c)});return vf(a,b)}return null!==a.k?(c=J(b),b=D(b),a.k.contains(c)&&vf(a.k.get(c),b)&&a.k.remove(c),a.k.e()?(a.k=null,!0):!1):!0}function Rc(a,b,c){null!==a.B?c(b,a.B):a.P(function(a,e){var f=new L(b.toString()+"/"+a);Rc(e,f,c)})}Qc.prototype.P=function(a){null!==this.k&&Le(this.k,function(b,c){a(b,c)})};var wf=/[\[\].#$\/\u0000-\u001F\u007F]/,xf=/[\[\].#$\u0000-\u001F\u007F]/;function yf(a){return q(a)&&0!==a.length&&!wf.test(a)}function zf(a){return null===a||q(a)||fa(a)&&!fd(a)||ha(a)&&Bb(a,".sv")}function Af(a,b,c,d){d&&!p(b)||Bf(Db(a,1,d),b,c)}
function Bf(a,b,c){c instanceof L&&(c=new lf(c,a));if(!p(b))throw Error(a+"contains undefined "+nf(c));if(ga(b))throw Error(a+"contains a function "+nf(c)+" with contents: "+b.toString());if(fd(b))throw Error(a+"contains "+b.toString()+" "+nf(c));if(q(b)&&b.length>10485760/3&&10485760<Nb(b))throw Error(a+"contains a string greater than 10485760 utf8 bytes "+nf(c)+" ('"+b.substring(0,50)+"...')");if(ha(b)){var d=!1,e=!1;Cb(b,function(b,h){if(".value"===b)d=!0;else if(".priority"!==b&&".sv"!==b&&(e=
!0,!yf(b)))throw Error(a+" contains an invalid key ("+b+") "+nf(c)+'.  Keys must be non-empty strings and can\'t contain ".", "#", "$", "/", "[", or "]"');c.push(b);Bf(a,h,c);c.pop()});if(d&&e)throw Error(a+' contains ".value" child '+nf(c)+" in addition to actual children.");}}
function Cf(a,b){var c,d;for(c=0;c<b.length;c++){d=b[c];for(var e=d.slice(),f=0;f<e.length;f++)if((".priority"!==e[f]||f!==e.length-1)&&!yf(e[f]))throw Error(a+"contains an invalid key ("+e[f]+") in path "+d.toString()+'. Keys must be non-empty strings and can\'t contain ".", "#", "$", "/", "[", or "]"');}b.sort(kf);e=null;for(c=0;c<b.length;c++){d=b[c];if(null!==e&&e.contains(d))throw Error(a+"contains a path "+e.toString()+" that is ancestor of another path "+d.toString());e=d}}
function Df(a,b,c){var d=Db(a,1,!1);if(!ha(b)||da(b))throw Error(d+" must be an object containing the children to replace.");var e=[];Cb(b,function(a,b){var k=new L(a);Bf(d,b,c.m(k));if(".priority"===Xd(k)&&!zf(b))throw Error(d+"contains an invalid value for '"+k.toString()+"', which must be a valid Firebase priority (a string, finite number, server value, or null).");e.push(k)});Cf(d,e)}
function Ef(a,b,c){if(fd(c))throw Error(Db(a,b,!1)+"is "+c.toString()+", but must be a valid Firebase priority (a string, finite number, server value, or null).");if(!zf(c))throw Error(Db(a,b,!1)+"must be a valid Firebase priority (a string, finite number, server value, or null).");}
function Ff(a,b,c){if(!c||p(b))switch(b){case "value":case "child_added":case "child_removed":case "child_changed":case "child_moved":break;default:throw Error(Db(a,1,c)+'must be a valid event type: "value", "child_added", "child_removed", "child_changed", or "child_moved".');}}function Gf(a,b){if(p(b)&&!yf(b))throw Error(Db(a,2,!0)+'was an invalid key: "'+b+'".  Firebase keys must be non-empty strings and can\'t contain ".", "#", "$", "/", "[", or "]").');}
function Hf(a,b){if(!q(b)||0===b.length||xf.test(b))throw Error(Db(a,1,!1)+'was an invalid path: "'+b+'". Paths must be non-empty strings and can\'t contain ".", "#", "$", "[", or "]"');}function If(a,b){if(".info"===J(b))throw Error(a+" failed: Can't modify data under /.info/");}
function tf(a,b){var c=b.path.toString(),d;!(d=!q(b.kc.host)||0===b.kc.host.length||!yf(b.kc.oe))&&(d=0!==c.length)&&(c&&(c=c.replace(/^\/*\.info(\/|$)/,"/")),d=!(q(c)&&0!==c.length&&!xf.test(c)));if(d)throw Error(Db(a,1,!1)+'must be a valid firebase URL and the path can\'t contain ".", "#", "$", "[", or "]".');};function V(a,b){this.ta=a;this.qa=b}V.prototype.cancel=function(a){y("Firebase.onDisconnect().cancel",0,1,arguments.length);A("Firebase.onDisconnect().cancel",1,a,!0);var b=new Hb;this.ta.xd(this.qa,Ib(b,a));return b.ra};V.prototype.cancel=V.prototype.cancel;V.prototype.remove=function(a){y("Firebase.onDisconnect().remove",0,1,arguments.length);If("Firebase.onDisconnect().remove",this.qa);A("Firebase.onDisconnect().remove",1,a,!0);var b=new Hb;Jf(this.ta,this.qa,null,Ib(b,a));return b.ra};
V.prototype.remove=V.prototype.remove;V.prototype.set=function(a,b){y("Firebase.onDisconnect().set",1,2,arguments.length);If("Firebase.onDisconnect().set",this.qa);Af("Firebase.onDisconnect().set",a,this.qa,!1);A("Firebase.onDisconnect().set",2,b,!0);var c=new Hb;Jf(this.ta,this.qa,a,Ib(c,b));return c.ra};V.prototype.set=V.prototype.set;
V.prototype.Kb=function(a,b,c){y("Firebase.onDisconnect().setWithPriority",2,3,arguments.length);If("Firebase.onDisconnect().setWithPriority",this.qa);Af("Firebase.onDisconnect().setWithPriority",a,this.qa,!1);Ef("Firebase.onDisconnect().setWithPriority",2,b);A("Firebase.onDisconnect().setWithPriority",3,c,!0);var d=new Hb;Kf(this.ta,this.qa,a,b,Ib(d,c));return d.ra};V.prototype.setWithPriority=V.prototype.Kb;
V.prototype.update=function(a,b){y("Firebase.onDisconnect().update",1,2,arguments.length);If("Firebase.onDisconnect().update",this.qa);if(da(a)){for(var c={},d=0;d<a.length;++d)c[""+d]=a[d];a=c;O("Passing an Array to Firebase.onDisconnect().update() is deprecated. Use set() if you want to overwrite the existing data, or an Object with integer keys if you really do want to only update some of the children.")}Df("Firebase.onDisconnect().update",a,this.qa);A("Firebase.onDisconnect().update",2,b,!0);
c=new Hb;Lf(this.ta,this.qa,a,Ib(c,b));return c.ra};V.prototype.update=V.prototype.update;function Mf(a){H(da(a)&&0<a.length,"Requires a non-empty array");this.If=a;this.Ec={}}Mf.prototype.Fe=function(a,b){var c;c=this.Ec[a]||[];var d=c.length;if(0<d){for(var e=Array(d),f=0;f<d;f++)e[f]=c[f];c=e}else c=[];for(d=0;d<c.length;d++)c[d].Je.apply(c[d].Pa,Array.prototype.slice.call(arguments,1))};Mf.prototype.hc=function(a,b,c){Nf(this,a);this.Ec[a]=this.Ec[a]||[];this.Ec[a].push({Je:b,Pa:c});(a=this.We(a))&&b.apply(c,a)};
Mf.prototype.Jc=function(a,b,c){Nf(this,a);a=this.Ec[a]||[];for(var d=0;d<a.length;d++)if(a[d].Je===b&&(!c||c===a[d].Pa)){a.splice(d,1);break}};function Nf(a,b){H(Oa(a.If,function(a){return a===b}),"Unknown event: "+b)};function Of(){Mf.call(this,["online"]);this.ic=!0;if("undefined"!==typeof window&&"undefined"!==typeof window.addEventListener){var a=this;window.addEventListener("online",function(){a.ic||(a.ic=!0,a.Fe("online",!0))},!1);window.addEventListener("offline",function(){a.ic&&(a.ic=!1,a.Fe("online",!1))},!1)}}ka(Of,Mf);Of.prototype.We=function(a){H("online"===a,"Unknown event type: "+a);return[this.ic]};ba(Of);function Pf(){Mf.call(this,["visible"]);var a,b;"undefined"!==typeof document&&"undefined"!==typeof document.addEventListener&&("undefined"!==typeof document.hidden?(b="visibilitychange",a="hidden"):"undefined"!==typeof document.mozHidden?(b="mozvisibilitychange",a="mozHidden"):"undefined"!==typeof document.msHidden?(b="msvisibilitychange",a="msHidden"):"undefined"!==typeof document.webkitHidden&&(b="webkitvisibilitychange",a="webkitHidden"));this.Nb=!0;if(b){var c=this;document.addEventListener(b,
function(){var b=!document[a];b!==c.Nb&&(c.Nb=b,c.Fe("visible",b))},!1)}}ka(Pf,Mf);Pf.prototype.We=function(a){H("visible"===a,"Unknown event type: "+a);return[this.Nb]};ba(Pf);var Qf=function(){var a=0,b=[];return function(c){var d=c===a;a=c;for(var e=Array(8),f=7;0<=f;f--)e[f]="-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz".charAt(c%64),c=Math.floor(c/64);H(0===c,"Cannot push at time == 0");c=e.join("");if(d){for(f=11;0<=f&&63===b[f];f--)b[f]=0;b[f]++}else for(f=0;12>f;f++)b[f]=Math.floor(64*Math.random());for(f=0;12>f;f++)c+="-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz".charAt(b[f]);H(20===c.length,"nextPushId: Length should be 20.");
return c}}();function Rf(a,b){this.Oa=a;this.ba=b?b:Sf}g=Rf.prototype;g.Ra=function(a,b){return new Rf(this.Oa,this.ba.Ra(a,b,this.Oa).Y(null,null,!1,null,null))};g.remove=function(a){return new Rf(this.Oa,this.ba.remove(a,this.Oa).Y(null,null,!1,null,null))};g.get=function(a){for(var b,c=this.ba;!c.e();){b=this.Oa(a,c.key);if(0===b)return c.value;0>b?c=c.left:0<b&&(c=c.right)}return null};
function Tf(a,b){for(var c,d=a.ba,e=null;!d.e();){c=a.Oa(b,d.key);if(0===c){if(d.left.e())return e?e.key:null;for(d=d.left;!d.right.e();)d=d.right;return d.key}0>c?d=d.left:0<c&&(e=d,d=d.right)}throw Error("Attempted to find predecessor key for a nonexistent key.  What gives?");}g.e=function(){return this.ba.e()};g.count=function(){return this.ba.count()};g.Hc=function(){return this.ba.Hc()};g.fc=function(){return this.ba.fc()};g.ia=function(a){return this.ba.ia(a)};
g.Xb=function(a){return new Uf(this.ba,null,this.Oa,!1,a)};g.Yb=function(a,b){return new Uf(this.ba,a,this.Oa,!1,b)};g.$b=function(a,b){return new Uf(this.ba,a,this.Oa,!0,b)};g.Ye=function(a){return new Uf(this.ba,null,this.Oa,!0,a)};function Uf(a,b,c,d,e){this.Hd=e||null;this.ke=d;this.Sa=[];for(e=1;!a.e();)if(e=b?c(a.key,b):1,d&&(e*=-1),0>e)a=this.ke?a.left:a.right;else if(0===e){this.Sa.push(a);break}else this.Sa.push(a),a=this.ke?a.right:a.left}
function R(a){if(0===a.Sa.length)return null;var b=a.Sa.pop(),c;c=a.Hd?a.Hd(b.key,b.value):{key:b.key,value:b.value};if(a.ke)for(b=b.left;!b.e();)a.Sa.push(b),b=b.right;else for(b=b.right;!b.e();)a.Sa.push(b),b=b.left;return c}function Vf(a){if(0===a.Sa.length)return null;var b;b=a.Sa;b=b[b.length-1];return a.Hd?a.Hd(b.key,b.value):{key:b.key,value:b.value}}function Wf(a,b,c,d,e){this.key=a;this.value=b;this.color=null!=c?c:!0;this.left=null!=d?d:Sf;this.right=null!=e?e:Sf}g=Wf.prototype;
g.Y=function(a,b,c,d,e){return new Wf(null!=a?a:this.key,null!=b?b:this.value,null!=c?c:this.color,null!=d?d:this.left,null!=e?e:this.right)};g.count=function(){return this.left.count()+1+this.right.count()};g.e=function(){return!1};g.ia=function(a){return this.left.ia(a)||a(this.key,this.value)||this.right.ia(a)};function Xf(a){return a.left.e()?a:Xf(a.left)}g.Hc=function(){return Xf(this).key};g.fc=function(){return this.right.e()?this.key:this.right.fc()};
g.Ra=function(a,b,c){var d,e;e=this;d=c(a,e.key);e=0>d?e.Y(null,null,null,e.left.Ra(a,b,c),null):0===d?e.Y(null,b,null,null,null):e.Y(null,null,null,null,e.right.Ra(a,b,c));return Yf(e)};function Zf(a){if(a.left.e())return Sf;a.left.fa()||a.left.left.fa()||(a=$f(a));a=a.Y(null,null,null,Zf(a.left),null);return Yf(a)}
g.remove=function(a,b){var c,d;c=this;if(0>b(a,c.key))c.left.e()||c.left.fa()||c.left.left.fa()||(c=$f(c)),c=c.Y(null,null,null,c.left.remove(a,b),null);else{c.left.fa()&&(c=ag(c));c.right.e()||c.right.fa()||c.right.left.fa()||(c=bg(c),c.left.left.fa()&&(c=ag(c),c=bg(c)));if(0===b(a,c.key)){if(c.right.e())return Sf;d=Xf(c.right);c=c.Y(d.key,d.value,null,null,Zf(c.right))}c=c.Y(null,null,null,null,c.right.remove(a,b))}return Yf(c)};g.fa=function(){return this.color};
function Yf(a){a.right.fa()&&!a.left.fa()&&(a=cg(a));a.left.fa()&&a.left.left.fa()&&(a=ag(a));a.left.fa()&&a.right.fa()&&(a=bg(a));return a}function $f(a){a=bg(a);a.right.left.fa()&&(a=a.Y(null,null,null,null,ag(a.right)),a=cg(a),a=bg(a));return a}function cg(a){return a.right.Y(null,null,a.color,a.Y(null,null,!0,null,a.right.left),null)}function ag(a){return a.left.Y(null,null,a.color,null,a.Y(null,null,!0,a.left.right,null))}
function bg(a){return a.Y(null,null,!a.color,a.left.Y(null,null,!a.left.color,null,null),a.right.Y(null,null,!a.right.color,null,null))}function dg(){}g=dg.prototype;g.Y=function(){return this};g.Ra=function(a,b){return new Wf(a,b,null)};g.remove=function(){return this};g.count=function(){return 0};g.e=function(){return!0};g.ia=function(){return!1};g.Hc=function(){return null};g.fc=function(){return null};g.fa=function(){return!1};var Sf=new dg;function P(a,b,c){this.k=a;(this.aa=b)&&ne(this.aa);a.e()&&H(!this.aa||this.aa.e(),"An empty node cannot have a priority");this.zb=c;this.Eb=null}g=P.prototype;g.J=function(){return!1};g.C=function(){return this.aa||F};g.ga=function(a){return this.k.e()?this:new P(this.k,a,this.zb)};g.R=function(a){if(".priority"===a)return this.C();a=this.k.get(a);return null===a?F:a};g.Q=function(a){var b=J(a);return null===b?this:this.R(b).Q(D(a))};g.Fa=function(a){return null!==this.k.get(a)};
g.U=function(a,b){H(b,"We should always be passing snapshot nodes");if(".priority"===a)return this.ga(b);var c=new K(a,b),d,e;b.e()?(d=this.k.remove(a),c=Ie(this.zb,c,this.k)):(d=this.k.Ra(a,b),c=Ge(this.zb,c,this.k));e=d.e()?F:this.aa;return new P(d,e,c)};g.F=function(a,b){var c=J(a);if(null===c)return b;H(".priority"!==J(a)||1===Wd(a),".priority must be the last token in a path");var d=this.R(c).F(D(a),b);return this.U(c,d)};g.e=function(){return this.k.e()};g.Fb=function(){return this.k.count()};
var eg=/^(0|[1-9]\d*)$/;g=P.prototype;g.H=function(a){if(this.e())return null;var b={},c=0,d=0,e=!0;this.P(N,function(f,h){b[f]=h.H(a);c++;e&&eg.test(f)?d=Math.max(d,Number(f)):e=!1});if(!a&&e&&d<2*c){var f=[],h;for(h in b)f[h]=b[h];return f}a&&!this.C().e()&&(b[".priority"]=this.C().H());return b};g.hash=function(){if(null===this.Eb){var a="";this.C().e()||(a+="priority:"+pe(this.C().H())+":");this.P(N,function(b,c){var d=c.hash();""!==d&&(a+=":"+b+":"+d)});this.Eb=""===a?"":Yc(a)}return this.Eb};
g.Xe=function(a,b,c){return(c=fg(this,c))?(a=Tf(c,new K(a,b)))?a.name:null:Tf(this.k,a)};function le(a,b){var c;c=(c=fg(a,b))?(c=c.Hc())&&c.name:a.k.Hc();return c?new K(c,a.k.get(c)):null}function me(a,b){var c;c=(c=fg(a,b))?(c=c.fc())&&c.name:a.k.fc();return c?new K(c,a.k.get(c)):null}g.P=function(a,b){var c=fg(this,a);return c?c.ia(function(a){return b(a.name,a.S)}):this.k.ia(b)};g.Xb=function(a){return this.Yb(a.Ic(),a)};
g.Yb=function(a,b){var c=fg(this,b);if(c)return c.Yb(a,function(a){return a});for(var c=this.k.Yb(a.name,Nc),d=Vf(c);null!=d&&0>b.compare(d,a);)R(c),d=Vf(c);return c};g.Ye=function(a){return this.$b(a.Gc(),a)};g.$b=function(a,b){var c=fg(this,b);if(c)return c.$b(a,function(a){return a});for(var c=this.k.$b(a.name,Nc),d=Vf(c);null!=d&&0<b.compare(d,a);)R(c),d=Vf(c);return c};g.tc=function(a){return this.e()?a.e()?0:-1:a.J()||a.e()?1:a===ue?-1:0};
g.ob=function(a){if(a===ae||ua(this.zb.dc,a.toString()))return this;var b=this.zb,c=this.k;H(a!==ae,"KeyIndex always exists and isn't meant to be added to the IndexMap.");for(var d=[],e=!1,c=c.Xb(Nc),f=R(c);f;)e=e||a.yc(f.S),d.push(f),f=R(c);d=e?He(d,ke(a)):re;e=a.toString();c=ya(b.dc);c[e]=a;a=ya(b.od);a[e]=d;return new P(this.k,this.aa,new Fe(a,c))};g.zc=function(a){return a===ae||ua(this.zb.dc,a.toString())};
g.ca=function(a){if(a===this)return!0;if(a.J())return!1;if(this.C().ca(a.C())&&this.k.count()===a.k.count()){var b=this.Xb(N);a=a.Xb(N);for(var c=R(b),d=R(a);c&&d;){if(c.name!==d.name||!c.S.ca(d.S))return!1;c=R(b);d=R(a)}return null===c&&null===d}return!1};function fg(a,b){return b===ae?null:a.zb.get(b.toString())}g.toString=function(){return B(this.H(!0))};function M(a,b){if(null===a)return F;var c=null;"object"===typeof a&&".priority"in a?c=a[".priority"]:"undefined"!==typeof b&&(c=b);H(null===c||"string"===typeof c||"number"===typeof c||"object"===typeof c&&".sv"in c,"Invalid priority type found: "+typeof c);"object"===typeof a&&".value"in a&&null!==a[".value"]&&(a=a[".value"]);if("object"!==typeof a||".sv"in a)return new Uc(a,M(c));if(a instanceof Array){var d=F,e=a;t(e,function(a,b){if(Bb(e,b)&&"."!==b.substring(0,1)){var c=M(a);if(c.J()||!c.e())d=
d.U(b,c)}});return d.ga(M(c))}var f=[],h=!1,k=a;Cb(k,function(a){if("string"!==typeof a||"."!==a.substring(0,1)){var b=M(k[a]);b.e()||(h=h||!b.C().e(),f.push(new K(a,b)))}});if(0==f.length)return F;var m=He(f,Kc,function(a){return a.name},Mc);if(h){var l=He(f,ke(N));return new P(m,M(c),new Fe({".priority":l},{".priority":N}))}return new P(m,M(c),Je)}var gg=Math.log(2);
function hg(a){this.count=parseInt(Math.log(a+1)/gg,10);this.Pe=this.count-1;this.Jf=a+1&parseInt(Array(this.count+1).join("1"),2)}function ig(a){var b=!(a.Jf&1<<a.Pe);a.Pe--;return b}
function He(a,b,c,d){function e(b,d){var f=d-b;if(0==f)return null;if(1==f){var l=a[b],u=c?c(l):l;return new Wf(u,l.S,!1,null,null)}var l=parseInt(f/2,10)+b,f=e(b,l),z=e(l+1,d),l=a[l],u=c?c(l):l;return new Wf(u,l.S,!1,f,z)}a.sort(b);var f=function(b){function d(b,h){var k=u-b,z=u;u-=b;var z=e(k+1,z),k=a[k],G=c?c(k):k,z=new Wf(G,k.S,h,null,z);f?f.left=z:l=z;f=z}for(var f=null,l=null,u=a.length,z=0;z<b.count;++z){var G=ig(b),sd=Math.pow(2,b.count-(z+1));G?d(sd,!1):(d(sd,!1),d(sd,!0))}return l}(new hg(a.length));
return null!==f?new Rf(d||b,f):new Rf(d||b)}function pe(a){return"number"===typeof a?"number:"+md(a):"string:"+a}function ne(a){if(a.J()){var b=a.H();H("string"===typeof b||"number"===typeof b||"object"===typeof b&&Bb(b,".sv"),"Priority must be a string or number.")}else H(a===ue||a.e(),"priority of unexpected type.");H(a===ue||a.C().e(),"Priority nodes can't have a priority of their own.")}var F=new P(new Rf(Mc),null,Je);function jg(){P.call(this,new Rf(Mc),F,Je)}ka(jg,P);g=jg.prototype;
g.tc=function(a){return a===this?0:1};g.ca=function(a){return a===this};g.C=function(){return this};g.R=function(){return F};g.e=function(){return!1};var ue=new jg,se=new K("[MIN_NAME]",F),ye=new K("[MAX_NAME]",ue);function W(a,b,c){this.A=a;this.W=b;this.g=c}W.prototype.H=function(){y("Firebase.DataSnapshot.val",0,0,arguments.length);return this.A.H()};W.prototype.val=W.prototype.H;W.prototype.Se=function(){y("Firebase.DataSnapshot.exportVal",0,0,arguments.length);return this.A.H(!0)};W.prototype.exportVal=W.prototype.Se;W.prototype.Tf=function(){y("Firebase.DataSnapshot.exists",0,0,arguments.length);return!this.A.e()};W.prototype.exists=W.prototype.Tf;
W.prototype.m=function(a){y("Firebase.DataSnapshot.child",0,1,arguments.length);fa(a)&&(a=String(a));Hf("Firebase.DataSnapshot.child",a);var b=new L(a),c=this.W.m(b);return new W(this.A.Q(b),c,N)};W.prototype.child=W.prototype.m;W.prototype.Fa=function(a){y("Firebase.DataSnapshot.hasChild",1,1,arguments.length);Hf("Firebase.DataSnapshot.hasChild",a);var b=new L(a);return!this.A.Q(b).e()};W.prototype.hasChild=W.prototype.Fa;
W.prototype.C=function(){y("Firebase.DataSnapshot.getPriority",0,0,arguments.length);return this.A.C().H()};W.prototype.getPriority=W.prototype.C;W.prototype.forEach=function(a){y("Firebase.DataSnapshot.forEach",1,1,arguments.length);A("Firebase.DataSnapshot.forEach",1,a,!1);if(this.A.J())return!1;var b=this;return!!this.A.P(this.g,function(c,d){return a(new W(d,b.W.m(c),N))})};W.prototype.forEach=W.prototype.forEach;
W.prototype.kd=function(){y("Firebase.DataSnapshot.hasChildren",0,0,arguments.length);return this.A.J()?!1:!this.A.e()};W.prototype.hasChildren=W.prototype.kd;W.prototype.getKey=function(){y("Firebase.DataSnapshot.key",0,0,arguments.length);return this.W.getKey()};od(W.prototype,"key",W.prototype.getKey);W.prototype.Fb=function(){y("Firebase.DataSnapshot.numChildren",0,0,arguments.length);return this.A.Fb()};W.prototype.numChildren=W.prototype.Fb;
W.prototype.xb=function(){y("Firebase.DataSnapshot.ref",0,0,arguments.length);return this.W};od(W.prototype,"ref",W.prototype.xb);function Ud(a,b){this.O=a;this.Ld=b}function Rd(a,b,c,d){return new Ud(new Dc(b,c,d),a.Ld)}function Vd(a){return a.O.ea?a.O.j():null}Ud.prototype.u=function(){return this.Ld};function Ec(a){return a.Ld.ea?a.Ld.j():null};function kg(a,b){this.W=a;var c=a.n,d=new be(c.g),c=S(c)?new be(c.g):c.xa?new he(c):new ce(c);this.mf=new Ld(c);var e=b.u(),f=b.O,h=d.za(F,e.j(),null),k=c.za(F,f.j(),null);this.Na=new Ud(new Dc(k,f.ea,c.Qa()),new Dc(h,e.ea,d.Qa()));this.$a=[];this.Qf=new Gd(a)}function lg(a){return a.W}g=kg.prototype;g.u=function(){return this.Na.u().j()};g.jb=function(a){var b=Ec(this.Na);return b&&(S(this.W.n)||!a.e()&&!b.R(J(a)).e())?b.Q(a):null};g.e=function(){return 0===this.$a.length};g.Ob=function(a){this.$a.push(a)};
g.mb=function(a,b){var c=[];if(b){H(null==a,"A cancel should cancel all event registrations.");var d=this.W.path;Ja(this.$a,function(a){(a=a.Ne(b,d))&&c.push(a)})}if(a){for(var e=[],f=0;f<this.$a.length;++f){var h=this.$a[f];if(!h.matches(a))e.push(h);else if(a.Ze()){e=e.concat(this.$a.slice(f+1));break}}this.$a=e}else this.$a=[];return c};
g.gb=function(a,b,c){a.type===Dd&&null!==a.source.Ib&&(H(Ec(this.Na),"We should always have a full cache before handling merges"),H(Vd(this.Na),"Missing event cache, even though we have a server cache"));var d=this.Na;a=this.mf.gb(d,a,b,c);b=this.mf;c=a.Sd;H(c.O.j().zc(b.V.g),"Event snap not indexed");H(c.u().j().zc(b.V.g),"Server snap not indexed");H(Hc(a.Sd.u())||!Hc(d.u()),"Once a server snap is complete, it should never go back");this.Na=a.Sd;return mg(this,a.Kf,a.Sd.O.j(),null)};
function ng(a,b){var c=a.Na.O,d=[];c.j().J()||c.j().P(N,function(a,b){d.push(new I("child_added",b,a))});c.ea&&d.push(Fc(c.j()));return mg(a,d,c.j(),b)}function mg(a,b,c,d){return Hd(a.Qf,b,c,d?[d]:a.$a)};function og(a,b,c){this.Qb=a;this.sb=b;this.ub=c||null}g=og.prototype;g.rf=function(a){return"value"===a};g.createEvent=function(a,b){var c=b.n.g;return new xc("value",this,new W(a.Ma,b.xb(),c))};g.Ub=function(a){var b=this.ub;if("cancel"===a.ge()){H(this.sb,"Raising a cancel event on a listener with no cancel callback");var c=this.sb;return function(){c.call(b,a.error)}}var d=this.Qb;return function(){d.call(b,a.Md)}};g.Ne=function(a,b){return this.sb?new yc(this,a,b):null};
g.matches=function(a){return a instanceof og?a.Qb&&this.Qb?a.Qb===this.Qb&&a.ub===this.ub:!0:!1};g.Ze=function(){return null!==this.Qb};function pg(a,b,c){this.ha=a;this.sb=b;this.ub=c}g=pg.prototype;g.rf=function(a){a="children_added"===a?"child_added":a;return("children_removed"===a?"child_removed":a)in this.ha};g.Ne=function(a,b){return this.sb?new yc(this,a,b):null};
g.createEvent=function(a,b){H(null!=a.Ya,"Child events should have a childName.");var c=b.xb().m(a.Ya);return new xc(a.type,this,new W(a.Ma,c,b.n.g),a.Dd)};g.Ub=function(a){var b=this.ub;if("cancel"===a.ge()){H(this.sb,"Raising a cancel event on a listener with no cancel callback");var c=this.sb;return function(){c.call(b,a.error)}}var d=this.ha[a.gd];return function(){d.call(b,a.Md,a.Dd)}};
g.matches=function(a){if(a instanceof pg){if(!this.ha||!a.ha)return!0;if(this.ub===a.ub){var b=qa(a.ha);if(b===qa(this.ha)){if(1===b){var b=ra(a.ha),c=ra(this.ha);return c===b&&(!a.ha[b]||!this.ha[c]||a.ha[b]===this.ha[c])}return pa(this.ha,function(b,c){return a.ha[c]===b})}}}return!1};g.Ze=function(){return null!==this.ha};function X(a,b,c,d){this.w=a;this.path=b;this.n=c;this.Oc=d}
function qg(a){var b=null,c=null;a.ka&&(b=ee(a));a.na&&(c=ge(a));if(a.g===ae){if(a.ka){if("[MIN_NAME]"!=de(a))throw Error("Query: When ordering by key, you may only pass one argument to startAt(), endAt(), or equalTo().");if("string"!==typeof b)throw Error("Query: When ordering by key, the argument passed to startAt(), endAt(),or equalTo() must be a string.");}if(a.na){if("[MAX_NAME]"!=fe(a))throw Error("Query: When ordering by key, you may only pass one argument to startAt(), endAt(), or equalTo().");if("string"!==
typeof c)throw Error("Query: When ordering by key, the argument passed to startAt(), endAt(),or equalTo() must be a string.");}}else if(a.g===N){if(null!=b&&!zf(b)||null!=c&&!zf(c))throw Error("Query: When ordering by priority, the first argument passed to startAt(), endAt(), or equalTo() must be a valid priority value (null, a number, or a string).");}else if(H(a.g instanceof te||a.g===ze,"unknown index type."),null!=b&&"object"===typeof b||null!=c&&"object"===typeof c)throw Error("Query: First argument passed to startAt(), endAt(), or equalTo() cannot be an object.");
}function rg(a){if(a.ka&&a.na&&a.xa&&(!a.xa||""===a.oc))throw Error("Query: Can't combine startAt(), endAt(), and limit(). Use limitToFirst() or limitToLast() instead.");}function sg(a,b){if(!0===a.Oc)throw Error(b+": You can't combine multiple orderBy calls.");}g=X.prototype;g.xb=function(){y("Query.ref",0,0,arguments.length);return new U(this.w,this.path)};
g.hc=function(a,b,c,d){y("Query.on",2,4,arguments.length);Ff("Query.on",a,!1);A("Query.on",2,b,!1);var e=tg("Query.on",c,d);if("value"===a)ug(this.w,this,new og(b,e.cancel||null,e.Pa||null));else{var f={};f[a]=b;ug(this.w,this,new pg(f,e.cancel,e.Pa))}return b};
g.Jc=function(a,b,c){y("Query.off",0,3,arguments.length);Ff("Query.off",a,!0);A("Query.off",2,b,!0);Eb("Query.off",3,c);var d=null,e=null;"value"===a?d=new og(b||null,null,c||null):a&&(b&&(e={},e[a]=b),d=new pg(e,null,c||null));e=this.w;d=".info"===J(this.path)?e.pd.mb(this,d):e.K.mb(this,d);tc(e.da,this.path,d)};
g.ig=function(a,b){function c(k){f&&(f=!1,e.Jc(a,c),b&&b.call(d.Pa,k),h.resolve(k))}y("Query.once",1,4,arguments.length);Ff("Query.once",a,!1);A("Query.once",2,b,!0);var d=tg("Query.once",arguments[2],arguments[3]),e=this,f=!0,h=new Hb;Jb(h.ra);this.hc(a,c,function(b){e.Jc(a,c);d.cancel&&d.cancel.call(d.Pa,b);h.reject(b)});return h.ra};
g.me=function(a){y("Query.limitToFirst",1,1,arguments.length);if(!fa(a)||Math.floor(a)!==a||0>=a)throw Error("Query.limitToFirst: First argument must be a positive integer.");if(this.n.xa)throw Error("Query.limitToFirst: Limit was already set (by another call to limit, limitToFirst, or limitToLast).");return new X(this.w,this.path,this.n.me(a),this.Oc)};
g.ne=function(a){y("Query.limitToLast",1,1,arguments.length);if(!fa(a)||Math.floor(a)!==a||0>=a)throw Error("Query.limitToLast: First argument must be a positive integer.");if(this.n.xa)throw Error("Query.limitToLast: Limit was already set (by another call to limit, limitToFirst, or limitToLast).");return new X(this.w,this.path,this.n.ne(a),this.Oc)};
g.jg=function(a){y("Query.orderByChild",1,1,arguments.length);if("$key"===a)throw Error('Query.orderByChild: "$key" is invalid.  Use Query.orderByKey() instead.');if("$priority"===a)throw Error('Query.orderByChild: "$priority" is invalid.  Use Query.orderByPriority() instead.');if("$value"===a)throw Error('Query.orderByChild: "$value" is invalid.  Use Query.orderByValue() instead.');Hf("Query.orderByChild",a);sg(this,"Query.orderByChild");var b=new L(a);if(b.e())throw Error("Query.orderByChild: cannot pass in empty path.  Use Query.orderByValue() instead.");
b=new te(b);b=De(this.n,b);qg(b);return new X(this.w,this.path,b,!0)};g.kg=function(){y("Query.orderByKey",0,0,arguments.length);sg(this,"Query.orderByKey");var a=De(this.n,ae);qg(a);return new X(this.w,this.path,a,!0)};g.lg=function(){y("Query.orderByPriority",0,0,arguments.length);sg(this,"Query.orderByPriority");var a=De(this.n,N);qg(a);return new X(this.w,this.path,a,!0)};
g.mg=function(){y("Query.orderByValue",0,0,arguments.length);sg(this,"Query.orderByValue");var a=De(this.n,ze);qg(a);return new X(this.w,this.path,a,!0)};g.Nd=function(a,b){y("Query.startAt",0,2,arguments.length);Af("Query.startAt",a,this.path,!0);Gf("Query.startAt",b);var c=this.n.Nd(a,b);rg(c);qg(c);if(this.n.ka)throw Error("Query.startAt: Starting point was already set (by another call to startAt or equalTo).");p(a)||(b=a=null);return new X(this.w,this.path,c,this.Oc)};
g.fd=function(a,b){y("Query.endAt",0,2,arguments.length);Af("Query.endAt",a,this.path,!0);Gf("Query.endAt",b);var c=this.n.fd(a,b);rg(c);qg(c);if(this.n.na)throw Error("Query.endAt: Ending point was already set (by another call to endAt or equalTo).");return new X(this.w,this.path,c,this.Oc)};
g.Pf=function(a,b){y("Query.equalTo",1,2,arguments.length);Af("Query.equalTo",a,this.path,!1);Gf("Query.equalTo",b);if(this.n.ka)throw Error("Query.equalTo: Starting point was already set (by another call to endAt or equalTo).");if(this.n.na)throw Error("Query.equalTo: Ending point was already set (by another call to endAt or equalTo).");return this.Nd(a,b).fd(a,b)};
g.toString=function(){y("Query.toString",0,0,arguments.length);for(var a=this.path,b="",c=a.Z;c<a.o.length;c++)""!==a.o[c]&&(b+="/"+encodeURIComponent(String(a.o[c])));return this.w.toString()+(b||"/")};g.ya=function(){var a=jd(Ee(this.n));return"{}"===a?"default":a};
function tg(a,b,c){var d={cancel:null,Pa:null};if(b&&c)d.cancel=b,A(a,3,d.cancel,!0),d.Pa=c,Eb(a,4,d.Pa);else if(b)if("object"===typeof b&&null!==b)d.Pa=b;else if("function"===typeof b)d.cancel=b;else throw Error(Db(a,3,!0)+" must either be a cancel callback or a context object.");return d}X.prototype.on=X.prototype.hc;X.prototype.off=X.prototype.Jc;X.prototype.once=X.prototype.ig;X.prototype.limitToFirst=X.prototype.me;X.prototype.limitToLast=X.prototype.ne;X.prototype.orderByChild=X.prototype.jg;
X.prototype.orderByKey=X.prototype.kg;X.prototype.orderByPriority=X.prototype.lg;X.prototype.orderByValue=X.prototype.mg;X.prototype.startAt=X.prototype.Nd;X.prototype.endAt=X.prototype.fd;X.prototype.equalTo=X.prototype.Pf;X.prototype.toString=X.prototype.toString;od(X.prototype,"ref",X.prototype.xb);function vg(a,b){this.value=a;this.children=b||wg}var wg=new Rf(function(a,b){return a===b?0:a<b?-1:1});function xg(a){var b=Q;t(a,function(a,d){b=b.set(new L(d),a)});return b}g=vg.prototype;g.e=function(){return null===this.value&&this.children.e()};function yg(a,b,c){if(null!=a.value&&c(a.value))return{path:C,value:a.value};if(b.e())return null;var d=J(b);a=a.children.get(d);return null!==a?(b=yg(a,D(b),c),null!=b?{path:(new L(d)).m(b.path),value:b.value}:null):null}
function zg(a,b){return yg(a,b,function(){return!0})}g.subtree=function(a){if(a.e())return this;var b=this.children.get(J(a));return null!==b?b.subtree(D(a)):Q};g.set=function(a,b){if(a.e())return new vg(b,this.children);var c=J(a),d=(this.children.get(c)||Q).set(D(a),b),c=this.children.Ra(c,d);return new vg(this.value,c)};
g.remove=function(a){if(a.e())return this.children.e()?Q:new vg(null,this.children);var b=J(a),c=this.children.get(b);return c?(a=c.remove(D(a)),b=a.e()?this.children.remove(b):this.children.Ra(b,a),null===this.value&&b.e()?Q:new vg(this.value,b)):this};g.get=function(a){if(a.e())return this.value;var b=this.children.get(J(a));return b?b.get(D(a)):null};
function $d(a,b,c){if(b.e())return c;var d=J(b);b=$d(a.children.get(d)||Q,D(b),c);d=b.e()?a.children.remove(d):a.children.Ra(d,b);return new vg(a.value,d)}function Ag(a,b){return Bg(a,C,b)}function Bg(a,b,c){var d={};a.children.ia(function(a,f){d[a]=Bg(f,b.m(a),c)});return c(b,a.value,d)}function Cg(a,b,c){return Dg(a,b,C,c)}function Dg(a,b,c,d){var e=a.value?d(c,a.value):!1;if(e)return e;if(b.e())return null;e=J(b);return(a=a.children.get(e))?Dg(a,D(b),c.m(e),d):null}
function Eg(a,b,c){Fg(a,b,C,c)}function Fg(a,b,c,d){if(b.e())return a;a.value&&d(c,a.value);var e=J(b);return(a=a.children.get(e))?Fg(a,D(b),c.m(e),d):Q}function Yd(a,b){Gg(a,C,b)}function Gg(a,b,c){a.children.ia(function(a,e){Gg(e,b.m(a),c)});a.value&&c(b,a.value)}function Hg(a,b){a.children.ia(function(a,d){d.value&&b(a,d.value)})}var Q=new vg(null);vg.prototype.toString=function(){var a={};Yd(this,function(b,c){a[b.toString()]=c.toString()});return B(a)};function Ig(a,b,c){this.type=Qd;this.source=Jg;this.path=a;this.Pb=b;this.Id=c}Ig.prototype.Nc=function(a){if(this.path.e()){if(null!=this.Pb.value)return H(this.Pb.children.e(),"affectedTree should not have overlapping affected paths."),this;a=this.Pb.subtree(new L(a));return new Ig(C,a,this.Id)}H(J(this.path)===a,"operationForChild called for unrelated child.");return new Ig(D(this.path),this.Pb,this.Id)};
Ig.prototype.toString=function(){return"Operation("+this.path+": "+this.source.toString()+" ack write revert="+this.Id+" affectedTree="+this.Pb+")"};var $b=0,Dd=1,Qd=2,bc=3;function Kg(a,b,c,d){this.ee=a;this.Ue=b;this.Ib=c;this.De=d;H(!d||b,"Tagged queries must be from server.")}var Jg=new Kg(!0,!1,null,!1),Lg=new Kg(!1,!0,null,!1);Kg.prototype.toString=function(){return this.ee?"user":this.De?"server(queryID="+this.Ib+")":"server"};function Mg(a){this.X=a}var Ng=new Mg(new vg(null));function Og(a,b,c){if(b.e())return new Mg(new vg(c));var d=zg(a.X,b);if(null!=d){var e=d.path,d=d.value;b=T(e,b);d=d.F(b,c);return new Mg(a.X.set(e,d))}a=$d(a.X,b,new vg(c));return new Mg(a)}function Pg(a,b,c){var d=a;Cb(c,function(a,c){d=Og(d,b.m(a),c)});return d}Mg.prototype.Ed=function(a){if(a.e())return Ng;a=$d(this.X,a,Q);return new Mg(a)};function Qg(a,b){var c=zg(a.X,b);return null!=c?a.X.get(c.path).Q(T(c.path,b)):null}
function Rg(a){var b=[],c=a.X.value;null!=c?c.J()||c.P(N,function(a,c){b.push(new K(a,c))}):a.X.children.ia(function(a,c){null!=c.value&&b.push(new K(a,c.value))});return b}function Sg(a,b){if(b.e())return a;var c=Qg(a,b);return null!=c?new Mg(new vg(c)):new Mg(a.X.subtree(b))}Mg.prototype.e=function(){return this.X.e()};Mg.prototype.apply=function(a){return Tg(C,this.X,a)};
function Tg(a,b,c){if(null!=b.value)return c.F(a,b.value);var d=null;b.children.ia(function(b,f){".priority"===b?(H(null!==f.value,"Priority writes must always be leaf nodes"),d=f.value):c=Tg(a.m(b),f,c)});c.Q(a).e()||null===d||(c=c.F(a.m(".priority"),d));return c};function Ug(){this.Aa={}}g=Ug.prototype;g.e=function(){return xa(this.Aa)};g.gb=function(a,b,c){var d=a.source.Ib;if(null!==d)return d=x(this.Aa,d),H(null!=d,"SyncTree gave us an op for an invalid query."),d.gb(a,b,c);var e=[];t(this.Aa,function(d){e=e.concat(d.gb(a,b,c))});return e};g.Ob=function(a,b,c,d,e){var f=a.ya(),h=x(this.Aa,f);if(!h){var h=c.Ba(e?d:null),k=!1;h?k=!0:(h=d instanceof P?c.sc(d):F,k=!1);h=new kg(a,new Ud(new Dc(h,k,!1),new Dc(d,e,!1)));this.Aa[f]=h}h.Ob(b);return ng(h,b)};
g.mb=function(a,b,c){var d=a.ya(),e=[],f=[],h=null!=Vg(this);if("default"===d){var k=this;t(this.Aa,function(a,d){f=f.concat(a.mb(b,c));a.e()&&(delete k.Aa[d],S(a.W.n)||e.push(a.W))})}else{var m=x(this.Aa,d);m&&(f=f.concat(m.mb(b,c)),m.e()&&(delete this.Aa[d],S(m.W.n)||e.push(m.W)))}h&&null==Vg(this)&&e.push(new U(a.w,a.path));return{qg:e,Rf:f}};function Wg(a){return Ka(sa(a.Aa),function(a){return!S(a.W.n)})}g.jb=function(a){var b=null;t(this.Aa,function(c){b=b||c.jb(a)});return b};
function Xg(a,b){if(S(b.n))return Vg(a);var c=b.ya();return x(a.Aa,c)}function Vg(a){return wa(a.Aa,function(a){return S(a.W.n)})||null};function Yg(){this.T=Ng;this.la=[];this.Cc=-1}function Zg(a,b){for(var c=0;c<a.la.length;c++){var d=a.la[c];if(d.Zc===b)return d}return null}g=Yg.prototype;
g.Ed=function(a){var b=Pa(this.la,function(b){return b.Zc===a});H(0<=b,"removeWrite called with nonexistent writeId.");var c=this.la[b];this.la.splice(b,1);for(var d=c.visible,e=!1,f=this.la.length-1;d&&0<=f;){var h=this.la[f];h.visible&&(f>=b&&$g(h,c.path)?d=!1:c.path.contains(h.path)&&(e=!0));f--}if(d){if(e)this.T=ah(this.la,bh,C),this.Cc=0<this.la.length?this.la[this.la.length-1].Zc:-1;else if(c.Ja)this.T=this.T.Ed(c.path);else{var k=this;t(c.children,function(a,b){k.T=k.T.Ed(c.path.m(b))})}return!0}return!1};
g.Ba=function(a,b,c,d){if(c||d){var e=Sg(this.T,a);return!d&&e.e()?b:d||null!=b||null!=Qg(e,C)?(e=ah(this.la,function(b){return(b.visible||d)&&(!c||!(0<=Ia(c,b.Zc)))&&(b.path.contains(a)||a.contains(b.path))},a),b=b||F,e.apply(b)):null}e=Qg(this.T,a);if(null!=e)return e;e=Sg(this.T,a);return e.e()?b:null!=b||null!=Qg(e,C)?(b=b||F,e.apply(b)):null};
g.sc=function(a,b){var c=F,d=Qg(this.T,a);if(d)d.J()||d.P(N,function(a,b){c=c.U(a,b)});else if(b){var e=Sg(this.T,a);b.P(N,function(a,b){var d=Sg(e,new L(a)).apply(b);c=c.U(a,d)});Ja(Rg(e),function(a){c=c.U(a.name,a.S)})}else e=Sg(this.T,a),Ja(Rg(e),function(a){c=c.U(a.name,a.S)});return c};g.$c=function(a,b,c,d){H(c||d,"Either existingEventSnap or existingServerSnap must exist");a=a.m(b);if(null!=Qg(this.T,a))return null;a=Sg(this.T,a);return a.e()?d.Q(b):a.apply(d.Q(b))};
g.rc=function(a,b,c){a=a.m(b);var d=Qg(this.T,a);return null!=d?d:Cc(c,b)?Sg(this.T,a).apply(c.j().R(b)):null};g.mc=function(a){return Qg(this.T,a)};g.Xd=function(a,b,c,d,e,f){var h;a=Sg(this.T,a);h=Qg(a,C);if(null==h)if(null!=b)h=a.apply(b);else return[];h=h.ob(f);if(h.e()||h.J())return[];b=[];a=ke(f);e=e?h.$b(c,f):h.Yb(c,f);for(f=R(e);f&&b.length<d;)0!==a(f,c)&&b.push(f),f=R(e);return b};
function $g(a,b){return a.Ja?a.path.contains(b):!!va(a.children,function(c,d){return a.path.m(d).contains(b)})}function bh(a){return a.visible}
function ah(a,b,c){for(var d=Ng,e=0;e<a.length;++e){var f=a[e];if(b(f)){var h=f.path;if(f.Ja)c.contains(h)?(h=T(c,h),d=Og(d,h,f.Ja)):h.contains(c)&&(h=T(h,c),d=Og(d,C,f.Ja.Q(h)));else if(f.children)if(c.contains(h))h=T(c,h),d=Pg(d,h,f.children);else{if(h.contains(c))if(h=T(h,c),h.e())d=Pg(d,C,f.children);else if(f=x(f.children,J(h)))f=f.Q(D(h)),d=Og(d,C,f)}else throw Wc("WriteRecord should have .snap or .children");}}return d}function ch(a,b){this.Mb=a;this.X=b}g=ch.prototype;
g.Ba=function(a,b,c){return this.X.Ba(this.Mb,a,b,c)};g.sc=function(a){return this.X.sc(this.Mb,a)};g.$c=function(a,b,c){return this.X.$c(this.Mb,a,b,c)};g.mc=function(a){return this.X.mc(this.Mb.m(a))};g.Xd=function(a,b,c,d,e){return this.X.Xd(this.Mb,a,b,c,d,e)};g.rc=function(a,b){return this.X.rc(this.Mb,a,b)};g.m=function(a){return new ch(this.Mb.m(a),this.X)};function dh(){this.children={};this.ad=0;this.value=null}function eh(a,b,c){this.ud=a?a:"";this.Ha=b?b:null;this.A=c?c:new dh}function fh(a,b){for(var c=b instanceof L?b:new L(b),d=a,e;null!==(e=J(c));)d=new eh(e,d,x(d.A.children,e)||new dh),c=D(c);return d}g=eh.prototype;g.Ea=function(){return this.A.value};function gh(a,b){H("undefined"!==typeof b,"Cannot set value to undefined");a.A.value=b;hh(a)}g.clear=function(){this.A.value=null;this.A.children={};this.A.ad=0;hh(this)};
g.kd=function(){return 0<this.A.ad};g.e=function(){return null===this.Ea()&&!this.kd()};g.P=function(a){var b=this;t(this.A.children,function(c,d){a(new eh(d,b,c))})};function ih(a,b,c,d){c&&!d&&b(a);a.P(function(a){ih(a,b,!0,d)});c&&d&&b(a)}function jh(a,b){for(var c=a.parent();null!==c&&!b(c);)c=c.parent()}g.path=function(){return new L(null===this.Ha?this.ud:this.Ha.path()+"/"+this.ud)};g.name=function(){return this.ud};g.parent=function(){return this.Ha};
function hh(a){if(null!==a.Ha){var b=a.Ha,c=a.ud,d=a.e(),e=Bb(b.A.children,c);d&&e?(delete b.A.children[c],b.A.ad--,hh(b)):d||e||(b.A.children[c]=a.A,b.A.ad++,hh(b))}};function kh(a,b,c,d,e,f){this.id=lh++;this.f=bd("p:"+this.id+":");this.qd={};this.$={};this.pa=[];this.Pc=0;this.Lc=[];this.ma=!1;this.fb=1E3;this.td=3E5;this.Hb=b;this.Kc=c;this.te=d;this.M=a;this.pb=this.Ia=this.Db=this.ye=null;this.Vd=e;this.de=!1;if(f)throw Error("Auth override specified in options, but not supported on non Node.js platforms");this.Ie=f||null;this.vb=null;this.Nb=!1;this.Gd={};this.rg=0;this.Te=!0;this.Bc=this.le=null;mh(this,0);Pf.Wb().hc("visible",this.hg,this);-1===a.host.indexOf("fblocal")&&
Of.Wb().hc("online",this.gg,this)}var lh=0,nh=0;g=kh.prototype;g.ua=function(a,b,c){var d=++this.rg;a={r:d,a:a,b:b};this.f(B(a));H(this.ma,"sendRequest call when we're not connected not allowed.");this.Ia.ua(a);c&&(this.Gd[d]=c)};
g.bf=function(a,b,c,d){var e=a.ya(),f=a.path.toString();this.f("Listen called for "+f+" "+e);this.$[f]=this.$[f]||{};H(zd(a.n)||!S(a.n),"listen() called for non-default but complete query");H(!this.$[f][e],"listen() called twice for same path/queryId.");a={G:d,ld:b,ng:a,tag:c};this.$[f][e]=a;this.ma&&oh(this,a)};
function oh(a,b){var c=b.ng,d=c.path.toString(),e=c.ya();a.f("Listen on "+d+" for "+e);var f={p:d};b.tag&&(f.q=Ee(c.n),f.t=b.tag);f.h=b.ld();a.ua("q",f,function(f){var k=f.d,m=f.s;if(k&&"object"===typeof k&&Bb(k,"w")){var l=x(k,"w");da(l)&&0<=Ia(l,"no_index")&&O("Using an unspecified index. Consider adding "+('".indexOn": "'+c.n.g.toString()+'"')+" at "+c.path.toString()+" to your security rules for better performance")}(a.$[d]&&a.$[d][e])===b&&(a.f("listen response",f),"ok"!==m&&ph(a,d,e),b.G&&b.G(m,
k))})}g.of=function(a){this.pb=a;this.f("Auth token refreshed");this.pb?qh(this):this.ma&&this.ua("unauth",{},function(){});if(a&&40===a.length||pd(a))this.f("Admin auth credential detected.  Reducing max reconnect time."),this.td=3E4};function qh(a){if(a.ma&&a.pb){var b=a.pb,c={cred:b};a.Ie&&(c.authvar=a.Ie);a.ua("auth",c,function(c){var e=c.s;c=c.d||"error";"ok"!==e&&a.pb===b&&rh(a,e,c)})}}
g.Cf=function(a,b){var c=a.path.toString(),d=a.ya();this.f("Unlisten called for "+c+" "+d);H(zd(a.n)||!S(a.n),"unlisten() called for non-default but complete query");if(ph(this,c,d)&&this.ma){var e=Ee(a.n);this.f("Unlisten on "+c+" for "+d);c={p:c};b&&(c.q=e,c.t=b);this.ua("n",c)}};g.qe=function(a,b,c){this.ma?sh(this,"o",a,b,c):this.Lc.push({ve:a,action:"o",data:b,G:c})};g.ef=function(a,b,c){this.ma?sh(this,"om",a,b,c):this.Lc.push({ve:a,action:"om",data:b,G:c})};
g.xd=function(a,b){this.ma?sh(this,"oc",a,null,b):this.Lc.push({ve:a,action:"oc",data:null,G:b})};function sh(a,b,c,d,e){c={p:c,d:d};a.f("onDisconnect "+b,c);a.ua(b,c,function(a){e&&setTimeout(function(){e(a.s,a.d)},Math.floor(0))})}g.put=function(a,b,c,d){th(this,"p",a,b,c,d)};g.cf=function(a,b,c,d){th(this,"m",a,b,c,d)};function th(a,b,c,d,e,f){d={p:c,d:d};p(f)&&(d.h=f);a.pa.push({action:b,qf:d,G:e});a.Pc++;b=a.pa.length-1;a.ma?uh(a,b):a.f("Buffering put: "+c)}
function uh(a,b){var c=a.pa[b].action,d=a.pa[b].qf,e=a.pa[b].G;a.pa[b].og=a.ma;a.ua(c,d,function(d){a.f(c+" response",d);delete a.pa[b];a.Pc--;0===a.Pc&&(a.pa=[]);e&&e(d.s,d.d)})}g.xe=function(a){this.ma&&(a={c:a},this.f("reportStats",a),this.ua("s",a,function(a){"ok"!==a.s&&this.f("reportStats","Error sending stats: "+a.d)}))};
g.wd=function(a){if("r"in a){this.f("from server: "+B(a));var b=a.r,c=this.Gd[b];c&&(delete this.Gd[b],c(a.b))}else{if("error"in a)throw"A server-side error has occurred: "+a.error;"a"in a&&(b=a.a,a=a.b,this.f("handleServerMessage",b,a),"d"===b?this.Hb(a.p,a.d,!1,a.t):"m"===b?this.Hb(a.p,a.d,!0,a.t):"c"===b?vh(this,a.p,a.q):"ac"===b?rh(this,a.s,a.d):"sd"===b?this.ye?this.ye(a):"msg"in a&&"undefined"!==typeof console&&console.log("FIREBASE: "+a.msg.replace("\n","\nFIREBASE: ")):cd("Unrecognized action received from server: "+
B(b)+"\nAre you using the latest client?"))}};
g.Mc=function(a,b){this.f("connection ready");this.ma=!0;this.Bc=(new Date).getTime();this.te({serverTimeOffset:a-(new Date).getTime()});this.Db=b;if(this.Te){var c={};c["sdk.js."+firebase.SDK_VERSION.replace(/\./g,"-")]=1;"undefined"!==typeof window&&(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test("undefined"!==typeof navigator&&"string"===typeof navigator.userAgent?navigator.userAgent:"")?c["framework.cordova"]=1:"object"===typeof navigator&&
"ReactNative"===navigator.product&&(c["framework.reactnative"]=1);this.xe(c)}wh(this);this.Te=!1;this.Kc(!0)};function mh(a,b){H(!a.Ia,"Scheduling a connect when we're already connected/ing?");a.vb&&clearTimeout(a.vb);a.vb=setTimeout(function(){a.vb=null;xh(a)},Math.floor(b))}g.hg=function(a){a&&!this.Nb&&this.fb===this.td&&(this.f("Window became visible.  Reducing delay."),this.fb=1E3,this.Ia||mh(this,0));this.Nb=a};
g.gg=function(a){a?(this.f("Browser went online."),this.fb=1E3,this.Ia||mh(this,0)):(this.f("Browser went offline.  Killing connection."),this.Ia&&this.Ia.close())};
g.gf=function(){this.f("data client disconnected");this.ma=!1;this.Ia=null;for(var a=0;a<this.pa.length;a++){var b=this.pa[a];b&&"h"in b.qf&&b.og&&(b.G&&b.G("disconnect"),delete this.pa[a],this.Pc--)}0===this.Pc&&(this.pa=[]);this.Gd={};yh(this)&&(this.Nb?this.Bc&&(3E4<(new Date).getTime()-this.Bc&&(this.fb=1E3),this.Bc=null):(this.f("Window isn't visible.  Delaying reconnect."),this.fb=this.td,this.le=(new Date).getTime()),a=Math.max(0,this.fb-((new Date).getTime()-this.le)),a*=Math.random(),this.f("Trying to reconnect in "+
a+"ms"),mh(this,a),this.fb=Math.min(this.td,1.3*this.fb));this.Kc(!1)};
function xh(a){if(yh(a)){a.f("Making a connection attempt");a.le=(new Date).getTime();a.Bc=null;var b=r(a.wd,a),c=r(a.Mc,a),d=r(a.gf,a),e=a.id+":"+nh++,f=a.Db,h=!1,k=null,m=function(){k?k.close():(h=!0,d())};a.Ia={close:m,ua:function(a){H(k,"sendRequest call when we're not connected not allowed.");k.ua(a)}};var l=a.de;a.de=!1;a.Vd.getToken(l).then(function(l){h?E("getToken() completed but was canceled"):(E("getToken() completed. Creating connection."),a.pb=l&&l.accessToken,k=new Ye(e,a.M,b,c,d,function(b){O(b+
" ("+a.M.toString()+")");a.bb("server_kill")},f))}).then(null,function(b){a.f("Failed to get token: "+b);h||m()})}}g.bb=function(a){E("Interrupting connection for reason: "+a);this.qd[a]=!0;this.Ia?this.Ia.close():(this.vb&&(clearTimeout(this.vb),this.vb=null),this.ma&&this.gf())};g.lc=function(a){E("Resuming connection for reason: "+a);delete this.qd[a];xa(this.qd)&&(this.fb=1E3,this.Ia||mh(this,0))};
function vh(a,b,c){c=c?La(c,function(a){return jd(a)}).join("$"):"default";(a=ph(a,b,c))&&a.G&&a.G("permission_denied")}function ph(a,b,c){b=(new L(b)).toString();var d;p(a.$[b])?(d=a.$[b][c],delete a.$[b][c],0===qa(a.$[b])&&delete a.$[b]):d=void 0;return d}function rh(a,b,c){E("Auth token revoked: "+b+"/"+c);a.pb=null;a.de=!0;a.Ia.close()}
function wh(a){qh(a);t(a.$,function(b){t(b,function(b){oh(a,b)})});for(var b=0;b<a.pa.length;b++)a.pa[b]&&uh(a,b);for(;a.Lc.length;)b=a.Lc.shift(),sh(a,b.action,b.ve,b.data,b.G)}function yh(a){var b;b=Of.Wb().ic;return xa(a.qd)&&b};var Y={Vf:function(){Ne=td=!0}};Y.forceLongPolling=Y.Vf;Y.Wf=function(){Oe=!0};Y.forceWebSockets=Y.Wf;Y.bg=function(){return rd.isAvailable()};Y.isWebSocketsAvailable=Y.bg;Y.ug=function(a,b){a.w.Ua.ye=b};Y.setSecurityDebugCallback=Y.ug;Y.Ae=function(a,b){a.w.Ae(b)};Y.stats=Y.Ae;Y.Be=function(a,b){a.w.Be(b)};Y.statsIncrementCounter=Y.Be;Y.ed=function(a){return a.w.ed};Y.dataUpdateCount=Y.ed;Y.ag=function(a,b){a.w.je=b};Y.interceptServerData=Y.ag;function zh(a){this.wa=Q;this.lb=new Yg;this.Ce={};this.jc={};this.Dc=a}function Ah(a,b,c,d,e){var f=a.lb,h=e;H(d>f.Cc,"Stacking an older write on top of newer ones");p(h)||(h=!0);f.la.push({path:b,Ja:c,Zc:d,visible:h});h&&(f.T=Og(f.T,b,c));f.Cc=d;return e?Bh(a,new Zb(Jg,b,c)):[]}function Ch(a,b,c,d){var e=a.lb;H(d>e.Cc,"Stacking an older merge on top of newer ones");e.la.push({path:b,children:c,Zc:d,visible:!0});e.T=Pg(e.T,b,c);e.Cc=d;c=xg(c);return Bh(a,new Cd(Jg,b,c))}
function Dh(a,b,c){c=c||!1;var d=Zg(a.lb,b);if(a.lb.Ed(b)){var e=Q;null!=d.Ja?e=e.set(C,!0):Cb(d.children,function(a,b){e=e.set(new L(a),b)});return Bh(a,new Ig(d.path,e,c))}return[]}function Eh(a,b,c){c=xg(c);return Bh(a,new Cd(Lg,b,c))}function Fh(a,b,c,d){d=Gh(a,d);if(null!=d){var e=Hh(d);d=e.path;e=e.Ib;b=T(d,b);c=new Zb(new Kg(!1,!0,e,!0),b,c);return Ih(a,d,c)}return[]}
function Jh(a,b,c,d){if(d=Gh(a,d)){var e=Hh(d);d=e.path;e=e.Ib;b=T(d,b);c=xg(c);c=new Cd(new Kg(!1,!0,e,!0),b,c);return Ih(a,d,c)}return[]}
zh.prototype.Ob=function(a,b){var c=a.path,d=null,e=!1;Eg(this.wa,c,function(a,b){var f=T(a,c);d=d||b.jb(f);e=e||null!=Vg(b)});var f=this.wa.get(c);f?(e=e||null!=Vg(f),d=d||f.jb(C)):(f=new Ug,this.wa=this.wa.set(c,f));var h;null!=d?h=!0:(h=!1,d=F,Hg(this.wa.subtree(c),function(a,b){var c=b.jb(C);c&&(d=d.U(a,c))}));var k=null!=Xg(f,a);if(!k&&!S(a.n)){var m=Kh(a);H(!(m in this.jc),"View does not exist, but we have a tag");var l=Lh++;this.jc[m]=l;this.Ce["_"+l]=m}h=f.Ob(a,b,new ch(c,this.lb),d,h);k||
e||(f=Xg(f,a),h=h.concat(Mh(this,a,f)));return h};
zh.prototype.mb=function(a,b,c){var d=a.path,e=this.wa.get(d),f=[];if(e&&("default"===a.ya()||null!=Xg(e,a))){f=e.mb(a,b,c);e.e()&&(this.wa=this.wa.remove(d));e=f.qg;f=f.Rf;b=-1!==Pa(e,function(a){return S(a.n)});var h=Cg(this.wa,d,function(a,b){return null!=Vg(b)});if(b&&!h&&(d=this.wa.subtree(d),!d.e()))for(var d=Nh(d),k=0;k<d.length;++k){var m=d[k],l=m.W,m=Oh(this,m);this.Dc.ze(Ph(l),Qh(this,l),m.ld,m.G)}if(!h&&0<e.length&&!c)if(b)this.Dc.Od(Ph(a),null);else{var u=this;Ja(e,function(a){a.ya();
var b=u.jc[Kh(a)];u.Dc.Od(Ph(a),b)})}Rh(this,e)}return f};zh.prototype.Ba=function(a,b){var c=this.lb,d=Cg(this.wa,a,function(b,c){var d=T(b,a);if(d=c.jb(d))return d});return c.Ba(a,d,b,!0)};function Nh(a){return Ag(a,function(a,c,d){if(c&&null!=Vg(c))return[Vg(c)];var e=[];c&&(e=Wg(c));t(d,function(a){e=e.concat(a)});return e})}function Rh(a,b){for(var c=0;c<b.length;++c){var d=b[c];if(!S(d.n)){var d=Kh(d),e=a.jc[d];delete a.jc[d];delete a.Ce["_"+e]}}}
function Ph(a){return S(a.n)&&!zd(a.n)?a.xb():a}function Mh(a,b,c){var d=b.path,e=Qh(a,b);c=Oh(a,c);b=a.Dc.ze(Ph(b),e,c.ld,c.G);d=a.wa.subtree(d);if(e)H(null==Vg(d.value),"If we're adding a query, it shouldn't be shadowed");else for(e=Ag(d,function(a,b,c){if(!a.e()&&b&&null!=Vg(b))return[lg(Vg(b))];var d=[];b&&(d=d.concat(La(Wg(b),function(a){return a.W})));t(c,function(a){d=d.concat(a)});return d}),d=0;d<e.length;++d)c=e[d],a.Dc.Od(Ph(c),Qh(a,c));return b}
function Oh(a,b){var c=b.W,d=Qh(a,c);return{ld:function(){return(b.u()||F).hash()},G:function(b){if("ok"===b){if(d){var f=c.path;if(b=Gh(a,d)){var h=Hh(b);b=h.path;h=h.Ib;f=T(b,f);f=new ac(new Kg(!1,!0,h,!0),f);b=Ih(a,b,f)}else b=[]}else b=Bh(a,new ac(Lg,c.path));return b}f="Unknown Error";"too_big"===b?f="The data requested exceeds the maximum size that can be accessed with a single request.":"permission_denied"==b?f="Client doesn't have permission to access the desired data.":"unavailable"==b&&
(f="The service is unavailable");f=Error(b+" at "+c.path.toString()+": "+f);f.code=b.toUpperCase();return a.mb(c,null,f)}}}function Kh(a){return a.path.toString()+"$"+a.ya()}function Hh(a){var b=a.indexOf("$");H(-1!==b&&b<a.length-1,"Bad queryKey.");return{Ib:a.substr(b+1),path:new L(a.substr(0,b))}}function Gh(a,b){var c=a.Ce,d="_"+b;return d in c?c[d]:void 0}function Qh(a,b){var c=Kh(b);return x(a.jc,c)}var Lh=1;
function Ih(a,b,c){var d=a.wa.get(b);H(d,"Missing sync point for query tag that we're tracking");return d.gb(c,new ch(b,a.lb),null)}function Bh(a,b){return Sh(a,b,a.wa,null,new ch(C,a.lb))}function Sh(a,b,c,d,e){if(b.path.e())return Th(a,b,c,d,e);var f=c.get(C);null==d&&null!=f&&(d=f.jb(C));var h=[],k=J(b.path),m=b.Nc(k);if((c=c.children.get(k))&&m)var l=d?d.R(k):null,k=e.m(k),h=h.concat(Sh(a,m,c,l,k));f&&(h=h.concat(f.gb(b,e,d)));return h}
function Th(a,b,c,d,e){var f=c.get(C);null==d&&null!=f&&(d=f.jb(C));var h=[];c.children.ia(function(c,f){var l=d?d.R(c):null,u=e.m(c),z=b.Nc(c);z&&(h=h.concat(Th(a,z,f,l,u)))});f&&(h=h.concat(f.gb(b,e,d)));return h};function pf(a,b,c){this.app=c;var d=new cc(c);this.M=a;this.Wa=oc(a);this.Vc=null;this.da=new qc;this.vd=1;this.Ua=null;if(b||0<=("object"===typeof window&&window.navigator&&window.navigator.userAgent||"").search(/googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i))this.va=new xd(this.M,r(this.Hb,this),d),setTimeout(r(this.Kc,this,!0),0);else{b=c.options.databaseAuthVariableOverride||null;if(null!==b){if("object"!==ca(b))throw Error("Only objects are supported for option databaseAuthVariableOverride");
try{B(b)}catch(e){throw Error("Invalid authOverride provided: "+e);}}this.va=this.Ua=new kh(this.M,r(this.Hb,this),r(this.Kc,this),r(this.te,this),d,b)}var f=this;dc(d,function(a){f.va.of(a)});this.wg=pc(a,r(function(){return new ic(this.Wa,this.va)},this));this.nc=new eh;this.ie=new ec;this.pd=new zh({ze:function(a,b,c,d){b=[];c=f.ie.j(a.path);c.e()||(b=Bh(f.pd,new Zb(Lg,a.path,c)),setTimeout(function(){d("ok")},0));return b},Od:aa});Uh(this,"connected",!1);this.ja=new Qc;this.Za=new of(this);this.ed=
0;this.je=null;this.K=new zh({ze:function(a,b,c,d){f.va.bf(a,c,b,function(b,c){var e=d(b,c);vc(f.da,a.path,e)});return[]},Od:function(a,b){f.va.Cf(a,b)}})}g=pf.prototype;g.toString=function(){return(this.M.Sc?"https://":"http://")+this.M.host};g.name=function(){return this.M.oe};function Vh(a){a=a.ie.j(new L(".info/serverTimeOffset")).H()||0;return(new Date).getTime()+a}function Wh(a){a=a={timestamp:Vh(a)};a.timestamp=a.timestamp||(new Date).getTime();return a}
g.Hb=function(a,b,c,d){this.ed++;var e=new L(a);b=this.je?this.je(a,b):b;a=[];d?c?(b=oa(b,function(a){return M(a)}),a=Jh(this.K,e,b,d)):(b=M(b),a=Fh(this.K,e,b,d)):c?(d=oa(b,function(a){return M(a)}),a=Eh(this.K,e,d)):(d=M(b),a=Bh(this.K,new Zb(Lg,e,d)));d=e;0<a.length&&(d=Xh(this,e));vc(this.da,d,a)};g.Kc=function(a){Uh(this,"connected",a);!1===a&&Yh(this)};g.te=function(a){var b=this;ld(a,function(a,d){Uh(b,d,a)})};
function Uh(a,b,c){b=new L("/.info/"+b);c=M(c);var d=a.ie;d.Jd=d.Jd.F(b,c);c=Bh(a.pd,new Zb(Lg,b,c));vc(a.da,b,c)}g.Kb=function(a,b,c,d){this.f("set",{path:a.toString(),value:b,Cg:c});var e=Wh(this);b=M(b,c);var e=Tc(b,e),f=this.vd++,e=Ah(this.K,a,e,f,!0);rc(this.da,e);var h=this;this.va.put(a.toString(),b.H(!0),function(b,c){var e="ok"===b;e||O("set at "+a+" failed: "+b);e=Dh(h.K,f,!e);vc(h.da,a,e);Zh(d,b,c)});e=$h(this,a);Xh(this,e);vc(this.da,e,[])};
g.update=function(a,b,c){this.f("update",{path:a.toString(),value:b});var d=!0,e=Wh(this),f={};t(b,function(a,b){d=!1;var c=M(a);f[b]=Tc(c,e)});if(d)E("update() called with empty data.  Don't do anything."),Zh(c,"ok");else{var h=this.vd++,k=Ch(this.K,a,f,h);rc(this.da,k);var m=this;this.va.cf(a.toString(),b,function(b,d){var e="ok"===b;e||O("update at "+a+" failed: "+b);var e=Dh(m.K,h,!e),f=a;0<e.length&&(f=Xh(m,a));vc(m.da,f,e);Zh(c,b,d)});b=$h(this,a);Xh(this,b);vc(this.da,a,[])}};
function Yh(a){a.f("onDisconnectEvents");var b=Wh(a),c=[];Rc(Pc(a.ja,b),C,function(b,e){c=c.concat(Bh(a.K,new Zb(Lg,b,e)));var f=$h(a,b);Xh(a,f)});a.ja=new Qc;vc(a.da,C,c)}g.xd=function(a,b){var c=this;this.va.xd(a.toString(),function(d,e){"ok"===d&&vf(c.ja,a);Zh(b,d,e)})};function Jf(a,b,c,d){var e=M(c);a.va.qe(b.toString(),e.H(!0),function(c,h){"ok"===c&&Sc(a.ja,b,e);Zh(d,c,h)})}function Kf(a,b,c,d,e){var f=M(c,d);a.va.qe(b.toString(),f.H(!0),function(c,d){"ok"===c&&Sc(a.ja,b,f);Zh(e,c,d)})}
function Lf(a,b,c,d){var e=!0,f;for(f in c)e=!1;e?(E("onDisconnect().update() called with empty data.  Don't do anything."),Zh(d,"ok")):a.va.ef(b.toString(),c,function(e,f){if("ok"===e)for(var m in c){var l=M(c[m]);Sc(a.ja,b.m(m),l)}Zh(d,e,f)})}function ug(a,b,c){c=".info"===J(b.path)?a.pd.Ob(b,c):a.K.Ob(b,c);tc(a.da,b.path,c)}g.bb=function(){this.Ua&&this.Ua.bb("repo_interrupt")};g.lc=function(){this.Ua&&this.Ua.lc("repo_interrupt")};
g.Ae=function(a){if("undefined"!==typeof console){a?(this.Vc||(this.Vc=new jc(this.Wa)),a=this.Vc.get()):a=this.Wa.get();var b=Ma(ta(a),function(a,b){return Math.max(b.length,a)},0),c;for(c in a){for(var d=a[c],e=c.length;e<b+2;e++)c+=" ";console.log(c+d)}}};g.Be=function(a){lc(this.Wa,a);this.wg.xf[a]=!0};g.f=function(a){var b="";this.Ua&&(b=this.Ua.id+":");E(b,arguments)};
function Zh(a,b,c){a&&Tb(function(){if("ok"==b)a(null);else{var d=(b||"error").toUpperCase(),e=d;c&&(e+=": "+c);e=Error(e);e.code=d;a(e)}})};function ai(a,b,c,d,e){function f(){}a.f("transaction on "+b);var h=new U(a,b);h.hc("value",f);c={path:b,update:c,G:d,status:null,jf:Vc(),He:e,tf:0,Rd:function(){h.Jc("value",f)},Td:null,Da:null,bd:null,cd:null,dd:null};d=a.K.Ba(b,void 0)||F;c.bd=d;d=c.update(d.H());if(p(d)){Bf("transaction failed: Data returned ",d,c.path);c.status=1;e=fh(a.nc,b);var k=e.Ea()||[];k.push(c);gh(e,k);"object"===typeof d&&null!==d&&Bb(d,".priority")?(k=x(d,".priority"),H(zf(k),"Invalid priority returned by transaction. Priority must be a valid string, finite number, server value, or null.")):
k=(a.K.Ba(b)||F).C().H();e=Wh(a);d=M(d,k);e=Tc(d,e);c.cd=d;c.dd=e;c.Da=a.vd++;c=Ah(a.K,b,e,c.Da,c.He);vc(a.da,b,c);bi(a)}else c.Rd(),c.cd=null,c.dd=null,c.G&&(a=new W(c.bd,new U(a,c.path),N),c.G(null,!1,a))}function bi(a,b){var c=b||a.nc;b||ci(a,c);if(null!==c.Ea()){var d=di(a,c);H(0<d.length,"Sending zero length transaction queue");Na(d,function(a){return 1===a.status})&&ei(a,c.path(),d)}else c.kd()&&c.P(function(b){bi(a,b)})}
function ei(a,b,c){for(var d=La(c,function(a){return a.Da}),e=a.K.Ba(b,d)||F,d=e,e=e.hash(),f=0;f<c.length;f++){var h=c[f];H(1===h.status,"tryToSendTransactionQueue_: items in queue should all be run.");h.status=2;h.tf++;var k=T(b,h.path),d=d.F(k,h.cd)}d=d.H(!0);a.va.put(b.toString(),d,function(d){a.f("transaction put response",{path:b.toString(),status:d});var e=[];if("ok"===d){d=[];for(f=0;f<c.length;f++){c[f].status=3;e=e.concat(Dh(a.K,c[f].Da));if(c[f].G){var h=c[f].dd,k=new U(a,c[f].path);d.push(r(c[f].G,
null,null,!0,new W(h,k,N)))}c[f].Rd()}ci(a,fh(a.nc,b));bi(a);vc(a.da,b,e);for(f=0;f<d.length;f++)Tb(d[f])}else{if("datastale"===d)for(f=0;f<c.length;f++)c[f].status=4===c[f].status?5:1;else for(O("transaction at "+b.toString()+" failed: "+d),f=0;f<c.length;f++)c[f].status=5,c[f].Td=d;Xh(a,b)}},e)}function Xh(a,b){var c=fi(a,b),d=c.path(),c=di(a,c);gi(a,c,d);return d}
function gi(a,b,c){if(0!==b.length){for(var d=[],e=[],f=La(b,function(a){return a.Da}),h=0;h<b.length;h++){var k=b[h],m=T(c,k.path),l=!1,u;H(null!==m,"rerunTransactionsUnderNode_: relativePath should not be null.");if(5===k.status)l=!0,u=k.Td,e=e.concat(Dh(a.K,k.Da,!0));else if(1===k.status)if(25<=k.tf)l=!0,u="maxretry",e=e.concat(Dh(a.K,k.Da,!0));else{var z=a.K.Ba(k.path,f)||F;k.bd=z;var G=b[h].update(z.H());p(G)?(Bf("transaction failed: Data returned ",G,k.path),m=M(G),"object"===typeof G&&null!=
G&&Bb(G,".priority")||(m=m.ga(z.C())),z=k.Da,G=Wh(a),G=Tc(m,G),k.cd=m,k.dd=G,k.Da=a.vd++,Qa(f,z),e=e.concat(Ah(a.K,k.path,G,k.Da,k.He)),e=e.concat(Dh(a.K,z,!0))):(l=!0,u="nodata",e=e.concat(Dh(a.K,k.Da,!0)))}vc(a.da,c,e);e=[];l&&(b[h].status=3,setTimeout(b[h].Rd,Math.floor(0)),b[h].G&&("nodata"===u?(k=new U(a,b[h].path),d.push(r(b[h].G,null,null,!1,new W(b[h].bd,k,N)))):d.push(r(b[h].G,null,Error(u),!1,null))))}ci(a,a.nc);for(h=0;h<d.length;h++)Tb(d[h]);bi(a)}}
function fi(a,b){for(var c,d=a.nc;null!==(c=J(b))&&null===d.Ea();)d=fh(d,c),b=D(b);return d}function di(a,b){var c=[];hi(a,b,c);c.sort(function(a,b){return a.jf-b.jf});return c}function hi(a,b,c){var d=b.Ea();if(null!==d)for(var e=0;e<d.length;e++)c.push(d[e]);b.P(function(b){hi(a,b,c)})}function ci(a,b){var c=b.Ea();if(c){for(var d=0,e=0;e<c.length;e++)3!==c[e].status&&(c[d]=c[e],d++);c.length=d;gh(b,0<c.length?c:null)}b.P(function(b){ci(a,b)})}
function $h(a,b){var c=fi(a,b).path(),d=fh(a.nc,b);jh(d,function(b){ii(a,b)});ii(a,d);ih(d,function(b){ii(a,b)});return c}
function ii(a,b){var c=b.Ea();if(null!==c){for(var d=[],e=[],f=-1,h=0;h<c.length;h++)4!==c[h].status&&(2===c[h].status?(H(f===h-1,"All SENT items should be at beginning of queue."),f=h,c[h].status=4,c[h].Td="set"):(H(1===c[h].status,"Unexpected transaction status in abort"),c[h].Rd(),e=e.concat(Dh(a.K,c[h].Da,!0)),c[h].G&&d.push(r(c[h].G,null,Error("set"),!1,null))));-1===f?gh(b,null):c.length=f+1;vc(a.da,b.path(),e);for(h=0;h<d.length;h++)Tb(d[h])}};function uf(){this.nb={};this.Df=!1}uf.prototype.bb=function(){for(var a in this.nb)this.nb[a].bb()};uf.prototype.lc=function(){for(var a in this.nb)this.nb[a].lc()};uf.prototype.ce=function(a){this.Df=a};ba(uf);uf.prototype.interrupt=uf.prototype.bb;uf.prototype.resume=uf.prototype.lc;var Z={};Z.pc=kh;Z.DataConnection=Z.pc;kh.prototype.vg=function(a,b){this.ua("q",{p:a},b)};Z.pc.prototype.simpleListen=Z.pc.prototype.vg;kh.prototype.Of=function(a,b){this.ua("echo",{d:a},b)};Z.pc.prototype.echo=Z.pc.prototype.Of;kh.prototype.interrupt=kh.prototype.bb;Z.Gf=Ye;Z.RealTimeConnection=Z.Gf;Ye.prototype.sendRequest=Ye.prototype.ua;Ye.prototype.close=Ye.prototype.close;
Z.$f=function(a){var b=kh.prototype.put;kh.prototype.put=function(c,d,e,f){p(f)&&(f=a());b.call(this,c,d,e,f)};return function(){kh.prototype.put=b}};Z.hijackHash=Z.$f;Z.Ff=fc;Z.ConnectionTarget=Z.Ff;Z.ya=function(a){return a.ya()};Z.queryIdentifier=Z.ya;Z.cg=function(a){return a.w.Ua.$};Z.listens=Z.cg;Z.ce=function(a){uf.Wb().ce(a)};Z.forceRestClient=Z.ce;Z.Context=uf;function U(a,b){if(!(a instanceof pf))throw Error("new Firebase() no longer supported - use app.database().");X.call(this,a,b,Be,!1);this.then=void 0;this["catch"]=void 0}ka(U,X);g=U.prototype;g.getKey=function(){y("Firebase.key",0,0,arguments.length);return this.path.e()?null:Xd(this.path)};
g.m=function(a){y("Firebase.child",1,1,arguments.length);if(fa(a))a=String(a);else if(!(a instanceof L))if(null===J(this.path)){var b=a;b&&(b=b.replace(/^\/*\.info(\/|$)/,"/"));Hf("Firebase.child",b)}else Hf("Firebase.child",a);return new U(this.w,this.path.m(a))};g.getParent=function(){y("Firebase.parent",0,0,arguments.length);var a=this.path.parent();return null===a?null:new U(this.w,a)};
g.Xf=function(){y("Firebase.ref",0,0,arguments.length);for(var a=this;null!==a.getParent();)a=a.getParent();return a};g.Nf=function(){return this.w.Za};g.set=function(a,b){y("Firebase.set",1,2,arguments.length);If("Firebase.set",this.path);Af("Firebase.set",a,this.path,!1);A("Firebase.set",2,b,!0);var c=new Hb;this.w.Kb(this.path,a,null,Ib(c,b));return c.ra};
g.update=function(a,b){y("Firebase.update",1,2,arguments.length);If("Firebase.update",this.path);if(da(a)){for(var c={},d=0;d<a.length;++d)c[""+d]=a[d];a=c;O("Passing an Array to Firebase.update() is deprecated. Use set() if you want to overwrite the existing data, or an Object with integer keys if you really do want to only update some of the children.")}Df("Firebase.update",a,this.path);A("Firebase.update",2,b,!0);c=new Hb;this.w.update(this.path,a,Ib(c,b));return c.ra};
g.Kb=function(a,b,c){y("Firebase.setWithPriority",2,3,arguments.length);If("Firebase.setWithPriority",this.path);Af("Firebase.setWithPriority",a,this.path,!1);Ef("Firebase.setWithPriority",2,b);A("Firebase.setWithPriority",3,c,!0);if(".length"===this.getKey()||".keys"===this.getKey())throw"Firebase.setWithPriority failed: "+this.getKey()+" is a read-only object.";var d=new Hb;this.w.Kb(this.path,a,b,Ib(d,c));return d.ra};
g.remove=function(a){y("Firebase.remove",0,1,arguments.length);If("Firebase.remove",this.path);A("Firebase.remove",1,a,!0);return this.set(null,a)};
g.transaction=function(a,b,c){y("Firebase.transaction",1,3,arguments.length);If("Firebase.transaction",this.path);A("Firebase.transaction",1,a,!1);A("Firebase.transaction",2,b,!0);if(p(c)&&"boolean"!=typeof c)throw Error(Db("Firebase.transaction",3,!0)+"must be a boolean.");if(".length"===this.getKey()||".keys"===this.getKey())throw"Firebase.transaction failed: "+this.getKey()+" is a read-only object.";"undefined"===typeof c&&(c=!0);var d=new Hb;ga(b)&&Jb(d.ra);ai(this.w,this.path,a,function(a,c,
h){a?d.reject(a):d.resolve(new Pb(c,h));ga(b)&&b(a,c,h)},c);return d.ra};g.tg=function(a,b){y("Firebase.setPriority",1,2,arguments.length);If("Firebase.setPriority",this.path);Ef("Firebase.setPriority",1,a);A("Firebase.setPriority",2,b,!0);var c=new Hb;this.w.Kb(this.path.m(".priority"),a,null,Ib(c,b));return c.ra};
g.push=function(a,b){y("Firebase.push",0,2,arguments.length);If("Firebase.push",this.path);Af("Firebase.push",a,this.path,!0);A("Firebase.push",2,b,!0);var c=Vh(this.w),d=Qf(c),c=this.m(d);if(null!=a){var e=this,f=c.set(a,b).then(function(){return e.m(d)});c.then=r(f.then,f);c["catch"]=r(f.then,f,void 0);ga(b)&&Jb(f)}return c};g.kb=function(){If("Firebase.onDisconnect",this.path);return new V(this.w,this.path)};U.prototype.child=U.prototype.m;U.prototype.set=U.prototype.set;U.prototype.update=U.prototype.update;
U.prototype.setWithPriority=U.prototype.Kb;U.prototype.remove=U.prototype.remove;U.prototype.transaction=U.prototype.transaction;U.prototype.setPriority=U.prototype.tg;U.prototype.push=U.prototype.push;U.prototype.onDisconnect=U.prototype.kb;od(U.prototype,"database",U.prototype.Nf);od(U.prototype,"key",U.prototype.getKey);od(U.prototype,"parent",U.prototype.getParent);od(U.prototype,"root",U.prototype.Xf);if("undefined"===typeof firebase)throw Error("Cannot install Firebase Database - be sure to load firebase-app.js first.");
try{firebase.INTERNAL.registerService("database",function(a){var b=uf.Wb(),c=a.options.databaseURL;p(c)||dd("Can't determine Firebase Database URL.  Be sure to include databaseURL option when calling firebase.intializeApp().");var d=ed(c),c=d.kc;tf("Invalid Firebase Database URL",d);d.path.e()||dd("Database URL must point to the root of a Firebase Database (not including a child path).");(d=x(b.nb,a.name))&&dd("FIREBASE INTERNAL ERROR: Database initialized multiple times.");d=new pf(c,b.Df,a);b.nb[a.name]=
d;return d.Za},{Reference:U,Query:X,Database:of,enableLogging:ad,INTERNAL:Y,TEST_ACCESS:Z,ServerValue:rf})}catch(ji){dd("Failed to register the Firebase Database Service ("+ji+")")};})();

(function() {var k,aa=aa||{},m=this,n=function(a){return void 0!==a},ba=function(){},p=function(a){var b=typeof a;if("object"==b)if(a){if(a instanceof Array)return"array";if(a instanceof Object)return b;var c=Object.prototype.toString.call(a);if("[object Window]"==c)return"object";if("[object Array]"==c||"number"==typeof a.length&&"undefined"!=typeof a.splice&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("splice"))return"array";if("[object Function]"==c||"undefined"!=typeof a.call&&"undefined"!=
typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("call"))return"function"}else return"null";else if("function"==b&&"undefined"==typeof a.call)return"object";return b},ca=function(a){var b=p(a);return"array"==b||"object"==b&&"number"==typeof a.length},q=function(a){return"string"==typeof a},r=function(a){return"function"==p(a)},da=function(a){var b=typeof a;return"object"==b&&null!=a||"function"==b},ea="closure_uid_"+(1E9*Math.random()>>>0),fa=0,ga=function(a,b,c){return a.call.apply(a.bind,
arguments)},ha=function(a,b,c){if(!a)throw Error();if(2<arguments.length){var d=Array.prototype.slice.call(arguments,2);return function(){var c=Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(c,d);return a.apply(b,c)}}return function(){return a.apply(b,arguments)}},v=function(a,b,c){v=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?ga:ha;return v.apply(null,arguments)},ia=Date.now||function(){return+new Date},w=function(a,b){function c(){}
c.prototype=b.prototype;a.G=b.prototype;a.prototype=new c;a.Ma=function(a,c,f){for(var g=Array(arguments.length-2),h=2;h<arguments.length;h++)g[h-2]=arguments[h];return b.prototype[c].apply(a,g)}};var ja=function(a,b,c){function d(){O||(O=!0,b.apply(null,arguments))}function e(b){l=setTimeout(function(){l=null;a(f,2===t)},b)}function f(a,b){if(!O)if(a)d.apply(null,arguments);else if(2===t||u)d.apply(null,arguments);else{64>h&&(h*=2);var c;1===t?(t=2,c=0):c=1E3*(h+Math.random());e(c)}}function g(a){Sb||(Sb=!0,O||(null!==l?(a||(t=2),clearTimeout(l),e(0)):a||(t=1)))}var h=1,l=null,u=!1,t=0,O=!1,Sb=!1;e(0);setTimeout(function(){u=!0;g(!0)},c);return g};var ka="https://firebasestorage.googleapis.com";var x=function(a,b){this.code="storage/"+a;this.message="Firebase Storage: "+b;this.serverResponse=null;this.name="FirebaseError"};w(x,Error);
var la=function(){return new x("unknown","An unknown error occurred, please check the error payload for server response.")},ma=function(){return new x("unauthenticated","User is not authenticated, please authenticate using Firebase Authentication and try again.")},na=function(a){return new x("unauthorized","User does not have permission to access '"+a+"'.")},oa=function(){return new x("canceled","User canceled the upload/download.")},pa=function(a,b,c){return new x("invalid-argument","Invalid argument in `"+
b+"` at index "+a+": "+c)},qa=function(){return new x("app-deleted","The Firebase app was deleted.")};var ra=function(a,b){for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&b(c,a[c])},sa=function(a){var b={};ra(a,function(a,d){b[a]=d});return b};var y=function(a,b,c,d){this.l=a;this.f={};this.i=b;this.b={};this.c="";this.N=c;this.g=this.a=null;this.h=[200];this.j=d};var ta={STATE_CHANGED:"state_changed"},ua={RUNNING:"running",PAUSED:"paused",SUCCESS:"success",CANCELED:"canceled",ERROR:"error"},va=function(a){switch(a){case "running":case "pausing":case "canceling":return"running";case "paused":return"paused";case "success":return"success";case "canceled":return"canceled";case "error":return"error";default:return"error"}};var z=function(a){return n(a)&&null!==a},wa=function(a){return"string"===typeof a||a instanceof String};var xa=function(a,b,c){this.f=c;this.c=a;this.g=b;this.b=0;this.a=null};xa.prototype.get=function(){var a;0<this.b?(this.b--,a=this.a,this.a=a.next,a.next=null):a=this.c();return a};var ya=function(a,b){a.g(b);a.b<a.f&&(a.b++,b.next=a.a,a.a=b)};var za=function(a){if(Error.captureStackTrace)Error.captureStackTrace(this,za);else{var b=Error().stack;b&&(this.stack=b)}a&&(this.message=String(a))};w(za,Error);za.prototype.name="CustomError";var Aa=function(a,b,c,d,e){this.reset(a,b,c,d,e)};Aa.prototype.a=null;var Ba=0;Aa.prototype.reset=function(a,b,c,d,e){"number"==typeof e||Ba++;d||ia();this.b=b;delete this.a};var Ca=function(a){var b=[],c=0,d;for(d in a)b[c++]=a[d];return b},Da=function(a){var b=[],c=0,d;for(d in a)b[c++]=d;return b},Ea=function(a){return null!==a&&"withCredentials"in a},Fa="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" "),Ga=function(a,b){for(var c,d,e=1;e<arguments.length;e++){d=arguments[e];for(c in d)a[c]=d[c];for(var f=0;f<Fa.length;f++)c=Fa[f],Object.prototype.hasOwnProperty.call(d,c)&&(a[c]=d[c])}};var Ha=function(a){a.prototype.then=a.prototype.then;a.prototype.$goog_Thenable=!0},Ia=function(a){if(!a)return!1;try{return!!a.$goog_Thenable}catch(b){return!1}};var Ja=function(a){Ja[" "](a);return a};Ja[" "]=ba;var Ka=function(a,b){for(var c=a.split("%s"),d="",e=Array.prototype.slice.call(arguments,1);e.length&&1<c.length;)d+=c.shift()+e.shift();return d+c.join("%s")},La=String.prototype.trim?function(a){return a.trim()}:function(a){return a.replace(/^[\s\xa0]+|[\s\xa0]+$/g,"")},Ma=function(a,b){return a<b?-1:a>b?1:0};var Na=function(a,b){this.a=a;this.b=b};Na.prototype.clone=function(){return new Na(this.a,this.b)};var A=function(a,b){this.bucket=a;this.path=b},Oa=function(a){var b=encodeURIComponent;return"/b/"+b(a.bucket)+"/o/"+b(a.path)},Pa=function(a){for(var b=null,c=[{ja:/^gs:\/\/([A-Za-z0-9.\-]+)(\/(.*))?$/i,aa:{bucket:1,path:3},ia:function(a){"/"===a.path.charAt(a.path.length-1)&&(a.path=a.path.slice(0,-1))}},{ja:/^https?:\/\/firebasestorage\.googleapis\.com\/v[A-Za-z0-9_]+\/b\/([A-Za-z0-9.\-]+)\/o(\/([^?#]*).*)?$/i,aa:{bucket:1,path:3},ia:function(a){a.path=decodeURIComponent(a.path)}}],d=0;d<c.length;d++){var e=
c[d],f=e.ja.exec(a);if(f){b=f[e.aa.bucket];(f=f[e.aa.path])||(f="");b=new A(b,f);e.ia(b);break}}if(null==b)throw new x("invalid-url","Invalid URL '"+a+"'.");return b};var Qa=function(a,b,c){r(a)||z(b)||z(c)?(this.next=a,this.error=b||null,this.a=c||null):(this.next=a.next||null,this.error=a.error||null,this.a=a.complete||null)};var Ra=function(a){var b=encodeURIComponent,c="?";ra(a,function(a,e){var f=b(a)+"="+b(e);c=c+f+"&"});return c=c.slice(0,-1)};var B=function(a,b,c,d,e,f){this.b=a;this.h=b;this.f=c;this.a=d;this.g=e;this.c=f};k=B.prototype;k.qa=function(){return this.b};k.La=function(){return this.h};k.Ia=function(){return this.f};k.Da=function(){return this.a};k.sa=function(){if(z(this.a)){var a=this.a.downloadURLs;return z(a)&&z(a[0])?a[0]:null}return null};k.Ka=function(){return this.g};k.Ga=function(){return this.c};var Sa=function(a,b){b.unshift(a);za.call(this,Ka.apply(null,b));b.shift()};w(Sa,za);Sa.prototype.name="AssertionError";
var Ta=function(a,b,c,d){var e="Assertion failed";if(c)var e=e+(": "+c),f=d;else a&&(e+=": "+a,f=b);throw new Sa(""+e,f||[]);},C=function(a,b,c){a||Ta("",null,b,Array.prototype.slice.call(arguments,2))},Ua=function(a,b){throw new Sa("Failure"+(a?": "+a:""),Array.prototype.slice.call(arguments,1));},Wa=function(a,b,c){r(a)||Ta("Expected function but got %s: %s.",[p(a),a],b,Array.prototype.slice.call(arguments,2))};var D=function(){this.g=this.g;this.s=this.s};D.prototype.g=!1;D.prototype.fa=function(){this.g||(this.g=!0,this.A())};D.prototype.A=function(){if(this.s)for(;this.s.length;)this.s.shift()()};var Xa="closure_listenable_"+(1E6*Math.random()|0),Ya=0;var Za;a:{var $a=m.navigator;if($a){var ab=$a.userAgent;if(ab){Za=ab;break a}}Za=""}var E=function(a){return-1!=Za.indexOf(a)};var bb=function(){};bb.prototype.a=null;var db=function(a){var b;(b=a.a)||(b={},cb(a)&&(b[0]=!0,b[1]=!0),b=a.a=b);return b};var eb=Array.prototype.indexOf?function(a,b,c){C(null!=a.length);return Array.prototype.indexOf.call(a,b,c)}:function(a,b,c){c=null==c?0:0>c?Math.max(0,a.length+c):c;if(q(a))return q(b)&&1==b.length?a.indexOf(b,c):-1;for(;c<a.length;c++)if(c in a&&a[c]===b)return c;return-1},fb=Array.prototype.forEach?function(a,b,c){C(null!=a.length);Array.prototype.forEach.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=q(a)?a.split(""):a,f=0;f<d;f++)f in e&&b.call(c,e[f],f,a)},gb=Array.prototype.filter?function(a,
b,c){C(null!=a.length);return Array.prototype.filter.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=[],f=0,g=q(a)?a.split(""):a,h=0;h<d;h++)if(h in g){var l=g[h];b.call(c,l,h,a)&&(e[f++]=l)}return e},hb=Array.prototype.map?function(a,b,c){C(null!=a.length);return Array.prototype.map.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=Array(d),f=q(a)?a.split(""):a,g=0;g<d;g++)g in f&&(e[g]=b.call(c,f[g],g,a));return e},ib=Array.prototype.some?function(a,b,c){C(null!=a.length);return Array.prototype.some.call(a,
b,c)}:function(a,b,c){for(var d=a.length,e=q(a)?a.split(""):a,f=0;f<d;f++)if(f in e&&b.call(c,e[f],f,a))return!0;return!1},kb=function(a){var b;a:{b=jb;for(var c=a.length,d=q(a)?a.split(""):a,e=0;e<c;e++)if(e in d&&b.call(void 0,d[e],e,a)){b=e;break a}b=-1}return 0>b?null:q(a)?a.charAt(b):a[b]},lb=function(a){if("array"!=p(a))for(var b=a.length-1;0<=b;b--)delete a[b];a.length=0},mb=function(a,b){var c=eb(a,b),d;if(d=0<=c)C(null!=a.length),Array.prototype.splice.call(a,c,1);return d},nb=function(a){var b=
a.length;if(0<b){for(var c=Array(b),d=0;d<b;d++)c[d]=a[d];return c}return[]};var pb=new xa(function(){return new ob},function(a){a.reset()},100),rb=function(){var a=qb,b=null;a.a&&(b=a.a,a.a=a.a.next,a.a||(a.b=null),b.next=null);return b},ob=function(){this.next=this.b=this.a=null};ob.prototype.set=function(a,b){this.a=a;this.b=b;this.next=null};ob.prototype.reset=function(){this.next=this.b=this.a=null};var sb=function(a,b){this.type=a;this.a=this.target=b;this.ka=!0};sb.prototype.b=function(){this.ka=!1};var tb=function(a,b,c,d,e){this.listener=a;this.a=null;this.src=b;this.type=c;this.U=!!d;this.N=e;++Ya;this.O=this.T=!1},ub=function(a){a.O=!0;a.listener=null;a.a=null;a.src=null;a.N=null};var vb=/^(?:([^:/?#.]+):)?(?:\/\/(?:([^/?#]*)@)?([^/#?]*?)(?::([0-9]+))?(?=[/#?]|$))?([^?#]+)?(?:\?([^#]*))?(?:#(.*))?$/;var wb=function(a,b){var c=gb(b.split("/"),function(a){return 0<a.length}).join("/");return 0===a.length?c:a+"/"+c},xb=function(a){var b=a.lastIndexOf("/",a.length-2);return-1===b?a:a.slice(b+1)};var yb=function(a){this.src=a;this.a={};this.b=0},Ab=function(a,b,c,d,e,f){var g=b.toString();b=a.a[g];b||(b=a.a[g]=[],a.b++);var h=zb(b,c,e,f);-1<h?(a=b[h],d||(a.T=!1)):(a=new tb(c,a.src,g,!!e,f),a.T=d,b.push(a));return a},Bb=function(a,b){var c=b.type;c in a.a&&mb(a.a[c],b)&&(ub(b),0==a.a[c].length&&(delete a.a[c],a.b--))},zb=function(a,b,c,d){for(var e=0;e<a.length;++e){var f=a[e];if(!f.O&&f.listener==b&&f.U==!!c&&f.N==d)return e}return-1};var Cb,Db=function(){};w(Db,bb);var Eb=function(a){return(a=cb(a))?new ActiveXObject(a):new XMLHttpRequest},cb=function(a){if(!a.b&&"undefined"==typeof XMLHttpRequest&&"undefined"!=typeof ActiveXObject){for(var b=["MSXML2.XMLHTTP.6.0","MSXML2.XMLHTTP.3.0","MSXML2.XMLHTTP","Microsoft.XMLHTTP"],c=0;c<b.length;c++){var d=b[c];try{return new ActiveXObject(d),a.b=d}catch(e){}}throw Error("Could not create ActiveXObject. ActiveX might be disabled, or MSXML might not be installed");}return a.b};Cb=new Db;var Fb=function(a){this.a=[];if(a)a:{var b;if(a instanceof Fb){if(b=a.D(),a=a.w(),0>=this.o()){for(var c=this.a,d=0;d<b.length;d++)c.push(new Na(b[d],a[d]));break a}}else b=Da(a),a=Ca(a);for(d=0;d<b.length;d++)Gb(this,b[d],a[d])}},Gb=function(a,b,c){var d=a.a;d.push(new Na(b,c));b=d.length-1;a=a.a;for(c=a[b];0<b;)if(d=b-1>>1,a[d].a>c.a)a[b]=a[d],b=d;else break;a[b]=c};k=Fb.prototype;k.w=function(){for(var a=this.a,b=[],c=a.length,d=0;d<c;d++)b.push(a[d].b);return b};
k.D=function(){for(var a=this.a,b=[],c=a.length,d=0;d<c;d++)b.push(a[d].a);return b};k.clone=function(){return new Fb(this)};k.o=function(){return this.a.length};k.F=function(){return 0==this.a.length};k.clear=function(){lb(this.a)};var Hb=function(){this.b=[];this.a=[]},Ib=function(a){0==a.b.length&&(a.b=a.a,a.b.reverse(),a.a=[]);return a.b.pop()};Hb.prototype.o=function(){return this.b.length+this.a.length};Hb.prototype.F=function(){return 0==this.b.length&&0==this.a.length};Hb.prototype.clear=function(){this.b=[];this.a=[]};Hb.prototype.w=function(){for(var a=[],b=this.b.length-1;0<=b;--b)a.push(this.b[b]);for(var c=this.a.length,b=0;b<c;++b)a.push(this.a[b]);return a};var Jb=function(a){if(a.w&&"function"==typeof a.w)return a.w();if(q(a))return a.split("");if(ca(a)){for(var b=[],c=a.length,d=0;d<c;d++)b.push(a[d]);return b}return Ca(a)},Kb=function(a,b){if(a.forEach&&"function"==typeof a.forEach)a.forEach(b,void 0);else if(ca(a)||q(a))fb(a,b,void 0);else{var c;if(a.D&&"function"==typeof a.D)c=a.D();else if(a.w&&"function"==typeof a.w)c=void 0;else if(ca(a)||q(a)){c=[];for(var d=a.length,e=0;e<d;e++)c.push(e)}else c=Da(a);for(var d=Jb(a),e=d.length,f=0;f<e;f++)b.call(void 0,
d[f],c&&c[f],a)}};var Lb=function(a){m.setTimeout(function(){throw a;},0)},Mb,Nb=function(){var a=m.MessageChannel;"undefined"===typeof a&&"undefined"!==typeof window&&window.postMessage&&window.addEventListener&&!E("Presto")&&(a=function(){var a=document.createElement("IFRAME");a.style.display="none";a.src="";document.documentElement.appendChild(a);var b=a.contentWindow,a=b.document;a.open();a.write("");a.close();var c="callImmediate"+Math.random(),d="file:"==b.location.protocol?"*":b.location.protocol+"//"+b.location.host,
a=v(function(a){if(("*"==d||a.origin==d)&&a.data==c)this.port1.onmessage()},this);b.addEventListener("message",a,!1);this.port1={};this.port2={postMessage:function(){b.postMessage(c,d)}}});if("undefined"!==typeof a&&!E("Trident")&&!E("MSIE")){var b=new a,c={},d=c;b.port1.onmessage=function(){if(n(c.next)){c=c.next;var a=c.ea;c.ea=null;a()}};return function(a){d.next={ea:a};d=d.next;b.port2.postMessage(0)}}return"undefined"!==typeof document&&"onreadystatechange"in document.createElement("SCRIPT")?
function(a){var b=document.createElement("SCRIPT");b.onreadystatechange=function(){b.onreadystatechange=null;b.parentNode.removeChild(b);b=null;a();a=null};document.documentElement.appendChild(b)}:function(a){m.setTimeout(a,0)}};var Ob="StopIteration"in m?m.StopIteration:{message:"StopIteration",stack:""},Pb=function(){};Pb.prototype.next=function(){throw Ob;};Pb.prototype.X=function(){return this};var Qb=function(){Fb.call(this)};w(Qb,Fb);var Rb=E("Opera"),F=E("Trident")||E("MSIE"),Tb=E("Edge"),Ub=E("Gecko")&&!(-1!=Za.toLowerCase().indexOf("webkit")&&!E("Edge"))&&!(E("Trident")||E("MSIE"))&&!E("Edge"),Vb=-1!=Za.toLowerCase().indexOf("webkit")&&!E("Edge"),Wb=function(){var a=m.document;return a?a.documentMode:void 0},Xb;
a:{var Yb="",Zb=function(){var a=Za;if(Ub)return/rv\:([^\);]+)(\)|;)/.exec(a);if(Tb)return/Edge\/([\d\.]+)/.exec(a);if(F)return/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(a);if(Vb)return/WebKit\/(\S+)/.exec(a);if(Rb)return/(?:Version)[ \/]?(\S+)/.exec(a)}();Zb&&(Yb=Zb?Zb[1]:"");if(F){var $b=Wb();if(null!=$b&&$b>parseFloat(Yb)){Xb=String($b);break a}}Xb=Yb}
var ac=Xb,bc={},G=function(a){var b;if(!(b=bc[a])){b=0;for(var c=La(String(ac)).split("."),d=La(String(a)).split("."),e=Math.max(c.length,d.length),f=0;0==b&&f<e;f++){var g=c[f]||"",h=d[f]||"",l=/(\d*)(\D*)/g,u=/(\d*)(\D*)/g;do{var t=l.exec(g)||["","",""],O=u.exec(h)||["","",""];if(0==t[0].length&&0==O[0].length)break;b=Ma(0==t[1].length?0:parseInt(t[1],10),0==O[1].length?0:parseInt(O[1],10))||Ma(0==t[2].length,0==O[2].length)||Ma(t[2],O[2])}while(0==b)}b=bc[a]=0<=b}return b},cc=m.document,dc=cc&&
F?Wb()||("CSS1Compat"==cc.compatMode?parseInt(ac,10):5):void 0;var hc=function(a,b){ec||fc();gc||(ec(),gc=!0);var c=qb,d=pb.get();d.set(a,b);c.b?c.b.next=d:(C(!c.a),c.a=d);c.b=d},ec,fc=function(){if(m.Promise&&m.Promise.resolve){var a=m.Promise.resolve(void 0);ec=function(){a.then(ic)}}else ec=function(){var a=ic;!r(m.setImmediate)||m.Window&&m.Window.prototype&&!E("Edge")&&m.Window.prototype.setImmediate==m.setImmediate?(Mb||(Mb=Nb()),Mb(a)):m.setImmediate(a)}},gc=!1,qb=new function(){this.b=this.a=null},ic=function(){for(var a=null;a=rb();){try{a.a.call(a.b)}catch(b){Lb(b)}ya(pb,
a)}gc=!1};var jc;(jc=!F)||(jc=9<=Number(dc));var kc=jc,lc=F&&!G("9");!Vb||G("528");Ub&&G("1.9b")||F&&G("8")||Rb&&G("9.5")||Vb&&G("528");Ub&&!G("8")||F&&G("9");var mc=function(a,b){this.b={};this.a=[];this.f=this.c=0;var c=arguments.length;if(1<c){if(c%2)throw Error("Uneven number of arguments");for(var d=0;d<c;d+=2)this.set(arguments[d],arguments[d+1])}else if(a){a instanceof mc?(c=a.D(),d=a.w()):(c=Da(a),d=Ca(a));for(var e=0;e<c.length;e++)this.set(c[e],d[e])}};k=mc.prototype;k.o=function(){return this.c};k.w=function(){nc(this);for(var a=[],b=0;b<this.a.length;b++)a.push(this.b[this.a[b]]);return a};k.D=function(){nc(this);return this.a.concat()};
k.F=function(){return 0==this.c};k.clear=function(){this.b={};this.f=this.c=this.a.length=0};
var oc=function(a,b){return Object.prototype.hasOwnProperty.call(a.b,b)?(delete a.b[b],a.c--,a.f++,a.a.length>2*a.c&&nc(a),!0):!1},nc=function(a){if(a.c!=a.a.length){for(var b=0,c=0;b<a.a.length;){var d=a.a[b];Object.prototype.hasOwnProperty.call(a.b,d)&&(a.a[c++]=d);b++}a.a.length=c}if(a.c!=a.a.length){for(var e={},c=b=0;b<a.a.length;)d=a.a[b],Object.prototype.hasOwnProperty.call(e,d)||(a.a[c++]=d,e[d]=1),b++;a.a.length=c}};k=mc.prototype;
k.get=function(a,b){return Object.prototype.hasOwnProperty.call(this.b,a)?this.b[a]:b};k.set=function(a,b){Object.prototype.hasOwnProperty.call(this.b,a)||(this.c++,this.a.push(a),this.f++);this.b[a]=b};k.forEach=function(a,b){for(var c=this.D(),d=0;d<c.length;d++){var e=c[d],f=this.get(e);a.call(b,f,e,this)}};k.clone=function(){return new mc(this)};
k.X=function(a){nc(this);var b=0,c=this.f,d=this,e=new Pb;e.next=function(){if(c!=d.f)throw Error("The map has changed since the iterator was created");if(b>=d.a.length)throw Ob;var e=d.a[b++];return a?e:d.b[e]};return e};var pc=function(a,b){sb.call(this,a?a.type:"");this.c=this.a=this.target=null;if(a){this.type=a.type;this.target=a.target||a.srcElement;this.a=b;var c=a.relatedTarget;if(c&&Ub)try{Ja(c.nodeName)}catch(d){}this.c=a;a.defaultPrevented&&this.b()}};w(pc,sb);pc.prototype.b=function(){pc.G.b.call(this);var a=this.c;if(a.preventDefault)a.preventDefault();else if(a.returnValue=!1,lc)try{if(a.ctrlKey||112<=a.keyCode&&123>=a.keyCode)a.keyCode=-1}catch(b){}};var H=function(a,b){this.a=0;this.i=void 0;this.c=this.b=this.f=null;this.g=this.h=!1;if(a!=ba)try{var c=this;a.call(b,function(a){qc(c,2,a)},function(a){try{if(a instanceof Error)throw a;throw Error("Promise rejected.");}catch(b){}qc(c,3,a)})}catch(d){qc(this,3,d)}},rc=function(){this.next=this.f=this.c=this.a=this.b=null;this.g=!1};rc.prototype.reset=function(){this.f=this.c=this.a=this.b=null;this.g=!1};
var sc=new xa(function(){return new rc},function(a){a.reset()},100),tc=function(a,b,c){var d=sc.get();d.a=a;d.c=b;d.f=c;return d},uc=function(a){if(a instanceof H)return a;var b=new H(ba);qc(b,2,a);return b},vc=function(a){return new H(function(b,c){c(a)})};
H.prototype.then=function(a,b,c){null!=a&&Wa(a,"opt_onFulfilled should be a function.");null!=b&&Wa(b,"opt_onRejected should be a function. Did you pass opt_context as the second argument instead of the third?");return wc(this,r(a)?a:null,r(b)?b:null,c)};Ha(H);H.prototype.l=function(a,b){return wc(this,null,a,b)};
var yc=function(a,b){a.b||2!=a.a&&3!=a.a||xc(a);C(null!=b.a);a.c?a.c.next=b:a.b=b;a.c=b},wc=function(a,b,c,d){var e=tc(null,null,null);e.b=new H(function(a,g){e.a=b?function(c){try{var e=b.call(d,c);a(e)}catch(u){g(u)}}:a;e.c=c?function(b){try{var e=c.call(d,b);a(e)}catch(u){g(u)}}:g});e.b.f=a;yc(a,e);return e.b};H.prototype.s=function(a){C(1==this.a);this.a=0;qc(this,2,a)};H.prototype.m=function(a){C(1==this.a);this.a=0;qc(this,3,a)};
var qc=function(a,b,c){if(0==a.a){a==c&&(b=3,c=new TypeError("Promise cannot resolve to itself"));a.a=1;var d;a:{var e=c,f=a.s,g=a.m;if(e instanceof H)null!=f&&Wa(f,"opt_onFulfilled should be a function."),null!=g&&Wa(g,"opt_onRejected should be a function. Did you pass opt_context as the second argument instead of the third?"),yc(e,tc(f||ba,g||null,a)),d=!0;else if(Ia(e))e.then(f,g,a),d=!0;else{if(da(e))try{var h=e.then;if(r(h)){zc(e,h,f,g,a);d=!0;break a}}catch(l){g.call(a,l);d=!0;break a}d=!1}}d||
(a.i=c,a.a=b,a.f=null,xc(a),3!=b||Ac(a,c))}},zc=function(a,b,c,d,e){var f=!1,g=function(a){f||(f=!0,c.call(e,a))},h=function(a){f||(f=!0,d.call(e,a))};try{b.call(a,g,h)}catch(l){h(l)}},xc=function(a){a.h||(a.h=!0,hc(a.j,a))},Bc=function(a){var b=null;a.b&&(b=a.b,a.b=b.next,b.next=null);a.b||(a.c=null);null!=b&&C(null!=b.a);return b};
H.prototype.j=function(){for(var a=null;a=Bc(this);){var b=this.a,c=this.i;if(3==b&&a.c&&!a.g)for(var d=void 0,d=this;d&&d.g;d=d.f)d.g=!1;if(a.b)a.b.f=null,Cc(a,b,c);else try{a.g?a.a.call(a.f):Cc(a,b,c)}catch(e){Dc.call(null,e)}ya(sc,a)}this.h=!1};var Cc=function(a,b,c){2==b?a.a.call(a.f,c):a.c&&a.c.call(a.f,c)},Ac=function(a,b){a.g=!0;hc(function(){a.g&&Dc.call(null,b)})},Dc=Lb;var Fc=function(a){this.a=new mc;if(a){a=Jb(a);for(var b=a.length,c=0;c<b;c++){var d=a[c];this.a.set(Ec(d),d)}}},Ec=function(a){var b=typeof a;return"object"==b&&a||"function"==b?"o"+(a[ea]||(a[ea]=++fa)):b.substr(0,1)+a};k=Fc.prototype;k.o=function(){return this.a.o()};k.clear=function(){this.a.clear()};k.F=function(){return this.a.F()};k.w=function(){return this.a.w()};k.clone=function(){return new Fc(this)};k.X=function(){return this.a.X(!1)};var Gc=function(a){return function(){var b=[];Array.prototype.push.apply(b,arguments);uc(!0).then(function(){a.apply(null,b)})}};var Hc="closure_lm_"+(1E6*Math.random()|0),Ic={},Jc=0,Kc=function(a,b,c,d,e){if("array"==p(b)){for(var f=0;f<b.length;f++)Kc(a,b[f],c,d,e);return null}c=Lc(c);a&&a[Xa]?(Mc(a),a=Ab(a.b,String(b),c,!1,d,e)):a=Nc(a,b,c,!1,d,e);return a},Nc=function(a,b,c,d,e,f){if(!b)throw Error("Invalid event type");var g=!!e,h=Oc(a);h||(a[Hc]=h=new yb(a));c=Ab(h,b,c,d,e,f);if(c.a)return c;d=Pc();c.a=d;d.src=a;d.listener=c;if(a.addEventListener)a.addEventListener(b.toString(),d,g);else if(a.attachEvent)a.attachEvent(Qc(b.toString()),
d);else throw Error("addEventListener and attachEvent are unavailable.");Jc++;return c},Pc=function(){var a=Rc,b=kc?function(c){return a.call(b.src,b.listener,c)}:function(c){c=a.call(b.src,b.listener,c);if(!c)return c};return b},Sc=function(a,b,c,d,e){if("array"==p(b))for(var f=0;f<b.length;f++)Sc(a,b[f],c,d,e);else c=Lc(c),a&&a[Xa]?Ab(a.b,String(b),c,!0,d,e):Nc(a,b,c,!0,d,e)},Tc=function(a,b,c,d,e){if("array"==p(b))for(var f=0;f<b.length;f++)Tc(a,b[f],c,d,e);else(c=Lc(c),a&&a[Xa])?(a=a.b,b=String(b).toString(),
b in a.a&&(f=a.a[b],c=zb(f,c,d,e),-1<c&&(ub(f[c]),C(null!=f.length),Array.prototype.splice.call(f,c,1),0==f.length&&(delete a.a[b],a.b--)))):a&&(a=Oc(a))&&(b=a.a[b.toString()],a=-1,b&&(a=zb(b,c,!!d,e)),(c=-1<a?b[a]:null)&&Uc(c))},Uc=function(a){if("number"!=typeof a&&a&&!a.O){var b=a.src;if(b&&b[Xa])Bb(b.b,a);else{var c=a.type,d=a.a;b.removeEventListener?b.removeEventListener(c,d,a.U):b.detachEvent&&b.detachEvent(Qc(c),d);Jc--;(c=Oc(b))?(Bb(c,a),0==c.b&&(c.src=null,b[Hc]=null)):ub(a)}}},Qc=function(a){return a in
Ic?Ic[a]:Ic[a]="on"+a},Wc=function(a,b,c,d){var e=!0;if(a=Oc(a))if(b=a.a[b.toString()])for(b=b.concat(),a=0;a<b.length;a++){var f=b[a];f&&f.U==c&&!f.O&&(f=Vc(f,d),e=e&&!1!==f)}return e},Vc=function(a,b){var c=a.listener,d=a.N||a.src;a.T&&Uc(a);return c.call(d,b)},Rc=function(a,b){if(a.O)return!0;if(!kc){var c;if(!(c=b))a:{c=["window","event"];for(var d=m,e;e=c.shift();)if(null!=d[e])d=d[e];else{c=null;break a}c=d}e=c;c=new pc(e,this);d=!0;if(!(0>e.keyCode||void 0!=e.returnValue)){a:{var f=!1;if(0==
e.keyCode)try{e.keyCode=-1;break a}catch(l){f=!0}if(f||void 0==e.returnValue)e.returnValue=!0}e=[];for(f=c.a;f;f=f.parentNode)e.push(f);for(var f=a.type,g=e.length-1;0<=g;g--){c.a=e[g];var h=Wc(e[g],f,!0,c),d=d&&h}for(g=0;g<e.length;g++)c.a=e[g],h=Wc(e[g],f,!1,c),d=d&&h}return d}return Vc(a,new pc(b,this))},Oc=function(a){a=a[Hc];return a instanceof yb?a:null},Xc="__closure_events_fn_"+(1E9*Math.random()>>>0),Lc=function(a){C(a,"Listener can not be null.");if(r(a))return a;C(a.handleEvent,"An object listener must have handleEvent method.");
a[Xc]||(a[Xc]=function(b){return a.handleEvent(b)});return a[Xc]};var I=function(a,b){D.call(this);this.l=a||0;this.c=b||10;if(this.l>this.c)throw Error("[goog.structs.Pool] Min can not be greater than max");this.a=new Hb;this.b=new Fc;this.i=null;this.S()};w(I,D);I.prototype.W=function(){var a=ia();if(!(null!=this.i&&0>a-this.i)){for(var b;0<this.a.o()&&(b=Ib(this.a),!this.j(b));)this.S();!b&&this.o()<this.c&&(b=this.h());b&&(this.i=a,this.b.a.set(Ec(b),b));return b}};var Zc=function(a){var b=Yc;oc(b.b.a,Ec(a))&&b.Y(a)};
I.prototype.Y=function(a){oc(this.b.a,Ec(a));this.j(a)&&this.o()<this.c?this.a.a.push(a):$c(a)};I.prototype.S=function(){for(var a=this.a;this.o()<this.l;){var b=this.h();a.a.push(b)}for(;this.o()>this.c&&0<this.a.o();)$c(Ib(a))};I.prototype.h=function(){return{}};var $c=function(a){if("function"==typeof a.fa)a.fa();else for(var b in a)a[b]=null};I.prototype.j=function(a){return"function"==typeof a.ra?a.ra():!0};I.prototype.o=function(){return this.a.o()+this.b.o()};
I.prototype.F=function(){return this.a.F()&&this.b.F()};I.prototype.A=function(){I.G.A.call(this);if(0<this.b.o())throw Error("[goog.structs.Pool] Objects not released");delete this.b;for(var a=this.a;!a.F();)$c(Ib(a));delete this.a};/*
 Portions of this code are from MochiKit, received by
 The Closure Authors under the MIT license. All other code is Copyright
 2005-2009 The Closure Authors. All Rights Reserved.
*/
var ad=function(a,b){this.c=[];this.m=b||null;this.a=this.h=!1;this.b=void 0;this.j=this.g=!1;this.f=0;this.i=null;this.s=0};ad.prototype.l=function(a,b){this.g=!1;this.h=!0;this.b=b;this.a=!a;bd(this)};var cd=function(a,b,c){C(!a.j,"Blocking Deferreds can not be re-used");a.c.push([b,c,void 0]);a.h&&bd(a)};ad.prototype.then=function(a,b,c){var d,e,f=new H(function(a,b){d=a;e=b});cd(this,d,function(a){e(a)});return f.then(a,b,c)};Ha(ad);
var dd=function(a){return ib(a.c,function(a){return r(a[1])})},bd=function(a){if(a.f&&a.h&&dd(a)){var b=a.f,c=ed[b];c&&(m.clearTimeout(c.a),delete ed[b]);a.f=0}a.i&&(a.i.s--,delete a.i);for(var b=a.b,d=c=!1;a.c.length&&!a.g;){var e=a.c.shift(),f=e[0],g=e[1],e=e[2];if(f=a.a?g:f)try{var h=f.call(e||a.m,b);n(h)&&(a.a=a.a&&(h==b||h instanceof Error),a.b=b=h);if(Ia(b)||"function"===typeof m.Promise&&b instanceof m.Promise)d=!0,a.g=!0}catch(l){b=l,a.a=!0,dd(a)||(c=!0)}}a.b=b;d&&(h=v(a.l,a,!0),d=v(a.l,a,
!1),b instanceof ad?(cd(b,h,d),b.j=!0):b.then(h,d));c&&(b=new fd(b),ed[b.a]=b,a.f=b.a)},fd=function(a){this.a=m.setTimeout(v(this.c,this),0);this.b=a};fd.prototype.c=function(){C(ed[this.a],"Cannot throw an error that is not scheduled.");delete ed[this.a];throw this.b;};var ed={};var gd=function(a){this.f=a;this.b=this.c=this.a=null},hd=function(a,b){this.name=a;this.value=b};hd.prototype.toString=function(){return this.name};var id=new hd("SEVERE",1E3),jd=new hd("CONFIG",700),kd=new hd("FINE",500),ld=function(a){if(a.c)return a.c;if(a.a)return ld(a.a);Ua("Root logger has no level set.");return null};
gd.prototype.log=function(a,b,c){if(a.value>=ld(this).value)for(r(b)&&(b=b()),a=new Aa(a,String(b),this.f),c&&(a.a=c),c="log:"+a.b,m.console&&(m.console.timeStamp?m.console.timeStamp(c):m.console.markTimeline&&m.console.markTimeline(c)),m.msWriteProfilerMark&&m.msWriteProfilerMark(c),c=this;c;)c=c.a};
var md={},nd=null,od=function(a){nd||(nd=new gd(""),md[""]=nd,nd.c=jd);var b;if(!(b=md[a])){b=new gd(a);var c=a.lastIndexOf("."),d=a.substr(c+1),c=od(a.substr(0,c));c.b||(c.b={});c.b[d]=b;b.a=c;md[a]=b}return b};var J=function(){D.call(this);this.b=new yb(this);this.ma=this;this.I=null};w(J,D);J.prototype[Xa]=!0;J.prototype.removeEventListener=function(a,b,c,d){Tc(this,a,b,c,d)};
var K=function(a,b){Mc(a);var c,d=a.I;if(d){c=[];for(var e=1;d;d=d.I)c.push(d),C(1E3>++e,"infinite loop")}var d=a.ma,e=b,f=e.type||e;if(q(e))e=new sb(e,d);else if(e instanceof sb)e.target=e.target||d;else{var g=e,e=new sb(f,d);Ga(e,g)}var g=!0,h;if(c)for(var l=c.length-1;0<=l;l--)h=e.a=c[l],g=pd(h,f,!0,e)&&g;h=e.a=d;g=pd(h,f,!0,e)&&g;g=pd(h,f,!1,e)&&g;if(c)for(l=0;l<c.length;l++)h=e.a=c[l],g=pd(h,f,!1,e)&&g};
J.prototype.A=function(){J.G.A.call(this);if(this.b){var a=this.b,b=0,c;for(c in a.a){for(var d=a.a[c],e=0;e<d.length;e++)++b,ub(d[e]);delete a.a[c];a.b--}}this.I=null};var pd=function(a,b,c,d){b=a.b.a[String(b)];if(!b)return!0;b=b.concat();for(var e=!0,f=0;f<b.length;++f){var g=b[f];if(g&&!g.O&&g.U==c){var h=g.listener,l=g.N||g.src;g.T&&Bb(a.b,g);e=!1!==h.call(l,d)&&e}}return e&&0!=d.ka},Mc=function(a){C(a.b,"Event target is not initialized. Did you call the superclass (goog.events.EventTarget) constructor?")};var L=function(a,b){this.f=new Qb;I.call(this,a,b)};w(L,I);k=L.prototype;k.W=function(a,b){if(!a)return L.G.W.call(this);Gb(this.f,n(b)?b:100,a);this.$()};k.$=function(){for(var a=this.f;0<a.o();){var b=this.W();if(b){var c;var d=a,e=d.a,f=e.length;c=e[0];if(0>=f)c=void 0;else{if(1==f)lb(e);else{e[0]=e.pop();for(var e=0,d=d.a,f=d.length,g=d[e];e<f>>1;){var h=2*e+1,l=2*e+2,h=l<f&&d[l].a<d[h].a?l:h;if(d[h].a>g.a)break;d[e]=d[h];e=h}d[e]=g}c=c.b}c.apply(this,[b])}else break}};
k.Y=function(a){L.G.Y.call(this,a);this.$()};k.S=function(){L.G.S.call(this);this.$()};k.A=function(){L.G.A.call(this);m.clearTimeout(void 0);this.f.clear();this.f=null};var M=function(a,b){a&&a.log(kd,b,void 0)};var qd=function(a,b,c){if(r(a))c&&(a=v(a,c));else if(a&&"function"==typeof a.handleEvent)a=v(a.handleEvent,a);else throw Error("Invalid listener argument");return 2147483647<Number(b)?-1:m.setTimeout(a,b||0)};var N=function(a){J.call(this);this.L=new mc;this.C=a||null;this.c=!1;this.B=this.a=null;this.P=this.l="";this.J=0;this.h="";this.f=this.H=this.j=this.K=!1;this.i=0;this.m=null;this.da="";this.v=this.ba=this.Z=!1};w(N,J);var rd=N.prototype,sd=od("goog.net.XhrIo");rd.u=sd;var td=/^https?$/i,ud=["POST","PUT"];
N.prototype.send=function(a,b,c,d){if(this.a)throw Error("[goog.net.XhrIo] Object is active with another request="+this.l+"; newUri="+a);b=b?b.toUpperCase():"GET";this.l=a;this.h="";this.J=0;this.P=b;this.K=!1;this.c=!0;this.a=this.C?Eb(this.C):Eb(Cb);this.B=this.C?db(this.C):db(Cb);this.a.onreadystatechange=v(this.ca,this);this.ba&&"onprogress"in this.a&&(this.a.onprogress=v(function(a){this.R(a,!0)},this),this.a.upload&&(this.a.upload.onprogress=v(this.R,this)));try{M(this.u,P(this,"Opening Xhr")),
this.H=!0,this.a.open(b,String(a),!0),this.H=!1}catch(f){M(this.u,P(this,"Error opening Xhr: "+f.message));vd(this,f);return}a=c||"";var e=this.L.clone();d&&Kb(d,function(a,b){e.set(b,a)});d=kb(e.D());c=m.FormData&&a instanceof m.FormData;!(0<=eb(ud,b))||d||c||e.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");e.forEach(function(a,b){this.a.setRequestHeader(b,a)},this);this.da&&(this.a.responseType=this.da);Ea(this.a)&&(this.a.withCredentials=this.Z);try{wd(this),0<this.i&&(this.v=
xd(this.a),M(this.u,P(this,"Will abort after "+this.i+"ms if incomplete, xhr2 "+this.v)),this.v?(this.a.timeout=this.i,this.a.ontimeout=v(this.M,this)):this.m=qd(this.M,this.i,this)),M(this.u,P(this,"Sending request")),this.j=!0,this.a.send(a),this.j=!1}catch(f){M(this.u,P(this,"Send error: "+f.message)),vd(this,f)}};var xd=function(a){return F&&G(9)&&"number"==typeof a.timeout&&n(a.ontimeout)},jb=function(a){return"content-type"==a.toLowerCase()};
N.prototype.M=function(){"undefined"!=typeof aa&&this.a&&(this.h="Timed out after "+this.i+"ms, aborting",this.J=8,M(this.u,P(this,this.h)),K(this,"timeout"),yd(this,8))};var vd=function(a,b){a.c=!1;a.a&&(a.f=!0,a.a.abort(),a.f=!1);a.h=b;a.J=5;zd(a);Ad(a)},zd=function(a){a.K||(a.K=!0,K(a,"complete"),K(a,"error"))},yd=function(a,b){a.a&&a.c&&(M(a.u,P(a,"Aborting")),a.c=!1,a.f=!0,a.a.abort(),a.f=!1,a.J=b||7,K(a,"complete"),K(a,"abort"),Ad(a))};
N.prototype.A=function(){this.a&&(this.c&&(this.c=!1,this.f=!0,this.a.abort(),this.f=!1),Ad(this,!0));N.G.A.call(this)};N.prototype.ca=function(){this.g||(this.H||this.j||this.f?Bd(this):this.na())};N.prototype.na=function(){Bd(this)};
var Bd=function(a){if(a.c&&"undefined"!=typeof aa)if(a.B[1]&&4==Dd(a)&&2==Q(a))M(a.u,P(a,"Local request error detected and ignored"));else if(a.j&&4==Dd(a))qd(a.ca,0,a);else if(K(a,"readystatechange"),4==Dd(a)){M(a.u,P(a,"Request complete"));a.c=!1;try{if(Ed(a))K(a,"complete"),K(a,"success");else{a.J=6;var b;try{b=2<Dd(a)?a.a.statusText:""}catch(c){M(a.u,"Can not get status: "+c.message),b=""}a.h=b+" ["+Q(a)+"]";zd(a)}}finally{Ad(a)}}};
N.prototype.R=function(a,b){C("progress"===a.type,"goog.net.EventType.PROGRESS is of the same type as raw XHR progress.");K(this,Fd(a,"progress"));K(this,Fd(a,b?"downloadprogress":"uploadprogress"))};
var Fd=function(a,b){return{type:b,lengthComputable:a.lengthComputable,loaded:a.loaded,total:a.total}},Ad=function(a,b){if(a.a){wd(a);var c=a.a,d=a.B[0]?ba:null;a.a=null;a.B=null;b||K(a,"ready");try{c.onreadystatechange=d}catch(e){(c=a.u)&&c.log(id,"Problem encountered resetting onreadystatechange: "+e.message,void 0)}}},wd=function(a){a.a&&a.v&&(a.a.ontimeout=null);"number"==typeof a.m&&(m.clearTimeout(a.m),a.m=null)},Ed=function(a){var b=Q(a),c;a:switch(b){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:c=
!0;break a;default:c=!1}if(!c){if(b=0===b)a=String(a.l).match(vb)[1]||null,!a&&m.self&&m.self.location&&(a=m.self.location.protocol,a=a.substr(0,a.length-1)),b=!td.test(a?a.toLowerCase():"");c=b}return c},Dd=function(a){return a.a?a.a.readyState:0},Q=function(a){try{return 2<Dd(a)?a.a.status:-1}catch(b){return-1}},Gd=function(a){try{return a.a?a.a.responseText:""}catch(b){return M(a.u,"Can not get responseText: "+b.message),""}},Hd=function(a,b){return a.a&&4==Dd(a)?a.a.getResponseHeader(b):void 0},
P=function(a,b){return b+" ["+a.P+" "+a.l+" "+Q(a)+"]"};var Id=function(a,b,c,d){this.m=a;this.v=!!d;L.call(this,b,c)};w(Id,L);Id.prototype.h=function(){var a=new N,b=this.m;b&&b.forEach(function(b,d){a.L.set(d,b)});this.v&&(a.Z=!0);return a};Id.prototype.j=function(a){return!a.g&&!a.a};var Yc=new Id;var Kd=function(a,b,c,d,e,f,g,h,l,u){this.L=a;this.H=b;this.B=c;this.m=d;this.I=e.slice();this.s=this.l=this.f=this.c=null;this.h=this.i=!1;this.v=f;this.j=g;this.g=l;this.M=u;this.K=h;var t=this;this.C=new H(function(a,b){t.l=a;t.s=b;Jd(t)})},Ld=function(a,b,c){this.b=a;this.c=b;this.a=!!c},Jd=function(a){function b(a,b){b?a(!1,new Ld(!1,null,!0)):Yc.W(function(b){b.Z=d.M;d.c=b;var c=null;null!==d.g&&(b.ba=!0,c=Kc(b,"uploadprogress",function(a){d.g(a.loaded,a.lengthComputable?a.total:-1)}),b.ba=
null!==d.g);b.send(d.L,d.H,d.m,d.B);Sc(b,"complete",function(b){null!==c&&Uc(c);d.c=null;b=b.target;var f=6===b.J&&100<=Q(b),f=Ed(b)||f,g=Q(b);!f||500<=g&&600>g||429===g?(f=7===b.J,Zc(b),a(!1,new Ld(!1,null,f))):(f=0<=eb(d.I,g),a(!0,new Ld(f,b)))})})}function c(a,b){var c=d.l,h=d.s,l=b.c;if(b.b)try{var u=d.v(l,Gd(l));n(u)?c(u):c()}catch(t){h(t)}else null!==l?(c=la(),u=Gd(l),c.serverResponse=u,d.j?h(d.j(l,c)):h(c)):(c=b.a?d.h?qa():oa():new x("retry-limit-exceeded","Max retry time for operation exceeded, please try again."),
h(c));Zc(l)}var d=a;a.i?c(0,new Ld(!1,null,!0)):a.f=ja(b,c,a.K)};Kd.prototype.a=function(){return this.C};Kd.prototype.b=function(a){this.i=!0;this.h=a||!1;null!==this.f&&(0,this.f)(!1);null!==this.c&&yd(this.c)};var Md=function(a,b,c){var d=Ra(a.f),d=a.l+d,e=a.b?sa(a.b):{};null!==b&&0<b.length&&(e.Authorization="Firebase "+b);e["X-Firebase-Storage-Version"]="webjs/1.0.0";return new Kd(d,a.i,e,a.c,a.h,a.N,a.a,a.j,a.g,c)};var Nd=function(a){var b=m.BlobBuilder||m.WebKitBlobBuilder;if(n(b)){for(var b=new b,c=0;c<arguments.length;c++)b.append(arguments[c]);return b.getBlob()}b=nb(arguments);c=m.BlobBuilder||m.WebKitBlobBuilder;if(n(c)){for(var c=new c,d=0;d<b.length;d++)c.append(b[d],void 0);b=c.getBlob(void 0)}else if(n(m.Blob))b=new Blob(b,{});else throw Error("This browser doesn't seem to support creating Blobs");return b},Od=function(a,b,c){n(c)||(c=a.size);return a.webkitSlice?a.webkitSlice(b,c):a.mozSlice?a.mozSlice(b,
c):a.slice?Ub&&!G("13.0")||Vb&&!G("537.1")?(0>b&&(b+=a.size),0>b&&(b=0),0>c&&(c+=a.size),c<b&&(c=b),a.slice(b,c-b)):a.slice(b,c):null};var Pd=function(a){this.c=vc(a)};Pd.prototype.a=function(){return this.c};Pd.prototype.b=function(){};var Qd=function(){this.a={};this.b=Number.MIN_SAFE_INTEGER},Rd=function(a,b){function c(){delete e.a[d]}var d=a.b;a.b++;a.a[d]=b;var e=a;b.a().then(c,c)};Qd.prototype.clear=function(){ra(this.a,function(a,b){b&&b.b(!0)});this.a={}};var Sd=function(a,b,c,d){this.a=a;this.f=null;null!==this.a&&(a=this.a.options,z(a)?this.f=a.storageBucket||null:this.f=null);this.l=b;this.j=c;this.i=d;this.c=12E4;this.b=6E4;this.h=new Qd;this.g=!1},Td=function(a){return null!==a.a&&z(a.a.INTERNAL)&&z(a.a.INTERNAL.getToken)?a.a.INTERNAL.getToken().then(function(a){return z(a)?a.accessToken:null},function(){return null}):uc(null)};Sd.prototype.bucket=function(){if(this.g)throw qa();return this.f};
var R=function(a,b,c){if(a.g)return new Pd(qa());b=a.j(b,c,null===a.a);Rd(a.h,b);return b};var Ud=function(a,b){return b},S=function(a,b,c,d){this.c=a;this.b=b||a;this.f=!!c;this.a=d||Ud},Vd=null,Wd=function(){if(Vd)return Vd;var a=[];a.push(new S("bucket"));a.push(new S("generation"));a.push(new S("metageneration"));a.push(new S("name","fullPath",!0));var b=new S("name");b.a=function(a,b){return!wa(b)||2>b.length?b:xb(b)};a.push(b);b=new S("size");b.a=function(a,b){return z(b)?+b:b};a.push(b);a.push(new S("timeCreated"));a.push(new S("updated"));a.push(new S("md5Hash",null,!0));a.push(new S("cacheControl",
null,!0));a.push(new S("contentDisposition",null,!0));a.push(new S("contentEncoding",null,!0));a.push(new S("contentLanguage",null,!0));a.push(new S("contentType",null,!0));a.push(new S("metadata","customMetadata",!0));a.push(new S("downloadTokens","downloadURLs",!1,function(a,b){if(!(wa(b)&&0<b.length))return[];var e=encodeURIComponent;return hb(b.split(","),function(b){var d=a.fullPath,d="https://firebasestorage.googleapis.com/v0"+("/b/"+e(a.bucket)+"/o/"+e(d));b=Ra({alt:"media",token:b});return d+
b})}));return Vd=a},Xd=function(a,b){Object.defineProperty(a,"ref",{get:function(){return b.l(b,new A(a.bucket,a.fullPath))}})},Yd=function(a,b){for(var c={},d=b.length,e=0;e<d;e++){var f=b[e];f.f&&(c[f.c]=a[f.b])}return JSON.stringify(c)},Zd=function(a){if(!a||"object"!==typeof a)throw"Expected Metadata object.";for(var b in a){var c=a[b];if("customMetadata"===b&&"object"!==typeof c)throw"Expected object for 'customMetadata' mapping.";}};var T=function(a,b,c){for(var d=b.length,e=b.length,f=0;f<b.length;f++)if(b[f].b){d=f;break}if(!(d<=c.length&&c.length<=e))throw d===e?(b=d,d=1===d?"argument":"arguments"):(b="between "+d+" and "+e,d="arguments"),new x("invalid-argument-count","Invalid argument count in `"+a+"`: Expected "+b+" "+d+", received "+c.length+".");for(f=0;f<c.length;f++)try{b[f].a(c[f])}catch(g){if(g instanceof Error)throw pa(f,a,g.message);throw pa(f,a,g);}},U=function(a,b){var c=this;this.a=function(b){c.b&&!n(b)||a(b)};
this.b=!!b},$d=function(a,b){return function(c){a(c);b(c)}},ae=function(a,b){function c(a){if(!("string"===typeof a||a instanceof String))throw"Expected string.";}var d;a?d=$d(c,a):d=c;return new U(d,b)},be=function(){return new U(function(a){if(!(a instanceof Blob))throw"Expected Blob or File.";})},ce=function(){return new U(function(a){if(!(("number"===typeof a||a instanceof Number)&&0<=a))throw"Expected a number 0 or greater.";})},de=function(a,b){return new U(function(b){if(!(null===b||z(b)&&
b instanceof Object))throw"Expected an Object.";z(a)&&a(b)},b)},ee=function(){return new U(function(a){if(null!==a&&!r(a))throw"Expected a Function.";},!0)};var fe=function(a){if(!a)throw la();},ge=function(a,b){return function(c,d){var e;a:{try{e=JSON.parse(d)}catch(u){e=null;break a}e=da(e)?e:null}if(null===e)e=null;else{for(var f={type:"file"},g=b.length,h=0;h<g;h++){var l=b[h];f[l.b]=l.a(f,e[l.c])}Xd(f,a);e=f}fe(null!==e);return e}},he=function(a){return function(b,c){var d;d=404===Q(b)?new x("object-not-found","Object '"+a.path+"' does not exist."):401===Q(b)?ma():403===Q(b)?na(a.path):c;d.serverResponse=c.serverResponse;return d}},ie=function(a){return function(b,
c){var d;d=401===Q(b)?ma():403===Q(b)?na(a.path):c;d.serverResponse=c.serverResponse;return d}},je=function(a,b,c){var d=Oa(b);a=new y(ka+"/v0"+d,"GET",ge(a,c),a.c);a.a=he(b);return a},ke=function(a,b){var c=Oa(b),c=new y(ka+"/v0"+c,"DELETE",function(){},a.c);c.h=[200,204];c.a=he(b);return c},le=function(a,b,c){c=c?sa(c):{};c.fullPath=a.path;c.size=b.size;c.contentType||(c.contentType=b&&b.type||"application/octet-stream");return c},me=function(a,b,c,d,e){var f="/b/"+encodeURIComponent(b.bucket)+
"/o",g={"X-Goog-Upload-Protocol":"multipart"},h;h="";for(var l=0;2>l;l++)h+=Math.random().toString().slice(2);g["Content-Type"]="multipart/related; boundary="+h;e=le(b,d,e);l=Yd(e,c);d=Nd("--"+h+"\r\nContent-Type: application/json; charset=utf-8\r\n\r\n"+l+"\r\n--"+h+"\r\nContent-Type: "+e.contentType+"\r\n\r\n",d,"\r\n--"+h+"--");a=new y(ka+"/v0"+f,"POST",ge(a,c),a.b);a.f={name:e.fullPath};a.b=g;a.c=d;a.a=ie(b);return a},ne=function(a,b,c,d){this.a=a;this.total=b;this.b=!!c;this.c=d||null},oe=function(a,
b){var c;try{c=Hd(a,"X-Goog-Upload-Status")}catch(e){fe(!1)}var d;d=0<=eb(b||["active"],c);fe(d);return c},pe=function(a,b,c,d,e){var f="/b/"+encodeURIComponent(b.bucket)+"/o",g=le(b,d,e);e={name:g.fullPath};f=ka+"/v0"+f;d={"X-Goog-Upload-Protocol":"resumable","X-Goog-Upload-Command":"start","X-Goog-Upload-Header-Content-Length":d.size,"X-Goog-Upload-Header-Content-Type":g.contentType,"Content-Type":"application/json; charset=utf-8"};c=Yd(g,c);a=new y(f,"POST",function(a){oe(a);var b;try{b=Hd(a,"X-Goog-Upload-URL")}catch(c){fe(!1)}fe(wa(b));
return b},a.b);a.f=e;a.b=d;a.c=c;a.a=ie(b);return a},qe=function(a,b,c,d){a=new y(c,"POST",function(a){var b=oe(a,["active","final"]),c;try{c=Hd(a,"X-Goog-Upload-Size-Received")}catch(h){fe(!1)}a=c;isFinite(a)&&(a=String(a));a=q(a)?/^\s*-?0x/i.test(a)?parseInt(a,16):parseInt(a,10):NaN;fe(!isNaN(a));return new ne(a,d.size,"final"===b)},a.b);a.b={"X-Goog-Upload-Command":"query"};a.a=ie(b);return a},re=function(a,b,c,d,e,f){var g=new ne(0,0);f?(g.a=f.a,g.total=f.total):(g.a=0,g.total=d.size);if(d.size!==
g.total)throw new x("server-file-wrong-size","Server recorded incorrect upload file size, please retry the upload.");var h=f=g.total-g.a,h=Math.min(h,262144),l=g.a;f={"X-Goog-Upload-Command":h===f?"upload, finalize":"upload","X-Goog-Upload-Offset":g.a};l=Od(d,l,l+h);if(null===l)throw new x("cannot-slice-blob","Cannot slice blob for upload. Please retry the upload.");c=new y(c,"POST",function(a,c){var f=oe(a,["active","final"]),l=g.a+h,Cd=d.size,Va;"final"===f?Va=ge(b,e)(a,c):Va=null;return new ne(l,
Cd,"final"===f,Va)},b.b);c.b=f;c.c=l;c.g=null;c.a=ie(a);return c};var W=function(a,b,c,d,e,f){this.K=a;this.c=b;this.i=c;this.f=e;this.h=f||null;this.l=d;this.j=0;this.B=this.s=!1;this.v=[];this.R=262144<this.f.size;this.b="running";this.a=this.m=this.g=null;var g=this;this.V=function(a){g.a=null;"storage/canceled"===a.code?(g.s=!0,se(g)):(g.g=a,V(g,"error"))};this.P=function(a){g.a=null;"storage/canceled"===a.code?se(g):(g.g=a,V(g,"error"))};te(this)},te=function(a){"running"===a.b&&null===a.a&&(a.R?null===a.m?ue(a):a.s?ve(a):a.B?we(a):xe(a):ye(a))},ze=function(a,
b){Td(a.c).then(function(c){switch(a.b){case "running":b(c);break;case "canceling":V(a,"canceled");break;case "pausing":V(a,"paused")}})},ue=function(a){ze(a,function(b){var c=pe(a.c,a.i,a.l,a.f,a.h);a.a=R(a.c,c,b);a.a.a().then(function(b){a.a=null;a.m=b;a.s=!1;se(a)},this.V)})},ve=function(a){var b=a.m;ze(a,function(c){var d=qe(a.c,a.i,b,a.f);a.a=R(a.c,d,c);a.a.a().then(function(b){a.a=null;Ae(a,b.a);a.s=!1;b.b&&(a.B=!0);se(a)},a.V)})},xe=function(a){var b=new ne(a.j,a.f.size),c=a.m;ze(a,function(d){var e;
try{e=re(a.i,a.c,c,a.f,a.l,b)}catch(f){a.g=f;V(a,"error");return}a.a=R(a.c,e,d);a.a.a().then(function(b){a.a=null;Ae(a,b.a);b.b?(a.h=b.c,V(a,"success")):se(a)},a.V)})},we=function(a){ze(a,function(b){var c=je(a.c,a.i,a.l);a.a=R(a.c,c,b);a.a.a().then(function(b){a.a=null;a.h=b;V(a,"success")},a.P)})},ye=function(a){ze(a,function(b){var c=me(a.c,a.i,a.l,a.f,a.h);a.a=R(a.c,c,b);a.a.a().then(function(b){a.a=null;a.h=b;Ae(a,a.f.size);V(a,"success")},a.V)})},Ae=function(a,b){var c=a.j;a.j=b;a.j>c&&Be(a)},
V=function(a,b){if(a.b!==b)switch(b){case "canceling":a.b=b;null!==a.a&&a.a.b();break;case "pausing":a.b=b;null!==a.a&&a.a.b();break;case "running":var c="paused"===a.b;a.b=b;c&&(Be(a),te(a));break;case "paused":a.b=b;Be(a);break;case "canceled":a.g=oa();a.b=b;Be(a);break;case "error":a.b=b;Be(a);break;case "success":a.b=b,Be(a)}},se=function(a){switch(a.b){case "pausing":V(a,"paused");break;case "canceling":V(a,"canceled");break;case "running":te(a)}};
W.prototype.C=function(){return new B(this.j,this.f.size,va(this.b),this.h,this,this.K)};
W.prototype.I=function(a,b,c,d){function e(a){try{g(a);return}catch(b){}try{if(h(a),!(n(a.next)||n(a.error)||n(a.complete)))throw"";}catch(b){throw"Expected a function or an Object with one of `next`, `error`, `complete` properties.";}}function f(a){return function(b,c,d){null!==a&&T("on",a,arguments);var e=new Qa(b,c,d);Ce(l,e);return function(){mb(l.v,e)}}}var g=ee().a,h=de(null,!0).a;T("on",[ae(function(){if("state_changed"!==a)throw"Expected one of the event types: [state_changed].";}),de(e,!0),
ee(),ee()],arguments);var l=this,u=[de(function(a){if(null===a)throw"Expected a function or an Object with one of `next`, `error`, `complete` properties.";e(a)}),ee(),ee()];return n(b)||n(c)||n(d)?f(null)(b,c,d):f(u)};
var Ce=function(a,b){a.v.push(b);De(a,b)},Be=function(a){var b=nb(a.v);fb(b,function(b){De(a,b)})},De=function(a,b){switch(va(a.b)){case "running":case "paused":null!==b.next&&Gc(b.next.bind(b,a.C()))();break;case "success":null!==b.a&&Gc(b.a.bind(b))();break;case "canceled":case "error":null!==b.error&&Gc(b.error.bind(b,a.g))();break;default:null!==b.error&&Gc(b.error.bind(b,a.g))()}};
W.prototype.M=function(){T("resume",[],arguments);var a="paused"===this.b||"pausing"===this.b;a&&V(this,"running");return a};W.prototype.L=function(){T("pause",[],arguments);var a="running"===this.b;a&&V(this,"pausing");return a};W.prototype.H=function(){T("cancel",[],arguments);var a="running"===this.b||"pausing"===this.b;a&&V(this,"canceling");return a};var X=function(a,b){this.b=a;if(b)this.a=b instanceof A?b:Pa(b);else{var c=a.bucket();if(null!==c)this.a=new A(c,"");else throw new x("no-default-bucket","No default bucket found. Did you set the 'storageBucket' property when initializing the app?");}};X.prototype.toString=function(){T("toString",[],arguments);return"gs://"+this.a.bucket+"/"+this.a.path};var Ee=function(a,b){return new X(a,b)};k=X.prototype;
k.ga=function(a){T("child",[ae()],arguments);var b=wb(this.a.path,a);return Ee(this.b,new A(this.a.bucket,b))};k.Fa=function(){var a;a=this.a.path;if(0==a.length)a=null;else{var b=a.lastIndexOf("/");a=-1===b?"":a.slice(0,b)}return null===a?null:Ee(this.b,new A(this.a.bucket,a))};k.Ha=function(){return Ee(this.b,new A(this.a.bucket,""))};k.pa=function(){return this.a.bucket};k.Aa=function(){return this.a.path};k.Ea=function(){return xb(this.a.path)};k.Ja=function(){return this.b.i};
k.ua=function(a,b){T("put",[be(),new U(Zd,!0)],arguments);Fe(this,"put");return new W(this,this.b,this.a,Wd(),a,b)};k.delete=function(){T("delete",[],arguments);Fe(this,"delete");var a=this;return Td(this.b).then(function(b){var c=ke(a.b,a.a);return R(a.b,c,b).a()})};k.ha=function(){T("getMetadata",[],arguments);Fe(this,"getMetadata");var a=this;return Td(this.b).then(function(b){var c=je(a.b,a.a,Wd());return R(a.b,c,b).a()})};
k.va=function(a){T("updateMetadata",[new U(Zd,void 0)],arguments);Fe(this,"updateMetadata");var b=this;return Td(this.b).then(function(c){var d=b.b,e=b.a,f=a,g=Wd(),h=Oa(e),h=ka+"/v0"+h,f=Yd(f,g),d=new y(h,"PATCH",ge(d,g),d.c);d.b={"Content-Type":"application/json; charset=utf-8"};d.c=f;d.a=he(e);return R(b.b,d,c).a()})};
k.ta=function(){T("getDownloadURL",[],arguments);Fe(this,"getDownloadURL");return this.ha().then(function(a){a=a.downloadURLs[0];if(z(a))return a;throw new x("no-download-url","The given file does not have any download URLs.");})};var Fe=function(a,b){if(""===a.a.path)throw new x("invalid-root-operation","The operation '"+b+"' cannot be performed on a root reference, create a non-root reference using child, such as .child('file.png').");};var Y=function(a){this.a=new Sd(a,function(a,c){return new X(a,c)},Md,this);this.b=a;this.c=new Ge(this)};k=Y.prototype;k.wa=function(a){T("ref",[ae(function(a){if(/^[A-Za-z]+:\/\//.test(a))throw"Expected child path but got a URL, use refFromURL instead.";},!0)],arguments);var b=new X(this.a);return n(a)?b.ga(a):b};
k.xa=function(a){T("refFromURL",[ae(function(a){if(!/^[A-Za-z]+:\/\//.test(a))throw"Expected full URL but got a child path, use ref instead.";try{Pa(a)}catch(c){throw"Expected valid full URL but got an invalid one.";}},!1)],arguments);return new X(this.a,a)};k.Ca=function(){return this.a.b};k.za=function(a){T("setMaxUploadRetryTime",[ce()],arguments);this.a.b=a};k.Ba=function(){return this.a.c};k.ya=function(a){T("setMaxOperationRetryTime",[ce()],arguments);this.a.c=a};k.oa=function(){return this.b};
k.la=function(){return this.c};var Ge=function(a){this.a=a};Ge.prototype.delete=function(){var a=this.a.a;a.g=!0;a.a=null;a.h.clear()};var Z=function(a,b,c){Object.defineProperty(a,b,{get:c})};X.prototype.toString=X.prototype.toString;X.prototype.child=X.prototype.ga;X.prototype.put=X.prototype.ua;X.prototype["delete"]=X.prototype.delete;X.prototype.getMetadata=X.prototype.ha;X.prototype.updateMetadata=X.prototype.va;X.prototype.getDownloadURL=X.prototype.ta;Z(X.prototype,"parent",X.prototype.Fa);Z(X.prototype,"root",X.prototype.Ha);Z(X.prototype,"bucket",X.prototype.pa);Z(X.prototype,"fullPath",X.prototype.Aa);
Z(X.prototype,"name",X.prototype.Ea);Z(X.prototype,"storage",X.prototype.Ja);Y.prototype.ref=Y.prototype.wa;Y.prototype.refFromURL=Y.prototype.xa;Z(Y.prototype,"maxOperationRetryTime",Y.prototype.Ba);Y.prototype.setMaxOperationRetryTime=Y.prototype.ya;Z(Y.prototype,"maxUploadRetryTime",Y.prototype.Ca);Y.prototype.setMaxUploadRetryTime=Y.prototype.za;Z(Y.prototype,"app",Y.prototype.oa);Z(Y.prototype,"INTERNAL",Y.prototype.la);Ge.prototype["delete"]=Ge.prototype.delete;
Y.prototype.capi_=function(a){ka=a};W.prototype.on=W.prototype.I;W.prototype.resume=W.prototype.M;W.prototype.pause=W.prototype.L;W.prototype.cancel=W.prototype.H;Z(W.prototype,"snapshot",W.prototype.C);Z(B.prototype,"bytesTransferred",B.prototype.qa);Z(B.prototype,"totalBytes",B.prototype.La);Z(B.prototype,"state",B.prototype.Ia);Z(B.prototype,"metadata",B.prototype.Da);Z(B.prototype,"downloadURL",B.prototype.sa);Z(B.prototype,"task",B.prototype.Ka);Z(B.prototype,"ref",B.prototype.Ga);
ta.STATE_CHANGED="state_changed";ua.RUNNING="running";ua.PAUSED="paused";ua.SUCCESS="success";ua.CANCELED="canceled";ua.ERROR="error";H.prototype["catch"]=H.prototype.l;H.prototype.then=H.prototype.then;
(function(){function a(a){return new Y(a)}var b={TaskState:ua,TaskEvent:ta,Storage:Y,Reference:X};if(window.firebase&&firebase.INTERNAL&&firebase.INTERNAL.registerService)firebase.INTERNAL.registerService("storage",a,b);else throw Error("Cannot install Firebase Storage - be sure to load firebase-app.js first.");})();})();

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(9)))

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * jQuery JavaScript Library v3.2.1
 * https://jquery.com/
 *
 * Includes Sizzle.js
 * https://sizzlejs.com/
 *
 * Copyright JS Foundation and other contributors
 * Released under the MIT license
 * https://jquery.org/license
 *
 * Date: 2017-03-20T18:59Z
 */
( function( global, factory ) {

	"use strict";

	if ( typeof module === "object" && typeof module.exports === "object" ) {

		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
} )( typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Edge <= 12 - 13+, Firefox <=18 - 45+, IE 10 - 11, Safari 5.1 - 9+, iOS 6 - 9.1
// throw exceptions when non-strict code (e.g., ASP.NET 4.5) accesses strict mode
// arguments.callee.caller (trac-13335). But as of jQuery 3.0 (2016), strict mode should be common
// enough that all such attempts are guarded in a try block.
"use strict";

var arr = [];

var document = window.document;

var getProto = Object.getPrototypeOf;

var slice = arr.slice;

var concat = arr.concat;

var push = arr.push;

var indexOf = arr.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var fnToString = hasOwn.toString;

var ObjectFunctionString = fnToString.call( Object );

var support = {};



	function DOMEval( code, doc ) {
		doc = doc || document;

		var script = doc.createElement( "script" );

		script.text = code;
		doc.head.appendChild( script ).parentNode.removeChild( script );
	}
/* global Symbol */
// Defining this global in .eslintrc.json would create a danger of using the global
// unguarded in another place, it seems safer to define global only for this module



var
	version = "3.2.1",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android <=4.0 only
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([a-z])/g,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {

	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {

		// Return all the elements in a clean array
		if ( num == null ) {
			return slice.call( this );
		}

		// Return just the one element from the set
		return num < 0 ? this[ num + this.length ] : this[ num ];
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	each: function( callback ) {
		return jQuery.each( this, callback );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map( this, function( elem, i ) {
			return callback.call( elem, i, elem );
		} ) );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor();
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: arr.sort,
	splice: arr.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// Skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction( target ) ) {
		target = {};
	}

	// Extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = Array.isArray( copy ) ) ) ) {

					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && Array.isArray( src ) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject( src ) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend( {

	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	isFunction: function( obj ) {
		return jQuery.type( obj ) === "function";
	},

	isWindow: function( obj ) {
		return obj != null && obj === obj.window;
	},

	isNumeric: function( obj ) {

		// As of jQuery 3.0, isNumeric is limited to
		// strings and numbers (primitives or objects)
		// that can be coerced to finite numbers (gh-2662)
		var type = jQuery.type( obj );
		return ( type === "number" || type === "string" ) &&

			// parseFloat NaNs numeric-cast false positives ("")
			// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
			// subtraction forces infinities to NaN
			!isNaN( obj - parseFloat( obj ) );
	},

	isPlainObject: function( obj ) {
		var proto, Ctor;

		// Detect obvious negatives
		// Use toString instead of jQuery.type to catch host objects
		if ( !obj || toString.call( obj ) !== "[object Object]" ) {
			return false;
		}

		proto = getProto( obj );

		// Objects with no prototype (e.g., `Object.create( null )`) are plain
		if ( !proto ) {
			return true;
		}

		// Objects with prototype are plain iff they were constructed by a global Object function
		Ctor = hasOwn.call( proto, "constructor" ) && proto.constructor;
		return typeof Ctor === "function" && fnToString.call( Ctor ) === ObjectFunctionString;
	},

	isEmptyObject: function( obj ) {

		/* eslint-disable no-unused-vars */
		// See https://github.com/eslint/eslint/issues/6125
		var name;

		for ( name in obj ) {
			return false;
		}
		return true;
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}

		// Support: Android <=2.3 only (functionish RegExp)
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call( obj ) ] || "object" :
			typeof obj;
	},

	// Evaluates a script in a global context
	globalEval: function( code ) {
		DOMEval( code );
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Support: IE <=9 - 11, Edge 12 - 13
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	each: function( obj, callback ) {
		var length, i = 0;

		if ( isArrayLike( obj ) ) {
			length = obj.length;
			for ( ; i < length; i++ ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}

		return obj;
	},

	// Support: Android <=4.0 only
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArrayLike( Object( arr ) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		return arr == null ? -1 : indexOf.call( arr, elem, i );
	},

	// Support: Android <=4.0 only, PhantomJS 1 only
	// push.apply(_, arraylike) throws on ancient WebKit
	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		for ( ; j < len; j++ ) {
			first[ i++ ] = second[ j ];
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var length, value,
			i = 0,
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArrayLike( elems ) ) {
			length = elems.length;
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var tmp, args, proxy;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: Date.now,

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
} );

if ( typeof Symbol === "function" ) {
	jQuery.fn[ Symbol.iterator ] = arr[ Symbol.iterator ];
}

// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
function( i, name ) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
} );

function isArrayLike( obj ) {

	// Support: real iOS 8.2 only (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = !!obj && "length" in obj && obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.3.3
 * https://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2016-08-08
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// https://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",

	// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + identifier + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + identifier + ")" ),
		"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
		"TAG": new RegExp( "^(" + identifier + "|[*])" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,

	// CSS escapes
	// http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// CSS string/identifier serialization
	// https://drafts.csswg.org/cssom/#common-serializing-idioms
	rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
	fcssescape = function( ch, asCodePoint ) {
		if ( asCodePoint ) {

			// U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER
			if ( ch === "\0" ) {
				return "\uFFFD";
			}

			// Control characters and (dependent upon position) numbers get escaped as code points
			return ch.slice( 0, -1 ) + "\\" + ch.charCodeAt( ch.length - 1 ).toString( 16 ) + " ";
		}

		// Other potentially-special ASCII characters get backslash-escaped
		return "\\" + ch;
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	},

	disabledAncestor = addCombinator(
		function( elem ) {
			return elem.disabled === true && ("form" in elem || "label" in elem);
		},
		{ dir: "parentNode", next: "legend" }
	);

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var m, i, elem, nid, match, groups, newSelector,
		newContext = context && context.ownerDocument,

		// nodeType defaults to 9, since context defaults to document
		nodeType = context ? context.nodeType : 9;

	results = results || [];

	// Return early from calls with invalid selector or context
	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	// Try to shortcut find operations (as opposed to filters) in HTML documents
	if ( !seed ) {

		if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
			setDocument( context );
		}
		context = context || document;

		if ( documentIsHTML ) {

			// If the selector is sufficiently simple, try using a "get*By*" DOM method
			// (excepting DocumentFragment context, where the methods don't exist)
			if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {

				// ID selector
				if ( (m = match[1]) ) {

					// Document context
					if ( nodeType === 9 ) {
						if ( (elem = context.getElementById( m )) ) {

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( elem.id === m ) {
								results.push( elem );
								return results;
							}
						} else {
							return results;
						}

					// Element context
					} else {

						// Support: IE, Opera, Webkit
						// TODO: identify versions
						// getElementById can match elements by name instead of ID
						if ( newContext && (elem = newContext.getElementById( m )) &&
							contains( context, elem ) &&
							elem.id === m ) {

							results.push( elem );
							return results;
						}
					}

				// Type selector
				} else if ( match[2] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;

				// Class selector
				} else if ( (m = match[3]) && support.getElementsByClassName &&
					context.getElementsByClassName ) {

					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}

			// Take advantage of querySelectorAll
			if ( support.qsa &&
				!compilerCache[ selector + " " ] &&
				(!rbuggyQSA || !rbuggyQSA.test( selector )) ) {

				if ( nodeType !== 1 ) {
					newContext = context;
					newSelector = selector;

				// qSA looks outside Element context, which is not what we want
				// Thanks to Andrew Dupont for this workaround technique
				// Support: IE <=8
				// Exclude object elements
				} else if ( context.nodeName.toLowerCase() !== "object" ) {

					// Capture the context ID, setting it first if necessary
					if ( (nid = context.getAttribute( "id" )) ) {
						nid = nid.replace( rcssescape, fcssescape );
					} else {
						context.setAttribute( "id", (nid = expando) );
					}

					// Prefix every selector in the list
					groups = tokenize( selector );
					i = groups.length;
					while ( i-- ) {
						groups[i] = "#" + nid + " " + toSelector( groups[i] );
					}
					newSelector = groups.join( "," );

					// Expand context for sibling selectors
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
						context;
				}

				if ( newSelector ) {
					try {
						push.apply( results,
							newContext.querySelectorAll( newSelector )
						);
						return results;
					} catch ( qsaError ) {
					} finally {
						if ( nid === expando ) {
							context.removeAttribute( "id" );
						}
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created element and returns a boolean result
 */
function assert( fn ) {
	var el = document.createElement("fieldset");

	try {
		return !!fn( el );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( el.parentNode ) {
			el.parentNode.removeChild( el );
		}
		// release memory in IE
		el = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = arr.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			a.sourceIndex - b.sourceIndex;

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for :enabled/:disabled
 * @param {Boolean} disabled true for :disabled; false for :enabled
 */
function createDisabledPseudo( disabled ) {

	// Known :disabled false positives: fieldset[disabled] > legend:nth-of-type(n+2) :can-disable
	return function( elem ) {

		// Only certain elements can match :enabled or :disabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-enabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-disabled
		if ( "form" in elem ) {

			// Check for inherited disabledness on relevant non-disabled elements:
			// * listed form-associated elements in a disabled fieldset
			//   https://html.spec.whatwg.org/multipage/forms.html#category-listed
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-fe-disabled
			// * option elements in a disabled optgroup
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-option-disabled
			// All such elements have a "form" property.
			if ( elem.parentNode && elem.disabled === false ) {

				// Option elements defer to a parent optgroup if present
				if ( "label" in elem ) {
					if ( "label" in elem.parentNode ) {
						return elem.parentNode.disabled === disabled;
					} else {
						return elem.disabled === disabled;
					}
				}

				// Support: IE 6 - 11
				// Use the isDisabled shortcut property to check for disabled fieldset ancestors
				return elem.isDisabled === disabled ||

					// Where there is no isDisabled, check manually
					/* jshint -W018 */
					elem.isDisabled !== !disabled &&
						disabledAncestor( elem ) === disabled;
			}

			return elem.disabled === disabled;

		// Try to winnow out elements that can't be disabled before trusting the disabled property.
		// Some victims get caught in our net (label, legend, menu, track), but it shouldn't
		// even exist on them, let alone have a boolean value.
		} else if ( "label" in elem ) {
			return elem.disabled === disabled;
		}

		// Remaining elements are neither :enabled nor :disabled
		return false;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, subWindow,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// Return early if doc is invalid or already selected
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Update global variables
	document = doc;
	docElem = document.documentElement;
	documentIsHTML = !isXML( document );

	// Support: IE 9-11, Edge
	// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
	if ( preferredDoc !== document &&
		(subWindow = document.defaultView) && subWindow.top !== subWindow ) {

		// Support: IE 11, Edge
		if ( subWindow.addEventListener ) {
			subWindow.addEventListener( "unload", unloadHandler, false );

		// Support: IE 9 - 10 only
		} else if ( subWindow.attachEvent ) {
			subWindow.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( el ) {
		el.className = "i";
		return !el.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( el ) {
		el.appendChild( document.createComment("") );
		return !el.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( document.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programmatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( el ) {
		docElem.appendChild( el ).id = expando;
		return !document.getElementsByName || !document.getElementsByName( expando ).length;
	});

	// ID filter and find
	if ( support.getById ) {
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var elem = context.getElementById( id );
				return elem ? [ elem ] : [];
			}
		};
	} else {
		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" &&
					elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};

		// Support: IE 6 - 7 only
		// getElementById is not reliable as a find shortcut
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var node, i, elems,
					elem = context.getElementById( id );

				if ( elem ) {

					// Verify the id attribute
					node = elem.getAttributeNode("id");
					if ( node && node.value === id ) {
						return [ elem ];
					}

					// Fall back on getElementsByName
					elems = context.getElementsByName( id );
					i = 0;
					while ( (elem = elems[i++]) ) {
						node = elem.getAttributeNode("id");
						if ( node && node.value === id ) {
							return [ elem ];
						}
					}
				}

				return [];
			}
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See https://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( document.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( el ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// https://bugs.jquery.com/ticket/12359
			docElem.appendChild( el ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\r\\' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// https://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( el.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !el.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
			if ( !el.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !el.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibling-combinator selector` fails
			if ( !el.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( el ) {
			el.innerHTML = "<a href='' disabled='disabled'></a>" +
				"<select disabled='disabled'><option/></select>";

			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = document.createElement("input");
			input.setAttribute( "type", "hidden" );
			el.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( el.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( el.querySelectorAll(":enabled").length !== 2 ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Support: IE9-11+
			// IE's :disabled selector does not pick up the children of disabled fieldsets
			docElem.appendChild( el ).disabled = true;
			if ( el.querySelectorAll(":disabled").length !== 2 ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			el.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( el ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( el, "*" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( el, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully self-exclusive
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === document ? -1 :
				b === document ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return document;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		!compilerCache[ expr + " " ] &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.escape = function( sel ) {
	return (sel + "").replace( rcssescape, fcssescape );
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, uniqueCache, outerCache, node, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType,
						diff = false;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) {

										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {

							// Seek `elem` from a previously-cached index

							// ...in a gzip-friendly way
							node = parent;
							outerCache = node[ expando ] || (node[ expando ] = {});

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ node.uniqueID ] ||
								(outerCache[ node.uniqueID ] = {});

							cache = uniqueCache[ type ] || [];
							nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
							diff = nodeIndex && cache[ 2 ];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						} else {
							// Use previously-cached element index if available
							if ( useCache ) {
								// ...in a gzip-friendly way
								node = elem;
								outerCache = node[ expando ] || (node[ expando ] = {});

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									(outerCache[ node.uniqueID ] = {});

								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex;
							}

							// xml :nth-child(...)
							// or :nth-last-child(...) or :nth(-last)?-of-type(...)
							if ( diff === false ) {
								// Use the same loop as above to seek `elem` from the start
								while ( (node = ++nodeIndex && node && node[ dir ] ||
									(diff = nodeIndex = 0) || start.pop()) ) {

									if ( ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) &&
										++diff ) {

										// Cache the index of each encountered element
										if ( useCache ) {
											outerCache = node[ expando ] || (node[ expando ] = {});

											// Support: IE <9 only
											// Defend against cloned attroperties (jQuery gh-1709)
											uniqueCache = outerCache[ node.uniqueID ] ||
												(outerCache[ node.uniqueID ] = {});

											uniqueCache[ type ] = [ dirruns, diff ];
										}

										if ( node === elem ) {
											break;
										}
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": createDisabledPseudo( false ),
		"disabled": createDisabledPseudo( true ),

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		skip = combinator.next,
		key = skip || dir,
		checkNonElements = base && key === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
			return false;
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, uniqueCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});

						// Support: IE <9 only
						// Defend against cloned attroperties (jQuery gh-1709)
						uniqueCache = outerCache[ elem.uniqueID ] || (outerCache[ elem.uniqueID ] = {});

						if ( skip && skip === elem.nodeName.toLowerCase() ) {
							elem = elem[ dir ] || elem;
						} else if ( (oldCache = uniqueCache[ key ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							uniqueCache[ key ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
			return false;
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context === document || context || outermost;
			}

			// Add elements passing elementMatchers directly to results
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					if ( !context && elem.ownerDocument !== document ) {
						setDocument( elem );
						xml = !documentIsHTML;
					}
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context || document, xml) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// `i` is now the count of elements visited above, and adding it to `matchedCount`
			// makes the latter nonnegative.
			matchedCount += i;

			// Apply set filters to unmatched elements
			// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
			// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
			// no element matchers and no seed.
			// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
			// case, which will result in a "00" `matchedCount` that differs from `i` but is also
			// numerically zero.
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is only one selector in the list and no seed
	// (the latter of which guarantees us context)
	if ( match.length === 1 ) {

		// Reduce context if the leading compound selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				context.nodeType === 9 && documentIsHTML && Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( el ) {
	// Should return 1, but returns 4 (following)
	return el.compareDocumentPosition( document.createElement("fieldset") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// https://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( el ) {
	el.innerHTML = "<a href='#'></a>";
	return el.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( el ) {
	el.innerHTML = "<input/>";
	el.firstChild.setAttribute( "value", "" );
	return el.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( el ) {
	return el.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;

// Deprecated
jQuery.expr[ ":" ] = jQuery.expr.pseudos;
jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;
jQuery.escapeSelector = Sizzle.escape;




var dir = function( elem, dir, until ) {
	var matched = [],
		truncate = until !== undefined;

	while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
		if ( elem.nodeType === 1 ) {
			if ( truncate && jQuery( elem ).is( until ) ) {
				break;
			}
			matched.push( elem );
		}
	}
	return matched;
};


var siblings = function( n, elem ) {
	var matched = [];

	for ( ; n; n = n.nextSibling ) {
		if ( n.nodeType === 1 && n !== elem ) {
			matched.push( n );
		}
	}

	return matched;
};


var rneedsContext = jQuery.expr.match.needsContext;



function nodeName( elem, name ) {

  return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();

};
var rsingleTag = ( /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i );



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			return !!qualifier.call( elem, i, elem ) !== not;
		} );
	}

	// Single element
	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		} );
	}

	// Arraylike of elements (jQuery, arguments, Array)
	if ( typeof qualifier !== "string" ) {
		return jQuery.grep( elements, function( elem ) {
			return ( indexOf.call( qualifier, elem ) > -1 ) !== not;
		} );
	}

	// Simple selector that can be filtered directly, removing non-Elements
	if ( risSimple.test( qualifier ) ) {
		return jQuery.filter( qualifier, elements, not );
	}

	// Complex selector, compare the two sets, removing non-Elements
	qualifier = jQuery.filter( qualifier, elements );
	return jQuery.grep( elements, function( elem ) {
		return ( indexOf.call( qualifier, elem ) > -1 ) !== not && elem.nodeType === 1;
	} );
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	if ( elems.length === 1 && elem.nodeType === 1 ) {
		return jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [];
	}

	return jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
		return elem.nodeType === 1;
	} ) );
};

jQuery.fn.extend( {
	find: function( selector ) {
		var i, ret,
			len = this.length,
			self = this;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter( function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			} ) );
		}

		ret = this.pushStack( [] );

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		return len > 1 ? jQuery.uniqueSort( ret ) : ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow( this, selector || [], false ) );
	},
	not: function( selector ) {
		return this.pushStack( winnow( this, selector || [], true ) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
} );


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	// Shortcut simple #id case for speed
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,

	init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Method init() accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector[ 0 ] === "<" &&
				selector[ selector.length - 1 ] === ">" &&
				selector.length >= 3 ) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && ( match[ 1 ] || !context ) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) {
					context = context instanceof jQuery ? context[ 0 ] : context;

					// Option to run scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {

							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[ 2 ] );

					if ( elem ) {

						// Inject the element directly into the jQuery object
						this[ 0 ] = elem;
						this.length = 1;
					}
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || root ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return root.ready !== undefined ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,

	// Methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend( {
	has: function( target ) {
		var targets = jQuery( target, this ),
			l = targets.length;

		return this.filter( function() {
			var i = 0;
			for ( ; i < l; i++ ) {
				if ( jQuery.contains( this, targets[ i ] ) ) {
					return true;
				}
			}
		} );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			targets = typeof selectors !== "string" && jQuery( selectors );

		// Positional selectors never match, since there's no _selection_ context
		if ( !rneedsContext.test( selectors ) ) {
			for ( ; i < l; i++ ) {
				for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

					// Always skip document fragments
					if ( cur.nodeType < 11 && ( targets ?
						targets.index( cur ) > -1 :

						// Don't pass non-elements to Sizzle
						cur.nodeType === 1 &&
							jQuery.find.matchesSelector( cur, selectors ) ) ) {

						matched.push( cur );
						break;
					}
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
	},

	// Determine the position of an element within the set
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// Index in selector
		if ( typeof elem === "string" ) {
			return indexOf.call( jQuery( elem ), this[ 0 ] );
		}

		// Locate the position of the desired element
		return indexOf.call( this,

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem
		);
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.uniqueSort(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	}
} );

function sibling( cur, dir ) {
	while ( ( cur = cur[ dir ] ) && cur.nodeType !== 1 ) {}
	return cur;
}

jQuery.each( {
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return siblings( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return siblings( elem.firstChild );
	},
	contents: function( elem ) {
        if ( nodeName( elem, "iframe" ) ) {
            return elem.contentDocument;
        }

        // Support: IE 9 - 11 only, iOS 7 only, Android Browser <=4.3 only
        // Treat the template element as a regular one in browsers that
        // don't support it.
        if ( nodeName( elem, "template" ) ) {
            elem = elem.content || elem;
        }

        return jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var matched = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			matched = jQuery.filter( selector, matched );
		}

		if ( this.length > 1 ) {

			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				jQuery.uniqueSort( matched );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				matched.reverse();
			}
		}

		return this.pushStack( matched );
	};
} );
var rnothtmlwhite = ( /[^\x20\t\r\n\f]+/g );



// Convert String-formatted options into Object-formatted ones
function createOptions( options ) {
	var object = {};
	jQuery.each( options.match( rnothtmlwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	} );
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		createOptions( options ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,

		// Last fire value for non-forgettable lists
		memory,

		// Flag to know if list was already fired
		fired,

		// Flag to prevent firing
		locked,

		// Actual callback list
		list = [],

		// Queue of execution data for repeatable lists
		queue = [],

		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,

		// Fire callbacks
		fire = function() {

			// Enforce single-firing
			locked = locked || options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			fired = firing = true;
			for ( ; queue.length; firingIndex = -1 ) {
				memory = queue.shift();
				while ( ++firingIndex < list.length ) {

					// Run callback and check for early termination
					if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
						options.stopOnFalse ) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if ( !options.memory ) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if ( locked ) {

				// Keep an empty list if we have data for future add calls
				if ( memory ) {
					list = [];

				// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
		},

		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {

					// If we have memory from a past run, we should fire after adding
					if ( memory && !firing ) {
						firingIndex = list.length - 1;
						queue.push( memory );
					}

					( function add( args ) {
						jQuery.each( args, function( _, arg ) {
							if ( jQuery.isFunction( arg ) ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && jQuery.type( arg ) !== "string" ) {

								// Inspect recursively
								add( arg );
							}
						} );
					} )( arguments );

					if ( memory && !firing ) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function() {
				jQuery.each( arguments, function( _, arg ) {
					var index;
					while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
						list.splice( index, 1 );

						// Handle firing indexes
						if ( index <= firingIndex ) {
							firingIndex--;
						}
					}
				} );
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ?
					jQuery.inArray( fn, list ) > -1 :
					list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function() {
				if ( list ) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function() {
				locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function() {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function() {
				locked = queue = [];
				if ( !memory && !firing ) {
					list = memory = "";
				}
				return this;
			},
			locked: function() {
				return !!locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( !locked ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					queue.push( args );
					if ( !firing ) {
						fire();
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


function Identity( v ) {
	return v;
}
function Thrower( ex ) {
	throw ex;
}

function adoptValue( value, resolve, reject, noValue ) {
	var method;

	try {

		// Check for promise aspect first to privilege synchronous behavior
		if ( value && jQuery.isFunction( ( method = value.promise ) ) ) {
			method.call( value ).done( resolve ).fail( reject );

		// Other thenables
		} else if ( value && jQuery.isFunction( ( method = value.then ) ) ) {
			method.call( value, resolve, reject );

		// Other non-thenables
		} else {

			// Control `resolve` arguments by letting Array#slice cast boolean `noValue` to integer:
			// * false: [ value ].slice( 0 ) => resolve( value )
			// * true: [ value ].slice( 1 ) => resolve()
			resolve.apply( undefined, [ value ].slice( noValue ) );
		}

	// For Promises/A+, convert exceptions into rejections
	// Since jQuery.when doesn't unwrap thenables, we can skip the extra checks appearing in
	// Deferred#then to conditionally suppress rejection.
	} catch ( value ) {

		// Support: Android 4.0 only
		// Strict mode functions invoked without .call/.apply get global-object context
		reject.apply( undefined, [ value ] );
	}
}

jQuery.extend( {

	Deferred: function( func ) {
		var tuples = [

				// action, add listener, callbacks,
				// ... .then handlers, argument index, [final state]
				[ "notify", "progress", jQuery.Callbacks( "memory" ),
					jQuery.Callbacks( "memory" ), 2 ],
				[ "resolve", "done", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 0, "resolved" ],
				[ "reject", "fail", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 1, "rejected" ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				"catch": function( fn ) {
					return promise.then( null, fn );
				},

				// Keep pipe for back-compat
				pipe: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;

					return jQuery.Deferred( function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {

							// Map tuples (progress, done, fail) to arguments (done, fail, progress)
							var fn = jQuery.isFunction( fns[ tuple[ 4 ] ] ) && fns[ tuple[ 4 ] ];

							// deferred.progress(function() { bind to newDefer or newDefer.notify })
							// deferred.done(function() { bind to newDefer or newDefer.resolve })
							// deferred.fail(function() { bind to newDefer or newDefer.reject })
							deferred[ tuple[ 1 ] ]( function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.progress( newDefer.notify )
										.done( newDefer.resolve )
										.fail( newDefer.reject );
								} else {
									newDefer[ tuple[ 0 ] + "With" ](
										this,
										fn ? [ returned ] : arguments
									);
								}
							} );
						} );
						fns = null;
					} ).promise();
				},
				then: function( onFulfilled, onRejected, onProgress ) {
					var maxDepth = 0;
					function resolve( depth, deferred, handler, special ) {
						return function() {
							var that = this,
								args = arguments,
								mightThrow = function() {
									var returned, then;

									// Support: Promises/A+ section 2.3.3.3.3
									// https://promisesaplus.com/#point-59
									// Ignore double-resolution attempts
									if ( depth < maxDepth ) {
										return;
									}

									returned = handler.apply( that, args );

									// Support: Promises/A+ section 2.3.1
									// https://promisesaplus.com/#point-48
									if ( returned === deferred.promise() ) {
										throw new TypeError( "Thenable self-resolution" );
									}

									// Support: Promises/A+ sections 2.3.3.1, 3.5
									// https://promisesaplus.com/#point-54
									// https://promisesaplus.com/#point-75
									// Retrieve `then` only once
									then = returned &&

										// Support: Promises/A+ section 2.3.4
										// https://promisesaplus.com/#point-64
										// Only check objects and functions for thenability
										( typeof returned === "object" ||
											typeof returned === "function" ) &&
										returned.then;

									// Handle a returned thenable
									if ( jQuery.isFunction( then ) ) {

										// Special processors (notify) just wait for resolution
										if ( special ) {
											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special )
											);

										// Normal processors (resolve) also hook into progress
										} else {

											// ...and disregard older resolution values
											maxDepth++;

											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special ),
												resolve( maxDepth, deferred, Identity,
													deferred.notifyWith )
											);
										}

									// Handle all other returned values
									} else {

										// Only substitute handlers pass on context
										// and multiple values (non-spec behavior)
										if ( handler !== Identity ) {
											that = undefined;
											args = [ returned ];
										}

										// Process the value(s)
										// Default process is resolve
										( special || deferred.resolveWith )( that, args );
									}
								},

								// Only normal processors (resolve) catch and reject exceptions
								process = special ?
									mightThrow :
									function() {
										try {
											mightThrow();
										} catch ( e ) {

											if ( jQuery.Deferred.exceptionHook ) {
												jQuery.Deferred.exceptionHook( e,
													process.stackTrace );
											}

											// Support: Promises/A+ section 2.3.3.3.4.1
											// https://promisesaplus.com/#point-61
											// Ignore post-resolution exceptions
											if ( depth + 1 >= maxDepth ) {

												// Only substitute handlers pass on context
												// and multiple values (non-spec behavior)
												if ( handler !== Thrower ) {
													that = undefined;
													args = [ e ];
												}

												deferred.rejectWith( that, args );
											}
										}
									};

							// Support: Promises/A+ section 2.3.3.3.1
							// https://promisesaplus.com/#point-57
							// Re-resolve promises immediately to dodge false rejection from
							// subsequent errors
							if ( depth ) {
								process();
							} else {

								// Call an optional hook to record the stack, in case of exception
								// since it's otherwise lost when execution goes async
								if ( jQuery.Deferred.getStackHook ) {
									process.stackTrace = jQuery.Deferred.getStackHook();
								}
								window.setTimeout( process );
							}
						};
					}

					return jQuery.Deferred( function( newDefer ) {

						// progress_handlers.add( ... )
						tuples[ 0 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								jQuery.isFunction( onProgress ) ?
									onProgress :
									Identity,
								newDefer.notifyWith
							)
						);

						// fulfilled_handlers.add( ... )
						tuples[ 1 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								jQuery.isFunction( onFulfilled ) ?
									onFulfilled :
									Identity
							)
						);

						// rejected_handlers.add( ... )
						tuples[ 2 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								jQuery.isFunction( onRejected ) ?
									onRejected :
									Thrower
							)
						);
					} ).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 5 ];

			// promise.progress = list.add
			// promise.done = list.add
			// promise.fail = list.add
			promise[ tuple[ 1 ] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(
					function() {

						// state = "resolved" (i.e., fulfilled)
						// state = "rejected"
						state = stateString;
					},

					// rejected_callbacks.disable
					// fulfilled_callbacks.disable
					tuples[ 3 - i ][ 2 ].disable,

					// progress_callbacks.lock
					tuples[ 0 ][ 2 ].lock
				);
			}

			// progress_handlers.fire
			// fulfilled_handlers.fire
			// rejected_handlers.fire
			list.add( tuple[ 3 ].fire );

			// deferred.notify = function() { deferred.notifyWith(...) }
			// deferred.resolve = function() { deferred.resolveWith(...) }
			// deferred.reject = function() { deferred.rejectWith(...) }
			deferred[ tuple[ 0 ] ] = function() {
				deferred[ tuple[ 0 ] + "With" ]( this === deferred ? undefined : this, arguments );
				return this;
			};

			// deferred.notifyWith = list.fireWith
			// deferred.resolveWith = list.fireWith
			// deferred.rejectWith = list.fireWith
			deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
		} );

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( singleValue ) {
		var

			// count of uncompleted subordinates
			remaining = arguments.length,

			// count of unprocessed arguments
			i = remaining,

			// subordinate fulfillment data
			resolveContexts = Array( i ),
			resolveValues = slice.call( arguments ),

			// the master Deferred
			master = jQuery.Deferred(),

			// subordinate callback factory
			updateFunc = function( i ) {
				return function( value ) {
					resolveContexts[ i ] = this;
					resolveValues[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( !( --remaining ) ) {
						master.resolveWith( resolveContexts, resolveValues );
					}
				};
			};

		// Single- and empty arguments are adopted like Promise.resolve
		if ( remaining <= 1 ) {
			adoptValue( singleValue, master.done( updateFunc( i ) ).resolve, master.reject,
				!remaining );

			// Use .then() to unwrap secondary thenables (cf. gh-3000)
			if ( master.state() === "pending" ||
				jQuery.isFunction( resolveValues[ i ] && resolveValues[ i ].then ) ) {

				return master.then();
			}
		}

		// Multiple arguments are aggregated like Promise.all array elements
		while ( i-- ) {
			adoptValue( resolveValues[ i ], updateFunc( i ), master.reject );
		}

		return master.promise();
	}
} );


// These usually indicate a programmer mistake during development,
// warn about them ASAP rather than swallowing them by default.
var rerrorNames = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;

jQuery.Deferred.exceptionHook = function( error, stack ) {

	// Support: IE 8 - 9 only
	// Console exists when dev tools are open, which can happen at any time
	if ( window.console && window.console.warn && error && rerrorNames.test( error.name ) ) {
		window.console.warn( "jQuery.Deferred exception: " + error.message, error.stack, stack );
	}
};




jQuery.readyException = function( error ) {
	window.setTimeout( function() {
		throw error;
	} );
};




// The deferred used on DOM ready
var readyList = jQuery.Deferred();

jQuery.fn.ready = function( fn ) {

	readyList
		.then( fn )

		// Wrap jQuery.readyException in a function so that the lookup
		// happens at the time of error handling instead of callback
		// registration.
		.catch( function( error ) {
			jQuery.readyException( error );
		} );

	return this;
};

jQuery.extend( {

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );
	}
} );

jQuery.ready.then = readyList.then;

// The ready event handler and self cleanup method
function completed() {
	document.removeEventListener( "DOMContentLoaded", completed );
	window.removeEventListener( "load", completed );
	jQuery.ready();
}

// Catch cases where $(document).ready() is called
// after the browser event has already occurred.
// Support: IE <=9 - 10 only
// Older IE sometimes signals "interactive" too soon
if ( document.readyState === "complete" ||
	( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

	// Handle it asynchronously to allow scripts the opportunity to delay ready
	window.setTimeout( jQuery.ready );

} else {

	// Use the handy event callback
	document.addEventListener( "DOMContentLoaded", completed );

	// A fallback to window.onload, that will always work
	window.addEventListener( "load", completed );
}




// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		len = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {

			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < len; i++ ) {
				fn(
					elems[ i ], key, raw ?
					value :
					value.call( elems[ i ], i, fn( elems[ i ], key ) )
				);
			}
		}
	}

	if ( chainable ) {
		return elems;
	}

	// Gets
	if ( bulk ) {
		return fn.call( elems );
	}

	return len ? fn( elems[ 0 ], key ) : emptyGet;
};
var acceptData = function( owner ) {

	// Accepts only:
	//  - Node
	//    - Node.ELEMENT_NODE
	//    - Node.DOCUMENT_NODE
	//  - Object
	//    - Any
	return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
};




function Data() {
	this.expando = jQuery.expando + Data.uid++;
}

Data.uid = 1;

Data.prototype = {

	cache: function( owner ) {

		// Check if the owner object already has a cache
		var value = owner[ this.expando ];

		// If not, create one
		if ( !value ) {
			value = {};

			// We can accept data for non-element nodes in modern browsers,
			// but we should not, see #8335.
			// Always return an empty object.
			if ( acceptData( owner ) ) {

				// If it is a node unlikely to be stringify-ed or looped over
				// use plain assignment
				if ( owner.nodeType ) {
					owner[ this.expando ] = value;

				// Otherwise secure it in a non-enumerable property
				// configurable must be true to allow the property to be
				// deleted when data is removed
				} else {
					Object.defineProperty( owner, this.expando, {
						value: value,
						configurable: true
					} );
				}
			}
		}

		return value;
	},
	set: function( owner, data, value ) {
		var prop,
			cache = this.cache( owner );

		// Handle: [ owner, key, value ] args
		// Always use camelCase key (gh-2257)
		if ( typeof data === "string" ) {
			cache[ jQuery.camelCase( data ) ] = value;

		// Handle: [ owner, { properties } ] args
		} else {

			// Copy the properties one-by-one to the cache object
			for ( prop in data ) {
				cache[ jQuery.camelCase( prop ) ] = data[ prop ];
			}
		}
		return cache;
	},
	get: function( owner, key ) {
		return key === undefined ?
			this.cache( owner ) :

			// Always use camelCase key (gh-2257)
			owner[ this.expando ] && owner[ this.expando ][ jQuery.camelCase( key ) ];
	},
	access: function( owner, key, value ) {

		// In cases where either:
		//
		//   1. No key was specified
		//   2. A string key was specified, but no value provided
		//
		// Take the "read" path and allow the get method to determine
		// which value to return, respectively either:
		//
		//   1. The entire cache object
		//   2. The data stored at the key
		//
		if ( key === undefined ||
				( ( key && typeof key === "string" ) && value === undefined ) ) {

			return this.get( owner, key );
		}

		// When the key is not a string, or both a key and value
		// are specified, set or extend (existing objects) with either:
		//
		//   1. An object of properties
		//   2. A key and value
		//
		this.set( owner, key, value );

		// Since the "set" path can have two possible entry points
		// return the expected data based on which path was taken[*]
		return value !== undefined ? value : key;
	},
	remove: function( owner, key ) {
		var i,
			cache = owner[ this.expando ];

		if ( cache === undefined ) {
			return;
		}

		if ( key !== undefined ) {

			// Support array or space separated string of keys
			if ( Array.isArray( key ) ) {

				// If key is an array of keys...
				// We always set camelCase keys, so remove that.
				key = key.map( jQuery.camelCase );
			} else {
				key = jQuery.camelCase( key );

				// If a key with the spaces exists, use it.
				// Otherwise, create an array by matching non-whitespace
				key = key in cache ?
					[ key ] :
					( key.match( rnothtmlwhite ) || [] );
			}

			i = key.length;

			while ( i-- ) {
				delete cache[ key[ i ] ];
			}
		}

		// Remove the expando if there's no more data
		if ( key === undefined || jQuery.isEmptyObject( cache ) ) {

			// Support: Chrome <=35 - 45
			// Webkit & Blink performance suffers when deleting properties
			// from DOM nodes, so set to undefined instead
			// https://bugs.chromium.org/p/chromium/issues/detail?id=378607 (bug restricted)
			if ( owner.nodeType ) {
				owner[ this.expando ] = undefined;
			} else {
				delete owner[ this.expando ];
			}
		}
	},
	hasData: function( owner ) {
		var cache = owner[ this.expando ];
		return cache !== undefined && !jQuery.isEmptyObject( cache );
	}
};
var dataPriv = new Data();

var dataUser = new Data();



//	Implementation Summary
//
//	1. Enforce API surface and semantic compatibility with 1.9.x branch
//	2. Improve the module's maintainability by reducing the storage
//		paths to a single mechanism.
//	3. Use the same single mechanism to support "private" and "user" data.
//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
//	5. Avoid exposing implementation details on user objects (eg. expando properties)
//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /[A-Z]/g;

function getData( data ) {
	if ( data === "true" ) {
		return true;
	}

	if ( data === "false" ) {
		return false;
	}

	if ( data === "null" ) {
		return null;
	}

	// Only convert to a number if it doesn't change the string
	if ( data === +data + "" ) {
		return +data;
	}

	if ( rbrace.test( data ) ) {
		return JSON.parse( data );
	}

	return data;
}

function dataAttr( elem, key, data ) {
	var name;

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {
		name = "data-" + key.replace( rmultiDash, "-$&" ).toLowerCase();
		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = getData( data );
			} catch ( e ) {}

			// Make sure we set the data so it isn't changed later
			dataUser.set( elem, key, data );
		} else {
			data = undefined;
		}
	}
	return data;
}

jQuery.extend( {
	hasData: function( elem ) {
		return dataUser.hasData( elem ) || dataPriv.hasData( elem );
	},

	data: function( elem, name, data ) {
		return dataUser.access( elem, name, data );
	},

	removeData: function( elem, name ) {
		dataUser.remove( elem, name );
	},

	// TODO: Now that all calls to _data and _removeData have been replaced
	// with direct calls to dataPriv methods, these can be deprecated.
	_data: function( elem, name, data ) {
		return dataPriv.access( elem, name, data );
	},

	_removeData: function( elem, name ) {
		dataPriv.remove( elem, name );
	}
} );

jQuery.fn.extend( {
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = dataUser.get( elem );

				if ( elem.nodeType === 1 && !dataPriv.get( elem, "hasDataAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE 11 only
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice( 5 ) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					dataPriv.set( elem, "hasDataAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each( function() {
				dataUser.set( this, key );
			} );
		}

		return access( this, function( value ) {
			var data;

			// The calling jQuery object (element matches) is not empty
			// (and therefore has an element appears at this[ 0 ]) and the
			// `value` parameter was not undefined. An empty jQuery object
			// will result in `undefined` for elem = this[ 0 ] which will
			// throw an exception if an attempt to read a data cache is made.
			if ( elem && value === undefined ) {

				// Attempt to get data from the cache
				// The key will always be camelCased in Data
				data = dataUser.get( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to "discover" the data in
				// HTML5 custom data-* attrs
				data = dataAttr( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// We tried really hard, but the data doesn't exist.
				return;
			}

			// Set the data...
			this.each( function() {

				// We always store the camelCased key
				dataUser.set( this, key, value );
			} );
		}, null, value, arguments.length > 1, null, true );
	},

	removeData: function( key ) {
		return this.each( function() {
			dataUser.remove( this, key );
		} );
	}
} );


jQuery.extend( {
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = dataPriv.get( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || Array.isArray( data ) ) {
					queue = dataPriv.access( elem, type, jQuery.makeArray( data ) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// Clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// Not public - generate a queueHooks object, or return the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return dataPriv.get( elem, key ) || dataPriv.access( elem, key, {
			empty: jQuery.Callbacks( "once memory" ).add( function() {
				dataPriv.remove( elem, [ type + "queue", key ] );
			} )
		} );
	}
} );

jQuery.fn.extend( {
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[ 0 ], type );
		}

		return data === undefined ?
			this :
			this.each( function() {
				var queue = jQuery.queue( this, type, data );

				// Ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			} );
	},
	dequeue: function( type ) {
		return this.each( function() {
			jQuery.dequeue( this, type );
		} );
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},

	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = dataPriv.get( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
} );
var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHiddenWithinTree = function( elem, el ) {

		// isHiddenWithinTree might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;

		// Inline style trumps all
		return elem.style.display === "none" ||
			elem.style.display === "" &&

			// Otherwise, check computed style
			// Support: Firefox <=43 - 45
			// Disconnected elements can have computed display: none, so first confirm that elem is
			// in the document.
			jQuery.contains( elem.ownerDocument, elem ) &&

			jQuery.css( elem, "display" ) === "none";
	};

var swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};




function adjustCSS( elem, prop, valueParts, tween ) {
	var adjusted,
		scale = 1,
		maxIterations = 20,
		currentValue = tween ?
			function() {
				return tween.cur();
			} :
			function() {
				return jQuery.css( elem, prop, "" );
			},
		initial = currentValue(),
		unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

		// Starting value computation is required for potential unit mismatches
		initialInUnit = ( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
			rcssNum.exec( jQuery.css( elem, prop ) );

	if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

		// Trust units reported by jQuery.css
		unit = unit || initialInUnit[ 3 ];

		// Make sure we update the tween properties later on
		valueParts = valueParts || [];

		// Iteratively approximate from a nonzero starting point
		initialInUnit = +initial || 1;

		do {

			// If previous iteration zeroed out, double until we get *something*.
			// Use string for doubling so we don't accidentally see scale as unchanged below
			scale = scale || ".5";

			// Adjust and apply
			initialInUnit = initialInUnit / scale;
			jQuery.style( elem, prop, initialInUnit + unit );

		// Update scale, tolerating zero or NaN from tween.cur()
		// Break the loop if scale is unchanged or perfect, or if we've just had enough.
		} while (
			scale !== ( scale = currentValue() / initial ) && scale !== 1 && --maxIterations
		);
	}

	if ( valueParts ) {
		initialInUnit = +initialInUnit || +initial || 0;

		// Apply relative offset (+=/-=) if specified
		adjusted = valueParts[ 1 ] ?
			initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
			+valueParts[ 2 ];
		if ( tween ) {
			tween.unit = unit;
			tween.start = initialInUnit;
			tween.end = adjusted;
		}
	}
	return adjusted;
}


var defaultDisplayMap = {};

function getDefaultDisplay( elem ) {
	var temp,
		doc = elem.ownerDocument,
		nodeName = elem.nodeName,
		display = defaultDisplayMap[ nodeName ];

	if ( display ) {
		return display;
	}

	temp = doc.body.appendChild( doc.createElement( nodeName ) );
	display = jQuery.css( temp, "display" );

	temp.parentNode.removeChild( temp );

	if ( display === "none" ) {
		display = "block";
	}
	defaultDisplayMap[ nodeName ] = display;

	return display;
}

function showHide( elements, show ) {
	var display, elem,
		values = [],
		index = 0,
		length = elements.length;

	// Determine new display value for elements that need to change
	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		display = elem.style.display;
		if ( show ) {

			// Since we force visibility upon cascade-hidden elements, an immediate (and slow)
			// check is required in this first loop unless we have a nonempty display value (either
			// inline or about-to-be-restored)
			if ( display === "none" ) {
				values[ index ] = dataPriv.get( elem, "display" ) || null;
				if ( !values[ index ] ) {
					elem.style.display = "";
				}
			}
			if ( elem.style.display === "" && isHiddenWithinTree( elem ) ) {
				values[ index ] = getDefaultDisplay( elem );
			}
		} else {
			if ( display !== "none" ) {
				values[ index ] = "none";

				// Remember what we're overwriting
				dataPriv.set( elem, "display", display );
			}
		}
	}

	// Set the display of the elements in a second loop to avoid constant reflow
	for ( index = 0; index < length; index++ ) {
		if ( values[ index ] != null ) {
			elements[ index ].style.display = values[ index ];
		}
	}

	return elements;
}

jQuery.fn.extend( {
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each( function() {
			if ( isHiddenWithinTree( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		} );
	}
} );
var rcheckableType = ( /^(?:checkbox|radio)$/i );

var rtagName = ( /<([a-z][^\/\0>\x20\t\r\n\f]+)/i );

var rscriptType = ( /^$|\/(?:java|ecma)script/i );



// We have to close these tags to support XHTML (#13200)
var wrapMap = {

	// Support: IE <=9 only
	option: [ 1, "<select multiple='multiple'>", "</select>" ],

	// XHTML parsers do not magically insert elements in the
	// same way that tag soup parsers do. So we cannot shorten
	// this by omitting <tbody> or other required elements.
	thead: [ 1, "<table>", "</table>" ],
	col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
	tr: [ 2, "<table><tbody>", "</tbody></table>" ],
	td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

	_default: [ 0, "", "" ]
};

// Support: IE <=9 only
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;


function getAll( context, tag ) {

	// Support: IE <=9 - 11 only
	// Use typeof to avoid zero-argument method invocation on host objects (#15151)
	var ret;

	if ( typeof context.getElementsByTagName !== "undefined" ) {
		ret = context.getElementsByTagName( tag || "*" );

	} else if ( typeof context.querySelectorAll !== "undefined" ) {
		ret = context.querySelectorAll( tag || "*" );

	} else {
		ret = [];
	}

	if ( tag === undefined || tag && nodeName( context, tag ) ) {
		return jQuery.merge( [ context ], ret );
	}

	return ret;
}


// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		dataPriv.set(
			elems[ i ],
			"globalEval",
			!refElements || dataPriv.get( refElements[ i ], "globalEval" )
		);
	}
}


var rhtml = /<|&#?\w+;/;

function buildFragment( elems, context, scripts, selection, ignored ) {
	var elem, tmp, tag, wrap, contains, j,
		fragment = context.createDocumentFragment(),
		nodes = [],
		i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		elem = elems[ i ];

		if ( elem || elem === 0 ) {

			// Add nodes directly
			if ( jQuery.type( elem ) === "object" ) {

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

			// Convert non-html into a text node
			} else if ( !rhtml.test( elem ) ) {
				nodes.push( context.createTextNode( elem ) );

			// Convert html into DOM nodes
			} else {
				tmp = tmp || fragment.appendChild( context.createElement( "div" ) );

				// Deserialize a standard representation
				tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
				wrap = wrapMap[ tag ] || wrapMap._default;
				tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

				// Descend through wrappers to the right content
				j = wrap[ 0 ];
				while ( j-- ) {
					tmp = tmp.lastChild;
				}

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, tmp.childNodes );

				// Remember the top-level container
				tmp = fragment.firstChild;

				// Ensure the created nodes are orphaned (#12392)
				tmp.textContent = "";
			}
		}
	}

	// Remove wrapper from fragment
	fragment.textContent = "";

	i = 0;
	while ( ( elem = nodes[ i++ ] ) ) {

		// Skip elements already in the context collection (trac-4087)
		if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
			if ( ignored ) {
				ignored.push( elem );
			}
			continue;
		}

		contains = jQuery.contains( elem.ownerDocument, elem );

		// Append to fragment
		tmp = getAll( fragment.appendChild( elem ), "script" );

		// Preserve script evaluation history
		if ( contains ) {
			setGlobalEval( tmp );
		}

		// Capture executables
		if ( scripts ) {
			j = 0;
			while ( ( elem = tmp[ j++ ] ) ) {
				if ( rscriptType.test( elem.type || "" ) ) {
					scripts.push( elem );
				}
			}
		}
	}

	return fragment;
}


( function() {
	var fragment = document.createDocumentFragment(),
		div = fragment.appendChild( document.createElement( "div" ) ),
		input = document.createElement( "input" );

	// Support: Android 4.0 - 4.3 only
	// Check state lost if the name is set (#11217)
	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Android <=4.1 only
	// Older WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE <=11 only
	// Make sure textarea (and checkbox) defaultValue is properly cloned
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;
} )();
var documentElement = document.documentElement;



var
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

// Support: IE <=9 only
// See #13393 for more info
function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

function on( elem, types, selector, data, fn, one ) {
	var origFn, type;

	// Types can be a map of types/handlers
	if ( typeof types === "object" ) {

		// ( types-Object, selector, data )
		if ( typeof selector !== "string" ) {

			// ( types-Object, data )
			data = data || selector;
			selector = undefined;
		}
		for ( type in types ) {
			on( elem, type, selector, data, types[ type ], one );
		}
		return elem;
	}

	if ( data == null && fn == null ) {

		// ( types, fn )
		fn = selector;
		data = selector = undefined;
	} else if ( fn == null ) {
		if ( typeof selector === "string" ) {

			// ( types, selector, fn )
			fn = data;
			data = undefined;
		} else {

			// ( types, data, fn )
			fn = data;
			data = selector;
			selector = undefined;
		}
	}
	if ( fn === false ) {
		fn = returnFalse;
	} else if ( !fn ) {
		return elem;
	}

	if ( one === 1 ) {
		origFn = fn;
		fn = function( event ) {

			// Can use an empty set, since event contains the info
			jQuery().off( event );
			return origFn.apply( this, arguments );
		};

		// Use same guid so caller can remove using origFn
		fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
	}
	return elem.each( function() {
		jQuery.event.add( this, types, fn, data, selector );
	} );
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {

		var handleObjIn, eventHandle, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.get( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Ensure that invalid selectors throw exceptions at attach time
		// Evaluate against documentElement in case elem is a non-element node (e.g., document)
		if ( selector ) {
			jQuery.find.matchesSelector( documentElement, selector );
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !( events = elemData.events ) ) {
			events = elemData.events = {};
		}
		if ( !( eventHandle = elemData.handle ) ) {
			eventHandle = elemData.handle = function( e ) {

				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ?
					jQuery.event.dispatch.apply( elem, arguments ) : undefined;
			};
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend( {
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join( "." )
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !( handlers = events[ type ] ) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener if the special events handler returns false
				if ( !special.setup ||
					special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {

		var j, origCount, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.hasData( elem ) && dataPriv.get( elem );

		if ( !elemData || !( events = elemData.events ) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[ 2 ] &&
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector ||
						selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown ||
					special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove data and the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			dataPriv.remove( elem, "handle events" );
		}
	},

	dispatch: function( nativeEvent ) {

		// Make a writable jQuery.Event from the native event object
		var event = jQuery.event.fix( nativeEvent );

		var i, j, ret, matched, handleObj, handlerQueue,
			args = new Array( arguments.length ),
			handlers = ( dataPriv.get( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[ 0 ] = event;

		for ( i = 1; i < arguments.length; i++ ) {
			args[ i ] = arguments[ i ];
		}

		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( ( handleObj = matched.handlers[ j++ ] ) &&
				!event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or 2) have namespace(s)
				// a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.rnamespace || event.rnamespace.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
						handleObj.handler ).apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( ( event.result = ret ) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, handleObj, sel, matchedHandlers, matchedSelectors,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		if ( delegateCount &&

			// Support: IE <=9
			// Black-hole SVG <use> instance trees (trac-13180)
			cur.nodeType &&

			// Support: Firefox <=42
			// Suppress spec-violating clicks indicating a non-primary pointer button (trac-3861)
			// https://www.w3.org/TR/DOM-Level-3-Events/#event-type-click
			// Support: IE 11 only
			// ...but not arrow key "clicks" of radio inputs, which can have `button` -1 (gh-2343)
			!( event.type === "click" && event.button >= 1 ) ) {

			for ( ; cur !== this; cur = cur.parentNode || this ) {

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && !( event.type === "click" && cur.disabled === true ) ) {
					matchedHandlers = [];
					matchedSelectors = {};
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matchedSelectors[ sel ] === undefined ) {
							matchedSelectors[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) > -1 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matchedSelectors[ sel ] ) {
							matchedHandlers.push( handleObj );
						}
					}
					if ( matchedHandlers.length ) {
						handlerQueue.push( { elem: cur, handlers: matchedHandlers } );
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		cur = this;
		if ( delegateCount < handlers.length ) {
			handlerQueue.push( { elem: cur, handlers: handlers.slice( delegateCount ) } );
		}

		return handlerQueue;
	},

	addProp: function( name, hook ) {
		Object.defineProperty( jQuery.Event.prototype, name, {
			enumerable: true,
			configurable: true,

			get: jQuery.isFunction( hook ) ?
				function() {
					if ( this.originalEvent ) {
							return hook( this.originalEvent );
					}
				} :
				function() {
					if ( this.originalEvent ) {
							return this.originalEvent[ name ];
					}
				},

			set: function( value ) {
				Object.defineProperty( this, name, {
					enumerable: true,
					configurable: true,
					writable: true,
					value: value
				} );
			}
		} );
	},

	fix: function( originalEvent ) {
		return originalEvent[ jQuery.expando ] ?
			originalEvent :
			new jQuery.Event( originalEvent );
	},

	special: {
		load: {

			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {

			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					this.focus();
					return false;
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {

			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( this.type === "checkbox" && this.click && nodeName( this, "input" ) ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	}
};

jQuery.removeEvent = function( elem, type, handle ) {

	// This "if" is needed for plain objects
	if ( elem.removeEventListener ) {
		elem.removeEventListener( type, handle );
	}
};

jQuery.Event = function( src, props ) {

	// Allow instantiation without the 'new' keyword
	if ( !( this instanceof jQuery.Event ) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&

				// Support: Android <=2.3 only
				src.returnValue === false ?
			returnTrue :
			returnFalse;

		// Create target properties
		// Support: Safari <=6 - 7 only
		// Target should not be a text node (#504, #13143)
		this.target = ( src.target && src.target.nodeType === 3 ) ?
			src.target.parentNode :
			src.target;

		this.currentTarget = src.currentTarget;
		this.relatedTarget = src.relatedTarget;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// https://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	constructor: jQuery.Event,
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,
	isSimulated: false,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;

		if ( e && !this.isSimulated ) {
			e.preventDefault();
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopPropagation();
		}
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Includes all common event props including KeyEvent and MouseEvent specific props
jQuery.each( {
	altKey: true,
	bubbles: true,
	cancelable: true,
	changedTouches: true,
	ctrlKey: true,
	detail: true,
	eventPhase: true,
	metaKey: true,
	pageX: true,
	pageY: true,
	shiftKey: true,
	view: true,
	"char": true,
	charCode: true,
	key: true,
	keyCode: true,
	button: true,
	buttons: true,
	clientX: true,
	clientY: true,
	offsetX: true,
	offsetY: true,
	pointerId: true,
	pointerType: true,
	screenX: true,
	screenY: true,
	targetTouches: true,
	toElement: true,
	touches: true,

	which: function( event ) {
		var button = event.button;

		// Add which for key events
		if ( event.which == null && rkeyEvent.test( event.type ) ) {
			return event.charCode != null ? event.charCode : event.keyCode;
		}

		// Add which for click: 1 === left; 2 === middle; 3 === right
		if ( !event.which && button !== undefined && rmouseEvent.test( event.type ) ) {
			if ( button & 1 ) {
				return 1;
			}

			if ( button & 2 ) {
				return 3;
			}

			if ( button & 4 ) {
				return 2;
			}

			return 0;
		}

		return event.which;
	}
}, jQuery.event.addProp );

// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://bugs.chromium.org/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
jQuery.each( {
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mouseenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
} );

jQuery.fn.extend( {

	on: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn );
	},
	one: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {

			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ?
					handleObj.origType + "." + handleObj.namespace :
					handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {

			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {

			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each( function() {
			jQuery.event.remove( this, types, fn, selector );
		} );
	}
} );


var

	/* eslint-disable max-len */

	// See https://github.com/eslint/eslint/issues/3229
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,

	/* eslint-enable */

	// Support: IE <=10 - 11, Edge 12 - 13
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,

	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

// Prefer a tbody over its parent table for containing new rows
function manipulationTarget( elem, content ) {
	if ( nodeName( elem, "table" ) &&
		nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ) {

		return jQuery( ">tbody", elem )[ 0 ] || elem;
	}

	return elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = ( elem.getAttribute( "type" ) !== null ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );

	if ( match ) {
		elem.type = match[ 1 ];
	} else {
		elem.removeAttribute( "type" );
	}

	return elem;
}

function cloneCopyEvent( src, dest ) {
	var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

	if ( dest.nodeType !== 1 ) {
		return;
	}

	// 1. Copy private data: events, handlers, etc.
	if ( dataPriv.hasData( src ) ) {
		pdataOld = dataPriv.access( src );
		pdataCur = dataPriv.set( dest, pdataOld );
		events = pdataOld.events;

		if ( events ) {
			delete pdataCur.handle;
			pdataCur.events = {};

			for ( type in events ) {
				for ( i = 0, l = events[ type ].length; i < l; i++ ) {
					jQuery.event.add( dest, type, events[ type ][ i ] );
				}
			}
		}
	}

	// 2. Copy user data
	if ( dataUser.hasData( src ) ) {
		udataOld = dataUser.access( src );
		udataCur = jQuery.extend( {}, udataOld );

		dataUser.set( dest, udataCur );
	}
}

// Fix IE bugs, see support tests
function fixInput( src, dest ) {
	var nodeName = dest.nodeName.toLowerCase();

	// Fails to persist the checked state of a cloned checkbox or radio button.
	if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		dest.checked = src.checked;

	// Fails to return the selected option to the default selected state when cloning options
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

function domManip( collection, args, callback, ignored ) {

	// Flatten any nested arrays
	args = concat.apply( [], args );

	var fragment, first, scripts, hasScripts, node, doc,
		i = 0,
		l = collection.length,
		iNoClone = l - 1,
		value = args[ 0 ],
		isFunction = jQuery.isFunction( value );

	// We can't cloneNode fragments that contain checked, in WebKit
	if ( isFunction ||
			( l > 1 && typeof value === "string" &&
				!support.checkClone && rchecked.test( value ) ) ) {
		return collection.each( function( index ) {
			var self = collection.eq( index );
			if ( isFunction ) {
				args[ 0 ] = value.call( this, index, self.html() );
			}
			domManip( self, args, callback, ignored );
		} );
	}

	if ( l ) {
		fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
		first = fragment.firstChild;

		if ( fragment.childNodes.length === 1 ) {
			fragment = first;
		}

		// Require either new content or an interest in ignored elements to invoke the callback
		if ( first || ignored ) {
			scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
			hasScripts = scripts.length;

			// Use the original fragment for the last item
			// instead of the first because it can end up
			// being emptied incorrectly in certain situations (#8070).
			for ( ; i < l; i++ ) {
				node = fragment;

				if ( i !== iNoClone ) {
					node = jQuery.clone( node, true, true );

					// Keep references to cloned scripts for later restoration
					if ( hasScripts ) {

						// Support: Android <=4.0 only, PhantomJS 1 only
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( scripts, getAll( node, "script" ) );
					}
				}

				callback.call( collection[ i ], node, i );
			}

			if ( hasScripts ) {
				doc = scripts[ scripts.length - 1 ].ownerDocument;

				// Reenable scripts
				jQuery.map( scripts, restoreScript );

				// Evaluate executable scripts on first document insertion
				for ( i = 0; i < hasScripts; i++ ) {
					node = scripts[ i ];
					if ( rscriptType.test( node.type || "" ) &&
						!dataPriv.access( node, "globalEval" ) &&
						jQuery.contains( doc, node ) ) {

						if ( node.src ) {

							// Optional AJAX dependency, but won't run scripts if not present
							if ( jQuery._evalUrl ) {
								jQuery._evalUrl( node.src );
							}
						} else {
							DOMEval( node.textContent.replace( rcleanScript, "" ), doc );
						}
					}
				}
			}
		}
	}

	return collection;
}

function remove( elem, selector, keepData ) {
	var node,
		nodes = selector ? jQuery.filter( selector, elem ) : elem,
		i = 0;

	for ( ; ( node = nodes[ i ] ) != null; i++ ) {
		if ( !keepData && node.nodeType === 1 ) {
			jQuery.cleanData( getAll( node ) );
		}

		if ( node.parentNode ) {
			if ( keepData && jQuery.contains( node.ownerDocument, node ) ) {
				setGlobalEval( getAll( node, "script" ) );
			}
			node.parentNode.removeChild( node );
		}
	}

	return elem;
}

jQuery.extend( {
	htmlPrefilter: function( html ) {
		return html.replace( rxhtmlTag, "<$1></$2>" );
	},

	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var i, l, srcElements, destElements,
			clone = elem.cloneNode( true ),
			inPage = jQuery.contains( elem.ownerDocument, elem );

		// Fix IE cloning issues
		if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
				!jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: https://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			for ( i = 0, l = srcElements.length; i < l; i++ ) {
				fixInput( srcElements[ i ], destElements[ i ] );
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					cloneCopyEvent( srcElements[ i ], destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		// Return the cloned set
		return clone;
	},

	cleanData: function( elems ) {
		var data, elem, type,
			special = jQuery.event.special,
			i = 0;

		for ( ; ( elem = elems[ i ] ) !== undefined; i++ ) {
			if ( acceptData( elem ) ) {
				if ( ( data = elem[ dataPriv.expando ] ) ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataPriv.expando ] = undefined;
				}
				if ( elem[ dataUser.expando ] ) {

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataUser.expando ] = undefined;
				}
			}
		}
	}
} );

jQuery.fn.extend( {
	detach: function( selector ) {
		return remove( this, selector, true );
	},

	remove: function( selector ) {
		return remove( this, selector );
	},

	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().each( function() {
					if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
						this.textContent = value;
					}
				} );
		}, null, value, arguments.length );
	},

	append: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		} );
	},

	prepend: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		} );
	},

	before: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		} );
	},

	after: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		} );
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; ( elem = this[ i ] ) != null; i++ ) {
			if ( elem.nodeType === 1 ) {

				// Prevent memory leaks
				jQuery.cleanData( getAll( elem, false ) );

				// Remove any remaining nodes
				elem.textContent = "";
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		} );
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined && elem.nodeType === 1 ) {
				return elem.innerHTML;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = jQuery.htmlPrefilter( value );

				try {
					for ( ; i < l; i++ ) {
						elem = this[ i ] || {};

						// Remove element nodes and prevent memory leaks
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch ( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var ignored = [];

		// Make the changes, replacing each non-ignored context element with the new content
		return domManip( this, arguments, function( elem ) {
			var parent = this.parentNode;

			if ( jQuery.inArray( this, ignored ) < 0 ) {
				jQuery.cleanData( getAll( this ) );
				if ( parent ) {
					parent.replaceChild( elem, this );
				}
			}

		// Force callback invocation
		}, ignored );
	}
} );

jQuery.each( {
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1,
			i = 0;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Support: Android <=4.0 only, PhantomJS 1 only
			// .get() because push.apply(_, arraylike) throws on ancient WebKit
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
} );
var rmargin = ( /^margin/ );

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var getStyles = function( elem ) {

		// Support: IE <=11 only, Firefox <=30 (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if ( !view || !view.opener ) {
			view = window;
		}

		return view.getComputedStyle( elem );
	};



( function() {

	// Executing both pixelPosition & boxSizingReliable tests require only one layout
	// so they're executed at the same time to save the second computation.
	function computeStyleTests() {

		// This is a singleton, we need to execute it only once
		if ( !div ) {
			return;
		}

		div.style.cssText =
			"box-sizing:border-box;" +
			"position:relative;display:block;" +
			"margin:auto;border:1px;padding:1px;" +
			"top:1%;width:50%";
		div.innerHTML = "";
		documentElement.appendChild( container );

		var divStyle = window.getComputedStyle( div );
		pixelPositionVal = divStyle.top !== "1%";

		// Support: Android 4.0 - 4.3 only, Firefox <=3 - 44
		reliableMarginLeftVal = divStyle.marginLeft === "2px";
		boxSizingReliableVal = divStyle.width === "4px";

		// Support: Android 4.0 - 4.3 only
		// Some styles come back with percentage values, even though they shouldn't
		div.style.marginRight = "50%";
		pixelMarginRightVal = divStyle.marginRight === "4px";

		documentElement.removeChild( container );

		// Nullify the div so it wouldn't be stored in the memory and
		// it will also be a sign that checks already performed
		div = null;
	}

	var pixelPositionVal, boxSizingReliableVal, pixelMarginRightVal, reliableMarginLeftVal,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	// Finish early in limited (non-browser) environments
	if ( !div.style ) {
		return;
	}

	// Support: IE <=9 - 11 only
	// Style of cloned element affects source element cloned (#8908)
	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	container.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;" +
		"padding:0;margin-top:1px;position:absolute";
	container.appendChild( div );

	jQuery.extend( support, {
		pixelPosition: function() {
			computeStyleTests();
			return pixelPositionVal;
		},
		boxSizingReliable: function() {
			computeStyleTests();
			return boxSizingReliableVal;
		},
		pixelMarginRight: function() {
			computeStyleTests();
			return pixelMarginRightVal;
		},
		reliableMarginLeft: function() {
			computeStyleTests();
			return reliableMarginLeftVal;
		}
	} );
} )();


function curCSS( elem, name, computed ) {
	var width, minWidth, maxWidth, ret,

		// Support: Firefox 51+
		// Retrieving style before computed somehow
		// fixes an issue with getting wrong values
		// on detached elements
		style = elem.style;

	computed = computed || getStyles( elem );

	// getPropertyValue is needed for:
	//   .css('filter') (IE 9 only, #12537)
	//   .css('--customProperty) (#3144)
	if ( computed ) {
		ret = computed.getPropertyValue( name ) || computed[ name ];

		if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}

		// A tribute to the "awesome hack by Dean Edwards"
		// Android Browser returns percentage for some values,
		// but width seems to be reliably pixels.
		// This is against the CSSOM draft spec:
		// https://drafts.csswg.org/cssom/#resolved-values
		if ( !support.pixelMarginRight() && rnumnonpx.test( ret ) && rmargin.test( name ) ) {

			// Remember the original values
			width = style.width;
			minWidth = style.minWidth;
			maxWidth = style.maxWidth;

			// Put in the new values to get a computed value out
			style.minWidth = style.maxWidth = style.width = ret;
			ret = computed.width;

			// Revert the changed values
			style.width = width;
			style.minWidth = minWidth;
			style.maxWidth = maxWidth;
		}
	}

	return ret !== undefined ?

		// Support: IE <=9 - 11 only
		// IE returns zIndex value as an integer.
		ret + "" :
		ret;
}


function addGetHookIf( conditionFn, hookFn ) {

	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {

				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return ( this.get = hookFn ).apply( this, arguments );
		}
	};
}


var

	// Swappable if display is none or starts with table
	// except "table", "table-cell", or "table-caption"
	// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rcustomProp = /^--/,
	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "Moz", "ms" ],
	emptyStyle = document.createElement( "div" ).style;

// Return a css property mapped to a potentially vendor prefixed property
function vendorPropName( name ) {

	// Shortcut for names that are not vendor prefixed
	if ( name in emptyStyle ) {
		return name;
	}

	// Check for vendor prefixed names
	var capName = name[ 0 ].toUpperCase() + name.slice( 1 ),
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in emptyStyle ) {
			return name;
		}
	}
}

// Return a property mapped along what jQuery.cssProps suggests or to
// a vendor prefixed property.
function finalPropName( name ) {
	var ret = jQuery.cssProps[ name ];
	if ( !ret ) {
		ret = jQuery.cssProps[ name ] = vendorPropName( name ) || name;
	}
	return ret;
}

function setPositiveNumber( elem, value, subtract ) {

	// Any relative (+/-) values have already been
	// normalized at this point
	var matches = rcssNum.exec( value );
	return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 2 ] - ( subtract || 0 ) ) + ( matches[ 3 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i,
		val = 0;

	// If we already have the right measurement, avoid augmentation
	if ( extra === ( isBorderBox ? "border" : "content" ) ) {
		i = 4;

	// Otherwise initialize for horizontal or vertical properties
	} else {
		i = name === "width" ? 1 : 0;
	}

	for ( ; i < 4; i += 2 ) {

		// Both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {

			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// At this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {

			// At this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// At this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with computed style
	var valueIsBorderBox,
		styles = getStyles( elem ),
		val = curCSS( elem, name, styles ),
		isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// Computed unit is not pixels. Stop here and return.
	if ( rnumnonpx.test( val ) ) {
		return val;
	}

	// Check for style in case a browser which returns unreliable values
	// for getComputedStyle silently falls back to the reliable elem.style
	valueIsBorderBox = isBorderBox &&
		( support.boxSizingReliable() || val === elem.style[ name ] );

	// Fall back to offsetWidth/Height when value is "auto"
	// This happens for inline elements with no explicit setting (gh-3571)
	if ( val === "auto" ) {
		val = elem[ "offset" + name[ 0 ].toUpperCase() + name.slice( 1 ) ];
	}

	// Normalize "", auto, and prepare for extra
	val = parseFloat( val ) || 0;

	// Use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

jQuery.extend( {

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"animationIterationCount": true,
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		"float": "cssFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			isCustomProp = rcustomProp.test( name ),
			style = elem.style;

		// Make sure that we're working with the right name. We don't
		// want to query the value if it is a CSS custom property
		// since they are user-defined.
		if ( !isCustomProp ) {
			name = finalPropName( origName );
		}

		// Gets hook for the prefixed version, then unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
				value = adjustCSS( elem, name, ret );

				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set (#7116)
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add the unit (except for certain CSS properties)
			if ( type === "number" ) {
				value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
			}

			// background-* props affect original clone's values
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !( "set" in hooks ) ||
				( value = hooks.set( elem, value, extra ) ) !== undefined ) {

				if ( isCustomProp ) {
					style.setProperty( name, value );
				} else {
					style[ name ] = value;
				}
			}

		} else {

			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks &&
				( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var val, num, hooks,
			origName = jQuery.camelCase( name ),
			isCustomProp = rcustomProp.test( name );

		// Make sure that we're working with the right name. We don't
		// want to modify the value if it is a CSS custom property
		// since they are user-defined.
		if ( !isCustomProp ) {
			name = finalPropName( origName );
		}

		// Try prefixed name followed by the unprefixed name
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		// Convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Make numeric if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || isFinite( num ) ? num || 0 : val;
		}

		return val;
	}
} );

jQuery.each( [ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// Certain elements can have dimension info if we invisibly show them
				// but it must have a current display style that would benefit
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&

					// Support: Safari 8+
					// Table columns in Safari have non-zero offsetWidth & zero
					// getBoundingClientRect().width unless display is changed.
					// Support: IE <=11 only
					// Running getBoundingClientRect on a disconnected node
					// in IE throws an error.
					( !elem.getClientRects().length || !elem.getBoundingClientRect().width ) ?
						swap( elem, cssShow, function() {
							return getWidthOrHeight( elem, name, extra );
						} ) :
						getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var matches,
				styles = extra && getStyles( elem ),
				subtract = extra && augmentWidthOrHeight(
					elem,
					name,
					extra,
					jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				);

			// Convert to pixels if value adjustment is needed
			if ( subtract && ( matches = rcssNum.exec( value ) ) &&
				( matches[ 3 ] || "px" ) !== "px" ) {

				elem.style[ name ] = value;
				value = jQuery.css( elem, name );
			}

			return setPositiveNumber( elem, value, subtract );
		}
	};
} );

jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
	function( elem, computed ) {
		if ( computed ) {
			return ( parseFloat( curCSS( elem, "marginLeft" ) ) ||
				elem.getBoundingClientRect().left -
					swap( elem, { marginLeft: 0 }, function() {
						return elem.getBoundingClientRect().left;
					} )
				) + "px";
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each( {
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// Assumes a single number if not a string
				parts = typeof value === "string" ? value.split( " " ) : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
} );

jQuery.fn.extend( {
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( Array.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	}
} );


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || jQuery.easing._default;
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			// Use a property on the element directly when it is not a DOM element,
			// or when there is no matching style property that exists.
			if ( tween.elem.nodeType !== 1 ||
				tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
				return tween.elem[ tween.prop ];
			}

			// Passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails.
			// Simple values such as "10px" are parsed to Float;
			// complex values such as "rotate(1rad)" are returned as-is.
			result = jQuery.css( tween.elem, tween.prop, "" );

			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {

			// Use step hook for back compat.
			// Use cssHook if its there.
			// Use .style if available and use plain properties where available.
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.nodeType === 1 &&
				( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null ||
					jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9 only
// Panic based approach to setting things on disconnected nodes
Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	},
	_default: "swing"
};

jQuery.fx = Tween.prototype.init;

// Back compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, inProgress,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rrun = /queueHooks$/;

function schedule() {
	if ( inProgress ) {
		if ( document.hidden === false && window.requestAnimationFrame ) {
			window.requestAnimationFrame( schedule );
		} else {
			window.setTimeout( schedule, jQuery.fx.interval );
		}

		jQuery.fx.tick();
	}
}

// Animations created synchronously will run synchronously
function createFxNow() {
	window.setTimeout( function() {
		fxNow = undefined;
	} );
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		i = 0,
		attrs = { height: type };

	// If we include width, step value is 1 to do all cssExpand values,
	// otherwise step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

			// We're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	var prop, value, toggle, hooks, oldfire, propTween, restoreDisplay, display,
		isBox = "width" in props || "height" in props,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHiddenWithinTree( elem ),
		dataShow = dataPriv.get( elem, "fxshow" );

	// Queue-skipping animations hijack the fx hooks
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always( function() {

			// Ensure the complete handler is called before this completes
			anim.always( function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			} );
		} );
	}

	// Detect show/hide animations
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.test( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// Pretend to be hidden if this is a "show" and
				// there is still data from a stopped show/hide
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;

				// Ignore all other no-op show/hide data
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );
		}
	}

	// Bail out if this is a no-op like .hide().hide()
	propTween = !jQuery.isEmptyObject( props );
	if ( !propTween && jQuery.isEmptyObject( orig ) ) {
		return;
	}

	// Restrict "overflow" and "display" styles during box animations
	if ( isBox && elem.nodeType === 1 ) {

		// Support: IE <=9 - 11, Edge 12 - 13
		// Record all 3 overflow attributes because IE does not infer the shorthand
		// from identically-valued overflowX and overflowY
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Identify a display type, preferring old show/hide data over the CSS cascade
		restoreDisplay = dataShow && dataShow.display;
		if ( restoreDisplay == null ) {
			restoreDisplay = dataPriv.get( elem, "display" );
		}
		display = jQuery.css( elem, "display" );
		if ( display === "none" ) {
			if ( restoreDisplay ) {
				display = restoreDisplay;
			} else {

				// Get nonempty value(s) by temporarily forcing visibility
				showHide( [ elem ], true );
				restoreDisplay = elem.style.display || restoreDisplay;
				display = jQuery.css( elem, "display" );
				showHide( [ elem ] );
			}
		}

		// Animate inline elements as inline-block
		if ( display === "inline" || display === "inline-block" && restoreDisplay != null ) {
			if ( jQuery.css( elem, "float" ) === "none" ) {

				// Restore the original display value at the end of pure show/hide animations
				if ( !propTween ) {
					anim.done( function() {
						style.display = restoreDisplay;
					} );
					if ( restoreDisplay == null ) {
						display = style.display;
						restoreDisplay = display === "none" ? "" : display;
					}
				}
				style.display = "inline-block";
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		anim.always( function() {
			style.overflow = opts.overflow[ 0 ];
			style.overflowX = opts.overflow[ 1 ];
			style.overflowY = opts.overflow[ 2 ];
		} );
	}

	// Implement show/hide animations
	propTween = false;
	for ( prop in orig ) {

		// General show/hide setup for this element animation
		if ( !propTween ) {
			if ( dataShow ) {
				if ( "hidden" in dataShow ) {
					hidden = dataShow.hidden;
				}
			} else {
				dataShow = dataPriv.access( elem, "fxshow", { display: restoreDisplay } );
			}

			// Store hidden/visible for toggle so `.stop().toggle()` "reverses"
			if ( toggle ) {
				dataShow.hidden = !hidden;
			}

			// Show elements before animating them
			if ( hidden ) {
				showHide( [ elem ], true );
			}

			/* eslint-disable no-loop-func */

			anim.done( function() {

			/* eslint-enable no-loop-func */

				// The final step of a "hide" animation is actually hiding the element
				if ( !hidden ) {
					showHide( [ elem ] );
				}
				dataPriv.remove( elem, "fxshow" );
				for ( prop in orig ) {
					jQuery.style( elem, prop, orig[ prop ] );
				}
			} );
		}

		// Per-property setup
		propTween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );
		if ( !( prop in dataShow ) ) {
			dataShow[ prop ] = propTween.start;
			if ( hidden ) {
				propTween.end = propTween.start;
				propTween.start = 0;
			}
		}
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( Array.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// Not quite $.extend, this won't overwrite existing keys.
			// Reusing 'index' because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = Animation.prefilters.length,
		deferred = jQuery.Deferred().always( function() {

			// Don't match elem in the :animated selector
			delete tick.elem;
		} ),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

				// Support: Android 2.3 only
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ] );

			// If there's more to do, yield
			if ( percent < 1 && length ) {
				return remaining;
			}

			// If this was an empty animation, synthesize a final progress notification
			if ( !length ) {
				deferred.notifyWith( elem, [ animation, 1, 0 ] );
			}

			// Resolve the animation and report its conclusion
			deferred.resolveWith( elem, [ animation ] );
			return false;
		},
		animation = deferred.promise( {
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, {
				specialEasing: {},
				easing: jQuery.easing._default
			}, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,

					// If we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// Resolve when we played the last frame; otherwise, reject
				if ( gotoEnd ) {
					deferred.notifyWith( elem, [ animation, 1, 0 ] );
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		} ),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length; index++ ) {
		result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			if ( jQuery.isFunction( result.stop ) ) {
				jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
					jQuery.proxy( result.stop, result );
			}
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	// Attach callbacks from options
	animation
		.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		} )
	);

	return animation;
}

jQuery.Animation = jQuery.extend( Animation, {

	tweeners: {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value );
			adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
			return tween;
		} ]
	},

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.match( rnothtmlwhite );
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length; index++ ) {
			prop = props[ index ];
			Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
			Animation.tweeners[ prop ].unshift( callback );
		}
	},

	prefilters: [ defaultPrefilter ],

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			Animation.prefilters.unshift( callback );
		} else {
			Animation.prefilters.push( callback );
		}
	}
} );

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	// Go to the end state if fx are off
	if ( jQuery.fx.off ) {
		opt.duration = 0;

	} else {
		if ( typeof opt.duration !== "number" ) {
			if ( opt.duration in jQuery.fx.speeds ) {
				opt.duration = jQuery.fx.speeds[ opt.duration ];

			} else {
				opt.duration = jQuery.fx.speeds._default;
			}
		}
	}

	// Normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend( {
	fadeTo: function( speed, to, easing, callback ) {

		// Show any hidden elements after setting opacity to 0
		return this.filter( isHiddenWithinTree ).css( "opacity", 0 ).show()

			// Animate to the value specified
			.end().animate( { opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || dataPriv.get( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each( function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = dataPriv.get( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this &&
					( type == null || timers[ index ].queue === type ) ) {

					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// Start the next in the queue if the last step wasn't forced.
			// Timers currently will call their complete callbacks, which
			// will dequeue but only if they were gotoEnd.
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		} );
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each( function() {
			var index,
				data = dataPriv.get( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// Enable finishing flag on private data
			data.finish = true;

			// Empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// Look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// Look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// Turn off finishing flag
			delete data.finish;
		} );
	}
} );

jQuery.each( [ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
} );

// Generate shortcuts for custom animations
jQuery.each( {
	slideDown: genFx( "show" ),
	slideUp: genFx( "hide" ),
	slideToggle: genFx( "toggle" ),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
} );

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		i = 0,
		timers = jQuery.timers;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];

		// Run the timer and safely remove it when done (allowing for external removal)
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	jQuery.fx.start();
};

jQuery.fx.interval = 13;
jQuery.fx.start = function() {
	if ( inProgress ) {
		return;
	}

	inProgress = true;
	schedule();
};

jQuery.fx.stop = function() {
	inProgress = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,

	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// https://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = window.setTimeout( next, time );
		hooks.stop = function() {
			window.clearTimeout( timeout );
		};
	} );
};


( function() {
	var input = document.createElement( "input" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	input.type = "checkbox";

	// Support: Android <=4.3 only
	// Default value for a checkbox should be "on"
	support.checkOn = input.value !== "";

	// Support: IE <=11 only
	// Must access selectedIndex to make default options select
	support.optSelected = opt.selected;

	// Support: IE <=11 only
	// An input loses its value after becoming a radio
	input = document.createElement( "input" );
	input.value = "t";
	input.type = "radio";
	support.radioValue = input.value === "t";
} )();


var boolHook,
	attrHandle = jQuery.expr.attrHandle;

jQuery.fn.extend( {
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each( function() {
			jQuery.removeAttr( this, name );
		} );
	}
} );

jQuery.extend( {
	attr: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set attributes on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		// Attribute hooks are determined by the lowercase version
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			hooks = jQuery.attrHooks[ name.toLowerCase() ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : undefined );
		}

		if ( value !== undefined ) {
			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;
			}

			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			elem.setAttribute( name, value + "" );
			return value;
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		ret = jQuery.find.attr( elem, name );

		// Non-existent attributes return null, we normalize to undefined
		return ret == null ? undefined : ret;
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					nodeName( elem, "input" ) ) {
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	removeAttr: function( elem, value ) {
		var name,
			i = 0,

			// Attribute names can contain non-HTML whitespace characters
			// https://html.spec.whatwg.org/multipage/syntax.html#attributes-2
			attrNames = value && value.match( rnothtmlwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( ( name = attrNames[ i++ ] ) ) {
				elem.removeAttribute( name );
			}
		}
	}
} );

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {

			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else {
			elem.setAttribute( name, name );
		}
		return name;
	}
};

jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = function( elem, name, isXML ) {
		var ret, handle,
			lowercaseName = name.toLowerCase();

		if ( !isXML ) {

			// Avoid an infinite loop by temporarily removing this function from the getter
			handle = attrHandle[ lowercaseName ];
			attrHandle[ lowercaseName ] = ret;
			ret = getter( elem, name, isXML ) != null ?
				lowercaseName :
				null;
			attrHandle[ lowercaseName ] = handle;
		}
		return ret;
	};
} );




var rfocusable = /^(?:input|select|textarea|button)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend( {
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		return this.each( function() {
			delete this[ jQuery.propFix[ name ] || name ];
		} );
	}
} );

jQuery.extend( {
	prop: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			return ( elem[ name ] = value );
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		return elem[ name ];
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {

				// Support: IE <=9 - 11 only
				// elem.tabIndex doesn't always return the
				// correct value when it hasn't been explicitly set
				// https://web.archive.org/web/20141116233347/http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				if ( tabindex ) {
					return parseInt( tabindex, 10 );
				}

				if (
					rfocusable.test( elem.nodeName ) ||
					rclickable.test( elem.nodeName ) &&
					elem.href
				) {
					return 0;
				}

				return -1;
			}
		}
	},

	propFix: {
		"for": "htmlFor",
		"class": "className"
	}
} );

// Support: IE <=11 only
// Accessing the selectedIndex property
// forces the browser to respect setting selected
// on the option
// The getter ensures a default option is selected
// when in an optgroup
// eslint rule "no-unused-expressions" is disabled for this code
// since it considers such accessions noop
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {

			/* eslint no-unused-expressions: "off" */

			var parent = elem.parentNode;
			if ( parent && parent.parentNode ) {
				parent.parentNode.selectedIndex;
			}
			return null;
		},
		set: function( elem ) {

			/* eslint no-unused-expressions: "off" */

			var parent = elem.parentNode;
			if ( parent ) {
				parent.selectedIndex;

				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
		}
	};
}

jQuery.each( [
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
} );




	// Strip and collapse whitespace according to HTML spec
	// https://html.spec.whatwg.org/multipage/infrastructure.html#strip-and-collapse-whitespace
	function stripAndCollapse( value ) {
		var tokens = value.match( rnothtmlwhite ) || [];
		return tokens.join( " " );
	}


function getClass( elem ) {
	return elem.getAttribute && elem.getAttribute( "class" ) || "";
}

jQuery.fn.extend( {
	addClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnothtmlwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );
				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( !arguments.length ) {
			return this.attr( "class", "" );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnothtmlwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );

				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {

						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( i ) {
				jQuery( this ).toggleClass(
					value.call( this, i, getClass( this ), stateVal ),
					stateVal
				);
			} );
		}

		return this.each( function() {
			var className, i, self, classNames;

			if ( type === "string" ) {

				// Toggle individual class names
				i = 0;
				self = jQuery( this );
				classNames = value.match( rnothtmlwhite ) || [];

				while ( ( className = classNames[ i++ ] ) ) {

					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( value === undefined || type === "boolean" ) {
				className = getClass( this );
				if ( className ) {

					// Store className if set
					dataPriv.set( this, "__className__", className );
				}

				// If the element has a class name or if we're passed `false`,
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				if ( this.setAttribute ) {
					this.setAttribute( "class",
						className || value === false ?
						"" :
						dataPriv.get( this, "__className__" ) || ""
					);
				}
			}
		} );
	},

	hasClass: function( selector ) {
		var className, elem,
			i = 0;

		className = " " + selector + " ";
		while ( ( elem = this[ i++ ] ) ) {
			if ( elem.nodeType === 1 &&
				( " " + stripAndCollapse( getClass( elem ) ) + " " ).indexOf( className ) > -1 ) {
					return true;
			}
		}

		return false;
	}
} );




var rreturn = /\r/g;

jQuery.fn.extend( {
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[ 0 ];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] ||
					jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks &&
					"get" in hooks &&
					( ret = hooks.get( elem, "value" ) ) !== undefined
				) {
					return ret;
				}

				ret = elem.value;

				// Handle most common string cases
				if ( typeof ret === "string" ) {
					return ret.replace( rreturn, "" );
				}

				// Handle cases where value is null/undef or number
				return ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each( function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";

			} else if ( typeof val === "number" ) {
				val += "";

			} else if ( Array.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				} );
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		} );
	}
} );

jQuery.extend( {
	valHooks: {
		option: {
			get: function( elem ) {

				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :

					// Support: IE <=10 - 11 only
					// option.text throws exceptions (#14686, #14858)
					// Strip and collapse whitespace
					// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
					stripAndCollapse( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option, i,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one",
					values = one ? null : [],
					max = one ? index + 1 : options.length;

				if ( index < 0 ) {
					i = max;

				} else {
					i = one ? index : 0;
				}

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// Support: IE <=9 only
					// IE8-9 doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&

							// Don't return options that are disabled or in a disabled optgroup
							!option.disabled &&
							( !option.parentNode.disabled ||
								!nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					/* eslint-disable no-cond-assign */

					if ( option.selected =
						jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1
					) {
						optionSet = true;
					}

					/* eslint-enable no-cond-assign */
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	}
} );

// Radios and checkboxes getter/setter
jQuery.each( [ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( Array.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute( "value" ) === null ? "on" : elem.value;
		};
	}
} );




// Return jQuery for attributes-only inclusion


var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/;

jQuery.extend( jQuery.event, {

	trigger: function( event, data, elem, onlyHandlers ) {

		var i, cur, tmp, bubbleType, ontype, handle, special,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "." ) > -1 ) {

			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split( "." );
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf( ":" ) < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join( "." );
		event.rnamespace = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === ( elem.ownerDocument || document ) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( dataPriv.get( cur, "events" ) || {} )[ event.type ] &&
				dataPriv.get( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( ( !special._default ||
				special._default.apply( eventPath.pop(), data ) === false ) &&
				acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name as the event.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && jQuery.isFunction( elem[ type ] ) && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					elem[ type ]();
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	// Piggyback on a donor event to simulate a different one
	// Used only for `focus(in | out)` events
	simulate: function( type, elem, event ) {
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true
			}
		);

		jQuery.event.trigger( e, null, elem );
	}

} );

jQuery.fn.extend( {

	trigger: function( type, data ) {
		return this.each( function() {
			jQuery.event.trigger( type, data, this );
		} );
	},
	triggerHandler: function( type, data ) {
		var elem = this[ 0 ];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
} );


jQuery.each( ( "blur focus focusin focusout resize scroll click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup contextmenu" ).split( " " ),
	function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
} );

jQuery.fn.extend( {
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
} );




support.focusin = "onfocusin" in window;


// Support: Firefox <=44
// Firefox doesn't have focus(in | out) events
// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
//
// Support: Chrome <=48 - 49, Safari <=9.0 - 9.1
// focus(in | out) events fire after focus & blur events,
// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
// Related ticket - https://bugs.chromium.org/p/chromium/issues/detail?id=449857
if ( !support.focusin ) {
	jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
			jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
		};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = dataPriv.access( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				dataPriv.access( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = dataPriv.access( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					dataPriv.remove( doc, fix );

				} else {
					dataPriv.access( doc, fix, attaches );
				}
			}
		};
	} );
}
var location = window.location;

var nonce = jQuery.now();

var rquery = ( /\?/ );



// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml;
	if ( !data || typeof data !== "string" ) {
		return null;
	}

	// Support: IE 9 - 11 only
	// IE throws on parseFromString with invalid input.
	try {
		xml = ( new window.DOMParser() ).parseFromString( data, "text/xml" );
	} catch ( e ) {
		xml = undefined;
	}

	if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( Array.isArray( obj ) ) {

		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {

				// Treat each array item as a scalar.
				add( prefix, v );

			} else {

				// Item is non-scalar (array or object), encode its numeric index.
				buildParams(
					prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
					v,
					traditional,
					add
				);
			}
		} );

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {

		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {

		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, valueOrFunction ) {

			// If value is a function, invoke it and use its return value
			var value = jQuery.isFunction( valueOrFunction ) ?
				valueOrFunction() :
				valueOrFunction;

			s[ s.length ] = encodeURIComponent( key ) + "=" +
				encodeURIComponent( value == null ? "" : value );
		};

	// If an array was passed in, assume that it is an array of form elements.
	if ( Array.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		} );

	} else {

		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" );
};

jQuery.fn.extend( {
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map( function() {

			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		} )
		.filter( function() {
			var type = this.type;

			// Use .is( ":disabled" ) so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		} )
		.map( function( i, elem ) {
			var val = jQuery( this ).val();

			if ( val == null ) {
				return null;
			}

			if ( Array.isArray( val ) ) {
				return jQuery.map( val, function( val ) {
					return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
				} );
			}

			return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		} ).get();
	}
} );


var
	r20 = /%20/g,
	rhash = /#.*$/,
	rantiCache = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,

	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Anchor tag for parsing the document origin
	originAnchor = document.createElement( "a" );
	originAnchor.href = location.href;

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnothtmlwhite ) || [];

		if ( jQuery.isFunction( func ) ) {

			// For each dataType in the dataTypeExpression
			while ( ( dataType = dataTypes[ i++ ] ) ) {

				// Prepend if requested
				if ( dataType[ 0 ] === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

				// Otherwise append
				} else {
					( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" &&
				!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		} );
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var key, deep,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {

	var ct, type, finalDataType, firstDataType,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {

		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}

		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},

		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {

								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s.throws ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return {
								state: "parsererror",
								error: conv ? e : "No conversion from " + prev + " to " + current
							};
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend( {

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: location.href,
		type: "GET",
		isLocal: rlocalProtocol.test( location.protocol ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",

		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /\bxml\b/,
			html: /\bhtml/,
			json: /\bjson\b/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": JSON.parse,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var transport,

			// URL without anti-cache param
			cacheURL,

			// Response headers
			responseHeadersString,
			responseHeaders,

			// timeout handle
			timeoutTimer,

			// Url cleanup var
			urlAnchor,

			// Request state (becomes false upon send and true upon completion)
			completed,

			// To know if global events are to be dispatched
			fireGlobals,

			// Loop variable
			i,

			// uncached part of the url
			uncached,

			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),

			// Callbacks context
			callbackContext = s.context || s,

			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context &&
				( callbackContext.nodeType || callbackContext.jquery ) ?
					jQuery( callbackContext ) :
					jQuery.event,

			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks( "once memory" ),

			// Status-dependent callbacks
			statusCode = s.statusCode || {},

			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},

			// Default abort message
			strAbort = "canceled",

			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( completed ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[ 1 ].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return completed ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					if ( completed == null ) {
						name = requestHeadersNames[ name.toLowerCase() ] =
							requestHeadersNames[ name.toLowerCase() ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( completed == null ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( completed ) {

							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						} else {

							// Lazy-add the new callbacks in a way that preserves old ones
							for ( code in map ) {
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR );

		// Add protocol if not provided (prefilters might expect it)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || location.href ) + "" )
			.replace( rprotocol, location.protocol + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = ( s.dataType || "*" ).toLowerCase().match( rnothtmlwhite ) || [ "" ];

		// A cross-domain request is in order when the origin doesn't match the current origin.
		if ( s.crossDomain == null ) {
			urlAnchor = document.createElement( "a" );

			// Support: IE <=8 - 11, Edge 12 - 13
			// IE throws exception on accessing the href property if url is malformed,
			// e.g. http://example.com:80x/
			try {
				urlAnchor.href = s.url;

				// Support: IE <=8 - 11 only
				// Anchor's host property isn't correctly set when s.url is relative
				urlAnchor.href = urlAnchor.href;
				s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !==
					urlAnchor.protocol + "//" + urlAnchor.host;
			} catch ( e ) {

				// If there is an error parsing the URL, assume it is crossDomain,
				// it can be rejected by the transport if it is invalid
				s.crossDomain = true;
			}
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( completed ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		// Remove hash to simplify url manipulation
		cacheURL = s.url.replace( rhash, "" );

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// Remember the hash so we can put it back
			uncached = s.url.slice( cacheURL.length );

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data;

				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add or update anti-cache param if needed
			if ( s.cache === false ) {
				cacheURL = cacheURL.replace( rantiCache, "$1" );
				uncached = ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + ( nonce++ ) + uncached;
			}

			// Put hash and anti-cache on the URL that will be requested (gh-1732)
			s.url = cacheURL + uncached;

		// Change '%20' to '+' if this is encoded form body content (gh-2658)
		} else if ( s.data && s.processData &&
			( s.contentType || "" ).indexOf( "application/x-www-form-urlencoded" ) === 0 ) {
			s.data = s.data.replace( r20, "+" );
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
				s.accepts[ s.dataTypes[ 0 ] ] +
					( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend &&
			( s.beforeSend.call( callbackContext, jqXHR, s ) === false || completed ) ) {

			// Abort if not done already and return
			return jqXHR.abort();
		}

		// Aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		completeDeferred.add( s.complete );
		jqXHR.done( s.success );
		jqXHR.fail( s.error );

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}

			// If request was aborted inside ajaxSend, stop there
			if ( completed ) {
				return jqXHR;
			}

			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = window.setTimeout( function() {
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				completed = false;
				transport.send( requestHeaders, done );
			} catch ( e ) {

				// Rethrow post-completion exceptions
				if ( completed ) {
					throw e;
				}

				// Propagate others as results
				done( -1, e );
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Ignore repeat invocations
			if ( completed ) {
				return;
			}

			completed = true;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				window.clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader( "Last-Modified" );
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader( "etag" );
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {

				// Extract error from statusText and normalize for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
} );

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {

		// Shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		// The url can be an options object (which then must have .url)
		return jQuery.ajax( jQuery.extend( {
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		}, jQuery.isPlainObject( url ) && url ) );
	};
} );


jQuery._evalUrl = function( url ) {
	return jQuery.ajax( {
		url: url,

		// Make this explicit, since user can override this through ajaxSetup (#11264)
		type: "GET",
		dataType: "script",
		cache: true,
		async: false,
		global: false,
		"throws": true
	} );
};


jQuery.fn.extend( {
	wrapAll: function( html ) {
		var wrap;

		if ( this[ 0 ] ) {
			if ( jQuery.isFunction( html ) ) {
				html = html.call( this[ 0 ] );
			}

			// The elements to wrap the target around
			wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map( function() {
				var elem = this;

				while ( elem.firstElementChild ) {
					elem = elem.firstElementChild;
				}

				return elem;
			} ).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapInner( html.call( this, i ) );
			} );
		}

		return this.each( function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		} );
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each( function( i ) {
			jQuery( this ).wrapAll( isFunction ? html.call( this, i ) : html );
		} );
	},

	unwrap: function( selector ) {
		this.parent( selector ).not( "body" ).each( function() {
			jQuery( this ).replaceWith( this.childNodes );
		} );
		return this;
	}
} );


jQuery.expr.pseudos.hidden = function( elem ) {
	return !jQuery.expr.pseudos.visible( elem );
};
jQuery.expr.pseudos.visible = function( elem ) {
	return !!( elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length );
};




jQuery.ajaxSettings.xhr = function() {
	try {
		return new window.XMLHttpRequest();
	} catch ( e ) {}
};

var xhrSuccessStatus = {

		// File protocol always yields status code 0, assume 200
		0: 200,

		// Support: IE <=9 only
		// #1450: sometimes IE returns 1223 when it should be 204
		1223: 204
	},
	xhrSupported = jQuery.ajaxSettings.xhr();

support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
support.ajax = xhrSupported = !!xhrSupported;

jQuery.ajaxTransport( function( options ) {
	var callback, errorCallback;

	// Cross domain only allowed if supported through XMLHttpRequest
	if ( support.cors || xhrSupported && !options.crossDomain ) {
		return {
			send: function( headers, complete ) {
				var i,
					xhr = options.xhr();

				xhr.open(
					options.type,
					options.url,
					options.async,
					options.username,
					options.password
				);

				// Apply custom fields if provided
				if ( options.xhrFields ) {
					for ( i in options.xhrFields ) {
						xhr[ i ] = options.xhrFields[ i ];
					}
				}

				// Override mime type if needed
				if ( options.mimeType && xhr.overrideMimeType ) {
					xhr.overrideMimeType( options.mimeType );
				}

				// X-Requested-With header
				// For cross-domain requests, seeing as conditions for a preflight are
				// akin to a jigsaw puzzle, we simply never set it to be sure.
				// (it can always be set on a per-request basis or even using ajaxSetup)
				// For same-domain requests, won't change header if already provided.
				if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
					headers[ "X-Requested-With" ] = "XMLHttpRequest";
				}

				// Set headers
				for ( i in headers ) {
					xhr.setRequestHeader( i, headers[ i ] );
				}

				// Callback
				callback = function( type ) {
					return function() {
						if ( callback ) {
							callback = errorCallback = xhr.onload =
								xhr.onerror = xhr.onabort = xhr.onreadystatechange = null;

							if ( type === "abort" ) {
								xhr.abort();
							} else if ( type === "error" ) {

								// Support: IE <=9 only
								// On a manual native abort, IE9 throws
								// errors on any property access that is not readyState
								if ( typeof xhr.status !== "number" ) {
									complete( 0, "error" );
								} else {
									complete(

										// File: protocol always yields status 0; see #8605, #14207
										xhr.status,
										xhr.statusText
									);
								}
							} else {
								complete(
									xhrSuccessStatus[ xhr.status ] || xhr.status,
									xhr.statusText,

									// Support: IE <=9 only
									// IE9 has no XHR2 but throws on binary (trac-11426)
									// For XHR2 non-text, let the caller handle it (gh-2498)
									( xhr.responseType || "text" ) !== "text"  ||
									typeof xhr.responseText !== "string" ?
										{ binary: xhr.response } :
										{ text: xhr.responseText },
									xhr.getAllResponseHeaders()
								);
							}
						}
					};
				};

				// Listen to events
				xhr.onload = callback();
				errorCallback = xhr.onerror = callback( "error" );

				// Support: IE 9 only
				// Use onreadystatechange to replace onabort
				// to handle uncaught aborts
				if ( xhr.onabort !== undefined ) {
					xhr.onabort = errorCallback;
				} else {
					xhr.onreadystatechange = function() {

						// Check readyState before timeout as it changes
						if ( xhr.readyState === 4 ) {

							// Allow onerror to be called first,
							// but that will not handle a native abort
							// Also, save errorCallback to a variable
							// as xhr.onerror cannot be accessed
							window.setTimeout( function() {
								if ( callback ) {
									errorCallback();
								}
							} );
						}
					};
				}

				// Create the abort callback
				callback = callback( "abort" );

				try {

					// Do send the request (this may raise an exception)
					xhr.send( options.hasContent && options.data || null );
				} catch ( e ) {

					// #14683: Only rethrow if this hasn't been notified as an error yet
					if ( callback ) {
						throw e;
					}
				}
			},

			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




// Prevent auto-execution of scripts when no explicit dataType was provided (See gh-2432)
jQuery.ajaxPrefilter( function( s ) {
	if ( s.crossDomain ) {
		s.contents.script = false;
	}
} );

// Install script dataType
jQuery.ajaxSetup( {
	accepts: {
		script: "text/javascript, application/javascript, " +
			"application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /\b(?:java|ecma)script\b/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
} );

// Handle cache's special case and crossDomain
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
	}
} );

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {
		var script, callback;
		return {
			send: function( _, complete ) {
				script = jQuery( "<script>" ).prop( {
					charset: s.scriptCharset,
					src: s.url
				} ).on(
					"load error",
					callback = function( evt ) {
						script.remove();
						callback = null;
						if ( evt ) {
							complete( evt.type === "error" ? 404 : 200, evt.type );
						}
					}
				);

				// Use native DOM manipulation to avoid our domManip AJAX trickery
				document.head.appendChild( script[ 0 ] );
			},
			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup( {
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
} );

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" &&
				( s.contentType || "" )
					.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
				rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters[ "script json" ] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// Force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always( function() {

			// If previous value didn't exist - remove it
			if ( overwritten === undefined ) {
				jQuery( window ).removeProp( callbackName );

			// Otherwise restore preexisting value
			} else {
				window[ callbackName ] = overwritten;
			}

			// Save back as free
			if ( s[ callbackName ] ) {

				// Make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// Save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		} );

		// Delegate to script
		return "script";
	}
} );




// Support: Safari 8 only
// In Safari 8 documents created via document.implementation.createHTMLDocument
// collapse sibling forms: the second one becomes a child of the first one.
// Because of that, this security measure has to be disabled in Safari 8.
// https://bugs.webkit.org/show_bug.cgi?id=137337
support.createHTMLDocument = ( function() {
	var body = document.implementation.createHTMLDocument( "" ).body;
	body.innerHTML = "<form></form><form></form>";
	return body.childNodes.length === 2;
} )();


// Argument "data" should be string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( typeof data !== "string" ) {
		return [];
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}

	var base, parsed, scripts;

	if ( !context ) {

		// Stop scripts or inline event handlers from being executed immediately
		// by using document.implementation
		if ( support.createHTMLDocument ) {
			context = document.implementation.createHTMLDocument( "" );

			// Set the base href for the created document
			// so any parsed elements with URLs
			// are based on the document's URL (gh-2965)
			base = context.createElement( "base" );
			base.href = document.location.href;
			context.head.appendChild( base );
		} else {
			context = document;
		}
	}

	parsed = rsingleTag.exec( data );
	scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[ 1 ] ) ];
	}

	parsed = buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	var selector, type, response,
		self = this,
		off = url.indexOf( " " );

	if ( off > -1 ) {
		selector = stripAndCollapse( url.slice( off ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax( {
			url: url,

			// If "type" variable is undefined, then "GET" method will be used.
			// Make value of this field explicit since
			// user can override it through ajaxSetup method
			type: type || "GET",
			dataType: "html",
			data: params
		} ).done( function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		// If the request succeeds, this function gets "data", "status", "jqXHR"
		// but they are ignored because response was set above.
		// If it fails, this function gets "jqXHR", "status", "error"
		} ).always( callback && function( jqXHR, status ) {
			self.each( function() {
				callback.apply( this, response || [ jqXHR.responseText, status, jqXHR ] );
			} );
		} );
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [
	"ajaxStart",
	"ajaxStop",
	"ajaxComplete",
	"ajaxError",
	"ajaxSuccess",
	"ajaxSend"
], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
} );




jQuery.expr.pseudos.animated = function( elem ) {
	return jQuery.grep( jQuery.timers, function( fn ) {
		return elem === fn.elem;
	} ).length;
};




jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// Set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			( curCSSTop + curCSSLeft ).indexOf( "auto" ) > -1;

		// Need to be able to calculate position if either
		// top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;

		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {

			// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
			options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );

		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend( {
	offset: function( options ) {

		// Preserve chaining for setter
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each( function( i ) {
					jQuery.offset.setOffset( this, options, i );
				} );
		}

		var doc, docElem, rect, win,
			elem = this[ 0 ];

		if ( !elem ) {
			return;
		}

		// Return zeros for disconnected and hidden (display: none) elements (gh-2310)
		// Support: IE <=11 only
		// Running getBoundingClientRect on a
		// disconnected node in IE throws an error
		if ( !elem.getClientRects().length ) {
			return { top: 0, left: 0 };
		}

		rect = elem.getBoundingClientRect();

		doc = elem.ownerDocument;
		docElem = doc.documentElement;
		win = doc.defaultView;

		return {
			top: rect.top + win.pageYOffset - docElem.clientTop,
			left: rect.left + win.pageXOffset - docElem.clientLeft
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			elem = this[ 0 ],
			parentOffset = { top: 0, left: 0 };

		// Fixed elements are offset from window (parentOffset = {top:0, left: 0},
		// because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {

			// Assume getBoundingClientRect is there when computed position is fixed
			offset = elem.getBoundingClientRect();

		} else {

			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset = {
				top: parentOffset.top + jQuery.css( offsetParent[ 0 ], "borderTopWidth", true ),
				left: parentOffset.left + jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true )
			};
		}

		// Subtract parent offsets and element margins
		return {
			top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	// This method will return documentElement in the following cases:
	// 1) For the element inside the iframe without offsetParent, this method will return
	//    documentElement of the parent window
	// 2) For the hidden or detached element
	// 3) For body or html element, i.e. in case of the html node - it will return itself
	//
	// but those exceptions were never presented as a real life use-cases
	// and might be considered as more preferable results.
	//
	// This logic, however, is not guaranteed and can change at any point in the future
	offsetParent: function() {
		return this.map( function() {
			var offsetParent = this.offsetParent;

			while ( offsetParent && jQuery.css( offsetParent, "position" ) === "static" ) {
				offsetParent = offsetParent.offsetParent;
			}

			return offsetParent || documentElement;
		} );
	}
} );

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = "pageYOffset" === prop;

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {

			// Coalesce documents and windows
			var win;
			if ( jQuery.isWindow( elem ) ) {
				win = elem;
			} else if ( elem.nodeType === 9 ) {
				win = elem.defaultView;
			}

			if ( val === undefined ) {
				return win ? win[ prop ] : elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : win.pageXOffset,
					top ? val : win.pageYOffset
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length );
	};
} );

// Support: Safari <=7 - 9.1, Chrome <=37 - 49
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// Blink bug: https://bugs.chromium.org/p/chromium/issues/detail?id=589347
// getComputedStyle returns percent when specified for top/left/bottom/right;
// rather than make the css module depend on the offset module, just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );

				// If curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
} );


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
		function( defaultExtra, funcName ) {

		// Margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {

					// $( window ).outerWidth/Height return w/h including scrollbars (gh-1729)
					return funcName.indexOf( "outer" ) === 0 ?
						elem[ "inner" + name ] :
						elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?

					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable );
		};
	} );
} );


jQuery.fn.extend( {

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {

		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ?
			this.off( selector, "**" ) :
			this.off( types, selector || "**", fn );
	}
} );

jQuery.holdReady = function( hold ) {
	if ( hold ) {
		jQuery.readyWait++;
	} else {
		jQuery.ready( true );
	}
};
jQuery.isArray = Array.isArray;
jQuery.parseJSON = JSON.parse;
jQuery.nodeName = nodeName;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( true ) {
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
		return jQuery;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}




var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in AMD
// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( !noGlobal ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;
} );


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var stylesInDom = {},
	memoize = function(fn) {
		var memo;
		return function () {
			if (typeof memo === "undefined") memo = fn.apply(this, arguments);
			return memo;
		};
	},
	isOldIE = memoize(function() {
		// Test for IE <= 9 as proposed by Browserhacks
		// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
		// Tests for existence of standard globals is to allow style-loader 
		// to operate correctly into non-standard environments
		// @see https://github.com/webpack-contrib/style-loader/issues/177
		return window && document && document.all && !window.atob;
	}),
	getElement = (function(fn) {
		var memo = {};
		return function(selector) {
			if (typeof memo[selector] === "undefined") {
				memo[selector] = fn.call(this, selector);
			}
			return memo[selector]
		};
	})(function (styleTarget) {
		return document.querySelector(styleTarget)
	}),
	singletonElement = null,
	singletonCounter = 0,
	styleElementsInsertedAtTop = [],
	fixUrls = __webpack_require__(7);

module.exports = function(list, options) {
	if(typeof DEBUG !== "undefined" && DEBUG) {
		if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};
	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (typeof options.singleton === "undefined") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (typeof options.insertInto === "undefined") options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

	var styles = listToStyles(list, options);
	addStylesToDom(styles, options);

	return function update(newList) {
		var mayRemove = [];
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			domStyle.refs--;
			mayRemove.push(domStyle);
		}
		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}
		for(var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];
			if(domStyle.refs === 0) {
				for(var j = 0; j < domStyle.parts.length; j++)
					domStyle.parts[j]();
				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom(styles, options) {
	for(var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];
		if(domStyle) {
			domStyle.refs++;
			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}
			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];
			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}
			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles(list, options) {
	var styles = [];
	var newStyles = {};
	for(var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};
		if(!newStyles[id])
			styles.push(newStyles[id] = {id: id, parts: [part]});
		else
			newStyles[id].parts.push(part);
	}
	return styles;
}

function insertStyleElement(options, styleElement) {
	var styleTarget = getElement(options.insertInto)
	if (!styleTarget) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}
	var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
	if (options.insertAt === "top") {
		if(!lastStyleElementInsertedAtTop) {
			styleTarget.insertBefore(styleElement, styleTarget.firstChild);
		} else if(lastStyleElementInsertedAtTop.nextSibling) {
			styleTarget.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			styleTarget.appendChild(styleElement);
		}
		styleElementsInsertedAtTop.push(styleElement);
	} else if (options.insertAt === "bottom") {
		styleTarget.appendChild(styleElement);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement(styleElement) {
	styleElement.parentNode.removeChild(styleElement);
	var idx = styleElementsInsertedAtTop.indexOf(styleElement);
	if(idx >= 0) {
		styleElementsInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement(options) {
	var styleElement = document.createElement("style");
	options.attrs.type = "text/css";

	attachTagAttrs(styleElement, options.attrs);
	insertStyleElement(options, styleElement);
	return styleElement;
}

function createLinkElement(options) {
	var linkElement = document.createElement("link");
	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	attachTagAttrs(linkElement, options.attrs);
	insertStyleElement(options, linkElement);
	return linkElement;
}

function attachTagAttrs(element, attrs) {
	Object.keys(attrs).forEach(function (key) {
		element.setAttribute(key, attrs[key]);
	});
}

function addStyle(obj, options) {
	var styleElement, update, remove, transformResult;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    transformResult = options.transform(obj.css);
	    
	    if (transformResult) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = transformResult;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css. 
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;
		styleElement = singletonElement || (singletonElement = createStyleElement(options));
		update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
		remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
	} else if(obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function") {
		styleElement = createLinkElement(options);
		update = updateLink.bind(null, styleElement, options);
		remove = function() {
			removeStyleElement(styleElement);
			if(styleElement.href)
				URL.revokeObjectURL(styleElement.href);
		};
	} else {
		styleElement = createStyleElement(options);
		update = applyToTag.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
		};
	}

	update(obj);

	return function updateStyle(newObj) {
		if(newObj) {
			if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
				return;
			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;
		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag(styleElement, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (styleElement.styleSheet) {
		styleElement.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = styleElement.childNodes;
		if (childNodes[index]) styleElement.removeChild(childNodes[index]);
		if (childNodes.length) {
			styleElement.insertBefore(cssNode, childNodes[index]);
		} else {
			styleElement.appendChild(cssNode);
		}
	}
}

function applyToTag(styleElement, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		styleElement.setAttribute("media", media)
	}

	if(styleElement.styleSheet) {
		styleElement.styleSheet.cssText = css;
	} else {
		while(styleElement.firstChild) {
			styleElement.removeChild(styleElement.firstChild);
		}
		styleElement.appendChild(document.createTextNode(css));
	}
}

function updateLink(linkElement, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/* If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
	and there is no publicPath defined then lets turn convertToAbsoluteUrls
	on by default.  Otherwise default to the convertToAbsoluteUrls option
	directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls){
		css = fixUrls(css);
	}

	if(sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = linkElement.href;

	linkElement.href = URL.createObjectURL(blob);

	if(oldSrc)
		URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 7 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(2);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(6)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../node_modules/css-loader/index.js!./index.css", function() {
			var newContent = require("!!../node_modules/css-loader/index.js!./index.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 9 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1);
module.exports = __webpack_require__(0);


/***/ })
/******/ ]);