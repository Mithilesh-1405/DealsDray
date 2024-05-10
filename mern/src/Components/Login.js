import React, { useState } from "react";
import styles from "./modules/Login.module.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = ({
  setUsername,
  setPassword,
  username,
  password,
  setIsLoggedIn,
}) => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState("");
  const handleLogin = (e, username, password) => {
    setIsLoggedIn(true);
    setUsername(username);
    localStorage.setItem("username", username);
    navigate("/");
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateFields();
    if (Object.keys(validationErrors).length === 0) {
      // handleLogin(e, username, password);
      axios
        .post("http://localhost:5000/verifyLogin", {
          username,
          password,
        })
        .then((response) => {
          if (response.status === 200) {
            // console.log("OKAy");
            handleLogin(e, username, password);
            setUsername('')
            setPassword('')
          }
        })
        .catch((error) => {
          console.error("Error fetching users:", error);
          setErrors(error)
        });
    } else {
      setErrors(validationErrors);
    }
  };

  const validateFields = () => {
    const errors = {};

    // Username validation
    if (!username.trim()) {
      errors.username = "Username is required";
    }

    // Password validation
    if (!password.trim()) {
      errors.password = "Password is required";
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters long";
    }

    return errors;
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginBox}>
        <h2>Login</h2>
        <h4>Please enter your login and password!</h4>
        <form onSubmit={handleSubmit}>
          <div className={styles.inputContainer}>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={styles.input}
              placeholder="Enter your username"
            />
            {errors.username && (
              <p className={styles.error}>{errors.username}</p>
            )}
          </div>
          <div className={styles.inputContainer}>
            <input
              type="password"
              id="password"
              value={password}
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
            />
            {errors.password && (
              <p className={styles.error}>{errors.password}</p>
            )}
          </div>
          <button type="submit" className={styles.button}>
            Login
          </button>
        </form>
        <div>
          <h3>Don't Have an account? </h3>
          <Link className="links" to="/signin">
            Signin
          </Link>
        </div>
        
      </div>
    </div>
  );
};

export default Login;
