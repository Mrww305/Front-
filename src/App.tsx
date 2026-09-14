import { useState } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import WorkSection from './components/WorkSection';
import ShowcaseSection from './components/ShowcaseSection';
import ServicesScroll from './components/ServicesScroll';
import GallerySection from './components/GallerySection';
import Testimonials from './components/Testimonials';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import LoadingScreen from './components/LoadingScreen';

export default function App() {
  const [hasLoaded, setHasLoaded] = useState(false);

  return (
    <div className="relative min-h-screen bg-[#050508] text-[#f0f0f5] selection:bg-violet-600 selection:text-white overflow-x-hidden">
      {/* Skip to Main Link for Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[10001] focus:px-6 focus:py-3 focus:bg-violet-600 focus:text-white focus:rounded-xl focus:font-semibold focus:shadow-2xl focus:outline-none"
      >
        Skip to main content
      </a>

      {/* Subtle Noise Texture Overlay */}
      <div
        className="fixed inset-0 z-[9990] pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
        aria-hidden="true"
      />

      {/* Interactive Custom Cursor */}
      <CustomCursor />

      {/* Initial Studio Loading Screen */}
      <LoadingScreen onComplete={() => setHasLoaded(true)} />

      {/* Top Fixed Navigation */}
      <Navbar />

      {/* Main Experience Layout */}
      <main id="main-content" role="main" className={`transition-opacity duration-700 ${hasLoaded ? 'opacity-100' : 'opacity-90'}`}>
        <HeroSection />
        <AboutSection />
        <WorkSection />
        <ShowcaseSection />
        <ServicesScroll />
        <GallerySection />
        <Testimonials />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
