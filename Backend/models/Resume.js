const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema({
  profile: {
    firstName: String,
    lastName: String,
    phone: String,
    address: String,
    profileImage: String
  },

  education: [
    {
      course: String,
      year: String,
      institution: String,
      percentage: String
    }
  ],

  skills: [
    {
      category: String,
      value: String
    }
  ],

  experience: [
    {
      jobTitle: String,
      company: String,
      date: String,
      location: String,
      description: String
    }
  ],

  projects: [
    {
      projectName: String,
      projectDescription: String,
      projectLink: String
    }
  ],

  social: [
    {
      socialLinks: String,
      achievements: String,
      leadership: String
    }
  ]
});

module.exports = mongoose.model("Resume", resumeSchema);