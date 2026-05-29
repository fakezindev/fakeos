import { useWindows } from "../../contexts/WindowContext";
import { useState, useEffect } from "react";
// Importando os ícones para controlar o estado da tela cheia
import { Maximize, Minimize } from "lucide-react";

interface TaskbarProps {
  onStartClick: () => void;
  startOpen: boolean;
}

export default function Taskbar({ onStartClick, startOpen }: TaskbarProps) {
  const { windows, activeWindowId, focusWindow, minimizeWindow } = useWindows();
  const [time, setTime] = useState(new Date());
  const [isFullscreen, setIsFullscreen] = useState(false); // Estado para controlar o ícone visual

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  // Monitora mudanças nativas de tela cheia (para sincronizar se o usuário apertar ESC ou F11)
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  const openWindows = windows.filter(w => w.isOpen);

  const handleTaskClick = (id: string) => {
    const win = windows.find(w => w.id === id);
    if (!win) return;
    if (activeWindowId === id && !win.isMinimized) {
      minimizeWindow(id);
    } else {
      focusWindow(id);
    }
  };

  // Lógica para alternar o modo de tela cheia
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.log("Erro ao entrar em tela cheia:", err);
      });
    } else {
      document.exitFullscreen().catch((err) => {
        console.log("Erro ao sair da tela cheia:", err);
      });
    }
  };

  return (
    <div className="absolute bottom-0 left-0 right-0 h-12 taskbar-glass z-[9999] flex items-center px-2 gap-1">
      {/* Start Button */}
      <button
        onClick={onStartClick}
        className={`h-9 px-3 rounded-md flex items-center gap-2 transition-all ${startOpen ? "bg-primary/20 neon-glow" : "hover:bg-white/5"}`}
      >
        <div className="w-5 h-5 rounded bg-gradient-to-br from-primary to-accent flex items-center justify-center">
          <span className="text-[10px] font-bold text-white">F</span>
        </div>
        <span className="text-xs font-medium hidden sm:inline">Iniciar</span>
      </button>

      {/* Separator */}
      <div className="w-px h-6 bg-border/50 mx-1" />

      {/* Open Windows */}
      <div className="flex-1 flex items-center gap-1 overflow-x-auto">
        {openWindows.map(win => (
          <button
            key={win.id}
            onClick={() => handleTaskClick(win.id)}
            className={`h-8 px-3 rounded-md flex items-center gap-2 text-xs transition-all max-w-[160px] ${
              activeWindowId === win.id
                ? "bg-primary/15 border border-primary/30"
                : win.isMinimized
                  ? "bg-white/3 opacity-60 hover:opacity-100"
                  : "bg-white/5 hover:bg-white/8"
            }`}
          >
            <span className="text-sm">{win.icon}</span>
            <span className="truncate text-foreground/80">{win.title}</span>
          </button>
        ))}
      </div>

      {/* System Tray (Relógio, Data e agora com o controle de Tela Cheia) */}
      <div className="flex items-center gap-3 px-2">
        
        {/* Botão de Tela Cheia adicionado à esquerda do relógio */}
        <button
          onClick={toggleFullscreen}
          className="p-1.5 rounded-md hover:bg-white/5 text-muted-foreground hover:text-foreground transition-colors flex items-center justify-center group"
          title={isFullscreen ? "Sair da Tela Cheia" : "Entrar em Tela Cheia"}
        >
          {isFullscreen ? (
            <Minimize size={14} className="group-hover:scale-105 transition-transform" />
          ) : (
            <Maximize size={14} className="group-hover:scale-105 transition-transform" />
          )}
        </button>

        <div className="flex flex-col items-end">
          <div className="text-xs text-muted-foreground font-mono leading-none mb-0.5">
            {time.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}
          </div>
          <div className="text-[10px] text-muted-foreground/60 font-mono leading-none">
            {time.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" })}
          </div>
        </div>

      </div>
    </div>
  );
}