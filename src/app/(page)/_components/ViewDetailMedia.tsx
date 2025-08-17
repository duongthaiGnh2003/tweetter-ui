"use client";
import { useRouter } from "next/navigation";
import type { FC, ReactNode } from "react";

interface ModalWindowProps {
  params?: {
    username: string;
    statusId: string;
    index: string;
    media: string;
  };
}

const ViewDetailMedia: FC<ModalWindowProps> = ({ params }) => {
  const router = useRouter();
  console.log(params?.username);

  return (
    <div
      className=" bg-white/10 fixed inset-0 z-100 "
      onClick={() => router.back()}
    >
      <div className="container mx-auto rounded-md   bg-sky-600 p-4">
        <p>Behold! A modal window :-)</p>
      </div>
    </div>
  );
};

export default ViewDetailMedia;
