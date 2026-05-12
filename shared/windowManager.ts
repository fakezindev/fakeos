export interface WindowConfig {
  id: string;
  title: string;
  icon: string;
  position: { x: number; y: number };
  size: { width: number; height: number };
  minSize?: { width: number; height: number };
}

export interface WindowState extends WindowConfig {
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
}

let nextZIndex = 100;

export function createWindowState(config: WindowConfig): WindowState {
  return {
    ...config,
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 0,
  };
}

export function openWindow(windows: WindowState[], id: string): { windows: WindowState[]; activeId: string } {
  nextZIndex++;
  return {
    windows: windows.map(w =>
      w.id === id ? { ...w, isOpen: true, isMinimized: false, zIndex: nextZIndex } : w
    ),
    activeId: id,
  };
}

export function closeWindow(windows: WindowState[], id: string): { windows: WindowState[]; activeId: string | null } {
  return {
    windows: windows.map(w =>
      w.id === id ? { ...w, isOpen: false, isMinimized: false, isMaximized: false } : w
    ),
    activeId: null,
  };
}

export function minimizeWindow(windows: WindowState[], id: string): { windows: WindowState[]; activeId: string | null } {
  return {
    windows: windows.map(w =>
      w.id === id ? { ...w, isMinimized: true } : w
    ),
    activeId: null,
  };
}

export function maximizeWindow(windows: WindowState[], id: string): WindowState[] {
  return windows.map(w =>
    w.id === id ? { ...w, isMaximized: true } : w
  );
}

export function restoreWindow(windows: WindowState[], id: string): { windows: WindowState[]; activeId: string } {
  nextZIndex++;
  return {
    windows: windows.map(w =>
      w.id === id ? { ...w, isMaximized: false, isMinimized: false, zIndex: nextZIndex } : w
    ),
    activeId: id,
  };
}

export function focusWindow(windows: WindowState[], id: string): { windows: WindowState[]; activeId: string } {
  nextZIndex++;
  return {
    windows: windows.map(w =>
      w.id === id ? { ...w, zIndex: nextZIndex, isMinimized: false } : w
    ),
    activeId: id,
  };
}

export function updatePosition(windows: WindowState[], id: string, position: { x: number; y: number }): WindowState[] {
  const safePosition = { x: position.x, y: Math.max(0, position.y) };
  return windows.map(w =>
    w.id === id ? { ...w, position: safePosition } : w
  );
}

export function updateSize(windows: WindowState[], id: string, size: { width: number; height: number }): WindowState[] {
  return windows.map(w => {
    if (w.id !== id) return w;
    const minW = w.minSize?.width || 300;
    const minH = w.minSize?.height || 200;
    return {
      ...w,
      size: {
        width: Math.max(minW, size.width),
        height: Math.max(minH, size.height),
      },
    };
  });
}

export function registerWindow(windows: WindowState[], config: WindowConfig): WindowState[] {
  if (windows.find(w => w.id === config.id)) return windows;
  return [...windows, createWindowState(config)];
}

export function resetZIndex() {
  nextZIndex = 100;
}
