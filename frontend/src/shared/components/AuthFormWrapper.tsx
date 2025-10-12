import { ReactNode } from "react";
import { useCompanyState } from "../../state";

interface AuthFormWrapperProps {
  children: ReactNode;
  className?: string;
  form: "Company" | "User";
}

const AuthFormWrapper = ({
  children,
  className,
  form,
}: AuthFormWrapperProps) => {
  const { name } = useCompanyState((state) => state);

  return (
    <div
      className={`border-solid border-2 border-indigo-700 rounded-md px-9 pb-12 pt-22  inline-block min-w-96  space-y-4 ${className}`}
    >
      {name && (
        <h2 className="font-medium text-l text-center mt-5 ">{name}</h2>
      )}
      <h2 className="font-medium text-xl text-center mt-5 ">
        Stockify {form} Login
      </h2>
      {children}
    </div>
  );
};

export default AuthFormWrapper;
