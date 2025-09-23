"use client";

import SelectionButton from "@/components/sectionButton";
import SolicitationBox from "@/components/solicitationBox";
import NewSolicitationBox from "@/components/newSolicitationBox";
import { BellSimpleIcon, ListIcon } from "@phosphor-icons/react";
import { Button } from "primereact/button";

export default function HomePage() {
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

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-[#F5F6F8]">
      <div className="w-min h-full flex flex-col gap-y-2">
        <div className="w-full h-[100px] rounded-md bg-white flex flex-col justify-center p-4 mt-10">
          <div className="w-full h-full flex items-center gap-x-3">
            <div className="size-[60px] rounded-full flex items-center justify-center bg-gray-400">
              <h1 className="font-bold text-2xl text-white">
                {getNameFirstLetters()}
              </h1>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-blue-600 text-xl">
                {userExampleData.place}
              </span>
              <p className="font-medium text-gray-600">
                {userExampleData.name}
              </p>
            </div>
          </div>
        </div>
        <div className="w-full flex gap-x-2">
          <NewSolicitationBox />
          <SelectionButton title="Agendar espaco" icon="calendar" />
          <SelectionButton title="Encontrar servicos" icon="wrench" />
          <SelectionButton title="Minhas solicitacoes" icon="user" />
        </div>
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
