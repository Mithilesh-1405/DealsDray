import React, { useEffect } from 'react';
import styles from './modules/Employee.module.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
function Employee() {
  const navigate = useNavigate();
  const [EmployeeData, setData] = useState([]);
  const [employeeDataToEdit, setDataToEdit] = useState('');
  useEffect(() => {
    axios.get("http://localhost:5000/getEmployees").then((response) => {
      setData(response.data)
      console.log(response.data);
    }).catch((err) => {
      console.log("Error");
    })
  }, [])

  const editData = (id) => {
    axios.get(`http://localhost:5000/getEmployeeById/${id}`).then((response) => {
      setDataToEdit(response.data)
      console.log(response.data);
      navigate('/EditEmployee', { state: { employeeDataToEdit } });
    }).catch((err) => {
      console.log(err);
    })
  }
  const deleteData = (id) => {
    axios.delete(`http://localhost:5000/deleteEmployee/${id}`)
      .then(response => {
        console.log(response.data);
        setData(prevData => prevData.filter(employee => employee._id !== id));
      })
      .catch(error => console.error("Error deleting employee:", error));
  };
  return (
    <div>
      <h1>Employee List</h1>
      <div className={styles.buttonContainer}>
        <Link to="/AddEmployee" className={styles.button}>
          Add Employee
        </Link>
      </div>
      <table className={styles.employeeTable}>
        <thead>
          <tr>
            <th className={styles.tableHeader}>Unique ID</th>
            <th className={styles.tableHeader}>Name</th>
            <th className={styles.tableHeader}>Email</th>
            <th className={styles.tableHeader}>Mobile Number</th>
            <th className={styles.tableHeader}>Designation</th>
            <th className={styles.tableHeader}>Gender</th>
            <th className={styles.tableHeader}>Course</th>
            <th className={styles.tableHeader}>Created Date</th>
            <th className={styles.tableHeader}>Action</th>
          </tr>
        </thead>
        <tbody>
          {EmployeeData.map((employee, i) => (
            <tr key={crypto.randomUUID()}>
              <td>{i + 1}</td>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.mobileNumber}</td>
              <td>{employee.designation}</td>
              <td>{employee.gender}</td>
              <td>{employee.course.join(',')}</td>
              <td>{employee.createDate}</td>
              <td>
                <div>
                  <button onClick={() => editData(employee._id)}>Edit</button>
                  <button onClick={() => deleteData(employee._id)}>Delete</button>
                </div>
              </td>
              <td></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

  );
}

export default Employee;
