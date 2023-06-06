import useData from "./useData";

export interface Location{
  id: number;
  name: string;
  address: string;
  rating: number;
  city: string;
}

export interface Event {
  id: number;
  title: string;
  price: number;
  category: string[];
  location: Location;
}

const useEvent = () => useData<Event>("/product/events");

export default useEvent;
