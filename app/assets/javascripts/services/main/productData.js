// Factory to create a the 'productData' service.
// Initialized only once, when this service is injected into a controller.
// The $http angular service is injected into this service.
angular.module('ProductsApp').factory('productData', ['$http', function($http){

    var productData = {
        products:  [{name: 'Initializing Products...', description: '', price: 149.99}],
        isLoaded: false
    };

    productsHandler = function(data){
        productData.products = data
        console.log('Successfully loaded products.')
    };

    errorHandler = function(){
        console.error('Failed to load products.');        
    };

    productData.loadProducts = function(){
        // Only load data if it has not been loaded already
        if(!productData.isLoaded){

            $http.get('./products.json')
                .success(productsHandler)
                .error(errorHandler);
        }
    };

    return productData;
}]);
