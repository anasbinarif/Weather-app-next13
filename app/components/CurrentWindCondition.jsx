import React from "react";
import { useEffect, useState } from "react";

const CurrentWindCondition = ({ longitude, latitude, city }) => {
  const [forecast, setForecast] = useState([]);

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
      setForecast(data);
    };
    fetchCurrentWeather();
  }, [latitude, longitude, city]);

  return (
    <div className="bg-gray-200 rounded-md p-5">
      <h3 className=" text-lg font-semibold text-gray-400 mb-4">
        AIR CONDITIONS
      </h3>
      <div className="grid grid-cols-2 gap-4">
        {forecast?.list && forecast.list.length > 0 && (
          <>
            <div>
              <h3 className="text-gray-400">Feels Like</h3>
              <h1 className="font-bold">
                {Math.round(forecast.list[0]?.main?.feels_like)}&deg;
              </h1>
            </div>
            <div>
              <h3 className="text-gray-400">Wind Speed</h3>
              <h1 className="font-bold">
                {Math.round(forecast.list[0]?.wind?.speed * 3.6)} km/h
              </h1>
            </div>
            <div>
              <h3 className="text-gray-400">UV Index</h3>
              <h1 className="font-bold">{forecast.list[0]?.uv_index}</h1>
            </div>
            <div>
              <h3 className="text-gray-400">Chance of Rain</h3>
              <h1 className="font-bold">
                {Math.round(forecast.list[0]?.pop * 100)}%
              </h1>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CurrentWindCondition;
