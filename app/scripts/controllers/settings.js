'use strict';

/**
 * @ngdoc function
 * @name anCheckoutApp.controller:SettingsCtrl
 * @description
 * # SettingsCtrl
 * Controller of the anCheckoutApp
 */
angular.module('anCheckoutApp')
.controller('SettingsCtrl', function ($scope, products, $sce) {

    //Init products
    var prds = products.getProducts();
    $scope.products = prds;
    $scope.editedProduct = null;
    $scope.editedProductBackup = null;
    $scope.productsImportExport = '';

    $scope.save = function(){
        products.saveProducts($scope.products);
    };
	
    $scope.reset = function(){
        products.resetProducts();
        prds = products.getProducts();
        $scope.products = prds;
        $scope.editedProduct = null;
        $scope.editedProductBackup = null;
    };

    $scope.edit = function(product){
        $scope.editedProduct = product;
        $scope.editedProductBackup = JSON.parse(JSON.stringify(product));
    };

    $scope.add = function(){
        var p = {
            name: '',
            price: 0,
            color: '#eee',
            group: products.firstGroup
        };
        $scope.products[p.group].products.push(p);
        $scope.editedProduct = p;
        $scope.editedProductBackup = p;
    };

    $scope.resetEditedProduct = function(){
        outerLoop:
        for (var i in $scope.products) {
            if($scope.products.hasOwnProperty(i)){
                var group = $scope.products[i];
                if(typeof group.products === 'undefined'){
                    continue;
                }
                for (var j = group.products.length - 1; j >= 0; j--) {
                    var product = group.products[j];
                    if(product === $scope.editedProduct){
                        $scope.products[i].products[j] = $scope.editedProductBackup;
                        $scope.editedProduct = $scope.products[i].products[j];
                        break outerLoop;
                    }
                }
            }
        }
    };

    $scope.deleteEditedProduct = function(){
        outerLoop:
        for (var i in $scope.products) {
            if($scope.products.hasOwnProperty(i)){
                var group = $scope.products[i];
                if(typeof group.products === 'undefined'){
                    continue;
                }
                for (var j = group.products.length - 1; j >= 0; j--) {
                    var product = group.products[j];
                    if(product === $scope.editedProduct){
                        $scope.products[i].products.splice(j, 1);
                        $scope.editedProduct = null;
                        break outerLoop;
                    }
                }
            }
        }
    };

    $scope.formatName = function (name) {
        if ((name + '').indexOf(',') === -1) {
            return $sce.trustAsHtml(name);
        }
        return $sce.trustAsHtml(name.split(',').join('<br />'));
    };

    $scope.importProducts = function(){
        try{
            var inProducts = angular.fromJson($scope.productsImportExport);
            $scope.products = inProducts;
            products.saveProducts(inProducts);
        }catch(e){
            window.alert('Die Eingegeben Daten sind ungültig!');
        }
    };

    $scope.exportProducts = function(){
        $scope.productsImportExport = angular.toJson($scope.products);
        window.alert('Bitte den Text aus dem Textfeld kopieren und über die Importfunktion auf einem anderen Geräte einspielen.');
    };
});