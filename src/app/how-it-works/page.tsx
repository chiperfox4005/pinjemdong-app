"use client";

import Link from "next/link";

const steps = [
  {
    step: "01",
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
    title: "Eksplorasi Katalog",
    desc: "Jelajahi ribuan barang premium dari berbagai kategori. Gunakan fitur pencarian cerdas kami untuk menemukan alat yang paling sesuai dengan kebutuhan Anda.",
    details: ["Filter pintar berdasarkan harga & rating", "Pantau ketersediaan unit secara real-time", "Baca ulasan transparan dari komunitas"],
  },
  {
    step: "02",
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
    title: "Pilih Tanggal Sewa",
    desc: "Tentukan rentang tanggal menggunakan kalender interaktif kami. Sistem pintar akan mengalkulasi total biaya sewa Anda secara otomatis.",
    details: ["Pemilihan tanggal fleksibel", "Pengecekan bentrok jadwal otomatis", "Kalkulasi harga transparan tanpa biaya tersembunyi"],
  },
  {
    step: "03",
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>,
    title: "Verifikasi Identitas",
    desc: "Demi keamanan ekosistem, lakukan verifikasi identitas satu kali saja. Proses didukung AI sehingga selesai dalam hitungan menit.",
    details: ["Pindai KTP dengan aman", "Verifikasi wajah instan", "Data dienkripsi secara end-to-end"],
  },
  {
    step: "04",
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>,
    title: "Pembayaran Instan",
    desc: "Selesaikan transaksi dalam hitungan detik menggunakan berbagai metode pembayaran digital. Konfirmasi berlangsung instan 24/7.",
    details: ["Dukung QRIS, Virtual Account, & E-Wallet", "Bayar DP fleksibel atau Lunas", "Konfirmasi otomatis tanpa tunggu admin"],
  },
  {
    step: "05",
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>,
    title: "Pengiriman / Ambil",
    desc: "Barang pesanan Anda akan dikemas dengan aman. Pilih opsi pengiriman instan ke rumah Anda, atau ambil langsung di hub kami.",
    details: ["Self-Pickup gratis tanpa antre", "Pengiriman instan aman dan terasuransi", "Protokol pengecekan barang ganda"],
  },
  {
    step: "06",
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 2v6h6M21.5 22v-6h-6"/><path d="M22 11.5A10 10 0 0 0 3.2 7.2M2 12.5a10 10 0 0 0 18.8 4.2"/></svg>,
    title: "Pengembalian Mudah",
    desc: "Nikmati masa sewa Anda. Saatnya mengembalikan? Sistem kami akan mengingatkan Anda, atau perpanjang masa sewa langsung dari aplikasi.",
    details: ["Pengingat pintar sebelum masa sewa habis", "Opsi perpanjangan fleksibel", "Pengembalian deposit kilat setelah verifikasi"],
  },
];

export default function HowItWorksPage() {
  return (
    <div style={{ position: "relative", minHeight: "100vh", overflow: "hidden", paddingBottom: "100px" }}>
      {/* Cinematic Backgrounds */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, backgroundImage: 'radial-gradient(var(--border) 1px, transparent 1px)', backgroundSize: '40px 40px', opacity: 0.4, zIndex: -2 }}></div>
      <div style={{ position: "absolute", top: "-10%", right: "-10%", width: "50vw", height: "50vw", background: "radial-gradient(circle, rgba(124, 58, 237, 0.08) 0%, transparent 60%)", filter: "blur(40px)", zIndex: -1 }}></div>
      <div style={{ position: "absolute", bottom: "10%", left: "-10%", width: "40vw", height: "40vw", background: "radial-gradient(circle, rgba(16, 185, 129, 0.05) 0%, transparent 60%)", filter: "blur(40px)", zIndex: -1 }}></div>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "40px 24px" }}>
        
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "40px", position: "relative" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "6px 14px", borderRadius: "100px", background: "var(--background-elevated)", border: "1px solid var(--border)", boxShadow: "0 4px 15px rgba(0,0,0,0.05)", marginBottom: "16px" }}>
            <span style={{ width: "6px", height: "6px", background: "var(--primary)", borderRadius: "50%", animation: "pulse 2s infinite" }}></span>
            <span style={{ fontSize: "0.75rem", fontWeight: 800, letterSpacing: "0.05em", color: "var(--foreground)", textTransform: "uppercase" }}>Panduan Cepat</span>
          </div>
          <h1 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 900, margin: "0 0 12px 0", letterSpacing: "-0.03em", color: "var(--foreground)" }}>
            Cara <span className="gradient-text" style={{ paddingRight: "8px" }}>Sewa Barang</span>
          </h1>
          <p style={{ color: "var(--foreground-muted)", fontSize: "1.05rem", maxWidth: "600px", margin: "0 auto", lineHeight: 1.5 }}>
            Enam langkah serba otomatis agar Anda bisa fokus menikmati momen.
          </p>
        </div>

        {/* Timeline Container / Grid */}
        <div style={{ position: "relative" }}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 position-relative z-10">
            {steps.map((step, i) => {
              return (
                <div
                  key={step.step}
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <div style={{ 
                    background: "var(--background)", border: "1px solid var(--border)", 
                    borderRadius: "24px", padding: "28px", boxShadow: "0 10px 30px rgba(0,0,0,0.03)",
                    position: "relative", overflow: "hidden", height: "100%",
                    display: "flex", flexDirection: "column",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease"
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = "translateY(-5px)";
                    e.currentTarget.style.boxShadow = "0 20px 40px rgba(124, 58, 237, 0.08)";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.03)";
                  }}
                  >
                    {/* Subtle background number watermark */}
                    <div style={{ position: "absolute", top: "-10px", right: "0px", fontSize: "6rem", fontWeight: 900, color: "var(--foreground)", opacity: 0.03, zIndex: 0, pointerEvents: "none", lineHeight: 1 }}>
                      {step.step}
                    </div>

                    <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", height: "100%" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "16px" }}>
                        <div style={{ 
                          width: "48px", height: "48px", borderRadius: "14px", background: "linear-gradient(135deg, rgba(124,58,237,0.1) 0%, rgba(124,58,237,0.02) 100%)",
                          border: "1px solid rgba(124,58,237,0.2)", display: "flex", alignItems: "center", justifyContent: "center",
                          color: "var(--primary)", flexShrink: 0
                        }}>
                          {step.icon}
                        </div>
                        <div>
                          <span style={{ fontSize: "0.7rem", fontWeight: 800, color: "var(--primary)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "2px", display: "block" }}>
                            Langkah {step.step}
                          </span>
                          <h3 style={{ fontSize: "1.1rem", fontWeight: 800, margin: 0, color: "var(--foreground)", lineHeight: 1.2 }}>
                            {step.title}
                          </h3>
                        </div>
                      </div>
                      
                      <p style={{ color: "var(--foreground-secondary)", lineHeight: 1.5, marginBottom: "20px", fontSize: "0.9rem" }}>
                        {step.desc}
                      </p>
                      
                      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "8px", marginTop: "auto" }}>
                        {step.details.map((detail, idx) => (
                          <li key={idx} style={{ color: "var(--foreground-muted)", fontSize: "0.85rem", display: "flex", alignItems: "flex-start", gap: "8px" }}>
                            <div style={{ marginTop: "2px", width: "14px", height: "14px", borderRadius: "50%", background: "rgba(16, 185, 129, 0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                              <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                            </div>
                            <span style={{ lineHeight: 1.4 }}>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Cinematic CTA */}
        <div style={{ textAlign: "center", marginTop: "60px", padding: "40px 24px", background: "var(--background-secondary)", borderRadius: "24px", border: "1px solid var(--border)", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: "60%", height: "100%", background: "radial-gradient(ellipse at top, rgba(124, 58, 237, 0.15) 0%, transparent 70%)", zIndex: 0 }}></div>
          
          <div style={{ position: "relative", zIndex: 1 }}>
            <h2 style={{ fontSize: "clamp(2rem, 4vw, 2.5rem)", fontWeight: 900, marginBottom: "16px", color: "var(--foreground)", letterSpacing: "-0.02em" }}>
              Siap Memulai <span className="gradient-text">Pengalaman Anda?</span>
            </h2>
            <p style={{ color: "var(--foreground-muted)", fontSize: "1.1rem", marginBottom: "32px", maxWidth: "500px", margin: "0 auto 32px" }}>
              Bergabunglah dengan ribuan pengguna lain yang telah mempercayakan momen spesial mereka bersama Pinjemdong.
            </p>
            
            <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/catalog" style={{ 
                padding: "16px 40px", borderRadius: "100px", fontWeight: 800, fontSize: "1.05rem", color: "#ffffff", textDecoration: "none",
                background: "linear-gradient(135deg, var(--primary) 0%, #4C1D95 100%)", boxShadow: "0 10px 30px rgba(124, 58, 237, 0.4)", transition: "transform 0.3s ease"
              }} className="hover-scale">
                Eksplorasi Katalog
              </Link>
              <Link href="/register" style={{ 
                padding: "16px 40px", borderRadius: "100px", fontWeight: 800, fontSize: "1.05rem", color: "var(--foreground)", textDecoration: "none",
                background: "var(--background)", border: "2px solid var(--border)", boxShadow: "0 4px 10px rgba(0,0,0,0.05)", transition: "transform 0.3s ease"
              }} className="hover-scale">
                Daftar Gratis
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
