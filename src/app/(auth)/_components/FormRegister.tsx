import z, { email } from "zod";
import InputComponent from "./InputComponent";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import DatePicker from "./PickDate";
import { useState } from "react";
import { setDay } from "date-fns";
import { PickeType } from "~/components/enum";
import ButtonToSign from "./ButtonToSign";
import { cn } from "~/lib/utils";

const registerForm = z.object({
  name: z.string().trim().nonempty(),
  email: z
    .string()
    .trim()
    .nonempty()
    .refine((value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value), {
      message: "Please enter a valid email.",
    }),
});
function FormRegister() {
  const [day, setDay] = useState("");
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const {
    handleSubmit,
    getValues,
    watch,
    register,
    formState: { errors },
  } = useForm<z.infer<typeof registerForm>>({
    resolver: zodResolver(registerForm),
  });
  const onsubmit = (data: z.infer<typeof registerForm>) => {
    if (day && month && year) {
      console.log(data);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onsubmit)}
      className="flex px-20 h-full flex-col justify-between"
    >
      <div className="">
        <p className=" my-5  text-[32px] font-bold ">Create your account</p>
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
          <p className="mb-2 text-[15px] text-foreground">Date of birth</p>
          <p className="text-[14px] text-secondary">
            This will not be shown publicly. Confirm your own age, even if this
            account is for a business, a pet, or something else.
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
        />
      </div>
    </form>
  );
}

export default FormRegister;
