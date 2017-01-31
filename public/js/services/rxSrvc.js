angular.module('app')
  .service('rxSrvc', function ($http) {

    this.test = 'k';

    let products = [
      {
      id : 1,
      manufacture : "Johnson & Johnson",
      price : 39,
      productName: 'TestProduct'
      },
      {
        id : 2,
        manufacture : "Alcon",
        price : 69,
        productName: 'TestProduct2'
      }
    ];

    let populateProductList = function () {
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
