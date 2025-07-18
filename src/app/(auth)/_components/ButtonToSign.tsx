import { cn } from "~/lib/utils";

type ButtonToSigntypes = {
  text: string;
  icon?: React.ReactNode;
  className?: string;
  onClick?: () => void;
};
function ButtonToSign({ text, icon, className, onClick }: ButtonToSigntypes) {
  return (
    <button
      type="submit"
      className={cn(
        "flex items-center justify-center w-[300px] h-[40px] px-3 bg-white text-black rounded-full cursor-pointer text-[14px]",
        className
      )}
      onClick={onClick}
    >
      <div className=" mr-2 ">{icon}</div>
      <p>{text}</p>
    </button>
  );
}

export default ButtonToSign;
