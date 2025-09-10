import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Star, User } from 'lucide-react';
import aboutImage from '@/assets/about-meeting.jpg';

const AboutSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedNumber, setAnimatedNumber] = useState(0);
  const [filledStars, setFilledStars] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          
          // Animate number counter
          const duration = 2000;
          const targetNumber = 64739;
          const startTime = Date.now();
          
          const animateNumber = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const current = Math.floor(targetNumber * progress);
            setAnimatedNumber(current);
            
            if (progress < 1) {
              requestAnimationFrame(animateNumber);
            }
          };
          animateNumber();

          // Animate stars
          let starCount = 0;
          const starInterval = setInterval(() => {
            if (starCount <= 4) {
              setFilledStars(starCount + 1);
              starCount++;
            } else {
              clearInterval(starInterval);
            }
          }, 200);
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
    <section id="studio" ref={sectionRef} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left - Image */}
          <div className={`relative transition-all duration-1000 ${isVisible ? 'animate-slide-in-left' : 'opacity-0 translate-x-[-50px]'}`}>
            <div className="relative overflow-hidden rounded-2xl shadow-hero group">
              <img 
                src={aboutImage} 
                alt="Interior design consultation meeting"
                className="w-full h-96 object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary-dark/20 to-transparent"></div>
            </div>
          </div>

          {/* Right - Content */}
          <div className={`space-y-8 transition-all duration-1000 ${isVisible ? 'animate-slide-in-right' : 'opacity-0 translate-x-[50px]'}`} style={{ animationDelay: '0.2s' }}>
            <h2 className="text-section text-primary-dark leading-tight">
              We are a team of strategists, designers, communicators, researchers. 
              <span className="block mt-2 text-accent-gold">
                Together, We believe that progress only happens when you refuse to play things safe.
              </span>
            </h2>

            <div className="space-y-6">
              {/* Stats Section */}
              <div className="flex items-center space-x-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary-dark">
                    {animatedNumber.toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground">Happy Clients</div>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="flex space-x-1 mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star 
                        key={star} 
                        className={`w-5 h-5 transition-all duration-300 ${
                          star <= filledStars ? 'text-accent-gold fill-accent-gold' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <div className="text-sm font-medium">4.8/5 Rating</div>
                </div>
              </div>

              {/* User Profiles */}
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((profile, index) => (
                  <div 
                    key={profile}
                    className={`w-10 h-10 bg-gradient-gold rounded-full border-2 border-white flex items-center justify-center shadow-md transition-all duration-500 hover:scale-110 ${
                      isVisible ? 'animate-bounce-in' : 'opacity-0'
                    }`}
                    style={{ animationDelay: `${0.8 + index * 0.1}s` }}
                  >
                    <User className="w-5 h-5 text-primary-dark" />
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <button className={`group flex items-center space-x-2 bg-primary-dark text-white px-6 py-3 rounded-lg hover-scale hover-glow transition-all duration-300 ${
                isVisible ? 'animate-slide-in-up' : 'opacity-0'
              }`} style={{ animationDelay: '1s' }}>
                <span className="font-semibold">VIEW PROJECT</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;