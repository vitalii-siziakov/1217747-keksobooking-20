'use strict';

// Находим блок с картой и записываем в переменную
var map = document.querySelector('.map');
// Переключаем карту из неактивного состояния в активное (убираем класс map--faded)
map.classList.remove('map--faded');
// Находим блок с метками и записываем в переменную
var mapPins = map.querySelector('.map__pins');

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

// Функция: возвращает число в интервале (включительно)
var getRandomInRange = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Функция: возвращает массив строк длиной не более переданного с уникальными значениями
var getRandomArr = function (arr) {
  var newArr = [];
  var newArrLenght = getRandomInRange(1, arr.length);

  for (var i = 0; i < newArrLenght; i++) {
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

// Создаем карточки объектов
var cards = createCards(8);
// Рендерим метки на основании карточек
renderPinBlocks(cards);
