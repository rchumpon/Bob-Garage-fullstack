import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import { FaCheck, FaXmark } from "react-icons/fa6";
import Title from "../../components/owner/Title";
import toast from "react-hot-toast";

const EditService = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();

  const { axios, token, currency, fetchServices } = useAppContext();

  // Store service details
  const [service, setService] = useState({
    name: "",
    category: "",
    price: "",
    duration: "",
    description: "",
    isAvailable: true,
    isPopular: false,
  });

  const [features, setFeatures] = useState("");

  // Store existing and replacement images
  const [currentImage, setCurrentImage] = useState("");
  const [image, setImage] = useState(null);

  // Control the loading state when submitting the updated service
  const [isLoading, setIsLoading] = useState(false);

  // Control the loading state when retrieving the existing service details.
  const [isFetching, setIsFetching] = useState(true);

  // Load the existing service details
  useEffect(() => {
    const fetchService = async () => {
      try {
        // Fetch all services from the backend
        const { data } = await axios.get("/api/service/list");

        if (data.success) {
          // Find the service matching the URL ID
          const existingService = data.services.find(
            (item) => String(item.serviceId) === serviceId,
          );

          // Check whether the service exists
          if (!existingService) {
            toast.error("Service not found");
            navigate("/owner/manage-services");
            return;
          }

          // Pre-fill the form with existing service information
          setService({
            name: existingService.name,
            category: existingService.category,
            price: existingService.price,
            duration: existingService.duration,
            description: existingService.description,
            isAvailable: existingService.isAvailable,
            isPopular: existingService.isPopular ?? false,
          });
          // Load existing features into the textarea
          setFeatures(
            Array.isArray(existingService.features)
              ? existingService.features.join("\n")
              : "",
          );
          setCurrentImage(existingService.image);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        console.error("Failed to fetch service:", error);
        toast.error(error.response?.data?.message || error.message);
      } finally {
        // Stop the fetching state whether successful or unsuccessful
        setIsFetching(false);
      }
    };

    fetchService();
  }, [serviceId, axios, navigate]);

  // Update the form fields
  const handleChange = (e) => {
    const { name, value } = e.target;

    setService((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submit updated service details
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (isLoading) return;
    setIsLoading(true);

    try {
      const formData = new FormData();

      // Append updated fields individually
      formData.append("name", service.name.trim());
      formData.append("category", service.category);
      formData.append("price", service.price);
      formData.append("duration", service.duration);
      formData.append("description", service.description.trim());

      // Append boolean values as strings for FormData
      formData.append("isAvailable", String(service.isAvailable));
      formData.append("isPopular", String(service.isPopular));

      // Append a replacement image only if selected
      if (image) {
        formData.append("image", image);
      }

      // Convert edited features into an array
      const featuresArray = features
        .split("\n")
        .map((feature) => feature.trim())
        .filter(Boolean);

      // Append features to FormData
      formData.append("features", JSON.stringify(featuresArray));

      // Send PUT request to the backend
      const { data } = await axios.put(
        `/api/service/update/${serviceId}`,
        formData,
        { headers: { Authorization: token } },
      );

      if (data.success) {
        toast.success(data.message || "Service updated successfully");

        // Refresh services stored in AppProvider
        if (fetchServices) {
          await fetchServices();
        }

        // Return to Manage Services
        navigate("/owner/manage-services");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Failed to update service:", error);

      toast.error(
        error.response?.data?.message ||
          error.response?.data?.errors?.join(",") ||
          error.message,
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return <p className="p-10">Loading service details.....</p>;
  }

  return (
    <div className="px-4 py-10 md:px-10 flex-1">
      <Title
        title="Edit Service"
        subTitle="Update the service information, price, duration, and image"
      />
      <form
        onSubmit={onSubmitHandler}
        className="flex flex-col gap-5 text-muted-foreground text-sm mt-6 max-w-xl"
      >
        {/* Service Image */}
        <div>
          <label className="block mb-2">Service Image</label>
          {currentImage && !image && (
            <img
              src={currentImage}
              alt="Current service"
              className="h-24 w-24 object-cover rounded-md mb-3"
            />
          )}

          {image && <p className="mb-2">New image: {image.name}</p>}

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
          />
        </div>

        {/* Service name */}
        <div>
          <label className="block mb-1">Service Name</label>
          <input
            onChange={handleChange}
            type="text"
            name="name"
            value={service.name}
            required
            className="w-full px-3 py-2 border border-border rounded-md"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block mb-1">Category</label>
          <select
            onChange={handleChange}
            name="category"
            value={service.category}
            required
            className="w-full px-3 py-2 border border-border rounded-md"
          >
            <option value="">Select a category</option>
            <option value="Oil Change">Oil Change</option>
            <option value="Brakes">Brakes</option>
            <option value="Electrical">Electrical</option>
            <option value="Tyres">Tyres</option>
            <option value="Air Conditioning">Air Conditioning</option>
            <option value="Diagnostics">Diagnostics</option>
            <option value="Suspension">Suspension</option>
            <option value="Maintenance">Maintenance</option>
            <option value="Wheel Balancing">Wheel Balancing</option>
            <option value="Inspection">Inspection</option>
          </select>
        </div>

        {/* Price */}
        <div>
          <label className="block mb-1">Service Price ({currency})</label>
          <input
            onChange={handleChange}
            type="number"
            name="price"
            min="0"
            step="0.01"
            value={service.price}
            required
            className="w-full px-3 py-2 border border-border rounded-md"
          />
        </div>

        {/* Duration */}
        <div>
          <label className="block mb-1">Estimated Duration</label>
          <select
            onChange={handleChange}
            name="duration"
            value={service.duration}
            required
            className="w-full px-3 py-2 border border-border rounded-md"
          >
            <option value="">Select duration</option>
            <option value="30 minutes">30 minutes</option>
            <option value="1 hour">1 hour</option>
            <option value="2 hours">2 hours</option>
            <option value="3 hours">3 hours</option>
            <option value="Half day">Half day</option>
            <option value="Full day">Full day</option>
          </select>
        </div>

        {/* Description */}
        <div>
          <label className="block mb-1">Description</label>
          <textarea
            name="description"
            rows={5}
            value={service.description}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-border rounded-md"
          />
        </div>

        {/* Service Features */}
        <div className="flex flex-col w-full">
          <label htmlFor="features">What's included (Features)</label>

          <textarea
            onChange={(e) => setFeatures(e.target.value)}
            id="features"
            rows={5}
            value={features}
            placeholder={
              "Engine oil replacement\nOil filter replacement\nFluid level check\nBasic vehicle inspection"
            }
            className="px-3 py-2 mt-1 border border-border rounded-md outline-none"
          ></textarea>
          <p className="text-xs text-muted-foreground mt-1">
            Enter one feature per line.
          </p>
        </div>

        {/* Availability */}
        <div className="flex items-center gap-2">
          <input
            onChange={(e) =>
              setService((prev) => ({ ...prev, isAvailable: e.target.checked }))
            }
            type="checkbox"
            id="isAvailable"
            checked={service.isAvailable}
            className="w-4 h-4 cursor-pointer"
          />
          <label htmlFor="isAvailable" className="cursor-pointer">
            Available for booking
          </label>
        </div>

        {/* Popular Service */}
        <div className="flex items-center gap-2">
          <input
            onChange={(e) =>
              setService((prev) => ({ ...prev, isPopular: e.target.checked }))
            }
            type="checkbox"
            id="isPopular"
            checked={service.isPopular}
            className="w-4 h-4 cursor-pointer"
          />
          <label htmlFor="isPopular" className="cursor-pointer">
            Mark as Popular
          </label>
        </div>

        {/* Form buttons */}
        <div className="flex items-center gap-3 mt-4">
          <button
            type="submit"
            disabled={isLoading}
            className="flex items-center gap-2 px-4 py-2.5 bg-primary text-white hover:bg-primary-hover rounded-md cursor-pointer w-max disabled:opacity-50 transition duration-200"
          >
            <FaCheck className="text-green-500" />
            {isLoading ? "Updating..." : "Save Changes"}
          </button>

          <button
            type="button"
            onClick={() => navigate("/owner/manage-services")}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-medium py-2.5 px-4 rounded-md cursor-pointer w-max transition duration-200"
          >
            <FaXmark />
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};
export default EditService;
