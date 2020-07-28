'use strict';

(function () {

  var ROOM_CAPACITY_VALID = {
    '1': ['1'],
    '2': ['1', '2'],
    '3': ['1', '2', '3'],
    '100': ['0']
  };

  var adFormSubmit = document.querySelector('.ad-form__submit');
  var roomNumberSelect = document.querySelector('#room_number');
  var capacitySelect = document.querySelector('#capacity');
  var priceInputSelect = document.querySelector('#price');
  var titleInputSelect = document.querySelector('#title');

  var disableAdFormSubmit = function () {
    adFormSubmit.disabled = true;
  };

  var enableAdFormSubmit = function () {
    adFormSubmit.disabled = false;
  };

  var addElementRedBorder = function (element) {
    element.setAttribute('style', 'border-style: solid; border-width: 2px; border-color: red');
    disableAdFormSubmit();
  };

  var removeElementRedBorder = function (element) {
    element.removeAttribute('style', 'border-style: solid; border-width: 2px; border-color: red');
    enableAdFormSubmit();
  };

  var checkPriceValid = function () {
    if (priceInputSelect.validity.valueMissing || priceInputSelect.validity.rangeUnderflow || priceInputSelect.validity.rangeOverflow) {
      addElementRedBorder(priceInputSelect);
    } else {
      removeElementRedBorder(priceInputSelect);
    }
  };

  var checkTitleValid = function () {
    if (titleInputSelect.validity.valueMissing || titleInputSelect.validity.tooShort || titleInputSelect.validity.tooLong) {
      addElementRedBorder(titleInputSelect);
    } else {
      removeElementRedBorder(titleInputSelect);
    }
  };

  var checkCapacityValid = function () {
    var room = roomNumberSelect.value;
    var capacity = capacitySelect.value;

    if (ROOM_CAPACITY_VALID[room].includes(capacity)) {
      removeElementRedBorder(capacitySelect);
    } else {
      addElementRedBorder(capacitySelect);
    }
  };

  var addCheckValidEventListeners = function () {
    checkTitleValid();
    checkPriceValid();
    checkCapacityValid();
    priceInputSelect.addEventListener('change', checkPriceValid);
    titleInputSelect.addEventListener('change', checkTitleValid);
    roomNumberSelect.addEventListener('change', checkCapacityValid);
    capacitySelect.addEventListener('change', checkCapacityValid);
  };

  var removeCheckValidEventListeners = function () {
    priceInputSelect.removeEventListener('change', checkPriceValid);
    titleInputSelect.removeEventListener('change', checkTitleValid);
    roomNumberSelect.removeEventListener('change', checkCapacityValid);
    capacitySelect.removeEventListener('change', checkCapacityValid);
    removeElementRedBorder(priceInputSelect);
    removeElementRedBorder(document.querySelector('#title'));
    removeElementRedBorder(roomNumberSelect);
    removeElementRedBorder(capacitySelect);
  };

  window.formValidation = {
    addCheckValidEventListeners: addCheckValidEventListeners,
    removeCheckValidEventListeners: removeCheckValidEventListeners
  };

})();
