import apiClient from "../services/api-client";
import useData from "./useData";

export interface User {
  id: number;
  user: number;
  phone: string;
  birth_date: string;
  first_name: string;
  last_name: string;
}

const getUser = () => useData<User>("product/customers/me");

export default getUser;
