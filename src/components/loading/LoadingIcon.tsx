import { cn } from "~/lib/utils";
type LoadingType = {
  width?: string;
  height?: string;
};
function Loading({ width = "35px", height = "35px" }: LoadingType) {
  return (
    <div
      className={cn(
        " border-4 border-solid border-[#061f2f] relative rounded-full"
      )}
      style={{ width: width, height: height }}
    >
      <div className="loader" style={{ width: width, height: height }}></div>
    </div>
  );
}
export default Loading;
