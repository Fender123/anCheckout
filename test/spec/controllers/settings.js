'use strict';

describe('Controller: SettingsCtrl', function () {

  // load the controller's module
  beforeEach(module('anCheckoutApp'));

  var SettingsCtrl,
    scope,
    sceService;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, products, $sce) {
    scope = $rootScope.$new();
    sceService = $sce;
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
});
