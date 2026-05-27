import { useState } from "react";
import { 
  ChevronLeft, 
  ChevronRight, 
  RotateCw, 
  Home, 
  Search, 
  Star, 
  MoreVertical,
  Github,
  Linkedin,
  Mail,
  Globe,
  ExternalLink
} from "lucide-react";

export default function BrowserApp() {
  const [url, setUrl] = useState("https://fakezindev.com/home");
  const [inputUrl, setInputUrl] = useState("https://fakezindev.com/home");

  // Simula a submissão de uma URL na barra de pesquisa
  const handleNavigate = (e: React.FormEvent) => {
    e.preventDefault();
    setUrl(inputUrl);
  };

  return (
    <div className="flex flex-col h-full bg-[#f1f5f9] text-slate-800 rounded-b-lg overflow-hidden font-sans">
      
      {/* --- Cromo do Navegador (Barra de Ferramentas) --- */}
      <div className="bg-[#e2e8f0] border-b border-slate-300 shadow-sm z-10 flex flex-col">
        
        {/* Separadores (Tabs) */}
        <div className="flex px-2 pt-2 gap-1 items-end bg-[#cbd5e1]/50">
          <div className="bg-[#f1f5f9] px-4 py-1.5 rounded-t-md text-xs font-medium flex items-center gap-2 border border-b-0 border-slate-300 w-48 shadow-sm">
            <Globe size={12} className="text-blue-500" />
            <span className="truncate">Fakezin Links - Início</span>
          </div>
          <div className="px-3 py-1.5 text-xs text-slate-500 hover:bg-[#cbd5e1] rounded-t-md cursor-pointer transition-colors">
            +
          </div>
        </div>

        {/* Barra de Navegação */}
        <div className="flex items-center gap-2 p-1.5 px-3">
          <div className="flex gap-1 text-slate-500">
            <button className="p-1 hover:bg-[#cbd5e1] rounded-full transition-colors opacity-50 cursor-not-allowed">
              <ChevronLeft size={16} />
            </button>
            <button className="p-1 hover:bg-[#cbd5e1] rounded-full transition-colors opacity-50 cursor-not-allowed">
              <ChevronRight size={16} />
            </button>
            <button className="p-1 hover:bg-[#cbd5e1] rounded-full transition-colors">
              <RotateCw size={14} />
            </button>
            <button 
              className="p-1 hover:bg-[#cbd5e1] rounded-full transition-colors ml-1"
              onClick={() => { setUrl("https://fakezindev.com/home"); setInputUrl("https://fakezindev.com/home"); }}
            >
              <Home size={14} />
            </button>
          </div>

          <form 
            onSubmit={handleNavigate}
            className="flex-1 flex items-center bg-white rounded-full border border-slate-300 px-3 py-1 text-sm shadow-inner group focus-within:border-blue-400 focus-within:ring-1 focus-within:ring-blue-400/50"
          >
            <Search size={14} className="text-slate-400 mr-2" />
            <input 
              type="text" 
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              className="flex-1 bg-transparent outline-none text-slate-700"
            />
            <button type="button" className="text-slate-400 hover:text-yellow-500 ml-2">
              <Star size={14} />
            </button>
          </form>

          <button className="p-1 text-slate-500 hover:bg-[#cbd5e1] rounded-full transition-colors">
            <MoreVertical size={16} />
          </button>
        </div>
        
        {/* Barra de Favoritos */}
        <div className="flex items-center gap-4 px-4 py-1 text-xs text-slate-600 border-t border-slate-200 bg-[#f8fafc]">
          <span className="font-medium text-slate-800">Bookmarks:</span>
          <button onClick={() => setUrl("github")} className="flex items-center gap-1 hover:text-blue-600">
            <Github size={12} /> GitHub
          </button>
          <button onClick={() => setUrl("linkedin")} className="flex items-center gap-1 hover:text-blue-600">
            <Linkedin size={12} /> LinkedIn
          </button>
        </div>
      </div>

      {/* --- Área de Conteúdo (ViewPort) --- */}
      <div className="flex-1 overflow-y-auto relative bg-white">
        
        {/* Conteúdo dinâmico baseado na URL */}
        {url.includes("home") ? (
          
          /* PÁGINA INICIAL DO NAVEGADOR */
          <div className="h-full flex flex-col items-center justify-center p-6 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50 to-white">
            <div className="w-20 h-20 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/30 mb-6">
              <Globe size={40} />
            </div>
            <h1 className="text-3xl font-bold text-slate-800 mb-2">Fakezin Search</h1>
            <p className="text-slate-500 mb-8">Encontre os meus perfis na rede</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-lg">
              {/* Card GitHub */}
              <a 
                href="https://github.com/fakezindev" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex flex-col items-center p-6 bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-300 transition-all group"
              >
                <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mb-3 group-hover:bg-slate-800 group-hover:text-white transition-colors">
                  <Github size={24} />
                </div>
                <h3 className="font-bold text-slate-700">GitHub</h3>
                <p className="text-xs text-slate-500 text-center mt-1">Repositórios e contribuições de código</p>
                <span className="mt-3 flex items-center gap-1 text-[10px] text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity">
                  Abrir <ExternalLink size={10} />
                </span>
              </a>

              {/* Card LinkedIn */}
              <a 
                href="https://www.linkedin.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex flex-col items-center p-6 bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-300 transition-all group"
              >
                <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mb-3 group-hover:bg-[#0A66C2] group-hover:text-white transition-colors">
                  <Linkedin size={24} />
                </div>
                <h3 className="font-bold text-slate-700">LinkedIn</h3>
                <p className="text-xs text-slate-500 text-center mt-1">Perfil profissional e experiências</p>
                <span className="mt-3 flex items-center gap-1 text-[10px] text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity">
                  Abrir <ExternalLink size={10} />
                </span>
              </a>
            </div>
          </div>

        ) : (
          
          /* "Erro" de Navegação (Simulação caso digitem outra URL) */
          <div className="h-full flex flex-col items-center justify-center p-8 text-center bg-slate-50">
            <div className="w-16 h-16 text-slate-300 mb-4">
              <Search size={64} />
            </div>
            <h2 className="text-xl font-bold text-slate-700 mb-2">Conexão Restrita</h2>
            <p className="text-slate-500 max-w-md text-sm mb-6">
              Este navegador do sistema operacional está configurado apenas para acessar os domínios aprovados de <strong>Fakezindev</strong>.
            </p>
            <button 
              onClick={() => { setUrl("https://fakezindev.com/home"); setInputUrl("https://fakezindev.com/home"); }}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              Voltar ao Início
            </button>
          </div>
          
        )}

      </div>
    </div>
  );
}