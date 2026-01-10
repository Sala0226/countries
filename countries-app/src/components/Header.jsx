import { Link } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { IoMoonOutline, IoMoon } from "react-icons/io5";

const Header = () => {
  const { toggleTheme, theme } = useContext(ThemeContext);

  return (
    <nav className="navbar shadow-sm">
      <div className="container d-flex justify-content-between align-items-center">
        <h5 className="mb-0 ">Where in the world?</h5>

        <button
          onClick={toggleTheme}
          className="btn btn-link text-decoration-none  d-flex align-items-center gap-2"
          style={{ color: "inherit" }}
        >
          {theme === "light" ? (
            <>
              <IoMoonOutline size={15} />
              <span>light Theme</span>
            </>
          ) : (
            <>
              <IoMoon size={15} />
              <span>dark Theme</span>
            </>
          )}
        </button>

        <Link to="/favorites" className="btn btn-warning">
          ⭐ Favoris
        </Link>
      </div>
    </nav>
  );
};

export default Header;
