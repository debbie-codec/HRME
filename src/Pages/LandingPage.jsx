import '../styles/landing.css';
import Navbar from '../Components/Navbar';
import Hero from '../Components/Hero';
import Trusted from '../Components/Trusted-Enhanced';
import Features from '../Components/Features-Enhanced';
import Empower from '../Components/Empower';
import Testimonials from '../Components/Testimonials';
import CTA from '../Components/CTA';
import Recognition from '../Components/Recognition-Enhanced';
import ContactBar from '../Components/ContactBar';
import Footer from '../Components/Footer';

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <Hero />
      <Trusted />
      <Features />
      <Empower />
      <Testimonials />
      <CTA />
      <Recognition />
      <ContactBar />
      <Footer />
    </>
  );
}