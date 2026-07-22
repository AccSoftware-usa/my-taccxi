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
  { name: "Pompano Beach", coords: [26.2379, -80.1248], pickupMin: 6 },
  { name: "Boca Raton", coords: [26.3683, -80.1289], pickupMin: 8 },
  { name: "West Palm Beach", coords: [26.7153, -80.0534], pickupMin: 9 },
  { name: "Tampa", coords: [27.9506, -82.4572], pickupMin: 12 },
];

const center: LatLngExpression = [27.05, -81.1];

function ZoneMarker({ zone }: { zone: Zone }) {
  return (
    <>
      <CircleMarker
        center={zone.coords}
        radius={20}
        pathOptions={{
          color: "#ff0000",
          fillColor: "#ff0000",
          fillOpacity: 0.12,
          weight: 1,
        }}
      />
      <CircleMarker
        center={zone.coords}
        radius={9}
        pathOptions={{
          color: "#ffffff",
          fillColor: "#ff0000",
          fillOpacity: 1,
          weight: 3,
        }}
      >
        <Tooltip direction="top" offset={[0, -10]} opacity={1}>
          <span className="font-semibold">{zone.name}</span>
          <br />
          Recogida ~{zone.pickupMin} min
        </Tooltip>
      </CircleMarker>
    </>
  );
}

export function CoverageMap() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className="aspect-[4/3] w-full animate-pulse rounded-3xl bg-[#dce3ea]"
        aria-label="Cargando mapa de cobertura"
      />
    );
  }

  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border-2 border-white/20 bg-[#dce3ea] p-1 shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_24px_60px_rgba(0,0,0,0.45),0_0_48px_rgba(255,0,0,0.08)] ring-1 ring-white/10">
      <div className="h-full w-full overflow-hidden rounded-[1.25rem]">
        <MapContainer
          center={center}
          zoom={7}
          scrollWheelZoom={false}
          className="coverage-map h-full w-full z-0"
          aria-label="Mapa interactivo de cobertura Taccxi"
        >
          <TileLayer
            attribution='&copy; <a href="https://carto.com/">CARTO</a> &copy; OpenStreetMap'
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          />
          {zones.map((zone) => (
            <ZoneMarker key={zone.name} zone={zone} />
          ))}
        </MapContainer>
      </div>

      <div className="pointer-events-none absolute bottom-4 left-4 rounded-xl border border-black/10 bg-white/90 px-3 py-2 shadow-lg backdrop-blur-sm">
        <p className="font-heading text-[0.6rem] font-bold uppercase tracking-[0.18em] text-taccxi-red">
          Zonas activas
        </p>
        <p className="mt-0.5 font-body text-xs text-taccxi-dark-200">
          {zones.length} ciudades · Sur de Florida
        </p>
      </div>
    </div>
  );
}
