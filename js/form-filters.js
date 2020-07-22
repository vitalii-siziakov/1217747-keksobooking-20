'use strict';

(function () {
  var getSelectValue = window.data.getSelectValue;
  var roomNumberSelect = document.querySelector('#room_number');
  var capacitySelect = document.querySelector('#capacity');
  var typeSelect = document.querySelector('#type');
  var priceSelect = document.querySelector('#price');
  var timeinSelect = document.querySelector('#timein');
  var timeoutSelect = document.querySelector('#timeout');

  // Функция: проверка соответстивия количества мест количеству гостей (и наоборот)
  var checkRoomCapacityCustom = function () {
    var room = getSelectValue(roomNumberSelect);
    var capacity = getSelectValue(capacitySelect);
    var formSubmit = document.querySelector('.ad-form__submit');

    if (room === '100' && capacity === '0') {
      capacitySelect.setCustomValidity('');
      roomNumberSelect.setCustomValidity('');
      formSubmit.disabled = false;
    } else if (room !== capacity) {
      capacitySelect.setCustomValidity('Количество гостей не соответствует количеству мест');
      roomNumberSelect.setCustomValidity('Количество мест не соответствует количеству гостей');
      formSubmit.disabled = true;
    } else {
      capacitySelect.setCustomValidity('');
      roomNumberSelect.setCustomValidity('');
      formSubmit.disabled = false;
    }
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

  // Обработчики событий: проверка значений select
  roomNumberSelect.addEventListener('change', checkRoomCapacityCustom);
  capacitySelect.addEventListener('change', checkRoomCapacityCustom);
  typeSelect.addEventListener('change', checkTypePrice);
  timeinSelect.addEventListener('change', checkTimeIn);
  timeoutSelect.addEventListener('change', checkTimeOut);
})();
