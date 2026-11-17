import Hero from "../components/layout/Hero";
import FeaturedSection from "../components/layout/FeaturedSection";
import Banner from "../components/layout/Banner";
import Testimonial from "../components/layout/Testimonial";
import WhyChooseUs from "../components/layout/WhyChooseUs";

const Home = () => {
  return (
    <main className="min-h-screen bg-background">
      <Hero />
      <WhyChooseUs />
      <FeaturedSection />
      <Banner />
      <Testimonial />
    </main>
  );
};
export default Home;
