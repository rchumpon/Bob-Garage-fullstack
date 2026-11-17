import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Home from "./pages/Home";
import ServiceDetails from "./pages/ServiceDetails";
import Services from "./pages/Services";
import Footer from "./components/layout/Footer";
import MyBooking from "./pages/MyBooking";
import Layout from "./pages/owner/Layout";
import Dashboard from "./pages/owner/Dashboard";
import AddService from "./pages/owner/AddService";
import ManageBookings from "./pages/owner/ManageBookings";
import EditService from "./pages/owner/EditService";
import ManageServices from "./pages/owner/ManageServices";
import Login from "./components/layout/Login";
import { Toaster } from "react-hot-toast";
import { useAppContext } from "./context/AppContext";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import Contact from "./pages/Contact";
import HeroSettings from "./pages/owner/HeroSettings";

function App() {
  const { showLogin, user, token } = useAppContext();
  const isOwnerPath = useLocation().pathname.startsWith("/owner");
  return (
    <>
      <Toaster />

      {/* Only render the thing on the right if the thing on the left is true. */}
      {showLogin && <Login />}
      {/* If we're not on an owner path, render the Navbar. */}
      {!isOwnerPath && <Navbar />}

      <Routes>
        {/* User Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<About />} />
        <Route path="/service-details/:id" element={<ServiceDetails />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact-us" element={<Contact />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route
          path="/my-booking"
          element={
            token && user && !user.isAdmin ? (
              <MyBooking />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        {/* Admin Routes */}
        <Route path="/owner" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="add-service" element={<AddService />} />
          <Route path="manage-services" element={<ManageServices />} />
          <Route path="edit-service/:serviceId" element={<EditService />} />
          <Route path="manage-bookings" element={<ManageBookings />} />
          <Route path="hero-settings" element={<HeroSettings />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      {!isOwnerPath && <Footer />}
    </>
  );
}
export default App;
