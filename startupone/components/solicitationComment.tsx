import { calcAge } from "@/utils/date";

export interface SolicitationCommentProps {
  id: number;
  text: string;
  userData: { id: number; name: string; place: string; avatar?: string };
  createdAt: Date;
}

export default function SolicitationComment({
  id,
  text,
  userData,
  createdAt,
}: SolicitationCommentProps) {
  return (
    <div className="w-full mt-4">
      <div className="flex gap-x-2 items-start">
        <div className="rounded-full overflow-hidden size-[35px] bg-primary flex items-center justify-center">
          {userData.avatar ? (
            <img src={userData.avatar} className="object-cover w-full h-full" />
          ) : (
            <i className="text-white pi pi-user"></i>
          )}
        </div>
        <div>
          <h1 className="font-medium text-sm">
            {userData.name}{" "}
            <span className="text-xs text-gray-600 ml-2">
              {calcAge(createdAt.toISOString())}
            </span>
          </h1>
          <span className="text-xs text-gray-600 block -mt-0.5">
            {userData.place}
          </span>
          <div className="w-full mt-1.5 text-gray-600 break-words">{text}</div>
        </div>
      </div>
    </div>
  );
}
