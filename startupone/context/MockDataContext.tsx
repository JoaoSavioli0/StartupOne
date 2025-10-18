"use client";

import { Toast } from "primereact/toast";
import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";

export const MockDataContext = createContext({});

export type feedItem = {
  id: number;
  createdAt: string;
  type: "survey" | "solicitation" | "request";
  data: any;
}

export type toastProps = {
  type: "success" | "info" | "warn" | "error" | "secondary" | "contrast" | undefined;
  title: string;
  text: string;
  duration?: number
}

class Solicitation {
  id!: number;
  title!: string;
  text!: string;
  place!: string;
  date!: string;
  tags?: string[];
  userData!: { id: number, name: string, place: string, avatar?: string }
  status!: "Pendente" | "Em andamento" | "Concluído";
}

class Survey {
  id!: number;
  userData!: { id: number, name: string, place: string, avatar?: string }
  title!: string;
  date!: string;
  options!: { label: string; value: number; votes: number }[];
}

class Request {
  id!: number;
  userData!: { id: number, name: string, place: string, avatar?: string }
  title!: string;
  type!: "object" | "service";
  description?: string;
  days?: number = 0;
  date!: string;
}

export function MockDataProvider({ children }: { children: React.ReactNode }) {
  const loggedUser = {
    id: 1,
    name: "João Savioli",
    place: "Apto 101",
    avatar: ""
  }

  const initialSolicitations: Solicitation[] = [
    {
      id: 1,
      title: "Botão do elevador com defeito",
      text: "O botão do elevador do prédio X está com defeito.",
      date: "2023-03-15",
      place: "Prédio X, apto 284",
      tags: ["Manutenção", "Urgente"],
      userData: { id: 3, name: "Thiado Medeiros", place: "Apto 461" },
      status: "Pendente",
    },
    {
      id: 2,
      title: "Solicitação de manutenção",
      text: "Preciso de manutenção na luz do corredor.",
      date: "2023-03-16",
      place: "Prédio Y",
      tags: ["Manutenção"],
      userData: { id: 4, name: "Gustavo Mioto", place: "Apto 315" },
      status: "Em andamento",
    },
  ];

  const initialSurveys: Survey[] = [
    {
      id: 1,
      userData: { id: 2, name: "Thiago Moreira", place: "Apto 201" },
      title: "Qual melhoria você gostaria de ver no condomínio?",
      date: "2023-03-16",
      options: [
        {
          value: 1,
          label: "Mais áreas de lazer",
          votes: 20,
        },
        {
          value: 2,
          label: "Melhorias na segurança",
          votes: 15,
        },
        { value: 3, label: "Reforma da academia", votes: 10 },
      ],
    },
  ];

  const initialRequests: Request[] = [
    {
      id: 1,
      title: "Preciso de uma furadeira",
      date: "2023-03-16",
      type: "object",
      userData: { id: 5, name: "Gustavo Mioto", place: "Apto 109" }
    },
  ];

  const [mockSolicitations, setMockSolicitations] = useState(initialSolicitations)
  const [mockRequests, setMockRequests] = useState(initialRequests)
  const [mockSurveys, setMockSurveys] = useState(initialSurveys)

  const feedItems = useMemo(() => {
    const items = [
      ...mockSolicitations.map(s => ({
        id: s.id,
        createdAt: s.date,
        type: "solicitation" as const,
        data: s
      })),
      ...mockSurveys.map(s => ({
        id: s.id,
        createdAt: s.date,
        type: "survey" as const,
        data: s
      })),
      ...mockRequests.map(r => ({
        id: r.id,
        createdAt: r.date,
        type: "request" as const,
        data: r
      }))
    ]

    return items.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }, [mockRequests, mockSolicitations, mockSurveys])

  useEffect(() => {
    console.log("Alterou: ", mockSolicitations);
  }, [mockSolicitations]);

  const addSolicitation = (newSolicitation: Solicitation) => {
    newSolicitation.id = mockSolicitations.length + 1;
    setMockSolicitations((prev) => [...prev, newSolicitation])
  };

  const editSolicitation = (updatedSolicitation: Solicitation) => {
    const index = mockSolicitations.findIndex(
      (s) => s.id === updatedSolicitation.id
    );
    if (index !== -1) {
      mockSolicitations[index] = updatedSolicitation;
    }
  };

  const addSurvey = (newSurvey: Survey) => {
    newSurvey.id = mockSurveys.length + 1;
    newSurvey.options = newSurvey.options.map(op => ({ ...op, votes: 0 }))
    setMockSurveys((prev) => [...prev, newSurvey])
  };

  const editSurvey = (updatedSurvey: Survey) => {
    const index = mockSurveys.findIndex((s) => s.id === updatedSurvey.id);
    if (index !== -1) {
      mockSurveys[index] = updatedSurvey;
    }
  };

  const toast = useRef<Toast | null>(null);

  const showToast = ({ type, title, text, duration }: toastProps) => {
    if (!toast.current) return
    toast.current?.show({ severity: type, summary: title, detail: text, life: duration });
  };

  return (
    <MockDataContext.Provider
      value={{
        mockSolicitations,
        addSolicitation,
        editSolicitation,
        mockSurveys,
        addSurvey,
        editSurvey,
        sortedFeed: feedItems,
        loggedUser,
        showToast
      }}
    >
      <Toast ref={toast} position="top-right" />
      {children}
    </MockDataContext.Provider>
  );
}

export function useMockData() {
  return useContext(MockDataContext);
}
