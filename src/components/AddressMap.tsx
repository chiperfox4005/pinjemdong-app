"use client";

import { useEffect, useRef, useState } from "react";

// Initial center point (could be anywhere, defaulting to Purwokerto/Store area)
const STORE_LAT = -7.429400676523995;
const STORE_LNG = 109.20833733987259;

interface AddressMapProps {
  onLocationSelect: (data: {
    lat: number;
    lng: number;
    address: string;
  }) => void;
  initialLat?: number;
  initialLng?: number;
}

export default function AddressMap({ onLocationSelect, initialLat, initialLng }: AddressMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const isInitializingRef = useRef(false);
  const markerRef = useRef<L.Marker | null>(null);
  const leafletRef = useRef<typeof import("leaflet") | null>(null);
  
  const [selectedLocation, setSelectedLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  
  const [mapLoaded, setMapLoaded] = useState(false);
  const [locatingGps, setLocatingGps] = useState(false);
  const [gpsError, setGpsError] = useState("");

  // Search states
  const [searchQuery, setSearchQuery] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [userLocationForSearch, setUserLocationForSearch] = useState<{lat: number, lng: number} | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current || isInitializingRef.current) return;
    isInitializingRef.current = true;

    // Dynamic import of Leaflet (client-side only)
    import("leaflet").then((L) => {
      // Prevent double initialization if StrictMode caused multiple promises to resolve
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if (!mapRef.current || (mapRef.current as any)._leaflet_id) return;

      // Fix default marker icons
      delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
        iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
        shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
      });

      const initialCenter: [number, number] = initialLat && initialLng ? [initialLat, initialLng] : [STORE_LAT, STORE_LNG];

      const map = L.map(mapRef.current, {
        center: initialCenter,
        zoom: 14,
        zoomControl: true,
      });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19,
      }).addTo(map);

      // If initial coordinates exist, place marker
      if (initialLat && initialLng) {
        const marker = L.marker([initialLat, initialLng], { draggable: true }).addTo(map);
        marker.bindPopup(
          `<div style="text-align:center;font-size:12px;"><strong>📍 Lokasi Disimpan</strong></div>`
        ).openPopup();
        markerRef.current = marker;

        setSelectedLocation({ lat: initialLat, lng: initialLng });

        // Drag handler
        marker.on("dragend", () => {
          const pos = marker.getLatLng();
          handleLocationUpdate(L, pos.lat, pos.lng, marker);
        });
      }

      // Click handler to place/move marker
      map.on("click", (e: L.LeafletMouseEvent) => {
        const { lat, lng } = e.latlng;

        if (markerRef.current) {
          markerRef.current.setLatLng([lat, lng]);
        } else {
          const marker = L.marker([lat, lng], { draggable: true }).addTo(map);
          markerRef.current = marker;

          marker.on("dragend", () => {
            const pos = marker.getLatLng();
            handleLocationUpdate(L, pos.lat, pos.lng, marker);
          });
        }

        handleLocationUpdate(L, lat, lng, markerRef.current!);
      });

      mapInstanceRef.current = map;
      leafletRef.current = L;
      setMapLoaded(true);
    });

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
      isInitializingRef.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialLat, initialLng]);

  const handleLocationUpdate = async (L: typeof import("leaflet"), lat: number, lng: number, marker: L.Marker) => {
    let addressName = `Lat: ${lat.toFixed(6)}, Lng: ${lng.toFixed(6)}`;

    marker.bindPopup(`<div style="text-align:center;font-size:12px;">⏳ Mencari alamat...</div>`).openPopup();

    try {
      const revRes = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
      if (revRes.ok) {
        const revData = await revRes.json();
        if (revData.display_name) {
          addressName = revData.display_name;
        }
      }
    } catch (err) {
      console.error(err);
    }

    setSelectedLocation({ lat, lng });

    marker.bindPopup(
      `<div style="text-align:center;font-size:12px;"><strong>📍 Lokasi Dipilih</strong></div>`
    ).openPopup();

    onLocationSelect({
      lat,
      lng,
      address: addressName,
    });
  };

  const handleLocateMe = () => {
    if (!navigator.geolocation) {
      setGpsError("Browser Anda tidak mendukung GPS.");
      return;
    }
    setLocatingGps(true);
    setGpsError("");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const L = leafletRef.current;
        const map = mapInstanceRef.current;
        if (!L || !map) { setLocatingGps(false); return; }

        map.setView([latitude, longitude], 15, { animate: true });

        if (markerRef.current) {
          markerRef.current.setLatLng([latitude, longitude]);
        } else {
          const marker = L.marker([latitude, longitude], { draggable: true }).addTo(map);
          markerRef.current = marker;
          marker.on("dragend", () => {
            const pos = marker.getLatLng();
            handleLocationUpdate(L, pos.lat, pos.lng, marker);
          });
        }

        handleLocationUpdate(L, latitude, longitude, markerRef.current!);
        setUserLocationForSearch({ lat: latitude, lng: longitude });
        setLocatingGps(false);
      },
      (err) => {
        setLocatingGps(false);
        switch (err.code) {
          case err.PERMISSION_DENIED:
            setGpsError("Akses lokasi ditolak. Izinkan di pengaturan browser.");
            break;
          case err.POSITION_UNAVAILABLE:
            setGpsError("Lokasi tidak tersedia. Coba lagi.");
            break;
          case err.TIMEOUT:
            setGpsError("Waktu habis. Coba lagi.");
            break;
          default:
            setGpsError("Gagal mendapatkan lokasi.");
        }
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  // Debounced Auto-Search
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchQuery.trim().length >= 3) {
        performSearch(searchQuery);
      } else if (searchQuery.trim().length === 0) {
        setSearchResults([]);
      }
    }, 600); // 600ms debounce

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, userLocationForSearch]);

  const performSearch = async (query: string) => {
    setIsSearching(true);
    setGpsError("");

    const centerLat = userLocationForSearch ? userLocationForSearch.lat : STORE_LAT;
    const centerLng = userLocationForSearch ? userLocationForSearch.lng : STORE_LNG;
    const viewbox = `${centerLng - 0.3},${centerLat + 0.3},${centerLng + 0.3},${centerLat - 0.3}`;

    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&viewbox=${viewbox}&bounded=0&limit=5`);
      const data = await res.json();
      setSearchResults(data);
      if (data.length === 0) {
        setGpsError("Lokasi tidak ditemukan. Coba kata kunci lain.");
      }
    } catch (err) {
      setGpsError("Gagal mencari lokasi. Pastikan koneksi internet stabil.");
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div style={{ marginTop: "12px", position: "relative" }}>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.css"
      />

      {/* Search Box */}
      <div style={{ position: "relative", marginBottom: "10px", zIndex: 20 }}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Ketik nama jalan, tempat, patokan..."
          style={{
            width: "100%", padding: "12px 14px", borderRadius: "var(--radius-md)",
            border: "1.5px solid var(--border)", background: "var(--background-elevated)", color: "var(--foreground)", outline: "none",
            fontSize: "0.9rem", paddingRight: "40px", boxSizing: "border-box",
          }}
        />
        {isSearching && (
          <div style={{ position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)", fontSize: "1.2rem", animation: "spin 1s linear infinite" }}>
            ⏳
          </div>
        )}

        {/* Search Results */}
        {searchResults.length > 0 && (
          <div className="animate-fade-in-up" style={{
            position: "absolute", top: "100%", left: 0, right: 0,
            marginTop: "4px", borderRadius: "var(--radius-md)", border: "1.5px solid var(--border)",
            background: "var(--background-elevated)", overflow: "hidden", zIndex: 50,
            boxShadow: "0 8px 24px rgba(0,0,0,0.15)", maxHeight: "260px", overflowY: "auto",
          }}>
            {searchResults.map((result, i) => (
              <div
                key={i}
                onClick={() => {
                  const lat = parseFloat(result.lat);
                  const lng = parseFloat(result.lon);
                  const L = leafletRef.current;
                  const map = mapInstanceRef.current;
                  if (!L || !map) return;

                  map.setView([lat, lng], 16, { animate: true });
                  
                  if (markerRef.current) {
                    markerRef.current.setLatLng([lat, lng]);
                  } else {
                    const marker = L.marker([lat, lng], { draggable: true }).addTo(map);
                    markerRef.current = marker;
                    marker.on("dragend", () => {
                      const pos = marker.getLatLng();
                      handleLocationUpdate(L, pos.lat, pos.lng, marker);
                    });
                  }
                  
                  handleLocationUpdate(L, lat, lng, markerRef.current!);
                  setSearchResults([]);
                  setSearchQuery(result.display_name.split(",")[0]);
                }}
                style={{
                  padding: "12px 14px", borderBottom: i < searchResults.length - 1 ? "1px solid var(--border)" : "none",
                  cursor: "pointer", color: "var(--foreground)", transition: "background 0.2s",
                }}
                onMouseOver={(e) => e.currentTarget.style.background = "var(--background-secondary)"}
                onMouseOut={(e) => e.currentTarget.style.background = "transparent"}
              >
                <strong style={{ fontSize: "0.9rem", display: "block", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>📍 {result.display_name.split(",")[0]}</strong>
                <div style={{ fontSize: "0.75rem", color: "var(--foreground-secondary)", marginTop: "4px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {result.display_name}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* GPS Locate Me Button */}
      <button
        onClick={handleLocateMe}
        disabled={locatingGps || !mapLoaded}
        type="button"
        style={{
          width: "100%",
          padding: "12px",
          marginBottom: "10px",
          borderRadius: "var(--radius-md)",
          border: "1.5px solid var(--border)",
          background: "var(--background-elevated)",
          color: "var(--foreground)",
          fontWeight: 700,
          fontSize: "0.85rem",
          cursor: locatingGps ? "wait" : "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
          transition: "all 0.2s",
          opacity: locatingGps ? 0.7 : 1,
        }}
      >
        {locatingGps ? (
          <>
            <span style={{ animation: "pulse-glow 1.5s infinite" }}>📡</span>
            Mencari lokasi Anda...
          </>
        ) : (
          <>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="3" />
              <path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
            </svg>
            Gunakan Lokasi GPS Saya
          </>
        )}
      </button>

      {/* GPS Error */}
      {gpsError && (
        <div style={{
          padding: "8px 12px", marginBottom: "8px", borderRadius: "var(--radius-sm)",
          background: "var(--warning-light)", color: "var(--warning)",
          fontSize: "0.8rem", fontWeight: 600,
        }}>
          ⚠️ {gpsError}
        </div>
      )}
      
      {/* Map Container */}
      <div
        ref={mapRef}
        style={{
          width: "100%",
          height: "280px",
          borderRadius: "var(--radius-md)",
          border: "1.5px solid var(--border)",
          overflow: "hidden",
          position: "relative",
          zIndex: 1,
        }}
        className="delivery-map-container"
      />

      <style>{`
        @media (max-width: 640px) {
          .delivery-map-container {
            height: 320px !important;
          }
        }
      `}</style>

      {/* Instructions */}
      {!selectedLocation && mapLoaded && (
        <div
          className="animate-fade-in"
          style={{
            marginTop: "10px",
            padding: "10px 14px",
            borderRadius: "var(--radius-sm)",
            background: "var(--primary-light)",
            fontSize: "0.8rem",
            color: "var(--primary)",
            fontWeight: 600,
            textAlign: "center",
          }}
        >
          📍 Klik pada peta untuk memilih lokasi alamat
        </div>
      )}

      {/* Distance Info */}
      {selectedLocation && (
        <div
          className="animate-fade-in"
          style={{
            marginTop: "10px",
            padding: "12px 14px",
            borderRadius: "var(--radius-sm)",
            background: "var(--success-light)",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <span style={{ fontSize: "1.2rem" }}>📍</span>
          <div>
            <div style={{ fontWeight: 700, fontSize: "0.85rem", color: "var(--success)" }}>
              Titik lokasi berhasil dipilih
            </div>
            <div style={{ fontSize: "0.75rem", color: "var(--success)", opacity: 0.8 }}>
              {selectedLocation.lat.toFixed(6)}, {selectedLocation.lng.toFixed(6)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
