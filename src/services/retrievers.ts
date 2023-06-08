import { useState } from "react";
import apiClient from "../services/api-client";

export const getEvent = (eventId: string) => {
  return apiClient
    .get("product/events/" + eventId + "/")
    .then((response) => response.data);
};
