'use strict';

// Константы
var AVATARS = ['img/avatars/user01.png', 'img/avatars/user02.png', 'img/avatars/user03.png', 'img/avatars/user04.png', 'img/avatars/user05.png', 'img/avatars/user06.png', 'img/avatars/user07.png', 'img/avatars/user08.png'];
var TITLES = ['Заголовок_1', 'Заголовок_2', 'Заголовок_3', 'Заголовок_4', 'Заголовок_5', 'Заголовок_6', 'Заголовок_7', 'Заголовок_8'];
var PRICES = [5000, 7000, 16000, 43000, 19000, 25000, 17000, 15000];
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var ROOMS = [1, 2, 3];
var GUESTS = [1, 2, 3];
var CHECKINS = ['12:00', '13:00', '14:00'];
var CHECKOUTS = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var DESCRIPTIONS = ['Описание_1', 'Описание_2', 'Описание_3', 'Описание_4', 'Описание_5', 'Описание_6', 'Описание_7', 'Описание_8'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

// Переменные
// Находим блок с картой и записываем в переменную
var map = document.querySelector('.map');
// Находим блок с метками и записываем в переменную
var mapPins = map.querySelector('.map__pins');

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
  var cards = [];
  for (var i = 0; i < cardsCount; i++) {
    cards.push(createCard(i));
  }
  return cards;
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
  cardElement.querySelector('.popup__type').textContent = offer.type;
  cardElement.querySelector('.popup__text--capacity').textContent = offer.rooms + ' комнаты для ' + offer.guests + ' гостей';
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

  var mapFilters = map.querySelector('.map__filters-container');
  mapFilters.before(fragment);
};

// Инструкции
// Переключаем карту из неактивного состояния в активное (убираем класс map--faded)
map.classList.remove('map--faded');
// Создаем карточки объектов
var cards = createCards(8);
// Рендерим метки на основании карточек объектов
renderPinBlocks(cards);
// Рендерим описание объекта на основнии первой карточки объекта
renderCardBlock(cards[0]);
