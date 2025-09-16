import { useCompanyState } from "../../state";
import ThemeButton from "./ThemeButton";

const MainHeader: React.FC = () => {
  const { companyName } = useCompanyState((state) => state);

  return (
    <header className="h-20 w-full fixed top-0 left-0 bg-[#011b4d] text-white py-4 flex flex-row justify-between px-10 z-10">
      <div>
        <h1 className="text-xl">Stockify</h1>
        <h2 className="text-md pl-4">{companyName}</h2>
      </div>
      <div>
        <ThemeButton />
      </div>
    </header>
  );
};

export default MainHeader;
