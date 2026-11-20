import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { FaFacebook, FaInstagram, FaXTwitter } from "react-icons/fa6";
import { SiGmail } from "react-icons/si";

const Footer = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="px-6 pt-6 md:px-16 lg:px-24 xl:px-32 text-sm text-foreground bg-muted"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex flex-wrap justify-between items-start gap-8 pb-6 border-border border-b"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {/* Logo */}
          <h2 className="text-xl text-highlight font-bold tracking-tight h-8 md:h-9 ">
            Bob's<span className="text-primary"> Garage</span>
          </h2>

          {/* Tagline */}
          <h3 className="text-base font-bold text-foreground">
            Keep you on the road
          </h3>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="max-w-80 mt-3 text-muted-foreground"
          >
            Professional automotive care delivered with quality workmanship,
            honest advice, and service you can trust.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex items-center gap-3 mt-6"
          >
            {/* Facebook */}
            <motion.a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              whileHover={{ scale: 1.2, y: -3 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="inline-flex text-foreground hover:text-primary transition-colors"
            >
              <FaFacebook className="w-5 h-5" />
            </motion.a>

            {/* Instagram */}
            <motion.a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              whileHover={{ scale: 1.2, y: -3 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="inline-flex text-foreground hover:text-primary transition-colors"
            >
              <FaInstagram className="w-5 h-5" />
            </motion.a>

            {/* X (Twitter) */}
            <motion.a
              href="https://x.com"
              aria-label="X (Twitter)"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, y: -3 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="inline-flex text-foreground hover:text-primary transition-colors"
            >
              <FaXTwitter className="w-5 h-5" />
            </motion.a>

            <motion.a
              href="mailto:bob_garage@service.com"
              aria-label="Email"
              whileHover={{ scale: 1.2, y: -3 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="inline-flex text-foreground hover:text-primary transition-colors"
            >
              <SiGmail className="w-5 h-5" />
            </motion.a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap justify-between w-1/2 gap-8"
        >
          <div>
            <h2 className="text-base font-medium text-primary uppercase">
              Quick Links
            </h2>
            <ul className="mt-3 flex flex-col gap-1.5">
              {[
                { name: "Home", path: "/" },
                { name: "Services", path: "/services" },
                { name: "About Us", path: "/about-us" },
                { name: "Contact Us", path: "/contact-us" },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    onClick={() => window.scrollTo(0, 0)}
                    className="hover:text-primary transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h2 className="text-base font-medium text-primary uppercase">
              Services
            </h2>

            <ul className="flex flex-col gap-1.5 mt-3">
              {[
                "Oil Change",
                "Brake Service",
                "Battery Replacement",
                "Tyres Service",
                "Air Conditioning",
                "Engine Diagnostics",
                "Suspension",
                "Wheel Balancing",
                "Full Car Servicing",
                "Transmission",
              ].map((service) => (
                <li key={service}>
                  <Link
                    to={`/services?search=${encodeURIComponent(service)}`}
                    onClick={() => window.scrollTo(0, 0)}
                    className="hover:text-primary transition-colors duration-300"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h2 className="text-base font-medium text-primary uppercase">
              Contact
            </h2>
            <ul className="mt-3 flex flex-col gap-1.5 text-sm">
              <li>
                <Link
                  to="/contact-us"
                  onClick={() => window.scrollTo(0, 0)}
                  className="hover:text-primary transition-colors"
                >
                  123 Malvern Road
                </Link>
              </li>
              <li>
                <Link
                  to="/contact-us"
                  onClick={() => window.scrollTo(0, 0)}
                  className="hover:text-primary transition-colors"
                >
                  Kooyong VIC 3144
                </Link>
              </li>
              <li>
                <Link
                  to="/contact-us"
                  onClick={() => window.scrollTo(0, 0)}
                  className="hover:text-primary transition-colors"
                >
                  +1 234 567890
                </Link>
              </li>
              <li>
                <Link
                  to="/contact-us"
                  onClick={() => window.scrollTo(0, 0)}
                  className="hover:text-primary transition-colors"
                >
                  bob_garage@service.com
                </Link>
              </li>
            </ul>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="flex flex-col md:flex-row gap-2 items-center justify-between py-5"
      >
        <p>
          © {new Date().getFullYear()}{" "}
          <a href="https://prebuiltui.com">Bob's Garage</a>. All rights
          reserved.
        </p>
        <ul className="flex items-center gap-4">
          <li>
            <Link
              to="/privacy-policy"
              className="transition-colors hover:text-primary"
            >
              Privacy
            </Link>
          </li>

          <li aria-hidden="true">|</li>

          <li>
            <span className="text-muted-foreground">Terms</span>
          </li>

          <li aria-hidden="true">|</li>

          <li>
            <span className="text-muted-foreground">Cookies</span>
          </li>
        </ul>
      </motion.div>
    </motion.div>
  );
};
export default Footer;
