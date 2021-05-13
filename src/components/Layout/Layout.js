import React, { useContext } from "react";
import ReactNotification from "react-notifications-component";

import Header from "../Header/Header";
import Menu from "../Menu/Menu";
import Footer from "../Footer/Footer";
import {
  ThemeContext,
  ThemeProvider,
  THEMELIST,
} from "../../contexts/ThemeContext";

const LayoutComponent = ({ children }) => {
  const { theme } = useContext(ThemeContext);
  const classNameValue =
    theme === THEMELIST.LIGHT
      ? "overflow-auto bg-white"
      : "overflow-auto bg-gray-700";

  return (
    <div className={classNameValue}>
      <ReactNotification />
      <div className="mx-4 my-3">
        <Header />
        <Menu />
        {children}
        <Footer />
      </div>
    </div>
  );
};

const Layout = ({ children }) => {
  return (
    <ThemeProvider startingTheme={THEMELIST.DARK}>
      <LayoutComponent children={children} />
    </ThemeProvider>
  );
};

export default Layout;
