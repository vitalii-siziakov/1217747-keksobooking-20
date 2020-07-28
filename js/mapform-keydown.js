'use strict';

(function () {

  var MAP_FILTERS_ID = ['filter-wifi', 'filter-dishwasher', 'filter-parking', 'filter-washer', 'filter-elevator', 'filter-conditioner'];

  var FORM_FEATURES_ID = ['feature-wifi', 'feature-dishwasher', 'feature-parking', 'feature-washer', 'feature-elevator', 'feature-conditioner'];

  var housingFeatures = document.querySelector('#housing-features');
  var features = document.querySelector('.notice').querySelector('.features');

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
    addEnterClick(MAP_FILTERS_ID, housingFeatures);
  };

  var enterFormFeatures = function () {
    addEnterClick(FORM_FEATURES_ID, features);
  };

  window.mapformKeydown = {
    enterMapFeatures: enterMapFeatures,
    enterFormFeatures: enterFormFeatures
  };

})();
