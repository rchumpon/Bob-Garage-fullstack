import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { assets } from "../data/data";
import { motion } from "motion/react";
import Title from "../components/common/Title";
import ServiceCard from "../components/common/ServiceCard";
import Testimonial from "../components/layout/Testimonial";

const Services = () => {
  const { axios, token, services } = useAppContext();

  // Get the search term from the Navbar URL
  const [searchParams] = useSearchParams();
  const searchValue = searchParams.get("search") || "";

  // Store the search input
  const [input, setInput] = useState("");

  // Store the IDs of the customer's favourite services
  const [favouriteIds, setFavouriteIds] = useState([]);

  // Update the search input when the URL search changes
  useEffect(() => {
    setInput(searchValue);
  }, [searchValue]);

  // Retrieve the customer's favourites
  useEffect(() => {
    // Clear favourites when the customer logs out
    if (!token) {
      setFavouriteIds([]);
      return;
    }

    let cancelled = false;

    const fetchFavourites = async () => {
      try {
        const { data } = await axios.get(`/api/favourite/list`, {
          headers: { Authorization: token },
        });

        if (data.success && !cancelled) {
          setFavouriteIds(
            data.favourites.map((favourite) => favourite.serviceId),
          );
        }
      } catch (error) {
        if (!cancelled) {
          console.error("Fetch Favourites Error", error);
        }
      }
    };
    fetchFavourites();
    return () => {
      cancelled = true;
    };
  }, [axios, token]);

  // Update the heart icon after adding or removing a favourite
  const handleFavouriteToggle = (serviceId, isFavourite) => {
    setFavouriteIds((previous) =>
      isFavourite
        ? [...new Set([...previous, serviceId])]
        : previous.filter((id) => id !== serviceId),
    );
  };

  // Filter available services and match the search input
  const filteredServices = services.filter(
    (service) =>
      service.isAvailable === true &&
      service.name.toLowerCase().includes(input.toLowerCase().trim()),
  );
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex flex-col items-center py-20 bg-background max-md:px-4"
      >
        <Title
          title="Find The Right Service For Your Vehicle"
          subTitle="Explore our professional automotive services and find the care your vehicle needs."
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="flex items-center bg-white px-4 mt-6 max-w-140 w-full h-12 rounded-full shadow"
        >
          <img
            src={assets.search_icon}
            alt="Search"
            className="w-4.5 h-4.5 mr-2"
          />
          <input
            onChange={(e) => setInput(e.target.value)}
            value={input}
            type="text"
            placeholder="Search for a service..."
            aria-label="Search for automotive services"
            className="w-full h-full outline-none text-muted-foreground"
          />
          <img
            src={assets.filter_icon}
            alt="Filter services"
            className="w-4.5 h-4.5 ml-2"
          />
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="bg-background px-6 md:px-16 lg:px-24 xl:px-32 pt-10 pb-10"
      >
        <p className="text-primary xl:px-20 max-w-7xl mx-auto">
          Showing {filteredServices.length} services
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-4 xl:px-20 max-w-7xl mx-auto">
          {filteredServices.map((service, index) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: 0.1 * index, duration: 0.4 }}
              key={service.serviceId}
            >
              <ServiceCard
                service={service}
                isFavourite={favouriteIds.includes(service.serviceId)}
                onToggle={handleFavouriteToggle}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>

      <Testimonial />
    </div>
  );
};
export default Services;
