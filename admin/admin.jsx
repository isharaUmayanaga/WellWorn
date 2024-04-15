import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Dashboard from '../admin/Dashboard';
import Profile from '../admin/Profile';
import Categories from '../admin/Categories';
import Products from '../admin/Product';
import Users from '../admin/Users';
import Orders from '../admin/Orders';
import Ratings from '../admin/Ratings';
import Overview from '../admin/Overview';
import './admin.css'
import UserDetails from './UserDetails';

const Admin = () => {
  const [selectedSection, setSelectedSection] = useState('dashboard');

  const handleSectionChange = (section) => {
    setSelectedSection(section);
  };

  return (
    <Router>
      <div className="admin-container">
        <div className="nav-bar">
          {/* Your company logo and name */}
          <div className="company-logo">Logo</div>
          <div className="company-name">Well Worn</div>

          <div className="navlinks">
            <Link to="/dashboard" className={`nav-link ${selectedSection === 'dashboard' && 'active'}`} onClick={() => handleSectionChange('dashboard')}>
              <i className='fas fa-tachometer-alt'/> Dashboard
            </Link>
            <Link to="/profile" className={`nav-link ${selectedSection === 'profile' && 'active'}`} onClick={() => handleSectionChange('profile')}>
              <i className='fas fa-user'/>Profile  
            </Link>
            <Link to="/categories" className={`nav-link ${selectedSection === 'categories' && 'active'}`} onClick={() => handleSectionChange('categories')}>
              <i className='fas fa-list-alt'/>Categories
            </Link>
            <Link to="/products" className={`nav-link ${selectedSection === 'products' && 'active'}`} onClick={() => handleSectionChange('products')}>
              <i className='fas fa-shopping-bag' />Products
            </Link>
            <Link to="/users" className={`nav-link ${selectedSection === 'users' && 'active'}`} onClick={() => handleSectionChange('users')}>
              <i className='fas fa-users'/>Users
            </Link>
            <Link to="/orders" className={`nav-link ${selectedSection === 'orders' && 'active'}`} onClick={() => handleSectionChange('orders')}>
              <i className='fas fa-shopping-cart'/>Orders
            </Link>
            <Link to="/rating" className={`nav-link ${selectedSection === 'rating' && 'active'}`} onClick={() => handleSectionChange('rating')}>
              <i className='fas fa-star'/>Ratings
            </Link>
            <Link to="/overview" className={`nav-link ${selectedSection === 'overview' && 'active'}`} onClick={() => handleSectionChange('overview')}>
              <i className='fas fa-chart-simple'/>Overview
            </Link>
          </div>
        </div>

        <div className="content-area">
          {/* Render the selected section */}
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/products" element={<Products />} />
            <Route path="/users" element={<Users />} />
            <Route path="/orders" element={<Orders />} />
            <Route path='/user/:id' element={<UserDetails/>}/>
            <Route path='/rating' element={<Ratings/>}/>
            <Route path='/overview' element={<Overview/>}/>
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default Admin;
