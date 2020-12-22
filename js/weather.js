
$(() => {
    const searchBox = document.querySelector(“.search-box”)
    const apiKey = "Y31faa444f98c7147da938529e5c20a15";
    const inputVal = input.value;
    const { main, name, sys, weather } = data;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}&units=standard`;
  
    
    fetch(url)
    .then(response => response.json())
  
    .then(data => {
      console.log(data);
    
  })
    .catch(() => {
      msg.textContent = "Please search for a valid city";
    });
  
  
    
    .catch((error)=>{
        console.log(error)
  
    })
  
  msg.textContent = "";
  form.reset();
  input.focus();
  
  })
    
  
  
  
  