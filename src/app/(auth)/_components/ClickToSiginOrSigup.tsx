import { useRouter } from "next/navigation";
import { SiginOrSigup } from "~/components/enum";

type ClickToSiginOrSigupType = {
  to?: SiginOrSigup;
};
function ClickToSiginOrSigup({
  to = SiginOrSigup.Sigup,
}: ClickToSiginOrSigupType) {
  const router = useRouter();
  const handleClick = () => {
    if (to === SiginOrSigup.Sigup) {
      router.push("/flow/signup?mode=social");
    }
    if (to === SiginOrSigup.Sigin) {
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

export default ClickToSiginOrSigup;
