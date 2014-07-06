'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('anCheckoutApp'));

  var MainCtrl,
    scope,
    cartService,
    sceService;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $sce, products, cart) {
    scope = $rootScope.$new();
    cartService = cart;
    sceService = $sce;
    MainCtrl = $controller('MainCtrl', {
      $scope: scope,
      $sce: $sce,
      products: products,
      cart: cart
    });
  }));

  it('cart should be in scope', function () {
    expect(scope.cart).toEqual(cartService);
  });

  it('products should be set', function(){
    expect(scope.products).toBeDefined();
  });

  it('tab 2 should be set active', function(){
    var newTab = 'Testtab';
    scope.showTab(newTab);
    expect(scope.activeTab).toBe(newTab);
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
