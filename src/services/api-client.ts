import axios from "axios";

export default axios.create({
  baseURL: "http://127.0.0.1:8000",
  paramsSerializer: (params) => {
    const searchEventsParam = "search_events";

    return Object.keys(params)
      .map((key) => {
        const paramName = key === "search" ? searchEventsParam : key;
        return `${encodeURIComponent(paramName)}=${encodeURIComponent(
          params[key]
        )}`;
      })
      .join("&");
  },
});
