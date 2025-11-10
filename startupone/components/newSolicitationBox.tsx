import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import {
  forwardRef,
  useContext,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
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
import { MockDataContext } from "@/context/MockDataContext";
import * as z from "zod";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { watch } from "node:fs";
import { ClientContext } from "@/context/ClientContext";

interface NewSolicitationProps {
  isOpen: boolean;
  onClose: () => void;
  inheritedType: number;
  inheritedStep: number;
  setStep: (newStep: number) => void;
  inheritedTitle?: string;
}

const newSolicitationSchema = z.object({
  title: z
    .string()
    .min(6, { message: "O título deve ter pelo menos 6 caracteres" }),
  description: z
    .string()
    .min(10, { message: "A descrição deve ter pelo menos 10 caracteres" }),
  tags: z.array(z.object({ name: z.string(), code: z.string() })).max(6),
  impact: z.string().nonempty(),
  place: z.string().nonempty(),
});

const newSurveySchema = z.object({
  title: z
    .string()
    .min(6, { message: "O título deve ter pelo menos 6 caracteres" }),
  options: z
    .array(
      z.object({
        label: z.string().min(1, { message: "Preencha todas as opções" }),
        value: z.number(),
      })
    )
    .min(2, { message: "A enquete deve ter pelo menos 2 opções" })
    .max(5, { message: "A enquete deve ter no máximo 5 opções" }),
});

export default function NewSolicitationBox({
  isOpen,
  onClose,
  inheritedType,
  inheritedStep,
  inheritedTitle,
  setStep,
}: NewSolicitationProps) {
  const { addSolicitation, addSurvey, loggedUser } = useContext(
    MockDataContext
  ) as any;

  const { showToast } = useContext(ClientContext) as any;

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

  const impactLevels = ["Alto", "Médio", "Baixo", "Sugestão"];

  const nextStep = (newStep: number) => {
    setStep(newStep);
  };

  const validSolicitation = (): boolean => {
    return (
      watchSolicitation("title", "").length > 0 &&
      watchSolicitation("description", "").length > 0
    );
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
    resetSolicitation();
    resetSurvey();
    setItemRequest({ itemName: "", period: 1, days: "" });
    setJobRequest({ occupation: "", description: "" });
    onClose();
  };

  // Tipos dos schemas
  // Solicitação
  type NewSolicitation = z.infer<typeof newSolicitationSchema>;
  type NewSurvey = z.infer<typeof newSurveySchema>;

  // Declarações do react hook forms
  // Solicitação
  const {
    control: controlSolicitation,
    register: registerSolicitation,
    handleSubmit: handleNewSolicitation,
    formState: { errors: errorsSolicitation },
    reset: resetSolicitation,
    watch: watchSolicitation,
  } = useForm<NewSolicitation>({
    resolver: zodResolver(newSolicitationSchema),
    defaultValues: {
      title: "",
      description: "",
      tags: [],
      impact: "",
    },
  });

  //Enquetes
  const {
    control: controlSurvey,
    register: registerSurvey,
    handleSubmit: handleNewSurvey,
    formState: { errors: errorsSurvey },
    reset: resetSurvey,
    watch: watchSurvey,
  } = useForm<NewSurvey>({
    resolver: zodResolver(newSurveySchema),
    defaultValues: {
      title: "",
      options: [
        { label: "", value: 1 },
        { label: "", value: 2 },
      ],
    },
  });

  const {
    fields: surveyOptions,
    append: appendOption,
    remove: removeOption,
  } = useFieldArray({
    control: controlSurvey,
    name: "options",
  });

  // handleSubmit dos forms
  // Solicitação
  const onSubmitNewSolicitation = (data: NewSolicitation) => {
    addSolicitation({
      title: data.title,
      text: data.description,
      tags: data.tags.map((tag) => tag.name) || [],
      createdAt: new Date(),
      place: "Prédio X",
      userData: {
        id: loggedUser.id,
        name: loggedUser.name,
        place: loggedUser.place,
      },
      status: "Pendente",
    });
    showToast({
      title: "Sucesso",
      text: "Solicitação criada com sucesso",
      duration: 6000,
      type: "success",
    });
    closeBox();
  };

  const onSubmitNewSurvey = (data: NewSurvey) => {
    addSurvey({
      title: data.title,
      options: data.options,
      userData: {
        id: loggedUser.id,
        name: loggedUser.name,
        place: loggedUser.place,
      },
      createdAt: new Date(),
    });
    showToast({
      title: "Sucesso",
      text: "Pedido criado com sucesso",
      duration: 6000,
      type: "success",
    });
    closeBox();
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
          {/* Tela opções */}
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
            <form
              onSubmit={handleNewSurvey(onSubmitNewSurvey)}
              className="mt-1 flex flex-col gap-y-4 py-1 w-full z-50"
            >
              <div>
                <FloatLabel className="mt-3">
                  <InputText
                    id="item"
                    {...registerSurvey("title")}
                    className="w-full"
                  />
                  <label htmlFor="item">Título da enquete</label>
                </FloatLabel>
                {errorsSurvey.title && (
                  <span className="text-red-500 text-xs">
                    {errorsSurvey.title.message}
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-y-2">
                <p className="block font-normal text-[11px] text-gray-500 ml-3">
                  Opções ({surveyOptions.length}/5)
                </p>

                {surveyOptions.map((option, index) => (
                  <div
                    key={`${option.id}-${option.value}`}
                    className="w-full rounded-lg border border-gray-300 flex items-center justify-between h-[50px] px-4 hover:bg-gray-50 transition-colors duration-150 outline-none relative"
                  >
                    <input
                      placeholder={`Opção ${index + 1}`}
                      className="w-[80%] h-full outline-none bg-transparent"
                      {...registerSurvey(`options.${index}.label` as const)}
                    ></input>
                    <Button
                      icon="pi pi-trash"
                      rounded
                      text
                      severity="danger"
                      aria-label="Fechar"
                      className="!size-[30px]"
                      type="button"
                      onClick={() => removeOption(index)}
                    />
                  </div>
                ))}
              </div>

              <div>
                {surveyOptions.length < 5 && (
                  <div
                    onClick={() =>
                      appendOption({
                        label: "",
                        value: surveyOptions.length + 1,
                      })
                    }
                    className="w-full rounded-lg cursor-pointer border-primary text-primary border-2 border-dotted size-[45px] flex items-center justify-center hover:bg-gray-50 transition-colors duration-100"
                  >
                    <i className="pi pi-plus"></i>
                  </div>
                )}
                {errorsSurvey.options && (
                  <span className="text-red-500 text-xs">
                    {errorsSurvey.options.message}
                  </span>
                )}
              </div>

              <Button
                disabled={
                  errorsSurvey.options != null || errorsSurvey.title != null
                }
                type="submit"
                label="Solicitar"
                className="!bg-primary"
              />
            </form>
          )}

          {/* Etapa 1 Solicitação*/}
          {inheritedType == 2 && inheritedStep == 2 && (
            <form
              onSubmit={handleNewSolicitation(onSubmitNewSolicitation)}
              className="mt-6 flex flex-col gap-y-8 w-full z-50"
            >
              <FloatLabel>
                <InputText
                  id="item"
                  {...registerSolicitation("title")}
                  className="w-full"
                  maxLength={40}
                />
                <label htmlFor="item">
                  Título
                  <span className="rounded-md bg-gray-100 px-1 ml-2">
                    {watchSolicitation("title", "").length}/40
                  </span>
                </label>
              </FloatLabel>

              <FloatLabel>
                <InputText
                  id="item"
                  {...registerSolicitation("place")}
                  className="w-full"
                  maxLength={50}
                />
                <label htmlFor="item">
                  Local da ocorrência
                  <span className="rounded-md bg-gray-100 px-1 ml-2">
                    {watchSolicitation("place", "").length}/50
                  </span>
                </label>
              </FloatLabel>

              <FloatLabel>
                <Dropdown
                  value={impactLevels}
                  inputId="impact"
                  {...registerSolicitation("impact")}
                  options={impactLevels}
                  optionLabel="impact"
                  className="w-full"
                />
                <label htmlFor="impact">Impacto</label>
              </FloatLabel>

              <FloatLabel>
                <InputTextarea
                  id="description"
                  {...registerSolicitation("description")}
                  className="w-full"
                  autoResize
                  maxLength={250}
                  rows={5}
                  cols={30}
                />
                <label htmlFor="description">
                  Descreva a reclamação
                  <span className="rounded-md bg-gray-100 px-1 ml-2">
                    {watchSolicitation("description", "").length}/250
                  </span>
                </label>
              </FloatLabel>

              <Controller
                name="tags"
                control={controlSolicitation}
                render={({ field }) => (
                  <FloatLabel>
                    <MultiSelect
                      value={field.value}
                      onChange={(e) => {
                        if (e.value.length <= 6) {
                          // setSelectedTags(e.value);
                          field.onChange(e.value);
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
                        {watchSolicitation("tags", []).length}/6
                      </span>
                    </label>
                  </FloatLabel>
                )}
              />
              {errorsSolicitation.tags && (
                <span className="text-red-500 text-xs">
                  {errorsSolicitation.tags.message}
                </span>
              )}

              <FileUpload />

              <Button
                type="submit"
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
