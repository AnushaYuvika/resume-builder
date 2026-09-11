import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Education = () => {
  const [course, setCourse] = useState("");
  const [year, setYear] = useState("");
  const [institution, setInstitution] = useState("");
  const [percentage, setPercentage] = useState("");

  const navigate = useNavigate();

  const handleAddEducation = () => {
    const educationData = {
      course,
      year,
      institution,
      percentage
    };

    sessionStorage.setItem("education", JSON.stringify(educationData));
  };

  const handleSave = async () => {
    const resumeId = sessionStorage.getItem("resumeId");

    const educationData = {
      education: [
        {
          course,
          year,
          institution,
          percentage
        }
      ]
    };

    try {
      const response = await fetch(
        `http://localhost:8080/api/resume/${resumeId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(educationData)
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      console.log("Education saved:", data);

      navigate("/skill");
    } catch (error) {
      console.log("Error saving education:", error);
    }
  };
  
  const handleDeleteEducation = () => {
    sessionStorage.removeItem("education");

    setCourse("");
    setYear("");
    setInstitution("");
    setPercentage("");
  };

  useEffect(() => {
    const savedEducation = sessionStorage.getItem("education");

    if (savedEducation) {
      const parsedEducation = JSON.parse(savedEducation);

      setCourse(parsedEducation.course);
      setYear(parsedEducation.year);
      setInstitution(parsedEducation.institution);
      setPercentage(parsedEducation.percentage);
    }
  }, []);


  return (
    <div className='section-container'>
      <p className='title'>Add your Education Details</p>

      <form className='section-form edu-form'>
        <label htmlFor="course" className='section-inputs'>
          <input type="text" placeholder='Course Name*' id='course' value={course}
            onChange={(e) => setCourse(e.target.value)} />
        </label>
        <label htmlFor="year" className='section-inputs'>
          <input type="text" placeholder='Completion Year*' id='year' value={year}
            onChange={(e) => setYear(e.target.value)} />
        </label>
        <label htmlFor="institution" className='section-inputs'>
          <input type="text" placeholder='College/School*' id='institution' value={institution}
            onChange={(e) => setInstitution(e.target.value)} />
        </label>
        <label htmlFor="percentage" className='section-inputs'>
          <input type="number" placeholder='Percentage*' id='percentage' value={percentage}
            onChange={(e) => setPercentage(e.target.value)} />
        </label>
        <div className='section-form-btns'>
          <button id='deleteBtn' type='button'onClick={handleDeleteEducation}>DELETE</button>
          <button id='addBtn' type='button' onClick={handleAddEducation}>ADD EDUCATION</button>
        </div>
      </form>
      
      <div className='form-actions section-action'>
        <button className='back'>
          <Link to='/'>BACK</Link>
        </button>
        <button id='next'>
          <Link to='/skill'>NEXT</Link>
        </button>
        <button id='save' type='button' onClick={handleSave}>SAVE AND CONTINUE</button>
      </div>
    </div>
  )
}

export default Education