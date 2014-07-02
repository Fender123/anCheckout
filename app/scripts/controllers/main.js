'use strict';

/**
 * @ngdoc function
 * @name anCheckoutApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the anCheckoutApp
 */
angular.module('anCheckoutApp')
.controller('MainCtrl', function ($scope, $sce, products, cart) {
    $scope.cart = cart;

    //Init products
    var prds = products.products;
    $scope.products = prds;
    $scope.activeTab = products.firstGroup || 'Andere';

    //TODO: Zahleneingabe für gegebenes Geld Rückgeld

    // $scope.buy = function (product, count) {
    //     if (typeof count !== 'number') {
    //         count = 1;
    //     }
    //     if ($scope.boughtProducts[product.name]) {
    //         $scope.boughtProducts[product.name].count += count;
    //     } else {
    //         $scope.boughtProducts[product.name] = {
    //             name: product.name,
    //             price: product.price,
    //             color: product.color,
    //             count: count,
    //             num: $scope.boughtProducts.length
    //         };
    //         $scope.boughtProducts.length++;
    //     }
    // };

    // $scope.remove = function (product) {
    //     if ($scope.boughtProducts[product.name]) {
    //         $scope.boughtProducts[product.name].count--;
    //         if ($scope.boughtProducts[product.name].count === 0) {
    //             delete($scope.boughtProducts[product.name]);
    //             $scope.boughtProducts.length--;
    //         }
    //     }
    // };

    // $scope.overallCount = function () {
    //     var cnt = 0;
    //     angular.forEach($scope.boughtProducts, function (p) {
    //         if (p.name) {
    //             cnt += p.count;
    //         }
    //     });
    //     return cnt;
    // };

    // $scope.overallSum = function () {
    //     var sum = 0;
    //     angular.forEach($scope.boughtProducts, function (p) {
    //         if (p.name) {
    //             sum += p.count * p.price;
    //         }
    //     });
    //     return sum;
    // };

    // $scope.removeAll = function () {
    //     $scope.boughtProducts = {
    //         length: 0
    //     };
    // };

    $scope.showTab = function (tab) {
        $scope.activeTab = tab;
    };

    $scope.formatName = function (name) {
        if ((name + '').indexOf(',') === -1) {
            return $sce.trustAsHtml(name);
        }
        return $sce.trustAsHtml(name.split(',').join('<br />'));
    };
});