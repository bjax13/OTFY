angular.module('app')
  .service('rxSrvc', function ($http) {

    this.test = 'k';



    this.populateProductList = function () {
      return $http({
				method: 'GET',
				url: '/api/products'
			});
    };
  







});
