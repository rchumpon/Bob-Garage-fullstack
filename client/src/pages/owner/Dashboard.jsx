import { useEffect, useState } from "react";
import { assets } from "../../data/data";
import {
  FaCalendarCheck,
  FaCheckCircle,
  FaClock,
  FaWrench,
} from "react-icons/fa";
import Title from "../../components/owner/Title";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const Dashboard = () => {
  const { axios, isAdmin, currency } = useAppContext();

  // Store the dashboard data
  const [data, setData] = useState({
    totalServices: 0,
    totalBookings: 0,
    pendingBookings: 0,
    completedBookings: 0,
    recentBookings: [],
    monthlyRevenue: 0,
  });

  // Dashboard summary cards
  const dashboardCards = [
    {
      title: "Total Services",
      value: data.totalServices,
      icon: FaWrench,
    },
    {
      title: "Total Bookings",
      value: data.totalBookings,
      icon: FaCalendarCheck,
    },
    {
      title: "Pending Bookings",
      value: data.pendingBookings,
      icon: FaClock,
    },
    {
      title: "Completed Bookings",
      value: data.completedBookings,
      icon: FaCheckCircle,
    },
  ];

  const fetchDashboardData = async () => {
    try {
      const { data } = await axios.get("/api/service/dashboard");

      if (data.success) {
        console.log("Recent bookings:", data.dashboardData.recentBookings);

        console.log(
          "Recent bookings:",
          JSON.stringify(data.dashboardData.recentBookings, null, 2),
        );
        setData(data.dashboardData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (isAdmin) {
      fetchDashboardData();
    }
  }, [isAdmin]);

  return (
    <div className="px-4 pt-10 md:px-10 flex-1 border border-border">
      {/* Dashboard title */}
      <Title
        title="Admin Dashboard"
        subTitle="Monitor overall garage performance including services, bookings, revenue, and recent activities"
      />
      {/* Dashboard Cards */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-8">
        {dashboardCards.map((card, index) => {
          // Store the icon component in a variable
          const Icon = card.icon;

          return (
            <div
              key={index}
              className="flex gap-2 items-center justify-between p-4 rounded-md border border-border"
            >
              {/* Card information */}
              <div>
                <h1 className="text-xs text-muted-foreground">{card.title}</h1>
                <p className="text-lg font-semibold">{card.value}</p>
              </div>

              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                <Icon className="text-primary" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Bookings + Monthly Revenue */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8 w-full">
        {/* Recent booking */}
        <div className="p-4 md:p-6 border border-borderColor rounded-md w-full lg:col-span-2">
          <h1 className="text-lg text-highlight font-medium">
            Recent Bookings
          </h1>
          <p className="text-muted-foreground">
            Latest customer service bookings
          </p>

          {data.recentBookings.map((booking, index) => (
            <div key={index} className="mt-4 flex items-center justify-between">
              {/* Booking information */}
              <div className="flex items-center gap-2">
                {/* Booking icon */}
                <div className="hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
                  <img
                    src={assets.listIconColored}
                    alt=""
                    className="h-5 w-5"
                  />
                </div>

                {/* Service information */}
                <div>
                  <p>{booking.Service?.name || "Unknown Service"}</p>

                  {/* Display booking creation date in Melbourne time */}
                  <p className="text-sm text-muted-foreground">
                    {new Date(booking.createdAt).toLocaleDateString("en-AU", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      timeZone: "Australia/Melbourne",
                    })}
                  </p>
                </div>
              </div>

              {/* Price & Status */}
              <div className="flex items-center gap-4 font-medium">
                <p className="text-sm text-muted-foreground">
                  {currency} {booking.price}
                </p>
                <p
                  className={`px-3 py-1 rounded-full text-sm capitalize ${booking.status === "confirmed" ? "bg-green-400/15 text-green-600" : booking.status === "completed" ? "bg-blue-400/15 text-blue-600" : booking.status === "pending" ? "bg-yellow-400/15 text-yellow-600 px-5" : "bg-red-400/15 text-red-600"}`}
                >
                  {booking.status}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Monthly revenue */}
        <div className="p-4 md:p-6 mb-2 border border-border rounded-md w-full">
          <h1 className="text-lg text-highlight font-medium">
            Monthly Revenue
          </h1>
          <p className="text-muted-foreground">Revenue for current month</p>
          <p className="text-3xl text-primary mt-6 font-semibold">
            {currency} {data.monthlyRevenue}
          </p>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
