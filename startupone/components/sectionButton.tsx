import { PlusIcon } from "@phosphor-icons/react";

class SelectionButtonProps {
    title!: string;
    icon!: string;
}

export default function SelectionButtonComponent({title, icon} : SelectionButtonProps){
    return(
        <div className="size-[100px] rounded-md bg-white flex flex-col items-center justify-between py-3 cursor-pointer">
            <i className={`pi pi-${icon}`} style={{ color: '#2B7FFF', fontSize: "25px" }}></i>
            <span className="font-medium text-blue-500 text-sm text-center">{title}</span>
        </div>
    )
}