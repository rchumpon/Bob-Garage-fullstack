import { Link } from "react-router-dom";
import { motion } from "motion/react";
import banner_car_image from "../../assets/banner_car_image.png";

// Create an animated React Router Link
const MotionLink = motion.create(Link);

const Banner = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6 }}
      className="relative flex flex-col md:flex-row md:items-start items-center justify-between py-10 px-8 md:pl-14 pt-10 bg-linear-to-r from-secondary via-secondary/10 to-secondary max-w-6xl mx-3 md:mx-auto rounded-2xl overflow-hiddden border border-border"
    >
      <div className="text-foreground">
        <h2 className="text-3xl font-medium">
          Keep Your Car Running at Its Best
        </h2>
        <p className="mt-2">
          Professional servicing and repairs you can count on.
        </p>

        <p className="max-w-130 mb-4">
          Whether it's a routine service or a major repair, our skilled
          mechanics are here to keep your vehicle safe, reliable,and road-ready.
        </p>

        <MotionLink
          to="/services"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="inline-block px-6 py-2 bg-primary hover:bg-primary-hover transition-all text-primary-foreground rounded-lg text-sm mt-2 cursor-pointer"
        >
          Explore Services
        </MotionLink>
      </div>
      <motion.img
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        src={banner_car_image}
        alt="BMW car"
        className="w-full max-w-sm object-contain max-h-50 mt-6 md:mt-0"
      />
    </motion.div>
  );
};
export default Banner;
