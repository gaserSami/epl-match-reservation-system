// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const usersRouter = require('./routes/users');
const ticketsRouter = require('./routes/tickets');
const teamsRouter = require('./routes/teams');
const stadiumsRouter = require('./routes/stadiums');
const matchesRouter = require('./routes/matches');
const refereesRouter = require('./routes/referees');
const linesmenRouter = require('./routes/linesmen');
const User = require('./models/User'); // Adjust the path as necessary



// MongoDB connection URL for your database
const mongoURI = 'mongodb+srv://gaserelmasry02:gaserelmasry02@efaticketreservationsys.mbrdrlg.mongodb.net/EPL_Reservation_System?retryWrites=true&w=majority';

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected to EPL_Reservation_System'))
  .catch(err => console.error('MongoDB Connection Error:', err));



// Create Express app
const app = express();
// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors());

app.use('/users', usersRouter);
app.use('/tickets', ticketsRouter);
app.use('/teams', teamsRouter);
app.use('/stadiums', stadiumsRouter);
app.use('/matches', matchesRouter);
app.use('/referees', refereesRouter);
app.use('/linesmen', linesmenRouter);


// Login route
app.post('/login', async (req, res) => {
  const { Username, Password } = req.body;

  const user = await User.findOne({ Username });
  if (!user) return res.status(400).send('Invalid username or password.');

  const validPassword = await bcrypt.compare(Password, user.Password);
  if (!validPassword) return res.status(400).send('Invalid username or password.');

  const token = jwt.sign({ _id: user._id, UserType: user.UserType }, 'jwtPrivateKey');
  res.send({ token, _id: user._id, UserType: user.UserType });
});




//===================
// START THE SERVER
//===================

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


