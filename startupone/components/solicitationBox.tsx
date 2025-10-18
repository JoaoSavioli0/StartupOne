import {
  ArrowUpIcon,
  CaretCircleDownIcon,
  CaretCircleUpIcon,
  ChatCircleIcon,
  ClockIcon,
  DotsThreeOutlineVerticalIcon,
  DotsThreeVerticalIcon,
  MapPinIcon,
} from "@phosphor-icons/react";
import { Button } from "primereact/button";
import { RadioButton } from "primereact/radiobutton";
import { Toast } from "primereact/toast";
import { useState } from "react";
import { calcAge } from "@/utils/date";

interface SolicitationBoxProps {
  id: number;
  title: string;
  text: string;
  place: string;
  date: string;
  tags?: string[];
  userData: { id: number, name: string, place: string }
  status: "Pendente" | "Em andamento" | "Concluído";
}

export default function SolicitationBoxComponent({
  id,
  title,
  text,
  date,
  tags = [],
  userData,
  place,
  status,
}: SolicitationBoxProps) {


  return (
    <div className="w-full rounded-lg p-3 bg-white flex flex-col relative shadow-md">
      <div className="absolute top-[15px] end-[15px] rounded-full p-[5px] hover:bg-zinc-100 transition-colors duration-200 cursor-pointer">
        <Button
          icon="pi pi-ellipsis-v"
          rounded
          text
          aria-label="Filter"
          className="!size-[32px]"
        />
      </div>
      <div className="flex gap-x-2">
        <div className="size-[35px] rounded-full bg-gray-200"></div>
        <div className="flex flex-col">
          <p className="font-semibold text-sm">{userData.name}</p>
          <p className="text-gray-600 text-xs">{userData.place}</p>
        </div>
      </div>

      <div className="flex gap-x-1 mt-2">
        {tags.map((tag) => (
          <span
            key={`${id}-${tag}`}
            className="py-[1px] px-1 bg-zinc-100 rounded-sm text-xs"
          >
            {tag}
          </span>
        ))}
      </div>

      <h1 className="font-semibold mt-0.5 text-lg">{title}</h1>

      <div className="flex gap-x-3">
        <div className="flex text-gray-500 items-center gap-x-1">
          <MapPinIcon size={14} />
          <p className="text-[13px]">{place}</p>
        </div>
        <div className="flex text-gray-500 items-center gap-x-1">
          <ClockIcon size={14} />
          <p className="text-[13px]">{calcAge(date)}</p>
        </div>
      </div>
      <p className="mt-4">{text}</p>

      <div className="flex h-[400px] w-full my-2 gap-x-1">
        <div className="w-1/2 h-full bg-blue-100 rounded-md"></div>
        <div className="w-1/2 h-full bg-blue-100 rounded-md"></div>
      </div>

      <div className="w-full flex items-center justify-between h-[35px]">
        <div className="flex h-full gap-x-2">
          <button className="flex gap-x-1.5 items-center h-full rounded-lg border border-gray-300 bg-gray-50 px-3 cursor-pointer transition-colors duration-150 hover:bg-primary hover:text-white">
            <ArrowUpIcon weight="bold" size={14} />
            <p className="font-medium text-sm">0</p>
          </button>

          <button className="h-full rounded-lg flex items-center gap-x-1.5 px-3 cursor-pointer transition-colors duration-150 hover:bg-primary hover:text-white">
            <ChatCircleIcon size={15} weight="bold" />
            <span className="text-sm font-medium">Comentários (0)</span>
          </button>
        </div>

        <div className="h-full items-center flex gap-x-1.5 text-orange-400 px-2">
          <ClockIcon weight="bold" />
          <p className="text-sm font-medium">Pendente</p>
        </div>
      </div>
    </div>
  );
}
