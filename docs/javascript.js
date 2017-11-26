//var map;
////urlString1,urlString2,urlString3,date
//function initMap(urlString1,urlString2,urlString3,date) {
//  map = new google.maps.Map(document.getElementById('map'), {
//    zoom: 2,
//    center: {lat: -33.865427, lng: 151.196123},
//    mapTypeId: 'terrain'
//  });
//
//  // Create a <script> tag and set the USGS URL as the source.
//  var script = document.createElement('script');
////  script.src = 'https://developers.google.com/maps/documentation/javascript/examples/json/earthquake_GeoJSONP.js';	
//
//  script.src = "https://data.police.uk/api/crimes-street/all-crime?poly="+urlString1+":"+urlString2+":"+urlString3+"&date="+date;
//	
//  document.getElementsByTagName('head')[0].appendChild(script);
//
//  map.data.setStyle(function(feature) {
//    var magnitude = 5;
//    return {
//      icon: getCircle(magnitude)	
//    };
//  });
//}
//
//// Draw red circles on Google Map
//function getCircle(magnitude) {
//  return {
//    path: google.maps.SymbolPath.CIRCLE,
//    fillColor: 'red',
//    fillOpacity: .2,
//    scale: Math.pow(2, magnitude) / 2,
//    strokeColor: 'white',
//    strokeWeight: .5
//  };
//}
//
//// Call geolocation json
//function eqfeed_callback(results) {
//  map.data.addGeoJson(results);
//}


var map,heatmap;
// this is the function to preview the map and the heatmap
function initMap(array) {
	var london = new google.maps.LatLng(51.5074, 0.1278);

	map = new google.maps.Map(document.getElementById('map'), {
	center: london,
	zoom: 9,
	mapTypeId: 'satellite'
	});

	if(array != null) {
		// using data in getPoints() to generate heatmap
		heatmap = new google.maps.visualization.HeatmapLayer({
		data: array,
		map: map
		});
	}
}  

function initURL(urlString1,urlString2,urlString3,date) {
  var requestURL = "https://data.police.uk/api/crimes-street/all-crime?poly="+urlString1+":"+urlString2+":"+urlString3+"&date="+date;
  var request = new XMLHttpRequest();
  request.open('GET', requestURL);
  request.responseType = 'json';
  request.send();

  request.onload = function() {
	var jsonData = request.response;
	storeRequiredData(jsonData);
  }

  function storeRequiredData(data){
	var array = [];
	for(i in data){ 
	  if(data[i].category=="violent-crime"){
		var x = new google.maps.LatLng(parseFloat(data[i].location.latitude),parseFloat(data[i].location.longitude));
		array.push(x);
	  }
	}
	initMap(array);
  }
}

// Draw Pie chart when webpage is created
window.onload = function () {
var pieChart = new CanvasJS.Chart("pieChart", {
	exportEnabled: true,
	animationEnabled: true,
	title:{
		text: "Regional sexual assault chart 2017"
	},
	legend:{
		cursor: "pointer",
		itemclick: explodePie
	},
	data: [{
		type: "pie",
		showInLegend: true,
		toolTipContent: "{name}: <strong>{y}%</strong>",
		indexLabel: "{name} - {y}%",
		dataPoints: [
			{ y: 26, name: "London", exploded: true },
			{ y: 20, name: "Brighton" },
			{ y: 5, name: "Leeds" },
			{ y: 3, name: "etc" },
			{ y: 7, name: "Birmingham" },
			{ y: 17, name: "Manchester" },
			{ y: 22, name: "Surrey"}
		]
	}]
});
pieChart.render();
    
// bar chart    
var barChart = new CanvasJS.Chart("barChart", {
	animationEnabled: true,
	
	title:{
		text:"International lawsuit on sexual assault past 5 years"
	},
	axisX:{
		interval: 1
	},
	axisY2:{
		interlacedColor: "rgba(1,77,101,.2)",
		gridColor: "rgba(1,77,101,.1)",
		title: "Cost"
	},
	data: [{
		type: "bar",
		name: "Countries",
		axisYType: "secondary",
		color: "#014D65",
		dataPoints: [
		{ y: 39600000, label: "Ford Motor Co." },
		{ y: 20000000, label: "UBER" },
		{ y: 20000000, label: "Fox News" },
		{ y: 17000000, label: "US Congress" },
		{ y: 8439941, label: "UBS" },
		{ y: 2300000, label: "Google" },
		{ y: 192146, label: "University of London" },
		{ y: 50000, label: "Vodafone" },
		]
	}]
});
barChart.render();
    
}

// pie chart aux function
function explodePie (e) {
	if(typeof (e.dataSeries.dataPoints[e.dataPointIndex].exploded) === "undefined" || !e.dataSeries.dataPoints[e.dataPointIndex].exploded) {
		e.dataSeries.dataPoints[e.dataPointIndex].exploded = true;
	} else {
		e.dataSeries.dataPoints[e.dataPointIndex].exploded = false;
	}
	e.chart.render();

}


d3.text("data.csv", function(data) {
    var parsedCSV = d3.csvParseRows(data);

    var container = d3.select("#data-input")
        .append("table")

        .selectAll("tr")
        .data(parsedCSV).enter()
        .append("tr")

        .selectAll("td")
        .data(function(d) { return d; }).enter()
        .append("td")
        .text(function(d) { return d; });
});

//// News API
//var url = 'https://newsapi.org/v2/everything?' +
//          'q=sexual+assault&' +
//          'sortBy=popularity&' +
//          'apiKey=13023a411421424eb2a9c64bcefb2d62';
//
//var req = new Request(url);
//
//var data = fetch(req)
//    .then(function(response) {
//        console.log(response.json());
//    })
//
//// I am trying to parse News Json and output as a dynamic table
// var r = new Array(), j = -1;
// for (var key=0, size=data.length; key<size; key++){
//     r[++j] ='<tr><td>';
//     r[++j] = data[key][0];
//     r[++j] = '</td><td cope="col">';
//     r[++j] = data[key][1];
//     r[++j] = '</td><td scope="col">';
//     r[++j] = data[key][2];
//     r[++j] = '</td></tr>';
// }
// $('#dataTable').html(r.join(''));

//function geocodePlaceId(geocoder) {
//
//    var placeId = document.getElementById('location-input1').value;
//
//    geocoder.geocode({'address': placeId}, function(results, status) {
//
//        if (status === 'OK') {
//
//            if (results[0]) {
//
//                console.log(results[0].geometry.location.lat());
//
//            } else {
//                window.alert('No results found');
//            }
//        } else {
//            window.alert('Geocoder failed due to: ' + status);
//        }
//    });
//	
//    var placeId = document.getElementById('location-input2').value;
//
//    geocoder.geocode({'address': placeId}, function(results, status) {
//
//        if (status === 'OK') {
//
//            if (results[0]) {
//
//                console.log(results[0].geometry.location.lat());
//
//            } else {
//                window.alert('No results found');
//            }
//        } else {
//            window.alert('Geocoder failed due to: ' + status);
//        }
//    });	
//	
//    var placeId = document.getElementById('location-input3').value;
//
//    geocoder.geocode({'address': placeId}, function(results, status) {
//
//        if (status === 'OK') {
//
//            if (results[0]) {
//
//                console.log(results[0].geometry.location.lat());
//
//            } else {
//                window.alert('No results found');
//            }
//        } else {
//            window.alert('Geocoder failed due to: ' + status);
//        }
//    });	
//}

// query button
//$('#myButton').on('click', function () {
//    var $btn = $(this).button('loading')
//    // business logic...
//    $btn.button('reset')
//})

//
//function getData(start, end) {
//    var startArray = start.split("-")
//    var currentYear = parseInt(startArray[0])
//    var currentMonth = parseInt(startArray[1])
//    
//    var endArray = end.split("-")
//    var endYear = parseInt(endArray[0])
//    var endMonth = parseInt(endArray[1])
//    var data;
//	
//    while (!(currentYear == endYear && currentMonth != endMonth)) {
//        
//	$(document).ready(function(){
//	  $.ajax({
//		type:"get",
//		//avoid hardcoding the URL since we need more options from the Longitude, Latitude and Date
//		url:"https://data.police.uk/api/crimes-street/all-crime?poly="+urlString1+":"+urlString2+":"+urlString3+"&date="+date,
//		success: function(data){
//		result="";
//
//		for(i in data)  
//		{	
//		  <!-- Specifying the category to only "violent-crime" -->
//			if(data[i].category=="violent-crime")
//			{
//				result+="Category: "+data[i].category+"  Latitude: "+data[i].location.latitude+"  Longitude: "+data[i].location.longitude+"  Date: "+data[i].month+"<br>";
//			}
//
//			$("#list").html(result);
//		}
//	  });
//	});
//
//		if (currentMonth == 12) {
//            currentYear++
//        } else {
//            currentMonth++
//        }
//    }
//}
