# Slope Search

- Check live game here => http://blue-team-project.s3-website.us-east-2.amazonaws.com

## What it is

- Slope Search is an app that searches and returns locations where snow is actively falling and where ski resorts have powder on the ground.

![Image of Slope Search](images/SlopeSearch.png)

- Using real-time data from MapBox and api.worldweatheronline and IpAPI, users receive a list of the closest snow to either their location or a city of their choice.



# Technologies Used To Create Slope Search

- JavaScript
- HTML5
- CSS
- jQuery
- BootStrap
- AJAX

## Some interesting code and facts

- Most of the challenges came from the limitations of the free versions of APIs where we had to come up with creative ideas like this recursive function to expand the searc when there is no result:
```javascript
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
```
- Creating map markers and processing the response from the WorldWeathe Api through mapbox and Turf.js
```javascript
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
```
- Bad practice in exposing some data but we will fix it in the near future

# Contributors
- Claude Major - Project Manager and JS code github.com/ClauMaj
- Matt Philips - Data Mining and JS code github.com/jmphil
- Jacob Deel - Website Design and UX/UI code github.com/jacoblakedeel
