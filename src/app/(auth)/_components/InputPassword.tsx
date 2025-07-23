"use client";
import { Eye, EyeOff } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { type UseFormRegisterReturn } from "react-hook-form";
import { cn } from "~/lib/utils";

type InputPasswordProps = {
  placeholder: string;
  id?: string;
  register?: UseFormRegisterReturn;
  value: string;
};
function InputPassword({
  placeholder,
  register,
  id,
  value,
}: InputPasswordProps) {
  const [clicked, setClicked] = useState<boolean>(false);
  const [showPass, setShowPass] = useState<boolean>(false);
  const divRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleClickOutside(event: MouseEvent) {
    if (divRef.current && !divRef.current.contains(event.target as Node)) {
      setClicked(false);
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (clicked && inputRef.current) {
        inputRef.current.focus();
      }
    }, 200);
  }, [clicked]);

  return (
    <div
      ref={divRef}
      className={cn(
        " border border-[#595d62] rounded-[4px]  h-[60px] flex items-center justify-between  ",
        clicked ? " border-[#1d9bf0] border-2" : " "
      )}
      onClick={(e) => {
        e.stopPropagation();
        setClicked(true);
      }}
    >
      <div
        className={cn(
          "pt-3  px-2  pb-2 text-[17px] w-full",
          clicked ? "pt-2" : ""
        )}
      >
        <p
          className={cn(
            " text-[#71767b] transitionStyle select-none ",
            clicked ? "text-[#1d9bf0] text-[14px]" : "",
            value && " text-[14px]"
          )}
          onClick={(e) => {
            e.stopPropagation();
            setClicked(!clicked);
            if (clicked) {
              setClicked(true);
              inputRef.current?.focus();
            }
          }}
        >
          {placeholder}
        </p>

        <div
          className={cn(
            "h-7 transitionStyle",
            clicked ? "  " : "h-0",
            value && "h-7"
          )}
        >
          <input
            id={id}
            type={showPass ? "text" : "password"}
            className={cn(
              " border-none outline-none w-full ",
              clicked ? " " : "h-0",
              value && "h-7"
            )}
            {...register}
            ref={(el) => {
              inputRef.current = el;
              (register as UseFormRegisterReturn).ref(el);
            }}
            onChange={(e) => {
              const val = e.target.value;
              if (val.startsWith(" ")) {
                e.target.value = val.trimStart(); // tự động xóa dấu cách đầu
              }
              (register as UseFormRegisterReturn).onChange(e);
            }}
          />
        </div>
      </div>

      <div
        className="mb-2 mr-2 self-end cursor-pointer"
        onClick={() => {
          setShowPass(!showPass);
        }}
      >
        {!showPass ? <EyeOff size={22} /> : <Eye size={22} />}
      </div>
    </div>
  );
}

export default InputPassword;
