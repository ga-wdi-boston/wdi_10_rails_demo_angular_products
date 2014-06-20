//Create an index controller
var IndexCtrl = function($scope, $http){

    // create a set of prouducts
    $scope.products = [
        {name: 'Black Boot', description: 'We will crush you', price: 149.99},
        {name: 'Television', description: '52 in', price: 599.99},
        {name: 'Fishcake', description: 'Fish in a cake', price: 15.00},
        {name: 'USB Plug', description: 'For your phone', price: 11.99}
    ];

    $scope.viewProduct = function(productId){
        $location.url('/product/' + productId);
    };

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
}
