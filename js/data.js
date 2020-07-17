'use strict';

(function () {
  // Константы
  var AVATARS = ['img/avatars/user01.png', 'img/avatars/user02.png', 'img/avatars/user03.png', 'img/avatars/user04.png', 'img/avatars/user05.png', 'img/avatars/user06.png', 'img/avatars/user07.png', 'img/avatars/user08.png'];
  var TITLES = ['Заголовок_1', 'Заголовок_2', 'Заголовок_3', 'Заголовок_4', 'Заголовок_5', 'Заголовок_6', 'Заголовок_7', 'Заголовок_8'];
  var PRICES = [5000, 7000, 16000, 43000, 19000, 25000, 17000, 15000];
  var TYPES = ['palace', 'flat', 'house', 'bungalo'];
  var TYPESRUS = {palace: 'Дворец', flat: 'Квартира', house: 'Дом', bungalo: 'Бунгало'};
  var ROOMS = [1, 2, 3];
  var GUESTS = [1, 2, 3];
  var CHECKINS = ['12:00', '13:00', '14:00'];
  var CHECKOUTS = ['12:00', '13:00', '14:00'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var DESCRIPTIONS = ['Описание_1', 'Описание_2', 'Описание_3', 'Описание_4', 'Описание_5', 'Описание_6', 'Описание_7', 'Описание_8'];
  var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

  // Переменные
  var mapPinMain = document.querySelector('.map__pin--main');
  var mapPinMainInactiveX = parseInt(mapPinMain.style.left, 10);
  var mapPinMainInactiveY = parseInt(mapPinMain.style.top, 10);
  // смещение по X: ширина блока map__pin--main/2 (деление нужно, чтобы попадать центром указателя в точку), округление до целого по ТЗ
  var mainPinMoveX = Math.round(65 / 2);
  // смещение по Y: высота блока img + высота метки - отступ изображения и метки от map__pin--main, округление до целого по ТЗ
  var mainPinMoveY = Math.round(62 + 22 - 2);

  var mapPinMainActiveX = mapPinMainInactiveX + mainPinMoveX;
  var mapPinMainActiveY = mapPinMainInactiveY + mainPinMoveY;

  var map = document.querySelector('.map');
  var mapPins = map.querySelector('.map__pins');

  var adForm = document.querySelector('.ad-form');
  var adFormFieldsets = adForm.querySelectorAll('fieldset');

  var addressInput = adForm.querySelector('#address');

  var mapFilters = document.querySelector('.map__filters');
  var mapFiltersFieldsets = mapFilters.querySelectorAll('fieldset');
  var mapFiltersSelectors = mapFilters.querySelectorAll('select');

  var roomNumberSelect = document.querySelector('#room_number');
  var capacitySelect = document.querySelector('#capacity');

  // Функции
  // Функция: возвращает число в интервале (включительно)
  var getRandomInRange = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  // Функция: возвращает массив строк длиной не более переданного с уникальными значениями
  var getRandomArr = function (arr) {
    var newArr = [];
    var newArrLength = getRandomInRange(1, arr.length);

    for (var i = 0; i < newArrLength; i++) {
      var newArrItem = arr[getRandomInRange(0, arr.length - 1)];
      if (newArr.includes(newArrItem)) {
        i--;
      } else {
        newArr.push(newArrItem);
      }
    }
    return newArr;
  };

  // Функция: проверяет единственное или множественное число и возвращает соответствующее значение
  var chooseSingularPlural = function (count, singular, plural) {
    if (count === 1) {
      return singular;
    } else {
      return plural;
    }
  };

  // Функция: получение значения select
  var getSelectValue = function (select) {
    var currentSelect = select;
    var value = currentSelect.value;
    return value;
  };

  // Функция: добавление элементам DOM атрибута disable
  var addDisableAttribute = function (array) {
    for (var i = 0; i < array.length; i++) {
      var element = array[i];
      element.setAttribute('disabled', 'true');
    }
  };

  // Функция: удаление у элементов DOM атрибута disable
  var removeDisableAttribute = function (array) {
    for (var i = 0; i < array.length; i++) {
      var element = array[i];
      element.removeAttribute('disabled');
    }
  };

  window.data = {
    AVATARS: AVATARS,
    TITLES: TITLES,
    PRICES: PRICES,
    TYPES: TYPES,
    TYPESRUS: TYPESRUS,
    ROOMS: ROOMS,
    GUESTS: GUESTS,
    CHECKINS: CHECKINS,
    CHECKOUTS: CHECKOUTS,
    FEATURES: FEATURES,
    DESCRIPTIONS: DESCRIPTIONS,
    PHOTOS: PHOTOS,
    mapPinMain: mapPinMain,
    mapPinMainInactiveX: mapPinMainInactiveX,
    mapPinMainInactiveY: mapPinMainInactiveY,
    mainPinMoveX: mainPinMoveX,
    mainPinMoveY: mainPinMoveY,
    mapPinMainActiveX: mapPinMainActiveX,
    mapPinMainActiveY: mapPinMainActiveY,
    map: map,
    mapPins: mapPins,
    adForm: adForm,
    adFormFieldsets: adFormFieldsets,
    addressInput: addressInput,
    mapFilters: mapFilters,
    mapFiltersFieldsets: mapFiltersFieldsets,
    mapFiltersSelectors: mapFiltersSelectors,
    roomNumberSelect: roomNumberSelect,
    capacitySelect: capacitySelect,
    getRandomInRange: getRandomInRange,
    getRandomArr: getRandomArr,
    chooseSingularPlural: chooseSingularPlural,
    getSelectValue: getSelectValue,
    addDisableAttribute: addDisableAttribute,
    removeDisableAttribute: removeDisableAttribute
  };
})();
