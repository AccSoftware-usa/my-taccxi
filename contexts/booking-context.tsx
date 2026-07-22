"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  DEFAULT_VEHICLE_ID,
  vehicleIdToTitle,
  type VehicleId,
} from "@/lib/fleet";

export type BookingState = {
  pickup: string;
  destination: string;
  date: string;
  time: string;
  vehicleId: VehicleId;
};

type BookingContextValue = {
  booking: BookingState;
  setPickup: (v: string) => void;
  setDestination: (v: string) => void;
  setDate: (v: string) => void;
  setTime: (v: string) => void;
  setVehicleId: (id: VehicleId) => void;
  vehicleTitle: string;
};

const BookingContext = createContext<BookingContextValue | null>(null);

const initialState: BookingState = {
  pickup: "",
  destination: "",
  date: "",
  time: "",
  vehicleId: DEFAULT_VEHICLE_ID,
};

export function BookingProvider({ children }: { children: ReactNode }) {
  const [booking, setBooking] = useState<BookingState>(initialState);

  const setPickup = useCallback((pickup: string) => {
    setBooking((prev) => ({ ...prev, pickup }));
  }, []);

  const setDestination = useCallback((destination: string) => {
    setBooking((prev) => ({ ...prev, destination }));
  }, []);

  const setDate = useCallback((date: string) => {
    setBooking((prev) => ({ ...prev, date }));
  }, []);

  const setTime = useCallback((time: string) => {
    setBooking((prev) => ({ ...prev, time }));
  }, []);

  const setVehicleId = useCallback((vehicleId: VehicleId) => {
    setBooking((prev) => ({ ...prev, vehicleId }));
  }, []);

  const value = useMemo<BookingContextValue>(
    () => ({
      booking,
      setPickup,
      setDestination,
      setDate,
      setTime,
      setVehicleId,
      vehicleTitle: vehicleIdToTitle(booking.vehicleId),
    }),
    [booking, setPickup, setDestination, setDate, setTime, setVehicleId]
  );

  return (
    <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
  );
}

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) {
    throw new Error("useBooking must be used within BookingProvider");
  }
  return ctx;
}
