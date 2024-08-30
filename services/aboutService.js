const About = require("../models/about");

const createAbout = async (aboutData) => {
  try {
    const newAbout = await About.create(aboutData);
    console.log("New About Created: ", newAbout);
    return newAbout;
  } catch (error) {
    if (error.code === 11000) {
      console.error("Error: Duplicate About name not allowed.");
    } else {
      console.error("Error creating about: ", error);
    }
    throw error
  }
};
const getAboutByName = async (aboutName) => {
  try {
    const aboutFound = await About.findOne({ data_id: aboutName });
    console.log('abotname', aboutName)
    console.log("about found: ", aboutFound);
    return aboutFound;
  } catch (error) {
    console.error("Error creating about: ", error);
    throw error
  }
};

module.exports = {
  createAbout,
  getAboutByName,
};
