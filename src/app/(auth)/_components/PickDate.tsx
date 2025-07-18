import { ChevronDown } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import { PickeType } from "~/components/enum";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

import { cn } from "~/lib/utils";

interface PickerMonthProps {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  month?: string;
  year?: string;
  className?: string;
  type: PickeType;
}

const MONTHS = [
  { label: "January", value: "1" },
  { label: "February", value: "2" },
  { label: "March", value: "3" },
  { label: "April", value: "4" },
  { label: "May", value: "5" },
  { label: "June", value: "6" },
  { label: "July", value: "7" },
  { label: "August", value: "8" },
  { label: "September", value: "9" },
  { label: "October", value: "10" },
  { label: "November", value: "11" },
  { label: "December", value: "12" },
];

const currentMonth = new Date().getMonth() + 1;
const currentYear = new Date().getFullYear();

function getDayNumbersInMonth(month: number, year: number): number[] {
  const totalDays = new Date(year, month, 0).getDate(); // ngày 0 của tháng sau = ngày cuối của tháng hiện tại
  return Array.from({ length: totalDays }, (_, i) => i + 1);
}

function DatePicker({
  value,
  setValue,
  className,
  type,
  month,
  year,
}: PickerMonthProps) {
  const [clicked, setClicked] = useState<boolean>(false);

  const handleSelectValue = (selectValue: string) => {
    setValue(selectValue);
    setClicked(false);
  };

  const DayList = () => {
    const days = getDayNumbersInMonth(
      Number(month) || currentMonth,
      Number(year) || currentYear
    );

    return days.map((item, index) => (
      <div
        className="px-2 hover:bg-[#99c8ff] text-white text-[18px] hover:text-black"
        onClick={() => handleSelectValue(item.toString())}
        key={index}
      >
        {item}
      </div>
    ));
  };
  const MonthList = () => {
    return MONTHS.map(({ label, value }) => (
      <div
        className="px-2 hover:bg-[#99c8ff] text-white text-[18px] hover:text-black"
        onClick={() => handleSelectValue(value)}
        key={value}
      >
        {label}
      </div>
    ));
  };
  const YearList = () => {
    const years = Array.from(
      { length: currentYear - 1995 + 1 },
      (_, i) => 1995 + i
    );
    return years.map((item, index) => (
      <div
        className="px-2 hover:bg-[#99c8ff] text-white text-[18px] hover:text-black"
        onClick={() => handleSelectValue(item.toString())}
        key={index}
      >
        {item}
      </div>
    ));
  };
  const content = {
    [PickeType.Day]: <DayList />,
    [PickeType.Month]: <MonthList />,
    [PickeType.Year]: <YearList />,
  };
  const lable = {
    [PickeType.Day]: value,
    [PickeType.Month]:
      value && MONTHS.find((month) => month.value === value)?.label,
    [PickeType.Year]: value,
  };
  return (
    <DropdownMenu open={clicked} onOpenChange={setClicked}>
      <DropdownMenuTrigger
        className={cn(
          "border border-[#595d62] rounded-[4px] w-[205px] p-2  h-[60px] flex justify-between cursor-pointer outline-none ",
          clicked ? "border-[#1d9bf0] border-2" : "",
          className
        )}
      >
        <div>
          <div>
            <p
              className={cn(
                " text-[#71767b] text-left select-none text-[14px] ",
                clicked ? "text-[#1d9bf0] " : ""
              )}
            >
              {type}
            </p>
          </div>

          <div className="text-[17px]">{lable[type]}</div>
        </div>
        <div className="self-center">
          <ChevronDown color="#71767b" size={22} />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        avoidCollisions={false}
        className={cn(
          " w-full hideScroll max-h-[250px] p-0 ",
          type === PickeType.Day
            ? "min-w-[90px]"
            : type === PickeType.Year
            ? "min-w-[115px]"
            : "min-w-[205px]"
        )}
        side="bottom"
        align="start"
      >
        <div className="bg-black py-2 w-full  ">{content[type]}</div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default DatePicker;
