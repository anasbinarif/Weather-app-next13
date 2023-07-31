"use client";

import React from "react";
import Search from "../components/Search";
import { useEffect, useState } from "react";
import CurrentWeather from "../components/CurrentWeather";
import CurrentForecast from "../components/CurrentForecast";
import WeekForecast from "../components/WeekForecast";
import CurrentWindCondition from "../components/CurrentWindCondition";

const page = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [city, setCity] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log("env", process.env.WEATHER_API_KEY);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
          setIsLoading(false);
        },
        (error) => {
          setError(error.message);
        }
      );
    } else {
      setError("Geolocation is not supported by your browser.");
    }
  }, []);

  return (
    <>
      {isLoading ? (
        <div>Loading....</div>
      ) : (
        <div className="flex ml-48 w-screen h-3/4 gap-6">
          <div className="h-full flex flex-col rounded-lg w-1/2 mt-10 ml-7 justify-evenly">
            <Search setCity={(e) => setCity(e)} city={city} />
            <CurrentWeather
              latitude={latitude}
              longitude={longitude}
              city={city}
            />
            <CurrentForecast
              latitude={latitude}
              longitude={longitude}
              city={city}
            />
            <CurrentWindCondition
              latitude={latitude}
              longitude={longitude}
              city={city}
            />
          </div>
          <div className=" mt-28">
            <WeekForecast
              latitude={latitude}
              longitude={longitude}
              city={city}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default page;
