import React, { useState } from 'react';
import { useNavbarContext } from 'app/providers/navbar-context';
import { BsFillSunFill, BsFillMoonFill } from 'react-icons/bs';
function ThemeToggle() {
  const { isDarkTheme, toggleDarkTheme } = useNavbarContext() as { isDarkTheme: boolean; toggleDarkTheme: (value: boolean) => void };
  return (
    <div>
      {isDarkTheme ? (
        <BsFillSunFill
          className="size-mid text-yellow-200 toggle-icon"
          onClick={() => toggleDarkTheme(false)}
        />
      ) : (
        <BsFillMoonFill
          className="size-mid text-yellow-200 toggle-icon"
          onClick={() => toggleDarkTheme(true)}
        />
      )}
    </div>
  );
}

export default ThemeToggle;
