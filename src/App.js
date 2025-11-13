import "./styles.css";
import { useState } from "react";

import TaskList from "./TaskList.js";
import AddTodo from "./AddTodo";

// GERAR ID UNICO PARA CADA TAREFA
let nextId = 1;
// ARRAY VAZIO PRAR COMEÇAR SEM TAREFAS
const initialTodos = [];

//TASKAPP COMPONENTE PAI DA APLICACAO
export default function TaskApp() {
  const [todos, setTodos] = useState(initialTodos);

  // CRIA O OBJETO (CREATE)
  function handleAddTodo(title) {
    setTodos([
      ...todos,
      {
        //ID = NUMBER, TITLE = STRING, DONE = BOOLEAN
        id: nextId++,
        title: title,
        done: false,
      },
    ]);
  }
  // ATUALIZA O OBJETO (UPDATE)
  function handleChangeTodo(nextTodo) {
    setTodos(
      todos.map((t) => {
        if (t.id === nextTodo.id) {
          return nextTodo;
        } else {
          return t;
        }
      })
    );
  }
  // DELETA O OBJETO (DELETE)
  function handleDeleteTodo(todoId) {
    setTodos(todos.filter((t) => t.id !== todoId));
  }

  return (
    <>
      {/*QUANDO O USARIO ADICIONA CHAMA A FUNCAO ADD, DEPOIS A CHANGE E DELETE*/}
      <AddTodo onAddTodo={handleAddTodo} />
      <TaskList
        todos={todos}
        onChangeTodo={handleChangeTodo}
        onDeleteTodo={handleDeleteTodo}
      />
    </>
  );
}
