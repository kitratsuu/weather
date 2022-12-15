import { format } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { useExtraLocation, useWeatherData } from "../repo/weatherhooks";

export default function Detail() {
  const [value1, setValue1] = useSearchParams();
  const date = new Date();

  const { error, loading, result } = useWeatherData({
    lat: Number(value1.get("lat")),
    lon: Number(value1.get("lon")),
  });

  const { error1, loading1, extrafetchloc } = useExtraLocation();

  if (loading1) {
    console.log("loading");
  }

  if (error1) {
    console.log("error");
  }

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    https: return <div>{error.message}</div>;
  }
  let img_source: string =
    "https://openweathermap.org/img/wn/" +
    String(result?.weather[0].icon) +
    "@2x.png";
  return (
    <div className="flex absolute h-full w-full justify-center text-center ">
      <div className="space-y-2 bg-weather opacity-90 bg-no-repeat bg-cover bg-center bg-fixed rounded-2xl lg:text-6xl md:text4xl sm:text-sm bg-cyan-500 px-6 py-6 flex h-full w-full justify-center text-center ">
        <div className="flex flex-col space-y-5">
          <div className="text-base text-white">
            {format(date, "dd/MMM/yyyy")}
          </div>
          <div className="text-white text-3xl font-extrabold">
            {value1.get("name")}
          </div>
          <div className="flex flex-col">
            <img
              className="flex w-36 h-32 text-center self-center"
              src={img_source}
              alt="weather"
            />

            <h1 className="max-w-lg text-2xl font-semibold leading-normal text-gray-900 dark:text-white">
              {result?.weather[0].main}
            </h1>
          </div>
          <div className="">
            <h4 className="max-w-lg text-lg font-normal leading-normal text-gray-900 dark:text-white">
              {result?.weather[0].description}
            </h4>
            <span className="max-w-lg font-semibold leading-normal text-gray-900 dark:text-white">
              <span className="text-4xl text-slate-300">
                {result?.main.temp ? Math.floor(result?.main.temp - 273) : ""}
                &#8451;
              </span>
            </span>
          </div>
          <div className="flex border-2 space-x-6 border-slate-500 bg-slate-500 bg-opacity-50 rounded-xl px-10 py-7">
            <div className="flex flex-col ">
              <span className=" max-w-lg text-lg font-thin leading-normal text-gray-900 dark:text-white">
                Humidity
              </span>
              <span className="max-w-lg text-lg font-normal leading-normal text-gray-900 dark:text-white">
                {" "}
                {result?.main.humidity}{" "}
              </span>
            </div>
            <div className="flex flex-col">
              <span className=" max-w-lg text-lg font-thin leading-normal text-gray-900 dark:text-white">
                wind speed
              </span>
              <span className="max-w-lg text-lg font-normal leading-normal text-gray-900 dark:text-white">
                {((Number(result?.wind.speed) * 3600) / 1000).toFixed(3)}km/hr
              </span>
            </div>
            <div className="flex flex-col">
              <span className=" max-w-lg text-lg font-thin leading-normal text-gray-900 dark:text-white">
                feeling
              </span>
              <span className="max-w-lg text-lg font-normal eading-normal text-gray-900 dark:text-white">
                {Math.floor(Number(result?.main.feels_like) - 273)}
              </span>
            </div>
          </div>
          <br />
          <button
            type="button"
            className="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            onClick={async () => {
              await extrafetchloc({
                name: String(value1.get("name")),
                lat: Number(value1.get("lat")),
                lon: Number(value1.get("lon")),
                day: 4,
              });
            }}
          >
            6 day data
          </button>
        </div>
      </div>
    </div>
  );
}
