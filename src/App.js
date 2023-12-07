import './App.css';
import { useEffect, useState } from 'react';
import { WeatherBox } from './component/WeatherBox';
import { WeatherButton } from './component/WeatherButton';
import ClipLoader from "react-spinners/ClipLoader";

function App() {

  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(true);

  const cities = ['paris','new york', 'tokyo', 'seoul'];

  useEffect( () => {
    if(city === "") {
      getCurrentLocation();
    }else {
      getWeatherByCity();
    } 
  },[city]);

  const getWeatherByCity = async () => {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=cc35598700cac0580d31338fa7df4681&units=metric`;
    setLoading(true);
    let response = await fetch(url);
    let data = await response.json();
    setWeather(data);
    setLoading(false);
  }

  const getCurrentLocation = (()=> {
    navigator.geolocation.getCurrentPosition(showPosition);
  });
  
  const showPosition = ((position)=> {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    getWeatherByCurrentLocation(lat,lon);
  })

  const getWeatherByCurrentLocation = async(lat,lon) => {
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=cc35598700cac0580d31338fa7df4681&units=metric`;
    setLoading(true);
    let response = await fetch(url);
    let data = await response.json();
    setWeather(data);
    setLoading(false);
  };

  const changeHandler = () => {
    getCurrentLocation();
  }

  return (
    <div>
      <div className='container'>

        {loading ? <ClipLoader
          color="#f88cb"
          loading={loading}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        /> : 
          <div>
            <WeatherBox weather={weather}/>
            <WeatherButton cities={cities} setCity={setCity} changeHandler={() =>changeHandler()}/>
          </div>
        }
        
      </div>
    </div>
  );
}

export default App;
