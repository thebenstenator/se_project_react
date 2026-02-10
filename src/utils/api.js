import { checkResponse } from "./apiHelpers";

export const BASE_URL = "http://localhost:3001";
const headers = {
  "Content-Type": "application/json",
};

export const getItems = () => {
  return fetch(`${BASE_URL}/items`, {
    headers,
  }).then(checkResponse);
};

export const addItem = ({ name, imageUrl, weather }) => {
  return fetch(`${BASE_URL}/items`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      name,
      imageUrl,
      weather,
    }),
  }).then(checkResponse);
};

export const removeItem = (itemId) => {
  return fetch(`${BASE_URL}/items/${itemId}`, {
    method: "DELETE",
    headers,
  }).then(checkResponse);
};
