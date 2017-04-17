'use strict';

(function () {
  var STORAGE_KEY = 'prds';

  var COLOR_RED = '#FF3333';
  var COLOR_ROSE = '#FFABAB';
  var COLOR_YELLOW = '#FFFF00';
  var COLOR_DARKGREEN = '#00BD00';
  var COLOR_ORANGE = '#FF9933';
  var COLOR_BEIGE = '#FCDCC2';
  var COLOR_BLUE = '#66CCFF';
  var COLOR_LIGHTGREEN = '#CCFF99';
  var COLOR_WHITE = '#FFFFFF';

  var products = [
    {
      'name': 'Haxen',
      'price': 7.20,
      'color': COLOR_WHITE,
      'group': 'Essen'
    },
    {
      'name': '1/2 Hähnchen',
      'price': 6.00,
      'color': COLOR_LIGHTGREEN,
      'group': 'Essen'
    },
    {
      'name': 'Fleischbrot,Salat,Weißwürste',
      'price': 4.50,
      'color': COLOR_BLUE,
      'group': 'Essen'
    },
    {
      'name': 'Pommes,Rettich',
      'price': 2.60,
      'color': COLOR_BEIGE,
      'group': 'Essen'
    },
    {
      'name': '1l Bier',
      'price': 6.40,
      'color': COLOR_YELLOW,
      'group': 'Essen'
    },
    {
      'name': '1/2l Bier,1/4l Wein,LKW',
      'price': 3.30,
      'color': COLOR_ROSE,
      'group': 'Essen'
    },
    {
      'name': 'Schorle / Pils,Currywurst,Wilde Kartoffeln,Käse',
      'price': 3.00,
      'color': COLOR_DARKGREEN,
      'group': 'Essen'
    },
    {
      'name': 'Cola / Fanta,Sprudel / A-Schorle,Wurst,Hering',
      'price': 2.80,
      'color': COLOR_ORANGE,
      'group': 'Essen'
    },
    {
      'name': 'Pfand',
      'price': 2.00,
      'color': COLOR_RED,
      'group': 'Essen'
    },
    {
      'name': '',
      'price': 0,
      'color': 'transparent',
      'group': 'Essen'
    },
    {
      'name': '',
      'price': 0,
      'color': 'transparent',
      'group': 'Essen'
    },
    {
      'name': '',
      'price': 0,
      'color': 'transparent',
      'group': 'Essen'
    }
  ];

  angular.module('anCheckoutApp')
    .factory('products', function () {
      var prds = {
        length: 0
      };
      for (var i = 0; i < products.length; i++) {
        var p = products[i],
          group = p.group || 'Andere';
        if (!prds[group]) {
          prds[group] = {
            name: group,
            products: [],
            length: 0
          };
          prds.length++;
        }
        prds[group].length++;
        prds[group].products.push(p);
      }
      return {
        getProducts: function () {
          //Try to load products form localStorage
          var savePrds = localStorage.getItem(STORAGE_KEY);
          if (savePrds) {
            return angular.fromJson(savePrds);
          }
          return angular.fromJson(angular.toJson(prds));
        },
        firstGroup: products[0].group,
        resetProducts: function () {
          localStorage.removeItem(STORAGE_KEY);
        },
        saveProducts: function (newPrds) {
          localStorage.setItem(STORAGE_KEY, angular.toJson(newPrds));
        }
      };
    });
})();
