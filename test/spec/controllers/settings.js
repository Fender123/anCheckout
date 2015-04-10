'use strict';

describe('Controller: SettingsCtrl', function () {

  // load the controller's module
  beforeEach(module('anCheckoutApp'));

  var SettingsCtrl,
    scope,
    cartService,
    sceService;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, products) {
    scope = $rootScope.$new();
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
	var prod = 'abc';
	scope.edit(prod);
	expect(scope.editedProduct).toEqual(prod);
  });
});
