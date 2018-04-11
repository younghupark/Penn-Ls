var map;
var penn = {lat: 39.952149, lng: -75.195830};
var x = 39.952;
var y = -75.193;
var marker = false;
var fixedMarker;
var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
var spreadsheetID = "1P1lrztphPkwntvwGg9LK6vJsm-IE7PGYBTcBbqt_S_0";
var apiKey = "AIzaSyD112yF6ORTtrx1-ugfhJLcx1VHDOla1Vs";
var url = "https://spreadsheets.google.com/feeds/list/1P1lrztphPkwntvwGg9LK6vJsm-IE7PGYBTcBbqt_S_0/od6/public/values?alt=json";

  function initMap() {
    $.getJSON(url, function(data) {

     for (var i = 0; i < data.feed.entry.length; i++) {
       var entries = data.feed.entry[i];
       var new_marker = loadMarker(map, entries);
     }
  });

  map = new google.maps.Map(document.getElementById('map'), {
          zoom: 17,
          tilt: 60,
          center: penn
   });

  Coordinate(map);


}

  function loadMarker(map, place) {

      var latlong = {
        lat: parseFloat(place.gsx$lat.$t),
        lng: parseFloat(place.gsx$long.$t)
      };

      var m = new google.maps.Marker({
          position: latlong,
          map: map,
          draggable: false
        });

      var infowindow = new google.maps.InfoWindow({
          content: place.gsx$response.$t,
        });

      m.addListener('click', function() {
          infowindow.open(map, m);
          });

      return marker;
    }

  function addMarker(location, map) {

    marker = new google.maps.Marker({
    position: map.getCenter(),
    map: map,
    draggable: true,
    animation: google.maps.Animation.DROP,
    //icon: iconBase + 'rip.png'
  });

  oneMarker = true;
}

function fixMarker(location, map, comment) {

   var infoWindow = new google.maps.InfoWindow({
     content: comment
   });

    fixedMarker = new google.maps.Marker({
    position: location,
    map: map,
    draggable: false
  });
    fixedMarker.addListener('click', function() {
      infoWindow.open(map, fixedMarker);

  });

}

function Coordinate(map) {

document.getElementById("addPin").addEventListener('click', function () {
  addMarker(penn, map);
  document.getElementById("addPin").style.backgroundColor = '#FFFFFF';
  document.getElementById("submit").style.backgroundColor = '#db3236';
  document.getElementById("submit").disabled = false;
  document.getElementById("addPin").disabled = true;
});
document.getElementById("submit").addEventListener("click", function(){
  if(document.getElementById("response").value) {
  x = marker.getPosition().lat();
  y = marker.getPosition().lng();
  document.getElementById("lat").value = x;
  document.getElementById("long").value = y;
  var markerLabel = document.getElementById("response").value;
  document.getElementById("nonmap").style.display = "none";
  document.getElementById("thankyou").style.display = "";
  fixMarker({lat: x, lng: y}, map, markerLabel);
 }
//  document.getElementById("response").value = "";
});

}
