import { useWindows } from "../../contexts/WindowContext";
import { User, Folder, Globe, FileText, TerminalSquare, Github, Power } from "lucide-react";

interface StartMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onShutdown?: () => void; // Propriedade adicionada para receber a função de desligar
}

export default function StartMenu({ isOpen, onClose, onShutdown }: StartMenuProps) {
  const { openWindow } = useWindows();

  // Lista de aplicativos com os novos ícones padronizados
  const apps = [
    {
      id: "about",
      title: "Sobre Mim",
      description: "Informações pessoais e habilidades",
      icon: (
        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white shadow-sm border border-white/10 shrink-0">
          <User size={18} />
        </div>
      ),
    },
    {
      id: "projects",
      title: "Projetos",
      description: "Meus projetos de desenvolvimento",
      icon: (
        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white shadow-sm border border-white/10 shrink-0">
          <Folder size={18} fill="currentColor" />
        </div>
      ),
    },
    {
      id: "browser",
      title: "Navegador",
      description: "Navegador web interno",
      icon: (
        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white shadow-sm border border-white/10 shrink-0">
          <Globe size={18} />
        </div>
      ),
    },
    {
      id: "cv",
      title: "Currículo",
      description: "Visualizar currículo em PDF",
      icon: (
        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center text-white shadow-sm border border-white/10 shrink-0 relative overflow-hidden">
          <FileText size={18} className="mb-1" />
          <div className="absolute bottom-0 left-0 right-0 bg-black/30 text-[6px] font-bold text-center py-[1px] uppercase tracking-wider">
            PDF
          </div>
        </div>
      ),
    },
    {
      id: "terminal",
      title: "Terminal",
      description: "Terminal interativo CLI",
      icon: (
        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-gray-800 to-black flex items-center justify-center text-white shadow-sm border border-gray-600 shrink-0">
          <TerminalSquare size={18} />
        </div>
      ),
    },
  ];

  const handleOpenApp = (id: string) => {
    openWindow(id);
    onClose(); // Fecha o menu iniciar ao abrir um app
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay invisível para fechar o menu ao clicar fora */}
      <div 
        className="fixed inset-0 z-[9998]" 
        onClick={onClose}
      />

      <div className="absolute bottom-14 left-2 w-80 bg-[#0f172a]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl z-[9998] overflow-hidden flex flex-col animate-in slide-in-from-bottom-5 fade-in duration-200">
        
        {/* Header do Menu */}
        <div className="p-4 flex items-center gap-3 border-b border-white/5">
          <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-blue-500/20">
            F
          </div>
          <div>
            <h2 className="text-white font-semibold text-lg leading-tight">FakeOS</h2>
            <p className="text-gray-400 text-xs">Portfolio v1.0</p>
          </div>
        </div>

        {/* Lista de Aplicativos */}
        <div className="p-3 flex-1 overflow-y-auto">
          <p className="text-[10px] font-bold text-gray-500 tracking-wider px-2 mb-2">APLICATIVOS</p>
          <div className="flex flex-col gap-1">
            {apps.map((app) => (
              <button
                key={app.id}
                onClick={() => handleOpenApp(app.id)}
                className="flex items-center gap-3 w-full p-2 rounded-xl hover:bg-white/10 transition-colors text-left group"
              >
                {app.icon}
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-white group-hover:text-blue-400 transition-colors">
                    {app.title}
                  </span>
                  <span className="text-[11px] text-gray-400 line-clamp-1">
                    {app.description}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Footer do Menu */}
        <div className="p-3 bg-white/5 border-t border-white/10 flex items-center justify-between">
          
          {/* Botão Power (Lado Esquerdo) */}
          <button 
            onClick={onShutdown}
            className="p-2 rounded-lg hover:bg-red-500/20 group transition-colors flex items-center gap-2"
            title="Desligar sistema"
          >
            <Power size={16} className="text-gray-400 group-hover:text-red-400 transition-colors" />
          </button>

          {/* GitHub Link (Lado Direito) */}
          <button 
            onClick={() => window.open('https://github.com/fakezindev', '_blank')}
            className="p-2 rounded-lg hover:bg-white/10 group transition-colors flex items-center gap-2"
          >
            <span className="text-xs text-gray-400 font-medium group-hover:text-white transition-colors">
              fakezindev
            </span>
            <Github size={16} className="text-gray-400 group-hover:text-white transition-colors" />
          </button>

        </div>
      </div>
    </>
  );
}