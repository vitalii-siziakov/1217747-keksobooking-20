'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 500;

  window.debounce = function (argument) {
    var lastTimeout = null;

    return function () {
      var parameters = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        argument.apply(null, parameters);
      }, DEBOUNCE_INTERVAL);
    };
  };

})();
