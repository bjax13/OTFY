'use strict';

angular.module('app', ['ui.router', 'ngCart']).config(function ($stateProvider, $urlRouterProvider) {

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
    controller: 'rxInputCtrl'
  }).state('orderCL.selectECP', {
    url: '/selectECP',
    templateUrl: './views/orderClSub/selectECP.html',
    controller: 'ecpInputCtrl'
  }).state('orderCL.checkout', {
    url: '/checkout',
    templateUrl: './views/orderClSub/checkout.html',
    controller: 'checkoutCtrl'
  }).state('scheduleEyeExam', {
    url: '/scheduleEyeExam',
    templateUrl: './views/scheduleEyeExam.html'
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

	$scope.logAddress = function () {
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
			saveAddressSrvc.logAddress(addressObj);
		} else {
			alert('missing address field');
		}
	};

	$scope.initialize = addressAutoFillSrvc.initialize;

	$scope.geolocate = addressAutoFillSrvc.geolocate;
});
'use strict';

angular.module('app').controller('checkoutCtrl', function ($scope, $http, ngCart, saveAddressSrvc) {
	saveAddressSrvc.getAddress().then(function (result) {
		$scope.address = result.address;
		console.log(result);
	});
	$scope.test = 'again';

	ngCart.setTaxRate(7.5);
	ngCart.setShipping(2.99);
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

  $scope.detailsToggle = true;

  // $scope.toggleDetails = () =>{
  //    $scope.detailsToggle = !$scope.detailsToggle;
  //    console.log($scope.detailsToggle);
  //
  // };

  $scope.getProducts = function () {

    rxSrvc.populateProductList().then(function (response) {
      $scope.products = response.data;
      console.log(response.data);
    });
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

  this.populateProductList = function () {
    return $http({
      method: 'GET',
      url: '/api/products'
    });
  };
});
'use strict';

angular.module('app').service('saveAddressSrvc', function ($http, $q) {

  var address = {};
  this.getAddress = function () {
    var defer = $q.defer();
    $http.get('/api/session').then(function (result) {
      address = result.data;
      defer.resolve(address);
    }).catch(function (err) {
      console.log(err);
    });
    return defer.promise;
  };

  this.logAddress = function (addressObj) {
    address = addressObj;
    $http.post('/api/session', { address: address }).then(function (result) {
      console.log(result);
    }).catch(function (err) {
      console.log(err);
    });
    // console.log(address);
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
