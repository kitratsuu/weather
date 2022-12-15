import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useExtraWeatherdata } from "../../repo/weatherhooks";
import Sidenav from "../sidenav/sidenav";

export default function Daydata() {
  const [searchparms, setSearchparms] = useSearchParams();
  const [i, setI] = useState(0);

  const mysearchparms = {
    name: String(searchparms.get("name")),
    lat: Number(searchparms.get("lat")),
    lon: Number(searchparms.get("lon")),
    day: Number(searchparms.get("day")),
  };
  const { error, loading, result } = useExtraWeatherdata({
    lon: mysearchparms.lon,
    lat: mysearchparms.lat,
    day: mysearchparms.day,
  });

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    https: return <div>{error.message}</div>;
  }

  let img_source: string =
    "https://openweathermap.org/img/wn/" +
    String(result?.list[i].weather[0].icon) +
    "@2x.png";
  return (
    <>
      <div className="flex h-screen w-screen justify-start text-left ">
        <Sidenav
          day={(seti: number) => {
            setI(seti);
          }}
          result={result}
        />
        <div className="absolute space-y-2 opacity-90 lg:text-6xl md:text4xl sm:text-sm px-6 py-6 flex h-screen w-full justify-center text-center ">
          <div className="flex flex-col space-y-5">
            <div className="text-4xl font-normal leading-normal mt-0 mb-2 text-slate-200">
              {result?.list[i].dt_txt.slice(0, 10)}
            </div>
            <div className="text-2xl font-normal leading-normal mt-0 mb-2 text-slate-200">
              {result?.list[i].dt_txt.slice(11)}
            </div>
            <div className="text-white text-3xl font-extrabold">
              {mysearchparms.name}
            </div>
            <div className="flex flex-col">
              <img
                className="flex w-36 h-32 text-center self-center"
                src={img_source}
                alt="weather"
              />

              <h1 className="max-w-lg text-2xl font-semibold leading-normal text-gray-900 dark:text-white">
                {result?.list[i].weather[0].main}
              </h1>
            </div>
            <div className="">
              <h4 className="max-w-lg text-lg font-normal leading-normal text-gray-900 dark:text-white">
                {result?.list[i].weather[0].description}
              </h4>
              <span className="max-w-lg font-semibold leading-normal text-gray-900 dark:text-white">
                <span className="text-4xl text-slate-300">
                  {result?.list[i].main.temp
                    ? Math.floor(result?.list[i].main.temp - 273)
                    : ""}
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
                  {result?.list[i].main.humidity}{" "}
                </span>
              </div>
              <div className="flex flex-col">
                <span className=" max-w-lg text-lg font-thin leading-normal text-gray-900 dark:text-white">
                  wind speed
                </span>
                <span className="max-w-lg text-lg font-normal leading-normal text-gray-900 dark:text-white">
                  {((Number(result?.list[i].wind.speed) * 3600) / 1000).toFixed(
                    3
                  )}
                  km/hr
                </span>
              </div>
              <div className="flex flex-col">
                <span className=" max-w-lg text-lg font-thin leading-normal text-gray-900 dark:text-white">
                  feeling
                </span>
                <span className="max-w-lg text-lg font-normal eading-normal text-gray-900 dark:text-white">
                  {Math.floor(Number(result?.list[i].main.feels_like) - 273)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
