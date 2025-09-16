import { ButtonBaseProps } from "@mui/material";
import BedtimeIcon from "@mui/icons-material/Bedtime";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useThemeState } from "../../state";

const ThemeButton: React.FC<ButtonBaseProps> = () => {
  const { setTheme, theme } = useThemeState((state) => state);

  const changeTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };
  return (
    <button className="pt-1 " onClick={() => changeTheme()}>
      {theme === "dark" ? (
        <LightModeIcon
          className="text-yellow-300 hover:drop-shadow-[0_0_10px_rgba(255,255,0,1)]"
          fontSize="large"
        />
      ) : (
        <BedtimeIcon
          className="text-yellow-300 hover:drop-shadow-[0_0_10px_rgba(255,255,0,1)]"
          fontSize="large"
        />
      )}
    </button>
  );
};

export default ThemeButton;
