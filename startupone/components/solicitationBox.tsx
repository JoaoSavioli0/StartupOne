import { CaretCircleDownIcon, CaretCircleUpIcon, ChatCircleIcon, DotsThreeOutlineVerticalIcon, DotsThreeVerticalIcon } from "@phosphor-icons/react";

class SolicitationBoxProps {
    title!: string;
    text!: string;
    date!: string;
}

export default function SolicitationBoxComponent({title, text, date}: SolicitationBoxProps){
    const tags = ["Infraestrutura", "Elevadores", "Mobilidade"]
    return(
        <div className="w-full rounded-md p-3 bg-white flex flex-col relative">
            <div className="absolute top-[15px] end-[15px] rounded-full p-[5px] hover:bg-zinc-100 transition-colors duration-200 cursor-pointer">
                <DotsThreeOutlineVerticalIcon size={20} fill="#3F85FF" weight="fill" />
            </div>
                <h1 className="font-semibold">{title}</h1>
                <div className="flex gap-x-0.5">
                {tags.map(tag => (
                    <span className="py-[1px] px-1 bg-zinc-100 rounded-sm text-xs">{tag}</span>
                ))}
                </div>

            <div className="w-full h-[400px] bg-blue-100 rounded-md my-2"></div>

            <div className="w-full mt-1 flex items-center justify-between">
                <button className="rounded-sm flex items-center gap-x-1.5 hover:bg-zinc-100 transition-colors duration-200 p-1 px-2 cursor-pointer">
                    <ChatCircleIcon fill="#388BFF" size={22} weight="bold" className="mb-[1px]"/>
                    <span className="font-medium">Comentar</span>
                </button>

                <div className="flex gap-x-1">
                    <div className="flex items-center">
                        <span className="font-medium mr-2 text-2xl">0</span>
                        <button className="cursor-pointer hover:bg-zinc-100 transition-colors duration-200 rounded-full">
                            <CaretCircleUpIcon size={34} fill="#3F85FF"/>
                        </button>
                    </div>
                    <button className="cursor-pointer hover:bg-zinc-100 transition-colors duration-200 rounded-full">
                        <CaretCircleDownIcon size={34} fill="#3F85FF"/>
                    </button>
                </div>
            </div>
        </div>
    )
}