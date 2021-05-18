import React from "react";
import { useHistory } from "react-router-dom";
import Toggle from "../Theme Toggle/Toggle";
import "../../App.css";

const Navbar = () => {
  const history = useHistory();
  const handleClick = () => {
    history.push("/");
  };
  return (
    <nav>
      <button className="nav__btn" onClick={handleClick}>
        Github Jobs
      </button>

      <Toggle />
    </nav>
  );
};

export default Navbar;
