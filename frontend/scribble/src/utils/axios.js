import axios from "axios";

export const customFetch = axios.create({
  baseURL: "http://127.0.0.1:9090/api",
});
