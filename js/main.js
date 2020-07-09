'use strict';

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

// Функция: создает карточку объекта
var createCard = function (arrIndex) {
  var x = getRandomInRange(0, 1200); // случайное число, координата x метки на карте (значение ограничено размерами блока, в котором перетаскивается метка (1200))
  var y = getRandomInRange(130, 630); // случайное число, координата y метки на карте от 130 до 630.
  var card = {
    author: {
      avatar: AVATARS[arrIndex] // строка, адрес изображения
    },
    offer: {
      title: TITLES[arrIndex], // строка, заголовок предложения
      address: x + ', ' + y, // строка, адрес предложения
      price: PRICES[arrIndex], // число, стоимость
      type: TYPES[getRandomInRange(0, TYPES.length - 1)], // строка с одним из четырёх фиксированных значений: palace, flat, house, bungalo
      rooms: ROOMS[getRandomInRange(0, ROOMS.length - 1)], // число, количество комнат
      guests: GUESTS[getRandomInRange(0, GUESTS.length - 1)], // число, количество гостей
      checkin: CHECKINS[getRandomInRange(0, CHECKINS.length - 1)], // строка: 12:00, 13:00, 14:00,
      checkout: CHECKOUTS[getRandomInRange(0, CHECKOUTS.length - 1)], // строка: 12:00, 13:00, 14:00
      features: getRandomArr(FEATURES), // массив строк случайной длины из ниже предложенных: "wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"
      description: DESCRIPTIONS[arrIndex], // строка с описанием
      photos: getRandomArr(PHOTOS), // массив строк случайной длины, содержащий адреса фотографий
    },
    location: {
      x: x, // координата x метки на карте
      y: y // координата y метки на карте
    }
  };
  return card;
};

// Функция: создает карточки объектов
var createCards = function (cardsCount) {
  var cardsArr = [];
  for (var i = 0; i < cardsCount; i++) {
    cardsArr.push(createCard(i));
  }
  return cardsArr;
};

// Функция: создает метку для карты
var createPinBlock = function (card) {
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var pinElement = pinTemplate.cloneNode(true);
  // смещение по X: ширина блока map__pin/2 (деление нужно, чтобы попадать центром указателя в точку)
  var moveX = 50 / 2;
  // смещение по Y: высота блока map__pin
  var moveY = 70;

  pinElement.querySelector('img').src = card.author.avatar;
  pinElement.querySelector('img').alt = card.offer.title;
  pinElement.style.left = (card.location.x - moveX) + 'px';
  pinElement.style.top = (card.location.y - moveY) + 'px';

  return pinElement;
};

// Функция: рендерит на карте метки
var renderPinBlocks = function (cardsArr) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < cardsArr.length; i++) {
    fragment.appendChild(createPinBlock(cardsArr[i]));
  }
  mapPins.appendChild(fragment);
};

// Функция: проверяет единственное или множественное число и возвращает соответствующее значение
var chooseSingularPlural = function (count, singular, plural) {
  if (count === 1) {
    return singular;
  } else {
    return plural;
  }
};

// Функция: удаляет несоответствующие объекту особенности из описания в карточке объекта
var removeExtraFeatures = function (featuresBlock, allFeaturesArr, cardFeaturesArr) {
  for (var i = 0; i < allFeaturesArr.length; i++) {
    if (!cardFeaturesArr.includes(allFeaturesArr[i])) {
      featuresBlock.querySelector('.popup__feature--' + allFeaturesArr[i]).remove();
    }
  }
};

// Функция: создает блок фото для описания в карточке объекта
var createPhotoBlock = function (photosBlock, photoBlock, cardPhotosArr) {
  for (var i = 0; i < cardPhotosArr.length; i++) {
    if (i === 0) {
      photoBlock.src = cardPhotosArr[i];
    } else {
      var photoBlockClone = photoBlock.cloneNode(true);
      photoBlockClone.src = cardPhotosArr[i];
      photosBlock.appendChild(photoBlockClone);
    }
  }
};

// Функция: создает описание для карточки объекта
var createCardBlock = function (card) {

  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var cardElement = cardTemplate.cloneNode(true);
  var author = card.author;
  var offer = card.offer;

  cardElement.querySelector('.popup__avatar').src = author.avatar;
  cardElement.querySelector('.popup__title').textContent = offer.title;
  cardElement.querySelector('.popup__text--address').textContent = offer.address;
  cardElement.querySelector('.popup__text--price').innerHTML = offer.price + '&#x20bd;<span>/ночь</span>';
  cardElement.querySelector('.popup__type').textContent = TYPESRUS[offer.type];
  cardElement.querySelector('.popup__text--capacity').textContent = offer.rooms + chooseSingularPlural(offer.rooms, ' комната для ', ' комнаты для ') + offer.guests + chooseSingularPlural(offer.guests, ' гостя', ' гостей');
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + offer.checkin + ', выезд до ' + offer.checkout;
  cardElement.querySelector('.popup__description').textContent = offer.description;

  // блок особенностей в описании
  var features = cardElement.querySelector('.popup__features');
  removeExtraFeatures(features, FEATURES, offer.features);

  // блок фото в описании
  var photos = cardElement.querySelector('.popup__photos');
  var photo = photos.querySelector('.popup__photo');
  createPhotoBlock(photos, photo, offer.photos);

  return cardElement;
};

// Функция: рендерит блок описания объекта на странице
var renderCardBlock = function (cardsArrItem) {

  var cardBlock = createCardBlock(cardsArrItem);
  var fragment = document.createDocumentFragment().appendChild(cardBlock);

  var mapFiltersContainer = map.querySelector('.map__filters-container');
  mapFiltersContainer.before(fragment);
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

// Функция: перевод странциы в активное состояние
var activatePage = function () {
  removeDisableAttribute(adFormFieldsets);
  removeDisableAttribute(mapFiltersFieldsets);
  removeDisableAttribute(mapFiltersSelectors);
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  addressInput.setAttribute('placeholder', mapPinMainActiveX + ' ' + mapPinMainActiveY);

  var cards = createCards(8);
  renderPinBlocks(cards);
  renderCardBlock(cards[0]);
};

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

// Инструкции
// Добавляем адрес
addressInput.setAttribute('value', mapPinMainInactiveX + ' ' + mapPinMainInactiveY);

// Делаем неактивными поля ввода форм
addDisableAttribute(adFormFieldsets);
addDisableAttribute(mapFiltersFieldsets);
addDisableAttribute(mapFiltersSelectors);

// Обработчики
// Клик ЛКП и нажатие Enter при наведении на главный pin
mapPinMain.addEventListener('mousedown', mousedownMapPinMain, {once: true});
mapPinMain.addEventListener('keydown', keydownMapPinMain, {once: true});

// Проверка значений select комнат и гостей при изменении их значений
roomNumberSelect.addEventListener('change', checkRoomCapacityCustom);
capacitySelect.addEventListener('change', checkRoomCapacityCustom);
