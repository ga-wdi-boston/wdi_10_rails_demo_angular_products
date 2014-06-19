// Factory to create a the 'productData' service.
// Initialized only once, when this service is injected into a controller.
// The $http angular service is injected into this service.
angular.module('ProductsApp').factory('productData', ['$http', function($http){

    // Dummy product data
    products =[
        {name: 'Black Boot', description: 'We will crush you', price: 149.99},
        {name: 'Television', description: '52 in', price: 599.00},
        {name: 'Fishcake', description: 'Fish in a cake', price: 15.00},
        {name: 'USB Plug', description: 'For your phone', price: 11.99}
    ];

    console.log("Initialized productData.");
    return products;
}]);
