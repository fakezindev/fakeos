import { useWindows } from "@/contexts/WindowContext";

interface DesktopIcon {
  id: string;
  label: string;
  icon: string;
}

const desktopIcons: DesktopIcon[] = [
  { id: "about", label: "Sobre Mim", icon: "👤" },
  { id: "projects", label: "Projetos", icon: "📁" },
  { id: "garbo", label: "Garbo", icon: "🏠" },
  { id: "terminal", label: "Terminal", icon: "💻" },
];

export default function Desktop() {
  const { openWindow } = useWindows();

  return (
    <div className="absolute inset-0 bottom-12 overflow-hidden">
      {/* Wallpaper gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[oklch(0.12_0.02_260)] via-[oklch(0.1_0.015_270)] to-[oklch(0.08_0.02_250)]">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `radial-gradient(circle, oklch(0.7 0.18 250) 1px, transparent 1px)`,
          backgroundSize: "40px 40px"
        }} />
        {/* Glow orb */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-[oklch(0.3_0.1_250)] opacity-10 blur-[120px]" />
      </div>

      {/* Desktop Icons */}
      <div className="relative z-10 p-6 grid grid-cols-1 gap-2 w-fit">
        {desktopIcons.map(icon => (
          <button
            key={icon.id}
            className="icon-hover flex flex-col items-center gap-1 p-3 rounded-lg hover:bg-white/5 transition-colors w-20"
            onDoubleClick={() => openWindow(icon.id)}
          >
            <span className="text-3xl drop-shadow-lg">{icon.icon}</span>
            <span className="text-[10px] font-medium text-foreground/80 text-center leading-tight">{icon.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
