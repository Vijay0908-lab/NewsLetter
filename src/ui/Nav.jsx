import { NavLink } from "react-router-dom";

function Nav() {
  return (
    <nav>
      <ul className="flex items-center justify-between gap-3 uppercase ">
        <li className="nav-button">
          <NavLink to="/weather">weather</NavLink>
        </li>
        <li className="nav-button">
          <NavLink to="/entertainment">entertainment</NavLink>
        </li>
        <li className="nav-button">
          <NavLink to="/sports">sports</NavLink>
        </li>
        <li className="nav-button">
          <NavLink to="/miscellaneous">miscellaneous</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
