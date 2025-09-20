"use client"

import SelectionButton from "@/components/sectionButton";
import SolicitationBoxComponent from "@/components/solicitationBox";
import { BellSimpleIcon, ListIcon } from "@phosphor-icons/react";
import { Button } from "primereact/button";

export default function HomePage(){
    return (
        <div className="w-full h-screen flex justify-center items-center bg-[#F5F6F8]">
            <div className="w-min flex flex-col">
                <div className="w-full h-[100px] rounded-md bg-gradient-to-r from-lime-600 to-blue-500 opacity-70 flex flex-col justify-center p-4 mt-12">
                    <h1 className="font-bold text-white text-xl">Seu endereco</h1>
                    <span className="font-light text-gray-200">Seu nome</span>
                </div>
                <div className="w-full flex mt-4 gap-x-2">
                    <SelectionButton title="Nova solicitacao" icon="plus" />
                    <SelectionButton title="Agendar espaco" icon="calendar" />
                    <SelectionButton title="Encontrar servicos" icon="wrench" />
                    <SelectionButton title="Minhas solicitacoes" icon="user" />
                </div>
                <div className="w-full flex flex-col gap-y-4 mt-4">
                    <SolicitationBoxComponent title="Botão do elevador com defeito" text="Defeito no botão x do elevador do prédio y" date="20/09/2025" />
                </div>
            </div>
        </div>
    )
}