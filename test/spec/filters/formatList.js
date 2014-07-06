'use strict';

describe('Filter: formatList', function () {

  // load the filters's module
  beforeEach(module('anCheckoutApp'));

  var formatList;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($filter) {
  	formatList = $filter('formatList');
  }));

	it('text should not contain a comma', function(){
		var input = "test";
		var expected = "test";
		expect(formatList(input)).toEqual(expected);
	});

	it('text should contain a comma with a leading blank', function(){
		var input = "test,test2";
		var expected = "test, test2";
		expect(formatList(input)).toEqual(expected);
	});
});