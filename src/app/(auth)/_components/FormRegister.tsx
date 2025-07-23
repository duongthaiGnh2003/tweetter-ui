import z from "zod";
import InputComponent from "./InputComponent";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import DatePicker from "./PickDate";
import { useState } from "react";

import { PickeType } from "~/components/enum";
import ButtonToSign from "./ButtonToSign";
import { cn } from "~/lib/utils";
import { useSigup } from "~/hook/userUser";
import InputPassword from "./InputPassword";
import {
  CarouselContent,
  CarouselItem,
  Carousel,
} from "~/components/ui/carousel";
import type { CarouselApi } from "~/components/ui/carousel";
import { setCookie } from "~/config/base-service";
import Loading from "~/components/loading/LoadingIcon";
import CloseBtn from "~/components/CloseBtn";
import { XLogoIcon } from "~/components/icons/XLogoIcon";
import { useRouter } from "next/navigation";
import { ArrowLeft, X } from "lucide-react";

const registerForm = z
  .object({
    name: z.string().trim().nonempty(),
    email: z
      .string()
      .trim()
      .nonempty()
      .refine((value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value), {
        message: "Please enter a valid email.",
      }),
    password: z
      .string()
      .trim()
      .nonempty({ message: "Please enter your password" })
      .min(8, { message: "Password must be at least 8 characters" }),
    confirm_password: z
      .string()
      .trim()
      .nonempty({ message: "Please enter your password" })
      .min(8, { message: "Password must be at least 8 characters" }),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  });
export type SignupInput = z.infer<typeof registerForm> & {
  day_of_birth: Date;
};
function FormRegister() {
  const [day, setDay] = useState("");
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);

  const [api, setApi] = useState<CarouselApi | null>(null);

  const {
    handleSubmit,
    getValues,
    setError,
    watch,
    register,
    formState: { errors, isLoading, isSubmitting },
  } = useForm<z.infer<typeof registerForm>>({
    resolver: zodResolver(registerForm),
  });
  const router = useRouter();
  const mutation = useSigup();

  const onsubmit = async (data: z.infer<typeof registerForm>) => {
    if (day && month && year) {
      const birthDay = new Date(`${year}-${month}-${day}`);

      try {
        const res = await mutation.mutateAsync({
          ...data,
          day_of_birth: birthDay,
        });

        setCookie({ name: "token", value: res?.data?.accessToken });
        setCookie({ name: "refreshToken", value: res?.data?.refreshToken });
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleNextSlide = () => {
    if (getValues("name") && getValues("email") && day && month && year) {
      const emailSchema = registerForm.pick({ email: true });
      const result = emailSchema.safeParse({ email: getValues("email") });
      if (!result.success) {
        const msg =
          result.error.format().email?._errors?.[0] || "Invalid email";
        setError("email", { message: msg });
        return;
      } else {
        setError("email", { message: "" });
      }
      api?.scrollNext();
      setCurrentSlide(1);
    }
  };
  const handlePrevSlide = () => {
    if (getValues("name") && getValues("email") && day && month && year)
      api?.scrollPrev();
    setCurrentSlide(0);
  };

  return (
    <div className=" flex flex-1 flex-col">
      <div className="px-4 grid grid-cols-3 items-center pt-4  ">
        <CloseBtn
          icon={currentSlide === 1 ? <ArrowLeft size={20} /> : <X size={20} />}
          onClick={() => {
            if (currentSlide === 1) {
              handlePrevSlide();
            } else {
              router.push("/");
            }
          }}
        />

        <div className="flex flex-col justify-center items-center">
          <XLogoIcon className={"w-8 "} />
        </div>
        <div></div>
      </div>
      <div className=" flex flex-col flex-1  items-center  ">
        <form
          onSubmit={handleSubmit(onsubmit)}
          className=" relative flex  px-20 h-full flex-col   "
        >
          <p className=" my-5  text-[32px] font-bold ">Create your account</p>

          <Carousel
            setApi={setApi}
            className="h-full "
            opts={{ watchDrag: false }}
          >
            <CarouselContent className=" h-full   ">
              <CarouselItem
                className={cn(
                  "flex-col justify-between flex transitionStyle    w-[300px]"
                )}
              >
                <div>
                  <div className="py-3">
                    <InputComponent
                      placeholder="Name"
                      register={register("name")}
                      id="name"
                      value={watch("name")}
                    />
                  </div>
                  <div className="py-3">
                    <InputComponent
                      placeholder="Email"
                      register={register("email")}
                      id="email"
                      value={watch("email")}
                    />
                    {errors.email && errors.email?.type !== "too_small" && (
                      <p className="mt-1 px-2 text-[#f4212e] text-[13px]">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                  <div className="mt-5">
                    <p className="mb-2 text-[15px] text-foreground">
                      Date of birth
                    </p>
                    <p className="text-[14px] text-secondary">
                      This will not be shown publicly. Confirm your own age,
                      even if this account is for a business, a pet, or
                      something else.
                    </p>
                  </div>
                  <div className="mt-4 flex gap-3">
                    <DatePicker
                      type={PickeType.Month}
                      value={month}
                      setValue={setMonth}
                    />
                    <DatePicker
                      type={PickeType.Day}
                      value={day}
                      month={month}
                      year={year}
                      setValue={setDay}
                      className="w-[90px]"
                    />
                    <DatePicker
                      type={PickeType.Year}
                      value={year}
                      setValue={setYear}
                      className="w-[115px]"
                    />
                  </div>
                </div>
                <div>
                  <ButtonToSign
                    text="Next"
                    className={cn(
                      "py-6 px-8 select-none text-[17px] text-black my-6 font-bold hover:bg-[#d7dbdcs] w-full bg-[#787a7a] cursor-default ",
                      watch("name") &&
                        watch("email") &&
                        day &&
                        month &&
                        year &&
                        "bg-white cursor-pointer"
                    )}
                    onClick={handleNextSlide}
                  />
                </div>
              </CarouselItem>
              <CarouselItem
                className={cn(
                  "h-full flex-col justify-between flex transitionStyle  "
                )}
              >
                <div>
                  <div className="py-3">
                    <InputPassword
                      placeholder="Password"
                      register={register("password")}
                      id="password"
                      value={watch("password")}
                    />
                    {errors.password && (
                      <p className="mt-1 px-2 text-[#f4212e] text-[13px]">
                        {errors.password.message}
                      </p>
                    )}
                  </div>
                  <div className="py-3">
                    <InputPassword
                      placeholder="Confirm Password"
                      register={register("confirm_password")}
                      id="confirm_password"
                      value={watch("confirm_password")}
                    />
                    {errors.confirm_password && (
                      <p className="mt-1 px-2 text-[#f4212e] text-[13px]">
                        {errors.confirm_password.message}
                      </p>
                    )}
                  </div>
                </div>
                <div>
                  <ButtonToSign
                    text="Sign up"
                    submit={!!watch("password") && !!watch("confirm_password")}
                    className={cn(
                      "py-6 px-8 select-none text-[17px] text-black my-6 font-bold w-full bg-[#787a7a] cursor-default ",
                      watch("name") &&
                        watch("email") &&
                        watch("password") &&
                        watch("confirm_password") &&
                        day &&
                        month &&
                        year &&
                        "bg-white hover:bg-[#d7dbdc]  cursor-pointer"
                    )}
                  />
                </div>
              </CarouselItem>
            </CarouselContent>
          </Carousel>

          {isLoading ||
            (isSubmitting && (
              <div className=" absolute top-0 left-0 right-0 bottom-0  ">
                <div className="  absolute top-1/2 left-1/2 -translate-1/2 ">
                  <Loading />
                </div>
              </div>
            ))}
        </form>
      </div>
    </div>
  );
}

export default FormRegister;
