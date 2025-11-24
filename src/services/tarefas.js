import api from "../api/axios";

export async function getTarefas(listaId) {
  const res = await api.get(`/listas/${listaId}/tarefas`);
  return res.data;
}

export async function createTarefa(listaId, payload) {
  const res = await api.post(`/listas/${listaId}/tarefas`, payload);
  return res.data;
}

export async function updateTarefa(id, payload) {
  const res = await api.put(`/tarefas/${id}`, payload);
  return res.data;
}

export async function deleteTarefa(id) {
  const res = await api.delete(`/tarefas/${id}`);
  return res.data;
}

export default {
  getTarefas,
  createTarefa,
  updateTarefa,
  deleteTarefa,
};
