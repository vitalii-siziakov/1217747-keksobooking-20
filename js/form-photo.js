'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var fileChooserHousing = document.querySelector('.ad-form__upload input[type=file]');
  var previewHousing = document.querySelector('.ad-form__photo');

  var fileChooserAvatar = document.querySelector('.ad-form__field input[type=file]');
  var previewAvatar = document.querySelector('.ad-form-header__preview').querySelector('img');

  var addPhoto = function (fileChooser, preview, createPhotoBlock) {
    fileChooser.addEventListener('change', function () {

      var file = fileChooser.files[0];
      var fileName = file.name.toLowerCase();

      var matches = FILE_TYPES.some(function (it) {
        return fileName.endsWith(it);
      });

      if (matches) {
        var reader = new FileReader();

        reader.addEventListener('load', function () {
          if (createPhotoBlock) {
            var image = new Image(70, 70);
            image.alt = 'Фотография жилья';
            image.src = reader.result;
            preview.appendChild(image);
          } else {
            preview.src = reader.result;
          }
        });

        reader.readAsDataURL(file);
      }
    });
  };

  var addAvatar = function () {
    addPhoto(fileChooserAvatar, previewAvatar, false);
  };

  var addHousing = function () {
    addPhoto(fileChooserHousing, previewHousing, true);
  };

  var removeAvatar = function () {
    previewAvatar.src = 'img/muffin-grey.svg';
  };

  var removeHousing = function () {
    if (previewHousing.querySelector('img')) {
      previewHousing.querySelectorAll('img').forEach(function (photo) {
        photo.remove();
      });
    }
  };

  window.formPhoto = {
    addAvatar: addAvatar,
    addHousing: addHousing,
    removeAvatar: removeAvatar,
    removeHousing: removeHousing
  };

})();
