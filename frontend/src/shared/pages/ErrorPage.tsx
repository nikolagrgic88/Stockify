import { Link, useRouteError } from "react-router";
import { useThemeState } from "../../state";

const ErrorPage = () => {
  const error = useRouteError() as { message?: string };
  const { theme } = useThemeState((state) => state);

  return (
    <div
      className={`w-screen h-screen p-2 flex flex-col justify-center items-center ${
        theme === "dark" ? "bg-[#040613] text-white" : "bg-white text-black"
      }`}
    >
      <img
        src="/images/404.svg"
        alt="Page not found"
        className="w-[30rem] max-w-full mb-10"
      />
      <h1 className="text-2xl">Oops! Something went wrong.</h1>
      <p>{error?.message || "Unknown error"}</p>
      <Link to="/home/dashboard" style={{ color: "#007bff" }}>
        Go to Dashboard
      </Link>
    </div>
  );
};

export default ErrorPage;
