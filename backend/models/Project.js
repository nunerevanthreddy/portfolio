import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Project title is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Project description is required'],
    },
    image: {
      type: String,
      required: [true, 'Project image URL is required'],
    },
    technologies: {
      type: [String],
      required: [true, 'Technologies are required'],
    },
    githubUrl: {
      type: String,
      trim: true,
    },
    liveUrl: {
      type: String,
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      default: 'Full Stack',
      trim: true,
    },
  },
  { timestamps: true }
);

const Project = mongoose.model('Project', ProjectSchema);
export default Project;
