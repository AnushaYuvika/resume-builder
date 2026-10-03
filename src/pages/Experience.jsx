import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { fetchResume,saveSection } from '../api';

const Experience = () => {
  const [jobTitle, setJobTitle] = useState("");
  const [company, setCompany] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");

  const [experiences, setExperiences] = useState([]);

  const navigate = useNavigate();

  const handleAddExperience = () => {
    if (jobTitle.trim() === "") return;

    const experienceData = {
      jobTitle,
      company,
      date,
      location,
      description
    };

    const updatedExperiences = [...experiences, experienceData];

    setExperiences(updatedExperiences);

    sessionStorage.setItem("experience", JSON.stringify(updatedExperiences));

    setJobTitle("");
    setCompany("");
    setDate("");
    setLocation("");
    setDescription("");
  };

  const handleDeleteExperience = (index) => {
    const updatedExperiences = experiences.filter((_, i) => i !== index);

    setExperiences(updatedExperiences);

    sessionStorage.setItem("experience", JSON.stringify(updatedExperiences));
  };

  const handleSave = async () => {
    const pending = jobTitle.trim()
      ? [{ jobTitle, company, date, location, description }] : [];
    try {
      await saveSection({ experience: [...experiences, ...pending] });
      navigate("/projects");
    } catch (error) {
      alert("Could not save experience: " + error.message);
    }
  };

  useEffect(() => {
    fetchResume().then((r) => { if (r?.experience) setExperiences(r.experience); });
  }, []);

  return (
    <div className='section-container'>
      <p className='title'>Add your Experience</p>

      <form className='section-form'>
        <label htmlFor="jobTitle" className='section-inputs'>
          <input type="text" placeholder='Job Title*' id='jobTitle' value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
          />
        </label>

        <label htmlFor="company" className='section-inputs'>
          <input type="text" placeholder='Company' id='company' value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
        </label>

        <label htmlFor="date" className='section-inputs'>
          <input type="text" placeholder='Date'  id='date' value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </label>

        <label htmlFor="location" className='section-inputs'>
          <input type="text" placeholder='Location' id='location' value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </label>

        <label htmlFor="description" className='section-inputs'>
          <input type="text" placeholder='Description' id='description' value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
      </form>

      <div className='section-btns'>
        {experiences.map((item, index) => (
          <div key={index}>
            <button id='deleteBtn' type='button' onClick={() => handleDeleteExperience(index)}>
              DELETE EXP
            </button>
          </div>
        ))}

        <button id='addBtn'type='button'onClick={handleAddExperience}>
          ADD EXP
        </button>
      </div>

      <hr className='exp-underline' />

      <div className='form-actions section-action'>

        <button className='back'>
          <Link to='/skill'>BACK</Link>
        </button>

        <button id='next'>
          <Link to='/projects'>NEXT</Link>
        </button>

        <button id='save' onClick={handleSave}>
          SAVE AND CONTINUE
        </button>

      </div>

    </div>
  )
}

export default Experience