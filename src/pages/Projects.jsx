import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

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
    sessionStorage.setItem( "project", JSON.stringify(updatedProjects) );

    setProjectName("");
    setProjectDescription("");
    setProjectLink("");
  };

  const handleSave = async () => {
    const resumeId = sessionStorage.getItem("resumeId");

    const projectsData = {
      projects: projects
    };

    try {
      const response = await fetch(
        `https://resume-builder-vnjr.onrender.com/api/resume/${resumeId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(projectsData)
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      console.log("Projects saved:", data);

      navigate("/social");
    } catch (error) {
      console.log("Error saving projects:", error);
    }
  };

  useEffect(() => {
    const savedProjects = sessionStorage.getItem("project");

    if (savedProjects) {
      const parsedProjects = JSON.parse(savedProjects);
      setProjects(parsedProjects);
    }
  }, []);

  const handleDeleteProject = (index) => {
    const updatedProjects = projects.filter((_, i) => i !== index);
    setProjects(updatedProjects);

    sessionStorage.setItem( "project", JSON.stringify(updatedProjects) );
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
              <button id='deleteBtn' onClick={() => handleDeleteProject(index)}>
                DELETE
              </button>
            </div>
          ))}
          <button id='addBtn' onClick={handleAddProject}>ADD PROJECT</button>
        </div>
      </form>
      
      <div className='form-actions section-action'>
        <button className='back'>
          <Link to='/experience'>BACK</Link>
        </button>
        <button id='next'>
          <Link to='/social'>NEXT</Link>
        </button>
        <button id='save' onClick={handleSave}>SAVE AND CONTINUE</button>
      </div>
    </div>
  )
}

export default Projects