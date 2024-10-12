import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./SignIn.css";

interface SignInProps {
  imgSrc: string;
  imgIcon: string;
  title: string;
  info: string;
  emailPlaceholder: string;
  passwordPlaceholder: string;
  submitValue: string;
  info2: string;
  createAccountText: string;
  createAccountLink: string;
  isSignUp?: boolean;
}

function SignIn({
  imgSrc,
  imgIcon,
  title,
  info,
  emailPlaceholder,
  passwordPlaceholder,
  submitValue,
  info2,
  createAccountText,
  createAccountLink,
  isSignUp = false,
}: SignInProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [profileImage, setProfileImageState] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const navigate = useNavigate();

  const send = (e: any) => {
    e.preventDefault();

    if (isSignUp) {
      if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
      }

      const userName = `${firstName}_${lastName}`.toLowerCase();
      const formData = new FormData();
      formData.append('first_name', firstName);
      formData.append('last_name', lastName);
      formData.append('user_name', userName);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('password_confirmation', confirmPassword);

      if (profileImage) {
        formData.append('profile_image', profileImage);
      }

      axios.post('https://test1.focal-x.com/api/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
        .then(res => {

          localStorage.setItem('username', `${firstName} ${lastName}`);
          if (imagePreview) {
            localStorage.setItem('profileImage', imagePreview);
          }
          localStorage.setItem('token', `Bearer ${res.data.token}`);
          navigate('/');
        })
        .catch(error => {
          console.log('Error during registration:', error);
          alert('Registration failed');
        });
    } else {
      axios.post('https://test1.focal-x.com/api/login', {
        email: email,
        password: password,
      })
        .then(res => {
          localStorage.setItem('token', `Bearer ${res.data.token}`);
          navigate('/dashboard');
        })
        .catch(error => {
          console.log('Error during login:', error);
          alert('Login failed');
        });
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setProfileImageState(file);

    if (file) {
      const previewURL = URL.createObjectURL(file);
      setImagePreview(previewURL);
    }
  };

  return (
    <div className={`SignIn ${isSignUp ? "sign-up" : ""}`}>
      <div className="signin-box">
        <img src={imgSrc} alt="Logo" />
        <h2>{title}</h2>
        <p className="info">{info}</p>
        <form onSubmit={send}>
          {isSignUp && (
            <div className="name-fields">
              <div>
                <label>First Name</label>
                <input
                  type="text"
                  placeholder="Enter your first name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label>Last Name</label>
                <input
                  type="text"
                  placeholder="Enter your last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
            </div>
          )}
          <div className="email">
            <label>Email</label>
            <input
              type="email"
              placeholder={emailPlaceholder}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="password-fields">
            <div>
              <label>Password</label>
              <input
                type="password"
                placeholder={passwordPlaceholder}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {isSignUp && (
              <div>
                <input
                  type="password"
                  placeholder="Re-enter your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            )}
          </div>
          {isSignUp && (
            <div className="upload-photo">
              <label>Profile Image</label>
              <div className="image-upload-wrapper">
                <input
                  type="file"
                  onChange={handleImageChange}
                  accept="image/*"
                />
                {imagePreview ? (
                  <img src={imagePreview} alt="Profile Preview" className="preview" />
                ) : (
                  <img src={imgIcon} alt="Upload Icon" className="icon" />
                )}
              </div>
            </div>
          )}
          <input type="submit" value={submitValue} />
        </form>
        <p className="info2">
          {info2} <a href={createAccountLink}>{createAccountText}</a>
        </p>
      </div>
    </div>
  );
}

export default SignIn;
