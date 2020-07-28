'use strict';

(function () {

  var ANY_SELECT_VALUE = 'any';
  var PRICE_SELECT_VALUES = {
    low: ['low', 10000],
    middle: ['middle', 10000, 50000],
    high: ['high', 50000]
  };

  var housingType = document.querySelector('#housing-type');
  var housingPrice = document.querySelector('#housing-price');
  var housingRooms = document.querySelector('#housing-rooms');
  var housingGuests = document.querySelector('#housing-guests');
  var housingFeatures = document.querySelector('#housing-features');

  var filterArr = function (arr, option, value, parseToInt) {
    var valueOption = value;

    if (parseToInt) {
      valueOption = parseInt(value, 10);
    }

    if (value !== ANY_SELECT_VALUE) {
      var arrFiltered = arr.filter(function (item) {
        return item.offer[option] === valueOption;
      });
    } else {
      arrFiltered = arr;
    }
    return arrFiltered;
  };

  var filterCheckbox = function (arr, option) {
    var arrFiltered = arr.filter(function (item) {
      return item.offer.features.includes(option) === true;
    });
    return arrFiltered;
  };


  var filterMapType = function (arr, option) {
    var type = housingType.value;
    var cardsFiltredArr = filterArr(arr, option, type, false);
    return cardsFiltredArr;
  };

  var filterMapPrice = function (arr) {
    var price = housingPrice.value;
    var cardsFiltredArr = [];

    if (price === PRICE_SELECT_VALUES.low[0]) {
      cardsFiltredArr = arr.filter(function (item) {
        return item.offer.price < PRICE_SELECT_VALUES.low[1];
      });
    } else if (price === PRICE_SELECT_VALUES.high[0]) {
      cardsFiltredArr = arr.filter(function (item) {
        return item.offer.price > PRICE_SELECT_VALUES.high[1];
      });
    } else if (price === PRICE_SELECT_VALUES.middle[0]) {
      cardsFiltredArr = arr.filter(function (item) {
        return item.offer.price >= PRICE_SELECT_VALUES.middle[1] && item.offer.price <= PRICE_SELECT_VALUES.middle[2];
      });
    } else {
      cardsFiltredArr = arr;
    }

    return cardsFiltredArr;
  };

  var filterMapRooms = function (arr, option) {
    var rooms = housingRooms.value;
    var cardsFiltredArr = filterArr(arr, option, rooms, true);
    return cardsFiltredArr;
  };

  var filterMapGuests = function (arr, option) {
    var guests = housingGuests.value;
    var cardsFiltredArr = filterArr(arr, option, guests, true);
    return cardsFiltredArr;
  };

  var filterMapFeature = function (arr, option) {
    var cardsFiltredArr = filterCheckbox(arr, option);
    return cardsFiltredArr;
  };

  var filterMapFeatures = function (arr) {
    var featuresList = housingFeatures.querySelectorAll('input[type=\'checkbox\']:checked');
    var cardsFiltredArr = arr;

    featuresList.forEach(function (feature) {
      cardsFiltredArr = filterMapFeature(cardsFiltredArr, feature.defaultValue);
    });

    return cardsFiltredArr;
  };

  var applyFilters = function (arr) {
    var typeArr = filterMapType(arr, 'type');
    var priceArr = filterMapPrice(typeArr, 'price');
    var roomsArr = filterMapRooms(priceArr, 'rooms');
    var guestsArr = filterMapGuests(roomsArr, 'guests');
    var featuresArr = filterMapFeatures(guestsArr, 'wifi');
    return featuresArr;
  };

  var resetFilters = function () {
    var housingFilters = document.querySelector('.map__filters').querySelectorAll('select');
    var housingFeaturesInput = housingFeatures.querySelectorAll('input');

    housingFilters.forEach(function (housingFilter) {
      housingFilter.value = ANY_SELECT_VALUE;
    });
    housingFeaturesInput.forEach(function (housingFeatureInput) {
      housingFeatureInput.checked = false;
    });
  };

  window.mapFilter = {
    applyFilters: applyFilters,
    resetFilters: resetFilters
  };

})();

