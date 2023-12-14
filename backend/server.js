/*
 this file is the entry point of the backend server
  it requires the following modules:
  express: the server framework
  mongoose: the MongoDB object modeling tool
  cors: enable Cross Origin Resource Sharing
  bcrypt: password hashing function
  jwt: JSON Web Token implementation
  usersRouter: the users router
  ticketsRouter: the tickets router
  teamsRouter: the teams router
  stadiumsRouter: the stadiums router
  matchesRouter: the matches router
  refereesRouter: the referees router
  linesmenRouter: the linesmen router
  User: the User model
  the MongoDB connection URL for your database
  the MongoDB connection options
  the MongoDB connection callback
  the Express app
  the login route
  the server port
  the server listener
*/

// Import required modules
const express = require("express"); // Express web server framework
const mongoose = require("mongoose"); // MongoDB object modeling tool
const cors = require("cors"); // Enable Cross Origin Resource Sharing
const bcrypt = require("bcrypt"); // Password hashing function
const jwt = require("jsonwebtoken"); // JSON Web Token implementation
const usersRouter = require("./routes/users"); // Import users router
const ticketsRouter = require("./routes/tickets"); // Import tickets router
const teamsRouter = require("./routes/teams"); // Import teams router
const stadiumsRouter = require("./routes/stadiums"); // Import stadiums router
const matchesRouter = require("./routes/matches"); // Import matches router
const refereesRouter = require("./routes/referees"); // Import referees router
const linesmenRouter = require("./routes/linesmen"); // Import linesmen router
const User = require("./models/User"); // Adjust the path as necessary

// MongoDB connection URL for your database
const mongoURI =
  "mongodb+srv://gaserelmasry02:gaserelmasry02@efaticketreservationsys.mbrdrlg.mongodb.net/EPL_Reservation_System?retryWrites=true&w=majority";

// Connect to MongoDB
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected to EPL_Reservation_System"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

// Create Express app
const app = express();
// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors());

// Use users router for requests to the users API endpoint
app.use("/users", usersRouter); // Use users router for requests to the users API endpoint
app.use("/tickets", ticketsRouter); // Use tickets router for requests to the tickets API endpoint
app.use("/teams", teamsRouter); // Use teams router for requests to the teams API endpoint
app.use("/stadiums", stadiumsRouter); // Use stadiums router for requests to the stadiums API endpoint
app.use("/matches", matchesRouter); // Use matches router for requests to the matches API endpoint
app.use("/referees", refereesRouter); // Use referees router for requests to the referees API endpoint
app.use("/linesmen", linesmenRouter); // Use linesmen router for requests to the linesmen API endpoint

// Login route
app.post("/login", async (req, res) => {
  const { Username, Password } = req.body;

  const user = await User.findOne({ Username });
  if (!user) return res.status(400).send("Invalid username or password.");

  if (user.State !== "accepted")
    return res.status(400).send("Your account has not been accepted yet.");

  const validPassword = await bcrypt.compare(Password, user.Password);
  if (!validPassword)
    return res.status(400).send("Invalid username or password.");

  const token = jwt.sign(
    { _id: user._id, UserType: user.UserType },
    "jwtPrivateKey"
  );
  res.send({ token, _id: user._id, UserType: user.UserType });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
