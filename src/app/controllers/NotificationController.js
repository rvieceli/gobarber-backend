import User from '../models/User';
import Notification from '../schemas/Notification';

class NotificationController {
  async index(req, res) {
    if (!(await User.findProvider(req.userId))) {
      res.status(401).json({ error: 'Only provider can load notifications' });
    }

    const notifications = await Notification.find({
      user: req.userId,
    })
      .sort({ createdAt: 'desc' })
      .limit(20);

    return res.json(notifications);
  }

  async update(req, res) {
    const notification = await Notification.findById(req.params.id);
    if (!notification.read) {
      notification.read = true;
      await notification.save();
    }

    return res.json(notification);
  }
}

export default new NotificationController();
