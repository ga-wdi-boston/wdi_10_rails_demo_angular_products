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
	touch ./filters/main/.keep ./services/main	
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

