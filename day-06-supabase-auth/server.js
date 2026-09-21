const express = require("express");
const { createClient } = require("@supabase/supabase-js");
require("dotenv").config();

const app = express();

app.use(express.json());

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

// Home route
app.get("/", (req, res) => {
  res.json({
    message: "Day 06 Supabase Auth API is running"
  });
});
app.get("/test", (req, res) => {
  res.send("SERVER.JS IS WORKING");
});

// Signup route
app.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      error: "Email and password are required"
    });
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password
  });

  if (error) {
    return res.status(400).json({
      error: error.message
    });
  }

  res.status(201).json({
    message: "User signed up successfully",
    user: data.user
  });
});
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return res.status(400).json({
      error: error.message,
    });
  }

  res.json({
    message: "Login successful",
    data,
  });
});
app.get("/supabase-test", async (req, res) => {
  const { data, error } = await supabase.auth.getSession();

  if (error) {
    return res.status(400).json({
      error: error.message
    });
  }
app.post("/signup", async (req, res) => {
    try {
        const { email, password } = req.body;

        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password
        });

        if (error) {
            return res.status(400).json({
                error: error.message
            });
        }

        res.status(201).json({
            message: "User signup successful",
            user: data.user,
            session: data.session
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});
  res.json({
    message: "Supabase connection is working",
    data
  });
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

