'use strict';

(function () {
  var load = function (onLoad, onError) {
    var URL = 'https://javascript.pages.academy/keksobooking/dat';
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Ошибка: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.open('GET', URL);
    xhr.send();
  };

  window.connect = {
    load: load,
  };

})();
