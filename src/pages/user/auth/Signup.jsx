import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../App.css';

const Signup = () => {
  const navigate = useNavigate();

  const initialState = {
    name: '',
    email: '',
    password: '',
  };

  const [user, setUser] = useState(initialState);
  const [response, setResponse] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
  });

  const onChangeValue = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // Form validation function
  const validate = () => {
    let valid = true;
    let errors = { name: '', email: '', password: '' };

    if (!user.name) {
      errors.name = 'Name is required';
      valid = false;
    } else if (!/^[a-zA-Z ]{2,30}$/.test(user.name)) {
      errors.name = 'Name is invalid';
      valid = false;
    }

    if (!user.email) {
      errors.email = 'Email is required';
      valid = false;
    } else if (!/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]{2,}$/.test(user.email)) {
      errors.email = 'Email is invalid';
      valid = false;
    }

    if (!user.password) {
      errors.password = 'Password is required';
      valid = false;
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=]).{8,}$/.test(user.password)
    ) {
      errors.password = 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character';
      valid = false;
    }

    setErrors(errors);
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validData = validate();

    if (!validData) {
      console.log('Form validation failed');
    } else {
      console.log('Form submitted:', user);
      setSubmitted(true);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (submitted) {
        try {
          const result = await fetch('http://localhost:4000/auth/signup', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
          });

          const data = await result.json();
          setResponse(data);
          console.log('Server Response:', data);

          if (data.success) {
            setTimeout(() => {
              navigate('/login'); // Redirect to login page
            }, 2000);
          }
        } catch (error) {
          console.error('Error:', error);
        } finally {
          setSubmitted(false);
        }
      }
    };

    fetchData();
  }, [submitted, user, navigate]);

  return (
    <div className="form-container">
      <form className="form" onSubmit={handleSubmit}>
        <h2>Sign Up</h2>

        <input
          className="form-input"
          type="text"
          placeholder="Enter name"
          onChange={onChangeValue}
          name="name"
          value={user.name}
          
        />
        {errors.name && <p className="error">{errors.name}</p>}

        <input
          className="form-input"
          type="email"
          placeholder="Enter email"
          onChange={onChangeValue}
          name="email"
          value={user.email}
          
        />
        {errors.email && <p className="error">{errors.email}</p>}

        <input
          className="form-input"
          type="password"
          placeholder="Enter password"
          onChange={onChangeValue}
          name="password"
          value={user.password}
        />
        {errors.password && <p className="error">{errors.password}</p>}

        <button className="submit" type="submit">
          Submit
        </button>
      </form>

      {response && (
        <div className="response-container">
          <h3>Response from server:</h3>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default Signup;
