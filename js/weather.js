$(() => {
  
  const input = document.getElementById('userInput').value;
  const apiKey = "c69d1b8c1ab292df373c204197005194";
  const url = `https://cors-anywhere.herokuapp.com/api.openweathermap.org/data/2.5/weather?q=${input}&&appid=${apiKey}`  

  
  fetch(url)  

  .then(response => response.json())
  
  .then(data => {
      console.log(data);
      // console.log(data.weather[0].id);
      // console.log(data.weather[0].description);
      // console.log(data.coord);
      // console.log(data.name);
      let newArr = []
      // data.forEach((obj) => {
        
        if(data.weather[0].id >= 600 && data.weather[0].id <= 622){

          newArr.push(data)
        }
        else{
          
          newArr.push("No snow today")
        }

      // })
      console.log(newArr);
    //need city name, cords, and description
  })
  
  .catch((error)=>{
      console.log(error)
  
    
  })


  
  
})
  