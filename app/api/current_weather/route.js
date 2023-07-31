export const GET = async (req, res) => {
  try {
    const ownKey = "244214300c31cb99ca6d50f32099e295";
    const latitude = req.nextUrl.searchParams.get("latitude");
    const longitude = req.nextUrl.searchParams.get("longitude");
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?units=metric&lat=${latitude}&lon=${longitude}&appid=${ownKey}&cnt=1`,
      { next: { revalidate: 30 } }
    );

    if (!response.ok) {
      throw new Response("HTTP error! status: ", { status: response.status });
    }

    const data = await response.json();

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch current weather data", {
      status: 500,
    });
  }
};
