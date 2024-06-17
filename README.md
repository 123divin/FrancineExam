# What Do You Meme? Web Application

## Server-side

### API Endpoints
- `POST /api/users/register`: Register a new user
- `POST /api/users/login`: Login a user
- `POST /api/users/logout`: Logout a user
- `GET /api/game/start`: Start a new game round
- `POST /api/game/submit`: Submit a caption choice
- `GET /api/game/profile`: Get user profile and game history

### Database Tables
- `users`: Stores user information
- `memes`: Stores meme images
- `captions`: Stores captions
- `meme_captions`: Associates memes with captions
- `rounds`: Stores game rounds

## Client-side

### Routes
- `/`: Home page
- `/login`: Login page
- `/game`: Game page
- `/profile`: Profile page

### Main Components
- `HomePage`: Welcome screen
- `LoginPage`: User login form
- `GamePage`: Game interface
- `ProfilePage`: User profile and game history

## Registered Users
- Username: `user1`, Password: `password1`
- Username: `user2`, Password: `password2`

## How to Run the Project

### Server
```sh
cd server
npm install
npm start
