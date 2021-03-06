'use strict';

(function () {

  var MAX_SHOW_PINS_COUNT = 5;

  var load = window.backend.load;
  var onLoadError = window.backend.onLoadError;

  var showInactiveAddress = window.mapPinMain.showInactiveAddress;
  var showActiveAddress = window.mapPinMain.showActiveAddress;

  var removePinsWithoutMain = window.mapPin.removePinsWithoutMain;
  var addPinCardWithEventListeners = window.mapPin.addPinCardWithEventListeners;
  var renderPinBlocks = window.mapPin.renderPinBlocks;
  var hidePopup = window.mapCard.hidePopup;
  var removePopup = window.mapCard.removePopup;
  var checkCardsArr = window.mapCard.checkCardsArr;

  var addSelectorsEventListeners = window.formFilter.addSelectorsEventListeners;
  var removeSelectorsEventListeners = window.formFilter.removeSelectorsEventListeners;

  var addAvatarImage = window.formPhoto.addAvatarImage;
  var addHousingImages = window.formPhoto.addHousingImages;
  var removeAvatarImage = window.formPhoto.removeAvatarImage;
  var removeHousingImages = window.formPhoto.removeHousingImages;

  var removeCheckValidEventListeners = window.formValidation.removeCheckValidEventListeners;
  var addCheckValidEventListeners = window.formValidation.addCheckValidEventListeners;
  var resetFilters = window.mapFilter.resetFilters;

  var cards = [];
  var cardsFiltred = [];
  var map = document.querySelector('.map');

  var adForm = document.querySelector('.ad-form');
  var adFormFieldsets = adForm.querySelectorAll('fieldset');
  var adFormSubmit = adForm.querySelector('.ad-form__submit');

  var mapFilters = document.querySelector('.map__filters');
  var mapFiltersFieldsets = mapFilters.querySelectorAll('fieldset');
  var mapFiltersSelectors = mapFilters.querySelectorAll('select');
  var mapPinMain = document.querySelector('.map__pin--main');


  var addDisableAttribute = function (array) {
    array.forEach(function (element) {
      element.setAttribute('disabled', 'true');
    });
  };

  var removeDisableAttribute = function (array) {
    array.forEach(function (element) {
      element.removeAttribute('disabled');
    });
  };

  // Функция: нажатие ЛКМ на главный pin
  var onMousedownMapPinMain = function (evt) {
    if (evt.button === 0) {
      activatePage();
      mapPinMain.removeEventListener('keydown', onKeydownMapPinMain, {once: true});
    }
  };

  // Функция: нажатие Enter при наведении на главный pin
  var onKeydownMapPinMain = function (evt) {
    if (evt.key === 'Enter') {
      activatePage();
      mapPinMain.removeEventListener('mousedown', onMousedownMapPinMain, {once: true});
    }
  };

  // change map filter
  var changeMapFilter = window.debounce(function () {
    removePinsWithoutMain();
    hidePopup();

    cardsFiltred = window.mapFilter.applyFilters(cards);
    var cardsFiltredSlice = cardsFiltred.slice(0, MAX_SHOW_PINS_COUNT);
    renderPinBlocks(cardsFiltredSlice);
    addPinCardWithEventListeners(cardsFiltredSlice);
  });

  var addMapFilterEventListeners = function () {
    mapFilters.addEventListener('change', changeMapFilter);
  };

  // deactivate page
  var deactivatePage = function () {

    map.classList.add('map--faded');
    adForm.reset();
    adForm.classList.add('ad-form--disabled');
    adFormSubmit.removeEventListener('click', addCheckValidEventListeners);
    removeCheckValidEventListeners();
    resetFilters();
    addDisableAttribute(adFormFieldsets);
    addDisableAttribute(mapFiltersFieldsets);
    addDisableAttribute(mapFiltersSelectors);
    removeSelectorsEventListeners();
    removeAvatarImage();
    removeHousingImages();

    removePopup();
    removePinsWithoutMain();
    mapPinMain.setAttribute('style', 'left: 570px; top: 375px');
    showInactiveAddress();
    mapPinMain.addEventListener('mousedown', onMousedownMapPinMain, {once: true});
    mapPinMain.addEventListener('keydown', onKeydownMapPinMain, {once: true});

  };

  // activate page
  var activatePage = function () {

    map.classList.remove('map--faded');

    adForm.classList.remove('ad-form--disabled');
    adFormSubmit.addEventListener('click', addCheckValidEventListeners);
    removeDisableAttribute(adFormFieldsets);
    removeDisableAttribute(mapFiltersFieldsets);
    removeDisableAttribute(mapFiltersSelectors);
    addSelectorsEventListeners();
    addAvatarImage();
    addHousingImages();

    load(onLoadSuccess, onLoadError);
  };

  var onLoadSuccess = function (cardsArr) {
    cards = checkCardsArr(cardsArr);
    cardsFiltred = cards.slice(0, MAX_SHOW_PINS_COUNT);
    renderPinBlocks(cardsFiltred);
    addPinCardWithEventListeners(cardsFiltred);
    addMapFilterEventListeners();
    showActiveAddress();

  };

  window.pageState = {
    deactivatePage: deactivatePage,
    activatePage: activatePage,
  };

})();
