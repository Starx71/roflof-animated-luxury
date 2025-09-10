import { useEffect, useRef, useState } from 'react';
import { Info } from 'lucide-react';
import processImage from '@/assets/process-analysis.jpg';

const ProcessSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedBars, setAnimatedBars] = useState<number[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);

  const chartData = [
    { label: 'Design', value: 85 },
    { label: 'Planning', value: 92 },
    { label: 'Execution', value: 78 },
    { label: 'Quality', value: 96 }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          
          // Animate chart bars
          chartData.forEach((_, index) => {
            setTimeout(() => {
              setAnimatedBars(prev => [...prev, index]);
            }, index * 300);
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
    <section ref={sectionRef} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left - Image with Data Visualization */}
          <div className={`relative transition-all duration-1000 ${isVisible ? 'animate-slide-in-left' : 'opacity-0 translate-x-[-50px]'}`}>
            <div className="relative overflow-hidden rounded-2xl shadow-hero">
              <img 
                src={processImage} 
                alt="Professional analyzing data and charts"
                className="w-full h-96 object-cover animate-breathe"
              />
              
              {/* Overlay Chart */}
              <div className="absolute inset-0 bg-gradient-to-tr from-primary-dark/80 to-transparent flex items-end p-6">
                <div className="bg-white/95 backdrop-blur-sm rounded-lg p-4 w-full max-w-xs">
                  <h4 className="text-sm font-semibold text-primary-dark mb-3">Performance Metrics</h4>
                  <div className="space-y-3">
                    {chartData.map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">{item.label}</span>
                        <div className="flex-1 mx-2 bg-cream rounded-full h-2">
                          <div 
                            className={`h-full bg-gradient-gold rounded-full transition-all duration-1000 ${
                              animatedBars.includes(index) ? 'opacity-100' : 'opacity-0 w-0'
                            }`}
                            style={{ 
                              width: animatedBars.includes(index) ? `${item.value}%` : '0%',
                              transitionDelay: `${index * 200}ms`
                            }}
                          ></div>
                        </div>
                        <span className="text-xs font-medium text-accent-gold">{item.value}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Content */}
          <div className={`space-y-8 transition-all duration-1000 ${isVisible ? 'animate-slide-in-right' : 'opacity-0 translate-x-[50px]'}`} style={{ animationDelay: '0.3s' }}>
            <h2 className="text-section text-primary-dark leading-tight">
              See how we can help you 
              <span className="block text-accent-gold">progress</span>
            </h2>

            <div className={`prose prose-lg max-w-none transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`} style={{ animationDelay: '0.6s' }}>
              <p className="text-muted-foreground leading-relaxed">
                We add a layer of fearless insights and action that allows change makers to accelerate 
                their progress in areas such as brand, design digital, comms and social research.
              </p>
            </div>

            {/* Progress Indicators */}
            <div className="grid grid-cols-2 gap-4">
              {['Strategy', 'Design', 'Research', 'Implementation'].map((skill, index) => (
                <div 
                  key={skill}
                  className={`p-4 bg-cream rounded-lg transition-all duration-500 hover-lift ${
                    isVisible ? 'animate-slide-in-up' : 'opacity-0'
                  }`}
                  style={{ animationDelay: `${1 + index * 0.1}s` }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-primary-dark">{skill}</span>
                    <span className="text-xs text-accent-gold font-semibold">
                      {chartData[index]?.value || 90}%
                    </span>
                  </div>
                  <div className="w-full bg-white rounded-full h-1">
                    <div 
                      className="h-1 bg-gradient-gold rounded-full transition-all duration-1000"
                      style={{ 
                        width: isVisible ? `${chartData[index]?.value || 90}%` : '0%',
                        transitionDelay: `${1.2 + index * 0.1}s`
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            <button className={`group flex items-center space-x-2 bg-accent-gold text-primary-dark px-6 py-3 rounded-lg hover-scale shadow-gold transition-all duration-300 ${
              isVisible ? 'animate-slide-in-up' : 'opacity-0'
            }`} style={{ animationDelay: '1.5s' }}>
              <Info className="w-5 h-5" />
              <span className="font-semibold">Read More</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;