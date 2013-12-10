Number.prototype.toRad = function() {
   return this * Math.PI / 180;
}

angular.module('restaurantModule.controllers',[])


// Controller that fetches a list of data
.controller('RestaurantIndexCtrl', function($scope, RestaurantService) {
  $scope.restaurants = RestaurantService.all();
  $scope.title = "Restaurants";


	navigator.geolocation.getCurrentPosition(function(pos) {
	  $scope.lat1 = pos.coords.latitude;
	  $scope.lon1 = pos.coords.longitude;
	}, function(error) {
	  alert('Unable to get location: ' + error.message);
	});


	// Throw an error if no update is received every 30 seconds
	var options = { timeout: 30000 };
	// Watch for location change received every 30 seconds.
	watchID = navigator.geolocation.watchPosition(function(pos){
	  $scope.lat1 = pos.coords.latitude;
	  $scope.lon1 = pos.coords.longitude;
	}, function(){
		alert("Unable to get location: " + error.message)
	}, options);


  	$scope.findDistance = function(lat1,lon1, lat2,lon2) {

		var R = 6371/100; // m
		var dLat = (parseFloat(lat2)-parseFloat(lat1)).toRad();
		var dLon = (parseFloat(lon2)-parseFloat(lon1)).toRad();
		var lat1 = parseFloat(lat1).toRad();
		var lat2 = parseFloat(lat2).toRad();
		console.log(lat1 + "," + lon1 + ":" + lat2 + "," + lon2);
		var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
		        Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(parseFloat(lat1)) * Math.cos(parseFloat(lat2));
		var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
		var d = R * c;
        return d.toFixed(1);
     }
	$scope.nextPage = function(){
		console.log("Next Page call");
		$scope.busy = true;
		restaurantService.nextPage();
		$scope.busy = false;
	}
})

// Controller that shows more detailed info about a movie
.controller('RestaurantDetailCtrl', function($scope, $routeParams, RestaurantService) {
  // "MovieService" is a service returning mock data (services.js)
  $scope.restaurant = RestaurantService.get($routeParams.restaurantId);
  $scope.title = "Restaurant Info";

})

.controller("MapCtrl",function($scope,$routeParams, RestaurantService){
	$scope.restaurant = RestaurantService.get($routeParams.restaurantId);
	console.log(parseFloat($scope.restaurant.GC.Y) + "," + $scope.restaurant.GC.X);
	$scope.title = "Location Map";




 	angular.extend($scope, {
        london: {
            lat: parseFloat($scope.restaurant.GC.Y),
            lng: parseFloat($scope.restaurant.GC.X),
            zoom: 12
        },
        markers: {
            main_marker: {
                lat: parseFloat($scope.restaurant.GC.Y),
                lng: parseFloat($scope.restaurant.GC.X),
                focus: true,
                //message: "Hey, drag me if you want",
                title: $scope.restaurant.FN,
                draggable: true,
                label: {
                    message: $scope.restaurant.FN + "<br />" + $scope.restaurant.A1 + " " + $scope.restaurant.PN  + ", " +  $scope.restaurant.B,
                    options: {
                        noHide: true
                    }
                }
            }
        }
    });
})

// .controller('MapCtrl',function($scope, $routeParams, RestaurantService, Loading){
// 	$scope.restaurant = RestaurantService.get($routeParams.restaurantId);
// 	$scope.title = "Location Map";

//       function initialize() {
//         var mapOptions = {
//           center: new google.maps.LatLng($scope.restaurant.GC.Y, $scope.restaurant.GC.X),
//           zoom: 16,
//           mapTypeId: google.maps.MapTypeId.ROADMAP
//         };
//         var map = new google.maps.Map(document.getElementById("map"),
//             mapOptions);

//         // Stop the side bar from dragging when mousedown/tapdown on the map
//         google.maps.event.addDomListener(document.getElementById('map'), 'mousedown', function(e) {
//           e.preventDefault();
//           return false;
//         });
//         var contentString = "<div class='infowindow' style='width:250px;'><strong>" + $scope.restaurant.FN + "</strong><br />" + $scope.restaurant.A1 + " " + $scope.restaurant.PN  + ", " +  $scope.restaurant.B  + "</div>";
// 		var infowindow = new google.maps.InfoWindow({
// 		      content: contentString
// 		  });

//       	var marker = new google.maps.Marker({
//               map: map,
//               position: new google.maps.LatLng($scope.restaurant.GC.Y, $scope.restaurant.GC.X),
//               title: $scope.restaurant.FN
//             });

// 		 google.maps.event.addListener(marker, 'click', function() {
// 		    infowindow.open(map,marker);
// 		  });

//         $scope.map = map;
//       }
//       google.maps.event.addDomListener(window, 'load', initialize);
//       $scope.centerOnMe = function() {
//         if(!$scope.map) {
//           return;
//         }

//         $scope.loading = Loading.show({
//           content: 'Getting current location...',
//           showBackdrop: false
//         });

//         navigator.geolocation.getCurrentPosition(function(pos) {
//           $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
//           $scope.loading.hide();
//         }, function(error) {
//           alert('Unable to get location: ' + error.message);
//         });
//       };
// })


// Controller that shows more detailed info about a movie
.controller('RestaurantMenuCtrl', function($scope, $routeParams, RestaurantService) {
  // "MovieService" is a service returning mock data (services.js)
  $scope.restaurant = RestaurantService.get($routeParams.restaurantId);
  $scope.title = "Food Menu";
});
