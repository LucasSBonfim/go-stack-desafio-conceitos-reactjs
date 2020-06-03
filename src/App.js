import React, { useState, useEffect } from "react";
import api from './services/api'
import "./styles.css";

function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
      api.get('/repositories').then(response => {
          console.log(response)
          setProjects(response.data);
      })
  }, [])
  async function handleAddRepository() {
    const response = await api.post('/repositories', 
    {
        title: `go-stack-desafio-conceitos-node ${Date.now()}`,
        owner: "Lucas Simas",
        techs: ["React", "ReactJS", "nodeJS"]
    });

    const project = response.data;
    setProjects([...projects, project]);
  }

  async function handleRemoveRepository(id) { 
    const response = await api.delete(`/repositories/${id}`);
    console.log(response)
    if(response.status === 204){
      const index = projects.findIndex(response => response.id === id);
      projects.splice(index, 1)
      setProjects([...projects])
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
          {projects.map(project => 
            <li key={project.id}>
              {project.title}
              <span style={{padding: 20 + 'px'}} > 
                {project.techs.map(techs => <h4 key={techs}> {techs}</h4>)}
              </span>
              <button onClick={() => handleRemoveRepository(project.id)}>
                Remover
              </button>
          </li>)}
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
