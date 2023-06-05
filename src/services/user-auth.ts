import apiClient from "./api-client";

export const login = (username: string, password: string) => {
  return apiClient
    .post("/auth/jwt/create", { username, password })
    .then((response) => {
      localStorage.setItem("accessToken", response.data.access);
      localStorage.setItem("sessionToken", response.data.refresh);
    });
};
