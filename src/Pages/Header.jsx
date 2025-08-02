import Logo from "../ui/Logo";
import Nav from "../ui/Nav";
function Header() {
  return (
    <div className="flex items-center align-center justify-between bg-neutral-700 p-2.5">
      <Logo />
      <Nav />
    </div>
  );
}

export default Header;
