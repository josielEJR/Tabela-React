import React, { useState } from 'react';
import TableSql from './components/TableSql';
import Adicionar from './components/Adicionar';
import Atualizar from './components/Atualizar';
import Deletar from './components/Deletar';
import BuscarPorId from './components/BuscarPorId';
import './App.css';

function App() {
  const [activeComponent, setActiveComponent] = useState('table');
  const [searchedId, setSearchedId] = useState('');

  const changeComponent = (component) => {
    setActiveComponent(component);
  };

  const handleSearch = (id) => {
    setSearchedId(id); // Define o ID buscado
    setActiveComponent('table'); // Muda para o componente TableSql após a busca
  };

  const handleUpdate = async (id, nome, idade) => {
    // Lógica para atualizar o registro com os dados fornecidos
    console.log('Atualizando registro:', id, nome, idade);
    // Aqui você pode implementar a lógica para fazer a chamada à API para atualizar o registro
  };
  
  const handleDelete = async (id) => {
    // Lógica para deletar o registro com o ID fornecido
    console.log('Deletando registro:', id);
    // Aqui você pode implementar a lógica para fazer a chamada à API para deletar o registro
  };
  
  return (
    <div className="App">
      <nav>
        <ul>
        <button className='bt' 
        style={{ cursor: 'pointer' }} 
        onClick={() => changeComponent('table')}>Tabela</button>
        <button className='bt1' 
        style={{ cursor: 'pointer' }}  
        onClick={() => changeComponent('adicionar')}>Adicionar</button>
        <button className='bt2' 
        style={{ cursor: 'pointer' }} 
        onClick={() => changeComponent('atualizar')}>Atualizar</button>
        <button className='bt3' 
        style={{ cursor: 'pointer' }} 
        onClick={() => changeComponent('deletar')}>Deletar</button>
        <button className='bt4' 
        style={{ cursor: 'pointer' }} 
        onClick={() => changeComponent('buscar')}>Buscar</button>
        </ul>
      </nav>
      {activeComponent === 'table' && <TableSql searchedId={searchedId} />}
      {activeComponent === 'adicionar' && <Adicionar />}
      {activeComponent === 'atualizar' && <Atualizar onUpdate={handleUpdate} />} {/* Passando a função handleUpdate como prop onUpdate */}
      {activeComponent === 'deletar' && <Deletar onDelete={handleDelete} id={searchedId} />} {/* Passando a função handleDelete como prop onDelete */}
      {activeComponent === 'buscar' && <BuscarPorId onSearch={handleSearch} />}
    </div>
  );
}

export default App;
