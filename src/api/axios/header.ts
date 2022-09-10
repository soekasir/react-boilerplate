import { getToken } from "../../utils/stroge";

/* eslint-disable import/no-anonymous-default-export */
const headers={
  headers:{
    'Authorization':'bearer '+getToken(),
  }
}

export default headers;