import { useState } from "react";
import { assets, navLinks } from "../../data/data";
import { FaScrewdriverWrench } from "react-icons/fa6";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import { motion } from "motion/react";
import ThemeToggle from "../common/ThemeToggle";

const Navbar = () => {
  const { setShowLogin, user, logout, isAdmin } = useAppContext();
  const location = useLocation();
  const navigate = useNavigate();

  // Mobile menu state
  const [open, setOpen] = useState(false);

  // Search input state
  const [search, setSearch] = useState("");

  // Search services and navigate to the Services page
  const handleSearch = (e) => {
    e.preventDefault();

    const searchValue = search.trim();

    // Navigate to the Services page with the search term
    navigate(
      searchValue
        ? `/services?search=${encodeURIComponent(searchValue)}`
        : "/services",
    );

    // Close mobile menu
    setOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`flex items-center justify-between gap-4 lg:gap-8 px-6 md:px-8 lg:px-12 xl:px-16 py-6 text-foreground border-b border-border relative transition-all  ${location.pathname === "/" ? "bg-background" : "bg-card"}`}
    >
      {/* Logo */}
      <Link to="/" className="flex shrink-0 items-center gap-2">
        <motion.span
          whileHover={{ scale: 1.1, rotate: 10 }}
          transition={{ duration: 0.2 }}
          className="inline-flex"
        >
          <FaScrewdriverWrench className="text-xl text-primary" />
        </motion.span>

        <h2 className="text-xl text-highlight font-bold tracking-tight whitespace-nowrap">
          Bob's
          <span className="text-primary"> Garage</span>
        </h2>
      </Link>

      {/* Navigation Links */}
      <div
        className={`max-lg:fixed max-lg:h-screen max-lg:w-full max-lg:top-16 max-lg:border-t border-border right-0 flex flex-col lg:flex-row items-start lg:items-center gap-4 lg:gap-5 max-lg:p-4 transition-all duration-300 z-50 ${location.pathname === "/" ? "bg-background" : "bg-card"} ${open ? "max-lg:translate-x-0" : "max-lg:translate-x-full"}`}
      >
        {navLinks.map((link, index) => (
          <Link
            key={index}
            to={link.path}
            onClick={() => setOpen(false)}
            className={`relative w-fit whitespace-nowrap font-medium transition-colors duration-300 hover:text-primary after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all after:duration-300  hover:after:w-full ${location.pathname === link.path ? "text-primary after:w-full" : "text-foreground"}`}
          >
            {link.name}
          </Link>
        ))}

        {/* Only show My Bookings to logged-in customers */}
        {user && !isAdmin && (
          <Link
            to="/my-booking"
            onClick={() => setOpen(false)}
            className={`relative w-fit whitespace-nowrap font-medium transition-colors duration-300 hover:text-primary after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full ${
              location.pathname === "/my-booking"
                ? "text-primary after:w-full"
                : "text-foreground"
            }`}
          >
            My Booking
          </Link>
        )}

        {/* Search bar */}
        <form
          onSubmit={handleSearch}
          className="hidden lg:flex items-center gap-2 w-36 xl:w-48 shrink-0 h-10 px-3 rounded-full border border-gray-200 bg-gray-100 shadow-sm transition-colors focus-within:border-gray-400"
        >
          {/*  className="hidden lg:flex items-center text-sm gap-2 border border-border px-3 rounded-full max-w-56" */}
          <input
            type="search"
            placeholder="Search services"
            aria-label="Search services"
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 min-w-0 h-full bg-transparent outline-none text-sm text-gray-800 placeholder:text-gray-500"
          />
          <button
            type="submit"
            aria-label="Submit service search"
            className="cursor-pointer shrink-0"
          >
            <img src={assets.search_icon} alt="search" />
          </button>
        </form>

        {/* Admin Dashboard Theme Toggle and Login/Logout */}
        <div className="flex max-lg:flex-col items-start lg:items-center gap-4">
          {/* Only show Dashboard button for administrators */}
          {isAdmin && (
            <button
              onClick={() => {
                navigate("/owner");
                setOpen(false);
              }}
              className="cursor-pointer whitespace-nowrap"
            >
              Dashboard
            </button>
          )}

          {/* Light and Dark mode toggle */}
          <ThemeToggle />

          {/* Login / Log out button */}
          <button
            onClick={() => {
              user ? logout() : setShowLogin(true);
            }}
            className="cursor-pointer whitespace-nowrap px-5 py-2 bg-primary hover:bg-highlight transition-all text-white rounded-lg"
          >
            {user ? "Logout" : "Login"}
          </button>
        </div>
      </div>

      {/* Mobile Menu Button */}
      <button
        className="lg:hidden cursor-pointer shrink-0"
        aria-label="Menu"
        onClick={() => setOpen(!open)}
      >
        <img src={open ? assets.close_icon : assets.menu_icon} alt="menu" />
      </button>
    </motion.nav>
  );
};
export default Navbar;
