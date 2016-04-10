document.addEventListener('DOMContentLoaded', function() {
  document.getElementById("joyify").addEventListener("click", joyify);
  navigator.webkitGetUserMedia({audio: true, video: true}, function(stream) {
    document.getElementById('video').src = webkitURL.createObjectURL(stream);
  }, function(e) {

  });
});

function joyify() {
  chrome.tabs.executeScript({
    code: 'var stream = document.getElementsByClassName("expanding-stream-item"); for (var i = 0; i < stream.length; i++) {var tweet = stream[i].getElementsByTagName("p")[0].innerText; var data = new FormData(); var xhr = new XMLHttpRequest(); xhr.withCredentials = true; xhr.addEventListener("readystatechange", function () {if (this.readyState === 4) {console.log(JSON.parse(this.responseText).aggregate); } }); xhr.open("GET", "https://api.havenondemand.com/1/api/sync/analyzesentiment/v1?apikey=8c7df011-ee33-4e34-a234-5204d5a3206e&text=" + tweet); xhr.setRequestHeader("cache-control", "no-cache"); xhr.setRequestHeader("postman-token", "8372a06a-5e9b-6bfe-c1ff-ae3c5a3c6487"); xhr.send(data); }'
  });

  // var c = document.getElementById('photo');
  // var v = document.getElementById('video');
  // c.getContext('2d').drawImage(v, 0, 0, 640, 480);
  // var link = c.toDataURL();
  // document.getElementById('photo').src = link;

  // var binary = c.src.substring(c.src.indexOf(',') + 1);

  // console.log(binary);

  // var data = new FormData();
  // data.append("image", binary);
  // data.append("type", "base64");

  // var xhr = new XMLHttpRequest();
  // xhr.withCredentials = true;

  // xhr.addEventListener("readystatechange", function () {
  //   if (this.readyState === 4) {
  //     console.log(JSON.parse(this.responseText));
  //     var res = JSON.parse(this.responseText).data.link;

  //     console.log(res);

  //     var data = JSON.stringify({
  //       "url": "http://i.imgur.com/besjShD.png"
  //     });

  //     var xhr = new XMLHttpRequest();
  //     xhr.withCredentials = true;

  //     xhr.addEventListener("readystatechange", function () {
  //       if (this.readyState === 4) {
  //         console.log(this.responseText);
  //         var res = JSON.parse(this.responseText);

  //         document.getElementById('emotion').textContent = 'Your emotion is positive.';
  //       }
  //     });

  //     xhr.open("POST", "https://api.projectoxford.ai/emotion/v1.0/recognize");
  //     xhr.setRequestHeader("ocp-apim-subscription-key", "7af2742a55ff4cc7bdc90afd9804bf14");
  //     xhr.setRequestHeader("content-type", "application/json");
  //     xhr.setRequestHeader("cache-control", "no-cache");
  //     xhr.setRequestHeader("postman-token", "4d33b5fe-fb33-bc29-f5c2-3e919891d9ad");

  //     xhr.send(data);
  //   }
  // });

  // xhr.open("POST", "https://api.imgur.com/3/image");
  // xhr.setRequestHeader("authorization", "Client-ID a2e67e0f711ee48");
  // xhr.setRequestHeader("cache-control", "no-cache");
  // xhr.setRequestHeader("postman-token", "c746f944-f1b9-fb90-4f6e-5f2de8ab0848");

  // xhr.send(data);
}