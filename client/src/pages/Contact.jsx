import { useState } from "react";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { motion } from "motion/react";

const Contact = () => {
  // Store contact form information
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    company: "",
    email: "",
    message: "",
    agreeToPolicies: false,
  });

  // Handle input changes
  const onChangeHandler = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle form submission
  const onSubmitHandler = (e) => {
    e.preventDefault();

    // Replace with a backend API request when available
    console.log("Contact form data:", formData);
  };

  return (
    <main className="min-h-screen bg-background px-5 py-12 sm:py-20 lg:px-8 overflow-x-hidden">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mx-auto max-w-2xl text-center"
      >
        <h1 className="text-3xl sm:text-5xl font-semibold text-primary">
          Contact Us
        </h1>

        <p className="mt-3 text-muted-foreground">
          Have a question about our services? We'd love to hear from you.
        </p>
      </motion.div>

      {/* Contact Content */}
      <div className="mx-auto mt-12 grid max-w-6xl gap-12 md:grid-cols-[1fr_1.5fr]">
        {/* Left Side - Contact Information */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="space-y-8 py-6"
        >
          {/* Address */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-start gap-4"
          >
            <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary/10">
              <FaMapMarkerAlt className="w-5 h-5 text-primary" />
            </div>

            <div>
              <h2 className="font-semibold text-primary">Address</h2>
              <p className="mt-1 text-muted-foreground">
                123 Malvern Road, <br />
                Kooyong, VIC 3144
              </p>
            </div>
          </motion.div>

          {/* Phone */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-start gap-4"
          >
            <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary/10">
              <FaPhoneAlt className="w-5 h-5 text-primary" />
            </div>

            <div>
              <h2 className="font-semibold text-primary">Phone</h2>
              <p className="mt-1 text-muted-foreground">+1234 567890</p>
            </div>
          </motion.div>

          {/* Email */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex items-start gap-4"
          >
            <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary/10">
              <FaEnvelope className="w-5 h-5 text-primary" />
            </div>

            <div>
              <h2 className="font-semibold text-primary">Email</h2>
              <p className="mt-1 text-muted-foreground">
                bob_garage@service.com
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Side - Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            duration: 0.7,
            delay: 0.2,
            ease: "easeOut",
          }}
          className="rounded-2xl border border-border bg-secondary/30 p-6 shadow-lg sm:p-8"
        >
          <h2 className="mb-6 text-2xl font-semibold text-primary">
            Send a Message
          </h2>

          <form onSubmit={onSubmitHandler} className="space-y-5">
            {/* First and Last Name */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="firstName"
                  className="text-sm font-medium text-foreground"
                >
                  First Name
                </label>

                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  required
                  value={formData.firstName}
                  onChange={onChangeHandler}
                  className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground outline-none focus:border-primary"
                />
              </div>

              <div>
                <label
                  htmlFor="lastName"
                  className="text-sm font-medium text-foreground"
                >
                  Last Name
                </label>

                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  required
                  value={formData.lastName}
                  onChange={onChangeHandler}
                  className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground outline-none focus:border-primary"
                />
              </div>
            </div>

            {/* Company */}
            <div>
              <label
                htmlFor="company"
                className="text-sm font-medium text-foreground"
              >
                Company (Optional)
              </label>

              <input
                id="company"
                name="company"
                type="text"
                value={formData.company}
                onChange={onChangeHandler}
                className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground outline-none focus:border-primary"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="text-sm font-medium text-foreground"
              >
                Email
              </label>

              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={onChangeHandler}
                className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground outline-none focus:border-primary"
              />
            </div>

            {/* Message */}
            <div>
              <label
                htmlFor="message"
                className="text-sm font-medium text-foreground"
              >
                Message
              </label>

              <textarea
                id="message"
                name="message"
                rows={5}
                required
                placeholder="Type your message..."
                value={formData.message}
                onChange={onChangeHandler}
                className="mt-2 w-full resize-y rounded-lg border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground outline-none focus:border-primary"
              />
            </div>

            {/* Privacy Policy */}
            <div className="flex items-start gap-3">
              <input
                id="agreeToPolicies"
                name="agreeToPolicies"
                type="checkbox"
                required
                checked={formData.agreeToPolicies}
                onChange={onChangeHandler}
                className="mt-1 size-4 accent-primary"
              />

              <label
                htmlFor="agreeToPolicies"
                className="text-sm text-muted-foreground"
              >
                I agree to the privacy policy and consent to being contacted
                about my enquiry.
              </label>
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
              type="submit"
              className="rounded-full bg-primary px-8 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-hover cursor-pointer"
            >
              Send Message
            </motion.button>
          </form>
        </motion.div>
      </div>
    </main>
  );
};

export default Contact;
