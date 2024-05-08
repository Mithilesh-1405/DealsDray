import React from 'react'
import styles from './modules/Register.module.css';

import { useState } from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signin = ({ setUsername, setPassword, username, password, existingUsers }) => {
  const navigate = useNavigate()
  const [errors, setErrors] = useState({});
  const [usernameTaken, setUsernameTaken] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault()
    const validationErrors = validateFields();
    if (Object.keys(validationErrors).length === 0) {
      if (existingUsers.includes(username)) {
        setUsernameTaken("Username Already Taken, Choose another one")
      }
      else {
        Axios.post("http://localhost:5000/createUsers", { username, password })
          .then((response) => {
            // alert("User Created");
            console.log('Username:', username);
            console.log('Password:', password);
            setUsernameTaken('');
            setUsername('')
            setPassword('')
            navigate("/Login")
          })
          .catch((error) => {
            console.error("Error creating user:", error);
          });
      }
    } else {
      setErrors(validationErrors);
    }
  };

  const validateFields = () => {
    const errors = {};

    // Username validation
    if (!username.trim()) {
      errors.username = 'Username is required';
    }

    // Password validation
    if (!password.trim()) {
      errors.password = 'Password is required';
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters long';
    }

    return errors;
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginBox}>
        <h2>Register</h2>
        <h4>Please enter your Username and password!</h4>
        <form onSubmit={handleSubmit}>
          <div className={styles.inputContainer}>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={styles.input}
              placeholder='Enter your username'
            />
            {errors.username && <p className={styles.error}>{errors.username}</p>}
          </div>
          <div className={styles.inputContainer}>
            <input
              type="password"
              id="password"
              value={password}
              placeholder='Enter your password'
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
            />
            {errors.password && <p className={styles.error}>{errors.password}</p>}
          </div>
          {usernameTaken && <p className={styles.error}>{usernameTaken}</p>}
          <button type="submit" className={styles.button}>
            Signin
          </button>
        </form>

      </div>
    </div>
  );
};
export default Signin

