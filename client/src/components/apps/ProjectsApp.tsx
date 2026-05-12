import { ExternalLink, Github } from "lucide-react";

interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  highlight?: boolean;
  mockup: "garbo" | "fakeos";
}

const projects: Project[] = [
  {
    id: "garbo",
    title: "Garbo Ambientes Planejados",
    description: "Sistema completo para escritório de arquitetura com gestão de projetos, clientes, upload de mídia via MinIO/S3 e painel administrativo.",
    tags: ["Java", "Spring Boot", "React", "PostgreSQL", "MinIO", "Docker"],
    githubUrl: "https://github.com/fakezindev/garbo-ambientes-planejados",
    highlight: true,
    mockup: "garbo",
  },
  {
    id: "fakeos",
    title: "FakeOS - Portfolio",
    description: "Este portfólio interativo em formato de sistema operacional, construído com React, Vite e TailwindCSS.",
    tags: ["React", "Vite", "TailwindCSS", "TypeScript"],
    githubUrl: "https://github.com/fakezindev",
    mockup: "fakeos",
  },
];

function ProjectMockup({ type }: { type: "garbo" | "fakeos" }) {
  if (type === "garbo") {
    return (
      <div className="w-full h-28 rounded-lg bg-gradient-to-br from-amber-900/30 to-orange-900/20 border border-amber-500/20 overflow-hidden relative">
        {/* Browser chrome */}
        <div className="h-5 bg-[oklch(0.12_0.01_40)] flex items-center px-2 gap-1.5">
          <div className="w-2 h-2 rounded-full bg-red-400/60" />
          <div className="w-2 h-2 rounded-full bg-yellow-400/60" />
          <div className="w-2 h-2 rounded-full bg-green-400/60" />
          <div className="flex-1 mx-2 h-2.5 rounded bg-[oklch(0.2_0.01_40)]" />
        </div>
        {/* Content mockup */}
        <div className="p-2 flex gap-2">
          {/* Sidebar */}
          <div className="w-12 space-y-1.5">
            <div className="h-2 w-full rounded bg-amber-500/20" />
            <div className="h-2 w-10 rounded bg-amber-500/15" />
            <div className="h-2 w-8 rounded bg-amber-500/10" />
            <div className="h-2 w-10 rounded bg-amber-500/15" />
          </div>
          {/* Main */}
          <div className="flex-1 space-y-1.5">
            <div className="h-3 w-20 rounded bg-amber-400/20" />
            <div className="grid grid-cols-3 gap-1">
              <div className="h-12 rounded bg-amber-500/10 border border-amber-500/10" />
              <div className="h-12 rounded bg-amber-500/10 border border-amber-500/10" />
              <div className="h-12 rounded bg-amber-500/10 border border-amber-500/10" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-28 rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 overflow-hidden relative">
      {/* Desktop mockup */}
      <div className="p-2 h-full flex flex-col">
        <div className="flex-1 flex gap-1.5">
          {/* Icons */}
          <div className="space-y-2 w-6">
            <div className="w-5 h-5 rounded bg-primary/20" />
            <div className="w-5 h-5 rounded bg-primary/15" />
            <div className="w-5 h-5 rounded bg-primary/10" />
          </div>
          {/* Window */}
          <div className="flex-1 rounded border border-primary/20 bg-[oklch(0.14_0.01_260)]">
            <div className="h-3 bg-primary/10 rounded-t flex items-center px-1 gap-0.5">
              <div className="w-1 h-1 rounded-full bg-primary/40" />
              <div className="w-1 h-1 rounded-full bg-primary/40" />
              <div className="w-1 h-1 rounded-full bg-primary/40" />
            </div>
            <div className="p-1 space-y-1">
              <div className="h-1.5 w-12 rounded bg-primary/15" />
              <div className="h-1.5 w-16 rounded bg-primary/10" />
              <div className="h-1.5 w-10 rounded bg-primary/10" />
            </div>
          </div>
        </div>
        {/* Taskbar */}
        <div className="h-3 mt-1 rounded bg-[oklch(0.12_0.01_260)] border-t border-primary/10 flex items-center px-1 gap-1">
          <div className="w-3 h-2 rounded-sm bg-primary/20" />
          <div className="w-6 h-2 rounded-sm bg-primary/10" />
        </div>
      </div>
    </div>
  );
}

export default function ProjectsApp() {
  return (
    <div className="p-5 h-full overflow-y-auto">
      <h2 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
        Meus Projetos
      </h2>

      <div className="space-y-4">
        {projects.map(project => (
          <div
            key={project.id}
            className={`rounded-xl border transition-all hover:border-primary/30 overflow-hidden ${
              project.highlight
                ? "border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5"
                : "border-border/30 bg-secondary/30"
            }`}
          >
            {/* Visual mockup */}
            <div className="p-3 pb-0">
              <ProjectMockup type={project.mockup} />
            </div>

            <div className="p-4">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-semibold text-foreground">{project.title}</h3>
                {project.highlight && (
                  <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-primary/20 text-primary font-medium">
                    Destaque
                  </span>
                )}
              </div>
              <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-1.5 mt-3">
                {project.tags.map(tag => (
                  <span
                    key={tag}
                    className="text-[10px] px-2 py-0.5 rounded-full bg-secondary border border-border/50 text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Links */}
              <div className="flex items-center gap-3 mt-3 pt-3 border-t border-border/20">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-[11px] text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Github size={12} />
                    <span>Código</span>
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-[11px] text-muted-foreground hover:text-primary transition-colors"
                  >
                    <ExternalLink size={12} />
                    <span>Live</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
