export const checkResponse = async (res) => {
  if (res.ok) return res.json();
  const body = await res.text().catch(() => "");
  return Promise.reject(`Error: ${res.status} ${body}`);
};
