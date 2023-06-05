import apiClient from "./api-client";

export const login = (username: string, password: string) => {
  return apiClient
    .post("/auth/jwt/create", { username, password })
    .then((response) => {
      localStorage.setItem("accessToken", response.data.access);
      localStorage.setItem("sessionToken", response.data.refresh);
    });
};

export const register = (
  username: string,
  password: string,
  email: string,
  phone: string,
  birthDate: string,
  firstName: string,
  lastName: string
) => {
  return apiClient.post("/product/customers/register/", {
    username,
    password,
    email,
    phone,
    birthDate,
    firstName,
    lastName,
  });
};
