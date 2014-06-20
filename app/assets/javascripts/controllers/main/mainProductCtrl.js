var ProductCtrl  = function($scope, $routeParams, productData) {
  $scope.product = productData.products[$routeParams.productId];

  productData.loadProducts();
};