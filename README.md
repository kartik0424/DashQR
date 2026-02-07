# 🚀 DashQR — QR Code Generator & Analytics Platform

DashQR is a full-stack web application that allows users to generate customizable QR codes, manage their lifecycle, and track scan analytics through a centralized dashboard.

Unlike basic QR generators, DashQR routes every scan through its own backend gateway before redirecting to the destination URL, enabling real-time tracking, control, and analytics similar to production QR SaaS platforms.

---

## ✨ Features

### 🔐 Authentication
- User registration and login  
- JWT-based authentication  
- Protected backend and frontend routes  
- Secure logout functionality  

### 🎨 QR Code Generator
- Generate QR codes for any URL  
- Advanced customization options:
  - Dot styles  
  - Corner square and corner dot styles  
  - Custom foreground and background colors  
  - Gradient support  
- Live QR preview  
- Download QR codes in PNG and JPG formats  

### 🔁 QR Gateway & Scan Tracking
- QR codes redirect through DashQR backend  
- Scan events tracked on every access  
- Automatic redirection to original destination URL  
- Scan counts stored per QR code  

### 📊 Dashboard
- Total QR codes created  
- Active and paused QR counts  
- Total scans across all QR codes  
- List of user-generated QR codes  
- In-dashboard QR preview  
- Pause, resume, and delete QR codes  

### 🧭 Navigation & UX
- Navigation between QR generator and dashboard  
- Secure logout button  
- Route protection for authenticated users  

---

## 🛠️ Technology Stack

### 🌐 Frontend
- HTML5  
- CSS3  
- Bootstrap 5  
- Vanilla JavaScript  
- `qr-code-styling` (QR rendering and customization)  

### ⚙️ Backend
- Node.js  
- Express.js  
- MongoDB  
- Mongoose  
- JSON Web Tokens (JWT)  
- bcrypt for password hashing  

### 🧰 Tools
- MongoDB Compass  
- Postman / Browser Fetch API  
- ngrok (for testing QR scans on mobile devices)  

---

## 📁 Project Structure

```text
DashQR/
│
├── 📦 Backend/
│   ├── 📂 controllers/     # Auth, QR, dashboard logic
│   ├── 📂 models/          # Mongoose schemas
│   ├── 📂 routes/          # API routes
│   ├── 📂 middlewares/     # Authentication middleware
│   ├── 📄 app.js           # Express app setup
│   └── 🚀 server.js        # Server entry point
│
├── 🎨 client/
│   ├── 📄 generate.html    # QR generator page
│   ├── 📄 dashboard.html   # User dashboard
│   ├── 📄 login.html       # Login page
│   ├── 📄 register.html    # Registration page
│   ├── 📂 css/             # Stylesheets
│   └── 📂 js/              # Frontend JavaScript
│
├── 🔐 .env                 # Environment variables
├── 📦 package.json         # Dependencies and scripts
└── 📝 README.md            # Project documentation
```
## 🔧 Environment Variables

Create a `.env` file in the root directory:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/dashqr
JWT_SECRET=your_jwt_secret_key
```
## ▶️ Getting Started
1️⃣ Clone the Repository
```
git clone https://github.com/your-username/dashqr.git
cd dashqr
```
2️⃣ Install Dependencies
```
npm install
```
3️⃣ Start MongoDB
-Ensure MongoDB is running locally or update the MONGO_URI for MongoDB Atlas.

4️⃣ Run the Backend Server
-npm run dev
-The server will start at:
```
http://localhost:5000
```
🌐 Running the Frontend
### Open the frontend pages using a local server or directly in the browser:

- register.html
- login.html
- generate.html
- dashboard.html

For best results, use a Live Server extension or a local HTTP server.

## 📱 Testing QR Scans on Mobile Devices
QR codes pointing to localhost will not work on mobile devices.

### Option 1: Local Network IP
```Replace:
http://localhost:5000
```
```with:
http://<your-local-ip>:5000
```
Ensure both devices are on the same network.

### Option 2: ngrok (Recommended)
- ngrok http 5000
Use the generated public URL when creating QR codes.

## 🧠 Key Learnings
- JWT-based authentication and route protection
- Secure API design with user ownership validation
- QR gateway architecture and scan tracking
- Frontend–backend data consistency
- Full-stack debugging across multiple layers
- DOM lifecycle and script loading order
- Cross-device networking limitations

## 🔮 Future Enhancements
- Edit QR design from dashboard
- Per-QR scan history and analytics
- Logo upload inside QR codes
- SVG download support
- Role-based access control
- Production deployment (Render / Railway + MongoDB Atlas)

# 👨‍💻 Author
### Kartik Kathalkar
### Full-Stack Developer

Project built for learning, practice, and resume demonstration.

## 📌 Final Notes
DashQR is designed as a production-style learning project, focusing on clean architecture, scalability, and real-world behavior.
The goal is not just to generate QR codes, but to manage them as a complete product with analytics and control.

