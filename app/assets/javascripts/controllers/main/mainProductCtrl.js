var ProductCtrl  = function($scope, $routeParams, productData) {
    $scope.product = productData[$routeParams.productId];

    // get the productId from the routeParams. 
    // Note: the productId was defined in the route.
    $scope.productId = $routeParams.productId;
};
