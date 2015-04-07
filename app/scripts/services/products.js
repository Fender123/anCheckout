'use strict';

(function(){
	var products = [
		  {
		    "name": "Fleischbrot,Salat,WeiÃŸwÃ¼rste",
		    "price": 4.30,
		    "color": "#66CCFF",
		    "group": "Essen"
		  },
		  {
		    "name": "Pommes,Rettich",
		    "price": 2.30,
		    "color": "#FCDCC2",
		    "group": "Essen"
		  },
		  {
		    "name": "1/2l Bier,1/4l Wein",
		    "price": 3.30,
		    "color": "#FFABAB",
		    "group": "Essen"
		  },
		  {
		    "name": "1/2 HÃ¤hnchen",
		    "price": 5.90,
		    "color": "#CCFF99",
		    "group": "Essen"
		  },
		  {
		    "name": "Wurst",
		    "price": 2.50,
		    "color": "#FF9933",
		    "group": "Essen"
		  },
		  {
		    "name": "1l Bier",
		    "price": 6.40,
		    "color": "#FFFF00",
		    "group": "Essen"
		  },
		  {
		    "name": "Haxen",
		    "price": 6.90,
		    "color": "#FFFFFF",
		    "group": "Essen"
		  },
		  {
		    "name": "LKW",
		    "price": 3.30,
		    "color": "#FFABAB",
		    "group": "Essen"
		  },
		  {
		    "name": "Schorle",
		    "price": 2.80,
		    "color": "#00BD00",
		    "group": "Essen"
		  },
		  {
		    "name": "Currywurst,Wilde Kartoffeln,KÃ¤se,Hering",
		    "price": 2.80,
		    "color": "#00BD00",
		    "group": "Essen"
		  },
		  {
		    "name": "Sprudel,A-Schorle,Cola,Fanta",
		    "price": 2.50,
		    "color": "#FF9933",
		    "group": "Essen"
		  },
		  {
		    "name": "Pfand",
		    "price": 2.00,
		    "color": "#FF3333",
		    "group": "Essen"
		  }
		];

	angular.module('anCheckoutApp')
	.factory('products', function(){
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
	    	products: prds,
	    	firstGroup: products[0].group
	    };
	});
})();
