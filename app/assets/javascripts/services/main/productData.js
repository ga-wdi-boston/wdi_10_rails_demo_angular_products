// Factory to create a the 'productData' service.                               
// Initialized only once, when this service is injected into a controller.      
// The $http angular service is injected into this service.                     
angular.module('ProductsApp').factory('productData', ['$http', function($http){

    // Dummy product data                                                       
    // var products =[
    //     {name: 'Black Boot', description: 'We will crush you', price: 149.99},
    //     {name: 'Television', description: '52 in', price: 599.00},
    //     {name: 'Fishcake', description: 'Fish in a cake', price: 15.00},
    //     {name: 'USB Plug', description: 'For your phone', price: 11.99}
    // ];

    // Create an Object that will have two properties:
    // products - Array of products.
    // loadProducts - Method that will retreive products from the API using Ajax.
    var productData = {
      products:  [{name: 'Initializing Products...', description: '', price: 149.99}]
    };

    productsHandler = function(data){
        productData.products = data;
        console.log('Successfully loaded products.')
    };

    errorHandler = function(){
        console.error('Failed to load products.');
    };

    // Adding a method to the productData object we created above.
    productData.loadProducts = function(){
        $http.get('./products.json')
            .success(productsHandler)
            .error(errorHandler)
    };

    console.log("Initialized productData.");

    // return the productData object we created above.
    return productData;
}]);