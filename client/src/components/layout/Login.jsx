import { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const Login = () => {
  const { setShowLogin, axios, setToken, navigate } = useAppContext();

  // Store the current form mode: "login" or "register"
  // The default mode is "login"
  const [state, setState] = useState("login");

  // Store the user's name, email, and password
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Handle form submission
  const onSubmitHandler = async (e) => {
    try {
      // Prevent the page from refreshing when the form is submitted
      e.preventDefault();
      // Send login or registration details to the backend
      const { data } = await axios.post(
        `/api/user/${state}`,
        state === "register"
          ? {
              name,
              email,
              password,
            }
          : { email, password },
      );

      if (data.success) {
        // Store JWT token in AppContext
        setToken(data.token);

        // Save token in localStorage
        localStorage.setItem("token", data.token);

        // Close the login popup
        setShowLogin(false);
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    // Login modal overlay
    // Clicking outside the form closes the modal
    <div
      onClick={() => setShowLogin(false)}
      className="fixed top-0 bottom-0 left-0 right-0 z-100 flex items-center text-sm text-muted-foreground bg-black/50"
    >
      {/* Login and registration form */}
      <form
        // Prevent clicks inside the form from closing the modal
        onClick={(e) => e.stopPropagation()}
        // Call the submit handler when the form is submitted
        onSubmit={onSubmitHandler}
        className="flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-88 rounded-lg shadow-xl border border-muted-foreground/20 bg-white"
      >
        {/* Form title changes based on the current mode */}
        <p className="text-2xl font-medium m-auto">
          <span className="text-primary">User </span>
          {state === "login" ? "Login" : "Sign Up"}
        </p>

        {/* Show the name field only during registration */}
        {state === "register" && (
          <div className="w-full">
            <p>Name</p>
            <input
              // Update the name state when the user types
              onChange={(e) => setName(e.target.value)}
              // Keep the input value synchronized with React state
              value={name}
              placeholder="Enter your full name"
              className="border border-muted-foreground/20 rounded w-full p-2 mt-1 outline-none transition focus:border-highlight focus:ring-2 focus:ring-highlight/20"
              type="text"
              required
            />
          </div>
        )}

        {/* Email field for both login and registration */}
        <div className="w-full">
          <p>Email</p>
          <input
            // Update the email state when the user types
            onChange={(e) => setEmail(e.target.value)}
            // Display the current email state
            value={email}
            placeholder="Enter your email"
            className="border border-muted-foreground/20 rounded w-full p-2 mt-1 outline-none transition focus:border-highlight focus:ring-2 focus:ring-highlight/20"
            type="email"
            required
          />
        </div>

        {/* Password field for both login and registration */}
        <div className="w-full">
          <p>Password</p>
          <input
            // Update the password state when the user types
            onChange={(e) => setPassword(e.target.value)}
            // Display the current password state
            value={password}
            placeholder="Enter your password"
            className="border border-muted-foreground/20 rounded w-full p-2 mt-1 outline-none transition focus:border-highlight focus:ring-2 focus:ring-highlight/20"
            type="password"
            minLength={state === "register" ? 8 : undefined}
            required
          />
        </div>

        {/* Allow users to switch between login and registration */}
        {state === "register" ? (
          // Display this message when the user is registering
          <p>
            Already have account?{" "}
            <span
              // Switch the form to login mode
              onClick={() => setState("login")}
              className=" text-primary cursor-pointer"
            >
              click here
            </span>
          </p>
        ) : (
          // Display this message when the user is logging in
          <p>
            Create an account?{" "}
            <span
              // Switch the form to registration mode
              onClick={() => setState("register")}
              className="text-primary cursor-pointer"
            >
              click here
            </span>
          </p>
        )}

        {/* Submit button */}
        <button
          // Submit the form when clicked
          type="submit"
          className="bg-primary hover:bg-primary-hover transition-all text-white w-full py-2 rounded-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 active:bg-highlight"
        >
          {/* Change the button text based on the form mode */}
          {state === "register" ? "Create Account" : "Login"}
        </button>
      </form>
    </div>
  );
};
export default Login;
