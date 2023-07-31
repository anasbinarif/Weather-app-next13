export const GET = async (req, { params }) => {
    try {
      const ownKey = process.env.WEATHER_API_KEY;
      
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?units=metric&q=${params.city}&appid=${ownKey}`,
        { next: { revalidate: 30 } }
      );
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
  
      const forecasts = data.list.filter((forecast) => {
        const forecastTime = new Date(forecast.dt * 1000);
  
        const currentTime = new Date();
  
        return (
          forecastTime.getTime() <= currentTime.getTime() + 12 * 60 * 60 * 1000
        );
      });
  
      // Format the time to 12-hour format (hh:mm AM/PM)
      const formattedForecasts = forecasts.map((forecast) => {
        const forecastTime = new Date(forecast.dt * 1000);
        const formattedTime = forecastTime.toLocaleString(undefined, {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        });
  
        let iconClass = "";
        if (forecast.weather && forecast.weather.length > 0) {
          switch (forecast.weather[0].main) {
            case "Clear":
              iconClass = "Clear";
              break;
            case "Clouds":
              iconClass = "Clouds";
              break;
            case "Rain":
              iconClass = "Rain";
              break;
            case "Drizzle":
              iconClass = "Drizzle";
              break;
            case "Thunderstorm":
              iconClass = "Thunderstorm";
              break;
            case "Snow":
              iconClass = "Snow";
              break;
            default:
              iconClass = "unknown"; // A default icon for unknown weather conditions
          }
        }
  
        return { ...forecast, formattedTime, iconClass };
      });
      return new Response(JSON.stringify(formattedForecasts), { status: 200 });
    } catch (error) {
      return new Response("Failed to fetch current weather forecast data", {
        status: 500,
      });
    }
  };
  