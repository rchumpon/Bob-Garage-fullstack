import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { assets } from "../data/data";
import { FaCalendarAlt, FaCheck, FaClock, FaWrench } from "react-icons/fa";
import Loader from "../components/common/Loader";
import toast from "react-hot-toast";
import { motion } from "motion/react";

const ServiceDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Retrieve services and currency from AppContext
  const { services, fetchServices, currency, axios, token, setShowLogin } =
    useAppContext();

  // Store the selected service
  const [service, setService] = useState(null);

  // Track whether the services are loading
  const [isLoading, setIsLoading] = useState(true);

  // Store the customer's appointment information
  const [booking, setBooking] = useState({
    date: "",
    time: "",
    vehicleYear: "",
    vehicleMake: "",
    vehicleModel: "",
    vehicleRegistration: "",
    customerPhone: "",
  });

  // Track the appointment submission state
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Update the booking form fields
  const handleBookingChange = (e) => {
    const { name, value } = e.target;

    setBooking((prev) => ({ ...prev, [name]: value }));
  };

  // Find the selected service
  useEffect(() => {
    const loadService = async () => {
      try {
        // Fetch services if they haven't been loaded
        if (services.length === 0) {
          await fetchServices();
        }
      } catch (error) {
        console.error("Failed to load services:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadService();
  }, [fetchServices]);

  // Update the selected service when data becomes available
  useEffect(() => {
    const selectedService = services.find(
      (item) => String(item.serviceId) === id,
    );
    setService(selectedService || null);
  }, [services, id]);

  // Submit the appointment request
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prevent multiple submissions
    if (isSubmitting) return;

    // Ask the customer to log in first
    if (!token) {
      toast.error("Please log in to book a service");
      setShowLogin(true);
      return;
    }

    // Combine the selected date and time
    const bookingDate = `${booking.date}T${booking.time}:00`;

    // Convert the booking date into a Date object
    const selectedDate = new Date(bookingDate);

    // Prevent invalid or past appointment dates
    if (Number.isNaN(selectedDate.getTime()) || selectedDate <= new Date()) {
      return toast.error(
        "Please select a valid future appointment date and time.",
      );
    }
    // Start the loading state
    setIsSubmitting(true);

    try {
      // Prepare the appointment information
      const bookingData = {
        serviceId: service.serviceId,
        bookingDate,
        vehicleYear: Number(booking.vehicleYear),
        vehicleMake: booking.vehicleMake.trim(),
        vehicleModel: booking.vehicleModel.trim(),
        vehicleRegistration: booking.vehicleRegistration.trim(),
        customerPhone: booking.customerPhone.trim(),
      };

      // Check which services are available at the selected date and time
      const availabilityResponse = await axios.post(
        "/api/booking/check-availability",
        { bookingDate },
      );

      // Check whether the availability request was successful
      if (!availabilityResponse.data.success) {
        return toast.error("Failed to check service availability");
      }

      // Check whether the selected service is available
      const isServiceAvailable =
        availabilityResponse.data.availableServices?.some(
          (item) => String(item.serviceId) === String(service.serviceId),
        );

      // Prevent booking if the service is unavailable
      if (!isServiceAvailable) {
        return toast.error(
          "This service is unavailable at the selected date and time.",
        );
      }

      // Send the booking request to the backend
      const { data } = await axios.post("/api/booking/create", bookingData, {
        headers: { Authorization: token },
      });

      if (data.success) {
        toast.success(data.message || "Appointment requested successfully!");

        // Reset the booking form
        setBooking({
          date: "",
          time: "",
          vehicleYear: "",
          vehicleMake: "",
          vehicleModel: "",
          vehicleRegistration: "",
          customerPhone: "",
        });

        // Redirect to the customer's booking page
        navigate("/my-booking");
      } else {
        toast.error(data.message || "Failed to request appointment.");
      }
    } catch (error) {
      console.error("Failed to create booking:", error);

      toast.error(
        error.response?.data?.message ||
          error.response?.data?.errors?.join(", ") ||
          error.message,
      );
    } finally {
      // Stop the loading state
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  if (!service) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <h2 className="text-2xl font-semibold text-primary">
          Service Not Found
        </h2>

        <button
          onClick={() => navigate("/services")}
          className="mt-4 px-6 py-3 bg-primary hover:bg-primary-hover text-white rounded-lg cursor-pointer transition-colors"
        >
          Back to Services
        </button>
      </div>
    );
  }

  return service ? (
    <div className="overflow-x-hidden px-6 md:px-16 lg:px-24 xl:px-32 bg-linear-to-b from-background via-secondary/90 to-background pt-8 pb-24">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 mb-6 text-muted-foreground hover:text-primary transition-colors cursor-pointer"
      >
        <img
          src={assets.arrow_icon}
          alt=""
          className="rotate-180 opacity-80 dark:invert"
        />
        Back to all services
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
        {/* Left: Service Details */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-2 "
        >
          {/* Service Image */}
          <motion.img
            initial={{ scale: 0.98, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            src={service.image}
            alt={service.name}
            className="w-full h-auto md:max-h-100 object-cover rounded-xl mb-6 shadow-md"
          />
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              delay: 0.2,
              duration: 0.5,
              ease: "easeOut",
            }}
            className="space-y-6"
          >
            {/* Title */}
            <div>
              <p className="text-sm text-primary font-medium uppercase tracking-wider">
                {service.category}
              </p>
              <h1 className="text-3xl text-foreground font-bold mt-1">
                {service.name}
              </h1>

              <p className="text-2xl font-semibold text-primary mt-1">
                {currency} {Number(service.price).toFixed(2)}
              </p>
            </div>

            <hr className="border-primary my-6" />

            {/* Service Information */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex flex-col items-center bg-card border border-border p-4 rounded-lg">
                <FaWrench className="text-primary text-xl mb-2" />
                <span className="text-sm text-foreground">
                  Professional Service
                </span>
              </div>

              <div className="flex flex-col items-center bg-card border border-border p-4 rounded-lg">
                <FaCalendarAlt className="text-primary text-xl mb-2" />
                <span className="text-sm text-foreground">By Appointment</span>
              </div>

              <div className="flex flex-col items-center bg-card border border-border p-4 rounded-lg">
                <FaClock className="text-primary text-xl mb-2" />
                <span className="text-sm text-foreground">Expert Care</span>
              </div>
            </div>

            {/* Description */}
            <div>
              <h2 className="text-xl text-primary font-medium mb-3">
                About This Service
              </h2>

              <p className="text-muted-foreground leading-7">
                {service.description}
              </p>
            </div>

            {/* Features */}
            {Array.isArray(service.features) && service.features.length > 0 && (
              <div>
                <h2 className="text-xl text-primary font-medium mb-3">
                  What's Included
                </h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {service.features.map((item, index) => (
                    <li
                      key={`${index}-${item}`}
                      className="flex items-center text-muted-foreground"
                    >
                      <FaCheck className="text-primary mr-2 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>
        </motion.div>

        {/* Right: Appointment Form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
          className="w-full min-w-0 max-w-full h-max rounded-xl border border-border bg-card p-4 text-foreground space-y-6 shadow-lg sm:p-6 lg:sticky lg:top-18"
        >
          <div>
            <p className="text-2xl text-primary font-semibold sm:text-2xl">
              Request a Service
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Choose your preferred date and time.
            </p>
          </div>

          <hr className="border-primary" />

          {/* Date */}
          <div className="flex min-w-0 flex-col gap-2">
            <label htmlFor="service-date">Preferred Date</label>
            <input
              onChange={handleBookingChange}
              type="date"
              id="service-date"
              name="date"
              value={booking.date}
              className="block w-full min-w-0 max-w-full border border-border bg-background text-foreground placeholder:text-muted-foreground px-3 py-2 rounded-lg outline-none focus:border-primary"
              required
            />
          </div>

          {/* Time */}
          <div className="flex min-w-0 flex-col gap-2">
            <label htmlFor="service-time">Preferred Time</label>

            <input
              onChange={handleBookingChange}
              type="time"
              id="service-time"
              name="time"
              value={booking.time}
              className="block w-full min-w-0 max-w-full border border-border bg-background text-foreground placeholder:text-muted-foreground px-3 py-2 rounded-lg outline-none focus:border-primary"
              required
            />
          </div>

          {/* Vehicle Information */}
          <div className="space-y-4">
            <h3 className="font-semibold text-primary">Vehicle Information</h3>

            {/* Vehicle Year */}
            <div className="flex flex-col gap-2">
              <label htmlFor="vehicleYear">Vehicle Year</label>
              <input
                onChange={handleBookingChange}
                type="number"
                id="vehicleYear"
                name="vehicleYear"
                placeholder="e.g. 2026"
                min="1900"
                max={new Date().getFullYear() + 1}
                value={booking.vehicleYear}
                required
                className="w-full border border-border bg-background text-foreground placeholder:text-muted-foreground px-3 py-2 rounded-lg outline-none focus:border-primary"
              />
            </div>

            {/* Vehicle Make */}
            <div className="flex flex-col gap-2">
              <label htmlFor="vehicleMake">Vehicle Make</label>
              <input
                onChange={handleBookingChange}
                type="text"
                id="vehicleMake"
                name="vehicleMake"
                placeholder="e.g. Toyota"
                value={booking.vehicleMake}
                required
                className="w-full border border-border bg-background text-foreground placeholder:text-muted-foreground px-3 py-2 rounded-lg outline-none focus:text-primary"
              />
            </div>

            {/* Vehicle Model */}
            <div className="flex flex-col gap-2">
              <label htmlFor="vehicleModel">Vehicle Model</label>
              <input
                onChange={handleBookingChange}
                type="text"
                id="vehicleModel"
                name="vehicleModel"
                placeholder="e.g. Corolla"
                value={booking.vehicleModel}
                required
                className="w-full border border-border bg-background text-foreground placeholder:text-muted-foreground px-3 py-2 rounded-lg outline-none focus:border-primary"
              />
            </div>

            {/* Vehicle Registration */}
            <div className="flex flex-col gap-2">
              <label htmlFor="vehicleRegistration">Registration Number</label>
              <input
                onChange={handleBookingChange}
                type="text"
                id="vehicleRegistration"
                name="vehicleRegistration"
                placeholder="e.g. ABC123"
                value={booking.vehicleRegistration}
                required
                className="w-full border border-border bg-background text-foreground placeholder:text-muted-foreground px-3 py-2 rounded-lg outline-none focus:border-primary"
              />
            </div>

            {/* Contact Phone */}
            <div className="flex flex-col gap-2">
              <label htmlFor="contactPhone">Contact Phone</label>
              <input
                onChange={handleBookingChange}
                type="tel"
                id="customerPhone"
                name="customerPhone"
                placeholder="e.g. 0412 345 678"
                value={booking.customerPhone}
                required
                className="w-full border border-border bg-background text-foreground placeholder:text-muted-foreground px-3 py-2 rounded-lg outline-none focus:border-primary"
              />
            </div>
          </div>

          {/* Price */}
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Starting From </span>
            <span className="text-base font-normal text-primary">
              {currency}
              {Number(service.price).toFixed(2)}
            </span>
          </div>

          <motion.button
            type="submit"
            disabled={isSubmitting || !service.isAvailable}
            whileHover={
              isSubmitting || !service.isAvailable ? {} : { scale: 1.02 }
            }
            whileTap={
              isSubmitting || !service.isAvailable ? {} : { scale: 0.98 }
            }
            className="w-full bg-primary hover:bg-primary-hover transition-all py-3 font-medium text-white rounded-xl cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting
              ? "submitting..."
              : !service.isAvailable
                ? "Currently Unavailable"
                : "Request Appointment"}
          </motion.button>
          <p className="text-center text-sm text-muted-foreground">
            No credit card required to reserve
          </p>
        </motion.form>
      </div>
    </div>
  ) : (
    <Loader />
  );
};
export default ServiceDetails;
