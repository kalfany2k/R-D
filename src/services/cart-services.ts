import { Event } from "../Hooks/useEvent";

export interface Cart {
  id: number;
  customer: number;
  customer_id: number;
  total_price: number;
  events: Event[];
}

export interface CartItem {
  id: number;
  event: Event;
  price: number;
  quantity: number;
}
