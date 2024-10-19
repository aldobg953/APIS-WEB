"use client";

import { useRef, useEffect, useState } from 'react';
import styles from "./weather.module.css";

export default function Weather() {
  const [loading, setLoading] = useState(false);
  const weatherFormRef = useRef(null);
  const cityInputRef = useRef(null);
  const cardRef = useRef(null)

  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://cdn.lordicon.com/lordicon.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
        document.body.removeChild(script);
    };
}, []);

  useEffect(() => {
    const weatherForm = weatherFormRef.current;
    const cityInput = cityInputRef.current;
    const card = cardRef.current;
    const apiKey = "44d045248d446e72d1eafb268e5a4a51";

    if (weatherForm) {
      weatherForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const city = cityInput.value;

        if (city) {
          try {
            const weatherData = await getWeather(city);
            displayWeatherInfo(weatherData);
          } catch (error) {
            console.error(error);
            displayError(error);
          }
        } else {
          displayError("Please enter a city");
        }
      });
    }

    async function getWeather(city) {
      setLoading(true);
      
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

      const response = await fetch(apiUrl);

      if (!response.ok) {
        setLoading(false);
        throw new Error("Failed to fetch weather data");
      }

      setLoading(false);
      return await response.json();
    }

    function displayWeatherInfo(data) {
      
      const {name: city, 
             main: {temp, humidity}, 
             weather: [{description, id}]} = data;

      card.textContent = "";
      card.style.display = "flex";

      const cityDisplay = document.createElement("h2");
      const tempDisplay = document.createElement("p");
      const humidityDisplay = document.createElement("p");
      const descDisplay = document.createElement("p");
      const weatherEmoji = document.createElement("p");

      cityDisplay.textContent = city;
      tempDisplay.textContent = `${(temp - 273.15).toFixed(0)}°C`;
      humidityDisplay.textContent = `Humidity: ${humidity}%`;
      descDisplay.textContent = description;
      weatherEmoji.textContent = getWeatherEmoji(id);

      cityDisplay.classList.add(styles.cityDisplay);
      tempDisplay.classList.add(styles.tempDisplay);
      humidityDisplay.classList.add(styles.humidityDisplay);
      descDisplay.classList.add(styles.descDisplay);
      weatherEmoji.classList.add(styles.weatherEmoji);

      card.appendChild(cityDisplay);
      card.appendChild(tempDisplay);
      card.appendChild(humidityDisplay);
      card.appendChild(descDisplay);
      card.appendChild(weatherEmoji);
    }

    function getWeatherEmoji(weatherId) {
      
      switch(true){
        case(weatherId >= 200 && weatherId < 300):
          return "⛈️";
        case(weatherId >= 300 && weatherId < 400):
          return "🌧️";
        case(weatherId >= 500 && weatherId < 600):
          return "🌧️";
        case(weatherId >= 600 && weatherId < 700):
          return "🌨️";
        case(weatherId >= 700 && weatherId < 782):
          return "🌫️";
        case(weatherId == 781):
          return "🌪️";
        case(weatherId === 800):
          return "☀️";
        case(weatherId == 801):
          return "🌤️";
        case(weatherId == 802):
          return "⛅";
        case(weatherId == 803 || weatherId == 804):
          return "☁️";
      }

    }

    function displayError(message) {
      const errorDisplay = document.createElement("p");
      errorDisplay.textContent = message;
      errorDisplay.classList.add("errorDisplay");

      card.textContent = "";
      card.style.display = "flex";
      card.appendChild(errorDisplay);
    }
  }, []);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <a className={styles.backHome} href="/">&larr; Back</a>
        <h1 className={styles.title}>OpenWeather API</h1>
      </header>
      
      <form ref={weatherFormRef} className={styles.weatherForm}>
        <input ref={cityInputRef} type="text" className={styles.cityInput} placeholder="Enter city" />
        <button type="submit" className={styles.citySubmit}>{loading ? <lord-icon
                    src="https://cdn.lordicon.com/gkryirhd.json"
                    trigger="loop"
                    state="loop-snake-alt"
                    colors="primary:#ffffff"
                >
                </lord-icon> : "Get weather"}</button>
      </form>
      
      <div ref={cardRef} className={styles.card} style={{ display: "none" }}>
      </div>

      <footer className={styles.footer}>
      <a href="https://matias.me/nsfw/">by Aldo Barrera</a>
      </footer>
    </div>
  );
}
