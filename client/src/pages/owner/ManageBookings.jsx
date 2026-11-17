import { useEffect, useState } from "react";
import Title from "../../components/owner/Title";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import { assets } from "../../data/data";

const ManageBookings = () => {
  const { axios, currency } = useAppContext();

  // Store bookings
  const [bookings, setBookings] = useState([]);

  // Store search input
  const [search, setSearch] = useState("");

  // Fetch all customer bookings - Admin Only
  const fetchOwnerBookings = async () => {
    try {
      // Send a GET request to retrieve all customer bookings
      const { data } = await axios.get(`/api/booking/list`);

      // Check whether the request was successful
      // Store all bookings in state
      // Display the error message returned by the backend
      data.success ? setBookings(data.bookings) : toast.error(data.message);
    } catch (error) {
      console.log("Failed to fetch bookings:", error);

      // Display the backend error or fallback Axios error
      toast.error(
        error.response?.data?.message ||
          error.response?.data?.errors?.join(",") ||
          error.message,
      );
    }
  };

  // Change booking status - Admin Only
  const changeBookingStatus = async (bookingId, status) => {
    try {
      // Send the booking ID and selected status to the backend
      const { data } = await axios.post(`/api/booking/change-status`, {
        bookingId,
        status,
      });

      // Check whether the request was successful
      if (data.success) {
        // Display a success notification
        toast.success(data.message);

        // Refresh the bookings table
        await fetchOwnerBookings();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log("Failed to update booking status:", error);

      // Display the backend error or fallback Axios error
      toast.error(
        error.response?.data?.message ||
          error.response?.data?.errors?.join(",") ||
          error.message,
      );
    }
  };

  useEffect(() => {
    fetchOwnerBookings();
  }, []);

  // Filter bookings based on the search input
  const filteredBookings = bookings.filter((booking) => {
    const searchValue = search.toLowerCase().trim();

    return (
      booking.User?.name?.toLowerCase().includes(searchValue) ||
      booking.User?.email?.toLowerCase().includes(searchValue) ||
      booking.Service?.name?.toLowerCase().includes(searchValue)
    );
  });

  return (
    <div className="px-4 pt-10 md:px-10 w-full">
      <Title
        title="Manage Bookings"
        subTitle="Track all customer bookings, approve or cancel requests, and manage booking statuses."
      />

      {/* Search Bar */}
      <div className="flex items-center gap-3 px-4 mt-6 max-w-3xl w-full h-12 rounded-full border border-gray-200 bg-muted-foreground/10 shadow-sm transition-colors focus-within:border-primary">
        <img
          src={assets.search_icon}
          alt="Search"
          className="w-4.5 h-4.5 shrink-0"
        />
        <input
          type="search"
          placeholder="Search by customer, email or service..."
          aria-label="Search bookings"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full h-full outline-none text-muted-foreground"
        />
      </div>

      <div className="max-w-3xl w-full overflow-x-auto rounded-md border border-border mt-6">
        <table className="w-full min-w-175 border-collapse text-left text-sm text-muted-foreground">
          <thead className="text-muted-foreground">
            <tr>
              <th className="p-3 font-medium ">Customer</th>
              <th className="p-3 font-medium">Service</th>
              <th className="p-3 font-medium max-md:hidden">Date & Time</th>
              <th className="p-3 font-medium max-md:hidden">Price</th>
              <th className="p-3 font-medium">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredBookings.map((booking) => (
              <tr
                key={booking.bookingId}
                className=" border-t border-border text-muted-foreground"
              >
                {/* Customer details */}
                <td className="p-3">
                  <p className="font-medium text-secondary-foreground">
                    {booking.User?.name}
                  </p>
                  <p className="font-medium text-muted-foreground">
                    {booking.User?.email}
                  </p>
                  <p className="font-medium text-muted-foreground">
                    {booking.customerPhone}
                  </p>
                </td>

                {/* Service */}
                <td className="p-3 ">
                  <div className="flex items-center gap-3">
                    <img
                      src={booking.Service?.image}
                      alt={booking.Service?.name || "Service"}
                      className="h-12 w-12 aspect-square rounded-md object-cover"
                    />
                    <div>
                      <p className="font-medium text-secondary-foreground">
                        {booking.Service?.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {booking.Service?.duration}
                      </p>
                    </div>
                  </div>
                </td>

                {/* Booking Date & Time*/}
                <td className="p-3 max-md:hidden">
                  <p className="font-medium text-secondary-foreground">
                    {new Date(booking.bookingDate).toLocaleDateString("en-AU", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>

                  <p className="text-xs text-muted-foreground">
                    {new Date(booking.bookingDate).toLocaleTimeString("en-AU", {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                      timeZone: "Australia/Melbourne",
                    })}
                  </p>
                </td>

                {/* Price */}
                <td className="p-3 max-md:hidden">
                  {currency} {booking.price}
                </td>

                {/* Booking status */}
                <td className="p-3">
                  {booking.status === "pending" ||
                  booking.status === "confirmed" ? (
                    <select
                      onChange={(e) =>
                        changeBookingStatus(booking.bookingId, e.target.value)
                      }
                      value={booking.status}
                      className="px-2 py-1.5 mt-1 text-muted-foreground border border-muted-foreground rounded-md outline-none cursor-pointer"
                    >
                      {/* Current status */}
                      <option
                        value="pending"
                        disabled={booking.status !== "pending"}
                      >
                        Pending
                      </option>

                      {/* Admin can confirm a pending booking */}
                      <option
                        value="confirmed"
                        disabled={booking.status !== "pending"}
                      >
                        Confirmed
                      </option>

                      {/* Admin can complete a confirmed booking */}
                      <option
                        value="completed"
                        disable={booking.status !== "confirmed"}
                      >
                        Completed
                      </option>

                      {/* Admin can cancel pending or confirmed bookings */}
                      <option value="cancelled">Cancelled</option>
                    </select>
                  ) : (
                    // Display the final booking status
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${booking.status === "confirmed" ? "bg-green-100 text-green-600" : booking.status === "completed" ? "bg-blue-100 text-blue-600" : "bg-red-100 text-red-600"}`}
                    >
                      {booking.status.charAt(0).toUpperCase() +
                        booking.status.slice(1)}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default ManageBookings;
