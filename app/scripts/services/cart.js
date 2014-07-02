'use strict';

angular.module('anCheckoutApp')
.factory('cart', function(){
	var api = function cartApi(){

	};

	api.products = {
		length: 0
	};

	api.buy = function (product, count) {
        if (typeof count !== 'number') {
            count = 1;
        }
        if (api.products[product.name]) {
            api.products[product.name].count += count;
        } else {
            api.products[product.name] = {
                name: product.name,
                price: product.price,
                color: product.color,
                count: count,
                num: api.products.length
            };
            api.products.length++;
        }
    };

    api.remove = function (product) {
        if (api.products[product.name]) {
            api.products[product.name].count--;
            if (api.products[product.name].count === 0) {
                delete(api.products[product.name]);
                api.products.length--;
            }
        }
    };

    api.overallCount = function () {
        var cnt = 0;
        angular.forEach(api.products, function (p) {
            if (p.name) {
                cnt += p.count;
            }
        });
        return cnt;
    };

    api.overallSum = function () {
        var sum = 0;
        angular.forEach(api.products, function (p) {
            if (p.name) {
                sum += p.count * p.price;
            }
        });
        return sum;
    };

    api.removeAll = function () {
        api.products = {
            length: 0
        };
    };

	return api;
});