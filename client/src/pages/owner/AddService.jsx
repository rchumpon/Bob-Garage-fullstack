import { useState } from "react";
import { FaCheck, FaUpload } from "react-icons/fa";
import Title from "../../components/owner/Title";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const AddService = () => {
  const { axios, currency, token } = useAppContext();

  // Store selected service image
  const [image, setImage] = useState(null);

  // Store service information
  const [service, setService] = useState({
    name: "",
    category: "",
    price: "",
    duration: "",
    description: "",
    isPopular: false,
  });

  // Store the service features entered by the admin
  const [features, setFeatures] = useState("");

  // Loading state
  const [isLoading, setIsLoading] = useState(false);

  // Handle form submission
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    // Prevent multiple submissions
    if (isLoading) return null;

    // Make sure an image has been selected
    if (!image) {
      return toast.error("Please upload a service image");
    }
    setIsLoading(true);

    try {
      // Create FormData to send the image and service information()
      const formData = new FormData();
      formData.append("image", image);
      formData.append("name", service.name.trim());
      formData.append("category", service.category);
      formData.append("price", service.price);
      formData.append("duration", service.duration);
      formData.append("description", service.description.trim());
      formData.append("isPopular", String(service.isPopular));

      // Convert textarea lines into an array
      const featuresArray = features
        .split("\n")
        .map((feature) => feature.trim())
        .filter(Boolean);

      // Send features as a JSON string
      formData.append("features", JSON.stringify(featuresArray));

      // Send the service information to the backend
      const { data } = await axios.post("/api/service/add", formData, {
        headers: { Authorization: token },
      });

      if (data.success) {
        toast.success(data.message || "Service added successfully");

        // Reset the selected image
        setImage(null);

        // Reset the form fields
        setService({
          name: "",
          category: "",
          price: "",
          duration: "",
          description: "",
          isPopular: false,
        });

        // Reset the features textarea
        setFeatures("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Failed to add service:", error);

      // Display the error message returned by the backend
      toast.error(
        error.response?.data?.message ||
          error.response?.data?.errors?.join(", ") ||
          error.message,
      );
    } finally {
      // Reset the submit button
      setIsLoading(false);
    }
  };

  return (
    <div className="px-4 py-10 md:px-10 flex-1">
      {/* Page title */}
      <Title
        title="Add New Service"
        subTitle="Add a new garage service with pricing, duration, and service details."
      />

      <form
        onSubmit={onSubmitHandler}
        className="flex flex-col gap-5 text-muted-foreground text-sm mt-6 max-w-xl"
      >
        {/* Service Image */}
        <div className="flex items-center gap-2 w-full">
          <label htmlFor="service-image">
            {image ? (
              <img
                src={URL.createObjectURL(image)}
                alt=""
                className="h-14 w-14 object-cover rounded cursor-pointer"
              />
            ) : (
              <FaUpload className="h-14 w-14 p-3 border border-border rounded cursor-pointer text-muted-foreground" />
            )}

            <input
              type="file"
              id="service-image"
              accept="image/*"
              hidden
              onChange={(e) => setImage(e.target.files[0])}
            />
          </label>

          <p className="text-sm text-gray-500">
            Upload a picture for your service
          </p>
        </div>

        {/* Service Name & Category */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col w-full">
            <label>Service Name</label>

            <input
              type="text"
              placeholder="e.g. Full Car Service"
              required
              className="px-3 py-2 mt-1 border border-border rounded-md outline-none"
              value={service.name}
              onChange={(e) =>
                setService({
                  ...service,
                  name: e.target.value,
                })
              }
            />
          </div>

          <div className="flex flex-col w-full">
            <label>Category</label>
            <select
              required
              value={service.category}
              onChange={(e) =>
                setService({
                  ...service,
                  category: e.target.value,
                })
              }
              className={`px-3 py-2 mt-1 border border-border rounded-md outline-none ${service.category === "" ? "text-muted-foreground/60" : "text-muted-foreground"} `}
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
              <option value="Transmission">Transmission</option>
            </select>
          </div>
        </div>

        {/* Price & Duration */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col w-full">
            <label>Service Price ({currency})</label>

            <input
              type="number"
              placeholder="100"
              min="0"
              required
              className={`px-3 py-2 mt-1 border border-border rounded-md outline-none ${service.price === 0 ? "text-muted-foreground" : "text-muted-foreground"}`}
              value={service.price}
              onChange={(e) =>
                setService({
                  ...service,
                  price: e.target.value,
                })
              }
            />
          </div>

          <div className="flex flex-col w-full">
            <label>Estimated Duration</label>
            <select
              required
              value={service.duration}
              onChange={(e) =>
                setService({
                  ...service,
                  duration: e.target.value,
                })
              }
              className={`px-3 py-2 mt-1 border border-border rounded-md outline-none ${service.duration === "" ? "text-muted-foreground/60" : "text-muted-foreground"}`}
            >
              <option value="">Select duration</option>
              <option value="30 minutes">30 minutes</option>
              <option value="45 minutes">45 minutes</option>
              <option value="1 hour">1 hour</option>
              <option value="2 hours">2 hours</option>
              <option value="3 hours">3 hours</option>
              <option value="Half day">Half day</option>
              <option value="Full day">Full day</option>
            </select>
          </div>
        </div>

        {/* Service Description */}
        <div className="flex flex-col w-full">
          <label>Description</label>

          <textarea
            rows={5}
            placeholder="e.g. Complete vehicle inspection, oil change, filter replacement and safety check."
            required
            className="px-3 py-2 mt-1 border border-border rounded-md outline-none"
            value={service.description}
            onChange={(e) =>
              setService({
                ...service,
                description: e.target.value,
              })
            }
          ></textarea>
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

        {/* Popular Service */}
        <div className="flex items-center gap-2 cursor-pointer">
          <input
            onChange={(e) =>
              setService({ ...service, isPopular: e.target.checked })
            }
            type="checkbox"
            id="isPopular"
            checked={service.isPopular}
            className="w-4 h-4 cursor-pointer"
          />
          <label htmlFor="isPopular" className="text-sm">
            Mark as Popular
          </label>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="flex items-center gap-2 px-4 py-2.5 mt-4 bg-primary text-white hover:bg-primary-hover rounded-md font-medium w-max cursor-pointer disabled:opacity-50"
        >
          <FaCheck className="text-green-500" />

          {isLoading ? "Adding..." : "Add Service"}
        </button>
      </form>
    </div>
  );
};

export default AddService;
