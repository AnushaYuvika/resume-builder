import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { fetchResume, saveSection } from '../api';

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
    const pending = category.trim() && skillValue.trim()
      ? [{ category, value: skillValue }] : [];
    try {
      await saveSection({ skills: [...skills, ...pending] });
      navigate("/experience");
    } catch (error) {
      alert("Could not save skills: " + error.message);
    }
  };

  useEffect(() => {
    fetchResume().then((r) => { if (r?.skills) setSkills(r.skills); });
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

        <button id='save' type='button' onClick={handleSave}>
          SAVE AND CONTINUE
        </button>
      </div>
    </div>
  )
}

export default Skills