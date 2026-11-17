import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { assets } from "../../data/data";
import ServiceCard from "../common/ServiceCard";
import Title from "../common/Title";
import { useAppContext } from "../../context/AppContext";
const FeaturedSection = () => {
  const navigate = useNavigate();

  const { services } = useAppContext();
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="flex flex-col items-center py-24 px-6 md:px-16 lg:px-24 xl:px-32 bg-linear-to-b from-background via-secondary/70 to-background"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <Title
          title="Featured Services"
          subTitle="Reliable automotive care from experienced mechanics you can trust."
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-16"
      >
        {services.slice(0, 6).map((service) => (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            key={service.serviceId}
          >
            <ServiceCard service={service} />
          </motion.div>
        ))}
      </motion.div>

      <motion.button
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.4 }}
        onClick={() => {
          navigate("/services");
          scrollTo(0, 0);
        }}
        className="flex items-center justify-center gap-2 px-6 py-2 border bg-primary border-border hover:bg-primary-hover text-primary-foreground rounded-md mt-18 cursor-pointer"
      >
        We've got the services you need.
        <img src={assets.arrow_icon} alt="arrow" />
      </motion.button>
    </motion.div>
  );
};
export default FeaturedSection;
