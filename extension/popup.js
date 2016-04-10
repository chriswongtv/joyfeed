document.addEventListener('DOMContentLoaded', function() {
  document.getElementById("joyify").addEventListener("click", joyify);
  document.getElementById("hide").addEventListener("click", hide);
  navigator.webkitGetUserMedia({audio: true, video: true}, function(stream) {
    document.getElementById('video').src = webkitURL.createObjectURL(stream);
  }, function(e) {

  });
});

function getEmotion(score) {
  console.log(score);
  if (score < 0.1)
    return "LOW";
  else if (score < 0.6)
    return "MEDIUM";
  else
    return "HIGH";
}

function joyify() {
  var c = document.getElementById('photo');
  var v = document.getElementById('video');
  c.getContext('2d').drawImage(v, 0, 0, 640, 480);
  var link = c.toDataURL();
  document.getElementById('photo').src = link;

  var binary = c.src.substring(c.src.indexOf(',') + 1);

  var data = new FormData();
  data.append("image", binary);
  data.append("type", "base64");

  var xhr = new XMLHttpRequest();
  xhr.withCredentials = true;

  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === 4) {
      console.log(JSON.parse(this.responseText));
      var res = JSON.parse(this.responseText).data.link;

      console.log(res);

      var data = JSON.stringify({
        "url": res
      });

      var xhr = new XMLHttpRequest();
      xhr.withCredentials = true;

      xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
          var res = JSON.parse(this.responseText);
          console.log(res);
          console.log(res[0].scores);

          // var dataURI = "Anger,Contempt,Disgust,Fear,Happiness,Neutral,Sadness\nRICH_TEXT,RICH_TEXT,RICH_TEXT,RICH_TEXT,RICH_TEXT,RICH_TEXT,RICH_TEXT\n";
          // dataURI += getEmotion(res[0].scores.anger) + "," + getEmotion(res[0].scores.contempt) + "," + getEmotion(res[0].scores.disgust) + "," + getEmotion(res[0].scores.fear) + "," + getEmotion(res[0].scores.happiness) + "," + getEmotion(res[0].scores.neutral) + "," + getEmotion(res[0].scores.sadness);

          // var dataJSON = '{"name":"name", "fields":[{"name":"Anger","type":"RICH_TEXT"}, {"name":"Contempt","type":"RICH_TEXT"}, {"name":"Disgust","type":"RICH_TEXT"}, {"name":"Fear","type":"RICH_TEXT"}, {"name":"Happiness","type":"RICH_TEXT"}, {"name":"Neutral","type":"RICH_TEXT"}, {"name":"Sadness","type":"RICH_TEXT"} ], "values":[{"row":["LOW","LOW","LOW","LOW","LOW","HIGH","LOW"]} ] }';

          console.log("{\"name\":\"name\", \"fields\":[{\"name\":\"Anger\",\"type\":\"RICH_TEXT\"}, {\"name\":\"Contempt\",\"type\":\"RICH_TEXT\"}, {\"name\":\"Disgust\",\"type\":\"RICH_TEXT\"}, {\"name\":\"Fear\",\"type\":\"RICH_TEXT\"}, {\"name\":\"Happiness\",\"type\":\"RICH_TEXT\"}, {\"name\":\"Neutral\",\"type\":\"RICH_TEXT\"}, {\"name\":\"Sadness\",\"type\":\"RICH_TEXT\"} ], \"values\":[{\"row\":[\"" + getEmotion(res[0].scores.anger) + "\",\"" + getEmotion(res[0].scores.contempt) + "\",\"" + getEmotion(res[0].scores.disgust) + "\",\"" + getEmotion(res[0].scores.fear) + "\",\"" + getEmotion(res[0].scores.happiness) + "\",\"" + getEmotion(res[0].scores.neutral) + "\",\"" + getEmotion(res[0].scores.sadness) + "\"]} ] }");

          var data = new FormData();
          data.append("json", "{\"name\":\"name\", \"fields\":[{\"name\":\"Anger\",\"type\":\"RICH_TEXT\"}, {\"name\":\"Contempt\",\"type\":\"RICH_TEXT\"}, {\"name\":\"Disgust\",\"type\":\"RICH_TEXT\"}, {\"name\":\"Fear\",\"type\":\"RICH_TEXT\"}, {\"name\":\"Happiness\",\"type\":\"RICH_TEXT\"}, {\"name\":\"Neutral\",\"type\":\"RICH_TEXT\"}, {\"name\":\"Sadness\",\"type\":\"RICH_TEXT\"} ], \"values\":[{\"row\":[\"" + getEmotion(res[0].scores.anger) + "\",\"" + getEmotion(res[0].scores.contempt) + "\",\"" + getEmotion(res[0].scores.disgust) + "\",\"" + getEmotion(res[0].scores.fear) + "\",\"" + getEmotion(res[0].scores.happiness) + "\",\"" + getEmotion(res[0].scores.neutral) + "\",\"" + getEmotion(res[0].scores.sadness) + "\"]} ] }");
          data.append("service_name", "joyfeed_1");

          var xhr = new XMLHttpRequest();
          xhr.withCredentials = true;

          xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
              console.log(this.responseText);
              var response = JSON.parse(this.responseText);
              var emotion = response.values[0].row[6];
              console.log(emotion);
              document.getElementById('emotion').textContent = 'Your emotion is ' + emotion.toLowerCase() + '.';
              document.getElementById('tweet').textContent = 'Analyzing tweets...';

              chrome.tabs.executeScript({
                code: 'var mood = "' + emotion + '"; var stream = document.getElementsByClassName("expanding-stream-item"); for (var i = 0; i < stream.length; i++) {var tweet = stream[i].getElementsByTagName("p")[0].innerText; var data = new FormData(); var xhr = new XMLHttpRequest(); xhr.withCredentials = true; xhr.addEventListener("readystatechange", function () {if (this.readyState === 4) {var score = JSON.parse(this.responseText).aggregate.score; if (score < 0 && mood === "NEGATIVE") {console.log(document.getElementById(stream[i].id)); document.getElementById(stream[i].id).style.backgroundColor="red"; document.getElementById(stream[i].id).className += " joyfeed-filtered"; } else if (score > 0) {document.getElementById(stream[i].id).style.backgroundColor="green"; } else if (score < -0.5 && mood === "NEUTRAL") {console.log(document.getElementById(stream[i].id)); document.getElementById(stream[i].id).style.backgroundColor="red"; document.getElementById(stream[i].id).className += " joyfeed-filtered"; } } }); xhr.open("GET", "https://api.havenondemand.com/1/api/sync/analyzesentiment/v1?apikey=8c7df011-ee33-4e34-a234-5204d5a3206e&text=" + tweet, false); xhr.setRequestHeader("cache-control", "no-cache"); xhr.setRequestHeader("postman-token", "8372a06a-5e9b-6bfe-c1ff-ae3c5a3c6487"); xhr.send(data); } document.getElementById("tweet").textContent = "Tweets analyzed!";'
              });
            }
          });

          xhr.open("POST", "https://api.havenondemand.com/1/api/sync/predict/v1?apikey=8c7df011-ee33-4e34-a234-5204d5a3206e");
          xhr.setRequestHeader("cache-control", "no-cache");
          xhr.setRequestHeader("postman-token", "374c63f2-c520-42a4-c33a-2dcca4483997");

          xhr.send(data);

          document.getElementById('emotion').textContent = 'Your emotion is...';
        }
      });

      xhr.open("POST", "https://api.projectoxford.ai/emotion/v1.0/recognize");
      xhr.setRequestHeader("ocp-apim-subscription-key", "7af2742a55ff4cc7bdc90afd9804bf14");
      xhr.setRequestHeader("content-type", "application/json");
      xhr.setRequestHeader("cache-control", "no-cache");
      xhr.setRequestHeader("postman-token", "4d33b5fe-fb33-bc29-f5c2-3e919891d9ad");

      xhr.send(data);
    }
  });

  xhr.open("POST", "https://api.imgur.com/3/image");
  xhr.setRequestHeader("authorization", "Client-ID a2e67e0f711ee48");
  xhr.setRequestHeader("cache-control", "no-cache");
  xhr.setRequestHeader("postman-token", "c746f944-f1b9-fb90-4f6e-5f2de8ab0848");

  xhr.send(data);
}

function hide() {
  chrome.tabs.executeScript({
    code: 'var stream = document.getElementsByClassName("joyfeed-filtered"); for (var i = 0; i < stream.length; i++) {stream[i].style.visibility="hidden"; stream[i].style.height="0px"; }'
  });
}