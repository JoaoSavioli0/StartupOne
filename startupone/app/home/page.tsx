"use client";

import SelectionButton from "@/components/sectionButton";
import SolicitationBox from "@/components/solicitationBox";
import NewBookingBoxComponent from "@/components/newBookingBox";
import { addLocale, locale } from "primereact/api";
import { useEffect, useState } from "react";
import FastCreation from "@/components/fastCreation";
import SideBar from "@/components/sideBar";
import NewSolicitationBox from "@/components/newSolicitationBox";
import { BookingInfo } from "../models/condoClasses";

export default function HomePage() {

  useEffect(() => {
    // registra as traduções para pt-BR
    addLocale("pt-BR", {
      firstDayOfWeek: 0,
      dayNames: ["domingo", "segunda-feira", "terça-feira", "quarta-feira", "quinta-feira", "sexta-feira", "sábado"],
      dayNamesShort: ["dom", "seg", "ter", "qua", "qui", "sex", "sáb"],
      dayNamesMin: ["D", "S", "T", "Q", "Q", "S", "S"],
      monthNames: ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"],
      monthNamesShort: ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"],
      today: "Hoje",
      clear: "Limpar"
    });

    // define pt-BR como padrão
    locale("pt-BR");
  }, [])

  const userExampleData = {
    id: 1,
    name: "João Pedro",
    place: "Prédio x, apto 284",
  };

  const getNameFirstLetters = () => {
    const fullName = userExampleData.name;
    const splitName = fullName.split(" ");
    const firstName = splitName[0];
    const lastName = splitName[splitName.length - 1];
    return firstName[0] + lastName[0].toLocaleLowerCase();
  };

  const [isNewSolicitationOpen, setIsNewSolicitationOpen] = useState(false)
  const [solicitationStep, setSolicitationStep] = useState(1)
  const [solicitationType, setSolicitationType] = useState(0)
  const [solicitationHeader, setSolicitationHeader] = useState("")

  const [isNewBookingOpen, setIsNewBookingOpen] = useState(false)
  const [bookingStep, setBookingStep] = useState(1)
  const [bookingPlaceId, setBookingPlaceId] = useState(0)

  const closeNewSolicitation = () => {
    setIsNewSolicitationOpen(false)
    setSolicitationType(0)
    setSolicitationStep(1)
    setSolicitationHeader("Escolha uma opção")
  }
  const openNewSolicitation = (type: number, header: string) => {
    setSolicitationType(type)
    setSolicitationHeader(header)
    setSolicitationStep(2)
    setIsNewSolicitationOpen(true)
  }

  const closeNewBooking = () => {
    setBookingPlaceId(0)
    setIsNewBookingOpen(false)
    setBookingStep(1)
  }
  const openNewBooking = (place: number = 0) => {
    setBookingPlaceId(place)
    setIsNewBookingOpen(true)
  }

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-[#F5F6F8] relative">
      <NewSolicitationBox
        isOpen={isNewSolicitationOpen}
        onClose={closeNewSolicitation}
        inheritedStep={solicitationStep}
        inheritedTitle={solicitationHeader}
        inheritedType={solicitationType}
        setStep={setSolicitationStep} />

      <NewBookingBoxComponent
        isOpen={isNewBookingOpen}
        onClose={closeNewBooking}
        inheritedStep={bookingStep}
        placeId={bookingPlaceId}
        setPlaceId={setBookingPlaceId}
        setStep={setBookingStep} />

      <SideBar onOpenSolicitation={openNewSolicitation} onOpenBooking={openNewBooking} />

      <div className="w-[35%] h-full flex flex-col gap-y-2">
        <FastCreation />
        <div className="w-full flex flex-col gap-y-4">
          <SolicitationBox
            title="Botão do elevador com defeito"
            text="Defeito no botão x do elevador do prédio y"
            date="20/09/2025"
          />
        </div>
      </div>
    </div>
  );
}
