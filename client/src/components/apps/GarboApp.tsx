import { ExternalLink, Github, Server, Database, Shield, Upload, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

const techStack = [
  { icon: Server, label: "Spring Boot", desc: "Backend robusto com Java 21" },
  { icon: Database, label: "PostgreSQL", desc: "Banco relacional + Flyway" },
  { icon: Shield, label: "Spring Security", desc: "JWT Auth + Role-based" },
  { icon: Upload, label: "MinIO / S3", desc: "Storage de imagens/vídeos" },
];

const features = [
  "Gestão completa de projetos de arquitetura",
  "Upload e gerenciamento de imagens/vídeos via MinIO",
  "Painel administrativo com autenticação JWT",
  "CRUD de clientes com área privada",
  "API RESTful documentada com Swagger/OpenAPI",
  "Frontend React com Swiper e galeria interativa",
  "Docker Compose para ambiente completo",
];

const galleryScreens = [
  {
    title: "Dashboard Admin",
    image: "/assets/garbo-admin.png",
  },
  {
    title: "Galeria de Projetos",
    image: "/assets/garbo-galeria.png",
  },
  {
    title: "Upload de Mídia",
    image: "/assets/garbo-upload.png",
  },
  {
    title: "Área do Cliente",
    image: "/assets/garbo-area.png",
  },
];

export default function GarboApp() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => setCurrentSlide(prev => (prev + 1) % galleryScreens.length);
  const prevSlide = () => setCurrentSlide(prev => (prev - 1 + galleryScreens.length) % galleryScreens.length);

  return (
    <div className="h-full overflow-y-auto">
      {/* Hero com gradiente Laranja/Âmbar */}
      <div className="relative p-6 bg-gradient-to-br from-orange-500/10 via-amber-500/5 to-transparent border-b border-border/30">
        <div className="flex items-center gap-4">
          
          <div className="w-16 h-16 rounded-xl bg-[#111111] flex items-center justify-center shadow-lg overflow-hidden border border-border/20 shrink-0">
            <img 
              src="/assets/garbo-logo.jpg" 
              alt="Logótipo Garbo" 
              className="w-full h-full object-contain"
            />
          </div>

          <div>
            <h1 className="text-lg font-bold text-foreground">Garbo Arquitetura e Planejados</h1>
            <p className="text-xs text-orange-500 font-medium">Sistema completo para escritório de arquitetura</p>
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-3 leading-relaxed max-w-lg">
          Plataforma fullstack desenvolvida para um escritório de arquitetura real, 
          com gestão de projetos, clientes, upload de mídia e painel administrativo seguro.
        </p>
        
        {/* Botões Laranjas */}
        <div className="flex gap-2 mt-4">
          <a
            href="https://garbo-arquitetura-planejados.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-orange-500 text-white text-xs font-medium hover:bg-orange-600 transition-colors shadow-sm"
          >
            <ExternalLink size={12} />
            <span>Acessar Sistema</span>
          </a>
          <a
            href="https://github.com/fakezindev/garbo-ambientes-planejados"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-orange-500/10 border border-orange-500/30 text-orange-500 hover:bg-orange-500/20 transition-colors"
          >
            <Github size={12} />
            <span>Ver Código</span>
          </a>
        </div>
      </div>

      {/* Gallery */}
      <div className="p-5">
        <h2 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
          Screenshots do Sistema
        </h2>
        <div className="relative rounded-xl border border-border/30 overflow-hidden bg-[oklch(0.1_0.01_260)]">
          {/* Browser chrome */}
          <div className="h-7 bg-[oklch(0.14_0.01_260)] flex items-center px-3 gap-1.5 border-b border-border/20 z-10 relative">
            <div className="w-2.5 h-2.5 rounded-full bg-red-400/60" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/60" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-400/60" />
            <div className="flex-1 mx-3 h-4 rounded bg-[oklch(0.2_0.01_260)] flex items-center px-2">
              <span className="text-[8px] text-muted-foreground/50 font-mono">garboarqplan.com</span>
            </div>
          </div>
          
          {/* Imagem com aspect-video */}
          <div className="w-full min-h-[280px] sm:min-h-[320px] aspect-[16/10] bg-[#050505] relative flex items-center justify-center group p-2">
            <span className="absolute text-xs opacity-20 font-mono text-green-500">Carregando interface...</span>
            <img 
              src={galleryScreens[currentSlide].image} 
              alt={galleryScreens[currentSlide].title}
              // O object-contain é a mágica aqui: ele ajusta a imagem para caber 100% na tela sem cortar nada
              className="w-full h-full object-contain relative z-10"
            />
            {/* Overlay mantido, mas ajustado para não escurecer demais o centro do print */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent pointer-events-none z-20" />
          </div>

          {/* Navigation */}
          <div className="absolute bottom-2 left-0 right-0 flex items-center justify-center gap-2 z-20">
            <button
              onClick={prevSlide}
              className="w-6 h-6 rounded-full bg-black/60 backdrop-blur flex items-center justify-center hover:bg-black/80 transition-colors border border-white/10"
            >
              <ChevronLeft size={12} className="text-white" />
            </button>
            <div className="flex gap-1">
              {galleryScreens.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  /* Bolinha laranja para indicar o slide ativo */
                  className={`w-1.5 h-1.5 rounded-full transition-colors ${i === currentSlide ? "bg-orange-500 w-3" : "bg-white/50"}`}
                />
              ))}
            </div>
            <button
              onClick={nextSlide}
              className="w-6 h-6 rounded-full bg-black/60 backdrop-blur flex items-center justify-center hover:bg-black/80 transition-colors border border-white/10"
            >
              <ChevronRight size={12} className="text-white" />
            </button>
          </div>
          
          <div className="absolute top-9 right-2 px-2 py-1 rounded bg-black/60 backdrop-blur border border-white/10 z-20">
            <span className="text-[10px] font-medium text-white/90">{galleryScreens[currentSlide].title}</span>
          </div>
        </div>
      </div>

      {/* Tech Stack */}
      <div className="px-5">
        <h2 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
          Stack Técnica
        </h2>
        <div className="grid grid-cols-2 gap-2">
          {techStack.map(tech => (
            <div key={tech.label} className="p-3 rounded-lg bg-secondary/40 border border-border/20">
              <div className="flex items-center gap-2 mb-1">
                {/* Ícones da tech stack em laranja */}
                <tech.icon size={14} className="text-orange-500" />
                <span className="text-xs font-medium text-foreground">{tech.label}</span>
              </div>
              <p className="text-[10px] text-muted-foreground">{tech.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <div className="p-5">
        <h2 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-orange-400" />
          Funcionalidades
        </h2>
        <div className="space-y-2">
          {features.map((feature, i) => (
            <div key={i} className="flex items-start gap-2">
              {/* Pontos da lista em laranja */}
              <span className="w-1 h-1 rounded-full bg-orange-500 mt-1.5 shrink-0" />
              <span className="text-xs text-muted-foreground">{feature}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}