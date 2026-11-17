import { teamMembers } from "../../data/data";
import Title from "../common/Title";
import { motion } from "motion/react";

const TeamMemberCard = () => {
  return (
    <section className="mt-20">
      {/* Section Heading */}
      <Title
        title="Meet Our Team"
        subTitle="The dedicated people who keep Bob's Garage running."
      />

      {/* Team Members */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
        {teamMembers.map((member, index) => (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: index * 0.15, ease: "easeOut" }}
            whileHover={{ y: -6 }}
            key={member.id}
            className="group rounded-xl overflow-hidden border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            {/* Team Member Image */}
            <div className=" w-full aspect-3/4 overflow-hidden">
              <img
                src={member.image}
                alt={`Portrait of ${member.name}`}
                className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            {/* Team member information */}
            <div className="flex-1 p-5 text-center">
              <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                {member.name}
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                {member.role}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
export default TeamMemberCard;
