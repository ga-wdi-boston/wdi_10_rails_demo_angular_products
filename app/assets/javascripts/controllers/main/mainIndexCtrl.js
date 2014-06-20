//Create an index controller
var IndexCtrl = function($scope, $http,$location, productData){

    // create a set of prouducts
    $scope.data = productData;

    $scope.viewProduct = function(productId){
        $location.url('/product/' + productId);
    };

    // Call the loadProducts method in the productData service.
    productData.loadProducts();  
}
