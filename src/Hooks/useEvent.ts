import { EventQuery } from "../App";
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

const useEvent = (eventQuery: EventQuery) =>
  useData<Event>(
    "/product/events",
    {
      params: { search: eventQuery.searchText },
    },
    [eventQuery]
  );

export default useEvent;
