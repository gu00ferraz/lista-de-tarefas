import { useState } from "react";

export default function AddTodo({ onAddTodo }) {
  //guarda o texto digitado no campo “Adicionar tarefa”
  const [title, setTitle] = useState("");
  //guarda o texto digitado no campo “Título da lista”
  const [listTitle, setListTitle] = useState("");
  //guarda o título final salvo (após pressionar Enter)
  const [savedTitle, setSavedTitle] = useState([]);

  //É chamada toda vez que o usuário pressiona uma tecla dentro do input do título da lista.
  function handleListTitleKeyDown(e) {
    if (e.key === "Enter" && listTitle.trim() !== "") {
      setSavedTitle(listTitle);
      setListTitle("");
    }
  }

  return (
    <>
      {/*TITULO FIXO DA <PAGINA></PAGINA> */}
      <h1> Aqui estão suas tarefas diárias </h1>

      {/* adiciona LA EMBAIXO o  título da lista */}
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

      {/* SEÇÃO 2: adicionar tarefas */}
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

        <button
          onClick={() => {
            //verifica se o campo esta vazio
            if (title.trim() === "") return;
            onAddTodo(title);
            setTitle("");
          }}
        >
          Adicionar Tarefa
        </button>
        {savedTitle && <h2 style={{ marginTop: "15px" }}>{savedTitle}</h2>}
      </div>
    </>
  );
}
