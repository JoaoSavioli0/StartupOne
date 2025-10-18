import {
  BellIcon,
  DotsThreeOutlineVerticalIcon,
  PencilSimpleIcon,
} from "@phosphor-icons/react";
import { Badge } from "primereact/badge";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import { useRouter } from "next/router";
import NotificationsBox from "./notificationsBox";

interface SideBarProps {
  onOpenSolicitation: (type: number, header: string) => void;
  onOpenBooking: (placeId: number) => void;
  router: any;
}

export default function SideBarComponent({
  onOpenSolicitation,
  onOpenBooking,
  router,
}: SideBarProps) {
  return (
    <div className="h-screen w-[350px] fixed start-0 top-0 border-r border-gray-300 bg-gray-50 flex flex-col items-center p-3">
      <div className="absolute top-[20px] end-[20px] z-[100]">
        <NotificationsBox />
      </div>

      <div className="flex p-3 w-full gap-x-2 relative">
        <div className="size-[55px] rounded-full bg-gray-200 shrink-0"></div>
        <div className="flex flex-col justify-center w-full">
          <div className="flex items-center gap-x-2">
            <h1 className="text-primary text-lg font-semibold">João Pedro</h1>
            <button className="cursor-pointer rounded-full p-1 transition-colors text-primary hover:bg-primary hover:text-white">
              <PencilSimpleIcon weight="fill" />
            </button>
          </div>
          <p className="text-gray-600 text-sm">Prédio x, Apto 101</p>
        </div>
      </div>

      <div className="w-full p-3">
        <IconField iconPosition="left" className="w-full">
          <InputIcon className="pi pi-search"> </InputIcon>
          <InputText placeholder="Pesquisar" className="w-full" />
        </IconField>
      </div>

      <div
        className="w-full flex flex-col gap-y-1
            *:h-[50px] *:w-full *:flex *:items-center *:gap-x-3 *:rounded-lg *:transition-colors *:duration-150 *:hover:bg-gray-200 *:p-4 *:cursor-pointer"
      >
        <button>
          <i
            className="pi pi-user text-primary shrink-0"
            style={{ fontSize: "1.2rem" }}
          ></i>
          <p className="">Minhas solicitações</p>
        </button>
        <button>
          <i
            className="pi pi-calendar text-primary shrink-0"
            style={{ fontSize: "1.2rem" }}
          ></i>
          <p className="">Meus agendamentos</p>
        </button>
      </div>
      <div className="border-b border-gray-300 w-[80%] my-2"></div>


      <div className="w-full flex flex-col gap-y-1
            *:h-[50px] *:w-full *:flex *:items-center *:gap-x-3 *:rounded-lg *:transition-colors *:duration-150 *:hover:bg-gray-200 *:p-4 *:cursor-pointer">
        <button onClick={() => onOpenSolicitation(2, "Nova solicitação")}>
          <i
            className="pi pi-plus text-primary shrink-0"
            style={{ fontSize: "1.2rem" }}
          ></i>
          <p className="">Nova solicitação</p>
        </button>
        <button onClick={() => onOpenSolicitation(3, "Novo pedido")}>
          <i
            className="pi pi-wrench text-primary shrink-0"
            style={{ fontSize: "1.2rem" }}
          ></i>
          <p className="">Pedir serviço</p>
        </button>
        <button onClick={() => onOpenSolicitation(1, "Novo pedido")}>
          <i
            className="pi pi-box text-primary shrink-0"
            style={{ fontSize: "1.2rem" }}
          ></i>
          <p className="">Pedir objeto</p>
        </button>
        <button onClick={() => onOpenSolicitation(4, "Nova enquete")}>
          <i
            className="pi pi-align-left text-primary shrink-0"
            style={{ fontSize: "1.2rem" }}
          ></i>
          <p className="">Criar enquete</p>
        </button>
        <button onClick={() => onOpenBooking(0)}>
          <i
            className="pi pi-calendar-plus text-primary shrink-0"
            style={{ fontSize: "1.2rem" }}
          ></i>
          <p className="">Agendar espaço</p>
        </button>
      </div>

      <div className="border-b border-gray-300 w-[80%] my-2"></div>

      <div
        className="w-full flex flex-col gap-y-1
            *:h-[50px] *:w-full *:flex *:items-center *:gap-x-3 *:rounded-lg *:transition-colors *:duration-150 *:hover:bg-gray-200 *:p-4 *:cursor-pointer"
      >
        <button>
          <div className="w-[1.2rem] h-full flex items-center justify-center">
            <i
              className="pi pi-cog text-primary shrink-0"
              style={{ fontSize: "1.2rem" }}
            ></i>
          </div>
          <p className="">Configurações</p>
        </button>
        <button>
          <div className="w-[1.2rem] h-full flex items-center justify-center">
            <i
              className="pi pi-info-circle text-primary shrink-0"
              style={{ fontSize: "1.2rem" }}
            ></i>
          </div>
          <p className="">Informações</p>
        </button>
        <button>
          <div className="w-[1.2rem] h-full flex items-center justify-center">
            <i
              className="pi pi-question-circle text-primary shrink-0"
              style={{ fontSize: "1.2rem" }}
            ></i>
          </div>
          <p className="">Ajuda</p>
        </button>
        <button
          onClick={() => {
            router.push("/login");
          }}
        >
          <div className="w-[1.2rem] h-full flex items-center justify-center">
            <i
              className="pi pi-sign-out text-primary shrink-0 -rotate-180"
              style={{ fontSize: "1rem" }}
            ></i>
          </div>
          <p className="">Sair</p>
        </button>
      </div>
    </div>
  );
}
