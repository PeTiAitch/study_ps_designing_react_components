import { useState } from "react";
import { THEMELIST } from "../contexts/ThemeContext";

const useTheme = (startingTheme) => {
  const [theme, setTheme] = useState(startingTheme);

  const toggleTheme = () => {
    if (theme === THEMELIST.DARK) {
      setTheme(THEMELIST.LIGHT);
    } else {
      setTheme(THEMELIST.DARK);
    }
  };

  return { theme, toggleTheme };
};

export default useTheme;
