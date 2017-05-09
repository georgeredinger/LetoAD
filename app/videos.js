import "firebase"; //vijeo-b0779


export var vid = [
//  {
//    "videoId": "CCWxicZFaVU",
//    "startSeconds": 10,
//    "endSeconds": 25,
//    "suggestedQuality": "hd720",
//    "message": "2017.03.10 schooling at home"
//  },
//  {
//    "videoId": "PZpYZ3xYfQE",
//    "startSeconds": 34,
//    "endSeconds": 40,
//    "suggestedQuality": "hd720",
//    "message": "2015.04.13"
//  },
//  {
//    "videoId": "_SBfBp6oN-Y",
//    "startSeconds": 5 * 60 + 6,
//    "endSeconds": 5 * 60 + 26,
//    "suggestedQuality": "hd720",
//    "message": "2016.06.19 3rd level 3, 72.8%"
//  },
//  {
//    "videoId": "s9cgFPB-lD4",
//    "startSeconds": 120,
//    "endSeconds": 141,
//    "suggestedQuality": "hd720",
//    "message": "2015.05.24 1st level 3 69.8%"
//  },
//  {
//    "videoId": "SAm34wutr2w",
//    "startSeconds": 120,
//    "endSeconds": 141,
//    "suggestedQuality": "hd720",
//    "message": "2015.06.13"
//  },
//  {
//    "videoId": "zymhefWTvjo",
//    "startSeconds": 4 * 60,
//    "endSeconds": 4 * 60 + 20,
//    "suggestedQuality": "hd720",
//    "message": "2016.05.16  3rd Level Test 2 71%"
//  },
//  {
//    "videoId": "v2dzXbJhz9k",
//    "startSeconds": 120,
//    "endSeconds": 141,
//    "suggestedQuality": "hd720",
//    "message": "2016.01.24"
//  },
//  {
//    "videoId": "HSZONtn0m8U",
//    "startSeconds": 120,
//    "endSeconds": 141,
//    "suggestedQuality": "hd720",
//    "message": "2016.05.01"
//  },
//  {
//    "videoId": "L18cANtPc_w",
//    "startSeconds": 504,
//    "endSeconds": 520,
//    "suggestedQuality": "hd720",
//    "message": "2015.02.19"
//  },
//  {
//    "videoId": "-71bLaD8zzA",
//    "startSeconds": 6 * 60,
//    "endSeconds": 6 * 60 + 10,
//    "suggestedQuality": "hd720",
//    "message": "2015.05.17 Nampa"
//  }
];

export const playerDefaults = {
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
    vid = snap.val();
    // for (let i in vid) {
    //     console.log(vid[i].message);
    // }
   // console.table(vid);
});