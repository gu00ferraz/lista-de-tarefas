import "./styles.css";
import {useEffect, useState } from "react";

import TaskList from "./TaskList.js";
import AddTodo from "./AddTodo";

// GERAR ID UNICO PARA CADA TAREFA
let nextId = 1;
// ARRAY VAZIO PRAR COMEÇAR SEM TAREFAS
const initialTodos = [];
//TASKAPP COMPONENTE filho - conteudo 

export default function TaskApp() {
  const [todos, setTodos] = useState(initialTodos);
  const [listMap,setListMap] = useState(new Map())

  useEffect(() => {

    /*
useEffect(() => {
  const mapa = new Map();

  todos.forEach((todo) => {
    if (!mapa.has(todo.nomeDaLista)) {
      mapa.set(todo.nomeDaLista, []);
    }
    mapa.get(todo.nomeDaLista).push(todo);
  });

  setListMap(mapa);
}, [todos]);

return (
  <div>
    {Array.from(listMap.entries()).map(([nomeDaLista, itens]) => (
      <div key={nomeDaLista}>
        <h2>{nomeDaLista}</h2>
        {itens.map((item) => (
          <p key={item.id}>{item.conteudoDaLista}</p>
        ))}
      </div>
    ))}
  </div>
);

    */
  })

  console.log(todos)
  console.log(listMap)

  // CRIA O OBJETO (CREATE)
  function handleAddTodo(todo) {
    setTodos([
      ...todos,
      todo
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
      <AddTodo onAddTodo={handleAddTodo} todoList={todos} />
      <TaskList
      todos={todos}
        onChangeTodo={handleChangeTodo}
        onDeleteTodo={handleDeleteTodo}
      />
    </>
  );
}
