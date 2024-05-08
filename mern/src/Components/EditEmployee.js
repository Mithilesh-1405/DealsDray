import React from 'react'
import styles from './modules/AddEmployee.module.css';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function EditEmployee({ formData, setFormData }) {
    // navigate = useNavigate();
    const location = useLocation();
    const { employeeDataToEdit } = location.state;

    console.log(employeeDataToEdit);
    const [errors, setErrors] = useState({});
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox') {
            if (checked) {
                setFormData({ ...formData, [name]: [...formData[name], value] });
            } else {
                setFormData({ ...formData, [name]: formData[name].filter(item => item !== value) });
            }
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const currentDate = new Date();
        const De = currentDate.getDate();
        const month = currentDate.getMonth() + 1; // Add 1 for actual month
        const year = currentDate.getFullYear();

        const fullDate = De + "/" + month + "/" + year;

        // console.log(("inside submit function"));
        const validationErrors = validateForm();
        // console.log((validationErrors));
        if (Object.keys(validationErrors).length === 0) {
            setErrors({})
            axios.put(`http://localhost:5000/editEmployee/${formData._id}`, {
                name: formData.name,
                email: formData.email,
                mobileNumber: formData.mobileNumber,
                designation: formData.designation,
                gender: formData.gender,
                course: formData.course,
                createDate: fullDate,
            })
                .then((response) => {
                    console.log(response.data);
                    // navigate('/Employee', { state: { formData } });
                })
                .catch((error) => {
                    console.error("Error sending form data:", error);
                });
            console.log('Form submitted:', formData);
            // setFormData({})
        } else {
            setErrors(validationErrors);
        }

    };

    const validateForm = () => {
        const errors = {};

        if (!formData.name || (formData.name && !formData.name.trim())) {
            errors.name = 'Name is required';
        }

        if (!formData.email || (formData.email && !formData.email.trim())) {
            errors.email = 'Email is required';
        } else if (formData.email && !isValidEmail(formData.email)) {
            errors.email = 'Invalid email format';
        }

        if (!formData.mobileNumber || (formData.mobileNumber && !formData.mobileNumber.trim())) {
            errors.mobile = 'Mobile number is required';
        } else if (formData.mobileNumber && !isValidMobile(formData.mobileNumber)) {
            errors.mobile = 'Invalid mobile number format';
        }

        if (!formData.designation || (formData.designation && !formData.designation.trim())) {
            errors.designation = 'Designation is required';
        }

        if (!formData.gender) {
            errors.gender = 'Gender is required';
        }

        if (formData.course.length === 0) {
            errors.course = 'At least one course must be selected';
        }

        return errors;
    };
    const isValidEmail = (email) => {
        // Regular expression for email validation
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailPattern.test(email);
    };

    const isValidMobile = (mobile) => {
        // Regular expression for mobile number validation
        const mobilePattern = /^[0-9]{10}$/;
        return mobilePattern.test(mobile);
    };
    return (
        <div className={styles.formContainer}>
            <form className={styles.employeeForm} onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        className={styles.formInput}
                        placeholder="Enter your Name"
                        value={employeeDataToEdit.name}
                        onChange={handleChange}
                        required
                    />
                    {errors.name && <p className={styles.error}>{errors.name}</p>}
                </div>
                <div className={styles.formGroup}>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className={styles.formInput}
                        placeholder="Enter your Email"
                        value={employeeDataToEdit.email}
                        onChange={handleChange}
                        required
                    />
                    {errors.email && <p className={styles.error}>{errors.email}</p>}
                </div>
                <div className={styles.formGroup}>
                    <input
                        type="tel"
                        id="mobileNumber"
                        name="mobileNumber"
                        className={styles.formInput}
                        placeholder="Enter your Mobile Number"
                        value={employeeDataToEdit.mobileNumber}
                        onChange={handleChange}
                        required
                    />
                    {errors.mobile && <p className={styles.error}>{errors.mobile}</p>}
                </div>
                <div className={styles.formGroup}>
                    <select
                        id="designation"
                        name="designation"
                        className={styles.formSelect}
                        value={employeeDataToEdit.designation}
                        onChange={handleChange}
                        required
                    >
                        <option value="Choose your designation" hidden>
                            Choose your designation
                        </option>
                        <option value="HR">HR</option>
                        <option value="MANAGER">Manager</option>
                        <option value="SALES">Sales</option>
                    </select>
                    {errors.designation && (
                        <p className={styles.error}>{errors.designation}</p>
                    )}
                </div>
                <div className={`${styles.formGroup} ${styles.flexGroup}`}>
                    <label className={styles.formLabel}>Gender:</label>
                    <div className={`${styles.radioGroup} ${styles.flexGroup}`}>
                        <label>
                            <input
                                type="radio"
                                name="gender"
                                value="male"
                                checked={employeeDataToEdit.gender === 'male'}
                                onChange={handleChange}
                                required
                            />
                            Male
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="gender"
                                value="female"
                                checked={employeeDataToEdit.gender === 'female'}
                                onChange={handleChange}
                                required
                            />
                            Female
                        </label>
                    </div>
                    {errors.gender && <p className={styles.error}>{errors.gender}</p>}
                </div>
                <div className={`${styles.formGroup} ${styles.flexGroup}`}>
                    <label className={styles.formLabel}>Course:</label>
                    <div className={styles.checkboxGroup}>
                        <label>
                            <input
                                type="checkbox"
                                name="course"
                                value="MCA"
                                checked={employeeDataToEdit.course}
                                onChange={handleChange}
                            />
                            MCA
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                name="course"
                                value="BCA"
                                checked={employeeDataToEdit.course}
                                onChange={handleChange}
                            />
                            BCA
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                name="course"
                                value="BSC"
                                checked={employeeDataToEdit.course}
                                onChange={handleChange}
                            />
                            BSC
                        </label>
                    </div>
                    {errors.course && <p className={styles.error}>{errors.course}</p>}
                </div>
                {/* <div className={styles.formGroup}>
                    <label htmlFor="image" className={styles.formLabel}>
                        Add your Image:
                    </label>
                    <input
                        type="file"
                        id="image"
                        name="image"
                        accept="image/*"
                        className={styles.formInput}
                        onChange={handleImageChange}
                    />
                </div> */}
                <button type="submit" className={styles.button}>
                    Submit
                </button>
            </form>
        </div>
    );
}

export default EditEmployee
