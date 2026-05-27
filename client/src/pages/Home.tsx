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

// Importando os novos ícones para a barra de tarefas e topo das janelas
import { User, Folder, Globe, TerminalSquare, FileText } from "lucide-react";

function OSDesktop() {
  const [startOpen, setStartOpen] = useState(false);
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

  const handleShutdown = () => {
    window.close();
  };

  return (
    <div className="fixed inset-0 overflow-hidden boot-fade-in">
      {/* 1. O plano de fundo fica na camada mais profunda (z-0) */}
      <Wallpaper />

      {/* 2. O Desktop com os ícones fica por cima do Wallpaper */}
      <Desktop />

      {/* Windows */}
      <Window windowId="about"><AboutApp /></Window>
      <Window windowId="projects"><ProjectsApp /></Window>
      <Window windowId="browser"><BrowserApp /></Window>
      <Window windowId="terminal"><TerminalApp /></Window>
      <Window windowId="cv">
        <PDFViewerApp fileUrl="/assets/Curriculo_Bruno.pdf" title="Currículo_Bruno.pdf" />
      </Window>

      {/* Start Menu */}
      <StartMenu isOpen={startOpen} onClose={() => setStartOpen(false)} onShutdown={handleShutdown}/>

      {/* Taskbar */}
      <Taskbar onStartClick={() => setStartOpen(prev => !prev)} startOpen={startOpen} />
    </div>
  );
}

export default function Home() {
  const [booted, setBooted] = useState(false);

  const handleBootComplete = useCallback(() => {
    setBooted(true);
  }, []);

  return (
    <WindowProvider>
      {!booted && <BootScreen onComplete={handleBootComplete} />}
      {booted && <OSDesktop />}
    </WindowProvider>
  );
}