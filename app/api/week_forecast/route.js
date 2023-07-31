export const GET = async (req, res) => {
  try {
    const ownKey = process.env.WEATHER_API_KEY;
    const latitude = req.nextUrl.searchParams.get("latitude");
    const longitude = req.nextUrl.searchParams.get("longitude");
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?units=metric&lat=${latitude}&lon=${longitude}&appid=${ownKey}`,
      { next: { revalidate: 30 } }
    );

    if (!response.ok) {
      throw new Response("HTTP error! status: ", { status: response.status });
    }

    const data = await response.json();

    const forecasts = data.list;

    // Group the forecasts by date
    const groupedForecasts = forecasts.reduce((result, forecast) => {
      const forecastTime = new Date(forecast.dt * 1000);
      const forecastDate = forecastTime.toDateString();
      // console.log("forecastDate", forecastDate);

      if (
        !result[forecastDate] ||
        forecastTime < new Date(result[forecastDate].dt * 1000)
      ) {
        result[forecastDate] = forecast;
      }

      return result;
    }, {});

    // Convert the groupedForecasts object back to an array
    const weatherDataFor6Days = Object.values(groupedForecasts);

    // Format the time to 12-hour format (hh:mm AM/PM)
    const formattedForecasts = weatherDataFor6Days.map((forecast) => {
      const forecastTime = new Date(forecast.dt * 1000);
      const formattedTime = forecastTime.toLocaleString(undefined, {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
      const forecastDate = new Date(forecast.dt * 1000).toDateString();
      return { ...forecast, formattedTime, forecastDate };
    });
    return new Response(JSON.stringify(formattedForecasts), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch current weather forecast data", {
      status: 500,
    });
  }
};
