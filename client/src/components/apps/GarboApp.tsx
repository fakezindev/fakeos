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

// Gallery mockup screens representing different parts of the app
const galleryScreens = [
  {
    title: "Dashboard Admin",
    content: (
      <div className="w-full h-full bg-[oklch(0.12_0.01_40)] p-3">
        <div className="h-4 w-24 rounded bg-amber-500/20 mb-3" />
        <div className="grid grid-cols-3 gap-2 mb-3">
          <div className="h-12 rounded-lg bg-amber-500/10 border border-amber-500/15 p-2">
            <div className="h-2 w-8 rounded bg-amber-400/30 mb-1" />
            <div className="h-4 w-6 rounded bg-amber-400/20" />
          </div>
          <div className="h-12 rounded-lg bg-green-500/10 border border-green-500/15 p-2">
            <div className="h-2 w-8 rounded bg-green-400/30 mb-1" />
            <div className="h-4 w-6 rounded bg-green-400/20" />
          </div>
          <div className="h-12 rounded-lg bg-blue-500/10 border border-blue-500/15 p-2">
            <div className="h-2 w-8 rounded bg-blue-400/30 mb-1" />
            <div className="h-4 w-6 rounded bg-blue-400/20" />
          </div>
        </div>
        <div className="space-y-1.5">
          <div className="h-6 rounded bg-amber-500/5 border border-amber-500/10" />
          <div className="h-6 rounded bg-amber-500/5 border border-amber-500/10" />
          <div className="h-6 rounded bg-amber-500/5 border border-amber-500/10" />
        </div>
      </div>
    ),
  },
  {
    title: "Galeria de Projetos",
    content: (
      <div className="w-full h-full bg-[oklch(0.12_0.01_40)] p-3">
        <div className="h-4 w-28 rounded bg-amber-500/20 mb-3" />
        <div className="grid grid-cols-2 gap-2">
          <div className="h-16 rounded-lg bg-gradient-to-br from-amber-800/30 to-orange-800/20 border border-amber-500/15" />
          <div className="h-16 rounded-lg bg-gradient-to-br from-amber-800/20 to-yellow-800/20 border border-amber-500/15" />
          <div className="h-16 rounded-lg bg-gradient-to-br from-orange-800/20 to-red-800/20 border border-amber-500/15" />
          <div className="h-16 rounded-lg bg-gradient-to-br from-yellow-800/20 to-amber-800/20 border border-amber-500/15" />
        </div>
      </div>
    ),
  },
  {
    title: "Upload de Mídia",
    content: (
      <div className="w-full h-full bg-[oklch(0.12_0.01_40)] p-3">
        <div className="h-4 w-20 rounded bg-amber-500/20 mb-3" />
        <div className="h-20 rounded-xl border-2 border-dashed border-amber-500/30 flex flex-col items-center justify-center gap-2">
          <Upload size={20} className="text-amber-500/40" />
          <div className="h-2 w-24 rounded bg-amber-500/15" />
          <div className="h-2 w-16 rounded bg-amber-500/10" />
        </div>
        <div className="mt-3 space-y-1.5">
          <div className="h-5 rounded bg-amber-500/5 border border-amber-500/10 flex items-center px-2 gap-2">
            <div className="w-3 h-3 rounded bg-green-500/30" />
            <div className="h-1.5 w-16 rounded bg-amber-500/15" />
          </div>
          <div className="h-5 rounded bg-amber-500/5 border border-amber-500/10 flex items-center px-2 gap-2">
            <div className="w-3 h-3 rounded bg-green-500/30" />
            <div className="h-1.5 w-20 rounded bg-amber-500/15" />
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "API Swagger",
    content: (
      <div className="w-full h-full bg-[oklch(0.12_0.01_40)] p-3">
        <div className="flex items-center gap-2 mb-3">
          <div className="h-4 w-4 rounded bg-green-500/30" />
          <div className="h-3 w-20 rounded bg-amber-500/20" />
        </div>
        <div className="space-y-2">
          <div className="h-7 rounded bg-green-500/10 border border-green-500/20 flex items-center px-2 gap-2">
            <span className="text-[8px] font-mono text-green-400/80">GET</span>
            <div className="h-1.5 w-24 rounded bg-green-500/15" />
          </div>
          <div className="h-7 rounded bg-blue-500/10 border border-blue-500/20 flex items-center px-2 gap-2">
            <span className="text-[8px] font-mono text-blue-400/80">POST</span>
            <div className="h-1.5 w-20 rounded bg-blue-500/15" />
          </div>
          <div className="h-7 rounded bg-amber-500/10 border border-amber-500/20 flex items-center px-2 gap-2">
            <span className="text-[8px] font-mono text-amber-400/80">PUT</span>
            <div className="h-1.5 w-22 rounded bg-amber-500/15" />
          </div>
          <div className="h-7 rounded bg-red-500/10 border border-red-500/20 flex items-center px-2 gap-2">
            <span className="text-[8px] font-mono text-red-400/80">DEL</span>
            <div className="h-1.5 w-18 rounded bg-red-500/15" />
          </div>
        </div>
      </div>
    ),
  },
];

export default function GarboApp() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => setCurrentSlide(prev => (prev + 1) % galleryScreens.length);
  const prevSlide = () => setCurrentSlide(prev => (prev - 1 + galleryScreens.length) % galleryScreens.length);

  return (
    <div className="h-full overflow-y-auto">
      {/* Hero */}
      <div className="relative p-6 bg-gradient-to-br from-primary/10 via-accent/5 to-transparent border-b border-border/30">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg">
            <span className="text-2xl">🏠</span>
          </div>
          <div>
            <h1 className="text-lg font-bold text-foreground">Garbo Ambientes Planejados</h1>
            <p className="text-xs text-primary font-medium">Sistema completo para escritório de arquitetura</p>
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-3 leading-relaxed max-w-lg">
          Plataforma fullstack desenvolvida para um escritório de arquitetura real, 
          com gestão de projetos, clientes, upload de mídia e painel administrativo seguro.
        </p>
        <div className="flex gap-2 mt-4">
          <a
            href="https://github.com/fakezindev/garbo-ambientes-planejados"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/10 border border-primary/30 text-xs text-primary hover:bg-primary/20 transition-colors"
          >
            <Github size={12} />
            <span>Ver Código</span>
          </a>
        </div>
      </div>

      {/* Gallery */}
      <div className="p-5">
        <h2 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
          Screenshots do Sistema
        </h2>
        <div className="relative rounded-xl border border-border/30 overflow-hidden bg-[oklch(0.1_0.01_260)]">
          {/* Browser chrome */}
          <div className="h-7 bg-[oklch(0.14_0.01_260)] flex items-center px-3 gap-1.5 border-b border-border/20">
            <div className="w-2.5 h-2.5 rounded-full bg-red-400/60" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/60" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-400/60" />
            <div className="flex-1 mx-3 h-4 rounded bg-[oklch(0.2_0.01_260)] flex items-center px-2">
              <span className="text-[8px] text-muted-foreground/50 font-mono">garbo-ambientes.com</span>
            </div>
          </div>
          {/* Screen content */}
          <div className="h-36">
            {galleryScreens[currentSlide].content}
          </div>
          {/* Navigation */}
          <div className="absolute bottom-2 left-0 right-0 flex items-center justify-center gap-2">
            <button
              onClick={prevSlide}
              className="w-6 h-6 rounded-full bg-black/40 backdrop-blur flex items-center justify-center hover:bg-black/60 transition-colors"
            >
              <ChevronLeft size={12} className="text-white" />
            </button>
            <div className="flex gap-1">
              {galleryScreens.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  className={`w-1.5 h-1.5 rounded-full transition-colors ${i === currentSlide ? "bg-primary" : "bg-white/30"}`}
                />
              ))}
            </div>
            <button
              onClick={nextSlide}
              className="w-6 h-6 rounded-full bg-black/40 backdrop-blur flex items-center justify-center hover:bg-black/60 transition-colors"
            >
              <ChevronRight size={12} className="text-white" />
            </button>
          </div>
          {/* Title */}
          <div className="absolute top-9 right-2 px-2 py-0.5 rounded bg-black/40 backdrop-blur">
            <span className="text-[9px] text-white/80">{galleryScreens[currentSlide].title}</span>
          </div>
        </div>
      </div>

      {/* Tech Stack */}
      <div className="px-5">
        <h2 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-accent" />
          Stack Técnica
        </h2>
        <div className="grid grid-cols-2 gap-2">
          {techStack.map(tech => (
            <div key={tech.label} className="p-3 rounded-lg bg-secondary/40 border border-border/20">
              <div className="flex items-center gap-2 mb-1">
                <tech.icon size={14} className="text-primary" />
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
          <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
          Funcionalidades
        </h2>
        <div className="space-y-2">
          {features.map((feature, i) => (
            <div key={i} className="flex items-start gap-2">
              <span className="w-1 h-1 rounded-full bg-primary/60 mt-1.5 shrink-0" />
              <span className="text-xs text-muted-foreground">{feature}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Architecture diagram */}
      <div className="px-5 pb-6">
        <h2 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-orange-400" />
          Arquitetura
        </h2>
        <div className="p-4 rounded-xl bg-secondary/30 border border-border/20 font-mono text-[10px] text-muted-foreground leading-relaxed">
          <pre>{`┌─────────────┐     ┌──────────────┐     ┌─────────┐
│  React/Vite │────▶│ Spring Boot  │────▶│PostgreSQL│
│  Frontend   │     │   REST API   │     │   DB    │
└─────────────┘     └──────┬───────┘     └─────────┘
                           │
                    ┌──────▼───────┐
                    │  MinIO / S3  │
                    │   Storage    │
                    └──────────────┘`}</pre>
        </div>
      </div>
    </div>
  );
}
