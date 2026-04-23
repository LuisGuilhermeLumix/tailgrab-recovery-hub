import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle, Package, Send, XCircle } from "lucide-react";
import { AppLayout } from "@/components/AppLayout";
import { MetricCard } from "@/components/MetricCard";
import { TrackingDistribution } from "@/components/TrackingDistribution";
import { TrackingTable } from "@/components/TrackingTable";
import { trackingMetrics } from "@/lib/mock-data";
import { formatNumber } from "@/lib/format";

export const Route = createFileRoute("/tracking")({
  head: () => ({
    meta: [
      { title: "Tracking Codes — Lumix Recovery" },
      { name: "description", content: "Acompanhamento de eventos de envio e entrega." },
    ],
  }),
  component: TrackingPage,
});

function TrackingPage() {
  const m = trackingMetrics;
  return (
    <AppLayout title="Tracking Codes">
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          <MetricCard label="Total Enviados" icon={Send} value={formatNumber(m.totalSent)} />
          <MetricCard label="Info Received" icon={Package} value={formatNumber(m.infoReceived)} />
          <MetricCard
            label="Delivered"
            icon={CheckCircle}
            value={<span className="text-[#22c55e]">{formatNumber(m.delivered)}</span>}
          />
          <MetricCard
            label="Failed Attempt"
            icon={XCircle}
            value={<span className="text-[#ef4444]">{formatNumber(m.failed)}</span>}
          />
        </div>

        <TrackingDistribution />
        <TrackingTable />
      </div>
    </AppLayout>
  );
}
