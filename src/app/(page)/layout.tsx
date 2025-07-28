"use client";

import { ReactNode } from "react";
import LeftSideBar from "./_components/LeftSideBar";

function PageLayout({ children }: { children: ReactNode }) {
  return (
    <div
      className=" container m-auto flex   h-screen
    "
    >
      <LeftSideBar />

      <div>{children}</div>
      <div></div>
    </div>
  );
}

export default PageLayout;
