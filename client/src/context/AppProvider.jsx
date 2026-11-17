import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AppContext } from "./AppContext";
import { toast } from "react-hot-toast";

// Set the default backend API URL
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

// Create the provider component
export const AppProvider = ({ children }) => {
  const navigate = useNavigate();
  const currency = import.meta.env.VITE_CURRENCY;

  // Store the user's authentication token
  const [token, setToken] = useState(null);

  // Store the logged-in user's information
  const [user, setUser] = useState(null);

  // Store whether the logged-in user is an administrator
  const isAdmin = user?.isAdmin === true;

  // Control whether the login popup is displayed
  const [showLogin, setShowLogin] = useState(false);

  // Store the selected booking date and time
  const [bookingDate, setBookingDate] = useState("");

  // Store services retrieved from the backend
  const [services, setServices] = useState([]);

  // ==================================================
  // Fetch Logged-in User Data
  // ==================================================
  const fetchUser = async () => {
    try {
      // Retrieve the logged-in user's data from the backend
      const { data } = await axios.get("/api/user/data", {
        headers: { Authorization: token },
      });

      // Check whether the request was successful
      if (data.success) {
        // Store the logged-in user's information
        setUser(data.user);
      } else {
        // Clear user information
        setUser(null);
      }
    } catch (error) {
      console.error("Failed to fetch user:", error);

      // Check whether the JWT is expired or invalid
      if (error.response?.status === 401) {
        // Remove the invalid token
        localStorage.removeItem("token");

        // Clear authentication state
        setToken("");
        setUser(null);

        // Remove the default Authorization header
        delete axios.defaults.headers.common["Authorization"];

        // Redirect to the homepage
        navigate("/");

        toast.error("Your session has expired. Please log in again.");
        return;
      }

      // Display other errors
      toast.error(error.response?.data?.message || error.message);
    }
  };

  // ==================================================
  // Fetch All Services from the server
  // ==================================================
  const fetchServices = async () => {
    try {
      // Retrieve all services from the backend
      const { data } = await axios.get("/api/service/list");

      // Check whether the request was successful
      data.success ? setServices(data.services) : toast.error(data.message);
    } catch (error) {
      console.error("Failed to fetch services:", error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  // ==================================================
  // Logout User
  // ==================================================
  const logout = () => {
    // Remove JWT token from localStorage
    localStorage.removeItem("token");

    // Clear authentication state
    setToken(null);
    setUser(null);

    // Remove Authorization header from Axios
    delete axios.defaults.headers.common["Authorization"];

    // Redirect to homepage
    navigate("/");
    toast.success("You have been logged out.");
  };

  // Retrieve the token from localStorage when the application loads
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    setToken(savedToken || "");
    fetchServices();
  }, []);

  // Fetch user data whenever the token changes
  useEffect(() => {
    if (token) {
      // Set the token for future Axios requests
      axios.defaults.headers.common["Authorization"] = token;

      // Retrieve the logged-in user's information
      fetchUser();
    } else {
      // Remove the authorization header when logged out
      delete axios.defaults.headers.common["Authorization"];

      // Clear the user information
      setUser(null);
    }
  }, [token]);

  // Store values to share across components
  const value = {
    navigate,
    currency,
    axios,
    token,
    setToken,
    user,
    setUser,
    isAdmin,
    showLogin,
    setShowLogin,
    bookingDate,
    setBookingDate,
    services,
    setServices,
    fetchUser,
    fetchServices,
    logout,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
