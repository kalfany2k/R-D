import apiClient from "../services/api-client";
import Event from "../Hooks/useEvent";

export const getEvent = (eventId: string) => {
  return apiClient
    .get("product/events/" + eventId + "/")
    .then((response) => response.data);
};
