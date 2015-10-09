// create our angular module and inject firebase
angular.module('scheduleApp', ['firebase'])

// create our main controller and get access to firebase
.controller('mainController', function($scope, $firebase) {
  
   // connect to firebase 
  var ref = new Firebase("https://kpo-speaker.firebaseIO.com/services");  
  var fb = $firebase(ref);
  
  // sync as object 
  var syncObject = fb.$asObject();
  
  // three way data binding
  syncObject.$bindTo($scope, 'services');
  
  // function to set the default data
  $scope.reset = function() {    

    fb.$set({
      eastRadfordCOG: {
        name: 'East Radford COG',
        date: 'Nov 1, 2015',
        pastor: 'Wayne Poston',
        title: 'Garment of Praise', 
        serviceType: 'Sunday PM',
        offering: '$3.00',
        visitors: 'Childress COG',
        comments: 'It was a great service',
        saved: 5,
        holyGhostFilled: 2
      }
    });    

  };
  
});