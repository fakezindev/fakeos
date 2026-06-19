import { useState, useRef } from "react";
import { 
  Globe, 
  Github, 
  Cpu, 
  ShieldCheck, 
  Mail, 
  PhoneCall, 
  ChevronLeft, 
  ChevronRight, 
  ExternalLink,
  Code2
} from "lucide-react";

const techStack = [
  { icon: Code2, label: "Node.js & Express", desc: "API REST typesafe e roteamento do microsserviço" },
  { icon: Globe, label: "HTML, CSS & JS Puro", desc: "Landing page corporativa de alto padrão e totalmente responsiva" },
  { icon: Mail, label: "Nodemailer", desc: "Mecanismo de disparo de e-mails automatizados" },
  { icon: ShieldCheck, label: "Express Rate Limit", desc: "Segurança anti-spam baseada em IP" },
];

const projectHighlights = [
  { role: "Backend (Meu Foco)", desc: "Desenvolvimento do microsserviço REST de captura de leads e integrações.", name: "Bruno" },
  { role: "Frontend", desc: "Construção da interface responsiva de alto padrão usando HTML, CSS e JavaScript puro.", name: "Paulo Henrique L. Matos" },
  { role: "WhatsApp Engine", desc: "Mecanismo dinâmico de conversão de leads por e-mail para contato direto.", name: "Funcionalidade" },
  { role: "Segurança & CORS", desc: "Tratamento de CORS no Express e rate-limiting contra abusos por IP.", name: "Proteção" },
];

const galleryScreens = [
  {
    title: "Página Inicial (Home)",
    image: "/assets/luxeform-home.png",
  },
  {
    title: "Formulário de Orçamento",
    image: "/assets/luxeform-form.png",
  },
  {
    title: "E-mail de Notificação",
    image: "/assets/luxeform-email.png",
  },
];

export default function LuxeformApp() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const nextSlide = () => setCurrentSlide(prev => (prev + 1) % galleryScreens.length);
  const prevSlide = () => setCurrentSlide(prev => (prev - 1 + galleryScreens.length) % galleryScreens.length);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;

    const touchEndX = e.changedTouches[0].clientX;
    const diffX = touchStartX.current - touchEndX;

    if (diffX > 50) {
      nextSlide();
    } else if (diffX < -50) {
      prevSlide();
    }

    touchStartX.current = null;
  };

  return (
    <div className="h-full overflow-y-auto bg-background">
      {/* Hero com gradiente Burgundy (Vinho) alinhado ao tema */}
      <div className="relative p-6 bg-gradient-to-br from-[#530711]/15 via-[#530711]/5 to-transparent border-b border-border/30">
        <div className="flex items-center gap-4">
          
          <div className="w-16 h-16 rounded-xl shadow-lg border border-border/20 shrink-0 overflow-hidden flex items-center justify-center bg-[#530711]/10 text-[#a61a2e]">
            <Globe size={32} />
          </div>

          <div>
            <h1 className="text-lg font-bold text-foreground">LuxeForm Remodeling</h1>
            <p className="text-xs text-[#a61a2e] font-medium">Landing Page & Lead Microservice</p>
          </div>
        </div>
        
        <p className="text-xs text-muted-foreground mt-3 leading-relaxed max-w-lg">
          Plataforma institucional corporativa desenvolvida para uma empresa de reformas residenciais na Flórida (EUA). 
          O sistema conta com uma interface estática de alto padrão e um microsserviço de backend focado na captação, 
          validação e conversão instantânea de leads comerciais em ações automatizadas de WhatsApp.
        </p>
        
        <div className="flex flex-wrap gap-2 mt-4">
          <a
            href="https://luxeformllcfl.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-[#530711] text-white text-xs font-medium hover:bg-[#6c0b19] transition-colors shadow-sm"
          >
            <ExternalLink size={14} />
            <span>Abrir Aplicação</span>
          </a>
          <a
            href="https://github.com/fakezindev/luxeform-front"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs font-medium hover:bg-zinc-800 transition-colors shadow-sm"
          >
            <Github size={14} />
            <span>Repositório</span>
          </a>
        </div>
      </div>

      {/* Gallery com suporte a Swipe Mobile */}
      <div className="p-5">
        <h2 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#a61a2e]" />
          Capturas da Aplicação
        </h2>
        
        <div 
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="relative rounded-xl border border-border/30 overflow-hidden bg-[#0c0c0c] touch-pan-y select-none"
        >
          
          {/* Fake Window Header */}
          <div className="h-7 bg-[#1a1a1a] flex items-center px-3 gap-1.5 border-b border-white/5 z-10 relative">
            <div className="w-2.5 h-2.5 rounded-full bg-red-400/60" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/60" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-400/60" />
            <div className="flex-1 mx-3 flex items-center px-2 h-4 rounded bg-black/40">
              <span className="text-[9px] text-slate-400 font-mono">http://luxeformllcfl.com</span>
            </div>
          </div>
          
          {/* Área da Imagem */}
          <div className="w-full min-h-[280px] sm:min-h-[320px] aspect-[16/10] bg-[#050505] relative flex items-center justify-center group p-2">
            <span className="absolute text-xs opacity-20 font-mono text-[#a61a2e]">Carregando interface...</span>
            <img 
              key={currentSlide}
              src={galleryScreens[currentSlide].image} 
              alt={galleryScreens[currentSlide].title}
              className="w-full h-full object-contain relative z-10 animate-in fade-in duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/5 to-transparent pointer-events-none z-20" />
          </div>

          {/* Navigation */}
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
                  className={`h-1.5 rounded-full transition-all duration-300 ${i === currentSlide ? "bg-[#a61a2e] w-4" : "bg-white/30 w-1.5"}`}
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
            <span className="text-[10px] font-mono text-[#a61a2e]">{galleryScreens[currentSlide].title}</span>
          </div>
        </div>
      </div>

      {/* Destaques Técnicos */}
      <div className="px-5 pb-2">
        <h2 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#a61a2e]" />
          Destaques Técnicos e Minha Atuação
        </h2>
        <div className="space-y-2 bg-secondary/10 p-4 rounded-xl border border-border/10">
          {projectHighlights.map((item, i) => (
            <div key={i} className="flex flex-col mb-3 last:mb-0">
              <div className="flex items-center gap-2">
                <span className="text-[#a61a2e] font-bold text-xs">{item.role}:</span>
                <span className="text-xs text-foreground font-medium">{item.name}</span>
              </div>
              <p className="text-[10px] text-muted-foreground mt-0.5 ml-1 flex items-start gap-1">
                <span className="text-[#a61a2e]/50">└</span> {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Tech Stack */}
      <div className="p-5 pb-8">
        <h2 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#a61a2e]" />
          Stack Técnica
        </h2>
        <div className="grid grid-cols-2 gap-2">
          {techStack.map(tech => (
            <div key={tech.label} className="p-3 rounded-lg bg-secondary/20 border border-border/10 hover:bg-secondary/40 transition-colors">
              <div className="flex items-center gap-2 mb-1">
                <tech.icon size={14} className="text-[#a61a2e]" />
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