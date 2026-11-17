import NavbarOwner from "../../components/owner/NavbarOwner";
import Sidebar from "../../components/owner/Sidebar";
import { Outlet, Navigate } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";

const Layout = () => {
  const { isAdmin, token, user } = useAppContext();

  // Redirect visitors who are not logged in
  if (!token) {
    return <Navigate to="/" replace />;
  }

  // Wait until the user's information has been loaded
  if (!user) {
    return <p className="p-6">Loading...</p>;
  }

  // Redirect logged-in users who are not administrators
  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  // Display the admin dashboard
  return (
    <div className="flex flex-col">
      <NavbarOwner />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 min-w-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
export default Layout;
