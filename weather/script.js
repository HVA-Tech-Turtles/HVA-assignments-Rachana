const API_KEY="c96ab4be04d848e4cf30aa0bcbd81090";

// const API=`https://api.openweathermap.org/data/2.5/weather?
// q=${city}&appid=${API_KEY}&units=metric`
// const IMG_URL=`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`

const form = document.querySelector("form");
const search = document.querySelector("#search");
const weather = document.querySelector("#weather");

const getWeather = async(city) => {
    weather.innerHTML = `<h2> Loading... <h2>`
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    const response = await fetch(url);
    const data = await response.json();
    console.log(data)
    return showWeather(data);
	
}

const showWeather = (data) => {
    if (data.cod == "404") {
        weather.innerHTML = `<h2>${data.message}<h2>`
        return;
    }
    weather.innerHTML = `
        <div>
            <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" width="250px" height="250px">
        </div>
        <div>
		    <h2>${data.name}</h2> 	
            <h3>${data.main.temp} ℃</h3>
            <h4> ${data.weather[0].main} </h4>
        </div>
    `
}


form.addEventListener("submit", function(event) {
        getWeather(search.value);
        event.preventDefault();
    }
)