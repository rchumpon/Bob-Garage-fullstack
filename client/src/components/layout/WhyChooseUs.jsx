import { motion } from "motion/react";
import { FaWrench, FaShieldAlt, FaCertificate } from "react-icons/fa";
import { assets } from "../../data/data";

const WhyChooseUs = () => {
  return (
    <div className="md:px-16 lg:px-24 xl:px-44 bg-linear-to-b from-background via-secondary/85 to-background relative z-10">
      <div className=" relative max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-center gap-12 px-4 md:px-0 py-10">
        {/* Left Column - Why Choose Us Image*/}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative w-full md:w-1/2"
        >
          <div className="relative max-w-md mx-auto">
            {/* Background Glow */}
            <div className="absolute inset-0 rounded-3xl bg-linear-to-br from-secondary/30 via-transparent to-secondary/10 blur-2xl animate-pulse" />
            <div className="relative glass rounded-3xl p-2 glow-border">
              <img
                src={assets.why_choose_us}
                alt="Mechanic working on a vehicle at Bob's Garage"
                className="w-full aspect-4/5 object-cover rounded-2xl"
              />
            </div>
          </div>
        </motion.div>

        {/* Right Column - Content*/}
        <div className="w-full md:w-1/2 p-6">
          {/* Heading */}
          <motion.h2
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-3xl text-primary font-semibold tracking-wider"
          >
            Why <span className="text-highlight">Bob's</span> Garage?
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-base text-muted-foreground mt-3 leading-6"
          >
            We take pride in keeping your vehicle safe, reliable and ready for
            the road. Our experienced team provides professional servicing and
            repairs with honest advice and quality workmanship.
          </motion.p>

          {/* Features */}
          <div className="flex flex-col gap-8 mt-8">
            {/* Feature 1 */}
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="flex items-center gap-4"
            >
              <div className="size-9 p-2 bg-primary/10 border border-primary/20 rounded-lg">
                <FaWrench className="size-5 text-primary" />
              </div>
              <div>
                <h3 className="text-base font-medium text-secondary-foreground">
                  Experienced Mechanics
                </h3>

                <p className="text-sm text-muted-foreground">
                  Skilled professionals who know how to keep your vehicle
                  running at its best.
                </p>
              </div>
            </motion.div>

            {/* Feature 2 */}
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: 0.7 }}
              className="flex items-center gap-4"
            >
              <div className="size-9 p-2 bg-primary/10 border border-primary/20 rounded-lg">
                <FaShieldAlt className="size-5 text-primary" />
              </div>

              <div>
                <h3 className="text-base font-medium text-secondary-foreground">
                  Quality Workmanship
                </h3>
                <p className="text-sm text-muted-foreground">
                  We take care of every vehicle with attention to detail and
                  quality parts.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: 0.9 }}
              className="flex items-center gap-4"
            >
              <div className="size-9 p-2 bg-primary/10 border border-primary/20 rounded-lg">
                <FaCertificate className="size-5 text-primary" />
              </div>

              <div>
                <h3 className="text-base font-medium text-secondary-foreground">
                  Honest & Transparent Pricing
                </h3>
                <p className="text-sm text-muted-foreground">
                  Clear pricing and straightforward advice with no unnecessary
                  surprises.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
