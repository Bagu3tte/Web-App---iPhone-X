angular.module('app')
  .controller('MessageController', ['$scope', '$state', '$rootScope', '$location', '$anchorScroll','Pubnub', '$stateParams', function ($scope, $state, $rootScrope, $location, $anchorScroll, Pubnub, $stateParams) {

  var channel = "pgday3";
  $scope.name = $stateParams.name;
  $scope.messages = [];

  var update = function ()
  {
    $scope.$apply();
    $location.hash('last');
    $anchorScroll();
  };

  $scope.sendMessage = function ()
  {
    if (!angular.isDefined($scope.message) || $scope.message == "")
      return;
    Pubnub.publish({
        channel: channel,
        message: {
            text: $scope.message,
            name: $scope.name
        }
    });
    $scope.message = "";
  }

  Pubnub.init({
    publishKey: 'demo',
    subscribeKey: 'demo'
  });

  Pubnub.addListener({
      message: function(data) {
        $scope.messages.push({entry:{text:data.message.text,name:data.message.name},timetoken:data.timetoken});
        update();
      }
  });

  Pubnub.subscribe({
      channels: [channel]
  });

  Pubnub.history(
      {
          channel : channel,
          count : 20
      },
      function (status, response) {
          $scope.messages = response.messages;
          update();
      }
  );

}])
.controller('MessageController.index', function($scope, $ionicScrollDelegate, filterFilter, $location, $anchorScroll) {
  var letters = $scope.letters = [];
  var contacts = $scope.contacts = [];
  var currentCharCode = ' '.charCodeAt(0) - 1;

  //window.CONTACTS is defined below
  window.CONTACTS
    .sort(function(a, b) {
      return a.last_name > b.last_name ? 1 : -1;
    })
    .forEach(function(person) {
      //Get the first letter of the last name, and if the last name changes
      //put the letter in the array
      var personCharCode = person.last_name.toUpperCase().charCodeAt(0);
      if (personCharCode < 65) {
         personCharCode = 35;
      }

      //We may jump two letters, be sure to put both in
      //(eg if we jump from Adam Bradley to Bob Doe, add both C and D)
      var difference = personCharCode - currentCharCode;

      for (var i = 1; i <= difference; i++) {
        /*console.log(String.fromCharCode(currentCharCode));*/
        addLetter(currentCharCode + i);
      }
      currentCharCode = personCharCode;
      contacts.push(person);
    });

  //If names ended before Z, add everything up to Z
  for (var i = currentCharCode + 1; i <= 'Z'.charCodeAt(0); i++) {
    addLetter(i);
  }

  function addLetter(code) {
    var letter = String.fromCharCode(code);
    /*
    contacts.push({
      isLetter: true,
      letter: letter
    });

    letters.push(letter);
    */
  }

  //Letters are shorter, everything else is 52 pixels
  $scope.getItemHeight = function(item) {
    return item.isLetter ? 40 : 60;
  };

  $scope.scrollTop = function() {
    $ionicScrollDelegate.scrollTop();
  };

  $scope.scrollBottom = function() {
    $ionicScrollDelegate.scrollBottom();
  };

  var letterHasMatch = {};
  $scope.getContacts = function() {
    letterHasMatch = {};
    //Filter contacts by $scope.search.
    //Additionally, filter letters so that they only show if there
    //is one or more matching contact
    return contacts.filter(function(item) {
      var itemDoesMatch = !$scope.search || item.isLetter ||
        item.first_name.toLowerCase().indexOf($scope.search.toLowerCase()) > -1 ||
        item.last_name.toLowerCase().indexOf($scope.search.toLowerCase()) > -1;

      //console.log(item.last_name.toString().charAt(0));

      //Mark this person's last name letter as 'has a match'
      if (!item.isLetter && itemDoesMatch) {

        var letter = item.last_name.charAt(0).toUpperCase();
        if ( item.last_name.charCodeAt(0) < 65 ){
          letter = "#";
        }
        letterHasMatch[letter] = true;
      }

      return itemDoesMatch;
    }).filter(function(item) {
      //Finally, re-filter all of the letters and take out ones that don't
      //have a match
      if (item.isLetter && !letterHasMatch[item.letter]) {
        return false;
      }

      return true;
    });
  };

  $scope.clearSearch = function() {
    $scope.search = '';
  };
});

window.CONTACTS = [{"id":1,"first_name":"Patrick","last_name":"Adams","country":"Cyprus","ip_address":"153.88.89.148","email":"progers@yata.net"},
{"id":2,"first_name":"Kanet","last_name":"Curns","country":"Croatia","ip_address":"209.73.121.212","email":"jgordon@skivee.biz"},
{"id":3,"first_name":"Kathy","last_name":"Chancey","country":"Armenia","ip_address":"164.214.217.162","email":"khamilton@rhynyx.biz"},
{"id":4,"first_name":"Stephanie","last_name":"Dennis","country":"Mauritius","ip_address":"8.199.242.67","email":"sjohnson@jabbertype.mil"},
{"id":5,"first_name":"Jerry","last_name":"Edwards","country":"Thailand","ip_address":"230.207.100.163","email":"jpalmer@avamm.org"},
{"id":6,"first_name":"Lillian","last_name":"Franklin","country":"Germany","ip_address":"150.190.116.1","email":"lfranklin@eare.mil"},
{"id":7,"first_name":"Melissa","last_name":"Gordon","country":"Serbia","ip_address":"162.156.29.99","email":"mgordon@flashset.org"},
{"id":8,"first_name":"Sarah","last_name":"Harris","country":"Grenada","ip_address":"13.177.156.223","email":"sburns@eimbee.info"},
{"id":9,"first_name":"Willie","last_name":"Ingles","country":"Croatia","ip_address":"115.133.81.82","email":"wburton@dynazzy.info"},
{"id":10,"first_name":"Tina","last_name":"Johnson","country":"United States Virgin Islands","ip_address":"113.49.63.18","email":"tsimmons@devpulse.mil"},
{"id":11,"first_name":"Kenneth","last_name":"Kent","country":"Mexico","ip_address":"92.89.76.196","email":"klarson@browseblab.info"},
{"id":12,"first_name":"Philip","last_name":"Lyles","country":"Cuba","ip_address":"223.180.48.70","email":"pwelch@skippad.edu"},
{"id":13,"first_name":"Nicholas","last_name":"Marker","country":"British Indian Ocean Territory","ip_address":"200.150.119.13","email":"nparker@twitternation.net"},
{"id":14,"first_name":"Nicole","last_name":"Nebb","country":"Moldova","ip_address":"47.66.237.205","email":"nwebb@midel.biz"},
{"id":15,"first_name":"Clarence","last_name":"Olsen","country":"China","ip_address":"134.84.246.67","email":"cschmidt@dazzlesphere.net"},
{"id":16,"first_name":"Jessica","last_name":"Peterson","country":"Sao Tome and Principe","ip_address":"211.30.32.109","email":"jmurray@jumpxs.net"},
{"id":17,"first_name":"Willie","last_name":"Quite","country":"US Minor Outlying Islands","ip_address":"158.40.109.208","email":"wschmidt@babbleset.edu"}];
