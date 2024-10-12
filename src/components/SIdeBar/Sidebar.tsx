import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import img1 from './../../assets/img/logo-dashborad.png';
import img2 from './../../assets/img/side-icon1.png';
import img3 from './../../assets/img/side-icon2.png';
import img4 from './../../assets/img/sign-out.png';

import './Sidebar.css';

function Sidebar() {
  const [activeTab, setActiveTab] = useState('tab1');
  const navigate = useNavigate();

  const username = localStorage.getItem('username') || 'User'; 
  const profileImage = localStorage.getItem('profileImage') || 'default-user-image-url'; 

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error("Token not found");

      await axios.post('https://test1.focal-x.com/api/logout', {}, {
        headers: {
          Authorization: token, 
        },
      });


      localStorage.removeItem('token');
      localStorage.removeItem('username');
      localStorage.removeItem('profileImage');

      navigate('/'); 
    } catch (error) {
      console.error('Logout failed:', error);
      alert('Logout failed. Please try again.');
    }
  };

  return (
    <aside className="sidebar">
      <img src={img1} alt="logo" className="logo" />
      <div className="user-profile">
        <img
          src={profileImage}
          alt="User"
          className="user-image"
        />
        <p className="user-name">{username}</p>
      </div>
      <nav className="tabs">
        <a
          href="#tab1"
          className={activeTab === 'tab1' ? 'active' : ''}
          onClick={() => setActiveTab('tab1')}
        >
          <img src={img2} alt="Products" /> Products
        </a>
        <a
          href="#tab2"
          className={activeTab === 'tab2' ? 'active' : ''}
          onClick={() => setActiveTab('tab2')}
        >
          <img src={img3} alt="Favorites" /> Favorites
        </a>
        <a
          href="#tab3"
          className={activeTab === 'tab3' ? 'active' : ''}
          onClick={() => setActiveTab('tab3')}
        >
          <img src={img3} alt="Order List" /> Order List
        </a>
      </nav>
      <button className="logout-button" onClick={handleLogout}>
        Logout <img src={img4} alt="sign-out" />
      </button>
    </aside>
  );
}

export default Sidebar;


