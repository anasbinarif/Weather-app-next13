import React from "react";
import { useEffect, useState } from "react";
import { WeatherIcon } from "./WeatherIcon";

const CurrentWeather = ({ longitude, latitude, city }) => {
  const [weatherData, setWeatherData] = useState({});


  useEffect(() => {
    const fetchCurrentWeather = async () => {
      let response;
      if (city?.length > 0) {
        response = await fetch(`/api/current_weather/${city}`);
      } else {
        response = await fetch(
          `/api/current_weather?longitude=${longitude}&latitude=${latitude}`
        );
      }
      const data = await response.json();
      setWeatherData(data);
    };
    fetchCurrentWeather();
  }, [latitude, longitude, city]);

  return (
    <div className="flex justify-between items-center m-7">
      <div className="flex justify-start flex-col">
        {weatherData && (
          <>
            <h1 className="font-bold text-4xl">{weatherData["city"]?.name}</h1>
            <h3 className="text-gray-400">
              Chance of rain {Math.round(weatherData?.list?.[0]?.pop * 100)}%
            </h3>
            <h3 className="font-bold text-4xl mt-10">
              {weatherData?.list?.[0]?.main?.temp}&deg;
            </h3>
          </>
        )}
      </div>
      <div className="">
        {weatherData?.list && weatherData.list.length > 0 && (
          <WeatherIcon icon={weatherData.list[0]?.weather[0]?.main} />
        )}
      </div>
    </div>
  );
};

export default CurrentWeather;
