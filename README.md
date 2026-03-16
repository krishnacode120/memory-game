# 🧠 Memory Card Game

A responsive **Memory Matching Card Game** built using **React**. Players flip cards to find matching pairs while tracking their moves and time. The game includes selectable difficulty levels, a restart feature, and a clean, responsive UI styled with **styled-components**.

---

## 🎮 Features

* 🃏 Interactive card matching gameplay
* 🔢 Difficulty modes: **Easy (4×4)** and **Medium (6×6)**
* ⏱️ Real-time **game timer**
* 🔁 **Restart / reshuffle** functionality
* 📊 **Move counter** to track turns
* 🎉 **Win detection message** when all pairs are matched
* 🎨 Styled using **styled-components**
* ⚛️ Built using modern **React Hooks**

---

## 🛠️ Tech Stack

* **React**
* **JavaScript (ES6+)**
* **Styled Components**
* **React Hooks (useState, useEffect, useCallback)**
* **CSS Grid Layout**

---

## 📂 Project Structure

```
memory-game/
│
├── public/
│   └── img/              # Card images used in the game
│
├── src/
│   ├── components/
│   │   ├── Card.jsx      # Individual card component
│   │   └── GameBoard.jsx # Game logic and board layout
│   │
│   ├── App.js            # Main application component
│   └── index.js          # React entry point
│
├── package.json
└── README.md
```

---

## 🚀 Installation

### 1️⃣ Clone the repository

```bash
git clone https://github.com/krishnacode120/memory-game.git
```

### 2️⃣ Navigate to the project folder

```bash
cd memory-game
```

### 3️⃣ Install dependencies

```bash
npm install
```

### 4️⃣ Run the development server

```bash
npm start
```

The application will start at:

```
http://localhost:3000
```

---

## 🧩 How to Play

1. Select a **difficulty level** (4×4 or 6×6).
2. Click cards to **flip them over**.
3. Match two cards with the **same image**.
4. If they match, they stay revealed.
5. If they do not match, they flip back.
6. Match all pairs to **win the game**.

Try to finish with **minimum turns and shortest time**.

---

## 🌐 Live Demo

Play the deployed version here:

```
https://memory-game-brown-seven.vercel.app
```

---

## 📜 License

This project is open-source and available under the **MIT License**.

---

## 👨‍💻 Author

**Krishna Moorthy**

GitHub:
https://github.com/krishnacode120
