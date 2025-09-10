import { useEffect, useRef, useState } from 'react';
import { Instagram, Linkedin, Youtube, Twitter, MapPin, Phone, Mail } from 'lucide-react';

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [typedText, setTypedText] = useState('');
  const footerRef = useRef<HTMLDivElement>(null);

  const copyrightText = "© turridesign24";

  const footerData = {
    company: ['Home', 'Studio', 'Services', 'Blog'],
    terms: ['Privacy Policy', 'Terms', 'Cookies', 'Accessibility'],
    social: [
      { name: 'Instagram', icon: Instagram, url: '#' },
      { name: 'LinkedIn', icon: Linkedin, url: '#' },
      { name: 'YouTube', icon: Youtube, url: '#' },
      { name: 'Twitter', icon: Twitter, url: '#' }
    ],
    contact: {
      address: 'Harlow Parker Inh. STE 30 Chicago, IL 60607',
      phone: '(312) 456-8963',
      email: 'info@example.com'
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          
          // Typewriter effect for copyright
          let index = 0;
          const typeTimer = setInterval(() => {
            if (index <= copyrightText.length) {
              setTypedText(copyrightText.slice(0, index));
              index++;
            } else {
              clearInterval(typeTimer);
            }
          }, 100);
        }
      },
      { threshold: 0.2 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId.toLowerCase().replace(' ', '-'));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer ref={footerRef} className="bg-primary-dark text-white py-16 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(45deg, currentColor 25%, transparent 25%), 
                           linear-gradient(-45deg, currentColor 25%, transparent 25%), 
                           linear-gradient(45deg, transparent 75%, currentColor 75%), 
                           linear-gradient(-45deg, transparent 75%, currentColor 75%)`,
          backgroundSize: '20px 20px',
          backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Company Links */}
          <div className={`space-y-6 transition-all duration-1000 ${isVisible ? 'animate-slide-in-up' : 'opacity-0 translate-y-8'}`}>
            <h3 className="text-xl font-semibold text-accent-gold">Company</h3>
            <ul className="space-y-4">
              {footerData.company.map((item, index) => (
                <li key={item}>
                  <button
                    onClick={() => scrollToSection(item)}
                    className={`text-white/80 hover:text-accent-gold transition-all duration-300 hover:translate-x-2 block ${
                      isVisible ? 'animate-slide-in-left' : 'opacity-0'
                    }`}
                    style={{ animationDelay: `${0.2 + index * 0.1}s` }}
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Terms & Policies */}
          <div className={`space-y-6 transition-all duration-1000 ${isVisible ? 'animate-slide-in-up' : 'opacity-0 translate-y-8'}`} style={{ animationDelay: '0.1s' }}>
            <h3 className="text-xl font-semibold text-accent-gold">Terms & Policies</h3>
            <ul className="space-y-4">
              {footerData.terms.map((item, index) => (
                <li key={item}>
                  <a
                    href="#"
                    className={`text-white/80 hover:text-accent-gold transition-all duration-300 hover:translate-x-2 block ${
                      isVisible ? 'animate-slide-in-left' : 'opacity-0'
                    }`}
                    style={{ animationDelay: `${0.4 + index * 0.1}s` }}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media */}
          <div className={`space-y-6 transition-all duration-1000 ${isVisible ? 'animate-slide-in-up' : 'opacity-0 translate-y-8'}`} style={{ animationDelay: '0.2s' }}>
            <h3 className="text-xl font-semibold text-accent-gold">Follow Us</h3>
            <div className="space-y-4">
              {footerData.social.map((social, index) => (
                <a
                  key={social.name}
                  href={social.url}
                  className={`flex items-center space-x-3 text-white/80 hover:text-accent-gold transition-all duration-300 group ${
                    isVisible ? 'animate-slide-in-left' : 'opacity-0'
                  }`}
                  style={{ animationDelay: `${0.6 + index * 0.1}s` }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <social.icon className="w-5 h-5 group-hover:rotate-[360deg] group-hover:scale-125 transition-all duration-500" />
                  <span className="group-hover:translate-x-1 transition-transform duration-300">{social.name}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className={`space-y-6 transition-all duration-1000 ${isVisible ? 'animate-slide-in-up' : 'opacity-0 translate-y-8'}`} style={{ animationDelay: '0.3s' }}>
            <h3 className="text-xl font-semibold text-accent-gold">Contact</h3>
            <div className="space-y-4">
              <div className={`flex items-start space-x-3 text-white/80 hover:text-white group transition-all duration-300 ${
                isVisible ? 'animate-slide-in-left' : 'opacity-0'
              }`} style={{ animationDelay: '0.8s' }}>
                <MapPin className="w-5 h-5 mt-1 text-accent-gold group-hover:scale-110 transition-transform duration-300" />
                <span className="group-hover:text-accent-gold transition-colors duration-300">
                  {footerData.contact.address}
                </span>
              </div>
              
              <a
                href={`tel:${footerData.contact.phone}`}
                className={`flex items-center space-x-3 text-white/80 hover:text-accent-gold group transition-all duration-300 ${
                  isVisible ? 'animate-slide-in-left' : 'opacity-0'
                }`}
                style={{ animationDelay: '0.9s' }}
              >
                <Phone className="w-5 h-5 text-accent-gold group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300" />
                <span className="group-hover:translate-x-1 transition-transform duration-300">
                  {footerData.contact.phone}
                </span>
              </a>
              
              <a
                href={`mailto:${footerData.contact.email}`}
                className={`flex items-center space-x-3 text-white/80 hover:text-accent-gold group transition-all duration-300 ${
                  isVisible ? 'animate-slide-in-left' : 'opacity-0'
                }`}
                style={{ animationDelay: '1s' }}
              >
                <Mail className="w-5 h-5 text-accent-gold group-hover:scale-110 transition-transform duration-300" />
                <span className="group-hover:translate-x-1 transition-transform duration-300">
                  {footerData.contact.email}
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* Separator Line */}
        <div className={`my-12 transition-all duration-1000 ${isVisible ? 'animate-slide-in-left' : 'opacity-0 scale-x-0'}`} style={{ animationDelay: '1.2s' }}>
          <div className="h-px bg-gradient-to-r from-transparent via-accent-gold to-transparent"></div>
        </div>

        {/* Copyright */}
        <div className="text-center">
          <p className="text-white/60 text-sm">
            <span className="border-r-2 border-accent-gold animate-pulse">
              {typedText}
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;