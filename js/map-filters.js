'use strict';

(function () {
  var filter = function (arr, option, value) {
    var arrFiltered = arr.filter(function (item) {
      return item.offer[option] === value;
    });
    return arrFiltered;
  };

  var filterType = function (arr, option) {
    var housingType = document.querySelector('#housing-type');
    var type = window.data.getSelectValue(housingType);
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

  var filterPrice = function (arr) {
    var housingPrice = document.querySelector('#housing-price');
    var price = window.data.getSelectValue(housingPrice);
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

  var filterRooms = function (arr, option) {
    var housingRooms = document.querySelector('#housing-rooms');
    var rooms = window.data.getSelectValue(housingRooms);
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

  var filterGuests = function (arr, option) {
    var housingGuests = document.querySelector('#housing-guests');
    var guests = window.data.getSelectValue(housingGuests);
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

  var filterCheckbox = function (arr, option) {
    var arrFiltered = arr.filter(function (item) {
      return item.offer.features.includes(option) === true;
    });
    return arrFiltered;
  };

  var filterFeature = function (arr, option) {
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

  var filterFeatures = function (arr) {
    var housingFeatures = document.querySelector('#housing-features');
    var featuresList = housingFeatures.querySelectorAll('input[type=checkbox]');
    var cardsFiltredArr = arr;

    for (var i = 0; i < featuresList.length; i++) {
      cardsFiltredArr = filterFeature(cardsFiltredArr, featuresList[i].defaultValue);
    }

    return cardsFiltredArr;
  };

  window.mapFilters = {
    filterType: filterType,
    filterPrice: filterPrice,
    filterRooms: filterRooms,
    filterGuests: filterGuests,
    filterFeatures: filterFeatures
  };

})();

