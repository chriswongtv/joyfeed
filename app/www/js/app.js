// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('joyfeed', ['ionic', 'ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.controller('AppCtrl', function($scope, $cordovaCamera, $http, $ionicPlatform) {
  $scope.launchCamera = function() {
    $ionicPlatform.ready(function() {
      var options = {
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.CAMERA
      };

      $cordovaCamera.getPicture(options).then(function(imageURI) {
        var options = {
          "method": "POST",
          "url": "https://api.imgur.com/3/image",
          "headers": {
            "Authorization": "Client-ID a2e67e0f711ee48"
          },
          "data": { "image": imageURI, "type": "base64" }
        };

        $http(options).then(function(res) {
          console.log(res);
          var imgLink = res.data.data.link;
          console.log(imgLink);

          var config = {
            "method": "POST",
            "url": "https://api.projectoxford.ai/emotion/v1.0/recognize",
            "headers": {
              "Ocp-Apim-Subscription-Key": "7af2742a55ff4cc7bdc90afd9804bf14",
              "Content-Type": "application/json"
            },
            "data": { "url": imgLink }
          };

          $http(config).then(function(res) {
            if (res.data.length === 0) {
              alert("error!");
            } else {
              console.log(res);

              $scope.anger = res.data[0].scores.anger;
              $scope.contempt = res.data[0].scores.contempt;
              $scope.disgust = res.data[0].scores.disgust;
              $scope.fear = res.data[0].scores.fear;
              $scope.happiness = res.data[0].scores.happiness;
              $scope.neutral = res.data[0].scores.neutral;
              $scope.sadness = res.data[0].scores.sadness;
              $scope.surprise = res.data[0].scores.surprise;

              // start predicting user emotion

              // start filtering news feed

              var filter_config = {
                "method": "GET",
                "url":
              }
            }
          }, function(err) {
            console.log(err);
          })
        }, function(err) {
          console.log(err);
        });

      }, function(err) {
        // error
      });
    });
  }
});