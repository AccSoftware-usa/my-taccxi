"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, CircleMarker, Tooltip } from "react-leaflet";
import type { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";

type Zone = {
  name: string;
  coords: LatLngExpression;
  pickupMin: number;
};

const zones: Zone[] = [
  { name: "Miami", coords: [25.7617, -80.1918], pickupMin: 5 },
  { name: "Fort Lauderdale", coords: [26.1224, -80.1373], pickupMin: 7 },
  { name: "West Palm Beach", coords: [26.7153, -80.0534], pickupMin: 9 },
  { name: "Boca Raton", coords: [26.3683, -80.1289], pickupMin: 8 },
];

const center: LatLngExpression = [26.1, -80.15];

export function CoverageMap() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className="aspect-[4/3] w-full animate-pulse rounded-3xl bg-taccxi-dark-300"
        aria-label="Cargando mapa de cobertura"
      />
    );
  }

  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-white/10 shadow-[0_0_40px_rgba(255,0,0,0.12)]">
      <MapContainer
        center={center}
        zoom={9}
        scrollWheelZoom={false}
        className="h-full w-full z-0"
        aria-label="Mapa interactivo de cobertura Taccxi"
      >
        <TileLayer
          attribution='&copy; <a href="https://carto.com/">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        {zones.map((zone) => (
          <CircleMarker
            key={zone.name}
            center={zone.coords}
            radius={10}
            pathOptions={{ color: "#ff0000", fillColor: "#ff0000", fillOpacity: 0.85, weight: 2 }}
          >
            <Tooltip direction="top" offset={[0, -8]} opacity={0.95}>
              <span className="font-semibold">{zone.name}</span>
              <br />
              Recogida ~{zone.pickupMin} min
            </Tooltip>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
}
