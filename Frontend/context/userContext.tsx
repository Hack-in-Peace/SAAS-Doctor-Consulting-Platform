"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

export interface UserDet {
  f_name: string;
  l_name: string;
  email: string;
  role: string;
  token: string;
  _id: string;
}

interface UserContextType {
  user: UserDet | null;
  setUser: React.Dispatch<React.SetStateAction<UserDet | null>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserDet | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("user_det");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setUser(parsed);
      } catch (e) {
        console.error("Failed to parse local user_det", e);
      }
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within UserProvider");
  return context;
};
