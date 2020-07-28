'use strict';

(function () {

  var typeSelect = document.querySelector('#type');
  var priceSelect = document.querySelector('#price');
  var timeinSelect = document.querySelector('#timein');
  var timeoutSelect = document.querySelector('#timeout');
  var roomNumberSelect = document.querySelector('#room_number');
  var capacitySelect = document.querySelector('#capacity');
  var capacityOptions = capacitySelect.querySelectorAll('option');

  var TYPEPRICE = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000,
  };

  var roomCapacityIndex = {
    '1': [0],
    '2': [0, 1],
    '3': [0, 1, 2],
    '100': [3]
  };

  var setMinValue = function (minValue) {
    priceSelect.setAttribute('min', minValue);
    priceSelect.setAttribute('placeholder', minValue);
  };

  var checkTypePrice = function () {
    setMinValue(TYPEPRICE[typeSelect.value]);
  };

  var checkTime = function (timeSelectA, timeSelectB) {
    timeSelectB.value = timeSelectA.value;
  };

  var checkTimeIn = function () {
    checkTime(timeinSelect, timeoutSelect);
  };

  var checkTimeOut = function () {
    checkTime(timeoutSelect, timeinSelect);
  };

  var checkRoom = function () {
    var room = roomNumberSelect.value;

    for (var a = 0; a < capacityOptions.length; a++) {
      capacityOptions[a].setAttribute('disabled', 'true');
    }

    for (var b = 0; b < roomCapacityIndex[room].length; b++) {
      capacityOptions[roomCapacityIndex[room][b]].removeAttribute('disabled', 'true');
    }
  };

  var addFormFilterEventListeners = function () {
    typeSelect.addEventListener('change', checkTypePrice);
    timeinSelect.addEventListener('change', checkTimeIn);
    timeoutSelect.addEventListener('change', checkTimeOut);
    roomNumberSelect.addEventListener('change', checkRoom);
  };

  var removeFormFilterEventListeners = function () {
    typeSelect.removeEventListener('change', checkTypePrice);
    timeinSelect.removeEventListener('change', checkTimeIn);
    timeoutSelect.removeEventListener('change', checkTimeOut);
    roomNumberSelect.removeEventListener('change', checkRoom);
  };

  window.formFilter = {
    addFormFilterEventListeners: addFormFilterEventListeners,
    removeFormFilterEventListeners: removeFormFilterEventListeners
  };

})();

