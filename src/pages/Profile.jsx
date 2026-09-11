import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'


const Profile = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [profileImage, setProfileImage] = useState(null);


  const navigate = useNavigate();

  const handleSave = async () => {
    const resumeData = {
      profile: {
        firstName,
        lastName,
        phone,
        address,
        profileImage: null
      }
    };

    try {
      const response = await fetch("http://localhost:8080/api/resume", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(resumeData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      console.log("Resume saved:", data);

      sessionStorage.setItem("resumeId", data._id);

      navigate("/education");

    } catch (error) {
      console.log("Error saving resume:", error);
    }
  };
  


  return (
    <div className='section-container'>
      <p className='profile-title'>Add your Profile Details</p>

      <form className='section-form'>
        <label htmlFor="firstName" className='section-inputs'>
          <input type="text" placeholder='First Name' id='firstName' value={firstName} 
          onChange={(e) => setFirstName(e.target.value)} />
        </label>
        <label htmlFor="lastName" className='section-inputs'>
          <input type="text" placeholder='Last Name' id='lastName' value={lastName} 
          onChange={(e) => setLastName(e.target.value)} />
        </label>
        <label htmlFor="no." className='section-inputs'>
          <input type="tel" placeholder='Phone Number' id='no.' maxLength='10' value={phone}
          onChange={(e) => setPhone(e.target.value)} />
        </label>
        <label htmlFor="address" className='section-inputs'>
          <input type="text" placeholder='Address' id='address' value={address}
          onChange={(e) => setAddress(e.target.value)} />
        </label>

        <div className='image-container'>
          <p className='profile-image'>Profile Image</p>
          <input className='profile-image-input' type="file" accept='image/*' 
          onChange={(e) => setProfileImage(e.target.files[0])} />
        </div>
      </form>
      
      <div className='form-actions'>
        <button id='back'>BACK</button>
        <button id='next'>
          <Link to='/education'>NEXT</Link>
        </button>
        <button id='save' onClick={handleSave}>SAVE AND CONTINUE</button>
      </div>
    </div>
  )
}

export default Profile