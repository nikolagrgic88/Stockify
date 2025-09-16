import BarLoader from "react-spinners/BarLoader";

const LoadingBar = () => {
  return (
    <div className="-mt-10 h-svh w-svw flex items-center justify-center">
      <BarLoader />
    </div>
  );
};
export default LoadingBar;
