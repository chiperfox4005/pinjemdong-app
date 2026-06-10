"use client";

import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface TopProductDataPoint {
  name: string;
  total_rented: number;
}

interface TopProductsBarChartProps {
  data: TopProductDataPoint[];
}

export default function TopProductsBarChart({ data }: TopProductsBarChartProps) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const checkDark = () => {
      setIsDark(document.documentElement.classList.contains("dark") || 
        window.matchMedia('(prefers-color-scheme: dark)').matches);
    };
    checkDark();
  }, []);

  if (!data || data.length === 0) return (
    <div className="card" style={{ padding: "32px", borderRadius: "var(--radius-xl)", height: "350px", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <p style={{ color: "var(--foreground-muted)" }}>Belum ada data produk.</p>
    </div>
  );

  const chartData = {
    labels: data.map(d => d.name.length > 20 ? d.name.substring(0, 20) + "..." : d.name),
    datasets: [
      {
        label: "Total Disewa",
        data: data.map(d => d.total_rented),
        backgroundColor: "rgba(59, 130, 246, 0.8)", // Blue-500
        hoverBackgroundColor: "rgba(37, 99, 235, 1)", // Blue-600
        borderRadius: 6,
        borderSkipped: false,
      },
    ],
  };

  const options = {
    indexAxis: 'y' as const,
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: isDark ? "#1e293b" : "#ffffff",
        titleColor: isDark ? "#f8fafc" : "#0f172a",
        bodyColor: isDark ? "#cbd5e1" : "#475569",
        borderColor: isDark ? "#334155" : "#e2e8f0",
        borderWidth: 1,
        padding: 12,
      }
    },
    scales: {
      x: {
        grid: {
          color: isDark ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.05)",
          drawBorder: false,
        },
        ticks: {
          color: isDark ? "#94a3b8" : "#64748b",
          stepSize: 1,
        }
      },
      y: {
        grid: {
          display: false,
          drawBorder: false,
        },
        ticks: {
          color: isDark ? "#94a3b8" : "#475569",
          font: {
            family: "'Inter', sans-serif",
            weight: 600
          }
        }
      }
    }
  };

  return (
    <div className="card" style={{ padding: "32px", borderRadius: "var(--radius-xl)", height: "350px", position: "relative" }}>
      <div style={{ marginBottom: "20px" }}>
        <h3 style={{ fontWeight: 800, fontSize: "1.2rem", margin: 0, color: "var(--foreground)" }}>5 Produk Terlaris</h3>
        <p style={{ color: "var(--foreground-muted)", fontSize: "0.85rem", margin: "4px 0 0 0" }}>Produk Paling Sering Disewa</p>
      </div>
      <div style={{ height: "calc(100% - 60px)", width: "100%" }}>
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
}
