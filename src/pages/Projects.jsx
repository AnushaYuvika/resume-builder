import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { fetchResume, saveSection } from '../api';

const Projects = () => {
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectLink, setProjectLink] = useState("");

  const [projects, setProjects] = useState([]);

  const navigate = useNavigate();

  const handleAddProject = () => {
    if (projectName.trim() === "") return;

    const projectData = {
      projectName,
      projectDescription,
      projectLink
    };

    const updatedProjects = [...projects, projectData]; 
    setProjects(updatedProjects); 

    setProjectName("");
    setProjectDescription("");
    setProjectLink("");
  };

  const handleSave = async () => {
    const pending = projectName.trim()
      ? [{ projectName, projectDescription, projectLink }] : [];
    try {
      await saveSection({ projects: [...projects, ...pending] });
      navigate("/social");
    } catch (error) {
      alert("Could not save projects: " + error.message);
    }
  };

  useEffect(() => {
    fetchResume().then((r) => { if (r?.projects) setProjects(r.projects); });
  }, []);

  const handleDeleteProject = (index) => {
    const updatedProjects = projects.filter((_, i) => i !== index);
    setProjects(updatedProjects);
  };

  return (
    <div className='section-container'>
      <p className='title'>Add your Mini Projects</p>

      <form className='section-form project-form'>
        <label htmlFor="name" className='section-inputs'>
          <input type="text" placeholder='Project Name*' id='name' value={projectName}
            onChange={(e) => setProjectName(e.target.value)} />
        </label>
        <label htmlFor="projectLink" className='section-inputs'>
          <input type="text" placeholder='Project Link' id='projectLink' value={projectLink}
            onChange={(e) => setProjectLink(e.target.value)}
          />
        </label>
        <label htmlFor="desc" className='section-inputs'>
          <input type="text" placeholder='Description' id='desc' value={projectDescription}
            onChange={(e) => setProjectDescription(e.target.value)} />
        </label>

        <div className='section-form-btns project-btns'>
          {projects.map((project, index) => (
            <div key={index}>
              <button id='deleteBtn' type='button' onClick={() => handleDeleteProject(index)}>
                DELETE
              </button>
            </div>
          ))}
          <button id='addBtn' type='button' onClick={handleAddProject}>ADD PROJECT</button>
        </div>
      </form>
      
      <div className='form-actions section-action'>
        <button className='back'>
          <Link to='/experience'>BACK</Link>
        </button>
        <button id='next'>
          <Link to='/social'>NEXT</Link>
        </button>
        <button id='save' type='button' onClick={handleSave}>SAVE AND CONTINUE</button>
      </div>
    </div>
  )
}

export default Projects