"use client";

import NewBookingBoxComponent from "@/components/newBookingBox";
import NewSolicitationBox from "@/components/newSolicitationBox";
import SideBar from "@/components/sideBar";
import { ClientContext } from "@/context/ClientContext";
import {
  MockDataContext,
  Request,
  Solicitation,
  Survey,
} from "@/context/MockDataContext";
import { calcAge, formatDate } from "@/utils/date";
import { Button } from "primereact/button";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import { useContext, useMemo, useState } from "react";

export default function ProfilePage() {
  const useClient = () => useContext(ClientContext) as any;
  const useMockData = () => useContext(MockDataContext) as any;

  const [showButton, setShowButton] = useState<
    "solicitacoes" | "agendamentos" | "pedidos" | "enquetes"
  >("solicitacoes");

  const [search, setSearch] = useState("");

  const { loggedUser, mockSolicitations, mockRequests, mockSurveys } =
    useMockData() as {
      loggedUser: any;
      mockSolicitations: Solicitation[];
      mockRequests: Request[];
      mockSurveys: Survey[];
    };

  const userSolicitations = mockSolicitations
    .filter((s) => s.userData.id == loggedUser.id)
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

  const userRequests = mockRequests
    .filter((r) => r.userData.id == loggedUser.id)
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

  const userBookings = [
    {
      id: 1,
      createdAt: new Date("2025-10-14"),
      date: new Date("2025-10-29"),
      period: "17:00-21:00",
      place: "Área de churrasco 2",
      participants: 30,
      status: "Pendente",
    },
    {
      id: 2,
      createdAt: new Date("2025-07-21"),
      date: new Date("2025-08-03"),
      period: "19:00-21:00",
      place: "Salão de Festas",
      participants: 30,
      status: "Concluído",
    },
  ];

  const filteredUserSolicitations = useMemo(() => {
    const lowerSearch = search.toLowerCase().trim();
    if (!lowerSearch) return userSolicitations;

    return userSolicitations.filter(
      (s) =>
        s.title.toLowerCase().includes(lowerSearch) ||
        s.text.toLowerCase().includes(lowerSearch) ||
        s.userData.name.includes(lowerSearch)
    );
  }, [search, userSolicitations]);

  const filteredUserRequests = useMemo(() => {
    const lowerSearch = search.toLowerCase().trim();
    if (!lowerSearch) return userRequests;

    return userRequests.filter(
      (r) =>
        r.title.toLowerCase().includes(lowerSearch) ||
        r.description?.toLowerCase().includes(lowerSearch) ||
        r.userData.name.includes(lowerSearch)
    );
  }, [search, userRequests]);

  const filteredUserBookings = useMemo(() => {
    const lowerSearch = search.toLowerCase().trim();
    if (!lowerSearch) return userBookings;

    return userBookings.filter(
      (b) =>
        b.place.toLowerCase().includes(lowerSearch) ||
        b.period?.toLowerCase().includes(lowerSearch) ||
        formatDate(b.date.toISOString(), true).includes(lowerSearch)
    );
  }, [search, userBookings]);

  return (
    <div className="w-full min-h-screen flex justify-center bg-[#F5F6F8] relative">
      <SideBar />

      <div className="w-full h-full flex items-center justify-center pl-[350px] ">
        <div className="w-[60%] h-full flex flex-col gap-y-2 py-4">
          {/* Caixa perfil */}
          <div className="w-full bg-white border border-gray-300 rounded-lg py-7 px-6 flex flex-col relative">
            <div className="w-full flex gap-x-4">
              <div className="absolute top-[15px] end-[15px] rounded-full p-[5px] hover:bg-zinc-100 transition-colors duration-200 cursor-pointer">
                <Button
                  icon="pi pi-pencil"
                  rounded
                  text
                  aria-label="Editar perfil"
                  className="!size-[32px]"
                />
              </div>
              <div className="rounded-full size-[100px] bg-gray-100 shrink-0"></div>
              <div className="flex flex-col w-full">
                <h1 className="text-xl font-semibold">{loggedUser.name}</h1>
                <h2 className="text-sm text-gray-500">{loggedUser.condo}</h2>
                <div className="grid grid-cols-1 mt-3 gap-y-1">
                  <span className="flex items-center gap-x-1.5 text-gray-600 text-sm">
                    <i
                      className="pi pi-map-marker"
                      style={{ fontSize: "0.9rem" }}
                    ></i>
                    {loggedUser.place}
                  </span>
                  <span className="flex items-center gap-x-1.5 text-gray-600 text-sm">
                    <i
                      className="pi pi-phone"
                      style={{ fontSize: "0.9rem" }}
                    ></i>
                    {loggedUser.phone}
                  </span>
                  <span className="flex items-center gap-x-1.5 text-gray-600 text-sm">
                    <i
                      className="pi pi-envelope"
                      style={{ fontSize: "0.8rem" }}
                    ></i>
                    {loggedUser.email}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Escolher exibição */}
          <div className="w-full rounded-lg border border-gray-300 bg-gray-200 grid grid-cols-4 p-1 *:p-1 *:text-sm *:cursor-pointer *:text-center *:rounded-md">
            <button
              className={`${
                showButton == "solicitacoes" ? "bg-white shadow-xs" : ""
              }`}
              onClick={() => setShowButton("solicitacoes")}
            >
              Solicitações
            </button>
            <button
              className={`${
                showButton == "agendamentos" ? "bg-white shadow-xs" : ""
              }`}
              onClick={() => setShowButton("agendamentos")}
            >
              Agendamentos
            </button>
            <button
              className={`${
                showButton == "pedidos" ? "bg-white shadow-xs" : ""
              }`}
              onClick={() => setShowButton("pedidos")}
            >
              Pedidos
            </button>
            <button
              className={`${
                showButton == "enquetes" ? "bg-white shadow-xs" : ""
              }`}
              onClick={() => setShowButton("enquetes")}
            >
              Enquetes
            </button>
          </div>

          {/* Título e pesquisa */}
          <div className="w-full flex items-center justify-between mt-2 h-[40px]">
            <h1 className="text-lg font-medium">
              {showButton === "solicitacoes"
                ? "Solicitações"
                : showButton === "agendamentos"
                ? "Agendamentos"
                : showButton === "pedidos"
                ? "Pedidos"
                : "Enquetes"}{" "}
              (
              {showButton === "solicitacoes"
                ? userSolicitations.length
                : showButton === "agendamentos"
                ? userBookings.length
                : showButton === "pedidos"
                ? userRequests.length
                : "0"}
              )
            </h1>
            <div className="flex items-center gap-x-1.5 h-full">
              <IconField>
                <InputIcon className="pi pi-search"> </InputIcon>
                <InputText
                  placeholder="Pesquisar"
                  className="!h-[40px]"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </IconField>
              <Button
                icon="pi pi-sliders-h"
                text
                aria-label="Editar perfil"
                className="!size-[40px] rounded-md border"
              />
            </div>
          </div>

          {/* Solicitações */}
          {showButton === "solicitacoes" && (
            <div className="w-full flex flex-col mt-4 gap-y-2">
              {filteredUserSolicitations.map((s) => (
                <div
                  key={s.id}
                  className="bg-white border border-gray-300 rounded-lg flex flex-col p-5 relative cursor-pointer hover:scale-[101%] transition-transform"
                >
                  <Button
                    icon="pi pi-trash"
                    rounded
                    text
                    severity="danger"
                    aria-label="Fechar"
                    className="!absolute top-[15px] end-[15px] !size-[32px]"
                  />
                  <div className="flex gap-x-1.5 items-center text-gray-500">
                    <h2 className="text-xs">
                      Criado em {formatDate(s.createdAt.toISOString(), true)}
                    </h2>
                    <i
                      className="pi pi-circle-fill"
                      style={{ fontSize: "0.3rem" }}
                    ></i>
                    <h2 className="text-xs">
                      {calcAge(s.createdAt.toISOString())}
                    </h2>
                  </div>
                  <h1 className=" font-medium max-w-[85%]">{s.text}</h1>

                  <div className="w-full mt-1 flex gap-x-1.5">
                    <span className="text-xs text-gray-500">
                      {s.tags?.join(", ")}
                    </span>
                  </div>

                  <div className="w-full flex justify-between items-center mt-3">
                    <div className="flex items-center gap-x-4">
                      <div className="flex gap-x-1.5 items-center text-sm">
                        <i
                          className="pi pi-arrow-up"
                          style={{ fontSize: "0.7rem" }}
                        ></i>
                        0
                      </div>

                      <div className="flex gap-x-1.5 items-center text-sm">
                        <i
                          className="pi pi-comment"
                          style={{ fontSize: "0.85rem" }}
                        ></i>
                        0
                      </div>
                    </div>

                    <span
                      className={`rounded-full text-white py-0.5 px-3 text-xs font-medium ${
                        s.status === "Concluído"
                          ? "bg-green-600"
                          : s.status === "Pendente"
                          ? "bg-orange-400"
                          : "bg-primary"
                      }`}
                    >
                      {s.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Agendamentos */}
          {showButton === "agendamentos" && (
            <div className="w-full flex flex-col mt-4 gap-y-2">
              {filteredUserBookings.map((b) => (
                <div
                  key={b.id}
                  className="bg-white border border-gray-300 rounded-lg flex flex-col p-5 relative cursor-pointer hover:scale-[101%] transition-transform"
                >
                  <Button
                    icon="pi pi-trash"
                    rounded
                    text
                    severity="danger"
                    aria-label="Fechar"
                    className="!absolute top-[15px] end-[15px] !size-[32px]"
                  />
                  <div className="flex gap-x-1.5 items-center text-gray-500">
                    <h2 className="text-xs">
                      Criado em {formatDate(b.createdAt.toISOString(), true)}
                    </h2>
                    <i
                      className="pi pi-circle-fill"
                      style={{ fontSize: "0.3rem" }}
                    ></i>
                    <h2 className="text-xs">
                      {calcAge(b.createdAt.toISOString())}
                    </h2>
                  </div>

                  <h1 className="max-w-[85%] font-medium">{b.place}</h1>
                  <h1 className="max-w-[85%] w-fit text-sm px-2 py-1 bg-gray-100 rounded-md">
                    {formatDate(b.date.toISOString(), true)} -{" "}
                    {b.period.replace("-", " às ")}
                  </h1>

                  <div className="w-full mt-1 flex gap-x-1.5">
                    <span className="text-xs text-gray-500">
                      {b.participants} pessoas
                    </span>
                  </div>

                  <div className="w-full flex justify-end items-center mt-3">
                    <span
                      className={`rounded-full text-white py-0.5 px-3 text-xs font-medium ${
                        b.status === "Concluído"
                          ? "bg-green-600"
                          : b.status === "Pendente"
                          ? "bg-orange-400"
                          : "bg-primary"
                      }`}
                    >
                      {b.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pedidos */}
          {showButton === "pedidos" && (
            <div className="w-full flex flex-col mt-4 gap-y-2">
              {filteredUserRequests.map((r) => (
                <div
                  key={r.id}
                  className="bg-white border border-gray-300 rounded-lg flex flex-col p-5 relative cursor-pointer hover:scale-[101%] transition-transform"
                >
                  <Button
                    icon="pi pi-trash"
                    rounded
                    text
                    severity="danger"
                    aria-label="Fechar"
                    className="!absolute top-[15px] end-[15px] !size-[32px]"
                  />
                  <div className="flex gap-x-1.5 items-center text-gray-500">
                    <h2 className="text-xs">
                      Criado em {formatDate(r.createdAt.toISOString(), true)}
                    </h2>
                    <i
                      className="pi pi-circle-fill"
                      style={{ fontSize: "0.3rem" }}
                    ></i>
                    <h2 className="text-xs">
                      {calcAge(r.createdAt.toISOString())}
                    </h2>
                  </div>

                  <h1 className="max-w-[85%] font-medium">{r.title}</h1>

                  <div className="flex mt-3 items-center w-full gap-x-4 justify-end">
                    <span
                      className={`rounded-full text-white py-0.5 px-3 text-xs font-medium ${
                        r.status === "Concluído"
                          ? "bg-green-600"
                          : r.status === "Pendente"
                          ? "bg-orange-400"
                          : "bg-primary"
                      }`}
                    >
                      {r.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
