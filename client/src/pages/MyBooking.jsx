import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import {
  FaCalendarAlt,
  FaCar,
  FaClock,
  FaPhone,
  FaHeart,
} from "react-icons/fa";
import Title from "../components/common/Title";
import toast from "react-hot-toast";
import ServiceCard from "../components/common/ServiceCard";

const MyBooking = () => {
  const { axios, user, currency } = useAppContext();

  const [bookings, setBookings] = useState([]);

  // Track the selected tab
  const [activeTab, setActiveTab] = useState("bookings");

  // Store the customer's favourite services
  const [favourites, setFavourites] = useState([]);

  // Fetch bookings belonging to the logged-in customer
  const fetchMyBookings = async () => {
    try {
      const { data } = await axios.get("/api/booking/user");

      if (data.success) {
        setBookings(data.bookings);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Failed to fetch bookings:", error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  // Fetch favourite services belonging to the logged-in customer

  const fetchMyFavourites = async () => {
    try {
      const { data } = await axios.get("/api/favourite/list");

      if (data.success) {
        setFavourites(data.favourites);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Failed to fetch favourites:", error);
      toast.error(error.response?.data?.message || "Failed to load favourites");
    }
  };

  useEffect(() => {
    if (user) {
      fetchMyBookings();
      fetchMyFavourites();
    } else {
      setBookings([]);
      setFavourites([]);
    }
  }, [user]);

  return (
    <div className="bg-linear-to-bl from-background via-secondary/90 to-background px-6 md:px-16 lg:px-24 xl:px-32 2xl:px-48 text-sm max-w-7xl  pt-6 not-first:pb-12">
      <Title
        title="My bookings"
        subTitle="View and manage all your car service bookings"
        align="left"
      />

      {/* Booking and Favourite tabs */}
      <div className="flex gap-6 mt-8 border-b border-border">
        <button
          type="button"
          onClick={() => setActiveTab("bookings")}
          className={`pb-3 font-medium transition ${activeTab === "bookings" ? "border-b-2 border-primary text-primary" : "text-muted-foreground"}`}
        >
          <FaCalendarAlt className="inline mr-2" />
          My Bookings
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("favourites")}
          className={`pb-3 font-medium transition ${activeTab === "favourites" ? "border-b-2 border-primary text-primary" : "text-muted-foreground"}`}
        >
          <FaHeart className="inline mr-2" /> My Favourites
        </button>
      </div>

      {activeTab === "bookings" && (
        <div>
          {bookings.map((booking) => (
            <div
              key={booking.bookingId}
              className="grid grid-cols-1 md:grid-cols-4 bg-primary-foreground gap-6 p-6 border border-border rounded-lg mt-5 first:mt-12"
            >
              {/* Service Image and Information */}
              <div className="md:col-span-1">
                <div className="rounded-md overflow-hidden mb-3">
                  {booking.Service?.image && (
                    <img
                      src={booking.Service.image}
                      alt={`${booking.Service.name} service`}
                      className="w-full h-auto aspect-video object-cover"
                    />
                  )}
                </div>

                <p className="text-lg font-medium mt-2">
                  {booking.Service?.name || "Unknown Service"}
                </p>
                <p className="text-primary text-sm font-medium">
                  {booking.Service?.category}
                </p>
                <p className="text-muted-foreground mt-2">
                  {booking.Service?.description}
                </p>
              </div>

              {/* Booking Information */}
              <div className="md:col-span-2">
                {/* Booking number & Status */}
                <div className="flex flex-wrap items-center gap-2">
                  <p className="px-3 py-1.5 bg-highlight rounded">
                    Booking #{booking.bookingId}
                  </p>
                  <p
                    className={`px-3 py-1 text-xs rounded-full capitalize ${booking.status === "confirmed" ? "bg-green-400/15 text-green-600" : booking.status === "completed" ? "bg-blue-400/15 text-blue-600" : booking.status === "pending" ? "bg-yellow-400/15 text-yellow-600" : "bg-red-400/15 text-red-600"}`}
                  >
                    {booking.status}
                  </p>
                </div>

                <div className="flex items-start gap-3 mt-5">
                  <FaCalendarAlt className="text-primary w-4 h-4 mt-1" />
                  <div>
                    <p className="text-muted-foreground">Appointment Date</p>
                    <p>
                      {new Date(booking.bookingDate).toLocaleDateString(
                        "en-AU",
                        {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                          timeZone: "Australia/Melbourne",
                        },
                      )}
                    </p>
                  </div>
                </div>

                {/* Appointment Time */}
                <div className="flex items-start gap-3 mt-5">
                  <FaClock className="text-primary w-4 h-4 mt-1" />
                  <div>
                    <p className="text-muted-foreground">Appointment Time</p>
                    <p>
                      {new Date(booking.bookingDate).toLocaleTimeString(
                        "en-AU",
                        {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                          timeZone: "Australia/Melbourne",
                        },
                      )}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 mt-5">
                  <FaCar className="text-primary w-4 h-4 mt-1" />
                  <div>
                    <p className="text-muted-foreground">Vehicle</p>
                    <p>
                      {booking.vehicleYear} {booking.vehicleMake}{" "}
                      {booking.vehicleModel}
                    </p>
                    <p className="text-muted-foreground text-xs mt-1">
                      Registration: {booking.vehicleRegistration}
                    </p>
                  </div>
                </div>
                {/* Customer */}
                <div className="flex items-start gap-3 mt-4">
                  <FaPhone className="text-primary w-4 h-4 mt-1" />
                  <div>
                    <p className="text-muted-foreground">Contact</p>
                    <p>{booking.customerPhone}</p>
                  </div>
                </div>
              </div>

              {/* Price & Booking Date */}
              <div className="md:col-span-1 flex flex-col justify-between gap-6">
                <div className="text-sm text-muted-foreground text-right">
                  <p>Service Price</p>
                  <h1 className="text-2xl font-semibold text-primary">
                    {currency} {booking.price}
                  </h1>
                  <p className="mt-2">
                    Booked on{" "}
                    {new Date(booking.createdAt).toLocaleDateString("en-AU", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      timeZone: "Australia/Melbourne",
                    })}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "favourites" && (
        <div className="grid grid-cols-1 sm-grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {favourites.length > 0 ? (
            favourites.map((favourite) => (
              <ServiceCard
                key={favourite.favouriteId}
                service={favourite.Service}
                isFavourite={true}
                onToggle={(serviceId, isFavourite) => {
                  if (!isFavourite) {
                    setFavourites((previous) =>
                      previous.filter((item) => item.serviceId !== serviceId),
                    );
                  }
                }}
              />
            ))
          ) : (
            <p className="text-muted-foreground">
              You haven't added any favourite services yet.
            </p>
          )}
        </div>
      )}
    </div>
  );
};
export default MyBooking;
