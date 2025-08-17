"use client";

import { ReactNode } from "react";
import LeftSideBar from "./_components/LeftSideBar";
import Link from "next/link";
// import { useDispatch, useSelector } from "react-redux";
// import { RootState } from "~/store/store";
// import { increment } from "~/store/counterSlice";

function PageLayout({
  children,
  modal,
}: {
  children: ReactNode;
  modal: ReactNode;
}) {
  // const count = useSelector((state: RootState) => state.counter.value);
  // const dispatch = useDispatch();
  if (modal) {
    alert("cÓ mOMOldf");
  }
  return (
    <div
      className=" container m-auto flex justify-center h-screen
    "
    >
      <LeftSideBar />

      <div>{children}</div>
      {modal}
      <div className=" w-[350px] ml-8 mr-[70px]">right sidebar</div>
    </div>
  );
}

export default PageLayout;
