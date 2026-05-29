import { useState, useEffect } from "react";
import { User, Folder, Globe, TerminalSquare, FileText, Battery, Wifi, ChevronLeft } from "lucide-react";

// Importação dos teus componentes de código reais
import AboutApp from "../../components/apps/AboutApp";
import ProjectsApp from "../../components/apps/ProjectsApp";
import BrowserApp from "../../components/apps/BrowserApp";
import TerminalApp from "../../components/apps/TerminalApp";
import PDFViewerApp from "../../components/apps/PDFViewerApp";
import MobileWallpaper from "./MobileWallpaper";

export default function MobileDashboard() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeMobileApp, setActiveMobileApp] = useState<string | null>(null);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Dados das aplicações
  const apps = [
    { id: "about", title: "Sobre Mim", icon: <User size={24} className="text-blue-400" /> },
    { id: "projects", title: "Projetos", icon: <Folder size={24} className="text-amber-400" fill="currentColor" /> },
    { id: "browser", title: "Navegador", icon: <Globe size={24} className="text-cyan-400" /> },
    { id: "terminal", title: "Terminal", icon: <TerminalSquare size={24} className="text-gray-400" /> },
    { id: "cv", title: "Currículo", icon: <FileText size={24} className="text-red-400" /> },
  ];

  // 1. NOVO: Mapeamento exato da grade (null = espaço vazio)
  // Isso cria a moldura perfeita em volta do texto do Wallpaper
  const gridLayout = [
    "about", null, "browser",     // Linha 1: [Sobre Mim] [  VAZIO  ] [Navegador]
    "terminal", "projects", "cv"  // Linha 2: [Terminal]  [Projetos]  [Currículo]
  ];

  const renderMobileApp = () => {
    if (!activeMobileApp) return null;

    return (
      <div className="fixed inset-0 bg-background text-foreground z-[10000] flex flex-col animate-in slide-in-from-right duration-300">
        
        {/* Barra de navegação interna */}
        <div className="h-12 px-2 bg-secondary/80 backdrop-blur border-b border-border/40 flex items-center gap-2 shrink-0">
          <button 
            onClick={() => setActiveMobileApp(null)}
            className="p-2 rounded-lg hover:bg-white/5 active:scale-95 text-primary transition-all flex items-center gap-1"
          >
            <ChevronLeft size={20} />
            <span className="text-xs font-medium">Voltar</span>
          </button>
          
          <span className="text-xs font-semibold font-mono text-muted-foreground ml-auto pr-4">
            {apps.find(a => a.id === activeMobileApp)?.title}
          </span>
        </div>

        {/* Contentor do App */}
        <div className="flex-1 overflow-hidden h-full">
          {activeMobileApp === "about" && <AboutApp />}
          {activeMobileApp === "projects" && <ProjectsApp />}
          {activeMobileApp === "browser" && <BrowserApp />}
          {activeMobileApp === "terminal" && <TerminalApp />}
          {activeMobileApp === "cv" && (
            <PDFViewerApp fileUrl="/assets/Curriculo_Bruno.pdf" title="Currículo_Bruno.pdf" />
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-[#0b0f19] text-white flex flex-col font-sans select-none overflow-hidden">
      
      {/* Wallpaper de Fundo */}
      <MobileWallpaper />

      {/* Status Bar */}
      <div className="relative z-10 h-8 px-4 flex items-center justify-between text-[11px] font-medium bg-black/20 backdrop-blur border-b border-white/5">
        <div>
          {currentTime.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}
        </div>
        <div className="flex items-center gap-1.5 opacity-80">
          <Wifi size={12} />
          <Battery size={14} />
          <span>100%</span>
        </div>
      </div>

      {/* Main Screen Content */}
      <div className="relative z-10 flex-1 px-6 pt-4 pb-2 flex flex-col overflow-y-auto">
        
        {/* Mola flexível para empurrar a grade para o fundo */}
        <div className="flex-1 min-h-[20px]"></div>

        {/* Grade de Apps com o novo Layout Customizado */}
        <div className="grid grid-cols-3 gap-y-6 gap-x-4 justify-items-center mt-auto mb-4">
          {gridLayout.map((appId, index) => {
            
            // Se for o slot vazio (null), renderizamos apenas uma div invisível para ocupar o espaço no Grid
            if (!appId) {
              return <div key={`spacer-${index}`} className="w-16 h-16 pointer-events-none" />;
            }

            const app = apps.find(a => a.id === appId);
            if (!app) return null;

            return (
              <button
                key={app.id}
                onClick={() => setActiveMobileApp(app.id)}
                className="flex flex-col items-center gap-2 active:scale-95 transition-all group"
              >
                <div className="w-16 h-16 rounded-3xl bg-slate-800/40 backdrop-blur-md border border-white/10 flex items-center justify-center shadow-lg group-hover:border-sky-400/50 transition-colors">
                  {app.icon}
                </div>
                <span className="text-[11px] font-medium text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] text-center line-clamp-1">
                  {app.title}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Dock Inferior */}
      <div className="relative z-10 p-4 bg-white/5 border border-white/10 backdrop-blur-md mb-6 mx-4 rounded-3xl flex justify-around items-center shadow-2xl shrink-0">
        <button onClick={() => setActiveMobileApp("about")} className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 active:scale-90 transition-transform">
          <User size={20} />
        </button>
        <button onClick={() => setActiveMobileApp("projects")} className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400 active:scale-90 transition-transform">
          <Folder size={20} fill="currentColor" />
        </button>
        <button onClick={() => setActiveMobileApp("terminal")} className="w-10 h-10 rounded-xl bg-gray-800 border border-white/5 flex items-center justify-center text-gray-400 active:scale-90 transition-transform">
          <TerminalSquare size={20} />
        </button>
      </div>

      {/* App em ecrã cheio */}
      {renderMobileApp()}

    </div>
  );
}