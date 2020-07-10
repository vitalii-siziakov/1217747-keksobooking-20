'use strict';

(function () {

  var mapPins = window.data.mapPins;

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

  window.pin = {
    renderPinBlocks: renderPinBlocks
  };
})();
