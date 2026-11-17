import { useState } from "react";
// NavLink is used for navigation and active links.
// useLocation gives us the current URL/path.
import { NavLink, useLocation } from "react-router-dom";
import { assets, ownerMenuLinks } from "../../data/data";
import { FaCheck } from "react-icons/fa";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const Sidebar = () => {
  const { user, axios, fetchUser, token } = useAppContext();

  // Get the current URL path.
  // We use this to determine which sidebar link is active
  const location = useLocation();

  // Store the image selected by the user.
  const [image, setImage] = useState("");

  // This function runs when the user clicks the Save button.
  const updateImage = async () => {
    // Check whether an image has been selected
    if (!image) {
      return toast.error("Please select an image");
    }

    try {
      // Create FormData for the image upload
      const formData = new FormData();
      formData.append("image", image);

      // Send the image and JWT token to the backend
      const { data } = await axios.post("/api/user/update-image", formData, {
        headers: { Authorization: token },
      });

      if (data.success) {
        // Refresh the user's profile information
        fetchUser();
        toast.success(data.message);

        // Clear selected image
        setImage("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Failed to update image:", error);
      console.log("Status:", error.response?.status);
      console.log("Response:", error.response?.data);
      toast.error(error.message);
    }
  };

  return (
    <div className="relative min-h-screen md:flex flex-col items-center pt-8 max-w-14 md:max-w-60 w-full border-r border-muted-foreground text-sm">
      {/* Profile image section */}
      <div className="group relative">
        <label htmlFor="image">
          {/* 
          - Display the selected image if one has been chosen
          -If no new image has been selected, show user's image (if it exists), otherwise show the default image 
          */}
          <img
            src={
              image
                ? URL.createObjectURL(image)
                : user?.image ||
                  "https://images.pexels.com/photos/4481942/pexels-photo-4481942.jpeg"
            }
            alt={user?.name || "Profile"}
            className="h-9 md:h-24 w-9 md:w-24 rounded-full mx-auto"
          />
          <input
            type="file" // Selecting a file from the user's computer
            id="image"
            accept="image/*"
            hidden
            onChange={(e) => setImage(e.target.files[0])}
          />

          {/* Edit overlay - group-hover:flex = appears when hovering
            over the parent "group". */}
          <div className="absolute hidden top-0 right-0 left-0 bottom-0 bg-black/10 rounded-full group-hover:flex items-center justify-center cursor-pointer">
            <img src={assets.edit_icon} alt="" />
          </div>
        </label>
      </div>

      {/* Only show the Save button when the user has selected a new image */}
      {image && (
        <button
          // Run updateImage when Save is clicked.
          onClick={updateImage}
          className="absolute top-0 right-0 flex p-2 gap-1 bg-primary/10 text-primary cursor-pointer"
        >
          Save <FaCheck className="w-3 h-3" />
        </button>
      )}
      <p className="mt-2 text-base max-md:hidden">{user?.name}</p>

      {/* Sidebar navigation */}
      <div className="w-full">
        {ownerMenuLinks.map((link, index) => {
          const Icon = link.icon;
          const isActive = link.path === location.pathname;

          return (
            // NavLink navigates to the path stored in link.path.
            <NavLink
              key={index}
              to={link.path}
              // Check whether this link matches the current URL.
              className={`relative flex items-center gap-2 w-full py-3 pl-4 first:mt-6 ${isActive ? "bg-primary/10 text-primary" : "text-gray-600"}`}
            >
              {/* React Icon */}
              <Icon className="w-4 h-4" />
              {/* Navigation name */}
              <span className="max-md:hidden">{link.name}</span>

              {/* Active page indicator */}
              <div
                className={`${isActive ? "bg-primary" : ""} w-1.5 h-8 rounded-l-xl right-0 absolute`}
              ></div>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};
export default Sidebar;
