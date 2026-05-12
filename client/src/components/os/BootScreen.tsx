import { useState, useEffect } from "react";

interface BootScreenProps {
  onComplete: () => void;
}

export default function BootScreen({ onComplete }: BootScreenProps) {
  const [phase, setPhase] = useState<"logo" | "loading" | "done">("logo");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("loading"), 800);
    const t2 = setTimeout(() => setPhase("done"), 2800);
    const t3 = setTimeout(() => onComplete(), 3200);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onComplete]);

  return (
    <div className={`fixed inset-0 z-[99999] bg-[oklch(0.06_0.01_260)] flex flex-col items-center justify-center transition-opacity duration-500 ${phase === "done" ? "opacity-0" : "opacity-100"}`}>
      {/* Logo */}
      <div className={`flex flex-col items-center gap-4 transition-all duration-700 ${phase === "logo" ? "scale-100 opacity-100" : "scale-95 opacity-90"}`}>
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-2xl neon-glow">
          <span className="text-3xl font-bold text-white">F</span>
        </div>
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground neon-text">FakeOS</h1>
          <p className="text-xs text-muted-foreground mt-1">Portfolio System v1.0</p>
        </div>
      </div>

      {/* Loading bar */}
      {(phase === "loading" || phase === "done") && (
        <div className="mt-10 w-48 h-0.5 bg-border/30 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-primary to-accent boot-progress rounded-full" />
        </div>
      )}

      {/* Boot text */}
      {phase === "loading" && (
        <p className="mt-4 text-[10px] text-muted-foreground font-mono boot-pulse">
          Inicializando sistema...
        </p>
      )}
    </div>
  );
}
