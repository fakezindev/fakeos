import { ExternalLink, Database, Users, MonitorSmartphone, Code2, ChevronLeft, ChevronRight, GitBranch } from "lucide-react";
import { useState, useRef } from "react";

const techStack = [
  { icon: Code2, label: "C# & .NET", desc: "Lógica de backend e regras de negócio" },
  { icon: MonitorSmartphone, label: "WPF & MVVM", desc: "Criação da interface desktop estruturada" },
  { icon: Database, label: "MySQL", desc: "Banco de dados relacional" },
  { icon: GitBranch, label: "Git", desc: "Versionamento e trabalho em equipe" },
];

const teamRoles = [
  { role: "Backend (Meu Foco)", desc: "Desenvolvimento da confecção de crachá e suporte geral ao backend.", name: "Bruno" },
  { role: "Frontend", desc: "Construção da interface e experiência da aplicação WPF.", name: "Paulo Henrique L. Matos" },
  { role: "Apoio Sênior", desc: "Mentoria e auxílio em diferentes etapas do desenvolvimento.", name: "Arthur Demétrio" },
  { role: "Apresentação Visual", desc: "Produção e edição do vídeo de apresentação do projeto.", name: "Isabelly & Larissah" },
];

const galleryScreens = [
  {
    title: "Apresentação do Sistema",
    image: "/assets/cracha-1.png",
  },
  {
    title: "Confecção de Crachá",
    image: "/assets/cracha-2.png", 
  },
  {
    title: "Interface Desktop",
    image: "/assets/cracha-3.png",
  },
  {
    title: "Certificado de Conclusão",
    image: "/assets/cracha-certificado.jpg", 
  },
];

export default function CrachaDesktopApp() {
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

    // Margem de tolerância: exige que arraste mais de 50px para evitar trocas acidentais
    if (diffX > 50) {
      nextSlide(); // Arrastou da direita para a esquerda -> Próximo
    } else if (diffX < -50) {
      prevSlide(); // Arrastou da esquerda para a direita -> Anterior
    }

    // Reseta o valor de controle
    touchStartX.current = null;
  };

  return (
    <div className="h-full overflow-y-auto bg-background">
      {/* Hero com gradiente Azul Royal alinhado à logo */}
      <div className="relative p-6 bg-gradient-to-br from-blue-600/15 via-blue-500/5 to-transparent border-b border-border/30">
        <div className="flex items-center gap-4">
          
          {/* Opção 1: Quadrado preenchido perfeitamente com overflow-hidden */}
          <div className="w-16 h-16 rounded-xl shadow-lg border border-border/20 shrink-0 overflow-hidden">
            <img 
              src="/assets/cracha-logo.png" 
              alt="Logótipo Cracha" 
              className="w-full h-full object-cover"
            />
          </div>

          <div>
            <h1 className="text-lg font-bold text-foreground">Sistema de Crachá Desktop</h1>
            <p className="text-xs text-blue-500 font-medium">Aplicação C# com WPF e Arquitetura MVVM</p>
          </div>
        </div>
        
        <p className="text-xs text-muted-foreground mt-3 leading-relaxed max-w-lg">
          Um projeto colaborativo muito importante para a minha evolução. Consiste num sistema desktop para confecção e gestão de crachás. 
          Pude aplicar na prática conceitos de arquitetura de software, organization de funcionalidades, manutenção de código e trabalho em equipa.
        </p>
        
        {/* BOTÃO DO LINKEDIN AGORA EM AZUL */}
        <div className="flex gap-2 mt-4">
          <a
            href="https://www.linkedin.com/feed/update/urn:li:activity:7450929951240970240/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-medium hover:bg-blue-700 transition-colors shadow-sm"
          >
            <ExternalLink size={14} />
            <span>Ver Post e Vídeo no LinkedIn</span>
          </a>
        </div>
      </div>

      {/* Gallery com suporte a Swipe Mobile */}
      <div className="p-5">
        <h2 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
          Capturas da Aplicação
        </h2>
        
        {/* Adicionados os escutadores de toque e a classe touch-pan-y */}
        <div 
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="relative rounded-xl border border-border/30 overflow-hidden bg-[#0c0c0c] touch-pan-y select-none"
        >
          
          {/* Fake Window Header PADRONIZADO com os outros apps */}
          <div className="h-7 bg-[#1a1a1a] flex items-center px-3 gap-1.5 border-b border-white/5 z-10 relative">
            <div className="w-2.5 h-2.5 rounded-full bg-red-400/60" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/60" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-400/60" />
            <div className="flex-1 mx-3 flex items-center px-2 h-4 rounded bg-black/40">
              <span className="text-[9px] text-slate-400 font-mono">CrachaDesktop.exe</span>
            </div>
          </div>
          
          {/* Área da Imagem */}
          <div className="w-full min-h-[280px] sm:min-h-[320px] aspect-[16/10] bg-[#050505] relative flex items-center justify-center group p-2">
            <span className="absolute text-xs opacity-20 font-mono text-blue-500">Carregando interface...</span>
            <img 
              key={currentSlide} // Força uma transição sutil de renderização ao mudar de slide
              src={galleryScreens[currentSlide].image} 
              alt={galleryScreens[currentSlide].title}
              className="w-full h-full object-contain relative z-10 animate-in fade-in duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/5 to-transparent pointer-events-none z-20" />
          </div>

          {/* Navigation - Botões de setas escondem em telas pequenas (mobile), deixando apenas os indicadores */}
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
                  className={`h-1.5 rounded-full transition-all duration-300 ${i === currentSlide ? "bg-blue-500 w-4" : "bg-white/30 w-1.5"}`}
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
            <span className="text-[10px] font-mono text-blue-400">{galleryScreens[currentSlide].title}</span>
          </div>
        </div>
      </div>

      {/* A Equipa e Responsabilidades */}
      <div className="px-5 pb-2">
        <h2 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
          O Time e Minha Atuação
        </h2>
        <div className="space-y-2 bg-secondary/10 p-4 rounded-xl border border-border/10">
          {teamRoles.map((item, i) => (
            <div key={i} className="flex flex-col mb-3 last:mb-0">
              <div className="flex items-center gap-2">
                <span className="text-blue-500 font-bold text-xs">{item.role}:</span>
                <span className="text-xs text-foreground font-medium">{item.name}</span>
              </div>
              <p className="text-[10px] text-muted-foreground mt-0.5 ml-1 flex items-start gap-1">
                <span className="text-blue-500/50">└</span> {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Tech Stack */}
      <div className="p-5 pb-8">
        <h2 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
          Stack Técnica
        </h2>
        <div className="grid grid-cols-2 gap-2">
          {techStack.map(tech => (
            <div key={tech.label} className="p-3 rounded-lg bg-secondary/20 border border-border/10 hover:bg-secondary/40 transition-colors">
              <div className="flex items-center gap-2 mb-1">
                <tech.icon size={14} className="text-blue-500" />
                <span className="text-xs font-medium text-foreground">{tech.label}</span>
              </div>
              <p className="text-[10px] text-muted-foreground">{tech.desc}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}