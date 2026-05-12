import { createContext, useContext, useState, useCallback, ReactNode } from "react";

export interface WindowState {
  id: string;
  title: string;
  icon: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  position: { x: number; y: number };
  size: { width: number; height: number };
  minSize?: { width: number; height: number };
}

interface WindowContextType {
  windows: WindowState[];
  activeWindowId: string | null;
  openWindow: (id: string) => void;
  closeWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  maximizeWindow: (id: string) => void;
  restoreWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  updatePosition: (id: string, position: { x: number; y: number }) => void;
  updateSize: (id: string, size: { width: number; height: number }) => void;
  registerWindow: (config: Omit<WindowState, "isOpen" | "isMinimized" | "isMaximized" | "zIndex">) => void;
}

const WindowContext = createContext<WindowContextType | null>(null);

let nextZIndex = 100;

export function WindowProvider({ children }: { children: ReactNode }) {
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [activeWindowId, setActiveWindowId] = useState<string | null>(null);

  const registerWindow = useCallback((config: Omit<WindowState, "isOpen" | "isMinimized" | "isMaximized" | "zIndex">) => {
    setWindows(prev => {
      if (prev.find(w => w.id === config.id)) return prev;
      return [...prev, { ...config, isOpen: false, isMinimized: false, isMaximized: false, zIndex: 0 }];
    });
  }, []);

  const openWindow = useCallback((id: string) => {
    nextZIndex++;
    setWindows(prev => prev.map(w =>
      w.id === id ? { ...w, isOpen: true, isMinimized: false, zIndex: nextZIndex } : w
    ));
    setActiveWindowId(id);
  }, []);

  const closeWindow = useCallback((id: string) => {
    setWindows(prev => prev.map(w =>
      w.id === id ? { ...w, isOpen: false, isMinimized: false, isMaximized: false } : w
    ));
    setActiveWindowId(null);
  }, []);

  const minimizeWindow = useCallback((id: string) => {
    setWindows(prev => prev.map(w =>
      w.id === id ? { ...w, isMinimized: true } : w
    ));
    setActiveWindowId(null);
  }, []);

  const maximizeWindow = useCallback((id: string) => {
    setWindows(prev => prev.map(w =>
      w.id === id ? { ...w, isMaximized: true } : w
    ));
  }, []);

  const restoreWindow = useCallback((id: string) => {
    nextZIndex++;
    setWindows(prev => prev.map(w =>
      w.id === id ? { ...w, isMaximized: false, isMinimized: false, zIndex: nextZIndex } : w
    ));
    setActiveWindowId(id);
  }, []);

  const focusWindow = useCallback((id: string) => {
    nextZIndex++;
    setWindows(prev => prev.map(w =>
      w.id === id ? { ...w, zIndex: nextZIndex, isMinimized: false } : w
    ));
    setActiveWindowId(id);
  }, []);

  const updatePosition = useCallback((id: string, position: { x: number; y: number }) => {
    setWindows(prev => prev.map(w =>
      w.id === id ? { ...w, position } : w
    ));
  }, []);

  const updateSize = useCallback((id: string, size: { width: number; height: number }) => {
    setWindows(prev => prev.map(w =>
      w.id === id ? { ...w, size } : w
    ));
  }, []);

  return (
    <WindowContext.Provider value={{
      windows,
      activeWindowId,
      openWindow,
      closeWindow,
      minimizeWindow,
      maximizeWindow,
      restoreWindow,
      focusWindow,
      updatePosition,
      updateSize,
      registerWindow,
    }}>
      {children}
    </WindowContext.Provider>
  );
}

export function useWindows() {
  const ctx = useContext(WindowContext);
  if (!ctx) throw new Error("useWindows must be used within WindowProvider");
  return ctx;
}
