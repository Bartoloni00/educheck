import { api } from "./api";

export const loginRequest = (email, password) => api.post("/auth/login", { email, password });

export const registerRequest = (data) => {
  const response = api.post("/auth/register", data);
  console.log({ response });
};