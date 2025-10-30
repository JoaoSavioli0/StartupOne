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
import { useContext, useRef, useState } from "react";
import { calcAge } from "@/utils/date";
import { Galleria } from "primereact/galleria";
import { ClientContext } from "@/context/ClientContext";

interface GalleriaImage {
  itemImageSrc: string; // imagem grande
  thumbnailImageSrc?: string; // miniatura
  alt?: string; // texto alternativo
  title?: string; // título opcional
}

interface SolicitationBoxProps {
  id: number;
  title: string;
  text: string;
  place: string;
  createdAt: string;
  tags?: string[];
  userData: { id: number; name: string; place: string };
  status: "Pendente" | "Em andamento" | "Concluído";
  images: GalleriaImage[];
}

export default function SolicitationBoxComponent({
  id,
  title,
  text,
  createdAt,
  tags = [],
  userData,
  place,
  status,
  images,
}: SolicitationBoxProps) {
  const galleria = useRef<any>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const { router } = useContext(ClientContext) as any;

  const responsiveOptions = [
    {
      breakpoint: "1500px",
      numVisible: 5,
    },
    {
      breakpoint: "1024px",
      numVisible: 3,
    },
    {
      breakpoint: "768px",
      numVisible: 2,
    },
    {
      breakpoint: "560px",
      numVisible: 1,
    },
  ];

  const itemTemplate = (item: GalleriaImage) => {
    return (
      <img
        src={item.itemImageSrc}
        alt={item.alt}
        style={{ width: "100%", display: "block" }}

      />
    );
  };

  return (
    <div
      className="w-full rounded-lg p-3 bg-white flex flex-col relative shadow-xs cursor-pointer"
      onClick={() => router.push(`/solicitation/${id}`)}
    >
      <div onClick={(e) => e.stopPropagation()}>
        <Galleria
          ref={galleria}
          value={images}
          responsiveOptions={responsiveOptions}
          numVisible={9}
          style={{ maxWidth: "50%" }}
          activeIndex={activeImageIndex}
          onItemChange={(e) => setActiveImageIndex(e.index)}
          circular
          fullScreen
          showItemNavigators
          showThumbnails={false}
          item={itemTemplate}
        />
      </div>

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
          <p className="text-[13px]">{calcAge(createdAt)}</p>
        </div>
      </div>
      <p className="mt-4 break-words">{text}</p>

      {images && images.length > 0 && (
        <div className="grid grid-cols-2 grid-rows-2 mt-2 h-[400px] w-full gap-1 *:cursor-pointer" onClick={(e) => e.stopPropagation()}>
          {images.slice(0, 3).map((i, index) => (
            <div
              key={`${id}/${index}`}
              className={`h-full bg-blue-100 rounded-md relative overflow-hidden 
              ${images.length >= 3 && index > 0 ? "row-span-1" : "row-span-2"}
              ${images.length == 1 ? "col-span-2" : "col-span-1"}`}
              onClick={() => {
                setActiveImageIndex(index);
                galleria.current.show();
              }}
            >
              <img
                src={i.itemImageSrc}
                alt={title}
                className="w-full h-full object-cover"
              />
              {images.length >= 4 && index == 2 && (
                <div className="absolute top-0 end-0 w-full h-full bg-black/50 rounded-md">
                  <div className="w-full h-full flex items-center justify-center text-white font-medium text-4xl">
                    +{images.length - 2}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <div className="w-full flex items-center justify-between h-[35px] mt-4">
        <div className="flex h-full gap-x-2">
          <button className="flex gap-x-1.5 items-center h-full rounded-lg border border-gray-300 bg-gray-50 px-3 cursor-pointer transition-colors duration-150 hover:bg-primary hover:text-white">
            <i className="pi pi-arrow-up" style={{ fontSize: "0.7rem" }}></i>
            <p className="font-medium text-sm">0</p>
          </button>

          <button className="h-full rounded-lg flex items-center gap-x-1.5 px-3 cursor-pointer transition-colors duration-150 hover:bg-primary hover:text-white">
            <i className="pi pi-comment" style={{ fontSize: "0.9rem" }}></i>
            <span className="text-sm font-medium">Comentários (0)</span>
          </button>
        </div>

        <div className="h-full items-center flex gap-x-1.5 text-orange-400 px-2">
          <i className="pi pi-clock" style={{ fontSize: "0.9rem" }}></i>
          <p className="text-sm font-medium">Pendente</p>
        </div>
      </div>
    </div>
  );
}
