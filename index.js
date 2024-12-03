const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

const users = {}; // In-memory data store

// Register a new user
app.post("/register", (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required." });
    }
    if (users[username]) {
        return res.status(400).json({ message: "User already exists." });
    }
    users[username] = { password };
    res.status(201).json({ message: "User registered successfully." });
});

// Retrieve password
app.get("/password/:username", (req, res) => {
    const { username } = req.params;
    const user = users[username];
    if (!user) {
        return res.status(404).json({ message: "User not found." });
    }
    res.json({ password: user.password });
});

// Login
app.post("/login", (req, res) => {
    const { username, password } = req.body;
    const user = users[username];
    if (!user || user.password !== password) {
        return res.status(401).json({ message: "Invalid username or password." });
    }
    res.json({ message: "Login successful!" });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
