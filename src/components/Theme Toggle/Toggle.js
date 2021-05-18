import React, { useEffect, useState } from "react";
import { setTheme } from "../../utils/theme";
import "./Toggle.css";

const Toggle = () => {
  const [togClass, setTogClass] = useState("dark");
  let theme = localStorage.getItem("theme");

  const handleOnClick = () => {
    if (localStorage.getItem("theme") === "theme-dark") {
      setTheme("theme-light");
      setTogClass("light");
    } else {
      setTheme("theme-dark");
      setTogClass("dark");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("theme") === "theme-dark") {
      setTogClass("dark");
    } else if (localStorage.getItem("theme") === "theme-light") {
      setTogClass("light");
    }
  }, [theme]);
  return (
    <div className="container__toggle">
      {togClass === "light" ? (
        <input
          type="checkbox"
          id="toggle"
          className="toggle__checkbox"
          onClick={handleOnClick}
          checked
        />
      ) : (
        <input
          type="checkbox"
          id="toggle"
          className="toggle__checkbox"
          onClick={handleOnClick}
        />
      )}
      <label htmlFor="toggle" className="toggle__label">
        <span className="toggle__label-background"></span>
      </label>
    </div>
  );
};

export default Toggle;
