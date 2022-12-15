import { useEffect, useState } from "react";
import { FaBars } from "react-icons/all";
import Dropdown from "./dropdown";

function seperation(list: string[]) {
  let imp_obj: any[] = [[list[0].slice(0, 10), []]];
  list.map((e, i) => {
    let temp = e.slice(0, 10);
    let temp2 = e.slice(11);
    if (imp_obj[imp_obj.length - 1][0] !== temp) {
      imp_obj.push([temp, [[e.slice(11), i]]]);
    } else {
      imp_obj[imp_obj.length - 1][1].push([temp2, i]);
    }
  });

  return imp_obj;
}

export default function Sidenav({ day, result }: any) {
  const [days] = useState([...result.list]);
  const [showday, setShowDay] = useState(0);
  const [dropdown, setDropdown] = useState(false);
  const datetime: any[] = [];
  const [organiseddata, setOrganiseddata] = useState<any>([]);

  useEffect(() => {
    let allset: any = seperation(datetime);
    setOrganiseddata([...allset]);
  }, []);

  useEffect(() => {
    day(showday);
  }, [showday]);

  days.map((e, i) => {
    datetime.push(e.dt_txt);
  });
  return (
    <div className="flex z-50  border-0 border-blue-500  justify-left ">
      <div>
        <button
          className="relative sm:hidden md:hidden lg:hidden block"
          onClick={() => setDropdown(!dropdown)}
        >
          <FaBars className="w-8 h-8 text-slate-200" />
        </button>
        <div
          className={`lg:w-52 md:w-40  h-screen  divide-y  shadow lg:block md:block sm:block ${
            dropdown ? "block" : "hidden"
          }`}
        >
          <ul className="py-1 space-y-2 text-sm text-gray-700 dark:text-gray-200">
            {organiseddata.map((e: any, i: any) => {
              return (
                <div className="" key={i}>
                  <Dropdown
                    e={e}
                    i={i}
                    showd={(sd: number) => {
                      setShowDay(sd);
                    }}
                    setdd={() => {
                      setDropdown(!dropdown);
                    }}
                  />
                </div>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
