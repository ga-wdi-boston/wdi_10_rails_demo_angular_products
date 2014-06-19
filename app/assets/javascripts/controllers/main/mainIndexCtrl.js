var IndexCtrl = function($scope, $location, $http){
    // Create a set of products
    $scope.products = [
        {name: 'Loading Products...', description: '', price: 149.99}
    ];

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

    loadPosts();

    $scope.viewProduct = function(productId){
        $location.url('/product/'+productId);

    };
};
