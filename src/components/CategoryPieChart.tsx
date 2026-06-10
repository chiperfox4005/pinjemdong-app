"use client";

import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

interface CategoryDataPoint {
  name: string;
  total_rented: number;
}

interface CategoryPieChartProps {
  data: CategoryDataPoint[];
}

export default function CategoryPieChart({ data }: CategoryPieChartProps) {
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
      <p style={{ color: "var(--foreground-muted)" }}>Belum ada data kategori.</p>
    </div>
  );

  const colors = [
    "#8b5cf6", // Violet
    "#3b82f6", // Blue
    "#10b981", // Emerald
    "#f59e0b", // Amber
    "#ef4444", // Red
    "#ec4899", // Pink
    "#14b8a6", // Teal
  ];

  const chartData = {
    labels: data.map(d => d.name),
    datasets: [
      {
        data: data.map(d => d.total_rented),
        backgroundColor: colors.slice(0, data.length).map(c => c + "E6"), // 90% opacity
        borderColor: isDark ? "#1e293b" : "#ffffff",
        borderWidth: 2,
        hoverOffset: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "70%",
    plugins: {
      legend: {
        position: 'right' as const,
        labels: {
          color: isDark ? "#94a3b8" : "#475569",
          usePointStyle: true,
          padding: 20,
          font: {
            family: "'Inter', sans-serif",
            size: 12,
            weight: 600
          }
        }
      },
      tooltip: {
        backgroundColor: isDark ? "#1e293b" : "#ffffff",
        titleColor: isDark ? "#f8fafc" : "#0f172a",
        bodyColor: isDark ? "#cbd5e1" : "#475569",
        borderColor: isDark ? "#334155" : "#e2e8f0",
        borderWidth: 1,
        padding: 12,
        callbacks: {
          label: function(context: any) {
            return ` ${context.label}: ${context.raw} Disewa`;
          }
        }
      }
    }
  };

  return (
    <div className="card" style={{ padding: "32px", borderRadius: "var(--radius-xl)", height: "350px", position: "relative" }}>
      <div style={{ marginBottom: "20px" }}>
        <h3 style={{ fontWeight: 800, fontSize: "1.2rem", margin: 0, color: "var(--foreground)" }}>Distribusi Kategori</h3>
        <p style={{ color: "var(--foreground-muted)", fontSize: "0.85rem", margin: "4px 0 0 0" }}>Berdasarkan Total Disewa</p>
      </div>
      <div style={{ height: "calc(100% - 60px)", width: "100%", position: "relative" }}>
        <Doughnut data={chartData} options={options} />
        <div style={{
          position: "absolute", top: "50%", left: "30%", transform: "translate(-50%, -50%)",
          textAlign: "center", pointerEvents: "none"
        }}>
          {/* Adjust left: 30% because legend is on the right */}
        </div>
      </div>
    </div>
  );
}
