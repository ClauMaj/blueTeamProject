
$(() => {
    

mapboxgl.accessToken = 'pk.eyJ1IjoiY2xhdW1haiIsImEiOiJja2l5dGVzeDcyaXUzMzRwNGJ3ZjE4b2tqIn0.1PMSrPzu3pEeNqUTGTaQbg';


// create map
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v10',
    center: [-96, 37.8],
    zoom: 2.5
});

// create location points on map
var geojson = {
    type: 'FeatureCollection',
    features: [{
    type: 'Feature',
    geometry: {
        type: 'Point',
        coordinates: [-77.032, 38.913]
    },
    properties: {
        title: 'Snow 1',
        description: 'Washington, D.C.'
    }
    },
    {
    type: 'Feature',
    geometry: {
        type: 'Point',
        coordinates: [-104.9653, 39.7348]
    },
    properties: {
        title: 'Snow 3',
        description: 'Denver, Colorado'
    }
    },
    {
    type: 'Feature',
    geometry: {
        type: 'Point',
        coordinates: [-122.414, 37.776]
    },
    properties: {
        title: 'Snow 2',
        description: 'San Francisco, California'
    }
    }]
};

// add markers to map
geojson.features.forEach(function(marker) {

// create a HTML element for each feature
var el = document.createElement('div');
el.className = 'marker';

// make a marker for each feature and add to the map + popup
new mapboxgl.Marker(el)
    .setLngLat(marker.geometry.coordinates)
    .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
    .setHTML('<h3>' + marker.properties.title + '</h3><p>' + marker.properties.description + '</p>'))
    .addTo(map);
});
// make a marker for user
var userel = document.createElement('div');
userel.className = 'userMarker';
new mapboxgl.Marker(userel)
    .setLngLat([-84.3554, 34.655])
    .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
    .setHTML('<h3>User</h3><p>Location</p>'))
    .addTo(map);


       //get user current IP

$('#locationButton').click ((e) => {
    e.preventDefault();
    fetch('https://ipapi.co/json/')
    .then(response => response.json())
    .then((data) => {
        console.log(data);
    })
    .catch(function(error) {
    console.log(error)
    });
}) 
// webcam API

// fetch("https://api.windy.com/api/webcams/v2/list/nearby=39.7348,-104.9653,50?show=webcams:player,url&key=EIbRugfzPgAfeh0Y3AlQubwvpWPRkX10")
// .then(response => response.json())
//     .then((data) => {
//         console.log(data);
//     })
//     .catch(() => {
//         console.log("Please search for a valid url");
//     });



}) // jQuery end