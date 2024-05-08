import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import delimg from '../dealsdraynew.png'
import axios from 'axios';
import Login from './Login';
import Signin from './Signin';
import styles from './modules/App.module.css';
import Employee from './Employee';
import HomeDisplay from './HomeDisplay'
import AddEmployee from './AddEmployee';
import EditEmployee from './EditEmployee';

// import Admin from './Admin';
// import HomeDisplay from './HomeDisplay';


function App() {
  const [existingUsers, setExistingUsers] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobileNumber: '',
    designation: '',
    gender: '',
    course: [],
  });
  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setIsLoggedIn(true);
      setUsername(storedUsername);
    }
    axios.get("http://localhost:5000/getUsers")
      .then((response) => {
        const usernames = response.data.map((user) => user.username);
        setExistingUsers(usernames);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });

  }, []);


  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    localStorage.removeItem('username');
  };

  return (
    <div>
      <Router>
        <div>
          <nav className={styles.navbar}>

            {isLoggedIn ? (
              <ul >
                <div>
                  <img src={delimg} alt='new' />
                  <p className={styles.logo}>DealsDray</p>
                </div>

                <li>
                  <button className={styles.butn} onClick={handleLogout}>Logout</button>
                </li>
                <li>
                  <p className={styles.usr}>{username}</p>
                </li>
                <li>
                  <Link to="/Employee" className={`${styles.navlink} ${styles.emp}`}>
                    Employee List
                  </Link>
                </li>
              </ul>
            ) : (
              <ul>
                <div>
                  <img src={delimg} alt='new' />
                  <p className={styles.logo}>DealsDray</p>
                </div>
                <li>
                  <Link to="/login" className={styles.navlink}>
                    Login
                  </Link>
                </li>
                <li>
                  <Link to="/signin" className={styles.navlink}>
                    Signin
                  </Link>
                </li>

              </ul>
            )}
            <ul>
              <li>
                <Link to="/" className={`${styles.navlink}`}>
                  Home
                </Link>
              </li>
            </ul>
          </nav>

          <Routes>
            <Route
              path="/login"
              element={
                <Login
                  setUsername={setUsername}
                  setPassword={setPassword}
                  username={username}
                  password={password}
                  setIsLoggedIn={setIsLoggedIn}
                />
              }
            />
            <Route path="/signin" element={<Signin
              setUsername={setUsername}
              setPassword={setPassword}
              username={username}
              password={password}
              existingUsers={existingUsers}
            />} />
            <Route path='/Employee' element={<Employee

            />} />
            <Route path='/' element={<HomeDisplay />} />
            <Route path="/AddEmployee" element={<AddEmployee
              formData={formData}
              setFormData={setFormData} />} />
            <Route path='/EditEmployee' element={<EditEmployee
              formData={formData}
              setFormData={setFormData} />} />
          </Routes>
        </div>
      </Router>

    </div>
  );
}

export default App;
