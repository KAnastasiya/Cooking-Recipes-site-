'use strict';
$(document).ready(function() {
  var pos = [48.529618, 35.030513],
    rectFill = 'rgba(104,179,11,.5)',
    rectBorder = 'rgba(104,179,11,.3)',
    lang = $('html').attr('lang'),
    overlayContent = (function() {
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
    })(lang),
    mapMarkerIcon = (function() {
      if (lang === 'uk') {
        return ('images/map-marker.svg');
      } else {
        return ('../images/map-marker.svg');
      }
    })(lang);
	//--------------------------------------------------------------------------------------
  $('.map').gmap3({
    map: {
      options: {
        center: pos,
        zoom: 13,
        backgroundColor: '#f5f5f5',
        scrollwheel: false,
        mapTypeControlOptions: {
          style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
        }
      }
    },
    rectangle: {
      options: {
        bounds: { n: 48.533, e: 35.036, s: 48.527, w: 35.025 },
        fillColor: rectFill,
        strokeWeight: 1,
        strokeColor: rectBorder
      }
    },
    marker: {
      latLng: pos,
      options: {
        icon: new google.maps.MarkerImage(mapMarkerIcon)
      },
      events: {
        mouseover: function() {
          $(this).gmap3({
            overlay: {
              latLng: pos,
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
	//--------------------------------------------------------------------------------------
  $( window ).resize(function() {
    $('.map').gmap3({
      map: {
        options: { center: pos }
      }
    });
  });
});
