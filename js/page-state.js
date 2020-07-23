'use strict';

(function () {

  // Импорт функций из других модулей
  var onLoadError = window.backend.onLoadError;
  var showMapPinMainInactiveAddress = window.mapPinMain.showMapPinMainInactiveAddress;
  var showMapPinMainActiveAddress = window.mapPinMain.showMapPinMainActiveAddress;

  var removeMapPinsWithoutMapPinMain = window.mapPin.removeMapPinsWithoutMapPinMain;
  var addMapPinCardWithEventListeners = window.mapPin.addMapPinCardWithEventListeners;
  var hidePopup = window.mapCard.hidePopup;
  var removePopup = window.mapCard.removePopup;
  var checkCardsArr = window.mapCard.checkCardsArr;
  var applyMapFilter = window.mapFilter.applyMapFilter;
  var renderPinBlocks = window.mapPin.renderPinBlocks;
  var addFormFilterEventListeners = window.formFilter.addFormFilterEventListeners;
  var removeFormFilterEventListeners = window.formFilter.removeFormFilterEventListeners;

  // Объявление переменных модуля
  var cards = [];
  var cardsFiltred = [];
  var maxShowPinsCount = 5;

  var addDisableAttribute = function (array) {
    for (var i = 0; i < array.length; i++) {
      var element = array[i];
      element.setAttribute('disabled', 'true');
    }
  };

  var removeDisableAttribute = function (array) {
    for (var i = 0; i < array.length; i++) {
      var element = array[i];
      element.removeAttribute('disabled');
    }
  };

  // Функция: нажатие ЛКМ на главный pin
  var onMousedownMapPinMain = function (evt) {
    if (evt.button === 0) {
      activatePage();
      var mapPinMain = document.querySelector('.map__pin--main');
      mapPinMain.removeEventListener('keydown', onKeydownMapPinMain, {once: true});
    }
  };

  // Функция: нажатие Enter при наведении на главный pin
  var onKeydownMapPinMain = function (evt) {
    if (evt.key === 'Enter') {
      activatePage();
      var mapPinMain = document.querySelector('.map__pin--main');
      mapPinMain.removeEventListener('mousedown', onMousedownMapPinMain, {once: true});
    }
  };

  // change map filter
  var changeMapFilter = window.debounce(function () {
    removeMapPinsWithoutMapPinMain();
    hidePopup();

    cardsFiltred = applyMapFilter(cards);
    var cardsFiltredSlice = cardsFiltred.slice(0, maxShowPinsCount);
    renderPinBlocks(cardsFiltredSlice);
    addMapPinCardWithEventListeners(cardsFiltredSlice);
  });

  var addMapFilterEventListeners = function () {
    var mapFilters = document.querySelector('.map__filters');
    mapFilters.addEventListener('change', changeMapFilter);
  };

  // deactivate page
  var deactivatePage = function () {

    var map = document.querySelector('.map');
    var mapPinMain = document.querySelector('.map__pin--main');

    var adForm = document.querySelector('.ad-form');
    var adFormFieldsets = adForm.querySelectorAll('fieldset');

    var mapFilters = document.querySelector('.map__filters');
    var mapFiltersFieldsets = mapFilters.querySelectorAll('fieldset');
    var mapFiltersSelectors = mapFilters.querySelectorAll('select');

    map.classList.add('map--faded');
    adForm.reset();
    adForm.classList.add('ad-form--disabled');
    addDisableAttribute(adFormFieldsets);
    addDisableAttribute(mapFiltersFieldsets);
    addDisableAttribute(mapFiltersSelectors);
    removeFormFilterEventListeners();

    removePopup();

    removeMapPinsWithoutMapPinMain();
    mapPinMain.setAttribute('style', 'left: 570px; top: 375px');
    showMapPinMainInactiveAddress();
    mapPinMain.addEventListener('mousedown', onMousedownMapPinMain, {once: true});
    mapPinMain.addEventListener('keydown', onKeydownMapPinMain, {once: true});

  };

  // activate page
  var activatePage = function () {
    var map = document.querySelector('.map');

    var adForm = document.querySelector('.ad-form');
    var adFormFieldsets = adForm.querySelectorAll('fieldset');

    var mapFilters = document.querySelector('.map__filters');
    var mapFiltersFieldsets = mapFilters.querySelectorAll('fieldset');
    var mapFiltersSelectors = mapFilters.querySelectorAll('select');

    map.classList.remove('map--faded');

    adForm.classList.remove('ad-form--disabled');
    removeDisableAttribute(adFormFieldsets);
    removeDisableAttribute(mapFiltersFieldsets);
    removeDisableAttribute(mapFiltersSelectors);
    addFormFilterEventListeners();

    window.backend.load(onLoadSuccess, onLoadError);
  };

  // activate page
  var onLoadSuccess = function (cardsArr) {
    cards = checkCardsArr(cardsArr);
    cardsFiltred = cards.slice(0, maxShowPinsCount);
    renderPinBlocks(cardsFiltred);
    addMapPinCardWithEventListeners(cardsFiltred);
    addMapFilterEventListeners();
    showMapPinMainActiveAddress();
  };

  window.pageState = {
    deactivatePage: deactivatePage,
    activatePage: activatePage,
  };

})();
