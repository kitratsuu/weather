import React, { useState } from "react";

export default function Dropdown1({ e, i, showd, setdd }: any) {
  const [drop, setDrop] = useState(false);
  return (
    <li className="" key={i}>
      <div className="">
        <button
          onClick={() => {
            setDrop(!drop);
          }}
          className="relative inline-flex items-center justify-center lg:px-10 px-5 py-3 overflow-hidden font-bold text-white rounded-md shadow-2xl group"
        >
          <span className="absolute inset-0 w-full h-full transition duration-300 ease-out opacity-0 bg-gradient-to-br from-pink-600 via-purple-700 to-blue-400 group-hover:opacity-100"></span>
          <span className="absolute top-0 left-0 w-full bg-gradient-to-b from-white to-transparent opacity-5 h-1/3"></span>
          <span className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-white to-transparent opacity-5"></span>
          <span className="absolute bottom-0 left-0 w-3 h-full bg-gradient-to-r from-white to-transparent opacity-5"></span>
          <span className="absolute bottom-0 right-0 w-4 h-full bg-gradient-to-l from-white to-transparent opacity-5"></span>
          <span className="absolute inset-0 w-full h-full border border-white rounded-md opacity-10"></span>
          <span className="absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-full group-hover:w-56 group-hover:h-56 opacity-5"></span>
          <span className="relative">{`${e[0]}`}</span>
        </button>
      </div>
      <div className="">
        <ul
          className="py-0 lg:ml-40 ml-28 text-sm text-gray-700 space-y-1 dark:text-gray-200"
          aria-labelledby="dropdownDefault"
        >
          {e[1].map((j: any, k: number) => {
            return (
              <div
                id="dropdown"
                className={`${
                  drop ? "block" : "hidden"
                } w-44 rounded divide-y `}
                key={k}
              >
                <li className="">
                  <button
                    onClick={() => {
                      showd(j[1]);
                      setdd();
                      setDrop(!drop);
                    }}
                    // className="relative inline-flex items-center justify-center px-0.5 py-0.5 my-[4px] mx-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800"
                    className=" px-4 py-2 relative rounded group font-medium text-white  inline-block"
                  >
                    <span className="absolute top-0 left-0 w-full h-full rounded opacity-50 filter blur-sm bg-gradient-to-br from-purple-600 to-blue-500"></span>
                    <span className="h-full w-full inset-0 absolute mt-0.5 ml-0.5 bg-gradient-to-br filter group-active:opacity-0 rounded opacity-50 from-purple-600 to-blue-500"></span>
                    <span className="absolute inset-0 w-full h-full transition-all duration-200 ease-out rounded shadow-xl bg-gradient-to-br filter group-active:opacity-0 group-hover:blur-sm from-purple-600 to-blue-500"></span>
                    <span className="absolute inset-0 w-full h-full transition duration-200 ease-out rounded bg-gradient-to-br to-purple-600 from-blue-500"></span>
                    <span className="relative">{`${j[0]}`}</span>
                  </button>
                </li>
              </div>
            );
          })}
        </ul>
      </div>
    </li>
  );
}
