angular.module('app')
  .service('saveAddressSrvc', function ($http, $q) {

    let address = {};
    this.getAddress = function(){
      let defer = $q.defer();
       $http.get('/api/session').then(result=>{
        address = result.data;
        defer.resolve(address);
      })
      .catch(err=>{
        console.log(err);
      })
      return defer.promise;
    }

    this.logAddress = function (addressObj) {
      address = addressObj;
      $http.post('/api/session', {address})
      .then(result => {
        console.log(result);
      })
      .catch(err => {
        console.log(err);
      })
      // console.log(address);
    };



});
