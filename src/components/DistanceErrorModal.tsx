"use client";

interface DistanceErrorModalProps {
  isOpen: boolean;
  onClose: () => void;
  distance: number;
}

export default function DistanceErrorModal({ isOpen, onClose, distance }: DistanceErrorModalProps) {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
      }}
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.6)",
          backdropFilter: "blur(4px)",
        }}
      />

      {/* Modal */}
      <div
        className="animate-fade-in-up card"
        style={{
          position: "relative",
          maxWidth: "420px",
          width: "100%",
          padding: "36px 28px",
          textAlign: "center",
          zIndex: 1,
        }}
      >
        {/* Error Icon */}
        <div
          style={{
            width: "80px",
            height: "80px",
            borderRadius: "50%",
            background: "var(--error-light)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "2.5rem",
            margin: "0 auto 20px",
            boxShadow: "0 0 20px rgba(239, 68, 68, 0.2)",
          }}
        >
          🚫
        </div>

        <h2 style={{ fontSize: "1.3rem", fontWeight: 800, marginBottom: "12px", color: "var(--error)" }}>
          Jarak Terlalu Jauh!
        </h2>

        <p style={{ color: "var(--foreground-secondary)", fontSize: "0.9rem", lineHeight: "1.6", marginBottom: "8px" }}>
          Lokasi yang Anda pilih berjarak <strong style={{ color: "var(--foreground)" }}>{distance.toFixed(1)} km</strong> dari toko kami.
        </p>
        <p style={{ color: "var(--foreground-secondary)", fontSize: "0.9rem", lineHeight: "1.6", marginBottom: "24px" }}>
          Layanan antar hanya tersedia dalam radius <strong style={{ color: "var(--primary)" }}>20 km</strong> dari lokasi toko.
        </p>

        {/* Info box */}
        <div
          style={{
            padding: "14px",
            borderRadius: "var(--radius-md)",
            background: "var(--background-secondary)",
            marginBottom: "24px",
            fontSize: "0.85rem",
            color: "var(--foreground-secondary)",
          }}
        >
          💡 <strong>Tips:</strong> Pilih lokasi yang lebih dekat atau gunakan metode <strong>&quot;Ambil Sendiri&quot;</strong> di toko kami.
        </div>

        <div style={{ display: "flex", gap: "12px" }}>
          <button
            onClick={onClose}
            style={{
              flex: 1,
              padding: "14px",
              borderRadius: "var(--radius-md)",
              border: "1.5px solid var(--border)",
              background: "var(--background-elevated)",
              color: "var(--foreground)",
              fontWeight: 700,
              cursor: "pointer",
              transition: "all 0.2s",
              fontSize: "0.9rem",
            }}
          >
            Pilih Ulang Lokasi
          </button>
        </div>
      </div>
    </div>
  );
}
