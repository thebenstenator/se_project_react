import { checkResponse } from "./apiHelpers";

const baseUrl = "http://localhost:3001";
const headers = {
  "Content-Type": "application/json",
};

export const getItems = () => {
  return fetch(`${baseUrl}/items`, {
    headers,
  }).then(checkResponse);
};

export const addItem = ({ name, imageUrl, weather }) => {
  return fetch(`${baseUrl}/items`, {
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
  return fetch(`${baseUrl}/items/${itemId}`, {
    method: "DELETE",
    headers,
  }).then(checkResponse);
};
