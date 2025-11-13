"use client";

import { Toast } from "primereact/toast";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

export const MockDataContext = createContext({});

export type FeedItem = {
  id: number;
  createdAt: Date;
  type: "survey" | "solicitation" | "request";
  label: string;
  data: any;
};

export class Solicitation {
  id!: number;
  title!: string;
  text!: string;
  place!: string;
  createdAt!: Date;
  tags?: string[];
  userData!: { id: number; name: string; place: string; avatar?: string };
  status!: "Pendente" | "Em andamento" | "Concluído";
  images?: { itemImageSrc: string }[];
}

export class Survey {
  id!: number;
  userData!: { id: number; name: string; place: string; avatar?: string };
  title!: string;
  createdAt!: Date;
  options!: { label: string; value: number; votes: number }[];
}

export class User {
  id!: number;
  name!: string;
  condo?: string;
  place!: string;
  phone?: string;
  email!: string;
  age?: string;
  avatar?: string;
}

export class Request {
  id!: number;
  userData!: { id: number; name: string; place: string; avatar?: string };
  title!: string;
  type!: "object" | "service";
  description?: string;
  days?: number = 0;
  status: string = "Aberto";
  closedAt?: Date;
  createdAt!: Date;
}

export function MockDataProvider({ children }: { children: React.ReactNode }) {
  const loggedUser: User = {
    id: 1,
    name: "João Savioli",
    condo: "Chácaras Flórida",
    place: "Apto 101",
    phone: "11978521152",
    email: "joaopedroolisavioli@gmail.com",
    age: "21",
    avatar: "",
  };

  const initialSolicitations: Solicitation[] = [
    {
      id: 1,
      title: "Botão do elevador com defeito",
      text: "O botão do elevador do prédio X está com defeito.",
      createdAt: new Date("2025-08-15"),
      place: "Prédio X, apto 284",
      tags: ["Manutenção", "Urgente"],
      userData: { id: 3, name: "Thiado Medeiros", place: "Apto 461" },
      status: "Pendente",
      images: [
        {
          itemImageSrc: "https://picsum.photos/id/1050/800/600",
        },
        {
          itemImageSrc: "https://picsum.photos/id/1051/800/600",
        },
        {
          itemImageSrc: "https://picsum.photos/id/1052/800/600",
        },
      ],
    },
    {
      id: 2,
      title: "Solicitação de manutenção",
      text: "Preciso de manutenção na luz do corredor.",
      createdAt: new Date("2025-01-04"),
      place: "Prédio Y",
      tags: ["Manutenção"],
      userData: { id: 4, name: "Gustavo Mioto", place: "Apto 315" },
      status: "Em andamento",
      images: [
        {
          itemImageSrc: "https://picsum.photos/id/1044/800/600",
        },
        {
          itemImageSrc: "https://picsum.photos/id/1045/800/600",
        },
      ],
    },
    {
      id: 3,
      title: "Vazamento no banheiro",
      text: "Há um vazamento constante no banheiro do apartamento 101.",
      createdAt: new Date("2025-03-05"),
      place: "Prédio X, apto 101",
      tags: ["Manutenção", "Alerta"],
      userData: { id: 1, name: "João Savioli", place: "apto 101" },
      status: "Pendente",
      images: [
        {
          itemImageSrc: "https://picsum.photos/id/1031/800/600",
        },
        {
          itemImageSrc: "https://picsum.photos/id/1032/800/600",
        },
        {
          itemImageSrc: "https://picsum.photos/id/1033/800/600",
        },
        {
          itemImageSrc: "https://picsum.photos/id/1045/800/600",
        },
      ],
    },
    {
      id: 4,
      title: "Luz do corredor apagada",
      text: "A luz do corredor do 1º andar não está funcionando.",
      createdAt: new Date("2025-03-17"),
      place: "Prédio X, corredor 1º andar",
      tags: ["Iluminação", "Baixa Prioridade"],
      userData: { id: 1, name: "João Savioli", place: "apto 101" },
      status: "Concluído",
      images: [
        {
          itemImageSrc: "https://picsum.photos/id/1025/800/600",
        },
      ],
    },
  ];

  const initialSurveys: Survey[] = [
    {
      id: 1,
      userData: { id: 2, name: "Thiago Moreira", place: "Apto 201" },
      title: "Qual melhoria você gostaria de ver no condomínio?",
      createdAt: new Date("2025-08-11"),
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
      createdAt: new Date("2025-03-16"),
      type: "object",
      userData: { id: 5, name: "Gustavo Mioto", place: "Apto 109" },
      status: "Pendente",
    },
    {
      id: 2,
      title: "Preciso de uma extensão elétrica",
      createdAt: new Date("2025-09-18"),
      type: "object",
      userData: { id: 1, name: "João Savioli", place: "apto 101" },
      status: "Pendente",
    },
  ];

  const [mockSolicitations, setMockSolicitations] =
    useState<Solicitation[]>(initialSolicitations);
  const [mockRequests, setMockRequests] = useState(initialRequests);
  const [mockSurveys, setMockSurveys] = useState(initialSurveys);

  const feedItems: FeedItem[] = useMemo(() => {
    const items = [
      ...mockSolicitations.map((s) => ({
        id: s.id,
        createdAt: s.createdAt,
        label: s.title + s.text,
        type: "solicitation" as const,
        data: s,
      })),
      ...mockSurveys.map((s) => ({
        id: s.id,
        createdAt: s.createdAt,
        label: s.title,
        type: "survey" as const,
        data: s,
      })),
      ...mockRequests.map((r) => ({
        id: r.id,
        createdAt: r.createdAt,
        label: r.title + r.description,
        type: "request" as const,
        data: r,
      })),
    ];

    return items.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }, [mockRequests, mockSolicitations, mockSurveys]);

  const addSolicitation = (newSolicitation: Solicitation) => {
    newSolicitation.id = mockSolicitations.length + 1;
    setMockSolicitations((prev) => [...prev, newSolicitation]);
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
    newSurvey.options = newSurvey.options.map((op) => ({ ...op, votes: 0 }));
    setMockSurveys((prev) => [...prev, newSurvey]);
  };

  const addRequest = (newRequest: Request) => {
    newRequest.id = mockRequests.length + 1;
    setMockRequests((prev) => [...prev, newRequest]);
  };

  const editSurvey = (updatedSurvey: Survey) => {
    const index = mockSurveys.findIndex((s) => s.id === updatedSurvey.id);
    if (index !== -1) {
      mockSurveys[index] = updatedSurvey;
    }
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
        mockRequests,
        addRequest,
      }}
    >
      {children}
    </MockDataContext.Provider>
  );
}

export function useMockData() {
  return useContext(MockDataContext);
}
