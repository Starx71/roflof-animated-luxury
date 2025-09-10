import { useEffect, useState } from 'react';
import { Star, ArrowRight } from 'lucide-react';

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  
  const words = [
    "Explore design —",
    "inspire your next",
    "interior model"
  ];

  useEffect(() => {
    setIsVisible(true);
    
    // Typewriter effect for words
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % words.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const scrollToServices = () => {
    const element = document.getElementById('services');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen bg-gradient-hero flex items-center justify-center overflow-hidden pt-20">
      {/* Floating Geometric Shapes */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="animate-float absolute top-20 left-10 w-16 h-16 bg-accent-gold/20 rounded-full"></div>
        <div className="animate-float absolute top-40 right-20 w-8 h-24 bg-accent-gold/10 rounded-full" style={{ animationDelay: '1s' }}></div>
        <div className="animate-float absolute bottom-40 left-1/4 w-12 h-12 bg-accent-gold/15 rounded-full" style={{ animationDelay: '2s' }}></div>
        <div className="animate-float absolute top-1/3 right-1/3 w-6 h-6 bg-accent-gold/25 rounded-full" style={{ animationDelay: '0.5s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className={`space-y-8 transition-all duration-1000 ${isVisible ? 'animate-slide-in-left' : 'opacity-0'}`}>
            <div className="space-y-4">
              <h1 className="text-hero text-primary-dark leading-tight">
                <span className="block overflow-hidden">
                  <span className={`inline-block transition-all duration-1000 ${currentWordIndex >= 0 ? 'animate-slide-in-up' : ''}`}>
                    Explore design —
                  </span>
                </span>
                <span className="block overflow-hidden">
                  <span className={`inline-block transition-all duration-1000 ${currentWordIndex >= 1 ? 'animate-slide-in-up' : ''}`} style={{ animationDelay: '0.5s' }}>
                    inspire your next
                  </span>
                </span>
                <span className="block overflow-hidden">
                  <span className={`inline-block bg-gradient-gold bg-clip-text text-transparent transition-all duration-1000 ${currentWordIndex >= 2 ? 'animate-slide-in-up' : ''}`} style={{ animationDelay: '1s' }}>
                    interior model
                  </span>
                </span>
              </h1>
            </div>

            <div className="flex items-center space-x-6">
              <button 
                onClick={scrollToServices}
                className="btn-hero animate-pulse-gold hover-scale flex items-center space-x-2 group"
              >
                <span>View Our Projects</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
              
              <div className="animate-star-rotate text-accent-gold">
                <Star className="w-8 h-8 fill-current" />
              </div>
            </div>
          </div>

          {/* Right Content - Decorative Elements */}
          <div className={`relative transition-all duration-1000 ${isVisible ? 'animate-slide-in-right' : 'opacity-0'}`} style={{ animationDelay: '0.5s' }}>
            <div className="relative h-96 flex items-center justify-center">
              {/* Central Circle */}
              <div className="w-64 h-64 bg-white/80 rounded-full shadow-hero flex items-center justify-center animate-breathe">
                <div className="w-32 h-32 bg-gradient-gold rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary-dark">R</span>
                </div>
              </div>
              
              {/* Orbiting Elements */}
              <div className="absolute animate-star-rotate">
                <div className="w-4 h-4 bg-accent-gold rounded-full absolute -top-32 left-1/2 transform -translate-x-1/2"></div>
              </div>
              <div className="absolute animate-star-rotate" style={{ animationDelay: '1s' }}>
                <div className="w-6 h-6 bg-accent-gold/60 rounded-full absolute top-32 -right-32"></div>
              </div>
              <div className="absolute animate-star-rotate" style={{ animationDelay: '2s' }}>
                <div className="w-3 h-3 bg-accent-gold rounded-full absolute -bottom-32 -left-24"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-accent-gold rounded-full flex justify-center">
          <div className="w-1 h-3 bg-accent-gold rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;