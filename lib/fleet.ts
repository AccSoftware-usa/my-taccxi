export type VehicleId = "sedan" | "suv" | "van";

export type Vehicle = {
  id: VehicleId;
  category: string;
  title: string;
  shortLabel: string;
  description: string;
  image: string;
  alt: string;
  passengers: number;
  luggage: number;
  features: string[];
};

export const VEHICLES: Vehicle[] = [
  {
    id: "sedan",
    category: "Casual",
    title: "Sedán Urbano",
    shortLabel: "Sedán",
    description:
      "La opción ideal para tus trayectos diarios. Comodidad, eficiencia y el mejor precio para moverte por la ciudad con total estilo.",
    image: "/brand/Sedan.jpg",
    alt: "Vehículo tipo sedán urbano",
    passengers: 4,
    luggage: 2,
    features: ["Wifi", "Carga USB"],
  },
  {
    id: "suv",
    category: "Premium",
    title: "Premium SUV",
    shortLabel: "SUV",
    description:
      "Experimenta el máximo nivel de confort. Perfecta para viajes ejecutivos, traslados al aeropuerto o simplemente viajar con mayor amplitud y lujo.",
    image: "/brand/SuvPremium.jpg",
    alt: "Vehículo SUV premium",
    passengers: 4,
    luggage: 4,
    features: ["Wifi", "Carga inalámbrica"],
  },
  {
    id: "van",
    category: "Grupal",
    title: "Van Ejecutiva",
    shortLabel: "Van",
    description:
      "La solución definitiva para grupos. Espacio de sobra para pasajeros y equipaje, asegurando que todos lleguen juntos con la comodidad que merecen.",
    image: "/brand/Van.jpg",
    alt: "Transporte tipo Van ejecutiva",
    passengers: 8,
    luggage: 6,
    features: ["Wifi", "Climatización"],
  },
];

export const DEFAULT_VEHICLE_ID: VehicleId = "sedan";

export function getVehicleById(id: VehicleId): Vehicle {
  return VEHICLES.find((v) => v.id === id) ?? VEHICLES[0];
}

export function getVehicleByTitle(title: string): Vehicle | undefined {
  return VEHICLES.find((v) => v.title === title);
}

export function vehicleIdToTitle(id: VehicleId): string {
  return getVehicleById(id).title;
}

export function titleToVehicleId(title: string): VehicleId {
  return getVehicleByTitle(title)?.id ?? DEFAULT_VEHICLE_ID;
}
