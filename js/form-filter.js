'use strict';

(function () {

  var typeSelect = document.querySelector('#type');
  var priceSelect = document.querySelector('#price');
  var timeinSelect = document.querySelector('#timein');
  var timeoutSelect = document.querySelector('#timeout');
  var roomNumberSelect = document.querySelector('#room_number');
  var capacitySelect = document.querySelector('#capacity');

  var getSelectValue = function (select) {
    var currentSelect = select;
    var value = currentSelect.value;
    return value;
  };

  var setMinValue = function (minValue) {
    priceSelect.setAttribute('min', minValue);
    priceSelect.setAttribute('placeholder', minValue);
  };

  var checkTypePrice = function () {
    var type = getSelectValue(typeSelect);

    if (type === 'flat') {
      setMinValue('1000');
    } else if (type === 'house') {
      setMinValue('5000');
    } else if (type === 'palace') {
      setMinValue('10000');
    } else {
      setMinValue('0');
    }
  };

  var checkTime = function (timeSelectA, timeSelectB) {
    var time = getSelectValue(timeSelectA);

    if (time === '12:00') {
      timeSelectB.value = '12:00';
    } else if (time === '13:00') {
      timeSelectB.value = '13:00';
    } else {
      timeSelectB.value = '14:00';
    }
  };

  var checkTimeIn = function () {
    checkTime(timeinSelect, timeoutSelect);
  };

  var checkTimeOut = function () {
    checkTime(timeoutSelect, timeinSelect);
  };

  var checkRoom = function () {
    var room = getSelectValue(roomNumberSelect);

    if (room === '1') {
      capacitySelect[0].removeAttribute('disabled', 'true');
      capacitySelect[1].setAttribute('disabled', 'true');
      capacitySelect.value[2].setAttribute('disabled', 'true');
      capacitySelect.value[3].setAttribute('disabled', 'true');
    } else if (room === '2') {
      capacitySelect[0].removeAttribute('disabled', 'true');
      capacitySelect[1].removeAttribute('disabled', 'true');
      capacitySelect[2].setAttribute('disabled', 'true');
      capacitySelect[3].setAttribute('disabled', 'true');
    } else if (room === '3') {
      capacitySelect[0].removeAttribute('disabled', 'true');
      capacitySelect[1].removeAttribute('disabled', 'true');
      capacitySelect[2].removeAttribute('disabled', 'true');
      capacitySelect[3].setAttribute('disabled', 'true');
    } else {
      capacitySelect[0].setAttribute('disabled', 'true');
      capacitySelect[1].setAttribute('disabled', 'true');
      capacitySelect[2].setAttribute('disabled', 'true');
      capacitySelect[3].removeAttribute('disabled', 'true');
    }
  };

  // var checkCapacity = function () {
  //   var capacity = getSelectValue(capacitySelect);

  //   if (capacity === '1') {
  //     roomNumberSelect[0].removeAttribute('disabled', 'true');
  //     roomNumberSelect[1].setAttribute('disabled', 'true');
  //     roomNumberSelect[2].setAttribute('disabled', 'true');
  //     roomNumberSelect[3].setAttribute('disabled', 'true');
  //   } else if (capacity === '2') {
  //     roomNumberSelect[0].removeAttribute('disabled', 'true');
  //     roomNumberSelect[1].removeAttribute('disabled', 'true');
  //     roomNumberSelect[2].setAttribute('disabled', 'true');
  //     roomNumberSelect[3].setAttribute('disabled', 'true');
  //   } else if (capacity === '3') {
  //     roomNumberSelect[0].removeAttribute('disabled', 'true');
  //     roomNumberSelect[1].removeAttribute('disabled', 'true');
  //     roomNumberSelect[2].removeAttribute('disabled', 'true');
  //     roomNumberSelect[3].setAttribute('disabled', 'true');
  //   } else {
  //     roomNumberSelect[0].setAttribute('disabled', 'true');
  //     roomNumberSelect[1].setAttribute('disabled', 'true');
  //     roomNumberSelect[2].setAttribute('disabled', 'true');
  //     roomNumberSelect[3].removeAttribute('disabled', 'false');
  //   }
  // };

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

