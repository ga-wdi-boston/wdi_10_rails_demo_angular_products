var IndexCtrl = function($scope, $location, $http, productData){
    // Create a set of products
    $scope.data = productData;

    // Call the service method to get the Product data from the API.
    productData.loadProducts();

    $scope.viewProduct = function(productId){
        $location.url('/product/'+productId);

    };
};
