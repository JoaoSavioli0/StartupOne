import { PlusIcon } from "@phosphor-icons/react";

class SelectionButtonProps {
  title!: string;
  icon!: string;
}

export default function SelectionButtonComponent({
  title,
  icon,
}: SelectionButtonProps) {
  return (
    <div className="size-[100px] rounded-md bg-white flex flex-col items-center justify-between py-3 cursor-pointer">
      <i
        className={`pi pi-${icon}`}
        style={{ color: "#155DFC", fontSize: "25px" }}
      ></i>
      <span className="font-medium text-gray-700 text-sm text-center">
        {title}
      </span>
    </div>
  );
}
