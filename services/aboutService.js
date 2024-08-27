const About = require("../models/about");

const createAbout = async (aboutData) => {
  try {
    const newAbout = await Image.create(aboutData);
    console.log("New Image Created: ", newImage);
    return newImage;
  } catch (error) {
    if (error.code === 11000) {
      console.error("Error: Duplicate image name not allowed.");
    } else {
      console.error("Error creating image: ", error);
    }
  }
};
const getImageByName = async (imageName) => {
  try {
    const imageFound = await Image.findOne({ name: imageName });
    console.log("Image found: ", imageFound);
    return imageFound;
  } catch (error) {
    console.error("Error creating image: ", error);
  }
};

module.exports = {
  createImage,
  getImageByName,
};
