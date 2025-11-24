import "./styles.css";
import { useEffect, useState } from "react";

import TaskList from "./TaskList.js";
import AddTodo from "./AddTodo";
import { getListas, createLista } from "./services/listas";
import {
  getTarefas,
  createTarefa,
  updateTarefa,
  deleteTarefa,
} from "./services/tarefas";

// ARRAY VAZIO PARA COMEÇAR SEM TAREFAS
const initialTodos = [];

export default function TaskApp() {
  const [todos, setTodos] = useState(initialTodos);
  const [listMap, setListMap] = useState(new Map());
  const [listas, setListas] = useState([]);

  // fetch inicial: listas e tarefas
  useEffect(() => {
    async function fetchAll() {
      try {
        const listasApi = await getListas();
        setListas(listasApi || []);

        if (!listasApi || listasApi.length === 0) {
          setTodos([]);
          return;
        }

        const tarefasPorLista = await Promise.all(
          listasApi.map((l) => getTarefas(l.id))
        );

        const todosConvertidos = tarefasPorLista.flatMap((tarefas, idx) =>
          (tarefas || []).map((t) => ({
            id: t.id,
            conteudoDaLista: t.conteudoDasTarefas,
            nomeDaLista: listasApi[idx].tituloDaLista,
            estaConcluido: t.estaConcluido,
            lista_id: listasApi[idx].id,
          }))
        );

        setTodos(todosConvertidos);
      } catch (err) {
        console.error("Erro ao carregar dados:", err);
      }
    }

    fetchAll();
  }, []);

  // Agrupa tarefas por nomeDaLista
  useEffect(() => {
    const mapa = new Map();

    todos.forEach((todo) => {
      const chave = todo.nomeDaLista ?? "Sem lista";

      if (!mapa.has(chave)) {
        mapa.set(chave, []);
      }

      mapa.get(chave).push(todo);
    });

    setListMap(mapa);
  }, [todos]);

  // CREATE -> cria lista se necessário e cria tarefa
  async function handleAddTodo(conteudoDaLista, nomeDaLista) {
    try {
      let lista = listas.find((l) => l.tituloDaLista === nomeDaLista);

      if (!lista) {
        lista = await createLista({ tituloDaLista: nomeDaLista });
        setListas((prev) => [...prev, lista]);
      }

      const created = await createTarefa(lista.id, {
        conteudoDasTarefas: conteudoDaLista,
        estaConcluido: false,
      });

      const novoTodo = {
        id: created.id,
        conteudoDaLista: created.conteudoDasTarefas,
        nomeDaLista: lista.tituloDaLista,
        estaConcluido: created.estaConcluido,
        lista_id: lista.id,
      };

      setTodos((prev) => [...prev, novoTodo]);
    } catch (err) {
      console.error("Erro ao criar tarefa:", err);
    }
  }

  // UPDATE -> atualiza tarefa no servidor e no estado
  async function handleChangeTodo(nextTodo) {
    try {
      const payload = {
        conteudoDasTarefas: nextTodo.conteudoDaLista,
        estaConcluido: nextTodo.estaConcluido,
      };

      const updated = await updateTarefa(nextTodo.id, payload);

      setTodos((prev) =>
        prev.map((t) =>
          t.id === updated.id
            ? {
                id: updated.id,
                conteudoDaLista: updated.conteudoDasTarefas,
                nomeDaLista: t.nomeDaLista,
                estaConcluido: updated.estaConcluido,
                lista_id: t.lista_id,
              }
            : t
        )
      );
    } catch (err) {
      console.error("Erro ao atualizar tarefa:", err);
    }
  }

  // DELETE -> remove no servidor e no estado
  async function handleDeleteTodo(todoId) {
    try {
      await deleteTarefa(todoId);
      setTodos((prev) => prev.filter((t) => t.id !== todoId));
    } catch (err) {
      console.error("Erro ao deletar tarefa:", err);
    }
  }

  console.log(todos);
  console.log(listMap);

  return (
    <>
      {/* Formulário */}
      <AddTodo onAddTodo={handleAddTodo} />

      {/* Lista agrupada */}
      <TaskList
        listMap={listMap}
        onChangeTodo={handleChangeTodo}
        onDeleteTodo={handleDeleteTodo}
      />
    </>
  );
}
