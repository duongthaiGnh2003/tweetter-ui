import { cn } from "~/lib/utils";

type ButtonToSigntypes = {
  text: string;
  icon?: React.ReactNode;
  className?: string;
  submit?: boolean;
  onClick?: () => void;
};
function ButtonToSign({
  text,
  icon,
  className,
  onClick,
  submit,
}: ButtonToSigntypes) {
  return (
    <button
      type={submit ? "submit" : "button"}
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
