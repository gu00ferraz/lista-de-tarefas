import { useState } from "react";

export default function AddTodo({ onAddTodo }) {
  const [title, setTitle] = useState("");         // tarefa digitada
  const [listTitle, setListTitle] = useState(""); // título sendo digitado
  const [savedTitle, setSavedTitle] = useState(""); // título final da lista atual

  // Salva o nome da lista apenas quando apertar ENTER
  function handleListTitleKeyDown(e) {
    if (e.key === "Enter" && listTitle.trim() !== "") {
      setSavedTitle(listTitle.trim()); // título definitivo
      setListTitle(""); // limpa o campo
    }
  }

  function handleAdd() {
    if (title.trim() === "") return;

    // envia tarefa usando o título DEFINITIVO da lista
    onAddTodo(title.trim(), savedTitle || "(Sem título)");

    setTitle(""); // limpa o campo da tarefa
  }

  return (
    <>
      <h1>Aqui estão suas tarefas diárias</h1>

      {/* Campo de Título da Lista */}
      <div style={{ marginBottom: "20px" }}>
        <input
          placeholder="Digite um título para a lista e pressione Enter"
          value={listTitle}
          onChange={(e) => setListTitle(e.target.value)}
          onKeyDown={handleListTitleKeyDown}
          style={{
            width: "270px",
            padding: "5px",
            marginBottom: "25px",
            display: "block",
          }}
        />
      </div>

      {/* Campo para adicionar tarefas */}
      <div>
        <input
          placeholder="Adicionar tarefa"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{
            width: "270px",
            padding: "5px",
            marginRight: "10px",
          }}
        />

        <button onClick={handleAdd}>Adicionar Tarefa</button>

        {/* Exibe título da lista SOMENTE depois que for salvo */}
        {savedTitle && (
          <h2 style={{ marginTop: "15px" }}>
          
          </h2>
        )}
      </div>
    </>
  );
}
