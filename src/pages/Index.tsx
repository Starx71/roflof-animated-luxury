import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ServicesPreview from '@/components/ServicesPreview';
import ProcessSection from '@/components/ProcessSection';
import ServicesMenu from '@/components/ServicesMenu';
import Newsletter from '@/components/Newsletter';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import LoadingScreen from '@/components/LoadingScreen';
import { useEffect, useState } from 'react';

const Index = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.pageYOffset / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  if (isLoading) {
    return <LoadingScreen onLoadingComplete={handleLoadingComplete} />;
  }

  return (
    <main className="min-h-screen bg-background relative">
      {/* Scroll Progress Indicator */}
      <div className="fixed top-0 left-0 w-full h-1 bg-cream z-50">
        <div 
          className="h-full bg-gradient-gold transition-all duration-100 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <Header />
      <HeroSection />
      <AboutSection />
      <ServicesPreview />
      <ProcessSection />
      <ServicesMenu />
      <Newsletter />
      <Footer />
      <ScrollToTop />
    </main>
  );
};

export default Index;
