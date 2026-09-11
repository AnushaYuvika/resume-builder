import React, { useEffect, useState } from 'react'

const ResumeOutput = () => {

  const [profile, setProfile] = useState(null);
  const [education, setEducation] = useState([]);
  const [skills, setSkills] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [projects, setProjects] = useState([]);
  const [socials, setSocials] = useState([]);

  useEffect(() => {
  const fetchResume = async () => {
    const resumeId = sessionStorage.getItem("resumeId");

    try {
      const response = await fetch(
        `http://localhost:8080/api/resume/${resumeId}`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      console.log("Resume data:", data);
      console.log("Profile from API:", data.profile);

      setProfile(data.profile);
      setEducation(data.education || null);
      setSkills(data.skills || []);
      setExperiences(data.experience || []);
      setProjects(data.projects || []);
      setSocials(data.social || []);

    } catch (error) {
      console.log("Error fetching resume:", error);
    }
  };

  fetchResume();
}, []);

  return (
    <div className='resume'>
      {/* HEADER */}
      <header className='resume-header'>

        {profile && (
          <>
            <h1>{profile.firstName} {profile.lastName}</h1>
            <p> (+91) {profile.phone} ⋄ {profile.address}</p>
          </>
        )}

        {socials.length > 0 && (
          <p>
            {socials.map((social, index) => (
              <span key={index}>
                {social.socialLinks}
                {index < socials.length - 1 && " ⋄ "}
              </span>
            ))}
          </p>
        )}

      </header>


      {/* EDUCATION */}
      <section className='resume-section'>
        <h2>EDUCATION</h2>
        <hr />

        {education.map((edu, index) => (
          <div className='education-item' key={index}>

            <div>
              <h3>{edu.course}</h3>
              <p>{edu.institution}</p>
            </div>

            <div>
              <p>{edu.year}</p>
              <p>CGPA: {edu.percentage}</p>
            </div>

          </div>
        ))}
      </section>


      {/* SKILLS */}
      <section className='resume-section'>
        <h2>SKILLS</h2>
        <hr />

        <div className='skills-content'>

          {skills.map((skill, index) => (
            <div className='skill-row' key={index}>
              <h3>{skill.category}</h3>
              <p>{skill.value}</p>
            </div>
          ))}

        </div>
      </section>


      {/* EXPERIENCE */}
      <section className='resume-section'>
        <h2>EXPERIENCE</h2>
        <hr />

        {experiences.map((experience, index) => (
          <div className='experience-item' key={index}>

            <div className='experience-header'>

              <div>
                <h3>{experience.jobTitle}</h3>
                <p>{experience.company}</p>
              </div>

              <div className='experience-right'>
                <p>{experience.date}</p>
                <p>{experience.location}</p>
              </div>

            </div>

            <div className='experience-description'>
              <p>• {experience.description}</p>
            </div>

          </div>
        ))}
      </section>


      {/* PROJECTS */}
      <section className='resume-section'>
        <h2>PROJECTS</h2>
        <hr />

        {projects.map((project, index) => (
          <div className='project-item' key={index}>

            <h3>• {project.projectName}</h3>

            <p>{project.projectDescription}</p>

            {project.projectLink && (
              <p>{project.projectLink}</p>
            )}

          </div>
        ))}
      </section>


      {/* ACHIEVEMENTS */}
      <section className='resume-section'>
        <h2>ACHIEVEMENTS</h2>
        <hr />

        {socials.map((social, index) => (
          social.achievements && (
            <p key={index}>
              • {social.achievements}
            </p>
          )
        ))}
      </section>


      {/* LEADERSHIP */}
      <section className='resume-section'>
        <h2>LEADERSHIP</h2>
        <hr />

        {socials.map((social, index) => (
          social.leadership && (
            <p key={index}>
              • {social.leadership}
            </p>
          )
        ))}
      </section>

    </div>
  )
}

export default ResumeOutput