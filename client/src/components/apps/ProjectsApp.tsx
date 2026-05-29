import { useState, useRef } from "react";
import { createPortal } from "react-dom";
import GarboApp from "../../components/apps/GarboApp";
import FakeOSApp from "../../components/apps/FakeOsApp";
import ChessSystemApp from "../../components/apps/ChessSystemApp";
import CrachaDesktopApp from "../../components/apps/CrachaDesktopApp";
import { 
  ChevronLeft, 
  ChevronRight, 
  ArrowUp, 
  LayoutTemplate, 
  Monitor,
  TerminalSquare,
  IdCard,
  Github,
  Eye,
  X
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
  
  // Estado de Hover para o Desktop
  const [hoveredProject, setHoveredProject] = useState<{ id: string, x: number, y: number } | null>(null);
  const hoverTimeout = useRef<NodeJS.Timeout | null>(null);

  // NOVO: Estado para a Gaveta de detalhes Mobile (Bottom Sheet)
  const [mobileSelectedProject, setMobileSelectedProject] = useState<Project | null>(null);

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
    // Se a tela for de celular (menor que md/768px), ignora o efeito de hover
    if (window.innerWidth < 768) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    hoverTimeout.current = setTimeout(() => {
      setHoveredProject({ id, x, y });
    }, 500);
  };

  const handleMouseLeave = () => {
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
    setHoveredProject(null);
  };

  // Trata o toque do celular de forma inteligente
  const handleProjectClick = (project: Project) => {
    if (window.innerWidth < 768) {
      // No celular: Abre a gaveta inferior estilo iOS/Android
      setMobileSelectedProject(project);
    }
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
        <div className="flex-1 px-3 py-1.5 bg-background/50 border border-border/50 rounded text-xs font-mono text-muted-foreground shadow-inner truncate">
          C:\Users\Bruno\Projetos{activeProject ? `\\${activeProject.id}` : ''}
        </div>
      </div>

      {/* Main Content Area */}
      <div 
        className={`flex-1 ${!activeProject ? 'p-5 overflow-y-auto' : 'overflow-hidden'}`}
        onScroll={handleMouseLeave}
      >
        {!activeProject ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-4 gap-y-8 md:gap-x-6 md:gap-y-10 justify-items-center relative">
            {projects.map((project) => (
              
              <div
                key={project.id}
                onMouseEnter={(e) => handleMouseEnter(e, project.id)}
                onMouseLeave={handleMouseLeave}
                onClick={() => handleProjectClick(project)}
                onDoubleClick={() => {
                  if (window.innerWidth >= 768) {
                    handleMouseLeave();
                    setActiveProjectId(project.id);
                  }
                }}
                className="relative flex flex-col items-center w-24 h-24 md:w-28 md:h-28 cursor-pointer group"
              >
                
                {/* 1. ESTADO NORMAL */}
                <div className={`flex flex-col items-center gap-2 w-full transition-opacity duration-200 ${hoveredProject?.id === project.id ? 'md:opacity-0' : 'opacity-100'}`}>
                  <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center bg-secondary/30 rounded-xl border border-border/50 shadow-sm transition-transform group-active:scale-95">
                    {getProjectIcon(project.id)}
                  </div>
                  <span className="text-[11px] md:text-xs text-center font-medium line-clamp-2 select-none px-1">
                    {project.title}
                  </span>
                </div>

                {/* 2. ESTADO EXPANDIDO DESKTOP (PORTAL NETFLIX) */}
                {hoveredProject?.id === project.id && createPortal(
                  <div 
                    className="fixed w-64 bg-[#121212] rounded-xl border border-white/10 shadow-2xl z-[99999] overflow-hidden animate-in zoom-in-95 duration-200 hidden md:block"
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
                    <div className="w-full aspect-video bg-black relative flex items-center justify-center">
                      {project.videoPreview ? (
                        <video src={project.videoPreview} autoPlay loop muted playsInline className="w-full h-full object-cover" />
                      ) : (
                        <div className="scale-150 animate-pulse">{getProjectIcon(project.id)}</div>
                      )}
                      <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-[#121212] to-transparent" />
                    </div>

                    <div className="p-4 flex flex-col gap-1.5">
                      <span className="text-[10px] font-bold text-primary uppercase tracking-wider">Duplo clique para abrir</span>
                      <h3 className="text-sm text-white font-bold truncate">{project.title}</h3>
                      <p className="text-[10px] text-muted-foreground leading-relaxed line-clamp-2">{project.description}</p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {project.tags.map(t => (
                          <span key={t} className="text-[9px] bg-white/10 border border-white/5 px-2 py-0.5 rounded-full text-white/80">{t}</span>
                        ))}
                      </div>
                    </div>
                  </div>,
                  document.body
                )}
              </div>
            ))}

            {/* 3. GAVETA MOBILE (BOTTOM SHEET ESTILO NETFLIX/iOS) */}
            {mobileSelectedProject && createPortal(
              <>
                {/* Backdrop escuro de fundo com clique para fechar */}
                <div 
                  className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[99998] md:hidden animate-in fade-in duration-200"
                  onClick={() => setMobileSelectedProject(null)}
                />
                
                {/* Gaveta Deslizante */}
                <div className="fixed bottom-0 inset-x-0 bg-[#121212] border-t border-white/10 rounded-t-3xl z-[99999] md:hidden flex flex-col max-h-[85vh] animate-in slide-in-from-bottom duration-300 overflow-hidden pb-6">
                  
                  {/* Handle superior decorativo */}
                  <div className="w-12 h-1 bg-white/20 rounded-full mx-auto my-3 shrink-0" />
                  
                  {/* Botão de Fechar */}
                  <button 
                    onClick={() => setMobileSelectedProject(null)}
                    className="absolute top-3 right-4 p-1.5 rounded-full bg-white/5 border border-white/10 text-gray-400"
                  >
                    <X size={16} />
                  </button>

                  <div className="overflow-y-auto px-5 space-y-4">
                    {/* Título e Ícone */}
                    <div className="flex items-center gap-3 pt-1">
                      <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                        {getProjectIcon(mobileSelectedProject.id)}
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-white leading-tight">{mobileSelectedProject.title}</h3>
                        <span className="text-[10px] font-bold text-sky-400 uppercase tracking-wider">Aplicações do Projeto</span>
                      </div>
                    </div>

                    {/* Descrição */}
                    <p className="text-xs text-gray-400 leading-relaxed">
                      {mobileSelectedProject.description}
                    </p>

                    {/* Tags da Stack */}
                    <div className="flex flex-wrap gap-1.5">
                      {mobileSelectedProject.tags.map(t => (
                        <span key={t} className="text-[10px] bg-white/10 border border-white/5 px-2.5 py-0.5 rounded-full text-white/90 font-medium">
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Botões de Ação Grandes (Ideais para toque) */}
                    <div className="flex flex-col gap-2 pt-2">
                      <button 
                        onClick={() => {
                          const id = mobileSelectedProject.id;
                          setMobileSelectedProject(null);
                          setActiveProjectId(id);
                        }}
                        className="w-full py-3 bg-primary text-white rounded-xl text-xs font-bold shadow-lg flex items-center justify-center gap-2 active:scale-95 transition-transform"
                      >
                        <Eye size={16} />
                        <span>Ver Detalhes do Projeto</span>
                      </button>

                      {mobileSelectedProject.githubUrl && (
                        <a 
                          href={mobileSelectedProject.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full py-3 bg-white/5 border border-white/10 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 active:scale-95 transition-transform"
                        >
                          <Github size={16} />
                          <span>Ver Código no GitHub</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </>,
              document.body
            )}

          </div>
        ) : (
          /* Visão Detalhada Interna dos Apps */
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