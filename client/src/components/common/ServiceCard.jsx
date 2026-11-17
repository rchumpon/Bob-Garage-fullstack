import { useNavigate } from "react-router-dom";
import { FaClock } from "react-icons/fa";
import FavouriteButton from "./FavouriteButton";

const ServiceCard = ({ service, isFavourite, onToggle }) => {
  const currency = import.meta.env.VITE_CURRENCY;
  const navigate = useNavigate();

  return (
    <div
      onClick={() => {
        navigate(`/service-details/${service.serviceId}`);
        scrollTo(0, 0);
      }}
      className="group h-full flex flex-col rounded-xl overflow-hidden bg-card border border-border shadow-lg hover:-translate-y-1 transition-all duration-500 cursor-pointer"
    >
      {/* Image */}
      <div className="relative h-48 shrink-0 overflow-hidden">
        <img
          src={service.image}
          alt={service.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Favourite Button */}
        <div className="absolute top-3 right-3 z-10">
          <FavouriteButton
            serviceId={service.serviceId}
            isFavourite={isFavourite}
            onToggle={onToggle}
          />
        </div>

        {/* Popular badge */}
        {service.isPopular && (
          <p className="absolute top-4 left-4 bg-primary/90 text-primary-foreground text-xs px-2.5 py-1 rounded-full">
            Popular Service
          </p>
        )}

        {/* Price */}
        <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-sm text-white px-3 py-2 rounded-lg">
          <span className="text-sm text-white/80">From </span>
          <span className="font-semibold">
            {currency} {service.price}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5">
        <div className="mb-2">
          <div className="text-lg font-semibold leading-tight text-foreground">
            {/* Service Name */}
            <h3>{service.name}</h3>
          </div>

          {/* Description */}
          <p className="text-sm text-muted-foreground line-clamp-2 mt-2">
            {service.description}
          </p>

          {/* Service information */}
          <div className="mt-4 grid grid-cols-1">
            <div className="flex items-center text-sm text-muted-foreground">
              <FaClock className="mr-2" />
              <span>{service.duration}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ServiceCard;
