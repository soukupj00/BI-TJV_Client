import {Link} from "react-router-dom";
import classes from "./Nav.module.scss"

const Nav = ({isMenu, menuToggle}) => {
  return (
      <nav className={isMenu ? classes.menu__nav : classes.nav}>
          <ul>
              <li onClick={menuToggle}>
                  <Link to="/addresses">Addresses</Link>
              </li>
              <li onClick={menuToggle}>
                  <Link to="/fitness_centers">Fitness centers</Link>
              </li>
              <li onClick={menuToggle}>
                  <Link to="/staff">Staff</Link>
              </li>
          </ul>
      </nav>
  );
};

export default Nav;