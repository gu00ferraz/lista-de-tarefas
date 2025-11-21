import { useState } from "react";

export default function TaskList({ listMap, onChangeTodo, onDeleteTodo }) {
  return (
    <div>
      {Array.from(listMap.entries()).map(([nomeDaLista, itens]) => (
        <div key={nomeDaLista} style={{ marginBottom: "20px" }}>
          <h2>{nomeDaLista}</h2>

          <ul>
            {itens.map((todo) => (
              <li key={todo.id}>
                <Task
                  todo={todo}
                  onChange={onChangeTodo}
                  onDelete={onDeleteTodo}
                />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

function Task({ todo, onChange, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);

  let todoContent;

  if (isEditing) {
    todoContent = (
      <>
        <input
          value={todo.conteudoDaLista}
          onChange={(event) => {
            onChange({
              ...todo,
              conteudoDaLista: event.target.value,
            });
          }}
        />
        <button onClick={() => setIsEditing(false)}>Salvar Edição</button>
      </>
    );
  } else {
    todoContent = (
      <>
        {todo.conteudoDaLista}
        <button onClick={() => setIsEditing(true)}>Editar Tarefa</button>
      </>
    );
  }

  return (
    <label>
      <input
        type="checkbox"
        checked={todo.estaConcluido}
        onChange={(e) => {
          onChange({
            ...todo,
            estaConcluido: e.target.checked,
          });
        }}
      />
      {todoContent}
      <button onClick={() => onDelete(todo.id)}>Deletar Tarefa</button>
    </label>
  );
}
