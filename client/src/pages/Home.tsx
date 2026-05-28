import { useState, useCallback, useEffect, useRef } from "react";
import { WindowProvider, useWindows } from "@/contexts/WindowContext";
import Desktop from "@/components/os/Desktop";
import Taskbar from "@/components/os/Taskbar";
import StartMenu from "@/components/os/StartMenu";
import BootScreen from "@/components/os/BootScreen";
import Window from "@/components/os/Window";
import AboutApp from "@/components/apps/AboutApp";
import ProjectsApp from "@/components/apps/ProjectsApp";
import BrowserApp from "@/components/apps/BrowserApp";
import TerminalApp from "@/components/apps/TerminalApp";
import PDFViewerApp from "@/components/apps/PDFViewerApp";
import Wallpaper from "@/components/os/Wallpaper";
import MobileDashboard  from "@/components/mobile/MobileDashboard"; 

// Importando os novos ícones (Adicionado o Power para a tela de desligar)
import { User, Folder, Globe, TerminalSquare, FileText, Power } from "lucide-react";

function OSDesktop() {
  const [startOpen, setStartOpen] = useState(false);
  const [isShutdown, setIsShutdown] = useState(false); // Estado para controlar a tela de desligamento
  const { registerWindow, windows } = useWindows();
  const registered = useRef(false);

  useEffect(() => {
    if (registered.current) return;
    registered.current = true;
    
    registerWindow({
      id: "about",
      title: "Sobre Mim",
      icon: <User size={16} className="text-blue-400" />,
      position: { x: 120, y: 60 },
      size: { width: 480, height: 520 },
      minSize: { width: 360, height: 400 },
    });
    
    registerWindow({
      id: "projects",
      title: "Projetos",
      icon: <Folder size={16} className="text-amber-400" fill="currentColor" />,
      position: { x: 200, y: 80 },
      size: { width: 500, height: 480 },
      minSize: { width: 380, height: 350 },
    });
    
    registerWindow({ 
      id: "browser", 
      title: "Navegador", 
      icon: <Globe size={16} className="text-cyan-400" />, 
      position: { x: 160, y: 50 },
      size: { width: 800, height: 600 },
      minSize: { width: 420, height: 400 },
    });
    
    registerWindow({
      id: "terminal",
      title: "Terminal",
      icon: <TerminalSquare size={16} className="text-gray-400" />,
      position: { x: 250, y: 100 },
      size: { width: 600, height: 400 },
      minSize: { width: 400, height: 250 },
    });
    
    registerWindow({
      id: "cv",
      title: "Currículo",
      icon: <FileText size={16} className="text-red-400" />,
      position: { x: 300, y: 150 },
      size: { width: 800, height: 600 },
      minSize: { width: 420, height: 400 },
    });
  }, [registerWindow]);

  // Nova lógica de desligamento com tela de encerramento
  const handleShutdown = () => {
    setStartOpen(false);
    setIsShutdown(true);
    
    // Tenta fechar a janela após a animação (se o navegador permitir)
    setTimeout(() => {
      window.close();
    }, 3000);
  };

  // Se o utilizador clicou para desligar, renderiza apenas a tela preta
  if (isShutdown) {
    return (
      <div className="fixed inset-0 bg-black z-[99999] flex flex-col items-center justify-center text-white font-mono select-none animate-in fade-in duration-1000">
        <div className="text-center space-y-3">
          <Power size={44} className="mx-auto text-red-500 animate-pulse" />
          <p className="text-sm tracking-wide">A encerrar o sistema...</p>
          <p className="text-[10px] text-gray-500">FakeOS v1.0 • Bruno</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 overflow-hidden boot-fade-in">
      <Wallpaper />
      <Desktop />

      {/* Windows */}
      <Window windowId="about"><AboutApp /></Window>
      <Window windowId="projects"><ProjectsApp /></Window>
      <Window windowId="browser"><BrowserApp /></Window>
      <Window windowId="terminal"><TerminalApp /></Window>
      <Window windowId="cv">
        <PDFViewerApp fileUrl="/assets/Curriculo_Bruno.pdf" title="Currículo_Bruno.pdf" />
      </Window>

      {/* Start Menu e Taskbar */}
      <StartMenu isOpen={startOpen} onClose={() => setStartOpen(false)} onShutdown={handleShutdown}/>
      <Taskbar onStartClick={() => setStartOpen(prev => !prev)} startOpen={startOpen} />
    </div>
  );
}

export default function Home() {
  const [booted, setBooted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // LÓGICA DE TELA CHEIA AUTOMÁTICA
  useEffect(() => {
    const enterFullscreen = () => {
      const docEl = document.documentElement;
      if (docEl.requestFullscreen) {
        docEl.requestFullscreen().catch((err) => {
          console.log("Erro ao ativar tela cheia:", err);
        });
      }
      // Remove o listener para não ficar a tentar abrir a tela cheia a cada clique
      document.removeEventListener("click", enterFullscreen);
    };

    document.addEventListener("click", enterFullscreen);

    return () => document.removeEventListener("click", enterFullscreen);
  }, []);

  useEffect(() => {
    const checkDevice = () => {
      // 768px é o padrão 'md' do Tailwind (comum para tablets/mobiles)
      setIsMobile(window.innerWidth < 768);
    };

    checkDevice();
    window.addEventListener("resize", checkDevice);
    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  const handleBootComplete = useCallback(() => {
    setBooted(true);
  }, []);

  return (
    <WindowProvider>
      {!booted && <BootScreen onComplete={handleBootComplete} />}
      
      {booted && (
        isMobile ? (
          /* Se for tela pequena, carrega a experiência estilo Smartphone */
          <MobileDashboard /> 
        ) : (
          /* Se for PC, carrega o seu FakeOS Desktop atual */
          <OSDesktop />
        )
      )}
    </WindowProvider>
  );
}