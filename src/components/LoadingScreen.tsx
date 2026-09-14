import { useEffect, useState } from 'react';

interface LoadingScreenProps {
  onComplete?: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.floor(Math.random() * 15 + 8);
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsLoaded(true);
            onComplete?.();
          }, 450);
          return 100;
        }
        return next;
      });
    }, 100);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div
      id="loader"
      role="progressbar"
      aria-valuenow={progress}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Loading website"
      className={`fixed inset-0 z-[10000] bg-[#050508] flex flex-col items-center justify-center transition-all duration-700 ease-in-out ${
        isLoaded ? 'opacity-0 invisible pointer-events-none' : 'opacity-100 visible'
      }`}
    >
      <div className="text-center">
        <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight gradient-primary mb-8 animate-pulse">
          MEGNITOO
        </h1>
        <div className="w-56 sm:w-72 h-1 bg-white/10 rounded-full overflow-hidden mx-auto shadow-inner">
          <div
            id="loaderFill"
            className="h-full bg-gradient-to-r from-violet-500 via-cyan-400 to-pink-500 rounded-full transition-all duration-200 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div id="loaderPct" className="font-mono text-sm text-neutral-400 mt-4 tracking-wider">
          {progress}%
        </div>
      </div>
    </div>
  );
}
