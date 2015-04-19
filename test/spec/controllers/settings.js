'use strict';

describe('Controller: SettingsCtrl', function () {

  // load the controller's module
  beforeEach(module('anCheckoutApp'));

  var SettingsCtrl,
    scope,
    sceService,
    productsService;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, products, $sce) {
    scope = $rootScope.$new();
    sceService = $sce;
    productsService = products;
    SettingsCtrl = $controller('SettingsCtrl', {
      $scope: scope,
      products: products
    });
  }));

  it('products should be set', function(){
    expect(scope.products).toBeDefined();
  });

  it('editedProduct should be null', function(){
    expect(scope.editedProduct).toBeNull();
  });

  it('edit should be a function', function(){
    expect(scope.edit).toBeDefined();
    expect(typeof scope.edit).toEqual('function');
  });

  it('save should be a function', function(){
    expect(scope.save).toBeDefined();
    expect(typeof scope.save).toEqual('function');
  });

  it('reset should be a function', function(){
    expect(scope.reset).toBeDefined();
    expect(typeof scope.reset).toEqual('function');
  });

  it('editedProduct should be set after call to edit', function(){
    expect(scope.editedProduct).toBeNull();
    var prod = {
      name: 'test',
      price: 1.5,
      color: 'blue',
      group: 'nada'
    };
    scope.edit(prod);
    expect(scope.editedProduct).toEqual(prod);
  });

  it('editedProductBackup should be set after call to edit', function(){
    expect(scope.editedProductBackup).toBeNull();
    var prod = {
      name: 'test',
      price: 1.5,
      color: 'blue',
      group: 'nada'
    };
    scope.edit(prod);
    expect(scope.editedProductBackup).toEqual(prod);
  });

  it('editedProductBackup should not change after edit', function(){
    var prod = {
      name: 'test',
      price: 1.5,
      color: 'blue',
      group: 'nada'
    };
    var prodBackup = angular.fromJson(angular.toJson(prod));
    scope.edit(prod);
    expect(scope.editedProductBackup).toEqual(prod);
    prod.name = 'test2';
    expect(scope.editedProduct).toEqual(prod);
    expect(scope.editedProductBackup).toEqual(prodBackup);
  });

  it('editedProductBackup should not change after edit (using real product)', function(){
    var prod = scope.products[productsService.firstGroup].products[0];
    var prodBackup = angular.fromJson(angular.toJson(prod));
    scope.edit(prod);
    expect(scope.editedProductBackup).toEqual(prod);
    prod.name = 'test2';
    expect(scope.editedProduct).toEqual(prod);
    expect(scope.editedProductBackup).toEqual(prodBackup);
  });

  it('reset should reset all fields', function(){
    var prds = scope.products;
    var prdsInitial = angular.fromJson(angular.toJson(prds));
    var prod = {
      name: 'test',
      price: 1.5,
      color: 'blue',
      group: 'nada'
    };
    for (var i in prds) {
        if(prds.hasOwnProperty(i)){
            var group = prds[i];
            if(typeof group.products === 'undefined'){
                continue;
            }
            group.products.push(prod);
        }
    }
    scope.edit(prod);
    expect(scope.products).not.toEqual(prdsInitial);
    expect(scope.editedProduct).not.toBeNull();
    scope.reset();
    expect(scope.products).toEqual(prdsInitial);
    expect(scope.editedProduct).toBeNull();
    expect(scope.editedProductBackup).toBeNull();
  });

  it('add should add a new product', function(){
    var oldLength = scope.products[productsService.firstGroup].products.length;
    scope.add();
    var newLength = scope.products[productsService.firstGroup].products.length;
    expect(newLength).toEqual(oldLength + 1);
  });

  it('resetEditedProduct should reset all changes on product', function(){
    var prod = scope.products[productsService.firstGroup].products[0];
    var prodBackup = angular.fromJson(angular.toJson(prod));
    scope.edit(prod);
    expect(scope.editedProductBackup).toEqual(prod);
    prod.name = 'test2';
    expect(scope.editedProduct).toEqual(prod);
    scope.resetEditedProduct();
    expect(scope.editedProduct).toEqual(prodBackup);
  });

  it('deleteEditedProduct should delete that product', function(){
    var prod = scope.products[productsService.firstGroup].products[0];
    var oldLength = scope.products[productsService.firstGroup].products.length;
    scope.edit(prod);
    scope.deleteEditedProduct();
    var newLength = scope.products[productsService.firstGroup].products.length;
    expect(newLength).toEqual(oldLength - 1);
    expect(scope.products[productsService.firstGroup].products[0]).not.toEqual(prod);
  });

  it('string should not contain <br />', function(){
    var name = 'test';
    var formatted = scope.formatName(name);
    expect(typeof formatted === 'object').toEqual(true); // confirms that it is an object, as should be the case when it has been through $sce.trustAsHtml
    expect(formatted.$$unwrapTrustedValue().indexOf('<br />')).toBe(-1);
  });

  it('string should contain <br />', function(){
    var name = 'test1,test2';
    var formatted = scope.formatName(name);
    expect(typeof formatted === 'object').toEqual(true); // confirms that it is an object, as should be the case when it has been through $sce.trustAsHtml
    expect(formatted.$$unwrapTrustedValue()).toEqual('test1<br />test2');
  });

  it('should import given json string', function(){
    var input = '{"length":1,"Essen":{"name":"Essen","products":[{"name":"Test","price":4.3,"color":"#66CCFF","group":"Essen"}],"length":1}}';
    scope.productsImportExport = input;
    expect(scope.products).not.toEqual(angular.fromJson(input));
    scope.importProducts();
    expect(scope.products).toEqual(angular.fromJson(input));
  });

  it('should import given json string', function(){
    var expectedOutput = '{"length":1,"Essen":{"name":"Essen","products":[{"name":"Test","price":4.3,"color":"#66CCFF","group":"Essen"}],"length":1}}';
    scope.products = {
      length: 1,
      Essen: {
        name: 'Essen',
        products: [
          {
            name: 'Test',
            price: 4.3,
            color: '#66CCFF',
            group: 'Essen'
          }
        ],
        length: 1
      }
    };
    expect(scope.productsImportExport).not.toEqual(expectedOutput);
    scope.exportProducts();
    expect(scope.productsImportExport).toEqual(expectedOutput);
  });
});
