'use strict';

(function () {

  var housingFeatures = document.querySelector('#housing-features');
  var features = document.querySelector('.notice').querySelector('.features');

  var mapFiltersId = ['filter-wifi', 'filter-dishwasher', 'filter-parking', 'filter-washer', 'filter-elevator', 'filter-conditioner'];

  var formFeaturesId = ['feature-wifi', 'feature-dishwasher', 'feature-parking', 'feature-washer', 'feature-elevator', 'feature-conditioner'];

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
    addEnterClick(mapFiltersId, housingFeatures);
  };

  var enterFormFeatures = function () {
    addEnterClick(formFeaturesId, features);
  };

  window.mapformKeydown = {
    enterMapFeatures: enterMapFeatures,
    enterFormFeatures: enterFormFeatures
  };

})();
