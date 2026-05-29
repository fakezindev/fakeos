import { useWindows } from "../../contexts/WindowContext";
import { Minus, Square, X, Maximize2 } from "lucide-react";
import { useRef, useState, useEffect, ReactNode } from "react";

interface WindowProps {
  windowId: string;
  children: ReactNode;
}

export default function Window({ windowId, children }: WindowProps) {
  const { windows, activeWindowId, closeWindow, minimizeWindow, maximizeWindow, restoreWindow, focusWindow, updatePosition } = useWindows();
  const windowState = windows.find(w => w.id === windowId);
  const [isDragging, setIsDragging] = useState(false);
  const [closing, setClosing] = useState(false);
  const [minimizing, setMinimizing] = useState(false);
  const dragStart = useRef<{ x: number; y: number; px: number; py: number } | null>(null);

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!dragStart.current) return;
      const dx = e.clientX - dragStart.current.x;
      const dy = e.clientY - dragStart.current.y;
      updatePosition(windowId, {
        x: dragStart.current.px + dx,
        y: Math.max(0, dragStart.current.py + dy),
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      dragStart.current = null;
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, windowId, updatePosition]);

  if (!windowState || !windowState.isOpen) return null;

  const isActive = activeWindowId === windowId;
  const { position, size, isMaximized, isMinimized, zIndex, title, icon } = windowState;

  if (isMinimized && !minimizing) return null;

  const handleTitleMouseDown = (e: React.MouseEvent) => {
    if (isMaximized) return;
    e.preventDefault();
    setIsDragging(true);
    dragStart.current = { x: e.clientX, y: e.clientY, px: position.x, py: position.y };
    focusWindow(windowId);
  };

  const handleClose = () => {
    setClosing(true);
    setTimeout(() => {
      closeWindow(windowId);
      setClosing(false);
    }, 150);
  };

  const handleMinimize = () => {
    setMinimizing(true);
    setTimeout(() => {
      minimizeWindow(windowId);
      setMinimizing(false);
    }, 250);
  };

  const handleMaximize = () => {
    if (isMaximized) {
      restoreWindow(windowId);
    } else {
      maximizeWindow(windowId);
    }
  };

  const handleDoubleClickTitle = () => {
    handleMaximize();
  };

  const style: React.CSSProperties = isMaximized
    ? { top: 0, left: 0, width: "100%", height: "calc(100vh - 48px)", zIndex }
    : { top: position.y, left: position.x, width: size.width, height: size.height, zIndex };

  const animClass = closing ? "window-close" : minimizing ? "window-minimize" : "window-open";

  return (
    <div
      className={`absolute flex flex-col rounded-lg overflow-hidden shadow-2xl ${animClass} ${isActive ? "ring-1 ring-primary/20" : ""}`}
      style={style}
      onMouseDown={() => { if (!isActive) focusWindow(windowId); }}
    >
      {/* Title Bar */}
      <div
        className={`flex items-center h-9 px-3 gap-2 shrink-0 select-none cursor-default ${isActive ? "bg-[oklch(0.18_0.015_260)]" : "bg-[oklch(0.14_0.01_260)]"}`}
        onMouseDown={handleTitleMouseDown}
        onDoubleClick={handleDoubleClickTitle}
      >
        <span className="text-sm">{icon}</span>
        <span className="text-xs font-medium text-foreground/80 flex-1 truncate">{title}</span>
        <div className="flex items-center gap-0.5" onMouseDown={e => e.stopPropagation()}>
          <button
            onClick={handleMinimize}
            className="w-7 h-7 flex items-center justify-center rounded hover:bg-white/10 transition-colors duration-150"
          >
            <Minus size={12} className="text-foreground/60" />
          </button>
          <button
            onClick={handleMaximize}
            className="w-7 h-7 flex items-center justify-center rounded hover:bg-white/10 transition-colors duration-150"
          >
            {isMaximized ? <Square size={10} className="text-foreground/60" /> : <Maximize2 size={12} className="text-foreground/60" />}
          </button>
          <button
            onClick={handleClose}
            className="w-7 h-7 flex items-center justify-center rounded hover:bg-red-500/80 transition-colors duration-150"
          >
            <X size={12} className="text-foreground/60 hover:text-white" />
          </button>
        </div>
      </div>
      {/* Content */}
      <div className="flex-1 overflow-hidden bg-card">
        {children}
      </div>
      {/* Resize handles */}
      {!isMaximized && (
        <>
          <ResizeHandle windowId={windowId} direction="e" />
          <ResizeHandle windowId={windowId} direction="s" />
          <ResizeHandle windowId={windowId} direction="se" />
        </>
      )}
    </div>
  );
}

function ResizeHandle({ windowId, direction }: { windowId: string; direction: string }) {
  const { windows, updateSize } = useWindows();
  const windowState = windows.find(w => w.id === windowId);
  const startRef = useRef<{ x: number; y: number; w: number; h: number } | null>(null);

  if (!windowState) return null;

  const cursorMap: Record<string, string> = {
    e: "cursor-e-resize",
    s: "cursor-s-resize",
    se: "cursor-se-resize",
  };

  const posMap: Record<string, string> = {
    e: "top-0 right-0 w-2 h-full",
    s: "bottom-0 left-0 h-2 w-full",
    se: "bottom-0 right-0 w-4 h-4",
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    startRef.current = {
      x: e.clientX,
      y: e.clientY,
      w: windowState.size.width,
      h: windowState.size.height,
    };

    const handleMouseMove = (ev: MouseEvent) => {
      if (!startRef.current) return;
      const dx = ev.clientX - startRef.current.x;
      const dy = ev.clientY - startRef.current.y;
      const minW = windowState.minSize?.width || 300;
      const minH = windowState.minSize?.height || 200;

      let newW = startRef.current.w;
      let newH = startRef.current.h;

      if (direction.includes("e")) newW = Math.max(minW, startRef.current.w + dx);
      if (direction.includes("s")) newH = Math.max(minH, startRef.current.h + dy);

      updateSize(windowId, { width: newW, height: newH });
    };

    const handleMouseUp = () => {
      startRef.current = null;
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <div
      className={`absolute ${posMap[direction]} ${cursorMap[direction]} z-50 hover:bg-primary/10 transition-colors`}
      onMouseDown={handleMouseDown}
    />
  );
}
