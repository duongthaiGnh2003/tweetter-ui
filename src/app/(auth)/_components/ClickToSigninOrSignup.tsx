import { useRouter } from "next/navigation";
import { SigninOrSignup } from "~/components/enum";

type ClickToSigninOrSignupType = {
  to?: SigninOrSignup;
};
function ClickToSigninOrSignup({
  to = SigninOrSignup.Signup,
}: ClickToSigninOrSignupType) {
  const router = useRouter();
  const handleClick = () => {
    if (to === SigninOrSignup.Signup) {
      router.push("/flow/signup?mode=social");
    }
    if (to === SigninOrSignup.Signin) {
      router.push("/flow/signin");
    }
  };
  return (
    <div className=" mt-10 flex gap-1  text-[15px]">
      <p className=" text-[#71767b] ">Don&apos;t have an account? </p>
      <p
        className="text-[#1d9bf0] font-thin cursor-pointer hover:underline "
        onClick={handleClick}
      >
        {to}
      </p>
    </div>
  );
}

export default ClickToSigninOrSignup;
