var map;

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 2,
    center: {lat: -33.865427, lng: 151.196123},
    mapTypeId: 'terrain'
  });

  // Create a <script> tag and set the USGS URL as the source.
  var script = document.createElement('script');

  // This example uses a local copy of the GeoJSON stored at
  // http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojsonp
  script.src = 'https://developers.google.com/maps/documentation/javascript/examples/json/earthquake_GeoJSONP.js';
  document.getElementsByTagName('head')[0].appendChild(script);

  map.data.setStyle(function(feature) {
    var magnitude = feature.getProperty('mag');
    return {
      icon: getCircle(magnitude)
    };
  });
}

function getCircle(magnitude) {
  return {
    path: google.maps.SymbolPath.CIRCLE,
    fillColor: 'red',
    fillOpacity: .2,
    scale: Math.pow(2, magnitude) / 2,
    strokeColor: 'white',
    strokeWeight: .5
  };
}

function eqfeed_callback(results) {
  map.data.addGeoJson(results);
}

//Pie chart

window.onload = function () {
var pieChart = new CanvasJS.Chart("pieChart", {
	exportEnabled: true,
	animationEnabled: true,
	title:{
		text: "Regional sexual assault chart"
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
		text:"International sexual assualt status"
	},
	axisX:{
		interval: 1
	},
	axisY2:{
		interlacedColor: "rgba(1,77,101,.2)",
		gridColor: "rgba(1,77,101,.1)",
		title: "Sexual assults"
	},
	data: [{
		type: "bar",
		name: "Countries",
		axisYType: "secondary",
		color: "#014D65",
		dataPoints: [
			{ y: 3, label: "Sweden" },
			{ y: 7, label: "Taiwan" },
			{ y: 5, label: "Russia" },
			{ y: 9, label: "Spain" },
			{ y: 7, label: "Brazil" },
			{ y: 7, label: "India" },
			{ y: 9, label: "Italy" },
			{ y: 8, label: "Australia" },
			{ y: 11, label: "Canada" },
			{ y: 15, label: "South Korea" },
			{ y: 12, label: "Netherlands" },
			{ y: 15, label: "Switzerland" },
			{ y: 25, label: "Britain" },
			{ y: 28, label: "Germany" },
			{ y: 29, label: "France" },
			{ y: 52, label: "Japan" },
			{ y: 103, label: "China" },
			{ y: 134, label: "US" }
		]
	}]
});
barChart.render();
    
}

function explodePie (e) {
	if(typeof (e.dataSeries.dataPoints[e.dataPointIndex].exploded) === "undefined" || !e.dataSeries.dataPoints[e.dataPointIndex].exploded) {
		e.dataSeries.dataPoints[e.dataPointIndex].exploded = true;
	} else {
		e.dataSeries.dataPoints[e.dataPointIndex].exploded = false;
	}
	e.chart.render();

}

function switchOn(id) {
    var x = document.getElementById(id);
	if (x.style.display == '') {
		x.style.display = 'inline-block';
		if (term == 1) {
			term1 += 1;
			issueWarning();
		} else if (term == 2) {
			term2 += 1;
			issueWarning();
		}
	}
}

var url = 'https://newsapi.org/v2/everything?' +
          'q=sexual+assault&' +
          'sortBy=popularity&' +
          'apiKey=13023a411421424eb2a9c64bcefb2d62';

var req = new Request(url);

var data = fetch(req)
    .then(function(response) {
        console.log(response.json());
    })

 var r = new Array(), j = -1;
 for (var key=0, size=data.length; key<size; key++){
     r[++j] ='<tr><td>';
     r[++j] = data[key][0];
     r[++j] = '</td><td cope="col">';
     r[++j] = data[key][1];
     r[++j] = '</td><td scope="col">';
     r[++j] = data[key][2];
     r[++j] = '</td></tr>';
 }
 $('#dataTable').html(r.join('')); 

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