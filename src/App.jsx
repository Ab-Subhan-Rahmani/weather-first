import React, { useState, useEffect } from 'react';
import { FaSearch, FaSun, FaCloud, FaCloudRain, FaSpinner } from 'react-icons/fa';
import './WeatherApp.css';

const WeatherApp = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const API_KEY = 'ba70dab37810a6ee6474b5a814e2638d'; // Replace with your actual API key
  const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

  const fetchWeather = async () => {
    if (!city) return; // Don't fetch if city is empty

    setLoading(true);
    setError('');
    setWeather(null);

    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      if (response.ok) {
        setWeather(data);
      } else {
        setError('City not found');
      }
    } catch (err) {
      setError('Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  const getWeatherIcon = (weatherCondition) => {
    switch (weatherCondition) {
      case 'Clear':
        return <FaSun className="weather-icon" />;
      case 'Clouds':
        return <FaCloud className="weather-icon" />;
      case 'Rain':
        return <FaCloudRain className="weather-icon" />;
      default:
        return <FaSun className="weather-icon" />;
    }
  };

  return (
    <div className="weather-app">
      <footer>Edite BY : Abdul Subhan Rahmani</footer>
      <h1>Weather App</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={fetchWeather} disabled={loading}>
          {loading ? <FaSpinner className="spinner" /> : <FaSearch />}
        </button>
      </div>
      {error && <p className="error">{error}</p>}
      {loading && <p className="loading">Loading...</p>}
      {weather && (
        <div className="weather-info">
          <h2>{weather.name}, {weather.sys.country}</h2>
          <div className="weather-details">
            {getWeatherIcon(weather.weather[0].main)}
            <p>{weather.main.temp}°C</p>
            <p>{weather.weather[0].description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;