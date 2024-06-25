const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    heading: {
      type: String,
    },
    image: {
      type: [String], // Array of strings (URLs)
    },
    description: {
      type: String,
    },
    headingContent1: {
      type: String,
    },
    imageContent1: {
      type: [String], // Array of strings (URLs)
    },
    descriptionContent1: {
      type: String,
    },
    headingContent2: {
      type: String,
    },
    imageContent2: {
      type: [String], // Array of strings (URLs)
    },
    descriptionContent2: {
      type: String,
    },
    headingContent3: {
      type: String,
    },
    imageContent3: {
      type: [String], // Array of strings (URLs)
    },
    descriptionContent3: {
      type: String,
    },
    headingContent4: {
      type: String,
    },
    imageContent4: {
      type: [String], // Array of strings (URLs)
    },
    descriptionContent4: {
      type: String,
    },
    headingContent5: {
      type: String,
    },
    imageContent5: {
      type: [String], // Array of strings (URLs)
    },
    descriptionContent5: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const blogModel = mongoose.model("blog", blogSchema);

module.exports = blogModel;
