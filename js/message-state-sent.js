'use strict';

(function () {

  var deactivatePage = window.pageState.deactivatePage;
  var save = window.backend.save;

  // success
  var showSuccessMessage = function () {
    var main = document.querySelector('main');
    var success = document.querySelector('#success').content;
    var successMessage = success.cloneNode(true);
    main.appendChild(successMessage);
  };

  var showPageIfSuccess = function () {
    window.removeEventListener('click', showPageIfSuccessClick);
    window.removeEventListener('keydown', showPageIfSuccessEscape, {once: true});
    document.querySelector('main').querySelector('.success').remove();
  };


  var showPageIfSuccessEscape = function (evt) {
    if (evt.key === 'Escape') {
      showPageIfSuccess();
    }
  };

  var showPageIfSuccessClick = function (evt) {
    if (evt.target.matches('.success__message') === false) {
      showPageIfSuccess();
    }
  };

  var onSuccessDataSent = function () {
    showSuccessMessage();
    deactivatePage();
    window.formValidation.removeCheckValidEventListeners();
    window.addEventListener('click', showPageIfSuccessClick);
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
    window.removeEventListener('click', showPageIfErrorClick);
    window.removeEventListener('keydown', showPageIfErrorEscape, {once: true});
    document.querySelector('main').querySelector('.error').remove();
  };

  var showPageIfErrorClick = function (evt) {
    if (evt.target.matches('.error__message') === false) {
      showPageIfError();
    }
  };

  var showPageIfErrorEscape = function (evt) {
    if (evt.key === 'Escape') {
      showPageIfError();
    }
  };

  var onErrorDataSent = function () {
    showErrorMessage();

    window.addEventListener('click', showPageIfErrorClick);
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
