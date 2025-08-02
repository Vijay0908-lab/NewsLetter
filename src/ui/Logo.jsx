import { Link } from "react-router-dom";

function Logo() {
  return (
    <div className="nav-button">
      <Link to="/" className="flex items-center gap-2 text-white no-underline">
        <img className="h-10 w-11  rounded-2xl" src="./Logo.png" alt="Logo" />
        <span className="uppercase">NewsLetter</span>
      </Link>
    </div>
  );
}

export default Logo;
