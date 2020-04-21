(function($) {
	settings = {
			map: 'map',
			centerLat: 0,
			centerLng: 0,
			zoom: 5,
			title: 'Worklife Map',
			checklocation: false,
			style: {
				 strokeColor: '#cc0000',
                 strokeOpacity: 1,
                 strokeWeight: 2,
                 fillColor: '#FF0000',
                 fillOpacity: 0.35,
                 paths: []
			}
	};
	
	WorklifePageMap = function(variable) {
		variable = $.extend({}, settings, variable);
		
		var googleMap =  new google.maps.Map(document.getElementById(variable['map']), 
					{
				        scrollwheel: !1,
				        zoom: variable['zoom'],
				        center: new google.maps.LatLng(variable['centerLat'], variable['centerLng']),
				        mapTypeId: google.maps.MapTypeId.ROADMAP
				    });
		if(variable['style'].paths.length > 0) {
			infoWindow = new google.maps.InfoWindow();
			drawPolygon(variable['style'], variable['title'], googleMap);
		}
		
		if(!variable['checklocation']) {
			 if(navigator.geolocation) {
				    navigator.geolocation.getCurrentPosition(function(position) {
				      var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

				      var infowindow = new google.maps.InfoWindow({
				        map: map,
				        position: pos,
				        content: 'Location found using HTML5.'
				      });

				      map.setCenter(pos);
				    }, function() {
				      handleNoGeolocation(true);
				    });
				  } else {
				    // Browser doesn't support Geolocation
				    handleNoGeolocation(false);
				  }	
		}
		
		return googleMap;
	},
	
	drawPolygon = function(polygon, title, googleMap) {
		var poligonCoordinates = [];
		for(var i = 0; i < polygon.paths.length; i++) {
			var coordinate = new google.maps.LatLng(polygon.paths[i][1], polygon.paths[i][0]);
			poligonCoordinates.push(coordinate);
		}
		
		polygon.paths = poligonCoordinates;
		var polygonMarker = new google.maps.Polygon(polygon);
		polygonMarker.setMap(googleMap);
		
		if(title != '' && title != undefined)
			google.maps.event.addListener(polygonMarker, 'click', function(event) {
				var contentString = '<b>' + title + '</b>';
				
				// Replace the info window's content and position.
				infoWindow.setContent(contentString);
				infoWindow.setPosition(event.latLng);
			
				infoWindow.open(googleMap);
			});
	},

	handleNoGeolocation = function(errorFlag) {
	  if (errorFlag) {
	    var content = 'Error: The Geolocation service failed.';
	  } else {
	    var content = 'Error: Your browser doesn\'t support geolocation.';
	  }

	  var options = {
	    map: map,
	    position: new google.maps.LatLng(60, 105),
	    content: content
	  };

	  var infowindow = new google.maps.InfoWindow(options);
	  map.setCenter(options.position);
	}
	
})(jQuery);