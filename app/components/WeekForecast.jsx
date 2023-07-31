import { useEffect, useState } from "react";
import { WeatherIcon } from "./WeatherIcon";

const WeekForecast = ({ longitude, latitude, city }) => {
  const [forecast, setForecast] = useState([]);

 
  useEffect(() => {
    const fetchCurrentWeather = async () => {
      let response;
      if (city?.length > 0) {
        response = await fetch(`/api/week_forecast/${city}`);
      } else {
        response = await fetch(
          `/api/week_forecast?longitude=${longitude}&latitude=${latitude}`
        );
      }
      const data = await response.json();
      // console.log("current forecast", data);
      setForecast(data);
    };
    fetchCurrentWeather();
  }, [latitude, longitude, city]);

  const getDayOfWeek = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", { weekday: "short" });
  };

  return (
    <div
      className="bg-gray-200 rounded-md p-5 flex flex-col justify-between h-full"
      style={{ width: "400px" }}
    >
      <h3 className="text-gray-400 text-lg font-semibold">6-DAY FORECAST</h3>
      <div className="flex flex-col flex-1">
        {forecast.map((fore, key) => (
          <div
            className={
              "flex items-center justify-between border-b border-gray-400 flex-grow"
            }
            key={key}
          >
            <p className="text-gray-400">{getDayOfWeek(fore?.forecastDate)}</p>
            <span className="flex items-center gap-3 justify-evenly">
              {fore?.weather && fore.weather.length > 0 && (
                <WeatherIcon icon={fore.weather[0].main} />
              )}
              {fore.weather[0].main}
            </span>
            <h2>{fore["main"]?.temp}&deg;</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeekForecast;
