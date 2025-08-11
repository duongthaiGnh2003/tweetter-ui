import { X } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { ReactNode } from "react";
import { cn } from "~/lib/utils";
type CloseBtnType = {
  onClick?: () => void;
  icon?: ReactNode;
  title?: string;
  className?: string;
};
function CloseBtn({
  onClick,
  icon = <X size={20} />,
  title = "Close",
  className,
}: CloseBtnType) {
  return (
    <div>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className={cn(
              " hover:bg-hoverColor size-8 rounded-full flex items-center justify-center cursor-pointer",
              className
            )}
            {...(onClick ? { onClick } : {})}
          >
            {icon}
          </div>
        </TooltipTrigger>
        <TooltipContent side="bottom" sideOffset={-10}>
          <p className="bg-[#323e48] text-white text-[11px] px-1 py-[2px] rounded-[2px] ">
            {title}
          </p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
}
export default CloseBtn;
