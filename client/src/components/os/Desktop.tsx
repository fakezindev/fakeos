import { useWindows } from "@/contexts/WindowContext";
import { ReactNode } from "react";
import { FileText, User, Folder, Globe, TerminalSquare } from "lucide-react";

interface DesktopIcon {
  id: string;
  label: string;
  icon: ReactNode; 
}

const desktopIcons: DesktopIcon[] = [
  { 
    id: "about", 
    label: "Sobre Mim", 
    icon: (
      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white shadow-lg relative overflow-hidden group-hover:scale-105 transition-transform border border-white/10">
        <User size={24} />
      </div>
    )
  },
  { 
    id: "projects", 
    label: "Projetos", 
    icon: (
      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white shadow-lg relative overflow-hidden group-hover:scale-105 transition-transform border border-white/10">
        <Folder size={24} fill="currentColor" />
      </div>
    )
  },
  { 
    id: "browser", 
    label: "Navegador", 
    icon: (
      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white shadow-lg relative overflow-hidden group-hover:scale-105 transition-transform border border-white/10">
        <Globe size={24} />
      </div>
    )
  },
  { 
    id: "cv", 
    label: "Currículo.pdf",
    icon: (
      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-red-700 flex flex-col items-center justify-center text-white shadow-lg relative overflow-hidden group-hover:scale-105 transition-transform border border-white/10">
        <FileText size={22} className="mb-1" />
        <div className="absolute bottom-0 left-0 right-0 bg-black/30 text-[8px] font-bold text-center py-[1px] uppercase tracking-wider">
          PDF
        </div>
      </div>
    ) 
  },
  { 
    id: "terminal", 
    label: "Terminal", 
    icon: (
      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gray-800 to-black flex items-center justify-center text-white shadow-lg relative overflow-hidden group-hover:scale-105 transition-transform border border-gray-600">
        <TerminalSquare size={24} />
      </div>
    )
  },
];

export default function Desktop() {
  const { openWindow } = useWindows();

  return (
    /* Wrapper limpo: pointer-events-none para não bloquear o fundo, mas ocupando a tela toda */
    <div className="absolute inset-0 bottom-12 overflow-hidden pointer-events-none">
      
      {/* Desktop Icons: pointer-events-auto reativa o clique apenas para os ícones */}
      <div className="relative z-10 p-6 grid grid-cols-1 gap-4 w-fit pointer-events-auto">
        {desktopIcons.map(icon => (
          <button
            key={icon.id}
            className="group flex flex-col items-center gap-1.5 p-2 rounded-lg hover:bg-white/10 transition-colors w-24 outline-none focus:bg-white/10"
            onDoubleClick={() => openWindow(icon.id)}
          >
            {icon.icon}
            
            <span className="text-[11px] font-medium text-white text-center leading-tight drop-shadow-md px-1 rounded group-focus:bg-blue-600">
              {icon.label}
            </span>
          </button>
        ))}
      </div>
      
    </div>
  );
}