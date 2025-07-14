# 🌿 Eco Home Project

Eco Home is a MERN stack-based E-commerce Platform that helps users track their **carbon savings** and see how much **money they’ve saved** by reducing CO₂ emissions. It encourages users to take eco-friendly actions and rewards them with **Impact Points**.
###ECO HOME 
---

## 🚀 Key Features

### 🔐 Authentication
- User Signup & Login with secure password encryption (`bcryptjs`)
- JWT-based session management
- Success popup with animation on signup:  
  `"You're all set to go!"`  
  Followed by redirection to Login page.

### 📊 Dashboard
- Displays **"Total Impact Points Earned"**
- Shows **Money Saved** based on CO₂ saved
  > _Money saved is dynamically calculated from total CO₂ saved_  
  _e.g. ₹10 saved per 1 kg CO₂_
- Stylish **green container** at the top of the dashboard
  - Heading: "Total Impact Points Earned"
  - Money saved: shown **2x larger**

### 💡 CO₂ Savings Logic
```js
const moneySaved = totalCO2Saved * 10; // ₹10 per kg saved
```
https://github.com/user-attachments/assets/d782a37b-1083-4f29-b9ac-5d8c4c8367b1

## 🛠 Tech Stack

| Layer        | Tech Used                           |
| ------------ | ----------------------------------- |
| Frontend     | React, HTML, CSS, JavaScript        |
| Backend      | Node.js, Express.js                 |
| Database     | MongoDB (via Mongoose)              |
| Auth         | JWT, bcryptjs                       |
| Styling      | Custom CSS (Auth, Dashboard, Popup) |
| HTTP Client  | Axios                               |

---

## 🔧 Project Structure
eco-home-project/
├── backend/
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── middleware/
│ ├── server.js
│ └── .env
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── services/
│ │ ├── styles/
│ │ └── App.jsx
│ └── public/
└── README.md


---

## 🧪 Getting Started Locally

### 1. Clone the Repo

```bash
git clone https://github.com/your-username/eco-home-project.git
cd eco-home-project
```
### 2. Backend Setup
```bash
cd backend
npm install
npm run dev
```
### 3.Create .env file inside /backend
```bash
PORT=5000
MONGO_URI=mongodb://localhost:27017/eco-home
JWT_SECRET=yourSecretKey
RAZOR_PAY_KEY=******
```
### 4. Frontend Setup
```bash 
cd frontend
npm install
npm run dev
```

#### 📌 Future Enhancements

Admin dashboard to manage users and stats
Integration with Google OAuth
CO₂ calculation tools based on daily usage
Eco-tips & leaderboard

#### 🙌 Acknowledgements

Designed and built for environmental awareness
Inspired by India’s climate action goals


