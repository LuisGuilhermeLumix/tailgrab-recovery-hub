import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Inbox, Search } from "lucide-react";
import { Lead, leads } from "@/lib/mock-data";
import { formatCurrency, formatDateLong } from "@/lib/format";

const PER_PAGE = 8;

export function LeadsTable() {
  const [tab, setTab] = useState<"Todos" | "SMS" | "Email">("Todos");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    return leads.filter((l) => {
      if (tab !== "Todos" && l.channel !== tab) return false;
      if (search && !l.email.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [tab, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const pageData = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <div className="surface-panel p-6">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <h2 className="text-sm font-semibold text-white">Leads Recentes</h2>
        <div className="relative">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#444]"
          />
          <input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Buscar por email..."
            className="h-9 w-72 rounded-lg bg-[#0a0a0a] border border-[#1e1e1e] pl-9 pr-3 text-sm text-white placeholder-[#444] focus:border-[#80d7f8] transition-colors"
          />
        </div>
      </div>

      <div className="flex items-center gap-1 border-b border-[#141414] mb-1">
        {(["Todos", "SMS", "Email"] as const).map((t) => (
          <button
            key={t}
            onClick={() => {
              setTab(t);
              setPage(1);
            }}
            className={[
              "relative py-2 mr-5 text-sm transition-colors",
              tab === t ? "text-white" : "text-[#555] hover:text-[#999]",
            ].join(" ")}
          >
            {t}
            {tab === t && (
              <span className="absolute -bottom-px left-0 right-0 h-[2px] bg-[#80d7f8]" />
            )}
          </button>
        ))}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[#0a0a0a]">
              {["Data", "Email", "Produto", "Canal", "Valor", "Status"].map(
                (h) => (
                  <th
                    key={h}
                    className="text-left text-[11px] font-semibold uppercase tracking-[0.08em] text-[#555] px-4 py-3"
                  >
                    {h}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody>
            {pageData.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-16 text-center">
                  <Inbox size={48} className="mx-auto text-[#333] mb-3" />
                  <div className="text-sm text-[#444]">Nenhum lead encontrado</div>
                </td>
              </tr>
            ) : (
              pageData.map((lead) => <LeadRow key={lead.id} lead={lead} />)
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-end gap-3 mt-4 pt-3">
        <span className="text-xs text-[#555]">
          Página {page} de {totalPages}
        </span>
        <PageBtn
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
        >
          <ChevronLeft size={14} />
        </PageBtn>
        <PageBtn
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
        >
          <ChevronRight size={14} />
        </PageBtn>
      </div>
    </div>
  );
}

function LeadRow({ lead }: { lead: Lead }) {
  return (
    <tr className="border-b border-[#0f0f0f] hover:bg-white/[0.015] transition-colors">
      <td className="px-4 py-3.5 text-[#888] text-xs whitespace-nowrap">
        {formatDateLong(lead.date)}
      </td>
      <td className="px-4 py-3.5 text-[#ddd]">{lead.email}</td>
      <td className="px-4 py-3.5 text-[#aaa]">{lead.product}</td>
      <td className="px-4 py-3.5">
        <ChannelBadge channel={lead.channel} />
      </td>
      <td className="px-4 py-3.5 text-white font-medium">
        {formatCurrency(lead.value)}
      </td>
      <td className="px-4 py-3.5">
        <StatusBadge status={lead.status} />
      </td>
    </tr>
  );
}

export function ChannelBadge({ channel }: { channel: "SMS" | "Email" }) {
  const map = {
    SMS: { bg: "rgba(128,215,248,0.10)", color: "#80d7f8" },
    Email: { bg: "rgba(230,95,245,0.10)", color: "#e65ff5" },
  } as const;
  const s = map[channel];
  return (
    <span
      className="inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-semibold"
      style={{ backgroundColor: s.bg, color: s.color }}
    >
      {channel}
    </span>
  );
}

function StatusBadge({ status }: { status: Lead["status"] }) {
  const map = {
    Recuperado: { bg: "rgba(34,197,94,0.10)", color: "#22c55e" },
    Disparado: { bg: "rgba(245,158,11,0.10)", color: "#f59e0b" },
    Pendente: { bg: "rgba(100,100,100,0.10)", color: "#888" },
  } as const;
  const s = map[status];
  return (
    <span
      className="inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-semibold"
      style={{ backgroundColor: s.bg, color: s.color }}
    >
      {status}
    </span>
  );
}

function PageBtn({
  children,
  onClick,
  disabled,
}: {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="h-8 w-8 flex items-center justify-center rounded-md bg-[#111] border border-[#1e1e1e] text-[#888] transition-colors hover:border-[#80d7f8] hover:text-[#80d7f8] disabled:opacity-40 disabled:hover:border-[#1e1e1e] disabled:hover:text-[#888] disabled:cursor-not-allowed"
    >
      {children}
    </button>
  );
}
