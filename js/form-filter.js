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

    capacityOptions.forEach(function (capacityOption) {
      capacityOption.setAttribute('disabled', 'true');
    });

    roomCapacityIndex[room].forEach(function (capacityOption) {
      capacityOptions[capacityOption].removeAttribute('disabled', 'true');
    });
  };

  var addSelectorsEventListeners = function () {
    typeSelect.addEventListener('change', checkTypePrice);
    timeinSelect.addEventListener('change', checkTimeIn);
    timeoutSelect.addEventListener('change', checkTimeOut);
    roomNumberSelect.addEventListener('change', checkRoom);
  };

  var removeSelectorsEventListeners = function () {
    typeSelect.removeEventListener('change', checkTypePrice);
    timeinSelect.removeEventListener('change', checkTimeIn);
    timeoutSelect.removeEventListener('change', checkTimeOut);
    roomNumberSelect.removeEventListener('change', checkRoom);
  };

  window.formFilter = {
    addSelectorsEventListeners: addSelectorsEventListeners,
    removeSelectorsEventListeners: removeSelectorsEventListeners
  };

})();

