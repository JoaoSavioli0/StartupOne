"use client";

import SelectionButton from "@/components/sectionButton";
import SolicitationBox from "@/components/solicitationBox";
import NewBookingBoxComponent from "@/components/newBookingBox";
import { addLocale, locale } from "primereact/api";
import { useContext, useEffect, useState } from "react";
import FastCreation from "@/components/fastCreation";
import SideBar from "@/components/sideBar";
import NewSolicitationBox from "@/components/newSolicitationBox";
import { BookingInfo } from "../models/condoClasses";
import { useRouter } from "next/navigation";
import SurveyBox from "@/components/surveyBox";
import RequestBox from "@/components/requestBox";
import { feedItem, MockDataContext } from "@/context/MockDataContext";

export default function HomePage() {
  const router = useRouter();
  useEffect(() => {
    // registra as traduções para pt-BR
    addLocale("pt-BR", {
      firstDayOfWeek: 0,
      dayNames: [
        "domingo",
        "segunda-feira",
        "terça-feira",
        "quarta-feira",
        "quinta-feira",
        "sexta-feira",
        "sábado",
      ],
      dayNamesShort: ["dom", "seg", "ter", "qua", "qui", "sex", "sáb"],
      dayNamesMin: ["D", "S", "T", "Q", "Q", "S", "S"],
      monthNames: [
        "janeiro",
        "fevereiro",
        "março",
        "abril",
        "maio",
        "junho",
        "julho",
        "agosto",
        "setembro",
        "outubro",
        "novembro",
        "dezembro",
      ],
      monthNamesShort: [
        "jan",
        "fev",
        "mar",
        "abr",
        "mai",
        "jun",
        "jul",
        "ago",
        "set",
        "out",
        "nov",
        "dez",
      ],
      today: "Hoje",
      clear: "Limpar",
    });

    // define pt-BR como padrão
    locale("pt-BR");
  }, []);

  const useMockData = () => useContext(MockDataContext) as any;

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

  const [isNewSolicitationOpen, setIsNewSolicitationOpen] = useState(false);
  const [solicitationStep, setSolicitationStep] = useState(1);
  const [solicitationType, setSolicitationType] = useState(0);
  const [solicitationHeader, setSolicitationHeader] = useState("");

  const [isNewBookingOpen, setIsNewBookingOpen] = useState(false);
  const [bookingStep, setBookingStep] = useState(1);
  const [bookingPlaceId, setBookingPlaceId] = useState(0);

  const closeNewSolicitation = () => {
    setIsNewSolicitationOpen(false);
  };
  const openNewSolicitation = (type: number, header: string) => {
    setSolicitationType(type);
    setSolicitationHeader(header);
    setSolicitationStep(2);
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

  class Survey {
    id!: number;
    title!: string;
    options!: { label: string; value: number; votes: number }[];
  }
  class Solicitation {
    id!: number;
    title!: string;
    text!: string;
    place!: string;
    date!: string;
    tags?: string[];
    residentName!: string;
    residentAvatarUrl?: string;
    residentPlace!: string;
    status!: "Pendente" | "Em andamento" | "Concluído";
  }

  const { mockSolicitations, mockSurveys, sortedFeed } = useMockData();

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-[#F5F6F8] relative">
      <NewSolicitationBox
        isOpen={isNewSolicitationOpen}
        onClose={closeNewSolicitation}
        inheritedStep={solicitationStep}
        inheritedTitle={solicitationHeader}
        inheritedType={solicitationType}
        setStep={setSolicitationStep}
      />

      <NewBookingBoxComponent
        isOpen={isNewBookingOpen}
        onClose={closeNewBooking}
        inheritedStep={bookingStep}
        placeId={bookingPlaceId}
        setPlaceId={setBookingPlaceId}
        setStep={setBookingStep}
      />

      <SideBar
        onOpenSolicitation={openNewSolicitation}
        onOpenBooking={openNewBooking}
        router={router}
      />

      <div className="w-full h-full flex justify-center pl-[350px]">
        <div className="w-[630px] h-full flex flex-col gap-y-2 py-4">
          <FastCreation />
          <div className="w-full flex flex-col gap-y-4">
            {sortedFeed.map((item: feedItem) => {
              switch (item.type) {
                case "solicitation":
                  return (
                    <SolicitationBox
                      key={`sol-${item.id}`}
                      {...item.data}
                    />
                  );
                case "survey":
                  return (
                    <SurveyBox
                      key={`surv-${item.id}`}
                      {...item.data}
                    />
                  );
                case "request":
                  return (
                    <RequestBox
                      key={`req-${item.id}`}
                      {...item.data}
                    />
                  );
                default:
                  return null;
              }
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
