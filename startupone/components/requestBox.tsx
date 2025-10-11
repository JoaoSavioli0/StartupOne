import { ChatCircleIcon, ClockIcon, HandHeartIcon } from "@phosphor-icons/react";
import { Button } from "primereact/button";
import { deserialize } from "v8";

interface RequestProps {
  type: string,
  title: string,
  description: string,
  days: number,
}

export default function RequestBox({ type, title, description, days }: RequestProps) {

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
          <p className="font-semibold text-sm">João Pedro</p>
          <p className="text-gray-600 text-xs">Apto 101</p>
        </div>
      </div>
      <div className="pt-4 flex gap-x-2 items-center">
        <i className="pi pi-wrench"></i>
        <h1 className="text-lg">Preciso de um(a) <span className="font-semibold">{title}</span>
          {type === "object" && (
            (days > 0 && <span> por {days} dias</span>) || <span> por um momento</span>)
          }
        </h1>
      </div>

      <div className="flex text-gray-500 items-center gap-x-1">
        <ClockIcon size={14} />
        <p className="text-[13px]">Há 38 minutos</p>
      </div>

      <p className="mt-4">{description}</p>

      <div className="w-full flex items-center justify-between h-[35px] mt-6">
        <div className="flex h-full gap-x-2">
          <button className="flex gap-x-1.5 items-center h-full rounded-lg border border-gray-300 bg-gray-50 px-3 cursor-pointer transition-colors duration-150 hover:bg-primary hover:text-white">
            <HandHeartIcon weight="regular" size={16} />
            <p className="font-medium text-sm">Posso ajudar</p>
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
