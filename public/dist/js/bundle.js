'use strict';

angular.module('app', ['ui.router']).config(function ($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/');

  $stateProvider.state('landingPage', {
    url: '/',
    templateUrl: './views/landingPage.html'
  }).state('main', {
    url: '/main',
    templateUrl: './views/main.html'
  }).state('login', {
    url: '/login',
    templateUrl: './views/login.html',
    controller: 'navBarCtrl'
  }).state('orderCL', {
    url: '/orderCL',
    templateUrl: './views/orderCL.html'
  }).state('orderCL.address', {
    url: '/address',
    templateUrl: './views/orderClSub/address.html',
    controller: 'addressInputCtrl'
  }).state('orderCL.selectBrand', {
    url: '/selectBrand',
    templateUrl: './views/orderClSub/selectBrand.html'
  }).state('orderCL.selectECP', {
    url: '/selectECP',
    templateUrl: './views/orderClSub/selectECP.html'
  }).state('orderCL.checkout', {
    url: '/checkout',
    templateUrl: './views/orderClSub/checkout.html'
  }).state('scheduleEyeExamComingSoon', {
    url: '/scheduleEyeExamComingSoon',
    templateUrl: './views/scheduleEyeExamComingSoon.html'
  }).state('orderEWComingSoon', {
    url: '/orderEWComingSoon',
    templateUrl: './views/orderEWComingSoon.html'
  }).state('userInfo', {
    url: '/userInfo',
    templateUrl: './views/userInfo.html'
  });
});
'use strict';

// This example displays an address form, using the autocomplete feature
// of the Google Places API to help users fill in the information.

var placeSearch, autocomplete;
var componentForm = {
  street_number: 'short_name',
  route: 'long_name',
  locality: 'long_name',
  administrative_area_level_1: 'short_name',
  country: 'long_name',
  postal_code: 'short_name'
};

function initialize() {
  // Create the autocomplete object, restricting the search
  // to geographical location types.
  autocomplete = new google.maps.places.Autocomplete(
  /** @type {HTMLInputElement} */document.getElementById('autocomplete'), { types: ['geocode'] });
  // When the user selects an address from the dropdown,
  // populate the address fields in the form.
  google.maps.event.addListener(autocomplete, 'place_changed', function () {
    fillInAddress();
  });
}

// [START region_fillform]
function fillInAddress() {
  // Get the place details from the autocomplete object.
  var place = autocomplete.getPlace();

  for (var component in componentForm) {
    document.getElementById(component).value = '';
    document.getElementById(component).disabled = false;
  }

  // Get each component of the address from the place details
  // and fill the corresponding field on the form.
  for (var i = 0; i < place.address_components.length; i++) {
    var addressType = place.address_components[i].types[0];
    if (componentForm[addressType]) {
      var val = place.address_components[i][componentForm[addressType]];
      document.getElementById(addressType).value = val;
    }
  }
}
// [END region_fillform]

// [START region_geolocation]
// Bias the autocomplete object to the user's geographical location,
// as supplied by the browser's 'navigator.geolocation' object.
function geolocate() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      var geolocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      var circle = new google.maps.Circle({
        center: geolocation,
        radius: position.coords.accuracy
      });
      autocomplete.setBounds(circle.getBounds());
    });
  }
}
// [END region_geolocation]
'use strict';

angular.module('app').controller('addressInputCtrl', function ($scope, addressSrvc) {
  $scope.test = addressSrvc.test;

  $scope.initialize = addressSrvc.initialize;

  $scope.geolocate = addressSrvc.geolocate;
});
'use strict';

angular.module('app').controller('mainCtrl', function ($scope) {

  $scope.test = 'again';
});
'use strict';

angular.module('app').controller('navBarCtrl', function ($scope) {
  $scope.loggedIn = false;

  $scope.changeLoggin = function () {

    $scope.loggedIn = !$scope.loggedIn;
    console.log($scope.loggedIn);
  };
});
'use strict';

angular.module('app').directive('navBar', function () {
  return {
    restrict: 'E',
    templateUrl: "./js/directives/templates/navTpl.html",
    scope: {},
    controller: 'navBarCtrl'
  };
});
'use strict';

angular.module('app').service('addressSrvc', function () {
  this.test = 'svc bacon';

  var placeSearch = void 0,
      autocomplete = void 0;
  var componentForm = {
    street_number: 'short_name',
    route: 'long_name',
    locality: 'long_name',
    administrative_area_level_1: 'short_name',
    country: 'long_name',
    postal_code: 'short_name'
  };

  this.initialize = function () {
    // Create the autocomplete object, restricting the search
    // to geographical location types.
    autocomplete = new google.maps.places.Autocomplete(
    /** @type {HTMLInputElement} */document.getElementById('autocomplete'), { types: ['geocode'] });
    // When the user selects an address from the dropdown,
    // populate the address fields in the form.
    google.maps.event.addListener(autocomplete, 'place_changed', function () {
      fillInAddress();
    });
  };

  function fillInAddress() {
    // Get the place details from the autocomplete object.
    var place = autocomplete.getPlace();

    for (var component in componentForm) {
      document.getElementById(component).value = '';
      document.getElementById(component).disabled = false;
    }

    // Get each component of the address from the place details
    // and fill the corresponding field on the form.
    for (var i = 0; i < place.address_components.length; i++) {
      var addressType = place.address_components[i].types[0];
      if (componentForm[addressType]) {
        var val = place.address_components[i][componentForm[addressType]];
        document.getElementById(addressType).value = val;
      }
    }
  }
  // [END region_fillform]

  // [START region_geolocation]
  // Bias the autocomplete object to the user's geographical location,
  // as supplied by the browser's 'navigator.geolocation' object.
  this.geolocate = function () {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        var geolocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        var circle = new google.maps.Circle({
          center: geolocation,
          radius: position.coords.accuracy
        });
        autocomplete.setBounds(circle.getBounds());
      });
    }
  };
  // [END region_geolocation]

});
//# sourceMappingURL=bundle.js.map
