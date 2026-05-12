import { useState, useCallback, useEffect, useRef } from "react";
import { WindowProvider, useWindows } from "@/contexts/WindowContext";
import Desktop from "@/components/os/Desktop";
import Taskbar from "@/components/os/Taskbar";
import StartMenu from "@/components/os/StartMenu";
import BootScreen from "@/components/os/BootScreen";
import Window from "@/components/os/Window";
import AboutApp from "@/components/apps/AboutApp";
import ProjectsApp from "@/components/apps/ProjectsApp";
import GarboApp from "@/components/apps/GarboApp";
import TerminalApp from "@/components/apps/TerminalApp";

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
      icon: "👤",
      position: { x: 120, y: 60 },
      size: { width: 480, height: 520 },
      minSize: { width: 360, height: 400 },
    });
    registerWindow({
      id: "projects",
      title: "Projetos",
      icon: "📁",
      position: { x: 200, y: 80 },
      size: { width: 500, height: 480 },
      minSize: { width: 380, height: 350 },
    });
    registerWindow({
      id: "garbo",
      title: "Garbo Ambientes Planejados",
      icon: "🏠",
      position: { x: 160, y: 50 },
      size: { width: 560, height: 560 },
      minSize: { width: 420, height: 400 },
    });
    registerWindow({
      id: "terminal",
      title: "Terminal",
      icon: "💻",
      position: { x: 250, y: 100 },
      size: { width: 600, height: 400 },
      minSize: { width: 400, height: 250 },
    });
  }, [registerWindow]);

  return (
    <div className="fixed inset-0 overflow-hidden boot-fade-in">
      <Desktop />

      {/* Windows */}
      <Window windowId="about"><AboutApp /></Window>
      <Window windowId="projects"><ProjectsApp /></Window>
      <Window windowId="garbo"><GarboApp /></Window>
      <Window windowId="terminal"><TerminalApp /></Window>

      {/* Start Menu */}
      <StartMenu isOpen={startOpen} onClose={() => setStartOpen(false)} />

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
