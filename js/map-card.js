'use strict';

(function () {

  var TYPESRUS = {palace: 'Дворец', flat: 'Квартира', house: 'Дом', bungalo: 'Бунгало'};
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

  var map = document.querySelector('.map');

  // Функции
  var checkCardsArr = function (arr) {
    var checkedArr = [];
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].offer) {
        checkedArr.push(arr[i]);
      }
    }
    return checkedArr;
  };

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

    if (offer.photos.length === 0) {
      photos.style.display = 'none';
    } else {
      var photo = photos.querySelector('.popup__photo');
      createPhotoBlock(photos, photo, offer.photos);
    }

    return cardElement;
  };

  // Функция: рендерит блок описания объекта на странице
  var renderCardBlock = function (cardsArrItem) {

    var cardBlock = createCardBlock(cardsArrItem);
    var fragment = document.createDocumentFragment().appendChild(cardBlock);

    var mapFiltersContainer = map.querySelector('.map__filters-container');
    mapFiltersContainer.before(fragment);
  };

  var removeMapPinsActiveClass = function () {
    var mapPins = document.querySelectorAll('.map__pin');
    mapPins.forEach(function (mapPin) {
      if (mapPin.classList.contains('map__pin--active')) {
        mapPin.classList.remove('map__pin--active');
      }
      return mapPin;
    });
  };

  var removePopup = function () {
    if (document.querySelector('.popup')) {
      document.querySelector('.popup').remove();
      removeMapPinsActiveClass();
      window.removeEventListener('keydown', hidePopupEscape, {once: true});
    }
  };

  var hidePopup = function () {
    if (document.querySelector('.popup')) {
      document.querySelector('.popup').setAttribute('hidden', true);
      removeMapPinsActiveClass();
      window.removeEventListener('keydown', hidePopupEscape, {once: true});
    }
  };

  var hidePopupEscape = function (evt) {
    if (evt.key === 'Escape') {
      hidePopup();
      document.querySelector('.popup__close').removeEventListener('click', hidePopup, {once: true});
    }
  };

  window.mapCard = {
    checkCardsArr: checkCardsArr,
    renderCardBlock: renderCardBlock,
    removeMapPinsActiveClass: removeMapPinsActiveClass,
    hidePopup: hidePopup,
    hidePopupEscape: hidePopupEscape,
    removePopup: removePopup
  };
})();
