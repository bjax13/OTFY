angular.module('app')
  .service('rxSrvc', function () {

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

    this.getProducts = function () {
      return products;
    };





});
