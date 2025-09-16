import { useEffect, useState } from "react";
import { Form, useActionData, useNavigation } from "react-router";

const UserLoginForm: React.FC = () => {
  const [error, setError] = useState<string>("");
  const errorData = useActionData();

  useEffect(() => {
    if (errorData) {
      setError(errorData.message);
    }
  }, [errorData]);
  const { state } = useNavigation();

  return (
    <Form method="POST" className="-mt-80 flex flex-col gap-3">
      <div className="flex flex-col ">
        <label htmlFor="email" className="mb-2 text-sm font-medium ">
          User Email:
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          autoFocus
          aria-labelledby="email-label"
          className={`px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1  focus:ring-indigo-500 ${
            error && "outline-none ring-1 ring-red-500 "
          }`}
          onFocus={() => setError("")}
        />
      </div>
      <div className="flex flex-col ">
        <label htmlFor="password" className="mb-2 text-sm font-medium ">
          Password:
        </label>
        <input
          type="password"
          id="password"
          name="password"
          aria-labelledby="password-label"
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
        className="w-full px-4 py-2 mt-5 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        {state === "submitting" ? "Logging in..." : "Login"}
      </button>
    </Form>
  );
};

export default UserLoginForm;
