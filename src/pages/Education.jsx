import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { fetchResume, saveSection } from '../api';

const Education = () => {
  const [course, setCourse] = useState("");
  const [year, setYear] = useState("");
  const [institution, setInstitution] = useState("");
  const [percentage, setPercentage] = useState("");
  const [educations, setEducations] = useState([]);

  const navigate = useNavigate();

  const clearForm = () => {
    setCourse(""); setYear(""); setInstitution(""); setPercentage("");
  };

  const handleAddEducation = () => {
    if (course.trim() === "") return;
    setEducations([...educations, { course, year, institution, percentage }]);
    clearForm();
  };

  const handleDeleteEducation = (index) => {
    setEducations(educations.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    const pending = course.trim() ? [{ course, year, institution, percentage }] : [];
    try {
      await saveSection({ education: [...educations, ...pending] });
      navigate("/skill");
    } catch (error) {
      alert("Could not save education: " + error.message);
    }
  };

  useEffect(() => {
    fetchResume().then((r) => { if (r?.education) setEducations(r.education); });
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
          {educations.map((edu, i) => (
            <div key={i} className='section-btns'>
              <button type='button' id='deleteBtn' onClick={() => handleDeleteEducation(i)}>DELETE</button>
            </div>
          ))}
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