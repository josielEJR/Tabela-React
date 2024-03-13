import React, { useState } from 'react';

const Adicionar = () => {
  const [nome, setNome] = useState('');
  const [idade, setIdade] = useState('');
  const [registroAdicionado, setRegistroAdicionado] = useState(null);
  const [erro, setErro] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/adicionar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nome, idade })
      });
      // Extrai o registro adicionado da resposta da API
      const novoRegistro = await response.json();
      // Atualiza o estado com o novo registro
      setRegistroAdicionado(novoRegistro);
      // Limpa os campos de entrada
      setNome('');
      setIdade('');
      // Limpa o estado de erro, se houver
      setErro(null);
    } catch (error) {
      console.error(error);
      // Atualiza o estado com a mensagem de erro
      setErro('Erro ao adicionar dado');
    }
  };

  return (
    <div>
      <h2>Adicionar Novo Registro</h2>
      <form onSubmit={handleSubmit}>
        <label className="input-label">
          Nome:
          <input className="input-field" 
          type="text" 
          value={nome} onChange={(e) => setNome(e.target.value)} />
        </label>
        <br />
        <label className="input-label">
          Idade:
          <input className="input-field" 
          type="number" 
          value={idade} onChange={(e) => setIdade(e.target.value)} />
        </label>
        <br />
        <button className="submit-button"
          style={{backgroundColor: 'pink'}} 
          type="submit">Adicionar</button>
      </form>
      {/* Exibe o registro adicionado, se disponível */}
      {registroAdicionado && (
        <div>
          <h3>Registro Adicionado:</h3>
          <p>ID: {registroAdicionado.id}</p>
          <p>Nome: {registroAdicionado.nome}</p>
          <p>Idade: {registroAdicionado.idade}</p>
        </div>
      )}
      {/* Exibe a mensagem de erro, se houver */}
      {erro && <p>{erro}</p>}
    </div>
  );
};

export default Adicionar;
