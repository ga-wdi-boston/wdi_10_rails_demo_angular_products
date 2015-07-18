# Creating a AngularJS/Rails app.

We will create a Rails and AngularJS _Product_ Application. 

The Angular front-end will be served using the Rails asset pipeline.  

The Rails application will act as Product API providing JSON.  

## Create a Rails app
```
rails new <app_name> -d postgresql -T
```

### Initialize with git.
And create a Github repo.

## Rails setup for Angular.  

* Remove turbolinks from the layout.
* Add the angular rails gem.  
	```
	gem 'angularjs-rails'
	```
* Update the javascript manifest.  
	In app/assets/javascript/application.js.

	```
	//= require jquery
	//= require jquery_ujs
	//= require angular
	//= require angular-route
	//= require_tree .
	```
* Create dirs for the angular controllers, services, etc  

	```
	cd app/assets/javascript
	mkdir -p ./controllers/main
	mkdir -p ./directives/main
	mkdir -p ./filters/main
	mkdir -p ./services/main
	touch ./controllers/main/.keep ./directives/main/.keep 
	touch ./filters/main/.keep ./services/main/.keep	
	```
* Set the ng-app directive in the layout.  
Signals that this is an angular app.

	```
	<html ng-app>
	```

## Create an Angular Controller with product data


* Create a Angular controller and set the product data.  

	```
	touch app/assets/javascripts/controllers/main/mainIndexCtrl.js
	```

	Add the below to the mainIndexCtrl.js.  

	```
	var IndexCtrl = function($scope){
    	// Create a set of products
    	$scope.products = [
        	{name: 'Black Boot', description: 'We will crush you', price: 149.99},
	        {name: 'Television', description: '52 in', price: 599.00},
	        {name: 'Fishcake', description: 'Fish in a cake', price: 15.00},
	        {name: 'USB Plug', description: 'For your phone', price: 11.99}
    	];
	};
	```
* Create the Rails Main index view.  
	```
	rails generate controller Main index
	```

	Update the Main index view to show all the products. _The ng-repeat directive will "repeat" the html for each product._  

	```
	<div class="container" ng-controller="IndexCtrl">
	  <h1 class="text-center">My Product</h1>	  
	  <div class="row" ng-repeat="product in products">
    	<h2>{{ product.name }}</h2>
	    <p>{{ product.description }}</p>
	  </div>
	</div>
	```


## Setup a js to controller mapping.
For each Rails controller. _(Used later)_  

* Adding the controller_name below will look for a matching *.js file in the app/assets/javascript dir. 

	```
	<%= javascript_include_tag "application", controller_name %>
	```


* Create a js file that will beloaded when the Main controller is loaded.
_Nothing in here for now._
	```
	touch app/assets/javascript/main.js
	```

* Create an initializer assert precompile.  
	```
	touch config/initializers/assets.rb that will load the main.js.
	```
	
	Add this.  
	```
	Rails.application.config.assets.precompile += %w( main.js )
	```
	
## Cleanup asset files.  
Let's stop slurping up all the javascript assets and _explicitly_ name our dependencies.

* Remove the require_tree from the application.js
* Add explicity dependencies to the main.js.  

	```
	//= require_self
	//= require_tree ./controllers/main
	//= require_tree ./filters/main
	//= require_tree ./directives/main
	//= require_tree ./services/main
	```

## Add a Rails root
```
  root to: 'main#index'
```

## Add a Angular module
The Angular module will provide a namespace and a container for you application components, (services, controllers, etc.).

It is also where you will identify your dependencies. Below, we are creating a module ProductsApp that depends on the ngRoute library.

* Add this to main.js
	```
	var ProductsApp = angular.module('ProductsApp', ['ngRoute']);
	```
* Add this to your Rails layout. This will indicate the app module.
	```
	<html ng-app="ProductsApp">
	```
	
	
## Create a Products View Template
A view template acts somewhat like an ERB view in rails. It is what gets rendered when you go to a Angular route.

Here we are going to create an angular view template that will show all of the products.

* Create a directory for view templates
	```
	mkdir app/assets/templates
	```
* Create a view template, mainIndex.html, in this templates dir.  

	```
	<h1 class="text-center">My Product</h1>
	<!-- ng-repeat will create the below html for each product -->
	<div class="row" ng-repeat="product in products">
	  <h2>{{ product.name }}</h2>
	  <p>{{ product.description }}</p>
	</div>
	```
* Update the Rails Main index view in app/views/main/index.html.erb.  

	```
	<div class="container" ng-view>
	</div>
	```  
* Create an Angular route for this view in the main.js file.
	This is our first Angular route. This will get invoked when the application is initialized by Angular.
	
	The _$routeProvider.otherwise_ is a default route in angular. It's indicates that where the view template is located and the angular controller to use.

	```
	ProductsApp.config(['$routeProvider', function($routeProvider){
    	// default route                                                            
 	   $routeProvider.otherwise({
		templateUrl: '../assets/mainIndex.html',
		controller: 'IndexCtrl'
	    });
	}]);
	```

Notice that we have moved the _view_ code from a Rails view, index.html.erb, to an Angular view template, mainIndex.html.


## Create a View Template for a Product.
This will create a view template to show __one__ product.

* Create a angular controller to view one Product in controllers/main/mainProductCtrl.js.  

	This will _ONLY_ view a static product, _for now_.

	```
	var ProductCtrl  = function($scope) {
    $scope.product = {name: 'Flask', description: 'Red Leather', price: 23.00 };

	};
	```
* Create a view template, app/assets/template/mainProduct.html, for one product.

	```
	<h1 class="text-center">{{ product.name }}</h1>
	<div class="row">
    	<p>{{ product.description }}</p>
	</div>
	```
* Create a product route in main.js to view one product.

	```
	 // Route for '/product'                                                     
    $routeProvider.when('/product', {
        templateUrl: '../assets/mainProduct.html',
        controller: 'ProductCtrl'
    });
	```
	
* Create a click handler to view one product.  
	In the template/mainIndex.html change this line.

	The ng-click directive will stop the browser from redirecting the page.  


	```
	<h2><a ng-click="viewProduct()">{{ product.name }}</a></h2>
	```

* Create the handler function, _viewProduct_, in the controllers/main/mainIndexCtrl.js.  
	
	Notice how we _injected_ the $location _service_ into this controller. It starts the path with the '#' to prevent the browser from doing a page reload from the server.

	```
	var IndexCtrl = function($scope, $location){
	 
	 ...
	 
	 $scope.viewProduct = function(){
        $location.url('/product');

    };
	```
## Route parameters
Here we will setup a route parameter for a product.

The user will:  
1. Click on a product title.  
2. The click handler will get called with the index set by the ng-repeat directive.  
3. The click handler will get this index and set the URL to the #/product/<index>. _Note: the index here is being used as a product id._  
4. The Product controller will get invoked, because it's mapped to the route #/product/:productId.  
5. The Product controller will get the productId from the route using the $routeParams service.  
6. The Product controller will set the productId in it's $scope.  
7. The

* Update the route for a product in the main.js

	```
	 $routeProvider.when('/product/:productId', {
	```
* Add a index/offset that we'll send to the click handler. We'll use this as product ID.     

	```
	<!-- The $index is provided by the ng-repeat directive -->
  	<!-- It gives you the index/offset of the current product. -->
 	<h2><a ng-click="viewProduct($index)">{{ product.name }}</a></h2>
		
	```
* Update the click handler to accept a Product ID and set it in the URL.	

	```
 	$scope.viewProduct = function(productId){
        $location.url('/product/'+productId);
    };
    ```
* Update the Product controller to use the $routeParams service and make it available to the product view.

	```
	var ProductCtrl  = function($scope, $routeParams) {
	...
	$scope.productId = $routeParams.productId;
	```
	
* Update the product view to show the product Id.  

	```
	<h1 class="text-center">{{ productId}} - {{ product.name }}</h1>
	```
	
## Create a Product API.

### Generate a Product model.  

* Rails generator.  

	```
 	rails g model Product name:string description:text price:decimal 
	```
* Update the Product migration.

	```
	create_table :products do |t|
      t.string :name
      t.text :description
      t.decimal :price, precision: 8, scale: 2
      t.text :images, array: true, default: []
      t.timestamps
    end

	```

* Create the DB and migrate.
* Set the seed data and populate the DB.
	
	```
	Product.delete_all
	5.times do |i|
	  Product.create(name: "Product #{i}", description: "This is product #{i}", price: (rand(100).to_f + (rand(100)/100.00)) )
	end
	```

#### Create a Products Controller.

```
class ProductsController < ApplicationController
  respond_to :json

  def index
    @products = Product.all
    respond_with(@products) do |format|
      format.json { render :json => @products, :root => false }
    end
  end

  def show
    @product = Product.find(params[:id])
    respond_with(@product) do |format|
      format.json { render :json => @product}
    end
  end

end
```

#### Create a route.  
For one and all Products.

```
resources :products, only: [:index, :show ]
```


#### Customize the Product API output.
* Install the active model serializer gem.
	```
	gem 'active_model_serializers'
	```
* Generate a Serializer.
	```
	rails g serializer Product id name description price images
	```
* Test it with curl.  
	Should see only the serialized attributes.

	```
	curl http://localhost:3001/products
	```

### Get Products from Rails API.

Send Ajax requests using the HTTP service and process JSON for the index controller, mainIndexCtrl.js 

* Inject the HTTP service for Ajax requests.
	```
	var IndexCtrl = function($scope, $location, $http){
	```
* Display "Loading" message until backend replies.  
	```
	 {name: 'Loading Products...', description: '', price: 149.99}
	```
* Create Ajax handlers.  

	```
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
	```
	
