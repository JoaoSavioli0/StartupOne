"use client";

import { Usuario } from "@/utils/models";
import { localGet, localRemove, localSet } from "@/utils/storage";
import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext({});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<Usuario | null>(null);

  useEffect(() => {
    const storedUser: string | null = localGet("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  useEffect(() => {
    if (user) {
      localSet("user", JSON.stringify(user));
    } else {
      localRemove("user");
    }
  }, [user]);

  const login = (userData: Usuario) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
