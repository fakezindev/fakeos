import { useState, useEffect } from "react";

export default function Wallpaper() {
  const [text, setText] = useState("");
  const fullText = "Bem vindo ao\nmeu Portfólio";

  useEffect(() => {
    let currentIndex = 0;
    let timeoutId: NodeJS.Timeout;

    const typeNextChar = () => {
      if (currentIndex < fullText.length) {
        setText(fullText.substring(0, currentIndex + 1));
        currentIndex++;

        // Calcula a velocidade da próxima "tecla"
        // Base: 40ms a 100ms (rápido)
        let delay = Math.random() * 60 + 40; 
        
        const char = fullText[currentIndex - 1];
        // Se for um espaço ou quebra de linha, o "humano" demora um pouco mais
        if (char === ' ' || char === '\n') {
          delay += 150;
        }

        timeoutId = setTimeout(typeNextChar, delay);
      }
    };

    // Pausa inicial de meio segundo antes de começar a digitar
    timeoutId = setTimeout(typeNextChar, 500);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden bg-[#18181b] z-0 pointer-events-none flex flex-col items-center justify-center font-sans">
      
      {/* 1. Fundo Escuro com Gradiente Radial e Grade Sutil */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#1e293b] via-[#0f172a] to-black" />
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.5) 1px, transparent 1px)`,
        backgroundSize: '40px 40px'
      }} />

      {/* 2. Orbe de luz de fundo com pulsação suave */}
      <div className="absolute w-[800px] h-[800px] bg-blue-500/10 rounded-full blur-[120px] mix-blend-screen bg-pulse" />

      {/* Estilos CSS para o neon pulsante, linhas e cursor */}
      <style>{`
        @keyframes neon-pulse {
          0%, 100% {
            text-shadow: 
              0 0 10px rgba(56, 189, 248, 0.6),
              0 0 20px rgba(56, 189, 248, 0.4),
              0 0 35px rgba(56, 189, 248, 0.2),
              0 0 60px rgba(56, 189, 248, 0.1);
          }
          50% {
            text-shadow: 
              0 0 15px rgba(56, 189, 248, 0.9),
              0 0 30px rgba(56, 189, 248, 0.7),
              0 0 50px rgba(56, 189, 248, 0.5),
              0 0 80px rgba(56, 189, 248, 0.3);
          }
        }
        
        @keyframes line-pulse {
          0%, 100% { opacity: 0.4; filter: drop-shadow(0 0 2px rgba(56, 189, 248, 0.3)); }
          50% { opacity: 0.9; filter: drop-shadow(0 0 8px rgba(56, 189, 248, 0.8)); }
        }

        @keyframes dot-pulse {
          0%, 100% { 
            box-shadow: 0 0 5px rgba(56, 189, 248, 0.5); 
            transform: scale(0.9);
            opacity: 0.7;
          }
          50% { 
            box-shadow: 0 0 12px rgba(56, 189, 248, 1), 0 0 20px rgba(56, 189, 248, 0.6); 
            transform: scale(1.2);
            opacity: 1;
          }
        }

        @keyframes bg-pulse {
          0%, 100% { opacity: 0.05; transform: scale(0.95); }
          50% { opacity: 0.15; transform: scale(1.05); }
        }
        
        @keyframes blink-cursor {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        
        .neon-text-animated {
          color: #e0f2fe;
          animation: neon-pulse 3s ease-in-out infinite;
        }
        .line-animated {
          animation: line-pulse 3s ease-in-out infinite;
        }
        .dot-animated {
          animation: dot-pulse 3s ease-in-out infinite;
        }
        .bg-pulse {
          animation: bg-pulse 4s ease-in-out infinite;
        }
        .cursor-blink {
          animation: blink-cursor 1s step-end infinite;
          text-shadow: 0 0 10px #38bdf8;
        }
      `}</style>

      {/* 3. Container Principal Centralizado */}
      <div className="relative z-10 flex flex-col items-center gap-6">
        
        {/* Decoração Superior */}
        <div className="flex items-center gap-4 w-48 line-animated">
          <div className="h-[2px] flex-1 bg-gradient-to-r from-transparent to-blue-400"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-blue-200 dot-animated"></div>
          <div className="h-[2px] flex-1 bg-gradient-to-l from-transparent to-blue-400"></div>
        </div>

        {/* Texto em Neon Animado com React State */}
        <div className="text-center h-[120px] md:h-[150px] lg:h-[180px] flex items-center justify-center">
          {/* A classe whitespace-pre-line garante que o \n no React vire uma quebra de linha real */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight neon-text-animated leading-[1.1] whitespace-pre-line">
            {text}
            <span className="text-blue-400 font-light cursor-blink ml-1 align-baseline">|</span>
          </h1>
        </div>

        {/* Decoração Inferior */}
        <div className="flex items-center gap-4 w-48 mt-2 line-animated" style={{ animationDelay: '0.5s' }}>
          <div className="h-[2px] flex-1 bg-gradient-to-r from-transparent to-blue-400"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-blue-200 dot-animated" style={{ animationDelay: '0.5s' }}></div>
          <div className="h-[2px] flex-1 bg-gradient-to-l from-transparent to-blue-400"></div>
        </div>

        {/* Subtítulo */}
        <div className="mt-4 text-[10px] md:text-xs font-mono tracking-[0.4em] text-blue-200/50 uppercase">
          [ FAKEZINDEV ]
        </div>

      </div>
    </div>
  );
}