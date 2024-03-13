import React from 'react';

const Deletar = ({ onDelete }) => {
  const [id, setId] = React.useState('');
  const [registroDeletado, setRegistroDeletado] = React.useState(null);

  const handleChangeId = (event) => {
    setId(event.target.value);
  };

  const handleDelete = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/deletar/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error('Erro ao deletar dado');
      }
      const deletedRecord = await response.json();
      // Chama a função onDelete passando o ID do registro deletado
      onDelete(id);
      // Define o registro deletado para exibição na interface
      setRegistroDeletado(deletedRecord);
      // Limpa o campo após a exclusão
      setId('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Deletar Registro</h2>
      <form onSubmit={handleDelete}>
        <label className="input-label">
          ID:
          <input className="input-field"  
          type="text" 
          value={id} 
          onChange={handleChangeId} />
        </label>
          <button  className="submit-button" 
          style={{backgroundColor: 'red'}} 
          type="submit" >Deletar</button>
      </form>
      {registroDeletado && (
        <div>
          <h3>Registro Deletado:</h3>
          <p>ID: {registroDeletado.id}</p>
          <p>Nome: {registroDeletado.nome}</p>
          <p>Idade: {registroDeletado.idade}</p>
        </div>
      )}
    </div>
  );
};

export default Deletar;
