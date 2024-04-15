import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import profileImage from '../src/assets/profile.png';
import './Userdetails.css';

const UserDetails = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/customer/${id}`);
        setUser(response.data.customer);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, [id]);

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className='mainContainer'>
      <div className="header">
        <h1>User Details</h1>
        <Link to="/users" className="backButton">
        <i className='fa-solid fa-angles-left'/> 
        </Link>
      </div>
      
      <h3>Main Details</h3>
      {/* Main Profile Section */}
      <div className="mainProfileSection">
        <div className="profileImageContainer">
          <img
            src={user.ProfileUrl || profileImage}
            alt="Profile"
            className="profileImage"
          />
        </div>
        
        <div className="profileDetails">
          <div className='d1'>
            <p>User Id:  </p>
            <p>Name: </p>
            <p>Email: </p>
            <p>Contact: </p>
            <p>Password: </p>
          </div>

          <div className="d2">
            <input type="text"  value={user.UserId || 'No details uploaded'} /> 
            <input type="text"  value={`${user.FirstName || 'No details uploaded'} ${user.Lastname || 'No details uploaded'}`} />
            <input type="text" value={user.Email || 'No details uploaded'} /> 
            <input type="text"  value={user.Contact || 'No details uploaded'} /> 
            <input type="text"  value={user.Password || 'No details uploaded'}/>
          </div>
        </div>
      </div>

      <h3>Address Details</h3>
      {/* Address Details Section */}
      <div className="addressDetailsSection">
        <div className="d3">
          <p>Country:</p>
          <p>District: </p>
          <p>City: </p>
          <p>Address: </p>
          <p>Postal Code: </p>
        </div>

        <div className="d4">
          <input type="text" value={user.Country || 'No details uploaded'} />
          <input type="text" value={user.District || 'No details uploaded'} />
          <input type="text" value={user.City || 'No details uploaded'} />
          <input type="text" value={user.Address || 'No details uploaded'} />
          <input type="text" value={user.postalCode || 'No details uploaded'} />
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
