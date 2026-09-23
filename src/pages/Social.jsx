import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Social = () => {
  const [socialLinks, setSocialLinks] = useState("");
  const [achievements, setAchievements] = useState("");
  const [leadership, setLeadership] = useState("");
  const [socials, setSocials] = useState([]);

  const navigate = useNavigate();

  const handleAddSocial = () => {
    if (
      socialLinks.trim() === "" &&
      achievements.trim() === "" &&
      leadership.trim() === ""
    ) return;

    const socialData = {
      socialLinks,
      achievements,
      leadership
    };

    const updatedSocials = [...socials, socialData];

    setSocials(updatedSocials);

    sessionStorage.setItem("social", JSON.stringify(updatedSocials));

    setSocialLinks("");
    setAchievements("");
    setLeadership("");
  };

  const handleSave = async () => {
    const resumeId = sessionStorage.getItem("resumeId");

    const socialData = {
      social: socials
    };

    try {
      const response = await fetch(
        `https://resume-builder-vnjr.onrender.com/api/resume/${resumeId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(socialData)
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      console.log("Social saved:", data);

      navigate("/output");
    } catch (error) {
      console.log("Error saving social:", error);
    }
  };

  useEffect(() => {
    const savedSocials = sessionStorage.getItem("social");

    if (savedSocials) {
      const parsedSocials = JSON.parse(savedSocials);
      setSocials(parsedSocials);
    }
  }, []);

  const handleDeleteSocial = (index) => {
    const updatedSocials = socials.filter((_, i) => i !== index);

    setSocials(updatedSocials);

    sessionStorage.setItem("social", JSON.stringify(updatedSocials));
  };

  return (
    <div className='section-container'>
      <p className='title'>Add social links like linkedin, github, achievements etc</p>

      <form className='section-form project-form'>
        <label htmlFor="links" className='section-inputs'>
          <input type="text" placeholder='Social Links*' id='links' value={socialLinks}
            onChange={(e) => setSocialLinks(e.target.value)} />
        </label>
        <label htmlFor="achievements" className='section-inputs'>
          <input type="text" placeholder='Achievements' id='achievements' value={achievements}
            onChange={(e) => setAchievements(e.target.value)} />
        </label>
        <label htmlFor="leadership" className='section-inputs'>
          <input type="text" placeholder='Leadership' id='leadership' value={leadership}
            onChange={(e) => setLeadership(e.target.value)} />
        </label>
        <div className='section-form-btns project-btns'>
          {socials.map((social, index) => (
            <div key={index}>
              <button id='deleteBtn' type='button' onClick={() => handleDeleteSocial(index)}>
                DELETE
              </button>
            </div>
          ))}
          <button id='addBtn' type='button' onClick={handleAddSocial}>ADD SOCIAL</button>
        </div>
      </form>      
     
      <div className='form-actions section-action'>
        <button className='back'><Link to='/projects'>BACK</Link></button>
        <button id='next'><Link to='/output'>NEXT</Link></button>
        <button id='save' onClick={handleSave}>SAVE AND CONTINUE</button>
      </div>
    </div>
  )
}

export default Social