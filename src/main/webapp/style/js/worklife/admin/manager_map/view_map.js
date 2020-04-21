var map;
var directionsService = new google.maps.DirectionsService();
var directionsDisplay;
var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var labelIndex = 0;
var listener = undefined;
var marker = undefined;
var map;
var infoWindow;

$(document).ready(function(){
	$('#side-menu').find('.active').removeClass('active');
	$('#WorklifeMapManager').addClass('active');
	
	//---------------------------------------------LOCATION---------------------------------------------------------------------------------------
	$('.search_location').click(function() {
	    function displayPosition(position) {
	        var lat = position.coords.latitude;
	        var lng = position.coords.longitude;
	        console.log(lat);
	        setTimeout(function() {
	            //$('.list .loading2').html('');
	            alert('lat:' + lat + '\nlng:' + lng);
	            $('#lon').val(lng);
	        	$('#lat').val(lat);
	            //window.location = "http://easycare.vn/ha-noi/danh-sach-bac-si-0-1-1-0-0-0-0-0-" + lat + "-" + lng + "-0-0-1";
	        }, 3000);
	    }

	    function displayError(error) {
	        if (error.code == 1) {
	            alert('Bạn đã từ chối truy cập vào vị trí hiện tại!');
	            $('.left .loading').html('');
                window.location = "http://easycare.vn/ha-noi/danh-sach-bac-si-0-1-1-0-0-0-0-0-0-0-0-0-1";
            }
	    }
	    if (navigator.geolocation) {
	        $('.list .loading2').html('<img src="http://easycare.vn/assets/easycare_frontend/img/loading.gif">');
	        $('.list .loading2').css({
	            'position': 'absolute',
	            'left': 100,
	            'top': 38
	        });
	        var timeoutVal = 10 * 1000;
	        navigator.geolocation.getCurrentPosition(displayPosition, displayError, {
	            enableHighAccuracy: true,
	            timeout: timeoutVal,
	            maximumAge: 0
	        });
	    } else {
	        alert("Trình duyệt của bạn không hỗ trợ Geolocation!");
	    }
	    return false;
	});
	
	map = new WorklifePageMap({
		title: 'Quận 1',
        centerLat: 10.746903,//10.763454452658017,
        centerLng: 106.67629199999999,//106.69833898544312,
        checklocation: true,
        zoom: 16,
        style: {
            strokeColor: "#cc0000",
            strokeOpacity: 1,
            strokeWeight: 2,
            fillColor: '#FF0000',
            fillOpacity: 0.35,
            paths: [
                   [106.69076442718506	, 10.795873990338974],
                   [106.689133644104	, 10.795663211392618],
                   [106.68758869171141	, 10.794777938203314],
                   [106.68660163879393	, 10.795621055585602],
                   [106.68612957000732	, 10.796674948986661],
                   [106.68505668640137	, 10.796885727223282],
                   [106.68484210968018	, 10.795789678778185],
                   [106.68492794036865	, 10.794693626334977],
                   [106.68634414672852	, 10.793091696342346],
                   [106.6862154006958	, 10.792459353205336],
                   [106.69808149337769	, 10.782931888965189],
                   [106.6816234588623	, 10.765457061021339],
                   [106.68402671813965	, 10.759322713359799],
                   [106.68574333190918	, 10.75557037044897],
                   [106.68660163879393	, 10.754558494705702],
                   [106.68698787689209	, 10.753335806987318],
                   [106.689133644104	, 10.755401724727488],
                   [106.6913652420044	, 10.757383305999412],
                   [106.69582843780516	, 10.760208090833615],
                   [106.69670820236206	, 10.761557232460715],
                   [106.69833898544312	, 10.763454452658017],
                   [106.7015790939331	, 10.765857581097057],
                   [106.70320987701416	, 10.76783909363928],
                   [106.70501232147215	, 10.768661206719976],
                   [106.70653581619263	, 10.769209280860707],
                   [106.70655727386475	, 10.769778433720619],
                   [106.70739412307739	, 10.776123361288192],
                   [106.70992612838745	, 10.782742179754143],
                   [106.71432495117188	, 10.786536341243464],
                   [106.71247959136963	, 10.787906443351835],
                   [106.70941114425659	, 10.787463795660965],
                   [106.70857429504395	, 10.787990757123836],
                   [106.70771598815918	, 10.788876050302532],
                   [106.70647144317627	, 10.791763774218078],
                   [106.70355319976807	, 10.792796603043971],
                   [106.70054912567139	, 10.793471101585975],
                   [106.69836044311523	, 10.793639725984955],
                   [106.69593572616577	, 10.79355541379729],
                   [106.69471263885498	, 10.793513257694597],
                   [106.69445514678955	, 10.794925483915973],
                   [106.69267416000366	, 10.794862250047988],
                   [106.69076442718506	, 10.795873990338974]
                   ]
        }});
		  /*var map = new google.maps.Map(document.getElementById('map'), {
		    center: {lat: -33.866, lng: 151.196},
		    zoom: 15
		  });

		  var infowindow = new google.maps.InfoWindow();
		  var service = new google.maps.places.PlacesService(map);

		  service.getDetails({
		    placeId: 'ChIJN1t_tDeuEmsRUsoyG83frY4'
		  }, function(place, status) {
		    if (status === google.maps.places.PlacesServiceStatus.OK) {
		      var marker = new google.maps.Marker({
		        map: map,
		        position: place.geometry.location
		      });
		      google.maps.event.addListener(marker, 'click', function() {
		        infowindow.setContent(place.name);
		        infowindow.open(map, this);
		      });
		    }
		  });*/
});

/*function initialize() {
	directionsDisplay = new google.maps.DirectionsRenderer();
    var mapOptions = {
        zoom: 12,
        center: new google.maps.LatLng(10.795051, 106.672215),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById('map'), mapOptions);

    for (var i = 0; i < 10; i++) {
        var lat = 10.795051 + i / 100;
        var long = 106.67221 + i / 100;
        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(lat, long),
            //animation: google.maps.Animation.BOUNCE
            icon: 'image/building.png'
        });

        marker.setMap(map);
    }
	directionsDisplay.setMap(map);
}*/

function calcRoute() { 
  var start = new google.maps.LatLng(10.8023, 106.6546);
  var end = new google.maps.LatLng(10.8021, 106.6582);
  var request = {
	origin: start,
	destination: end,
	travelMode: google.maps.TravelMode.DRIVING
  };
  directionsService.route(request, function(response, status) {
	if (status == google.maps.DirectionsStatus.OK) {
	  directionsDisplay.setDirections(response);
	}
  });
}

//Adds a marker to the map.
function addMarker(position, map) {
	// Add the marker at the clicked location, and add the next-available label
	// from the array of alphabetical characters.
	if(marker != undefined)
		marker.setMap(null);
	$('#lon').val(position.K);
	$('#lat').val(position.G);
	marker = new google.maps.Marker({
		position: position,
		//label: labels[labelIndex++ % labels.length],
		map: map
	});
}

function buttonClick() {
	if(listener == undefined) {
		listener = google.maps.event.addListener(map, 'click', function(event) {
			addMarker(event.latLng, map);
		});
	} else {
		google.maps.event.removeListener(listener);
		listener = undefined;
	}
}