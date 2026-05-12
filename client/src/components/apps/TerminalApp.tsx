import { useState, useRef, useEffect, KeyboardEvent } from "react";
import { COMMANDS, executeCommand, TerminalLine } from "@shared/terminalCommands";

export default function TerminalApp() {
  const [lines, setLines] = useState<TerminalLine[]>([
    { type: "ascii", content: " ___     _        ___  ___" },
    { type: "ascii", content: "|  _|_ _| |_____ |   ||_ -|" },
    { type: "ascii", content: "|_| |___|_|_____||___||___|" },
    { type: "output", content: "" },
    { type: "output", content: "FakeOS Terminal v1.0" },
    { type: "output", content: 'Digite "help" para ver os comandos disponíveis.' },
    { type: "output", content: "" },
  ]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines]);

  const handleCommand = (cmd: string) => {
    const inputLine: TerminalLine = { type: "input", content: `fakezindev@fakeos:~$ ${cmd}` };
    const result = executeCommand(cmd);

    if (result.shouldClear) {
      setLines([]);
    } else {
      setLines(prev => [...prev, inputLine, ...result.lines]);
    }

    setInput("");
    setHistory(prev => [...prev, cmd]);
    setHistoryIndex(-1);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommand(input);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length > 0) {
        const newIndex = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setInput(history[newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1;
        if (newIndex >= history.length) {
          setHistoryIndex(-1);
          setInput("");
        } else {
          setHistoryIndex(newIndex);
          setInput(history[newIndex]);
        }
      }
    }
  };

  return (
    <div
      className="h-full bg-[oklch(0.08_0.01_260)] p-4 font-mono text-xs overflow-y-auto cursor-text"
      ref={scrollRef}
      onClick={() => inputRef.current?.focus()}
    >
      {/* Output lines */}
      {lines.map((line, i) => (
        <div key={i} className={`leading-relaxed whitespace-pre-wrap ${
          line.type === "input" ? "text-primary" :
          line.type === "error" ? "text-red-400" :
          line.type === "ascii" ? "text-primary/70" :
          "text-foreground/70"
        }`}>
          {line.content}
        </div>
      ))}

      {/* Input line */}
      <div className="flex items-center gap-0 leading-relaxed">
        <span className="text-primary">fakezindev@fakeos:~$&nbsp;</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent outline-none text-foreground/90 caret-primary"
          autoFocus
          spellCheck={false}
          autoComplete="off"
        />
        <span className="w-2 h-4 bg-primary/80 cursor-blink" />
      </div>
    </div>
  );
}
