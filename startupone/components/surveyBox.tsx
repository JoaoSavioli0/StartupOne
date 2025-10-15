import { CircleIcon, ClockIcon } from "@phosphor-icons/react";
import { Avatar } from "primereact/avatar";
import { AvatarGroup } from "primereact/avatargroup";
import { Button } from "primereact/button";
import { ProgressBar } from "primereact/progressbar";
import { RadioButton } from "primereact/radiobutton";
import { title } from "process";
import { useState } from "react";

interface SurveyBoxProps {
  id: number;
  title: string;
  options: { text: string; value: number; votes: number }[];
}

export default function SurveyBox({ id, title, options }: SurveyBoxProps) {
  const [votedOption, setVotedOption] = useState<number | null>(null);

  const totalVotes = options.reduce((acc, option) => acc + option.votes, 0);

  const calcPercentage = (votes: number) => {
    return ((votes / totalVotes) * 100).toFixed(0);
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
      <div className="w-full py-4">
        <h1 className="text-lg font-semibold">{title}</h1>
        <div className="flex text-gray-500 items-center gap-x-1">
          <ClockIcon size={14} />
          <p className="text-[13px]">Há 38 minutos</p>
          <CircleIcon size={4} weight="fill" />
          <p className="text-[13px]">Termina em 3 dias</p>
        </div>
        <div className="flex gap-x-1.5 items-center mt-2 text-gray-700">
          <p className="text-sm ml-1">
            <span className="font-medium">{totalVotes}</span> votos
          </p>
          <AvatarGroup className="gap-x-1.5">
            <Avatar
              className="!size-[26px]"
              image="/images/avatar/amyelsner.png"
              shape="circle"
            />
            <Avatar
              className="!size-[26px]"
              image="/images/avatar/asiyajavayant.png"
              shape="circle"
            />
            <Avatar
              className="!size-[26px]"
              image="/images/avatar/onyamalimba.png"
              shape="circle"
            />
            <Avatar
              className="!size-[26px] !text-[10px]"
              label={"+" + (totalVotes - 3).toString()}
              shape="circle"
            />
          </AvatarGroup>
        </div>
      </div>
      <div className="flex flex-col gap-y-2">
        {options.map((option) => (
          <div
            onClick={() => setVotedOption(option.value)}
            key={option.value}
            className="w-full rounded-lg border border-gray-300 flex items-center justify-between h-[60px] px-4 relative cursor-pointer hover:bg-gray-100 transition-colors duration-150"
          >
            <div className="flex items-center">
              <RadioButton
                inputId={`option-${option.value}`}
                name="surveyOption"
                value={option.value}
                checked={votedOption == option.value}
              />
              <label
                htmlFor={`option-${option.value}`}
                className={`ml-2 font-medium pointer-events-none text-zinc-600 ${
                  votedOption == option.value ? "text-zinc-900" : ""
                }`}
              >
                {option.text}
              </label>
            </div>
            {votedOption && (
              <div className="font-medium text-primary text-sm">
                {calcPercentage(option.votes)}%
              </div>
            )}
            <ProgressBar
              value={votedOption ? (option.votes * 100) / totalVotes : 0}
              className="!absolute w-full !h-full start-0 top-0 rounded-lg !opacity-10"
              showValue={false}
            ></ProgressBar>
          </div>
        ))}
      </div>
    </div>
  );
}
