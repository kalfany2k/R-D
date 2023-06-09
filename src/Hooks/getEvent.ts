import apiClient from "../services/api-client";
import { Event } from "./useEvent";

const getEvent = (eventId: string) => {
  apiClient.get("product/events/" + eventId + "/");
};
