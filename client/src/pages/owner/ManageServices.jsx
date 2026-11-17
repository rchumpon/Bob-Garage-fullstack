import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import { FaPencil, FaXmark } from "react-icons/fa6";
import Title from "../../components/owner/Title";
import toast from "react-hot-toast";

const ManageServices = () => {
  const navigate = useNavigate();
  const { isAdmin, axios, currency } = useAppContext();

  const [services, setServices] = useState([]);

  const fetchOwnerServices = async () => {
    try {
      // Fetch all services from the backend
      const { data } = await axios.get("/api/service/list");

      // Check whether the request was successful
      if (data.success) {
        // Store services in state
        setServices(data.services);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Failed to fetch services:", error);

      // Display the error message returned by the backend
      toast.error(
        error.response?.data?.message ||
          error.response?.data?.errors?.join(", ") ||
          error.message,
      );
    }
  };

  // Toggle the availability status of a service
  const toggleAvailability = async (serviceId) => {
    try {
      // Send a POST request with the selected service ID
      const { data } = await axios.post(`/api/service/toggle/${serviceId}`);

      // Check whether the request was successful
      if (data.success) {
        toast.success(data.message);

        // Fetch the latest services to update the table
        await fetchOwnerServices();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Failed to toggle availability:", error);

      toast.error(
        error.response?.data?.message ||
          error.response?.data?.errors?.join(", ") ||
          error.message,
      );
    }
  };

  // Delete a selected service from the database
  const deleteService = async (serviceId) => {
    try {
      // Ask the administrator to confirm before deleting
      const confirm = window.confirm(
        "Are you sure you want to delete this service?",
      );

      // Stop if the administrator clicks Cancel
      if (!confirm) return null;

      // Send a DELETE request with the selected service ID
      const { data } = await axios.delete(`/api/service/delete/${serviceId}`);

      // Check whether the request was successful
      if (data.success) {
        toast.success(data.message);

        // Fetch the latest services to refresh the table
        await fetchOwnerServices();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Failed to delete service:", error);

      // Display the backend error or fallback Axios error
      toast.error(
        error.response?.data?.message ||
          error.response?.data?.errors?.join(", ") ||
          error.message,
      );
    }
  };

  useEffect(() => {
    isAdmin && fetchOwnerServices();
  }, [isAdmin]);

  return (
    <div className="px-4 pt-10 md:px-10 w-full">
      <Title
        title="Manage Services"
        subTitle="View, update, and manage all garage services available for customers to book."
      />
      <div className="max-w-3xl w-full rounded-md overflow-hidden border border-border mt-6">
        <table className="w-full border-collapse text-left text-sm text-muted-foreground">
          <thead className="text-muted-foreground">
            <tr>
              <th className="p-3 font-medium">Service</th>
              <th className="p-3 font-medium max-md:hidden">Category</th>
              <th className="p-3 font-medium">Price</th>
              <th className="p-3 font-medium max-md:hidden">Status</th>
              <th className="p-3 font-medium">Actions</th>
            </tr>
          </thead>

          <tbody>
            {services.map((service) => (
              <tr key={service.serviceId} className=" border-t border-border">
                <td className="p-3 flex items-center gap-3">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="h-12 w-12 aspect-square rounded-md object-cover"
                  />
                  <div className="max-md:hidden">
                    <p className="font-medium text-secondary-foreground">
                      {service.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {service.duration}
                    </p>
                  </div>
                </td>

                {/* Status */}
                <td className="p-2 max-md:hidden">{service.category}</td>
                <td className="p-2">
                  {currency} {service.price}
                </td>

                {/* Service availability button */}
                <td className="p-3 max-md:hidden">
                  <button
                    onClick={() => toggleAvailability(service.serviceId)}
                    type="button"
                    className={`px-3 py-1 rounded-full text-xs cursor-pointer ${service.isAvailable ? "bg-green-400/15 text-green-600" : "bg-red-400/15 text-red-600"}`}
                  >
                    {service.isAvailable ? "Available" : "Unavailable"}
                  </button>
                </td>

                {/* Actions */}
                <td className="p-3">
                  <div className="flex items-center gap-2">
                    {/* Edit service*/}
                    <button
                      type="button"
                      onClick={() =>
                        navigate(`/owner/edit-service/${service.serviceId}`)
                      }
                      className="flex items-center gap-2 px-3 py-2 text-sm bg-blue-600 hover:bg-blue-800 text-primary-foreground rounded-md transition-colors cursor-pointer"
                    >
                      <FaPencil />
                      Edit
                    </button>

                    {/* Delete */}
                    <button
                      onClick={() => deleteService(service.serviceId)}
                      type="button"
                      className="flex items-center gap-2 px-3 py-2 text-sm bg-red-600 text-primary-foreground border border-red-500 rounded-md hover:bg-red-700 transition cursor-pointer"
                    >
                      <FaXmark />
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default ManageServices;
