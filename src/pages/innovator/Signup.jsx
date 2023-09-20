import React, { useState } from 'react';
import "./signup.css"
import { Container, Form, Button } from 'react-bootstrap';
import { BASE_URL, INNOVATOR_SIGNUP } from '../../utils/constants';
import axios from 'axios';
import { useDispatch } from "react-redux"
import { authActions } from "../../store/authSlice"
import { useHistory } from "react-router-dom";

const Signup = () => {
  const dispatch = useDispatch()
  const history = useHistory();
  const [formData, setFormData] = useState({
    innovatorName: '',
    innovatorEmail: '',
    innovatorPhoneNumber: '',
    intro: '',
    dob: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post(`${BASE_URL}${INNOVATOR_SIGNUP}`, formData);
      dispatch(authActions.login())
      history.push(`/innovator/dashboard/${response.data.id}`)
    } catch (error) {
      console.log("Error", error)
    }
  
    console.log(formData);
  };

  return (
    <Container>
      <h2 className='header'>Signup Form</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="innovatorName">
          <Form.Label>Innovator Name</Form.Label>
          <Form.Control
            type="text"
            name="innovatorName"
            value={formData.innovatorName}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="innovatorEmail">
          <Form.Label>Innovator Email</Form.Label>
          <Form.Control
            type="email"
            name="innovatorEmail"
            value={formData.innovatorEmail}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="innovatorPhoneNumber">
          <Form.Label>Innovator Phone No.</Form.Label>
          <Form.Control
            type="text"
            name="innovatorPhoneNumber"
            value={formData.innovatorPhoneNumber}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="intro">
          <Form.Label>Introduction</Form.Label>
          <Form.Control
            as="textarea"
            name="intro"
            value={formData.intro}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="dob">
          <Form.Label>Date of Birth</Form.Label>
          <Form.Control
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Sign Up
        </Button>
      </Form>
    </Container>
  );
}

export default Signup;
