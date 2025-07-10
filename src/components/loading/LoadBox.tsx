import Loading from "./LoadingIcon";

function LoadBox() {
  return (
    <div className=" rounded-2xl bg-background min-w-[600px] h-[650px]  min-h-[400px] max-h-[90vh]  max-w-[80vw] flex items-center justify-center">
      <Loading />
    </div>
  );
}

export default LoadBox;
