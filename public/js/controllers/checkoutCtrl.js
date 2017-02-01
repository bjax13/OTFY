angular.module('app')
	.controller('checkoutCtrl', function($scope, $http, ngCart) {

		$scope.test = 'again';

    ngCart.setTaxRate(7.5);
    ngCart.setShipping(2.99);


	});
