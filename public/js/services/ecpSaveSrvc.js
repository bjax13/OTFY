angular.module('app')
  .service('ecpSaveSrvc', function () {

    this.test = 'test success';

    let addresses = [];

    this.logAddress = function () {
      let addressObj = {
        ECPSearch: document.getElementById('autocomplete').value,
        streetNumber: document.getElementById('street_number').value,
        streetName: document.getElementById('route').value,
        city: document.getElementById('locality').value,
        country: document.getElementById('country').value,
        postalCode: document.getElementById('postal_code').value,
        state: document.getElementById('administrative_area_level_1').value,
      };



      if (addressObj.state && addressObj.streetNumber&& addressObj.streetName&& addressObj.city&& addressObj.country&& addressObj.postalCode) {
        addresses.push(addressObj);
        console.log(addresses);
      }else {
        alert('missing address field');
      }
    };



});
