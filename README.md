# ENVibe 🎧✨

ENVibe is a mood-based music experience web application that generates personalized “vibes” by combining a user’s emotional state, activity, and Spotify playlists into an immersive digital environment.

Users can create, save, and revisit custom environments that blend visual mood styling with music recommendations.

---

## 🌐 Live Features

- 🔐 User authentication (Firebase Auth)
- 🎭 Mood-based environment generation
- 🏃 Activity-based personalization
- 🎵 Spotify playlist integration (RapidAPI)
- 💾 Save and retrieve custom vibes (Firestore)
- 📅 Timestamped saved environments
- 🧭 Protected routes for authenticated users
- 🌈 Dynamic gradient + particle-based UI environment

---

## 🚀 How It Works

1. **Create a Vibe**
   - Choose a mood (e.g. Cozy, Energetic, Focused)
   - Select an activity (e.g. Reading, Studying, Working out)
   - Generate a matching Spotify playlist

2. **Experience the Environment**
   - View a dynamic animated background based on mood
   - Listen to embedded Spotify playlist
   - Save the generated vibe

3. **Saved Vibes**
   - View all previously saved environments
   - Re-open any vibe instantly
   - See when each vibe was created

---

## 🧠 Tech Stack

### Frontend
- React (Vite)
- React Router
- CSS (custom styling + animations)

### Backend / Services
- Firebase Authentication
- Firestore Database

### External APIs
- Spotify API (via RapidAPI)

### Utilities
- Axios (API requests)

---

## 🏗️ Architecture Overview

The project follows a modular architecture:

- **Pages** → UI screens (Home, CreateVibe, Environment, SavedVibes)
- **Components** → Reusable UI elements (Navbar, ProtectedRoute)
- **Services** → Business logic (auth, Firestore, API calls)
- **Firebase** → Authentication + database layer

---

## 🔐 Authentication Flow

- Users register or log in using Firebase Auth
- Protected routes prevent unauthorized access
- Auth state is monitored globally using Firebase listeners
- Logged-in users can save and retrieve personalized data

---

## 💾 Data Structure (Firestore)

Each user has their own collection:

- users/{userId}/vibes/{vibeId}

Each vibe contains:

- mood
- moodIcon
- colors
- activity
- playlistId
- playlistName
- createdAt (timestamp)

---

## 🎨 UI/UX Features

- Dynamic gradient backgrounds based on mood
- Animated particle environment (CSS-based)
- Hover-based control panel in environment view
- Responsive card-based layout for saved vibes
- Active navigation highlighting

---

## 🔑 Environment Variables

This project requires a RapidAPI key for Spotify.
Create a `.env` file in the project root and add:

VITE_RAPID_API_KEY=your_api_key_here


---

## ⚙️ Installation & Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

---

## 📌 Future Improvements

- Add more customization to Create a vibe
- Enhanced custom animation system for environment page
- Social sharing of vibes
- Sync animation to music playing
- Mobile interface and responsiveness

---

## 👨‍💻 Authors

CSE 499 Project – ENVibe
- Camila Moya Casanova
- Kinyera Alvine
- Cody Smith
