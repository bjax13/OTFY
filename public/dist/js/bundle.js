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
    templateUrl: './views/orderClSub/selectBrand.html',
    controller: 'rxInputCtrl'
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

angular.module('app').controller('addressInputCtrl', function ($scope, addressAutoFillSrvc, saveAddressSrvc) {
  $scope.test = addressAutoFillSrvc.test;

  $scope.logAddress = saveAddressSrvc.logAddress;

  $scope.initialize = addressAutoFillSrvc.initialize;

  $scope.geolocate = addressAutoFillSrvc.geolocate;
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

angular.module('app').controller('rxInputCtrl', function ($scope, saveRxSrvc) {
  $scope.test = saveRxSrvc.test;

  $scope.saveRx = saveRxSrvc.saveRx;
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

angular.module('app').service('addressAutoFillSrvc', function () {

  this.test = '**Test Data**';

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
'use strict';

angular.module('app').service('saveAddressSrvc', function () {

  var addresses = [];

  this.logAddress = function () {
    var addressObj = {
      addressSearch: document.getElementById('autocomplete').value,
      streetNumber: document.getElementById('street_number').value,
      streetName: document.getElementById('route').value,
      city: document.getElementById('locality').value,
      country: document.getElementById('country').value,
      postalCode: document.getElementById('postal_code').value,
      state: document.getElementById('administrative_area_level_1').value
    };

    if (addressObj.state && addressObj.streetNumber && addressObj.streetName && addressObj.city && addressObj.country && addressObj.postalCode) {
      addresses.push(addressObj);
      console.log(addresses);
    } else {
      alert('missing address field');
    }
  };
});
'use strict';

angular.module('app').service('saveRxSrvc', function () {

  this.test = 'test success';

  var prescriptions = [];

  this.saveRx = function () {
    var rxObj = {
      rxSearch: document.getElementById('autocomplete').value,
      rightPower: document.getElementById('right-Power').value,
      rightBC: document.getElementById('right-BC').value,
      rightDIA: document.getElementById('right-DIA').value,
      rightCYL: document.getElementById('right-CYL').value,
      rightAxis: document.getElementById('right-Axis').value,
      leftPower: document.getElementById('left-Power').value,
      leftBC: document.getElementById('left-BC').value,
      leftDIA: document.getElementById('left-DIA').value,
      leftCYL: document.getElementById('left-CYL').value,
      leftAxis: document.getElementById('left-Axis').value

    };

    if (rxObj.leftPower && rxObj.leftBC && rxObj.leftDIA && rxObj.leftCYL && rxObj.leftAxis && rxObj.rightPower && rxObj.rightBC && rxObj.rightDIA && rxObj.rightCYL && rxObj.rightAxis) {
      prescriptions.push(rxObj);
      console.log(prescriptions);
    } else {
      alert('missing prescription field');
    }
  };
});
//# sourceMappingURL=bundle.js.map
