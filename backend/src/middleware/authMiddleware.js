import jwt from 'jsonwebtoken';
import config from '../Config/config.js';

export default function (req, res, next) {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    req.user ={id: decoded.userId};
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
