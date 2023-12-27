import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import { createAccessToken } from "../libs/jwt.js";
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";
import { array } from "zod";

export const register = async (req, res) => {
  const {
    email,
    password,
    username,
    cv,
    description,
    phone,
    photo,
    direction,
    specialization,
  } = req.body;

  try {
    const userFound = await User.findOne({ email });
    if (userFound) {
      return res.status(400).json(["The email is already in use"]);
    }

    const hashpassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashpassword,
      cv,
      description,
      phone,
      direction,
      specialization,
      photo,
    });

    const userSaved = await newUser.save();
    const token = await createAccessToken({ id: newUser._id });

    res.cookie("token", token);
    res.json({
      message: "User saved successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userFound = await User.findOne({ email });

    if (!userFound) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, userFound.password);

    if (!isMatch)
      return res.status(400).json({ message: "Incorrect password" });

    const token = await createAccessToken({ id: userFound._id });

    res.cookie("token", token);
    res.json({
      id: userFound.id,
      username: userFound.username,
      email: userFound.email,
      description: userFound.description,
      photo: userFound.photo,
      cv: userFound.cv,
      phone: userFound.phone,
      specialization: userFound.specialization,
      createdAt: userFound.createdAt,
      updatedAt: userFound.updatedAt,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addMessage = async (req, res) => {
  const { message, email, name, username } = req.body;

  try {
    const userFound = await User.findOne({ username: username });
    const findEmailComment = userFound.feedback.map((feed)=>{
      if (email === feed.email ) {
        return feed
      }
    })
    

if (findEmailComment){
    const feed = findEmailComment.filter(value => value);

    console.log(feed);

    const profile = await User.findByIdAndUpdate(
      { _id: userFound._id },
      { $pull: { feedback: feed[0] } }
    );
}

    const feedback = 
      {
        message: message,
        email: email,
        name: name,
      }
    

    const profile = await User.findByIdAndUpdate(
      { _id: userFound._id },
      { $push: { feedback: feedback } }
    );
    
    res.json({
      feedback: "Feedback posted successfully",
    });
    
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const logout = async (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    secure: true,
    expires: new Date(0),
  });
  return res.sendStatus(200);
};

export const updateProfile = async (req, res) => {
  try {
    const {
      id,
      email,
      password,
      username,
      cv,
      description,
      phone,
      photo,
      direction,
      specialization,
    } = req.body;
    const hashpassword = await bcrypt.hash(password, 10);
    const userFound = await User.findOne({ email });
    if (userFound) {
      return res.status(400).json(["The email is already in use"]);
    }

    const profile = await User.findOneAndUpdate(
      { _id: id },
      {
        email,
        password: hashpassword,
        username,
        cv,
        description,
        phone,
        photo,
        direction,
        specialization,
      },
      { new: true }
    );

    return res.json({
      username: profile.username,
      email: profile.email,
      description: profile.description,
      photo: profile.photo,
      cv: profile.cv,
      phone: profile.phone,
      specialization: profile.specialization,
    });
  } catch (error) {
    res.status(500).json({ mesaage: error.message });
  }
};
export const profile = async (req, res) => {
  try {
    const profile = await User.findById(req.user.id);

    if (!profile) return res.status(404).json({ mesaage: "User not found" });

    return res.json({
      id: userFound.id,
      username: userFound.username,
      email: userFound.email,
      description: userFound.description,
      photo: profile.photo,
      cv: profile.cv,
      phone: profile.phone,
      specialization: userFound.specialization,
      createdAt: profile.createdAt,
      updatedAt: profile.updatedAt,
    });
  } catch (error) {
    res.status(500).json({ mesaage: error.message });
  }
};
export const getUsers = async (req, res) => {
  try {
    const users = await User.find();

    return res.json(
      users.map((user) => {
        return {
          username: user.username,
          email: user.email,
          direction: user.direction,
          description: user.description,
          specialization: user.specialization,
          photo: user.photo,
          phone: user.phone,
          cv: user.cv,
          feedback: user.feedback,
        };
      })
    );
  } catch (error) {
    res.status(500).json({ mesaage: error.message });
  }
};
export const verifyToken = async (req, res) => {
  const { token } = req.cookies;

  if (!token) return res.status(403).json({ mesaage: "Unauthorized" });
  jwt.verify(token, TOKEN_SECRET, async (err, user) => {
    if (err) return res.status(401).json({ message: "Unauthorized" });

    const userFound = await User.findById(user.id);

    if (!userFound) return res.status(403).json({ mesaage: "Unauthorized" });

    return res.json({
      id: userFound.id,
      username: userFound.username,
      email: userFound.email,
      description: userFound.description,
      direction: userFound.direction,
      photo: userFound.photo,
      cv: userFound.cv,
      phone: userFound.phone,
      specialization: userFound.specialization,
    });
  });
};
