const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

exports.registerUser = async (req, res) => {
  const { f_name, l_name, email, password, role } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(200).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 3);
    const user = await User.create({ f_name,l_name, email, password: hashedPassword, role });
    res.status(201).json({
      _id: user._id,
      f_name: user.f_name,
      l_name: user.l_name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id)
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if(!user) {
      return res.status(200).json({message: "User Doesnot exist! Please signup"})
    }
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(200).json({ message: 'Invalid credentials' });
    }
    res.json({
      _id: user._id,
      name: user.name,
      f_name: user.f_name,
      l_name: user.l_name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id)
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};