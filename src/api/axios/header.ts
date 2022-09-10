import { getToken } from "../../utils/stroge";

/* eslint-disable import/no-anonymous-default-export */
export const withAuth={
  headers:{
    'Authorization':'bearer '+getToken(),
  }
}
