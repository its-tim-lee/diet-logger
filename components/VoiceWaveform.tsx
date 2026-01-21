import React from 'react';

const VoiceWaveform: React.FC = () => {
  return (
    <div className="flex items-center justify-center gap-[3px] h-5 w-5">
      {[...Array(4)].map((_, i) => (
        <div 
          key={i} 
          className="w-1 bg-background-dark rounded-full animate-wave"
          style={{ animationDelay: `${i * 0.1}s` }} 
        />
      ))}
    </div>
  );
};

export default VoiceWaveform;