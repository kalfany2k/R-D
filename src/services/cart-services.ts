import apiClient from "./api-client";

export interface Cart {
  created_at: string;
}

export interface CartItem {
  cart: number;
  event_id: number;
  quantity: number;
}

export const createCart = () => {
  apiClient.post("/product/carts");
};
