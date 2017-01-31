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
    controller: 'loginCtrl'
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
    // scope : {},
    controller: 'rxInputCtrl'
  }).state('orderCL.selectECP', {
    url: '/selectECP',
    templateUrl: './views/orderClSub/selectECP.html',
    controller: 'ecpInputCtrl'
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

angular.module('app').controller('ecpInputCtrl', function ($scope, addressAutoFillSrvc, ecpSaveSrvc) {
  $scope.test = addressAutoFillSrvc.test;

  $scope.logAddress = ecpSaveSrvc.logAddress;

  $scope.initialize = addressAutoFillSrvc.initialize;

  $scope.geolocate = addressAutoFillSrvc.geolocate;
});
'use strict';

angular.module('app').controller('loginCtrl', function ($scope, userSrvc, $state) {

	$scope.test = 'again';
	$scope.localSignup = true;

	$scope.togglelogin = function () {

		$scope.localSignup = !$scope.localSignup;
		console.log($scope.localSignup);
	};
	$scope.createUserLocal = function (user) {
		userSrvc.createUser(user).then(function (response) {
			console.log(response.data);
		});
	};

	$scope.login = function (user) {
		userSrvc.login(user).then(function (r) {
			if (!r.data) {
				$state.go('userInfo');
			} else {
				$state.go('main');
			}
		});
	};
});
'use strict';

angular.module('app').controller('mainCtrl', function ($scope) {

  $scope.test = 'again';
});
'use strict';

angular.module('app').controller('navBarCtrl', function ($scope) {
  $scope.loggedIn = true;

  $scope.changeLoggin = function () {

    $scope.loggedIn = !$scope.loggedIn;
    console.log($scope.loggedIn);
  };
});
'use strict';

angular.module('app').controller('rxInputCtrl', function ($scope, rxSrvc) {
  $scope.test = rxSrvc.test;

  $scope.getProducts = function () {
    $scope.products = rxSrvc.getProducts();
  };

  $scope.getProducts();
});
'use strict';

angular.module('app').directive('navBar', function () {
  return {
    restrict: 'E',
    templateUrl: "./views/directives/templates/navTpl.html",
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

angular.module('app').service('ecpSaveSrvc', function () {

  this.test = 'test success';

  var addresses = [];

  this.logAddress = function () {
    var addressObj = {
      ECPSearch: document.getElementById('autocomplete').value,
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

angular.module('app').service('rxSrvc', function ($http) {

  this.test = 'k';

  var products = [{
    id: 1,
    manufacture: "Johnson & Johnson",
    price: 39,
    productName: 'TestProduct'
  }, {
    id: 2,
    manufacture: "Alcon",
    price: 69,
    productName: 'TestProduct2'
  }];

  var populateProductList = function populateProductList() {
    return $http({
      method: 'GET',
      url: '/api/products'
    });
  };
  populateProductList().then(function (response) {
    products = response.data;
    console.log(response.data);
  });

  this.getProducts = function () {
    return products;
  };
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

angular.module('app').service('userSrvc', function ($http) {

	this.createUser = function (user) {
		return $http({
			method: 'POST',
			url: '/api/user',
			data: user
		});
	};
	this.login = function (user) {
		return $http({
			method: 'POST',
			url: '/login',
			data: user
		});
	};
});
//# sourceMappingURL=bundle.js.map
