'use strict';

(function () {

  var getSelectValue = function (select) {
    var currentSelect = select;
    var value = currentSelect.value;
    return value;
  };

  var disableAdFormSubmit = function () {
    var adFormSubmit = document.querySelector('.ad-form__submit');
    adFormSubmit.disabled = true;
  };

  var enableAdFormSubmit = function () {
    var adFormSubmit = document.querySelector('.ad-form__submit');
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
    var priceInputSelect = document.querySelector('#price');
    if (priceInputSelect.validity.valueMissing || priceInputSelect.validity.rangeUnderflow || priceInputSelect.validity.rangeOverflow) {
      addElementRedBorder(priceInputSelect);
    } else {
      removeElementRedBorder(priceInputSelect);
    }
  };

  var checkTitleValid = function () {
    var titleInputSelect = document.querySelector('#title');
    if (titleInputSelect.validity.valueMissing || titleInputSelect.validity.tooShort || titleInputSelect.validity.tooLong) {
      addElementRedBorder(titleInputSelect);
    } else {
      removeElementRedBorder(titleInputSelect);
    }
  };

  var checkCapacityValid = function () {
    var roomNumberSelect = document.querySelector('#room_number');
    var capacitySelect = document.querySelector('#capacity');
    var room = getSelectValue(roomNumberSelect);
    var capacity = getSelectValue(capacitySelect);

    if (room === '1' && capacity === '1' ||
    room === '2' && capacity === '1' ||
    room === '2' && capacity === '2' ||
    room === '3' && capacity === '1' ||
    room === '3' && capacity === '2' ||
    room === '3' && capacity === '3' ||
    room === '100' && capacity === '0') {
      removeElementRedBorder(capacitySelect);
    } else {
      addElementRedBorder(capacitySelect);
    }
  };

  var addCheckValidEventListeners = function () {
    checkTitleValid();
    checkPriceValid();
    checkCapacityValid();
    document.querySelector('#price').addEventListener('change', checkPriceValid);
    document.querySelector('#title').addEventListener('change', checkTitleValid);
    document.querySelector('#room_number').addEventListener('change', checkCapacityValid);
    document.querySelector('#capacity').addEventListener('change', checkCapacityValid);
  };

  var removeCheckValidEventListeners = function () {
    document.querySelector('#price').removeEventListener('change', checkPriceValid);
    document.querySelector('#title').removeEventListener('change', checkTitleValid);
    document.querySelector('#room_number').removeEventListener('change', checkCapacityValid);
    document.querySelector('#capacity').removeEventListener('change', checkCapacityValid);
  };

  window.formValidation = {
    addCheckValidEventListeners: addCheckValidEventListeners,
    removeCheckValidEventListeners: removeCheckValidEventListeners
  };

})();
