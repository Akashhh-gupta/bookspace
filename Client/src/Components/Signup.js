import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import AlertShow from './AlertShow';

function Signup() {

  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" })
  const [alert, setAlert] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, cpassword } = credentials;
    if (password !== cpassword) {
      setAlert(true);
      setTimeout(() => {
        setAlert(false);
      }, 1000);
    } else {
      try {
        const response = await fetch(`http://localhost:5000/auth/createUser`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username: name, emailID: email, password: password }),
        });
        const json = await response.json();
        console.log(json);
        if (json.success) {
          localStorage.setItem('token', json.authToken);
          navigate("/");
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  const onchange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }


  return (
    <div className='container my-4'>
      <h3>Create Account to use BookSpace</h3>
      {alert && <AlertShow />}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Name" name='name' value={credentials.name} onChange={onchange} minLength={3} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" name='email' value={credentials.email} onChange={onchange} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" name='password' value={credentials.password} onChange={onchange} minLength={5} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="cpassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control type="password" placeholder="Confirm Password" name='cpassword' value={credentials.cpassword} onChange={onchange} minLength={5} />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  )
}

export default Signup
