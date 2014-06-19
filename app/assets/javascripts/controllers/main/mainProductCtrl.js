var ProductCtrl  = function($scope, $routeParams) {
  $scope.product = {name: 'Flask', description: 'Red Leather', price: 23.00 };
  $scope.productId = $routeParams.productId;
};