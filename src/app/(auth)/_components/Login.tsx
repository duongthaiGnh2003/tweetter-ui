"use client";

import SiginWithGoogle from "./SiginWithGoogle";
import ButtonToSign from "./ButtonToSign";
import { AppleIcon } from "~/components/icons/AppleIcon";

import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputComponent from "./InputComponent";
import InputPassword from "./InputPassword";
import { cn } from "~/lib/utils";
import { useState } from "react";

import ClickToSiginOrSigup from "./ClickToSiginOrSigup";

const signinForm = z.object({
  userName: z.string().trim().nonempty(),
  passWord: z.string().trim().nonempty(),
});

export type SigninInput = z.infer<typeof signinForm>;

function Login() {
  const [nextStep, setNextStep] = useState<boolean>(false);

  const {
    handleSubmit,
    register,
    formState: { isLoading, errors },
    getValues,
    watch,
  } = useForm<z.infer<typeof signinForm>>({
    resolver: zodResolver(signinForm),
  });
  async function onSubmit(data: z.infer<typeof signinForm>) {
    try {
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className=" flex flex-col h-full items-center  ">
      {!nextStep && (
        <div className="px-8 pb-12">
          <p className=" my-5 text-[32px] font-bold ">Sign in to X</p>
          <SiginWithGoogle className=" my-3 " />
          <ButtonToSign
            icon={<AppleIcon />}
            text="Sign in with Apple"
            className=" my-3 hover:bg-[#e6e6e6]"
          />
          <div className=" flex items-center justify-center  my-3">
            <div className=" flex-1 h-[1px] bg-[#595d62] mx-1 "></div>
            <p className=" uppercase text-medium  ">or</p>
            <div className=" flex-1 h-[1px] bg-[#595d62] mx-1 "></div>
          </div>

          <div className="pb-3">
            <InputComponent
              placeholder="Phone, email, or username"
              register={register("userName")}
              id="userName"
              value={watch("userName")}
            />
          </div>

          <ButtonToSign
            text="Next"
            className=" select-none text-[15px] text-black my-3 font-bold hover:bg-[#d7dbdcs]"
            onClick={() => {
              getValues("userName") && setNextStep(true);
            }}
          />

          <ButtonToSign
            text="Forgot password?"
            className=" bg-transparent border border-[#536471] my-6 hover:bg-[#eff3f41a] text-white font-bold "
          />

          <ClickToSiginOrSigup />
        </div>
      )}

      {nextStep && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="px-20 pb-12 w-full flex flex-col justify-between items-center h-full"
        >
          <div className="w-full">
            <p className=" my-5 text-[32px] font-bold ">Enter your password</p>

            <div className=" px-2 pt-2 text-secondary select-none bg-[#101214] rounded-[4px] mb-6 ">
              <p className="text-[13px]">Phone, email, or username</p>
              <p className="text-[17px]">{getValues("userName")}</p>
            </div>

            <div className="pb-3">
              <InputPassword
                placeholder="PassWord"
                register={register("passWord")}
                id="passWord"
                value={watch("passWord")}
              />
              <p className="text-[#1d9bf0] text-[13px] font-thin cursor-pointer hover:underline inline-block ">
                Forgot password?
              </p>
            </div>
          </div>
          <div className="w-full">
            <ButtonToSign
              text="Log in"
              submit
              className={cn(
                "py-6 px-8 select-none text-[17px] text-black my-6 font-bold w-full hover:bg-[#d7dbdc]  ",
                !watch("passWord") && "bg-[#787a7a]"
              )}
            />

            <div className=" mb-6 flex gap-1  text-[15px]">
              <p className=" text-[#71767b] ">Don't have an account? </p>
              <p className="text-[#1d9bf0] font-thin cursor-pointer hover:underline ">
                Sign up
              </p>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}

export default Login;
