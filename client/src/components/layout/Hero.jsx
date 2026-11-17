import { useNavigate } from "react-router-dom";
import hero_bg from "../../assets/hero_bg.jpg";
import { assets } from "../../data/data";
import { motion } from "motion/react";
import { useAppContext } from "../../context/AppContext";
import { useEffect, useState } from "react";

const Hero = () => {
  const navigate = useNavigate();

  const { axios } = useAppContext();

  // Store the hero background image
  const [heroBackground, setHeroBackground] = useState(hero_bg);

  // Store the right-side hero image
  const [heroImage, setHeroImage] = useState(assets.hero_photo);

  // Fetch Hero settings from MySQL
  useEffect(() => {
    const fetchHeroSettings = async () => {
      try {
        // Get saved hero images from the backend
        const response = await axios.get("/api/settings/hero");

        if (response.data.success) {
          // Update background image if available
          if (response.data.heroBackground) {
            setHeroBackground(response.data.heroBackground);
          }

          // Update right-side image if available
          if (response.data.heroImage) {
            setHeroImage(response.data.heroImage);
          }
        }
      } catch (error) {
        console.error("Failed to fetch hero settings:", error);
      }
    };
    fetchHeroSettings();
  }, [axios]);

  const services = [
    "Oil Change",
    "Brake Service",
    "Battery Replacement",
    "Tyre Service",
    "Air Conditioning",
    "Engine Diagnostics",
    "Suspension Service",
    "Wheel Balancing",
    "General Servicing",
  ];

  const dots = [
    { left: "5%", top: "15%", duration: "18s", delay: "1s" },
    { left: "12%", top: "72%", duration: "24s", delay: "3s" },
    { left: "20%", top: "35%", duration: "20s", delay: "0s" },
    { left: "28%", top: "82%", duration: "27s", delay: "2s" },
    { left: "35%", top: "18%", duration: "22s", delay: "4s" },
    { left: "43%", top: "65%", duration: "19s", delay: "1.5s" },
    { left: "51%", top: "30%", duration: "26s", delay: "3.5s" },
    { left: "58%", top: "78%", duration: "21s", delay: "0.5s" },
    { left: "66%", top: "12%", duration: "25s", delay: "2.5s" },
    { left: "74%", top: "55%", duration: "17s", delay: "4.5s" },
    { left: "82%", top: "25%", duration: "23s", delay: "1s" },
    { left: "90%", top: "70%", duration: "28s", delay: "3s" },
    { left: "15%", top: "45%", duration: "20s", delay: "2s" },
    { left: "32%", top: "58%", duration: "24s", delay: "4s" },
    { left: "47%", top: "90%", duration: "18s", delay: "1s" },
    { left: "63%", top: "42%", duration: "26s", delay: "3s" },
    { left: "78%", top: "85%", duration: "22s", delay: "0s" },
    { left: "95%", top: "40%", duration: "19s", delay: "2.5s" },
  ];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden px-6 bg-background">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroBackground}
          alt="Hero background image"
          className="w-full h-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-linear-to-b from-background/20 via-background/80 to-background" />
      </div>

      {/* Green Dots */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {dots.map((dot, i) => (
          <div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full opacity-60"
            style={{
              backgroundColor: "#20B2A6",
              left: dot.left,
              top: dot.top,
              animation: `slow-drift ${dot.duration} ease-in-out infinite`,
              animationDelay: dot.delay,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 pt-32 pb-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* LEFT SIDE */}
          <div className="space-y-8">
            {/* Heading */}
            <motion.h1
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-primary leading-tight"
            >
              Driven by Quality.
              <br /> Built on Trust.
            </motion.h1>

            {/* Description */}

            <motion.p
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg text-foreground max-w-lg py-2"
            >
              Professional car servicing and repairs without the hassle. At
              Bob's Garage, we combine expert mechanics, quality workmanship,
              and honest pricing to keep your car performing at its best.
            </motion.p>

            {/* Book Service Button */}
            <motion.button
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              type="button"
              onClick={() => navigate("/services")}
              className="flex items-center justify-center gap-1 px-9 py-3 max-sm:mt-4 bg-primary hover:bg-primary-hover text-white rounded-full cursor-pointer transition-colors"
            >
              Book Service
            </motion.button>
          </div>

          {/* Right Column - Profile Image */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            {/* Hero Image */}
            <div className="relative max-w-md mx-auto">
              <div className="absolute inset-0 rounded-3xl bg-linear-to-br from-secondary/30 via-transparent to-secondary/10 blur-2xl animate-pulse"></div>
              <div className="relative glass rounded-3xl p-2 glow-border">
                <img
                  src={heroImage}
                  alt="Bob's Garage"
                  className="w-full aspect-4/5 object-cover rounded-2xl"
                />

                <div className="absolute -top-4 glass rounded-xl px-4 py-3 animate-float animation-delay-500">
                  <div className="text-2xl font-bold text-primary">10+</div>
                  <div className="text-xs text-foreground">Years Exp.</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Services Marquee */}
        <div className="mt-20">
          <h3 className="text-xl font-semibold text-primary mb-6 text-center">
            Our Services
          </h3>
          <div className="relative overflow-hidden">
            <div className="flex mb-4 animate-marquee hover:[animation-play-state:paused]">
              {[...services, ...services].map((service, index) => (
                <div
                  key={index}
                  className="flex shrink-0 items-center px-8 py-4"
                >
                  <span className="text-xl font-semibold text-foreground hover:text-primary transition-colors duration-300 cursor-default">
                    {service}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Hero;
