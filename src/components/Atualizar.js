// Atualizar.js
import React, { useState } from 'react';

const Atualizar = () => {
  const [id, setId] = useState('');
  const [nome, setNome] = useState('');
  const [idade, setIdade] = useState('');
  const [registroAtualizado, setRegistroAtualizado] = useState(null);
  const [erro, setErro] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault(); // Evita o comportamento padrão de submit do formulário
    try {
      const response = await fetch(`http://localhost:3000/atualizar/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nome, idade, id }) // Aqui, o valor atualizado de 'id' é usado
      });
      if (!response.ok) {
        throw new Error('Erro ao atualizar dado');
      }
      // Extrai o registro atualizado da resposta da API
      const novoRegistro = await response.json();
      // Atualiza o estado com o novo registro
      setRegistroAtualizado(novoRegistro);
      // Limpa os campos de entrada
      setId('');
      setNome('');
      setIdade('');
      // Limpa o estado de erro, se houver
      setErro(null);
    } catch (error) {
      console.error(error);
      // Atualiza o estado com a mensagem de erro
      setErro('Erro ao atualizar dado');
    }
  };
  

  return (
    <div>
      <h2>Atualizar Registro</h2>
      <form onSubmit={handleSubmit}>
      <label className="input-label">
  ID:
    <input className="input-field" 
    type="text" 
    value={id} 
    onChange={(e) => setId(e.target.value)} />
    </label>
    <br />
    <label className="input-label">
  Nome:
    <input className="input-field"
    type="text"
    value={nome}
    onChange={(e) => setNome(e.target.value)} />
    </label>
    <br />
    <label className="input-label">
  Idade:
    <input className="input-field"
    type="number"
    value={idade}
    onChange={(e) => setIdade(e.target.value)} />
    </label>
    <br />
    <button className="submit-button"
    style={{backgroundColor: 'purple'}}
    type="submit">Atualizar</button>

      </form>
      {/* Exibe o registro atualizado, se disponível */}
      {registroAtualizado && (
        <div>
          <h3>Registro Atualizado:</h3>
          <p>ID: {registroAtualizado.id}</p>
          <p>Nome: {registroAtualizado.nome}</p>
          <p>Idade: {registroAtualizado.idade}</p>
        </div>
      )}
      {/* Exibe a mensagem de erro, se houver */}
      {erro && <p>{erro}</p>}
    </div>
  );
};

export default Atualizar;
