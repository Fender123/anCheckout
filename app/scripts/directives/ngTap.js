'use strict';

(function(){
	var hasTouch = false;

	angular.module('anCheckoutApp')
	.directive('ngTap', function() {
	  return function($scope, $element, $attributes) {
	    var clickBound = false;
		if(hasTouch === false){
		  clickBound = true;
	      $element.bind('click', function() {
	        return $scope.$apply($attributes.ngTap);
	      });
		}
	    return $element.bind('touchstart', function() {
		  hasTouch = true;
		  //Remove click listener 
		  if(clickBound === true){
			$element.unbind('click');
			clickBound = false;
		  }
	      return $scope.$apply($attributes.ngTap);
	    });
	  };
	});
})();