'use strict';

(function () {
  var AVATARS = window.data.AVATARS;
  var TITLES = window.data.TITLES;
  var PRICES = window.data.PRICES;
  var TYPES = window.data.TYPES;
  var TYPESRUS = window.data.TYPESRUS;
  var ROOMS = window.data.ROOMS;
  var GUESTS = window.data.GUESTS;
  var CHECKINS = window.data.CHECKINS;
  var CHECKOUTS = window.data.CHECKOUTS;
  var FEATURES = window.data.FEATURES;
  var DESCRIPTIONS = window.data.DESCRIPTIONS;
  var PHOTOS = window.data.PHOTOS;

  var map = window.data.map;
  // Функции
  var getRandomArr = window.data.getRandomArr;
  var getRandomInRange = window.data.getRandomInRange;
  var chooseSingularPlural = window.data.chooseSingularPlural;

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

  window.card = {
    createCards: createCards,
    renderCardBlock: renderCardBlock
  };
})();
