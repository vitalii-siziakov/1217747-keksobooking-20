'use strict';

(function () {

  var ROOMSVALUES = {
    '1': 1,
    '2': 2,
    '3': 3
  };

  var GUESTSVALUES = {
    '0': 0,
    '1': 1,
    '2': 2
  };

  var filter = function (arr, option, value) {
    var arrFiltered = arr.filter(function (item) {
      return item.offer[option] === value;
    });
    return arrFiltered;
  };

  var filterCheckbox = function (arr, option) {
    var arrFiltered = arr.filter(function (item) {
      return item.offer.features.includes(option) === true;
    });
    return arrFiltered;
  };

  var filterMapType = function (arr, option) {
    var housingType = document.querySelector('#housing-type');
    var type = housingType.value;
    var cardsFiltredArr = [];

    if (type !== 'any') {
      cardsFiltredArr = filter(arr, option, type);
    } else {
      cardsFiltredArr = arr;
    }
    return cardsFiltredArr;
  };

  var filterMapPrice = function (arr) {
    var housingPrice = document.querySelector('#housing-price');
    var price = housingPrice.value;
    var cardsFiltredArr = [];

    if (price === 'low') {
      cardsFiltredArr = arr.filter(function (item) {
        return item.offer.price < 10000;
      });
    } else if (price === 'high') {
      cardsFiltredArr = arr.filter(function (item) {
        return item.offer.price > 50000;
      });
    } else if (price === 'middle') {
      cardsFiltredArr = arr.filter(function (item) {
        return item.offer.price >= 10000 && item.offer.price <= 50000;
      });
    } else {
      cardsFiltredArr = arr;
    }

    return cardsFiltredArr;
  };

  var filterMapRooms = function (arr, option, values) {
    var housingRooms = document.querySelector('#housing-rooms');
    var rooms = housingRooms.value;
    var cardsFiltredArr = [];

    if (rooms !== 'any') {
      cardsFiltredArr = filter(arr, option, values[rooms]);
    } else {
      cardsFiltredArr = arr;
    }
    return cardsFiltredArr;
  };

  var filterMapGuests = function (arr, option, values) {
    var housingGuests = document.querySelector('#housing-guests');
    var guests = housingGuests.value;
    var cardsFiltredArr = [];

    if (guests !== 'any') {
      cardsFiltredArr = filter(arr, option, values[guests]);
    } else {
      cardsFiltredArr = arr;
    }
    return cardsFiltredArr;
  };

  var filterMapFeature = function (arr, option) {
    var housingFeatures = document.querySelector('#housing-features');
    var feature = housingFeatures.querySelector('#filter-' + option);
    var cardsFiltredArr = [];

    if (feature.checked === true) {
      cardsFiltredArr = filterCheckbox(arr, option);
    } else {
      cardsFiltredArr = arr;
    }

    return cardsFiltredArr;
  };

  var filterMapFeatures = function (arr) {
    var housingFeatures = document.querySelector('#housing-features');
    var featuresList = housingFeatures.querySelectorAll('input[type=checkbox]');
    var cardsFiltredArr = arr;

    for (var i = 0; i < featuresList.length; i++) {
      cardsFiltredArr = filterMapFeature(cardsFiltredArr, featuresList[i].defaultValue);
    }

    return cardsFiltredArr;
  };

  var applyMapFilter = function (arr) {
    var typeArr = filterMapType(arr, 'type');
    var priceArr = filterMapPrice(typeArr, 'price');
    var roomsArr = filterMapRooms(priceArr, 'rooms', ROOMSVALUES);
    var guestsArr = filterMapGuests(roomsArr, 'guests', GUESTSVALUES);
    var featuresArr = filterMapFeatures(guestsArr, 'wifi');
    return featuresArr;
  };

  var resetMapFilter = function () {
    var housingFilters = document.querySelector('.map__filters').querySelectorAll('select');
    var housingFeaturesInput = document.querySelector('#housing-features').querySelectorAll('input');

    housingFilters.forEach(function (housingFilter) {
      housingFilter.value = 'any';
    });
    housingFeaturesInput.forEach(function (housingFeatureInput) {
      housingFeatureInput.checked = false;
    });
  };

  window.mapFilter = {
    applyMapFilter: applyMapFilter,
    resetMapFilter: resetMapFilter
  };

})();

