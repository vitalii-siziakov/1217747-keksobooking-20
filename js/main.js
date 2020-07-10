'use strict';

var removeDisableAttribute = window.data.removeDisableAttribute;
var adFormFieldsets = window.data.adFormFieldsets;
var mapFiltersFieldsets = window.data.mapFiltersFieldsets;
var mapFiltersSelectors = window.data.mapFiltersSelectors;
var map = window.data.map;
var adForm = window.data.adForm;
var addressInput = window.data.addressInput;
var mapPinMain = window.data.mapPinMain;
var mapPinMainActiveX = window.data.mapPinMainActiveX;
var mapPinMainActiveY = window.data.mapPinMainActiveY;
var mapPinMainInactiveX = window.data.mapPinMainInactiveX;
var mapPinMainInactiveY = window.data.mapPinMainInactiveY;
var addDisableAttribute = window.data.addDisableAttribute;
var roomNumberSelect = window.data.roomNumberSelect;
var capacitySelect = window.data.capacitySelect;

var renderPinBlocks = window.pin.renderPinBlocks;

var createCards = window.card.createCards;
var renderCardBlock = window.card.renderCardBlock;

var checkRoomCapacityCustom = window.form.checkRoomCapacityCustom;

// Функция: перевод странциы в активное состояние
var activatePage = function () {
  removeDisableAttribute(adFormFieldsets);
  removeDisableAttribute(mapFiltersFieldsets);
  removeDisableAttribute(mapFiltersSelectors);
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  addressInput.setAttribute('placeholder', mapPinMainActiveX + ' ' + mapPinMainActiveY);

  var cards = createCards(8);
  renderPinBlocks(cards);
  renderCardBlock(cards[0]);
};

// Функция: нажатие ЛКМ на главный pin
var mousedownMapPinMain = function (evt) {
  if (evt.button === 0) {
    activatePage();
    mapPinMain.removeEventListener('keydown', keydownMapPinMain, {once: true});
  }
};

// Функция: нажатие Enter при наведении на главный pin
var keydownMapPinMain = function (evt) {
  if (evt.key === 'Enter') {
    activatePage();
    mapPinMain.removeEventListener('mousedown', mousedownMapPinMain, {once: true});
  }
};

// Инструкции
// Добавляем адрес
addressInput.setAttribute('value', mapPinMainInactiveX + ' ' + mapPinMainInactiveY);

// Делаем неактивными поля ввода форм
addDisableAttribute(adFormFieldsets);
addDisableAttribute(mapFiltersFieldsets);
addDisableAttribute(mapFiltersSelectors);

// Обработчики
// Клик ЛКП и нажатие Enter при наведении на главный pin
mapPinMain.addEventListener('mousedown', mousedownMapPinMain, {once: true});
mapPinMain.addEventListener('keydown', keydownMapPinMain, {once: true});

// Проверка значений select комнат и гостей при изменении их значений
roomNumberSelect.addEventListener('change', checkRoomCapacityCustom);
capacitySelect.addEventListener('change', checkRoomCapacityCustom);
