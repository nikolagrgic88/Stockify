import { ReactNode } from "react";

type PageCardProps = {
  children: ReactNode;
  className?: string;
};

const PageCard = ({ children, className }: PageCardProps) => {
  return (
    <div className={`w-full flex flex-col items-center  ${className}`}>
      {children}
    </div>
  );
};

export default PageCard;
