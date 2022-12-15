import { createSearchParams, useNavigate } from "react-router-dom";
import { useWeatherData } from "../repo/weatherhooks";

export default function Weather(props: {
  name: string;
  lat: number;
  long: number;
}) {
  const navigate = useNavigate();
  const { error, loading, result } = useWeatherData({
    lat: props.lat,
    lon: props.long,
  });

  if (loading) {
    return <div>loading...</div>;
  }

  if (error) {
    return <div>Error</div>;
  }

  return (
    <button
      className="flex space-x-4"
      onClick={() => {
        navigate(
          "details?" +
            createSearchParams({
              name: props.name,
              lat: String(props.lat),
              lon: String(props.long),
            })
        );
      }}
    >
      <div className="text-blue-300">{props.name}</div>
      <div>{result?.weather[0].main}</div>
      <span>({Math.floor(result!.main.temp - 273)} &#8451;)</span>
    </button>
  );
}
