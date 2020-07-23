'use strict';

(function () {

  // Импорт функций из других модулей
  var renderCardBlock = window.mapCard.renderCardBlock;
  var hidePopup = window.mapCard.hidePopup;
  var hidePopupEscape = window.mapCard.hidePopupEscape;
  var removeMapPinsActiveClass = window.mapCard.removeMapPinsActiveClass;

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
    var mapPins = document.querySelector('.map__pins');
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < cardsArr.length; i++) {
      fragment.appendChild(createPinBlock(cardsArr[i]));
    }
    mapPins.appendChild(fragment);
  };

  var removeMapPinsWithoutMapPinMain = function () {
    var mapPins = document.querySelectorAll('.map__pin');
    mapPins.forEach(function (element) {
      if (!element.classList.contains('map__pin--main')) {
        element.remove();
      }
    });
  };

  var addMapPinCardWithEventListeners = function (cardsFiltred) {
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
    removeMapPinsWithoutMapPinMain: removeMapPinsWithoutMapPinMain,
    removeMapPinsActiveClass: removeMapPinsActiveClass,
    addMapPinCardWithEventListeners: addMapPinCardWithEventListeners
  };

})();
