import { Link } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";

const NavbarOwner = () => {
  const { user } = useAppContext();

  return (
    <div className="relative flex items-center justify-between px-6 md:px-10 py-4 text-highlight border-b border-muted-foreground transition-all ">
      <Link to="/">
        <h2 className="text-xl font-bold tracking-tight ">
          Bob's
          <span className="text-primary"> Garage</span>
        </h2>
      </Link>

      <p>Welcome, {user?.name || "Owner"}</p>
    </div>
  );
};
export default NavbarOwner;
