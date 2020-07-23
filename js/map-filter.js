'use strict';

(function () {

  var getSelectValue = function (select) {
    var currentSelect = select;
    var value = currentSelect.value;
    return value;
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
    var type = getSelectValue(housingType);
    var cardsFiltredArr = [];

    if (type === 'palace') {
      cardsFiltredArr = filter(arr, option, 'palace');
    } else if (type === 'flat') {
      cardsFiltredArr = filter(arr, option, 'flat');
    } else if (type === 'house') {
      cardsFiltredArr = filter(arr, option, 'house');
    } else if (type === 'bungalo') {
      cardsFiltredArr = filter(arr, option, 'bungalo');
    } else {
      cardsFiltredArr = arr;
    }

    return cardsFiltredArr;
  };

  var filterMapPrice = function (arr) {
    var housingPrice = document.querySelector('#housing-price');
    var price = getSelectValue(housingPrice);
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

  var filterMapRooms = function (arr, option) {
    var housingRooms = document.querySelector('#housing-rooms');
    var rooms = getSelectValue(housingRooms);
    var cardsFiltredArr = [];

    if (rooms === '1') {
      cardsFiltredArr = filter(arr, option, 1);
    } else if (rooms === '2') {
      cardsFiltredArr = filter(arr, option, 2);
    } else if (rooms === '3') {
      cardsFiltredArr = filter(arr, option, 3);
    } else {
      cardsFiltredArr = arr;
    }

    return cardsFiltredArr;
  };

  var filterMapGuests = function (arr, option) {
    var housingGuests = document.querySelector('#housing-guests');
    var guests = getSelectValue(housingGuests);
    var cardsFiltredArr = [];

    if (guests === '0') {
      cardsFiltredArr = filter(arr, option, 0);
    } else if (guests === '1') {
      cardsFiltredArr = filter(arr, option, 1);
    } else if (guests === '2') {
      cardsFiltredArr = filter(arr, option, 2);
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
    var roomsArr = filterMapRooms(priceArr, 'rooms');
    var guestsArr = filterMapGuests(roomsArr, 'guests');
    var wifiArr = filterMapFeatures(guestsArr, 'wifi');
    return wifiArr;
  };

  window.mapFilter = {
    applyMapFilter: applyMapFilter
  };

})();

