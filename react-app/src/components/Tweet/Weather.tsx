import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Weatherfoot from './Weatherfoot';

const cities = [
  { name: 'Bangalore', query: 'Bangalore' },
  { name: 'Pune', query: 'Pune' },
  { name: 'Chennai', query: 'Chennai' },
  {name :'Mysore',query:'Mysore'}
  
];
const API_KEY="c96ab4be04d848e4cf30aa0bcbd81090";
const Weather = () => {
  const [weatherData, setWeatherData] = useState([]);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const requests = cities.map(city =>
          axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${city.query}&appid=${API_KEY}&units=metric`
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
    <div>
      <h3>Weather Tweets</h3>
      {weatherData.map((data, index) => (
        <div key={index} className="tweet">
          <span className='fas fa-user'></span> {'\u00A0'}
          <span>
            <strong>{cities[index].name}</strong> - {data.main.temp}°C
          </span>
          <div>
            <img className='tweet-img'
             src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
             alt={data.weather[0].description}
            />
        </div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga blanditiis totam asperiores enim autem nobis reprehenderit dolore dignissimos est quo.
          {/* <p>{data.main.condition.text}</p> */}
          <Weatherfoot/>
        
        </div>
      ))}
    </div>
  );
};

export default Weather;
