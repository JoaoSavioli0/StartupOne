import { Button } from "primereact/button";

export default function FastCreationComponent() {
  return (
    <div className="bg-white rounded-lg p-4 flex flex-col gap-3 shadow-md relative">
      <div className="flex items-start gap-3">
        <div className="size-[40px] rounded-full bg-gray-200"></div>
        <div className="flex flex-col">
          <h1 className="text-lg font-medium">Olá João!</h1>
          <p className="text-gray-600 text-sm">
            Sua última solicitação teve uma atualização!
          </p>
          <div className="flex w-full mt-4 gap-x-2 *:cursor-pointer *:px-3 *:py-1.5 *:rounded-md">
            <button className="bg-lime-600 text-white text-sm">
              Ver atualização
            </button>
            <button className="bg-gray-50 border border-gray-300 text-sm">
              Nova solicitação
            </button>
          </div>
        </div>
      </div>

      <Button
        icon="pi pi-times"
        rounded
        text
        severity="danger"
        aria-label="Fechar"
        className="!absolute top-[15px] end-[15px]"
      />
    </div>
  );
}
