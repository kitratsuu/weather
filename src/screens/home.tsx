import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Weather from "../components/weather";
import { useHistorydata, useLocation } from "../repo/weatherhooks";

export default function Home() {
  const [val, setValue] = useState("");
  const navigate = useNavigate();

  const { loading, error, fetchloc } = useLocation();

  const { addtohistory, history } = useHistorydata();

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="h-screen w-screen space-y-5  flex flex-col justify-center items-center">
      <div className="text-5xl font-bold text-slate-300">Search a place</div>
      <input
        type="text"
        value={val}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        onKeyDown={async (e) => {
          if (e.key == "Enter") {
            setValue(val);
            const result = (await fetchloc(val))!;
            addtohistory(result.name, result.lat, result.lon);
          }
        }}
        list="places"
        className="bg-gray-50 border lg:w-96 sm:w-96 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5
         dark:bg-gray-600 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      />
      <datalist id="places">
        {history.map((e, i) => {
          return (
            <div className="flex" key={i.toString()}>
              <option
                className="text-white bg-blue-200 hover:bg-blue-100 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm
               px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-00 dark:hover:bg-blue-200 dark:focus:ring-blue-200"
              >
                {e.name}
              </option>
            </div>
          );
        })}
      </datalist>
      <ul>
        {history.map((e, i) => {
          return <Weather key={i} {...e} />;
        })}
      </ul>

      <button
        onClick={async () => {
          const result = (await fetchloc(val))!;
          addtohistory(result.name, result.lat, result.lon);
        }}
        className="relative inline-flex items-center justify-center p-4 px-6 py-3 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out
         border-2 border-slate-500 rounded-full shadow-md group"
      >
        <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-cyan-500 group-hover:translate-x-0 ease">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            ></path>
          </svg>
        </span>
        <span className="absolute flex items-center justify-center w-full h-full text-slate-200 transition-all duration-300 transform group-hover:translate-x-full ease">
          get Weather
        </span>
        <span className="relative invisible">Button Text</span>
      </button>
    </div>
  );
}
