import "./styles.css";
import { useEffect, useState } from "react";

import TaskList from "./TaskList.js";
import AddTodo from "./AddTodo";

// ARRAY VAZIO PARA COMEÇAR SEM TAREFAS
const initialTodos = [];

export default function TaskApp() {
  const [todos, setTodos] = useState(initialTodos);
  const [listMap, setListMap] = useState(new Map());

  // Agrupa tarefas por nomeDaLista
  useEffect(() => {
    const mapa = new Map();

    todos.forEach((todo) => {
      const chave = todo.nomeDaLista;

      if (!mapa.has(chave)) {
        mapa.set(chave, []);
      }

      mapa.get(chave).push(todo);
    });

    setListMap(mapa);
  }, [todos]);

  // CREATE
  function handleAddTodo(conteudoDaLista, nomeDaLista) {
    setTodos([
      ...todos,
      {
        id: Date.now(),
        conteudoDaLista,
        nomeDaLista,
        estaConcluido: false
      }
    ]);
  }

  // UPDATE
  function handleChangeTodo(nextTodo) {
    setTodos(
      todos.map((t) => (t.id === nextTodo.id ? nextTodo : t))
    );
  }

  // DELETE
  function handleDeleteTodo(todoId) {
    setTodos(todos.filter((t) => t.id !== todoId));
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
