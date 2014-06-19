//= require_self
//= require_tree ./controllers/main
//= require_tree ./filters/main
//= require_tree ./directives/main
//= require_tree ./services/main

var ProductsApp = angular.module('ProductsApp', ['ngRoute']); 

ProductsApp.config(['$routeProvider', function($routeProvider){
  
  // Route for '#/product'                                                     
  $routeProvider.when('/product', {
    templateUrl: '../assets/mainProduct.html',
    controller: 'ProductCtrl'
  });

    // default route                                                            
   $routeProvider.otherwise({
    templateUrl: '../assets/mainIndex.html',
    controller: 'IndexCtrl'
    });
}]);