import { setDay } from "date-fns";
import React, { useEffect, useState } from "react";
import Daydata from "./daydata";
import { FaBars } from "react-icons/all";
import Sidenav from "../sidenav/sidenav";

export default function Multiday() {
  return (
    <div className="bg-weather bg-no-repeat bg-cover bg-center bg-fixed ">
      <Daydata />
    </div>
  );
}
