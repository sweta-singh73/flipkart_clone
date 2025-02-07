import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../../index.css"; // Import CSS

const Login = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({ email: "", password: "" });
  const [response, setResponse] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "" });

  const onChangeValue = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // Form validation function
  const validate = () => {
    let valid = true;
    let errors = { email: "", password: "" };

    if (!user.email) {
      errors.email = "Email is required";
      valid = false;
    } else if (!/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]{2,}$/.test(user.email)) {
      errors.email = "Invalid email format";
      valid = false;
    }

    if (!user.password) {
      errors.password = "Password is required";
      valid = false;
    }

    setErrors(errors);
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) {
      console.log("Form validation failed");
      return;
    }

    console.log("Form submitted:", user);
    setSubmitted(true);
    navigate("/");
  };

  useEffect(() => {
    const fetchData = async () => {
      if (submitted) {
        try {
          const result = await fetch("http://localhost:4000/auth/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
          });

          const data = await result.json();
          setResponse(data);
          console.log("Server Response:", data);
          
          if (data.data) {
            
            localStorage.setItem("user", JSON.stringify(data.data));
            sessionStorage.setItem('user', JSON.stringify(data.data));
            
          }
        } catch (error) {
          console.error("Error:", error);
        } finally {
          setSubmitted(false);
        }
      }
    };

    fetchData();
  }, [submitted, user, navigate]);

  return (
    <div className="admin-login-container">
      <div className="div-container">hello</div>
      <div className="admin-login-box">
        <h2> Login</h2>
        <form className="form-container" onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={onChangeValue}
              placeholder="Enter email"
            />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={onChangeValue}
              placeholder="Enter password"
            />
            {errors.password && <p className="error">{errors.password}</p>}
          </div>

          <button type="submit" className="login-button-form">
            Login
          </button>
        </form>

        {response && (
          <div className="response-container">
            <pre>{JSON.stringify(response, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
