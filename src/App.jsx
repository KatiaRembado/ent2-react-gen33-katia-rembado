import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import WeatherCard from './components/WeatherCard'

function App() {

  const [coords, setCoords] = useState()
  const [weather, setWeather] = useState()
  const [temp, setTemp] = useState()
  const [isLoading, setIsLoading] = useState(true)

  const success = position => {
    const obj = {
      lat: position.coords.latitude,
      lon: position.coords.longitude
    }
    setCoords(obj)
  }

  useEffect(() => {
    setIsLoading(true)
    navigator.geolocation.getCurrentPosition(success)
  }, [])

  useEffect(() => {
    if (coords) {

      const API_KEY = '11f66e31ce949f4101973a8b088f7537'

      const { lat, lon } = coords

      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${API_KEY}`

      axios.get(url)
      .then(res => {
        setWeather(res.data)
        console.log(res.data)
        const obj = {
          celsius: (res.data.main.temp - 273.15).toFixed(1),
          fahrenheit: ((res.data.main.temp - 273.15) * 9 / 5 + 32).toFixed(1)
        }

        setTemp(obj)
      })
      .catch(err => console.log(err))
      .finally(() => setIsLoading(false))
    }
  }, [coords])



  return (
    <div className='app'>
      {
        isLoading
        ? <h2>Loading...</h2>
        : (
          <WeatherCard 
          weather={weather}
         temp={temp}
         />
        )
      }
    </div>
  )
}

export default App