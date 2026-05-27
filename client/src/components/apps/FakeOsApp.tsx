import { ExternalLink, Github, Code2, Zap, Layout, Terminal, AppWindow, MousePointerClick, Maximize2 } from "lucide-react";
import { useState } from "react";

const techStack = [
  { icon: Code2, label: "React & TypeScript", desc: "Hooks, estado e tipagem forte" },
  { icon: Zap, label: "Vite", desc: "Build tool ultra-rápido (HMR)" },
  { icon: Layout, label: "Tailwind CSS", desc: "Estilização utilitária e temas" },
  { icon: MousePointerClick, label: "Lucide React", desc: "Ícones vetoriais consistentes" },
];

const features = [
  "Sistema de janelas com suporte a arrastar, maximizar, minimizar e fechar",
  "Gerenciador de estado global para múltiplas aplicações rodando simultaneamente",
  "Desktop interativo com ícones de atalho e duplo-clique simulado",
  "Barra de tarefas funcional e Menu Iniciar customizado",
  "Explorador de arquivos realístico com navegação em árvore",
  "Arquitetura modular: cada 'App' é um componente React isolado",
  "Design responsivo que se adapta a telas mobile mantendo a experiência",
];

// Gallery mockup screens representing the OS features
const galleryScreens = [
  {
    title: "Área de Trabalho",
    content: (
      <div className="w-full h-full bg-gradient-to-br from-slate-900 to-sky-900 relative p-2 flex flex-col">
        <div className="flex-1 flex gap-2">
          {/* Desktop Icons */}
          <div className="space-y-3 w-10">
            <div className="flex flex-col items-center gap-1">
              <div className="w-6 h-6 rounded bg-sky-500/40 shadow" />
              <div className="h-1 w-8 rounded bg-white/40" />
            </div>
            <div className="flex flex-col items-center gap-1">
              <div className="w-6 h-6 rounded bg-amber-500/40 shadow" />
              <div className="h-1 w-6 rounded bg-white/40" />
            </div>
          </div>
        </div>
        {/* Taskbar */}
        <div className="h-5 rounded-md bg-black/60 backdrop-blur-md border border-white/10 flex items-center px-2 gap-2 mt-auto">
          <div className="w-4 h-4 rounded-sm bg-sky-500/80" />
          <div className="h-3 w-12 rounded bg-white/20" />
          <div className="h-3 w-8 rounded bg-white/10" />
          <div className="ml-auto h-3 w-10 rounded bg-white/20" />
        </div>
      </div>
    ),
  },
  {
    title: "Window Manager",
    content: (
      <div className="w-full h-full bg-slate-900 relative p-3">
        {/* Window 1 (Background) */}
        <div className="absolute top-2 left-2 w-32 h-24 rounded-lg bg-slate-800 border border-slate-700 shadow-xl opacity-80">
          <div className="h-4 bg-slate-900 rounded-t-lg flex items-center px-1.5 gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-slate-600" />
            <div className="w-1.5 h-1.5 rounded-full bg-slate-600" />
            <div className="w-1.5 h-1.5 rounded-full bg-slate-600" />
          </div>
          <div className="p-2 space-y-1">
            <div className="h-2 w-16 rounded bg-slate-700" />
            <div className="h-2 w-12 rounded bg-slate-700" />
          </div>
        </div>
        {/* Window 2 (Foreground) */}
        <div className="absolute top-6 left-12 w-40 h-28 rounded-lg bg-[oklch(0.14_0.01_260)] border border-sky-400/30 shadow-2xl z-10 flex flex-col">
          <div className="h-5 bg-sky-400/20 rounded-t-lg flex items-center px-2 gap-1.5">
            <div className="w-2 h-2 rounded-full bg-red-400" />
            <div className="w-2 h-2 rounded-full bg-yellow-400" />
            <div className="w-2 h-2 rounded-full bg-green-400" />
            <div className="ml-2 h-1.5 w-12 rounded bg-sky-400/30" />
          </div>
          <div className="p-2 flex-1 flex flex-col gap-1.5">
            <div className="h-6 w-full rounded bg-sky-400/10 border border-sky-400/20" />
            <div className="h-8 w-full rounded bg-sky-400/10 border border-sky-400/20 mt-auto" />
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "Terminal Embutido",
    content: (
      <div className="w-full h-full bg-slate-900 p-2">
        <div className="w-full h-full rounded border border-slate-700 bg-black p-2 font-mono flex flex-col gap-1.5 shadow-inner">
          <div className="flex gap-2 items-center">
            <span className="text-[8px] text-sky-400">fakeos@bruno:~$</span>
            <div className="h-1.5 w-16 bg-white/80 rounded-sm" />
          </div>
          <div className="flex gap-2 items-center">
            <span className="text-[8px] text-blue-400">[info]</span>
            <div className="h-1 w-24 bg-slate-400 rounded-sm" />
          </div>
          <div className="flex gap-2 items-center">
            <span className="text-[8px] text-sky-400">fakeos@bruno:~$</span>
            <div className="w-1.5 h-2.5 bg-white animate-pulse" />
          </div>
        </div>
      </div>
    ),
  },
];

export default function FakeOSApp() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => setCurrentSlide(prev => (prev + 1) % galleryScreens.length);
  const prevSlide = () => setCurrentSlide(prev => (prev - 1 + galleryScreens.length) % galleryScreens.length);

  return (
    <div className="h-full overflow-y-auto bg-background text-foreground animate-in fade-in duration-300">
      {/* Hero Alterado para o gradiente de Sky-400 */}
      <div className="relative p-6 bg-gradient-to-br from-sky-400/15 via-sky-400/5 to-transparent border-b border-border/30">
        <div className="flex items-center gap-4">
          {/* Caixa da logo com degradê mais vivo e claro */}
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-sky-400 to-blue-500 flex items-center justify-center shadow-lg shadow-sky-500/10">
            <AppWindow size={28} className="text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-foreground">FakeOS Portfólio</h1>
            <p className="text-xs text-sky-400 font-medium">Experiência web simulando um Sistema Operacional</p>
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-3 leading-relaxed max-w-lg">
          O projeto que você está usando agora! Um portfólio interativo construído do zero para demonstrar 
          habilidades avançadas em React, gestão de estado complexa e design de interfaces inovadoras, fugindo do padrão tradicional de scroll vertical.
        </p>
        <div className="flex gap-2 mt-4">
          <a
            href="https://github.com/fakezindev/fakeos"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-400/10 border border-sky-400/30 text-xs text-sky-400 hover:bg-sky-400/20 transition-colors"
          >
            <Github size={12} />
            <span>Ver Repositório</span>
          </a>
        </div>
      </div>

      {/* Gallery com tamanho ajustado proporcionalmente */}
      <div className="p-5">
        <h2 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
          Interface e Funcionalidades
        </h2>
        <div className="relative rounded-xl border border-border/30 overflow-hidden bg-[oklch(0.1_0.01_260)] shadow-sm">
          {/* Window Chrome */}
          <div className="h-7 bg-secondary/80 flex items-center px-3 gap-1.5 border-b border-border/20">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
            <div className="flex-1 mx-3 flex justify-center">
              <span className="text-[9px] text-muted-foreground font-medium select-none">fakeos-preview.exe</span>
            </div>
          </div>
          
          {/* Caixa adaptada para aspect-video */}
          <div className="w-full aspect-video max-h-56">
            {galleryScreens[currentSlide].content}
          </div>
          
          {/* Navigation baseada em sky-400 */}
          <div className="absolute bottom-2 left-0 right-0 flex items-center justify-center gap-2 z-20">
            <button
              onClick={prevSlide}
              className="w-6 h-6 rounded-full bg-black/50 backdrop-blur flex items-center justify-center hover:bg-black/80 transition-colors border border-white/10"
            >
              <span className="text-white text-[10px]">{"<"}</span>
            </button>
            <div className="flex gap-1.5">
              {galleryScreens.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  className={`w-1.5 h-1.5 rounded-full transition-all ${i === currentSlide ? "bg-sky-400 w-3" : "bg-white/40"}`}
                />
              ))}
            </div>
            <button
              onClick={nextSlide}
              className="w-6 h-6 rounded-full bg-black/50 backdrop-blur flex items-center justify-center hover:bg-black/80 transition-colors border border-white/10"
            >
              <span className="text-white text-[10px]">{">"}</span>
            </button>
          </div>
          
          {/* Title */}
          <div className="absolute top-9 right-2 px-2.5 py-1 rounded-md bg-black/60 backdrop-blur border border-white/10 shadow-lg z-20">
            <span className="text-[10px] font-medium text-white/90">{galleryScreens[currentSlide].title}</span>
          </div>
        </div>
      </div>

      {/* Tech Stack */}
      <div className="px-5">
        <h2 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
          Tecnologias Core
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {techStack.map(tech => (
            <div key={tech.label} className="p-3 rounded-xl bg-secondary/40 border border-border/20 hover:border-sky-400/30 transition-colors">
              <div className="flex items-center gap-2 mb-1.5">
                <tech.icon size={16} className="text-sky-400" />
                <span className="text-xs font-semibold text-foreground">{tech.label}</span>
              </div>
              <p className="text-[10px] text-muted-foreground leading-relaxed">{tech.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <div className="p-5">
        <h2 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
          Destaques Técnicos
        </h2>
        <div className="space-y-2.5 p-4 rounded-xl bg-secondary/20 border border-border/10">
          {features.map((feature, i) => (
            <div key={i} className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-sm bg-sky-400/70 mt-1 shrink-0" />
              <span className="text-xs text-muted-foreground leading-relaxed">{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}