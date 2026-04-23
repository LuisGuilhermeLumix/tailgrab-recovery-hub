import { Calendar, ChevronDown } from "lucide-react";
import { useState } from "react";

interface PageHeaderProps {
  title: string;
  showFilters?: boolean;
}

export function PageHeader({ title, showFilters = true }: PageHeaderProps) {
  const [range, setRange] = useState<"7d" | "30d" | "90d">("30d");
  const [channel, setChannel] = useState("Todos");
  const [channelOpen, setChannelOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 h-14 border-b border-[#141414] bg-black/80 backdrop-blur-xl">
      <div className="flex h-full items-center justify-between gap-4 px-6">
        <h1 className="text-[15px] font-semibold text-white">{title}</h1>

        {showFilters && (
          <div className="flex items-center gap-2">
            <DateField label="De:" />
            <DateField label="Até:" />

            <div className="flex items-center gap-1 ml-1">
              {(["7d", "30d", "90d"] as const).map((r) => (
                <button
                  key={r}
                  onClick={() => setRange(r)}
                  className={[
                    "h-9 px-3 text-xs font-medium rounded-md border transition-colors duration-150",
                    range === r
                      ? "bg-[rgba(128,215,248,0.12)] border-[#80d7f8] text-[#80d7f8]"
                      : "bg-[#111] border-[#222] text-[#777] hover:text-[#ccc] hover:border-[#2a2a2a]",
                  ].join(" ")}
                >
                  {r}
                </button>
              ))}
            </div>

            <div className="relative">
              <button
                onClick={() => setChannelOpen((v) => !v)}
                className="h-9 flex items-center gap-2 px-3.5 rounded-lg bg-[#111] border border-[#222] text-[#ccc] text-sm hover:border-[#2a2a2a] transition-colors"
              >
                <span className="text-[#666] text-xs">Canal:</span>
                <span>{channel}</span>
                <ChevronDown size={14} className="text-[#666]" />
              </button>
              {channelOpen && (
                <div className="absolute right-0 mt-1.5 w-36 rounded-lg bg-[#0f0f0f] border border-[#1e1e1e] py-1 shadow-lg z-50">
                  {["Todos", "SMS", "Email"].map((c) => (
                    <button
                      key={c}
                      onClick={() => {
                        setChannel(c);
                        setChannelOpen(false);
                      }}
                      className="w-full text-left px-3 py-1.5 text-sm text-[#ccc] hover:bg-[#161616] transition-colors"
                    >
                      {c}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              type="button"
              className="h-9 px-5 rounded-lg bg-[#80d7f8] text-black text-sm font-bold transition-all duration-150 hover:bg-[#a8e8ff] hover:scale-[1.01]"
            >
              Aplicar
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

function DateField({ label }: { label: string }) {
  return (
    <div className="h-9 flex items-center gap-2 px-3 rounded-lg bg-[#111] border border-[#222] text-sm">
      <span className="text-[#666] text-xs">{label}</span>
      <Calendar size={13} className="text-[#555]" />
      <input
        type="date"
        className="bg-transparent text-[#ccc] text-xs outline-none border-none w-[110px] [color-scheme:dark]"
      />
    </div>
  );
}
