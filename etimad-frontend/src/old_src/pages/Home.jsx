import Navbar from "../components/Navbar";
import CategoriesBar from "../components/CategoriesBar";
import Hero from "../components/Hero";
import CardsSection from "../components/CardsSection";
import Footer from "../components/Footer";

function Home() {
  return (
    <div>
      {/* <Navbar /> */}
      <CategoriesBar />
      <Hero />
      <CardsSection />
      <Footer />
    </div>
  );
}

export default Home;