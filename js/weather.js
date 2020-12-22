$(() => {
  
  const apiKey = "c69d1b8c1ab292df373c204197005194";
  
  const input = document.getElementById('userInput').value;
  
  fetch(`https://cors-anywhere.herokuapp.com/api.openweathermap.org/data/2.5/weather?q=denver&&appid=${apiKey}`)  

  .then(response => response.json())
  
  .then(data => {
      console.log(data);
      console.log(data.weather[0].id);
      console.log(data.weather[0].description);
      console.log(data.coord);
      console.log(data.name);
    //need city name, cords, and description
  })
  
  .catch((error)=>{
      console.log(error)
  
    
  })

  // function getId(e)
  // test()
  
})
  