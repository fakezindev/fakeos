import { useState, useRef } from "react";
import { createPortal } from "react-dom"; // <-- Importação do Portal
import GarboApp from "@/components/apps/GarboApp";
import FakeOSApp from "@/components/apps/FakeOsApp";
import ChessSystemApp from "@/components/apps/ChessSystemApp";
import CrachaDesktopApp from "@/components/apps/CrachaDesktopApp";
import { 
  ChevronLeft, 
  ChevronRight, 
  ArrowUp, 
  LayoutTemplate, 
  Monitor,
  TerminalSquare,
  IdCard,
  Sparkles
} from "lucide-react";

interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  githubUrl?: string;
  videoPreview?: string;
}

const projects: Project[] = [
  {
    id: "garbo",
    title: "Garbo Arquitetura e Planejados",
    description: "Sistema completo para escritório de arquitetura com gestão de projetos, clientes, upload de mídia via MinIO/S3 e painel administrativo.",
    tags: ["Java", "Spring Boot", "React", "PostgreSQL"],
    githubUrl: "https://github.com/fakezindev/garbo-ambientes-planejados",
    videoPreview: "/assets/previews/garbo-preview.mp4",
  },
  {
    id: "chess",
    title: "Chess System Java",
    description: "Motor de Xadrez Orientado a Objetos com demonstração Web.",
    tags: ["Java", "POO", "Estrutura de Dados"],
    githubUrl: "https://github.com/fakezindev/chess-system-java",
    videoPreview: "/assets/previews/chess-preview.mp4",
  },
  {
    id: "cracha",
    title: "Sistema de Crachá Desktop",
    description: "Aplicação Desktop em C# e WPF com foco em arquitetura MVVM e trabalho em equipe.",
    tags: ["C#", "WPF", "MVVM", "MySQL"],
    githubUrl: "https://github.com/fakezindev",
    videoPreview: "/assets/previews/cracha-preview.mp4",
  },
  {
    id: "fakeos",
    title: "FakeOS - Portfolio",
    description: "Este portfólio interativo em formato de sistema operacional, construído com React, Vite e TailwindCSS.",
    tags: ["React", "Vite", "TailwindCSS"],
    githubUrl: "https://github.com/fakezindev",
    videoPreview: "/assets/previews/fakeos-preview.mp4",
  },
];

export default function ProjectsApp() {
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);
  
  // O estado agora guarda as coordenadas X e Y do mouse na tela
  const [hoveredProject, setHoveredProject] = useState<{ id: string, x: number, y: number } | null>(null);
  const hoverTimeout = useRef<NodeJS.Timeout | null>(null);

  const activeProject = projects.find(p => p.id === activeProjectId);

  const getProjectIcon = (id: string) => {
    switch (id) {
      case 'garbo': return <LayoutTemplate size={28} className="text-orange-500" />;
      case 'chess': return <TerminalSquare size={28} className="text-green-500" />;
      case 'cracha': return <IdCard size={28} className="text-blue-600" />;
      case 'fakeos': return <Monitor size={28} className="text-sky-400 drop-shadow-[0_0_6px_rgba(56,189,248,0.5)]" />;
      default: return <Monitor size={28} className="text-primary" />;
    }
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>, id: string) => {
    // Pega a posição exata da pasta na tela inteira
    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    hoverTimeout.current = setTimeout(() => {
      setHoveredProject({ id, x, y });
    }, 500); // 500ms para expandir
  };

  const handleMouseLeave = () => {
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
    setHoveredProject(null);
  };

  return (
    <div className="flex flex-col h-full bg-background text-foreground overflow-hidden">
      
      {/* OS Toolbar */}
      <div className="flex items-center gap-2 p-2 border-b border-border/30 bg-secondary/30">
        <div className="flex gap-1">
          <button
            onClick={() => setActiveProjectId(null)}
            disabled={!activeProjectId}
            className="p-1.5 rounded-md hover:bg-secondary disabled:opacity-30 transition-colors"
          >
            <ChevronLeft size={16} />
          </button>
          <button disabled className="p-1.5 rounded-md opacity-30"><ChevronRight size={16} /></button>
          <button
            onClick={() => setActiveProjectId(null)}
            disabled={!activeProjectId}
            className="p-1.5 rounded-md hover:bg-secondary disabled:opacity-30 transition-colors"
          >
            <ArrowUp size={16} />
          </button>
        </div>
        <div className="flex-1 px-3 py-1.5 bg-background/50 border border-border/50 rounded text-xs font-mono text-muted-foreground shadow-inner">
          C:\Users\Bruno\Projetos{activeProject ? `\\${activeProject.id}` : ''}
        </div>
      </div>

      {/* Main Content Area */}
      <div 
        className={`flex-1 ${!activeProject ? 'p-5 overflow-y-auto' : 'overflow-hidden'}`}
        onScroll={handleMouseLeave} // Se rolar a janela, o popup fecha automaticamente!
      >
        {!activeProject ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-6 gap-y-10 justify-items-center relative">
            {projects.map((project) => (
              
              /* Container "Âncora" invisível que segura o espaço na grade */
              <div
                key={project.id}
                onMouseEnter={(e) => handleMouseEnter(e, project.id)}
                onMouseLeave={handleMouseLeave}
                onDoubleClick={() => {
                  handleMouseLeave();
                  setActiveProjectId(project.id);
                }}
                className="relative flex flex-col items-center w-28 h-28 cursor-pointer group"
              >
                
                {/* 1. ESTADO NORMAL (Fica invisível se estiver em Hover) */}
                <div className={`flex flex-col items-center gap-2 w-full transition-opacity duration-200 ${hoveredProject?.id === project.id ? 'opacity-0' : 'opacity-100'}`}>
                  <div className="w-20 h-20 flex items-center justify-center bg-secondary/30 rounded-xl border border-border/50 shadow-sm transition-transform group-active:scale-95">
                    {getProjectIcon(project.id)}
                  </div>
                  <span className="text-xs text-center font-medium line-clamp-2 select-none">
                    {project.title}
                  </span>
                </div>

                {/* 2. ESTADO EXPANDIDO (ESTILO NETFLIX COM PORTAL) */}
                {hoveredProject?.id === project.id && createPortal(
                  <div 
                    className="fixed w-64 bg-[#121212] rounded-xl border border-white/10 shadow-2xl z-[99999] overflow-hidden animate-in zoom-in-95 duration-200 pointer-events-auto"
                    style={{
                      top: hoveredProject.y,
                      left: hoveredProject.x,
                      transform: 'translate(-50%, -50%)'
                    }}
                    onMouseEnter={() => {
                      if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
                    }}
                    onMouseLeave={handleMouseLeave}
                    onDoubleClick={() => {
                      handleMouseLeave();
                      setActiveProjectId(project.id);
                    }}
                  >
                    
                    {/* Player de Vídeo no Topo */}
                    <div className="w-full aspect-video bg-black relative flex items-center justify-center">
                      {project.videoPreview ? (
                        <video
                          src={project.videoPreview}
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="scale-150 animate-pulse">{getProjectIcon(project.id)}</div>
                      )}
                      
                      {/* Gradiente sutil embaixo do vídeo */}
                      <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-[#121212] to-transparent" />
                    </div>

                    {/* Informações Ricas */}
                    <div className="p-4 flex flex-col gap-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-primary uppercase tracking-wider">Duplo clique para abrir</span>
                      </div>
                      
                      <h3 className="text-sm text-white font-bold truncate">{project.title}</h3>
                      <p className="text-[10px] text-muted-foreground leading-relaxed line-clamp-2">
                        {project.description}
                      </p>
                      
                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {project.tags.map(t => (
                          <span key={t} className="text-[9px] font-medium bg-white/10 border border-white/5 px-2 py-0.5 rounded-full text-white/80">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                  </div>,
                  document.body // O "teletransporte" mágico acontece aqui!
                )}
              </div>
            ))}
          </div>
        ) : (
          /* Visão Detalhada */
          <div className="h-full w-full animate-in fade-in duration-300">
            {activeProject.id === 'garbo' && <GarboApp />}
            {activeProject.id === 'chess' && <ChessSystemApp />}
            {activeProject.id === 'cracha' && <CrachaDesktopApp />}
            {activeProject.id === 'fakeos' && <FakeOSApp />}
          </div>
        )}
      </div>
    </div>
  );
}