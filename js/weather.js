
$(() => {
  
  var weather, ski; // weather is from openweathermap and ski is from worldweatheronline
  const input = document.getElementById('userInput');
  const apiKey = "31faa444f98c7147da938529e5c20a15";//openweathermap
  const apiKey2 = "9720c43533e24b5bb25151217202312"//worldweatheronline
  // const url1 = `https://cors-anywhere.herokuapp.com/api.openweathermap.org/data/2.5/weather?q=Jackson, Wy&&appid=${apiKey}`  
  // const url2 = `https://cors-anywhere.herokuapp.com/api.worldweatheronline.com/premium/v1/search.ashx?key=${apiKey2}&q=Jackson, Wy&format=json&num_of_results=3&wct=Ski`
  
  $('#submitCity').click ((e) => {
    e.preventDefault();
    let pickedCity = $('#cityInput').val();
    console.log(pickedCity);
    fetch(`https://cors-anywhere.herokuapp.com/api.worldweatheronline.com/premium/v1/search.ashx?key=${apiKey2}&q=${pickedCity}&format=json&num_of_results=3&wct=Ski`)
    .then(response => response.json())
    .then((data) => {
        createUserMarker(ski.search_api.result[0, 1, 2].areaName[0].value)
        removeMarkers(curentMarkers);
        removeMarkers(curentUserMarker);
        curentMarkers = [];
        curentUserMarker = [];

    })

  })
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
  
  



    

    

  