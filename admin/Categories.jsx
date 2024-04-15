import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Categories.css';

const CategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({ CatagoryId: '', CatagoryName: '' });
  const [error, setError] = useState('');
  const [editId, setEditId] = useState();
  const [name, setName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001/api/categories')
      .then(response => {
        setCategories(response.data.response);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  useEffect(() => {
    // Filter categories based on the search term
    const filtered = categories.filter((category) => {
      const categoryName = `${category?.CatagoryName}`;
      return categoryName.toLowerCase().includes(searchTerm.toLowerCase());
    });

    setFilteredCategories(filtered);
  }, [searchTerm, categories]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCategory((prevCategory) => ({ ...prevCategory, [name]: value }));
  };

  const handleAddCategories = () => {
    // Validation
    if (!newCategory.CatagoryId || !newCategory.CatagoryName) {
      setError('Please provide both Category ID and Category Name.');
      return;
    }

    // Check if Category ID already exists
    if (categories.some(category => category?.CatagoryId === newCategory.CatagoryId)) {
      setError('Category ID must be unique.');
      return;
    }

    axios.post('http://localhost:3001/api/addcategories', newCategory)
      .then(response => {
        setCategories(prevCategories => [...prevCategories, response.data.response]);
        setNewCategory({ CatagoryId: '', CatagoryName: '' });
        setError('');
        toast.success('Category added successfully!');
      })
      .catch(error => {
        console.error('Error adding category: ', error);
      });
  };

  const handleEdit = (CatagoryId) => {
    setEditId(CatagoryId);
    const categoryToEdit = categories.find(category => category?.CatagoryId === CatagoryId);
    setName(categoryToEdit?.CatagoryName || '');
  };

  const handleUpdate = () => {
    axios.post(`http://localhost:3001/api/updatecategory/${editId}`, { CatagoryId: editId, CatagoryName: name })
      .then(res => {
        console.log(res);
        // Update the categories state after successful update
        setCategories(prevCategories => {
          const updatedCategories = prevCategories.map(category =>
            category?.CatagoryId === editId ? { ...category, CatagoryName: name } : category
          );
          return updatedCategories;
        });
        // Clear edit mode
        setEditId();
        setName('');
        setError(''); // Clear any previous errors
        toast.success('Category updated successfully!');
      })
      .catch(err => console.log(err));
  };

  const handleDelete = (CatagoryId) => {
    axios.post(`http://localhost:3001/api/deletecategories/${CatagoryId}`)
      .then(res => {
        console.log(res);
        // Update the categories state after successful delete
        setCategories(prevCategories => prevCategories.filter(category => category?.CatagoryId !== CatagoryId));
        toast.success('Category deleted successfully!');
      })
      .catch(err => console.log(err));
  };

  return (
    <div className='mainContainer'>
      <h1>Category Section</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search Category..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <button className="search-button">
          <i className="fas fa-search" />
        </button>
      </div>
      <div className="addCategorySection">
        <h2>Add Categories</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form>
          <div className="boxes">
            <div>
              <label>Category Id:</label>
              <input type="text" className='catid' name="CatagoryId" value={newCategory.CatagoryId} onChange={handleInputChange} />
            </div>
            <div>
              <label>Category Name:</label>
              <input type="text" name="CatagoryName" value={newCategory.CatagoryName} onChange={handleInputChange} />
            </div>
          </div>
          <button type='button' onClick={handleAddCategories}>
            Add Categories
          </button>
        </form>
      </div>

      <div>
        <h3 className='subtitle'>Existing Categories ({filteredCategories.length}) </h3>
      </div>
      <div className="categorytable">
        <table>
          <tbody>
            <tr>
              <th>Category Id</th>
              <th>Category Name</th>
              <th colSpan={3}>Actions</th>
            </tr>
            {filteredCategories.map(category => (
              category?.CatagoryId === editId ?
                <tr key={category?.CatagoryId}>
                  <td>{category?.CatagoryId}</td>
                  <td><input type="text" value={name} onChange={e => setName(e.target.value)} /></td>
                  <td><button onClick={handleUpdate}>Update</button></td>
                  <td><button onClick={() => setEditId()}>Cancel</button></td>
                </tr>
                :
                <tr key={category?.CatagoryId}>
                  <td>{category?.CatagoryId}</td>
                  <td>{category?.CatagoryName}</td>
                  <td><button className='editbtn' onClick={() => handleEdit(category?.CatagoryId)}>Edit</button></td>
                  <td><button className='deletebtn' onClick={() => handleDelete(category?.CatagoryId)}>Delete</button></td>
                </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ToastContainer />
    </div>
  );
};

export default CategoryPage;
