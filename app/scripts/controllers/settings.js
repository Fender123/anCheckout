'use strict';

/**
 * @ngdoc function
 * @name anCheckoutApp.controller:SettingsCtrl
 * @description
 * # SettingsCtrl
 * Controller of the anCheckoutApp
 */
angular.module('anCheckoutApp')
.controller('SettingsCtrl', function ($scope, products) {

    //Init products
    var prds = products.getProducts();
    $scope.products = prds;
	$scope.editedProduct = null;

    $scope.save = function(){
        products.saveProducts($scope.products);
    };
	
    $scope.reset = function(){
        products.resetProducts();
        prds = products.getProducts();
        $scope.products = prds;
    };

    $scope.edit = function(product){
        $scope.editedProduct = product;
    };
});