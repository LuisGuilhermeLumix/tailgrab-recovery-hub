import { useMemo, useState } from "react";
import { ChevronDown, ChevronLeft, ChevronRight, Inbox } from "lucide-react";
import { trackingCodes, TrackingEvent } from "@/lib/mock-data";
import { formatDateLong } from "@/lib/format";

const PER_PAGE = 10;

const eventStyles: Record<TrackingEvent, { bg: string; color: string }> = {
  InfoReceived: { bg: "rgba(128,215,248,0.10)", color: "#80d7f8" },
  Delivered: { bg: "rgba(34,197,94,0.10)", color: "#22c55e" },
  FailedAttempt: { bg: "rgba(239,68,68,0.10)", color: "#ef4444" },
};

export function TrackingTable() {
  const [filter, setFilter] = useState<"Todos" | TrackingEvent>("Todos");
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);

  const filtered = useMemo(
    () => (filter === "Todos" ? trackingCodes : trackingCodes.filter((c) => c.event === filter)),
    [filter],
  );
  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const pageData = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <div className="surface-panel p-6">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <h2 className="text-sm font-semibold text-white">Todos os Tracking Codes</h2>
        <div className="relative">
          <button
            onClick={() => setOpen((v) => !v)}
            className="h-9 flex items-center gap-2 rounded-lg bg-[#0f0f0f] border border-[#1e1e1e] px-3.5 text-sm text-[#ccc] hover:bg-[#161616] transition-colors"
          >
            <span className="text-[#666] text-xs">Evento:</span>
            <span>{filter === "Todos" ? "Todos os Eventos" : filter}</span>
            <ChevronDown size={14} className="text-[#666]" />
          </button>
          {open && (
            <div className="absolute right-0 mt-1.5 w-48 rounded-lg bg-[#0f0f0f] border border-[#1e1e1e] py-1 shadow-lg z-20">
              {(["Todos", "InfoReceived", "Delivered", "FailedAttempt"] as const).map((opt) => (
                <button
                  key={opt}
                  onClick={() => {
                    setFilter(opt);
                    setOpen(false);
                    setPage(1);
                  }}
                  className="w-full text-left px-3 py-1.5 text-sm text-[#ccc] hover:bg-[#161616] transition-colors"
                >
                  {opt === "Todos" ? "Todos os Eventos" : opt}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[#0a0a0a]">
              {["#", "Data", "Nome", "Número", "Produto", "Evento"].map((h) => (
                <th
                  key={h}
                  className="text-left text-[11px] font-semibold uppercase tracking-[0.08em] text-[#555] px-4 py-3"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pageData.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-16 text-center">
                  <Inbox size={48} className="mx-auto text-[#333] mb-3" />
                  <div className="text-sm text-[#444]">Nenhum código encontrado</div>
                </td>
              </tr>
            ) : (
              pageData.map((c) => {
                const s = eventStyles[c.event];
                return (
                  <tr
                    key={c.id}
                    className="border-b border-[#0f0f0f] hover:bg-white/[0.015] transition-colors"
                  >
                    <td className="px-4 py-3.5 text-[#555] text-xs">{c.id}</td>
                    <td className="px-4 py-3.5 text-[#888] text-xs whitespace-nowrap">
                      {formatDateLong(c.date)}
                    </td>
                    <td className="px-4 py-3.5 text-[#ddd]">{c.name}</td>
                    <td className="px-4 py-3.5 text-[#aaa] font-mono text-xs">{c.number}</td>
                    <td className="px-4 py-3.5 text-[#aaa]">{c.product}</td>
                    <td className="px-4 py-3.5">
                      <span
                        className="inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-semibold"
                        style={{ backgroundColor: s.bg, color: s.color }}
                      >
                        {c.event}
                      </span>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-end gap-3 mt-4 pt-3">
        <span className="text-xs text-[#555]">
          Página {page} de {totalPages}
        </span>
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          className="h-8 w-8 flex items-center justify-center rounded-md bg-[#111] border border-[#1e1e1e] text-[#888] transition-colors hover:border-[#80d7f8] hover:text-[#80d7f8] disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <ChevronLeft size={14} />
        </button>
        <button
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
          className="h-8 w-8 flex items-center justify-center rounded-md bg-[#111] border border-[#1e1e1e] text-[#888] transition-colors hover:border-[#80d7f8] hover:text-[#80d7f8] disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
}
