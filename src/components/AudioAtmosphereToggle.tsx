import { useState, useEffect } from 'react';
import { Volume2, VolumeX, Sparkles } from 'lucide-react';
import { soundFX } from '../utils/soundFX';

export default function AudioAtmosphereToggle() {
  const [isMuted, setIsMuted] = useState(true);
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    setIsMuted(soundFX.getMuted());
  }, []);

  const handleToggle = () => {
    const muted = soundFX.toggleMute();
    setIsMuted(muted);
    setPulse(true);
    setTimeout(() => setPulse(false), 600);
  };

  return (
    <button
      type="button"
      id="ambientAudioToggle"
      onClick={handleToggle}
      className={`fixed bottom-24 right-5 sm:bottom-6 sm:right-6 z-[880] flex items-center gap-2.5 px-3.5 py-2 rounded-full border backdrop-blur-xl shadow-xl transition-all duration-300 touch-spring ${
        !isMuted
          ? 'bg-violet-950/80 border-violet-500/50 text-violet-200 shadow-violet-600/30'
          : 'bg-[#090a14]/85 border-white/10 text-neutral-400 hover:text-white hover:border-white/25'
      } ${pulse ? 'scale-110' : 'scale-100'}`}
      aria-label={!isMuted ? 'Mute ambient soundscape' : 'Unmute ambient soundscape'}
      title={!isMuted ? 'Mute ambient soundscape' : 'Experience spatial ambient soundscape'}
    >
      <div className="relative flex items-center justify-center">
        {!isMuted ? (
          <>
            <span className="absolute -inset-1 rounded-full bg-violet-500/30 animate-ping pointer-events-none" />
            <Volume2 className="w-4 h-4 text-violet-400 shrink-0 relative z-10" />
          </>
        ) : (
          <VolumeX className="w-4 h-4 shrink-0" />
        )}
      </div>
      <div className="flex flex-col text-left">
        <span className="text-[10px] font-mono uppercase tracking-wider font-semibold leading-tight flex items-center gap-1">
          {!isMuted ? (
            <>
              <span>Audio On</span>
              <Sparkles className="w-2.5 h-2.5 text-violet-400" />
            </>
          ) : (
            <span>Soundscape</span>
          )}
        </span>
        <span className="text-[9px] text-neutral-400 font-mono hidden sm:inline leading-none">
          {!isMuted ? '55Hz Celestial' : 'Click to Immersion'}
        </span>
      </div>
    </button>
  );
}
