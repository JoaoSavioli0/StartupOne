import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import SelectionButton from "./sectionButton";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { Stepper } from "primereact/stepper";
import { StepperPanel } from "primereact/stepperpanel";
import {
  CameraIcon,
  CaretRightIcon,
  ChatsCircleIcon,
  ExclamationMarkIcon,
  ScrewdriverIcon,
} from "@phosphor-icons/react";
import { SelectButton } from "primereact/selectbutton";
import { MultiSelect } from "primereact/multiselect";
import { tags } from "@/utils/lists";
import { InputTextarea } from "primereact/inputtextarea";
import FileUpload from "./fileUpload";

interface NewSolicitationProps {
  isOpen: boolean;
  onClose: () => void;
  inheritedType: number;
  inheritedStep: number;
  setStep: (newStep: number) => void;
  inheritedTitle?: string;
}

export default function NewSolicitationBox({ isOpen, onClose, inheritedType, inheritedStep, inheritedTitle, setStep }: NewSolicitationProps) {
  const [itemName, setItemName] = useState("");
  const [selectedPeriod, setSelectedPeriod] = useState(1);
  const periodOptions = [
    { name: "Por pouco tempo", value: 1 },
    { name: "Por um período", value: 2 },
  ];

  const [titleText, setTitleText] = useState("");
  const [descriptionText, setDescriptionText] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);

  const nextStep = (newStep: number) => {
    setStep(newStep);
  }

  const backStep = () => {
    setStep(1);
  }

  const validSolicitation = (): boolean => {
    return descriptionText.length > 0 && titleText.length > 0;
  };

  return (
    <div>
      <Dialog
        header={inheritedTitle}
        visible={isOpen}
        onHide={() => {
          if (!isOpen) return;
          onClose();
        }}
        style={{ width: "30vw" }}
        breakpoints={{ "960px": "75vw", "641px": "100vw" }}
      >
        <div className="w-full min-h-[150px]">
          {inheritedType == 0 && inheritedStep == 1 && (
            <div className="flex flex-col gap-y-0.5">
              <button
                className="w-full flex items-center justify-between px-4 h-[50px] first:rounded-t-lg last:rounded-b-lg bg-gray-100 hover:bg-gray-200 transition-colors duration-100 cursor-pointer"
                onClick={() => {
                  nextStep(2);
                }}
              >
                <div className="flex gap-x-2">
                  <ScrewdriverIcon size={25} />
                  <span>Pedir objeto</span>
                </div>
                <CaretRightIcon size={25} weight="thin" />
              </button>

              <button
                className="w-full flex items-center justify-between px-4 h-[50px] first:rounded-t-lg last:rounded-b-lg bg-gray-100 hover:bg-gray-200 transition-colors duration-100 cursor-pointer"
                onClick={() => {
                  nextStep(2);
                }}
              >
                <div className="flex gap-x-2">
                  <ExclamationMarkIcon size={25} />
                  <span>Abrir reclamação</span>
                </div>
                <CaretRightIcon size={25} weight="thin" />
              </button>

              <button
                className="w-full flex items-center justify-between px-4 h-[50px] first:rounded-t-lg last:rounded-b-lg bg-gray-100 hover:bg-gray-200 transition-colors duration-100 cursor-pointer"
                onClick={() => {
                  nextStep(2);
                }}
              >
                <div className="flex gap-x-2">
                  <ChatsCircleIcon size={25} />
                  <span>Nova sugestão</span>
                </div>
                <CaretRightIcon size={25} weight="thin" />
              </button>
            </div>
          )}

          {/* Etapa 2 Pedido*/}
          {inheritedType == 1 && inheritedStep == 2 && (
            <form className="mt-4 flex flex-col gap-y-4 w-full z-50">
              <FloatLabel>
                <InputText
                  id="item"
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                  className="w-full"
                />
                <label htmlFor="item">O que você precisa?</label>
              </FloatLabel>

              <div className="card flex justify-content-center w-full">
                <SelectButton
                  className="w-full *:w-1/2"
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.value)}
                  optionLabel="name"
                  options={periodOptions}
                />
              </div>

              <Button label="Solicitar" className="!bg-sky-[#6366F1]" />
            </form>
          )}

          {/* Etapa 2 Reclamação*/}
          {inheritedType == 2 && inheritedStep == 2 && (
            <form className="mt-6 flex flex-col gap-y-8 w-full z-50">
              <FloatLabel>
                <InputText
                  id="item"
                  value={titleText}
                  onChange={(e) => setTitleText(e.target.value)}
                  className="w-full"
                />
                <label htmlFor="item">Título</label>
              </FloatLabel>

              <FloatLabel>
                <InputTextarea
                  id="description"
                  value={descriptionText}
                  onChange={(e) => setDescriptionText(e.target.value)}
                  className="w-full"
                  autoResize
                  maxLength={250}
                  rows={5}
                  cols={30}
                />
                <label htmlFor="description">
                  Descreva a reclamação
                  <span className="rounded-md bg-gray-100 px-1 ml-2">
                    {descriptionText.length}/250
                  </span>
                </label>
              </FloatLabel>

              <FloatLabel>
                <MultiSelect
                  value={selectedTags}
                  onChange={(e) => {
                    if (e.value.length <= 6) {
                      setSelectedTags(e.value);
                      console.log(selectedTags);
                    }
                  }}
                  options={tags}
                  optionLabel="name"
                  display="chip"
                  filter
                  maxSelectedLabels={6}
                  maxLength={6}
                  className="w-full md:w-20rem !text-xs"
                />
                <label htmlFor="item">
                  Gêneros da solicitação
                  <span className="rounded-md bg-gray-100 px-1 ml-2">
                    {selectedTags?.length}/6
                  </span>
                </label>
              </FloatLabel>

              <FileUpload />

              <Button
                label="Solicitar"
                disabled={!validSolicitation()}
                className="!bg-sky-[#6366F1]"
              />
            </form>
          )}
        </div>
      </Dialog>
    </div>
  );
}
