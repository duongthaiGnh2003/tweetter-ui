import { X } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { ReactNode } from "react";
type CloseBtnType = { onClick?: () => void; icon?: ReactNode };
function CloseBtn({ onClick, icon = <X size={20} /> }: CloseBtnType) {
  return (
    <div>
      <Tooltip>
        <TooltipTrigger>
          <div
            className=" hover:bg-[#eff3f41a] size-8 rounded-full flex items-center justify-center cursor-pointer"
            onClick={onClick}
          >
            {icon}
          </div>
        </TooltipTrigger>
        <TooltipContent side="bottom" sideOffset={-10}>
          <p className="bg-[#323e48] text-white text-[11px] px-1 py-[2px] rounded-[2px] ">
            close
          </p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
}
export default CloseBtn;
