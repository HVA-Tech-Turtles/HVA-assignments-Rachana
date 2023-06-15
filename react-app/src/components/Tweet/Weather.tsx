import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Weatherfoot from './Weatherfoot';

const cities = [
  { name: 'Bangalore' },
  { name: 'Pune' },
  { name: 'Chennai' },
  {name :'Vishakhapatnam'}
  
];
const API_KEY="c96ab4be04d848e4cf30aa0bcbd81090";
const Weather = () => {
  const [weatherData, setWeatherData] = useState([]);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const requests = cities.map(city =>
          axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${city.name}&appid=${API_KEY}&units=metric`
          )
        );
        const responses = await axios.all(requests);
        const data = responses.map(response => response.data);
        setWeatherData(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeatherData();
  }, []);

  if (weatherData.length === 0) {
    return <div>Loading weather data...</div>;
  }

  return (
    <div className='tweet-container'>
      <h3>Weather Tweets</h3>
      {weatherData.map((data, index) => (
        <div key={index} className="tweet">
          <div className='weather-top'>
          <span className='fas fa-user my-custom-icon'></span> {'\u00A0'}
          <span>
            <strong className='username'>{cities[index].name}</strong> - {data.main.temp}°C
          </span>
          </div>
          <div>
            <img className='tweet-img'
             src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
             alt={data.weather[0].description}
            />
        </div>
        <p>Feels like : {data.main.feels_like}°C</p>
        <p>Humidity : {data.main.humidity}%</p>
        <p>Pressure : {data.main.pressure}mb</p>
        <p>{data.weather[0].description}</p>
          <Weatherfoot/>
        
        </div>
      ))}
    </div>
  );
};

export default Weather;
