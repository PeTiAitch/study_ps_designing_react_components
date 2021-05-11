import { useState } from "react";

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
