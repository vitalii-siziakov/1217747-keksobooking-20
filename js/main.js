'use strict';

(function () {
  var removeDisableAttribute = window.data.removeDisableAttribute;
  var adFormFieldsets = window.data.adFormFieldsets;
  var mapFiltersFieldsets = window.data.mapFiltersFieldsets;
  var mapFiltersSelectors = window.data.mapFiltersSelectors;
  var map = window.data.map;
  var adForm = window.data.adForm;
  var mapPinMain = window.data.mapPinMain;
  var addDisableAttribute = window.data.addDisableAttribute;
  var cards = [];
  var cardsFiltred = [];
  var maxViewPinCount = 5;

  var renderPinBlocks = window.pin.renderPinBlocks;
  var renderCardBlock = window.card.renderCardBlock;

  var hidePopup = function () {
    document.querySelector('.popup').setAttribute('hidden', true);
    window.removeEventListener('keydown', hidePopupEscape, {once: true});
  };

  var hidePopupEscape = function (evt) {
    if (evt.key === 'Escape') {
      hidePopup();
      document.querySelector('.popup__close').removeEventListener('click', hidePopup, {once: true});
    }
  };

  var removeMapPinsWithoutMain = function () {
    var mapPins = document.querySelectorAll('.map__pin');
    mapPins.forEach(function (element) {
      if (!element.classList.contains('map__pin--main')) {
        element.remove();
      }
    });
  };

  var addMapPinAndListeners = function () {
    var mapPins = document.querySelectorAll('.map__pin');

    mapPins.forEach(function (mapPin, index) {
      if (index !== 0) {
        var mapPinActions = function () {
          document.querySelector('.popup').remove();
          renderCardBlock(cardsFiltred[index - 1]);

          document.querySelector('.popup__close').addEventListener('click', hidePopup);
          window.addEventListener('keydown', hidePopupEscape);
        };
        mapPin.addEventListener('click', mapPinActions);
      }
    });
  };

  var applyFilterOptions = function (arr) {
    var typeArr = window.mapFilters.filterType(arr, 'type');
    var priceArr = window.mapFilters.filterPrice(typeArr, 'price');
    var roomsArr = window.mapFilters.filterRooms(priceArr, 'rooms');
    var guestsArr = window.mapFilters.filterGuests(roomsArr, 'guests');
    var wifiArr = window.mapFilters.filterFeatures(guestsArr, 'wifi');
    return wifiArr;
  };

  var changeFilterOptions = window.debounce(function () {
    removeMapPinsWithoutMain();
    hidePopup();

    cardsFiltred = applyFilterOptions(cards);
    var cardsFiltredSlice = cardsFiltred.slice(0, maxViewPinCount);
    renderPinBlocks(cardsFiltredSlice);
    addMapPinAndListeners();
    window.pin.showMapPinMainAddres();
  });


  var onLoad = function (cardsArr) {
    cards = cardsArr;
    cardsFiltred = cards.slice(0, maxViewPinCount);
    renderPinBlocks(cardsFiltred);
    renderCardBlock(cardsFiltred[0]);
    addMapPinAndListeners();
    document.querySelector('.popup__close').addEventListener('click', hidePopup);
    window.addEventListener('keydown', hidePopupEscape);
    window.pin.moveMapPinMain();
    window.pin.showMapPinMainAddres();
  };

  // Функция: перевод странциы в активное состояние
  var activatePage = function () {
    removeDisableAttribute(adFormFieldsets);
    removeDisableAttribute(mapFiltersFieldsets);
    removeDisableAttribute(mapFiltersSelectors);
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    window.connect.load(onLoad, window.connect.onError);
  };

  // Функция: нажатие ЛКМ на главный pin
  var mousedownMapPinMain = function (evt) {
    if (evt.button === 0) {
      activatePage();
      mapPinMain.removeEventListener('keydown', keydownMapPinMain, {once: true});
    }
  };

  // Функция: нажатие Enter при наведении на главный pin
  var keydownMapPinMain = function (evt) {
    if (evt.key === 'Enter') {
      activatePage();
      mapPinMain.removeEventListener('mousedown', mousedownMapPinMain, {once: true});
    }
  };

  // Добавляем адрес
  // Делаем неактивными поля ввода форм
  addDisableAttribute(adFormFieldsets);
  addDisableAttribute(mapFiltersFieldsets);
  addDisableAttribute(mapFiltersSelectors);

  // Клик ЛКП и нажатие Enter при наведении на главный pin
  mapPinMain.addEventListener('mousedown', mousedownMapPinMain, {once: true});
  mapPinMain.addEventListener('keydown', keydownMapPinMain, {once: true});

  var mapFilters = document.querySelector('.map__filters');
  mapFilters.addEventListener('change', changeFilterOptions);

  var form = document.querySelector('.ad-form');

  var onSuccess = function () {
    window.connect.showSuccessMessage();

    window.data.addDisableAttribute(window.data.adFormFieldsets);
    window.data.addDisableAttribute(window.data.mapFiltersFieldsets);
    window.data.addDisableAttribute(window.data.mapFiltersSelectors);
    document.querySelector('.map').classList.add('map--faded');
    document.querySelector('.ad-form').reset();
    document.querySelector('.ad-form').classList.add('ad-form--disabled');

    document.querySelector('.popup').remove();
    removeMapPinsWithoutMain();
    var mapPinMainCopy = mapPinMain.cloneNode(true);
    var mapPins = document.querySelector('.map__pins');
    mapPins.appendChild(mapPinMainCopy);
    mapPinMain.remove();
    mapPinMain.setAttribute('style', 'left: 570px; top: 375px');

    var resetPage = function () {
      var mapPinMainNewCopy = document.querySelector('.map__pin--main');
      mapPinMainNewCopy.setAttribute('style', 'left: 570px; top: 375px');
      document.querySelector('main').querySelector('.success').remove();
      mapPinMainNewCopy.addEventListener('mousedown', mousedownMapPinMain, {once: true});
      mapPinMainNewCopy.addEventListener('keydown', keydownMapPinMain, {once: true});
    };

    var resetPageEscape = function (evt) {
      if (evt.key === 'Escape') {
        resetPage();
      }
    };

    window.addEventListener('click', resetPage, {once: true});
    window.addEventListener('keydown', resetPageEscape, {once: true});
  };

  var onError = function () {
    window.connect.showErrorMessage();
    var errorButton = document.querySelector('main').querySelector('.error').querySelector('.error__button');

    var showPage = function () {
      document.querySelector('main').querySelector('.error').remove();
    };

    var showPageEscape = function (evt) {
      if (evt.key === 'Escape') {
        showPage();
      }
    };

    errorButton.addEventListener('click', showPage, {once: true});
    window.addEventListener('click', showPage, {once: true});
    window.addEventListener('keydown', showPageEscape, {once: true});
  };

  var submitHandler = function (evt) {
    window.connect.save(new FormData(form), onSuccess, onError);
    evt.preventDefault();
  };

  form.addEventListener('submit', submitHandler);
})();
