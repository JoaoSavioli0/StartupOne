"use client";

import SolicitationBox from "@/components/solicitationBox";
import NewBookingBoxComponent from "@/components/newBookingBox";
import { addLocale, locale } from "primereact/api";
import { useContext, useEffect, useMemo, useState } from "react";
import FastCreation from "@/components/fastCreation";
import SideBar from "@/components/sideBar";
import NewSolicitationBox from "@/components/newSolicitationBox";
import SurveyBox from "@/components/surveyBox";
import RequestBox from "@/components/requestBox";
import { FeedItem, MockDataContext } from "@/context/MockDataContext";
import { ClientContext } from "@/context/ClientContext";

export default function HomePage() {
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
  const useClient = () => useContext(ClientContext) as any;

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

  const { sortedFeed } = useMockData() as { sortedFeed: FeedItem[] };

  const [search, setSearch] = useState("");

  const filteredUserSolicitations = useMemo(() => {
    const lowerSearch = search.toLowerCase().trim();
    if (!lowerSearch) return sortedFeed;

    return sortedFeed.filter(
      (i) =>
        i.label.toLowerCase().includes(lowerSearch) ||
        lowerSearch.includes(i.label.toLowerCase())
    );
  }, [search, sortedFeed]);

  const {
    router,
    isNewSolicitationOpen,
    closeNewSolicitation,
    solicitationStep,
    boxHeader,
    solicitationType,
    setSolicitationStep,
    isNewBookingOpen,
    closeNewBooking,
    bookingStep,
    bookingPlaceId,
    setBookingPlaceId,
    setBookingStep,
    openNewSolicitation,
    openNewBooking,
  } = useClient();

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-[#F5F6F8] relative">
      <SideBar />

      <div className="w-full h-full flex justify-center pl-[350px]">
        <div className="w-[60%] h-full flex flex-col gap-y-2 py-4">
          <FastCreation />
          <div className="w-full flex flex-col gap-y-4">
            {sortedFeed.map((item: FeedItem) => {
              switch (item.type) {
                case "solicitation":
                  return (
                    <SolicitationBox key={`sol-${item.id}`} {...item.data} />
                  );
                case "survey":
                  return <SurveyBox key={`surv-${item.id}`} {...item.data} />;
                case "request":
                  return <RequestBox key={`req-${item.id}`} {...item.data} />;
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
