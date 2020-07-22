'use strict';

(function () {

  var mapPins = window.data.mapPins;
  // смещение по X: ширина блока map__pin--main/2 (деление нужно, чтобы попадать центром указателя в точку), округление до целого по ТЗ
  var mainPinMoveX = Math.round(65 / 2);
  // смещение по Y: высота блока img + высота метки - отступ изображения и метки от map__pin--main, округление до целого по ТЗ
  var mainPinMoveY = Math.round(62 + 22 - 2);


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

  var showMapPinMainAddres = function () {
    var map = document.querySelector('.map');
    var mapPinMain = map.querySelector('.map__pin--main');
    var addressInput = document.querySelector('#address');
    addressInput.setAttribute('value', (mapPinMain.offsetLeft + mainPinMoveX) + ' ' + (mapPinMain.offsetTop + mainPinMoveY));
  };

  var moveMapPinMain = function () {
    var map = document.querySelector('.map');
    var mapPinMain = map.querySelector('.map__pin--main');

    mapPinMain.addEventListener('mousedown', function (evt) {
      evt.preventDefault();

      var startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };

      var dragged = false;

      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();

        dragged = true;

        var shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY
        };

        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        var block = {
          topY: 130,
          downY: 630,
          leftX: 0,
          rightX: 1135
        };

        if (mapPinMain.offsetTop - shift.y < block.topY) {
          mapPinMain.style.top = block.topY + 'px';
        } else if (mapPinMain.offsetTop - shift.y > block.downY) {
          mapPinMain.style.top = block.downY + 'px';
        } else {
          mapPinMain.style.top = (mapPinMain.offsetTop - shift.y) + 'px';
        }

        if (mapPinMain.offsetLeft - shift.x < block.leftX) {
          mapPinMain.style.left = block.leftX + 'px';
        } else if (mapPinMain.offsetLeft - shift.x > block.rightX) {
          mapPinMain.style.left = block.rightX + 'px';
        } else {
          mapPinMain.style.left = (mapPinMain.offsetLeft - shift.x) + 'px';
        }

        var addressInput = document.querySelector('#address');
        addressInput.setAttribute('value', (mapPinMain.offsetLeft - shift.x + mainPinMoveX) + ' ' + (mapPinMain.offsetTop - shift.y + mainPinMoveY));
      };

      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();

        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);

        if (dragged) {
          var onClickPreventDefault = function (clickEvt) {
            clickEvt.preventDefault();
            mapPinMain.removeEventListener('click', onClickPreventDefault);
          };
          mapPinMain.addEventListener('click', onClickPreventDefault);
        }
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });
  };

  window.pin = {
    renderPinBlocks: renderPinBlocks,
    moveMapPinMain: moveMapPinMain,
    showMapPinMainAddres: showMapPinMainAddres
  };
})();
