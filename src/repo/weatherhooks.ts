import { useState } from "react";
import { useQuery } from "react-query";
import { createSearchParams, useNavigate } from "react-router-dom";
import { Coord } from "../types/currentweather";
import { extraCoord } from "../types/extraweather";
import { Geocoding } from "../types/geocoding";
import {
  fetchextraWeatherData,
  fetchLocation,
  fetchWeatherData,
} from "./weatherrepo";

export function useWeatherData(coord: Coord) {
  const query = useQuery(
    [coord.lat, coord.lon],
    () => {
      return fetchWeatherData(coord);
    },
    {}
  );

  return {
    result: query.data,
    loading: query.isLoading,
    error: query.error as Error,
  };
}

export function useLocation() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  async function fetchloc(val: string) {
    setLoading(true);
    try {
      const result: Geocoding[] = await fetchLocation(val);

      navigate(
        "details?" +
          createSearchParams({
            name: result[0].name,
            lat: String(result[0].lat),
            lon: String(result[0].lon),
          })
      );
      return result[0];
    } catch (error) {
      setError("Error");
    }
    setLoading(false);
  }

  return { loading, error, fetchloc };
}

export function useExtraLocation() {
  const [loading1, setLoading] = useState(false);
  const [error1, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  async function extrafetchloc(daydata: {
    name: string;
    lat: number;
    lon: number;
    day: number;
  }) {
    setLoading(true);
    try {
      navigate(
        "/4days?" +
          createSearchParams({
            name: daydata.name,
            lat: String(daydata.lat),
            lon: String(daydata.lon),
            day: String(daydata.day),
          })
      );
      return daydata;
    } catch (error) {
      setError("Error");
    }
    setLoading(false);
  }

  return { loading1, error1, extrafetchloc };
}

export function useHistorydata() {
  const [history, setHistory] = useState<
    {
      name: string;
      lat: number;
      long: number;
    }[]
  >(JSON.parse(localStorage.getItem("history") ?? "[]"));
  const addtohistory = (name: string, lat: number, long: number) => {
    let obj = {
      name: name,
      lat: lat,
      long: long,
    };
    let hisarr =
      history.filter((val) => val.name == obj.name).length > 0
        ? [...history]
        : [...history, obj];
    if (hisarr.length > 5) {
      hisarr.shift();
    }
    setHistory(hisarr);
    localStorage.setItem("history", JSON.stringify(hisarr));
  };
  return { history, addtohistory };
}

export function useExtraWeatherdata(excoord: extraCoord) {
  const query = useQuery(
    [excoord.lat, excoord.lon, excoord.day],
    () => {
      return fetchextraWeatherData(excoord);
    },
    {}
  );

  return {
    result: query.data,
    loading: query.isLoading,
    error: query.error as Error,
  };
}
