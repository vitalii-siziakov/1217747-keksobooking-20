'use strict';

(function () {
  var load = function (onLoad, onError) {
    var URL = 'https://javascript.pages.academy/keksobooking/data';
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

  var save = function (data, onLoad, onError) {
    var URL = 'https://javascript.pages.academy/keksobooking';
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Ошибка: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.open('POST', URL);
    xhr.send(data);
  };

  // Функция: сообщение об ошибке
  var onError = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  var showSuccessMessage = function () {
    var main = document.querySelector('main');
    var success = document.querySelector('#success').content;
    var successMessage = success.cloneNode(true);
    main.appendChild(successMessage);
  };

  var showErrorMessage = function () {
    var main = document.querySelector('main');
    var error = document.querySelector('#error').content;
    var errorMessage = error.cloneNode(true);
    main.appendChild(errorMessage);
  };

  window.connect = {
    load: load,
    save: save,
    onError: onError,
    showSuccessMessage: showSuccessMessage,
    showErrorMessage: showErrorMessage
  };

})();
