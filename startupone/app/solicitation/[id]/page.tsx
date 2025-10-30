"use client";

import SideBar from "@/components/sideBar";
import SolicitationComment, {
  SolicitationCommentProps,
} from "@/components/solicitationComment";
import { MockDataContext, Solicitation, User } from "@/context/MockDataContext";
import { useParams } from "next/navigation";
import { Button } from "primereact/button";
import { InputTextarea } from "primereact/inputtextarea";
import React, { useContext, useState } from "react";

export default function SolicitationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { mockSolicitations, loggedUser } = useContext(MockDataContext) as {
    mockSolicitations: Solicitation[];
    loggedUser: User;
  };
  const paramsList = React.use(params);
  const solicitation = mockSolicitations.find(
    (s) => s.id === parseInt(paramsList.id)
  );

  const [comments, setComments] = useState<SolicitationCommentProps[]>([]);
  const [commentFocused, setCommentFocused] = useState(false);
  const [loadingAddComment, setLoadingAddComment] = useState(false);
  const [commentText, setCommentText] = useState("");

  const addComment = async () => {
    console.log("a");
    setLoadingAddComment(true);
    await new Promise((r) => setTimeout(r, 3000)); //Simulando
    setComments((prev) => [
      ...prev,
      {
        id: prev.length,
        text: commentText,
        userData: loggedUser,
        createdAt: new Date(),
      },
    ]);
    setCommentText("");
    setCommentFocused(false);
    setLoadingAddComment(false);
    console.log("b");
  };

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center pl-[350px]">
      <SideBar />
      <div className="w-[60%]">
        {solicitation ? (
          <>
            <div className="w-full rounded-md bg-white border border-gray-300 p-5 relative">
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
                  <p className="font-semibold text-sm">
                    {solicitation.userData.name}
                  </p>
                  <p className="text-gray-600 text-xs">
                    {solicitation.userData.place}
                  </p>
                </div>
              </div>
              <div className="flex gap-x-1 mt-3">
                {solicitation.tags?.map((tag, index) => (
                  <span
                    key={`${index}`}
                    className="py-[1px] px-1 bg-zinc-100 rounded-sm text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="mt-2">
                <h1 className="text-xl font-medium">{solicitation?.title}</h1>
                <p className="text-gray-500">{solicitation?.text}</p>
              </div>
            </div>

            <div className="w-full flex flex-col gap-y-3 text-left mt-3">
              <h1 className="font-semibold text-lg px-2">
                {comments.length} Comentários
              </h1>
              <div className="p-4 bg-white border border-gray-300 rounded-md flex flex-col items-end gap-y-2">
                {!loadingAddComment ? (
                  <div
                    className="w-full flex gap-x-2 items-center"
                    onBlur={() => setCommentFocused(false)}
                  >
                    <div
                      className={`${
                        commentFocused ? "size-[45px]" : "size-[30px]"
                      } transition-all shrink-0 bg-zinc-200 rounded-full overflow-hidden flex items-center justify-center`}
                    >
                      {loggedUser.avatar ? (
                        <img
                          src={loggedUser.avatar}
                          className="object-cover w-full h-full"
                        />
                      ) : (
                        <i className="text-white pi pi-user"></i>
                      )}
                    </div>
                    <input
                      type="text"
                      onFocus={() => setCommentFocused(true)}
                      placeholder="Digite um comentário"
                      className="w-full resize-none border-b-[1px] border-zinc-800 focus:border-blue-700 hover:border-blue-700 transition-colors !h-fit !rounded-none !outline-none py-1.5"
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                    />
                  </div>
                ) : (
                  <div className="w-full flex justify-center py-4">
                    <i
                      className="text-blue-700 pi pi-spin pi-spinner"
                      style={{ fontSize: "1.2rem" }}
                    ></i>
                  </div>
                )}
                <div className="w-full flex justify-end gap-x-2">
                  <button
                    onClick={() => {
                      setCommentFocused(false);
                      setCommentText("");
                    }}
                    type="button"
                    className={`h-[28px] text-black font-medium transition-opacity rounded-full px-3 text-sm cursor-pointer ${
                      commentFocused ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    Cancelar
                  </button>
                  <button
                    type="button"
                    onClick={() => addComment()}
                    disabled={commentText.length == 0}
                    className={`h-[28px] font-medium transition-opacity rounded-full bg-primary text-white px-3 text-sm cursor-pointer ${
                      commentFocused ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    Comentar
                  </button>
                </div>
                {comments.map((c) => (
                  <SolicitationComment {...c} />
                ))}
              </div>
            </div>
          </>
        ) : (
          <h1>Solicitação não encontrada</h1>
        )}
      </div>
    </div>
  );
}
