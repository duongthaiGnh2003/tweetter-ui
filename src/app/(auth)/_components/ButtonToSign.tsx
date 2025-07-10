import { cn } from "~/lib/utils";

type ButtonToSigntypes = {
  text: string;
  icon?: React.ReactNode;
  className?: string;
};
function ButtonToSign({ text, icon, className }: ButtonToSigntypes) {
  return (
    <div className="">
      <div
        className={cn(
          "flex items-center justify-center w-[300px] h-[40px] px-3 bg-white text-black rounded-full cursor-pointer text-[14px]",
          className
        )}
      >
        <div className=" mr-2 ">{icon}</div>
        <p>{text}</p>
      </div>
    </div>
  );
}

export default ButtonToSign;
