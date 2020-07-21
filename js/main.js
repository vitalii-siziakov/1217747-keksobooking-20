'use strict';

(function () {
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
  var cards = [];
  var cardsFiltred = [];
  var housingType = document.querySelector('#housing-type');

  var renderPinBlocks = window.pin.renderPinBlocks;

  // var createCards = window.card.createCards;
  var renderCardBlock = window.card.renderCardBlock;

  var checkRoomCapacityCustom = window.form.checkRoomCapacityCustom;

  var getCardsArrFilterMaxCount = function (arr, count) {
    var arrFilterMaxCount = arr.filter(function (item, index) {
      return index < count;
    });
    return arrFilterMaxCount;
  };

  var getCardsArrFilterHousingType = function (arr, type) {
    var arrFilterHousingType = arr.filter(function (item) {
      return item.offer.type === type;
    });
    return arrFilterHousingType;
  };

  var filtratingByHousingType = function () {
    var type = window.data.getSelectValue(housingType);
    var mapPins = map.querySelector('.map__pins');
    var mapCard = document.querySelector('.popup');

    mapPins.innerHTML = '';
    mapCard.setAttribute('hidden', true);

    if (type === 'any') {
      cardsFiltred = getCardsArrFilterMaxCount(cards, 5);
    } else if (type === 'palace') {
      cardsFiltred = getCardsArrFilterHousingType(cards, 'palace');
    } else if (type === 'flat') {
      cardsFiltred = getCardsArrFilterHousingType(cards, 'flat');
    } else if (type === 'house') {
      cardsFiltred = getCardsArrFilterHousingType(cards, 'house');
    } else if (type === 'bungalo') {
      cardsFiltred = getCardsArrFilterHousingType(cards, 'bungalo');
    }

    renderPinBlocks(getCardsArrFilterMaxCount(cardsFiltred, 5));
  };

  var onLoad = function (cardsArr) {
    cards = cardsArr;
    cardsFiltred = getCardsArrFilterMaxCount(cards, 5);
    renderPinBlocks(cardsFiltred);
    renderCardBlock(cardsFiltred[0]);
  };

  // Функция: перевод странциы в активное состояние
  var activatePage = function () {
    removeDisableAttribute(adFormFieldsets);
    removeDisableAttribute(mapFiltersFieldsets);
    removeDisableAttribute(mapFiltersSelectors);
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    addressInput.setAttribute('placeholder', mapPinMainActiveX + ' ' + mapPinMainActiveY);

    // var cards = createCards(8);
    window.connect.load(onLoad, window.connect.onError);
    // renderCardBlock(cards[0]);
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

  housingType.addEventListener('change', filtratingByHousingType);
})();
