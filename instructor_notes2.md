# Creating a AngularJS/Rails app. Part2


## Creating a Shared Angular Service

It's a singleton, created only once. It can be injected into any controller.


* Create a service in services/main/productData.js

```
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
```
* Update the controllers/main/mainIndexCtrl.js

This will inject the productData service as a dependency, invoke it and set the products in the $scope. 

_Note: we disabled getting the product data from the API for now_

```
var IndexCtrl = function($scope, $location, $http, productData){
    // Create a set of products                                                 
    $scope.products = productData;
    ...
    
    //loadPosts();
    ...
```
* Update the product controller, controllers/main/mainProductCtrl.js 

This will set the product to _always_ be the first product in the dummy products array we set above.

```
var ProductCtrl  = function($scope, $routeParams, productData) {
    $scope.product = productData.products[0];

    // get the productId from the routeParams.                                  
    // Note: the productId was defined in the route.                            
    $scope.productId = $routeParams.productId;
};
```

## Loading Product data using the service.
We are going to move the ajax code that loads the Product JSON from Rails to the productData service we created above. 

* Move Ajax code from controlllers/main/mainIndexCtrl to the services, in services/main/productData.js

Update the productData service in services/main/productData.js.


```
  var productData = {
        products:  [{name: 'Initializing Products...', description: '', price: \
149.99}]
    };
    productsHandler = function(data){
        productData.products = data
        console.log('Successfully loaded products.')
    };

    errorHandler = function(){
        console.error('Failed to load products.');
    };

    productData.loadProducts = function(){
        $http.get('./products.json')
            .success(productsHandler)
            .error(errorHandler)
    };

    return productData;

``` 

Update the index controller, controllers/main/mainIndexCtrl.js  

```
var IndexCtrl = function($scope, $location, $http, productData){
    // Create a set of products                                                 
    $scope.data = productData;

    // Call the service method to get the Product data from the API.            
    productData.loadProducts();

    $scope.viewProduct = function(productId){
	$location.url('/product/'+productId);

    };
};



```

Update the main index template, app/templates/mainProduct.html.

```
	<div class="row" ng-repeat="product in data.products">
```


#### Post Controller should loadProducts from API.
In the controllers/main/mainPostCtrl.js change two lines.


```
 $scope.product = productData.products[$routeParams.productId];

 productData.loadProducts();
```