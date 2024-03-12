import { Link, useNavigate } from "react-router-dom";
import "./register.scss";
import { useState } from "react";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    name: "",
  });
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    name: "",
  });

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      username: "",
      email: "",
      password: "",
      name: "",
    };

    // Validation for username
    if (!inputs.username.trim()) {
      newErrors.username = "Username is required";
      isValid = false;
    }

    // Validation for email
    if (!inputs.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(inputs.email)) {
      newErrors.email = "Invalid email address";
      isValid = false;
    }

    // Validation for password
    if (!inputs.password.trim()) {
      newErrors.password = "Password is required";
      isValid = false;
    }

    // Validation for name
    if (!inputs.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleClick = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        await axios.post("http://localhost:8800/api/auth/register", inputs);
        navigate("/login");
      } catch (err) {
        console.error("Registration failed:", err);
      }
    }
  };

  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>React Social.</h1>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Deleniti
            praesentium necessitatibus ducimus nisi ea? Natus perspiciatis
            dolorum rem sequi ipsam!
          </p>
          <span>Do you have an account?</span>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
        <div className="right">
          <h1>Register</h1>
          <form>
            <input
              type="text"
              placeholder="Username"
              name="username"
              onChange={handleChange}
            />
            {errors.username && (
              <span className="error">{errors.username}</span>
            )}
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
            />
            {errors.email && <span className="error">{errors.email}</span>}
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
            />
            {errors.password && (
              <span className="error">{errors.password}</span>
            )}
            <input
              type="text"
              placeholder="Name"
              name="name"
              onChange={handleChange}
            />
            {errors.name && <span className="error">{errors.name}</span>}
            <button onClick={handleClick}>Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
