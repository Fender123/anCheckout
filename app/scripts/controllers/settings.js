'use strict';

/**
 * @ngdoc function
 * @name anCheckoutApp.controller:SettingsCtrl
 * @description
 * # SettingsCtrl
 * Controller of the anCheckoutApp
 */
angular.module('anCheckoutApp')
.controller('SettingsCtrl', function ($scope, $sce, products) {

    //Init products
    var prds = products.getProducts();
    $scope.products = prds;
    $scope.activeTab = products.firstGroup || 'Andere';

    $scope.save = function(){
        products.saveProducts($scope.products);
    };
    $scope.reset = function(){
        products.resetProducts();
        prds = products.getProducts();
        $scope.products = prds;
        $scope.activeTab = products.firstGroup || 'Andere';
    };

    $scope.edit = function(product){
        $scope.editedProduct = product;
    }

    //TODO: Zahleneingabe für gegebenes Geld Rückgeld

    $scope.formatName = function (name) {
        if ((name + '').indexOf(',') === -1) {
            return $sce.trustAsHtml(name);
        }
        return $sce.trustAsHtml(name.split(',').join('<br />'));
    };
});