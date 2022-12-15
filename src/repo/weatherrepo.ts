import { Coord, CurrentWeather } from "../types/currentweather";
import { extraCoord, ExtraWeather } from "../types/extraweather";
import { Geocoding } from "../types/geocoding";

const api = "dcf2d82a9e651f9f2f09ac17ff692863";

export async function fetchLocation(val: string) {
  let url = "http://api.openweathermap.org/geo/1.0/direct";

  let parms = new URLSearchParams({
    q: val,
    appid: api,
  });
  const responce = await fetch(url + "?" + parms, {
    method: "GET",
  });

  if (responce.status !== 200) {
    throw new Error("Error");
  }

  const result: Geocoding[] = await responce.json();
  return result;
}

export async function fetchWeatherData(cord: Coord) {
  let weat_url = "https://api.openweathermap.org/data/2.5/weather";
  let wet_prams = new URLSearchParams({
    lat: String(cord.lat),
    lon: String(cord.lon),
    appid: api,
  });
  const wet_responce = await fetch(weat_url + "?" + wet_prams, {
    method: "GET",
  });
  if (wet_responce.status !== 200) {
    throw new Error("Failed");
  } else {
    console.log(wet_responce);
  }

  const result: CurrentWeather = await wet_responce.json();
  return result;
}

export async function fetchextraWeatherData(excord: extraCoord) {
  let extwaturl = "https://api.openweathermap.org/data/2.5/forecast";
  let extwatparms = new URLSearchParams({
    lat: String(excord.lat),
    lon: String(excord.lon),
    cnt: String(40),
    appid: api,
  });
  const extwatresponse = await fetch(extwaturl + "?" + extwatparms, {
    method: "GET",
  });

  if (extwatresponse.status !== 200) {
    throw new Error("Failed");
  }

  const result: ExtraWeather = await extwatresponse.json();
  return result;
}
