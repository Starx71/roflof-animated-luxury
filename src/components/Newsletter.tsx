import { useEffect, useRef, useState } from 'react';
import { Send, CheckCircle } from 'lucide-react';

const Newsletter = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [inputFocused, setInputFocused] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSuccess(true);
    
    // Show confetti effect
    setTimeout(() => {
      setIsSuccess(false);
      setEmail('');
    }, 3000);
  };

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-gold relative overflow-hidden">
      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="animate-float absolute top-10 left-10 w-8 h-8 bg-white/20 rounded-full" style={{ animationDelay: '0s' }}></div>
        <div className="animate-float absolute top-20 right-20 w-12 h-12 bg-white/15 rounded-full" style={{ animationDelay: '1s' }}></div>
        <div className="animate-float absolute bottom-16 left-1/4 w-6 h-6 bg-white/25 rounded-full" style={{ animationDelay: '2s' }}></div>
        <div className="animate-float absolute bottom-32 right-1/3 w-10 h-10 bg-white/10 rounded-full" style={{ animationDelay: '3s' }}></div>
      </div>

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        {/* Header */}
        <div className={`space-y-6 mb-12 transition-all duration-1000 ${isVisible ? 'animate-slide-in-up' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-section text-primary-dark">
            Subscribe to our newsletter
            <span className="inline-block ml-2 animate-star-rotate">✦</span>
          </h2>
          <p className="text-xl text-primary-dark/80 max-w-2xl mx-auto leading-relaxed">
            To make your stay special and even more memorable
          </p>
        </div>

        {/* Newsletter Form */}
        <div className={`transition-all duration-1000 ${isVisible ? 'animate-slide-in-up' : 'opacity-0 translate-y-8'}`} style={{ animationDelay: '0.3s' }}>
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="relative">
              <div className={`flex bg-white rounded-2xl shadow-hero p-2 transition-all duration-300 ${
                inputFocused ? 'ring-4 ring-white/50 scale-105' : ''
              }`}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setInputFocused(true)}
                  onBlur={() => setInputFocused(false)}
                  placeholder="Enter your email address"
                  className="flex-1 px-4 py-3 bg-transparent text-primary-dark placeholder-primary-dark/60 outline-none"
                  required
                />
                
                <button
                  type="submit"
                  disabled={isSubmitting || !email}
                  className={`px-6 py-3 bg-primary-dark text-white rounded-xl font-semibold transition-all duration-300 hover:bg-primary-dark/90 disabled:opacity-50 flex items-center space-x-2 ${
                    isSubmitting ? 'animate-pulse' : 'hover-scale'
                  }`}
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : isSuccess ? (
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  ) : (
                    <Send className="w-5 h-5" />
                  )}
                  <span className="hidden sm:block">
                    {isSubmitting ? 'Sending...' : isSuccess ? 'Success!' : 'Subscribe'}
                  </span>
                </button>
              </div>

              {/* Success Animation */}
              {isSuccess && (
                <div className="absolute -inset-4 pointer-events-none">
                  {[...Array(12)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-2 h-2 bg-white rounded-full animate-ping"
                      style={{
                        left: `${50 + 40 * Math.cos(i * 30 * Math.PI / 180)}%`,
                        top: `${50 + 40 * Math.sin(i * 30 * Math.PI / 180)}%`,
                        animationDelay: `${i * 0.1}s`,
                        animationDuration: '1s'
                      }}
                    ></div>
                  ))}
                </div>
              )}
            </div>

            {/* Form Footer */}
            <p className="text-sm text-primary-dark/70 mt-4">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </form>
        </div>

        {/* Decorative Elements */}
        <div className={`mt-16 flex justify-center space-x-8 transition-all duration-1000 ${isVisible ? 'animate-slide-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.6s' }}>
          {[1, 2, 3].map((item) => (
            <div key={item} className="w-2 h-2 bg-primary-dark rounded-full animate-pulse" style={{ animationDelay: `${item * 0.2}s` }}></div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Newsletter;