import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import config from "../config/config";

export const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      // navigate("/");
    }
  }, []);

  // Strong Password Validation
  const validatePassword = (password) => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^()_\-+=])[A-Za-z\d@$!%*?&#^()_\-+=]{8,}$/;

    return regex.test(password);
  };

  const adduser = async () => {
    // Basic validation
    if (!name.trim()) {
      toast.error("Please enter your name.");
      return;
    }

    if (!email.trim()) {
      toast.error("Please enter your email.");
      return;
    }

    if (!password.trim()) {
      toast.error("Please enter your password.");
      return;
    }

    // Strong Password Validation
    if (!validatePassword(password)) {
      toast.error(
        "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character."
      );
      return;
    }

    try {
      const response = await fetch(`${config.BACKEND_URI}/api/user/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await response.json();

      console.log(data);

      if (!data.success) {
        toast.error(data.message || "Registration failed.");

        setName("");
        setEmail("");
        setPassword("");
        return;
      }

      toast.success("Registration successful! Please login.");

      setName("");
      setEmail("");
      setPassword("");

      navigate("/login");
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2 className="register-title">Create Account</h2>

        <form>
          <div className="input-group">
            <label htmlFor="name">Name</label>

            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="email">Email</label>

            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>

            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a strong password"
              required
            />

            <small
              style={{
                display: "block",
                marginTop: "8px",
                color: "#666",
                fontSize: "13px",
                lineHeight: "1.5",
              }}
            >
              Password must contain:
              <br />
              • Minimum 8 characters
              <br />
              • One uppercase letter (A-Z)
              <br />
              • One lowercase letter (a-z)
              <br />
              • One number (0-9)
              <br />
              • One special character (@, #, $, %, &, etc.)
            </small>
          </div>

          <button
            type="button"
            onClick={adduser}
            className="register-button"
          >
            Sign Up
          </button>
        </form>

        <div className="register-footer">
          <p>
            Already have an account?{" "}
            <a href="/login">Sign In</a>
          </p>
        </div>
      </div>
    </div>
  );
};