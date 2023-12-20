import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/EditCategories.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/AuthContext';

const EditCategories = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [editedCategory, setEditedCategory] = useState({});
  const [newCategory, setNewCategory] = useState({
    category_name: '',
  });
  const [loadingCategories, setLoadingCategories] = useState(true);
  const navigate = useNavigate();
  const { tokenRequest } = useAuth();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('/api/products_category');
        console.log('API Response:', response);

        if (Array.isArray(response.data.products_categories)) {
          setCategories(response.data.products_categories);
        } else {
          console.error('Invalid response format. Expected an array.');
          console.log('Actual response data:', response.data);
        }

        setLoadingCategories(false);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      axios
        .get(`/api/products_category/${selectedCategory}`)
        .then((response) => {
          setEditedCategory(response.data);
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
        category_name: editedCategory.category_name,
      };

      await tokenRequest('put', `/api/products_category/${selectedCategory}`, { data });
      console.log('Changes saved successfully');
      navigate('/categories');
    } catch (error) {
      console.error('Error saving changes:', error);
    }
  };

  const handleAddCategory = async (event) => {
    event.preventDefault();

    try {
      const data = {
        category_name: newCategory.category_name,
      };

      await tokenRequest('post', '/api/products_category', data);
      console.log('New category added successfully');
      navigate('/categories');
    } catch (error) {
      console.error('Error adding new category:', error);
    }
  };

  const handleDeleteCategory = async () => {
    if (!window.confirm('Are you sure you want to delete this category?')) {
      return;
    }

    try {
      await tokenRequest('delete', `/api/products_category/${selectedCategory}`);
      console.log('Category deleted successfully');
      navigate('/categories');
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  return (
    <div className="edit-categories-container">
      <div className="edit-categories-card">
        <h2 className="edit-categories-title">Edit Categories</h2>

        <div className="categories-dropdown">
          <label htmlFor="categoryDropdown">Select a category:</label>
          {loadingCategories ? (
            <p>Loading categories...</p>
          ) : (
            <select
              id="categoryDropdown"
              value={selectedCategory}
              onChange={(e) => handleCategoryChange(e.target.value)}
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.category_name}
                </option>
              ))}
            </select>
          )}
        </div>

        {selectedCategory && (
          <div className="form-container">
            <div className="form-group">
              <label htmlFor="categoryName">Category Name:</label>
              <input
                type="text"
                id="categoryName"
                className="edit-category-input"
                value={editedCategory.category_name || ''}
                onChange={(e) => handleFieldChange('category_name', e.target.value)}
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
              value={newCategory.category_name}
              onChange={(e) => handleNewCategoryChange('category_name', e.target.value)}
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
