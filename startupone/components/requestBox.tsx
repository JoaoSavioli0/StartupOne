import { Button } from "primereact/button";
import { deserialize } from "v8";

export default function RequestBox() {
  const exampleRequest = {
    title: "Furadeira",
    description: "",
    days: 3,
  };

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
      <div className="py-4"></div>
    </div>
  );
}
