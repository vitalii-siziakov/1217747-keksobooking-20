'use strict';

(function () {

  // Импорт функций из других модулей
  var deactivatePage = window.pageState.deactivatePage;
  var save = window.backend.save;

  var showSuccessMessage = function () {
    var main = document.querySelector('main');
    var success = document.querySelector('#success').content;
    var successMessage = success.cloneNode(true);
    main.appendChild(successMessage);
  };

  var showPageIfSuccess = function () {
    document.querySelector('main').querySelector('.success').remove();
    window.removeEventListener('keydown', showPageIfSuccessEscape, {once: true});
  };

  var showPageIfSuccessEscape = function (evt) {
    if (evt.key === 'Escape') {
      showPageIfSuccess();
      window.removeEventListener('click', showPageIfSuccess, {once: true});
    }
  };

  var onSuccessDataSent = function () {
    showSuccessMessage();
    deactivatePage();
    window.addEventListener('click', showPageIfSuccess, {once: true});
    window.addEventListener('keydown', showPageIfSuccessEscape, {once: true});
  };

  // error

  var showErrorMessage = function () {
    var main = document.querySelector('main');
    var error = document.querySelector('#error').content;
    var errorMessage = error.cloneNode(true);
    main.appendChild(errorMessage);
  };

  var showPageIfError = function () {
    document.querySelector('main').querySelector('.error').remove();
    window.removeEventListener('keydown', showPageIfErrorEscape, {once: true});
  };

  var showPageIfErrorEscape = function (evt) {
    if (evt.key === 'Escape') {
      showPageIfError();
      window.removeEventListener('click', showPageIfError, {once: true});
    }
  };

  var onErrorDataSent = function () {
    showErrorMessage();

    window.addEventListener('click', showPageIfError, {once: true});
    window.addEventListener('keydown', showPageIfErrorEscape, {once: true});
  };

  // reset button
  var onResetButton = function () {
    var adFormReset = document.querySelector('.ad-form__reset');
    adFormReset.addEventListener('click', deactivatePage);
  };

  // add reset submit
  var addformSubmitResetEventListeners = function () {
    var form = document.querySelector('.ad-form');
    var submitHandler = function (evt) {
      save(new FormData(form), onSuccessDataSent, onErrorDataSent);
      evt.preventDefault();
    };

    form.addEventListener('reset', onResetButton);
    form.addEventListener('submit', submitHandler);
  };

  window.messageStateSent = {
    onSuccessDataSent: onSuccessDataSent,
    onErrorDataSent: onErrorDataSent,
    onResetButton: onResetButton,
    addformSubmitResetEventListeners: addformSubmitResetEventListeners
  };

})();
