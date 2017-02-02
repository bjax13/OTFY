angular.module('app')
	.controller('addressInputCtrl', function($scope, addressAutoFillSrvc, saveAddressSrvc) {
		$scope.test = addressAutoFillSrvc.test;


		$scope.logAddress = () => {
			let addressObj = {
				addressSearch: document.getElementById('autocomplete').value,
				streetNumber: document.getElementById('street_number').value,
				streetName: document.getElementById('route').value,
				city: document.getElementById('locality').value,
				country: document.getElementById('country').value,
				postalCode: document.getElementById('postal_code').value,
				state: document.getElementById('administrative_area_level_1').value,
			}
			if (addressObj.state && addressObj.streetNumber && addressObj.streetName && addressObj.city && addressObj.country && addressObj.postalCode) {
				saveAddressSrvc.logAddress(addressObj);
			} else {
				alert('missing address field');
			}
		};


		$scope.initialize = addressAutoFillSrvc.initialize;

		$scope.geolocate = addressAutoFillSrvc.geolocate;

	});
