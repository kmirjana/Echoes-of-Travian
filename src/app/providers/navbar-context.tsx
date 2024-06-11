import { createContext, useContext, useState } from 'react';

const NavbarContext = createContext({});

export const Navbar = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const toggleDarkTheme = () => {
    setIsDarkTheme(!isDarkTheme);
    console.log('Toggle dark theme');
  };

  return <NavbarContext.Provider value={{ isDarkTheme, toggleDarkTheme }}></NavbarContext.Provider>;
};
export const useNavbarContext = () => useContext(NavbarContext);
