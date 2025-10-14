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
import { profissoes, tags } from "@/utils/lists";
import { InputTextarea } from "primereact/inputtextarea";
import FileUpload from "./fileUpload";
import { Dropdown } from "primereact/dropdown";
import { constants } from "node:crypto";

interface NewSolicitationProps {
  isOpen: boolean;
  onClose: () => void;
  inheritedType: number;
  inheritedStep: number;
  setStep: (newStep: number) => void;
  inheritedTitle?: string;
}

export default function NewSolicitationBox({
  isOpen,
  onClose,
  inheritedType,
  inheritedStep,
  inheritedTitle,
  setStep,
}: NewSolicitationProps) {
  const [itemRequest, setItemRequest] = useState({
    itemName: "",
    period: 1,
    days: "",
  });

  const [jobRequest, setJobRequest] = useState({
    occupation: "",
    description: "",
  });

  const [newSurvey, setNewSurvey] = useState({
    title: "",
    options: [] as { label: string; value: number }[],
  });

  const periodOptions = [
    { name: "Por pouco tempo", value: 1 },
    { name: "Por um período", value: 2 },
  ];

  const [titleText, setTitleText] = useState("");
  const [descriptionText, setDescriptionText] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);

  const nextStep = (newStep: number) => {
    setStep(newStep);
  };

  const validSolicitation = (): boolean => {
    return descriptionText.length > 0 && titleText.length > 0;
  };

  const addSurveyOption = () => {
    setNewSurvey({
      ...newSurvey,
      options: newSurvey.options.concat({
        label: "",
        value: newSurvey.options.length + 1,
      }),
    });
  };

  const closeBox = () => {
    setTitleText("");
    setDescriptionText("");
    setSelectedTags([]);
    setItemRequest({ itemName: "", period: 1, days: "" });
    setJobRequest({ occupation: "", description: "" });
    setNewSurvey({ title: "", options: [] });
    onClose();
  };

  return (
    <div>
      <Dialog
        header={inheritedTitle}
        visible={isOpen}
        onHide={() => {
          if (!isOpen) return;
          closeBox();
        }}
        style={{ width: "30vw" }}
        breakpoints={{ "960px": "75vw", "641px": "100vw" }}
        draggable={false}
        resizable={false}
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

          {/* Etapa 1 Pedir item*/}
          {inheritedType == 1 && inheritedStep == 2 && (
            <form className="mt-4 flex flex-col gap-y-4 py-1 w-full z-50">
              <FloatLabel>
                <InputText
                  id="item"
                  value={itemRequest.itemName}
                  onChange={(e) =>
                    setItemRequest({ ...itemRequest, itemName: e.target.value })
                  }
                  className="w-full"
                />
                <label htmlFor="item">O que você precisa?</label>
              </FloatLabel>

              <div className="card flex justify-content-center w-full">
                <SelectButton
                  className="w-full *:w-1/2"
                  value={itemRequest.period}
                  onChange={(e) =>
                    setItemRequest({ ...itemRequest, period: e.value })
                  }
                  optionLabel="name"
                  options={periodOptions}
                />
              </div>
              {itemRequest.period == 2 && (
                <FloatLabel className="mt-3">
                  <InputText
                    id="item"
                    value={itemRequest.days}
                    onChange={(e) =>
                      setItemRequest({ ...itemRequest, days: e.target.value })
                    }
                    className="w-full"
                    keyfilter="int"
                    maxLength={2}
                  />
                  <label htmlFor="item">Por quantos dias?</label>
                </FloatLabel>
              )}

              <Button label="Solicitar" className="!bg-primary" />
            </form>
          )}

          {/* Etapa 1 Pedir serviço*/}
          {inheritedType == 3 && inheritedStep == 2 && (
            <form className="mt-4 flex flex-col gap-y-4 py-1 w-full z-50">
              <FloatLabel>
                <Dropdown
                  value={jobRequest.occupation}
                  onChange={(e) =>
                    setJobRequest({ ...jobRequest, occupation: e.target.value })
                  }
                  options={profissoes}
                  optionLabel="occupation"
                  placeholder="Selecione"
                  filter
                  className="w-full"
                />
                <label htmlFor="item">Que profissional você precisa?</label>
              </FloatLabel>

              <FloatLabel className="mt-3">
                <InputText
                  id="item"
                  value={jobRequest.description}
                  onChange={(e) =>
                    setJobRequest({
                      ...jobRequest,
                      description: e.target.value,
                    })
                  }
                  className="w-full"
                />
                <label htmlFor="item">Descreva o trabalho brevemente</label>
              </FloatLabel>

              <Button label="Solicitar" className="!bg-primary" />
            </form>
          )}

          {/* Etapa 1 Criar enquete*/}
          {inheritedType == 4 && inheritedStep == 2 && (
            <form className="mt-1 flex flex-col gap-y-4 py-1 w-full z-50">
              <FloatLabel className="mt-3">
                <InputText
                  id="item"
                  value={newSurvey.title}
                  onChange={(e) =>
                    setNewSurvey({ ...newSurvey, title: e.target.value })
                  }
                  className="w-full"
                />
                <label htmlFor="item">Título da enquete</label>
              </FloatLabel>

              <div className="flex flex-col gap-y-2">
                <p className="block font-normal text-[11px] text-gray-500 ml-3">
                  Opções ({newSurvey.options.length}/5)
                </p>

                {newSurvey.options.map((option, index) => (
                  <input
                    key={option.value}
                    className="w-full rounded-lg border border-gray-300 flex items-center justify-between h-[50px] px-4 relative  hover:bg-gray-100 transition-colors duration-150 outline-none"
                    value={
                      newSurvey.options.find(
                        (opt) => opt.value === option.value
                      )?.label || ""
                    }
                    onChange={(e) =>
                      setNewSurvey({
                        ...newSurvey,
                        options: [
                          ...newSurvey.options.slice(0, index),
                          {
                            label: e.target.value,
                            value: option.value,
                          },
                          ...newSurvey.options.slice(index + 1),
                        ],
                      })
                    }
                  ></input>
                ))}
              </div>

              {newSurvey.options.length < 5 && (
                <div
                  onClick={addSurveyOption}
                  className="w-full rounded-lg cursor-pointer border-primary text-primary border-2 border-dotted size-[45px] flex items-center justify-center hover:bg-gray-50 transition-colors duration-100"
                >
                  <i className="pi pi-plus"></i>
                </div>
              )}

              <Button label="Solicitar" className="!bg-primary" />
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
                className="!bg-primary"
              />
            </form>
          )}
        </div>
      </Dialog>
    </div>
  );
}
