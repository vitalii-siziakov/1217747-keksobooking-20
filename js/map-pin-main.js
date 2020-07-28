'use strict';

(function () {

  var map = document.querySelector('.map');
  var mapPinMain = map.querySelector('.map__pin--main');
  var mainPinMoveInactive = Math.round(65 / 2);
  var mainPinMoveX = Math.round(65 / 2);
  var mainPinMoveY = Math.round(62 + 22 - 2);
  var addressInput = document.querySelector('#address');

  var showMapPinMainInactiveAddress = function () {
    addressInput.setAttribute('value', (mapPinMain.offsetLeft + mainPinMoveInactive) + ' ' + (mapPinMain.offsetTop - mainPinMoveInactive));
  };

  var showMapPinMainActiveAddress = function () {
    addressInput.setAttribute('value', (mapPinMain.offsetLeft + mainPinMoveX) + ' ' + (mapPinMain.offsetTop + mainPinMoveY));
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
          topY: 130,
          downY: 630,
          leftX: 0 - 33,
          rightX: 1135 + 33
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
    showMapPinMainInactiveAddress: showMapPinMainInactiveAddress,
    showMapPinMainActiveAddress: showMapPinMainActiveAddress,
    moveMapPinMain: moveMapPinMain
  };

})();
