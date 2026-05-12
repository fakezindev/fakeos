import { describe, expect, it, beforeEach } from "vitest";
import { COMMANDS, executeCommand } from "../shared/terminalCommands";
import {
  createWindowState,
  openWindow,
  closeWindow,
  minimizeWindow,
  maximizeWindow,
  restoreWindow,
  focusWindow,
  updatePosition,
  updateSize,
  registerWindow,
  resetZIndex,
  WindowState,
} from "../shared/windowManager";

describe("Terminal Commands (shared/terminalCommands)", () => {
  it("should have all required commands defined", () => {
    const requiredCommands = ["help", "about", "projects", "skills", "contact"];
    requiredCommands.forEach(cmd => {
      expect(COMMANDS[cmd]).toBeDefined();
      expect(typeof COMMANDS[cmd]).toBe("function");
    });
  });

  it("help command should list all available commands", () => {
    const output = COMMANDS.help();
    const text = output.join("\n");
    expect(text).toContain("help");
    expect(text).toContain("about");
    expect(text).toContain("projects");
    expect(text).toContain("skills");
    expect(text).toContain("contact");
    expect(text).toContain("clear");
    expect(text).toContain("neofetch");
  });

  it("about command should contain developer info", () => {
    const output = COMMANDS.about();
    const text = output.join("\n");
    expect(text).toContain("Fakezindev");
    expect(text).toContain("Backend");
    expect(text).toContain("Java");
  });

  it("projects command should list Garbo as highlight", () => {
    const output = COMMANDS.projects();
    const text = output.join("\n");
    expect(text).toContain("Garbo Ambientes Planejados");
    expect(text).toContain("★");
    expect(text).toContain("github.com/fakezindev/garbo-ambientes-planejados");
  });

  it("skills command should show skill bars with percentages", () => {
    const output = COMMANDS.skills();
    const text = output.join("\n");
    expect(text).toContain("Java / Spring Boot");
    expect(text).toContain("95%");
    expect(text).toContain("Node.js / Express");
    expect(text).toContain("React / Vite");
    expect(text).toContain("C# / .NET");
  });

  it("contact command should contain GitHub link", () => {
    const output = COMMANDS.contact();
    const text = output.join("\n");
    expect(text).toContain("github.com/fakezindev");
  });

  it("neofetch command should show system info", () => {
    const output = COMMANDS.neofetch();
    const text = output.join("\n");
    expect(text).toContain("FakeOS v1.0");
    expect(text).toContain("fakezindev@fakeos");
    expect(text).toContain("Neon Dark");
  });

  it("executeCommand should return output for valid commands", () => {
    const result = executeCommand("help");
    expect(result.shouldClear).toBe(false);
    expect(result.lines.length).toBeGreaterThan(0);
    expect(result.lines[0].type).toBe("output");
  });

  it("executeCommand should handle 'clear' command", () => {
    const result = executeCommand("clear");
    expect(result.shouldClear).toBe(true);
    expect(result.lines).toEqual([]);
  });

  it("executeCommand should handle empty input", () => {
    const result = executeCommand("");
    expect(result.shouldClear).toBe(false);
    expect(result.lines).toHaveLength(1);
    expect(result.lines[0].content).toBe("");
  });

  it("executeCommand should return error for unknown commands", () => {
    const result = executeCommand("unknowncmd");
    expect(result.shouldClear).toBe(false);
    expect(result.lines[0].type).toBe("error");
    expect(result.lines[0].content).toContain("unknowncmd");
  });

  it("executeCommand should be case-insensitive", () => {
    const result = executeCommand("HELP");
    expect(result.shouldClear).toBe(false);
    expect(result.lines.length).toBeGreaterThan(0);
    expect(result.lines.some(l => l.content.includes("help"))).toBe(true);
  });

  it("executeCommand should trim whitespace", () => {
    const result = executeCommand("  about  ");
    expect(result.shouldClear).toBe(false);
    expect(result.lines.some(l => l.content.includes("Fakezindev"))).toBe(true);
  });
});

describe("Window Manager (shared/windowManager)", () => {
  const testConfig = {
    id: "test",
    title: "Test Window",
    icon: "🧪",
    position: { x: 100, y: 100 },
    size: { width: 400, height: 300 },
    minSize: { width: 200, height: 150 },
  };

  let windows: WindowState[];

  beforeEach(() => {
    resetZIndex();
    windows = [createWindowState(testConfig)];
  });

  it("createWindowState should set correct defaults", () => {
    const state = createWindowState(testConfig);
    expect(state.isOpen).toBe(false);
    expect(state.isMinimized).toBe(false);
    expect(state.isMaximized).toBe(false);
    expect(state.zIndex).toBe(0);
    expect(state.id).toBe("test");
    expect(state.title).toBe("Test Window");
  });

  it("openWindow should set isOpen=true and assign zIndex", () => {
    const result = openWindow(windows, "test");
    const win = result.windows.find(w => w.id === "test")!;
    expect(win.isOpen).toBe(true);
    expect(win.isMinimized).toBe(false);
    expect(win.zIndex).toBeGreaterThan(0);
    expect(result.activeId).toBe("test");
  });

  it("closeWindow should reset all state flags", () => {
    const opened = openWindow(windows, "test").windows;
    const result = closeWindow(opened, "test");
    const win = result.windows.find(w => w.id === "test")!;
    expect(win.isOpen).toBe(false);
    expect(win.isMinimized).toBe(false);
    expect(win.isMaximized).toBe(false);
    expect(result.activeId).toBeNull();
  });

  it("minimizeWindow should set isMinimized=true", () => {
    const opened = openWindow(windows, "test").windows;
    const result = minimizeWindow(opened, "test");
    const win = result.windows.find(w => w.id === "test")!;
    expect(win.isMinimized).toBe(true);
    expect(win.isOpen).toBe(true);
    expect(result.activeId).toBeNull();
  });

  it("maximizeWindow should set isMaximized=true", () => {
    const opened = openWindow(windows, "test").windows;
    const result = maximizeWindow(opened, "test");
    const win = result.find(w => w.id === "test")!;
    expect(win.isMaximized).toBe(true);
  });

  it("restoreWindow should clear maximized and minimized", () => {
    let state = openWindow(windows, "test").windows;
    state = maximizeWindow(state, "test");
    const result = restoreWindow(state, "test");
    const win = result.windows.find(w => w.id === "test")!;
    expect(win.isMaximized).toBe(false);
    expect(win.isMinimized).toBe(false);
    expect(result.activeId).toBe("test");
  });

  it("focusWindow should increase zIndex and clear minimized", () => {
    const opened = openWindow(windows, "test").windows;
    const prevZ = opened.find(w => w.id === "test")!.zIndex;
    const result = focusWindow(opened, "test");
    const win = result.windows.find(w => w.id === "test")!;
    expect(win.zIndex).toBeGreaterThan(prevZ);
    expect(win.isMinimized).toBe(false);
    expect(result.activeId).toBe("test");
  });

  it("updatePosition should prevent negative Y", () => {
    const result = updatePosition(windows, "test", { x: 50, y: -100 });
    const win = result.find(w => w.id === "test")!;
    expect(win.position.y).toBe(0);
    expect(win.position.x).toBe(50);
  });

  it("updatePosition should allow valid positions", () => {
    const result = updatePosition(windows, "test", { x: 200, y: 150 });
    const win = result.find(w => w.id === "test")!;
    expect(win.position).toEqual({ x: 200, y: 150 });
  });

  it("updateSize should enforce minimum width and height", () => {
    const result = updateSize(windows, "test", { width: 50, height: 30 });
    const win = result.find(w => w.id === "test")!;
    expect(win.size.width).toBe(200);
    expect(win.size.height).toBe(150);
  });

  it("updateSize should allow sizes above minimum", () => {
    const result = updateSize(windows, "test", { width: 800, height: 600 });
    const win = result.find(w => w.id === "test")!;
    expect(win.size).toEqual({ width: 800, height: 600 });
  });

  it("registerWindow should add new window", () => {
    const newConfig = { ...testConfig, id: "new" };
    const result = registerWindow(windows, newConfig);
    expect(result).toHaveLength(2);
    expect(result.find(w => w.id === "new")).toBeDefined();
  });

  it("registerWindow should not duplicate existing window", () => {
    const result = registerWindow(windows, testConfig);
    expect(result).toHaveLength(1);
  });

  it("multiple windows should have independent z-index ordering", () => {
    let state = registerWindow(windows, { ...testConfig, id: "second" });
    const r1 = openWindow(state, "test");
    const r2 = openWindow(r1.windows, "second");
    const w1 = r2.windows.find(w => w.id === "test")!;
    const w2 = r2.windows.find(w => w.id === "second")!;
    expect(w2.zIndex).toBeGreaterThan(w1.zIndex);
  });
});
