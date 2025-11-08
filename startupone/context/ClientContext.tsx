"use client";

import { useRouter } from "next/navigation";
import { Toast } from "primereact/toast";
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

export type toastProps = {
  type:
  | "success"
  | "info"
  | "warn"
  | "error"
  | "secondary"
  | "contrast"
  | undefined;
  title: string;
  text: string;
  duration?: number;
};

export const ClientContext = createContext({});

export function ClientProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const toast = useRef<Toast | null>(null);

  const [isNewSolicitationOpen, setIsNewSolicitationOpen] = useState(false);
  const [solicitationStep, setSolicitationStep] = useState(1);
  const [solicitationType, setSolicitationType] = useState(0);
  const [isNewBookingOpen, setIsNewBookingOpen] = useState(false);
  const [bookingStep, setBookingStep] = useState(1);
  const [bookingPlaceId, setBookingPlaceId] = useState(0);
  const [solicitationHeader, setSolicitationHeader] = useState("");
  const [boxHeader, setBoxHeader] = useState("");

  const closeNewSolicitation = () => {
    setIsNewSolicitationOpen(false);
  };

  const openNewSolicitation = (type: number, header: string) => {
    setSolicitationType(type);
    setSolicitationStep(2);
    setSolicitationHeader(header);
    setIsNewSolicitationOpen(true);
  };

  const closeNewBooking = () => {
    setBookingPlaceId(0);
    setIsNewBookingOpen(false);
    setBookingStep(1);
  };
  const openNewBooking = (place: number = 0) => {
    setBookingPlaceId(place);
    setIsNewBookingOpen(true);
  };

  const showToast = ({ type, title, text, duration }: toastProps) => {
    if (!toast.current) return;
    toast.current?.show({
      severity: type,
      summary: title,
      detail: text,
      life: duration,
    });
  };

  const scrollYRef = useRef<number | null>(null);

  useEffect(() => {
    const body = document.body;
    if (isNewBookingOpen || isNewSolicitationOpen) {
      body.style.overflow = "hidden";
    }

    return () => {
      body.style.overflow = "";
    };
  }, [isNewBookingOpen, isNewSolicitationOpen]);

  return (
    <ClientContext.Provider
      value={{
        showToast,
        router,
        isNewSolicitationOpen,
        setIsNewSolicitationOpen,
        solicitationStep,
        setSolicitationStep,
        solicitationType,
        setSolicitationType,
        closeNewSolicitation,
        openNewSolicitation,
        isNewBookingOpen,
        bookingPlaceId,
        bookingStep,
        setBookingStep,
        closeNewBooking,
        openNewBooking,
        solicitationHeader,
        setSolicitationHeader,
        boxHeader,
        setBoxHeader,
      }}
    >
      <Toast ref={toast} position="top-right" />
      <div
        className={`${isNewSolicitationOpen || isNewBookingOpen ? "overflow-y-hidden" : ""
          }`}
      >
        {children}
      </div>
    </ClientContext.Provider>
  );
}

export function useClient() {
  return useContext(ClientContext);
}
