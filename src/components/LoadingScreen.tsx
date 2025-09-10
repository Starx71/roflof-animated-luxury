import { useEffect, useState } from 'react';

const LoadingScreen = ({ onLoadingComplete }: { onLoadingComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsVisible(false);
            setTimeout(onLoadingComplete, 500);
          }, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [onLoadingComplete]);

  if (!isVisible) return null;

  return (
    <div className={`fixed inset-0 z-50 bg-gradient-hero flex items-center justify-center transition-all duration-500 ${
      progress === 100 ? 'opacity-0 pointer-events-none' : 'opacity-100'
    }`}>
      <div className="text-center space-y-8">
        {/* Logo Animation */}
        <div className="relative">
          <div className="w-32 h-32 bg-white rounded-full shadow-hero flex items-center justify-center animate-breathe mx-auto">
            <h1 className="text-4xl font-bold text-primary-dark tracking-tight">R</h1>
          </div>
          
          {/* Orbiting Dots */}
          <div className="absolute inset-0 animate-star-rotate">
            <div className="w-4 h-4 bg-accent-gold rounded-full absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2"></div>
          </div>
          <div className="absolute inset-0 animate-star-rotate" style={{ animationDelay: '0.5s' }}>
            <div className="w-3 h-3 bg-accent-gold rounded-full absolute bottom-0 right-0 transform translate-x-2 translate-y-2"></div>
          </div>
          <div className="absolute inset-0 animate-star-rotate" style={{ animationDelay: '1s' }}>
            <div className="w-2 h-2 bg-accent-gold rounded-full absolute bottom-0 left-0 transform -translate-x-2 translate-y-2"></div>
          </div>
        </div>

        {/* Brand Name */}
        <h1 className="text-6xl font-bold text-primary-dark animate-slide-in-up">
          Roflof
        </h1>

        {/* Tagline */}
        <p className="text-xl text-primary-dark/80 animate-slide-in-up" style={{ animationDelay: '0.3s' }}>
          Explore design — inspire your next interior model
        </p>

        {/* Progress Bar */}
        <div className="w-64 mx-auto animate-slide-in-up" style={{ animationDelay: '0.6s' }}>
          <div className="w-full bg-white/30 rounded-full h-2 overflow-hidden">
            <div 
              className="h-full bg-gradient-gold transition-all duration-300 ease-out rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="text-center mt-4 text-primary-dark/70 font-medium">
            {progress}%
          </div>
        </div>
      </div>

      {/* Background Animation */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="animate-float absolute bg-accent-gold/10 rounded-full"
            style={{
              width: `${Math.random() * 20 + 5}px`,
              height: `${Math.random() * 20 + 5}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${Math.random() * 3 + 4}s`
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default LoadingScreen;