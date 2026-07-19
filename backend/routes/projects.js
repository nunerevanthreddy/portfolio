import express from 'express';
import Project from '../models/Project.js';
import protect from '../middleware/auth.js';

const router = express.Router();

// @desc    Get all projects
// @route   GET /api/projects
// @access  Public
router.get('/', async (req, res, next) => {
  try {
    const projects = await Project.find({}).sort({ createdAt: -1 });
    res.json({ success: true, count: projects.length, data: projects });
  } catch (error) {
    next(error);
  }
});

// @desc    Get single project
// @route   GET /api/projects/:id
// @access  Public
router.get('/:id', async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }
    res.json({ success: true, data: project });
  } catch (error) {
    next(error);
  }
});

// @desc    Create a project
// @route   POST /api/projects
// @access  Private
router.post('/', protect, async (req, res, next) => {
  const { title, description, image, technologies, githubUrl, liveUrl, category } = req.body;

  if (!title || !description || !image || !technologies) {
    return res.status(400).json({ success: false, message: 'Please provide all required fields' });
  }

  try {
    const project = new Project({
      title,
      description,
      image,
      technologies: Array.isArray(technologies) ? technologies : technologies.split(',').map(t => t.trim()),
      githubUrl,
      liveUrl,
      category: category || 'Full Stack',
    });

    const createdProject = await project.save();
    res.status(201).json({ success: true, data: createdProject });
  } catch (error) {
    next(error);
  }
});

// @desc    Update a project
// @route   PUT /api/projects/:id
// @access  Private
router.put('/:id', protect, async (req, res, next) => {
  const { title, description, image, technologies, githubUrl, liveUrl, category } = req.body;

  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    project.title = title || project.title;
    project.description = description || project.description;
    project.image = image || project.image;
    if (technologies) {
      project.technologies = Array.isArray(technologies) ? technologies : technologies.split(',').map(t => t.trim());
    }
    project.githubUrl = githubUrl !== undefined ? githubUrl : project.githubUrl;
    project.liveUrl = liveUrl !== undefined ? liveUrl : project.liveUrl;
    project.category = category || project.category;

    const updatedProject = await project.save();
    res.json({ success: true, data: updatedProject });
  } catch (error) {
    next(error);
  }
});

// @desc    Delete a project
// @route   DELETE /api/projects/:id
// @access  Private
router.delete('/:id', protect, async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    await Project.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Project removed successfully' });
  } catch (error) {
    next(error);
  }
});

export default router;
