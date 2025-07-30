"use client";

import { ReactNode } from "react";
import LeftSideBar from "./_components/LeftSideBar";
// import { useDispatch, useSelector } from "react-redux";
// import { RootState } from "~/store/store";
// import { increment } from "~/store/counterSlice";

function PageLayout({ children }: { children: ReactNode }) {
  // const count = useSelector((state: RootState) => state.counter.value);
  // const dispatch = useDispatch();

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
