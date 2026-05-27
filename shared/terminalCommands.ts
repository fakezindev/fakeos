export interface TerminalLine {
  type: "input" | "output" | "error" | "ascii";
  content: string;
}

export const COMMANDS: Record<string, () => string[]> = {
  help: () => [
    "Comandos disponíveis:",
    "",
    "  help       - Mostra esta lista de comandos",
    "  about      - Informações sobre mim",
    "  projects   - Lista meus projetos",
    "  skills     - Minhas habilidades técnicas",
    "  contact    - Informações de contato",
    "  clear      - Limpa o terminal",
    "  neofetch   - Informações do sistema",
    "",
  ],
  about: () => [
    "┌─────────────────────────────────────────┐",
    "│           SOBRE MIM                     │",
    "├─────────────────────────────────────────┤",
    "│  Nome: Fakezindev                       │",
    "│  Role: Desenvolvedor Backend            │",
    "│  Stack: Java, Node.js, C#, React        │",
    "│  Foco: APIs robustas e escaláveis       │",
    "│                                         │",
    "│  Apaixonado por criar soluções que      │",
    "│  fazem a diferença. Especializado em    │",
    "│  arquitetura de software e boas         │",
    "│  práticas de desenvolvimento.           │",
    "└─────────────────────────────────────────┘",
  ],
  projects: () => [
    "═══ PROJETOS ═══",
    "",
    "  [★] Garbo Ambientes Planejados",
    "      Sistema fullstack para escritório de arquitetura",
    "      Stack: Java 21 + Spring Boot + React + PostgreSQL + MinIO",
    "      GitHub: github.com/fakezindev/garbo-ambientes-planejados",
    "",
    "  [•] FakeOS Portfolio",
    "      Portfólio interativo estilo Sistema Operacional",
    "      Stack: React + Vite + TailwindCSS + TypeScript",
    "",
  ],
  skills: () => [
    "═══ HABILIDADES TÉCNICAS ═══",
    "",
    "  Backend:",
    "    ████████████████████░  Java / Spring Boot   95%",
    "    ████████████████░░░░░  Node.js / Express    80%",
    "    ██████████████░░░░░░░  C# / .NET            70%",
    "",
    "  Frontend:",
    "    █████████████████░░░░  React / Vite         85%",
    "    ████████████████░░░░░  TailwindCSS          80%",
    "",
    "  Infra & Tools:",
    "    █████████████████░░░░  PostgreSQL / MySQL   85%",
    "    ███████████████░░░░░░  Docker / DevOps      75%",
    "    ██████████████████░░░  Git / GitHub         90%",
    "    ██████████████████░░░  REST APIs / Swagger  90%",
    "",
  ],
  contact: () => [
    "═══ CONTATO ═══",
    "",
    "  GitHub:   github.com/fakezindev",
    "  Email:    zetabr.bruno@gmail.com",
    "  WhatsApp: +55 11 96093-9762",
    "  LinkedIn: linkedin.com/in/bruno-henrique-ramos-alves/",
    "",
    "  Sinta-se à vontade para entrar em contato!",
    "",
  ],
  neofetch: () => [
    "        ╔═══╗          fakezindev@fakeos",
    "       ║ F ║          ─────────────────",
    "        ╚═══╝          OS: FakeOS v1.0",
    "     ┌───────┐         Shell: FakeTerm",
    "     │ FAKE  │         Stack: Java + React",
    "     │  OS   │         Theme: Neon Dark",
    "     └───────┘         Resolution: ∞ x ∞",
    "                       Uptime: since boot",
    "",
  ],
};

export function executeCommand(input: string): { lines: TerminalLine[]; shouldClear: boolean } {
  const trimmed = input.trim().toLowerCase();

  if (trimmed === "clear") {
    return { lines: [], shouldClear: true };
  }

  if (trimmed === "") {
    return { lines: [{ type: "output", content: "" }], shouldClear: false };
  }

  if (COMMANDS[trimmed]) {
    const output = COMMANDS[trimmed]();
    return {
      lines: output.map(line => ({ type: "output" as const, content: line })),
      shouldClear: false,
    };
  }

  return {
    lines: [
      { type: "error", content: `comando não encontrado: ${trimmed}` },
      { type: "output", content: 'Digite "help" para ver os comandos disponíveis.' },
    ],
    shouldClear: false,
  };
}
