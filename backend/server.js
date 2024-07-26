import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {format} from 'date-fns';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000 ;


const corsConfig = {
  origin:"*",
  methodS: ["POST", "GET" , "PUT", "DELETE"],
  credentials: true}
app.options("", cors (corsConfig));
app.use(cors(corsConfig));

app.get("/", (req, res) => {
  res.json("Hello World");
});
app.use(bodyParser.json());

const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI, { dbName: 'Demodb' }) 
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

const participantSchema = new mongoose.Schema({
  userId: String,
  username: String,
  email: String,
  password: { type: String, required: true },
  room: String,
  permissions: {
    MuteMic: Boolean,
    ShareScreen: Boolean,
    CameraOpen: Boolean,
    VideoRecording: Boolean
  }
});

const Participant = mongoose.model('Participant', participantSchema);

app.get('/participants', async (req, res) => {
  try {
    const participants = await Participant.find(); 
    res.json(participants);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/participants', async (req, res) => {
  const participant = new Participant(req.body);
 
  try {
    const newParticipant = await participant.save();
    res.status(201).json(newParticipant);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.put('/participants/:id', async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const updatedParticipant = await Participant.findByIdAndUpdate(id, updates, { new: true });
    res.status(200).json(updatedParticipant);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
app.delete('/participants/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await Participant.findByIdAndDelete(id);
    res.status(200).json({ message: 'Participant deleted successfully' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  events: [{
    title: String,
    date: String,
    time: String
  }],
    history: [{
    meetingId: String,
    roomName: String,
    username: String,
    dateAndTime: String,
  }]


});

const User = mongoose.model('User', userSchema);

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

app.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Username, email, and password are required' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 8);
    const newUser = new User({ username, email, password: hashedPassword });

    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ message: 'User created successfully', user: newUser, token });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });

    res.json({ message: 'Login successful', user, token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get('/current-user', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.id);
    res.json(user);
  } catch (err) {
    res.status(401).json({ message: 'Unauthorized' });
  }
});


app.post('/add-event', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const { title, date, time } = req.body;
    user.events.push({ title, date, time });
    await user.save();

    res.status(201).json({ message: 'Event added successfully', user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
app.post('/meeting-history',  async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
      const { roomName, username } = req.body;
  
      const newHistory = {
      meetingId: new mongoose.Types.ObjectId().toString(),
      roomName,
      username,
      dateAndTime: format(new Date(), 'dd/MM/yyyy HH:mm:ss'),
    };

    user.history.push(newHistory);
    await user.save();

    res.status(201).json({ message: 'Meeting history saved successfully', newHistory });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
app.get('/meeting-history', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'firstUnauthorized' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user.history);
  } catch (err) {
    res.status(401).json({ message: 'SecoundUnauthorized' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


