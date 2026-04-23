import { createFileRoute } from "@tanstack/react-router";
import { Send, TrendingUp, Target, Receipt, DollarSign, Wallet } from "lucide-react";
import { useState } from "react";
import { AppLayout } from "@/components/AppLayout";
import { MetricCard } from "@/components/MetricCard";
import { RecoveryChart } from "@/components/RecoveryChart";
import { LeadsTable } from "@/components/LeadsTable";
import { CostsModal } from "@/components/CostsModal";
import { dashboardMetrics } from "@/lib/mock-data";
import { formatCurrency, formatNumber, formatPercent } from "@/lib/format";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — Lumix Recovery" },
      { name: "description", content: "Métricas de recuperação de vendas em tempo real." },
    ],
  }),
  component: DashboardPage,
});

function DashboardPage() {
  const [costsOpen, setCostsOpen] = useState(false);
  const m = dashboardMetrics;

  return (
    <AppLayout title="Dashboard">
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          <MetricCard
            label="Disparos Feitos"
            icon={Send}
            value={formatNumber(m.disparosFeitos.total)}
            subInfo={`SMS: ${formatNumber(m.disparosFeitos.sms)} | Email: ${formatNumber(m.disparosFeitos.email)}`}
          />
          <MetricCard
            label="Vendas Recuperadas"
            icon={TrendingUp}
            variant="brand"
            value={formatNumber(m.vendasRecuperadas.total)}
            subInfo={`SMS: ${formatNumber(m.vendasRecuperadas.sms)} | Email: ${formatNumber(m.vendasRecuperadas.email)}`}
          />
          <MetricCard
            label="Taxa de Conversão"
            icon={Target}
            value={formatPercent(m.taxaConversao.total, 2)}
            subInfo={`SMS: ${formatPercent(m.taxaConversao.sms, 2)} | Email: ${formatPercent(m.taxaConversao.email, 2)}`}
          />
          <MetricCard
            label="Ticket Médio"
            icon={Receipt}
            value={formatCurrency(m.ticketMedio.total)}
            subInfo={`SMS: ${formatCurrency(m.ticketMedio.sms)} | Email: ${formatCurrency(m.ticketMedio.email)}`}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <MetricCard
            label="Comissão Lumix"
            icon={DollarSign}
            variant="brand2"
            value={formatCurrency(m.comissaoLumix)}
            subInfo="Comissão acumulada no período selecionado"
          />
          <MetricCard
            label="Faturamento Sob o Front"
            icon={Wallet}
            value={formatCurrency(m.faturamentoSobFront)}
            subInfo="Faturamento líquido após custos operacionais"
            editable
            onEdit={() => setCostsOpen(true)}
          />
        </div>

        <RecoveryChart />

        <LeadsTable />
      </div>

      <CostsModal open={costsOpen} onClose={() => setCostsOpen(false)} />
    </AppLayout>
  );
}
