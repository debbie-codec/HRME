import '../styles/landing.css';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Trusted from '../components/Trusted-Enhanced';
import Features from '../components/Features-Enhanced';
import Empower from '../components/Empower';
import Testimonials from '../components/Testimonials';
import CTA from '../components/CTA';
import Recognition from '../components/Recognition-Enhanced';
import ContactBar from '../components/ContactBar';
import Footer from '../components/Footer';

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