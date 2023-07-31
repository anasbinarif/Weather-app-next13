import React from "react";
import { TiWeatherSunny, TiWeatherSnow } from "react-icons/ti";
import { WiNightThunderstorm } from "react-icons/wi";
import {
  BsFillCloudDrizzleFill,
  BsFillCloudLightningRainFill,
  BsFillCloudsFill,
} from "react-icons/bs";

export const WeatherIcon = ({ icon }) => {
  console.log("hello ali");
  return (
    <>
      {icon === "Clear" && <TiWeatherSunny size={48} />}
      {icon === "Clouds" && <BsFillCloudsFill size={48} />}
      {icon === "Rain" && <BsFillCloudLightningRainFill size={48} />}
      {icon === "Drizzle" && <BsFillCloudDrizzleFill size={48} />}
      {icon === "Snow" && <TiWeatherSnow size={48} />}
      {icon === "Thunderstorm" && <WiNightThunderstorm size={48} />}
    </>
  );
};
