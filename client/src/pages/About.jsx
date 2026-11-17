import Our_Story from "../assets/Our_Story.jpg";
import Title from "../components/common/Title";
import TeamMemberCard from "../components/common/TeamMemberCard";
import { garageValues } from "../data/data";
import { FaShieldAlt, FaHandshake, FaWrench } from "react-icons/fa";
import Banner from "../components/layout/Banner";
import { motion } from "motion/react";

// Map each value to its corresponding icon
const valueIcons = {
  quality: FaShieldAlt,
  honesty: FaHandshake,
  expertise: FaWrench,
};

const About = () => {
  return (
    <main className="bg-background text-foreground px-5 sm:px-8 lg:px-16 py-12">
      <div className="max-w-7xl mx-auto">
        {/* Our story */}
        <section>
          <Title
            title="Our Story"
            subTitle="Discover the passion and people behind Bob's Garage."
          />

          <div className="flex flex-col md:flex-row items-center gap-10 lg:gap-16 mt-10">
            {/* Story Image */}
            <motion.img
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              src={Our_Story}
              alt="Mechanic working on a vehicle inside Bob's Garage"
              className="w-full md:w-1/2 rounded-xl object-cover"
            />

            {/* Story Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
              className="flex flex-col gap-6 md:w-1/2"
            >
              <h2 className="text-2xl md:text-3xl font-semibold text-primary">
                More than Just a Garage
              </h2>

              <p className="text-muted-foreground leading-7">
                At <span className="font-semibold text-highlight">Bob's </span>
                <span className="text-primary font-semibold">Garage</span>, we
                are passionate about keeping vehicles safe, reliable, and
                performing at their best. From routine maintenance to complex
                repairs, we are committed to providing professional automotive
                care.
              </p>

              <p className="text-muted-foreground leading-7">
                We believe every customer deserves honest advice, quality
                workmanship, and friendly service. Our team works hard to make
                vehicle maintenance simple, transparent, and stress-free.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Meet our team */}
        <TeamMemberCard />

        {/* Our values */}
        <section className="mt-20 mb-12">
          <Title
            title="Our Values"
            subTitle="The principles that guide everything we do."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
            {garageValues.map((value, index) => {
              const Icon = valueIcons[value.icon];

              return (
                <motion.div
                  key={value.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.15,
                    ease: "easeOut",
                  }}
                  whileHover={{ y: -6 }}
                  className="flex flex-col gap-5 rounded-xl border border-border bg-secondary/30 p-8 transtion-all duration-300 hover:shadow-lg"
                >
                  {/* Value icon */}
                  <Icon className="text-3xl text-primary" />

                  {/* Value title */}
                  <h3 className="text-lg font-semibold">{value.title}</h3>

                  {/* Value description */}
                  <p className="text-muted-foreground leading-7">
                    {value.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </section>

        <Banner />
      </div>
    </main>
  );
};
export default About;
