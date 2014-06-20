# Creating a AngularJS/Rails app. 


## Create a New Product.


#### Add a Nav Bar to the main page.  
This will look odd until we setup Bootstrap, but lets go with it.  

In the app/assets/templates/mainIndex.html.  

```
<div class="navbar navbar-fixed-top">
  <div class="navbar-inner">
    <a href="#" class="brand">My Products</a>
    <ul class="nav pull-right">
      <li><a ng-click="navNewProduct()">New Product</a></li>
    </ul>
  </div>
</div>
```
#### Remove the 'container' class from the index view.  

```
<div ng-view>
</div>
```

#### Add a click handler function for the New Product 'link' in the Nav Bar.  

In the controllers/main/mainIndexCtrl.js

```
    // New product
    $scope.navNewProduct = function(){
        $location.url('/product/new');
    };

```

Now when we click on the "New Product" we will be taken to the main page.  

Why?  
Because we are using the 'default' route. 



