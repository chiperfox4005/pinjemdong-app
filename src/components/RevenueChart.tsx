"use client";

import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler
);

interface ChartDataPoint {
  name: string;
  revenue: number;
}

interface RevenueChartProps {
  data: ChartDataPoint[];
}

function formatRupiah(num: number): string {
  if (num >= 1000000) return `Rp ${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `Rp ${(num / 1000).toFixed(0)}k`;
  return `Rp ${num}`;
}

export default function RevenueChart({ data }: RevenueChartProps) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Detect dark mode based on standard class or media query if available
    const checkDark = () => {
      setIsDark(document.documentElement.classList.contains("dark") || 
        window.matchMedia('(prefers-color-scheme: dark)').matches);
    };
    checkDark();
    // Optional: listen for theme changes
  }, []);

  if (!data || data.length === 0) return null;

  const chartData = {
    labels: data.map(d => d.name),
    datasets: [
      {
        label: "Pendapatan",
        data: data.map(d => d.revenue),
        fill: true,
        borderColor: "#10b981",
        backgroundColor: "rgba(16, 185, 129, 0.2)",
        tension: 0.4,
        pointBackgroundColor: "#10b981",
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: isDark ? "#1e293b" : "#fff",
        titleColor: isDark ? "#f8fafc" : "#0f172a",
        bodyColor: isDark ? "#cbd5e1" : "#475569",
        borderColor: isDark ? "#334155" : "#e2e8f0",
        borderWidth: 1,
        padding: 12,
        displayColors: false,
        callbacks: {
          label: function(context: any) {
            return `Pendapatan: Rp ${new Intl.NumberFormat("id-ID").format(context.raw)}`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: isDark ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.05)",
          drawBorder: false,
        },
        ticks: {
          color: isDark ? "#94a3b8" : "#64748b",
          callback: function(value: any) {
            return formatRupiah(value);
          }
        }
      },
      x: {
        grid: {
          display: false,
          drawBorder: false,
        },
        ticks: {
          color: isDark ? "#94a3b8" : "#64748b",
          maxTicksLimit: 10,
        }
      }
    }
  };

  return (
    <div className="card" style={{ padding: "32px", borderRadius: "var(--radius-xl)", marginBottom: "36px", height: "450px", position: "relative" }}>
      <div style={{ marginBottom: "20px" }}>
        <h3 style={{ fontWeight: 800, fontSize: "1.3rem", margin: 0, color: "var(--foreground)" }}>Tren Pendapatan</h3>
        <p style={{ color: "var(--foreground-muted)", fontSize: "0.9rem", margin: "6px 0 0 0" }}>30 Hari Terakhir</p>
      </div>
      <div style={{ height: "calc(100% - 60px)", width: "100%" }}>
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
}
