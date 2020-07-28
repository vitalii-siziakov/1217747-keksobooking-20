'use strict';

(function () {

  var housingFeatures = document.querySelector('#housing-features');
  var features = document.querySelector('.notice').querySelector('.features');

  var MAPFILTERSID = ['filter-wifi', 'filter-dishwasher', 'filter-parking', 'filter-washer', 'filter-elevator', 'filter-conditioner'];

  var FORMFEATURESID = ['feature-wifi', 'feature-dishwasher', 'feature-parking', 'feature-washer', 'feature-elevator', 'feature-conditioner'];

  var addEnterClick = function (arr, mainSelector) {
    arr.forEach(function (option) {
      var currentOption = mainSelector.querySelector('#' + option);

      currentOption.addEventListener('keydown', function (evt) {
        if (evt.key === 'Enter') {
          evt.preventDefault();
          mainSelector.querySelector('label[for="' + option + '"]').click();
        }
      });
    });
  };

  var enterMapFeatures = function () {
    addEnterClick(MAPFILTERSID, housingFeatures);
  };

  var enterFormFeatures = function () {
    addEnterClick(FORMFEATURESID, features);
  };

  window.mapformKeydown = {
    enterMapFeatures: enterMapFeatures,
    enterFormFeatures: enterFormFeatures
  };

})();
