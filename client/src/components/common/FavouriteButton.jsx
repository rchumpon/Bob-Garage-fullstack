import { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import toast from "react-hot-toast";

const FavouriteButton = ({ serviceId, isFavourite, onToggle }) => {
  const { axios, token, setShowLogin } = useAppContext();

  // Prevent multiple requests while updating favourites
  const [isLoading, setIsLoading] = useState(false);

  const toggleFavourite = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    // Check if the customer is logged in
    if (!token) {
      if (setShowLogin) {
        setShowLogin(true);
      } else {
        toast.error("Please log in to save favourites");
      }
      return;
    }
    if (isLoading) return;

    try {
      setIsLoading(true);

      // Add or remove the selected favourite
      const { data } = isFavourite
        ? await axios.delete(`/api/favourite/remove/${serviceId}`)
        : await axios.post(`/api/favourite/add`, { serviceId });

      if (data.success) {
        onToggle(serviceId, !isFavourite);
        toast.success(data.message);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to update favourite",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={toggleFavourite}
      disabled={isLoading}
      aria-label={isFavourite ? "Remove from favourites" : "Add to favourites"}
      aria-pressed={isFavourite}
      className="flex h-9 w-9 items-center justify-center rounded-full bg-card shadow-md transition hover:scale-110 disabled:opacity-50"
    >
      {isFavourite ? (
        <FaHeart className="text-secondary-foreground" />
      ) : (
        <FaRegHeart className="text-secondary" />
      )}
    </button>
  );
};
export default FavouriteButton;
