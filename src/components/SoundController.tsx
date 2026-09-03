import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface SoundControllerProps {
  soundEnabled: boolean;
  onToggle: () => void;
  onPlayClick?: () => void;
}

export const SoundController: React.FC<SoundControllerProps> = ({
  soundEnabled,
  onToggle,
  onPlayClick
}) => {
  const handleClick = () => {
    onToggle();
    if (onPlayClick) onPlayClick();
  };

  return (
    <button
      onClick={handleClick}
      data-cursor="button"
      data-cursor-text={soundEnabled ? "MUTE" : "SOUND"}
      aria-label={soundEnabled ? "Mute audio sound effects" : "Enable audio sound effects"}
      className={`group relative flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all duration-300 ${
        soundEnabled
          ? 'bg-ds-deep/60 border-ds-sky/50 shadow-glow-subtle text-ds-sky'
          : 'bg-ds-abyss/60 border-ds-ocean/20 text-ds-white/40 hover:text-ds-white/80 hover:border-ds-ocean/40'
      }`}
    >
      {soundEnabled ? (
        <>
          <Volume2 className="w-3.5 h-3.5 text-ds-sky animate-pulse" />
          <div className="flex items-end gap-[2px] h-3">
            <span className="w-[2px] h-1.5 bg-ds-sky rounded-full animate-bounce [animation-delay:0ms]" />
            <span className="w-[2px] h-3 bg-ds-sky rounded-full animate-bounce [animation-delay:150ms]" />
            <span className="w-[2px] h-2 bg-ds-sky rounded-full animate-bounce [animation-delay:300ms]" />
          </div>
          <span className="text-[10px] font-mono font-medium tracking-wider uppercase text-ds-sky hidden sm:inline">
            SFX ON
          </span>
        </>
      ) : (
        <>
          <VolumeX className="w-3.5 h-3.5" />
          <span className="text-[10px] font-mono font-medium tracking-wider uppercase hidden sm:inline">
            SFX OFF
          </span>
        </>
      )}
    </button>
  );
};
