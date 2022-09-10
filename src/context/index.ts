import { createContext } from "react";


export interface INotifContext{
  config: {
      message: string;
      type: string;
      open: boolean;
  },
  setConfig: React.Dispatch<React.SetStateAction<{
    message: string;
    type: string;
    open: boolean;
  }>>
}

export const NotifContext=createContext<INotifContext|null>(null);