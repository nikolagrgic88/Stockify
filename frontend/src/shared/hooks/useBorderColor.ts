import { useThemeState } from "../../state";

export const useBorderColor = () => {
  const { theme } = useThemeState((state) => state);

  let borderColor: string = "border-white";
  if (theme === "light") {
    borderColor = "border-black";
  } else if (theme === "dark") {
    borderColor = "border-white";
  }
  return borderColor;
};
