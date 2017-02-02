angular.module('app')
	.controller('checkoutCtrl', function($scope, $http, ngCart, saveAddressSrvc) {
		saveAddressSrvc.getAddress().then(result=>{
			$scope.address = result.address;
			console.log(result);
		})
		$scope.test = 'again';

    ngCart.setTaxRate(7.5);
    ngCart.setShipping(2.99);


	});
