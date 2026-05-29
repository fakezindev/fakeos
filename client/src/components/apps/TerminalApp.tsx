import { useState, useRef, useEffect, KeyboardEvent } from "react";
import { COMMANDS, executeCommand, TerminalLine } from "../../../../shared/terminalCommands";

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
    const inputLine: TerminalLine = { type: "input", content: `fakezindev../../fakeos:~$ ${cmd}` };
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
      className="h-full bg-[oklch(0.08_0.01_260)] p-4 font-mono text-xs overflow-y-auto cursor-text select-none"
      ref={scrollRef}
      onClick={() => inputRef.current?.focus()}
    >
      {/* Output lines */}
      {lines.map((line, i) => (
        <div key={i} className={`leading-relaxed whitespace-pre-wrap ${
          line.type === "input" ? "text-primary" :
          line.type === "error" ? "text-red-400" :
          line.type === "ascii" ? "text-primary/70" :
          "text-foreground/90"
        }`}>
          {line.content}
        </div>
      ))}

      {/* Input line customizada com o efeito de digitação real */}
      <div className="flex items-center gap-0 leading-relaxed relative mt-1 min-h-[1rem]">
        <span className="text-primary shrink-0">fakezindev@fakeos:~$&nbsp;</span>
        
        {/* Container visual: renderiza o texto e cola o bloco do cursor logo atrás */}
        <div className="flex items-center relative pointer-events-none break-all whitespace-pre">
          <span className="text-foreground/90">{input}</span>
          {/* O cursor agora usa a cor do teu tema (text-primary) e pulsa de forma nativa */}
          <span className="w-2 h-4 bg-primary/80 ml-0.5 animate-pulse inline-block shrink-0" />
        </div>

        {/* O input real fica totalmente invisível por cima, cuidando da interação do teclado */}
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="absolute inset-y-0 right-0 left-[125px] bg-transparent outline-none text-transparent caret-transparent opacity-0 cursor-text"
          autoFocus
          spellCheck={false}
          autoComplete="off"
        />
      </div>
    </div>
  );
}