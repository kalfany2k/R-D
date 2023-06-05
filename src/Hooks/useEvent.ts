import useData from "./useData";

export interface Event {
  id: number;
  title: string;
  price: number;
}

const useEvent = () => useData<Event>("/product/events");

export default useEvent;
