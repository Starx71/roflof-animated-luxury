import { useEffect, useRef, useState } from 'react';
import { ArrowRight, User, Briefcase, Lightbulb } from 'lucide-react';

const ServicesMenu = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  const services = [
    {
      title: "Collaborative & partnership",
      subtitle: "Office of multiple interest content",
      icon: Briefcase,
      color: "from-blue-500/20 to-purple-500/20"
    },
    {
      title: "We talk about our weight", 
      subtitle: "The hanger US Air Force digital experimental",
      icon: Lightbulb,
      color: "from-green-500/20 to-teal-500/20"
    },
    {
      title: "Piloting digital confidence",
      subtitle: "Delta faucet content, social, digital",
      icon: User,
      color: "from-orange-500/20 to-red-500/20",
      hasProfile: true
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="services" ref={sectionRef} className="py-20 bg-cream relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
          backgroundSize: '20px 20px'
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Title */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'animate-slide-in-up' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-section text-primary-dark mb-4">
            What we can offer you!
            <span className="inline-block ml-2 text-accent-gold animate-star-rotate">✦</span>
          </h2>
        </div>

        {/* Services Cards */}
        <div className="space-y-6">
          {services.map((service, index) => (
            <div
              key={index}
              className={`group relative bg-white rounded-2xl p-8 shadow-soft hover:shadow-hero transition-all duration-500 cursor-pointer tilt-3d ${
                isVisible ? 'animate-slide-in-up' : 'opacity-0 translate-y-8'
              }`}
              style={{ animationDelay: `${index * 0.2}s` }}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Background Gradient on Hover */}
              <div className={`absolute inset-0 bg-gradient-to-r ${service.color} rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500`}></div>
              
              <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  {/* Icon */}
                  <div className={`w-16 h-16 bg-gradient-gold rounded-xl flex items-center justify-center transform transition-all duration-300 ${
                    hoveredCard === index ? 'scale-110 rotate-12' : ''
                  }`}>
                    <service.icon className="w-8 h-8 text-primary-dark" />
                  </div>

                  {/* Content */}
                  <div className="space-y-2">
                    <h3 className={`text-xl font-semibold text-primary-dark transition-all duration-300 ${
                      hoveredCard === index ? 'translate-x-2' : ''
                    }`}>
                      {service.title}
                    </h3>
                    <p className={`text-muted-foreground transition-all duration-300 ${
                      hoveredCard === index ? 'translate-x-2' : ''
                    }`}>
                      {service.subtitle}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  {/* Profile Image (for third service) */}
                  {service.hasProfile && (
                    <div className={`w-12 h-12 bg-gradient-gold rounded-full flex items-center justify-center shadow-md transition-all duration-300 ${
                      hoveredCard === index ? 'scale-110' : ''
                    }`}>
                      <User className="w-6 h-6 text-primary-dark" />
                    </div>
                  )}

                  {/* Arrow */}
                  <div className={`w-12 h-12 bg-primary-dark rounded-full flex items-center justify-center group-hover:bg-accent-gold transition-all duration-300 ${
                    hoveredCard === index ? 'scale-110' : ''
                  }`}>
                    <ArrowRight className={`w-6 h-6 text-white group-hover:text-primary-dark transition-all duration-300 ${
                      hoveredCard === index ? 'translate-x-1' : ''
                    }`} />
                  </div>
                </div>
              </div>

              {/* Glow Effect */}
              {hoveredCard === index && (
                <div className="absolute -inset-2 bg-gradient-gold rounded-2xl opacity-20 blur-xl transition-all duration-500"></div>
              )}
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className={`text-center mt-16 transition-all duration-1000 ${isVisible ? 'animate-slide-in-up' : 'opacity-0 translate-y-8'}`} style={{ animationDelay: '0.8s' }}>
          <button className="btn-hero group">
            <span>Explore All Services</span>
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ServicesMenu;