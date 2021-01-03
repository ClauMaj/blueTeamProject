
$(() => {
  
  var skiMarker
  const input = document.getElementById('userInput');
  const apiKey = "31faa444f98c7147da938529e5c20a15";//openweathermap
  const apiKey2 = "9720c43533e24b5bb25151217202312"//worldweatheronline
  // const url1 = `https://cors-anywhere.herokuapp.com/api.openweathermap.org/data/2.5/weather?q=Jackson, Wy&&appid=${apiKey}`  
  // const url2 = `https://cors-anywhere.herokuapp.com/api.worldweatheronline.com/premium/v1/search.ashx?key=${apiKey2}&q=Jackson, Wy&format=json&num_of_results=3&wct=Ski`
  
  // remove elements from map
//   const removeMarkers = (currentMarkers) => {
//     if (currentMarkers!== null) {
//         for (var i = currentMarkers.length- 1; i >= 0; i--) {
//             currentMarkers[i].remove();
//         }
//     }
//     geojson.features = [];
// }
  //create marker for ski resorts nearby
  const createSkiMarker = (ski, long, lat) => {
    let from = turf.point([cityLon,cityLat]);
    ski.search_api.result.forEach((item) => {
        let newSkiMark = {
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [ski.search_api.result.longitude, ski.search_api.result.latitude]
            },
            properties: {
                title: 'Slopes found here:',
                description: `${item.value}`,
                // distance: 0  work here to create function for distance.
                distance: Math.round(turf.distance(from, turf.point([ski.search_api.result.longitude, ski.search_api.result.latitude])))
            }
        }
        geojson.features.push(newSkiMark);
    })
}
// api call for ski resorts nearby
$('#submitCity').click ((e) => {
  e.preventDefault();
  let pickedCity = $('#cityInput').val();
  console.log(pickedCity);
  function skiMarkerLocal (longitude, latitude) {
    fetch(`https://cors-anywhere.herokuapp.com/api.worldweatheronline.com/premium/v1/search.ashx?key=${apiKey2}&q=${pickedCity}&format=json&num_of_results=3&wct=Ski`)

    .then(response => response.json())
    .then((data) => {
      console.log(data);
      createSkiMarker(data, longitude, latitude)

    })
    
  }  

      

  // })
  // fetch(url1)  

  // .then(response => response.json())
    
  // .then(data => {
    
  //     console.log(data);
      // console.log(data.weather[0].id);
      // console.log(data.weather[0].description);
      // console.log(data.coord);
      // console.log(data.name);
      // let newArr = [] //local var that is pushed if snow is present
      
        
      // if(data.weather[0].id <= 599 && data.weather[0].id >= 623){
        
      //   newArr.push("No snow today")
      // }
      // else{

      //   $("#userInput").val("");
      //   newArr.push(data)
      // }

      

    
    
      
      
})
  
  



    

    

  