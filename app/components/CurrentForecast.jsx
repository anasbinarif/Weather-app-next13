import React from "react";
import { useState, useEffect } from "react";
import { WeatherIcon } from "./WeatherIcon";

const CurrentForecast = ({ longitude, latitude, city }) => {
  const [forecast, setForecast] = useState([]);

  useEffect(() => {
    const fetchCurrentWeather = async () => {
      let response;
      if (city?.length > 0) {
        response = await fetch(`/api/current_forecast/${city}`);
      } else {
        response = await fetch(
          `/api/current_forecast?longitude=${longitude}&latitude=${latitude}`
        );
      }
      const data = await response.json();
      // console.log("current forecast", data);
      setForecast(data);
    };
    fetchCurrentWeather();
  }, [latitude, longitude, city]);

  return (
    <div className="bg-gray-200 rounded-md p-5">
      <h3 className="text-lg font-semibold text-gray-400 mt-[-14px] mb-4">
        TODAY'S FORECAST
      </h3>
      <div className="flex justify-around">
        {forecast.map((fore, key) => (
          <div
            className={`flex flex-col items-center ${
              key !== forecast.length - 1 ? "border-r border-gray-600 pr-7" : ""
            }`}
            key={key}
          >
            <p className="text-gray-400">{fore?.formattedTime}</p>
            {/* {getWeatherIcon(fore.weather[0]?.main)} */}
            <WeatherIcon icon={fore.iconClass} />
            <h2>{fore["main"]?.temp}&deg;</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CurrentForecast;
