angular.module('app')
  .service('saveRxSrvc', function () {

    this.test = 'test success';

    let prescriptions = [];

    this.saveRx = function () {
      let rxObj = {
        rxSearch: document.getElementById('autocomplete').value,
        rightPower: document.getElementById('right-Power').value,
        rightBC: document.getElementById('right-BC').value,
        rightDIA: document.getElementById('right-DIA').value,
        rightCYL: document.getElementById('right-CYL').value,
        rightAxis: document.getElementById('right-Axis').value,
        leftPower: document.getElementById('left-Power').value,
        leftBC: document.getElementById('left-BC').value,
        leftDIA: document.getElementById('left-DIA').value,
        leftCYL: document.getElementById('left-CYL').value,
        leftAxis: document.getElementById('left-Axis').value,

      };



      if (rxObj.leftPower&& rxObj.leftBC&& rxObj.leftDIA&& rxObj.leftCYL&& rxObj.leftAxis&&     rxObj.rightPower&& rxObj.rightBC&& rxObj.rightDIA&& rxObj.rightCYL&& rxObj.rightAxis) {
        prescriptions.push(rxObj);
        console.log(prescriptions);
      }else {
        alert('missing prescription field');
      }
    };



});
