import Feedback from '../models/Feedback.js';

export const createFeedback = async (req, res) => {
  const { message } = req.body;

  if (!message) return res.status(400).json({ msg: 'Message is required' });

  try {
    const newFeedback = new Feedback({
      user: req.body.user,
      message,
    });

    const feedback = await newFeedback.save();
    res.json(feedback);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

export const getFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find().populate('user', ['name', 'email']);
    res.json(feedbacks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

export const updateFeedback = async (req, res) => {
  const { message } = req.body;

  try {
    let feedback = await Feedback.findById(req.params.id);
    if (!feedback) return res.status(404).json({ msg: 'Feedback not found' });

    // Check user
    if (feedback.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    feedback.message = message;
    await feedback.save();
    res.json(feedback);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

export const deleteFeedback = async (req, res) => {
  try {
    let feedback = await Feedback.findById(req.params.id);
    if (!feedback) return res.status(404).json({ msg: 'Feedback not found' });

    // Check user
    if (feedback.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await Feedback.findByIdAndRemove(req.params.id);
    res.json({ msg: 'Feedback removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
