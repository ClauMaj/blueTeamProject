
$(() => {
    

mapboxgl.accessToken = 'pk.eyJ1IjoiY2xhdW1haiIsImEiOiJja2l5dGVzeDcyaXUzMzRwNGJ3ZjE4b2tqIn0.1PMSrPzu3pEeNqUTGTaQbg';
const apiKey2 = "9720c43533e24b5bb25151217202312"//worldweatheronline
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
                distance: Math.round(turf.distance(from, turf.point([item.city.coord.lon,item.city.coord.lat]))),
                class: "marker"
            }
        }
        tempSnow.push(newMark);
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
}

  //create marker for ski resorts nearby
const createSkiMarker = (ski, long, lat) => {
    let from = turf.point([long,lat]);
    ski.search_api.result.forEach((item) => {
        let newSkiMark = {
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [parseFloat(item.longitude), parseFloat(item.latitude)]
            },
            properties: {
                title: 'Slopes found here:',
                description: `${item.areaName[0].value}, ${item.region[0].value} `,
                distance: Math.round(turf.distance(from, turf.point([parseFloat(item.longitude), parseFloat(item.latitude)]))),
                class: "skiMarker"
            }
        }
        geojson.features.push(newSkiMark);
    })
            addMarkersToMap(geojson);
}
var counter = 0;
function skiMarkerLocal (longitude, latitude) {
    fetch(`https://api.worldweatheronline.com/premium/v1/search.ashx?key=${apiKey2}&q=${latitude},${longitude}&format=json&num_of_results=7&wct=Ski`)
    .then(response => response.json())
    .then((data) => {
            createSkiMarker(data, longitude, latitude-(2*counter));
    })
    .catch(function(error) {
        console.log(error);
        if (latitude <= 90){
            counter+=1;
            skiMarkerLocal (longitude, latitude+2);
        }
        else{
            addMarkersToMap(geojson);
        }
        });
    
    }
// add markers to map
const addMarkersToMap = (geojson) => {
    geojson.features.forEach(function(marker) {
    // create a HTML element for each feature
    var el = document.createElement('div');
    if (marker.properties.class === "marker"){
        el.className = "marker";
    }
    else if (marker.properties.class === "skiMarker"){
        el.className = "skiMarker";
    }
    // make a marker for each feature and add to the map + popup
    let mark = new mapboxgl.Marker(el)
        .setLngLat(marker.geometry.coordinates)
        .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
        .setHTML('<h3>' + marker.properties.title + '</h3><p>' + marker.properties.description + '</p><p>' + marker.properties.distance +' Kilometers' + '</p>'))
        .addTo(map);
        curentMarkers.push(mark);
    });
    counter = 0;
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
const createUserMarker = (lon,lat,city) => {
    var userel = document.createElement('div');
    userel.className = 'userMarker';
    var userMark = new mapboxgl.Marker(userel)
        .setLngLat([lon,lat])
        .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
        .setHTML(`<h3>${city}</h3><p>You are here!</p>`))
        .addTo(map);
        curentUserMarker.push(userMark);
};


    //remove current markers + get user current location (ipApi) + show it on map
$('#locationButton').click ((e) => {
    e.preventDefault();
    fetch('https://ipapi.co/json/')
    .then(response => response.json())
    .then((data) => {
        removeMarkers(curentMarkers);
        removeMarkers(curentUserMarker);
        curentMarkers = [];
        curentUserMarker = [];
        createUserMarker(data.longitude,data.latitude,data.city);
        map.flyTo({
            center: [data.longitude,data.latitude],
            zoom: 2.7
            });
        createSnowMarkers(snowCities,data.longitude,data.latitude);
        skiMarkerLocal (data.longitude, data.latitude);
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
        createUserMarker(data.features[0].center[0],data.features[0].center[1],data.features[0].place_name);
        map.flyTo({
            center: [data.features[0].center[0],data.features[0].center[1]],
            zoom: 2.7
            });
        createSnowMarkers(snowCities,data.features[0].center[0],data.features[0].center[1]);
        skiMarkerLocal (data.features[0].center[0], data.features[0].center[1]);
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


