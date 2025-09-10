import { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import workspaceImage from '@/assets/services-workspace.jpg';

const ServicesPreview = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  const titleWords = [
    "Tomorrow", "should", "be", "better", "than", "today"
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          
          // Animate title words one by one
          titleWords.forEach((_, index) => {
            setTimeout(() => {
              setWordIndex(index + 1);
            }, index * 200);
          });
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-cream relative overflow-hidden">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="animate-float absolute top-20 right-10 w-12 h-12 bg-accent-gold/10 rounded-full" style={{ animationDelay: '0s' }}></div>
        <div className="animate-float absolute bottom-32 left-20 w-8 h-8 bg-accent-gold/15 rounded-full" style={{ animationDelay: '2s' }}></div>
        <div className="animate-float absolute top-1/2 right-1/4 w-6 h-6 bg-accent-gold/20 rounded-full" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left - Content */}
          <div className={`space-y-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
            <h2 className="text-section text-primary-dark leading-tight">
              {titleWords.map((word, index) => (
                <span 
                  key={index}
                  className={`inline-block mr-2 transition-all duration-500 ${
                    index < wordIndex 
                      ? 'opacity-100 translate-y-0' 
                      : 'opacity-0 translate-y-4'
                  } ${index === titleWords.length - 1 ? 'text-accent-gold' : ''}`}
                  style={{ 
                    transitionDelay: `${index * 100}ms`,
                  }}
                >
                  {word}
                </span>
              ))}
            </h2>

            <div className={`prose prose-lg max-w-none transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`} style={{ animationDelay: '1.5s' }}>
              <p className="text-muted-foreground leading-relaxed">
                We are a team of strategists, designers, communicators, researchers. 
                Together, we believe that progress only happens when you refuse to play things safe.
              </p>
            </div>

            <button className={`group flex items-center space-x-2 bg-transparent border-2 border-primary-dark text-primary-dark px-6 py-3 rounded-lg hover:bg-primary-dark hover:text-white transition-all duration-300 hover-scale ${
              isVisible ? 'animate-slide-in-up' : 'opacity-0'
            }`} style={{ animationDelay: '2s' }}>
              <span className="font-semibold">Read More</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>

          {/* Right - Image */}
          <div className={`relative transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`} style={{ animationDelay: '0.5s' }}>
            <div className="relative overflow-hidden rounded-2xl shadow-hero group">
              <img 
                src={workspaceImage} 
                alt="Modern luxury workspace with interior design"
                className="w-full h-96 object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-bl from-accent-gold/20 to-transparent"></div>
              
              {/* Overlay Effect */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-500"></div>
            </div>

            {/* Decorative Element */}
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-gold rounded-full shadow-gold animate-pulse-gold opacity-80"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesPreview;