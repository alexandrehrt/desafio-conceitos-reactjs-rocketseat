import React, { useState, useEffect } from "react";

import "./styles.css";

import api from './services/api';

function App() {
  const [repositories, setRepositories] = useState([]);

  async function handleAddRepository() {
    const response = await api.post('/repositories', {
      title: `Novo projeto ${Date.now()}`,
      url: "https://github.com/Rocketseat/bootcamp-gostack-desafios/tree/master/desafio-conceitos-nodejs",
      techs: ["Node.js", "React", "React Native"],
    });
    
    const repository = response.data;

    setRepositories([...repositories, repository]);

  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`)

    setRepositories(repositories.filter(
      repository => repository.id !== id
    ))
  }

  useEffect(() => {
    async function fetchData() {
      const response = await api.get('/repositories');
      setRepositories(response.data);
    }
    fetchData()
  }, [])

  return (
    <div>
      <ul data-testid="repository-list">
        {
        repositories.map(repo => <li key={repo.id}>{repo.title}<button onClick={() => handleRemoveRepository(repo.id)}>Remover</button></li>)
      }
             
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
