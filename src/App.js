import React, { useEffect, useState } from "react"

function App() {

  const [search, setSearch] = useState("")
  const [weather, setWeather] = useState()
  const [forecast, setForecast] = useState()
 
  const [sunsetTime, setSunsetTime] = useState("")
  const [sunriseTime, setSunriseTime] = useState("")
  const [currentTime, setCurrentTime] = useState("")
 
  const [day1, setDay1] = useState("")
  const [day2, setDay2] = useState("")
  const [day3, setDay3] = useState("")
  const [day4, setDay4] = useState("")
  const [day5, setDay5] = useState("")

  function getWeather() {
    
    let weatherUrl = `http://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=c03e180f35f138c9dc954a0e173293c0`
    let forecastUrl = `http://api.openweathermap.org/data/2.5/forecast?q=${search}&units=metric&appid=c03e180f35f138c9dc954a0e173293c0`
    
    if (search !== ""){
      fetch(weatherUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data.cod && data.cod !=="404"){
          setWeather(data)
          setSearch("")
        } else {
          alert("City not found")
        }
      })  

      fetch(forecastUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data.cod && data.cod !=="404"){
          setForecast(data)
        } else {
          return null
        }
      }) 
    }
  }
      
    // Convert unix numbers to time
    function convertTime(unixTime) {
      const date = new Date((unixTime) * 1000)
      const hours = date.getHours()
      const minutes = date.getMinutes()
      const formattedTime = `${hours}:${minutes}`
      return formattedTime;
    }
 
    // Convert date string into readable date
    function convertForecastDate(dateStr) {
      const forecastDate = new Date(dateStr)
      return forecastDate;
    }
    function formatDate(date) {
      const options = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
      return new Intl.DateTimeFormat('en-US', options).format(date);
    }

    useEffect(() => {
      if (weather) {
        setCurrentTime(convertTime(weather.dt))
        setSunriseTime(convertTime(weather.sys.sunrise))
        setSunsetTime(convertTime(weather.sys.sunset))
      }
    }, [weather])

    useEffect(() => {
      if (forecast) {
        setDay1(convertForecastDate(forecast.list[3].dt_txt))
        setDay2(convertForecastDate(forecast.list[11].dt_txt))
        setDay3(convertForecastDate(forecast.list[19].dt_txt))
        setDay4(convertForecastDate(forecast.list[27].dt_txt))
        setDay5(convertForecastDate(forecast.list[35].dt_txt))
      }
    }, [forecast])
    
    console.log(forecast)
    console.log(weather)


  return (
    <div>
      <div className="nav">
        <h1 className="title">Weather App</h1>
        <h1 className="tyler">Tyler<span className="emoji">😎</span></h1>
      </div>
      <div className="input-field">
        <input className="search-bar" type="search" placeholder="City, Country Code" onChange={(e) => setSearch(e.target.value)} value={search}></input>
        <button onClick={getWeather}>Search</button>
      </div>

      {!weather && !forecast && (
        <div style={{
          height: "100vh"
        }}>
          <h2 className="weather-main">Enter a City</h2>
          <h4 className="weather-main hidden">Last Updated:</h4>
          <h2 className="weather-main hidden">Description:</h2>
          <h2 className="weather-main hidden">Temperature:</h2>
          <h3 className="weather-main hidden">Feels Like:</h3>
          <div className="weather-other-container">
          <h2 className="weather-other humidity">Humidity: </h2>
          <h2 className="weather-other temp-high">High:</h2>
          <h2 className="weather-other temp-low">Low:</h2>
          <h2 className="weather-other wind">Wind Speed:</h2>
          <h2 className="weather-other sunrise">Sunrise:</h2>
          <h2 className="weather-other pressure">Pressure:</h2>
          <h2 className="weather-other sunset">Sunset:</h2>
          </div>
        </div>
      )}

      {/* Current Weather Section */}
      {weather && (
        <div className="current-weather">
          <div className="current-weather-middle">
            <h2 className="weather-main city">{weather.name}, {weather.sys.country}</h2>
            <h2 className="weather-main last-updated">Last Updated: {currentTime}</h2>
            <h2 className="weather-main temp">{Math.round(weather.main.temp)}°C</h2>
            <h2 className="weather-main feels-like">Feels Like: {Math.round(weather.main.feels_like)}°C</h2>
            <h2 className="weather-main description">{weather.weather[0].description}</h2>
          </div>
          <div className="weather-other-container">
            <h2 className="weather-other sunrise">Sunrise: {sunriseTime}</h2>
            <h2 className="weather-other sunset">Sunset: {sunsetTime}</h2>
            <h2 className="weather-other humidity">Humidity: {weather.main.humidity}%</h2>
            <h2 className="weather-other wind">Wind Speed: {Math.round(weather.wind.speed)}km/h</h2>
            <h2 className="weather-other pressure">Pressure: {(weather.main.pressure)/10}kPa</h2>
            <h2 className="weather-other temp-high">High: {Math.round(weather.main.temp_max)}°C</h2>
            <h2 className="weather-other temp-low">Low: {Math.round(weather.main.temp_min)}°C</h2>
          </div>
        </div>
      )}

      {/* Forecast Section  */}
      {forecast && forecast.list && (
        <div>
          <h2 className="forecast-title">5 Day Forecast</h2>
        <div className="forecast-section">
          <div className="forecast-box">
            <h3>{formatDate(day1)}</h3>
            <div className="forecast-temp">{Math.round(forecast.list[3].main.temp)}°C</div>
            <div>{forecast.list[3].weather[0].main}</div>
            <img src={`https://openweathermap.org/img/wn/${forecast.list[3].weather[0].icon}.png`}/>
            <div>Feels Like: {Math.round(forecast.list[3].main.feels_like)}°C</div>
            <div>POP: {((forecast.list[3].pop)*100).toFixed(0)}%</div>
          </div>
          <div className="forecast-box">
            <h3>{formatDate(day2)}</h3>
            <div className="forecast-temp">{Math.round(forecast.list[11].main.temp)}°C</div>
            <div>{forecast.list[11].weather[0].main}</div>
            <img src={`https://openweathermap.org/img/wn/${forecast.list[11].weather[0].icon}.png`}/>
            <div>Feels Like: {Math.round(forecast.list[11].main.feels_like)}°C</div>
            <div>POP: {((forecast.list[11].pop)*100).toFixed(0)}%</div>
          </div>
          <div className="forecast-box">
            <h3>{formatDate(day3)}</h3>
            <div className="forecast-temp">{Math.round(forecast.list[19].main.temp)}°C</div>
            <div>{forecast.list[19].weather[0].main}</div>
            <img src={`https://openweathermap.org/img/wn/${forecast.list[19].weather[0].icon}.png`}/>
            <div>Feels Like: {Math.round(forecast.list[19].main.feels_like)}°C</div>
            <div>POP: {((forecast.list[19].pop)*100).toFixed(0)}%</div>
          </div>
          <div className="forecast-box">
            <h3>{formatDate(day4)}</h3>
            <div className="forecast-temp">{Math.round(forecast.list[27].main.temp)}°C</div>
            <div>{forecast.list[27].weather[0].main}</div>
            <img src={`https://openweathermap.org/img/wn/${forecast.list[27].weather[0].icon}.png`}/>
            <div>Feels Like: {Math.round(forecast.list[27].main.feels_like)}°C</div>
            <div>POP: {((forecast.list[27].pop)*100).toFixed(0)}%</div>
          </div>
          <div className="forecast-box">
            <h3>{formatDate(day5)}</h3>
            <div className="forecast-temp">{Math.round(forecast.list[35].main.temp)}°C</div>
            <div>{forecast.list[35].weather[0].main}</div>
            <img src={`https://openweathermap.org/img/wn/${forecast.list[35].weather[0].icon}.png`}/>
            <div>Feels Like: {Math.round(forecast.list[35].main.feels_like)}°C</div>
            <div>POP: {((forecast.list[35].pop)*100).toFixed(0)}%</div>
          </div>
        </div>
        </div>
      )}

    </div>
      
  )
}

export default App;
