'use strict';

(function () {
  var getSelectValue = window.data.getSelectValue;
  var roomNumberSelect = window.data.roomNumberSelect;
  var capacitySelect = window.data.capacitySelect;

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

  window.form = {
    checkRoomCapacityCustom: checkRoomCapacityCustom
  };
})();
