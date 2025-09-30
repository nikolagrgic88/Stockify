import { Form, useActionData, useNavigation } from "react-router";
import { useEffect, useState } from "react";
import { useThemeState } from "../../state";

const CompanyLoginForm: React.FC = () => {
  const [error, setError] = useState<string>("");
  const errorData = useActionData();
  const { theme } = useThemeState((state) => state);

  const navigation = useNavigation();
  useEffect(() => {
    if (errorData) {
      setError(errorData.message);
    }
  }, [errorData]);
  return (
    <Form method="POST" className="-mt-80 flex flex-col gap-5">
      <div className="flex flex-col">
        <label htmlFor="companyId" className="mb-2 text-sm font-medium ">
          Company ID:
        </label>
        <input
          type="text"
          id="companyId"
          name="companyId"
          required
          aria-labelledby="companyId-label"
          autoFocus
          className={`${
            theme === "dark" && "text-black"
          }  px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1  focus:ring-indigo-500  ${
            error && "outline-none ring-1 ring-red-500 "
          }`}
          onFocus={() => setError("")}
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="password" className="mb-2 text-sm font-medium ">
          Password:
        </label>
        <input
          type="password"
          id="password"
          name="password"
          required
          aria-labelledby="Password-label"
          className={`px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1  focus:ring-indigo-500 ${
            error && "outline-none ring-1 ring-red-500 "
          }`}
          onFocus={() => setError("")}
        />
      </div>
      <div className="relative m-2">
        <p className="absolute -top-3 text-red-600 w-full text-center">
          {error}
        </p>
      </div>
      <button
        type="submit"
        aria-label="Login"
        className="w-full px-4 py-2  text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        {navigation.state === "submitting" ? "Loging in..." : "Login"}
      </button>
    </Form>
  );
};

export default CompanyLoginForm;
