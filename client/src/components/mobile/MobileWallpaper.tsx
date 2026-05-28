import { useState, useEffect } from "react";

export default function MobileWallpaper() {
  const [text, setText] = useState("");
  const fullText = "Bem vindo ao\nmeu\nPortfólio";

  useEffect(() => {
    let currentIndex = 0;
    let timeoutId: NodeJS.Timeout;

    const typeNextChar = () => {
      if (currentIndex < fullText.length) {
        setText(fullText.substring(0, currentIndex + 1));
        currentIndex++;

        let delay = Math.random() * 60 + 40; 
        
        const char = fullText[currentIndex - 1];
        if (char === ' ' || char === '\n') {
          delay += 150;
        }

        timeoutId = setTimeout(typeNextChar, delay);
      }
    };

    timeoutId = setTimeout(typeNextChar, 500);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden bg-[#18181b] z-0 pointer-events-none flex flex-col items-center justify-start pt-[12vh] font-sans">
      
      {/* 1. Fundo Escuro com Gradiente Radial e Grade Sutil */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#1e293b] via-[#0f172a] to-black" />
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.5) 1px, transparent 1px)`,
        backgroundSize: '40px 40px'
      }} />

      {/* 2. Orbe de luz de fundo com pulsação suave */}
      <div className="absolute top-[5%] w-[600px] h-[600px] bg-sky-500/10 rounded-full blur-[100px] mix-blend-screen bg-pulse" />

      {/* Estilos CSS do teu Wallpaper Original */}
      <style>{`
        @keyframes neon-pulse {
          0%, 100% { text-shadow: 0 0 10px rgba(56, 189, 248, 0.6), 0 0 20px rgba(56, 189, 248, 0.4), 0 0 35px rgba(56, 189, 248, 0.2), 0 0 60px rgba(56, 189, 248, 0.1); }
          50% { text-shadow: 0 0 15px rgba(56, 189, 248, 0.9), 0 0 30px rgba(56, 189, 248, 0.7), 0 0 50px rgba(56, 189, 248, 0.5), 0 0 80px rgba(56, 189, 248, 0.3); }
        }
        @keyframes line-pulse {
          0%, 100% { opacity: 0.4; filter: drop-shadow(0 0 2px rgba(56, 189, 248, 0.3)); }
          50% { opacity: 0.9; filter: drop-shadow(0 0 8px rgba(56, 189, 248, 0.8)); }
        }
        @keyframes dot-pulse {
          0%, 100% { box-shadow: 0 0 5px rgba(56, 189, 248, 0.5); transform: scale(0.9); opacity: 0.7; }
          50% { box-shadow: 0 0 12px rgba(56, 189, 248, 1), 0 0 20px rgba(56, 189, 248, 0.6); transform: scale(1.2); opacity: 1; }
        }
        @keyframes bg-pulse {
          0%, 100% { opacity: 0.05; transform: scale(0.95); }
          50% { opacity: 0.15; transform: scale(1.05); }
        }
        @keyframes blink-cursor {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .neon-text-animated { color: #e0f2fe; animation: neon-pulse 3s ease-in-out infinite; }
        .line-animated { animation: line-pulse 3s ease-in-out infinite; }
        .dot-animated { animation: dot-pulse 3s ease-in-out infinite; }
        .bg-pulse { animation: bg-pulse 4s ease-in-out infinite; }
        .cursor-blink { animation: blink-cursor 1s step-end infinite; text-shadow: 0 0 10px #38bdf8; }
      `}</style>

      {/* 3. Container Principal - Agora ancorado ao topo */}
      <div className="relative z-10 flex flex-col items-center gap-5">
        
        {/* Decoração Superior */}
        <div className="flex items-center gap-3 w-28 line-animated">
          <div className="h-[2px] flex-1 bg-gradient-to-r from-transparent to-sky-400"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-sky-200 dot-animated"></div>
          <div className="h-[2px] flex-1 bg-gradient-to-l from-transparent to-sky-400"></div>
        </div>

        {/* Texto em Neon Animado */}
        <div className="text-center flex items-center justify-center min-h-[120px]">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight neon-text-animated leading-[1.1] whitespace-pre-line">
            {text}
            <span className="text-sky-400 font-light cursor-blink ml-1 align-baseline">|</span>
          </h1>
        </div>

        {/* Decoração Inferior */}
        <div className="flex items-center gap-3 w-28 mt-1 line-animated" style={{ animationDelay: '0.5s' }}>
          <div className="h-[2px] flex-1 bg-gradient-to-r from-transparent to-sky-400"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-sky-200 dot-animated" style={{ animationDelay: '0.5s' }}></div>
          <div className="h-[2px] flex-1 bg-gradient-to-l from-transparent to-sky-400"></div>
        </div>

        {/* Subtítulo */}
        <div className="mt-3 text-[9px] font-mono tracking-[0.4em] text-sky-200/50 uppercase">
          [ FAKEZINDEV ]
        </div>

      </div>
    </div>
  );
}