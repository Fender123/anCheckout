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
    var prds = products.getProducts();
    $scope.products = prds;
    $scope.activeTab = products.firstGroup || 'Andere';

    //TODO: Zahleneingabe für gegebenes Geld Rückgeld


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