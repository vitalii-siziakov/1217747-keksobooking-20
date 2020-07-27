'use strict';

(function () {

  var enterMapFeatures = function () {
    var wifiMap = document.querySelector('#filter-wifi'); // input

    wifiMap.addEventListener('keydown', function (evt) {
      if (evt.key === 'Enter') {
        document.querySelector('#housing-features').querySelectorAll('.map__feature')[0].click(); // label
      }
    });

    var dishwasherMap = document.querySelector('#filter-dishwasher'); // input

    dishwasherMap.addEventListener('keydown', function (evt) {
      if (evt.key === 'Enter') {
        document.querySelector('#housing-features').querySelectorAll('.map__feature')[1].click(); // label
      }
    });

    var parkingMap = document.querySelector('#filter-parking'); // input

    parkingMap.addEventListener('keydown', function (evt) {
      if (evt.key === 'Enter') {
        document.querySelector('#housing-features').querySelectorAll('.map__feature')[2].click(); // label
      }
    });

    var washerMap = document.querySelector('#filter-washer'); // input

    washerMap.addEventListener('keydown', function (evt) {
      if (evt.key === 'Enter') {
        document.querySelector('#housing-features').querySelectorAll('.map__feature')[3].click(); // label
      }
    });

    var elevatorMap = document.querySelector('#filter-elevator'); // input

    elevatorMap.addEventListener('keydown', function (evt) {
      if (evt.key === 'Enter') {
        document.querySelector('#housing-features').querySelectorAll('.map__feature')[4].click(); // label
      }
    });

    var conditionerMap = document.querySelector('#filter-conditioner'); // input

    conditionerMap.addEventListener('keydown', function (evt) {
      if (evt.key === 'Enter') {
        document.querySelector('#housing-features').querySelectorAll('.map__feature')[5].click(); // label
      }
    });
  };

  var enterFormFeatures = function () {
    var wifiForm = document.querySelector('#feature-wifi'); // input

    wifiForm.addEventListener('keydown', function (evt) {
      if (evt.key === 'Enter') {
        evt.preventDefault();
        document.querySelector('.notice').querySelector('.features').querySelectorAll('.feature')[0].click(); // label
      }
    });

    var dishwasherForm = document.querySelector('#feature-dishwasher'); // input

    dishwasherForm.addEventListener('keydown', function (evt) {
      if (evt.key === 'Enter') {
        evt.preventDefault();
        document.querySelector('.notice').querySelector('.features').querySelectorAll('.feature')[1].click(); // label
      }
    });

    var parkingForm = document.querySelector('#feature-parking'); // input

    parkingForm.addEventListener('keydown', function (evt) {
      if (evt.key === 'Enter') {
        evt.preventDefault();
        document.querySelector('.notice').querySelector('.features').querySelectorAll('.feature')[2].click(); // label
      }
    });

    var washerForm = document.querySelector('#feature-washer'); // input

    washerForm.addEventListener('keydown', function (evt) {
      if (evt.key === 'Enter') {
        evt.preventDefault();
        document.querySelector('.notice').querySelector('.features').querySelectorAll('.feature')[3].click(); // label
      }
    });

    var elevatorForm = document.querySelector('#feature-elevator'); // input

    elevatorForm.addEventListener('keydown', function (evt) {
      if (evt.key === 'Enter') {
        evt.preventDefault();
        document.querySelector('.notice').querySelector('.features').querySelectorAll('.feature')[4].click(); // label
      }
    });

    var conditionerForm = document.querySelector('#feature-conditioner'); // input

    conditionerForm.addEventListener('keydown', function (evt) {
      if (evt.key === 'Enter') {
        evt.preventDefault();
        document.querySelector('.notice').querySelector('.features').querySelectorAll('.feature')[5].click(); // label
      }
    });
  };

  window.mapformKeydown = {
    enterMapFeatures: enterMapFeatures,
    enterFormFeatures: enterFormFeatures
  };

})();
