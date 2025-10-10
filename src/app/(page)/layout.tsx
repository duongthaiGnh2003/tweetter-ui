"use client";

import { FC, ReactNode } from "react";
import LeftSideBar from "./_components/LeftSideBar";
// import { useDispatch, useSelector } from "react-redux";
// import { RootState } from "~/store/store";
// import { increment } from "~/store/counterSlice";
interface LayoutProps {
  modal: ReactNode;
  children: ReactNode;
}
const Layout: FC<LayoutProps> = ({ modal, children }) => {
  // const count = useSelector((state: RootState) => state.counter.value);
  // const dispatch = useDispatch();

  return (
    <div
      className=" container m-auto flex justify-center h-screen
    "
    >
      <LeftSideBar />
      {modal}
      <div>{children}</div>

      <div className=" w-[350px] ml-8 mr-[70px]">right sidebar</div>
    </div>
  );
};

export default Layout;
