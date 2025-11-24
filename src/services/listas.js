import api from "../api/axios";

export async function getListas() {
  const res = await api.get("/listas");
  return res.data;
}

export async function createLista(payload) {
  const res = await api.post("/listas", payload);
  return res.data;
}

export async function updateLista(id, payload) {
  const res = await api.put(`/listas/${id}`, payload);
  return res.data;
}

export default {
  getListas,
  createLista,
  updateLista,
};
