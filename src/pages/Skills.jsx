import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Skills = () => {

  const [category, setCategory] = useState("");
  const [skillValue, setSkillValue] = useState("");

  const [skills, setSkills] = useState([]);

  const navigate = useNavigate();

  const handleAddSkill = () => {
    if (category.trim() === "" || skillValue.trim() === "") return;

    const skillData = {
      category,
      value: skillValue
    };

    const updatedSkills = [...skills, skillData];

    setSkills(updatedSkills);

    sessionStorage.setItem("skills",JSON.stringify(updatedSkills));

    setCategory("");
    setSkillValue("");
  };

  const handleDeleteSkill = (index) => {
    const updatedSkills = skills.filter((_, i) => i !== index);

    setSkills(updatedSkills);

    sessionStorage.setItem("skills",JSON.stringify(updatedSkills));
  };

  const handleSave = async () => {
    const resumeId = sessionStorage.getItem("resumeId");

    const skillsData = {
      skills: skills
    };

    try {
      const response = await fetch(
        `https://resume-builder-vnjr.onrender.com/api/resume/${resumeId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(skillsData)
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      console.log("Skills saved:", data);

      navigate("/experience");
    } catch (error) {
      console.log("Error saving skills:", error);
    }
  };

  useEffect(() => {
    const savedSkills = sessionStorage.getItem("skills");

    if (savedSkills) {
      const parsedSkills = JSON.parse(savedSkills);
      setSkills(parsedSkills);
    }
  }, []);

  return (
    <div className='section-container'>

      <p className='title'>Add your Skills</p>

      <form className='skill-form '>
        <label className='section-inputs'>
          <input type="text" placeholder='Skill Category' value={category} 
          onChange={(e) => setCategory(e.target.value)} />
        </label>

        <label className='section-inputs'>
          <input type="text" placeholder='Skills' value={skillValue}
            onChange={(e) => setSkillValue(e.target.value)} />
        </label>
      </form>

      <div className='section-btns'>
        {skills.map((item, index) => (
          <div key={index}>
            <button id='deleteBtn' type='button' onClick={() => handleDeleteSkill(index)}>
              DELETE
            </button>
          </div>
        ))}

        <button className='skill-addBtn' id='addBtn' type='button' onClick={handleAddSkill}>
          ADD SKILL
        </button>
      </div>

      <hr className='skill-underline' />

      <div className='form-actions section-action'>
        <button className='back'>
          <Link to='/education'>BACK</Link>
        </button>

        <button id='next'>
          <Link to='/experience'>NEXT</Link>
        </button>

        <button id='save' onClick={handleSave}>
          SAVE AND CONTINUE
        </button>
      </div>
    </div>
  )
}

export default Skills