"use client";

import { createContext, useContext } from "react";

const MockDataContext = createContext({});

class Solicitation {
  id!: number;
  title!: string;
  text!: string;
  place!: string;
  date!: string;
  tags?: string[];
  residentName!: string;
  residentAvatarUrl?: string;
  residentPlace!: string;
  status!: "Pendente" | "Em andamento" | "Concluído";
}

export function MockDataProvider({ children }: { children: React.ReactNode }) {
  const mockSolicitations: Solicitation[] = [
    {
      id: 1,
      title: "Botão do elevador com defeito",
      text: "O botão do elevador do prédio X está com defeito.",
      date: "2023-03-15",
      place: "Prédio X, apto 284",
      tags: ["Manutenção", "Urgente"],
      residentName: "João Pedro",
      residentAvatarUrl: "",
      residentPlace: "Apto 101",
      status: "Pendente",
    },
    {
      id: 2,
      title: "Solicitação de manutenção",
      text: "Preciso de manutenção na luz do corredor.",
      date: "2023-03-16",
      place: "Prédio Y",
      tags: ["Manutenção"],
      residentName: "Maria Silva",
      residentAvatarUrl: "",
      residentPlace: "Apto 202",
      status: "Em andamento",
    },
  ];

  const mockSurveys = [
    {
      id: 1,
      title: "Qual melhoria você gostaria de ver no condomínio?",
      options: [
        {
          value: 1,
          text: "Mais áreas de lazer",
          votes: 20,
        },
        {
          value: 2,
          text: "Melhorias na segurança",
          votes: 15,
        },
        { value: 3, text: "Reforma da academia", votes: 10 },
      ],
    },
  ];

  const addSolicitation = (newSolicitation: Solicitation) => {
    newSolicitation.id = mockSolicitations.length + 1;
    mockSolicitations.push(newSolicitation);
  };

  const editSolicitation = (updatedSolicitation: Solicitation) => {
    const index = mockSolicitations.findIndex(
      (s) => s.id === updatedSolicitation.id
    );
    if (index !== -1) {
      mockSolicitations[index] = updatedSolicitation;
    }
  };

  return (
    <MockDataContext.Provider
      value={{
        mockSolicitations,
        mockSurveys,
        addSolicitation,
        editSolicitation,
      }}
    >
      {children}
    </MockDataContext.Provider>
  );
}

export function useMockData() {
  return useContext(MockDataContext);
}
