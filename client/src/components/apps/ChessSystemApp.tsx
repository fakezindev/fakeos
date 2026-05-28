import { Github, Terminal, Layers, ShieldAlert, Cpu, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { useState, useRef } from "react";
import { ChessLogo } from "./ChessLogo";

const techStack = [
  { icon: Terminal, label: "Java Puro", desc: "Lógica implementada 100% no core Java" },
  { icon: Layers, label: "Arquitetura em Camadas", desc: "Board, Chess e UI bem definidos" },
  { icon: Cpu, label: "POO Avançada", desc: "Polimorfismo, Herança e Encapsulamento" },
  { icon: ShieldAlert, label: "Tratamento de Erros", desc: "Exceções personalizadas de domínio" },
];

const features = [
  "Desenvolvimento focado 100% em Programação Orientada a Objetos",
  "Lógica rigorosa de movimentação, colisões e validações de peças",
  "Implementação avançada de Xeque, Xeque-Mate e movimentos especiais (Roque, En Passant)",
  "Separação clara entre a matriz do tabuleiro e a camada de regras de xadrez",
  "Evolução do terminal para uma Landing Page de demonstração interativa",
];

const galleryScreens = [
  {
    title: "Demonstração Web",
    image: "/assets/chess-web1.png", 
  },
  {
    title: "Mecânicas de Jogo",
    image: "/assets/chess-web2.png", 
  },
  {
    title: "Console Original",
    image: "/assets/chess-console.png", 
  },
];

export default function ChessSystemApp() {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Guarda a posição horizontal inicial do dedo na tela
  const touchStartX = useRef<number | null>(null);

  const nextSlide = () => setCurrentSlide(prev => (prev + 1) % galleryScreens.length);
  const prevSlide = () => setCurrentSlide(prev => (prev - 1 + galleryScreens.length) % galleryScreens.length);

  // Captura o momento do toque inicial
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  // Calcula a distância do arrasto ao levantar o dedo
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;

    const touchEndX = e.changedTouches[0].clientX;
    const diffX = touchStartX.current - touchEndX;

    // Se o arrasto for maior que 50px, muda de slide (evita toques acidentais no scroll)
    if (diffX > 50) {
      nextSlide(); // Deslizou para a esquerda -> Próximo
    } else if (diffX < -50) {
      prevSlide(); // Deslizou para a direita -> Anterior
    }

    touchStartX.current = null;
  };

  return (
    <div className="h-full overflow-y-auto bg-background">
      {/* Hero */}
      <div className="relative p-6 bg-gradient-to-br from-green-500/10 via-emerald-500/5 to-transparent border-b border-border/30">
        <div className="flex items-center gap-4">
          
          {/* SUA LOGO NEON DO XADREZ AQUI */}
          <div className="shrink-0 scale-110">
            <ChessLogo />
          </div>

          <div>
            <h1 className="text-lg font-bold text-foreground">Chess System Java</h1>
            <p className="text-xs text-green-500 font-medium">Motor de Xadrez & Demonstração Web</p>
          </div>
        </div>
        
        {/* NOVA NARRATIVA AQUI */}
        <p className="text-xs text-muted-foreground mt-3 leading-relaxed max-w-lg">
          Este projeto começou como um clássico jogo de xadrez executado no terminal, focado na aplicação rigorosa de Programação Orientada a Objetos em Java. <strong>Porém, decidi ir além:</strong> desenvolvi uma Landing Page dedicada para demonstrar o sistema de forma visual, tornando a arquitetura complexa do backend acessível diretamente pelo navegador.
        </p>
        
        {/* BOTÕES ATUALIZADOS */}
        <div className="flex gap-2 mt-4">
          <a
            href="https://fakezindev.github.io/chess-system-java/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-green-500 text-white text-xs font-medium hover:bg-green-600 transition-colors shadow-sm"
          >
            <ExternalLink size={14} />
            <span>Acessar Demonstração</span>
          </a>
          <a
            href="https://github.com/fakezindev/chess-system-java"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-green-500/10 border border-green-500/30 text-green-500 hover:bg-green-500/20 transition-colors"
          >
            <Github size={14} />
            <span>Repositório</span>
          </a>
        </div>
      </div>

      {/* Gallery com Suporte a Swipe Mobile */}
      <div className="p-5">
        <h2 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
          Interface e Terminal
        </h2>
        
        {/* Injetados os eventos de Touch e a classe touch-pan-y */}
        <div 
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="relative rounded-xl border border-border/30 overflow-hidden bg-[#0c0c0c] touch-pan-y select-none"
        >
          <div className="h-7 bg-[#1a1a1a] flex items-center px-3 gap-1.5 border-b border-white/5 z-10 relative">
            <div className="w-2.5 h-2.5 rounded-full bg-slate-600" />
            <div className="w-2.5 h-2.5 rounded-full bg-slate-600" />
            <div className="w-2.5 h-2.5 rounded-full bg-slate-600" />
            <div className="flex-1 mx-3 flex items-center px-2 h-4 rounded bg-black/40">
              <span className="text-[9px] text-slate-400 font-mono truncate">fakezindev.github.io/chess-system</span>
            </div>
          </div>
          
          {/* Área da Imagem */}
          <div className="w-full min-h-[280px] sm:min-h-[320px] aspect-[16/10] bg-[#050505] relative flex items-center justify-center group p-2">
            <span className="absolute text-xs opacity-20 font-mono text-green-500">Carregando interface...</span>
            <img 
              key={currentSlide} // Reseta a animação do Tailwind a cada mudança
              src={galleryScreens[currentSlide].image} 
              alt={galleryScreens[currentSlide].title}
              className="w-full h-full object-contain relative z-10 animate-in fade-in duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent pointer-events-none z-20" />
          </div>

          {/* Navigation - Botões ocultados no mobile via hidden md:flex */}
          <div className="absolute bottom-2 left-0 right-0 flex items-center justify-center gap-2 z-30">
            <button
              onClick={prevSlide}
              className="w-6 h-6 rounded-full bg-white/10 backdrop-blur hidden md:flex items-center justify-center hover:bg-white/20 transition-colors border border-white/10"
            >
              <ChevronLeft size={12} className="text-white" />
            </button>
            <div className="flex gap-1.5">
              {galleryScreens.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${i === currentSlide ? "bg-green-400 w-4" : "bg-white/30 w-1.5"}`}
                />
              ))}
            </div>
            <button
              onClick={nextSlide}
              className="w-6 h-6 rounded-full bg-white/10 backdrop-blur hidden md:flex items-center justify-center hover:bg-white/20 transition-colors border border-white/10"
            >
              <ChevronRight size={12} className="text-white" />
            </button>
          </div>
          
          <div className="absolute top-9 right-2 px-2 py-1 rounded bg-black/80 backdrop-blur border border-white/10 z-30">
            <span className="text-[10px] font-mono text-green-400">{galleryScreens[currentSlide].title}</span>
          </div>
        </div>
      </div>

      {/* Tech Stack */}
      <div className="px-5">
        <h2 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
          Conceitos Aplicados
        </h2>
        <div className="grid grid-cols-2 gap-2">
          {techStack.map(tech => (
            <div key={tech.label} className="p-3 rounded-lg bg-secondary/20 border border-border/10 hover:bg-secondary/40 transition-colors">
              <div className="flex items-center gap-2 mb-1">
                <tech.icon size={14} className="text-foreground" />
                <span className="text-xs font-medium text-foreground">{tech.label}</span>
              </div>
              <p className="text-[10px] text-muted-foreground">{tech.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <div className="p-5 pb-8">
        <h2 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
          Mecânicas do Jogo
        </h2>
        <div className="space-y-2 bg-secondary/10 p-4 rounded-xl border border-border/10">
          {features.map((feature, i) => (
            <div key={i} className="flex items-start gap-2">
              <span className="text-green-500 font-mono mt-0.5 shrink-0">{">"}</span>
              <span className="text-xs text-muted-foreground">{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}