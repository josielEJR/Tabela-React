import React, { useState} from 'react';

const BuscarPorId = () => {
  const [id, setId] = useState('');
  const [registroEncontrado, setRegistroEncontrado] = useState(null);

  const handleChange = (event) => {
    setId(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const buscarRegistroPorId = async () => {
      try {
        const response = await fetch(`http://localhost:3000/${id}`);
        if (!response.ok) {
          throw new Error('Erro ao buscar registro');
        }
        const data = await response.json();
        setRegistroEncontrado(data);
      } catch (error) {
        console.error(error);
      }
    };

    buscarRegistroPorId();
  };

  return (
    <div>
      <h2>Buscar por ID</h2>
      <form onSubmit={handleSubmit}>
        <label className="input-label">
          ID:
          <input className="input-field"
          type="number"
          value={id} onChange={handleChange} />
        </label>
        <button className="submit-button" 
          style={{backgroundColor: 'blue'}} 
          type="submit">Buscar</button>
      </form>
      {registroEncontrado && (
        <div>
          <h3>Registro Encontrado:</h3>
          <p>ID: {registroEncontrado.id}</p>
          <p>Nome: {registroEncontrado.nome}</p>
          <p>Idade: {registroEncontrado.idade}</p>
        </div>
      )}
    </div>
  );
};

export default BuscarPorId;
