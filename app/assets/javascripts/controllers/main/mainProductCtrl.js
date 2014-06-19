var ProductCtrl  = function($scope, $routeParams) {
    $scope.product = {name: 'Flask', description: 'Red Leather', price: 23.00 };
    // get the productId from the routeParams. 
    // Note: the productId was defined in the route.
    $scope.productId = $routeParams.productId;
};
