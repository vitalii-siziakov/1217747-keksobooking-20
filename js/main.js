'use strict';

(function () {

  window.pageState.deactivatePage();
  window.mapPinMain.moveMapPinMain();
  window.messageStateSent.addformSubmitResetEventListeners();
  window.mapformKeydown.enterMapFeatures();
  window.mapformKeydown.enterFormFeatures();
  var form = document.querySelector('.ad-form__submit');
  form.addEventListener('click', window.formValidation.addCheckValidEventListeners);

})();
