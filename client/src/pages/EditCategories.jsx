import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/EditCategories.css'; // Make sure to update the stylesheet import
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/AuthContext';

const EditCategories = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [editedCategory, setEditedCategory] = useState({});
  const [newCategory, setNewCategory] = useState({
    name: '',
    description: '',
  });
  const navigate = useNavigate();
  const { tokenRequest } = useAuth();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('/api/categories');
        console.log('Categories:', response.data.categories);
        setCategories(response.data.categories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      axios
        .get(`/api/categories/${selectedCategory}`)
        .then((response) => {
          setEditedCategory(response.data.category);
        })
        .catch((error) => {
          console.log('Failed to fetch selected category:', error);
        });
    } else {
      setEditedCategory({});
    }
  }, [selectedCategory]);

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const handleFieldChange = (fieldName, value) => {
    setEditedCategory((prevCategory) => ({ ...prevCategory, [fieldName]: value }));
  };

  const handleNewCategoryChange = (fieldName, value) => {
    setNewCategory((prevCategory) => ({ ...prevCategory, [fieldName]: value }));
  };

  const handleSaveChanges = async (event) => {
    event.preventDefault();

    try {
      const data = {
        name: editedCategory.name,
        description: editedCategory.description,
      };

      await tokenRequest('put', `/api/categories/${selectedCategory}`, data);

      console.log('Changes saved successfully');
      navigate('/categories');
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddCategory = async (event) => {
    event.preventDefault();

    try {
      const data = {
        name: newCategory.name,
        description: newCategory.description,
      };

      await tokenRequest('post', '/api/categories', data);

      console.log('New category added successfully');
      navigate('/categories');
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteCategory = async () => {
    if (!window.confirm('Are you sure you want to delete this category?')) {
      return;
    }

    try {
      await tokenRequest('delete', `/api/categories/${selectedCategory}`);
      console.log('Category deleted successfully');
      navigate('/categories');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="edit-categories-container">
      <div className="edit-categories-card">
        <h2 className="edit-categories-title">Edit Categories</h2>

        <div className="categories-dropdown">
          <label htmlFor="categoryDropdown">Select a category:</label>
          <select
            id="categoryDropdown"
            value={selectedCategory}
            onChange={(e) => handleCategoryChange(e.target.value)}
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {selectedCategory && (
          <div className="form-container">
            <div className="form-group">
              <label htmlFor="categoryName">Category Name:</label>
              <input
                type="text"
                id="categoryName"
                className="edit-category-input"
                value={editedCategory.name || ''}
                onChange={(e) => handleFieldChange('name', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="categoryDescription">Category Description:</label>
              <input
                type="text"
                id="categoryDescription"
                className="edit-category-input"
                value={editedCategory.description || ''}
                onChange={(e) => handleFieldChange('description', e.target.value)}
              />
            </div>

            <button className="save-button" onClick={handleSaveChanges} disabled={!selectedCategory}>
              Save Changes
            </button>

            <button className="save-button delete-button" onClick={handleDeleteCategory}>
              Delete Category
            </button>
          </div>
        )}
      </div>

      <div className="add-category-card">
        <h2 className="add-category-title">Add New Category</h2>
        <div className="form-container">
          <div className="form-group">
            <label htmlFor="newCategoryName">Category Name:</label>
            <input
              type="text"
              id="newCategoryName"
              className="edit-category-input"
              value={newCategory.name}
              onChange={(e) => handleNewCategoryChange('name', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="newCategoryDescription">Category Description:</label>
            <input
              type="text"
              id="newCategoryDescription"
              className="edit-category-input"
              value={newCategory.description}
              onChange={(e) => handleNewCategoryChange('description', e.target.value)}
            />
          </div>

          <button className="save-button" onClick={handleAddCategory}>
            Add Category
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditCategories;
