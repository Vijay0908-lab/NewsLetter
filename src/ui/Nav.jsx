import { NavLink } from "react-router-dom";

function Nav() {
  return (
    <nav>
      <ul className="flex items-center justify-between gap-3 uppercase ">
        <li className="nav-button">
          <NavLink to="/weather">weather</NavLink>
        </li>
        <li className="nav-button w-20">
          <NavLink to="/top">top</NavLink>
        </li>
        <li className="nav-button">
          <NavLink to="/social">social</NavLink>
        </li>
        <li className="nav-button">
          <NavLink to="/sports">sports</NavLink>
        </li>
        
      </ul>
    </nav>
  );
}

export default Nav;
