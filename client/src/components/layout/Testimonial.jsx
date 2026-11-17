import { motion } from "motion/react";
import { assets } from "../../data/data";
import Title from "../common/Title";

const Testimonial = () => {
  const testimonials = [
    {
      name: "Elle Woods",
      location: "Moorabbin, VIC",
      image: assets.testimonial_image_1,
      testimonial:
        "I've finally found a mechanic I can trust. Bob's Garage explained everything clearly, finished the service on time, and the pricing was fair.",
    },
    {
      name: "Gordon Smith",
      location: "Richmond, VIC",
      image: assets.testimonial_image_3,
      testimonial:
        "Excellent service from start to finish. The team quickly diagnosed the problem with my car and had me back on the road without any hassle.",
    },
    {
      name: "Ava Johnson",
      location: "South Yarra, VIC",
      image: assets.testimonial_image_2,
      testimonial:
        "The mechanics at Bob's Garage are professional, friendly, and genuinely care about their customers. I wouldn't take my car anywhere else.",
    },
  ];
  return (
    <div className="py-28 px-6 md:px-16 lg:px-24 xl:px-44 bg-linear-to-b from-background via-secondary to-background">
      <Title
        title="What Our Customers Say"
        subTitle="See why local drivers trust Bob's Garage for reliable service and honest automotive care."
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-18">
        {testimonials.map((testimonial, index) => (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
            key={index}
            className="bg-white p-6 rounded-xl shadow-lg hover:-translate-y-1 transition-all duration-500"
          >
            <div className="flex items-center gap-3">
              <img
                className="w-12 h-12 rounded-full"
                src={testimonial.image}
                alt={testimonial.name}
              />
              <div>
                <p className="text-xl">{testimonial.name}</p>
                <p className="text-gray-500">{testimonial.location}</p>
              </div>
            </div>
            <div className="flex items-center gap-1 mt-4">
              {Array(5)
                .fill(0)
                .map((_, index) => (
                  <img key={index} src={assets.star_icon} alt="star-icon" />
                ))}
            </div>
            <p className="text-gray-500 max-w-90 mt-4 font-light">
              "{testimonial.testimonial}"
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
export default Testimonial;
