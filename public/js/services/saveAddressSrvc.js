angular.module('app')
  .service('saveAddressSrvc', function () {

    this.logAddress = function () {
      let addressObj = {
        addressSearch: document.getElementById('autocomplete').value,
        streetNumber: document.getElementById('street_number').value,
        streetName: document.getElementById('route').value,
        city: document.getElementById('locality').value,
        country: document.getElementById('country').value,
        postalCode: document.getElementById('postal_code').value,
        state: document.getElementById('administrative_area_level_1').value,
      };

      console.log(addressObj);
    };




});
