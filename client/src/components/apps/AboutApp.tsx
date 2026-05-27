const skills = [
  { name: "Java / Spring Boot", level: 95, color: "from-orange-500 to-red-500" },
  { name: "Node.js / Express", level: 70, color: "from-green-500 to-emerald-500" },
  { name: "C# / .NET", level: 70, color: "from-purple-500 to-violet-500" },
  { name: "React / Vite", level: 85, color: "from-cyan-400 to-blue-500" },
  { name: "PostgreSQL / MySQL", level: 85, color: "from-blue-500 to-indigo-500" },
  { name: "Docker / DevOps", level: 75, color: "from-sky-400 to-blue-600" },
  { name: "Git / GitHub", level: 90, color: "from-gray-400 to-gray-600" },
  { name: "REST APIs / Swagger", level: 90, color: "from-teal-400 to-green-500" },
];

function Avatar() {
  return (
    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary via-accent to-primary/60 flex items-center justify-center shadow-lg neon-glow relative overflow-hidden shrink-0">
      <img
        src="/assets/avatar-cartoon.png" 
        alt="Avatar"
        // w-16 h-16 para manter a mesma proporção do SVG original
        // object-cover para garantir que o rosto fique centralizado e preencha o espaço
        className="w-20 h-20 rounded-xl object-cover"
      />
    </div>
  );
}

export default function AboutApp() {
  return (
    <div className="p-6 h-full overflow-y-auto">
      {/* Header */}
      <div className="flex items-start gap-5 mb-6">
        <Avatar />
        <div>
          <h1 className="text-xl font-bold text-foreground">Fakezindev</h1>
          <p className="text-sm text-primary font-medium">Desenvolvedor Backend</p>
          <p className="text-xs text-muted-foreground mt-2 leading-relaxed max-w-md">
            Desenvolvedor apaixonado por criar soluções robustas e escaláveis. 
            Especializado em Java/Spring Boot com experiência sólida em Node.js, C# e React. 
            Focado em arquitetura limpa, boas práticas e código de qualidade.
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-border/50 my-5" />

      {/* Skills */}
      <div>
        <h2 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-primary" />
          Habilidades Técnicas
        </h2>
        <div className="space-y-3">
          {skills.map(skill => (
            <div key={skill.name}>
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-medium text-foreground/80">{skill.name}</span>
                <span className="text-[10px] text-muted-foreground">{skill.level}%</span>
              </div>
              <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full bg-gradient-to-r ${skill.color} transition-all duration-1000`}
                  style={{ width: `${skill.level}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Info cards */}
      <div className="mt-6 grid grid-cols-2 gap-3">
        <div className="p-3 rounded-lg bg-secondary/50 border border-border/30">
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Foco</p>
          <p className="text-xs font-medium text-foreground mt-1">Backend & APIs</p>
        </div>
        <div className="p-3 rounded-lg bg-secondary/50 border border-border/30">
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Stack Principal</p>
          <p className="text-xs font-medium text-foreground mt-1">Java + Spring Boot</p>
        </div>
        <div className="p-3 rounded-lg bg-secondary/50 border border-border/30">
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Experiência</p>
          <p className="text-xs font-medium text-foreground mt-1">Fullstack</p>
        </div>
        <div className="p-3 rounded-lg bg-secondary/50 border border-border/30">
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Idiomas</p>
          <p className="text-xs font-medium text-foreground mt-1">PT-BR / EN</p>
        </div>
      </div>
    </div>
  );
}
