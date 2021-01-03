
$(() => {
    

mapboxgl.accessToken = 'pk.eyJ1IjoiY2xhdW1haiIsImEiOiJja2l5dGVzeDcyaXUzMzRwNGJ3ZjE4b2tqIn0.1PMSrPzu3pEeNqUTGTaQbg';
var curentMarkers = [];
var curentUserMarker = [];

// create map
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v10',
    center: [-96, 37.8],
    zoom: 2.7
});

// create location points for the map
var geojson = {
    type: 'FeatureCollection',
    features: []
};

// create markers for snow

const createSnowMarkers = (snowCities,cityLon,cityLat) => {
    let from = turf.point([cityLon,cityLat]);
    let tempSnow = [];
    snowCities.data.forEach((item) => {
        let newMark = {
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [item.city.coord.lon, item.city.coord.lat]
            },
            properties: {
                title: 'Currently snowing here:',
                description: `${item.city.name}, ${item.city.country}`,
                distance: Math.round(turf.distance(from, turf.point([item.city.coord.lon,item.city.coord.lat])))
            }
        }
        tempSnow.push(newMark);
        // geojson.features.push(newMark);
    })
    // sort the markers by distance and push the first 10 to geojson
    tempSnow.sort(function(a, b) {
        if (a.properties.distance > b.properties.distance) {
            return 1;
        }
        if (a.properties.distance < b.properties.distance) {
            return -1;
        }
        return 0; // a must be equal to b
        });
        for (i=0;i<10;i++){
            geojson.features.push(tempSnow[i]);
        }
        console.log(tempSnow);
}

// add markers to map
const addMarkersToMap = (geojson,markerClass) => {
    geojson.features.forEach(function(marker) {

    // create a HTML element for each feature
    var el = document.createElement('div');
    el.className = markerClass;

    // make a marker for each feature and add to the map + popup
    let mark = new mapboxgl.Marker(el)
        .setLngLat(marker.geometry.coordinates)
        .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
        .setHTML('<h3>' + marker.properties.title + '</h3><p>' + marker.properties.description + '</p><p>' + marker.properties.distance +' Kilometers' + '</p>'))
        .addTo(map);
        curentMarkers.push(mark);
    });
}


// remove elements from map
const removeMarkers = (currentMarkers) => {
    if (currentMarkers!== null) {
        for (var i = currentMarkers.length- 1; i >= 0; i--) {
            currentMarkers[i].remove();
        }
    }
    geojson.features = [];
}
// make a marker for user
const createUserMarker = (lon,lat) => {
    var userel = document.createElement('div');
    userel.className = 'userMarker';
    var userMark = new mapboxgl.Marker(userel)
        .setLngLat([lon,lat])
        .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
        .setHTML('<h3>User</h3><p>You are here!</p>'))
        .addTo(map);
        curentUserMarker.push(userMark);
};


    //remove current markers + get user current location (ipApi) + show it on map
$('#locationButton').click ((e) => {
    e.preventDefault();
    fetch('https://ipapi.co/json/')
    .then(response => response.json())
    .then((data) => {
        console.log(data);
        console.log(curentMarkers);
        removeMarkers(curentMarkers);
        removeMarkers(curentUserMarker);
        curentMarkers = [];
        curentUserMarker = [];
        createUserMarker(data.longitude,data.latitude);
        map.flyTo({
            center: [data.longitude,data.latitude],
            zoom: 2.7
            });
        createSnowMarkers(snowCities,data.longitude,data.latitude);
        addMarkersToMap(geojson,"marker");
    })
    .catch(function(error) {
    console.log(error)
    });
}) 

// remove current markers from map + get location of the city + show it on map
$('#submitCity').click ((e) => {
    e.preventDefault();
    let pickedCity = $('#cityInput').val();
    fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${pickedCity}.json?access_token=${mapboxgl.accessToken}`)
    .then(response => response.json())
    .then((data) => {
        removeMarkers(curentMarkers);
        removeMarkers(curentUserMarker);
        curentMarkers = [];
        curentUserMarker = [];
        console.log(data);
        createUserMarker(data.features[0].center[0],data.features[0].center[1]);
        map.flyTo({
            center: [data.features[0].center[0],data.features[0].center[1]],
            zoom: 2.7
            });
        createSnowMarkers(snowCities,data.features[0].center[0],data.features[0].center[1]);
        addMarkersToMap(geojson,"marker");
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


