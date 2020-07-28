'use strict';

(function () {

  var TYPESRUS = {palace: 'Дворец', flat: 'Квартира', house: 'Дом', bungalo: 'Бунгало'};
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

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

  var removeExtraFeatures = function (featuresBlock, allFeaturesArr, cardFeaturesArr) {
    for (var i = 0; i < allFeaturesArr.length; i++) {
      if (!cardFeaturesArr.includes(allFeaturesArr[i])) {
        featuresBlock.querySelector('.popup__feature--' + allFeaturesArr[i]).remove();
      }
    }
  };

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

  var createCardBlock = function (card) {

    var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
    var cardElement = cardTemplate.cloneNode(true);
    var author = card.author;
    var offer = card.offer;

    var avatar = cardElement.querySelector('.popup__avatar');
    var title = cardElement.querySelector('.popup__title');
    var address = cardElement.querySelector('.popup__text--address');
    var price = cardElement.querySelector('.popup__text--price');
    var type = cardElement.querySelector('.popup__type');
    var capacity = cardElement.querySelector('.popup__text--capacity');
    var time = cardElement.querySelector('.popup__text--time');
    var description = cardElement.querySelector('.popup__description');
    var features = cardElement.querySelector('.popup__features');
    var photos = cardElement.querySelector('.popup__photos');

    if (author.avatar.length !== 0) {
      avatar.src = author.avatar;
    } else {
      avatar.style.display = 'none';
    }

    if (offer.title.length !== 0) {
      title.textContent = offer.title;
    } else {
      title.style.display = 'none';
    }

    if (offer.address.length !== 0) {
      address.textContent = offer.address;
    } else {
      address.style.display = 'none';
    }

    if (offer.price.length !== 0) {
      price.innerHTML = offer.price + '&#x20bd;<span>/ночь</span>';
    } else {
      price.style.display = 'none';
    }

    if (offer.type.length !== 0) {
      type.textContent = TYPESRUS[offer.type];
    } else {
      type.style.display = 'none';
    }

    if (offer.rooms.length !== 0 && offer.guests.length === 0) {
      capacity.textContent = offer.rooms + chooseSingularPlural(offer.rooms, ' комната для ', ' комнаты для ') + offer.guests + chooseSingularPlural(offer.guests, ' гостя', ' гостей');
    } else {
      capacity.style.display = 'none';
    }

    if (offer.checkin.length !== 0 && offer.checkout.length !== 0) {
      time.textContent = 'Заезд после ' + offer.checkin + ', выезд до ' + offer.checkout;
    } else {
      time.style.display = 'none';
    }

    if (offer.description.length !== 0) {
      description.textContent = offer.description;
    } else {
      description.style.display = 'none';
    }

    if (offer.features.length === 0) {
      features.style.display = 'none';
    } else {
      removeExtraFeatures(features, FEATURES, offer.features);
    }

    if (offer.photos.length === 0) {
      photos.style.display = 'none';
    } else {
      var photo = photos.querySelector('.popup__photo');
      createPhotoBlock(photos, photo, offer.photos);
    }

    return cardElement;
  };

  var renderCardBlock = function (cardsArrItem) {
    var map = document.querySelector('.map');
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
