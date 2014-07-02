'use strict';

angular.module('anCheckoutApp')
.filter('formatList', function(){
  return function(text){
    return (text + '').replace(/,/g, ', ');
  };
});