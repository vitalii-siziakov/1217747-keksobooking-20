'use strict';

(function () {

  var MAP_PIN_MAIN_WIDTH_HEIGHT = 65;
  var MAP_PIN_INDENT = Math.round(MAP_PIN_MAIN_WIDTH_HEIGHT / 2);
  var MAP_PIN_ARIA_LABEL_HEIGHT = 22;
  var MAIN_PIN_PADDING_Y = 2;
  var MAIN_PIN_MOVE_INACTIVE_X = MAP_PIN_INDENT;
  var MAIN_PIN_MOVE_INACTIVE_Y = MAP_PIN_INDENT - MAIN_PIN_PADDING_Y;
  var MAIN_PIN_MOVE_X = Math.round(MAP_PIN_MAIN_WIDTH_HEIGHT / 2);
  var MAIN_PIN_MOVE_Y = Math.round(MAP_PIN_MAIN_WIDTH_HEIGHT + MAP_PIN_ARIA_LABEL_HEIGHT - MAIN_PIN_PADDING_Y);
  var MAP_START_Y = 130;
  var MAP_END_Y = 630;
  var MAP_START_X = 0;
  var MAP_END_X = 1200;
  var MAP_PIN_START_X = MAP_START_X - MAP_PIN_INDENT;
  var MAP_PIN_END_X = MAP_END_X - MAP_PIN_INDENT;

  var map = document.querySelector('.map');
  var mapPinMain = map.querySelector('.map__pin--main');
  var addressInput = document.querySelector('#address');

  var showMapPinMainInactiveAddress = function () {
    addressInput.setAttribute('value', (mapPinMain.offsetLeft + MAIN_PIN_MOVE_INACTIVE_X) + ', ' + (mapPinMain.offsetTop - MAIN_PIN_MOVE_INACTIVE_Y));
  };

  var showMapPinMainActiveAddress = function () {
    addressInput.setAttribute('value', (mapPinMain.offsetLeft + MAIN_PIN_MOVE_X) + ', ' + (mapPinMain.offsetTop + MAIN_PIN_MOVE_Y));
  };

  var moveMapPinMain = function () {
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
          topY: MAP_START_Y,
          downY: MAP_END_Y,
          leftX: MAP_PIN_START_X,
          rightX: MAP_PIN_END_X
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
        showMapPinMainActiveAddress();

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

  window.mapPinMain = {
    showInactiveAddress: showMapPinMainInactiveAddress,
    showActiveAddress: showMapPinMainActiveAddress,
    move: moveMapPinMain
  };

})();
