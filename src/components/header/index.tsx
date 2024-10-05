import React from "react";
import {Outlet} from "react-router-dom";

export const Header: React.FC = () => {
  return (
    <div className={'h-dvh flex flex-col'}>
      <div className={'h-[100px]'}>
        <h1 className={'text-2xl text-white bg-red-500 h-[100px] flex justify-center items-center'}>
          Newspaper
        </h1>
      </div>

      <Outlet/>
    </div>
  );
};