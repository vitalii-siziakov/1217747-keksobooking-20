'use strict';

(function () {

  var TYPES_RUS = {palace: 'Дворец', flat: 'Квартира', house: 'Дом', bungalo: 'Бунгало'};
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var map = document.querySelector('.map');

  var checkCardsArr = function (arr) {
    var checkedArr = [];
    arr.forEach(function (elem) {
      if (elem.offer) {
        checkedArr.push(elem);
      }
    });
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
    allFeaturesArr.forEach(function (feature) {
      if (!cardFeaturesArr.includes(feature)) {
        featuresBlock.querySelector('.popup__feature--' + feature).remove();
      }
    });
  };

  var createPhotoBlock = function (photosBlock, photoBlock, cardPhotosArr) {
    cardPhotosArr.forEach(function (cardPhoto, i) {
      if (i === 0) {
        photoBlock.src = cardPhoto;
      } else {
        var photoBlockClone = photoBlock.cloneNode(true);
        photoBlockClone.src = cardPhoto;
        photosBlock.appendChild(photoBlockClone);
      }
    });
  };

  var createCardBlock = function (card) {
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

    if (author.avatar.length) {
      avatar.src = author.avatar;
    } else {
      avatar.style.display = 'none';
    }

    if (offer.title.length) {
      title.textContent = offer.title;
    } else {
      title.style.display = 'none';
    }

    if (offer.address.length) {
      address.textContent = offer.address;
    } else {
      address.style.display = 'none';
    }

    if (!offer.price.length) {
      price.innerHTML = offer.price + '&#x20bd;<span>/ночь</span>';
    } else {
      price.style.display = 'none';
    }

    if (offer.type.length) {
      type.textContent = TYPES_RUS[offer.type];
    } else {
      type.style.display = 'none';
    }

    if (!offer.rooms.length && !offer.guests.length) {
      capacity.textContent = offer.rooms + chooseSingularPlural(offer.rooms, ' комната для ', ' комнаты для ') + offer.guests + chooseSingularPlural(offer.guests, ' гостя', ' гостей');
    } else {
      capacity.style.display = 'none';
    }

    if (offer.checkin.length && offer.checkout.length) {
      time.textContent = 'Заезд после ' + offer.checkin + ', выезд до ' + offer.checkout;
    } else {
      time.style.display = 'none';
    }

    if (offer.description.length) {
      description.textContent = offer.description;
    } else {
      description.style.display = 'none';
    }

    if (offer.features.length) {
      removeExtraFeatures(features, FEATURES, offer.features);
    } else {
      features.style.display = 'none';
    }

    if (offer.photos.length) {
      var photo = photos.querySelector('.popup__photo');
      createPhotoBlock(photos, photo, offer.photos);
    } else {
      photos.style.display = 'none';
    }

    return cardElement;
  };

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
