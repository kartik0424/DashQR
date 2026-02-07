# DashQR — QR Code Generator & Analytics Platform

DashQR is a full-stack web application that allows users to generate customizable QR codes, manage their lifecycle, and track scan analytics through a centralized dashboard.
The system is designed to mirror real-world QR SaaS platforms by routing all scans through a backend gateway before redirecting to the destination URL.

# Features
Authentication

User registration and login

JWT-based authentication

Protected backend and frontend routes

Logout functionality

QR Code Generation

Generate QR codes for any URL

Advanced customization options:

Dot styles

Corner square and corner dot styles

Custom foreground and background colors

Gradient support

Live QR preview

Download QR codes in PNG and JPG formats

QR Gateway & Scan Tracking

QR codes redirect through DashQR backend

Scan events logged on each access

Automatic redirection to destination URL

Scan count stored and aggregated per QR

Dashboard

Total QR codes created

Active and paused QR counts

Total scans across all QR codes

List of user-generated QR codes

In-dashboard QR preview

Pause, resume, and delete QR codes

Navigation & UX

Navigation between QR generator and dashboard

Secure logout

Route protection on frontend pages

# Technology Stack
# Frontend

HTML5

CSS3

Bootstrap 5

Vanilla JavaScript

qr-code-styling (QR rendering and customization)

# Backend

Node.js

Express.js

MongoDB

Mongoose

JSON Web Tokens (JWT)

bcrypt for password hashing

Tools

MongoDB Compass

Postman / Browser Fetch API


## Project Structure
DashQR/
│
├── Backend/
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── middlewares/
│ ├── app.js
│ └── server.js
│
├── client/
│ ├── generate.html
│ ├── dashboard.html
│ ├── login.html
│ ├── register.html
│ ├── css/
│ └── js/
│
├── .env
├── package.json
└── README.md


# Environment Variables

## Create a .env file in the root directory:
PORT=5000

MONGO_URI=mongodb://127.0.0.1:27017/dashqr

JWT_SECRET=your_jwt_secret_key

# Getting Started
Clone the Repository
git clone https://github.com/your-username/dashqr.git
cd dashqr

Install Dependencies
npm install

Start MongoDB

Ensure MongoDB is running locally or update MONGO_URI for MongoDB Atlas.

Run the Backend Server
npm run dev


The server will start at:

http://localhost:5000

Running the Frontend

Open frontend pages using a local server or browser:

register.html

login.html

generate.html

dashboard.html

For best results, use a Live Server extension or similar local HTTP server.

# Testing QR Scans on Mobile Devices

localhost URLs do not work when scanning QR codes from a mobile device.

Option 1: Local Network IP

Replace:

http://localhost:5000


with:

http://<your-local-ip>:5000


Ensure both devices are on the same network.

Option 2: ngrok
ngrok http 5000


Use the generated public URL when creating QR codes.

# Key Learnings

JWT-based authentication and authorization

Secure API design with user ownership checks

QR gateway architecture and scan tracking

Frontend-backend data contract consistency

Real-world debugging across full-stack layers

DOM lifecycle and script loading order

Cross-device networking considerations

# Future Enhancements

Edit QR design from the dashboard

Per-QR scan history and analytics

Logo upload within QR codes

SVG download support

Role-based access control

Production deployment (Render, Railway, MongoDB Atlas)

# Author

Kartik Kathalkar
Full-Stack Developer
Project built for learning and resume demonstration

# Final Note

DashQR is implemented as a production-style learning project with emphasis on clean architecture, scalability, and real-world behavior.
The focus extends beyond QR generation to include lifecycle management, analytics, and secure user flows.
