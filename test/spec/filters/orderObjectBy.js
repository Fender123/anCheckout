'use strict';

describe('Filter: orderObjectBy', function () {

  // load the filters's module
  beforeEach(module('anCheckoutApp'));

  var orderObjectBy;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($filter) {
  	orderObjectBy = $filter('orderObjectBy');
  }));

	it('object should be sorted the right way', function(){
		var input = {
			a: {
				a: 3,
				b: 2
			},
			b: {
				a: 1,
				b: 3,
				c: 4
			},
			c: {
				a: 2
			}
		};
		var expected = [
			{
				a: 1,
				b: 3,
				c: 4
			},{
				a: 2
			},{
				a: 3,
				b: 2
			}
		];
		expect(orderObjectBy(input, "a")).toEqual(expected);
	});

	it('object should be sorted the right way (reversed)', function(){
		var input = {
			a: {
				a: 3,
				b: 2
			},
			b: {
				a: 1,
				b: 3,
				c: 4
			},
			c: {
				a: 2
			}
		};
		var expected = [
			{
				a: 3,
				b: 2
			},{
				a: 2
			},{
				a: 1,
				b: 3,
				c: 4
			}
		];
		expect(orderObjectBy(input, "a", true)).toEqual(expected);
	});
});