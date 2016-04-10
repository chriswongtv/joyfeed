var mood = "NEGATIVE";
var stream = document.getElementsByClassName("expanding-stream-item");

for (var i = 0; i < stream.length; i++) {
    var tweet = stream[i].getElementsByTagName("p")[0].innerText;

    var data = new FormData();

	var xhr = new XMLHttpRequest();
	xhr.withCredentials = true;

	xhr.addEventListener("readystatechange", function () {
	  if (this.readyState === 4) {
	    console.log(JSON.parse(this.responseText));
	    var score = JSON.parse(this.responseText).aggregate.score;

	    if (score < 0 && mood === "NEGATIVE") {
	    	console.log(document.getElementById(stream[i].id));
	    	document.getElementById(stream[i].id).style.backgroundColor="red";
	    	document.getElementById(stream[i].id).className += " joyfeed-filtered";
	    }
	  }
	});

	xhr.open("GET", "https://api.havenondemand.com/1/api/sync/analyzesentiment/v1?apikey=8c7df011-ee33-4e34-a234-5204d5a3206e&text=" + tweet, false);
	xhr.setRequestHeader("cache-control", "no-cache");
	xhr.setRequestHeader("postman-token", "8372a06a-5e9b-6bfe-c1ff-ae3c5a3c6487");

	xhr.send(data);
}