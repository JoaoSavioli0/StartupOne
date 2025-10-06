import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { useEffect, useState } from "react";
import SelectionButton from "./sectionButton";
import {
  CaretRightIcon,
  CircleIcon,
  InfoIcon,
  PlusIcon,
} from "@phosphor-icons/react";
import { BookingInfo, bookingTime } from "@/app/models/condoClasses";
import useEmblaCarousel from "embla-carousel-react";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";

interface NewBookingProps {
  isOpen: boolean;
  inheritedStep: number;
  placeId: number
  setStep: (newStep: number) => void;
  setPlaceId: (placeId: number) => void;
  onClose: () => void;
}

export default function NewBookingBoxComponent({ isOpen, onClose, inheritedStep, placeId, setStep, setPlaceId }: NewBookingProps) {
  const [emblaRef] = useEmblaCarousel({ dragFree: true });

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedPlace, setSelectedPlace] = useState<BookingInfo | null>(null)

  const [availableBookingTimes, setAvailableBookingTimes] = useState<bookingTime[]>([])

  const [bookingDescription, setBookingDescription] = useState("")
  const [bookingTime, setBookingTime] = useState("")

  useEffect(() => {
    setAvailableBookingTimes(generateTimePeriods())
  }, [selectedDate])

  const generateDates = (days: number) => {
    const today = new Date()
    const datesArr: Date[] = []

    for (let i = 0; i < days; i++) {
      const d = new Date(today)
      d.setDate(today.getDate() + i)
      datesArr.push(d)
    }

    return datesArr
  }

  function generateTimePeriods() {
    if (!selectedPlace || !selectedDate) return []

    let generatedTimes = []

    const startTime = parseFloat(selectedPlace.startWorkingTime.replace(":", "."))
    const endTime = parseFloat(selectedPlace.stopWorkingTime.replace(":", "."))
    const timeRanges = endTime - startTime

    console.log(selectedPlace, timeRanges)

    for (let i = 0; i < timeRanges; i++) {
      generatedTimes.push({ id: i, from: startTime + i, till: startTime + i + 1 })
    }
    console.log(generatedTimes)
    return generatedTimes
  }

  const dates = generateDates(20)

  const monthYear = selectedDate?.toLocaleDateString("pt-BR", {
    month: "long",
    year: "numeric"
  })

  const availableSpaces: BookingInfo[] = [
    { id: 1, name: "Salão de festas", startWorkingDay: "seg", stopWorkingDay: "dom", startWorkingTime: "14:00", stopWorkingTime: "22:30" },
    { id: 2, name: "Churrasco 1", startWorkingDay: "seg", stopWorkingDay: "dom", startWorkingTime: "09:00", stopWorkingTime: "19:30" }
  ]

  function selectPlace(selectedSpaceId: number) {
    setSelectedPlace(availableSpaces.find((s) => s.id = selectedSpaceId) ?? null)
    setSelectedDate(dates[0])
  }

  function nextStep(newStep: number) {
    setStep(newStep);
  }

  return (
    <div>
      <Dialog
        header={"Novo agendamento"}
        visible={isOpen}
        onHide={() => {
          if (!isOpen) return;
          onClose()
        }}
        style={{ width: "23vw", height: "500px" }}
        breakpoints={{ "960px": "75vw", "641px": "100vw" }}
        className="!relative"
      >
        {inheritedStep == 2 &&
          <button
            onClick={() => nextStep(3)}
            className="rounded-full absolute end-[30px] bottom-[20px] bg-blue-600 text-white px-4 py-2 z-[100] flex items-center cursor-pointer">
            <PlusIcon weight="bold" size={16} />
            <span className="ml-1 text-sm font-semibold">Agendar neste dia</span>
          </button>}

        {/* Etapa 1 Espaços*/}
        <div className="w-full min-h-[150px] h-full relative">
          {inheritedStep == 1 && (
            <div className="flex flex-col gap-y-0.5">
              {availableSpaces.map((info) => (
                <button key={info.id} className="w-full cursor-pointer h-max bg-gray-100 hover:bg-gray-200 transition-colors duration-100 flex p-3 justify-between items-center first:rounded-t-md last:rounded-b-md"
                  onClick={() => {
                    nextStep(2); selectPlace(info.id);
                  }}>
                  <div className="flex items-center gap-x-3">
                    <div className="w-[80px] h-[70px] rounded-sm bg-gray-300"></div>
                    <div className="flex flex-col text-start">
                      <p className="font-semibold text-lg">{info.name}</p>
                      <div className="text-sm text-gray-500 font-light flex items-center gap-x-1">{info.startWorkingDay}-{info.stopWorkingDay}
                        <CircleIcon size={5} weight="fill" fill="#a1a5ad" />
                        {info.startWorkingTime}-{info.stopWorkingTime}</div>
                    </div>
                  </div>
                  <CaretRightIcon size={25} weight="thin" />
                </button>
              ))}
            </div>
          )}

          {/* Etapa 2 Horários*/}
          {inheritedStep == 2 && (
            <div className="w-full h-full relative">
              <p className="font-semibold">{monthYear}</p>
              <div className="flex w-full overflow-hidden mt-3" ref={emblaRef}>
                <div className="flex w-full gap-x-2">
                  {dates.map((date) => {
                    const dayName = date.toLocaleDateString("pt-BR", { weekday: "short" })
                    const dayNumber = date.getDate()
                    const isSelected = selectedDate?.toDateString() == date.toDateString()

                    return (
                      <button key={date.toISOString()} onClick={() => setSelectedDate(date)} className={`px-2 py-0.5 text-sm rounded-full  cursor-pointer ${isSelected ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-500'}`}><span className="font-light">{dayName}</span><span className="ml-1 font-medium">{dayNumber}</span></button>
                    )
                  })}
                </div>
              </div>
              <div className="w-full flex flex-col gap-y-1.5 pt-4 pb-12 hide-scrollbar">
                {availableBookingTimes.map((range) => (
                  <div className="w-full rounded-md px-4 py-3 bg-green-100 border-l-4 border-green-600 flex justify-center flex-col">
                    <h1 className="text-sm font-semibold text-green-800">Horário livre</h1>
                    <h1 className="font-bold text-xl text-green-700">{range.from}:00 - {range.till}:00</h1>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Etapa 3 Agendamento*/}
          {inheritedStep == 3 && (
            <div className="w-full h-full relative">
              <p className="font-semibold">Agendando {selectedPlace?.name} para o dia {selectedDate?.getDate().toString()} de {monthYear}</p>

              <div className="w-full flex flex-col gap-y-1.5 pt-4 h-[90%]">
                <form className="flex flex-col justify-between h-full mt-4">
                  <div className="flex flex-col gap-y-8 h-full">
                    <div className="flex items-center">
                      <FloatLabel className="w-1/2">
                        <InputText
                          maxLength={3}
                          id="description"
                          keyfilter="int"
                          value={bookingDescription}
                          onChange={(e) => setBookingDescription(e.target.value)}
                          className="w-full" />
                        <label htmlFor="description">Hora início</label>
                      </FloatLabel>
                      <p className="px-2">até</p>
                      <FloatLabel className="w-1/2">
                        <InputText
                          maxLength={3}
                          id="description"
                          keyfilter="int"
                          value={bookingDescription}
                          onChange={(e) => setBookingDescription(e.target.value)}
                          className="w-full" />
                        <label htmlFor="description">Hora fim</label>
                      </FloatLabel>
                    </div>
                    <FloatLabel className="w-full">
                      <InputText
                        maxLength={3}
                        id="description"
                        keyfilter="int"
                        value={bookingDescription}
                        onChange={(e) => setBookingDescription(e.target.value)}
                        className="w-full" />
                      <label htmlFor="description">Lotação média</label>
                    </FloatLabel>
                    <div className="flex gap-x-2 items-center text-sm text-amber-600">
                      <InfoIcon size={20} className="shrink-0 " />
                      Você será considerado o responsável pelo espaço durante seu evento
                    </div>
                  </div>
                  <Button label="Agendar" className="!bg-sky-[#6366F1] w-full" />
                </form>
              </div>
            </div>
          )}
        </div>
      </Dialog>
    </div>
  );
}
