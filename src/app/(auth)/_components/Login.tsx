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
import { useSignin } from "~/hook/userUser";
import { setCookie } from "~/config/base-service";
import Loading from "~/components/loading/LoadingIcon";
import { useRouter } from "next/navigation";

const signinForm = z.object({
  email: z.string().trim().nonempty(),
  password: z.string().trim().nonempty(),
});

export type SigninInput = z.infer<typeof signinForm>;

function Login() {
  const [nextStep, setNextStep] = useState<boolean>(false);
  const [errormess, setErrormess] = useState<string>();

  const {
    handleSubmit,
    register,
    formState: { isLoading, isSubmitting, errors },
    getValues,
    watch,
  } = useForm<z.infer<typeof signinForm>>({
    resolver: zodResolver(signinForm),
  });

  const mutation = useSignin();
  const router = useRouter();

  async function onSubmit(data: z.infer<typeof signinForm>) {
    try {
      const res = await mutation.mutateAsync(data);
      setCookie({ name: "token", value: res?.data?.accessToken });
      setCookie({ name: "refreshToken", value: res?.data?.refreshToken });
      router.push("/home");
    } catch (err) {
      console.log(err);
      setErrormess("Incorrect email or password");
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
              register={register("email")}
              id="userName"
              value={watch("email")}
            />
          </div>

          <ButtonToSign
            text="Next"
            className=" select-none text-[15px] text-black my-3 font-bold hover:bg-[#d7dbdcs]"
            onClick={() => {
              getValues("email") && setNextStep(true);
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
            <p className=" my-5 mb-3 text-[32px] font-bold ">
              Enter your password
            </p>

            <div className=" px-2 py-2 text-secondary select-none bg-[#101214] rounded-[4px] mb-6 ">
              <p className="text-[13px]">Phone, email, or username</p>
              <p className="text-[17px]">{getValues("email")}</p>
            </div>

            <div className="pb-3">
              <InputPassword
                placeholder="PassWord"
                register={register("password")}
                id="passWord"
                value={watch("password")}
              />
              <p className="text-[#1d9bf0] text-[13px] font-thin cursor-pointer hover:underline inline-block ">
                Forgot password?
              </p>
              {errormess && (
                <p className="mt-1 text-[#f4212e] text-[17px]">{errormess}</p>
              )}
            </div>
          </div>
          <div className="w-full">
            <ButtonToSign
              text="Log in"
              submit
              className={cn(
                "py-6 px-8 select-none text-[17px] text-black my-6 font-bold w-full hover:bg-[#d7dbdc]  ",
                !watch("password") && "bg-[#787a7a]"
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
      {isLoading ||
        (isSubmitting && (
          <div className=" absolute top-0 left-0 right-0 bottom-0  ">
            <div className="  absolute top-1/2 left-1/2 -translate-1/2 ">
              <Loading />
            </div>
          </div>
        ))}
    </div>
  );
}

export default Login;
