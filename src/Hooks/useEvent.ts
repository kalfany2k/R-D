import { EventQuery } from "../App";
import useData from "./useData";

export interface Event {
  id: number;
  title: string;
  price: number;
  location: Location;
  category: string[];
  age_restriction: string;
  start_date: string;
  end_date: string;
  description: string;
}

export interface Location {
  id: number;
  name: string;
  address: string;
  rating: number;
  city: string;
}

const useEvent = (eventQuery: EventQuery, searchEmpty: boolean) =>
  useData<Event>(
    searchEmpty ? "/product/events" : "/product/events/search_events",
    {
      params: { searchText: eventQuery.searchText },
    },
    [eventQuery]
  );

export default useEvent;
