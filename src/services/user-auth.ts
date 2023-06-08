import { useState } from "react";
import apiClient from "./api-client";

export interface User {
  id: number;
  user: number;
  phone: string;
  birth_date: string;
  first_name: string;
  last_name: string;
}

export const login = async (username: string, password: string) => {
  try {
    const response = await apiClient.post("/auth/jwt/create", {
      username,
      password,
    });
    localStorage.setItem("accessToken", response.data.access);
    localStorage.setItem("sessionToken", response.data.refresh);
  } catch (error) {
    console.log("login failed");
  }
};

export const register = (
  username: string,
  password: string,
  email: string,
  phone: string,
  birth_date: string,
  first_name: string,
  last_name: string
) => {
  return apiClient.post("/product/customers/register/", {
    username,
    password,
    email,
    phone,
    birth_date,
    first_name,
    last_name,
  });
};

export const getUser = () => {
  return apiClient
    .get<User>("/product/customers/me", {
      headers: {
        Authorization: "JWT " + localStorage.getItem("accessToken"),
      },
    })
    .then((response) => response.data);
};
