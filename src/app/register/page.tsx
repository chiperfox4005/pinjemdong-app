"use client";

import { useEffect } from "react";

export default function RegisterPage() {
  useEffect(() => {
    // Redirect to login page with register mode
    window.location.href = "/login?mode=register";
  }, []);

  return (
    <div style={{ textAlign: "center", padding: "100px 20px" }}>
      <div style={{ fontSize: "2rem" }}>⏳</div>
      <p style={{ color: "var(--foreground-muted)", marginTop: "12px" }}>Mengalihkan ke halaman pendaftaran...</p>
    </div>
  );
}
