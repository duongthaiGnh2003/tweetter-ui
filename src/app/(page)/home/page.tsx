"use client";

import { useGetCurrentUser } from "~/hook/userUser";

function Home() {
  const { data } = useGetCurrentUser();

  return <div className=" bg-red-500">Home</div>;
}

export default Home;
