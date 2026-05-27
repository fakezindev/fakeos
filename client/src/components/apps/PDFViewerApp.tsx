import { FileText, ExternalLink, Download } from "lucide-react";

interface PDFViewerProps {
  fileUrl: string;
  title?: string;
}

export default function PDFViewerApp({ fileUrl, title = "Visualizador de PDF" }: PDFViewerProps) {
  return (
    <div className="flex flex-col h-full bg-[#525659] overflow-hidden">
      {/* Barra de Ferramentas Estilizada (Estilo Adobe/Chrome) */}
      <div className="h-10 bg-[#323639] flex items-center justify-between px-4 text-white shadow-md z-10">
        <div className="flex items-center gap-3">
          <FileText size={16} className="text-red-400" />
          <span className="text-xs font-medium truncate max-w-[200px]">{title}</span>
        </div>
        
        <div className="flex items-center gap-4">
          <a 
            href={fileUrl} 
            download 
            className="p-1.5 hover:bg-white/10 rounded-full transition-colors"
            title="Download"
          >
            <Download size={16} />
          </a>
          <a 
            href={fileUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-1.5 hover:bg-white/10 rounded-full transition-colors"
            title="Abrir em nova aba"
          >
            <ExternalLink size={16} />
          </a>
        </div>
      </div>

      {/* Área do PDF */}
      <div className="flex-1 bg-[#525659] relative">
        <iframe
          src={`${fileUrl}#toolbar=0`} // #toolbar=0 esconde a barra nativa para usarmos a nossa personalizada
          className="w-full h-full border-none"
          title={title}
        />
      </div>
    </div>
  );
}