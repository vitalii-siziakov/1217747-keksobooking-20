'use strict';

(function () {

  var MAP_PIN_WIDTH = 50;
  var MAP_PIN_HEIGHT = 70;
  // смещение по X: ширина блока map__pin/2 (деление нужно, чтобы попадать центром указателя в точку)
  var MOVE_X = MAP_PIN_WIDTH / 2;
  // смещение по Y: высота блока map__pin
  var MOVE_Y = MAP_PIN_HEIGHT;

  var renderCardBlock = window.mapCard.renderCardBlock;
  var hidePopup = window.mapCard.hidePopup;
  var hidePopupEscape = window.mapCard.hidePopupEscape;
  var removeMapPinsActiveClass = window.mapCard.removeMapPinsActiveClass;
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var createPinBlock = function (card) {
    var pinElement = pinTemplate.cloneNode(true);
    var pinElementAvatar = pinElement.querySelector('img');

    pinElementAvatar.src = card.author.avatar;
    pinElementAvatar.alt = card.offer.title;
    pinElement.style.left = (card.location.x - MOVE_X) + 'px';
    pinElement.style.top = (card.location.y - MOVE_Y) + 'px';

    return pinElement;
  };

  // Функция: рендерит на карте метки
  var renderPinBlocks = function (cardsArr) {
    var mapPins = document.querySelector('.map__pins');
    var fragment = document.createDocumentFragment();
    cardsArr.forEach(function (card) {
      fragment.appendChild(createPinBlock(card));
    });
    mapPins.appendChild(fragment);
  };

  var removePinsWithoutMain = function () {
    var mapPins = document.querySelectorAll('.map__pin');
    mapPins.forEach(function (element) {
      if (!element.classList.contains('map__pin--main')) {
        element.remove();
      }
    });
  };

  var addPinCardWithEventListeners = function (cardsFiltred) {
    var mapPins = document.querySelectorAll('.map__pin');

    mapPins.forEach(function (mapPin, index) {
      if (index !== 0) {
        var mapPinActions = function () {
          if (document.querySelector('.popup')) {
            document.querySelector('.popup').remove();
          }
          renderCardBlock(cardsFiltred[index - 1]);

          document.querySelector('.popup__close').addEventListener('click', hidePopup);
          window.addEventListener('keydown', hidePopupEscape);
          removeMapPinsActiveClass();
          mapPin.classList.add('map__pin--active');
        };
        mapPin.addEventListener('click', mapPinActions);
      }
    });
  };

  window.mapPin = {
    renderPinBlocks: renderPinBlocks,
    removePinsWithoutMain: removePinsWithoutMain,
    addPinCardWithEventListeners: addPinCardWithEventListeners
  };

})();
