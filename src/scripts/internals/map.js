// Подгрузка сторонних библиотек
import '../externals/gmap3.min';

/**
 * Координаты точки, в которой установле маркер
 * @constant
 * @type  {Array}
 */
const POS = [48.529618, 35.030513];

/**
 * Цвет фона области вокруг маркера
 * @constant
 * @type  {String}
 */
const RECT_FILL = 'rgba(104,179,11,.5)';

/**
 * Цвет рамки области вокруг маркера
 * @constant
 * @type  {String}
 */
const RECT_BORDER = 'rgba(104,179,11,.3)';

/**
 * Текущий язык страницы
 * @type  {Element}
 */
let lang = $('html').attr('lang');

/**
 * Формирование информации об искомой точке на текущем языке страницы
 */
let overlayContent = (function() {
  if (lang === 'uk') {
    return ('<div class="marker-details">' + '<h3>ТРЦ "Караван"</h3>' +
			'<p>Нижньодніпровська вулиця 17, Ювілейне, Дніпропетровська область</p>' +
			'<p>Сайт: <a href="http://dnipropetrovsk-nizhnedneprovskaya.icaravan.com.ua/" target="_blank">icaravan.com.ua</a></p>' +
			'<p>График работы: 10:00 - 22:00</p>' + '</div>');
  } else {
    return ('<div class="marker-details">' + '<h3>SEC Caravan</h3>' +
			'<p>Nizhnedneprovska street, 17, Yuvileine, Dnipropetrovsk Oblast</p>' +
			'<p>Сайт: <a href="http://dnipropetrovsk-nizhnedneprovskaya.icaravan.com.ua/" target="_blank">icaravan.com.ua</a></p>' +
			'<p>Open: 10:00 - 22:00</p>' + '</div>');
  }
})(lang);

/**
 * Установка кастомного маркера
 */
let mapMarkerIcon = (function() {
  if (lang === 'uk') {
    return ('sources/images/map-marker.svg');
  } else {
    return ('../sources/images/map-marker.svg');
  }
})(lang);

/**
 * Конфигурирование карты
 */
$('.map').gmap3({
  map: {
    options: {
      center: POS,
      zoom: 13,
      backgroundColor: '#f5f5f5',
      scrollwheel: false,
      mapTypeControlOptions: {
        style: window.google.maps.MapTypeControlStyle.DROPDOWN_MENU
      }
    }
  },
  rectangle: {
    options: {
      bounds: { n: 48.533, e: 35.036, s: 48.527, w: 35.025 },
      fillColor: RECT_FILL,
      strokeWeight: 1,
      strokeColor: RECT_BORDER
    }
  },
  marker: {
    latLng: POS,
    options: {
      icon: new window.google.maps.MarkerImage(mapMarkerIcon)
    },
    events: {
      mouseover: function() {
        $(this).gmap3({
          overlay: {
            latLng: POS,
            options: {
              content: overlayContent,
              offset: { x: 20, y: -150 }
            }
          }
        });
      },
      mouseout: function() {
        $(this).gmap3({
          clear: 'overlay'
        });
      }
    }
  }
});

/**
 * Перепозиционирование карты при изменении размеров экрана так,
 * чтобы маркер всегда был по центру карты
 */
$( window ).on('resize', function() {
  $('.map').gmap3({
    map: {
      options: { center: POS }
    }
  });
});
