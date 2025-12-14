# AssetVerse

**Corporate Asset Management System**  

[Live URL](YOUR_LIVE_URL_HERE)

---

## Key Features

- User authentication and role-based access (HR & Employee)
- Asset tracking and management
- Request and approval workflow for assets
- Employee and team management
- Dashboard with interactive charts (Pie & Bar charts for HR)
- Responsive design for desktop, tablet, and mobile
- Profile management and secure logout
- Notifications and toast messages for actions

---

## npm Packages Used

- `@tailwindcss/vite` - TailwindCSS plugin for Vite
- `axios` - HTTP client for API requests
- `firebase` - Authentication & database
- `framer-motion` - Animations for UI elements
- `react` - Core library
- `react-dom` - DOM rendering
- `react-hook-form` - Forms management
- `react-icons` - Icons library
- `react-router` & `react-router-dom` - Routing
- `react-spinners` - Loading spinners
- `react-toastify` - Toast notifications
- `recharts` - Charts library
- `tailwindcss` - Utility-first CSS framework

---

## Setup Instructions

1. **Clone the repository**  
   ```bash
   git clone YOUR_REPO_URL
   cd assetverse
Install dependencies

bash
Copy code
npm install
Run development server

bash
Copy code
npm run dev
Open http://localhost:5173 in your browser.

Environment Variables Configuration
Create a .env file in the root of the project and add the following variables:

env
Copy code
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_BACKEND_URL=http://localhost:5001
Replace each value with your actual Firebase and backend configuration.

Scripts

npm run dev - Start development server

npm run build - Build for production

npm run preview - Preview production buil