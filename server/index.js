const express = require('express');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const cors = require('cors');
const { initDB } = require('./models/database');
const userRoutes = require('./routes/user');
const gameRoutes = require('./routes/game');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

// Passport configuration
passport.use(new LocalStrategy(async (username, password, done) => {
  const db = await initDB();
  const user = await db.get('SELECT * FROM users WHERE username = ?', username);
  if (!user) {
    return done(null, false, { message: 'Incorrect username.' });
  }
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    return done(null, false, { message: 'Incorrect password.' });
  }
  return done(null, user);
}));

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  const db = await initDB();
  const user = await db.get('SELECT * FROM users WHERE id = ?', id);
  done(null, user);
});

// Routes
app.use('/api/users', userRoutes);
app.use('/api/game', gameRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
