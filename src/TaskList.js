import { useState } from "react";

export default function TaskList({ todos, onChangeTodo, onDeleteTodo }) {
  //Dentro do return, ele usa o método .map() para percorrer cada tarefa (todo)
  //e renderizar um componente <Task> para cada uma delas.
  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>
          <Task todo={todo} onChange={onChangeTodo} onDelete={onDeleteTodo} />
        </li>
      ))}
      {/*COLOCAR AQUI A FUNCIONALIDADE */}
    </ul>
  );
}
function Task({ todo, onChange, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  let todoContent;
  if (isEditing) {
    todoContent = (
      <>
        <input
          value={todo.title}
          onChange={(event) => {
            {
              /*Ao digitar algo, o onChange() é chamado — 
          ele envia a tarefa atualizada para o componente pai. */
            }
            onChange({
              ...todo,
              title: event.target.value,
            });
          }}
        />{" "}
        {/*BOTAO PARA SALVAR */}
        <button onClick={() => setIsEditing(false)}>Salvar Edição</button>{" "}
      </>
    );
  } else {
    todoContent = (
      <>
        {todo.title} {/*BOTAO PARA EDITAR */}
        <button onClick={() => setIsEditing(true)}>Editar Tarefa</button>{" "}
      </>
    );
  }
  return (
    <label>
      <input
        //O checkbox permite marcar a tarefa como concluída
        type="checkbox"
        checked={todo.done}
        onChange={(e) => {
          onChange({
            ...todo,
            done: e.target.checked,
          });
        }}
      />
      {todoContent}
      {/*BOTAO PARA DELETAR */}
      <button onClick={() => onDelete(todo.id)}>Deletar Tarefa</button>
    </label>
  );
}
