import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { timeseriesData } from "@/lib/mock-data";
import { formatDateShort, formatDateLong } from "@/lib/format";

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload || !payload.length) return null;
  return (
    <div className="rounded-lg bg-[#1a1a1a] border border-[#2a2a2a] px-4 py-3 text-xs shadow-xl">
      <div className="text-[#888] mb-1.5">{formatDateLong(label)}</div>
      {payload.map((p: any) => (
        <div key={p.dataKey} className="flex items-center gap-2">
          <span
            className="inline-block h-1.5 w-1.5 rounded-full"
            style={{ background: p.color }}
          />
          <span style={{ color: p.color }}>
            {p.dataKey === "sms" ? "SMS" : "Email"}: {p.value} vendas
          </span>
        </div>
      ))}
    </div>
  );
}

export function RecoveryChart() {
  return (
    <div className="surface-panel p-6">
      <div className="flex items-start justify-between mb-5">
        <div>
          <h2 className="text-sm font-semibold text-white">
            Recuperações ao longo do tempo
          </h2>
          <p className="text-xs text-[#555] mt-1">
            Vendas recuperadas por dia, separadas por canal
          </p>
        </div>
        <div className="flex items-center gap-4">
          <LegendDot color="#80d7f8" label="SMS" />
          <LegendDot color="#e65ff5" label="Email" />
        </div>
      </div>

      <div style={{ width: "100%", height: 220 }}>
        <ResponsiveContainer>
          <AreaChart
            data={timeseriesData}
            margin={{ top: 5, right: 8, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="smsFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#80d7f8" stopOpacity={0.18} />
                <stop offset="100%" stopColor="#80d7f8" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="emailFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#e65ff5" stopOpacity={0.18} />
                <stop offset="100%" stopColor="#e65ff5" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              vertical={false}
              stroke="#1a1a1a"
              strokeDasharray="3 3"
            />
            <XAxis
              dataKey="date"
              stroke="#444"
              fontSize={11}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v) => formatDateShort(v)}
            />
            <YAxis
              stroke="#444"
              fontSize={11}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ stroke: "#2a2a2a", strokeWidth: 1 }}
            />
            <Area
              type="monotone"
              dataKey="sms"
              stroke="#80d7f8"
              strokeWidth={2}
              fill="url(#smsFill)"
              activeDot={{ r: 4, strokeWidth: 0 }}
            />
            <Area
              type="monotone"
              dataKey="email"
              stroke="#e65ff5"
              strokeWidth={2}
              fill="url(#emailFill)"
              activeDot={{ r: 4, strokeWidth: 0 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function LegendDot({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <span
        className="inline-block h-1.5 w-1.5 rounded-full"
        style={{ background: color }}
      />
      <span className="text-xs text-[#888]">{label}</span>
    </div>
  );
}
