import useData from "./useData";

export interface Event {
  id: number;
  title: string;
  price: number;
  location: Location;
  category: string[];
}

export interface Location {
  id: number;
  name: string;
  address: string;
  rating: string;
  city: string;
}

const useEvent = () => useData<Event>("/product/events");

export default useEvent;
