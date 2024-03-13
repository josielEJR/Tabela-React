import React, { useState, useEffect } from 'react';

const TableSql = ({ searchedId }) => {
  const [dados, setDados] = useState([]);
  const [error, setError] = useState(null)
  // resgatando dados
  useEffect(() => {
      async function fetchData() {
        try{
          const res = await fetch("http://localhost:3000/");
          const data = await res.json()
          setDados(data)
        } catch (error){
          console.error(error.message)
          setError("Não conseguiu carregar dados")
        }

      }

      fetchData()
  }, [])
    
  // Filtrar os dados com base no ID buscado
  const filteredData = searchedId ? dados.filter(item => item.id === searchedId) : dados;

  return (
    <div>
        {error && <p>{error}</p>}      
        <table className="custom-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Idade</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map(item => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.nome}</td>
                <td>{item.idade}</td>
              </tr>
            ))}
          </tbody>
        </table>
    </div>
    
  );
};

export default TableSql;
