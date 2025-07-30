"use client";

import { ReactNode } from "react";
import LeftSideBar from "./_components/LeftSideBar";

function PageLayout({ children }: { children: ReactNode }) {
  return (
    <div
      className=" container m-auto flex justify-center h-screen
    "
    >
      <LeftSideBar />

      <div>{children}</div>
      <div className=" w-[350px] ml-8 mr-[70px]">right sidebar</div>
    </div>
  );
}

export default PageLayout;
