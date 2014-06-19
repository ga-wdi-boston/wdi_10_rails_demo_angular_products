var IndexCtrl = function($scope, $location, $http, productData){
    // Create a set of products
    $scope.products = productData;

    productsHandler = function(data){
        $scope.products = data
        console.log('Successfully loaded products.')
    };

    errorHandler = function(){
        console.error('Failed to load products.');        
    };

    loadPosts = function(){
        $http.get('./products.json')
            .success(productsHandler)
            .error(errorHandler)
    };

    //loadPosts();

    $scope.viewProduct = function(productId){
        $location.url('/product/'+productId);

    };
};
